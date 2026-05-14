# 02 — Express.js Production Patterns

> **JD Match:** "Develop backend services and APIs using Node.js" • "Clean, reliable code"

---

## 🎯 What Superfone Will Ask
- How do you structure a large Express application?
- Explain middleware — how would you build auth + rate limiting + logging?
- How do you handle errors in production APIs?
- How do you validate incoming webhook data from telephony providers?

---

## 1. Production Project Structure

```
superfone-backend/
├── src/
│   ├── config/
│   │   ├── database.js          # DB connection setup
│   │   ├── redis.js             # Redis client
│   │   └── env.js               # Environment validation
│   │
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication
│   │   ├── rateLimiter.js       # Rate limiting
│   │   ├── validator.js         # Request validation
│   │   ├── errorHandler.js      # Global error handler
│   │   └── logger.js            # Request logging
│   │
│   ├── modules/                 # Feature-based modules
│   │   ├── calls/
│   │   │   ├── call.controller.js
│   │   │   ├── call.service.js    # Business logic
│   │   │   ├── call.model.js      # Database model
│   │   │   ├── call.routes.js     # Route definitions
│   │   │   └── call.validator.js  # Input validation
│   │   ├── whatsapp/
│   │   ├── crm/
│   │   └── ai-agent/
│   │
│   ├── services/                # Shared services
│   │   ├── telephony.service.js
│   │   ├── whatsapp.service.js
│   │   ├── ai.service.js
│   │   └── queue.service.js
│   │
│   ├── utils/
│   │   ├── errors.js            # Custom error classes
│   │   ├── response.js          # Standard response format
│   │   └── helpers.js
│   │
│   └── app.js                   # Express app setup
│
├── tests/
├── .env
├── .env.example
├── docker-compose.yml
└── package.json
```

---

## 2. App Setup — Production Grade

```javascript
// src/app.js
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const { requestLogger } = require('./middleware/logger');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');

const app = express();

// ─── Security ───
app.use(helmet());                          // Security headers
app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(',') }));

// ─── Parsing ───
app.use(express.json({ limit: '10kb' }));   // Limit body size (prevent abuse)
app.use(express.urlencoded({ extended: true }));
app.use(compression());                     // Gzip responses

// ─── Logging ───
app.use(requestLogger);

// ─── Rate Limiting ───
app.use('/api/', apiLimiter);

// ─── Health Check (for load balancer / k8s) ───
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date() });
});

// ─── Routes ───
app.use('/api/v1/calls', require('./modules/calls/call.routes'));
app.use('/api/v1/whatsapp', require('./modules/whatsapp/wa.routes'));
app.use('/api/v1/crm', require('./modules/crm/crm.routes'));
app.use('/api/v1/ai', require('./modules/ai-agent/ai.routes'));

// ─── Webhooks (from telephony/WhatsApp providers) ───
app.use('/webhooks/telephony', require('./modules/calls/call.webhook'));
app.use('/webhooks/whatsapp', require('./modules/whatsapp/wa.webhook'));

// ─── Error Handling (MUST be last) ───
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
```

---

## 3. Middleware Chain — The Heart of Express

```
Request → [helmet] → [cors] → [json parser] → [logger] → [rate limiter]
       → [auth] → [validate] → [ROUTE HANDLER] → [error handler] → Response

Each middleware: function(req, res, next)
  • Call next() → pass to next middleware
  • Call res.json() → end the chain
  • Call next(error) → jump to error handler
```

### 💻 Auth Middleware

```javascript
// src/middleware/auth.js
const jwt = require('jsonwebtoken');
const { AppError } = require('../utils/errors');

function authenticate(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return next(new AppError('Authentication required', 401));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // { userId, businessId, role }
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError')
      return next(new AppError('Token expired', 401));
    next(new AppError('Invalid token', 403));
  }
}

function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new AppError('Insufficient permissions', 403));
    next();
  };
}

module.exports = { authenticate, authorize };
```

### 💻 Request Validation (using Joi)

```javascript
// src/middleware/validator.js
const { AppError } = require('../utils/errors');

function validate(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,        // Return ALL errors
      stripUnknown: true,       // Remove unknown fields
    });

    if (error) {
      const details = error.details.map(d => ({
        field: d.path.join('.'),
        message: d.message
      }));
      return next(new AppError('Validation failed', 400, details));
    }

    req.body = value;  // Use sanitized/validated data
    next();
  };
}

// Usage in routes:
const Joi = require('joi');

const createCallSchema = Joi.object({
  to: Joi.string().pattern(/^\+\d{10,15}$/).required(),
  from: Joi.string().pattern(/^\+\d{10,15}$/).required(),
  type: Joi.string().valid('outbound', 'inbound').required(),
  agentId: Joi.string().uuid().optional(),
});

router.post('/', authenticate, validate(createCallSchema), callController.create);
```

---

## 4. Error Handling — Production Pattern

```javascript
// src/utils/errors.js
class AppError extends Error {
  constructor(message, statusCode, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;  // Our error (not a crash)
    this.details = details;
  }
}

class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404);
  }
}

class ConflictError extends AppError {
  constructor(message = 'Resource already exists') {
    super(message, 409);
  }
}

module.exports = { AppError, NotFoundError, ConflictError };
```

```javascript
// src/middleware/errorHandler.js
function errorHandler(err, req, res, next) {
  // Log the error
  console.error(`[${new Date().toISOString()}] ${err.message}`, {
    url: req.originalUrl,
    method: req.method,
    stack: err.stack,
    userId: req.user?.userId,
  });

  // Operational error (we threw it) — send to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
      ...(err.details && { details: err.details }),
    });
  }

  // Programming error (unexpected) — don't leak details
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
}

function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    error: `Route ${req.method} ${req.originalUrl} not found`,
  });
}

module.exports = { errorHandler, notFoundHandler };
```

```javascript
// Async handler wrapper — no more try/catch everywhere!
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Usage:
router.get('/:id', authenticate, asyncHandler(async (req, res) => {
  const call = await CallService.getById(req.params.id);
  if (!call) throw new NotFoundError('Call');
  res.json({ success: true, data: call });
}));
```

---

## 5. Controller → Service → Model Pattern

```
FLOW:
  Route → Controller → Service → Model → Database
          (HTTP logic)  (Business   (Data
                         logic)     access)

WHY: Separation of concerns. Service can be reused
     by webhooks, cron jobs, queue workers — not just HTTP.
```

```javascript
// src/modules/calls/call.controller.js
const CallService = require('./call.service');
const asyncHandler = require('../../utils/asyncHandler');

exports.initiateCall = asyncHandler(async (req, res) => {
  const call = await CallService.initiate({
    ...req.body,
    businessId: req.user.businessId,  // From auth middleware
  });
  res.status(201).json({ success: true, data: call });
});

exports.getCallHistory = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, status } = req.query;
  const result = await CallService.getHistory(req.user.businessId, { page, limit, status });
  res.json({ success: true, ...result });
});
```

```javascript
// src/modules/calls/call.service.js — Business logic lives HERE
const Call = require('./call.model');
const TelephonyService = require('../../services/telephony.service');
const QueueService = require('../../services/queue.service');

class CallService {
  static async initiate({ from, to, businessId, agentId }) {
    // 1. Create call record
    const call = await Call.create({
      from, to, businessId, agentId,
      status: 'initiating',
      startedAt: new Date(),
    });

    // 2. Trigger actual call via telephony provider
    const providerCallId = await TelephonyService.makeCall(from, to);

    // 3. Update with provider ID
    call.providerCallId = providerCallId;
    call.status = 'ringing';
    await call.save();

    // 4. Queue AI agent preparation (async, don't block response)
    await QueueService.publish('call.initiated', {
      callId: call._id,
      agentId,
      businessId,
    });

    return call;
  }

  static async getHistory(businessId, { page, limit, status }) {
    const filter = { businessId };
    if (status) filter.status = status;

    const [calls, total] = await Promise.all([
      Call.find(filter)
        .sort({ startedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Call.countDocuments(filter),
    ]);

    return { data: calls, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
  }
}

module.exports = CallService;
```

---

## 6. Webhook Handling (Telephony Events)

```javascript
// src/modules/calls/call.webhook.js
const router = require('express').Router();
const crypto = require('crypto');
const CallService = require('./call.service');

// Verify webhook signature (CRITICAL for security!)
function verifyWebhookSignature(req, res, next) {
  const signature = req.headers['x-webhook-signature'];
  const expected = crypto
    .createHmac('sha256', process.env.WEBHOOK_SECRET)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (signature !== expected) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  next();
}

router.post('/events', verifyWebhookSignature, async (req, res) => {
  // ALWAYS respond 200 quickly — provider will retry on timeout!
  res.status(200).json({ received: true });

  // Process async (don't block the response)
  try {
    const { event, data } = req.body;

    switch (event) {
      case 'call.ringing':
        await CallService.updateStatus(data.callId, 'ringing');
        break;
      case 'call.answered':
        await CallService.updateStatus(data.callId, 'in-progress');
        await CallService.connectAIAgent(data.callId);
        break;
      case 'call.completed':
        await CallService.handleCallEnd(data.callId, data.duration, data.recording);
        break;
      case 'call.failed':
        await CallService.handleCallFailure(data.callId, data.reason);
        break;
    }
  } catch (err) {
    console.error('Webhook processing error:', err);
    // Don't throw — we already sent 200
  }
});

module.exports = router;
```

---

## ⚡ Quick Revision

| Pattern | Why |
|---------|-----|
| Controller → Service → Model | Separation of concerns; services reusable across HTTP, webhooks, workers |
| `asyncHandler` wrapper | Catch all async errors without try-catch in every route |
| Operational vs Programming errors | Show clean error to user vs log + generic 500 |
| Webhook → 200 first, process later | Provider retries on timeout; process asynchronously |
| Joi validation | Validate + sanitize input before it reaches business logic |
| `helmet()` + `cors()` + rate limit | Security baseline for every production API |
