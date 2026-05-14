# 08 — System Design Fundamentals (FAANG Interview Guide)

## 🎯 What They Ask
- How would you scale this system to millions of users?
- What is the difference between horizontal and vertical scaling?
- Explain caching. Where would you add a cache?
- What is a load balancer? What algorithms does it use?
- What are message queues and when to use them?
- Explain database sharding and replication.
- Microservices vs Monolith — tradeoffs?
- What is the CAP theorem?

---

## 1. Scaling

```
VERTICAL SCALING (Scale Up)         HORIZONTAL SCALING (Scale Out)
┌───────────────────┐               ┌───────┐ ┌───────┐ ┌───────┐
│                   │               │Server1│ │Server2│ │Server3│
│  BIGGER SERVER    │               │ 4GB   │ │ 4GB   │ │ 4GB   │
│  64GB RAM         │               └───┬───┘ └───┬───┘ └───┬───┘
│  32 CPU cores     │                   │         │         │
│  2TB SSD          │               ┌───┴─────────┴─────────┴───┐
│                   │               │      LOAD BALANCER         │
└───────────────────┘               └────────────────────────────┘

✅ Simple                           ✅ No single point of failure
✅ No code changes                  ✅ Virtually unlimited scaling
❌ Hardware limits                   ❌ More complex (state, sessions)
❌ Single point of failure           ❌ Need load balancer
❌ Expensive at scale                ❌ Data consistency challenges
```

**Interview answer:** "I'd start with vertical scaling for simplicity, but design the system to be stateless from day one so we can horizontally scale when needed."

---

## 2. Load Balancer

```
           ┌───────────────────┐
Clients ──→│  LOAD BALANCER    │
           │                   │
           │  Algorithms:      │
           │  • Round Robin    │
           │  • Least Conn.    │
           │  • IP Hash        │
           │  • Weighted       │
           └─────┬───┬───┬─────┘
                 │   │   │
           ┌─────┘   │   └─────┐
           ▼         ▼         ▼
       ┌───────┐ ┌───────┐ ┌───────┐
       │App 1  │ │App 2  │ │App 3  │
       └───────┘ └───────┘ └───────┘
```

| Algorithm | How | Best For |
|-----------|-----|----------|
| **Round Robin** | Each server takes turns | Equal capacity servers |
| **Weighted RR** | More requests to stronger servers | Mixed capacity |
| **Least Connections** | Route to server with fewest active connections | Varying request duration |
| **IP Hash** | Same client IP always goes to same server | Session affinity |

### L4 vs L7 Load Balancer

```
L4 (Transport layer): Routes based on IP + port
  → Faster, no content inspection
  → Example: AWS NLB

L7 (Application layer): Routes based on HTTP content (URL, headers, cookies)
  → Smarter routing (/api → API servers, /images → CDN)
  → Example: AWS ALB, Nginx
```

---

## 3. Caching

```
CLIENT → [CDN Cache] → [Load Balancer] → [App Server] → [Redis Cache] → [Database]
           ↑                                   ↑              ↑
        Static files                      Application      DB query
        (JS, CSS, images)                 cache             results
```

### Cache Strategies

```
1. CACHE-ASIDE (Lazy Loading)          2. WRITE-THROUGH
   App checks cache first                App writes to cache AND DB
   
   read(key):                            write(key, value):
     if cache.has(key):                    cache.set(key, value)
       return cache.get(key)   ← HIT      db.save(key, value)
     value = db.query(key)     ← MISS
     cache.set(key, value)               ✅ Cache always consistent
     return value                        ❌ Write latency (2 writes)

3. WRITE-BEHIND (Write-Back)           4. READ-THROUGH
   App writes to cache only               Cache handles DB reads
   Cache async writes to DB
                                        read(key):
   write(key, value):                     return cache.getOrLoad(key)
     cache.set(key, value)                // cache internally queries DB
     // async batch write to DB           // on miss
   
   ✅ Fast writes                       ✅ Simple app code
   ❌ Data loss risk if cache crashes    ❌ Cache must know DB schema
```

### 💻 Redis Caching Example

```javascript
const Redis = require('ioredis');
const redis = new Redis();

// Cache-aside pattern
async function getUser(userId) {
  // 1. Check cache
  const cached = await redis.get(`user:${userId}`);
  if (cached) {
    console.log('Cache HIT');
    return JSON.parse(cached);
  }

  // 2. Cache miss → query DB
  console.log('Cache MISS');
  const user = await db.query('SELECT * FROM users WHERE id = $1', [userId]);

  // 3. Store in cache (expire in 1 hour)
  await redis.set(`user:${userId}`, JSON.stringify(user), 'EX', 3600);

  return user;
}

// Invalidate on update
async function updateUser(userId, data) {
  await db.query('UPDATE users SET name = $1 WHERE id = $2', [data.name, userId]);
  await redis.del(`user:${userId}`);  // Delete stale cache
}
```

### Cache Eviction Policies
| Policy | Strategy |
|--------|----------|
| **LRU** | Remove least recently used (most common) |
| **LFU** | Remove least frequently used |
| **TTL** | Remove after time-to-live expires |
| **FIFO** | Remove oldest entry |

---

## 4. Message Queues

```
WITHOUT QUEUE:                    WITH QUEUE:
User → [API] → [Email Service]   User → [API] → [Queue] → [Email Worker]
         ↑                                         │
    User waits for email                    API returns immediately!
    to be sent (slow!)                      Worker processes async.
```

```
PRODUCER ──→ ┌─────────────────────┐ ──→ CONSUMER
             │    MESSAGE QUEUE     │
             │  ┌───┬───┬───┬───┐  │
             │  │ M1│ M2│ M3│ M4│  │     Process messages
             │  └───┴───┴───┴───┘  │     at their own pace
             └─────────────────────┘
             (RabbitMQ, Kafka, SQS)
```

### When to Use

| Use Case | Why Queue? |
|----------|-----------|
| Email/SMS sending | Don't block user request; process async |
| Image processing | CPU-heavy; offload to workers |
| Order processing | Decouple payment, inventory, shipping |
| Log aggregation | Buffer logs, batch write to storage |
| Microservice communication | Decouple services; retry on failure |

### Kafka vs RabbitMQ

| Feature | Kafka | RabbitMQ |
|---------|-------|----------|
| Model | Log-based (append-only) | Queue-based (message consumed = deleted) |
| Throughput | Very high (millions/sec) | High (thousands/sec) |
| Retention | Keeps messages (configurable) | Deletes after consumption |
| Use case | Event streaming, analytics | Task queues, RPC |
| Ordering | Per partition | Per queue |

---

## 5. Database Sharding & Replication

### Replication

```
┌─────────┐     sync/async     ┌─────────┐
│ PRIMARY  │ ─────────────────→ │ REPLICA  │
│ (writes) │                    │ (reads)  │
└─────────┘                    └─────────┘
                               ┌─────────┐
                          ────→│ REPLICA  │
                               │ (reads)  │
                               └─────────┘

✅ Read scalability (distribute reads)
✅ High availability (failover to replica)
❌ Write bottleneck (single primary)
❌ Replication lag (reads may be stale)
```

### Sharding (Horizontal Partitioning)

```
Users table split by user_id:

┌──────────┐  ┌──────────┐  ┌──────────┐
│ Shard 1  │  │ Shard 2  │  │ Shard 3  │
│ IDs 1-1M │  │ IDs 1M-2M│  │ IDs 2M-3M│
└──────────┘  └──────────┘  └──────────┘

Shard Key: Determines which shard holds the data.
  user_id % 3 = 0 → Shard 1
  user_id % 3 = 1 → Shard 2
  user_id % 3 = 2 → Shard 3
```

| Strategy | Pros | Cons |
|----------|------|------|
| Range-based | Simple, range queries work | Hotspots (recent data = 1 shard) |
| Hash-based | Even distribution | Range queries span all shards |
| Directory-based | Flexible mapping | Lookup table = bottleneck |

---

## 6. CAP Theorem

```
        Consistency
           /\
          /  \
         /    \
        / Pick \
       /  TWO   \
      /          \
     /────────────\
Availability    Partition
                Tolerance

CA = Not realistic (network partitions WILL happen)
CP = Consistent + Partition tolerant (reject requests during partition)
     → MongoDB, Redis, HBase
AP = Available + Partition tolerant (serve stale data during partition)
     → Cassandra, DynamoDB, CouchDB
```

**Interview answer:** "In distributed systems, network partitions are unavoidable, so the real choice is between CP (consistent but might reject requests) and AP (always available but might return stale data). Most systems choose AP for user-facing reads and CP for financial transactions."

---

## 7. Microservices vs Monolith

```
MONOLITH:                        MICROSERVICES:
┌─────────────────────┐          ┌──────┐ ┌──────┐ ┌──────┐
│   All Code          │          │ User │ │Order │ │ Pay  │
│                     │          │ Svc  │ │ Svc  │ │ Svc  │
│ Users  Orders  Pay  │          └──┬───┘ └──┬───┘ └──┬───┘
│                     │             │        │        │
│   Single Database   │          ┌──┴──┐ ┌──┴──┐ ┌──┴──┐
│                     │          │ DB  │ │ DB  │ │ DB  │
└─────────────────────┘          └─────┘ └─────┘ └─────┘

Start here!                      Evolve to this when needed.
```

| Aspect | Monolith | Microservices |
|--------|----------|---------------|
| Complexity | Simple to develop & deploy | Complex (networking, discovery) |
| Scaling | Scale entire app | Scale individual services |
| Deployment | All or nothing | Independent deployment |
| Tech stack | Single | Each service can use different stack |
| Team | Small team works fine | Needed for large teams (ownership) |
| Failure | One bug can crash everything | Isolated failures |

---

## 8. System Design Template (Interview)

```
Step 1: REQUIREMENTS (2-3 min)
  → Functional: "What features?"
  → Non-functional: "Scale? Latency? Availability?"
  → Constraints: "How many users? Read-heavy or write-heavy?"

Step 2: HIGH-LEVEL DESIGN (5 min)
  → Draw main components (boxes + arrows)
  → Client → LB → App Servers → Cache → DB

Step 3: DEEP DIVE (15-20 min)
  → Database schema
  → API design
  → Scaling bottlenecks
  → Caching strategy
  → Trade-offs

Step 4: WRAP UP (3-5 min)
  → Bottlenecks & solutions
  → Monitoring & alerting
  → Future improvements
```

---

## ⚡ Quick Revision

| Concept | One-liner |
|---------|-----------|
| Horizontal scaling | Add more machines; needs stateless design + load balancer |
| Load balancer | Distributes traffic; Round Robin / Least Connections / IP Hash |
| Cache-aside | App checks cache → miss → query DB → store in cache |
| Redis | In-memory key-value store; sub-millisecond reads; TTL eviction |
| Message queue | Async processing; decouple producer/consumer; retry + buffering |
| Replication | Primary writes, replicas read; high availability + read scaling |
| Sharding | Split data across servers by shard key; horizontal write scaling |
| CAP theorem | Pick 2 of 3: Consistency, Availability, Partition Tolerance |
| Microservices | Independent services; own DB; deploy separately; API communication |
| CDN | Edge servers cache static content; reduces latency globally |
| Rate limiting | Prevent abuse; token bucket / sliding window; return 429 |
