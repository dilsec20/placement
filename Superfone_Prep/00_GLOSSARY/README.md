# 📖 Glossary — Every Term, Library & Concept Explained

> If they ask "What is X?", here's exactly what to say.

---

## 🔧 Libraries & Packages Used

### express
**What:** Node.js web framework for building APIs and servers.
**What to say:** "Express is a minimal, unopinionated web framework for Node.js. It provides routing, middleware support, and HTTP utilities. It's the most popular Node.js framework."
```javascript
const express = require('express');
const app = express();
app.listen(3000);
```

### helmet
**What:** Adds 15+ security HTTP headers to your Express app.
**What to say:** "Helmet sets security headers like `X-Content-Type-Options`, `Strict-Transport-Security`, and `X-Frame-Options` to protect against XSS, clickjacking, and MIME sniffing attacks. I add it as the first middleware in every Express app."
```javascript
app.use(helmet()); // One line = 15+ security headers
```

### cors
**What:** Cross-Origin Resource Sharing middleware.
**What to say:** "CORS is a browser security mechanism. By default, browsers block requests from one origin (like localhost:3000) to another (localhost:5000). The `cors` package adds `Access-Control-Allow-Origin` headers so our frontend can talk to our backend."
```javascript
app.use(cors({ origin: 'https://myapp.com', credentials: true }));
```

### bcrypt
**What:** Library for hashing passwords.
**What to say:** "bcrypt hashes passwords with a random salt, making them irreversible. Even if the database is leaked, attackers can't get the original passwords. The salt rounds (12) control how slow the hashing is — slower = more secure against brute force."
```javascript
const hashed = await bcrypt.hash('password123', 12);   // Hash
const match = await bcrypt.compare('password123', hashed); // Verify
```

### jsonwebtoken (jwt)
**What:** Library to create and verify JSON Web Tokens.
**What to say:** "JWT is a signed token that contains user data (userId, role). The server creates it on login, the client sends it with every request. The server verifies the signature to authenticate — no database lookup needed per request."
```javascript
const token = jwt.sign({ userId: 1 }, SECRET, { expiresIn: '15m' });
const decoded = jwt.verify(token, SECRET); // { userId: 1 }
```

### mongoose
**What:** MongoDB ODM (Object Document Mapper) for Node.js.
**What to say:** "Mongoose provides a schema-based solution for modeling MongoDB data. It gives us validation, type casting, query building, and hooks. It's like an ORM but for MongoDB's document model."
```javascript
const userSchema = new Schema({ name: String, email: { type: String, unique: true } });
const User = mongoose.model('User', userSchema);
```

### joi
**What:** Input validation library.
**What to say:** "Joi validates request bodies against a schema I define. It checks types, formats, required fields, min/max lengths, and custom patterns. It's essential for API security — never trust client input."
```javascript
const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
const { error, value } = schema.validate(req.body);
```

### bull
**What:** Redis-based job/message queue for Node.js.
**What to say:** "Bull is a queue system that lets me process tasks asynchronously. Instead of making the user wait for slow operations like sending emails or transcribing audio, I push a job to the queue and a worker processes it in the background. It supports retries, delays, priorities, and concurrency."
```javascript
const queue = new Queue('email-sending', REDIS_URL);
queue.add('send', { to: 'user@test.com', body: 'Hello' }); // Producer
queue.process('send', async (job) => { /* send email */ });  // Consumer
```

### ioredis
**What:** Redis client for Node.js.
**What to say:** "Redis is an in-memory key-value store. I use it for caching (avoid hitting DB), session storage, rate limiting counters, pub/sub messaging, and as the backend for Bull queues. ioredis is the most popular Node.js Redis client."
```javascript
const redis = new Redis(process.env.REDIS_URL);
await redis.set('key', 'value', 'EX', 3600); // Set with 1hr expiry
const val = await redis.get('key');
```

### pino
**What:** Fast JSON logger for Node.js.
**What to say:** "Pino is a structured logger that outputs JSON logs. Unlike console.log, structured logs can be searched, filtered, and analyzed by log management tools like ELK Stack or Datadog. It's 5x faster than Winston."
```javascript
const logger = pino({ level: 'info' });
logger.info({ userId: 1, action: 'login' }, 'User logged in');
// Output: {"level":"info","userId":1,"action":"login","msg":"User logged in"}
```

### prom-client
**What:** Prometheus metrics client for Node.js.
**What to say:** "prom-client exposes application metrics (request count, latency, queue depth) at a `/metrics` endpoint. Prometheus scrapes this endpoint, and Grafana visualizes it. This is how we monitor API performance and set up alerts."

### multer
**What:** Middleware for handling file uploads.
**What to say:** "Multer parses `multipart/form-data` requests (file uploads). I configure it with file size limits, allowed MIME types, and storage options. For cloud storage, I use memory storage and then upload the buffer to S3."

### socket.io
**What:** Real-time bidirectional communication library.
**What to say:** "Socket.IO enables real-time communication between server and browser using WebSockets. I use it for live dashboards, real-time call status updates, and agent chat. It supports rooms (send events to specific businesses), auto-reconnection, and can scale across multiple servers using a Redis adapter."

### express-mongo-sanitize (mongoSanitize)
**What:** Prevents NoSQL injection attacks.
**What to say:** "It strips out `$` and `.` characters from request body, query, and params. Without this, an attacker could send `{ email: { "$gt": "" } }` which would match any user in MongoDB. This is the NoSQL equivalent of SQL injection."

### compression
**What:** Gzip compression middleware.
**What to say:** "It compresses HTTP responses using gzip, reducing payload size by 60-80%. This means faster API responses and less bandwidth. I use it on all production APIs."

---

## 📝 Technical Terms

### Middleware
**What to say:** "A middleware is a function that sits between the request and the response. It has access to `req`, `res`, and `next()`. Each middleware can modify the request, end the response, or pass to the next middleware. Examples: authentication, logging, validation, rate limiting."

### RAII / Graceful Shutdown
**What to say:** "Graceful shutdown means when the server receives a kill signal (SIGTERM during deployment), it stops accepting new requests, finishes processing active ones, closes database connections, and then exits cleanly. This prevents dropping active calls mid-conversation."

### Idempotency
**What to say:** "An operation is idempotent if doing it once or doing it 100 times produces the same result. GET, PUT, DELETE are idempotent. POST is not. For POST requests, I use an Idempotency-Key header — the server caches the result and returns it on retry, preventing duplicate actions like initiating two calls."

### Multi-tenant
**What to say:** "Multiple businesses (tenants) share the same database and application. Every query MUST be filtered by `businessId` to prevent data leaks. I add `businessId` from the JWT token in the auth middleware, so routes automatically scope to the correct business."

### Circuit Breaker
**What to say:** "A pattern to prevent cascading failures. If an external service (like OpenAI API) fails repeatedly, the circuit breaker 'opens' and immediately rejects requests for a cooldown period instead of waiting for timeouts. After cooldown, it tests one request — if it succeeds, the circuit 'closes' and normal operation resumes."

### Fan-out
**What to say:** "One event triggers multiple independent actions. When a call completes, I fan-out to: transcription worker, AI summary worker, CRM update worker, and WhatsApp follow-up worker. Each processes independently via a message queue."

### Dead Letter Queue (DLQ)
**What to say:** "A separate queue where failed messages go after exhausting all retry attempts. Instead of losing the message, I can inspect it later, fix the bug, and reprocess. It's essential for reliability in distributed systems."

### Webhook
**What to say:** "A webhook is an HTTP callback. Instead of polling an external service for updates, the service calls YOUR endpoint when something happens. For example, when a call ends, the telephony provider sends a POST request to our `/webhooks/telephony/events` endpoint with call details."

### HMAC (Hash-based Message Authentication Code)
**What to say:** "HMAC is used to verify that a webhook payload hasn't been tampered with. The sender creates a hash of the payload using a shared secret, attaches it as a header. The receiver recreates the hash and compares — if they match, the payload is authentic and unmodified."

### Embedding (AI)
**What to say:** "An embedding converts text into a high-dimensional number vector (like 1536 numbers). Similar texts have similar vectors. This enables semantic search — instead of keyword matching, we find documents that MEAN similar things. Used in RAG to find relevant business knowledge."

### RAG (Retrieval-Augmented Generation)
**What to say:** "RAG is a technique where we retrieve relevant documents from a vector database and feed them as context to the LLM. This prevents hallucination because the AI answers based on real business data, not its training data. It's like giving the AI a cheat sheet before answering."

### Vector Database
**What to say:** "A database optimized for storing and searching vectors (embeddings). When a customer asks a question, I convert it to a vector and search for the most similar vectors in the database — those are the most relevant documents. Examples: Pinecone, Weaviate, pgvector."

### SIP (Session Initiation Protocol)
**What to say:** "SIP is the signaling protocol for VoIP calls. It handles setting up, modifying, and tearing down calls — like dialing and hanging up. The actual audio travels over RTP (Real-time Transport Protocol). SIP is to phone calls what HTTP is to web pages."

### WebRTC
**What to say:** "Web Real-Time Communication — a browser API for peer-to-peer audio/video calls without plugins. It needs a signaling server (WebSocket) to exchange connection info, but the actual media travels directly between peers."

### Connection Pooling
**What to say:** "Instead of creating a new database connection for every request (expensive, ~50ms each), I maintain a pool of reusable connections. A request borrows a connection, uses it, and returns it. This reduces latency and prevents exhausting database connection limits."

### `.lean()`
**What to say:** "A Mongoose method that returns plain JavaScript objects instead of full Mongoose documents. It's much faster and uses less memory because it skips hydration (adding methods like `.save()`, `.populate()`). I use it for read-only queries."

### `asyncHandler`
**What to say:** "A wrapper function that catches errors from async route handlers and passes them to Express's error middleware. Without it, I'd need try-catch in every single route. It's a DRY pattern for error handling."
```javascript
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
```

### Operational vs Programming Error
**What to say:** "Operational errors are expected failures — user not found, invalid input, token expired. I handle these gracefully with proper status codes. Programming errors are bugs — undefined variable, null pointer. These get a generic 500 response, and I log the full stack trace for debugging."

### Token Rotation
**What to say:** "Every time a refresh token is used, I issue a NEW refresh token and delete the old one. If an attacker steals an old token and tries to use it, I detect the reuse (token not in DB) and revoke ALL tokens for that user — forcing re-login. This limits the damage of token theft."

---

## ⚡ One-Line Definitions (Quick Fire Round)

| Term | One-liner |
|------|-----------|
| `next()` | Passes control to the next middleware in the chain |
| `req.params` | URL parameters: `/users/:id` → `req.params.id` |
| `req.query` | Query string: `?page=2` → `req.query.page` |
| `req.body` | POST/PUT body (parsed by `express.json()`) |
| `res.status(201)` | Set HTTP status code (201 = Created) |
| `.populate()` | Mongoose: replace ObjectId with actual document data (like JOIN) |
| `.aggregate()` | Mongoose: run MongoDB aggregation pipeline (group, match, sort) |
| `process.env` | Access environment variables from `.env` file |
| `SIGTERM` | Kill signal sent during deployment — trigger graceful shutdown |
| `TTL` | Time To Live — how long cached data survives before expiry |
| `p99 latency` | 99th percentile — 99% of requests are faster than this |
| `ObjectId` | MongoDB's auto-generated unique identifier (12-byte hex) |
| `$gte / $lte` | MongoDB: greater than or equal / less than or equal |
| `$regex` | MongoDB: pattern matching (like SQL's LIKE) |
| `upsert` | Update if exists, insert if doesn't (update + insert) |
| `CORS preflight` | Browser sends OPTIONS request before actual request to check permissions |
| `Bearer token` | Auth header format: `Authorization: Bearer eyJhbGci...` |
| `salt` | Random data added to password before hashing (prevents rainbow tables) |
| `Base64` | Encoding (not encryption!) that converts binary to ASCII text |
| `HMAC-SHA256` | Hash function used to sign JWTs and verify webhooks |
| `Pub/Sub` | Publish-Subscribe: sender broadcasts, all subscribers receive |
| `Queue` | Message queue: sender publishes, ONE consumer processes |
