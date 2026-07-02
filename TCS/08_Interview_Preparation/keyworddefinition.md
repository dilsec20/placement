# 📘 Resume Keyword Definitions — Interview Prep Guide
> **Purpose:** Quick-reference definitions for every keyword on your resume and related concepts that interviewers commonly ask about.

---

## 🔤 LANGUAGES

### C++
- **What is C++?** A general-purpose, compiled programming language that supports procedural, object-oriented, and generic programming. Extension of C with OOP features.
- **Compiler vs Interpreter:** Compiler translates entire code to machine code before execution (C++, Java). Interpreter executes line by line (Python, JS).
- **STL (Standard Template Library):** Collection of template classes — `vector`, `map`, `set`, `queue`, `stack`, `priority_queue`, `unordered_map`.
- **Pointers vs References:** Pointer holds memory address, can be null, can be reassigned. Reference is an alias, cannot be null, cannot be reassigned.
- **Virtual Functions:** Functions declared with `virtual` keyword to achieve runtime polymorphism. Resolved at runtime using vtable.
- **Smart Pointers:** `unique_ptr` (single ownership), `shared_ptr` (shared ownership with ref count), `weak_ptr` (non-owning reference).
- **Memory Management:** Stack (automatic, LIFO), Heap (dynamic, manual using `new`/`delete`).

### Java
- **What is Java?** A platform-independent, object-oriented language. Code compiles to bytecode which runs on JVM (Java Virtual Machine).
- **JDK vs JRE vs JVM:** JDK = development kit (compiler + JRE). JRE = runtime environment (JVM + libraries). JVM = virtual machine that executes bytecode.
- **Garbage Collection:** Automatic memory management. JVM identifies and removes objects no longer referenced. Types: Serial, Parallel, G1, ZGC.
- **Collections Framework:** `ArrayList`, `LinkedList`, `HashMap`, `TreeMap`, `HashSet`, `TreeSet`, `PriorityQueue`, `Stack`.
- **Multithreading:** Running multiple threads concurrently. `Thread` class, `Runnable` interface, `synchronized` keyword, `ExecutorService`.
- **Exception Handling:** `try-catch-finally`, checked exceptions (compile-time), unchecked exceptions (runtime). `throws` vs `throw`.
- **Java 8+ Features:** Lambda expressions, Streams API, Optional, Functional interfaces, Method references, Default methods.
- **final vs finally vs finalize:** `final` = constant/cannot override. `finally` = always executes after try-catch. `finalize` = called before GC (deprecated).
- **Abstract Class vs Interface:** Abstract class can have state + partial implementation. Interface (Java 8+) can have default methods but no state.

### JavaScript
- **What is JavaScript?** A dynamic, interpreted, single-threaded programming language primarily used for web development. Runs in browser and server (Node.js).
- **var vs let vs const:** `var` = function-scoped, hoisted. `let` = block-scoped, not hoisted. `const` = block-scoped, cannot reassign.
- **Hoisting:** JavaScript moves declarations to top of scope before execution. Functions are fully hoisted, `var` is hoisted as undefined.
- **Closures:** A function that remembers variables from its outer scope even after the outer function has returned.
- **Promises:** Object representing eventual completion/failure of async operation. States: pending → fulfilled/rejected. `.then()`, `.catch()`, `.finally()`.
- **async/await:** Syntactic sugar over Promises. `async` marks a function as asynchronous. `await` pauses execution until Promise resolves.
- **Event Loop:** Mechanism that handles async callbacks. Call Stack → Web APIs → Callback Queue → Event Loop pushes to stack when empty.
- **Prototype & Prototypal Inheritance:** Every JS object has a prototype. Objects inherit properties/methods from their prototype chain.
- **ES6+ Features:** Arrow functions, template literals, destructuring, spread/rest operators, modules (import/export), classes, Map/Set.
- **== vs ===:** `==` does type coercion (loose equality). `===` checks value + type (strict equality). Always prefer `===`.

---

## ⚙️ BACKEND FRAMEWORKS

### Node.js
- **What is Node.js?** A JavaScript runtime built on Chrome's V8 engine that allows running JS on the server side. Single-threaded, event-driven, non-blocking I/O.
- **Event-Driven Architecture:** Node.js uses events and callbacks. `EventEmitter` class emits events, listeners handle them asynchronously.
- **Non-Blocking I/O:** Operations don't block the main thread. File reads, DB queries, network calls happen asynchronously via callbacks/promises.
- **npm (Node Package Manager):** Default package manager for Node.js. `package.json` stores dependencies. `npm install`, `npm run`.
- **Middleware:** Functions that execute during request-response cycle. Have access to `req`, `res`, and `next()`. Used for logging, auth, error handling.
- **Streams:** Process data in chunks instead of loading all at once. Types: Readable, Writable, Duplex, Transform. Great for large files.
- **Cluster Module:** Allows creating child processes that share the same server port, utilizing multiple CPU cores.

### Express.js
- **What is Express.js?** A minimal, fast web framework for Node.js. Provides routing, middleware support, and HTTP utilities.
- **Routing:** Mapping URL paths to handler functions. `app.get()`, `app.post()`, `app.put()`, `app.delete()`. Route parameters: `/users/:id`.
- **Middleware in Express:** `app.use()` registers middleware. Executes in order. Types: application-level, router-level, error-handling, built-in, third-party.
- **Request & Response Objects:** `req.params` (URL params), `req.query` (query string), `req.body` (POST data). `res.json()`, `res.status()`, `res.send()`.
- **Error Handling:** Custom error middleware with 4 params: `(err, req, res, next)`. Must be defined after all routes.

### Spring Boot
- **What is Spring Boot?** A Java framework that simplifies Spring application development with auto-configuration, embedded servers, and opinionated defaults.
- **Spring vs Spring Boot:** Spring requires manual XML/config. Spring Boot auto-configures, has embedded Tomcat, starter dependencies, and `application.properties`.
- **Dependency Injection (DI):** Design pattern where objects receive dependencies from external source instead of creating them. Spring manages via IoC container.
- **IoC (Inversion of Control):** Framework controls object creation and lifecycle instead of the developer. Container manages beans.
- **Annotations:** `@RestController`, `@RequestMapping`, `@Autowired`, `@Service`, `@Repository`, `@Component`, `@Bean`, `@Configuration`.
- **Spring Data JPA:** Abstraction over JPA/Hibernate. Auto-generates queries from method names. `JpaRepository` provides CRUD out of the box.
- **application.properties:** Configuration file for server port, database URL, logging level, etc. Can also use `application.yml`.
- **Bean Lifecycle:** Instantiation → Populate Properties → `@PostConstruct` → Ready → `@PreDestroy` → Destruction.
- **Profiles:** `@Profile("dev")`, `@Profile("prod")` — switch configurations per environment.

### REST APIs
- **What is REST?** Representational State Transfer — an architectural style for designing networked APIs using HTTP methods.
- **HTTP Methods:** `GET` (read), `POST` (create), `PUT` (full update), `PATCH` (partial update), `DELETE` (remove).
- **Status Codes:** `200` OK, `201` Created, `204` No Content, `301` Moved Permanently, `302` Found (redirect), `400` Bad Request, `401` Unauthorized, `403` Forbidden, `404` Not Found, `500` Internal Server Error.
- **REST Principles:** Stateless, Client-Server, Uniform Interface, Cacheable, Layered System.
- **RESTful vs SOAP:** REST is lightweight (JSON), stateless, uses HTTP. SOAP is protocol-based (XML), heavier, supports WS-Security.
- **Idempotency:** GET, PUT, DELETE are idempotent (same result on multiple calls). POST is not idempotent.
- **Pagination:** Breaking large responses into pages. `?page=1&limit=10`. Cursor-based vs offset-based pagination.
- **Versioning:** URL versioning (`/api/v1/`), Header versioning, Query param versioning.

---

## 🧠 CORE CONCEPTS

### Data Structures & Algorithms (DSA)
- **Array:** Fixed-size, contiguous memory, O(1) access by index, O(n) insertion/deletion.
- **Linked List:** Dynamic size, nodes with pointers. Singly, Doubly, Circular. O(1) insert/delete at head, O(n) search.
- **Stack:** LIFO (Last In First Out). Operations: push, pop, peek. Used in: function calls, undo, expression evaluation.
- **Queue:** FIFO (First In First Out). Operations: enqueue, dequeue. Variants: Circular Queue, Priority Queue, Deque.
- **HashMap/HashTable:** Key-value pairs, O(1) average lookup/insert. Collision handling: Chaining, Open Addressing.
- **Tree:** Hierarchical structure. Binary Tree, BST, AVL, Red-Black Tree. Traversals: Inorder, Preorder, Postorder, Level-order.
- **Heap:** Complete binary tree. Min-Heap (parent ≤ children), Max-Heap (parent ≥ children). Used for Priority Queue.
- **Graph:** Nodes + Edges. Directed/Undirected, Weighted/Unweighted. BFS, DFS, Dijkstra's, Kruskal's, Prim's.
- **Trie:** Tree for string storage/searching. Each node = character. Used for autocomplete, spell check.
- **Time Complexity:** O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!).
- **Sorting Algorithms:** Bubble O(n²), Selection O(n²), Insertion O(n²), Merge O(n log n), Quick O(n log n avg), Heap O(n log n).
- **Searching:** Linear Search O(n), Binary Search O(log n) — requires sorted array.
- **Dynamic Programming:** Solving problems by breaking into overlapping subproblems. Memoization (top-down) vs Tabulation (bottom-up).
- **Greedy Algorithm:** Makes locally optimal choices at each step. Doesn't guarantee global optimum always.
- **Backtracking:** Tries all possibilities, backtracks on failure. Used for: N-Queens, Sudoku, Permutations.

### System Design
- **What is System Design?** Designing the architecture of large-scale systems — databases, servers, caching, load balancing, etc.
- **Horizontal vs Vertical Scaling:** Horizontal = add more machines. Vertical = upgrade existing machine (more CPU/RAM).
- **Load Balancer:** Distributes incoming traffic across multiple servers. Algorithms: Round Robin, Least Connections, IP Hash.
- **Caching:** Storing frequently accessed data in fast memory. Tools: Redis, Memcached. Strategies: Write-through, Write-back, Cache-aside.
- **CDN (Content Delivery Network):** Distributed servers that cache static content closer to users. Examples: Cloudflare, AWS CloudFront.
- **Database Sharding:** Splitting database into smaller partitions (shards) across multiple servers. Horizontal partitioning.
- **Replication:** Copying data across multiple servers. Master-Slave (read replicas) or Master-Master.
- **CAP Theorem:** A distributed system can guarantee only 2 of 3: Consistency, Availability, Partition Tolerance.
- **Rate Limiting:** Controlling the number of requests a client can make. Algorithms: Token Bucket, Sliding Window.
- **Message Queue:** Asynchronous communication between services. Examples: Kafka, RabbitMQ, SQS.
- **Microservices vs Monolith:** Monolith = single deployable unit. Microservices = independent, loosely coupled services.
- **API Gateway:** Single entry point for all client requests. Handles routing, authentication, rate limiting.

### Operating System (OS)
- **What is an OS?** System software that manages hardware and provides services to applications. Examples: Linux, Windows, macOS.
- **Process vs Thread:** Process = independent program with own memory space. Thread = lightweight unit within a process, shares memory.
- **Process States:** New → Ready → Running → Waiting → Terminated.
- **CPU Scheduling:** FCFS (First Come First Serve), SJF (Shortest Job First), Round Robin, Priority Scheduling, Multilevel Queue.
- **Deadlock:** Two or more processes waiting for each other's resources indefinitely. Conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.
- **Deadlock Handling:** Prevention, Avoidance (Banker's Algorithm), Detection & Recovery, Ignore (Ostrich).
- **Memory Management:** Paging (fixed-size blocks), Segmentation (variable-size). Virtual Memory uses disk as extended RAM.
- **Page Replacement:** FIFO, LRU (Least Recently Used), Optimal. Page Fault = requested page not in memory.
- **Semaphore vs Mutex:** Mutex = binary lock (one thread). Semaphore = counting lock (multiple threads). Used for synchronization.
- **Thrashing:** Excessive page faults causing system to spend more time swapping than executing.
- **Context Switching:** Saving state of current process and loading state of next process. Has overhead.
- **System Calls:** Interface between user program and OS kernel. Examples: `fork()`, `exec()`, `read()`, `write()`, `open()`.

### Computer Networks (CN)
- **OSI Model (7 Layers):**
  1. **Physical** — Bits, cables, signals (Ethernet, USB)
  2. **Data Link** — Frames, MAC address (Switch, ARP)
  3. **Network** — Packets, IP address, routing (Router, IP)
  4. **Transport** — Segments, TCP/UDP, port numbers
  5. **Session** — Session management, authentication
  6. **Presentation** — Encryption, compression, translation (SSL/TLS)
  7. **Application** — HTTP, FTP, DNS, SMTP
- **TCP/IP Model (4 Layers):** Network Access → Internet → Transport → Application.
- **TCP vs UDP:** TCP = reliable, connection-oriented, ordered, slower (HTTP, FTP). UDP = unreliable, connectionless, faster (DNS, streaming, gaming).
- **TCP 3-Way Handshake:** SYN → SYN-ACK → ACK. Establishes connection before data transfer.
- **HTTP vs HTTPS:** HTTP = unencrypted. HTTPS = HTTP + TLS/SSL encryption. Port 80 vs 443.
- **DNS (Domain Name System):** Translates domain names (google.com) to IP addresses. Recursive & Iterative queries.
- **IP Address:** IPv4 (32-bit, e.g., 192.168.1.1) vs IPv6 (128-bit). Public vs Private IPs.
- **Subnetting:** Dividing a network into smaller sub-networks using subnet mask. CIDR notation: `/24` = 255.255.255.0.
- **MAC Address:** 48-bit hardware address unique to each NIC. Used at Data Link layer. Format: `AA:BB:CC:DD:EE:FF`.
- **ARP (Address Resolution Protocol):** Maps IP address to MAC address within a local network.
- **NAT (Network Address Translation):** Translates private IPs to public IP for internet access. Used in routers.
- **Firewall:** Network security device that monitors and filters incoming/outgoing traffic based on rules.
- **Port Numbers:** HTTP=80, HTTPS=443, FTP=21, SSH=22, DNS=53, SMTP=25, MySQL=3306, PostgreSQL=5432.
- **Socket:** Endpoint for communication. Combination of IP address + Port number. TCP socket = reliable connection.

### DBMS (Database Management System)
- **What is DBMS?** Software to create, manage, and query databases. Types: Relational (MySQL), NoSQL (MongoDB), In-Memory (Redis).
- **SQL (Structured Query Language):** Language to interact with relational databases. DDL, DML, DCL, TCL.
- **DDL vs DML:** DDL = Data Definition (`CREATE`, `ALTER`, `DROP`). DML = Data Manipulation (`SELECT`, `INSERT`, `UPDATE`, `DELETE`).
- **Primary Key:** Unique identifier for a row. Cannot be NULL. One per table.
- **Foreign Key:** Column that references Primary Key of another table. Establishes relationship between tables.
- **Normalization:** Reducing redundancy. 1NF (atomic values), 2NF (no partial dependency), 3NF (no transitive dependency), BCNF.
- **Denormalization:** Adding redundancy intentionally for faster reads. Used in data warehousing.
- **ACID Properties:** Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent transactions don't interfere), Durability (committed = permanent).
- **Joins:** `INNER JOIN` (matching rows), `LEFT JOIN` (all left + matching right), `RIGHT JOIN`, `FULL OUTER JOIN`, `CROSS JOIN`, `SELF JOIN`.
- **Indexing:** Data structure (B-tree, Hash) to speed up queries. Trade-off: faster reads, slower writes, extra storage.
- **Views:** Virtual table based on a query. Doesn't store data. Used for security and simplification.
- **Stored Procedure:** Precompiled SQL code stored in database. Reusable, reduces network traffic.
- **Triggers:** Automatic actions executed before/after INSERT, UPDATE, DELETE events.
- **Transaction:** A sequence of operations treated as a single unit. `BEGIN`, `COMMIT`, `ROLLBACK`.
- **Deadlock in DBMS:** Two transactions waiting for each other's locks. Resolved by timeout or wait-die/wound-wait schemes.
- **SQL vs NoSQL:** SQL = structured, tables, ACID, vertical scaling. NoSQL = flexible schema, documents/key-value, BASE, horizontal scaling.

### OOPs (Object-Oriented Programming)
- **4 Pillars of OOPs:**
  1. **Encapsulation** — Bundling data + methods together, hiding internal state (private fields + getters/setters).
  2. **Abstraction** — Hiding implementation details, showing only essential features (abstract classes, interfaces).
  3. **Inheritance** — One class acquires properties/methods of another. Types: Single, Multilevel, Hierarchical. Java doesn't support multiple inheritance with classes.
  4. **Polymorphism** — Same name, different behavior. Compile-time (method overloading) vs Runtime (method overriding).
- **Class vs Object:** Class = blueprint/template. Object = instance of a class.
- **Constructor:** Special method called when object is created. Default, Parameterized, Copy constructor.
- **Method Overloading vs Overriding:** Overloading = same name, different params (compile-time). Overriding = same signature in child class (runtime).
- **this vs super:** `this` = current object reference. `super` = parent class reference.
- **static keyword:** Belongs to class, not instance. Shared across all objects. `static` methods cannot access instance variables.
- **Access Modifiers:** `private` (class only), `default` (package), `protected` (package + subclass), `public` (everywhere).
- **SOLID Principles:**
  - **S** — Single Responsibility Principle (one class, one job)
  - **O** — Open/Closed Principle (open for extension, closed for modification)
  - **L** — Liskov Substitution (subtypes replaceable for parent types)
  - **I** — Interface Segregation (many specific interfaces > one general)
  - **D** — Dependency Inversion (depend on abstractions, not concretions)

---

## 🗄️ DATABASES

### MySQL
- **What is MySQL?** Open-source relational database management system. Uses SQL. ACID-compliant. Default port: 3306.
- **Storage Engines:** InnoDB (default, supports transactions, FK), MyISAM (faster reads, no transactions).
- **Auto Increment:** Automatically generates unique IDs. `AUTO_INCREMENT` keyword on primary key column.
- **GROUP BY & HAVING:** `GROUP BY` groups rows by column. `HAVING` filters groups (like WHERE but for aggregates).
- **Aggregate Functions:** `COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()`.

### PostgreSQL
- **What is PostgreSQL?** Advanced open-source relational database. Supports JSON, full-text search, custom types. ACID-compliant. Default port: 5432.
- **PostgreSQL vs MySQL:** PostgreSQL supports complex queries, JSONB, arrays, window functions, CTEs better. MySQL is simpler, faster for read-heavy workloads.
- **JSONB:** Binary JSON storage in PostgreSQL. Indexable, queryable. Great for semi-structured data.
- **Window Functions:** Perform calculations across a set of rows. `ROW_NUMBER()`, `RANK()`, `DENSE_RANK()`, `LAG()`, `LEAD()`.
- **CTE (Common Table Expression):** `WITH` clause — temporary named result set. Improves readability for complex queries.

---

## 🛠️ PLATFORMS & TOOLS

### Git
- **What is Git?** A distributed version control system that tracks changes in source code during development.
- **Repository:** A directory where Git tracks files. Contains `.git` folder with all version history.
- **git init:** Initializes a new Git repository in the current directory.
- **git clone:** Creates a copy of a remote repository on your local machine.
- **git add:** Stages changes for commit. `git add .` stages all changes.
- **git commit:** Saves staged changes with a message. `git commit -m "message"`.
- **git push:** Uploads local commits to remote repository. `git push origin main`.
- **git pull:** Fetches + merges changes from remote. `git pull origin main`.
- **git fetch:** Downloads changes from remote but doesn't merge. Safer than pull.
- **Branching:** Creating parallel lines of development. `git branch feature`, `git checkout -b feature`.
- **git merge:** Combines changes from one branch into another. Fast-forward vs 3-way merge.
- **git rebase:** Moves/reapplies commits on top of another branch. Creates linear history. Don't rebase public branches.
- **Merge Conflict:** Occurs when same lines are modified in different branches. Must be resolved manually.
- **.gitignore:** File specifying which files/folders Git should not track. Example: `node_modules/`, `.env`, `*.class`.
- **git stash:** Temporarily saves uncommitted changes. `git stash pop` restores them.
- **git log:** Shows commit history. `git log --oneline` for compact view.
- **git reset vs git revert:** `reset` = moves HEAD backward (rewrites history). `revert` = creates new commit undoing changes (safe).
- **Fork:** Copy of a repository under your GitHub account. Used for contributing to open-source.
- **Pull Request (PR):** Request to merge your branch/fork changes into the main repository. Allows code review.

### GitHub
- **What is GitHub?** A cloud-based hosting platform for Git repositories. Provides collaboration, CI/CD, issue tracking.
- **GitHub Actions:** CI/CD automation. Define workflows in `.github/workflows/` YAML files. Auto-run tests, deploy on push.
- **Issues & Projects:** Track bugs, features, and tasks. Kanban boards for project management.
- **GitHub Pages:** Free static website hosting directly from a GitHub repository.

### VS Code
- **What is VS Code?** Free, lightweight source code editor by Microsoft. Supports extensions, debugging, Git integration, IntelliSense.
- **Extensions:** Plugins to add functionality — ESLint, Prettier, Live Server, GitLens, Docker, etc.

### Docker
- **What is Docker?** Platform for building, shipping, and running applications in containers. Lightweight alternative to VMs.
- **Container vs VM:** Container shares host OS kernel, lightweight, fast. VM has full OS, heavier, more isolated.
- **Docker Image:** Read-only template with instructions to create a container. Built from `Dockerfile`.
- **Dockerfile:** Text file with instructions to build an image. `FROM`, `COPY`, `RUN`, `CMD`, `EXPOSE`.
- **Docker Compose:** Tool to define and run multi-container applications using `docker-compose.yml`.
- **Docker Commands:** `docker build`, `docker run`, `docker ps`, `docker stop`, `docker rm`, `docker images`.
- **Docker Hub:** Public registry to store and share Docker images.

### Linux
- **What is Linux?** Open-source, Unix-like operating system kernel. Distributions: Ubuntu, CentOS, Fedora, Debian.
- **Basic Commands:** `ls` (list), `cd` (change dir), `pwd` (print working dir), `mkdir` (make dir), `rm` (remove), `cp` (copy), `mv` (move).
- **File Permissions:** `rwx` = read, write, execute. `chmod 755 file` — Owner: rwx, Group: r-x, Others: r-x.
- **grep:** Search text patterns in files. `grep "pattern" file.txt`. `-i` case insensitive, `-r` recursive.
- **pipe ( | ):** Sends output of one command as input to another. `cat file.txt | grep "error"`.
- **Process Management:** `ps` (list processes), `top` (live monitor), `kill PID` (terminate process), `&` (run in background).
- **Package Manager:** `apt` (Debian/Ubuntu), `yum` (CentOS/RHEL). `sudo apt install package-name`.
- **SSH:** Secure Shell — encrypted remote login. `ssh user@hostname`. Uses port 22.
- **cron:** Schedule recurring tasks. `crontab -e` to edit. Format: `min hour day month weekday command`.

---

## 🔐 SECURITY & AUTH (from projects)

### JWT (JSON Web Token)
- **What is JWT?** A compact, URL-safe token for securely transmitting information between parties as a JSON object.
- **Structure:** `Header.Payload.Signature` — Base64 encoded. Header = algorithm. Payload = claims/data. Signature = verification.
- **How it works:** User logs in → Server generates JWT → Client stores it (localStorage/cookie) → Client sends JWT in `Authorization: Bearer <token>` header → Server verifies.
- **Access Token vs Refresh Token:** Access token = short-lived (15 min). Refresh token = long-lived (7 days), used to get new access token.
- **JWT vs Session:** JWT = stateless, stored on client. Session = stateful, stored on server. JWT scales better for distributed systems.

### Authentication vs Authorization
- **Authentication:** Verifying identity — "Who are you?" (login with username/password).
- **Authorization:** Verifying permissions — "What can you do?" (role-based access control).
- **OAuth 2.0:** Authorization framework allowing third-party access. Used for "Login with Google/GitHub".
- **Hashing vs Encryption:** Hashing = one-way (bcrypt for passwords). Encryption = two-way (AES, RSA) — can be decrypted with key.

---

## 🏗️ DESIGN PATTERNS (from projects)

### Patterns Mentioned in Resume
- **Singleton:** Only one instance of a class exists. Private constructor + static getInstance(). Used for: DB connection, logging.
- **Strategy Pattern:** Define a family of algorithms, encapsulate each, make them interchangeable. Used in: slot allocation in Parking Lot.
- **DTO (Data Transfer Object):** Simple object to carry data between layers. No business logic. Prevents exposing entities directly.
- **Repository Pattern:** Abstraction layer between business logic and data access. Provides collection-like interface for data operations.
- **Dependency Injection:** Object receives its dependencies from outside rather than creating them. Types: Constructor, Setter, Field injection.
- **Factory Pattern:** Creates objects without specifying exact class. `ShapeFactory.create("circle")` returns Circle object.
- **Observer Pattern:** One-to-many dependency. When subject changes, all observers are notified. Used in: event systems, pub-sub.
- **Builder Pattern:** Step-by-step construction of complex objects. `User.builder().name("Dilip").age(21).build()`.
- **MVC (Model-View-Controller):** Separates application into Model (data), View (UI), Controller (logic). Used in Spring MVC.

---

## 🌐 WEB CONCEPTS (from projects)

### PWA (Progressive Web App)
- **What is PWA?** Web app that behaves like a native app — works offline, installable, push notifications. Uses Service Workers.
- **Service Worker:** Background script that intercepts network requests, enables caching and offline functionality.

### Base62 Encoding
- **What is Base62?** Encoding using characters `[0-9, a-z, A-Z]` (62 chars). Used in URL shorteners to convert numeric IDs to short strings.

### HTTP Redirect (302)
- **What is HTTP 302?** "Found" status — temporarily redirects client to a different URL. Browser follows the `Location` header.
- **301 vs 302:** 301 = Permanent redirect (cached). 302 = Temporary redirect (not cached).

### AtomicLong (Thread Safety)
- **What is AtomicLong?** Java class for thread-safe long operations without synchronization. Uses CAS (Compare-And-Swap) internally.
- **Thread Safety:** Code that behaves correctly when accessed by multiple threads simultaneously.

### Render (Deployment)
- **What is Render?** Cloud platform for deploying web apps, APIs, databases. Alternative to Heroku. Supports auto-deploy from GitHub.

### Maven
- **What is Maven?** Java build automation tool. Manages dependencies via `pom.xml`. Lifecycle: compile → test → package → install → deploy.

### H2 Database
- **What is H2?** Lightweight, in-memory Java database. Used for development/testing. Can also persist to file. Embedded mode.

---

## 💡 COMMON INTERVIEW QUESTIONS (Quick Answers)

| Question | Answer |
|----------|--------|
| What is an API? | Application Programming Interface — set of rules for communication between software components |
| REST vs GraphQL? | REST = multiple endpoints, fixed data. GraphQL = single endpoint, client specifies exact data needed |
| What is JSON? | JavaScript Object Notation — lightweight data format for data exchange. Key-value pairs |
| What is CORS? | Cross-Origin Resource Sharing — browser security mechanism. Server specifies allowed origins via headers |
| What is a Proxy Server? | Intermediary between client and server. Forward proxy (client-side) vs Reverse proxy (server-side, e.g., Nginx) |
| What is Latency vs Throughput? | Latency = time for single request. Throughput = number of requests per second |
| What is CI/CD? | Continuous Integration (auto-build/test on commit) / Continuous Deployment (auto-deploy to production) |
| What is Agile? | Iterative development methodology. Sprints (2-4 weeks), daily standups, retrospectives |
| What is a Monorepo? | Single repository containing multiple projects. Used by Google, Meta |
| What is WebSocket? | Full-duplex communication protocol over single TCP connection. Used for real-time apps (chat, live updates) |

---

> 💪 **Good luck with your TCS interview, Dilip! You've got this!** 🚀
