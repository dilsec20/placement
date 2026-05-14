# 09 — Observability & Monitoring

> **JD Match:** "Track where calls go wrong, where agents hallucinate, where latency spikes"

---

## 🎯 What Superfone Will Ask
- How do you debug a production issue where calls are dropping?
- What metrics would you track for an AI agent?
- How do you set up alerting for latency spikes?

---

## 1. Three Pillars

```
LOGS    → "What happened" (structured JSON, request IDs)
METRICS → "How much / how fast" (counters, histograms, gauges)
TRACES  → "Where did time go" (follow a request across services)
```

---

## 2. Structured Logging

```javascript
const pino = require('pino');

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  base: { service: 'superfone-api', env: process.env.NODE_ENV },
});

// Request logger middleware
function requestLogger(req, res, next) {
  const start = Date.now();
  const requestId = req.headers['x-request-id'] || crypto.randomUUID();
  req.requestId = requestId;
  req.log = logger.child({ requestId, businessId: req.user?.businessId });

  res.on('finish', () => {
    const duration = Date.now() - start;
    const data = {
      method: req.method, url: req.originalUrl,
      statusCode: res.statusCode, duration,
    };
    if (res.statusCode >= 500) req.log.error(data, 'Request failed');
    else if (duration > 2000) req.log.warn(data, 'Slow request');
    else req.log.info(data, 'Request completed');
  });
  next();
}
```

---

## 3. Key Metrics for Superfone

```javascript
const client = require('prom-client');
client.collectDefaultMetrics();

// Call metrics
const callsTotal = new client.Counter({
  name: 'superfone_calls_total',
  help: 'Total calls',
  labelNames: ['direction', 'status', 'handled_by'],
});

const callDuration = new client.Histogram({
  name: 'superfone_call_duration_seconds',
  help: 'Call duration',
  labelNames: ['handled_by'],
  buckets: [10, 30, 60, 120, 300, 600],
});

// AI metrics
const aiResponseTime = new client.Histogram({
  name: 'superfone_ai_response_seconds',
  help: 'AI response latency',
  labelNames: ['model', 'agent_type'],
  buckets: [0.5, 1, 2, 3, 5, 10],
});

const aiHallucinations = new client.Counter({
  name: 'superfone_ai_hallucinations_total',
  help: 'Detected AI hallucinations',
  labelNames: ['agent_type'],
});

// API metrics
const httpDuration = new client.Histogram({
  name: 'superfone_http_duration_seconds',
  help: 'HTTP request duration',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5],
});

// Queue metrics
const queueDepth = new client.Gauge({
  name: 'superfone_queue_depth',
  help: 'Jobs waiting in queue',
  labelNames: ['queue_name'],
});

// Expose metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});
```

---

## 4. Distributed Tracing

```
A single "call completed" event touches MANY services:

Request ID: abc-123
  ├─ API Server (50ms)
  │   ├─ Auth middleware (5ms)
  │   ├─ DB query (15ms)
  │   └─ Queue publish (3ms)
  ├─ Transcription Worker (8000ms)  ← BOTTLENECK
  │   ├─ Download recording (500ms)
  │   └─ Deepgram API (7500ms)
  ├─ AI Summary Worker (3000ms)
  │   └─ OpenAI API (2800ms)
  └─ WhatsApp Worker (1200ms)
      └─ Meta API (1000ms)

Without tracing: "Why is it slow?" 🤷
With tracing: "Deepgram takes 7.5s — cache or switch provider"
```

---

## 5. Alerting Rules

```
CRITICAL (page on-call):
  • Error rate > 5% for 5 minutes
  • Call failure rate > 10%
  • API latency p99 > 5 seconds
  • Queue depth > 1000
  • DB connection pool exhausted

WARNING (Slack):
  • AI response time > 3 seconds
  • AI hallucination detected
  • Memory usage > 85%
  • Rate limit hits spiking

INFO (dashboard):
  • Daily call volume
  • AI vs human handling ratio
  • Customer sentiment trends
```

---

## ⚡ Quick Revision

| Concept | Key Point |
|---------|-----------|
| Logs | Structured JSON; include requestId + businessId; pino/winston |
| Metrics | Counter (total), Histogram (latency), Gauge (current state) |
| Traces | Follow request across services; find bottlenecks |
| Request ID | UUID per request; propagate through all services |
| Prometheus | Pull-based `/metrics` endpoint; Grafana for dashboards |
| Alerting | Error rate, latency p99, queue depth → page / Slack / dashboard |
