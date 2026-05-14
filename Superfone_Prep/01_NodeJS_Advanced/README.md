# 01 — Node.js Advanced Internals

> **JD Match:** "Comfortable with Node.js" • "Build scripts or backend systems beyond coursework"

---

## 🎯 What Superfone Will Ask
- How does Node.js handle 10M calls/month on a single thread?
- When should you use Worker Threads vs Cluster vs Child Process?
- How do streams help process large call recordings?
- Explain `process.nextTick()` vs `setImmediate()` vs `setTimeout(0)`.

---

## 1. Node.js Architecture — Why It's Perfect for Telephony

```
┌─────────────────────────────────────────────────────────┐
│                   YOUR NODE.JS CODE                      │
│  • Handle incoming call webhook                          │
│  • Route to AI agent                                     │
│  • Update CRM record                                     │
│  • Send WhatsApp follow-up                               │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────────────┐
│                    libuv + V8                             │
│                                                          │
│  ┌──────────────────┐    ┌─────────────────────────┐    │
│  │   Event Loop     │    │    Thread Pool (4)       │    │
│  │  (single thread) │    │  • File I/O (call logs)  │    │
│  │                  │    │  • DNS lookup             │    │
│  │  Handles:        │    │  • Crypto (JWT signing)   │    │
│  │  • HTTP requests │    │  • zlib (compress data)   │    │
│  │  • WebSocket msgs│    │                           │    │
│  │  • Timer cbs     │    │  UV_THREADPOOL_SIZE=8     │    │
│  │  • I/O callbacks │    │  (increase for heavy I/O) │    │
│  └──────────────────┘    └─────────────────────────┘    │
│                                                          │
│  Network I/O → handled by OS kernel (epoll/kqueue/IOCP) │
│  → No thread needed for TCP/HTTP connections!            │
└──────────────────────────────────────────────────────────┘

WHY NODE.JS FOR SUPERFONE:
  • 10M calls = mostly I/O (network, DB, APIs) → Node excels
  • Event-driven = natural fit for telephony events
  • Single language for API + WebSocket + webhooks
```

---

## 2. Event Loop — Deep Dive (Interview Gold)

```
Each iteration of the event loop ("tick"):

┌─→ timers ──────────────────┐  setTimeout, setInterval
│                             │
│   pending callbacks ────────┤  System-level callbacks
│                             │
│   idle, prepare ────────────┤  Internal
│                             │
│   poll ─────────────────────┤  I/O callbacks (incoming call data,
│   │                         │   DB responses, API responses)
│   │  (if empty + no timers  │
│   │   → BLOCK here waiting  │
│   │   for new I/O events)   │
│                             │
│   check ────────────────────┤  setImmediate()
│                             │
│   close callbacks ──────────┤  socket.on('close')
│                             │
└─────────────────────────────┘

BETWEEN EACH PHASE:
  → Drain ALL microtasks (Promise.then, process.nextTick)
  → process.nextTick runs BEFORE Promise.then
```

### 💻 Classic Interview Question

```javascript
console.log('1 - sync');

setTimeout(() => console.log('2 - setTimeout'), 0);
setImmediate(() => console.log('3 - setImmediate'));

Promise.resolve().then(() => console.log('4 - promise'));
process.nextTick(() => console.log('5 - nextTick'));

console.log('6 - sync');

// Output:
// 1 - sync
// 6 - sync
// 5 - nextTick     ← highest priority microtask
// 4 - promise      ← microtask (after nextTick)
// 2 - setTimeout   ← timer phase (order with setImmediate varies in main module)
// 3 - setImmediate ← check phase
```

---

## 3. Streams — Processing Call Recordings

At Superfone, you'll process large audio files, call logs, and data exports. Streams are essential.

```
Without streams:
  10MB call recording → Load ALL into RAM → Process → Write
  1000 concurrent recordings = 10GB RAM! ❌

With streams:
  10MB call recording → Process 64KB chunks → Write as you go
  1000 concurrent recordings = ~64MB RAM ✅
```

### 💻 Code — Real Superfone Scenarios

```javascript
const fs = require('fs');
const { Transform } = require('stream');
const { pipeline } = require('stream/promises');
const zlib = require('zlib');

// ─── Scenario 1: Stream call logs to client ───
app.get('/api/calls/export', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename=calls.json');
  
  const cursor = db.collection('call_logs')
    .find({ businessId: req.user.businessId })
    .stream();
  
  cursor.pipe(res);  // Stream directly — no memory spike!
});

// ─── Scenario 2: Process call transcription in chunks ───
const transcriptionProcessor = new Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    // Process each chunk of transcription
    const processed = {
      ...chunk,
      sentiment: analyzeSentiment(chunk.text),
      keywords: extractKeywords(chunk.text),
    };
    callback(null, processed);
  }
});

// ─── Scenario 3: Compress and upload call recording ───
async function compressAndUpload(filePath) {
  await pipeline(
    fs.createReadStream(filePath),
    zlib.createGzip(),
    fs.createWriteStream(`${filePath}.gz`)
  );
  // Then upload .gz to S3
}
```

---

## 4. Worker Threads vs Cluster vs Child Process

```
┌──────────────────────────────────────────────────────────┐
│                   WHEN TO USE WHAT                        │
├────────────────┬─────────────────────────────────────────┤
│ Worker Threads │ CPU-heavy in same process               │
│                │ • Audio transcoding                     │
│                │ • AI inference (if running locally)      │
│                │ • Heavy JSON parsing                     │
│                │ Shares memory (SharedArrayBuffer)        │
├────────────────┼─────────────────────────────────────────┤
│ Cluster        │ Scale HTTP server across CPU cores       │
│                │ • Multiple Express instances             │
│                │ • Each worker handles requests           │
│                │ • Load balanced by OS                    │
├────────────────┼─────────────────────────────────────────┤
│ Child Process  │ Run separate programs                   │
│                │ • exec('ffmpeg ...')                     │
│                │ • spawn('python', ['ai_script.py'])     │
│                │ Separate memory, own PID                │
└────────────────┴─────────────────────────────────────────┘
```

### 💻 Worker Thread — Offload CPU Work

```javascript
// main.js — Don't block the event loop!
const { Worker } = require('worker_threads');

function analyzeCallAudio(audioPath) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./audio-worker.js', {
      workerData: { audioPath }
    });
    worker.on('message', resolve);    // Result from worker
    worker.on('error', reject);
  });
}

// audio-worker.js
const { parentPort, workerData } = require('worker_threads');

// CPU-heavy work runs here — doesn't block main event loop!
const result = processAudio(workerData.audioPath);
parentPort.postMessage(result);
```

### 💻 Cluster — Scale Express Across Cores

```javascript
const cluster = require('cluster');
const os = require('os');

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  console.log(`Primary ${process.pid} forking ${numCPUs} workers`);
  
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died, restarting...`);
    cluster.fork();  // Auto-restart dead workers
  });
} else {
  // Each worker runs Express
  const app = require('./app');
  app.listen(3000, () => {
    console.log(`Worker ${process.pid} ready`);
  });
}
```

---

## 5. Error Handling — Production Patterns

```javascript
// ─── Graceful shutdown (CRITICAL for telephony!) ───
// If server crashes mid-call, you need graceful cleanup

let server;
const activeConnections = new Set();

server = app.listen(3000);

server.on('connection', (conn) => {
  activeConnections.add(conn);
  conn.on('close', () => activeConnections.delete(conn));
});

async function gracefulShutdown(signal) {
  console.log(`${signal} received. Graceful shutdown...`);
  
  // 1. Stop accepting new connections
  server.close();
  
  // 2. Close active connections gracefully
  for (const conn of activeConnections) {
    conn.end();  // Send FIN packet
  }
  
  // 3. Close DB connections
  await mongoose.connection.close();
  await redis.quit();
  
  // 4. Flush logs
  await logger.flush();
  
  console.log('Shutdown complete');
  process.exit(0);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// ─── Catch everything ───
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION:', err);
  gracefulShutdown('unhandledRejection');
});

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
  gracefulShutdown('uncaughtException');
});
```

---

## ⚡ Quick Revision

| Concept | Superfone Context |
|---------|-------------------|
| Event loop | Handles 10K+ concurrent call webhooks without blocking |
| Streams | Process call recordings, export logs without memory spikes |
| Worker threads | Offload CPU work (audio processing, AI inference) |
| Cluster | Scale Express across all CPU cores for high throughput |
| Graceful shutdown | Don't drop active calls when deploying new code |
| `process.nextTick` | Highest priority microtask; runs before I/O callbacks |
| Thread pool size | `UV_THREADPOOL_SIZE=8` for heavy file I/O workloads |
