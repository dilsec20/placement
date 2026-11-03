# 08 — Rate Limiting & Scalability

> **JD Match:** "Handle massive traffic" • "10M+ calls monthly" • "Flexible, forward-looking systems"

---

## 🎯 What Superfone Will Ask
- How would you rate-limit API calls per business (multi-tenant)?
- What algorithm would you use? Token bucket vs sliding window?
- How do you scale to handle 10M calls/month?
- How do you prevent one business from affecting others?

---

## 1. Rate Limiting Algorithms

```
TOKEN BUCKET:
  • Bucket holds N tokens (e.g., 100)
  • Each request consumes 1 token
  • Tokens refill at fixed rate (e.g., 10/sec)
  • If empty → reject (429)
  • Allows bursts up to bucket size

  [████████░░]  → request → [███████░░░]
                → request → [██████░░░░]
                → refill  → [███████░░░]

SLIDING WINDOW:
  • Count requests in rolling time window
  • More accurate than fixed windows
  • No burst issue

  Window: last 60 seconds
  |--request--request--request--|  count = 3
     |--request--request--request--|  count = 3 (shifted)

FIXED WINDOW:
  • Count requests per fixed time block
  • Simple but has boundary burst problem
  • Minute 1: [10 requests]  ← OK
  • Edge of minute 1-2: 20 requests in 2 seconds!
```

---

## 2. Redis-Based Rate Limiter (Production)

```javascript
// src/middleware/rateLimiter.js
const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL);

// ─── Sliding Window Rate Limiter ───
async function slidingWindowLimiter(key, limit, windowSec) {
  const now = Date.now();
  const windowStart = now - (windowSec * 1000);

  const pipeline = redis.pipeline();
  pipeline.zremrangebyscore(key, 0, windowStart);   // Remove old entries
  pipeline.zadd(key, now, `${now}-${Math.random()}`); // Add current request
  pipeline.zcard(key);                                // Count in window
  pipeline.expire(key, windowSec);                    // Auto-cleanup

  const results = await pipeline.exec();
  const count = results[2][1];

  return {
    allowed: count <= limit,
    remaining: Math.max(0, limit - count),
    resetAt: new Date(now + windowSec * 1000),
  };
}

// ─── Multi-Tenant Rate Limiting Middleware ───
function rateLimitByBusiness(limit = 100, windowSec = 60) {
  return async (req, res, next) => {
    const businessId = req.user?.businessId || req.ip;
    const key = `ratelimit:${businessId}:${req.route.path}`;

    const result = await slidingWindowLimiter(key, limit, windowSec);

    // Set rate limit headers
    res.set({
      'X-RateLimit-Limit': limit,
      'X-RateLimit-Remaining': result.remaining,
      'X-RateLimit-Reset': result.resetAt.toISOString(),
    });

    if (!result.allowed) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        retryAfter: windowSec,
      });
    }

    next();
  };
}

// ─── Tiered Rate Limits by Plan ───
const PLAN_LIMITS = {
  basic:      { calls: 500,  api: 1000,  whatsapp: 500  },
  pro:        { calls: 2000, api: 5000,  whatsapp: 2000 },
  enterprise: { calls: 10000, api: 50000, whatsapp: 10000 },
};

function rateLimitByPlan(resource) {
  return async (req, res, next) => {
    const plan = req.user.plan || 'basic';
    const limit = PLAN_LIMITS[plan][resource];

    const key = `ratelimit:${req.user.businessId}:${resource}:monthly`;
    const count = await redis.incr(key);

    if (count === 1) {
      // First request this month — set expiry
      const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
      await redis.expire(key, daysInMonth * 86400);
    }

    if (count > limit) {
      return res.status(429).json({
        error: `Monthly ${resource} limit exceeded (${limit})`,
        upgrade: 'Contact sales for higher limits',
      });
    }

    next();
  };
}

// Usage
app.post('/api/v1/calls', authenticate, rateLimitByPlan('calls'), callController.initiate);
app.post('/api/v1/whatsapp/send', authenticate, rateLimitByPlan('whatsapp'), waController.send);
```

---

## 3. Scaling Architecture

```
10M calls/month = ~333K calls/day = ~14K calls/hour = ~4 calls/second

ARCHITECTURE FOR SCALE:

                    ┌─────────────────┐
                    │   CLOUDFLARE    │  DDoS protection
                    │   (CDN + WAF)   │  Rate limiting L7
                    └────────┬────────┘
                             │
                    ┌────────┴────────┐
                    │  LOAD BALANCER  │  Nginx / AWS ALB
                    │  (L7 routing)   │
                    └───┬────┬────┬───┘
                        │    │    │
              ┌─────────┤    │    ├─────────┐
              ▼         ▼    │    ▼         ▼
         ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
         │ API    │ │ API    │ │Webhook │ │Webhook │
         │Server 1│ │Server 2│ │Server 1│ │Server 2│
         └───┬────┘ └───┬────┘ └───┬────┘ └───┬────┘
             │          │          │          │
         ┌───┴──────────┴──────────┴──────────┴───┐
         │              REDIS CLUSTER              │
         │  • Session store   • Rate limiting      │
         │  • Pub/Sub         • Caching            │
         │  • Job queues (Bull)                    │
         └────────────────────┬────────────────────┘
                              │
         ┌────────────────────┴────────────────────┐
         │           WORKER PROCESSES               │
         │  ┌──────┐ ┌──────┐ ┌──────┐ ┌────────┐ │
         │  │ AI   │ │Trans-│ │WhatsA│ │  CRM   │ │
         │  │Worker│ │cribe │ │pp    │ │ Update │ │
         │  └──────┘ └──────┘ └──────┘ └────────┘ │
         └─────────────────────────────────────────┘
                              │
         ┌────────────────────┴────────────────────┐
         │          MongoDB REPLICA SET             │
         │  Primary (writes) → Replica (reads)     │
         └─────────────────────────────────────────┘
```

---

## 4. Horizontal Scaling Checklist

```
□ STATELESS SERVERS
  • No in-memory sessions (use Redis)
  • No local file storage (use S3)
  • Any server can handle any request

□ DATABASE
  • Connection pooling (max 20 per server)
  • Read replicas for dashboard/analytics queries
  • Indexes on businessId + timestamp

□ CACHING
  • Business config in Redis (avoid DB hit per request)
  • AI responses for common questions (cache 1hr)
  • Rate limit counters in Redis

□ ASYNC PROCESSING
  • Webhooks: respond 200 immediately, process via queue
  • Call processing: queue for transcription, AI, CRM
  • WhatsApp: queue outbound messages

□ MONITORING
  • Request latency per endpoint
  • Queue depth (growing = workers too slow)
  • Error rate per service
  • DB connection pool utilization
```

---

## ⚡ Quick Revision

| Concept | Key Point |
|---------|-----------|
| Token bucket | Allows bursts; refills at fixed rate; good for APIs |
| Sliding window | Most accurate; uses Redis sorted sets; no boundary issues |
| Per-tenant limits | Rate limit by businessId, not just IP |
| Tiered plans | Different limits for basic/pro/enterprise |
| Stateless servers | No local state; use Redis for sessions, S3 for files |
| 429 status code | "Too Many Requests" with Retry-After header |
