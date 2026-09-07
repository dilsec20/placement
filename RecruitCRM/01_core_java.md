# Core Java – Interview Questions & Answers (Recruit CRM + TCS Style)

---

## SECTION 1: Java Fundamentals

---

### Q1. What is Java? Why is it platform-independent?
**Answer:**
Java is a high-level, object-oriented, platform-independent programming language. It achieves platform independence through the **JVM (Java Virtual Machine)**.

```
Source Code (.java)  →  Compiler (javac)  →  Bytecode (.class)  →  JVM  →  Machine Code
```

- Java code is compiled into **bytecode**, not native machine code.
- The JVM interprets/JIT-compiles this bytecode on any platform.
- This is the **"Write Once, Run Anywhere" (WORA)** principle.

---

### Q2. Differentiate JDK, JRE, and JVM.

| Feature | JDK | JRE | JVM |
| :--- | :--- | :--- | :--- |
| **Full Form** | Java Development Kit | Java Runtime Environment | Java Virtual Machine |
| **Purpose** | Develop + Run Java programs | Run Java programs only | Execute bytecode |
| **Contains** | JRE + Compiler + Debugger + Tools | JVM + Libraries + Runtime | Classloader + Bytecode Verifier + Interpreter |
| **Who Uses** | Developers | End Users | Internal to JRE |

```
JDK ⊃ JRE ⊃ JVM
```

---

### Q3. Explain `public static void main(String[] args)`.

| Keyword | Why? |
| :--- | :--- |
| `public` | JVM must access it from outside the class |
| `static` | JVM calls it without creating an object of the class |
| `void` | Returns nothing to the JVM |
| `main` | Entry point recognized by the JVM |
| `String[] args` | Command-line arguments passed as an array of Strings |

**Can we overload `main`?** → YES, but JVM will only call `public static void main(String[] args)`.
**Can we override `main`?** → NO, it's `static`. Static methods are hidden, not overridden.

---

### Q4. What is the difference between `==` and `.equals()`?

| Feature | `==` | `.equals()` |
| :--- | :--- | :--- |
| **Type** | Operator | Method of `Object` class |
| **Compares** | Reference (memory address) | Content/Value |
| **Primitives** | Compares values | Cannot be used |
| **Objects** | Compares references | Compares values (if overridden) |

```java
String s1 = new String("hello");
String s2 = new String("hello");

System.out.println(s1 == s2);      // false (different objects in heap)
System.out.println(s1.equals(s2)); // true  (same content)

String s3 = "hello";
String s4 = "hello";
System.out.println(s3 == s4);      // true  (String Pool — same reference)
```

---

### Q5. String vs StringBuilder vs StringBuffer

| Feature | String | StringBuilder | StringBuffer |
| :--- | :--- | :--- | :--- |
| **Mutability** | Immutable | Mutable | Mutable |
| **Thread Safety** | Yes (immutable) | No | Yes (synchronized) |
| **Performance** | Slow (creates new objects) | Fast | Slower than StringBuilder |
| **Use Case** | Constants, keys | Single-threaded string manipulation | Multi-threaded string manipulation |

```java
// String creates new object every time
String s = "Hello";
s = s + " World"; // New object created, old "Hello" is garbage collected

// StringBuilder modifies in-place
StringBuilder sb = new StringBuilder("Hello");
sb.append(" World"); // Same object modified
```

---

### Q6. What are Wrapper Classes? What is Autoboxing/Unboxing?

**Wrapper Classes** convert primitives into objects:
`int → Integer`, `char → Character`, `double → Double`, etc.

```java
// Autoboxing: primitive → object (automatic)
Integer num = 10;  // int → Integer automatically

// Unboxing: object → primitive (automatic)
int val = num;     // Integer → int automatically
```

**Why needed?** Collections like `ArrayList` only store objects, not primitives.

---

### Q7. What is the `final` keyword?

| Context | Effect |
| :--- | :--- |
| `final` variable | Value cannot be changed (constant) |
| `final` method | Cannot be overridden by subclass |
| `final` class | Cannot be extended (no inheritance) |

```java
final int MAX = 100;        // Constant
final class Utility { }     // Cannot be subclassed
class Parent {
    final void show() { }   // Cannot be overridden
}
```

**`final` vs `finally` vs `finalize()`:**
- `final` → keyword for constants/restrictions
- `finally` → block that always executes after try-catch
- `finalize()` → method called by GC before object destruction (deprecated since Java 9)

---

## SECTION 2: Object-Oriented Programming (OOP)

---

### Q8. Explain the 4 Pillars of OOP.

```
                 ┌────────────────────────────────────────┐
                 │          4 PILLARS OF OOP              │
                 └──────┬────────┬────────┬──────────────┘
                        │        │        │
           ┌────────────┤   ┌────┴────┐   ├────────────┐    ┌──────────────┐
           │Encapsulation│  │Abstraction│  │Inheritance │    │Polymorphism  │
           └─────────────┘  └──────────┘  └────────────┘    └──────────────┘
```

1. **Encapsulation** — Bundling data + methods into a class, restricting access via `private`/`protected`.
   - *Real-world*: A capsule contains medicine (data) inside a shell (class).
   - *Java*: Private fields + public getters/setters.

2. **Abstraction** — Hiding implementation, showing only essential features.
   - *Real-world*: ATM — you insert card & get cash, internal logic is hidden.
   - *Java*: Abstract classes, Interfaces.

3. **Inheritance** — Child class acquires properties/methods of parent class (`is-a` relationship).
   - *Real-world*: Car IS-A Vehicle.
   - *Java*: `extends` keyword. Java supports single inheritance only (no diamond problem).

4. **Polymorphism** — One interface, multiple implementations.
   - **Compile-time** (Method Overloading): Same method name, different parameters.
   - **Runtime** (Method Overriding): Subclass provides specific implementation of parent's method.

---

### Q9. Difference between Abstract Class and Interface.

| Feature | Abstract Class | Interface |
| :--- | :--- | :--- |
| **Keyword** | `abstract` | `interface` |
| **Methods** | Abstract + Concrete | Abstract (Java 7), Default + Static (Java 8+) |
| **Variables** | Any type | `public static final` only |
| **Constructor** | Can have | Cannot have |
| **Inheritance** | `extends` (single) | `implements` (multiple) |
| **Access Modifiers** | Any | `public` only (methods) |
| **When to Use** | Shared base behavior | Contract/capability |

```java
abstract class Animal {
    abstract void sound();     // Abstract — must be overridden
    void breathe() {           // Concrete — shared behavior
        System.out.println("Breathing...");
    }
}

interface Flyable {
    void fly();                // Abstract by default
    default void land() {     // Default method (Java 8+)
        System.out.println("Landing...");
    }
}
```

---

### Q10. Method Overloading vs Method Overriding

| Feature | Overloading | Overriding |
| :--- | :--- | :--- |
| **Where** | Same class | Parent-Child classes |
| **Method Name** | Same | Same |
| **Parameters** | Must differ (type/number/order) | Must be same |
| **Return Type** | Can differ | Must be same (or covariant) |
| **Access Modifier** | Can differ | Cannot be more restrictive |
| **Binding** | Compile-time (Static) | Runtime (Dynamic) |
| **`static` methods** | Can be overloaded | Cannot be overridden (hidden) |

```java
// Overloading
class Calculator {
    int add(int a, int b) { return a + b; }
    double add(double a, double b) { return a + b; }
}

// Overriding
class Animal {
    void sound() { System.out.println("Generic sound"); }
}
class Dog extends Animal {
    @Override
    void sound() { System.out.println("Bark"); }
}
```

---

### Q11. What is the Diamond Problem? How does Java solve it?

The **Diamond Problem** occurs when a class inherits from two classes that have the same method:

```
        A
       / \
      B   C
       \ /
        D
```

If B and C both override a method from A, which version does D inherit?

**Java's Solution:**
- Java does NOT support multiple inheritance with classes (only single `extends`).
- Multiple inheritance is allowed via **interfaces**.
- If two interfaces have the same default method, the implementing class **MUST override** it.

```java
interface A { default void show() { System.out.println("A"); } }
interface B { default void show() { System.out.println("B"); } }

class C implements A, B {
    @Override
    public void show() {
        A.super.show(); // Explicitly choose which to call
    }
}
```

---

### Q12. What is `this` and `super` in Java?

| Keyword | Purpose |
| :--- | :--- |
| `this` | Refers to current class instance |
| `this()` | Calls current class constructor (must be 1st statement) |
| `super` | Refers to parent class instance |
| `super()` | Calls parent class constructor (must be 1st statement) |

**Rule**: `this()` and `super()` cannot be used together in the same constructor.

---

## SECTION 3: Java Collections Framework

---

### Q13. Explain the Collections Hierarchy.

```
                        Iterable
                           │
                       Collection
                      /    |     \
                   List   Set    Queue
                  / | \   / \      |
        ArrayList  |  \ HashSet TreeSet  PriorityQueue
           LinkedList  Vector

                        Map (separate hierarchy)
                       / | \
                HashMap  TreeMap  LinkedHashMap
                  |
            ConcurrentHashMap
```

---

### Q14. ArrayList vs LinkedList

| Feature | ArrayList | LinkedList |
| :--- | :--- | :--- |
| **Underlying DS** | Dynamic Array | Doubly Linked List |
| **Random Access** | O(1) — fast | O(n) — slow |
| **Insert/Delete (middle)** | O(n) — shifting | O(1) — pointer change |
| **Insert (end)** | O(1) amortized | O(1) |
| **Memory** | Less (contiguous) | More (node + 2 pointers) |
| **Use When** | Frequent read/access | Frequent insert/delete |

---

### Q15. How does HashMap work internally?

**Critical Interview Question — Asked Very Frequently at Recruit CRM!**

```
HashMap<Key, Value>
    │
    ├── Array of Buckets (Node<K,V>[])
    │   Index = hashCode(key) & (n-1)
    │
    ├── Each Bucket → LinkedList (Java 7) or LinkedList → TreeMap (Java 8, when bucket size > 8)
    │
    └── Steps:
         1. put(key, value):
            a. Calculate hash = hashCode(key)
            b. Calculate index = hash & (capacity - 1)
            c. If bucket is empty → place new Node
            d. If bucket occupied → check equals():
               - Key matches → update value
               - Key doesn't match → chain (LinkedList/Tree)

         2. get(key):
            a. Calculate hash → find bucket index
            b. Traverse bucket chain → use equals() to find exact key
            c. Return value
```

**Key Concepts:**
- **hashCode()** → determines bucket index
- **equals()** → resolves collisions within a bucket
- **Contract**: If `a.equals(b)` is true, then `a.hashCode() == b.hashCode()` must be true
- **Load Factor** = 0.75 (default) → resizes when 75% full
- **Initial Capacity** = 16
- **Treeification**: In Java 8+, when a bucket has > 8 nodes, LinkedList → Red-Black Tree (O(log n) instead of O(n))

---

### Q16. HashMap vs Hashtable vs ConcurrentHashMap

| Feature | HashMap | Hashtable | ConcurrentHashMap |
| :--- | :--- | :--- | :--- |
| **Thread-Safe** | No | Yes | Yes |
| **Null Keys** | 1 null key allowed | No null key/value | No null key/value |
| **Synchronization** | None | Entire map locked | Segment-level locking |
| **Performance** | Fast (single-thread) | Slow (full lock) | Fast (fine-grained lock) |
| **Legacy** | No | Yes | No |

---

### Q17. Comparable vs Comparator

| Feature | Comparable | Comparator |
| :--- | :--- | :--- |
| **Package** | `java.lang` | `java.util` |
| **Method** | `compareTo(Object)` | `compare(Object, Object)` |
| **Sorting** | Natural ordering (single) | Custom ordering (multiple) |
| **Modifies Class** | Yes (implements in class) | No (external class/lambda) |

```java
// Comparable — natural ordering
class Student implements Comparable<Student> {
    int marks;
    public int compareTo(Student s) {
        return this.marks - s.marks; // ascending
    }
}

// Comparator — custom ordering (Java 8 lambda)
List<Student> list = new ArrayList<>();
list.sort((s1, s2) -> s2.marks - s1.marks); // descending
```

---

## SECTION 4: Java 8+ Features

---

### Q18. What are Lambda Expressions?

Lambda expressions provide a concise way to implement **functional interfaces** (interfaces with single abstract method).

```java
// Before Java 8
Runnable r = new Runnable() {
    @Override
    public void run() {
        System.out.println("Hello");
    }
};

// After Java 8 — Lambda
Runnable r = () -> System.out.println("Hello");
```

**Syntax:** `(parameters) -> { body }`

---

### Q19. What is the Stream API?

Streams provide a declarative way to process collections.

```java
List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David", "Anna");

// Filter names starting with 'A', convert to uppercase, collect to list
List<String> result = names.stream()
    .filter(name -> name.startsWith("A"))
    .map(String::toUpperCase)
    .sorted()
    .collect(Collectors.toList());
// Result: [ALICE, ANNA]
```

**Key Operations:**
- **Intermediate** (lazy): `filter()`, `map()`, `sorted()`, `distinct()`, `limit()`
- **Terminal** (triggers execution): `collect()`, `forEach()`, `reduce()`, `count()`, `findFirst()`

---

### Q20. What are Functional Interfaces?

An interface with **exactly one abstract method**. Annotated with `@FunctionalInterface`.

| Interface | Method | Purpose | Example |
| :--- | :--- | :--- | :--- |
| `Predicate<T>` | `test(T)` → boolean | Condition/Filter | `x -> x > 5` |
| `Function<T,R>` | `apply(T)` → R | Transform | `x -> x.toUpperCase()` |
| `Consumer<T>` | `accept(T)` → void | Consume/Process | `x -> System.out.println(x)` |
| `Supplier<T>` | `get()` → T | Produce/Supply | `() -> new ArrayList<>()` |

---

### Q21. What is Optional?

`Optional` is a container that may or may not contain a value. It prevents `NullPointerException`.

```java
Optional<String> opt = Optional.ofNullable(getName());

// Safe access
String name = opt.orElse("Default");
opt.ifPresent(n -> System.out.println(n));
String result = opt.orElseThrow(() -> new RuntimeException("Not found"));
```

---

## SECTION 5: Exception Handling

---

### Q22. Exception Hierarchy

```
               Throwable
              /         \
          Error        Exception
          (JVM)       /         \
                 Checked    Unchecked (RuntimeException)
                 /    \         /     |        \
          IOException  SQL   NullPtr  ArrayIdx  ClassCast
                       Exception  Exception  OutOfBounds
```

| Type | Checked | Unchecked |
| :--- | :--- | :--- |
| **When** | Compile-time | Runtime |
| **Must Handle** | Yes (`try-catch` or `throws`) | No (optional) |
| **Examples** | IOException, SQLException | NullPointerException, ArithmeticException |

---

### Q23. `throw` vs `throws`

| Feature | `throw` | `throws` |
| :--- | :--- | :--- |
| **Purpose** | Actually throw an exception | Declare that method might throw |
| **Where** | Inside method body | Method signature |
| **Count** | One exception at a time | Multiple exceptions |

```java
// throws — declaration
public void readFile() throws IOException, FileNotFoundException {
    // throw — actually throwing
    throw new IOException("File not found!");
}
```

---

### Q24. `try-catch-finally` behavior with `return`

```java
public static int test() {
    try {
        System.out.println("try");
        return 1;
    } catch (Exception e) {
        System.out.println("catch");
        return 2;
    } finally {
        System.out.println("finally");
        // finally ALWAYS executes (even after return in try)
        // If finally has a return, it overrides try's return
    }
}
// Output: try, finally → returns 1
// If finally had "return 3;" → returns 3
```

---

## SECTION 6: Multithreading

---

### Q25. Ways to Create a Thread

```java
// Method 1: Extend Thread class
class MyThread extends Thread {
    public void run() { System.out.println("Thread running"); }
}

// Method 2: Implement Runnable interface (PREFERRED)
class MyRunnable implements Runnable {
    public void run() { System.out.println("Runnable running"); }
}

// Method 3: Lambda (Java 8+)
Thread t = new Thread(() -> System.out.println("Lambda thread"));
t.start();
```

**Why Runnable is preferred?** → Java supports single inheritance. If you extend Thread, you can't extend another class. Implementing Runnable keeps inheritance free.

---

### Q26. Thread Lifecycle

```
       NEW
        │ start()
        ▼
     RUNNABLE ──────────┐
        │                │ wait()/sleep()/block
        │ scheduled       ▼
        ▼             BLOCKED/WAITING/TIMED_WAITING
     RUNNING              │
        │                 │ notify()/timeout/IO complete
        │ run() ends      │
        ▼                 ▼
    TERMINATED ←──── RUNNABLE
```

---

### Q27. What is a Deadlock? How to prevent it?

**Deadlock** = Two or more threads waiting for each other's locks, creating a circular dependency.

**4 Necessary Conditions (Coffman):**
1. **Mutual Exclusion** — Resource held exclusively
2. **Hold and Wait** — Holding one resource, waiting for another
3. **No Preemption** — Cannot forcefully take a resource
4. **Circular Wait** — Circular chain of dependencies

**Prevention:** Break any one condition. Most common: **Lock Ordering** — always acquire locks in the same order.

---

### Q28. `synchronized` vs `volatile` vs `Atomic`

| Feature | `synchronized` | `volatile` | `AtomicInteger` |
| :--- | :--- | :--- | :--- |
| **Thread Safety** | Yes (mutual exclusion) | Partial (visibility only) | Yes (lock-free) |
| **Atomicity** | Yes | No | Yes |
| **Performance** | Slower (blocking) | Fast | Fast (CAS) |
| **Use Case** | Complex critical sections | Simple flags | Counters |

---

## SECTION 7: Memory Management & Garbage Collection

---

### Q29. Stack vs Heap Memory

| Feature | Stack | Heap |
| :--- | :--- | :--- |
| **Stores** | Method calls, local variables, references | Objects, instance variables |
| **Access** | Fast (LIFO) | Slower |
| **Size** | Small, fixed per thread | Large, shared |
| **Thread** | Each thread has its own stack | Shared across threads |
| **Error** | StackOverflowError | OutOfMemoryError |

```java
public void method() {
    int x = 10;          // x → Stack
    String s = new String("Hello"); // reference s → Stack, object "Hello" → Heap
}
```

---

### Q30. What is Garbage Collection?

- **GC** automatically deallocates memory of objects that are no longer reachable.
- You **cannot force** GC. `System.gc()` is only a *request*.
- **Eligible for GC**: When no live reference points to the object.

**Types of GC Roots:**
- Local variables (stack)
- Active threads
- Static references
- JNI references

---

## SECTION 8: Design Patterns (Bonus for Interviews)

---

### Q31. Singleton Pattern

Ensures only ONE instance of a class exists.

```java
public class Singleton {
    private static volatile Singleton instance;
    
    private Singleton() { } // Private constructor
    
    public static Singleton getInstance() {
        if (instance == null) {                    // First check (no locking)
            synchronized (Singleton.class) {
                if (instance == null) {            // Second check (with locking)
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
```

**Why `volatile`?** → Prevents instruction reordering. Without it, another thread might see a partially constructed object.

---

### Q32. SOLID Principles (Asked about your TinyLink project!)

| Principle | Meaning | Your TinyLink Example |
| :--- | :--- | :--- |
| **S** — Single Responsibility | One class, one reason to change | Controller handles HTTP, Service handles logic, Repository handles data |
| **O** — Open/Closed | Open for extension, closed for modification | Adding new encoding strategy without modifying existing code |
| **L** — Liskov Substitution | Subtypes must be substitutable for base types | Any `UrlService` implementation works with Controller |
| **I** — Interface Segregation | Many small interfaces > one large | Separate interfaces for encoding, storage, retrieval |
| **D** — Dependency Inversion | Depend on abstractions, not concretions | Controller depends on `UrlService` interface, not `UrlServiceImpl` |

---

## SECTION 9: Miscellaneous High-Frequency Questions

---

### Q33. What is the `transient` keyword?
- Marks a field to be **excluded from serialization**.
- Useful for sensitive data (passwords) or non-serializable fields.

### Q34. What is the `static` keyword?
- **static variable** → shared across all objects (class-level)
- **static method** → belongs to class, not instance. Cannot access `this`.
- **static block** → executed once when class is loaded
- **static inner class** → doesn't need outer class instance

### Q35. Can we have multiple `catch` blocks?
Yes! Catch from most specific to most general:
```java
try {
    // code
} catch (FileNotFoundException e) { // Most specific first
    // handle
} catch (IOException e) {           // More general
    // handle
} catch (Exception e) {             // Most general last
    // handle
}
```

### Q36. What is a Marker Interface?
An interface with **no methods** — used to "mark" a class with a capability.
- `Serializable` — marks class as serializable
- `Cloneable` — marks class as cloneable
- Modern Java uses **annotations** instead.

### Q37. What is Type Casting in Java?

```java
// Widening (Implicit) — smaller → larger (safe)
int i = 10;
double d = i;  // int → double automatically

// Narrowing (Explicit) — larger → smaller (may lose data)
double d = 10.5;
int i = (int) d;  // 10 (decimal truncated)

// Upcasting (Object) — Child → Parent (safe, implicit)
Animal a = new Dog();

// Downcasting (Object) — Parent → Child (risky, explicit)
Dog d = (Dog) a;  // Must check with instanceof first!
```
