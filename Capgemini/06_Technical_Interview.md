# 💻 Stage 6 — Technical Interview (₹13–16 LPA Bar)

> **Target Roles:** Alpha_Stack (₹13 LPA) | Root_Mind (₹16 LPA)  
> **Format:** 1-on-1 Deep Technical Panel | **Duration:** ~45–60 mins  
> **Bar:** For ₹13–16 LPA, interviewers will NOT ask textbook definitions. They assess **architectural depth, live C++ problem-solving, low-level design (LLD), and end-to-end project defense**.

---

## 📋 What Distinguishes a ₹16 LPA Candidate from a ₹5 LPA Candidate

| Dimension | Standard Campus Candidate (₹4–6 LPA) | Super-Dream Root_Mind Candidate (₹13–16 LPA) |
|-----------|--------------------------------------|---------------------------------------------|
| **Coding** | Jumps into code immediately; writes messy code | Clarifies constraints first, analyzes trade-offs, writes clean modular C++ |
| **Data Structures** | Uses array/vector for everything | Selects exact data structures (Monotonic Deque, Trie, Min-Heap) based on complexity |
| **System Thinking** | "I just put it in a database" | Explains indexing, caching (Redis), sharding, transaction isolation, latency |
| **GenAI / ML** | "I used ChatGPT API" | Explains vector indexing (HNSW), chunking overlap, rerankers, hallucination metrics |
| **C++ Internals** | Knows basic syntax | Explains Move Semantics, Smart Pointers, vtable layout, memory segments |

---

# 🧠 Part A: C++ Advanced Core Internals (Must-Know)

---

### 1. Smart Pointers & Memory Ownership (C++11/14/17)

```cpp
#include <iostream>
#include <memory>
using namespace std;

class Node {
public:
    int val;
    shared_ptr<Node> next;
    weak_ptr<Node> prev; // Use weak_ptr to break circular reference memory leak!
    Node(int v) : val(v) {}
    ~Node() { cout << "Node " << val << " destroyed\n"; }
};

int main() {
    // 1. unique_ptr: Exclusive ownership, zero runtime overhead (cannot be copied, only moved)
    unique_ptr<int> u1 = make_unique<int>(100);
    // unique_ptr<int> u2 = u1; // ❌ Compile error: copy constructor deleted
    unique_ptr<int> u2 = move(u1); // ✅ Ownership transferred; u1 is now nullptr

    // 2. shared_ptr: Shared ownership via reference counting
    shared_ptr<Node> n1 = make_shared<Node>(1);
    shared_ptr<Node> n2 = make_shared<Node>(2);
    n1->next = n2;
    n2->prev = n1; // weak_ptr avoids cyclic reference, allowing clean destruction!
    
    return 0;
}
```

* **Interviewer Question:** *"Why does a cyclic reference in `std::shared_ptr` cause a memory leak, and how does `std::weak_ptr` solve it?"*
  * **Answer:** If object A holds a `shared_ptr` to B, and B holds a `shared_ptr` to A, their reference counts will never drop to 0 even when all external pointers go out of scope. `std::weak_ptr` observes a `shared_ptr` without incrementing its reference count, allowing the reference count to reach 0 and properly trigger deallocation.

---

### 2. Move Semantics & Rvalue References (`&&`)

```cpp
class Buffer {
    int* data;
    size_t size;
public:
    Buffer(size_t s) : size(s), data(new int[s]) {}
    ~Buffer() { delete[] data; }

    // Copy Constructor: O(N) allocation + copy
    Buffer(const Buffer& other) : size(other.size), data(new int[other.size]) {
        copy(other.data, other.data + size, data);
    }

    // Move Constructor: O(1) pointer theft (steals resources from temporary rvalue)
    Buffer(Buffer&& other) noexcept : data(other.data), size(other.size) {
        other.data = nullptr; // Leave source in valid, empty state
        other.size = 0;
    }
};
```
* **Key Concept:** `std::move` does not move anything itself; it casts an lvalue to an rvalue reference (`T&&`), enabling the move constructor/assignment operator to steal heap pointers instead of deep copying.

---

### 3. C++ Casts Hierarchy
* `static_cast`: Compile-time type conversion between related types (e.g. `double` to `int`, or upcasting in inheritance).
* `dynamic_cast`: Runtime polymorphic downcasting along inheritance hierarchy. Uses RTTI (Run-Time Type Information). Returns `nullptr` on pointer failure, throws `std::bad_cast` on reference failure.
* `const_cast`: Adds or removes `const` / `volatile` qualifiers.
* `reinterpret_cast`: Bit-level reinterpretation of memory (e.g. converting a pointer to an integer address). Highly dangerous.

---

# 🏗️ Part B: Low-Level Design (LLD) & Design Patterns in C++

---

### 1. Thread-Safe Singleton Pattern (Meyers' Singleton)
```cpp
class DatabasePool {
private:
    DatabasePool() { cout << "DB Pool Initialized\n"; }
    ~DatabasePool() = default;
    DatabasePool(const DatabasePool&) = delete;
    DatabasePool& operator=(const DatabasePool&) = delete;
public:
    static DatabasePool& getInstance() {
        // In C++11+, static local variable initialization is guaranteed thread-safe!
        static DatabasePool instance;
        return instance;
    }
    void executeQuery(const string& query) {
        cout << "Executing: " << query << "\n";
    }
};
```

---

### 2. Factory Pattern with Smart Pointers
```cpp
#include <memory>

class Notification {
public:
    virtual void send(const string& msg) = 0;
    virtual ~Notification() = default;
};

class EmailNotification : public Notification {
public:
    void send(const string& msg) override { cout << "Email: " << msg << "\n"; }
};

class SMSNotification : public Notification {
public:
    void send(const string& msg) override { cout << "SMS: " << msg << "\n"; }
};

class NotificationFactory {
public:
    static unique_ptr<Notification> create(const string& type) {
        if (type == "EMAIL") return make_unique<EmailNotification>();
        if (type == "SMS") return make_unique<SMSNotification>();
        return nullptr;
    }
};
```

---

### 3. Real Interview LLD Problem: Design an LRU Cache ($O(1)$)
```cpp
#include <unordered_map>
#include <list>
using namespace std;

class LRUCache {
    int capacity;
    // Doubly linked list storing: {key, value}
    list<pair<int, int>> dll;
    // Hash map: key -> iterator to node in dll
    unordered_map<int, list<pair<int, int>>::iterator> cache;
public:
    LRUCache(int cap) : capacity(cap) {}

    int get(int key) {
        if (!cache.count(key)) return -1;
        // Move accessed node to front (most recently used)
        dll.splice(dll.begin(), dll, cache[key]);
        return cache[key]->second;
    }

    void put(int key, int value) {
        if (cache.count(key)) {
            dll.splice(dll.begin(), dll, cache[key]);
            cache[key]->second = value;
            return;
        }
        if (dll.size() == (size_t)capacity) {
            // Evict least recently used (back of list)
            int lruKey = dll.back().first;
            dll.pop_back();
            cache.erase(lruKey);
        }
        dll.push_front({key, value});
        cache[key] = dll.begin();
    }
};
```

---

# 🌐 Part C: High-Level System Architecture Fundamentals

### 1. Scaling a Web Service: 1,000 to 1,000,000 Users
```
[Client] ──► [DNS Routing (Route53)]
                 │
                 ▼
         [Load Balancer (Nginx / ALB)] ── (Round Robin / Least Connections)
                 │
        ┌────────┴────────┐
        ▼                 ▼
[App Server 1]     [App Server 2] (Stateless Workers)
        │                 │
        ├─────────────────┴──────► [In-Memory Cache: Redis] (Cache-aside, TTL 10m)
        │
        ▼
[Primary DB (Writes)] ──── (Async Replication) ────► [Read Replicas (Queries)]
```

### 2. Caching Strategies
* **Cache-Aside:** Application checks cache first. On miss, queries DB, populates cache, and returns. (Best for read-heavy workloads).
* **Write-Through:** Data written to cache and DB simultaneously. Consistent, but higher write latency.
* **Write-Back (Write-Behind):** Data written only to cache first; asynchronously flushed to DB in batches. Very high write throughput, but risks data loss if cache crashes before flush.

### 3. Database Sharding vs. Partitioning
* **Vertical Partitioning:** Splitting tables by columns (e.g. putting large BLOB/image metadata in a separate table).
* **Horizontal Sharding:** Distributing rows across multiple independent physical database instances using a **Shard Key** (e.g. `hash(user_id) % num_shards`). Requires consistent hashing to handle node additions/removals smoothly.

---

# 🤖 Part D: Project Grilling & AI Defense (The CAR Method)

When the panel asks: *"Walk me through your most challenging technical project."*

Use the **CAR Framework (Context $\to$ Action $\to$ Result)**:

### Sample High-Impact Response:
```text
Context:
"In my final-year project, I engineered a high-throughput Retrieval-Augmented Generation (RAG) 
system to query internal engineering documentation across 50,000+ technical PDF documents."

Action (Demonstrating Technical Depth):
"1. Rather than basic fixed-size chunking which fractured code snippets, I implemented a 
   semantic chunker with sentence-window retrieval.
 2. For retrieval, I built a hybrid search architecture combining dense embeddings (OpenAI 
    text-embedding-3-small indexed via HNSW in ChromaDB) with sparse BM25 lexical search, 
    fused using Reciprocal Rank Fusion (RRF).
 3. To minimize hallucinations, I integrated a BGE cross-encoder reranker that scored the top 
    50 candidates down to 5, filtering out chunks below a 0.75 confidence threshold before 
    passing context to the LLM."

Result (Quantifiable Impact):
"This reduced hallucination rate by 38% based on RAGAS Faithfulness evaluation metrics and 
cut overall query latency from 3.2s to 850ms by caching frequent query embeddings in Redis."
```

### Typical Follow-Up Trap Questions:
* **"Why HNSW instead of IVF-FLAT in your vector database?"**  
  * *Answer:* "Because our dataset was around 50,000 documents where memory capacity allowed in-memory graph storage, and HNSW delivers significantly higher recall (>95%) with logarithmic search latency without needing periodic clustering retraining like IVF-FLAT."
* **"How did you prevent SQL injection / prompt injection in your application?"**  
  * *Answer:* "For SQL, I used parameterized queries via an ORM. For prompt injection, I isolated user input using explicit XML delimiter tags `<user_query>` and ran an upstream lightweight classifier to detect jailbreak patterns before hitting the generator."

---

> **Next Step:** [Stage 7 — HR & Capgemini Values Round →](./07_HR_and_Values.md) | **Return to** [Main Roadmap](./README.md)
