# Operating Systems (OS) - Virtusa & Placement OA Master Guide

---

## SECTION 1: High-Yield Revision Notes & GATE/OA Formulas

### 1. Process & Thread Management
- **Process vs Program**: A program is a passive entity stored on disk; a process is an active entity executing in memory with a Process Control Block (PCB).
- **PCB Components**: Process ID (PID), Program Counter (PC), CPU Registers, Memory Limits, Priority, Open File List.
- **Process States**: New $\rightarrow$ Ready $\rightarrow$ Running $\rightarrow$ Waiting (Blocked) $\rightarrow$ Terminated.
- **Context Switch Overhead**: The time taken by the OS to save the state of a running process and restore the state of another. It is pure overhead (no useful work done).
- **Threads**: Lightweight processes sharing Code, Data, and OS resources (files), but having their own **Program Counter, Stack, and Registers**.

---

### 2. CPU Scheduling & GATE Formulas

#### Key Metrics & Formulas
1. **Turnaround Time (TAT)**:
   $$\text{TAT} = \text{Completion Time (CT)} - \text{Arrival Time (AT)}$$
2. **Waiting Time (WT)**:
   $$\text{WT} = \text{Turnaround Time (TAT)} - \text{Burst Time (BT)}$$
3. **Response Time (RT)**:
   $$\text{RT} = \text{First CPU Allocation Time} - \text{Arrival Time (AT)}$$
4. **CPU Utilization**:
   $$\text{CPU Utilization} = \frac{\sum \text{Burst Times}}{\text{Total Time Elapsed}} \times 100\%$$
5. **Throughput**:
   $$\text{Throughput} = \frac{\text{Total Processes Completed}}{\text{Total Time Elapsed}}$$

#### Scheduling Algorithms Summary
| Algorithm | Mode | Selection Criteria | Key Feature / Trap |
| :--- | :--- | :--- | :--- |
| **FCFS** | Non-preemptive | Arrival Time | Subject to **Convoy Effect** (short jobs wait for long job). |
| **SJF** | Non-preemptive | Burst Time | Optimal for minimum average waiting time; requires future knowledge. |
| **SRTF** | Preemptive | Remaining Burst Time | Preemptive version of SJF; can cause starvation of long jobs. |
| **Round Robin (RR)** | Preemptive | Time Quantum ($q$) | If $q \rightarrow \infty$, behaves like FCFS. If $q \rightarrow 0$, context switch overhead spikes. |
| **Priority** | Both | Priority Number | Subject to **Starvation**. Solved by **Aging** (gradually increasing priority of waiting processes). |

---

### 3. Process Synchronization & Semaphores

- **Critical Section Requirements**:
  1. **Mutual Exclusion** (Mandatory): Only one process in CS at a time.
  2. **Progress** (Mandatory): Only processes wishing to enter CS participate in the decision.
  3. **Bounded Waiting** (Mandatory): Limit on how many times other processes can enter CS before a waiting process gets access.
  4. **Architectural Neutrality / Speed Independence**.

#### Semaphores
- **Counting Semaphore**: Can take any non-negative integer value.
- **Binary Semaphore**: Can only take values `0` or `1`.
- **Operations**:
  - $\text{Wait}(S)$ / $P(S)$: Decrements $S$. If $S < 0$, process blocks.
    $$\text{Wait}(S): S = S - 1; \quad \text{if } (S < 0) \{ \text{block process} \}$$
  - $\text{Signal}(S)$ / $V(S)$: Increments $S$. If $S \le 0$, wakes up a blocked process.
    $$\text{Signal}(S): S = S + 1; \quad \text{if } (S \le 0) \{ \text{wake up a process} \}$$

#### Semaphore Final Value Formula
If a counting semaphore is initialized to $S_{\text{init}}$, and has $P$ wait operations and $V$ signal operations:
$$S_{\text{final}} = S_{\text{init}} - P + V$$

---

### 4. Deadlocks & Banker's Algorithm Formulas

#### 4 Coffman Conditions for Deadlock
1. **Mutual Exclusion**
2. **Hold and Wait**
3. **No Preemption**
4. **Circular Wait**

#### Banker's Algorithm Matrices & Formulas
- $\text{Need}[i][j] = \text{Max}[i][j] - \text{Allocation}[i][j]$
- A state is **Safe** if there exists a execution sequence $\langle P_1, P_2, \dots, P_n \rangle$ where every process can satisfy its Max demand with $\text{Available} + \sum \text{Allocated}$.

#### Deadlock Free Resource Condition Formula
For $N$ processes, where each process requires at most $M$ units of a resource, the minimum number of total resource units $R$ required to ensure **NO DEADLOCK** can ever occur is:
$$R_{\min} = N \times (M - 1) + 1$$

---

### 5. Memory Management & Paging Formulas

- **Logical Address Space (LAS)** = $2^m$ bytes ($m$-bit CPU address).
- **Physical Address Space (PAS)** = $2^n$ bytes ($n$-bit main memory address).
- **Page Size ($P$)** = Frame Size = $2^p$ bytes.
- **Address Division**:
  - **Offset ($d$)** = $p$ bits.
  - **Page Number ($p\#$)** = $m - p$ bits.
  - **Frame Number ($f\#$)** = $n - p$ bits.
- **Number of Pages** = $\frac{\text{Process Size}}{\text{Page Size}} = 2^{m-p}$.
- **Number of Frames** = $\frac{\text{Physical Memory Size}}{\text{Page Size}} = 2^{n-p}$.
- **Page Table Size (PTS)**:
  $$\text{PTS} = \text{Number of Pages} \times \text{Page Table Entry Size (PTE Size)}$$

#### Effective Access Time (EAT) with TLB Formula
Given TLB Hit Ratio $h$, TLB Access Time $t_{\text{tlb}}$, and Main Memory Access Time $t_{\text{mem}}$:
$$\text{EAT} = h \times (t_{\text{tlb}} + t_{\text{mem}}) + (1 - h) \times (t_{\text{tlb}} + 2 \times t_{\text{mem}})$$
If multi-level paging with $k$ levels is used without TLB:
$$\text{Memory Access Time} = (k + 1) \times t_{\text{mem}}$$

---

### 6. Virtual Memory & Page Replacement Formulas

#### Page Fault Effective Access Time
Given Page Fault Rate $p$ (where $0 \le p \le 1$) and Page Fault Service Time $t_{\text{fault}}$:
$$\text{EAT} = (1 - p) \times t_{\text{mem}} + p \times t_{\text{fault}}$$

#### Belady's Anomaly
- Definition: Allocation of more physical frames leads to an **increase** in the number of page faults.
- Occurs in **FIFO** page replacement.
- Does **NOT** occur in Stack Algorithms like **LRU** and **Optimal (OPT)**.

---

### 7. Disk Management & RAID Architecture Formulas

#### Disk Terminology & Geometry
- **Sector**: Smallest physical storage unit on a disk platter (typically 512 bytes or 4 KB).
- **Track**: Concentric ring on a platter surface containing sectors.
- **Cylinder**: Set of all tracks across platters located at the same radial distance from the spindle.
- **Cluster**: Smallest logical unit of disk allocation managed by the File System ($\text{Cluster Size} = k \times \text{Sector Size}$).

#### Disk Speed & Access Time Formulas
1. **Average Rotational Latency ($T_{\text{rot}}$)**:
   $$T_{\text{rot}} = \frac{1}{2} \times \frac{60}{\text{RPM}} \text{ seconds} = \frac{30,000}{\text{RPM}} \text{ ms}$$
2. **Data Transfer Rate ($TR$)**:
   $$\text{Transfer Rate} = \text{Track Capacity} \times \frac{\text{RPM}}{60} \text{ bytes/sec}$$
3. **Data Transfer Time ($T_{\text{trans}}$)**:
   $$T_{\text{trans}} = \frac{\text{File Size}}{\text{Transfer Rate}} = \frac{\text{File Size}}{\text{Track Capacity}} \times \frac{60}{\text{RPM}}$$
4. **Total Disk Access Time**:
   $$\text{Total Access Time} = \text{Seek Time } (T_{\text{seek}}) + \text{Rotational Latency } (T_{\text{rot}}) + \text{Transfer Time } (T_{\text{trans}}) + \text{Controller Overhead}$$

#### RAID Architecture & Efficiency Table
For $N$ identical disks of capacity $S$:

| RAID Level | Description | Usable Storage Capacity | Fault Tolerance | Read / Write Performance |
| :--- | :--- | :---: | :---: | :--- |
| **RAID 0** | Striping (No Redundancy) | $N \times S$ | 0 Disks | Extremely High Read & Write |
| **RAID 1** | Mirroring | $\frac{N}{2} \times S$ | Up to $\frac{N}{2}$ Disks | Fast Read, Slow Write |
| **RAID 5** | Striping with Distributed Parity | $(N - 1) \times S$ | 1 Disk | High Read, Parity Write Overhead |
| **RAID 6** | Striping with Dual Parity | $(N - 2) \times S$ | 2 Disks | Very High Read, Double Parity Overhead |
| **RAID 10 (1+0)** | Striping over Mirrored Sets | $\frac{N}{2} \times S$ | 1 per mirror pair | Max Speed + High Redundancy |

---

### 8. Linux/Unix System Calls & Commands

#### `fork()` Process Tree Formula
If $n$ consecutive `fork()` statements are executed in a C program:
- **Total processes created** (including main parent): $2^n$
- **Total child processes created**: $2^n - 1$

---

## SECTION 2: Worked GATE & OA Numerical Master Problems

---

### Problem 1: Virtual Memory vs Physical RAM Calculation ($4\text{ GB}$ RAM, $32\text{ GB}$ Virtual Memory)
**Given**:
- Physical Memory (RAM) $= 4\text{ GB} = 2^{32}\text{ bytes}$.
- Virtual Memory Space $= 32\text{ GB} = 2^{35}\text{ bytes}$.
- Page Size $= 4\text{ KB} = 2^{12}\text{ bytes}$.
- Page Table Entry (PTE) size $= 4\text{ bytes}$.

**Find**:
1. Number of bits required for Logical Address ($m$) and Physical Address ($n$).
2. Page Offset bits ($d$).
3. Number of Virtual Pages and Number of Physical Frames.
4. Total Page Table Size required for a process using full virtual memory.

**Solution**:
1. **Address Bits**:
   - Virtual Memory $= 32\text{ GB} = 2^{35}$ bytes $\Rightarrow \mathbf{m = 35 \text{ bits}}$ (Logical Address).
   - RAM $= 4\text{ GB} = 2^{32}$ bytes $\Rightarrow \mathbf{n = 32 \text{ bits}}$ (Physical Address).
2. **Page Offset ($d$)**:
   - Page Size $= 4\text{ KB} = 2^{12}$ bytes $\Rightarrow \mathbf{d = 12 \text{ bits}}$.
3. **Pages and Frames**:
   - Virtual Page Number bits $p = 35 - 12 = \mathbf{23 \text{ bits}}$.
   - Number of Virtual Pages $= 2^{23} = \mathbf{8,388,608 \text{ pages}}$.
   - Physical Frame Number bits $f = 32 - 12 = \mathbf{20 \text{ bits}}$.
   - Number of Physical Frames $= 2^{20} = \mathbf{1,048,576 \text{ frames}}$.
4. **Page Table Size**:
   $$\text{PTS} = \text{Number of Virtual Pages} \times \text{PTE Size} = 2^{23} \times 4\text{ bytes} = 2^{23} \times 2^2\text{ bytes} = 2^{25}\text{ bytes} = \mathbf{32 \text{ MB}}.$$

---

### Problem 2: Segmentation Address Translation & Trap Detection
**Given**:
System uses Segmentation. The Segment Table is stored as follows:

| Segment No ($s$) | Base Address | Limit (Segment Length) |
| :---: | :---: | :---: |
| 0 | 219 | 600 |
| 1 | 2300 | 140 |
| 2 | 90 | 100 |
| 3 | 1327 | 580 |

**Find**: Calculate the Physical Address or identify if a **Segmentation Fault (Trap)** occurs for the following logical addresses $\langle s, d \rangle$:
1. Address A: $\langle 1, 100 \rangle$
2. Address B: $\langle 2, 120 \rangle$
3. Address C: $\langle 3, 580 \rangle$
4. Address D: $\langle 0, 450 \rangle$

**Solution**:
Rule: A logical address $\langle s, d \rangle$ is valid if and only if **$\text{Offset } d < \text{Limit}$**.
If $d < \text{Limit} \Rightarrow \text{Physical Address} = \text{Base} + d$.
If $d \ge \text{Limit} \Rightarrow \text{SEGMENTATION FAULT (TRAP)!}$

1. **Address A $\langle 1, 100 \rangle$**:
   - Segment 1: Base = 2300, Limit = 140.
   - Check: $100 < 140$ (VALID!).
   - Physical Address $= 2300 + 100 = \mathbf{2400}$.

2. **Address B $\langle 2, 120 \rangle$**:
   - Segment 2: Base = 90, Limit = 100.
   - Check: $120 \ge 100$ $\rightarrow$ **INVALID!**
   - Result: **SEGMENTATION FAULT / TRAP TO OS (Memory Access Violation)**.

3. **Address C $\langle 3, 580 \rangle$**:
   - Segment 3: Base = 1327, Limit = 580.
   - Check: $580 \ge 580$ (Offset equal to limit is out of bounds because valid offsets are $0$ to $\text{Limit}-1$) $\rightarrow$ **INVALID!**
   - Result: **SEGMENTATION FAULT / TRAP TO OS**.

4. **Address D $\langle 0, 450 \rangle$**:
   - Segment 0: Base = 219, Limit = 600.
   - Check: $450 < 600$ (VALID!).
   - Physical Address $= 219 + 450 = \mathbf{669}$.

---

### Problem 3: LRU Page Replacement Trace & Page Fault Ratio
**Given**:
- Page Reference String: `7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2`
- Physical Memory Frames $= 3$ (Initially empty).

**Find**: Step-by-step frame contents using Least Recently Used (LRU), total Page Faults, and Page Fault Rate.

**Solution**:

| Ref Page | Frame 1 | Frame 2 | Frame 3 | Page Fault? | Reason / LRU Evicted Page |
| :---: | :---: | :---: | :---: | :---: | :--- |
| **7** | 7 | - | - | **FAULT (1)** | Loaded into empty Frame 1 |
| **0** | 7 | 0 | - | **FAULT (2)** | Loaded into empty Frame 2 |
| **1** | 7 | 0 | 1 | **FAULT (3)** | Loaded into empty Frame 3 |
| **2** | 2 | 0 | 1 | **FAULT (4)** | Evicts `7` (Least recently used among {7, 0, 1}) |
| **0** | 2 | 0 | 1 | HIT | Page `0` already present |
| **3** | 2 | 0 | 3 | **FAULT (5)** | Evicts `1` (Least recently used among {2, 0, 1}) |
| **0** | 2 | 0 | 3 | HIT | Page `0` already present |
| **4** | 4 | 0 | 3 | **FAULT (6)** | Evicts `2` (Least recently used among {2, 0, 3}) |
| **2** | 4 | 0 | 2 | **FAULT (7)** | Evicts `3` (Least recently used among {4, 0, 3}) |
| **3** | 4 | 3 | 2 | **FAULT (8)** | Evicts `0` (Least recently used among {4, 0, 2}) |
| **0** | 0 | 3 | 2 | **FAULT (9)** | Evicts `4` (Least recently used among {4, 3, 2}) |
| **3** | 0 | 3 | 2 | HIT | Page `3` already present |
| **2** | 0 | 3 | 2 | HIT | Page `2` already present |

- **Total References** $= 13$.
- **Total Page Faults** $= \mathbf{9}$.
- **Page Hits** $= 13 - 9 = 4$.
- **Page Fault Rate** $= \frac{9}{13} \times 100\% = \mathbf{69.23\%}$.

---

### Problem 4: Maximum Page Fault Rate for Target EAT
**Given**:
- Main Memory Access Time ($t_{\text{mem}}$) $= 100\text{ ns}$.
- Page Fault Service Time ($t_{\text{fault}}$) $= 8\text{ ms} = 8,000,000\text{ ns}$.
- Desired Effective Access Time ($\text{EAT}$) $\le 200\text{ ns}$.

**Find**: Maximum allowable Page Fault Rate ($p$).

**Solution**:
$$\text{EAT} = (1 - p) \times t_{\text{mem}} + p \times t_{\text{fault}}$$
$$200 = (1 - p) \times 100 + p \times 8,000,000$$
$$200 = 100 - 100p + 8,000,000p$$
$$100 = 7,999,900p$$
$$p = \frac{100}{7,999,900} \approx 0.0000125 = \mathbf{1.25 \times 10^{-5} \text{ (or 0.00125\%)}}$$
*Conclusion*: To keep memory slowdown within $2\times$, less than 1 in 80,000 memory accesses can result in a page fault!

---

### Problem 5: Multi-Level Paging (Two-Level vs Three-Level Paging Access Time)
**Given**:
- Main Memory Access Time $= 100\text{ ns}$.
- TLB Search Time $= 20\text{ ns}$.
- TLB Hit Ratio $h = 85\% = 0.85$.

**Find**:
1. Access Time without TLB for a **4-level paging system**.
2. Effective Access Time (EAT) with TLB for a **4-level paging system**.

**Solution**:
1. **Without TLB**:
   Each memory access requires accessing 4 page tables in RAM + 1 final RAM access for actual data.
   $$\text{Access Time} = (4 + 1) \times t_{\text{mem}} = 5 \times 100\text{ ns} = \mathbf{500 \text{ ns}}.$$

2. **With TLB ($h = 0.85$)**:
   - On TLB Hit: $t_{\text{tlb}} + t_{\text{mem}} = 20 + 100 = 120\text{ ns}$.
   - On TLB Miss: $t_{\text{tlb}} + (4 + 1) \times t_{\text{mem}} = 20 + 500 = 520\text{ ns}$.
   $$\text{EAT} = h \times 120 + (1 - h) \times 520 = 0.85 \times 120 + 0.15 \times 520 = 102 + 78 = \mathbf{180 \text{ ns}}.$$

---

### Problem 6: Inverted Page Table Overhead
**Given**:
- 64-bit Architecture ($64$-bit logical address space).
- Page Size $= 16\text{ KB} = 2^{14}\text{ bytes}$.
- Physical Memory (RAM) $= 16\text{ GB} = 2^{34}\text{ bytes}$.
- Page Table Entry (PTE) size $= 8\text{ bytes}$.

**Find**:
1. Size of traditional single-level Page Table per process.
2. Size of an Inverted Page Table for the entire system.

**Solution**:
1. **Traditional Page Table**:
   - Page Number bits $p = 64 - 14 = 50\text{ bits}$.
   - Number of Pages $= 2^{50}$.
   - **Traditional PTS** $= 2^{50} \times 8\text{ bytes} = 8 \times 2^{50}\text{ bytes} = \mathbf{8 \text{ PB (Petabytes)!}}$ *(Impractical for single-level paging)*.

2. **Inverted Page Table**:
   - Inverted Page Table size is proportional to **Physical RAM Frames**, not virtual pages!
   - Number of Frames $= \frac{\text{RAM Size}}{\text{Page Size}} = \frac{2^{34}}{2^{14}} = 2^{20} = 1,048,576\text{ frames}$.
   - **Inverted PTS** $= 2^{20} \times 8\text{ bytes} = 8\text{ MB}$.
   *Conclusion*: Inverted Page Table reduces table size from 8 PB down to **8 MB**!

---

### Problem 7: Disk Scheduling Head Movements (SSTF vs SCAN)
**Given**:
- Disk Queue Requests: `98, 183, 37, 122, 14, 124, 65, 67`
- Initial Read/Write Head position $= 53$.
- Disk cylinders $= 0$ to $199$.
- Direction for SCAN $= \text{Towards higher cylinder numbers (199)}$.

**Find**: Total Head Movements for **SSTF** and **SCAN**.

**Solution**:
1. **SSTF (Shortest Seek Time First)**:
   - Start at $53$.
   - Closest to $53$: $65$ (Diff $= |65-53| = 12$).
   - Next closest from $65$: $67$ (Diff $= 2$).
   - Next closest from $67$: $37$ (Diff $= 30$).
   - Next closest from $37$: $14$ (Diff $= 23$).
   - Next closest from $14$: $98$ (Diff $= 84$).
   - Next closest from $98$: $122$ (Diff $= 24$).
   - Next closest from $122$: $124$ (Diff $= 2$).
   - Next closest from $124$: $183$ (Diff $= 59$).
   - **Total Head Movement (SSTF)** $= 12 + 2 + 30 + 23 + 84 + 24 + 2 + 59 = \mathbf{236 \text{ cylinders}}$.

2. **SCAN (Elevator)**:
   - Head moves up towards $199$: $53 \rightarrow 65 \rightarrow 67 \rightarrow 98 \rightarrow 122 \rightarrow 124 \rightarrow 183 \rightarrow 199$.
   - Head reverses at end boundary $199$ and moves down: $199 \rightarrow 37 \rightarrow 14$.
   - **Total Head Movement (SCAN)** $= (199 - 53) + (199 - 14) = 146 + 185 = \mathbf{331 \text{ cylinders}}$.

---

### Problem 8: Disk Rotational Speed, Transfer Rate & Total Access Time
**Given**:
- Disk Spindle Speed $= 7200\text{ RPM}$.
- Average Seek Time $= 6\text{ ms}$.
- Capacity per Track $= 500\text{ KB} = 500,000\text{ bytes}$.
- Target File Size $= 50\text{ KB} = 50,000\text{ bytes}$.

**Find**:
1. Average Rotational Latency.
2. Data Transfer Rate ($TR$).
3. Transfer Time for the $50\text{ KB}$ file.
4. Total Disk Access Time.

**Solution**:
1. **Average Rotational Latency**:
   $$T_{\text{rot}} = \frac{30,000}{\text{RPM}} = \frac{30,000}{7200} = \mathbf{4.167 \text{ ms}}.$$

2. **Data Transfer Rate ($TR$)**:
   $$TR = \text{Track Capacity} \times \frac{\text{RPM}}{60} = 500,000\text{ bytes} \times \frac{7200}{60} = 500,000 \times 120 = \mathbf{60,000,000 \text{ bytes/sec (60 MB/sec)}}.$$

3. **Transfer Time ($T_{\text{trans}}$)**:
   $$T_{\text{trans}} = \frac{\text{File Size}}{\text{Transfer Rate}} = \frac{50,000\text{ bytes}}{60,000,000\text{ bytes/sec}} = \frac{1}{1200}\text{ sec} = \mathbf{0.833 \text{ ms}}.$$

4. **Total Disk Access Time**:
   $$\text{Total Time} = T_{\text{seek}} + T_{\text{rot}} + T_{\text{trans}} = 6\text{ ms} + 4.167\text{ ms} + 0.833\text{ ms} = \mathbf{11.0 \text{ ms}}.$$

---

### Problem 9: File System Cluster Size & Wasted Space (Internal Fragmentation)
**Given**:
- File System Cluster Size $= 4\text{ KB} = 4096\text{ bytes}$.
- Sector Size $= 512\text{ bytes}$.

**Find**:
1. Number of sectors per cluster.
2. Space allocated on disk and wasted space (Internal Fragmentation) for:
   - File A: Size = $1\text{ KB} (1024\text{ bytes})$.
   - File B: Size = $10\text{ KB} (10,240\text{ bytes})$.

**Solution**:
1. **Sectors per Cluster**:
   $$\text{Sectors/Cluster} = \frac{4096}{512} = \mathbf{8 \text{ sectors}}.$$

2. **File A Allocation ($1024\text{ bytes}$)**:
   - Clusters required $= \lceil \frac{1024}{4096} \rceil = 1\text{ cluster} = 4096\text{ bytes}$.
   - Wasted Space $= 4096 - 1024 = \mathbf{3072 \text{ bytes (75\% wasted)}}.$

3. **File B Allocation ($10,240\text{ bytes}$)**:
   - Clusters required $= \lceil \frac{10240}{4096} \rceil = \lceil 2.5 \rceil = 3\text{ clusters} = 3 \times 4096 = 12,288\text{ bytes}$.
   - Wasted Space $= 12,288 - 10,240 = \mathbf{2048 \text{ bytes (16.67\% wasted)}}.$

---

### Problem 10: RAID 5 Storage Efficiency & Disk Failure Tolerance
**Given**:
A storage array consists of $5$ identical hard drives, each with a capacity of $2\text{ TB}$.

**Find**:
1. Total Raw Capacity.
2. Usable Storage Capacity under RAID 5.
3. Storage Efficiency percentage.
4. Maximum number of disk failures the array can tolerate without data loss.

**Solution**:
1. **Raw Capacity**:
   $$\text{Raw Capacity} = N \times S = 5 \times 2\text{ TB} = \mathbf{10 \text{ TB}}.$$
2. **RAID 5 Usable Capacity**:
   $$\text{Usable Capacity} = (N - 1) \times S = (5 - 1) \times 2\text{ TB} = 4 \times 2\text{ TB} = \mathbf{8 \text{ TB}}.$$
3. **Storage Efficiency**:
   $$\text{Efficiency} = \frac{N - 1}{N} \times 100\% = \frac{4}{5} \times 100\% = \mathbf{80\%}.$$
4. **Fault Tolerance**:
   RAID 5 can tolerate **at most 1 disk failure**. (If a 2nd disk fails before rebuilding, all data is lost. RAID 6 would tolerate 2 disk failures).

---

## SECTION 3: 300+ Practice MCQs for Virtusa & Company OA

1. What is the primary purpose of an Operating System?
   - A) To optimize hardware design
   - B) To manage computer resources and provide an interface to users
   - C) To run compiler diagnostics
   - D) To perform database management
   - **Answer**: B
   - **Explanation**: An OS acts as an intermediary between the user and hardware, managing resources like CPU, memory, and storage.

2. Which process state transition is valid when a running process requires I/O input?
   - A) Running $\rightarrow$ Ready
   - B) Running $\rightarrow$ Waiting (Blocked)
   - C) Waiting $\rightarrow$ Running
   - D) Ready $\rightarrow$ Waiting
   - **Answer**: B
   - **Explanation**: When a process makes an I/O request, it enters the Waiting/Blocked state until the I/O completes.

3. Context switching is performed by which component of the OS?
   - A) Long-Term Scheduler
   - B) Short-Term Scheduler / Dispatcher
   - C) Medium-Term Scheduler
   - D) Command Interpreter
   - **Answer**: B
   - **Explanation**: The dispatcher performs the actual context switch under the command of the short-term scheduler.

4. If a process creates a child using `fork()` in Unix, what is shared between parent and child by default?
   - A) Stack segment
   - B) Heap segment
   - C) Read-only code segment (via Copy-On-Write)
   - D) CPU register values
   - **Answer**: C
   - **Explanation**: Unix uses Copy-on-Write (COW). Memory pages are shared read-only until either process modifies a page.

5. What does the return value `0` of the `fork()` system call indicate?
   - A) System call failed
   - B) Execution inside the parent process
   - C) Execution inside the newly created child process
   - D) Process terminated abnormally
   - **Answer**: C
   - **Explanation**: `fork()` returns `0` to the child process and the PID of the child process to the parent.

6. Which CPU scheduling algorithm yields the minimum average waiting time for a given set of processes?
   - A) First-Come First-Served (FCFS)
   - B) Shortest Job First (SJF)
   - C) Round Robin (RR)
   - D) Priority Scheduling
   - **Answer**: B
   - **Explanation**: SJF is provably optimal because moving short processes ahead reduces waiting time for all subsequent processes.

7. Convoy Effect is associated with which scheduling algorithm?
   - A) Round Robin
   - B) Shortest Remaining Time First
   - C) First-Come First-Served
   - D) Priority Scheduling
   - **Answer**: C
   - **Explanation**: Convoy Effect occurs in FCFS when small processes wait behind a long CPU-bound process.

8. In Round Robin scheduling, if the time quantum is made extremely large, it degenerates into:
   - A) Shortest Job First
   - B) Priority Scheduling
   - C) First-Come First-Served
   - D) Multilevel Queue
   - **Answer**: C
   - **Explanation**: When the time quantum exceeds the longest process burst time, no process is preempted, making it FCFS.

9. Starvation in Priority Scheduling can be prevented using:
   - A) Paging
   - B) Aging
   - C) Mutual Exclusion
   - D) Deadlock Detection
   - **Answer**: B
   - **Explanation**: Aging gradually increases the priority of processes that wait in the system for a long time.

10. What is a critical section?
    - A) A section of memory reserved for the OS kernel
    - B) A segment of code accessing shared resources that must not be accessed concurrently
    - C) The initialization routine of a thread
    - D) A deadlock handling mechanism
    - **Answer**: B
    - **Explanation**: The critical section contains code accessing shared variables or hardware that requires mutual exclusion.

11. Peterson’s algorithm provides a solution to the critical section problem for:
    - A) $N$ processes
    - B) 2 processes
    - C) 3 processes
    - D) Any number of threads
    - **Answer**: B
    - **Explanation**: Classic Peterson's solution uses `flag[2]` and `turn` to guarantee mutual exclusion for exactly 2 processes.

12. A counting semaphore is initialized to `8`. Then `10` Wait operations and `4` Signal operations are performed. What is the final value of the semaphore?
    - A) 2
    - B) 4
    - C) 0
    - D) -2
    - **Answer**: A
    - **Explanation**: Formula: $S_{\text{final}} = S_{\text{init}} - P + V = 8 - 10 + 4 = 2$.

13. What happens when a process performs a `Wait(S)` operation on a semaphore $S$ whose value is `0`?
    - A) $S$ becomes `-1` and process continues
    - B) Process is placed into a waiting queue and blocked
    - C) Operating system terminates the process
    - D) $S$ resets to `1`
    - **Answer**: B
    - **Explanation**: When $S \le 0$, calling `Wait(S)` decrements $S$ and puts the process into the blocked/sleeping queue.

14. Which of the following is NOT a necessary condition for deadlock?
    - A) Mutual Exclusion
    - B) Preemption
    - C) Hold and Wait
    - D) Circular Wait
    - **Answer**: B
    - **Explanation**: The 4th condition is "No Preemption". If resources CAN be preempted, deadlock cannot occur.

15. Banker's algorithm is used for Deadlock:
    - A) Prevention
    - B) Avoidance
    - C) Detection
    - D) Recovery
    - **Answer**: B
    - **Explanation**: Banker's algorithm is a deadlock avoidance algorithm that ensures the system stays in a safe state before granting requests.

16. Minimum number of resources required to prevent deadlock for 4 processes, each needing 3 units of resources:
    - A) 8
    - B) 9
    - C) 12
    - D) 7
    - **Answer**: B
    - **Explanation**: Formula: $R_{\min} = N \times (M - 1) + 1 = 4 \times (3 - 1) + 1 = 4 \times 2 + 1 = 9$.

17. Internal Fragmentation is a drawback of which memory allocation scheme?
    - A) Paging
    - B) Dynamic Partitioning
    - C) Segmentation without paging
    - D) Pure Virtual Memory
    - **Answer**: A
    - **Explanation**: In paging, memory is allocated in fixed page sizes. If a process needs $10.1\text{ KB}$, a full $12\text{ KB}$ (3 pages of $4\text{ KB}$) is allocated, leaving internal fragmentation.

18. External Fragmentation can be eliminated by:
    - A) Paging
    - B) Compaction
    - C) Both A and B
    - D) Increasing page size
    - **Answer**: C
    - **Explanation**: Paging eliminates external fragmentation by using non-contiguous fixed frames; compaction reshuffles dynamic partitions.

19. Translation Lookaside Buffer (TLB) is a hardware cache used to store:
    - A) Recently accessed file blocks
    - B) Page table entries (Page number to Frame number mappings)
    - C) Process Control Blocks
    - D) CPU registers
    - **Answer**: B
    - **Explanation**: TLB speeds up virtual-to-physical address translation by caching recent page table entries inside the MMU.

20. Belady's Anomaly occurs in which page replacement algorithm?
    - A) LRU
    - B) Optimal
    - C) FIFO
    - D) LFU
    - **Answer**: C
    - **Explanation**: In FIFO, increasing frame count can sometimes increase page faults, known as Belady's Anomaly.

21. Thrashing occurs when:
    - A) CPU utilization is 100%
    - B) Processes spend more time paging than executing code
    - C) System runs out of disk space
    - D) Deadlock occurs among all processes
    - **Answer**: B
    - **Explanation**: Thrashing happens when the degree of multiprogramming is too high, causing constant page swapping and near-zero CPU progress.

22. A page fault occurs when a process accesses a page that:
    - A) Is corrupted in main memory
    - B) Is not currently present in physical main memory
    - C) Belongs to another process
    - D) Has read-only permissions
    - **Answer**: B
    - **Explanation**: A page fault is an MMU interrupt raised when the valid/invalid bit in the page table entry is `0` (not in RAM).

23. Which disk scheduling algorithm selects the request with the minimum seek time from the current head position?
    - A) FCFS
    - B) SCAN
    - C) SSTF
    - D) C-SCAN
    - **Answer**: C
    - **Explanation**: Shortest Seek Time First (SSTF) picks the request closest to the current head position.

24. In UNIX, what system call is used to replace the current process image with a new process image?
    - A) `fork()`
    - B) `exec()`
    - C) `wait()`
    - D) `exit()`
    - **Answer**: B
    - **Explanation**: The `exec()` family of system calls replaces the current binary execution context with a new executable program.

25. What is an orphan process in Linux?
    - A) A process whose parent has terminated while it is still running
    - B) A process that has finished execution but still has an entry in the process table
    - C) A process running with root privileges
    - D) A deadlocked process
    - **Answer**: A
    - **Explanation**: An orphan process's parent has terminated. In Linux, orphan processes are adopted by `init` (PID 1) or `systemd`.

26. What is a Zombie process?
    - A) A process waiting for CPU time
    - B) A process that has completed execution but its parent has not yet read its exit status via `wait()`
    - C) A process executing an infinite loop
    - D) A process suspended by SIGSTOP
    - **Answer**: B
    - **Explanation**: A zombie process has finished execution but stays in the process table until its exit status is collected by the parent.

27. If page size is $2\text{ KB}$ and logical address is $32$-bit, how many bits are reserved for Page Offset?
    - A) 10 bits
    - B) 11 bits
    - C) 12 bits
    - D) 21 bits
    - **Answer**: B
    - **Explanation**: $2\text{ KB} = 2^{11}$ bytes $\Rightarrow 11$ bits for offset.

28. The Working Set Model of process execution is based on the principle of:
    - A) Mutual Exclusion
    - B) Locality of Reference
    - C) Priority Inversion
    - D) Demand Paging without swapping
    - **Answer**: B
    - **Explanation**: Locality of reference states that processes access a localized set of pages repeatedly over a short duration.

29. Priority Inversion problem in real-time operating systems is solved using:
    - A) Banker's Algorithm
    - B) Priority Inheritance Protocol
    - C) Round Robin Scheduling
    - D) Peterson's Algorithm
    - **Answer**: B
    - **Explanation**: Priority Inheritance boosts the priority of a low-priority thread holding a lock needed by a high-priority thread.

30. In UNIX file permissions `rw-r--r--`, what octal number represents this permission?
    - A) 755
    - B) 644
    - C) 666
    - D) 744
    - **Answer**: B
    - **Explanation**: `rw-` = $4+2+0 = 6$, `r--` = $4+0+0 = 4$, `r--` = $4+0+0 = 4$. Octal = 644.

31. Which memory management technique allows a process to be stored non-contiguously in physical memory?
    - A) Dynamic Partitioning
    - B) Fixed Partitioning
    - C) Paging
    - D) Contiguous Allocation
    - **Answer**: C
    - **Explanation**: Paging maps logical pages to any available physical frame, allowing non-contiguous allocation.

32. Spooling (Simultaneous Peripheral Operations On-Line) is commonly used for managing:
    - A) CPU register operations
    - B) Shared memory access
    - C) Line printers and batch jobs
    - D) Virtual memory page tables
    - **Answer**: C
    - **Explanation**: Spooling buffers output (like print jobs) to disk so slow peripherals don't block fast CPU processes.

33. Which algorithm suffers from starvation?
    - A) FCFS
    - B) Round Robin
    - C) Shortest Job First (SJF)
    - D) FIFO Page Replacement
    - **Answer**: C
    - **Explanation**: SJF and Priority scheduling suffer from starvation if short or high-priority processes continually arrive.

34. Virtual memory size is primarily constrained by:
    - A) Physical RAM capacity
    - B) Size of CPU registers
    - C) Size of Secondary Storage (Swap space) and CPU Addressing capability
    - D) Cache memory size
    - **Answer**: C
    - **Explanation**: Virtual memory size is determined by the size of logical address space (e.g., $2^{64}$ bytes) and available disk swap space.

35. Direct Memory Access (DMA) controller transfers data between:
    - A) CPU and RAM
    - B) I/O devices and Main Memory directly without continuous CPU intervention
    - C) Cache and CPU registers
    - D) Disk and Swap space only
    - **Answer**: B
    - **Explanation**: DMA transfers blocks of data between memory and I/O devices, raising an interrupt only when the complete block is transferred.

36. In UNIX, which command is used to display disk space usage of file systems?
    - A) `du`
    - B) `df`
    - C) `free`
    - D) `top`
    - **Answer**: B
    - **Explanation**: `df` (disk free) reports file system space usage, while `du` (disk usage) measures file/directory sizes.

37. What is the main difference between Mutex and Binary Semaphore?
    - A) Mutex can take any value, binary semaphore cannot
    - B) Mutex has an ownership concept (only thread locking it can unlock it); semaphore has no ownership
    - C) Binary semaphore is faster than Mutex
    - D) Mutex causes deadlock, binary semaphore prevents it
    - **Answer**: B
    - **Explanation**: Mutex enforces ownership (the lock owner must release it). Semaphores can be signaled by any thread.

38. The CPU dispatcher is responsible for:
    - A) Selecting a process from ready queue
    - B) Switching context, switching to user mode, and jumping to proper location in user program
    - C) Loading process from disk to RAM
    - D) Managing page faults
    - **Answer**: B
    - **Explanation**: The dispatcher performs the mechanics of starting the process selected by the short-term scheduler.

39. The optimal page replacement algorithm replaces the page that:
    - A) Was brought into memory earliest
    - B) Has been used least recently
    - C) Will not be used for the longest period of time in the future
    - D) Has the smallest page number
    - **Answer**: C
    - **Explanation**: Optimal algorithm (OPT / Belady's MIN) replaces the page that will not be referenced for the longest duration in the future.

40. How many processes are created in total if the following code runs?
    `for(int i=0; i<3; i++) fork();`
    - A) 3
    - B) 7
    - C) 8
    - D) 16
    - **Answer**: C
    - **Explanation**: The loop runs 3 times. $2^3 = 8$ processes in total (1 parent + 7 children).

41. In two-level paging, if logical address has 32 bits, outer page table index takes 10 bits, inner page table index takes 10 bits, offset is:
    - A) 10 bits
    - B) 12 bits
    - C) 14 bits
    - D) 16 bits
    - **Answer**: B
    - **Explanation**: $\text{Offset} = 32 - (10 + 10) = 12$ bits.

42. What is the size of each page if page offset is 12 bits?
    - A) $1\text{ KB}$
    - B) $2\text{ KB}$
    - C) $4\text{ KB}$
    - D) $8\text{ KB}$
    - **Answer**: C
    - **Explanation**: $2^{12}\text{ bytes} = 4096\text{ bytes} = 4\text{ KB}$.

43. Which interrupt is generated by software?
    - A) Maskable Interrupt
    - B) Trap / Exception
    - C) Non-Maskable Interrupt
    - D) Timer Interrupt
    - **Answer**: B
    - **Explanation**: Traps or software interrupts are generated by execution of instructions (e.g., system calls, divide by zero).

44. Fork system call fails and returns `-1` when:
    - A) Parent process is dead
    - B) System memory or maximum process limit is exceeded
    - C) Child process terminates early
    - D) Program execution takes too long
    - **Answer**: B
    - **Explanation**: `fork()` returns `-1` when the OS fails to allocate memory for a new process PCB or process table is full.

45. In UNIX IPC, a Named Pipe is also called:
    - A) Socket
    - B) Shared memory
    - C) FIFO
    - D) Semaphore
    - **Answer**: C
    - **Explanation**: Named pipes appear as special FIFO files in the file system and allow communication between unrelated processes.

46. Which page replacement algorithm can suffer from Belady's anomaly?
    - A) Optimal
    - B) LRU
    - C) FIFO
    - D) LFU
    - **Answer**: C
    - **Explanation**: FIFO is non-stack based and can manifest Belady's anomaly.

47. Banker's Algorithm requires prior knowledge of:
    - A) Exact burst times of all processes
    - B) Maximum resource demand of each process
    - C) Arrival times of all processes
    - D) Disk transfer speed
    - **Answer**: B
    - **Explanation**: Banker's algorithm requires every process to declare its maximum resource requirement upfront.

48. Short-term scheduler is also known as:
    - A) CPU Scheduler
    - B) Job Scheduler
    - C) Swapper
    - D) Device Scheduler
    - **Answer**: A
    - **Explanation**: Short-term scheduler (CPU scheduler) selects a process from the ready queue for CPU allocation.

49. Long-term scheduler controls:
    - A) Degree of Multiprogramming
    - B) CPU Context Switching speed
    - C) TLB hit ratio
    - D) Disk rotational latency
    - **Answer**: A
    - **Explanation**: Long-term scheduler selects processes from disk queue and loads them into RAM, controlling how many processes are in memory.

50. Medium-term scheduler is primarily responsible for:
    - A) CPU allocation
    - B) Swapping processes between RAM and secondary disk
    - C) I/O device queue management
    - D) Interrupt handling
    - **Answer**: B
    - **Explanation**: Medium-term scheduler swaps out blocked or inactive processes to disk to free up main memory.
