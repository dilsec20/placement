# 🏛️ Stage 5 — Core CS Mastery & High-Level System Design

> **Core Focus:** Operating Systems, Computer Networks, DBMS & Distributed System Architecture  
> **Target Rounds:** POD.AI Online Test + Technical Interviews  
> **Level of Depth:** High. For a ₹19.8 LPA package, interviewers probe **kernel behavior, protocol mechanics, and distributed failure modes**.

---

# 🧠 Part 1: Operating Systems (OS) Deep Dive

---

### 1. Synchronization Primitives: Mutex vs. Counting Semaphore vs. Spinlock

```cpp
#include <iostream>
#include <thread>
#include <mutex>
#include <shared_mutex>
using namespace std;

// 1. Mutex: Exclusive locking with thread sleep (Kernel context switch)
mutex mtx;

// 2. Shared Mutex (Read-Write Lock): Multiple readers, single writer (C++17)
shared_mutex rwMtx;
int sharedData = 42;

int readData() {
    shared_lock<shared_mutex> lock(rwMtx); // Concurrent readers allowed
    return sharedData;
}

void writeData(int val) {
    unique_lock<shared_mutex> lock(rwMtx); // Exclusive lock (all readers blocked)
    sharedData = val;
}
```

| Primitive | Mechanism | Behavior When Contended | Best Use Case |
|---|---|---|---|
| **Mutex** | Ownership lock | Thread transitions to sleeping state in kernel (CPU context switch) | Locks held for milliseconds or longer |
| **Spinlock** | Busy-waiting (`while(test_and_set)`) | Loops actively on CPU core without context switching | Extremely short lock durations ($<1\mu\text{s}$) on multi-core systems |
| **Counting Semaphore** | Signaling counter ($S$) | Decrements $S$; thread sleeps if $S \le 0$ | Resource pools (e.g., maximum 10 database connections) |
| **Read-Write Lock** | Shared / Exclusive | Multiple shared readers OR one exclusive writer | Read-heavy workloads ($99\%$ reads, $1\%$ writes) |

---

### 2. Deadlocks: The 4 Coffman Conditions & Prevention
Deadlock can occur **if and only if** all four conditions hold simultaneously:
1. **Mutual Exclusion:** Resources cannot be shared simultaneously.
2. **Hold and Wait:** A process holds at least one resource while waiting for another.
3. **No Preemption:** Resources cannot be forcibly seized from a holding process.
4. **Circular Wait:** Process $P_0$ waits for $P_1$, $P_1$ waits for $P_2$, $\dots$, $P_n$ waits for $P_0$.
* **How Production Systems Prevent Deadlock:** Break **Circular Wait** by enforcing a **strict global hierarchical acquisition order** for all locks across the codebase (e.g., always acquire Lock A before Lock B).

---

### 3. Virtual Memory, Paging & Thrashing
* **Page Table & TLB:** Virtual addresses are divided into Page Number and Offset. The **TLB (Translation Lookaside Buffer)** is a hardware cache on the CPU that stores recent virtual-to-physical address translations ($<1\text{ ns}$ access).
* **Page Fault Sequence:**
  1. CPU generates virtual address $\to$ TLB miss $\to$ Page table lookup shows page is marked invalid (not in RAM).
  2. MMU triggers Page Fault interrupt $\to$ CPU switches to kernel mode.
  3. OS locates page on disk backing store / swap $\to$ allocates free physical frame.
  4. OS schedules disk I/O to read page into RAM $\to$ updates page table entry to valid.
  5. Interrupted instruction is restarted transparently.
* **Thrashing:** When total working sets of active processes exceed physical RAM, the OS spends $99\%$ of its time swapping pages in/out of disk rather than executing instructions.
  * *Remedy:* Working set model, suspend lower-priority processes, add physical RAM.

---

# 🌐 Part 2: Computer Networks (CN) Deep Dive

---

### 1. TCP Connection Lifecycle & Handshake Mechanics

```
CLIENT                                                    SERVER
  │                                                         │
  ├────────────── SYN (seq = x) ───────────────────────────►│ (Server allocates TCB, listens)
  │                                                         │
  │◄───────────── SYN-ACK (seq = y, ack = x + 1) ──────────┤
  │                                                         │
  ├────────────── ACK (seq = x + 1, ack = y + 1) ──────────►│ (Connection ESTABLISHED)
```

* **The `SYN` Flood Attack:** Attacker sends thousands of `SYN` packets from spoofed IPs and never sends the final `ACK`. The server exhausts its connection backlog queue allocating Transmission Control Blocks (TCBs).
  * *Defense:* **SYN Cookies** (server encodes connection state cryptographically into the initial sequence number $y$, avoiding memory allocation until the legitimate final ACK arrives).

---

### 2. HTTP/1.1 vs. HTTP/2 vs. HTTP/3 (QUIC)

| Feature | HTTP/1.1 | HTTP/2 | HTTP/3 |
|---|---|---|---|
| **Underlying Transport** | TCP | TCP | **QUIC (over UDP)** |
| **Framing** | Plain text / ASCII | Binary Framing | Binary Framing |
| **Multiplexing** | ❌ Sequential (Pipelining flawed) | ✅ Yes (Multiplexed streams over 1 TCP connection) | ✅ Yes (Independent streams over UDP) |
| **Head-of-Line (HOL) Blocking** | Application layer & Transport layer | Transport layer HOL (single lost packet stalls all streams) | ❌ **Zero Transport HOL Blocking** (packet loss on stream A never delays stream B) |
| **Connection Setup Latency** | TCP (1-RTT) + TLS (1-2 RTT) = 2–3 RTT | TCP (1-RTT) + TLS (1-2 RTT) = 2–3 RTT | **0-RTT or 1-RTT** connection resumption |
| **Connection Migration** | ❌ Connection tied to 4-tuple (IP + Port) | ❌ Broken if client switches Wi-Fi $\to$ 5G | ✅ **Yes!** Uses 64-bit Connection ID; seamless IP handover |

---

### 3. DNS Lookup Step-by-Step (Querying `api.acko.com`)
```
[Browser / App]
      │
      ▼
1. Browser Cache ➔ OS Hosts File ➔ Local DNS Resolver (e.g. 8.8.8.8)
      │ (Cache Miss)
      ▼
2. Root DNS Server (.) ──────────► Returns referral to .com TLD Server
      │
      ▼
3. .com TLD Server ──────────────► Returns referral to acko.com Authoritative Server (NS)
      │
      ▼
4. ACKO Authoritative Server ────► Returns CNAME / A record (e.g. 52.14.22.100, TTL 300s)
      │
      ▼
[Resolver caches IP for 300s and returns it to Client]
```

---

# 💾 Part 3: Database Management Systems (DBMS)

---

### 1. ACID Properties & Their Low-Level Implementations

| ACID Property | What it Guarantees | Engine Mechanism (InnoDB / Postgres) |
|---|---|---|
| **Atomicity** | All operations in a transaction succeed, or all are rolled back. | **Undo Logs** (records before-image of data to revert uncommitted changes on abort). |
| **Consistency** | Database transitions from one valid state to another satisfying all schema constraints. | Cascading checks, foreign keys, uniqueness validation. |
| **Isolation** | Concurrent transactions execute without interfering with one another. | **2-Phase Locking (2PL)** and **MVCC (Multi-Version Concurrency Control)**. |
| **Durability** | Committed transactions survive system crashes or power failures. | **Redo Logs / Write-Ahead Logging (WAL)**: Transactions flushed sequentially to disk before acknowledging commit. |

---

### 2. Transaction Isolation Levels & Read Phenomena

| Isolation Level | Dirty Read | Non-Repeatable Read | Phantom Read |
|---|:---:|:---:|:---:|
| **Read Uncommitted** | ❌ Allowed | ❌ Allowed | ❌ Allowed |
| **Read Committed** (Postgres default) | ✅ Prevented | ❌ Allowed | ❌ Allowed |
| **Repeatable Read** (MySQL InnoDB default) | ✅ Prevented | ✅ Prevented | ❌ Allowed (InnoDB MVCC prevents most) |
| **Serializable** | ✅ Prevented | ✅ Prevented | ✅ Prevented |

* **Dirty Read:** Transaction reads uncommitted data written by a concurrent transaction that later aborts/rolls back.
* **Non-Repeatable Read:** Transaction reads the exact same row twice and observes modified column values because another transaction committed an `UPDATE`.
* **Phantom Read:** Transaction executes a range query (`WHERE age > 25`) twice and observes newly inserted rows committed by another transaction.

---

### 3. B+ Tree Indexing vs. Hash Indexing
* **Why Relational Databases use B+ Trees:**
  1. **High Branching Factor ($100–500$):** Tree height remains $3–4$ levels even for $100\text{ Million}$ rows, requiring only $3–4$ disk I/O operations per lookup.
  2. **Linked Leaf Nodes:** All keys are linked sequentially at leaf level. Range queries (`BETWEEN '2026-01-01' AND '2026-01-31'`) simply find the start node in $O(\log N)$ and traverse the linked list in $O(K)$.
  3. Hash indexes provide $O(1)$ point lookups (`WHERE id = 5`), but completely fail for range queries or sorting (`ORDER BY`).

---

# 🏗️ Part 4: High-Level System Design — Distributed Notification Service

> **ACKO Context:** When an insurance policy is bought, claim status updates, or payment reminders are triggered, ACKO sends notifications across **SMS, WhatsApp, Email, and In-App Push** to millions of customers.

### Architecture Blueprint
```
[Client Services: Policy / Claim / Billing]
                       │
                       ▼
            [API Gateway / Rate Limiter] (Token Bucket per tenant)
                       │
                       ▼
          [Notification Ingestion Service]
                       │
        ┌──────────────┴──────────────┐
        ▼                             ▼
[High Priority Queue]       [Bulk Marketing Queue]
   (OTP, Claim Updates)       (Offers, Renewal reminders)
   (Apache Kafka Topic)       (Apache Kafka Topic)
        │                             │
        └──────────────┬──────────────┘
                       ▼
          [Notification Consumer Workers]
                       │
      ┌────────────────┼────────────────┐
      ▼                ▼                ▼
[SMS Gateway]    [WhatsApp API]   [Email Provider]
(Twilio/Gupshup)   (Meta Cloud)     (AWS SES)
      │                │                │
      └────────────────┴────────────────┘
                       │
         (On Third-Party Vendor 5xx)
                       │
                       ▼
       [Dead Letter Queue (DLQ) & Exponential Retry]
```

### Key Design Trade-Offs & Edge Cases to Discuss
1. **Idempotency & Deduplication:** Use Redis with a 24-hour TTL keyed by `sha256(userId + notificationType + date)` to ensure users never receive duplicate OTPs or payment alerts.
2. **Priority Ingestion:** Separate Kafka topics for high-priority transactional notifications (OTP SLA $<3$ seconds) vs. bulk marketing notifications (SLA $<2$ hours) prevents marketing campaigns from starving critical OTPs.
3. **Vendor Outage & Circuit Breakers:** If Twilio returns 503 Service Unavailable, trip the Circuit Breaker and route fallback SMS via Gupshup or Kaleyra automatically.

---

> **Next Step:** Prepare for live technical interview cross-examination and project defense in [06_Interview_Rounds_and_Project_Defense.md](./06_Interview_Rounds_and_Project_Defense.md)!
