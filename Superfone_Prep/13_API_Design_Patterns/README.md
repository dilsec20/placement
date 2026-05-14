# 13 — API Design Patterns (Production Backend)

> **Must-know:** "Backend services and APIs using Node.js" • "Forward-looking systems"

---

## 🎯 Interview Questions
- How do you design a RESTful API for a multi-tenant system?
- How do you handle pagination, filtering, and sorting?
- How do you version your API?
- How do you handle file uploads?
- What is API idempotency and why does it matter?

---

## 1. RESTful Route Design for Superfone

```
RESOURCES (nouns, not verbs):

/api/v1/calls                          → Call management
/api/v1/calls/:id                      → Single call
/api/v1/calls/:id/recording            → Call recording
/api/v1/calls/:id/transcript           → Call transcript

/api/v1/contacts                       → CRM contacts
/api/v1/contacts/:id                   → Single contact
/api/v1/contacts/:id/timeline          → All interactions

/api/v1/conversations                  → WhatsApp conversations
/api/v1/conversations/:id/messages     → Messages in conversation

/api/v1/ai/agents                      → AI agent configs
/api/v1/ai/knowledge                   → Knowledge base docs

/api/v1/analytics/dashboard            → Dashboard metrics
/api/v1/analytics/calls/summary        → Call analytics

WEBHOOKS (incoming from providers):
/webhooks/telephony/events             → Call events
/webhooks/whatsapp/messages            → WhatsApp events
```

---

## 2. Pagination, Filtering, Sorting

```javascript
// GET /api/v1/calls?page=2&limit=20&sort=-startedAt&status=completed&from=2024-01-01

router.get('/', authenticate, asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 20,
    sort = '-createdAt',
    status,
    direction,
    handledBy,
    from,        // date range start
    to,          // date range end
    search,      // search in phone numbers
  } = req.query;

  // ─── Build filter (always scoped to business!) ───
  const filter = { businessId: req.user.businessId };

  if (status) filter.status = status;
  if (direction) filter.direction = direction;
  if (handledBy) filter.handledBy = handledBy;
  if (from || to) {
    filter.createdAt = {};
    if (from) filter.createdAt.$gte = new Date(from);
    if (to) filter.createdAt.$lte = new Date(to);
  }
  if (search) {
    filter.$or = [
      { from: { $regex: search, $options: 'i' } },
      { to: { $regex: search, $options: 'i' } },
    ];
  }

  // ─── Build sort ───
  const sortField = sort.startsWith('-') ? sort.slice(1) : sort;
  const sortOrder = sort.startsWith('-') ? -1 : 1;

  // ─── Execute with pagination ───
  const skip = (Number(page) - 1) * Math.min(Number(limit), 100); // Cap at 100
  const limitNum = Math.min(Number(limit), 100);

  const [data, total] = await Promise.all([
    Call.find(filter)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limitNum)
      .populate('contactId', 'name phone')  // Include contact name
      .lean(),                               // Plain JS objects (faster)
    Call.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data,
    pagination: {
      page: Number(page),
      limit: limitNum,
      total,
      pages: Math.ceil(total / limitNum),
      hasNext: Number(page) < Math.ceil(total / limitNum),
      hasPrev: Number(page) > 1,
    },
  });
}));
```

---

## 3. API Versioning

```
Strategy: URL path versioning (most common, simplest)

/api/v1/calls   → Current version
/api/v2/calls   → New version (breaking changes)

Implementation:
```

```javascript
// src/app.js
app.use('/api/v1/calls', require('./modules/calls/v1/call.routes'));
app.use('/api/v2/calls', require('./modules/calls/v2/call.routes'));

// When to create v2:
// ✅ Changing response shape (removing/renaming fields)
// ✅ Changing request body format
// ✅ Removing an endpoint
// ❌ Adding a new optional field (backward compatible = same version)
// ❌ Adding a new endpoint (backward compatible = same version)
```

---

## 4. Idempotency (Prevent Duplicate Actions)

```
PROBLEM:
  Client sends POST /api/v1/calls (initiate call)
  Network timeout — client doesn't get response
  Client retries — NOW TWO CALLS ARE INITIATED! ❌

SOLUTION: Idempotency Key
  Client sends: POST /api/v1/calls
                Header: Idempotency-Key: "abc-123-unique"
  Server: "Have I seen abc-123? No → process + store result"
  Client retries same request with same key
  Server: "Already processed abc-123 → return stored result"
```

```javascript
// Idempotency middleware
async function idempotent(req, res, next) {
  const key = req.headers['idempotency-key'];
  if (!key) return next();  // Optional — proceed without

  const cacheKey = `idempotent:${req.user.businessId}:${key}`;
  const cached = await redis.get(cacheKey);

  if (cached) {
    // Already processed — return cached response
    const { statusCode, body } = JSON.parse(cached);
    return res.status(statusCode).json(body);
  }

  // Override res.json to cache the response
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    redis.set(cacheKey, JSON.stringify({
      statusCode: res.statusCode,
      body,
    }), 'EX', 86400);  // Cache for 24 hours
    return originalJson(body);
  };

  next();
}

// Usage on POST/PUT routes
router.post('/', authenticate, idempotent, asyncHandler(async (req, res) => {
  const call = await CallService.initiate(req.body);
  res.status(201).json({ success: true, data: call });
}));
```

---

## 5. File Upload (Call Recordings, Documents)

```javascript
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

// Configure multer (memory storage for S3 upload)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,  // 10MB max
  },
  fileFilter: (req, file, cb) => {
    const allowed = ['audio/wav', 'audio/mp3', 'audio/mpeg', 'application/pdf', 'image/jpeg', 'image/png'];
    if (!allowed.includes(file.mimetype)) {
      return cb(new AppError('File type not allowed', 400));
    }
    cb(null, true);
  },
});

// Upload to S3
const s3 = new S3Client({ region: process.env.AWS_REGION });

router.post('/knowledge/upload', authenticate, upload.single('file'), asyncHandler(async (req, res) => {
  const key = `${req.user.businessId}/knowledge/${Date.now()}-${req.file.originalname}`;

  await s3.send(new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  }));

  const doc = await KnowledgeDoc.create({
    businessId: req.user.businessId,
    filename: req.file.originalname,
    s3Key: key,
    size: req.file.size,
    mimeType: req.file.mimetype,
  });

  res.status(201).json({ success: true, data: doc });
}));
```

---

## 6. Webhook Design (Your API as a provider)

```javascript
// Let businesses register webhooks to receive events from Superfone

// Business registers: POST /api/v1/webhooks
// { "url": "https://their-server.com/superfone-events", "events": ["call.completed", "whatsapp.received"] }

async function sendWebhook(businessId, event, data) {
  const webhooks = await Webhook.find({ businessId, events: event });

  for (const wh of webhooks) {
    const payload = { event, data, timestamp: new Date().toISOString() };

    // Sign the payload so receiver can verify it's from us
    const signature = crypto
      .createHmac('sha256', wh.secret)
      .update(JSON.stringify(payload))
      .digest('hex');

    // Send via queue (don't block, retry on failure)
    await webhookQueue.add('deliver', {
      url: wh.url,
      payload,
      headers: { 'X-Superfone-Signature': signature },
    }, {
      attempts: 5,
      backoff: { type: 'exponential', delay: 1000 },
    });
  }
}
```

---

## ⚡ Quick Revision

| Concept | Key Point |
|---------|-----------|
| REST resources | Nouns not verbs; `/calls` not `/getCallList` |
| Multi-tenant | EVERY query filters by `businessId` from JWT |
| Pagination | `page` + `limit` + `total` + `hasNext`; cap limit at 100 |
| Sorting | `-createdAt` = descending; `createdAt` = ascending |
| Versioning | `/api/v1/` in URL; new version only for breaking changes |
| Idempotency | `Idempotency-Key` header; cache response; prevent duplicate actions |
| File upload | multer → memory → S3; validate mimetype + size |
| Webhooks | Sign payload with HMAC; send via queue with retries |
