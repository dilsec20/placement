# 03 — Database (FAANG Interview Guide)

## 🎯 What They Ask
- SQL vs NoSQL — when to use which?
- What is normalization? Explain 1NF, 2NF, 3NF.
- What is indexing? How does a B-Tree index work?
- Explain ACID properties.
- What are joins? Write a query with LEFT JOIN.
- What is connection pooling and why is it important?
- How would you design a schema for [X]?
- What is database sharding?

---

## 1. SQL vs NoSQL

```
┌──────────────────────┬──────────────────────────────┐
│       SQL            │          NoSQL               │
├──────────────────────┼──────────────────────────────┤
│ Tables (rows/cols)   │ Documents / Key-Value / Graph│
│ Fixed schema         │ Flexible / schema-less       │
│ ACID transactions    │ Eventual consistency (BASE)  │
│ Vertical scaling     │ Horizontal scaling           │
│ Joins supported      │ Denormalized / embedded      │
│ PostgreSQL, MySQL    │ MongoDB, Redis, Cassandra    │
├──────────────────────┼──────────────────────────────┤
│ USE WHEN:            │ USE WHEN:                    │
│ • Complex queries    │ • Rapid prototyping          │
│ • Relationships      │ • Unstructured data          │
│ • Financial data     │ • Massive scale (millions/s) │
│ • ACID needed        │ • Real-time analytics        │
└──────────────────────┴──────────────────────────────┘
```

**Interview answer:** "I choose SQL when data has clear relationships and consistency is critical (banking, e-commerce orders). I choose NoSQL when I need flexible schemas, horizontal scaling, or when data is denormalized (social feeds, IoT sensor data, caching)."

---

## 2. ACID Properties

| Property | Meaning | Example |
|----------|---------|---------|
| **A**tomicity | All or nothing — entire transaction succeeds or rolls back | Money transfer: debit AND credit both happen, or neither |
| **C**onsistency | DB moves from one valid state to another | Balance can't go negative if constraint exists |
| **I**solation | Concurrent transactions don't interfere | Two people booking last seat — only one succeeds |
| **D**urability | Committed data survives crashes | After "Payment confirmed", data persists even if server dies |

### 🔥 Scenario Question
> **Q: "Two users try to book the last concert ticket simultaneously. How does the database handle this?"**

**Answer:** With proper isolation (e.g., Serializable or using `SELECT ... FOR UPDATE`), the database locks the row. First transaction reads `available = 1`, decrements to `0`, commits. Second transaction waits for the lock, reads `available = 0`, and the application rejects the booking.

```sql
-- Pessimistic locking (prevents race condition)
BEGIN;
SELECT available_seats FROM events WHERE id = 1 FOR UPDATE;
-- If available > 0:
UPDATE events SET available_seats = available_seats - 1 WHERE id = 1;
INSERT INTO bookings (user_id, event_id) VALUES (42, 1);
COMMIT;
```

---

## 3. Normalization

```
1NF: No repeating groups, atomic values
    ❌ orders(id, items: "pen,book,eraser")
    ✅ order_items(order_id, item_name)

2NF: 1NF + no partial dependencies (all non-key columns depend on FULL primary key)
    ❌ order_items(order_id, product_id, product_name)  ← product_name depends only on product_id
    ✅ Split: order_items(order_id, product_id) + products(product_id, product_name)

3NF: 2NF + no transitive dependencies (non-key depends only on primary key)
    ❌ employees(id, dept_id, dept_name)  ← dept_name depends on dept_id, not employee id
    ✅ Split: employees(id, dept_id) + departments(dept_id, dept_name)
```

**When to denormalize:** High-read, low-write systems. E.g., storing `author_name` in the `posts` table to avoid joining every time.

---

## 4. Indexing

### How B-Tree Index Works

```
                    ┌─────────┐
                    │  50     │               ← Root
                    └────┬────┘
              ┌──────────┼──────────┐
         ┌────┴───┐ ┌───┴────┐ ┌──┴─────┐
         │ 10, 30 │ │ 60, 70 │ │ 80, 90 │   ← Internal nodes
         └───┬────┘ └───┬────┘ └───┬────┘
             │          │          │
   Leaf:  [1,5,10] [30,35] [50,55,60] [70,75,80] [90,95]

Searching for 35:
  50 → go left → 10,30 → go right → [30,35] → found!
  Only 3 disk reads instead of scanning ALL rows.
```

### 💻 SQL Index Examples

```sql
-- Create index
CREATE INDEX idx_users_email ON users(email);

-- Composite index (order matters!)
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);
-- ✅ Works for: WHERE user_id = 1
-- ✅ Works for: WHERE user_id = 1 AND created_at > '2024-01-01'
-- ❌ Doesn't help: WHERE created_at > '2024-01-01' (leftmost prefix rule)

-- Unique index (also enforces uniqueness)
CREATE UNIQUE INDEX idx_users_email_unique ON users(email);

-- Check if query uses index
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'alice@test.com';
```

**When NOT to index:**
- Small tables (full scan is faster)
- Columns with low cardinality (e.g., boolean `active`)
- Columns that are frequently updated (index maintenance cost)

---

## 5. Joins — Visual Guide

```
Table A (users)         Table B (orders)
┌────┬───────┐         ┌────┬─────────┬─────────┐
│ id │ name  │         │ id │ user_id │ total   │
├────┼───────┤         ├────┼─────────┼─────────┤
│ 1  │ Alice │         │ 1  │ 1       │ $100    │
│ 2  │ Bob   │         │ 2  │ 1       │ $200    │
│ 3  │ Carol │         │ 3  │ 4       │ $50     │ ← user_id 4 doesn't exist!
└────┴───────┘         └────┴─────────┴─────────┘
```

| Join Type | Result | Use Case |
|-----------|--------|----------|
| `INNER JOIN` | Only matching rows (Alice) | "Users who have orders" |
| `LEFT JOIN` | All from A + matching from B (Alice, Bob, Carol) | "All users, with orders if any" |
| `RIGHT JOIN` | All from B + matching from A | "All orders, even orphaned ones" |
| `FULL OUTER JOIN` | Everything from both | "Complete picture" |

### 💻 SQL Code

```sql
-- All users with their order count (including users with 0 orders)
SELECT u.name, COUNT(o.id) AS order_count, COALESCE(SUM(o.total), 0) AS total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name
ORDER BY total_spent DESC;

-- Result:
-- Alice  | 2 | $300
-- Bob    | 0 | $0
-- Carol  | 0 | $0

-- Top 5 customers with most orders in last 30 days
SELECT u.name, COUNT(*) AS orders, SUM(o.total) AS revenue
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.created_at >= NOW() - INTERVAL '30 days'
GROUP BY u.id, u.name
HAVING COUNT(*) > 2
ORDER BY revenue DESC
LIMIT 5;
```

---

## 6. MongoDB — Document Design

### 💻 Code — Embedding vs Referencing

```javascript
// ─── EMBEDDING (denormalized) ───
// Use when: data is read together, 1:few relationship
const orderSchema = {
  _id: ObjectId("..."),
  user: { name: "Alice", email: "alice@test.com" },  // embedded
  items: [
    { product: "Laptop", price: 999, qty: 1 },       // embedded array
    { product: "Mouse", price: 25, qty: 2 }
  ],
  total: 1049,
  status: "shipped"
};
// ✅ Single query to get order + user + items
// ❌ If user updates email, must update in ALL orders

// ─── REFERENCING (normalized) ───
// Use when: data changes independently, many:many relationship
const orderSchemaRef = {
  _id: ObjectId("..."),
  userId: ObjectId("user_123"),      // reference
  items: [ObjectId("item_1"), ObjectId("item_2")],  // references
  total: 1049
};
// ✅ User email changes in one place
// ❌ Requires multiple queries or $lookup (join)
```

### Aggregation Pipeline

```javascript
// "Find top 5 customers by revenue in 2024"
db.orders.aggregate([
  { $match: { createdAt: { $gte: new Date("2024-01-01") } } },  // Filter
  { $group: {                                                     // Group
      _id: "$userId",
      totalRevenue: { $sum: "$total" },
      orderCount: { $sum: 1 }
    }
  },
  { $sort: { totalRevenue: -1 } },    // Sort descending
  { $limit: 5 },                       // Top 5
  { $lookup: {                         // Join with users collection
      from: "users",
      localField: "_id",
      foreignField: "_id",
      as: "user"
    }
  },
  { $unwind: "$user" },               // Flatten user array
  { $project: {                        // Select fields
      name: "$user.name",
      totalRevenue: 1,
      orderCount: 1
    }
  }
]);
```

---

## 7. Connection Pooling

```
WITHOUT POOLING:                    WITH POOLING:
                                    
Request 1 → [create conn] → DB     Request 1 ──┐
Request 2 → [create conn] → DB               ┌─┴──────────┐
Request 3 → [create conn] → DB     Request 2 ─┤  Pool (20  ├──→ DB
    ...                                       │ connections │
Request N → [create conn] → DB     Request 3 ─┤  reused)   │
                                              └─┬──────────┘
❌ New connection = ~50ms overhead  Request N ──┘
❌ DB has connection limits         ✅ Connections reused
                                    ✅ Constant pool size
```

---

## ⚡ Quick Revision

| Concept | One-liner |
|---------|-----------|
| SQL vs NoSQL | SQL = structured + ACID + joins; NoSQL = flexible + scalable |
| ACID | Atomicity, Consistency, Isolation, Durability |
| Index | B-Tree structure; speeds reads, slows writes; use on WHERE/JOIN columns |
| Normalization | Remove redundancy: 1NF→atomic, 2NF→no partial dep, 3NF→no transitive dep |
| LEFT JOIN | All rows from left + matching from right (NULLs for no match) |
| Embedding | Put related data inside document (MongoDB); fast reads, data duplication |
| Referencing | Store IDs and join later; single source of truth, slower reads |
| Connection pool | Reuse DB connections; avoid per-request overhead |
| `N+1 problem` | 1 query for list + N queries for each item; fix with JOIN or eager loading |
| Sharding | Split data across multiple servers by a shard key |
