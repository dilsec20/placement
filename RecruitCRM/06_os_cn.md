# OS & Computer Networks — Interview Questions (Recruit CRM + TCS)

---

## SECTION 1: Operating System Concepts

---

### Q1. What is an Operating System?

An OS is **system software** that manages hardware resources and provides services to application programs.

**Functions:**
- Process management
- Memory management
- File system management
- I/O management
- Security & access control

---

### Q2. Process vs Thread

| Feature | Process | Thread |
| :--- | :--- | :--- |
| **Definition** | Independent program in execution | Lightweight unit within a process |
| **Memory** | Own memory space (heap, stack, data) | Shares process memory (heap, data); own stack |
| **Creation** | Expensive (fork) | Cheap |
| **Communication** | IPC (pipes, sockets, shared memory) | Shared memory (direct) |
| **Crash** | One process crash doesn't affect others | One thread crash can kill the process |
| **Context Switch** | Expensive | Faster |

```
Process A                     Process B
┌───────────────────┐        ┌───────────────────┐
│ Code  │ Data │ Heap│        │ Code  │ Data │ Heap│
│ ┌─────┐ ┌─────┐  │        │ ┌─────┐ ┌─────┐  │
│ │ T1  │ │ T2  │  │        │ │ T1  │ │ T2  │  │
│ │Stack│ │Stack│  │        │ │Stack│ │Stack│  │
│ └─────┘ └─────┘  │        │ └─────┘ └─────┘  │
└───────────────────┘        └───────────────────┘
  (Separate memory)            (Separate memory)
```

---

### Q3. Process States

```
               ┌──────────┐
    Created ──►│  READY   │◄─── I/O Complete / Event
               └────┬─────┘
                    │ Scheduler dispatch
                    ▼
               ┌──────────┐
               │ RUNNING  │
               └──┬───┬───┘
        I/O wait  │   │ Completed
                  ▼   ▼
           ┌──────────┐  ┌────────────┐
           │ WAITING  │  │ TERMINATED │
           └──────────┘  └────────────┘
```

| State | Description |
| :--- | :--- |
| **New** | Process created |
| **Ready** | Waiting for CPU |
| **Running** | Currently executing on CPU |
| **Waiting/Blocked** | Waiting for I/O or event |
| **Terminated** | Execution completed |

---

### Q4. CPU Scheduling Algorithms

| Algorithm | Type | Preemptive? | Starvation? |
| :--- | :--- | :---: | :---: |
| **FCFS** (First Come First Serve) | Non-preemptive | ❌ | ❌ |
| **SJF** (Shortest Job First) | Non-preemptive | ❌ | ✅ Yes |
| **SRTF** (Shortest Remaining Time) | Preemptive SJF | ✅ | ✅ Yes |
| **Round Robin** | Preemptive | ✅ | ❌ |
| **Priority Scheduling** | Can be both | ✅ | ✅ (solved by aging) |

**Round Robin:** Each process gets a fixed time quantum. After the quantum expires, the process moves to the back of the ready queue.

---

### Q5. What is a Deadlock?

**Deadlock** = Two or more processes waiting indefinitely for resources held by each other.

**4 Necessary Conditions (ALL must hold simultaneously):**
1. **Mutual Exclusion** — At least one resource must be non-sharable
2. **Hold and Wait** — Process holds one resource, waits for another
3. **No Preemption** — Resources cannot be forcibly taken
4. **Circular Wait** — Circular chain of processes waiting

**Prevention** — Break any ONE condition:
- **No Circular Wait** → Impose ordering on resource requests
- **No Hold and Wait** → Request all resources at once
- **Allow Preemption** → If a resource can't be acquired, release held resources

**Detection & Recovery:**
- Use Resource Allocation Graph (RAG)
- Kill process / Rollback / Preempt resources

---

### Q6. Mutex vs Semaphore

| Feature | Mutex | Semaphore |
| :--- | :--- | :--- |
| **Type** | Locking mechanism | Signaling mechanism |
| **Value** | Binary (0 or 1) | Integer (0 to N) |
| **Ownership** | Yes (only holder can unlock) | No (any thread can signal) |
| **Use Case** | Exclusive access to 1 resource | Controlling access to N resources |

```
Mutex: Only ONE thread in critical section at a time
Semaphore(N): Up to N threads can access simultaneously
```

---

### Q7. What is Virtual Memory?

Virtual memory creates an illusion that each process has its own large, contiguous memory.

```
Virtual Address Space         Physical Memory (RAM)
┌────────────────┐           ┌────────────────┐
│ Page 0         │──────────►│ Frame 5        │
│ Page 1         │──────────►│ Frame 2        │
│ Page 2         │──── X     │ (on disk)      │  ← Page Fault!
│ Page 3         │──────────►│ Frame 7        │
└────────────────┘           └────────────────┘
```

**Page Fault:** When accessed page is not in RAM → OS loads it from disk.
**Thrashing:** Excessive page faults → system spends more time swapping than executing.

---

### Q8. Paging vs Segmentation

| Feature | Paging | Segmentation |
| :--- | :--- | :--- |
| **Division** | Fixed-size pages | Variable-size segments |
| **Internal Fragmentation** | Yes | No |
| **External Fragmentation** | No | Yes |
| **Basis** | Physical memory structure | Logical program structure |
| **Address** | Page number + offset | Segment number + offset |

---

### Q9. What is Context Switching?

**Context Switch** = Saving the state of a running process/thread and loading the state of another.

**Steps:**
1. Save current process's registers, program counter, stack pointer → PCB
2. Load new process's state from its PCB
3. Resume execution of new process

**Cost:** Context switching has overhead — saving/loading registers, cache invalidation.

---

### Q10. What is a System Call?

A **system call** is the interface between user programs and the OS kernel.

| Type | Examples |
| :--- | :--- |
| **Process** | fork(), exec(), wait(), exit() |
| **File** | open(), read(), write(), close() |
| **Device** | ioctl(), read(), write() |
| **Information** | getpid(), alarm(), sleep() |
| **Communication** | pipe(), socket(), send(), recv() |

---

### Q11. What is a Kernel?

The **kernel** is the core of the OS that manages all system resources.

| Type | Description | Example |
| :--- | :--- | :--- |
| **Monolithic** | All services in kernel space | Linux |
| **Microkernel** | Minimal kernel, services in user space | Minix |
| **Hybrid** | Combination | Windows NT, macOS |

---

## SECTION 2: Computer Networks

---

### Q12. OSI Model (7 Layers)

```
Layer 7: Application    → HTTP, FTP, SMTP, DNS     (User interface)
Layer 6: Presentation   → Encryption, Compression   (Data format)
Layer 5: Session        → Session management         (Connection)
Layer 4: Transport      → TCP, UDP                   (End-to-end delivery)
Layer 3: Network        → IP, ICMP, Routing          (Logical addressing)
Layer 2: Data Link      → MAC, Ethernet, Switch      (Physical addressing)
Layer 1: Physical       → Cables, Signals, Hubs      (Bits transmission)
```

**Mnemonic:** "**A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing"

---

### Q13. TCP vs UDP

| Feature | TCP | UDP |
| :--- | :--- | :--- |
| **Type** | Connection-oriented | Connectionless |
| **Reliability** | Reliable (ACK, retransmission) | Unreliable |
| **Ordering** | Guaranteed (sequence numbers) | Not guaranteed |
| **Speed** | Slower | Faster |
| **Header Size** | 20-60 bytes | 8 bytes |
| **Use Cases** | HTTP, Email, File Transfer | Video streaming, DNS, Gaming |

---

### Q14. TCP 3-Way Handshake

```
Client                    Server
  │                         │
  │ ──── SYN (seq=x) ────► │    1. Client sends SYN
  │                         │
  │ ◄── SYN-ACK ────────── │    2. Server sends SYN + ACK (seq=y, ack=x+1)
  │    (seq=y, ack=x+1)    │
  │                         │
  │ ──── ACK (ack=y+1) ──► │    3. Client sends ACK
  │                         │
  │ ◄═══ DATA TRANSFER ═══►│    Connection established!
```

**Connection Termination (4-Way):**
```
Client ── FIN ──► Server
Client ◄── ACK ── Server
Client ◄── FIN ── Server
Client ── ACK ──► Server
```

---

### Q15. HTTP vs HTTPS

| Feature | HTTP | HTTPS |
| :--- | :--- | :--- |
| **Port** | 80 | 443 |
| **Security** | No encryption | SSL/TLS encryption |
| **Certificate** | Not required | SSL certificate required |
| **Speed** | Faster | Slightly slower (encryption overhead) |
| **SEO** | No benefit | Google prefers HTTPS |

**HTTPS = HTTP + SSL/TLS**

---

### Q16. What is DNS?

**DNS** (Domain Name System) = Translates domain names to IP addresses.

```
User types: www.google.com
     │
     ▼
Browser Cache → OS Cache → Router Cache → ISP DNS → Root DNS → TLD (.com) → Authoritative DNS
     │
     ▼
IP: 142.250.192.46
```

---

### Q17. What happens when you type a URL in the browser?

1. **DNS Resolution** → Domain name → IP address
2. **TCP Connection** → 3-way handshake with server
3. **TLS Handshake** (if HTTPS) → Encrypt connection
4. **HTTP Request** → Browser sends GET request
5. **Server Processing** → Server processes request
6. **HTTP Response** → Server sends HTML/JSON
7. **Browser Rendering** → Parse HTML, CSS, JS → render page
8. **Connection Close** → TCP 4-way termination (or keep-alive)

---

### Q18. REST API — How does your AceCoder communicate?

```
Client (Browser)
    │
    │ HTTP Request: GET /api/problems?page=1
    │ Headers: Authorization: Bearer <JWT>
    │
    ▼
Server (Node.js + Express.js)
    │
    │ 1. JWT Middleware → Verify token
    │ 2. Route Handler → /api/problems
    │ 3. Controller → Query PostgreSQL
    │ 4. Response: 200 OK + JSON body
    │
    ▼
Client receives JSON
```

---

### Q19. What are Cookies vs Sessions vs JWT?

| Feature | Cookies | Sessions | JWT |
| :--- | :--- | :--- | :--- |
| **Storage** | Client (browser) | Server (memory/DB) | Client (local storage/cookie) |
| **Stateful/Stateless** | Stateless | Stateful | Stateless |
| **Size Limit** | 4KB | No limit | ~8KB |
| **Security** | Vulnerable to XSS, CSRF | More secure (server-side) | Self-contained, signed |
| **Scalability** | Good | Poor (server memory) | Good (no server state) |

**Your AceCoder uses JWT because:**
- Stateless → works well with REST APIs
- No server-side session storage needed
- Contains user info (id, role) in the token itself
- Scalable — works across multiple servers

---

### Q20. What is CORS?

**CORS** (Cross-Origin Resource Sharing) = Browser security mechanism that restricts cross-origin HTTP requests.

```
Frontend: https://acecoder.site (Origin A)
Backend:  https://api.acecoder.site (Origin B)

Without CORS headers → Browser blocks the request!
```

**Solution:**
```javascript
// Express.js
app.use(cors({
    origin: 'https://acecoder.site',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
```

---

### Q21. IP Address Classes (Quick Reference)

| Class | Range | Default Subnet | Use |
| :--- | :--- | :--- | :--- |
| A | 1.0.0.0 – 126.0.0.0 | 255.0.0.0 | Large networks |
| B | 128.0.0.0 – 191.255.0.0 | 255.255.0.0 | Medium networks |
| C | 192.0.0.0 – 223.255.255.0 | 255.255.255.0 | Small networks |
| D | 224.0.0.0 – 239.255.255.255 | — | Multicasting |
| E | 240.0.0.0 – 255.255.255.255 | — | Research |

**Private IP Ranges (not routable on internet):**
- 10.0.0.0 – 10.255.255.255 (Class A)
- 172.16.0.0 – 172.31.255.255 (Class B)
- 192.168.0.0 – 192.168.255.255 (Class C)
