# ☕ Java Programming - Cognizant Assessment Preparation

## 📋 Topics Covered
1. [Object-Oriented Programming (OOP)](#1-object-oriented-programming-oop)
2. [Control Flow Statements](#2-control-flow-statements)
3. [String Handling](#3-string-handling)
4. [Arrays](#4-arrays)
5. [Collections Framework](#5-collections-framework)
6. [Exception Handling](#6-exception-handling)
7. [Date and Time API](#7-date-and-time-api)
8. [Problem Solving Examples](#8-problem-solving-examples)

---

## 1. Object-Oriented Programming (OOP)

### 📌 Definition
OOP is a programming paradigm based on the concept of **objects** which contain data (fields/attributes) and code (methods). Java is a fully object-oriented language.

### 🔑 Four Pillars of OOP

#### 1.1 Encapsulation
> **Definition**: Wrapping data (variables) and methods together as a single unit. Data is hidden using `private` access modifiers and accessed via `getters` and `setters`.

```java
public class Employee {
    // Private fields - data hiding
    private String name;
    private int age;
    private double salary;

    // Constructor
    public Employee(String name, int age, double salary) {
        this.name = name;
        this.age = age;
        this.salary = salary;
    }

    // Getter methods
    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    public double getSalary() {
        return salary;
    }

    // Setter methods with validation
    public void setName(String name) {
        if (name != null && !name.isEmpty()) {
            this.name = name;
        }
    }

    public void setAge(int age) {
        if (age > 0 && age < 120) {
            this.age = age;
        }
    }

    public void setSalary(double salary) {
        if (salary >= 0) {
            this.salary = salary;
        }
    }

    public void displayInfo() {
        System.out.println("Name: " + name + ", Age: " + age + ", Salary: " + salary);
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        Employee emp = new Employee("Dilip", 22, 50000);
        emp.displayInfo();           // Name: Dilip, Age: 22, Salary: 50000.0
        emp.setSalary(60000);
        System.out.println(emp.getSalary()); // 60000.0
    }
}
```

#### 1.2 Inheritance
> **Definition**: A mechanism where one class (child/subclass) inherits properties and methods from another class (parent/superclass). Promotes code reusability.

**Types of Inheritance in Java:**
| Type | Description | Supported? |
|------|-------------|------------|
| Single | One child, one parent | ✅ Yes |
| Multilevel | Chain of inheritance (A → B → C) | ✅ Yes |
| Hierarchical | Multiple children, one parent | ✅ Yes |
| Multiple | One child, multiple parents | ❌ No (use interfaces) |
| Hybrid | Combination of types | ❌ No (use interfaces) |

```java
// Parent class
class Animal {
    String name;
    
    public Animal(String name) {
        this.name = name;
    }
    
    public void eat() {
        System.out.println(name + " is eating");
    }
    
    public void sleep() {
        System.out.println(name + " is sleeping");
    }
}

// Child class - Single Inheritance
class Dog extends Animal {
    String breed;
    
    public Dog(String name, String breed) {
        super(name); // calling parent constructor
        this.breed = breed;
    }
    
    public void bark() {
        System.out.println(name + " is barking");
    }
    
    // Method overriding
    @Override
    public void eat() {
        System.out.println(name + " is eating dog food");
    }
}

// Multilevel Inheritance
class Puppy extends Dog {
    public Puppy(String name, String breed) {
        super(name, breed);
    }
    
    public void play() {
        System.out.println(name + " puppy is playing");
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog("Buddy", "Labrador");
        dog.eat();    // Buddy is eating dog food (overridden)
        dog.sleep();  // Buddy is sleeping (inherited)
        dog.bark();   // Buddy is barking (own method)
        
        Puppy puppy = new Puppy("Max", "Golden Retriever");
        puppy.eat();   // Max is eating dog food
        puppy.play();  // Max puppy is playing
    }
}
```

#### 1.3 Polymorphism
> **Definition**: The ability of an object to take many forms. Same method name behaves differently based on the context.

**Two Types:**
- **Compile-time (Static)** → Method Overloading
- **Runtime (Dynamic)** → Method Overriding

```java
// ===== METHOD OVERLOADING (Compile-time Polymorphism) =====
class Calculator {
    // Same method name, different parameters
    public int add(int a, int b) {
        return a + b;
    }
    
    public int add(int a, int b, int c) {
        return a + b + c;
    }
    
    public double add(double a, double b) {
        return a + b;
    }
    
    public String add(String a, String b) {
        return a + b; // String concatenation
    }
}

// ===== METHOD OVERRIDING (Runtime Polymorphism) =====
class Shape {
    public double calculateArea() {
        return 0;
    }
    
    public void display() {
        System.out.println("This is a shape");
    }
}

class Circle extends Shape {
    double radius;
    
    public Circle(double radius) {
        this.radius = radius;
    }
    
    @Override
    public double calculateArea() {
        return Math.PI * radius * radius;
    }
    
    @Override
    public void display() {
        System.out.println("Circle with area: " + calculateArea());
    }
}

class Rectangle extends Shape {
    double length, width;
    
    public Rectangle(double length, double width) {
        this.length = length;
        this.width = width;
    }
    
    @Override
    public double calculateArea() {
        return length * width;
    }
    
    @Override
    public void display() {
        System.out.println("Rectangle with area: " + calculateArea());
    }
}

// Usage - Runtime polymorphism
public class Main {
    public static void main(String[] args) {
        Shape shape1 = new Circle(5);       // Upcasting
        Shape shape2 = new Rectangle(4, 6); // Upcasting
        
        shape1.display(); // Circle with area: 78.53...
        shape2.display(); // Rectangle with area: 24.0
        
        // Method overloading
        Calculator calc = new Calculator();
        System.out.println(calc.add(2, 3));        // 5
        System.out.println(calc.add(2, 3, 4));     // 9
        System.out.println(calc.add(2.5, 3.5));    // 6.0
    }
}
```

#### 1.4 Abstraction
> **Definition**: Hiding implementation details and showing only the functionality to the user. Achieved using **abstract classes** and **interfaces**.

```java
// ===== ABSTRACT CLASS =====
abstract class Vehicle {
    String brand;
    int year;
    
    public Vehicle(String brand, int year) {
        this.brand = brand;
        this.year = year;
    }
    
    // Abstract method - no body, must be implemented by subclass
    abstract void start();
    abstract void stop();
    abstract double getFuelEfficiency();
    
    // Concrete method - has body
    public void displayInfo() {
        System.out.println("Brand: " + brand + ", Year: " + year);
    }
}

class Car extends Vehicle {
    public Car(String brand, int year) {
        super(brand, year);
    }
    
    @Override
    void start() {
        System.out.println(brand + " car started with key ignition");
    }
    
    @Override
    void stop() {
        System.out.println(brand + " car stopped");
    }
    
    @Override
    double getFuelEfficiency() {
        return 15.5; // km per liter
    }
}

class ElectricCar extends Vehicle {
    public ElectricCar(String brand, int year) {
        super(brand, year);
    }
    
    @Override
    void start() {
        System.out.println(brand + " electric car started silently");
    }
    
    @Override
    void stop() {
        System.out.println(brand + " electric car stopped with regenerative braking");
    }
    
    @Override
    double getFuelEfficiency() {
        return 0; // No fuel needed
    }
}

// ===== INTERFACE =====
interface Drawable {
    void draw();           // abstract by default
    double getPerimeter(); // abstract by default
    
    // Default method (Java 8+)
    default void printInfo() {
        System.out.println("This is a drawable object");
    }
    
    // Static method
    static int getVersion() {
        return 1;
    }
}

interface Colorable {
    void setColor(String color);
    String getColor();
}

// A class can implement multiple interfaces
class DrawableCircle implements Drawable, Colorable {
    double radius;
    String color;
    
    public DrawableCircle(double radius) {
        this.radius = radius;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing circle with radius: " + radius);
    }
    
    @Override
    public double getPerimeter() {
        return 2 * Math.PI * radius;
    }
    
    @Override
    public void setColor(String color) {
        this.color = color;
    }
    
    @Override
    public String getColor() {
        return color;
    }
}
```

### Abstract Class vs Interface

| Feature | Abstract Class | Interface |
|---------|---------------|-----------|
| Methods | Abstract + Concrete | All abstract (before Java 8) |
| Variables | Any type | Only `public static final` |
| Constructor | ✅ Yes | ❌ No |
| Multiple Inheritance | ❌ No | ✅ Yes |
| Access Modifiers | Any | Only `public` |
| `extends` / `implements` | `extends` | `implements` |
| When to use | Partial abstraction | Full abstraction |

---

### Access Modifiers

| Modifier | Class | Package | Subclass | World |
|----------|-------|---------|----------|-------|
| `public` | ✅ | ✅ | ✅ | ✅ |
| `protected` | ✅ | ✅ | ✅ | ❌ |
| `default` (no modifier) | ✅ | ✅ | ❌ | ❌ |
| `private` | ✅ | ❌ | ❌ | ❌ |

---

### `this` vs `super` Keyword

| Keyword | Purpose |
|---------|---------|
| `this` | Refers to current class object |
| `this()` | Calls current class constructor |
| `super` | Refers to parent class object |
| `super()` | Calls parent class constructor |

---

### `static` Keyword

```java
class MathUtils {
    // Static variable - shared across all instances
    static int objectCount = 0;
    
    // Static method - belongs to class, not instance
    public static int square(int n) {
        return n * n;
    }
    
    public static int cube(int n) {
        return n * n * n;
    }
    
    // Static block - runs once when class is loaded
    static {
        System.out.println("MathUtils class loaded");
    }
    
    public MathUtils() {
        objectCount++;
    }
}

// Usage
System.out.println(MathUtils.square(5));  // 25 - No object needed
System.out.println(MathUtils.objectCount); // 0
new MathUtils();
System.out.println(MathUtils.objectCount); // 1
```

### `final` Keyword

```java
// final variable - cannot be changed
final int MAX_VALUE = 100;

// final method - cannot be overridden
class Parent {
    final void display() {
        System.out.println("Cannot override this");
    }
}

// final class - cannot be inherited
final class Constants {
    static final double PI = 3.14159;
}
```

---

## 2. Control Flow Statements

### 2.1 Conditional Statements

```java
// ===== IF-ELSE =====
int marks = 85;

if (marks >= 90) {
    System.out.println("Grade: A+");
} else if (marks >= 80) {
    System.out.println("Grade: A");
} else if (marks >= 70) {
    System.out.println("Grade: B");
} else if (marks >= 60) {
    System.out.println("Grade: C");
} else {
    System.out.println("Grade: F");
}

// ===== TERNARY OPERATOR =====
int age = 20;
String result = (age >= 18) ? "Adult" : "Minor";
System.out.println(result); // Adult

// ===== SWITCH STATEMENT =====
int day = 3;
switch (day) {
    case 1:
        System.out.println("Monday");
        break;
    case 2:
        System.out.println("Tuesday");
        break;
    case 3:
        System.out.println("Wednesday");
        break;
    case 4:
        System.out.println("Thursday");
        break;
    case 5:
        System.out.println("Friday");
        break;
    case 6:
    case 7:
        System.out.println("Weekend");
        break;
    default:
        System.out.println("Invalid day");
}

// ===== ENHANCED SWITCH (Java 14+) =====
String dayName = switch (day) {
    case 1 -> "Monday";
    case 2 -> "Tuesday";
    case 3 -> "Wednesday";
    case 4 -> "Thursday";
    case 5 -> "Friday";
    case 6, 7 -> "Weekend";
    default -> "Invalid";
};
```

### 2.2 Looping Statements

```java
// ===== FOR LOOP =====
// Print numbers 1 to 10
for (int i = 1; i <= 10; i++) {
    System.out.print(i + " ");
}
// Output: 1 2 3 4 5 6 7 8 9 10

// ===== WHILE LOOP =====
int count = 1;
while (count <= 5) {
    System.out.print(count + " ");
    count++;
}
// Output: 1 2 3 4 5

// ===== DO-WHILE LOOP =====
// Executes at least once
int num = 1;
do {
    System.out.print(num + " ");
    num++;
} while (num <= 5);
// Output: 1 2 3 4 5

// ===== FOR-EACH (Enhanced For Loop) =====
int[] numbers = {10, 20, 30, 40, 50};
for (int n : numbers) {
    System.out.print(n + " ");
}
// Output: 10 20 30 40 50

// ===== BREAK AND CONTINUE =====
// break - exits the loop
for (int i = 1; i <= 10; i++) {
    if (i == 5) break;
    System.out.print(i + " ");
}
// Output: 1 2 3 4

// continue - skips current iteration
for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) continue; // skip even numbers
    System.out.print(i + " ");
}
// Output: 1 3 5 7 9
```

### 2.3 Nested Loops - Pattern Examples

```java
// Right Triangle Pattern
// *
// **
// ***
// ****
// *****
for (int i = 1; i <= 5; i++) {
    for (int j = 1; j <= i; j++) {
        System.out.print("* ");
    }
    System.out.println();
}

// Number Pyramid
// 1
// 12
// 123
// 1234
// 12345
for (int i = 1; i <= 5; i++) {
    for (int j = 1; j <= i; j++) {
        System.out.print(j);
    }
    System.out.println();
}

// Inverted Triangle
// *****
// ****
// ***
// **
// *
for (int i = 5; i >= 1; i--) {
    for (int j = 1; j <= i; j++) {
        System.out.print("* ");
    }
    System.out.println();
}
```

---

## 3. String Handling

### 📌 Definition
Strings in Java are **immutable** objects representing a sequence of characters. Once created, the value cannot be changed.

### 3.1 String Creation

```java
// Two ways to create strings
String str1 = "Hello";               // String literal (String Pool)
String str2 = new String("Hello");    // Using new keyword (Heap)

// String pool comparison
String a = "Hello";
String b = "Hello";
System.out.println(a == b);           // true (same reference in pool)
System.out.println(a == str2);        // false (different memory)
System.out.println(a.equals(str2));   // true (same content)
```

### 3.2 Important String Methods

```java
String str = "Hello World Java";

// Length
str.length();                    // 16

// Character at index
str.charAt(0);                   // 'H'
str.charAt(5);                   // ' '

// Substring
str.substring(6);                // "World Java"
str.substring(6, 11);            // "World"

// Index of
str.indexOf('o');                 // 4 (first occurrence)
str.lastIndexOf('o');             // 7
str.indexOf("World");             // 6
str.indexOf("xyz");               // -1 (not found)

// Case conversion
str.toUpperCase();                // "HELLO WORLD JAVA"
str.toLowerCase();                // "hello world java"

// Trim (removes leading/trailing spaces)
"  Hello  ".trim();               // "Hello"

// Replace
str.replace('l', 'L');            // "HeLLo WorLd Java"
str.replace("World", "Earth");    // "Hello Earth Java"

// Split
String[] words = str.split(" ");  // ["Hello", "World", "Java"]

// Contains
str.contains("World");            // true
str.contains("world");            // false

// Starts with / Ends with
str.startsWith("Hello");          // true
str.endsWith("Java");             // true

// Equals
str.equals("Hello World Java");          // true
str.equalsIgnoreCase("hello world java"); // true

// isEmpty and isBlank
"".isEmpty();                     // true
"  ".isEmpty();                   // false
"  ".isBlank();                   // true (Java 11+)

// Convert to char array
char[] charArray = str.toCharArray();

// ValueOf - convert other types to String
String.valueOf(123);              // "123"
String.valueOf(true);             // "true"
String.valueOf(3.14);             // "3.14"

// Comparing strings
"apple".compareTo("banana");      // negative value (apple < banana)
"banana".compareTo("apple");      // positive value (banana > apple)
"apple".compareTo("apple");       // 0 (equal)
```

### 3.3 StringBuilder and StringBuffer

```java
// StringBuilder - mutable, NOT thread-safe, faster
StringBuilder sb = new StringBuilder("Hello");
sb.append(" World");              // "Hello World"
sb.insert(5, ",");                // "Hello, World"
sb.replace(0, 5, "Hi");          // "Hi, World"
sb.delete(2, 4);                  // "Hi World"
sb.reverse();                     // "dlroW iH"
sb.length();                      // 7
String result = sb.toString();    // Convert to String

// StringBuffer - mutable, thread-safe, slower
StringBuffer sbf = new StringBuffer("Hello");
sbf.append(" World");
// Same methods as StringBuilder

// When to use what?
// String       → when value won't change
// StringBuilder → when value changes frequently (single thread)
// StringBuffer  → when value changes frequently (multi thread)
```

### 3.4 Common String Problems

```java
// ===== REVERSE A STRING =====
public static String reverseString(String str) {
    StringBuilder sb = new StringBuilder(str);
    return sb.reverse().toString();
}
// OR manually:
public static String reverseManual(String str) {
    char[] chars = str.toCharArray();
    int left = 0, right = chars.length - 1;
    while (left < right) {
        char temp = chars[left];
        chars[left] = chars[right];
        chars[right] = temp;
        left++;
        right--;
    }
    return new String(chars);
}

// ===== CHECK PALINDROME =====
public static boolean isPalindrome(String str) {
    str = str.toLowerCase().replaceAll("[^a-z0-9]", "");
    int left = 0, right = str.length() - 1;
    while (left < right) {
        if (str.charAt(left) != str.charAt(right)) return false;
        left++;
        right--;
    }
    return true;
}
// isPalindrome("madam")  → true
// isPalindrome("racecar") → true
// isPalindrome("hello")   → false

// ===== COUNT VOWELS AND CONSONANTS =====
public static void countVowelsConsonants(String str) {
    int vowels = 0, consonants = 0;
    str = str.toLowerCase();
    for (char c : str.toCharArray()) {
        if (c >= 'a' && c <= 'z') {
            if ("aeiou".indexOf(c) != -1) vowels++;
            else consonants++;
        }
    }
    System.out.println("Vowels: " + vowels + ", Consonants: " + consonants);
}

// ===== CHECK ANAGRAM =====
public static boolean isAnagram(String s1, String s2) {
    if (s1.length() != s2.length()) return false;
    char[] a = s1.toLowerCase().toCharArray();
    char[] b = s2.toLowerCase().toCharArray();
    java.util.Arrays.sort(a);
    java.util.Arrays.sort(b);
    return java.util.Arrays.equals(a, b);
}
// isAnagram("listen", "silent") → true

// ===== COUNT CHARACTER FREQUENCY =====
public static void charFrequency(String str) {
    java.util.Map<Character, Integer> map = new java.util.HashMap<>();
    for (char c : str.toCharArray()) {
        map.put(c, map.getOrDefault(c, 0) + 1);
    }
    for (var entry : map.entrySet()) {
        System.out.println(entry.getKey() + ": " + entry.getValue());
    }
}

// ===== FIND DUPLICATE CHARACTERS =====
public static void findDuplicates(String str) {
    java.util.Map<Character, Integer> map = new java.util.HashMap<>();
    for (char c : str.toCharArray()) {
        map.put(c, map.getOrDefault(c, 0) + 1);
    }
    System.out.print("Duplicates: ");
    for (var entry : map.entrySet()) {
        if (entry.getValue() > 1) {
            System.out.print(entry.getKey() + " ");
        }
    }
}

// ===== FIRST NON-REPEATING CHARACTER =====
public static char firstNonRepeating(String str) {
    java.util.Map<Character, Integer> map = new java.util.LinkedHashMap<>();
    for (char c : str.toCharArray()) {
        map.put(c, map.getOrDefault(c, 0) + 1);
    }
    for (var entry : map.entrySet()) {
        if (entry.getValue() == 1) return entry.getKey();
    }
    return '\0';
}
// firstNonRepeating("aabbcdd") → 'c'

// ===== REVERSE WORDS IN A STRING =====
public static String reverseWords(String str) {
    String[] words = str.trim().split("\\s+");
    StringBuilder sb = new StringBuilder();
    for (int i = words.length - 1; i >= 0; i--) {
        sb.append(words[i]);
        if (i > 0) sb.append(" ");
    }
    return sb.toString();
}
// reverseWords("Hello World Java") → "Java World Hello"

// ===== REMOVE DUPLICATES FROM STRING =====
public static String removeDuplicates(String str) {
    StringBuilder sb = new StringBuilder();
    java.util.Set<Character> seen = new java.util.LinkedHashSet<>();
    for (char c : str.toCharArray()) {
        if (seen.add(c)) {
            sb.append(c);
        }
    }
    return sb.toString();
}
// removeDuplicates("programming") → "progamin"
```

---

## 4. Arrays

### 📌 Definition
An array is a **fixed-size**, **indexed** container that holds elements of the **same data type**.

### 4.1 Array Basics

```java
// Declaration and initialization
int[] arr1 = new int[5];                    // Default values: 0
int[] arr2 = {10, 20, 30, 40, 50};          // Direct initialization
int[] arr3 = new int[]{1, 2, 3, 4, 5};      // Another way
String[] names = {"Alice", "Bob", "Charlie"};

// Accessing elements
System.out.println(arr2[0]);    // 10 (first element)
System.out.println(arr2[4]);    // 50 (last element)
arr2[2] = 35;                   // Modify element

// Array length
System.out.println(arr2.length); // 5

// Traversal
for (int i = 0; i < arr2.length; i++) {
    System.out.print(arr2[i] + " ");
}

// For-each loop
for (int num : arr2) {
    System.out.print(num + " ");
}

// 2D Array
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

// Accessing 2D array
System.out.println(matrix[1][2]); // 6 (row 1, col 2)

// Traversing 2D array
for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        System.out.print(matrix[i][j] + " ");
    }
    System.out.println();
}
```

### 4.2 Arrays Utility Class

```java
import java.util.Arrays;

int[] arr = {5, 2, 8, 1, 9, 3};

// Sort
Arrays.sort(arr);                     // [1, 2, 3, 5, 8, 9]

// Binary Search (array must be sorted)
int index = Arrays.binarySearch(arr, 5);  // 3

// Fill
int[] filled = new int[5];
Arrays.fill(filled, 7);                  // [7, 7, 7, 7, 7]

// Copy
int[] copy = Arrays.copyOf(arr, 3);       // [1, 2, 3]
int[] rangeCopy = Arrays.copyOfRange(arr, 1, 4); // [2, 3, 5]

// Equals
int[] a = {1, 2, 3};
int[] b = {1, 2, 3};
Arrays.equals(a, b);                      // true

// toString
System.out.println(Arrays.toString(arr)); // [1, 2, 3, 5, 8, 9]
```

### 4.3 Common Array Problems

```java
// ===== FIND LARGEST AND SMALLEST =====
public static void findMinMax(int[] arr) {
    int min = arr[0], max = arr[0];
    for (int i = 1; i < arr.length; i++) {
        if (arr[i] < min) min = arr[i];
        if (arr[i] > max) max = arr[i];
    }
    System.out.println("Min: " + min + ", Max: " + max);
}

// ===== FIND SECOND LARGEST =====
public static int secondLargest(int[] arr) {
    int first = Integer.MIN_VALUE, second = Integer.MIN_VALUE;
    for (int num : arr) {
        if (num > first) {
            second = first;
            first = num;
        } else if (num > second && num != first) {
            second = num;
        }
    }
    return second;
}

// ===== REVERSE AN ARRAY =====
public static void reverseArray(int[] arr) {
    int left = 0, right = arr.length - 1;
    while (left < right) {
        int temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left++;
        right--;
    }
}

// ===== REMOVE DUPLICATES FROM SORTED ARRAY =====
public static int removeDuplicates(int[] arr) {
    if (arr.length == 0) return 0;
    int j = 0;
    for (int i = 1; i < arr.length; i++) {
        if (arr[i] != arr[j]) {
            j++;
            arr[j] = arr[i];
        }
    }
    return j + 1; // new length
}

// ===== FIND MISSING NUMBER (1 to N) =====
public static int findMissing(int[] arr, int n) {
    int expectedSum = n * (n + 1) / 2;
    int actualSum = 0;
    for (int num : arr) {
        actualSum += num;
    }
    return expectedSum - actualSum;
}
// findMissing({1, 2, 4, 5}, 5) → 3

// ===== ROTATE ARRAY BY K POSITIONS =====
public static void rotateRight(int[] arr, int k) {
    int n = arr.length;
    k = k % n;
    reverse(arr, 0, n - 1);
    reverse(arr, 0, k - 1);
    reverse(arr, k, n - 1);
}

private static void reverse(int[] arr, int start, int end) {
    while (start < end) {
        int temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
    }
}

// ===== TWO SUM PROBLEM =====
public static int[] twoSum(int[] nums, int target) {
    java.util.Map<Integer, Integer> map = new java.util.HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[]{map.get(complement), i};
        }
        map.put(nums[i], i);
    }
    return new int[]{};
}
// twoSum({2, 7, 11, 15}, 9) → [0, 1]

// ===== MERGE TWO SORTED ARRAYS =====
public static int[] mergeSorted(int[] a, int[] b) {
    int[] result = new int[a.length + b.length];
    int i = 0, j = 0, k = 0;
    while (i < a.length && j < b.length) {
        if (a[i] <= b[j]) result[k++] = a[i++];
        else result[k++] = b[j++];
    }
    while (i < a.length) result[k++] = a[i++];
    while (j < b.length) result[k++] = b[j++];
    return result;
}
```

---

## 5. Collections Framework

### 📌 Definition
The Collections Framework provides a unified architecture for storing and manipulating groups of objects. It includes **interfaces**, **implementations**, and **algorithms**.

### Collections Hierarchy

```
Collection (Interface)
├── List (Interface) - Ordered, allows duplicates
│   ├── ArrayList
│   ├── LinkedList
│   └── Vector
├── Set (Interface) - Unordered, no duplicates
│   ├── HashSet
│   ├── LinkedHashSet
│   └── TreeSet
└── Queue (Interface) - FIFO
    ├── LinkedList
    └── PriorityQueue

Map (Interface) - Key-Value pairs
├── HashMap
├── LinkedHashMap
├── TreeMap
└── Hashtable
```

### 5.1 ArrayList

```java
import java.util.*;

// ArrayList - resizable array, allows duplicates, maintains insertion order
ArrayList<String> list = new ArrayList<>();

// Adding elements
list.add("Apple");
list.add("Banana");
list.add("Cherry");
list.add("Apple");            // Duplicates allowed
list.add(1, "Mango");         // Add at index 1

// Accessing elements
list.get(0);                   // "Apple"
list.size();                   // 5

// Modifying
list.set(0, "Grapes");        // Replace at index 0

// Removing
list.remove("Banana");        // Remove by value
list.remove(0);                // Remove by index

// Checking
list.contains("Cherry");      // true
list.isEmpty();                // false
list.indexOf("Cherry");        // index of element

// Sorting
Collections.sort(list);       // Alphabetical sort

// Iterating
for (String item : list) {
    System.out.println(item);
}

// Using Iterator
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    System.out.println(it.next());
}

// Convert array to ArrayList
String[] arr = {"A", "B", "C"};
ArrayList<String> fromArray = new ArrayList<>(Arrays.asList(arr));

// Convert ArrayList to array
String[] toArray = list.toArray(new String[0]);
```

### 5.2 LinkedList

```java
// LinkedList - doubly linked list, good for insertions/deletions
LinkedList<Integer> ll = new LinkedList<>();

ll.add(10);
ll.add(20);
ll.add(30);
ll.addFirst(5);    // Add at beginning
ll.addLast(40);    // Add at end

ll.getFirst();      // 5
ll.getLast();        // 40

ll.removeFirst();   // Remove first
ll.removeLast();    // Remove last

// LinkedList as Stack
ll.push(100);       // Push to top
ll.pop();           // Pop from top
ll.peek();          // View top without removing

// LinkedList as Queue
ll.offer(200);      // Add to queue
ll.poll();          // Remove from front
ll.peek();          // View front
```

### ArrayList vs LinkedList

| Feature | ArrayList | LinkedList |
|---------|-----------|------------|
| Storage | Dynamic Array | Doubly Linked List |
| Access | O(1) random access | O(n) sequential |
| Insert/Delete (middle) | O(n) - shifting | O(1) if position known |
| Memory | Less (no pointers) | More (stores pointers) |
| Best for | Frequent reads | Frequent inserts/deletes |

### 5.3 HashMap

```java
import java.util.*;

// HashMap - key-value pairs, no ordering, allows null
HashMap<String, Integer> map = new HashMap<>();

// Adding entries
map.put("Alice", 90);
map.put("Bob", 85);
map.put("Charlie", 92);
map.put("Alice", 95);           // Overwrites previous value

// Accessing
map.get("Alice");                // 95
map.getOrDefault("David", 0);   // 0 (default if not found)

// Checking
map.containsKey("Bob");          // true
map.containsValue(85);           // true
map.size();                      // 3
map.isEmpty();                   // false

// Removing
map.remove("Bob");               // Removes Bob
map.remove("Alice", 95);         // Remove only if value matches

// Iterating
// Method 1: keySet
for (String key : map.keySet()) {
    System.out.println(key + ": " + map.get(key));
}

// Method 2: entrySet (recommended)
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}

// Method 3: values
for (int value : map.values()) {
    System.out.println(value);
}

// Useful methods
map.putIfAbsent("David", 88);   // Add only if key doesn't exist
map.replace("Charlie", 97);      // Replace value
```

### 5.4 HashSet

```java
// HashSet - unique elements, no ordering
HashSet<String> set = new HashSet<>();

set.add("Apple");
set.add("Banana");
set.add("Cherry");
set.add("Apple");               // Ignored - duplicate

set.size();                      // 3
set.contains("Banana");         // true
set.remove("Cherry");

// Iterating
for (String item : set) {
    System.out.println(item);
}

// Set Operations
HashSet<Integer> set1 = new HashSet<>(Arrays.asList(1, 2, 3, 4, 5));
HashSet<Integer> set2 = new HashSet<>(Arrays.asList(4, 5, 6, 7, 8));

// Union
HashSet<Integer> union = new HashSet<>(set1);
union.addAll(set2);              // {1, 2, 3, 4, 5, 6, 7, 8}

// Intersection
HashSet<Integer> intersection = new HashSet<>(set1);
intersection.retainAll(set2);    // {4, 5}

// Difference
HashSet<Integer> difference = new HashSet<>(set1);
difference.removeAll(set2);      // {1, 2, 3}
```

### 5.5 TreeSet and TreeMap

```java
// TreeSet - sorted set
TreeSet<Integer> ts = new TreeSet<>();
ts.add(5); ts.add(2); ts.add(8); ts.add(1);
System.out.println(ts);          // [1, 2, 5, 8] - automatically sorted
ts.first();                       // 1
ts.last();                        // 8
ts.higher(2);                     // 5 (next higher element)
ts.lower(5);                      // 2 (next lower element)

// TreeMap - sorted map by keys
TreeMap<String, Integer> tm = new TreeMap<>();
tm.put("Charlie", 3);
tm.put("Alice", 1);
tm.put("Bob", 2);
System.out.println(tm);          // {Alice=1, Bob=2, Charlie=3}
tm.firstKey();                    // "Alice"
tm.lastKey();                     // "Charlie"
```

### 5.6 Collections Utility Methods

```java
List<Integer> list = new ArrayList<>(Arrays.asList(3, 1, 4, 1, 5, 9));

Collections.sort(list);                    // [1, 1, 3, 4, 5, 9]
Collections.sort(list, Collections.reverseOrder()); // [9, 5, 4, 3, 1, 1]
Collections.reverse(list);                 // Reverse the list
Collections.shuffle(list);                 // Random order
Collections.min(list);                     // Minimum element
Collections.max(list);                     // Maximum element
Collections.frequency(list, 1);            // Count of 1
Collections.swap(list, 0, 2);             // Swap elements at indices
Collections.binarySearch(list, 4);         // Binary search (list must be sorted)
Collections.unmodifiableList(list);        // Make immutable
```

---

## 6. Exception Handling

### 📌 Definition
Exception handling is a mechanism to handle **runtime errors** so that the normal flow of the program is maintained.

### Exception Hierarchy

```
Throwable
├── Error (cannot be handled)
│   ├── OutOfMemoryError
│   └── StackOverflowError
└── Exception
    ├── Checked Exceptions (compile-time)
    │   ├── IOException
    │   ├── SQLException
    │   ├── FileNotFoundException
    │   └── ClassNotFoundException
    └── Unchecked Exceptions (runtime)
        ├── ArithmeticException
        ├── NullPointerException
        ├── ArrayIndexOutOfBoundsException
        ├── NumberFormatException
        ├── StringIndexOutOfBoundsException
        └── ClassCastException
```

### Checked vs Unchecked Exceptions

| Feature | Checked | Unchecked |
|---------|---------|-----------|
| When? | Compile-time | Runtime |
| Must handle? | Yes (try-catch or throws) | No (optional) |
| Extends | Exception | RuntimeException |
| Examples | IOException, SQLException | NullPointerException, ArithmeticException |

### 6.1 Try-Catch-Finally

```java
// Basic try-catch
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero: " + e.getMessage());
}

// Multiple catch blocks
try {
    int[] arr = {1, 2, 3};
    System.out.println(arr[5]);   // ArrayIndexOutOfBoundsException
    String str = null;
    str.length();                  // NullPointerException
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Array index error: " + e.getMessage());
} catch (NullPointerException e) {
    System.out.println("Null pointer error: " + e.getMessage());
} catch (Exception e) {
    System.out.println("General error: " + e.getMessage());
} finally {
    System.out.println("This ALWAYS executes");
}

// Multi-catch (Java 7+)
try {
    // some code
} catch (ArithmeticException | NullPointerException | ArrayIndexOutOfBoundsException e) {
    System.out.println("Error: " + e.getMessage());
}

// Try-with-resources (Java 7+)
// AutoCloseable resources are automatically closed
try (java.io.BufferedReader br = new java.io.BufferedReader(
        new java.io.FileReader("file.txt"))) {
    String line = br.readLine();
    System.out.println(line);
} catch (java.io.IOException e) {
    System.out.println("File error: " + e.getMessage());
}
// br is automatically closed here
```

### 6.2 Throw and Throws

```java
// throw - explicitly throw an exception
public static int divide(int a, int b) {
    if (b == 0) {
        throw new ArithmeticException("Divisor cannot be zero");
    }
    return a / b;
}

// throws - declare that method may throw an exception
public static void readFile(String path) throws java.io.IOException {
    java.io.BufferedReader br = new java.io.BufferedReader(
            new java.io.FileReader(path));
    System.out.println(br.readLine());
    br.close();
}

// Calling method with throws
public static void main(String[] args) {
    try {
        readFile("data.txt");
    } catch (java.io.IOException e) {
        System.out.println("File not found: " + e.getMessage());
    }
}
```

### throw vs throws

| Feature | `throw` | `throws` |
|---------|---------|----------|
| Purpose | Actually throw exception | Declare possible exception |
| Location | Inside method body | In method signature |
| Count | One exception at a time | Multiple exceptions |
| Followed by | Exception object | Exception class names |

### 6.3 Custom Exceptions

```java
// Custom checked exception
class InvalidAgeException extends Exception {
    public InvalidAgeException(String message) {
        super(message);
    }
}

// Custom unchecked exception
class InsufficientBalanceException extends RuntimeException {
    private double balance;
    private double amount;
    
    public InsufficientBalanceException(double balance, double amount) {
        super("Insufficient balance. Balance: " + balance + ", Requested: " + amount);
        this.balance = balance;
        this.amount = amount;
    }
    
    public double getBalance() { return balance; }
    public double getAmount() { return amount; }
}

// Using custom exceptions
class BankAccount {
    private double balance;
    
    public BankAccount(double balance) {
        this.balance = balance;
    }
    
    public void withdraw(double amount) {
        if (amount > balance) {
            throw new InsufficientBalanceException(balance, amount);
        }
        balance -= amount;
        System.out.println("Withdrawn: " + amount + ", Remaining: " + balance);
    }
}

class Voter {
    public static void validateAge(int age) throws InvalidAgeException {
        if (age < 18) {
            throw new InvalidAgeException("Age must be 18 or above. Given: " + age);
        }
        System.out.println("Valid voter age: " + age);
    }
}

// Usage
public static void main(String[] args) {
    try {
        Voter.validateAge(15);
    } catch (InvalidAgeException e) {
        System.out.println(e.getMessage());
    }
    
    try {
        BankAccount acc = new BankAccount(1000);
        acc.withdraw(1500);
    } catch (InsufficientBalanceException e) {
        System.out.println(e.getMessage());
    }
}
```

---

## 7. Date and Time API

### 📌 Definition
Java 8 introduced the `java.time` package with immutable and thread-safe date-time classes.

### 7.1 LocalDate, LocalTime, LocalDateTime

```java
import java.time.*;
import java.time.format.DateTimeFormatter;

// ===== LocalDate - Date only (no time) =====
LocalDate today = LocalDate.now();           // 2026-05-20
LocalDate specific = LocalDate.of(2026, 5, 20);
LocalDate parsed = LocalDate.parse("2026-05-20");

today.getYear();          // 2026
today.getMonth();         // MAY
today.getMonthValue();    // 5
today.getDayOfMonth();    // 20
today.getDayOfWeek();     // WEDNESDAY
today.getDayOfYear();     // 140
today.lengthOfMonth();    // 31
today.isLeapYear();       // false

// Date manipulation
today.plusDays(10);        // 2026-05-30
today.plusMonths(2);       // 2026-07-20
today.plusYears(1);        // 2027-05-20
today.minusWeeks(1);      // 2026-05-13

// Comparison
LocalDate date1 = LocalDate.of(2026, 1, 1);
LocalDate date2 = LocalDate.of(2026, 12, 31);
date1.isBefore(date2);    // true
date1.isAfter(date2);     // false
date1.isEqual(date1);     // true

// ===== LocalTime - Time only (no date) =====
LocalTime now = LocalTime.now();             // 20:06:56
LocalTime specific2 = LocalTime.of(14, 30, 0);
LocalTime parsed2 = LocalTime.parse("14:30:00");

now.getHour();             // 20
now.getMinute();           // 6
now.getSecond();           // 56

now.plusHours(2);
now.minusMinutes(30);

// ===== LocalDateTime - Date + Time =====
LocalDateTime dateTime = LocalDateTime.now();
LocalDateTime specific3 = LocalDateTime.of(2026, 5, 20, 14, 30, 0);

// ===== Formatting =====
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
String formatted = dateTime.format(formatter);  // "20/05/2026 20:06:56"

DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern("dd-MMM-yyyy");
String formatted2 = today.format(formatter2);    // "20-May-2026"

// Parsing with formatter
LocalDate parsedDate = LocalDate.parse("20/05/2026", 
    DateTimeFormatter.ofPattern("dd/MM/yyyy"));
```

### 7.2 Period and Duration

```java
import java.time.*;

// Period - difference between dates
LocalDate start = LocalDate.of(2026, 1, 1);
LocalDate end = LocalDate.of(2026, 5, 20);
Period period = Period.between(start, end);
System.out.println(period.getMonths() + " months, " + period.getDays() + " days");
// 4 months, 19 days

// Duration - difference between times
LocalTime t1 = LocalTime.of(9, 0);
LocalTime t2 = LocalTime.of(17, 30);
java.time.Duration duration = java.time.Duration.between(t1, t2);
System.out.println(duration.toHours() + " hours, " + (duration.toMinutes() % 60) + " minutes");
// 8 hours, 30 minutes
```

### Common Date Problems

```java
// ===== CALCULATE AGE =====
public static int calculateAge(LocalDate birthDate) {
    return Period.between(birthDate, LocalDate.now()).getYears();
}

// ===== FIND DAY OF THE WEEK =====
public static String getDayOfWeek(int year, int month, int day) {
    return LocalDate.of(year, month, day).getDayOfWeek().toString();
}

// ===== CHECK IF DATE IS WEEKEND =====
public static boolean isWeekend(LocalDate date) {
    DayOfWeek day = date.getDayOfWeek();
    return day == DayOfWeek.SATURDAY || day == DayOfWeek.SUNDAY;
}

// ===== DAYS BETWEEN TWO DATES =====
public static long daysBetween(LocalDate d1, LocalDate d2) {
    return java.time.temporal.ChronoUnit.DAYS.between(d1, d2);
}
```

---

## 8. Problem Solving Examples

### 📌 Common Problems Asked in Cognizant Assessment

#### Problem 1: Factorial

```java
// Iterative
public static long factorial(int n) {
    long result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Recursive
public static long factorialRecursive(int n) {
    if (n <= 1) return 1;
    return n * factorialRecursive(n - 1);
}
```

#### Problem 2: Fibonacci Series

```java
// Print first N Fibonacci numbers
public static void fibonacci(int n) {
    int a = 0, b = 1;
    for (int i = 0; i < n; i++) {
        System.out.print(a + " ");
        int temp = a + b;
        a = b;
        b = temp;
    }
}
// fibonacci(10) → 0 1 1 2 3 5 8 13 21 34
```

#### Problem 3: Prime Number

```java
public static boolean isPrime(int n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    for (int i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) return false;
    }
    return true;
}

// Print all primes up to N
public static void printPrimes(int n) {
    for (int i = 2; i <= n; i++) {
        if (isPrime(i)) System.out.print(i + " ");
    }
}
```

#### Problem 4: Armstrong Number

```java
// A number where sum of digits^n = number itself
// 153 = 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153
public static boolean isArmstrong(int num) {
    int original = num;
    int digits = String.valueOf(num).length();
    int sum = 0;
    while (num > 0) {
        int digit = num % 10;
        sum += Math.pow(digit, digits);
        num /= 10;
    }
    return sum == original;
}
```

#### Problem 5: Reverse a Number

```java
public static int reverseNumber(int num) {
    int reversed = 0;
    while (num != 0) {
        reversed = reversed * 10 + num % 10;
        num /= 10;
    }
    return reversed;
}
// reverseNumber(12345) → 54321
```

#### Problem 6: GCD and LCM

```java
// GCD using Euclidean algorithm
public static int gcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// LCM
public static int lcm(int a, int b) {
    return (a * b) / gcd(a, b);
}
```

#### Problem 7: Count Digits

```java
public static int countDigits(int num) {
    int count = 0;
    while (num != 0) {
        count++;
        num /= 10;
    }
    return count;
}

public static int sumOfDigits(int num) {
    int sum = 0;
    while (num != 0) {
        sum += num % 10;
        num /= 10;
    }
    return sum;
}
```

#### Problem 8: Matrix Operations

```java
// Matrix Addition
public static int[][] addMatrices(int[][] a, int[][] b) {
    int rows = a.length, cols = a[0].length;
    int[][] result = new int[rows][cols];
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            result[i][j] = a[i][j] + b[i][j];
        }
    }
    return result;
}

// Matrix Transpose
public static int[][] transpose(int[][] matrix) {
    int rows = matrix.length, cols = matrix[0].length;
    int[][] result = new int[cols][rows];
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            result[j][i] = matrix[i][j];
        }
    }
    return result;
}

// Matrix Multiplication
public static int[][] multiply(int[][] a, int[][] b) {
    int rows = a.length, cols = b[0].length, common = a[0].length;
    int[][] result = new int[rows][cols];
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            for (int k = 0; k < common; k++) {
                result[i][j] += a[i][k] * b[k][j];
            }
        }
    }
    return result;
}
```

#### Problem 9: Sorting Array of Objects

```java
import java.util.*;

class Student implements Comparable<Student> {
    String name;
    int marks;
    
    public Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
    }
    
    @Override
    public int compareTo(Student other) {
        return Integer.compare(this.marks, other.marks); // Sort by marks ascending
    }
    
    @Override
    public String toString() {
        return name + "(" + marks + ")";
    }
}

// Usage
List<Student> students = new ArrayList<>();
students.add(new Student("Alice", 85));
students.add(new Student("Bob", 92));
students.add(new Student("Charlie", 78));

// Sort using Comparable
Collections.sort(students);
System.out.println(students); // [Charlie(78), Alice(85), Bob(92)]

// Sort using Comparator (descending by marks)
students.sort((s1, s2) -> Integer.compare(s2.marks, s1.marks));
System.out.println(students); // [Bob(92), Alice(85), Charlie(78)]

// Sort by name
students.sort(Comparator.comparing(s -> s.name));
System.out.println(students); // [Alice(85), Bob(92), Charlie(78)]
```

---

## 🔑 Key Java Concepts Quick Reference

| Concept | Description |
|---------|-------------|
| `==` vs `equals()` | `==` compares reference, `equals()` compares value |
| `String` vs `StringBuilder` | String is immutable, StringBuilder is mutable |
| `ArrayList` vs `LinkedList` | ArrayList for random access, LinkedList for frequent insertion/deletion |
| `HashMap` vs `TreeMap` | HashMap unordered O(1), TreeMap sorted O(log n) |
| `HashSet` vs `TreeSet` | HashSet unordered O(1), TreeSet sorted O(log n) |
| `Comparable` vs `Comparator` | Comparable for natural ordering, Comparator for custom ordering |
| `throw` vs `throws` | throw raises exception, throws declares it |
| `final` vs `finally` vs `finalize` | final=constant, finally=always executes, finalize=garbage collection |
| `abstract class` vs `interface` | Abstract allows partial implementation, interface defines contract |
| `checked` vs `unchecked` | Checked at compile-time, unchecked at runtime |

---

> 📌 **Practice Tip**: Write each program by hand first, then verify in an IDE. The Cognizant assessment is typically a coding test where you write actual code, so syntax matters!
