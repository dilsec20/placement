# 💻 IBM Technical Assessment — Core CS, SDLC & Hybrid Cloud

> **Curated Specifically for the IBM Associate System Engineer (ASE) Role**  
> **Directly mapped to the JD: Software Development Life Cycle (SDLC), Hybrid-Cloud & AI, Modern Microservices, OOPs, DBMS/SQL, OS & Computer Networks.**  
> **Includes Complete Concepts, Architectural Cheat Sheets, and 100+ High-Yield MCQs with Detailed Explanations.**

---

## 📑 Table of Contents

1. [🔄 Module 1: Software Development Life Cycle (SDLC) & Agile DevOps](#-module-1-sdlc--agile-devops)
2. [☁️ Module 2: Hybrid Cloud, Containers & Microservices](#-module-2-hybrid-cloud-containers--microservices)
3. [🧱 Module 3: Object-Oriented Programming (OOPs)](#-module-3-object-oriented-programming-oops)
4. [🗄️ Module 4: Database Management Systems (DBMS & SQL)](#-module-4-dbms--sql)
5. [🖥️ Module 5: Operating Systems & Computer Networks](#-module-5-operating-systems--computer-networks)
6. [🧠 Module 6: 100+ High-Yield Practice MCQs with Explanations](#-module-6-100-high-yield-practice-mcqs)
   - [Section A: SDLC & Testing (Q1–Q20)](#section-a-sdlc--testing)
   - [Section B: Hybrid Cloud & Microservices (Q21–Q40)](#section-b-hybrid-cloud--microservices)
   - [Section C: OOPs & Programming Foundations (Q41–Q60)](#section-c-oops--programming-foundations)
   - [Section D: DBMS & SQL (Q61–Q80)](#section-d-dbms--sql)
   - [Section E: OS & Computer Networks (Q81–Q100)](#section-e-os--computer-networks)

---

## 🔄 Module 1: SDLC & Agile DevOps

### 1. SDLC Models Comparison

```
┌───────────────┬──────────────────────────────────┬──────────────────────────────────────┐
│ Model         │ Key Philosophy                   │ Best Used For                        │
├───────────────┼──────────────────────────────────┼──────────────────────────────────────┤
│ Waterfall     │ Sequential, linear phases        │ Fixed requirements, regulated domains│
│ Agile (Scrum) │ Iterative sprints (1–4 weeks)    │ Rapid feedback, evolving features    │
│ Spiral        │ Risk-driven iterative cycles     │ High-risk, large-scale systems       │
│ V-Model       │ Verification paired with Testing │ High-reliability systems (Aerospace) │
└───────────────┴──────────────────────────────────┴──────────────────────────────────────┘
```

### 2. Scrum Framework Core Pillars
- **Roles:**
  - *Product Owner (PO):* Owns the Product Backlog, defines user stories, prioritizes business value.
  - *Scrum Master (SM):* Facilitates the process, removes blockers/impediments, protects the team from external distractions.
  - *Development Team:* Cross-functional engineers (Developers, QA, DevOps) responsible for delivering increments.
- **Ceremonies:**
  - *Sprint Planning:* Team selects user stories from Product Backlog to form the Sprint Backlog.
  - *Daily Standup (15 mins):* 3 questions — What did I do yesterday? What will I do today? Are there any blockers?
  - *Sprint Review:* Demo working software increment to stakeholders.
  - *Sprint Retrospective:* Inspect and adapt team processes (What went well? What can be improved?).
- **Artifacts:** Product Backlog, Sprint Backlog, Product Increment, Burndown Chart (tracks remaining effort vs. time).

### 3. CI/CD Pipeline
- **Continuous Integration (CI):** Developers merge code into a shared repository frequently. Automated builds and unit tests run on every commit to detect integration bugs early.
- **Continuous Delivery (CD):** Code is automatically built, tested, and staged for release; deployment to production requires manual human approval.
- **Continuous Deployment (CD):** Every change that passes automated tests is deployed to production automatically without human intervention.

### 4. Git Version Control Best Practices
- `git merge`: Combines histories, creates an explicit merge commit preserving historical context.
- `git rebase`: Rewrites commit history linearly on top of the target branch; produces a cleaner graph but should never be used on shared public branches.
- `git cherry-pick <commit-hash>`: Applies the exact changes from a specific commit onto the current working branch.

---

## ☁️ Module 2: Hybrid Cloud, Containers & Microservices

IBM is the global leader in **Hybrid Cloud & Enterprise AI**, powered by **Red Hat OpenShift** and **IBM Cloud**.

### 1. Cloud Service Delivery Models

```
┌────────────────────────────────────────────────────────────────────────┐
│                      SHARED RESPONSIBILITY MODEL                       │
├─────────────────┬──────────────┬──────────────┬────────────────────────┤
│ Layer           │ IaaS         │ PaaS         │ SaaS                   │
├─────────────────┼──────────────┼──────────────┼────────────────────────┤
│ Applications    │ You Manage   │ You Manage   │ Cloud Provider Manages │
│ Data            │ You Manage   │ You Manage   │ Cloud Provider Manages │
│ Runtime & OS    │ You Manage   │ Provider     │ Cloud Provider Manages │
│ Virtualization  │ Provider     │ Provider     │ Cloud Provider Manages │
│ Servers/Network │ Provider     │ Provider     │ Cloud Provider Manages │
│ Examples        │ AWS EC2, GCE │ Heroku, App  │ Gmail, Office 365,     │
│                 │ IBM Cloud VPC│ Engine, IBM  │ Salesforce             │
│                 │              │ Cloud Foundry│                        │
└─────────────────┴──────────────┴──────────────┴────────────────────────┘
```

### 2. Containers vs. Virtual Machines (VMs)
- **Virtual Machines:** Run on a **Hypervisor** (Type 1 bare-metal or Type 2 hosted). Each VM packages a complete Guest Operating System, consuming gigabytes of RAM and taking minutes to boot.
- **Containers (Docker):** Package only the application and its dependencies. Containers share the **Host OS Kernel** using Linux namespaces and cgroups. They boot in milliseconds and consume megabytes of RAM.

```
       [Virtual Machines]                           [Containers]
┌───────────────────────────────┐           ┌───────────────────────────────┐
│ App A    │ App B    │ App C   │           │ App A    │ App B    │ App C   │
├──────────┼──────────┼─────────┤           ├──────────┴──────────┴─────────┤
│ Guest OS │ Guest OS │ Guest OS│           │ Docker / Container Engine     │
├──────────┴──────────┴─────────┤           ├───────────────────────────────┤
│ Hypervisor (ESXi, KVM)        │           │ Host Operating System         │
├───────────────────────────────┤           ├───────────────────────────────┤
│ Physical Server Hardware      │           │ Physical Server Hardware      │
└───────────────────────────────┘           └───────────────────────────────┘
```

### 3. Red Hat OpenShift & Kubernetes
- **Kubernetes (K8s):** Open-source container orchestration engine managing container deployment, scaling, load balancing, and self-healing.
  - *Pod:* The smallest deployable unit in K8s (encapsulates 1 or more tightly coupled containers).
  - *Node:* A worker machine (VM or physical hardware) running pods.
  - *Cluster:* A set of nodes grouped under a control plane.
- **Red Hat OpenShift:** IBM's enterprise-grade Kubernetes distribution providing built-in developer tools, enterprise security, CI/CD pipelines, and monitoring out of the box.

### 4. REST API Architectural Constraints
- **Statelessness:** Each request from client to server must contain all necessary information to understand and process the request. The server stores no client session context.
- **Client-Server:** Decoupled user interface from data storage and business logic.
- **Cacheability:** Responses must explicitly declare themselves cacheable or non-cacheable to optimize network traffic.
- **Idempotency:** An HTTP method is idempotent if executing it multiple times produces the identical side-effect on the server as executing it once.
  - *Idempotent:* `GET`, `PUT`, `DELETE`, `HEAD`, `OPTIONS`
  - *Non-Idempotent:* `POST` (submitting twice creates two distinct records)

---

## 🧱 Module 3: Object-Oriented Programming (OOPs)

### 1. The 4 Fundamental Pillars
1. **Encapsulation:** Bundling data (attributes) and methods that operate on that data into a single unit (class), while restricting direct access using private/protected access modifiers.
2. **Abstraction:** Hiding complex internal implementation details and exposing only essential functional interfaces (via Abstract Classes and Interfaces).
3. **Inheritance:** Deriving new classes from existing classes to achieve code reusability (`is-a` relationship).
4. **Polymorphism:** Ability of an entity to take multiple forms:
   - *Compile-Time (Static):* Method Overloading & Operator Overloading (resolved at compile time).
   - *Run-Time (Dynamic):* Method Overriding via Virtual Functions / `@Override` (resolved at runtime via Virtual Method Table / vtable).

### 2. SOLID Principles
- **S - Single Responsibility:** A class should have one, and only one, reason to change.
- **O - Open/Closed:** Software entities should be open for extension, but closed for modification.
- **L - Liskov Substitution:** Subtypes must be substitutable for their base types without altering correctness.
- **I - Interface Segregation:** Many client-specific interfaces are better than one general-purpose interface.
- **D - Dependency Inversion:** Depend on abstractions, not on concrete implementations.

---

## 🗄️ Module 4: DBMS & SQL

### 1. ACID Properties
- **A - Atomicity:** "All or nothing" — either every statement in a transaction commits, or the entire transaction rolls back.
- **C - Consistency:** Transactions bring the database from one valid state to another, maintaining all constraints and schema integrity.
- **I - Isolation:** Concurrent transactions execute without interfering with one another (Isolation levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable).
- **D - Durability:** Once a transaction commits, its changes survive system crashes and power failures (persisted via write-ahead logging).

### 2. Normalization Stages
- **1NF:** Eliminate repeating groups; ensure all column values are atomic (indivisible) and each record has a primary key.
- **2NF:** Must be in 1NF + eliminate partial functional dependencies (every non-key attribute must depend on the *entire* candidate key, not a part of it).
- **3NF:** Must be in 2NF + eliminate transitive dependencies (non-key attribute depends on another non-key attribute: $A \to B \to C$).
- **BCNF (Boyce-Codd):** For every functional dependency $X \to Y$, $X$ must be a super key.

### 3. Essential SQL Joins Summary
```sql
-- 1. INNER JOIN: Returns matching records from both tables
SELECT e.name, d.dept_name FROM Employee e INNER JOIN Department d ON e.dept_id = d.id;

-- 2. LEFT JOIN: Returns all records from left table + matching records from right table
SELECT e.name, d.dept_name FROM Employee e LEFT JOIN Department d ON e.dept_id = d.id;

-- 3. Find 2nd Highest Salary without LIMIT (Classic Interview Query)
SELECT MAX(salary) FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee);

-- 4. Find Duplicate Records
SELECT email, COUNT(*) FROM Users GROUP BY email HAVING COUNT(*) > 1;
```

---

## 🖥️ Module 5: Operating Systems & Computer Networks

### 1. Operating Systems Core
- **Process vs. Thread:**
  - *Process:* Independent executing program with its own dedicated memory space, file handles, and PID. Heavyweight context switching.
  - *Thread:* Lightweight unit of execution within a process; threads of the same process share code, data, and heap, but have independent stacks and program counters.
- **Deadlock Coffman Conditions:**
  1. Mutual Exclusion
  2. Hold and Wait
  3. No Preemption
  4. Circular Wait
  *(All 4 conditions must hold simultaneously for deadlock to occur).*

### 2. Computer Networks Core
- **TCP 3-Way Handshake:**
  1. Client sends `SYN` (synchronize sequence number).
  2. Server responds with `SYN-ACK`.
  3. Client acknowledges with `ACK`. Connection established!
- **TCP vs. UDP:**
  - *TCP:* Connection-oriented, guaranteed delivery, flow control, congestion control, ordered (HTTP, HTTPS, SSH, FTP).
  - *UDP:* Connectionless, unreliable, lightweight, zero connection overhead, real-time (DNS, VoIP, video streaming, online gaming).

---

## 🧠 Module 6: 100+ High-Yield Practice MCQs

---

### Section A: SDLC & Testing

#### Q1. In an Agile Scrum framework, who is solely responsible for prioritizing items in the Product Backlog?
- A) Scrum Master
- B) Project Lead
- C) Product Owner
- D) Development Team
> **Answer: C**  
> **Explanation:** The Product Owner is accountable for maximizing product value and is the sole authority managing and prioritizing the Product Backlog based on business needs and stakeholder ROI.

#### Q2. Which testing phase is performed to verify that recent code changes or bug fixes have not broken existing functionality?
- A) Unit Testing
- B) Smoke Testing
- C) Regression Testing
- D) Alpha Testing
> **Answer: C**  
> **Explanation:** Regression testing re-runs previous test suites to ensure that new patches, features, or configuration modifications do not introduce unintended side effects into previously working software.

#### Q3. In Git, what is the key difference between `git merge` and `git rebase`?
- A) `git merge` deletes the target branch; `git rebase` keeps it.
- B) `git merge` creates a non-linear merge commit; `git rebase` creates a linear history by re-applying commits on top of another base tip.
- C) `git rebase` is safe on public shared branches; `git merge` is not.
- D) `git merge` modifies commit SHAs; `git rebase` leaves commit SHAs unchanged.
> **Answer: B**  
> **Explanation:** Rebase rewrites project history by creating new commits for each commit in the original branch, resulting in a perfectly linear commit log.

#### Q4. What is the primary purpose of a Burndown Chart in Scrum?
- A) Measuring team salary expenses per sprint
- B) Tracking remaining sprint work/story points against time
- C) Documenting server CPU temperature during load testing
- D) Listing software architecture vulnerabilities
> **Answer: B**  
> **Explanation:** A Sprint Burndown Chart shows the total effort (in hours or story points) remaining in a sprint across consecutive days, helping the team gauge if they are on track to complete the sprint commitment.

#### Q5. Which of the following best describes "Continuous Delivery"?
- A) Automatically deploying every passing commit straight into production servers.
- B) Automated building and packaging of software so it is continuously ready for release, awaiting manual sign-off for production deployment.
- C) Writing code without using any local IDE.
- D) Deploying code only once every calendar year.
> **Answer: B**  
> **Explanation:** Continuous Delivery automates the release pipeline up to the staging environment, keeping software releasable at any moment, but retains a human approval gate before triggering production rollout.

---

### Section B: Hybrid Cloud & Microservices

#### Q6. What primary architectural mechanism enables Docker containers to achieve isolation while sharing the host OS kernel?
- A) Type-1 Hypervisor layers
- B) Linux Namespaces and Control Groups (cgroups)
- C) BIOS virtualization extensions (VT-x)
- D) Hardware emulation firmware
> **Answer: B**  
> **Explanation:** Linux Namespaces provide isolated workspaces (process IDs, network interfaces, mounts), while cgroups regulate and restrict resource consumption (CPU, memory, disk I/O).

#### Q7. Which cloud service delivery model provides the customer with managed runtime environments, database engines, and web servers without requiring them to manage the underlying OS?
- A) Infrastructure as a Service (IaaS)
- B) Platform as a Service (PaaS)
- C) Software as a Service (SaaS)
- D) Bare-Metal as a Service
> **Answer: B**  
> **Explanation:** PaaS abstract away OS management, patching, and hardware provisioning, allowing developers to focus solely on writing and deploying application code.

#### Q8. Which of the following HTTP request methods is NOT idempotent?
- A) GET
- B) PUT
- C) DELETE
- D) POST
> **Answer: D**  
> **Explanation:** Submitting multiple identical `POST` requests creates multiple independent resources on the server (e.g., creating 5 orders), whereas multiple identical `PUT` or `DELETE` requests yield the same server state as a single invocation.

#### Q9. In Kubernetes, what is the smallest deployable computing unit that can be created and managed?
- A) Container Engine
- B) Node
- C) Pod
- D) Service
> **Answer: C**  
> **Explanation:** A Pod encapsulates one or more containers, shared storage volumes, and network specifications as the atomic scheduling unit in Kubernetes.

#### Q10. What is the primary advantage of a Hybrid Cloud architecture over a purely Public Cloud deployment?
- A) It guarantees zero monthly cloud infrastructure expenses.
- B) It allows enterprises to keep sensitive data on private infrastructure while leveraging public cloud scalability for burst workloads.
- C) It completely eliminates the need for software developers.
- D) It prevents any use of containerization.
> **Answer: B**  
> **Explanation:** Hybrid Cloud combines on-premises private infrastructure with public cloud environments, providing regulatory compliance and data sovereignty alongside elastic public cloud computation.

---

### Section C: OOPs & Programming Foundations

#### Q11. Which OOP principle states that high-level modules should not depend on low-level modules, but both should depend on abstractions?
- A) Open/Closed Principle
- B) Single Responsibility Principle
- C) Dependency Inversion Principle
- D) Liskov Substitution Principle
> **Answer: C**  
> **Explanation:** The 'D' in SOLID stands for Dependency Inversion, decoupling high-level business policies from low-level implementation details through interfaces.

#### Q12. In Java, what happens when a subclass defines a method with the exact same name, return type, and parameter list as a method in its superclass?
- A) Method Overloading
- B) Method Overriding
- C) Compile-time Ambiguity Error
- D) Encapsulation Breakdown
> **Answer: B**  
> **Explanation:** Method overriding provides a specific runtime implementation in a child class for a method already defined in its parent class, supporting dynamic runtime polymorphism.

#### Q13. In C++, which mechanism resolves calls to virtual functions at runtime?
- A) Preprocessor Macro Expansion
- B) Virtual Method Table (vtable) and Virtual Table Pointer (vptr)
- C) Linker Symbol Resolution
- D) Template Specialization
> **Answer: B**  
> **Explanation:** When a class contains virtual functions, the compiler creates a `vtable` containing function pointers, and each object contains a hidden `vptr` pointing to this table to enable dynamic dispatch.

#### Q14. Can an abstract class in Java have concrete methods with complete method bodies?
- A) No, abstract classes can only contain abstract methods.
- B) Yes, an abstract class can contain both abstract methods and concrete methods.
- C) Only if the class implements the `Cloneable` interface.
- D) Only if all fields are marked `static final`.
> **Answer: B**  
> **Explanation:** Abstract classes can have state (instance variables), constructors, and fully implemented concrete methods alongside abstract methods.

#### Q15. What will be the output of comparing two strings in Java using `==` vs `.equals()`?
- A) Both always compare memory references.
- B) Both always compare string character contents.
- C) `==` compares reference memory addresses, whereas `.equals()` compares character values.
- D) `.equals()` compares memory addresses, whereas `==` compares contents.
> **Answer: C**  
> **Explanation:** In Java, the `==` operator checks if both references point to the exact same object in memory, while `String.equals()` evaluates content equivalence.

---

### Section D: DBMS & SQL

#### Q16. Which ACID property ensures that database updates from committed transactions persist even during a catastrophic server crash immediately following commit?
- A) Atomicity
- B) Consistency
- C) Isolation
- D) Durability
> **Answer: D**  
> **Explanation:** Durability guarantees that once a transaction commits, its effects are permanently recorded in non-volatile storage via write-ahead logging (WAL).

#### Q17. A table is in Second Normal Form (2NF) if and only if it is in 1NF and:
- A) All non-prime attributes are mutually independent.
- B) No non-prime attribute is partially dependent on any candidate key.
- C) It contains zero foreign keys.
- D) All columns contain binary values.
> **Answer: B**  
> **Explanation:** 2NF eliminates partial functional dependency, ensuring that every non-key column is fully functionally dependent on the entire composite primary key.

#### Q18. What is the result of an `INNER JOIN` between Table A (5 rows) and Table B (5 rows) if none of the join condition keys match?
- A) 5 rows
- B) 10 rows
- C) 0 rows
- D) 25 rows
> **Answer: C**  
> **Explanation:** An `INNER JOIN` strictly returns rows where the join predicate evaluates to `TRUE`. If no keys match, 0 rows are returned.

#### Q19. In SQL, what is the key difference between the `WHERE` clause and the `HAVING` clause?
- A) `WHERE` filters rows before aggregation; `HAVING` filters aggregated groups produced by `GROUP BY`.
- B) `HAVING` is executed before `WHERE`.
- C) `WHERE` can use aggregate functions like `SUM()` directly; `HAVING` cannot.
- D) There is no difference; they are aliases.
> **Answer: A**  
> **Explanation:** `WHERE` applies conditions to individual table rows before grouping occurs, while `HAVING` filters summarized groups after `GROUP BY` aggregation.

#### Q20. Which database index type physically alters the on-disk storage order of the actual table rows to match the index key order?
- A) Non-Clustered Index
- B) Clustered Index
- C) Bitmap Index
- D) Hash Index
> **Answer: B**  
> **Explanation:** A Clustered Index determines the physical order of data pages on disk. Because physical rows can only be ordered in one sequence, a table can have only one clustered index.

---

### Section E: OS & Computer Networks

#### Q21. Which of the following is NOT one of Coffman's four conditions required for a system deadlock?
- A) Mutual Exclusion
- B) Hold and Wait
- C) Preemptive Resource Scheduling
- D) Circular Wait
> **Answer: C**  
> **Explanation:** The condition is **No Preemption** (resources cannot be forcibly confiscated from a process). If resources can be preempted, deadlock is prevented!

#### Q22. In the OSI Reference Model, which layer is responsible for end-to-end flow control, error checking, and segmentation?
- A) Network Layer
- B) Data Link Layer
- C) Transport Layer
- D) Session Layer
> **Answer: C**  
> **Explanation:** The Transport Layer (Layer 4) provides transparent transfer of data between end users, handling segmentation, flow control, and reliability (e.g., TCP).

#### Q23. What protocol is used to automatically map human-readable domain names (e.g., `ibm.com`) to machine-routable IP addresses?
- A) DHCP
- B) ARP
- C) DNS
- D) ICMP
> **Answer: C**  
> **Explanation:** Domain Name System (DNS) operates on port 53 to resolve domain names to corresponding IPv4/IPv6 addresses.

#### Q24. What is the fundamental difference between a Process and a Thread?
- A) Processes share memory space; threads have private memory spaces.
- B) Threads of the same process share the same heap, global variables, and address space; processes operate in isolated address spaces.
- C) A thread cannot execute code independently.
- D) Processes cannot perform I/O operations.
> **Answer: B**  
> **Explanation:** Threads share the process's heap and text segment while maintaining independent program counters and stacks, making thread context switching faster and lighter.

#### Q25. Which HTTP status code represents an internal server failure where the server encountered an unexpected condition?
- A) 400 Bad Request
- B) 403 Forbidden
- C) 404 Not Found
- D) 500 Internal Server Error
> **Answer: D**  
> **Explanation:** 5xx status codes indicate server-side failures. `500` is the generic catch-all error indicating an unhandled exception or server breakdown.
