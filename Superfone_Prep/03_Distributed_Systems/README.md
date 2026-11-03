# 03 — Distributed Systems

> **JD Match:** "Building distributed systems" • "Handle massive traffic" • "10M+ calls monthly"

---

## 🎯 What Superfone Will Ask
- How would you handle 10M calls/month? What happens when one server goes down?
- Explain message queues. When would you use Kafka vs RabbitMQ vs Redis?
- How do you ensure a WhatsApp message is sent exactly once?
- How would you design the call routing system?

---

## 1. Event-Driven Architecture

```
AT SUPERFONE — Everything is an event:

┌──────────┐     ┌─────────────────────────────┐     ┌──────────────┐
│ Incoming │────→│      MESSAGE QUEUE           │────→│   Workers    │
│  Call    │     │  (Redis / RabbitMQ / Kafka)  │     │              │
└──────────┘     └─────────────────────────────┘     │ • AI Agent   │
                           │                          │ • CRM Update │
┌──────────┐               │                          │ • WhatsApp   │
│ WhatsApp │────→──────────┤                          │ • Analytics  │
│  Message │               │                          │ • Recording  │
└──────────┘               │                          └──────────────┘
                           │
┌──────────┐               │
│ CRM      │────→──────────┘
│  Action  │
└──────────┘

WHY: Decouple producers from consumers
  • Call service doesn't wait for AI, CRM, WhatsApp
  • Each worker scales independently
  • If WhatsApp worker crashes, calls still work
  • Messages persist in queue until processed
```

---

## 2. Message Queue Patterns

### 💻 Bull Queue (Redis-based — most practical for Node.js)

```javascript
// src/services/queue.service.js
const Queue = require('bull');

// Create queues for different workflows
const callQueue = new Queue('call-processing', process.env.REDIS_URL, {
  defaultJobOptions: {
    removeOnComplete: 100,   // Keep last 100 completed jobs
    removeOnFail: 500,       // Keep last 500 failed jobs
    attempts: 3,             // Retry 3 times
    backoff: {
      type: 'exponential',   // 1s, 2s, 4s...
      delay: 1000,
    },
  },
});

const whatsappQueue = new Queue('whatsapp-messages', process.env.REDIS_URL);
const aiQueue = new Queue('ai-processing', process.env.REDIS_URL);

// ─── PRODUCER: Publish events ───
async function onCallCompleted(callId, recording) {
  // Fan-out: one event triggers multiple async tasks
  await Promise.all([
    callQueue.add('transcribe', { callId, recording }, { priority: 1 }),
    callQueue.add('analyze-sentiment', { callId }, { priority: 2 }),
    whatsappQueue.add('send-followup', { callId }, { delay: 300000 }), // 5min delay
    aiQueue.add('update-knowledge', { callId }),
  ]);
}

// ─── CONSUMER: Process events ───
callQueue.process('transcribe', 5, async (job) => {  // 5 concurrent workers
  const { callId, recording } = job.data;
  
  console.log(`Transcribing call ${callId}...`);
  const transcript = await transcribeAudio(recording);
  
  await db.calls.updateOne(
    { _id: callId },
    { $set: { transcript, transcribedAt: new Date() } }
  );
  
  job.progress(100);  // Report progress
  return { status: 'transcribed', wordCount: transcript.split(' ').length };
});

whatsappQueue.process('send-followup', async (job) => {
  const { callId } = job.data;
  const call = await db.calls.findById(callId).populate('business');
  
  await WhatsAppService.sendTemplate(call.customerPhone, 'call_followup', {
    businessName: call.business.name,
    callSummary: call.aiSummary,
  });
});

// ─── MONITORING ───
callQueue.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed:`, err.message);
  // Alert if critical job fails after all retries
  if (job.attemptsMade >= job.opts.attempts) {
    alertOps(`Call transcription failed permanently: ${job.data.callId}`);
  }
});

module.exports = { callQueue, whatsappQueue, aiQueue, onCallCompleted };
```

---

## 3. Pub/Sub with Redis

```
DIFFERENCE: Queue vs Pub/Sub

Queue (Bull/RabbitMQ):
  Producer → [Message] → ONE Consumer processes it
  Use for: Tasks that must happen EXACTLY ONCE
  Example: Send WhatsApp message, process payment

Pub/Sub (Redis):
  Publisher → [Message] → ALL Subscribers receive it
  Use for: Notifications, real-time updates, broadcasting
  Example: "Call status changed" → update dashboard + update CRM + log
```

```javascript
// src/services/pubsub.js
const Redis = require('ioredis');
const publisher = new Redis(process.env.REDIS_URL);
const subscriber = new Redis(process.env.REDIS_URL);

// ─── Publish events ───
async function publish(channel, data) {
  await publisher.publish(channel, JSON.stringify({
    ...data,
    timestamp: Date.now(),
  }));
}

// ─── Subscribe to events ───
subscriber.subscribe('call:status', 'call:ai-response', 'whatsapp:incoming');

subscriber.on('message', (channel, message) => {
  const data = JSON.parse(message);
  
  switch (channel) {
    case 'call:status':
      // Push to WebSocket clients (real-time dashboard)
      broadcastToWebSocket(data.businessId, 'call-update', data);
      break;
    case 'call:ai-response':
      // AI agent generated a response during call
      TelephonyService.playAudio(data.callId, data.audioUrl);
      break;
    case 'whatsapp:incoming':
      // New WhatsApp message → route to AI or human
      AIRouter.handleIncoming(data);
      break;
  }
});

module.exports = { publish };
```

---

## 4. Exactly-Once Processing (Idempotency)

```
PROBLEM: Network failure after processing but BEFORE acknowledging
  → Queue retries → Message processed TWICE!
  → User gets 2 WhatsApp messages 😱

SOLUTION: Idempotency key

┌──────────┐     ┌──────────┐     ┌──────────┐
│  Queue   │────→│ Consumer │────→│ Database │
│          │     │          │     │          │
│ msg: {   │     │ Check:   │     │ Store:   │
│  id: abc │     │ "Already │     │ {abc:    │
│  data:.. │     │  done?"  │     │  done}   │
│ }        │     │          │     │          │
└──────────┘     └──────────┘     └──────────┘
```

```javascript
// Idempotent job processor
async function processIdempotent(jobId, processor) {
  // Check if already processed
  const existing = await redis.get(`processed:${jobId}`);
  if (existing) {
    console.log(`Job ${jobId} already processed, skipping`);
    return JSON.parse(existing);
  }

  // Process
  const result = await processor();

  // Mark as processed (with TTL for cleanup)
  await redis.set(`processed:${jobId}`, JSON.stringify(result), 'EX', 86400); // 24hr

  return result;
}

// Usage in WhatsApp worker
whatsappQueue.process('send-followup', async (job) => {
  return processIdempotent(job.id, async () => {
    await WhatsAppService.send(job.data.phone, job.data.message);
    return { sent: true };
  });
});
```

---

## 5. Circuit Breaker Pattern

```
When an external service (AI API, telephony provider) is down,
don't keep hitting it — you'll make things worse!

CLOSED → (calls succeed) → CLOSED
CLOSED → (failures > threshold) → OPEN
OPEN → (reject all calls immediately for cooldown) → HALF-OPEN
HALF-OPEN → (test with one call) → CLOSED (if success) / OPEN (if fail)
```

```javascript
class CircuitBreaker {
  constructor(options = {}) {
    this.failureThreshold = options.failureThreshold || 5;
    this.cooldownMs = options.cooldownMs || 30000;  // 30s
    this.state = 'CLOSED';
    this.failures = 0;
    this.lastFailureTime = null;
  }

  async execute(fn) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.cooldownMs) {
        this.state = 'HALF-OPEN';
      } else {
        throw new Error('Circuit breaker OPEN — service unavailable');
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (err) {
      this.onFailure();
      throw err;
    }
  }

  onSuccess() {
    this.failures = 0;
    this.state = 'CLOSED';
  }

  onFailure() {
    this.failures++;
    this.lastFailureTime = Date.now();
    if (this.failures >= this.failureThreshold) {
      this.state = 'OPEN';
      console.warn('Circuit breaker OPENED — too many failures');
    }
  }
}

// Usage
const aiBreaker = new CircuitBreaker({ failureThreshold: 3, cooldownMs: 60000 });

async function getAIResponse(prompt) {
  return aiBreaker.execute(async () => {
    return await openai.chat.completions.create({ model: 'gpt-4', messages: [{ role: 'user', content: prompt }] });
  });
}
```

---

## ⚡ Quick Revision

| Concept | Superfone Context |
|---------|-------------------|
| Event-driven arch | Call event → fan-out to AI, CRM, WhatsApp workers independently |
| Bull Queue | Redis-based; retries, delays, priorities; ideal for Node.js |
| Queue vs Pub/Sub | Queue = one consumer; Pub/Sub = broadcast to all |
| Idempotency | Prevent duplicate WhatsApp messages on retry |
| Circuit breaker | Don't overload failing AI API; fail fast, recover gracefully |
| Dead letter queue | Failed messages go to separate queue for investigation |
