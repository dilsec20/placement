# ☕ Java — Previous Year Questions (PYQs) | Cognizant GenC Cluster 1

> **Section:** Technical — Java Coding (2 Qs) + MCQs (10 Qs) | **Time:** ~65 mins

---

## 📑 Table of Contents

**Part A: MCQs (Output-Based & Conceptual)**
1. [OOPs Concepts](#oops-concepts)
2. [Exception Handling](#exception-handling)
3. [Collections & Strings](#collections--strings)
4. [Keywords & Misc](#keywords--misc)

**Part B: Coding Questions**
5. [Array Problems](#array-problems)
6. [String Problems](#string-problems)
7. [Logic & Math Problems](#logic--math-problems)

---

# Part A: Java MCQ PYQs

## OOPs Concepts

### Q1. Runtime Polymorphism — Parent Reference, Child Object

```java
class Parent {
    void show() { System.out.println("Parent"); }
}
class Child extends Parent {
    void show() { System.out.println("Child"); }
}
public class Main {
    public static void main(String[] args) {
        Parent obj = new Child();
        obj.show();
    }
}
```

**Answer: `Child`**  
> Method overriding → runtime polymorphism → method resolved by **object type**, not reference type.

---

### Q2. Constructor Chaining

```java
class A {
    A() { System.out.print("A "); }
}
class B extends A {
    B() { System.out.print("B "); }
}
class C extends B {
    C() { System.out.print("C "); }
}
public class Main {
    public static void main(String[] args) {
        C obj = new C();
    }
}
```

**Answer: `A B C`**  
> Constructors execute parent-first (`super()` is called implicitly before each constructor body).

---

### Q3. Variable vs Method Resolution

```java
class Animal {
    String type = "Animal";
    void sound() { System.out.println("Some sound"); }
}
class Dog extends Animal {
    String type = "Dog";
    void sound() { System.out.println("Bark"); }
}
public class Main {
    public static void main(String[] args) {
        Animal a = new Dog();
        System.out.println(a.type);
        a.sound();
    }
}
```

**Answer: `Animal` then `Bark`**  
> **Variables** → resolved by reference type (compile-time). **Methods** → resolved by object type (runtime).

---

### Q4. Method Overloading vs Overriding

```java
class Calculator {
    int add(int a, int b) { return a + b; }
    double add(double a, double b) { return a + b; }         // Overloading ✅
    int add(int a, int b, int c) { return a + b + c; }       // Overloading ✅
}
```

**Q: Which is an example of?**  
**Answer: Compile-time (Static) Polymorphism — Method Overloading**  
> Same method name, different parameters (number/type). Resolved at compile time.

| Overloading | Overriding |
|-------------|-----------|
| Same class | Parent-child classes |
| Different parameters | Same signature |
| Compile-time | Runtime |
| Can change return type | Cannot change return type (must be same or covariant) |

---

### Q5. Abstract Class Rules

**Q: Which statement about abstract classes is TRUE?**
- (a) Abstract classes can be instantiated ❌
- (b) Abstract classes can have constructors ✅
- (c) Abstract classes cannot have concrete methods ❌
- (d) Abstract classes must have at least one abstract method ❌

**Answer: (b)**

```java
abstract class Shape {
    int sides;
    Shape(int s) { this.sides = s; }           // ✅ Constructor allowed
    void display() { System.out.println(sides); } // ✅ Concrete method allowed
    abstract double area();                      // Abstract method
}
// Shape obj = new Shape(4); ❌ Cannot instantiate
```

---

### Q6. Interface vs Abstract Class

| Feature | Abstract Class | Interface |
|---------|---------------|-----------|
| Methods | Abstract + Concrete | Only abstract (before Java 8); default/static after Java 8 |
| Variables | Any type | `public static final` only |
| Constructor | ✅ Yes | ❌ No |
| Multiple Inheritance | ❌ (single extends) | ✅ (multiple implements) |
| Access Modifiers | Any | `public` only (methods) |
| When to use | IS-A relationship + shared code | Capability/contract |

---

### Q7. `super` Keyword

```java
class Parent {
    String name = "Parent";
    void greet() { System.out.println("Hello from Parent"); }
}
class Child extends Parent {
    String name = "Child";
    void greet() {
        super.greet();                    // Calls Parent's greet()
        System.out.println("Hello from Child");
        System.out.println(super.name);   // Prints "Parent"
    }
}
public class Main {
    public static void main(String[] args) {
        new Child().greet();
    }
}
```

**Output:**
```
Hello from Parent
Hello from Child
Parent
```

---

### Q8. `this` Keyword

```java
class Student {
    String name;
    int age;
    
    Student(String name, int age) {
        this.name = name;   // 'this' refers to current object
        this.age = age;
    }
    
    void display() {
        System.out.println(this.name + " " + this.age);
    }
}
```

---

## Exception Handling

### Q9. Try-Catch-Finally Execution

```java
public class Main {
    public static void main(String[] args) {
        try {
            int a = 10 / 0;
            System.out.println("Inside try");
        } catch (ArithmeticException e) {
            System.out.println("Exception caught");
        } finally {
            System.out.println("Finally block");
        }
    }
}
```

**Answer:**
```
Exception caught
Finally block
```
> `finally` ALWAYS executes (unless `System.exit(0)`).

---

### Q10. NullPointerException Handling

```java
public class Main {
    public static void main(String[] args) {
        try {
            String s = null;
            System.out.println(s.length());
        } catch (NullPointerException e) {
            System.out.println("Null!");
        } catch (Exception e) {
            System.out.println("Exception!");
        }
    }
}
```

**Answer: `Null!`**  
> First matching catch block is executed. Specific exceptions must come before general ones.

---

### Q11. Multiple Exceptions

```java
public class Main {
    public static void main(String[] args) {
        try {
            int[] arr = {1, 2, 3};
            System.out.println(arr[5]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Array error");
        } catch (Exception e) {
            System.out.println("General error");
        } finally {
            System.out.println("Done");
        }
        System.out.println("Program continues");
    }
}
```

**Output:**
```
Array error
Done
Program continues
```

---

### Q12. Checked vs Unchecked Exceptions

| Checked (Compile-time) | Unchecked (Runtime) |
|------------------------|---------------------|
| IOException | NullPointerException |
| SQLException | ArrayIndexOutOfBoundsException |
| FileNotFoundException | ArithmeticException |
| ClassNotFoundException | NumberFormatException |
| InterruptedException | IllegalArgumentException |
| Must be handled or declared | No compile-time check |

---

### Q13. `throw` vs `throws`

```java
// throw → explicitly throw an exception INSIDE a method
void checkAge(int age) {
    if (age < 18)
        throw new ArithmeticException("Not eligible");
}

// throws → DECLARE that a method may throw exception(s)
void readFile() throws IOException {
    FileReader fr = new FileReader("test.txt");
}
```

---

### Q14. Custom Exception

```java
class InvalidAgeException extends Exception {
    InvalidAgeException(String msg) { super(msg); }
}

public class Main {
    static void validate(int age) throws InvalidAgeException {
        if (age < 18) throw new InvalidAgeException("Age must be 18+");
        System.out.println("Valid age");
    }
    
    public static void main(String[] args) {
        try {
            validate(15);
        } catch (InvalidAgeException e) {
            System.out.println(e.getMessage());
        }
    }
}
// Output: Age must be 18+
```

---

### Q15. `final` vs `finally` vs `finalize`

| `final` | `finally` | `finalize` |
|---------|-----------|------------|
| Keyword | Block | Method |
| Variable → constant | Cleanup code after try-catch | Called by GC before object destruction |
| Method → cannot override | Always executes | No guarantee when called |
| Class → cannot inherit | Used with try-catch | Deprecated in Java 9+ |

---

## Collections & Strings

### Q16. `ArrayList.remove()` Gotcha

```java
ArrayList<Integer> list = new ArrayList<>(Arrays.asList(10, 20, 30, 40));
list.remove(1);              // Removes element at INDEX 1 (value 20)
System.out.println(list);    // [10, 30, 40]

list.remove(Integer.valueOf(30));  // Removes OBJECT 30
System.out.println(list);          // [10, 40]
```

---

### Q17. String Pool & `==` vs `.equals()`

```java
String s1 = "Hello";
String s2 = "Hello";
String s3 = new String("Hello");

System.out.println(s1 == s2);       // true  (same pool reference)
System.out.println(s1 == s3);       // false (different objects)
System.out.println(s1.equals(s3));  // true  (same content)
```

> `==` → compares **references**. `.equals()` → compares **content**.

---

### Q18. String Methods

```java
String s = "Hello World";
s.length();                    // 11
s.charAt(4);                   // 'o'
s.substring(6);                // "World"
s.substring(0, 5);             // "Hello"
s.indexOf("o");                // 4
s.lastIndexOf("o");            // 7
s.contains("World");           // true
s.replace('l', 'x');           // "Hexxo Worxd"
s.toUpperCase();               // "HELLO WORLD"
s.toLowerCase();               // "hello world"
s.trim();                      // removes leading/trailing spaces
s.split(" ");                  // ["Hello", "World"]
s.toCharArray();               // char[] {'H','e','l','l','o',' ','W','o','r','l','d'}
String.valueOf(123);           // "123"
Integer.parseInt("123");       // 123
```

---

### Q19. StringBuilder vs String

```java
// String is IMMUTABLE → creates new object each time
String s = "Hello";
s = s + " World";  // New object created

// StringBuilder is MUTABLE → modifies same object
StringBuilder sb = new StringBuilder("Hello");
sb.append(" World");
sb.reverse();
sb.insert(0, "Start ");
sb.delete(5, 10);
sb.toString();  // Convert back to String
```

**Q: Why use StringBuilder over String for concatenation in loops?**  
> String creates a new object on each concatenation → O(n²) time. StringBuilder modifies in-place → O(n) time.

---

### Q20. HashMap vs HashSet

| HashMap | HashSet |
|---------|---------|
| Key-Value pairs | Only values |
| `put(key, value)` | `add(value)` |
| Keys unique, values can repeat | All values unique |
| 1 null key allowed | 1 null value allowed |
| Implements `Map` | Implements `Set` (uses HashMap internally) |

```java
// HashMap example
HashMap<String, Integer> map = new HashMap<>();
map.put("Alice", 90);
map.put("Bob", 85);
map.get("Alice");           // 90
map.containsKey("Bob");     // true
map.getOrDefault("Eve", 0); // 0

// HashSet example
HashSet<String> set = new HashSet<>();
set.add("Apple");
set.add("Banana");
set.add("Apple");           // Ignored (duplicate)
set.size();                 // 2
```

---

### Q21. Iterating Collections

```java
// ArrayList
ArrayList<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));

// Method 1: for-each
for (String s : list) System.out.println(s);

// Method 2: Iterator
Iterator<String> it = list.iterator();
while (it.hasNext()) System.out.println(it.next());

// Method 3: Lambda (Java 8+)
list.forEach(s -> System.out.println(s));

// HashMap iteration
HashMap<String, Integer> map = new HashMap<>();
for (Map.Entry<String, Integer> entry : map.entrySet())
    System.out.println(entry.getKey() + " = " + entry.getValue());
```

---

## Keywords & Misc

### Q22. `static` Keyword

```java
class Counter {
    static int count = 0;        // Shared across ALL objects
    int id;
    
    Counter() {
        count++;
        id = count;
    }
    
    static void showCount() {     // Can access only static members
        System.out.println("Total: " + count);
        // System.out.println(id); ❌ Cannot access non-static from static
    }
}
```

---

### Q23. `this()` vs `super()`

```java
class Animal {
    Animal(String name) { System.out.println("Animal: " + name); }
}
class Dog extends Animal {
    Dog() {
        this("Buddy");                // Calls Dog(String) → constructor chaining
    }
    Dog(String name) {
        super(name);                  // Calls Animal(String)
        System.out.println("Dog: " + name);
    }
}
// new Dog() → Animal: Buddy, Dog: Buddy
```

> `this()` and `super()` must be the **first statement** in a constructor. Cannot use both.

---

### Q24. Access Modifiers

| Modifier | Same Class | Same Package | Subclass | Everywhere |
|----------|-----------|--------------|----------|------------|
| `private` | ✅ | ❌ | ❌ | ❌ |
| `default` (no modifier) | ✅ | ✅ | ❌ | ❌ |
| `protected` | ✅ | ✅ | ✅ | ❌ |
| `public` | ✅ | ✅ | ✅ | ✅ |

---

### Q25. Multithreading Basics

```java
// Method 1: Extend Thread
class MyThread extends Thread {
    public void run() { System.out.println("Thread: " + Thread.currentThread().getName()); }
}
// new MyThread().start();

// Method 2: Implement Runnable (preferred)
class MyRunnable implements Runnable {
    public void run() { System.out.println("Runnable: " + Thread.currentThread().getName()); }
}
// new Thread(new MyRunnable()).start();

// Method 3: Lambda (Java 8+)
// new Thread(() -> System.out.println("Lambda thread")).start();
```

**Q: `start()` vs `run()`?**  
> `start()` creates a new thread and calls `run()`. Calling `run()` directly runs in the **same thread** (no new thread created).

---

# Part B: Java Coding PYQs

## Array Problems

### PYQ 1: Second Largest Element ⭐

```java
import java.util.*;

public class SecondLargest {
    public static int findSecondLargest(int[] arr) {
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
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        System.out.println(findSecondLargest(arr));
    }
}
// Input: 6 → 12 35 1 10 34 1 → Output: 34
```

---

### PYQ 2: Subarray of Size 3 — sum(first, third) == second ⭐

```java
public static int countSubarrays(int[] arr) {
    int count = 0;
    for (int i = 0; i <= arr.length - 3; i++) {
        if (arr[i] + arr[i + 2] == arr[i + 1])
            count++;
    }
    return count;
}
```

---

### PYQ 3: Replace Each Element with Greatest on Right

```java
public static int[] replaceWithGreatest(int[] arr) {
    int n = arr.length;
    int max = -1;
    for (int i = n - 1; i >= 0; i--) {
        int temp = arr[i];
        arr[i] = max;
        max = Math.max(max, temp);
    }
    return arr;
}
// Input:  [17, 18, 5, 4, 6, 1]
// Output: [18, 6, 6, 6, 1, -1]
```

---

### PYQ 4: Count Consecutive Pairs in Sorted Array

```java
public static int consecutivePairs(int[] arr) {
    Arrays.sort(arr);
    int count = 0;
    for (int i = 0; i < arr.length - 1; i++) {
        if (arr[i + 1] - arr[i] == 1) count++;
    }
    return count;
}
```

---

### PYQ 5: Find Missing Number in 1..N

```java
public static int missingNumber(int[] arr, int n) {
    int expected = n * (n + 1) / 2;
    int actual = 0;
    for (int x : arr) actual += x;
    return expected - actual;
}
```

---

## String Problems

### PYQ 6: Distinct Strings (Anagram Groups) ⭐

```java
import java.util.*;

public class DistinctStrings {
    public static int countDistinct(String[] arr) {
        HashSet<String> set = new HashSet<>();
        for (String s : arr) {
            char[] chars = s.toLowerCase().toCharArray();
            Arrays.sort(chars);
            set.add(new String(chars));
        }
        return set.size();
    }
    
    public static void main(String[] args) {
        String[] arr = {"listen", "silent", "enlist", "abc", "cab"};
        System.out.println(countDistinct(arr));  // 2
    }
}
```

---

### PYQ 7: Sentence Reconstruction ⭐

Remove extra spaces, capitalize first letter, reverse words if sentence has fewer than 5 words.

```java
import java.util.*;

public class SentenceReconstruct {
    public static String process(String input) {
        String[] sentences = input.split("\\.");
        StringBuilder result = new StringBuilder();
        
        for (String sentence : sentences) {
            String trimmed = sentence.trim();
            if (trimmed.isEmpty()) continue;
            
            String[] words = trimmed.split("\\s+");
            if (words.length < 5)
                Collections.reverse(Arrays.asList(words));
            
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < words.length; i++) {
                if (i > 0) sb.append(" ");
                String w = words[i].toLowerCase();
                sb.append(Character.toUpperCase(w.charAt(0)));
                if (w.length() > 1) sb.append(w.substring(1));
            }
            
            if (result.length() > 0) result.append(". ");
            result.append(sb);
        }
        return result.toString();
    }
}
```

---

### PYQ 8: Character Frequency (Preserving Order)

```java
public static void charFrequency(String s) {
    LinkedHashMap<Character, Integer> map = new LinkedHashMap<>();
    for (char c : s.toCharArray())
        map.put(c, map.getOrDefault(c, 0) + 1);
    for (Map.Entry<Character, Integer> e : map.entrySet())
        System.out.println(e.getKey() + " : " + e.getValue());
}
// "programming" → p:1, r:2, o:1, g:2, a:1, m:2, i:1, n:1
```

---

### PYQ 9: Check Palindrome

```java
public static boolean isPalindrome(String s) {
    int left = 0, right = s.length() - 1;
    while (left < right) {
        if (s.charAt(left) != s.charAt(right)) return false;
        left++; right--;
    }
    return true;
}
```

---

### PYQ 10: Longest Word with Maximum Vowels

```java
public static String longestWordMaxVowels(String sentence) {
    String[] words = sentence.split("\\s+");
    String result = "";
    int maxVowels = 0;
    
    for (String word : words) {
        int count = 0;
        for (char c : word.toLowerCase().toCharArray())
            if ("aeiou".indexOf(c) >= 0) count++;
        if (count > maxVowels || (count == maxVowels && word.length() > result.length())) {
            maxVowels = count;
            result = word;
        }
    }
    return result;
}
```

---

### PYQ 11: Remove Duplicate Characters (Preserve Order)

```java
public static String removeDuplicates(String s) {
    LinkedHashSet<Character> set = new LinkedHashSet<>();
    for (char c : s.toCharArray()) set.add(c);
    StringBuilder sb = new StringBuilder();
    for (char c : set) sb.append(c);
    return sb.toString();
}
// "programming" → "progamin"
```

---

### PYQ 12: Count Words in a String

```java
public static int countWords(String s) {
    if (s == null || s.trim().isEmpty()) return 0;
    return s.trim().split("\\s+").length;
}
```

---

### PYQ 13: Reverse Each Word in a String

```java
public static String reverseEachWord(String s) {
    String[] words = s.split(" ");
    StringBuilder result = new StringBuilder();
    for (int i = 0; i < words.length; i++) {
        if (i > 0) result.append(" ");
        result.append(new StringBuilder(words[i]).reverse());
    }
    return result.toString();
}
// "Hello World" → "olleH dlroW"
```

---

## Logic & Math Problems

### PYQ 14: Primes in a Range [a, b]

```java
public static void primesInRange(int a, int b) {
    if (a > b) { System.out.println("Invalid Input"); return; }
    for (int n = Math.max(a, 2); n <= b; n++) {
        boolean isPrime = true;
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) { isPrime = false; break; }
        }
        if (isPrime) System.out.print(n + " ");
    }
}
```

---

### PYQ 15: Fuel Cost Calculator

```java
public static double fuelCost(double distance, double mileage, double pricePerLitre) {
    double fuel = distance / mileage;
    double cost = fuel * pricePerLitre;
    if (cost > 1000) cost *= 1.10;  // 10% luxury tax
    return cost;
}
// 500km, 15km/l, ₹100/l → fuel=33.33L, cost=3333.33, +tax=3666.67
```

---

### PYQ 16: Fibonacci Series

```java
public static void fibonacci(int n) {
    int a = 0, b = 1;
    for (int i = 0; i < n; i++) {
        System.out.print(a + " ");
        int c = a + b;
        a = b;
        b = c;
    }
}
// n=10 → 0 1 1 2 3 5 8 13 21 34
```

---

### PYQ 17: Sum of Digits

```java
public static int sumOfDigits(int n) {
    int sum = 0;
    n = Math.abs(n);
    while (n > 0) {
        sum += n % 10;
        n /= 10;
    }
    return sum;
}
// 9875 → 29
```

---

### PYQ 18: GCD of Two Numbers

```java
public static int gcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}
```

---

> **← Back to** [Cognizant Main](../README.md) | [Java Concepts](./README.md)
