# 🎯 TCS Interview Preparation — Complete Guide

> **Interview Window:** 3 July – 8 July 2026  
> **Candidate:** Dilip Kumar  
> **Role:** TCS NQT (Ninja/Digital)

---

## 📋 Table of Contents

1. [Interview Process Overview](#1-interview-process-overview)
2. [TCS Company Facts (Must Know)](#2-tcs-company-facts-must-know)
3. [Technical Round — Complete Prep](#3-technical-round--complete-prep)
4. [Project Explanations (Ready-Made Scripts)](#4-project-explanations-ready-made-scripts)
5. [OOPs — Concepts + Code](#5-oops--concepts--code)
6. [DBMS & SQL — Concepts + Queries](#6-dbms--sql--concepts--queries)
7. [OS & CN Quick Revision](#7-os--cn-quick-revision)
8. [DSA Concepts They May Ask](#8-dsa-concepts-they-may-ask)
9. [HR Round — Complete Prep](#9-hr-round--complete-prep)
10. [Questions YOU Should Ask the Interviewer](#10-questions-you-should-ask-the-interviewer)
11. [Day-of-Interview Checklist](#11-day-of-interview-checklist)

---

## 1. Interview Process Overview

TCS interview typically has **2–3 rounds**:

| Round | Duration | What They Test |
|-------|----------|---------------|
| **Technical Interview** | 20–40 min | CS fundamentals, projects, coding, OOPs, DBMS, OS, CN |
| **Managerial Round** (sometimes merged with Technical) | 15–20 min | Deeper technical + behavioral |
| **HR Round** | 10–20 min | Personality, communication, fitment, willingness to relocate |

> **⚠️ Important:** They may ask you to **write code on paper/whiteboard** for OOPs or SQL. Practice writing without IDE!

---

## 2. TCS Company Facts (Must Know)

| Fact | Detail |
|------|--------|
| **Full Name** | Tata Consultancy Services |
| **Founded** | 1968 |
| **Founder** | J.R.D. Tata |
| **Headquarters** | Mumbai, India |
| **CEO & MD** | **K. Krithivasan** (since June 1, 2023) |
| **Chairman** | Natarajan Chandrasekaran (also Chairman of Tata Sons) |
| **Parent Company** | Tata Group |
| **Revenue (FY2026)** | ~US $30+ Billion |
| **Employees** | ~584,000+ |
| **Global Presence** | 56 countries, 190+ delivery centers |
| **Tagline/Philosophy** | "Building on Belief" |
| **Current Focus** | AI-led technology services, digital transformation |
| **AI Revenue** | Annualized AI revenue crossed US$ 2.3B in Q4 FY26 |
| **Industry** | IT Services, Consulting, Business Solutions |
| **Hiring Portal** | TCS NextStep Portal |
| **TCS Roles** | Ninja, Digital, Prime (ascending order of package) |

> **💡 Tip:** Mention "Building on Belief" philosophy and their AI-led transformation when they ask "Why TCS?"

---

## 3. Technical Round — Complete Prep

### What They Typically Ask:
1. **Tell me about yourself** (even in technical round)
2. **Explain your projects** (MOST IMPORTANT — be very prepared)
3. **OOPs concepts** (with code examples)
4. **DBMS concepts + write SQL queries**
5. **Data Structures & Algorithms** basics
6. **OS concepts** (processes, threads, deadlocks)
7. **CN concepts** (OSI model, TCP vs UDP)
8. **Language-specific questions** (Java / C++ / JavaScript based on resume)
9. **Write a small program** (string/array manipulation, patterns)

### Common Technical Questions:
- What is the difference between a class and an object?
- What are the 4 pillars of OOPs?
- Difference between abstract class and interface?
- What is normalization? Explain 1NF, 2NF, 3NF
- What are ACID properties?
- Write SQL query to find second highest salary
- Difference between process and thread?
- What is deadlock? How to prevent it?
- Explain your project architecture
- What is REST API? How does it work?
- What is JWT and how did you use it?
- Difference between GET and POST?
- What is MVC architecture?

---

## 4. Project Explanations (Ready-Made Scripts)

### 🔥 Use This Framework for Every Project:
1. **Problem Statement** — What problem does it solve?
2. **Tech Stack** — What technologies did you use and WHY?
3. **Architecture** — How is the system designed?
4. **Your Contribution** — What specifically did YOU build?
5. **Challenge Faced** — What was the hardest part?
6. **Impact/Result** — What did you achieve?

---

### Project 1: AceCoder (acecoder.site)

**Script to follow:**

> *"AceCoder is a placement preparation platform that I built from scratch to help students practice coding problems. It currently serves **200+ active users across 5+ countries**.*
>
> *For the backend, I chose **Node.js with Express.js** because of its event-driven, non-blocking I/O model which is perfect for handling concurrent API requests from multiple users simultaneously.*
>
> *I designed the system using **RESTful API architecture** — I created endpoints for user management (registration, login), problem management (CRUD operations on coding problems), submission handling, and contest management.*
>
> *For the database, I used **PostgreSQL** because the data is relational in nature — users have submissions, submissions belong to problems, users participate in contests — so relational DB was the right choice. I optimized my queries using proper indexing and wrote efficient JOINs for fetching user submissions with problem details.*
>
> *For authentication, I implemented **JWT (JSON Web Tokens)** — when a user logs in, the server generates a signed token containing the user ID, which the client sends in the Authorization header for subsequent requests. This makes the system stateless and scalable.*
>
> *I also integrated a **code execution engine** (via an external API) that supports C++ — users can write code, submit it, and get real-time results with test case outputs.*
>
> *The biggest challenge was **handling concurrent submissions** — multiple users submitting code at the same time. I handled this by making the external API calls asynchronous using async/await in Node.js.*
>
> *I deployed the backend on **Render** with a managed PostgreSQL instance, ensuring reliability and automatic scaling."*

**Follow-up questions they might ask:**

| Question | Your Answer |
|----------|-------------|
| Why Node.js and not Java? | Node.js is excellent for I/O-heavy applications like API servers. Its non-blocking model handles many concurrent connections efficiently without creating new threads for each request. |
| How does JWT work? | User logs in → server verifies credentials → generates a signed token with user payload and expiry → sends token to client → client includes it in `Authorization: Bearer <token>` header → server middleware verifies the token on every request. |
| What if the JWT token is stolen? | We set short expiry times (e.g., 1 hour), use HTTPS to prevent MITM attacks, and can implement refresh tokens for better security. |
| How did you structure your database? | Tables: `users`, `problems`, `submissions`, `contests`, `contest_participants`. Foreign key relationships between them. `submissions` has FK to both `users` and `problems`. |
| What is REST API? | REST (Representational State Transfer) is an architectural style that uses HTTP methods — GET (read), POST (create), PUT (update), DELETE (remove) — to perform CRUD operations on resources identified by URLs. |
| How did you deploy on Render? | Connected GitHub repo to Render, set environment variables (DB URL, JWT secret), configured build and start commands. Render auto-deploys on git push. |

---

### Project 2: TinyLink – URL Shortener

**Script to follow:**

> *"TinyLink is a URL shortener service that I built using **Java and Spring Boot**. The idea was to create a system where users can paste a long URL and get a short, unique link in return.*
>
> *For generating short URLs, I used **Base62 encoding** on auto-incrementing IDs. Each URL gets a unique numeric ID, and I convert that to a Base62 string (using characters a-z, A-Z, 0-9). This gives us collision-free, compact short codes. I used **AtomicLong** to ensure thread-safety in a concurrent environment.*
>
> *I followed **SOLID principles** strictly — the Controller handles HTTP requests, the Service layer contains business logic, and the Repository layer manages data persistence. This separation makes the code testable and maintainable. Spring's **Dependency Injection** keeps everything loosely coupled.*
>
> *I built three main API endpoints:*
> - *`POST /shorten` — takes a long URL, returns a short URL*
> - *`GET /redirect/{shortCode}` — redirects to the original URL using HTTP 302*
> - *Proper error handling with 400 (bad request) and 404 (not found) status codes*
>
> *The database is **H2** (in-memory) for simplicity, and the app is containerized using **Docker** for easy deployment."*

**Follow-up questions they might ask:**

| Question | Your Answer |
|----------|-------------|
| Why Base62 and not just random strings? | Base62 on auto-incrementing IDs guarantees uniqueness without any collision-checking overhead. Random strings can collide and need checking against the DB. |
| What is HTTP 302 vs 301? | 302 is temporary redirect (browser doesn't cache), 301 is permanent (browser caches). I used 302 because the short URL might need to be updated later. |
| What is AtomicLong? | It's a thread-safe Long wrapper in `java.util.concurrent.atomic`. It uses CAS (Compare-and-Swap) operations to ensure no two threads get the same ID. |
| Explain SOLID with examples from your project | **S**ingle Responsibility — Controller only handles HTTP, Service only handles logic. **O**pen-Closed — can add new encoding strategies without modifying existing code. **L**iskov — all URL entities can substitute for their base types. **I**nterface Segregation — repository interface has only necessary methods. **D**ependency Inversion — Service depends on interface, not concrete implementation. |
| Why Spring Boot? | Auto-configuration, embedded Tomcat, easy REST API creation with annotations (@RestController, @GetMapping, @PostMapping), built-in dependency injection. |
| What is Docker and why did you use it? | Docker packages the app with its dependencies into a container, ensuring it runs consistently across any environment. `Dockerfile` → build image → run container. |

---

### Project 3: Parking Lot System (LLD)

**Script to follow:**

> *"This is a Low-Level Design project where I designed a Parking Lot management system following design patterns and SOLID principles.*
>
> *I used the **Strategy Pattern** for slot allocation — meaning the parking strategy (nearest slot, first available, etc.) can be swapped at runtime without changing the core parking logic.*
>
> *The system has RESTful APIs for:*
> - *Parking a vehicle (assigns a slot, generates a ticket)*
> - *Unparking (frees the slot, calculates charges based on duration)*
> - *Ticket management and charge calculation*
>
> *I used **DTOs (Data Transfer Objects)** to separate the API request/response models from internal domain entities. The repository layer is in-memory (using HashMaps) but can easily be swapped with a database thanks to the abstraction.*
>
> *All components use **Dependency Injection** through Spring, and the ParkingLotManager follows the **Singleton pattern** since we only need one instance managing the lot."*

**Follow-up questions they might ask:**

| Question | Your Answer |
|----------|-------------|
| What is Strategy Pattern? | It defines a family of algorithms, encapsulates each one, and makes them interchangeable. In my project, different slot allocation strategies (NearestFirst, FirstAvailable) implement the same interface. |
| What is DTO pattern? | DTOs are simple objects used to transfer data between layers without exposing internal entity structure. They help decouple the API contract from the database model. |
| What is Singleton? | A design pattern that restricts a class to only one instance. Useful for shared resources like the ParkingLotManager. Implemented using a private constructor and static instance. |
| Difference between Strategy and Factory pattern? | Strategy lets you change the behavior of an object at runtime. Factory creates objects without specifying the exact class. Strategy = behavioral, Factory = creational. |

---

## 5. OOPs — Concepts + Code

### The 4 Pillars (Explain with Code)

#### 1. Encapsulation
**Definition:** Bundling data (variables) and methods that operate on that data into a single unit (class), and restricting direct access using access modifiers.

```java
class BankAccount {
    private double balance;  // private - can't access directly
    
    public double getBalance() {     // getter
        return balance;
    }
    
    public void deposit(double amount) {  // controlled access
        if (amount > 0) {
            balance += amount;
        }
    }
}
```
**Real-world analogy:** Like an ATM — you interact through buttons (methods) but can't directly access the cash vault (private data).

#### 2. Inheritance
**Definition:** A mechanism where a new class (child) inherits properties and methods from an existing class (parent), promoting code reusability.

```java
class Animal {
    void eat() {
        System.out.println("This animal eats food");
    }
}

class Dog extends Animal {
    void bark() {
        System.out.println("Dog barks");
    }
}

// Dog d = new Dog();
// d.eat();  // inherited
// d.bark(); // own method
```
**Types:** Single, Multilevel, Hierarchical (Java doesn't support multiple inheritance with classes — uses interfaces instead)

#### 3. Polymorphism
**Definition:** The ability of an object to take many forms. Same method name, different behavior.

**Compile-time (Method Overloading):**
```java
class Calculator {
    int add(int a, int b) { return a + b; }
    double add(double a, double b) { return a + b; }
    int add(int a, int b, int c) { return a + b + c; }
}
```

**Runtime (Method Overriding):**
```java
class Shape {
    void draw() {
        System.out.println("Drawing shape");
    }
}

class Circle extends Shape {
    @Override
    void draw() {
        System.out.println("Drawing circle");
    }
}

// Shape s = new Circle();
// s.draw(); // Output: "Drawing circle" — decided at runtime
```

#### 4. Abstraction
**Definition:** Hiding complex implementation details and showing only the essential features.

```java
abstract class Vehicle {
    abstract void start();  // no implementation
    
    void stop() {  // concrete method
        System.out.println("Vehicle stopped");
    }
}

class Car extends Vehicle {
    @Override
    void start() {
        System.out.println("Car started with key");
    }
}
```
**Real-world analogy:** You know how to drive a car (interface) without knowing how the engine works internally.

### Other OOPs Questions They Ask:

| Question | Answer |
|----------|--------|
| **Class vs Object** | Class is a blueprint/template. Object is an instance of that class. `Car` is a class, `myCar` is an object. |
| **Abstract Class vs Interface** | Abstract class: can have both abstract and concrete methods, can have constructors, `extends` keyword. Interface: all methods are abstract (until Java 8 default methods), no constructors, `implements` keyword. Use interface for "can-do" (Flyable), abstract class for "is-a" (Animal). |
| **Constructor** | Special method called when object is created. Same name as class, no return type. Default constructor has no parameters. Parameterized constructor takes arguments. |
| **`this` keyword** | Refers to the current object instance. Used to resolve ambiguity between instance variables and parameters. |
| **`super` keyword** | Refers to the parent class. Used to call parent constructor or parent methods. |
| **`static` keyword** | Belongs to the class, not to any instance. Shared across all objects. `static` methods can be called without creating an object. |
| **`final` keyword** | Variable: value can't change (constant). Method: can't be overridden. Class: can't be inherited. |
| **Why Java doesn't support multiple inheritance?** | Diamond problem — ambiguity when two parent classes have the same method. Java solves this using interfaces. |
| **What is `this` vs `super`?** | `this` = current class reference. `super` = parent class reference. |
| **Access Modifiers** | `private` (class only), `default` (package), `protected` (package + subclass), `public` (everywhere) |
| **What is a virtual function?** | In C++, a function declared with `virtual` keyword in base class to enable runtime polymorphism. In Java, all non-static methods are virtual by default. |

### Write Code They Might Ask:

```java
// 1. Demonstrate all 4 pillars in one example
abstract class Employee {
    private String name;        // ENCAPSULATION
    private double salary;
    
    public Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }
    
    public String getName() { return name; }
    public double getSalary() { return salary; }
    
    abstract double calculateBonus();  // ABSTRACTION
    
    void displayInfo() {
        System.out.println(name + " earns " + salary + " with bonus " + calculateBonus());
    }
}

class Manager extends Employee {    // INHERITANCE
    public Manager(String name, double salary) {
        super(name, salary);
    }
    
    @Override
    double calculateBonus() {       // POLYMORPHISM (runtime)
        return getSalary() * 0.20;
    }
}

class Developer extends Employee {  // INHERITANCE
    public Developer(String name, double salary) {
        super(name, salary);
    }
    
    @Override
    double calculateBonus() {       // POLYMORPHISM (runtime)
        return getSalary() * 0.10;
    }
}
```

---

## 6. DBMS & SQL — Concepts + Queries

### Key Concepts:

| Concept | Explanation |
|---------|-------------|
| **DBMS vs RDBMS** | DBMS stores data as files (no relations). RDBMS stores data in tables with relationships (uses SQL). Examples: MySQL, PostgreSQL are RDBMS. |
| **Primary Key** | Uniquely identifies each row. Cannot be NULL, must be unique. |
| **Foreign Key** | A column in one table that refers to the Primary Key of another table. Establishes relationships. |
| **Candidate Key** | A column (or set) that can uniquely identify rows. One becomes Primary Key, rest are Alternate Keys. |
| **Normalization** | Process of organizing data to reduce redundancy. |
| **1NF** | Each column has atomic (indivisible) values. No repeating groups. |
| **2NF** | 1NF + No partial dependency (all non-key columns fully depend on the ENTIRE primary key). |
| **3NF** | 2NF + No transitive dependency (non-key columns don't depend on other non-key columns). |
| **ACID Properties** | **A**tomicity (all or nothing), **C**onsistency (valid state), **I**solation (concurrent txns don't interfere), **D**urability (committed = permanent). |
| **Index** | A data structure (like B-Tree) that speeds up data retrieval. Trade-off: faster reads, slower writes. |
| **View** | A virtual table based on a SELECT query. Doesn't store data, just a saved query. |
| **Trigger** | Automatic action (SQL code) that fires when INSERT/UPDATE/DELETE happens. |
| **Stored Procedure** | A saved SQL program that can be called by name. Reduces network traffic. |
| **JOIN** | Combines rows from two+ tables based on a related column. |
| **WHERE vs HAVING** | WHERE filters rows BEFORE aggregation. HAVING filters groups AFTER aggregation. |
| **DELETE vs TRUNCATE vs DROP** | DELETE: removes specific rows (can rollback). TRUNCATE: removes all rows (faster, can't rollback). DROP: removes the entire table structure. |
| **UNION vs UNION ALL** | UNION removes duplicates. UNION ALL keeps all rows including duplicates. |

### SQL Queries They Ask You to Write:

#### 1. Find the Second Highest Salary
```sql
-- Method 1: Using Subquery
SELECT MAX(salary) AS SecondHighestSalary
FROM Employee
WHERE salary < (SELECT MAX(salary) FROM Employee);

-- Method 2: Using LIMIT/OFFSET
SELECT DISTINCT salary
FROM Employee
ORDER BY salary DESC
LIMIT 1 OFFSET 1;

-- Method 3: Using DENSE_RANK (impressive answer)
SELECT salary FROM (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rnk
    FROM Employee
) t WHERE rnk = 2;
```

#### 2. Find Duplicate Records
```sql
SELECT name, COUNT(*) as cnt
FROM Employee
GROUP BY name
HAVING COUNT(*) > 1;
```

#### 3. JOIN Example — Get Employee with Department Name
```sql
SELECT e.name, e.salary, d.department_name
FROM Employees e
INNER JOIN Departments d ON e.dept_id = d.dept_id;
```

#### 4. Find Employees with Salary Greater than Average
```sql
SELECT name, salary
FROM Employee
WHERE salary > (SELECT AVG(salary) FROM Employee);
```

#### 5. Count Employees in Each Department
```sql
SELECT d.department_name, COUNT(e.emp_id) AS emp_count
FROM Departments d
LEFT JOIN Employees e ON d.dept_id = e.dept_id
GROUP BY d.department_name;
```

#### 6. Find Departments with More than 5 Employees
```sql
SELECT dept_id, COUNT(*) AS emp_count
FROM Employee
GROUP BY dept_id
HAVING COUNT(*) > 5;
```

#### 7. Delete Duplicate Rows (Keep One)
```sql
DELETE FROM Employee
WHERE emp_id NOT IN (
    SELECT MIN(emp_id)
    FROM Employee
    GROUP BY name, salary
);
```

#### 8. Find Nth Highest Salary (Generalized)
```sql
SELECT salary FROM (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rnk
    FROM Employee
) t WHERE rnk = N;  -- Replace N with desired rank
```

### JOIN Types Visual:

```
INNER JOIN:     Only matching rows from both tables
LEFT JOIN:      All rows from left + matching from right (NULL if no match)
RIGHT JOIN:     All rows from right + matching from left
FULL OUTER JOIN: All rows from both tables
CROSS JOIN:     Every row from table A × every row from table B
SELF JOIN:      Table joined with itself
```

---

## 7. OS & CN Quick Revision

### Operating System Key Concepts:

| Topic | Quick Answer |
|-------|-------------|
| **Process vs Thread** | Process = independent program with own memory. Thread = lightweight unit within a process sharing the same memory. Thread is faster to create/switch. |
| **Process States** | New → Ready → Running → Waiting → Terminated |
| **CPU Scheduling** | FCFS (First Come First Served), SJF (Shortest Job First), Round Robin (time quantum), Priority Scheduling |
| **Deadlock** | When 2+ processes are waiting for each other to release resources, forming a circular wait. |
| **Deadlock Conditions** | Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait (ALL 4 must hold) |
| **Deadlock Prevention** | Break any one of the 4 conditions. |
| **Paging** | Memory management: divides memory into fixed-size pages (logical) and frames (physical). |
| **Virtual Memory** | Technique where part of hard disk is used as if it were RAM. Uses demand paging. |
| **Thrashing** | When system spends more time swapping pages than executing processes. |
| **Semaphore** | Synchronization tool: Binary (0/1 like mutex) or Counting (for limited resources). |
| **Mutex vs Semaphore** | Mutex = lock for one thread (ownership concept). Semaphore = counter for multiple threads. |
| **Context Switching** | Saving state of current process and loading state of next process. |
| **Starvation** | A process never gets CPU time because higher-priority processes keep arriving. |
| **Aging** | Solution to starvation: gradually increase priority of waiting processes. |

### Computer Networks Key Concepts:

| Topic | Quick Answer |
|-------|-------------|
| **OSI Model (7 layers)** | **P**hysical, **D**ata Link, **N**etwork, **T**ransport, **S**ession, **P**resentation, **A**pplication (remember: "Please Do Not Throw Sausage Pizza Away") |
| **TCP/IP Model (4 layers)** | Network Interface, Internet, Transport, Application |
| **TCP vs UDP** | TCP: reliable, connection-oriented, ordered, slower (HTTP, FTP). UDP: unreliable, connectionless, faster (video streaming, DNS, gaming). |
| **HTTP vs HTTPS** | HTTPS = HTTP + SSL/TLS encryption. Port 80 vs 443. |
| **GET vs POST** | GET: retrieves data, parameters in URL, cached, bookmarkable. POST: sends data in body, not cached, used for form submissions. |
| **IP Address** | Unique identifier for a device on a network. IPv4 (32-bit), IPv6 (128-bit). |
| **DNS** | Domain Name System — translates domain names (google.com) to IP addresses. |
| **DHCP** | Dynamically assigns IP addresses to devices on a network. |
| **MAC Address** | Hardware address of a network interface card. 48-bit. Unique per device. |
| **Subnetting** | Dividing a network into smaller sub-networks for efficiency and security. |
| **3-Way Handshake** | TCP connection: SYN → SYN-ACK → ACK |
| **Firewall** | Security system that monitors and controls incoming/outgoing network traffic. |
| **REST API** | Architectural style using HTTP methods (GET, POST, PUT, DELETE) for CRUD operations on resources identified by URLs. Stateless. |
| **Status Codes** | 200 OK, 201 Created, 301 Permanent Redirect, 302 Temp Redirect, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error |

---

## 8. DSA Concepts They May Ask

### Basic Concepts:

| Topic | Quick Answer |
|-------|-------------|
| **Array vs Linked List** | Array: contiguous memory, O(1) access, fixed size. LinkedList: non-contiguous, O(n) access, dynamic size, O(1) insert/delete. |
| **Stack** | LIFO (Last In First Out). Push, Pop, Peek. Use: function calls, undo, parenthesis matching. |
| **Queue** | FIFO (First In First Out). Enqueue, Dequeue. Use: BFS, scheduling, printer queue. |
| **HashMap** | Key-value pairs. O(1) average lookup. Uses hashing. Collision handling: chaining or open addressing. |
| **Binary Tree** | Each node has max 2 children. Types: Full, Complete, Perfect, BST. |
| **BST** | Left child < parent < right child. Search: O(log n) average, O(n) worst. |
| **Time Complexity** | O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) |
| **Binary Search** | Works on sorted array. Repeatedly divide in half. O(log n). |
| **Sorting** | Bubble O(n²), Selection O(n²), Insertion O(n²), Merge O(n log n), Quick O(n log n) avg |
| **Recursion** | Function calling itself with a base case and recursive case. |

### Common Coding Questions (Practice Writing on Paper):

```java
// 1. Reverse a String
String reverse(String s) {
    StringBuilder sb = new StringBuilder(s);
    return sb.reverse().toString();
}

// Without StringBuilder:
String reverse(String s) {
    char[] arr = s.toCharArray();
    int left = 0, right = arr.length - 1;
    while (left < right) {
        char temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left++;
        right--;
    }
    return new String(arr);
}

// 2. Check Palindrome
boolean isPalindrome(String s) {
    int left = 0, right = s.length() - 1;
    while (left < right) {
        if (s.charAt(left) != s.charAt(right)) return false;
        left++;
        right--;
    }
    return true;
}

// 3. Find Largest Element in Array
int findMax(int[] arr) {
    int max = arr[0];
    for (int i = 1; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];
    }
    return max;
}

// 4. Fibonacci Series
void fibonacci(int n) {
    int a = 0, b = 1;
    for (int i = 0; i < n; i++) {
        System.out.print(a + " ");
        int temp = a + b;
        a = b;
        b = temp;
    }
}

// 5. Check Prime Number
boolean isPrime(int n) {
    if (n <= 1) return false;
    for (int i = 2; i <= Math.sqrt(n); i++) {
        if (n % i == 0) return false;
    }
    return true;
}

// 6. Factorial (Recursive)
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// 7. Count vowels in a string
int countVowels(String s) {
    int count = 0;
    String vowels = "aeiouAEIOU";
    for (char c : s.toCharArray()) {
        if (vowels.indexOf(c) != -1) count++;
    }
    return count;
}

// 8. Remove duplicates from array
// (Using HashSet)
int[] removeDuplicates(int[] arr) {
    Set<Integer> set = new LinkedHashSet<>();
    for (int num : arr) set.add(num);
    return set.stream().mapToInt(Integer::intValue).toArray();
}

// 9. Swap two numbers without temp
void swap(int a, int b) {
    a = a + b;   // a = sum
    b = a - b;   // b = original a
    a = a - b;   // a = original b
}

// 10. Star Pattern (Right Triangle)
void pattern(int n) {
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= i; j++) {
            System.out.print("* ");
        }
        System.out.println();
    }
}
// Output for n=4:
// *
// * *
// * * *
// * * * *
```

---

## 9. HR Round — Complete Prep

### 9.1 "Tell Me About Yourself" (Memorize This!)

> *"Good morning/afternoon sir/ma'am. My name is **Dilip Kumar**. I'm currently pursuing my **Bachelor of Technology in Computer Science and Engineering** from **Lovely Professional University, Phagwara, Punjab**.*
>
> *I have a strong foundation in **Data Structures & Algorithms** — I've solved **1000+ problems** across platforms like LeetCode, Codeforces, and CodeChef. I'm rated as a **Knight on LeetCode (1892)**, **Specialist on Codeforces (1475)**, and **3-Star on CodeChef (1723)**.*
>
> *On the development side, I've built several full-stack projects. My most significant one is **AceCoder**, a placement preparation platform that serves **200+ active users across 5+ countries**. I built the complete backend using **Node.js, Express.js, and PostgreSQL** with RESTful APIs and JWT authentication.*
>
> *I'm proficient in **Java, C++, and JavaScript**, and I have hands-on experience with frameworks like **Spring Boot and Node.js**.*
>
> *I'm passionate about problem-solving and building scalable systems, and I'm excited about the opportunity to contribute to TCS's mission of driving digital transformation while growing as a professional."*
>
> ⏱️ **Keep it under 90 seconds!**

---

### 9.2 "Why TCS?"

> *"I want to join TCS for three main reasons:*
>
> *First, TCS is the **flagship company of the Tata Group**, and I deeply admire the Tata values of integrity, excellence, and social responsibility. The 'Building on Belief' philosophy resonates with me.*
>
> *Second, TCS is a **global leader in IT services** operating in 56 countries, which means I'd get exposure to diverse projects and cutting-edge technologies. I'm particularly excited about TCS's focus on **AI-led transformation** — the fact that your AI revenue has already crossed $2.3 billion shows the company is at the forefront of innovation.*
>
> *Third, TCS has a strong culture of **employee development and learning**. As a fresher, I want to be mentored, work on large-scale systems, and grow both technically and professionally. TCS provides that perfect environment.*
>
> *I believe my strong problem-solving skills and development experience would allow me to contribute meaningfully to TCS's mission."*

---

### 9.3 Common HR Questions with Model Answers

#### "What are your strengths?"
> *"My biggest strength is **problem-solving** — having solved 1000+ DSA problems, I've developed a systematic approach to breaking down complex problems. I also pick up new technologies quickly — for example, I taught myself Spring Boot and built a complete URL shortener project within a short time. Additionally, I work well in teams and adapt easily to new environments."*

#### "What are your weaknesses?"
> *"Sometimes I tend to **over-focus on getting the optimal solution** rather than going with a working approach first. For example, while solving coding problems, I sometimes spend too long thinking about the most efficient algorithm when a simpler solution would work. I'm actively working on this by adopting a 'make it work first, then optimize' mindset."*

#### "Where do you see yourself in 5 years?"
> *"In 5 years, I see myself as a **technically proficient professional** who has contributed to multiple complex projects at TCS. I want to deepen my expertise in backend systems and system design, potentially taking on technical leadership responsibilities within my team. I also want to mentor newer team members, contributing to TCS's culture of learning."*

#### "Why should we hire you?"
> *"I bring a combination of **strong fundamentals and practical experience**. My competitive programming background (1000+ problems, LeetCode Knight) shows I can write efficient code under pressure. My projects like AceCoder (200+ users, deployed in production) show I can build real-world systems. I'm a fast learner, team player, and genuinely passionate about technology. I'm ready to contribute from day one."*

#### "Are you willing to relocate?"
> *"Yes, absolutely. I understand that TCS operates globally and project requirements may need me to work from different locations. I'm completely flexible and open to relocating anywhere in India or abroad."*

#### "Are you willing to work in shifts/night shifts?"
> *"Yes, I understand that TCS serves global clients across different time zones, and I'm willing to work in any shift that the project requires."*

#### "Do you have any gap in education?"
> *"No sir/ma'am, I don't have any significant gaps. I completed my 10th in 2020, 12th in 2022, and started my B.Tech in 2023." (If asked about the 1-year gap between 12th and B.Tech, mention COVID or preparation time.)*

#### "What do you know about TCS?"
> *"TCS, or Tata Consultancy Services, is a global leader in IT services, consulting, and business solutions. It's the flagship company of the Tata Group, founded in 1968. The current CEO is K. Krithivasan. TCS has over 584,000 employees across 56 countries, with a revenue of over $30 billion. The company's philosophy is 'Building on Belief,' and it's currently focused on becoming an AI-led technology services company."*

#### "How do you handle pressure/tight deadlines?"
> *"I handle pressure by **prioritizing tasks and breaking them into smaller milestones**. During my AceCoder project, I had to deploy the backend while simultaneously adding new features for a growing user base. I created a task list, focused on critical issues first, and used Git branches to manage parallel development. I believe pressure brings out the best in me when managed properly."*

#### "Tell me about a challenging situation and how you handled it."
> *"During my AceCoder project, I faced a critical issue where **concurrent code submissions were causing timeout errors**. Multiple users submitting solutions simultaneously would overwhelm the external code execution API. I solved this by implementing proper async/await patterns in Node.js and adding request queuing. This experience taught me the importance of thinking about scalability from the start."*

#### "What is the difference between hard work and smart work?"
> *"Hard work means putting in consistent effort and dedication. Smart work means finding the most efficient way to achieve the same result. I believe you need both — smart work tells you what to do, hard work ensures you do it. For example, solving 1000+ DSA problems was hard work, but choosing the right topics and patterns to study was smart work."*

#### "Do you have any questions for us?"
> *"Yes, I have a couple of questions:"*
> 1. *"What does the onboarding and training process look like for new hires at TCS?"*
> 2. *"What are the biggest projects or technology areas the team is currently working on?"*
> 3. *"What advice would you give to a fresher joining TCS to grow quickly?"*

---

### 9.4 Situational / Behavioral Questions:

| Question | Framework to Use |
|----------|-----------------|
| Tell me about a time you worked in a team | STAR method: Situation, Task, Action, Result |
| How do you handle disagreements? | "I listen first, understand the other perspective, and find a middle ground" |
| Have you ever failed at something? | Talk about a coding contest where you couldn't solve a problem → what you learned |
| How do you keep yourself updated? | "I follow tech blogs, solve problems daily on LeetCode, read documentation" |
| If you don't know something in a project, what do you do? | "I first try to understand through documentation and research, then ask senior team members" |

---

## 10. Questions YOU Should Ask the Interviewer

Always ask 1-2 questions. It shows interest!

1. "What does the typical day look like for a fresher at TCS?"
2. "What kind of training programs does TCS offer for new joinees?"
3. "What technologies is your current team working with?"
4. "How is performance evaluated for freshers in the first year?"
5. "What advice would you give to someone joining TCS as a fresher?"

> **⚠️ Never ask about salary, leaves, or work-from-home in the interview!**

---

## 11. Day-of-Interview Checklist

### 📦 What to Bring:
- [ ] **Laptop** with working **webcam and headphone** (mentioned in the email!)
- [ ] All **original academic documents** (10th, 12th, Degree marksheets)
- [ ] **Resume** — multiple printed copies (at least 3)
- [ ] **ID Proof** (Aadhar card, PAN card, or College ID)
- [ ] **Passport-size photographs** (2-3)
- [ ] Pen and paper (for writing code if asked)
- [ ] Water bottle

### 👔 Dress Code:
- **Proper formals** (mentioned in the email!)
- Men: Formal shirt (preferably light colored) + dark trousers + formal shoes
- Clean and well-groomed appearance

### 🧠 Mental Preparation:
- [ ] Practice your "Tell me about yourself" out loud 5 times
- [ ] Practice project explanation out loud
- [ ] Review OOPs concepts — be ready to write code
- [ ] Review SQL queries — 2nd highest salary, JOINs, GROUP BY
- [ ] Read through this entire document one more time
- [ ] Get proper sleep the night before
- [ ] Reach the venue **30 minutes early**

### ❌ Things to AVOID:
- Don't lie about your skills or experience
- Don't say "I don't know" without trying — say "I'm not fully sure, but I think..."
- Don't badmouth previous experiences or institutions
- Don't look at your phone during the interview
- Don't speak too fast — take a breath, think, then answer
- Don't use slang or informal language
- Don't ask about salary in the interview

### ✅ Tips:
- Make **eye contact** and **smile**
- Use the interviewer's name if they introduced themselves
- Say **"That's a great question"** before answering tricky questions (buys thinking time)
- If you don't know an answer: *"I'm not fully familiar with that concept, but based on what I know about [related topic], I would think..."*
- **Be honest** — interviewers respect honesty over fake answers
- Show **enthusiasm and eagerness to learn**

---

## 🔥 Quick Revision Before Walking In

1. **Your intro** — 90 seconds, well-practiced
2. **Why TCS** — Tata values + global leader + AI focus + employee growth
3. **AceCoder project** — Node.js, Express, PostgreSQL, JWT, 200+ users
4. **TinyLink project** — Spring Boot, Base62, SOLID, REST APIs
5. **OOPs 4 pillars** — Encapsulation, Inheritance, Polymorphism, Abstraction
6. **SQL queries** — 2nd highest salary, JOINs, GROUP BY + HAVING
7. **ACID properties** — Atomicity, Consistency, Isolation, Durability
8. **Process vs Thread** — Process = independent, Thread = lightweight shared memory
9. **TCP vs UDP** — Reliable vs Fast
10. **TCS CEO** — K. Krithivasan

---

> **All the best, Dilip! You've got this! 💪🚀**
> 
> You've solved 1000+ DSA problems, built real projects used by 200+ people, and cleared the TCS NQT.
> You ARE prepared. Walk in with confidence!
