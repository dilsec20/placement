# 📝 Interview — Real Questions & Model Answers (Accenture PYQ)

> **Memory-based interview questions from Accenture campus drives**

---

## 📑 Index

1. [Technical — OOP Questions](#1-technical--oop-questions)
2. [Technical — DBMS & SQL Questions](#2-technical--dbms--sql-questions)
3. [Technical — OS & Networking Questions](#3-technical--os--networking-questions)
4. [Technical — Coding & DS Questions](#4-technical--coding--ds-questions)
5. [Technical — Project-Based Questions](#5-technical--project-based-questions)
6. [HR — Behavioral Questions](#6-hr--behavioral-questions)
7. [HR — Situational Questions](#7-hr--situational-questions)

---

## 1. Technical — OOP Questions

---

**Q1.** What are the four pillars of OOP?
> **Answer:** The four pillars are:
> 1. **Encapsulation** — Bundling data and methods together, restricting direct access using access modifiers (public, private, protected).
> 2. **Abstraction** — Hiding implementation details and exposing only the interface.
> 3. **Inheritance** — One class acquires properties and methods of another class (code reusability).
> 4. **Polymorphism** — Same function name behaves differently based on context (overloading = compile-time, overriding = runtime).

---

**Q2.** What is the difference between a class and an object?
> **Answer:** A **class** is a blueprint/template that defines the structure and behavior. An **object** is an instance of a class — it is the actual entity created in memory.
> Example: `Student` is a class, `s1 = Student("Dilip", 22)` is an object.

---

**Q3.** What is function overloading vs function overriding?
> **Answer:**
> - **Overloading:** Same function name with different parameters in the **same class**. Resolved at compile time.
> - **Overriding:** Same function name and parameters in **parent and child classes**. Resolved at runtime using virtual functions.

---

**Q4.** What is a constructor? Types?
> **Answer:** A constructor is a special function that is automatically called when an object is created. It initializes the object.
> Types:
> - **Default Constructor** — No parameters
> - **Parameterized Constructor** — Takes arguments
> - **Copy Constructor** — Creates object by copying another object

---

**Q5.** Can we have multiple constructors in C++?
> **Answer:** Yes! This is called **constructor overloading**. Multiple constructors can exist with different parameter lists.

---

**Q6.** What is the difference between `public`, `private`, and `protected`?
> **Answer:**
> - `public` — Accessible from anywhere
> - `private` — Accessible only within the class (default in C++ class)
> - `protected` — Accessible within the class and its derived (child) classes

---

**Q7.** What is a virtual function?
> **Answer:** A virtual function is declared in the base class using the `virtual` keyword. It allows the derived class to override it, enabling **runtime polymorphism**. When called using a base class pointer pointing to a derived object, the derived version runs.

---

**Q8.** What is an abstract class?
> **Answer:** An abstract class contains at least one **pure virtual function** (`virtual void func() = 0;`). It cannot be instantiated — it must be inherited. It defines an interface that derived classes must implement.

---

**Q9.** What is the difference between struct and class in C++?
> **Answer:** The only difference is the **default access modifier**: struct members are `public` by default, class members are `private` by default. Otherwise, they are functionally identical in C++.

---

**Q10.** What is `this` pointer in C++?
> **Answer:** `this` is an implicit pointer available inside every non-static member function. It points to the current object. Used to resolve ambiguity between member variables and parameters with the same name.

---

## 2. Technical — DBMS & SQL Questions

---

**Q11.** What is the difference between DELETE, TRUNCATE, and DROP?
> **Answer:**
> - `DELETE` — Removes specific rows (can use WHERE), can be rolled back, DML
> - `TRUNCATE` — Removes ALL rows, cannot be rolled back easily, DDL, faster
> - `DROP` — Removes the entire table (structure + data), DDL

---

**Q12.** What is a Primary Key?
> **Answer:** A column (or set of columns) that uniquely identifies each row in a table. It cannot be NULL and must be unique. Each table can have only ONE primary key.

---

**Q13.** What is a Foreign Key?
> **Answer:** A column that creates a link between two tables. It references the primary key of another table, enforcing **referential integrity**.

---

**Q14.** What are the different types of JOINs?
> **Answer:**
> - **INNER JOIN** — Returns rows with matching values in both tables
> - **LEFT JOIN** — All rows from left table + matching from right (NULL if no match)
> - **RIGHT JOIN** — All rows from right + matching from left
> - **FULL OUTER JOIN** — All rows from both tables
> - **CROSS JOIN** — Cartesian product (every combination)
> - **SELF JOIN** — A table joined with itself

---

**Q15.** Write a query to find employees with salary greater than 50000.
> ```sql
> SELECT * FROM employees WHERE salary > 50000;
> ```

---

**Q16.** Write a query to find the second highest salary.
> ```sql
> SELECT MAX(salary) FROM employees 
> WHERE salary < (SELECT MAX(salary) FROM employees);
> ```

---

**Q17.** What is Normalization?
> **Answer:** The process of organizing a database to reduce redundancy and dependency.
> - **1NF:** Atomic values, no repeating groups
> - **2NF:** 1NF + No partial dependency
> - **3NF:** 2NF + No transitive dependency

---

**Q18.** What are ACID properties?
> **Answer:**
> - **Atomicity** — Transaction is all-or-nothing
> - **Consistency** — Database remains valid before and after
> - **Isolation** — Concurrent transactions don't interfere
> - **Durability** — Committed data survives crashes

---

**Q19.** What is the difference between WHERE and HAVING?
> **Answer:**
> - `WHERE` — Filters individual rows BEFORE grouping
> - `HAVING` — Filters groups AFTER GROUP BY
> ```sql
> SELECT dept, COUNT(*) FROM emp GROUP BY dept HAVING COUNT(*) > 5;
> ```

---

**Q20.** What is an Index in a database?
> **Answer:** An index is a data structure that speeds up data retrieval operations. It works like a book index — instead of scanning every row, the DB can jump directly to the relevant data. Trade-off: faster reads, slower writes.

---

## 3. Technical — OS & Networking Questions

---

**Q21.** What is the difference between Process and Thread?
> **Answer:**
> - **Process** — Independent program in execution, has its own memory space
> - **Thread** — Lightweight unit within a process, shares memory with other threads in the same process
> Threads are faster to create and context-switch than processes.

---

**Q22.** What is Deadlock? How to prevent it?
> **Answer:** Deadlock occurs when two or more processes are waiting for each other's resources indefinitely. Four conditions must ALL hold:
> 1. Mutual Exclusion
> 2. Hold and Wait
> 3. No Preemption
> 4. Circular Wait
> **Prevention:** Break any one of these conditions.

---

**Q23.** What is the OSI model?
> **Answer:** The OSI (Open Systems Interconnection) model has 7 layers:
> 1. Physical → 2. Data Link → 3. Network → 4. Transport → 5. Session → 6. Presentation → 7. Application
> Mnemonic: "All People Seem To Need Data Processing"

---

**Q24.** Difference between TCP and UDP?
> **Answer:**
> - **TCP** — Connection-oriented, reliable, ordered, slower (HTTP, FTP, Email)
> - **UDP** — Connectionless, unreliable, unordered, faster (DNS, VoIP, Gaming)

---

**Q25.** What is DNS?
> **Answer:** Domain Name System translates human-readable domain names (like google.com) into IP addresses (like 142.250.190.14). It acts as the "phonebook of the internet."

---

## 4. Technical — Coding & DS Questions

---

**Q26.** Write a C++ program to check if a number is palindrome.
```cpp
#include <iostream>
using namespace std;

int main() {
    int n, rev = 0;
    cin >> n;
    int original = n;
    while (n > 0) {
        rev = rev * 10 + n % 10;
        n /= 10;
    }
    cout << (original == rev ? "Palindrome" : "Not Palindrome") << endl;
    return 0;
}
```

---

**Q27.** Write a C++ program to find the factorial of a number using recursion.
```cpp
#include <iostream>
using namespace std;

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    int n;
    cin >> n;
    cout << n << "! = " << factorial(n) << endl;
    return 0;
}
```

---

**Q28.** What is the time complexity of Binary Search?
> **Answer:** O(log n). Binary Search works by repeatedly dividing the search interval in half. Requires a **sorted** array.

---

**Q29.** Difference between Stack and Queue?
> **Answer:**
> - **Stack** — LIFO (Last In First Out). Push/Pop. Used in: undo, recursion, expression evaluation.
> - **Queue** — FIFO (First In First Out). Enqueue/Dequeue. Used in: BFS, scheduling, print queue.

---

**Q30.** What is a Linked List? Types?
> **Answer:** A linear data structure where elements (nodes) are connected via pointers. Each node contains data + pointer to next node.
> Types:
> - **Singly Linked List** — Each node points to next
> - **Doubly Linked List** — Each node points to next AND previous
> - **Circular Linked List** — Last node points back to first

---

## 5. Technical — Project-Based Questions

---

**Q31.** Tell me about your project.
> **Framework (PAR):**
> "The **Problem** was [what problem your project solves].
> My **Approach** was to use [technologies, architecture].
> The **Result** was [outcome, impact, grade, deployment]."

---

**Q32.** What was your role in the project?
> "I was primarily responsible for [specific responsibility]. For example, I designed the [specific module], implemented the [specific feature] using [technology], and handled [testing/deployment/etc.]."

---

**Q33.** What challenges did you face?
> "One challenge was [specific problem]. I resolved it by [specific action — researching docs, debugging, asking mentor, changing approach]. This taught me [lesson learned]."

---

**Q34.** Why did you choose [technology X] for your project?
> "I chose [X] because [specific reason — performance, ease of use, team familiarity, community support, requirement fit]. For example, [specific benefit in your context]."

---

**Q35.** If you had to redo this project, what would you change?
> "Looking back, I would [specific improvement — better architecture, more testing, different technology, better documentation]. This shows that I've grown as a developer and can critically evaluate my own work."

---

## 6. HR — Behavioral Questions

---

**Q36.** Tell me about yourself.
> *(See detailed answer in README.md)*
> "I'm [Name], [Year] year [Branch] student at [College]. Passionate about [area]. Worked on [project]. Looking forward to starting my career at Accenture."

---

**Q37.** Why should we hire you?
> "I bring a strong technical foundation, excellent problem-solving skills, and genuine eagerness to learn and grow. I'm adaptable, work well in teams, and I'm committed to delivering quality results. My project experience demonstrates my ability to apply knowledge to real-world problems."

---

**Q38.** What motivates you?
> "I'm motivated by challenging problems and the opportunity to learn new technologies. The satisfaction of building something functional and seeing it work drives me. I also find motivation in collaborative environments where I can grow alongside talented colleagues."

---

**Q39.** How do you handle failure?
> "I view failure as a learning opportunity. When my first attempt at [specific example] didn't work, I analyzed what went wrong, sought feedback, and tried a different approach. The key is not to repeat the same mistake and to continuously improve."

---

**Q40.** Do you prefer working alone or in a team?
> "I'm comfortable with both. I prefer teamwork for complex projects because diverse perspectives lead to better solutions. However, I also value focused individual work for tasks that require deep concentration. I adapt based on what the situation demands."

---

## 7. HR — Situational Questions

---

**Q41.** What would you do if you disagreed with your manager?
> "I would first try to understand my manager's perspective by asking questions. If I still disagreed, I would respectfully present my viewpoint with supporting data or examples. Ultimately, I would respect the final decision while ensuring my concerns were heard through proper channels."

---

**Q42.** How would you handle a team member not doing their work?
> "I would first have a private conversation to understand if they're facing any challenges. I'd offer help if possible. If the behavior continued, I would raise it with the team lead professionally, focusing on the impact on project deliverables rather than personal criticism."

---

**Q43.** What would you do if you were assigned to a technology you've never used?
> "I would welcome the opportunity to learn. I'd start with official documentation, follow tutorials, and build small practice projects. I'd also seek guidance from experienced team members. Being technology-agnostic is an important skill in the IT industry."

---

**Q44.** If you had to choose between meeting a deadline and delivering quality work, what would you choose?
> "I would communicate proactively with my manager about the trade-off. I'd propose a plan — perhaps deliver the critical features by the deadline and complete the remaining work in the next sprint. Transparency and communication are key in such situations."

---

**Q45.** Your manager assigns you a task that you think is wrong. What do you do?
> "I would clarify my understanding of the task first — maybe I'm missing context. If I still believe there's an issue, I would respectfully share my perspective and suggest an alternative approach. However, I understand that managers often have a broader view of the situation."

---

## ⏰ Interview Preparation Checklist

```
Before the Interview:
  ✅ Review your resume — be ready to explain everything on it
  ✅ Prepare 2-3 project explanations (PAR format)
  ✅ Revise OOP, DBMS, OS basics
  ✅ Practice coding on paper (palindrome, factorial, fibonacci)
  ✅ Prepare answers for top 10 HR questions
  ✅ Research Accenture (recent news, services, values)
  ✅ Prepare 2 questions to ask the interviewer

During the Interview:
  ✅ Dress formally
  ✅ Join 5 minutes early (if virtual)
  ✅ Maintain eye contact
  ✅ Speak clearly and confidently
  ✅ Use STAR method for behavioral questions
  ✅ Say "I don't know but I'm eager to learn" if unsure
  ✅ Thank the interviewer at the end
```

---

> **The interview is your chance to showcase your personality and passion — technical skills can be taught, but attitude cannot!**
