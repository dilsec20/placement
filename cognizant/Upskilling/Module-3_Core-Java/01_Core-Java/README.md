# ☕ Core Java — Complete Study Guide

> **Module 3 | Digital Nurture 5.0 — Java FSE Upskilling**

---

## 📋 Topics Covered

1. [Introduction to Java](#1-introduction-to-java)
2. [Basic Syntax](#2-basic-syntax)
3. [Data Types and Variables](#3-data-types-and-variables)
4. [Operators and Expressions](#4-operators-and-expressions)
5. [Control Flow Statements](#5-control-flow-statements)
6. [Methods](#6-methods)
7. [Arrays and Strings](#7-arrays-and-strings)
8. [Object-Oriented Programming](#8-object-oriented-programming)
9. [Exception Handling](#9-exception-handling)
10. [Java Collections Framework](#10-java-collections-framework)
11. [Functional Programming in Java](#11-functional-programming-in-java)
12. [Java I/O and File Handling](#12-java-io-and-file-handling)
13. [Multithreading and Concurrency](#13-multithreading-and-concurrency)
14. [Debugging with IntelliJ IDEA](#14-debugging-with-intellij-idea)
15. [Reactive Programming](#15-reactive-programming)
16. [Java Modules](#16-java-modules)
17. [Java Networking](#17-java-networking)
18. [Reverse Engineering Concepts](#18-reverse-engineering-concepts)
19. [Java 17 and 21 Features](#19-java-17-and-21-features)
20. [JDBC — Java Database Connectivity](#20-jdbc--java-database-connectivity)
21. [Practice Questions](#21-practice-questions)

---

## 1. Introduction to Java

### 📌 What is Java?

**Java** is a high-level, object-oriented, platform-independent programming language developed by Sun Microsystems (now Oracle). Its "Write Once, Run Anywhere" philosophy means compiled Java code runs on any device with a JVM.

### Java Platform Editions

| Edition | Full Name | Purpose |
|---------|-----------|---------|
| **Java SE** | Standard Edition | Core libraries, desktop apps |
| **Java EE** | Enterprise Edition (Jakarta EE) | Web apps, enterprise solutions |
| **Java ME** | Micro Edition | Mobile and embedded devices |

### JDK, JRE, JVM

```
JDK (Java Development Kit)
├── JRE (Java Runtime Environment)
│   ├── JVM (Java Virtual Machine)
│   │   └── Executes bytecode
│   └── Core Libraries (java.lang, java.util, etc.)
├── Compiler (javac)
├── Debugger (jdb)
└── Other Tools (jar, javadoc, etc.)
```

| Component | Purpose | Who Needs It |
|-----------|---------|-------------|
| **JVM** | Executes Java bytecode | Everyone running Java |
| **JRE** | JVM + core libraries to run programs | End users |
| **JDK** | JRE + development tools to write programs | Developers |

### Writing, Compiling, and Running

```java
// HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

```bash
# Compile (.java → .class bytecode)
javac HelloWorld.java

# Run
java HelloWorld
# Output: Hello, World!
```

```
Source Code (.java) → javac compiler → Bytecode (.class) → JVM → Execution
```

---

## 2. Basic Syntax

### Structure of a Java Program

```java
// Package declaration (optional)
package com.example;

// Import statements
import java.util.Scanner;
import java.util.ArrayList;

// Class declaration (must match filename)
public class MyProgram {

    // Main method — entry point
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}
```

### Key Rules
- File name must match the public class name (`MyProgram.java`)
- `main` method is the entry point: `public static void main(String[] args)`
- Statements end with semicolon `;`
- Java is case-sensitive
- Blocks are enclosed in `{ }`

### Comments

```java
// Single-line comment

/*
   Multi-line comment
   spanning multiple lines
*/

/**
 * Javadoc comment — generates documentation
 * @param name the user's name
 * @return greeting message
 */
public String greet(String name) {
    return "Hello, " + name;
}
```

---

## 3. Data Types and Variables

### Primitive Data Types

| Type | Size | Range | Default | Example |
|------|------|-------|---------|---------|
| `byte` | 1 byte | -128 to 127 | 0 | `byte b = 100;` |
| `short` | 2 bytes | -32,768 to 32,767 | 0 | `short s = 10000;` |
| `int` | 4 bytes | -2³¹ to 2³¹-1 | 0 | `int i = 42;` |
| `long` | 8 bytes | -2⁶³ to 2⁶³-1 | 0L | `long l = 100000L;` |
| `float` | 4 bytes | ~±3.4×10³⁸ | 0.0f | `float f = 3.14f;` |
| `double` | 8 bytes | ~±1.7×10³⁰⁸ | 0.0d | `double d = 3.14159;` |
| `char` | 2 bytes | 0 to 65,535 | '\u0000' | `char c = 'A';` |
| `boolean` | 1 bit | true/false | false | `boolean b = true;` |

### Reference Data Types

```java
String name = "Dilip";           // String (class, not primitive)
int[] numbers = {1, 2, 3};      // Array
Scanner sc = new Scanner(System.in); // Object
ArrayList<String> list = new ArrayList<>(); // Generic object
```

### Variable Declaration and Initialization

```java
// Declaration
int age;

// Initialization
age = 22;

// Declaration + Initialization
int score = 100;
String name = "Dilip";
final double PI = 3.14159;   // Constant (cannot change)

// Multiple declarations
int a = 1, b = 2, c = 3;
```

### Type Casting

```java
// ===== WIDENING (Implicit) — small to large (safe, automatic) =====
int myInt = 42;
double myDouble = myInt;    // 42.0 (automatic)
// byte → short → int → long → float → double

// ===== NARROWING (Explicit) — large to small (may lose data) =====
double d = 9.78;
int i = (int) d;            // 9 (truncated, not rounded)

float f = (float) 3.14;    // double to float
char c = (char) 65;         // 'A' (int to char using ASCII)
int x = (int) 'A';          // 65 (char to int)

// String to Number
int num = Integer.parseInt("123");
double dbl = Double.parseDouble("3.14");

// Number to String
String s1 = String.valueOf(42);
String s2 = Integer.toString(42);
String s3 = "" + 42;
```

### Wrapper Classes

| Primitive | Wrapper Class |
|-----------|--------------|
| `byte` | `Byte` |
| `short` | `Short` |
| `int` | `Integer` |
| `long` | `Long` |
| `float` | `Float` |
| `double` | `Double` |
| `char` | `Character` |
| `boolean` | `Boolean` |

```java
// Autoboxing (primitive → wrapper)
Integer obj = 42;

// Unboxing (wrapper → primitive)
int num = obj;

// Useful methods
Integer.parseInt("123");
Integer.MAX_VALUE;    // 2147483647
Integer.MIN_VALUE;    // -2147483648
```

---

## 4. Operators and Expressions

```java
// ===== ARITHMETIC =====
int a = 10, b = 3;
a + b;   // 13
a - b;   // 7
a * b;   // 30
a / b;   // 3 (integer division)
a % b;   // 1 (modulus)

// ===== RELATIONAL =====
a == b;   // false
a != b;   // true
a > b;    // true
a >= b;   // true
a < b;    // false

// ===== LOGICAL =====
true && false;   // false (AND)
true || false;   // true  (OR)
!true;           // false (NOT)

// ===== ASSIGNMENT =====
a += 5;   // a = a + 5
a -= 3;   // a = a - 3
a *= 2;   // a = a * 2
a /= 4;   // a = a / 4

// ===== INCREMENT / DECREMENT =====
int x = 5;
x++;      // Post-increment: use then increment → 5, then x becomes 6
++x;      // Pre-increment: increment then use → x becomes 7

// ===== TERNARY =====
String result = (a > b) ? "a is greater" : "b is greater";

// ===== BITWISE =====
5 & 3;    // 1  (AND)
5 | 3;    // 7  (OR)
5 ^ 3;    // 6  (XOR)
~5;       // -6 (NOT)
5 << 1;   // 10 (Left shift)
5 >> 1;   // 2  (Right shift)

// ===== INSTANCEOF =====
String s = "Hello";
s instanceof String;   // true
```

### Operator Precedence (High to Low)

```
1. Unary:          ++, --, !, ~
2. Multiplicative: *, /, %
3. Additive:       +, -
4. Shift:          <<, >>
5. Relational:     <, >, <=, >=, instanceof
6. Equality:       ==, !=
7. Bitwise AND:    &
8. Bitwise XOR:    ^
9. Bitwise OR:     |
10. Logical AND:   &&
11. Logical OR:    ||
12. Ternary:       ?:
13. Assignment:    =, +=, -=, etc.
```

---

## 5. Control Flow Statements

### Conditional Statements

```java
// IF-ELSE
int marks = 85;
if (marks >= 90) {
    System.out.println("A+");
} else if (marks >= 80) {
    System.out.println("A");
} else if (marks >= 70) {
    System.out.println("B");
} else {
    System.out.println("F");
}

// SWITCH
int day = 3;
switch (day) {
    case 1: System.out.println("Monday"); break;
    case 2: System.out.println("Tuesday"); break;
    case 3: System.out.println("Wednesday"); break;
    default: System.out.println("Other");
}

// ENHANCED SWITCH (Java 14+)
String dayName = switch (day) {
    case 1 -> "Monday";
    case 2 -> "Tuesday";
    case 3 -> "Wednesday";
    case 6, 7 -> "Weekend";
    default -> "Other";
};
```

### Looping Statements

```java
// FOR LOOP
for (int i = 1; i <= 5; i++) {
    System.out.print(i + " ");   // 1 2 3 4 5
}

// WHILE
int i = 1;
while (i <= 5) {
    System.out.print(i + " ");
    i++;
}

// DO-WHILE (executes at least once)
int j = 10;
do {
    System.out.println(j);  // Prints 10
    j++;
} while (j < 5);

// FOR-EACH (Enhanced for)
int[] arr = {10, 20, 30};
for (int num : arr) {
    System.out.print(num + " ");  // 10 20 30
}

// BREAK and CONTINUE
for (int k = 1; k <= 10; k++) {
    if (k == 5) break;      // Exit loop
    if (k % 2 == 0) continue; // Skip even numbers
    System.out.print(k + " ");  // 1 3
}

// LABELED BREAK
outer:
for (int x = 0; x < 3; x++) {
    for (int y = 0; y < 3; y++) {
        if (x == 1 && y == 1) break outer;
        System.out.println(x + "," + y);
    }
}
```

---

## 6. Methods

```java
// Defining a method
public static int add(int a, int b) {
    return a + b;
}

// Calling a method
int result = add(5, 3);  // 8

// void method (no return value)
public static void greet(String name) {
    System.out.println("Hello, " + name);
}

// Method with default behavior (overloading)
public static int multiply(int a, int b) { return a * b; }
public static double multiply(double a, double b) { return a * b; }
public static int multiply(int a, int b, int c) { return a * b * c; }

// Variable arguments (varargs)
public static int sum(int... numbers) {
    int total = 0;
    for (int n : numbers) total += n;
    return total;
}
sum(1, 2);         // 3
sum(1, 2, 3, 4);   // 10
```

### Recursion

```java
// Factorial
public static long factorial(int n) {
    if (n <= 1) return 1;         // Base case
    return n * factorial(n - 1);   // Recursive call
}
factorial(5);  // 120 (5×4×3×2×1)

// Fibonacci
public static int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
fibonacci(6);  // 8 (0, 1, 1, 2, 3, 5, 8)
```

---

## 7. Arrays and Strings

### Arrays

```java
// One-Dimensional Array
int[] arr = {10, 20, 30, 40, 50};
int[] arr2 = new int[5];    // Default values: 0
arr2[0] = 10;

arr.length;          // 5
Arrays.sort(arr);    // Sort ascending
Arrays.toString(arr); // "[10, 20, 30, 40, 50]"

// Multi-Dimensional Array
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};
matrix[0][1];  // 2
matrix.length;      // 3 (rows)
matrix[0].length;   // 3 (columns)

// Iterating 2D array
for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        System.out.print(matrix[i][j] + " ");
    }
    System.out.println();
}
```

### Strings

```java
// Creation
String s1 = "Hello";                    // String literal (String Pool)
String s2 = new String("Hello");        // Heap object

// Important: Strings are IMMUTABLE in Java

// String Methods
String str = "Hello World";
str.length();                // 11
str.charAt(0);               // 'H'
str.substring(6);            // "World"
str.substring(0, 5);         // "Hello"
str.indexOf("World");        // 6
str.lastIndexOf('l');        // 9
str.toUpperCase();           // "HELLO WORLD"
str.toLowerCase();           // "hello world"
str.trim();                  // Remove leading/trailing whitespace
str.replace("World", "Java"); // "Hello Java"
str.split(" ");              // ["Hello", "World"]
str.contains("World");       // true
str.startsWith("Hello");     // true
str.endsWith("World");       // true
str.equals("Hello World");   // true (content comparison)
str.equalsIgnoreCase("hello world"); // true
str.isEmpty();               // false
str.isBlank();               // false (Java 11+)
str.toCharArray();           // char array
String.valueOf(42);          // "42"
str.compareTo("Hello");     // positive (lexicographic)

// String comparison
"Hello" == "Hello";          // true (same reference in pool)
"Hello" == new String("Hello"); // false (different reference!)
"Hello".equals(new String("Hello")); // true ✅ USE THIS
```

### StringBuilder and StringBuffer

```java
// StringBuilder — mutable, NOT thread-safe, faster
StringBuilder sb = new StringBuilder("Hello");
sb.append(" World");     // "Hello World"
sb.insert(5, ",");       // "Hello, World"
sb.replace(0, 5, "Hi");  // "Hi, World"
sb.delete(2, 4);         // "Hi World"
sb.reverse();            // "dlroW iH"
sb.toString();           // Convert to String

// StringBuffer — mutable, thread-safe, slower (synchronized)
StringBuffer sbf = new StringBuffer("Hello");
// Same methods as StringBuilder
```

| Feature | String | StringBuilder | StringBuffer |
|---------|--------|---------------|--------------|
| Mutable | ❌ | ✅ | ✅ |
| Thread-safe | ✅ (immutable) | ❌ | ✅ |
| Performance | Slow (creates new objects) | Fast | Medium |
| Use when | Value won't change | Frequent changes (single thread) | Frequent changes (multi-thread) |

---

## 8. Object-Oriented Programming

### Classes and Objects

```java
public class Student {
    // Instance variables (fields)
    private String name;
    private int age;
    private double gpa;

    // Constructor
    public Student(String name, int age, double gpa) {
        this.name = name;
        this.age = age;
        this.gpa = gpa;
    }

    // Getters and Setters (Encapsulation)
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getAge() { return age; }
    public double getGpa() { return gpa; }

    // Method
    public String getGrade() {
        if (gpa >= 3.5) return "A";
        else if (gpa >= 3.0) return "B";
        else return "C";
    }

    @Override
    public String toString() {
        return name + " (Age: " + age + ", GPA: " + gpa + ")";
    }
}

// Creating objects
Student s1 = new Student("Dilip", 22, 3.8);
s1.getName();     // "Dilip"
s1.getGrade();    // "A"
```

### Encapsulation

> Wrapping data and methods together, hiding data using `private` access.

```java
public class BankAccount {
    private double balance;    // Hidden from outside

    public BankAccount(double initialBalance) {
        if (initialBalance >= 0) this.balance = initialBalance;
    }

    public double getBalance() { return balance; }

    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    public boolean withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            return true;
        }
        return false;
    }
}
```

### Inheritance

```java
// Parent class
class Animal {
    protected String name;
    public Animal(String name) { this.name = name; }
    public void eat() { System.out.println(name + " eats"); }
    public void sleep() { System.out.println(name + " sleeps"); }
}

// Child class
class Dog extends Animal {
    private String breed;
    public Dog(String name, String breed) {
        super(name);   // Call parent constructor
        this.breed = breed;
    }

    @Override
    public void eat() { System.out.println(name + " eats dog food"); }

    public void bark() { System.out.println(name + " barks"); }
}

Dog d = new Dog("Buddy", "Labrador");
d.eat();    // "Buddy eats dog food" (overridden)
d.sleep();  // "Buddy sleeps" (inherited)
d.bark();   // "Buddy barks" (own method)
```

### Polymorphism

```java
// Compile-time (Method Overloading) — same name, different params
class Calculator {
    int add(int a, int b) { return a + b; }
    double add(double a, double b) { return a + b; }
    int add(int a, int b, int c) { return a + b + c; }
}

// Runtime (Method Overriding) — parent reference, child object
Animal a = new Dog("Rex", "Husky");  // Upcasting
a.eat();    // "Rex eats dog food" (Dog's version called at runtime)
// a.bark(); // ERROR — Animal reference doesn't know about bark()
```

### Abstraction — Abstract Classes and Interfaces

```java
// Abstract class
abstract class Shape {
    abstract double area();       // No body — subclass MUST implement
    abstract double perimeter();

    void display() {              // Concrete method — has body
        System.out.println("Area: " + area());
    }
}

class Circle extends Shape {
    double radius;
    Circle(double r) { this.radius = r; }

    @Override
    double area() { return Math.PI * radius * radius; }
    @Override
    double perimeter() { return 2 * Math.PI * radius; }
}

// Interface
interface Drawable {
    void draw();                          // Abstract (implicitly public abstract)
    default void fill(String color) {     // Default method (Java 8+)
        System.out.println("Filling with " + color);
    }
    static int getVersion() { return 1; } // Static method
}

interface Printable {
    void print();
}

// Class implementing multiple interfaces
class Canvas implements Drawable, Printable {
    @Override
    public void draw() { System.out.println("Drawing on canvas"); }
    @Override
    public void print() { System.out.println("Printing canvas"); }
}
```

| Feature | Abstract Class | Interface |
|---------|---------------|-----------|
| Methods | Abstract + Concrete | Abstract (+ default, static since Java 8) |
| Variables | Any type | Only `public static final` |
| Constructor | ✅ | ❌ |
| Multiple Inheritance | ❌ | ✅ |
| Access Modifiers | Any | `public` only |
| Keyword | `extends` | `implements` |

### Access Modifiers

| Modifier | Class | Package | Subclass | World |
|----------|:-----:|:-------:|:--------:|:-----:|
| `public` | ✅ | ✅ | ✅ | ✅ |
| `protected` | ✅ | ✅ | ✅ | ❌ |
| `default` | ✅ | ✅ | ❌ | ❌ |
| `private` | ✅ | ❌ | ❌ | ❌ |

---

## 9. Exception Handling

### 📌 Definition

**Exceptions** are runtime errors that disrupt normal program flow. Java's exception handling allows you to handle errors gracefully.

```
Throwable
├── Error (serious, unrecoverable — OutOfMemoryError, StackOverflowError)
└── Exception
    ├── Checked Exceptions (compile-time — IOException, SQLException)
    └── RuntimeException (unchecked — NullPointerException, ArrayIndexOutOfBoundsException)
```

### Try-Catch-Finally

```java
try {
    int result = 10 / 0;                    // ArithmeticException
    String s = null;
    s.length();                              // NullPointerException
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero: " + e.getMessage());
} catch (NullPointerException e) {
    System.out.println("Null reference: " + e.getMessage());
} catch (Exception e) {
    System.out.println("General error: " + e.getMessage());
} finally {
    System.out.println("Always executes — cleanup here");
}

// Multi-catch (Java 7+)
try {
    // risky code
} catch (IOException | SQLException e) {
    System.out.println("IO or SQL error: " + e.getMessage());
}

// Try-with-resources (Java 7+ — auto-closes resources)
try (BufferedReader br = new BufferedReader(new FileReader("file.txt"))) {
    String line = br.readLine();
} catch (IOException e) {
    e.printStackTrace();
}
// br is automatically closed
```

### Throw and Throws

```java
// throw — manually throw an exception
public static void validateAge(int age) {
    if (age < 0 || age > 150) {
        throw new IllegalArgumentException("Invalid age: " + age);
    }
}

// throws — declare that a method may throw exceptions
public static void readFile(String path) throws IOException {
    BufferedReader br = new BufferedReader(new FileReader(path));
    System.out.println(br.readLine());
    br.close();
}
```

### Custom Exceptions

```java
// Custom checked exception
class InsufficientBalanceException extends Exception {
    private double amount;

    public InsufficientBalanceException(String message, double amount) {
        super(message);
        this.amount = amount;
    }

    public double getAmount() { return amount; }
}

// Usage
public void withdraw(double amount) throws InsufficientBalanceException {
    if (amount > balance) {
        throw new InsufficientBalanceException("Insufficient funds", amount);
    }
    balance -= amount;
}
```

| Feature | Checked Exception | Unchecked Exception |
|---------|-------------------|---------------------|
| Checked at | Compile time | Runtime |
| Extends | `Exception` | `RuntimeException` |
| Must handle | ✅ (try-catch or throws) | ❌ (optional) |
| Examples | `IOException`, `SQLException` | `NullPointerException`, `ArithmeticException` |

---

## 10. Java Collections Framework

### Collection Hierarchy

```
Iterable
└── Collection
    ├── List (ordered, duplicates allowed)
    │   ├── ArrayList
    │   ├── LinkedList
    │   └── Vector → Stack
    ├── Set (unordered, no duplicates)
    │   ├── HashSet
    │   ├── LinkedHashSet
    │   └── TreeSet (sorted)
    └── Queue
        ├── PriorityQueue
        └── Deque
            └── ArrayDeque

Map (key-value pairs, keys unique)
├── HashMap
├── LinkedHashMap
├── TreeMap (sorted by key)
└── Hashtable
```

### List — ArrayList

```java
import java.util.ArrayList;
import java.util.Collections;

ArrayList<String> list = new ArrayList<>();

// Add
list.add("Apple");
list.add("Banana");
list.add("Cherry");
list.add(1, "Avocado");     // Insert at index 1

// Access
list.get(0);                // "Apple"
list.size();                // 4
list.contains("Banana");    // true
list.indexOf("Cherry");     // 3

// Modify
list.set(0, "Apricot");     // Replace at index 0

// Remove
list.remove("Banana");      // Remove by value
list.remove(0);             // Remove by index

// Iterate
for (String fruit : list) {
    System.out.println(fruit);
}
list.forEach(System.out::println);

// Sort
Collections.sort(list);                     // Natural order
Collections.sort(list, Collections.reverseOrder()); // Reverse
list.sort(String::compareTo);                // Using comparator
```

### Set — HashSet

```java
import java.util.HashSet;

HashSet<Integer> set = new HashSet<>();
set.add(10);
set.add(20);
set.add(30);
set.add(10);        // Duplicate ignored

set.size();         // 3
set.contains(20);   // true
set.remove(30);

for (int n : set) {
    System.out.println(n);  // Order not guaranteed
}

// TreeSet — sorted order
TreeSet<Integer> sortedSet = new TreeSet<>(set);
// LinkedHashSet — insertion order
LinkedHashSet<Integer> orderedSet = new LinkedHashSet<>(set);
```

### Map — HashMap

```java
import java.util.HashMap;

HashMap<String, Integer> map = new HashMap<>();

// Put
map.put("Alice", 90);
map.put("Bob", 85);
map.put("Charlie", 92);

// Get
map.get("Alice");           // 90
map.getOrDefault("Diana", 0); // 0

// Check
map.containsKey("Bob");     // true
map.containsValue(85);      // true
map.size();                  // 3

// Remove
map.remove("Bob");

// Iterate
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}
map.forEach((key, value) -> System.out.println(key + ": " + value));

// Keys and Values
map.keySet();     // Set of keys
map.values();     // Collection of values
```

### Queue — PriorityQueue

```java
import java.util.PriorityQueue;

PriorityQueue<Integer> pq = new PriorityQueue<>();  // Min-heap
pq.add(30);
pq.add(10);
pq.add(20);

pq.peek();   // 10 (smallest, doesn't remove)
pq.poll();   // 10 (smallest, removes)
pq.poll();   // 20

// Max-heap
PriorityQueue<Integer> maxPQ = new PriorityQueue<>(Collections.reverseOrder());
```

### Stream API

```java
import java.util.stream.*;

List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// Filter + Map + Collect
List<Integer> evenDoubled = numbers.stream()
    .filter(n -> n % 2 == 0)
    .map(n -> n * 2)
    .collect(Collectors.toList());
// [4, 8, 12, 16, 20]

// Reduce
int sum = numbers.stream()
    .reduce(0, Integer::sum);
// 55

// Count, Min, Max
long count = numbers.stream().filter(n -> n > 5).count();  // 5
Optional<Integer> max = numbers.stream().max(Integer::compareTo);

// String joining
String csv = List.of("A", "B", "C").stream()
    .collect(Collectors.joining(", "));  // "A, B, C"

// ForEach
numbers.stream().forEach(System.out::println);

// Sorted
numbers.stream().sorted(Comparator.reverseOrder())
    .forEach(System.out::println);
```

---

## 11. Functional Programming in Java

### Lambda Expressions

```java
// Lambda = anonymous function
// Syntax: (parameters) -> expression

// Before Lambda
Runnable r1 = new Runnable() {
    @Override
    public void run() { System.out.println("Hello"); }
};

// With Lambda
Runnable r2 = () -> System.out.println("Hello");

// Examples
Comparator<String> comp = (a, b) -> a.compareTo(b);
Predicate<Integer> isEven = n -> n % 2 == 0;
Function<String, Integer> length = s -> s.length();
Consumer<String> printer = s -> System.out.println(s);
Supplier<Double> random = () -> Math.random();
```

### Functional Interfaces

| Interface | Method | Input → Output |
|-----------|--------|---------------|
| `Predicate<T>` | `test(T)` | T → boolean |
| `Function<T,R>` | `apply(T)` | T → R |
| `Consumer<T>` | `accept(T)` | T → void |
| `Supplier<T>` | `get()` | () → T |
| `BiFunction<T,U,R>` | `apply(T,U)` | (T,U) → R |
| `UnaryOperator<T>` | `apply(T)` | T → T |
| `BinaryOperator<T>` | `apply(T,T)` | (T,T) → T |

### Method References

```java
// Reference to static method
Function<String, Integer> parse = Integer::parseInt;

// Reference to instance method
Function<String, String> upper = String::toUpperCase;

// Reference to constructor
Supplier<ArrayList<String>> listFactory = ArrayList::new;

// Usage
List<String> names = List.of("alice", "bob", "charlie");
names.stream().map(String::toUpperCase).forEach(System.out::println);
```

### Optional Class

```java
import java.util.Optional;

// Creating Optional
Optional<String> opt1 = Optional.of("Hello");       // Non-null
Optional<String> opt2 = Optional.ofNullable(null);   // May be null
Optional<String> opt3 = Optional.empty();             // Empty

// Checking
opt1.isPresent();     // true
opt2.isEmpty();       // true (Java 11+)

// Getting value
opt1.get();                          // "Hello"
opt2.orElse("Default");              // "Default"
opt2.orElseGet(() -> "Computed");     // "Computed"
opt2.orElseThrow(() -> new RuntimeException("No value"));

// Chaining
Optional<String> result = opt1
    .filter(s -> s.length() > 3)
    .map(String::toUpperCase);
// Optional["HELLO"]
```

---

## 12. Java I/O and File Handling

### File Operations with java.nio.file

```java
import java.nio.file.*;

// Read entire file
String content = Files.readString(Path.of("file.txt"));
List<String> lines = Files.readAllLines(Path.of("file.txt"));

// Write to file
Files.writeString(Path.of("output.txt"), "Hello World");
Files.write(Path.of("output.txt"), List.of("Line 1", "Line 2"));

// Append to file
Files.writeString(Path.of("output.txt"), "Appended text",
    StandardOpenOption.APPEND);

// Check file existence
Files.exists(Path.of("file.txt"));

// Create directories
Files.createDirectories(Path.of("a/b/c"));

// Copy, Move, Delete
Files.copy(Path.of("src.txt"), Path.of("dest.txt"), StandardCopyOption.REPLACE_EXISTING);
Files.move(Path.of("old.txt"), Path.of("new.txt"));
Files.delete(Path.of("temp.txt"));

// List files in directory
Files.list(Path.of(".")).forEach(System.out::println);
```

### Serialization and Deserialization

```java
import java.io.*;

// Class must implement Serializable
class Employee implements Serializable {
    private static final long serialVersionUID = 1L;
    String name;
    int age;
    transient String password;  // transient = not serialized

    Employee(String name, int age, String password) {
        this.name = name;
        this.age = age;
        this.password = password;
    }
}

// Serialize (object → file)
Employee emp = new Employee("Dilip", 22, "secret");
try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("emp.ser"))) {
    oos.writeObject(emp);
}

// Deserialize (file → object)
try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream("emp.ser"))) {
    Employee loaded = (Employee) ois.readObject();
    System.out.println(loaded.name);       // "Dilip"
    System.out.println(loaded.password);    // null (transient)
}
```

---

## 13. Multithreading and Concurrency

### Creating Threads

```java
// Method 1: Extend Thread class
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Thread running: " + Thread.currentThread().getName());
    }
}
new MyThread().start();

// Method 2: Implement Runnable interface
class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("Runnable running");
    }
}
new Thread(new MyRunnable()).start();

// Method 3: Lambda (Java 8+)
new Thread(() -> System.out.println("Lambda thread")).start();
```

### Thread Lifecycle

```
NEW → start() → RUNNABLE → run() → TERMINATED
                    ↕
              BLOCKED / WAITING / TIMED_WAITING
```

| State | Description |
|-------|-------------|
| `NEW` | Thread created but not started |
| `RUNNABLE` | Running or ready to run |
| `BLOCKED` | Waiting for a monitor lock |
| `WAITING` | Waiting indefinitely (wait(), join()) |
| `TIMED_WAITING` | Waiting with timeout (sleep(), wait(timeout)) |
| `TERMINATED` | Finished execution |

### Synchronization

```java
class Counter {
    private int count = 0;

    // synchronized method — only one thread at a time
    public synchronized void increment() {
        count++;
    }

    // synchronized block — finer control
    public void decrement() {
        synchronized (this) {
            count--;
        }
    }

    public int getCount() { return count; }
}
```

### java.util.concurrent

```java
import java.util.concurrent.*;

// ExecutorService — thread pool
ExecutorService executor = Executors.newFixedThreadPool(3);

executor.submit(() -> System.out.println("Task 1"));
executor.submit(() -> System.out.println("Task 2"));

// Callable + Future — return value from thread
Future<Integer> future = executor.submit(() -> {
    Thread.sleep(1000);
    return 42;
});
int result = future.get();  // Blocks until result is ready

executor.shutdown();

// CountDownLatch
CountDownLatch latch = new CountDownLatch(3);
// Each thread calls: latch.countDown();
// Main thread calls: latch.await(); // Waits until count reaches 0

// ConcurrentHashMap — thread-safe map
ConcurrentHashMap<String, Integer> concurrentMap = new ConcurrentHashMap<>();
concurrentMap.put("key", 1);

// AtomicInteger — thread-safe integer
AtomicInteger atomicCount = new AtomicInteger(0);
atomicCount.incrementAndGet();  // Thread-safe increment
```

---

## 14. Debugging with IntelliJ IDEA

### What is Debugging?

**Debugging** is the process of finding and fixing errors (bugs) in code by stepping through execution and inspecting state.

### Key Debugging Features in IntelliJ

| Feature | Shortcut | Description |
|---------|----------|-------------|
| **Set Breakpoint** | Click line gutter (or `Ctrl+F8`) | Execution pauses here |
| **Run Debugger** | `Shift+F9` | Start in debug mode |
| **Step Over** | `F8` | Execute current line, move to next |
| **Step Into** | `F7` | Enter the method call |
| **Step Out** | `Shift+F8` | Exit current method |
| **Resume** | `F9` | Continue until next breakpoint |
| **Evaluate Expression** | `Alt+F8` | Evaluate any expression |
| **Watch** | In Variables panel | Monitor specific variables |

### Debugging Workflow

```
1. Set breakpoints at suspicious lines
2. Run in Debug mode (Shift+F9)
3. Execution pauses at breakpoint
4. Inspect variables in the Variables panel
5. Step through code (F8 over, F7 into)
6. Use Evaluate Expression (Alt+F8) for testing
7. Add Watch expressions for complex values
8. Use Conditional Breakpoints for specific scenarios
```

### Types of Breakpoints

| Type | Purpose |
|------|---------|
| **Line Breakpoint** | Pause at a specific line |
| **Conditional Breakpoint** | Pause only when condition is true |
| **Exception Breakpoint** | Pause when specific exception is thrown |
| **Method Breakpoint** | Pause when entering/exiting a method |

---

## 15. Reactive Programming

### 📌 Fundamentals

**Reactive Programming** is an asynchronous programming paradigm focused on data streams and propagation of change. It's useful for handling large-scale, high-throughput, or event-driven systems.

### Key Principles

| Principle | Description |
|-----------|-------------|
| **Responsive** | System responds in a timely manner |
| **Resilient** | Stays responsive in case of failure |
| **Elastic** | Stays responsive under varying workload |
| **Message-Driven** | Uses asynchronous message passing |

### Reactive Streams

The **Reactive Streams** specification defines 4 interfaces:

| Interface | Role |
|-----------|------|
| `Publisher<T>` | Produces data (like Observable) |
| `Subscriber<T>` | Consumes data |
| `Subscription` | Controls flow between publisher and subscriber |
| `Processor<T,R>` | Both publisher and subscriber |

### Backpressure

**Backpressure** is a mechanism where the subscriber tells the publisher how many items it can handle, preventing overwhelming.

```
Publisher → [10 items/sec] → Subscriber (can handle 3/sec)
                ↑
        Backpressure: "Send me only 3 at a time"
```

### Project Reactor Basics

```java
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

// Mono — 0 or 1 element
Mono<String> mono = Mono.just("Hello");
mono.subscribe(System.out::println);

// Flux — 0 to N elements
Flux<Integer> flux = Flux.just(1, 2, 3, 4, 5);
flux.filter(n -> n % 2 == 0)
    .map(n -> n * 10)
    .subscribe(System.out::println);
// Output: 20, 40

// Create from range
Flux.range(1, 5).subscribe(System.out::println);

// Error handling
Flux.just(1, 2, 3)
    .map(n -> {
        if (n == 2) throw new RuntimeException("Error!");
        return n;
    })
    .onErrorReturn(-1)
    .subscribe(System.out::println);
// Output: 1, -1
```

---

## 16. Java Modules

### 📌 What is Modular Programming?

**Java Platform Module System (JPMS)** introduced in Java 9 allows organizing code into self-contained modules with explicit dependencies.

### Module Structure

```
my-module/
├── module-info.java       ← Module descriptor
└── com/
    └── example/
        └── MyClass.java
```

### Creating a Module

```java
// module-info.java
module com.myapp {
    requires java.base;        // (implicit, always available)
    requires java.sql;         // Depends on java.sql module
    requires java.net.http;    // Depends on HTTP client

    exports com.myapp.api;     // Makes this package public
    exports com.myapp.model;

    opens com.myapp.internal to com.google.gson; // Open for reflection
}
```

| Directive | Purpose |
|-----------|---------|
| `requires` | Declare dependency on another module |
| `exports` | Make a package accessible to other modules |
| `opens` | Allow reflection access to a package |
| `uses` | Declare that this module uses a service |
| `provides` | Provide an implementation of a service |

---

## 17. Java Networking

### Basics of Networking

```java
import java.net.*;

// Get host info
InetAddress addr = InetAddress.getByName("www.google.com");
addr.getHostAddress();    // IP address
addr.getHostName();       // Hostname

InetAddress local = InetAddress.getLocalHost();
System.out.println("My IP: " + local.getHostAddress());
```

### TCP Communication (Socket Programming)

```java
// ===== TCP SERVER =====
import java.net.*;
import java.io.*;

ServerSocket server = new ServerSocket(8080);
System.out.println("Server listening on port 8080...");

Socket client = server.accept();  // Wait for client
BufferedReader in = new BufferedReader(new InputStreamReader(client.getInputStream()));
PrintWriter out = new PrintWriter(client.getOutputStream(), true);

String message = in.readLine();
System.out.println("Received: " + message);
out.println("Hello from server!");

client.close();
server.close();

// ===== TCP CLIENT =====
Socket socket = new Socket("localhost", 8080);
PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));

out.println("Hello from client!");
String response = in.readLine();
System.out.println("Server said: " + response);

socket.close();
```

### UDP Communication

```java
// ===== UDP SENDER =====
DatagramSocket socket = new DatagramSocket();
byte[] data = "Hello UDP".getBytes();
DatagramPacket packet = new DatagramPacket(data, data.length,
    InetAddress.getByName("localhost"), 9090);
socket.send(packet);
socket.close();

// ===== UDP RECEIVER =====
DatagramSocket socket = new DatagramSocket(9090);
byte[] buffer = new byte[1024];
DatagramPacket packet = new DatagramPacket(buffer, buffer.length);
socket.receive(packet);   // Blocking
String message = new String(packet.getData(), 0, packet.getLength());
System.out.println("Received: " + message);
socket.close();
```

### HTTP Client (Java 11+)

```java
import java.net.http.*;
import java.net.URI;

HttpClient client = HttpClient.newHttpClient();

// GET request
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://jsonplaceholder.typicode.com/todos/1"))
    .GET()
    .build();

HttpResponse<String> response = client.send(request,
    HttpResponse.BodyHandlers.ofString());

System.out.println("Status: " + response.statusCode());
System.out.println("Body: " + response.body());

// POST request
HttpRequest postRequest = HttpRequest.newBuilder()
    .uri(URI.create("https://jsonplaceholder.typicode.com/posts"))
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(
        "{\"title\":\"Hello\",\"body\":\"World\",\"userId\":1}"))
    .build();

HttpResponse<String> postResponse = client.send(postRequest,
    HttpResponse.BodyHandlers.ofString());
```

| Protocol | TCP | UDP |
|----------|-----|-----|
| Connection | Connection-oriented | Connectionless |
| Reliability | ✅ Guaranteed delivery | ❌ No guarantee |
| Speed | Slower | Faster |
| Order | ✅ In-order delivery | ❌ No ordering |
| Use case | HTTP, Email, File transfer | Streaming, Gaming, DNS |

---

## 18. Reverse Engineering Concepts

### 📌 Definition

**Reverse engineering** in Java is the process of analyzing compiled code to understand its structure, behavior, or vulnerabilities.

### Key Concepts

| Concept | Description |
|---------|-------------|
| **Decompilation** | Converting `.class` bytecode back to `.java` source |
| **Bytecode Analysis** | Reading JVM instructions (`.class` files) |
| **Reflection** | Inspecting/modifying classes, methods, fields at runtime |
| **Obfuscation** | Making code hard to reverse-engineer |

### Java Bytecode

```bash
# View bytecode of a class
javap -c MyClass.class

# View detailed bytecode
javap -v MyClass.class
```

### Reflection

```java
import java.lang.reflect.*;

Class<?> clazz = Class.forName("com.example.Student");

// Get class info
System.out.println("Name: " + clazz.getName());
System.out.println("Superclass: " + clazz.getSuperclass().getName());

// Get methods
Method[] methods = clazz.getDeclaredMethods();
for (Method m : methods) {
    System.out.println(m.getName() + " - " + m.getReturnType());
}

// Get fields
Field[] fields = clazz.getDeclaredFields();
for (Field f : fields) {
    System.out.println(f.getName() + " : " + f.getType());
}

// Create instance dynamically
Object obj = clazz.getDeclaredConstructor(String.class, int.class)
    .newInstance("Dilip", 22);

// Call method dynamically
Method method = clazz.getMethod("getName");
String name = (String) method.invoke(obj);

// Access private field
Field field = clazz.getDeclaredField("age");
field.setAccessible(true);
int age = (int) field.get(obj);
```

### Code Obfuscation

Tools like **ProGuard** and **R8** rename classes, methods, and variables to meaningless names to prevent reverse engineering.

```
Before: public class UserService { public void login() {} }
After:  public class a { public void b() {} }
```

---

## 19. Java 17 and 21 Features

### Java 17 Features

#### Sealed Classes and Interfaces

```java
// Only specified classes can extend/implement
public sealed class Shape
    permits Circle, Rectangle, Triangle {
    // ...
}

final class Circle extends Shape { double radius; }
final class Rectangle extends Shape { double width, height; }
non-sealed class Triangle extends Shape { /* anyone can extend */ }
```

#### Pattern Matching for instanceof

```java
// Before Java 16
if (obj instanceof String) {
    String s = (String) obj;
    System.out.println(s.length());
}

// Java 16+ — pattern matching
if (obj instanceof String s) {
    System.out.println(s.length());  // s already cast
}
```

#### Text Blocks

```java
// Multi-line strings (Java 13+)
String json = """
    {
        "name": "Dilip",
        "age": 22,
        "city": "Mumbai"
    }
    """;

String html = """
    <html>
        <body>
            <h1>Hello</h1>
        </body>
    </html>
    """;
```

#### Records

```java
// Compact data class — auto-generates constructor, getters, equals, hashCode, toString
public record Point(int x, int y) { }

Point p = new Point(10, 20);
p.x();       // 10 (accessor, not getX())
p.y();       // 20
System.out.println(p);  // Point[x=10, y=20]

// Record with validation
public record Person(String name, int age) {
    public Person {  // Compact constructor
        if (age < 0) throw new IllegalArgumentException("Age cannot be negative");
        name = name.trim();
    }
}
```

#### Switch Expression Enhancements

```java
// Arrow syntax + multiple values
String result = switch (day) {
    case "Mon", "Tue", "Wed", "Thu", "Fri" -> "Weekday";
    case "Sat", "Sun" -> "Weekend";
    default -> throw new IllegalArgumentException();
};

// With yield for blocks
int numLetters = switch (day) {
    case "Mon", "Fri", "Sun" -> 3;
    case "Tue" -> 3;
    case "Wed" -> 3;
    case "Thu", "Sat" -> {
        System.out.println("Calculating...");
        yield 3;
    }
    default -> throw new IllegalArgumentException();
};
```

### Java 21 Features

#### String Templates (Preview)

```java
// String templates with STR processor (preview)
String name = "Dilip";
int age = 22;
// String greeting = STR."Hello, \{name}! You are \{age} years old.";
// Note: This is a preview feature
```

#### Sequenced Collections

```java
// New interfaces: SequencedCollection, SequencedSet, SequencedMap
// Provide first/last access and reversed views

List<String> list = new ArrayList<>(List.of("A", "B", "C"));
list.getFirst();        // "A"
list.getLast();          // "C"
list.addFirst("Z");     // ["Z", "A", "B", "C"]
list.addLast("D");      // ["Z", "A", "B", "C", "D"]
list.reversed();        // Reversed view

LinkedHashSet<String> set = new LinkedHashSet<>(List.of("X", "Y", "Z"));
set.getFirst();         // "X"
set.getLast();           // "Z"

LinkedHashMap<String, Integer> map = new LinkedHashMap<>();
map.put("A", 1);
map.put("B", 2);
map.firstEntry();       // A=1
map.lastEntry();        // B=2
```

#### Pattern Matching for switch

```java
// Pattern matching in switch (Java 21)
static String formatValue(Object obj) {
    return switch (obj) {
        case Integer i -> "Integer: " + i;
        case String s  -> "String: " + s;
        case Double d  -> "Double: " + d;
        case null      -> "null";
        default        -> "Unknown: " + obj;
    };
}

// Record patterns
record Point(int x, int y) {}

static void printPoint(Object obj) {
    if (obj instanceof Point(int x, int y)) {
        System.out.println("x=" + x + ", y=" + y);
    }
}
```

#### Virtual Threads (Project Loom)

```java
// Virtual threads — lightweight, managed by JVM (not OS)
// Can create millions of them

// Create virtual thread
Thread vt = Thread.ofVirtual().start(() -> {
    System.out.println("Running on: " + Thread.currentThread());
});

// Using Executors
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    for (int i = 0; i < 10000; i++) {
        executor.submit(() -> {
            Thread.sleep(Duration.ofSeconds(1));
            return "Done";
        });
    }
}

// Virtual threads are ideal for I/O-bound tasks
// They're NOT faster for CPU-bound tasks
```

| Feature | Platform Threads | Virtual Threads |
|---------|-----------------|-----------------|
| Managed by | OS | JVM |
| Memory | ~1MB stack per thread | Few KB |
| Scalability | Thousands | Millions |
| Best for | CPU-bound tasks | I/O-bound tasks |
| Blocking | Blocks OS thread | Only blocks virtual thread |

---

## 20. JDBC — Java Database Connectivity

### 📌 What is JDBC?

**JDBC (Java Database Connectivity)** is an API that allows Java applications to interact with relational databases.

### JDBC Architecture

```
Java Application → JDBC API → JDBC Driver → Database (MySQL, PostgreSQL, etc.)
```

### JDBC Steps

```java
import java.sql.*;

public class JDBCExample {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/company_db";
        String user = "root";
        String password = "password";

        // 1. Load driver (optional in newer versions)
        // Class.forName("com.mysql.cj.jdbc.Driver");

        // 2. Establish connection
        try (Connection conn = DriverManager.getConnection(url, user, password)) {

            // 3. Create statement
            Statement stmt = conn.createStatement();

            // 4. Execute query
            ResultSet rs = stmt.executeQuery("SELECT * FROM employees");

            // 5. Process results
            while (rs.next()) {
                int id = rs.getInt("emp_id");
                String name = rs.getString("first_name");
                double salary = rs.getDouble("salary");
                System.out.println(id + " - " + name + " - " + salary);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        // 6. Connection auto-closed by try-with-resources
    }
}
```

### PreparedStatement (Prevents SQL Injection)

```java
String sql = "SELECT * FROM employees WHERE dept_id = ? AND salary > ?";

try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
    pstmt.setInt(1, 1);          // Set first ? to 1
    pstmt.setDouble(2, 60000);   // Set second ? to 60000

    ResultSet rs = pstmt.executeQuery();
    while (rs.next()) {
        System.out.println(rs.getString("first_name") + " - " + rs.getDouble("salary"));
    }
}

// INSERT with PreparedStatement
String insertSQL = "INSERT INTO employees (first_name, last_name, salary, dept_id) VALUES (?, ?, ?, ?)";
try (PreparedStatement pstmt = conn.prepareStatement(insertSQL)) {
    pstmt.setString(1, "New");
    pstmt.setString(2, "Employee");
    pstmt.setDouble(3, 55000);
    pstmt.setInt(4, 1);
    int rowsAffected = pstmt.executeUpdate();
    System.out.println(rowsAffected + " row(s) inserted");
}

// UPDATE
String updateSQL = "UPDATE employees SET salary = ? WHERE emp_id = ?";
try (PreparedStatement pstmt = conn.prepareStatement(updateSQL)) {
    pstmt.setDouble(1, 70000);
    pstmt.setInt(2, 1);
    pstmt.executeUpdate();
}

// DELETE
String deleteSQL = "DELETE FROM employees WHERE emp_id = ?";
try (PreparedStatement pstmt = conn.prepareStatement(deleteSQL)) {
    pstmt.setInt(1, 10);
    pstmt.executeUpdate();
}
```

### Handling Transactions

```java
Connection conn = DriverManager.getConnection(url, user, password);

try {
    conn.setAutoCommit(false);  // Disable auto-commit

    PreparedStatement pstmt1 = conn.prepareStatement(
        "UPDATE accounts SET balance = balance - ? WHERE id = ?");
    pstmt1.setDouble(1, 1000);
    pstmt1.setInt(2, 1);
    pstmt1.executeUpdate();

    PreparedStatement pstmt2 = conn.prepareStatement(
        "UPDATE accounts SET balance = balance + ? WHERE id = ?");
    pstmt2.setDouble(1, 1000);
    pstmt2.setInt(2, 2);
    pstmt2.executeUpdate();

    conn.commit();   // Both succeed → commit
    System.out.println("Transaction successful");

} catch (SQLException e) {
    conn.rollback(); // Any failure → rollback everything
    System.out.println("Transaction rolled back");
    e.printStackTrace();
} finally {
    conn.setAutoCommit(true);
    conn.close();
}
```

| JDBC Class/Interface | Purpose |
|---------------------|---------|
| `DriverManager` | Manages database drivers |
| `Connection` | Represents database connection |
| `Statement` | Executes static SQL |
| `PreparedStatement` | Executes parameterized SQL (safer) |
| `CallableStatement` | Executes stored procedures |
| `ResultSet` | Holds query results |

---

## 21. Practice Questions

### Multiple Choice Questions

**Q1.** What does JVM stand for?
- a) Java Visual Machine
- b) Java Virtual Machine ✅
- c) Java Variable Manager
- d) Java Version Manager

**Q2.** Which is NOT a primitive data type in Java?
- a) `int`
- b) `boolean`
- c) `String` ✅
- d) `char`

**Q3.** What is the output of `10 / 3` in Java (both integers)?
- a) `3.33`
- b) `3` ✅
- c) `4`
- d) `3.0`

**Q4.** What keyword is used to inherit from a class?
- a) `implements`
- b) `inherits`
- c) `extends` ✅
- d) `super`

**Q5.** Which collection does NOT allow duplicate elements?
- a) `ArrayList`
- b) `LinkedList`
- c) `HashSet` ✅
- d) `Vector`

**Q6.** What is the purpose of the `final` keyword on a variable?
- a) Makes it static
- b) Makes it constant (cannot be reassigned) ✅
- c) Makes it public
- d) Makes it thread-safe

**Q7.** What is method overloading?
- a) Same method name, same parameters, different classes
- b) Same method name, different parameters in the same class ✅
- c) Different method names
- d) Same method name in parent and child class

**Q8.** What does `try-with-resources` do?
- a) Catches all exceptions
- b) Automatically closes resources when done ✅
- c) Retries failed code
- d) Creates backup resources

**Q9.** What is a lambda expression?
- a) A type of loop
- b) An anonymous function that can be passed as an argument ✅
- c) A special class
- d) A type of exception

**Q10.** What is the difference between `HashMap` and `TreeMap`?
- a) No difference
- b) `HashMap` is unordered, `TreeMap` is sorted by key ✅
- c) `TreeMap` allows duplicates
- d) `HashMap` is sorted

**Q11.** What does the `synchronized` keyword do?
- a) Makes methods faster
- b) Ensures only one thread can execute the code at a time ✅
- c) Creates a new thread
- d) Stops all threads

**Q12.** What is a Record in Java?
- a) A way to record logs
- b) A compact class that auto-generates constructor, getters, equals, hashCode, and toString ✅
- c) A database table
- d) A file format

**Q13.** What does `PreparedStatement` prevent?
- a) Null pointer exceptions
- b) SQL injection attacks ✅
- c) Connection timeouts
- d) Data loss

**Q14.** What are Virtual Threads (Java 21)?
- a) Threads that run in virtual machines
- b) Lightweight threads managed by the JVM, not the OS ✅
- c) Threads for virtual reality applications
- d) A deprecated threading model

**Q15.** What is the Reactive Streams `Publisher` responsible for?
- a) Consuming data
- b) Producing and sending data to subscribers ✅
- c) Managing database connections
- d) Handling exceptions

**Q16.** What does `sealed` mean for a class in Java 17?
- a) The class cannot have any subclasses
- b) Only specifically permitted classes can extend it ✅
- c) The class is encrypted
- d) The class is abstract

**Q17.** What interface must a class implement to be serializable?
- a) `Cloneable`
- b) `Serializable` ✅
- c) `Comparable`
- d) `Iterable`

**Q18.** What is the `transient` keyword used for?
- a) Making a variable static
- b) Preventing a field from being serialized ✅
- c) Making a variable thread-safe
- d) Making a variable constant

---

> ✅ **Core Java Complete!** All 3 Modules are done! Go back to [Master Index →](../../README.md)
