# 06 — Operating Systems (FAANG Interview Guide)

## 🎯 What They Ask
- What is the difference between a process and a thread?
- What is a deadlock? What are the four conditions? How to prevent it?
- Explain context switching.
- What are the CPU scheduling algorithms?
- Explain virtual memory and paging.
- What is a semaphore vs a mutex?
- What is thrashing?

---

## 1. Process vs Thread

```
┌───────────────── PROCESS ─────────────────┐
│                                           │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  │
│  │ Thread 1│  │ Thread 2│  │ Thread 3│  │
│  │(own stack│  │(own stack│  │(own stack│  │
│  │ own regs)│  │ own regs)│  │ own regs)│  │
│  └─────────┘  └─────────┘  └─────────┘  │
│                                           │
│  ┌──────────── SHARED ────────────────┐  │
│  │  Code    │  Data/Heap  │  Files    │  │
│  └────────────────────────────────────┘  │
│                                           │
│  Own: Address space, file descriptors,    │
│       PID, memory map                     │
└───────────────────────────────────────────┘
```

| Feature | Process | Thread |
|---------|---------|--------|
| Memory | Own address space | Shares process memory |
| Creation cost | Heavy (~fork) | Lightweight |
| Communication | IPC (pipes, sockets, shared memory) | Direct (shared heap) |
| Crash impact | Other processes unaffected | Crashes entire process |
| Context switch | Expensive (full memory swap) | Cheaper (same address space) |
| Example | Chrome tabs (each is a process) | Multiple requests in a web server |

### 🔥 Scenario Question
> **Q: "Why does Chrome use separate processes for each tab?"**

**Answer:** Isolation. If one tab crashes (segfault, infinite loop), other tabs continue working. If they used threads, one bad tab would crash the entire browser. The tradeoff is higher memory usage.

---

## 2. Deadlock

### Four Necessary Conditions (ALL must hold)

```
1. MUTUAL EXCLUSION     →  Resource can only be held by one process
2. HOLD AND WAIT        →  Process holds resources while waiting for others
3. NO PREEMPTION        →  Resources can't be forcibly taken away
4. CIRCULAR WAIT        →  P1 waits for P2, P2 waits for P1

     ┌──────┐   waits for   ┌──────┐
     │  P1  │ ─────────────→│  R2  │ (held by P2)
     │      │               └──────┘
     │      │ holds
     │      │──→ ┌──────┐
     └──────┘    │  R1  │ (wanted by P2)
                 └──────┘
                     ↑
     ┌──────┐  waits for
     │  P2  │ ──────────┘
     │      │ holds R2
     └──────┘

     → CIRCULAR WAIT = DEADLOCK!
```

### Prevention Strategies

| Strategy | Break Which Condition | How |
|----------|----------------------|-----|
| Lock ordering | Circular wait | Always acquire locks in same global order |
| Lock timeout | Hold and wait | Give up after timeout, retry |
| All-or-nothing | Hold and wait | Request ALL resources at once |
| Preemption | No preemption | OS can forcibly take resources |
| `std::scoped_lock` | Circular wait | Atomically lock multiple mutexes |

### 💻 Deadlock Example (Dining Philosophers)

```
5 philosophers sit around a table.
Each needs 2 forks to eat.
Each picks up LEFT fork, then RIGHT fork.

If ALL pick up their LEFT fork simultaneously → 
  everyone holds 1 fork, waiting for the neighbor's → DEADLOCK!

FIX: Make one philosopher pick up RIGHT fork first (breaks circular wait)
```

---

## 3. CPU Scheduling

```
Process arrives → [Ready Queue] → CPU executes → [Completed / I/O wait]
                       ↑                              │
                       └──────────────────────────────┘
                         (I/O complete → back to ready)
```

### Algorithms

| Algorithm | Type | How It Works | Pros | Cons |
|-----------|------|-------------|------|------|
| **FCFS** | Non-preemptive | First come, first served | Simple | Convoy effect (long job blocks all) |
| **SJF** | Non-preemptive | Shortest job first | Optimal avg wait time | Starvation of long jobs |
| **SRTF** | Preemptive | Shortest remaining time | Better than SJF | Starvation + overhead |
| **Round Robin** | Preemptive | Fixed time quantum (e.g., 10ms) | Fair, good for interactive | Bad if quantum too large/small |
| **Priority** | Both | Highest priority first | Important tasks first | Starvation (fix: aging) |
| **MLFQ** | Preemptive | Multiple queues with different priorities | Adapts to behavior | Complex |

### Round Robin Example

```
Time Quantum = 3ms
Processes: P1(burst=7), P2(burst=3), P3(burst=5)

Timeline:
[P1:3ms][P2:3ms][P3:3ms][P1:3ms][P3:2ms][P1:1ms]
  0-3     3-6     6-9    9-12   12-14   14-15

P2 finishes at t=6  (wait: 3ms)
P3 finishes at t=14 (wait: 6ms)
P1 finishes at t=15 (wait: 5ms)
Avg wait = (3+6+5)/3 = 4.67ms
```

---

## 4. Memory Management

### Virtual Memory & Paging

```
VIRTUAL MEMORY                    PHYSICAL MEMORY (RAM)
┌─────────┐                      ┌─────────┐
│ Page 0  │───────── maps to ───→│ Frame 5 │
│ Page 1  │───────── maps to ───→│ Frame 2 │
│ Page 2  │──→ ON DISK (swapped) │ Frame 8 │
│ Page 3  │───────── maps to ───→│ Frame 0 │
│ Page 4  │──→ ON DISK (swapped) │         │
└─────────┘                      └─────────┘
                   ↑
              PAGE TABLE
         (maps virtual → physical)
```

**Page Fault:** CPU tries to access a page not in RAM → OS loads it from disk → VERY slow (~10ms vs ~100ns for RAM).

### Page Replacement Algorithms

| Algorithm | Strategy | Description |
|-----------|----------|-------------|
| **FIFO** | Oldest first | Simple but poor (Belady's anomaly) |
| **LRU** | Least recently used | Good but expensive to track |
| **Optimal** | Replace page needed farthest in future | Theoretical best (impossible to implement) |

### Thrashing

```
Process needs 100 pages but only 50 frames available
→ Constant page faults → More time swapping than executing
→ CPU utilization drops to near 0%

FIX: Reduce degree of multiprogramming (fewer processes)
     or add more RAM
```

---

## 5. Inter-Process Communication (IPC)

```
┌──────────┐                    ┌──────────┐
│ Process A│                    │ Process B│
└─────┬────┘                    └────┬─────┘
      │                              │
      │    ┌────────────────────┐    │
      ├───→│  Pipe (one-way)   │───→┤
      │    └────────────────────┘    │
      │                              │
      │    ┌────────────────────┐    │
      ├───→│  Message Queue    │←──→┤
      │    └────────────────────┘    │
      │                              │
      │    ┌────────────────────┐    │
      ├───→│  Shared Memory    │←──→┤  ← Fastest (no kernel involvement)
      │    └────────────────────┘    │
      │                              │
      ├────── Socket ───────────────→┤  ← Works across network too
```

| IPC Method | Speed | Complexity | Use Case |
|-----------|-------|-----------|----------|
| Pipe | Medium | Low | Parent-child process |
| Message Queue | Medium | Medium | Decoupled processes |
| Shared Memory | Fastest | High (need sync) | High-performance data sharing |
| Socket | Slower | Medium | Network communication |

---

## 6. Mutex vs Semaphore

```
MUTEX (Binary Lock)              SEMAPHORE (Counting)
┌────────────────┐               ┌────────────────┐
│ Only 1 thread  │               │ N threads can   │
│ can enter      │               │ enter (N = max) │
│                │               │                 │
│ Lock owner     │               │ No ownership    │
│ must unlock    │               │ Any thread can   │
│                │               │ signal           │
│ Example:       │               │ Example:         │
│ Bathroom key   │               │ Parking lot      │
│ (1 person)     │               │ (N spots)        │
└────────────────┘               └────────────────┘
```

| Feature | Mutex | Semaphore |
|---------|-------|-----------|
| Type | Binary (locked/unlocked) | Counting (0 to N) |
| Ownership | Yes (locker must unlock) | No |
| Use case | Protect critical section | Limit concurrent access |
| Example | DB write lock | Connection pool (max 20) |

---

## 7. Important Concepts

### Context Switch
```
Process A running → Timer interrupt / I/O wait
  → Save A's state (registers, PC, stack pointer) to PCB
  → Load B's state from PCB
  → Process B runs

Cost: ~1-10 microseconds (expensive! involves cache flush)
```

### User Mode vs Kernel Mode
```
User Mode:    Your application code runs here
              Limited access (can't access hardware directly)
              
Kernel Mode:  OS kernel runs here
              Full hardware access
              
System Call:  User mode → Kernel mode transition
              e.g., read(), write(), fork(), exec()
              Each syscall has overhead (~1μs)
```

---

## ⚡ Quick Revision

| Concept | One-liner |
|---------|-----------|
| Process vs Thread | Process = own memory space; Thread = shares memory, lighter |
| Deadlock conditions | Mutual exclusion + hold & wait + no preemption + circular wait |
| Deadlock prevention | Break any one condition (e.g., lock ordering, timeout) |
| Virtual memory | Illusion of more RAM; uses disk as overflow; page table maps virtual→physical |
| Page fault | Page not in RAM → load from disk → ~10ms penalty |
| Thrashing | Too many page faults → CPU idle → reduce multiprogramming |
| Context switch | Save/restore process state; ~1-10μs; cache becomes cold |
| Mutex | Binary lock with ownership; one thread at a time |
| Semaphore | Counting lock; allows N concurrent threads |
| Round Robin | Fair scheduling; fixed time quantum; good for interactive systems |
| Starvation | Process never gets CPU; fix with aging (increase priority over time) |
