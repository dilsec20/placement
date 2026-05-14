# 11 — JWT Authentication System (Complete Implementation)

> **Must-know for any backend role** — They WILL ask you to explain or build this.

---

## 🎯 Interview Questions
- How does JWT work internally? What's inside the token?
- How do you handle token expiry? What are refresh tokens?
- How do you revoke a JWT?
- How do you store passwords securely?
- Implement a complete auth flow: register, login, protect routes, refresh token.

---

## 1. JWT Internals

```
TOKEN = base64(HEADER) + "." + base64(PAYLOAD) + "." + SIGNATURE

┌────────────────┐   ┌─────────────────────┐   ┌──────────────────────┐
│    HEADER      │   │     PAYLOAD         │   │     SIGNATURE        │
│ {              │   │ {                   │   │                      │
│  "alg":"HS256",│   │  "userId": "abc",   │   │  HMACSHA256(         │
│  "typ":"JWT"   │   │  "businessId": "x", │   │    base64(header) +  │
│ }              │   │  "role": "admin",   │   │    "." +             │
│                │   │  "iat": 1700000000, │   │    base64(payload),  │
│                │   │  "exp": 1700003600  │   │    SECRET_KEY        │
│                │   │ }                   │   │  )                   │
└────────────────┘   └─────────────────────┘   └──────────────────────┘
   (algorithm)          (data — NOT secret!)      (prevents tampering)

⚠️ PAYLOAD IS NOT ENCRYPTED — anyone can decode it!
   Signature only proves it hasn't been tampered with.
   NEVER put passwords, credit cards, or secrets in payload.
```

---

## 2. Complete Auth System

```javascript
// ─── Dependencies ───
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const router = express.Router();

// ─── Config ───
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;   // Short-lived token secret
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET; // Long-lived token secret
const ACCESS_EXPIRY = '15m';   // 15 minutes
const REFRESH_EXPIRY = '7d';   // 7 days
const SALT_ROUNDS = 12;        // bcrypt cost factor

// ══════════════════════════════════════
// REGISTER
// ══════════════════════════════════════
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password, businessName } = req.body;

    // 1. Validate input
    if (!email || !password || password.length < 8) {
      return res.status(400).json({ error: 'Email and password (min 8 chars) required' });
    }

    // 2. Check if user exists
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
      // ↑ Use SAME error for security (don't reveal "user exists")
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    // bcrypt internally generates random salt + hashes
    // Result: "$2b$12$LJ3m4ys..." (includes algorithm, cost, salt, hash)

    // 4. Create business + user
    const business = await Business.create({ name: businessName, plan: 'basic' });
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      businessId: business._id,
      role: 'admin',  // First user is admin
    });

    // 5. Generate tokens
    const { accessToken, refreshToken } = generateTokens(user);

    // 6. Store refresh token in DB (for revocation)
    await RefreshToken.create({
      token: hashToken(refreshToken),  // Store hashed, not plain!
      userId: user._id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.status(201).json({
      accessToken,
      refreshToken,
      user: { id: user._id, name, email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
});

// ══════════════════════════════════════
// LOGIN
// ══════════════════════════════════════
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
      // ↑ SAME message for "user not found" AND "wrong password" (security!)
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // 3. Generate tokens
    const { accessToken, refreshToken } = generateTokens(user);

    // 4. Store refresh token
    await RefreshToken.create({
      token: hashToken(refreshToken),
      userId: user._id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.json({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
});

// ══════════════════════════════════════
// REFRESH TOKEN
// ══════════════════════════════════════
router.post('/refresh', async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ error: 'Refresh token required' });

    // 1. Verify token signature
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, REFRESH_SECRET);
    } catch (err) {
      return res.status(403).json({ error: 'Invalid or expired refresh token' });
    }

    // 2. Check if token exists in DB (not revoked)
    const stored = await RefreshToken.findOne({
      token: hashToken(refreshToken),
      userId: decoded.userId,
    });
    if (!stored) {
      // Token was revoked or reused — possible token theft!
      // Revoke ALL tokens for this user (security measure)
      await RefreshToken.deleteMany({ userId: decoded.userId });
      return res.status(403).json({ error: 'Token revoked. Please login again.' });
    }

    // 3. Delete old refresh token (rotate)
    await RefreshToken.deleteOne({ _id: stored._id });

    // 4. Issue new token pair
    const user = await User.findById(decoded.userId);
    const tokens = generateTokens(user);

    // 5. Store new refresh token
    await RefreshToken.create({
      token: hashToken(tokens.refreshToken),
      userId: user._id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.json(tokens);
  } catch (err) {
    next(err);
  }
});

// ══════════════════════════════════════
// LOGOUT (Revoke tokens)
// ══════════════════════════════════════
router.post('/logout', authenticate, async (req, res) => {
  // Delete all refresh tokens for this user
  await RefreshToken.deleteMany({ userId: req.user.userId });
  res.json({ message: 'Logged out successfully' });
});

// ══════════════════════════════════════
// HELPER FUNCTIONS
// ══════════════════════════════════════
function generateTokens(user) {
  const payload = {
    userId: user._id,
    businessId: user.businessId,
    role: user.role,
  };

  const accessToken = jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRY });
  const refreshToken = jwt.sign({ userId: user._id }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRY });

  return { accessToken, refreshToken };
}

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

// ══════════════════════════════════════
// AUTH MIDDLEWARE
// ══════════════════════════════════════
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, ACCESS_SECRET);
    req.user = decoded;  // { userId, businessId, role }
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired', code: 'TOKEN_EXPIRED' });
      // Frontend catches this code → calls /refresh → retries request
    }
    return res.status(403).json({ error: 'Invalid token' });
  }
}

// ══════════════════════════════════════
// ROLE-BASED ACCESS CONTROL (RBAC)
// ══════════════════════════════════════
function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
}

// Usage:
// router.get('/users', authenticate, authorize('admin'), getUsers);
// router.get('/calls', authenticate, authorize('admin', 'agent'), getCalls);
// router.get('/profile', authenticate, getProfile);  // Any authenticated user

module.exports = router;
```

---

## 3. Auth Flow Diagram

```
REGISTER / LOGIN:
  Client ──→ POST /auth/login { email, password }
  Server ──→ Verify credentials
  Server ──→ Generate accessToken (15min) + refreshToken (7d)
  Server ──→ Store hashed refreshToken in DB
  Client ←── { accessToken, refreshToken }
  Client ──→ Store accessToken in memory, refreshToken in httpOnly cookie

API CALLS:
  Client ──→ GET /api/calls (Header: Authorization: Bearer <accessToken>)
  Server ──→ Verify accessToken → extract { userId, businessId, role }
  Client ←── { data: [...] }

TOKEN EXPIRED (after 15min):
  Client ──→ GET /api/calls → 401 { code: "TOKEN_EXPIRED" }
  Client ──→ POST /auth/refresh { refreshToken }
  Server ──→ Verify refreshToken → delete old → issue new pair
  Client ←── { accessToken, refreshToken }  (token rotation!)
  Client ──→ Retry original request with new accessToken

LOGOUT:
  Client ──→ POST /auth/logout
  Server ──→ Delete ALL refreshTokens for user from DB
  Client ──→ Clear stored tokens
```

---

## 4. Security Checklist

```
✅ Hash passwords with bcrypt (12+ rounds)
✅ Same error for "user not found" vs "wrong password"
✅ Short access tokens (15min) + refresh tokens (7d)
✅ Hash refresh tokens before storing in DB
✅ Rotate refresh tokens on each use
✅ Revoke ALL tokens on suspicious reuse (theft detection)
✅ Store access token in memory (NOT localStorage)
✅ Store refresh token in httpOnly secure cookie
✅ Rate limit /auth/login (prevent brute force)
✅ Never log tokens or passwords
```

---

## ⚡ Quick Revision

| Concept | Key Point |
|---------|-----------|
| JWT payload | NOT encrypted, just signed — never put secrets in it |
| bcrypt | Hash + random salt; compare() for login; 12 rounds |
| Access token | Short-lived (15min); sent in Authorization header |
| Refresh token | Long-lived (7d); hashed in DB; rotated on use |
| Token rotation | Issue NEW refresh token each time; delete old one |
| Theft detection | If old refresh token is reused → revoke ALL tokens |
| RBAC | `authorize('admin', 'agent')` middleware after `authenticate` |
| 401 vs 403 | 401 = not authenticated; 403 = authenticated but wrong role |
