# 02 — Node.js & Express (FAANG Interview Guide)

## 🎯 What They Ask
- How does Node.js handle concurrent requests if it's single-threaded?
- What is the difference between `process.nextTick()` and `setImmediate()`?
- Explain middleware in Express. How does the middleware chain work?
- How do you connect to a database in Node.js?
- How do you handle errors in Express?
- What are streams? When would you use them?
- How do you scale a Node.js application?

---

## 1. Node.js Architecture

### Theory

```
┌─────────────────────────────────────────────────────┐
│                   YOUR CODE                         │
│               (Single JS Thread)                    │
└───────────────────┬─────────────────────────────────┘
                    │
┌───────────────────┴─────────────────────────────────┐
│                NODE.JS RUNTIME                       │
│  ┌─────────────┐  ┌──────────────────────────────┐  │
│  │  V8 Engine  │  │        libuv                  │  │
│  │ (executes   │  │  ┌────────────────────────┐   │  │
│  │  your JS)   │  │  │    Thread Pool (4)     │   │  │
│  │             │  │  │  - File I/O            │   │  │
│  │             │  │  │  - DNS lookup          │   │  │
│  │             │  │  │  - Crypto              │   │  │
│  │             │  │  │  - Compression         │   │  │
│  └─────────────┘  │  └────────────────────────┘   │  │
│                   │  ┌────────────────────────┐   │  │
│                   │  │  Event Loop            │   │  │
│                   │  │  (orchestrates async)  │   │  │
│                   │  └────────────────────────┘   │  │
│                   └──────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
                    │
┌───────────────────┴─────────────────────────────────┐
│              OS KERNEL                               │
│   epoll (Linux) / kqueue (Mac) / IOCP (Windows)    │
│   → Handles network I/O natively (no thread needed) │
└─────────────────────────────────────────────────────┘
```

**Key interview answer:** "Node.js is single-threaded for JavaScript execution, but uses libuv's thread pool for blocking operations (file I/O, crypto) and the OS kernel for network I/O. This is why it handles thousands of concurrent connections efficiently — network I/O doesn't need threads."

### Event Loop Phases

```
   ┌───────────────────────────┐
┌─>│        timers              │  ← setTimeout, setInterval
│  └───────────┬───────────────┘
│  ┌───────────┴───────────────┐
│  │     pending callbacks     │  ← System-level callbacks
│  └───────────┬───────────────┘
│  ┌───────────┴───────────────┐
│  │        idle, prepare      │  ← Internal use
│  └───────────┬───────────────┘
│  ┌───────────┴───────────────┐
│  │          poll             │  ← I/O callbacks (incoming data, etc.)
│  └───────────┬───────────────┘
│  ┌───────────┴───────────────┐
│  │         check             │  ← setImmediate()
│  └───────────┬───────────────┘
│  ┌───────────┴───────────────┐
│  │     close callbacks       │  ← socket.on('close'), etc.
│  └───────────┬───────────────┘
└──────────────┘
```

**`process.nextTick()` vs `setImmediate()`:**
- `process.nextTick()` runs BEFORE the event loop continues (microtask, highest priority)
- `setImmediate()` runs in the "check" phase of the event loop

---

## 2. Express.js — Complete Server Setup

### 💻 Full REST Server

```javascript
const express = require('express');
const app = express();

// ─── MIDDLEWARE ───
app.use(express.json());                    // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// Custom logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();  // MUST call next() or request hangs!
});

// ─── ROUTES ───
const users = [
  { id: 1, name: "Alice", email: "alice@test.com" },
  { id: 2, name: "Bob", email: "bob@test.com" }
];

// GET all users
app.get('/api/users', (req, res) => {
  res.json({ success: true, data: users });
});

// GET single user
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ success: true, data: user });
});

// POST create user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email required" });
  }
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
});

// PUT update user
app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  Object.assign(user, req.body);
  res.json({ success: true, data: user });
});

// DELETE user
app.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "User not found" });
  users.splice(index, 1);
  res.status(204).send();
});

// ─── ERROR HANDLING (must be LAST middleware) ───
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

---

## 3. Middleware — How It Works

### Theory

```
Request ──→ [Middleware 1] ──→ [Middleware 2] ──→ [Route Handler] ──→ Response
               │ next()           │ next()           │ res.send()
               │                  │                  │
            (logging)        (auth check)      (business logic)
```

### 💻 Code — Auth Middleware

```javascript
// Reusable auth middleware
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Attach user to request
    next();              // Pass to next middleware
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
}

// Role-based authorization
function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
}

// Usage
app.get('/api/admin/users', authenticate, authorize('admin'), (req, res) => {
  res.json({ data: users });
});
```

---

## 4. Database Connection

### 💻 MongoDB with Mongoose

```javascript
const mongoose = require('mongoose');

// ─── Connect ───
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
}

// ─── Schema & Model ───
const userSchema = new mongoose.Schema({
  name:  { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  role:  { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });  // adds createdAt, updatedAt

const User = mongoose.model('User', userSchema);

// ─── CRUD Operations ───
// Create
const newUser = await User.create({ name: "Alice", email: "alice@test.com", password: hashedPw });

// Read
const allUsers = await User.find({});
const oneUser = await User.findById(id);
const byEmail = await User.findOne({ email: "alice@test.com" });

// Update
await User.findByIdAndUpdate(id, { name: "Alice Updated" }, { new: true });

// Delete
await User.findByIdAndDelete(id);
```

### 💻 PostgreSQL with pg

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'myapp',
  user: 'postgres',
  password: 'password',
  max: 20,                  // connection pool size
  idleTimeoutMillis: 30000,
});

// Query
async function getUsers() {
  const { rows } = await pool.query('SELECT * FROM users WHERE active = $1', [true]);
  return rows;
}

// Insert
async function createUser(name, email) {
  const { rows } = await pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    [name, email]
  );
  return rows[0];
}

// Transaction
async function transferMoney(fromId, toId, amount) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('UPDATE accounts SET balance = balance - $1 WHERE id = $2', [amount, fromId]);
    await client.query('UPDATE accounts SET balance = balance + $1 WHERE id = $2', [amount, toId]);
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}
```

---

## 5. Streams

### Theory
Streams process data **chunk by chunk** instead of loading everything into memory.

```
┌──────────┐    chunk    ┌───────────┐    chunk    ┌──────────┐
│ Readable │ ──────────→ │ Transform │ ──────────→ │ Writable │
│ (source) │             │ (process) │             │  (dest)  │
└──────────┘             └───────────┘             └──────────┘

Example: Reading a 2GB file
❌ Without streams: Load 2GB into RAM → crash
✅ With streams: Process 64KB chunks → constant memory
```

### 💻 Code

```javascript
const fs = require('fs');
const zlib = require('zlib');

// Copy a large file efficiently
const readStream = fs.createReadStream('bigfile.txt');
const writeStream = fs.createWriteStream('copy.txt');
readStream.pipe(writeStream);

// Compress a file (chaining transforms)
fs.createReadStream('bigfile.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('bigfile.txt.gz'));

// Stream an API response
app.get('/api/data/export', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const cursor = db.collection('data').find({}).stream();
  cursor.pipe(res);  // Stream directly to HTTP response
});
```

---

## 6. Scaling Node.js

### Theory

```
┌─────────────────────────────────────────┐
│            Load Balancer (Nginx)        │
└────────┬──────────┬──────────┬──────────┘
         │          │          │
    ┌────┴───┐ ┌───┴────┐ ┌──┴─────┐
    │Worker 1│ │Worker 2│ │Worker 3│  ← cluster.fork()
    │(CPU 1) │ │(CPU 2) │ │(CPU 3) │
    └────────┘ └────────┘ └────────┘
```

### 💻 Code — Cluster Mode

```javascript
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  console.log(`Master process ${process.pid} forking ${numCPUs} workers`);
  
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died, restarting...`);
    cluster.fork();  // Auto-restart
  });
} else {
  // Each worker runs the Express app
  const app = require('./app');
  app.listen(3000, () => {
    console.log(`Worker ${process.pid} listening on port 3000`);
  });
}
```

---

## 7. Error Handling Best Practices

```javascript
// ─── Async error wrapper (avoids try-catch everywhere) ───
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Usage
app.get('/api/users', asyncHandler(async (req, res) => {
  const users = await User.find({});  // if this throws, error middleware catches it
  res.json(users);
}));

// ─── Custom Error Class ───
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;  // distinguish from programming errors
  }
}

// Usage
app.get('/api/users/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new AppError("User not found", 404);
  res.json(user);
}));

// ─── Global error middleware ───
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ─── Handle unhandled rejections ───
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION:', err);
  process.exit(1);
});
```

---

## ⚡ Quick Revision

| Concept | One-liner |
|---------|-----------|
| Node.js single-threaded? | JS runs on 1 thread; libuv has thread pool for blocking I/O |
| Why fast for I/O? | Non-blocking event-driven; OS handles network I/O natively |
| When NOT to use Node? | CPU-heavy tasks (image processing, ML); use worker threads |
| Middleware | Functions with (req, res, next); MUST call next() to continue |
| Error middleware | Has 4 params (err, req, res, next); MUST be last middleware |
| Streams | Process data in chunks; 4 types: Readable, Writable, Duplex, Transform |
| Cluster | Fork worker processes per CPU core for horizontal scaling |
| `require` vs `import` | require = CommonJS (sync); import = ES Modules (async) |
| `process.env` | Environment variables; use dotenv for .env files |
| Connection pooling | Reuse DB connections; don't create new connection per request |
