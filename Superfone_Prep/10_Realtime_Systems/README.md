# 10 — Real-Time Communication

> **JD Match:** "Communication infrastructure" • "Complex workflows"

---

## 🎯 What Superfone Will Ask
- How do you push real-time call status updates to a dashboard?
- WebSocket vs SSE vs polling — when to use which?
- How do you scale WebSockets across multiple servers?

---

## 1. Real-Time Architecture at Superfone

```
Call status changes → Redis Pub/Sub → WebSocket Server → Browser Dashboard

┌──────────┐  publish   ┌───────────┐  subscribe  ┌──────────────┐
│ Call      │───────────→│  REDIS    │────────────→│ WebSocket    │
│ Service   │            │  Pub/Sub  │             │ Server       │
└──────────┘            └───────────┘             └──────┬───────┘
                                                         │
                                                    ┌────┴────┐
                                                    │Dashboard│
                                                    │(browser)│
                                                    └─────────┘
```

---

## 2. WebSocket Server

```javascript
const { Server } = require('socket.io');
const Redis = require('ioredis');
const jwt = require('jsonwebtoken');

const io = new Server(server, { cors: { origin: '*' } });
const subscriber = new Redis(process.env.REDIS_URL);

// ─── Auth middleware for WebSocket ───
io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error('Authentication required'));
  try {
    socket.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    next(new Error('Invalid token'));
  }
});

// ─── Connection handler ───
io.on('connection', (socket) => {
  const { businessId } = socket.user;
  socket.join(`business:${businessId}`);
  console.log(`Agent connected: ${socket.user.userId}`);

  socket.on('disconnect', () => {
    console.log(`Agent disconnected: ${socket.user.userId}`);
  });
});

// ─── Subscribe to Redis events ───
subscriber.subscribe('call:status', 'whatsapp:incoming', 'ai:response');

subscriber.on('message', (channel, message) => {
  const data = JSON.parse(message);
  // Broadcast to the specific business room
  io.to(`business:${data.businessId}`).emit(channel, data);
});

// ─── Scaling across multiple servers ───
// Use Socket.IO Redis adapter
const { createAdapter } = require('@socket.io/redis-adapter');
const pubClient = new Redis(process.env.REDIS_URL);
const subClient = pubClient.duplicate();
io.adapter(createAdapter(pubClient, subClient));
// Now WebSocket events sync across all server instances!
```

---

## 3. Server-Sent Events (SSE) — Simpler Alternative

```javascript
// For one-way server→client updates (no client messages needed)
app.get('/api/v1/events/stream', authenticate, (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  const businessId = req.user.businessId;

  // Send heartbeat every 30s (keeps connection alive)
  const heartbeat = setInterval(() => {
    res.write(': heartbeat\n\n');
  }, 30000);

  // Subscribe to business events
  const subscriber = new Redis(process.env.REDIS_URL);
  subscriber.subscribe(`events:${businessId}`);

  subscriber.on('message', (channel, message) => {
    res.write(`data: ${message}\n\n`);
  });

  req.on('close', () => {
    clearInterval(heartbeat);
    subscriber.unsubscribe();
    subscriber.quit();
  });
});

// Client-side:
// const es = new EventSource('/api/v1/events/stream');
// es.onmessage = (event) => updateDashboard(JSON.parse(event.data));
```

---

## 4. Comparison

| Feature | WebSocket | SSE | Polling |
|---------|-----------|-----|---------|
| Direction | Bidirectional | Server→Client | Client→Server |
| Protocol | ws:// | HTTP | HTTP |
| Reconnect | Manual | Auto | N/A |
| Use at Superfone | Agent chat, live call control | Dashboard updates | Fallback |

---

## ⚡ Quick Revision

| Concept | Key Point |
|---------|-----------|
| WebSocket | Bidirectional; Socket.IO for rooms + auth + reconnect |
| Redis Pub/Sub | Broadcast events across multiple server instances |
| Socket.IO adapter | Redis adapter syncs WebSocket events across scaled servers |
| SSE | Simpler one-way streaming; auto-reconnect; uses HTTP |
| Rooms | `socket.join('business:123')` — send events to specific business |
