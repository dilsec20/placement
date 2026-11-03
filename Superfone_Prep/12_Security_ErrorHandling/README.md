# 12 — Security & Error Handling (Production Backend)

> **Must-know:** "Clean, reliable code" • Production-grade backend systems

---

## 🎯 Interview Questions
- How do you prevent SQL injection / NoSQL injection?
- What is XSS, CSRF? How do you prevent them in APIs?
- How do you handle errors in production without crashing the server?
- What security headers should every API have?
- How do you handle sensitive data (API keys, passwords)?

---

## 1. Security Middleware Stack

```javascript
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');

// ─── Apply in order ───
app.use(helmet());                           // 15+ security headers
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(','),
  credentials: true,
}));
app.use(express.json({ limit: '10kb' }));    // Prevent large payload attacks
app.use(mongoSanitize());                    // Prevent NoSQL injection: { "$gt": "" }
app.use(hpp());                              // Prevent HTTP parameter pollution

// Rate limit login (prevent brute force)
app.use('/api/auth/login', rateLimit({
  windowMs: 15 * 60 * 1000,                 // 15 minutes
  max: 10,                                   // 10 attempts
  message: { error: 'Too many login attempts. Try again in 15 minutes.' },
}));
```

---

## 2. Common Attacks & Prevention

### NoSQL Injection
```javascript
// ❌ VULNERABLE — attacker sends: { "email": {"$gt": ""}, "password": {"$gt": ""} }
const user = await User.findOne({ email: req.body.email, password: req.body.password });
// This matches ANY user! (every email is $gt empty string)

// ✅ FIX 1: Use express-mongo-sanitize (strips $ and . from input)
app.use(mongoSanitize());

// ✅ FIX 2: Validate types explicitly
const { email, password } = req.body;
if (typeof email !== 'string' || typeof password !== 'string') {
  return res.status(400).json({ error: 'Invalid input types' });
}
```

### Input Validation (Joi)
```javascript
const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).trim().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).max(128).required()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .message('Password must contain uppercase, lowercase, and number'),
  businessName: Joi.string().min(2).max(100).trim().required(),
});

// Middleware
function validate(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,      // Show ALL errors
      stripUnknown: true,     // Remove unknown fields
    });
    if (error) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.details.map(d => ({ field: d.path.join('.'), message: d.message })),
      });
    }
    req.body = value;
    next();
  };
}

router.post('/register', validate(registerSchema), authController.register);
```

---

## 3. Error Handling — Production Pattern

```javascript
// ─── Custom Error Classes ───
class AppError extends Error {
  constructor(message, statusCode, code = null) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;           // Machine-readable error code
    this.isOperational = true;  // We threw this (not a crash)
  }
}

class ValidationError extends AppError {
  constructor(details) {
    super('Validation failed', 400, 'VALIDATION_ERROR');
    this.details = details;
  }
}

class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND');
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Authentication required') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

class ForbiddenError extends AppError {
  constructor(message = 'Insufficient permissions') {
    super(message, 403, 'FORBIDDEN');
  }
}

// ─── Async Handler (no try-catch needed in routes!) ───
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Usage:
router.get('/calls/:id', authenticate, asyncHandler(async (req, res) => {
  const call = await Call.findOne({
    _id: req.params.id,
    businessId: req.user.businessId,  // Multi-tenant safety
  });
  if (!call) throw new NotFoundError('Call');
  res.json({ success: true, data: call });
}));

// ─── Global Error Handler (MUST be last middleware) ───
function globalErrorHandler(err, req, res, next) {
  // 1. Log error
  if (err.isOperational) {
    req.log?.warn({ err: err.message, code: err.code }, 'Operational error');
  } else {
    req.log?.error({ err: err.message, stack: err.stack }, 'Unexpected error');
  }

  // 2. Handle known error types
  if (err.name === 'CastError') {
    // Invalid MongoDB ObjectId
    return res.status(400).json({ error: 'Invalid ID format' });
  }
  if (err.code === 11000) {
    // MongoDB duplicate key
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({ error: `${field} already exists` });
  }
  if (err.name === 'JsonWebTokenError') {
    return res.status(403).json({ error: 'Invalid token' });
  }

  // 3. Operational errors → send details to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      error: err.message,
      code: err.code,
      ...(err.details && { details: err.details }),
    });
  }

  // 4. Programming errors → generic message (don't leak internals!)
  res.status(500).json({
    error: 'Something went wrong',
    ...(process.env.NODE_ENV === 'development' && { debug: err.message }),
  });
}

// ─── Process-level error handling ───
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION:', err);
  // Log to error tracking (Sentry, etc.)
  // Graceful shutdown
});

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
  process.exit(1);  // Must exit — process is in unknown state
});
```

---

## 4. Consistent API Response Format

```javascript
// ─── Success responses ───
// Single item
{ "success": true, "data": { "id": "abc", "name": "Alice" } }

// List with pagination
{
  "success": true,
  "data": [{ "id": "abc" }, { "id": "def" }],
  "pagination": { "page": 1, "limit": 20, "total": 150, "pages": 8 }
}

// ─── Error responses ───
// Validation error
{
  "success": false,
  "error": "Validation failed",
  "code": "VALIDATION_ERROR",
  "details": [
    { "field": "email", "message": "Must be a valid email" },
    { "field": "password", "message": "Minimum 8 characters" }
  ]
}

// Not found
{ "success": false, "error": "Call not found", "code": "NOT_FOUND" }

// Auth error
{ "success": false, "error": "Token expired", "code": "TOKEN_EXPIRED" }
```

```javascript
// Helper function for consistent responses
function sendSuccess(res, data, statusCode = 200) {
  res.status(statusCode).json({ success: true, data });
}

function sendPaginated(res, data, pagination) {
  res.json({ success: true, data, pagination });
}
```

---

## 5. Environment & Secrets Management

```bash
# .env (NEVER commit!)
NODE_ENV=production
PORT=3000

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/superfone

# Auth
JWT_ACCESS_SECRET=your-access-secret-256-bit-random
JWT_REFRESH_SECRET=your-refresh-secret-256-bit-random

# External APIs
OPENAI_API_KEY=sk-...
WHATSAPP_TOKEN=EAAx...
TELEPHONY_API_KEY=...

# Redis
REDIS_URL=redis://localhost:6379
```

```javascript
// src/config/env.js — Validate env vars at startup!
const required = [
  'MONGODB_URI', 'JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET',
  'REDIS_URL', 'OPENAI_API_KEY',
];

for (const key of required) {
  if (!process.env[key]) {
    console.error(`❌ Missing required env var: ${key}`);
    process.exit(1);  // Fail fast — don't run with missing config!
  }
}
```

---

## ⚡ Quick Revision

| Concept | Key Point |
|---------|-----------|
| helmet() | Adds 15+ security headers (XSS, clickjacking, HSTS) |
| mongoSanitize | Strips `$` and `.` from input — prevents NoSQL injection |
| Joi validation | Validate + sanitize ALL input before processing |
| Operational error | We threw it (404, 400) → send details to client |
| Programming error | Unexpected crash → generic 500, log full stack |
| asyncHandler | Wraps async routes; catches errors → sends to error middleware |
| Duplicate key (11000) | MongoDB error → return 409 Conflict |
| Fail fast | Validate env vars at startup; crash early if missing |
| Never log secrets | No tokens, passwords, API keys in logs |
