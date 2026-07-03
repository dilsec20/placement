# 🔥 TCS Interview — Complete Answer Bank (Yesterday's Actual Questions)

> **Source:** Real TCS questions asked at LPU campus — July 2026 batch  
> **Candidate:** Dilip Kumar | B.Tech CSE | LPU  
> **Code Language:** DSA → C++ | OOPs & Others → Java (& C++ where question-specific)  
> **All answers personalized to YOUR resume, projects, and achievements**

---

## 📋 Sections

1. [OOPs](#1-oops)
2. [DSA & Coding (C++)](#2-dsa--coding-c)
3. [DBMS & SQL](#3-dbms--sql)
4. [OS & Networking](#4-os--networking)
5. [SDLC & Testing](#5-sdlc--testing)
6. [Web Dev, APIs & Git](#6-web-dev-apis--git)
7. [Cloud & DevOps](#7-cloud--devops)
8. [AI/ML & Data](#8-aiml--data)
9. [C++ & Java Language Fundamentals](#9-c--java-language-fundamentals)
10. [Project & Situation-Based](#10-project--situation-based)
11. [HR Questions — Personalized for Dilip](#11-hr-questions--personalized-for-dilip)

---

# 1. OOPs

---

### Q: What is OOPs? What are its four pillars?

> *"OOPs is a programming paradigm based on the concept of objects that bundle data and behavior together. The four pillars are:*
>
> 1. **Encapsulation** — wrapping data and methods into a single unit, restricting direct access using access modifiers
> 2. **Abstraction** — hiding internal implementation, showing only essential features
> 3. **Inheritance** — one class acquiring properties and behavior of another
> 4. **Polymorphism** — one interface, many implementations
>
> *Real-life example: An ATM machine — you interact with buttons and screen (interface/abstraction), but the cash-counting and account-verification logic is hidden inside (encapsulation)."*
>
> **In my project:** *"In TinyLink, my `UrlService` encapsulates the Base62 encoding logic — the Controller just calls `shortenUrl()` without knowing HOW the code is generated. The `UrlRepository` interface provides abstraction — the Service doesn't know if data is in H2 or PostgreSQL."*

---

### Q: What is encapsulation? Give an example.

> *"Binding data and methods into a single unit (class) while restricting direct access using access modifiers like private/protected."*

**Java:**
```java
public class UrlEntity {
    private Long id;                  // private — can't access directly
    private String originalUrl;
    private String shortCode;

    public String getShortCode() { return shortCode; }   // controlled access
    public void setOriginalUrl(String url) {
        if (url != null && !url.isEmpty()) {              // validation before setting
            this.originalUrl = url;
        }
    }
}
```

**C++:**
```cpp
class BankAccount {
private:
    double balance;          // hidden from outside
public:
    double getBalance() { return balance; }
    void deposit(double amt) {
        if (amt > 0) balance += amt;   // validated access
    }
};
```

> *Real-life: A capsule medicine — ingredients are sealed inside; you consume it as a whole without accessing individual chemicals.*
>
> **In my TinyLink:** *"My entity classes have private fields with public getters. The Service hides AtomicLong and Base62 logic from the Controller."*

---

### Q: What is abstraction? Give a real-life example.

> *"Exposing only relevant details and hiding the complexity behind them."*

**Java:**
```java
// Interface — defines WHAT, not HOW
public interface UrlRepository {
    void save(UrlEntity entity);
    UrlEntity findByShortCode(String code);
    // Doesn't say whether it's H2, PostgreSQL, or HashMap
}

// Concrete implementation — defines HOW
@Repository
public class InMemoryUrlRepository implements UrlRepository {
    private Map<String, UrlEntity> store = new HashMap<>();
    
    @Override
    public void save(UrlEntity entity) {
        store.put(entity.getShortCode(), entity);
    }
    
    @Override
    public UrlEntity findByShortCode(String code) {
        return store.get(code);
    }
}
```

> *Real-life: Driving a car — you use steering wheel and pedals without knowing how the engine or transmission works internally.*
>
> **In my AceCoder:** *"The route `router.post('/submissions', authMiddleware, controller.submit)` hides 5 layers of complexity — JWT verification, input validation, external API call, database save, response — all abstracted in one line."*

---

### Q: What is inheritance? What is multilevel and multiple inheritance?

> *"Inheritance lets a child class acquire properties and behavior of a parent class."*

**Java:**
```java
// Single inheritance
class Vehicle {
    void start() { System.out.println("Vehicle started"); }
}
class Car extends Vehicle {
    void drive() { System.out.println("Car driving"); }
}
// Car c = new Car(); c.start(); → "Vehicle started" (inherited)

// Multilevel: A → B → C
class Animal { void eat() { } }
class Dog extends Animal { void bark() { } }
class Puppy extends Dog { void play() { } }  // Puppy has eat(), bark(), play()
```

**C++:**
```cpp
// Multiple inheritance (supported in C++, NOT in Java)
class Watch { public: void showTime() { } };
class Computer { public: void compute() { } };
class SmartWatch : public Watch, public Computer { };
// SmartWatch has both showTime() and compute()
```

> - **Multilevel:** A → B → C (grandparent-parent-child chain)
> - **Multiple:** One class inherits from 2+ parents (C++ only; Java uses interfaces instead)
>
> **In my TinyLink:** *"My custom `UrlNotFoundException extends RuntimeException` — inherits stack trace, message, and all exception behavior from the parent."*

---

### Q: What is polymorphism? What are its types?

> *"Polymorphism means 'many forms' — same function/operator behaves differently based on context."*
>
> - **Compile-time (static):** Method/operator overloading
> - **Runtime (dynamic):** Method overriding (via inheritance)

**Java — Compile-time (Overloading):**
```java
class Calculator {
    int add(int a, int b) { return a + b; }           // 2 ints
    double add(double a, double b) { return a + b; }  // 2 doubles
    int add(int a, int b, int c) { return a + b + c; } // 3 ints
}
// Same name "add", different parameters — resolved at compile time
```

**Java — Runtime (Overriding):**
```java
class Animal {
    void sound() { System.out.println("Animal sound"); }
}
class Dog extends Animal {
    @Override
    void sound() { System.out.println("Bark"); }
}
class Cat extends Animal {
    @Override
    void sound() { System.out.println("Meow"); }
}
// Animal a = new Dog(); a.sound(); → "Bark" (decided at RUNTIME)
```

> *Real-life: A person acts as a teacher in classroom, customer in shop, parent at home — same person, different behavior based on context.*
>
> **In my TinyLink:** *"Spring DI injects different UrlRepository implementations through the same interface — InMemoryRepository for dev, JpaRepository for production. That's runtime polymorphism."*

---

### Q: Difference between method overloading and method overriding?

| Feature | Overloading | Overriding |
|---------|------------|-----------|
| **Where** | Same class | Child class redefines parent's method |
| **Signature** | Same name, DIFFERENT parameters | Same name, SAME parameters |
| **Resolved** | Compile time | Runtime |
| **Type** | Static/Compile-time polymorphism | Dynamic/Runtime polymorphism |
| **Example** | `add(int,int)` & `add(int,int,int)` | Child's `sound()` replaces Parent's `sound()` |

---

### Q: What is operator/function overloading? (C++)

> *"Defining multiple behaviors for the same operator or function name based on operands/arguments."*

```cpp
int add(int a, int b) { return a + b; }
float add(float a, float b) { return a + b; }   // function overloading

// Operator overloading
class Complex {
    double real, imag;
public:
    Complex operator+(const Complex& c) {    // overloading + operator
        return {real + c.real, imag + c.imag};
    }
};
```

---

### Q: Show runtime polymorphism with code.

**Java:**
```java
class Animal {
    void sound() { System.out.println("Animal sound"); }
}
class Dog extends Animal {
    @Override
    void sound() { System.out.println("Bark"); }
}
// Usage:
Animal a = new Dog();   // parent reference, child object
a.sound();              // Output: "Bark" — decided at RUNTIME, not compile time
```

**C++:**
```cpp
class Animal {
public:
    virtual void sound() { cout << "Animal sound"; }  // virtual keyword enables runtime polymorphism
};
class Dog : public Animal {
public:
    void sound() override { cout << "Bark"; }
};
// Animal* a = new Dog();
// a->sound(); → prints "Bark"
```

---

### Q: What is a friend function in C++?

> *"A function that is NOT a member of a class but is granted access to its private and protected members, declared using the `friend` keyword."*

```cpp
class Box {
    int width;
    friend void printWidth(Box b);   // friend declaration
};

void printWidth(Box b) {
    cout << b.width;  // can access private member 'width'
}
```

> *"It breaks encapsulation slightly but is useful when two classes need to share data without making members public."*

---

### Q: What is a constructor and a destructor?

**Java (Constructor only — no explicit destructor, GC handles cleanup):**
```java
class Student {
    String name;
    
    Student() { name = "Unknown"; }               // default constructor
    Student(String name) { this.name = name; }    // parameterized constructor
}
```

**C++ (Both constructor and destructor):**
```cpp
class DatabaseConnection {
    Connection* conn;
public:
    DatabaseConnection() {                    // Constructor — acquire resource
        conn = new Connection("db_url");
        cout << "Connection opened";
    }
    ~DatabaseConnection() {                   // Destructor — release resource
        delete conn;
        cout << "Connection closed";
    }
};
```

> *Real-life: Constructor = setting up a hotel room (fresh linens, keys). Destructor = housekeeping cleaning up after checkout.*

---

### Q: What is a static function/variable?

> *"A static member belongs to the CLASS, not any individual object — shared across all instances."*

**Java:**
```java
class Counter {
    static int count = 0;      // shared across ALL Counter objects
    
    Counter() { count++; }
    
    static int getCount() {    // can be called without creating object
        return count;           // Counter.getCount()
    }
}
```

**C++:**
```cpp
class Counter {
    static int count;
public:
    Counter() { count++; }
    static int getCount() { return count; }
};
int Counter::count = 0;   // static member initialized outside class
```

---

### Q: Difference between struct and union? (C/C++)

```cpp
struct Student {     // Each member gets separate memory
    int id;          // 4 bytes
    float marks;     // 4 bytes
};                   // Total: 8 bytes

union Data {         // All members SHARE the same memory
    int i;           // 4 bytes
    float f;         // 4 bytes
};                   // Total: 4 bytes (only ONE member valid at a time)
```

| Feature | struct | union |
|---------|--------|-------|
| Memory | Separate for each member | Shared — all overlap |
| Size | Sum of all members | Size of largest member |
| Access | All members simultaneously | Only one at a time |

---

### Q: What is shallow copy vs deep copy?

**Java:**
```java
// Shallow copy — both point to same inner object
Student s1 = new Student("Dilip", new Address("Motihari"));
Student s2 = s1.clone();   // shallow — s2.address points to SAME Address object
s2.address.city = "Mumbai";  // ⚠️ s1.address.city also changes!

// Deep copy — completely independent objects
Student s2 = new Student(s1.name, new Address(s1.address.city));  // new Address object
s2.address.city = "Mumbai";  // s1.address.city stays "Motihari" ✅
```

> *Shallow copy = sharing a Google Doc link (both edit same file). Deep copy = downloading your own separate copy.*

---

### Q: Why choose C++ over Java (or vice versa)?

> *"C++ offers manual memory management, multiple inheritance, and closer-to-hardware performance — great for system-level/competitive programming. Java offers platform independence (JVM), automatic garbage collection, and built-in security — ideal for large-scale enterprise applications.*
>
> *In my projects: I used Java (Spring Boot) for TinyLink because of Spring's enterprise features, DI, and rapid REST API development. For competitive programming, I use C++ because of its STL library and faster execution — which helped me solve 1000+ DSA problems and reach LeetCode Knight rating."*

---

# 2. DSA & Coding (C++)

> All DSA solutions in **C++ only** as requested.

---

### Q: Check if a number is prime

```cpp
#include <cmath>

bool isPrime(int n) {
    if (n < 2) return false;
    if (n <= 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    for (int i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) return false;
    }
    return true;
}
// Time: O(√n)  Space: O(1)
```

---

### Q: Find the square root of a number (Binary Search)

```cpp
int mySqrt(int n) {
    if (n < 2) return n;
    long lo = 1, hi = n, ans = 0;
    while (lo <= hi) {
        long mid = lo + (hi - lo) / 2;
        if (mid * mid == n) return mid;
        else if (mid * mid < n) { ans = mid; lo = mid + 1; }
        else hi = mid - 1;
    }
    return ans;
}
// Time: O(log n)  Space: O(1)
```

---

### Q: Check if a string/number is a palindrome

```cpp
// String palindrome — two pointer
bool isPalindrome(string s) {
    int left = 0, right = s.length() - 1;
    while (left < right) {
        if (s[left] != s[right]) return false;
        left++;
        right--;
    }
    return true;
}
// Time: O(n)  Space: O(1) — no extra copy created

// Number palindrome
bool isPalindromeNum(int n) {
    if (n < 0) return false;
    long original = n, reversed = 0;
    while (n > 0) {
        reversed = reversed * 10 + n % 10;
        n /= 10;
    }
    return original == reversed;
}
```

---

### Q: Swap two numbers — with and without third variable

```cpp
// With third variable
int temp = a; a = b; b = temp;

// Without — arithmetic
a = a + b;    // a = 15 (if a=5, b=10)
b = a - b;    // b = 5  (original a)
a = a - b;    // a = 10 (original b)

// Without — XOR (best — no overflow risk)
a = a ^ b;
b = a ^ b;
a = a ^ b;
```

---

### Q: Factorial — with and without recursion

```cpp
// Iterative
long long factorialIter(int n) {
    long long result = 1;
    for (int i = 2; i <= n; i++) result *= i;
    return result;
}

// Recursive
long long factorialRec(int n) {
    if (n <= 1) return 1;
    return n * factorialRec(n - 1);
}
// Time: O(n)  Space: O(1) iterative, O(n) recursive (call stack)
```

---

### Q: Fibonacci series — recursion and DP

```cpp
// Plain recursion — O(2^n) — BAD
int fibRec(int n) {
    if (n <= 1) return n;
    return fibRec(n - 1) + fibRec(n - 2);
}

// DP — Memoization (top-down) — O(n)
int memo[1001] = {0};
int fibMemo(int n) {
    if (n <= 1) return n;
    if (memo[n] != 0) return memo[n];
    return memo[n] = fibMemo(n - 1) + fibMemo(n - 2);
}

// Space-optimized — O(n) time, O(1) space — BEST
int fibOptimal(int n) {
    if (n <= 1) return n;
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        int temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}
```

> *"The recursive Fibonacci has O(2^n) time because it recomputes overlapping subproblems. DP avoids this by storing computed values — bringing it to O(n). I can further optimize space to O(1) using just two variables."*

---

### Q: Reverse a string / a number

```cpp
// Reverse string — two pointer (in-place)
string reverseString(string s) {
    int left = 0, right = s.length() - 1;
    while (left < right) {
        swap(s[left], s[right]);
        left++;
        right--;
    }
    return s;
}

// Reverse number
int reverseNumber(int n) {
    int rev = 0;
    while (n > 0) {
        rev = rev * 10 + n % 10;
        n /= 10;
    }
    return rev;
}
```

---

### Q: Bubble Sort — explain the flow

```cpp
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;   // optimization: already sorted
    }
}
// Time: O(n²) worst/avg, O(n) best (already sorted with optimization)
// Space: O(1)
```

> *"Each pass 'bubbles' the largest unsorted element to its correct position at the end. After i passes, the last i elements are sorted."*

---

### Q: Quick Sort

```cpp
int partition(int arr[], int lo, int hi) {
    int pivot = arr[hi];
    int i = lo - 1;
    for (int j = lo; j < hi; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[hi]);
    return i + 1;
}

void quickSort(int arr[], int lo, int hi) {
    if (lo < hi) {
        int pi = partition(arr, lo, hi);
        quickSort(arr, lo, pi - 1);
        quickSort(arr, pi + 1, hi);
    }
}
// Time: O(n log n) avg, O(n²) worst   Space: O(log n) stack
```

---

### Q: Difference between linear search and binary search?

| Linear Search | Binary Search |
|--------------|--------------|
| Checks every element sequentially | Halves search space each step |
| O(n) time | O(log n) time |
| Works on unsorted data | Requires SORTED data |
| Simple but slow for large data | Fast for large sorted data |

```cpp
// Binary search
int binarySearch(int arr[], int n, int target) {
    int lo = 0, hi = n - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;  // not found
}
```

> *Real-life: Linear search = checking every page of a book. Binary search = opening a dictionary in the middle and deciding which half to search next.*

---

### Q: Find/remove duplicates from an array

```cpp
// Using set — O(n) time
#include <set>
vector<int> removeDuplicates(vector<int>& arr) {
    set<int> seen;
    vector<int> result;
    for (int x : arr) {
        if (seen.find(x) == seen.end()) {
            seen.insert(x);
            result.push_back(x);
        }
    }
    return result;
}
```

---

### Q: Rotate an array left by k positions

```cpp
void rotateLeft(int arr[], int n, int k) {
    k = k % n;
    // Reverse first k elements, reverse rest, reverse all
    reverse(arr, arr + k);
    reverse(arr + k, arr + n);
    reverse(arr, arr + n);
}
// Time: O(n)  Space: O(1)
```

---

### Q: Move all zeros to the end

```cpp
void moveZeros(vector<int>& arr) {
    int pos = 0;
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] != 0) {
            swap(arr[pos], arr[i]);
            pos++;
        }
    }
}
// Time: O(n)  Space: O(1)
// Input:  [0, 1, 0, 3, 12]
// Output: [1, 3, 12, 0, 0]
```

---

### Q: Armstrong number — check

```cpp
bool isArmstrong(int n) {
    int original = n, sum = 0;
    int digits = to_string(n).length();
    while (n > 0) {
        int d = n % 10;
        sum += pow(d, digits);
        n /= 10;
    }
    return sum == original;
}
// 153 = 1³ + 5³ + 3³ = 1 + 125 + 27 = 153 ✅
```

---

### Q: Check for anagrams

```cpp
bool isAnagram(string s1, string s2) {
    if (s1.length() != s2.length()) return false;
    sort(s1.begin(), s1.end());
    sort(s2.begin(), s2.end());
    return s1 == s2;
}
// "listen" & "silent" → both sort to "eilnst" → true
// Time: O(n log n)
// Optimize with frequency array: O(n)
```

---

### Q: What is the two-pointer technique?

> *"Using two index pointers (from opposite ends or at different speeds) to traverse in a single pass, avoiding nested loops. I used it for palindrome checks above — left pointer from start, right from end, move inward."*
>
> *Common uses: palindrome, pair sum, removing duplicates, cycle detection (slow/fast), container with most water.*

---

### Q: Difference between i++ and ++i?

```cpp
int i = 5;
int a = i++;   // a = 5, then i becomes 6 (post-increment: USE then INCREMENT)
int b = ++i;   // i becomes 7 first, then b = 7 (pre-increment: INCREMENT then USE)
```

> *Matters when the expression result is used immediately. In a simple `for` loop, no practical difference.*

---

### Q: Difference between array and linked list?

| Array | Linked List |
|-------|------------|
| Contiguous memory | Nodes scattered, linked via pointers |
| Fixed size (static array) | Dynamic size |
| O(1) random access `arr[i]` | O(n) access (must traverse) |
| Costly insert/delete in middle | O(1) insert/delete (if you have reference) |
| Better cache locality | Poor cache locality |

---

### Q: Linked list — insert & reverse

```cpp
struct Node {
    int data;
    Node* next;
    Node(int d) : data(d), next(nullptr) {}
};

// Insert at head
Node* insertHead(Node* head, int val) {
    Node* newNode = new Node(val);
    newNode->next = head;
    return newNode;
}

// Reverse linked list — iterative
Node* reverse(Node* head) {
    Node* prev = nullptr;
    Node* curr = head;
    while (curr) {
        Node* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}
// Time: O(n)  Space: O(1)
```

---

### Q: Height of BST & Validate BST

```cpp
// Height of BST
int height(Node* root) {
    if (!root) return 0;
    return 1 + max(height(root->left), height(root->right));
}

// Validate BST
bool isValidBST(Node* root, long minVal = LONG_MIN, long maxVal = LONG_MAX) {
    if (!root) return true;
    if (root->data <= minVal || root->data >= maxVal) return false;
    return isValidBST(root->left, minVal, root->data) &&
           isValidBST(root->right, root->data, maxVal);
}
```

---

### Q: Insert into BST

```cpp
Node* insert(Node* root, int val) {
    if (!root) return new Node(val);
    if (val < root->data) root->left = insert(root->left, val);
    else root->right = insert(root->right, val);
    return root;
}
// Time: O(log n) avg, O(n) worst (skewed tree)
```

---

### Q: Stack vs Queue?

| Stack (LIFO) | Queue (FIFO) |
|-------------|-------------|
| Last In, First Out | First In, First Out |
| push/pop from TOP | enqueue at REAR, dequeue from FRONT |
| Like stack of plates | Like a ticket counter line |
| Uses: undo, recursion, DFS | Uses: BFS, scheduling, buffering |

---

### Q: What is an LRU cache? How to design?

> *"Least Recently Used cache evicts the least recently accessed item when full. Implemented with:*
> - **HashMap** — O(1) lookup by key
> - **Doubly Linked List** — O(1) reordering (move accessed item to front, evict from back)
>
> *I've solved this on LeetCode (Problem #146). Get and put are both O(1)."*

---

### Q: What is a hash function?

> *"A function that maps data of arbitrary size to a fixed-size value. Used for fast lookups in hash maps. A good hash function minimizes collisions — where different inputs produce the same hash."*
>
> *"In my AceCoder project, PostgreSQL uses hash-based indexing on the `email` column for fast user lookups."*

---

### Q: Two jugs riddle (3L and 5L, measure 4L)?

> 1. Fill 5L jug fully
> 2. Pour into 3L jug → 5L jug has 2L left
> 3. Empty 3L jug
> 4. Pour 2L from 5L into 3L → 3L jug has 2L
> 5. Fill 5L jug fully again
> 6. Pour from 5L into 3L until full (needs only 1L) → **5L jug has exactly 4L** ✅

---

### Q: How to optimize time/space complexity?

> *"My framework:*
> 1. *Identify redundant/repeated work → cache it (memoization/DP)*
> 2. *Can nested loops become single pass? → two pointers, hashing*
> 3. *Does recursion have overlapping subproblems? → use DP*
> 4. *Trade space for time only when needed*
>
> *Example: Naive Fibonacci is O(2^n). I optimized to O(n) with DP, then to O(1) space with two variables."*

---

### Q: How to handle slow API responses?

> *"From my AceCoder experience:*
> 1. Check if issue is client or server side
> 2. Database: add indexes, fix N+1 queries, optimize JOINs
> 3. Caching: use Redis for frequent queries (problem lists, leaderboard)
> 4. Pagination: don't fetch all data at once — use LIMIT/OFFSET
> 5. Async processing: queue heavy tasks (code execution) instead of synchronous
> 6. CDN for static assets
> 7. Check payload size — compress responses"

---

# 3. DBMS & SQL

---

### Q: DBMS vs RDBMS?

| DBMS | RDBMS |
|------|-------|
| Stores data as files | Stores data in structured TABLES |
| No relationships enforced | Relationships via foreign keys |
| No ACID guarantee | ACID properties enforced |
| Example: XML files, flat files | Example: PostgreSQL, MySQL |

> *"In my AceCoder project, I used PostgreSQL — an RDBMS — because my data has clear relationships: users have submissions, submissions belong to problems."*

---

### Q: DDL vs DML commands?

| DDL (Data Definition Language) | DML (Data Manipulation Language) |
|-------------------------------|--------------------------------|
| Defines/modifies schema | Manipulates data |
| `CREATE, ALTER, DROP, TRUNCATE` | `SELECT, INSERT, UPDATE, DELETE` |
| Auto-committed | Can be rolled back |

---

### Q: TRUNCATE vs DELETE vs DROP?

| Command | Type | Removes | Rollback? | Table structure? |
|---------|------|---------|-----------|-----------------|
| **DELETE** | DML | Specific rows (WHERE) | ✅ Yes | Kept |
| **TRUNCATE** | DDL | ALL rows | ❌ No | Kept (empty table) |
| **DROP** | DDL | Entire table + data | ❌ No | Gone |

```sql
DELETE FROM Employee WHERE dept_id = 5;    -- removes dept 5 only
TRUNCATE TABLE Employee;                    -- removes ALL rows, table stays
DROP TABLE Employee;                        -- table completely destroyed
```

---

### Q: PRIMARY KEY vs CANDIDATE KEY vs UNIQUE KEY vs SUPER KEY vs FOREIGN KEY?

| Key | Definition |
|-----|-----------|
| **Super Key** | Any set of attributes that uniquely identifies a row |
| **Candidate Key** | Minimal super key (no redundant attributes) |
| **Primary Key** | The chosen candidate key; NOT NULL, only ONE per table |
| **Unique Key** | Like PK but allows ONE NULL; can have MULTIPLE per table |
| **Foreign Key** | References primary key of ANOTHER table; enforces relationships |

> *"In my AceCoder: `user_id` is the PRIMARY KEY of Users table. In Submissions table, `user_id` is a FOREIGN KEY referencing Users — every submission is linked to a specific user."*

---

### Q: What is normalization? Why is it used?

> *"Organizing data to reduce redundancy and improve integrity through normal forms:*
>
> - **1NF:** Atomic values only (no arrays/lists in a single cell)
> - **2NF:** No partial dependency — every non-key depends on the ENTIRE primary key
> - **3NF:** No transitive dependency — non-key columns don't depend on OTHER non-key columns
>
> *Real-life: Instead of writing a customer's full address on every order row (duplicated data), store it once in Customers table and reference `customer_id` in Orders."*

---

### Q: What is a trigger?

> *"A stored procedure that automatically executes in response to INSERT, UPDATE, or DELETE on a table."*
>
> ```sql
> -- Auto-update last_modified timestamp
> CREATE TRIGGER update_timestamp
> BEFORE UPDATE ON employees
> FOR EACH ROW
> SET NEW.last_modified = NOW();
> ```

---

### Q: What is an ER diagram?

> *"Entity-Relationship diagram visually represents entities (tables), their attributes, and relationships between them — used during database design. In my AceCoder project, the ER diagram shows Users (1) --→ (many) Submissions, Problems (1) --→ (many) Submissions, Users (many) ←→ (many) Contests."*

---

### Q: VARCHAR vs CHAR?

| CHAR(10) | VARCHAR(10) |
|----------|------------|
| Fixed 10 bytes always (padded with spaces) | Uses only needed bytes + 1-2 for length |
| Faster for consistent-length data (phone numbers) | Saves space for variable-length data (names) |

---

### Q: Query — largest and second-largest salary

```sql
-- Largest
SELECT MAX(salary) FROM employees;

-- Second largest — Method 1 (Subquery)
SELECT MAX(salary) FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);

-- Second largest — Method 2 (LIMIT OFFSET)
SELECT DISTINCT salary FROM employees
ORDER BY salary DESC LIMIT 1 OFFSET 1;

-- Nth largest — DENSE_RANK (impressive answer!)
SELECT salary FROM (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
    FROM employees
) sub WHERE rnk = 2;
```

---

### Q: Query — find duplicates / distinct values

```sql
-- Duplicates
SELECT name, COUNT(*) FROM employees GROUP BY name HAVING COUNT(*) > 1;

-- Distinct values
SELECT DISTINCT department FROM employees;
```

---

### Q: Count unique ages

```sql
SELECT COUNT(DISTINCT age) FROM people;
```

---

### Q: Convert text to uppercase/lowercase

```sql
SELECT UPPER(name), LOWER(name) FROM employees;
```

---

### Q: What is a SQL window function?

> *"A function that performs calculations across a set of rows related to the current row WITHOUT collapsing them into groups (unlike GROUP BY)."*

```sql
-- Rank employees by salary within each department
SELECT name, department, salary,
       RANK() OVER (PARTITION BY department ORDER BY salary DESC) as dept_rank
FROM employees;
```

> *Common functions: `ROW_NUMBER()`, `RANK()`, `DENSE_RANK()`, `SUM() OVER()`, `LAG()`, `LEAD()`*

---

### Q: What are SQL JOINs? Types?

| Type | Returns |
|------|---------|
| **INNER JOIN** | Only matching rows from BOTH tables |
| **LEFT JOIN** | ALL left + matching right (NULL if no match) |
| **RIGHT JOIN** | ALL right + matching left |
| **FULL OUTER JOIN** | ALL from both, matched where possible |

```sql
SELECT e.name, d.dept_name
FROM Employees e
INNER JOIN Departments d ON e.dept_id = d.dept_id;
```

---

### Q: What is UNION?

> *"Combines result sets of 2+ SELECT queries, removing duplicates. Use `UNION ALL` to keep duplicates. Both queries must have same number/type of columns."*

```sql
SELECT name FROM employees_mumbai
UNION
SELECT name FROM employees_delhi;
```

---

### Q: SQL vs NoSQL? When to use which?

| SQL (PostgreSQL, MySQL) | NoSQL (MongoDB, Redis) |
|------------------------|----------------------|
| Structured tables, fixed schema | Flexible schema, documents/key-value |
| ACID compliant | Eventually consistent (BASE) |
| Complex queries, JOINs | Simple queries, denormalized |
| Best for: banking, e-commerce | Best for: real-time apps, logs, social media |

> *"I chose PostgreSQL for AceCoder because my data is relational — users, problems, submissions, contests all have clear relationships that are best expressed with foreign keys and JOINs."*

---

### Q: PostgreSQL vs MySQL vs H2?

> *"PostgreSQL — fully-featured, ACID compliant, supports JSON, full-text search, advanced queries. I used it in AceCoder for production.*
>
> *H2 — lightweight, in-memory, embedded. I used it in TinyLink for development and demos — zero setup, but data lost on restart.*
>
> *MySQL — simpler, faster for reads, widely used. Less advanced features than PostgreSQL.*
>
> *Both TinyLink and AceCoder use Spring/Node.js abstractions, so switching databases requires only config changes, not code changes."*

---

### Q: How did you connect database to your project?

> **AceCoder:** *"Used the `pg` (node-postgres) library in Node.js. Connection string stored in environment variable `DATABASE_URL`. Used connection pooling for efficiency. All queries use parameterized inputs to prevent SQL injection."*
>
> **TinyLink:** *"Used Spring Data JPA with H2. Connection configured in `application.properties`. Spring auto-configures the DataSource bean. Repository interface extends JpaRepository — Spring generates SQL automatically."*

---

# 4. OS & Networking

---

### Q: Types of operating systems?

| Type | Description | Example |
|------|------------|---------|
| **Batch OS** | Jobs processed in batches without interaction | Payroll systems |
| **Time-sharing** | CPU time divided among multiple users | Unix |
| **Distributed** | Multiple systems work as one | Google's infrastructure |
| **Real-time** | Strict timing requirements | Air traffic control, pacemakers |
| **Network OS** | Manages network resources | Windows Server |

---

### Q: What is spooling?

> *"Simultaneous Peripheral Operations Online — data is temporarily stored in a buffer (spool) so a faster component (CPU) doesn't wait for a slower one (printer). Multiple print jobs queue without blocking the CPU."*

---

### Q: What is a deadlock? How to prevent?

> *"When 2+ processes are stuck waiting for each other to release resources — none can proceed."*
>
> **4 necessary conditions (ALL must exist):**
> 1. **Mutual Exclusion** — only one process uses a resource at a time
> 2. **Hold and Wait** — holding one resource while waiting for another
> 3. **No Preemption** — resources can't be forcibly taken
> 4. **Circular Wait** — A waits for B, B waits for A
>
> **Prevention:** Break ANY one condition:
> - Request all resources at once (breaks Hold & Wait)
> - Allow preemption (breaks No Preemption)
> - Order resources, acquire in order (breaks Circular Wait)
> - **Banker's Algorithm** for avoidance

---

### Q: What is mutual exclusion?

> *"A property ensuring only ONE process can access a critical section (shared resource) at a time, preventing race conditions."*
>
> *"In my TinyLink project, AtomicLong uses CAS to ensure mutual exclusion — no two threads get the same ID."*

---

### Q: Most important component of an OS?

> *"The **Kernel** — it manages hardware resources, memory, processes, and acts as the bridge between applications and hardware. Everything else (shell, user programs) communicates through the kernel."*

---

### Q: Array vs Linked List in memory (stack vs heap)?

> *"Arrays and local variables are allocated on the **stack** (fast, fixed size, auto-freed). Linked lists and dynamically-sized objects are on the **heap** (flexible, manually managed or garbage collected, slightly slower)."*

---

### Q: 7 layers of OSI model?

| Layer | Name | Function | Example |
|-------|------|----------|---------|
| 7 | **Application** | User-facing services | HTTP, FTP, SMTP |
| 6 | **Presentation** | Format, encryption | SSL/TLS, JPEG |
| 5 | **Session** | Session management | NetBIOS |
| 4 | **Transport** | End-to-end delivery | TCP, UDP |
| 3 | **Network** | Routing, IP addressing | IP, Routers |
| 2 | **Data Link** | Frame delivery, MAC | Ethernet, Switches |
| 1 | **Physical** | Raw bits over wire | Cables, Hubs |

> **Mnemonic:** "**P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way" (bottom→top)

---

### Q: What is a star topology?

> *"A network layout where all devices connect to a central hub/switch. If one device fails, rest work fine. But if the central hub fails, entire network goes down."*

---

### Q: What are network classes?

| Class | Range | Network Size |
|-------|-------|-------------|
| A | 1.0.0.0 – 126.255.255.255 | Very large (16M hosts) |
| B | 128.0.0.0 – 191.255.255.255 | Medium (65K hosts) |
| C | 192.0.0.0 – 223.255.255.255 | Small (254 hosts) |
| D | 224.0.0.0 – 239.255.255.255 | Multicast |
| E | 240.0.0.0 – 255.255.255.255 | Reserved/experimental |

---

# 5. SDLC & Testing

---

### Q: What is SDLC? Which model did your project use?

> *"SDLC is the structured process for building software: Requirement → Design → Development → Testing → Deployment → Maintenance.*
>
> *My AceCoder project followed **Agile** — I worked in short iterative cycles, adding features incrementally (first user auth, then problems, then submissions, then contests), getting user feedback, and improving."*

---

### Q: Waterfall vs Agile?

| Waterfall | Agile |
|----------|-------|
| Linear, sequential — each phase completes before next | Iterative — short cycles (sprints) with continuous feedback |
| Good for well-defined, unchanging requirements | Good for evolving requirements |
| Heavy documentation upfront | Working software over documentation |
| Testing at the end | Continuous testing |

---

### Q: Types of software testing?

| Type | What It Tests |
|------|-------------|
| **Unit Testing** | Individual functions/methods in isolation |
| **Integration Testing** | Components working together |
| **System Testing** | Entire system end-to-end |
| **Acceptance Testing** | Does it meet business requirements? |
| **White-box** | Tester knows internal code logic |
| **Black-box** | Tester only knows inputs/outputs |

---

# 6. Web Dev, APIs & Git

---

### Q: What is DOM?

> *"Document Object Model — represents an HTML page as a tree of objects, allowing JavaScript to dynamically access and manipulate content, structure, and styling. In my SpeakUp project, I use DOM manipulation to update XP scores, streak counters, and chart data in real-time."*

---

### Q: What is a SPA? How does React support it?

> *"A Single Page Application loads one HTML page and dynamically updates content using JavaScript without full page reloads. React supports this via client-side routing (React Router) and component-based rendering that updates only changed parts of the DOM (virtual DOM diffing)."*

---

### Q: What is JWT? How is it used for authentication?

> *"JWT (JSON Web Token) — a compact, signed token for stateless authentication.*
>
> *In my AceCoder project:*
> 1. User sends credentials to `POST /login`
> 2. Server verifies → generates JWT: `jwt.sign({userId, email}, SECRET, {expiresIn: '24h'})`
> 3. Client stores token, sends in `Authorization: Bearer <token>` header
> 4. Auth middleware verifies token on every protected request
> 5. If valid → proceed. If expired/invalid → 401 Unauthorized
>
> *Benefit: Stateless — server doesn't store sessions. Each token is self-contained."*

---

### Q: Authentication vs Authorization?

| Authentication | Authorization |
|---------------|--------------|
| **WHO** are you? | **WHAT** can you do? |
| Verifying identity | Verifying permissions |
| Happens FIRST | Happens AFTER authentication |
| Login (JWT, password) | Access control (admin vs user) |

> *"In AceCoder, JWT handles authentication. Authorization would check if the user has permission to, say, create a new problem (only admin can)."*

---

### Q: What are WebSockets? How different from REST?

| REST APIs | WebSockets |
|----------|-----------|
| Request-response (client initiates) | Persistent two-way connection |
| Stateless | Stateful |
| Good for CRUD operations | Good for real-time (chat, live notifications) |
| HTTP overhead per request | Low overhead after connection |

---

### Q: PUT vs POST?

| POST | PUT |
|------|-----|
| Creates a NEW resource | Updates/replaces existing resource |
| NOT idempotent (2 calls = 2 resources) | Idempotent (2 calls = same result) |
| Server decides URL | Client specifies URL |
| `POST /users` → creates new user | `PUT /users/5` → replaces user 5 |

---

### Q: Why use REST APIs?

> *"REST is stateless, scalable, and uses standard HTTP methods (GET, POST, PUT, DELETE). It's simple, cacheable, and works across all platforms. In my AceCoder project, RESTful APIs handle all client-server communication — clean, predictable URLs like `GET /api/problems`, `POST /api/submissions`."*

---

### Q: Why use localStorage? Drawbacks?

> *"In my SpeakUp project, I used localStorage to store user progress (XP, streaks, achievements) because it's a client-side PWA with no backend.*
>
> **Drawbacks:**
> - Not encrypted — security risk for sensitive data
> - Limited to ~5-10MB
> - Synchronous access (can block main thread)
> - Data persists only on that specific browser/device
> - Not suitable for authentication tokens (use httpOnly cookies instead)"*

---

### Q: Git vs GitHub?

| Git | GitHub |
|-----|--------|
| Version control TOOL (installed locally) | Cloud PLATFORM for hosting Git repos |
| Tracks code changes | Enables collaboration, PRs, code review |
| Works offline | Requires internet |

---

### Q: Common Git commands — end to end?

```bash
git clone <repo-url>                 # clone remote repo
git checkout -b feature-login        # create and switch to new branch
# ... make changes ...
git add .                            # stage all changes
git commit -m "Add login API"        # commit with message
git pull origin main                 # sync before pushing
git push origin feature-login        # push to remote branch
git merge feature-login              # merge into main (on main branch)
```

> *"In my AceCoder project, I use feature branches for new functionality — develop on a branch, test, then merge to main. Render auto-deploys from main."*

---

# 7. Cloud & DevOps

---

### Q: What is Docker? Why is it used?

> *"Docker packages an application with ALL its dependencies into a lightweight, portable container — runs consistently across dev, test, and production."*
>
> *"In my TinyLink project, I created a Dockerfile with multi-stage build — Maven builds the JAR in stage 1, the final image only contains the JRE and JAR (smaller image)."*

---

### Q: Docker vs Virtual Machine?

| Docker Container | Virtual Machine |
|-----------------|----------------|
| Shares host OS kernel | Full guest OS |
| Lightweight (MBs) | Heavy (GBs) |
| Starts in seconds | Starts in minutes |
| Less isolated | More isolated |

> *Real-life: VM = separate house for each guest. Container = separate hotel rooms sharing building infrastructure.*

---

### Q: What do you know about AWS/cloud?

> *"Cloud services provide on-demand computing without owning physical infrastructure. Key services:*
> - **EC2** — virtual servers (compute)
> - **S3** — file storage
> - **RDS** — managed databases
> - **Lambda** — serverless functions
>
> *My AceCoder is deployed on Render (PaaS) — similar concept. Render manages servers, scaling, and SSL while I focus on code. Benefits: scalability, pay-as-you-go, reduced maintenance."*

---

# 8. AI/ML & Data

---

### Q: What is Generative AI? What is GPT?

> *"Generative AI creates NEW content (text, images, code) rather than just classifying existing data. GPT = Generative Pre-trained Transformer — a large language model that generates human-like text. Variants: GPT-3, GPT-4, Gemini (which I used in my SpeakUp project for AI-powered mock interviews)."*

---

### Q: What is RAG?

> *"Retrieval-Augmented Generation — combines a language model with an external knowledge source (database/documents). The model retrieves relevant info at query time and uses it for more accurate, up-to-date answers, rather than relying only on training data."*

---

### Q: What is Prompt Engineering?

> *"Crafting input prompts to guide AI output. In my SpeakUp project, I wrote specific prompts like: 'You are a TCS interviewer. Based on this CV, ask relevant technical questions one at a time. After each answer, provide feedback and score out of 10.' Good prompts are specific, include context, define output format, and set constraints."*

---

### Q: CNN vs RNN?

| CNN | RNN |
|-----|-----|
| Best for spatial data (images) | Best for sequential data (text, time series) |
| Uses filters to detect patterns (edges, shapes) | Retains memory of previous inputs |
| Image recognition, object detection | NLP, speech recognition, translation |

---

### Q: What is clustering?

> *"Unsupervised learning that groups similar data points without predefined labels. K-Means clustering partitions data into K groups based on similarity."*
>
> *Real-life: Grouping customers by purchasing behavior for targeted marketing.*

---

### Q: Random Forest vs XGBoost?

| Random Forest | XGBoost |
|--------------|---------|
| Multiple decision trees, outputs combined by voting | Trees built sequentially, each corrects previous errors |
| Parallel training | Sequential (gradient boosting) |
| Less prone to overfitting | Can overfit if not tuned |
| Both strong for structured/tabular data |

---

### Q: What is optimization in ML?

> *"Adjusting model parameters to minimize error/cost. Example: gradient descent minimizes a loss function — the model takes steps in the direction that reduces error most, learning the best weights."*

---

# 9. C++ & Java Language Fundamentals

---

### Q: Pointer vs Reference (C++)

```cpp
int x = 10;
int* ptr = &x;    // pointer — stores address, can be null, can be reassigned
int& ref = x;     // reference — alias for x, MUST be initialized, can't be null
```

| Pointer | Reference |
|---------|-----------|
| Stores memory address | Alias for existing variable |
| Can be null | Cannot be null |
| Can be reassigned | Cannot be reassigned |
| Uses `*` and `&` operators | Declared with `&`, used like normal variable |

---

### Q: What is RAII in C++?

> *"Resource Acquisition Is Initialization — resources (memory, files, locks) are tied to object lifetime: acquired in constructor, released in destructor. Ensures automatic cleanup even if exception occurs."*

```cpp
class FileHandler {
    FILE* file;
public:
    FileHandler(const char* name) { file = fopen(name, "r"); }   // acquire
    ~FileHandler() { if (file) fclose(file); }                     // release automatically
};
// When FileHandler object goes out of scope, file is auto-closed
```

---

### Q: while vs do-while?

```cpp
// while — checks BEFORE executing (may run 0 times)
int i = 10;
while (i < 5) {
    cout << i;    // never executes because 10 < 5 is false
}

// do-while — executes FIRST, checks AFTER (runs at least once)
int j = 10;
do {
    cout << j;    // prints 10 even though 10 < 5 is false
} while (j < 5);
```

---

### Q: String vs StringBuffer (Java)

```java
// String — IMMUTABLE (every modification creates NEW object)
String s = "Hello";
s = s + " World";   // creates new String object in memory, old one is garbage

// StringBuffer — MUTABLE, thread-safe
StringBuffer sb = new StringBuffer("Hello");
sb.append(" World");  // modifies same object — more efficient for loops
```

| String | StringBuffer | StringBuilder |
|--------|-------------|--------------|
| Immutable | Mutable, thread-safe | Mutable, NOT thread-safe |
| Slow for concatenation in loops | Faster | Fastest (single-threaded) |

---

### Q: What is a lambda expression?

**Java:**
```java
// Traditional
Comparator<Integer> comp = new Comparator<Integer>() {
    public int compare(Integer a, Integer b) { return a - b; }
};

// Lambda
Comparator<Integer> comp = (a, b) -> a - b;

// With streams
List<String> names = Arrays.asList("Dilip", "Amit", "Rahul");
names.stream().filter(n -> n.startsWith("D")).forEach(System.out::println);
```

**C++:**
```cpp
auto square = [](int x) { return x * x; };
cout << square(5);  // 25

// With STL
sort(arr.begin(), arr.end(), [](int a, int b) { return a > b; }); // descending
```

---

# 10. Project & Situation-Based

---

### Q: Walk me through your project.

**AceCoder (90-second script):**
> *"AceCoder is a placement preparation platform serving 200+ users across 5+ countries. I built the complete backend using Node.js, Express.js, and PostgreSQL.*
>
> *My role: I designed and built the entire backend — RESTful APIs for users, problems, submissions, and contests. I implemented JWT authentication, integrated an external code execution API for C++, and optimized PostgreSQL queries with indexing.*
>
> *Challenge: Concurrent code submissions were causing timeouts. I fixed it with async/await patterns and proper error handling for API failures.*
>
> *Result: Stable production deployment on Render serving real users across 5+ countries."*

**TinyLink (90-second script):**
> *"TinyLink is a URL shortener built with Java and Spring Boot. I used Base62 encoding on auto-incrementing IDs with AtomicLong for thread-safe, collision-free short URL generation. I followed SOLID principles strictly — Controller, Service, Repository separation with Spring DI. The API supports POST /shorten, GET /redirect with HTTP 302, and proper error handling (400, 404). Containerized with Docker for portable deployment."*

**SpeakUp (90-second script):**
> *"SpeakUp is a PWA-based English Communication Coach for CSE students. It has a 12-week roadmap with gamification (XP, streaks, achievements), an AI interview simulator using Google Gemini API that generates CV-based questions, and speech analytics using Web Speech API to detect filler words, track WPM, and score pronunciation. I built it with vanilla HTML/CSS/JS for maximum accessibility."*

---

### Q: Solo project vs team project — what did you learn?

> *"All three of my projects are solo projects, which gave me complete ownership — from architecture decisions to deployment. The biggest learning was self-discipline: no one else will catch your bugs or remind you of deadlines. I also learned to use Git properly even as a solo developer — feature branches, meaningful commits — because it kept my code organized and made debugging easier."*

---

### Q: Team member not contributing — what do you do?

> *"First, I'd have a direct but respectful one-on-one conversation to understand their situation — maybe they're stuck on something or have personal issues. I'd offer help or suggest redistributing tasks based on strengths. If the issue persists and affects the deadline, I'd escalate to the team lead politely, focusing on the project impact rather than blaming the person. Communication over confrontation."*

---

### Q: Easy task vs hard/urgent task — how to prioritize?

> *"I assess deadline and impact first, not just difficulty. Quick wins (easy, low-effort) I clear first to reduce clutter. High-impact/urgent hard tasks get dedicated focused time blocks. I communicate early if a hard task will take longer than expected — surprises are worse than delays."*

---

### Q: Explain your certifications.

> **Ethical Hacking (NPTEL):** *"Covered cybersecurity fundamentals — cryptography, session hijacking, SQL injection, XSS, network security. Gave me a strong understanding of how to build secure applications — which I applied in AceCoder using parameterized queries, bcrypt hashing, and JWT."*
>
> **DSA Bootcamp (CodeQuest, LPU):** *"Intensive summer program focused on data structures and algorithms — arrays, trees, graphs, DP. Kickstarted my competitive programming journey that led to solving 1000+ problems."*
>
> **Network Communication (Coursera):** *"Covered OSI model, TCP/UDP, HTTP, DNS, routing protocols. Helped me understand how my applications communicate over the network — especially relevant when designing REST APIs and deploying on cloud platforms."*

---

# 11. HR Questions — Personalized for Dilip

---

### Q1: Where is TCS headquartered?
> *"Mumbai, Maharashtra, India."*

### Q2: Who is the CEO of TCS?
> *"K. Krithivasan — he became CEO & MD in June 2023."*

### Q3: Chairman of Tata Group?
> *"Natarajan Chandrasekaran — Chairman of Tata Sons."*

### Q4: Where is Tata Group headquartered?
> *"Bombay House, Mumbai, Maharashtra."*

### Q5: When was TCS established?
> *"1968."*

### Q6: Recent TCS initiatives?
> *"TCS has been focusing on AI-led transformation — their AI revenue recently crossed $2.3 billion. They've partnered with major enterprises for cloud migration and digital transformation. TCS is also investing heavily in sustainability and employee upskilling programs."*

### Q7: Technologies TCS works with?
> *"TCS works across cloud platforms (AWS, Azure, GCP), AI/ML, enterprise software (SAP, Salesforce), digital transformation, cybersecurity, and blockchain. This aligns with my own skills in backend development, REST APIs, and cloud deployment."*

---

### Q8: Why should we hire you?

> *"I bring a unique combination of problem-solving depth and practical development experience. I've solved 1000+ DSA problems with ratings on LeetCode (Knight 1892), Codeforces (Specialist 1475), and CodeChef (3-Star). But I'm not just a competitive programmer — I've built production-ready applications like AceCoder that serves 200+ real users across 5+ countries. I'm proficient across the stack — Java, C++, JavaScript, Spring Boot, Node.js — and I have strong fundamentals in OOPs, DBMS, OS, and system design. I'm adaptable, quick to learn, and ready to contribute from day one."*

---

### Q9: Why TCS?

> *"Three reasons. First, TCS is the world's leading IT services company with operations in 56 countries — the scale of projects and learning opportunities is unmatched. Second, the Tata Group's values of integrity and social responsibility resonate with me personally. Third, TCS's focus on AI-led transformation and continuous employee development through programs like TCS iON makes it the ideal place for me to grow from a strong foundation into an industry expert."*

---

### Q10: Willing to accept this package/CTC?

> *"At this stage of my career, I value learning, exposure, and working with a brand like TCS much more than just the number. TCS offers a platform where I can work on large-scale enterprise projects, learn from experienced professionals, and build a strong career foundation. I'm confident that as I prove myself, the growth will follow naturally."*

---

### Q11: Why did you choose LPU?

> *"I chose LPU for its strong placement record, diverse student community from across India and internationally, and its emphasis on practical, project-based learning. The university provides excellent infrastructure and opportunities for coding competitions, hackathons, and technical events that helped me grow as a developer."*

---

### Q12: How is the environment at LPU?

> *"LPU has a very vibrant and diverse environment — students from all states and many countries. The campus facilities are excellent — modern labs, 24/7 library, strong Wi-Fi. The placement cell is very active and brings top companies regularly. The competitive programming community and coding clubs helped me stay motivated and grow my skills."*

---

### Q13: Family background?

> *"I come from a simple, supportive middle-class family from Bihar. My family has always encouraged my education and independence. I completed my schooling in Bihar — 10th from Jnan Jyoti School, Ghorasahan (87.4%) and 12th from Ms. College, Motihari (75.4%) — before moving to Punjab for my B.Tech at LPU. My family's support has been instrumental in my journey."*

---

### Q14: Tell me about your city/hometown?

> *"I'm from Motihari, in the East Champaran district of Bihar. It's historically significant — Mahatma Gandhi started the Champaran Satyagraha movement there in 1917. Growing up in a small town taught me self-reliance and resourcefulness — I had to seek out learning opportunities online, which is why I became so active on competitive programming platforms."*

---

### Q15: Hobbies?

> *"My primary hobby is competitive programming — I genuinely enjoy solving challenging algorithmic problems on LeetCode, Codeforces, and CodeChef. It keeps my logical thinking sharp and the rating system gives a constant sense of progress. Apart from that, I stay updated with tech blogs and explore new frameworks — in fact, that curiosity led me to build SpeakUp using Google's Gemini AI API."*

---

### Q16: What is your weakness?

> *"I tend to over-optimize solutions — I'll spend time finding the most efficient approach when a simpler working solution would suffice for the situation. I'm actively working on this by adopting a 'make it work first, then optimize' mindset. For example, in my AceCoder project, I now ship working features first and optimize database queries in a subsequent iteration. This has made me more productive."*

---

### Q17: Goals — short-term and long-term?

> **Short-term (1-2 years):** *"Excel in my role at TCS, master the technology stack used in my projects, earn relevant certifications, and become a reliable contributor to my team."*
>
> **Long-term (5 years):** *"Grow into a technically deep specialist who can design and architect solutions for complex problems. I want to lead technical initiatives and mentor newer team members, contributing to both the project and the team's growth."*

---

### Q18: Comfortable with US time shifts/company location?

> *"Yes, absolutely. I understand TCS serves global clients across different time zones and I'm fully flexible. I have no constraints — I'm willing to work whatever shift the project requires."*

---

### Q19: Willing to relocate?

> *"Yes, completely. I've already relocated from Bihar to Punjab for my education and adapted well. I'm open to relocating anywhere in India or abroad based on project requirements."*

---

## 🎯 30-Minute Quick Revision Before Interview

| # | Topic | Key Answer |
|---|-------|-----------|
| 1 | 4 Pillars of OOPs | Encapsulation, Inheritance, Polymorphism, Abstraction |
| 2 | ACID | Atomicity, Consistency, Isolation, Durability |
| 3 | Normalization | 1NF=atomic, 2NF=no partial dep, 3NF=no transitive dep |
| 4 | Process vs Thread | Process=own memory, Thread=shared memory within process |
| 5 | TCP vs UDP | TCP=reliable/slow, UDP=unreliable/fast |
| 6 | DELETE vs TRUNCATE | DELETE=rows/rollback, TRUNCATE=all/no rollback |
| 7 | TCS CEO | K. Krithivasan |
| 8 | TCS Founded | 1968, Mumbai |
| 9 | Why TCS | Scale (56 countries) + Tata values + AI transformation |
| 10 | Weakness | Over-optimize → working on "ship first, optimize later" |
| 11 | 2nd highest salary | `SELECT MAX(salary) WHERE salary < (SELECT MAX(salary))` |
| 12 | Overloading vs Overriding | Same class/diff params vs Child class/same params |
| 13 | Abstract vs Interface | Abstract=partial impl, Interface=full contract |
| 14 | JWT flow | Login → sign token → client stores → sends in header → middleware verifies |
| 15 | Docker vs VM | Container=shares OS/lightweight, VM=full OS/heavy |

---

> **You have EVERYTHING. Read this file top to bottom ONCE, practice your project scripts OUT LOUD, and walk in with full confidence. You've got this, Dilip! 🚀💪**
