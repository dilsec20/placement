# 🎯 Cognizant GenC — Cluster 1 Previous Year Questions (PYQs)

> **Assessment:** Technical Round — Cluster 1 | **Duration:** 120 minutes  
> **Sections:** Java Coding (2 Qs) + SQL (2 Qs) + Web UI (1 Q) + Java MCQs (10 Qs)

---

## 📑 Table of Contents

1. [Java MCQ PYQs (OOPs, Exception Handling, Collections)](#1-java-mcq-pyqs)
2. [Java Coding PYQs (Arrays, Strings, Logic)](#2-java-coding-pyqs)
3. [SQL Query PYQs (Joins, Subqueries, Aggregates)](#3-sql-query-pyqs)
4. [Web UI PYQs (HTML, CSS, JavaScript)](#4-web-ui-pyqs)

---

## 1. Java MCQ PYQs

### 🔷 OOPs Concepts

**Q1.** What is the output?

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

- (a) Parent
- (b) Child
- (c) Compilation Error
- (d) Runtime Error

**Answer: (b) Child**  
> Runtime polymorphism — method resolution is based on the **object type** (`Child`), not the reference type (`Parent`).

---

**Q2.** What is the output?

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

- (a) C B A
- (b) A B C
- (c) C
- (d) Compilation Error

**Answer: (b) A B C**  
> Constructor chaining — parent constructors are called first (`super()` is implicit).

---

**Q3.** Which concept of OOP allows the same method name to perform different tasks based on the object type?

- (a) Encapsulation
- (b) Polymorphism
- (c) Inheritance
- (d) Abstraction

**Answer: (b) Polymorphism**

---

**Q4.** What is the output?

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

- (a) Dog, Bark
- (b) Animal, Bark
- (c) Animal, Some sound
- (d) Dog, Some sound

**Answer: (b) Animal, Bark**  
> Variables are resolved by **reference type** (compile-time), methods by **object type** (runtime).

---

**Q5.** Which statement about `abstract` class is TRUE?

- (a) Abstract classes can be instantiated
- (b) Abstract classes can have constructors
- (c) Abstract classes cannot have concrete methods
- (d) Abstract classes must have at least one abstract method

**Answer: (b) Abstract classes can have constructors**  
> Abstract classes CAN have constructors (called via `super()` from child class), CAN have concrete methods, CANNOT be instantiated directly, and don't necessarily need abstract methods.

---

**Q6.** What is the output?

```java
class Base {
    void display() { System.out.println("Base"); }
}
class Derived extends Base {
    void display() { System.out.println("Derived"); }
}
public class Main {
    public static void main(String[] args) {
        Base b = new Derived();
        Derived d = new Derived();
        b.display();
        d.display();
    }
}
```

- (a) Base, Derived
- (b) Derived, Derived
- (c) Base, Base
- (d) Compilation Error

**Answer: (b) Derived, Derived**  
> Both objects are of type `Derived`, so the overridden `display()` of `Derived` is called in both cases.

---

**Q7.** What does the `final` keyword do?

- (a) `final` variable → cannot be changed, `final` method → cannot be overridden, `final` class → cannot be inherited
- (b) `final` variable → cannot be accessed, `final` method → cannot be called, `final` class → cannot be imported
- (c) `final` only applies to variables
- (d) `final` makes a class abstract

**Answer: (a)**

---

**Q8.** What is the output?

```java
class Test {
    int x = 10;
    static int y = 20;
    
    void show() {
        System.out.println(x + " " + y);
    }
    
    static void staticShow() {
        // System.out.println(x); // ❌ Cannot access non-static from static context
        System.out.println(y);
    }
    
    public static void main(String[] args) {
        Test t = new Test();
        t.show();
        staticShow();
    }
}
```

- (a) 10 20, 20
- (b) Compilation Error
- (c) 10 20
- (d) 20

**Answer: (a) 10 20, 20**

---

### 🔷 Exception Handling

**Q9.** What is the output?

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

- (a) Inside try
- (b) Exception caught
- (c) Exception caught, Finally block
- (d) Inside try, Finally block

**Answer: (c) Exception caught, Finally block**  
> `finally` block ALWAYS executes (unless `System.exit(0)` is called).

---

**Q10.** What is the output?

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

- (a) Null!
- (b) Exception!
- (c) Compilation Error
- (d) Runtime Error

**Answer: (a) Null!**  
> `NullPointerException` is caught by the first matching `catch` block. More specific exceptions must come before general ones.

---

**Q11.** What is the output?

```java
public class Main {
    static int divide(int a, int b) {
        return a / b;
    }
    public static void main(String[] args) {
        try {
            int result = divide(10, 0);
            System.out.println(result);
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero");
        } finally {
            System.out.println("Done");
        }
        System.out.println("Program continues");
    }
}
```

**Output:**
```
Cannot divide by zero
Done
Program continues
```

---

**Q12.** Which of the following is a checked exception in Java?

- (a) NullPointerException
- (b) ArrayIndexOutOfBoundsException
- (c) IOException
- (d) ArithmeticException

**Answer: (c) IOException**  
> Checked exceptions must be handled (try-catch) or declared (throws). a, b, d are unchecked (RuntimeException).

---

**Q13.** What is the difference between `throw` and `throws`?

| Feature | `throw` | `throws` |
|---------|---------|----------|
| Used to | Explicitly throw an exception | Declare that a method may throw exceptions |
| Location | Inside method body | In method signature |
| Followed by | Exception object | Exception class name(s) |
| Example | `throw new ArithmeticException();` | `void read() throws IOException {}` |

---

**Q14.** What is the difference between `final`, `finally`, and `finalize`?

| Feature | `final` | `finally` | `finalize` |
|---------|---------|-----------|------------|
| Type | Keyword | Block | Method |
| Purpose | Restrict modification | Execute cleanup code | Called by GC before object destruction |
| Used with | Variable, Method, Class | try-catch | Object class |

---

### 🔷 Collections & Strings

**Q15.** What is the output?

```java
import java.util.*;
public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();
        list.add(10);
        list.add(20);
        list.add(30);
        list.remove(1);  // removes element at INDEX 1
        System.out.println(list);
    }
}
```

- (a) [10, 30]
- (b) [10, 20]
- (c) [20, 30]
- (d) Compilation Error

**Answer: (a) [10, 30]**  
> `remove(1)` removes the element at index 1 (which is 20). To remove the object `Integer(1)`, use `remove(Integer.valueOf(1))`.

---

**Q16.** What is the output?

```java
public class Main {
    public static void main(String[] args) {
        String s1 = "Hello";
        String s2 = "Hello";
        String s3 = new String("Hello");
        
        System.out.println(s1 == s2);       // true (same pool reference)
        System.out.println(s1 == s3);       // false (different objects)
        System.out.println(s1.equals(s3));  // true (same content)
    }
}
```

**Answer:** `true, false, true`  
> `==` compares references, `.equals()` compares content.

---

**Q17.** What is the output?

```java
public class Main {
    public static void main(String[] args) {
        String s = "Hello World";
        System.out.println(s.substring(6));       // World
        System.out.println(s.indexOf("o"));        // 4
        System.out.println(s.charAt(1));           // e
        System.out.println(s.replace('l', 'x'));   // Hexxo Worxd
        System.out.println(s.toUpperCase());       // HELLO WORLD
    }
}
```

---

**Q18.** What is the difference between `HashMap` and `HashSet`?

| Feature | HashMap | HashSet |
|---------|---------|---------|
| Stores | Key-Value pairs | Only values (keys) |
| Duplicates | Keys: No, Values: Yes | No duplicates |
| Null | 1 null key, any null values | 1 null value |
| Method | put(key, value) | add(value) |
| Implements | Map interface | Set interface |
| Internally | Hash table | Uses HashMap internally |

---

**Q19.** What is the output?

```java
import java.util.*;
public class Main {
    public static void main(String[] args) {
        HashSet<String> set = new HashSet<>();
        set.add("Apple");
        set.add("Banana");
        set.add("Apple");
        set.add("Cherry");
        System.out.println(set.size());
    }
}
```

**Answer: 3** — HashSet doesn't allow duplicates, so "Apple" is stored only once.

---

**Q20.** Which interface does `ArrayList` implement?

- (a) Set
- (b) Map
- (c) List
- (d) Queue

**Answer: (c) List**

---

### 🔷 Multithreading & Misc

**Q21.** How do you create a thread in Java? (Two ways)

```java
// Method 1: Extend Thread class
class MyThread extends Thread {
    public void run() {
        System.out.println("Thread running");
    }
}

// Method 2: Implement Runnable interface
class MyRunnable implements Runnable {
    public void run() {
        System.out.println("Runnable running");
    }
}

// Usage:
// new MyThread().start();
// new Thread(new MyRunnable()).start();
```

---

**Q22.** What is the difference between `==` and `.equals()` in Java?

| `==` | `.equals()` |
|------|-------------|
| Compares **references** (memory addresses) | Compares **content/values** |
| Works for primitives and objects | Works only for objects |
| Cannot be overridden | Can be overridden in a class |
| `s1 == s2` → are they same object? | `s1.equals(s2)` → same value? |

---

## 2. Java Coding PYQs

### 🟢 PYQ 1: Second Largest Element in Array

**Problem:** Given an array of integers, find the second largest element.

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

// Input: 5 → 12 35 1 10 34
// Output: 34
```

---

### 🟢 PYQ 2: Count Subarrays of Size 3 Where arr[0]+arr[2] == arr[1]

**Problem:** Given an integer array, find the count of subarrays of size 3 where the sum of the first and third elements equals the second element.

```java
import java.util.*;

public class SubarrayCount {
    public static int countSubarrays(int[] arr) {
        int count = 0;
        for (int i = 0; i <= arr.length - 3; i++) {
            if (arr[i] + arr[i + 2] == arr[i + 1]) {
                count++;
            }
        }
        return count;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        System.out.println(countSubarrays(arr));
    }
}

// Input: 6 → 1 5 3 2 4 2
// arr[0]+arr[2]=1+3=4 ≠ 5, arr[1]+arr[3]=5+2=7 ≠ 3, 
// arr[2]+arr[4]=3+4=7 ≠ 2, arr[3]+arr[5]=2+2=4 = arr[4]=4 → count=1
// Output: 1
```

---

### 🟢 PYQ 3: Count Distinct Strings (Anagram Groups)

**Problem:** Find the number of distinct strings where two strings are considered same if one is a rearrangement of the other.

```java
import java.util.*;

public class DistinctStrings {
    public static int countDistinct(String[] arr) {
        HashSet<String> set = new HashSet<>();
        for (String s : arr) {
            char[] chars = s.toCharArray();
            Arrays.sort(chars);
            set.add(new String(chars));
        }
        return set.size();
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        String[] arr = new String[n];
        for (int i = 0; i < n; i++) arr[i] = sc.next();
        System.out.println(countDistinct(arr));
    }
}

// Input: 5 → listen silent enlist abc cab
// Sorted: eilnst eilnst eilnst abc abc → Distinct = 2
// Output: 2
```

---

### 🟡 PYQ 4: Sentence Reconstruction

**Problem:** Given a string of sentences separated by '.', remove extra spaces, count words in each sentence. If a sentence has fewer than 5 words, reverse the words. Capitalize first letter of each word.

```java
import java.util.*;

public class SentenceReconstruct {
    public static String reconstruct(String input) {
        String[] sentences = input.split("\\.");
        StringBuilder result = new StringBuilder();
        
        for (int i = 0; i < sentences.length; i++) {
            String sentence = sentences[i].trim();
            if (sentence.isEmpty()) continue;
            
            // Split by spaces, remove extra spaces
            String[] words = sentence.trim().split("\\s+");
            
            // Reverse if fewer than 5 words
            if (words.length < 5) {
                Collections.reverse(Arrays.asList(words));
            }
            
            // Capitalize first letter of each word
            StringBuilder sb = new StringBuilder();
            for (int j = 0; j < words.length; j++) {
                if (j > 0) sb.append(" ");
                String w = words[j].toLowerCase();
                sb.append(Character.toUpperCase(w.charAt(0)));
                sb.append(w.substring(1));
            }
            
            if (result.length() > 0) result.append(". ");
            result.append(sb.toString());
        }
        return result.toString();
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();
        System.out.println(reconstruct(input));
    }
}
```

---

### 🟡 PYQ 5: Check Palindrome String

```java
public class Palindrome {
    public static boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) return false;
            left++;
            right--;
        }
        return true;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        System.out.println(isPalindrome(s) ? "Palindrome" : "Not Palindrome");
    }
}
```

---

### 🟡 PYQ 6: Longest Word with Only Vowels/Consonants

**Problem:** Find the longest word from a sentence that contains only vowels (or only consonants, depending on variant).

```java
import java.util.*;

public class LongestWord {
    
    // Variant 1: Longest word with maximum vowels
    public static String longestWithMostVowels(String sentence) {
        String[] words = sentence.split("\\s+");
        String result = "";
        int maxVowels = 0;
        
        for (String word : words) {
            int count = 0;
            for (char c : word.toLowerCase().toCharArray()) {
                if ("aeiou".indexOf(c) >= 0) count++;
            }
            if (count > maxVowels || (count == maxVowels && word.length() > result.length())) {
                maxVowels = count;
                result = word;
            }
        }
        return result;
    }
    
    // Variant 2: Longest word overall
    public static String longestWord(String sentence) {
        String[] words = sentence.split("\\s+");
        String longest = "";
        for (String w : words) {
            if (w.length() > longest.length()) longest = w;
        }
        return longest;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        System.out.println(longestWithMostVowels(s));
    }
}
```

---

### 🟡 PYQ 7: Frequency of Characters in a String

```java
import java.util.*;

public class CharFrequency {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        
        LinkedHashMap<Character, Integer> freq = new LinkedHashMap<>();
        for (char c : s.toCharArray()) {
            freq.put(c, freq.getOrDefault(c, 0) + 1);
        }
        
        for (Map.Entry<Character, Integer> entry : freq.entrySet()) {
            System.out.println(entry.getKey() + " : " + entry.getValue());
        }
    }
}

// Input: programming
// Output: p:1 r:2 o:1 g:2 a:1 m:2 i:1 n:1
```

---

### 🟡 PYQ 8: Sort Array and Find Consecutive Pairs

**Problem:** Given an array, sort it and find all pairs of consecutive elements where the difference is 1.

```java
import java.util.*;

public class ConsecutivePairs {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        
        Arrays.sort(arr);
        int count = 0;
        
        for (int i = 0; i < n - 1; i++) {
            if (arr[i + 1] - arr[i] == 1) {
                System.out.println("(" + arr[i] + ", " + arr[i + 1] + ")");
                count++;
            }
        }
        System.out.println("Total consecutive pairs: " + count);
    }
}
```

---

### 🔴 PYQ 9: Remove Duplicate Characters Preserving Order

```java
import java.util.*;

public class RemoveDuplicates {
    public static String removeDups(String s) {
        LinkedHashSet<Character> set = new LinkedHashSet<>();
        for (char c : s.toCharArray()) set.add(c);
        
        StringBuilder sb = new StringBuilder();
        for (char c : set) sb.append(c);
        return sb.toString();
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        System.out.println(removeDups(s));
    }
}

// Input: "programming" → Output: "progamin"
```

---

### 🔴 PYQ 10: Calculate Fuel Consumption

**Problem:** Calculate total fuel cost for a journey given distance, mileage (km/liter), fuel cost per liter, and a luxury tax of 10% if cost exceeds ₹1000.

```java
import java.util.*;

public class FuelCalculation {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double distance = sc.nextDouble();
        double mileage = sc.nextDouble();
        double pricePerLitre = sc.nextDouble();
        
        double fuelNeeded = distance / mileage;
        double totalCost = fuelNeeded * pricePerLitre;
        
        if (totalCost > 1000) {
            totalCost *= 1.10;  // 10% luxury tax
        }
        
        System.out.printf("Fuel needed: %.2f litres%n", fuelNeeded);
        System.out.printf("Total cost: Rs. %.2f%n", totalCost);
    }
}

// Input: 500 15 100
// Fuel = 500/15 = 33.33L, Cost = 3333.33, Tax = 3333.33*1.1 = 3666.67
```

---

## 3. SQL Query PYQs

### 🟢 PYQ 1: Find the Second Highest Salary

```sql
-- Method 1: Subquery
SELECT MAX(salary) AS second_highest
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);

-- Method 2: LIMIT/OFFSET
SELECT DISTINCT salary 
FROM employees 
ORDER BY salary DESC 
LIMIT 1 OFFSET 1;

-- Method 3: DENSE_RANK() (Window Function)
SELECT salary FROM (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
    FROM employees
) ranked
WHERE rnk = 2;
```

---

### 🟢 PYQ 2: Find Employees Who Earn More Than Their Manager

```sql
-- Using Self Join
SELECT e.name AS Employee, e.salary AS EmpSalary, 
       m.name AS Manager, m.salary AS MgrSalary
FROM employees e
JOIN employees m ON e.manager_id = m.emp_id
WHERE e.salary > m.salary;
```

---

### 🟢 PYQ 3: Count Employees in Each Department Having More Than 5

```sql
SELECT department, COUNT(*) AS emp_count
FROM employees
GROUP BY department
HAVING COUNT(*) > 5
ORDER BY emp_count DESC;
```

---

### 🟡 PYQ 4: Find Customers Who Never Placed an Order

```sql
-- Using LEFT JOIN
SELECT c.customer_id, c.name
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;

-- Using NOT IN
SELECT customer_id, name
FROM customers
WHERE customer_id NOT IN (SELECT DISTINCT customer_id FROM orders);

-- Using NOT EXISTS
SELECT c.customer_id, c.name
FROM customers c
WHERE NOT EXISTS (
    SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id
);
```

---

### 🟡 PYQ 5: Find Departments with Average Salary Above 80,000

```sql
SELECT department, AVG(salary) AS avg_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 80000
ORDER BY avg_salary DESC;
```

---

### 🟡 PYQ 6: Find Duplicate Emails

```sql
SELECT email, COUNT(*) AS count
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
```

---

### 🟡 PYQ 7: Get Employee Details with Department Name (Inner Join)

```sql
SELECT e.emp_id, e.name, e.salary, d.dept_name
FROM employees e
INNER JOIN departments d ON e.dept_id = d.dept_id
ORDER BY e.name;
```

---

### 🔴 PYQ 8: Find Nth Highest Salary (Generic)

```sql
-- Using DENSE_RANK (set N = any value)
SELECT salary FROM (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
    FROM employees
) ranked
WHERE rnk = N;  -- Replace N with desired rank

-- Using LIMIT OFFSET
SELECT DISTINCT salary 
FROM employees 
ORDER BY salary DESC 
LIMIT 1 OFFSET N-1;  -- Replace N with desired rank
```

---

### 🔴 PYQ 9: Get Employees Who Joined in the Last 30 Days

```sql
SELECT emp_id, name, join_date
FROM employees
WHERE join_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY);

-- Alternative using DATEDIFF
SELECT emp_id, name, join_date
FROM employees
WHERE DATEDIFF(CURDATE(), join_date) <= 30;
```

---

### 🔴 PYQ 10: Pivot-Style Query (Department-wise Salary Summary)

```sql
SELECT department,
       COUNT(*) AS total_emp,
       MIN(salary) AS min_salary,
       MAX(salary) AS max_salary,
       ROUND(AVG(salary), 2) AS avg_salary,
       SUM(salary) AS total_salary
FROM employees
GROUP BY department
ORDER BY total_salary DESC;
```

---

### 📝 Key SQL Concepts Quick Revision

**DELETE vs TRUNCATE vs DROP:**

| Feature | DELETE | TRUNCATE | DROP |
|---------|--------|----------|------|
| Type | DML | DDL | DDL |
| Removes | Specific rows (WHERE) | All rows | Entire table |
| Rollback | ✅ Yes | ❌ No | ❌ No |
| Log | Row-by-row | Minimal | N/A |
| Speed | Slow | Fast | Fast |
| Triggers | ✅ Fires | ❌ No | ❌ No |

**JOIN Types:**

```
INNER JOIN   → Only matching rows from both tables
LEFT JOIN    → All rows from left + matching from right (NULL if no match)
RIGHT JOIN   → All rows from right + matching from left (NULL if no match)
FULL OUTER   → All rows from both (NULL where no match)
CROSS JOIN   → Cartesian product (every row × every row)
SELF JOIN    → Join table with itself
```

**WHERE vs HAVING:**

| WHERE | HAVING |
|-------|--------|
| Filters **rows** before grouping | Filters **groups** after grouping |
| Cannot use aggregate functions | CAN use aggregate functions |
| Used without GROUP BY | Used WITH GROUP BY |

**Order of SQL Execution:**
```
FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT
```

---

## 4. Web UI PYQs

### 🟢 PYQ 1: Create a Simple Form (HTML + CSS)

```html
<!DOCTYPE html>
<html>
<head>
    <title>Registration Form</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input, select { width: 300px; padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
        button { padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
        button:hover { background: #0056b3; }
    </style>
</head>
<body>
    <h1>Registration Form</h1>
    <form id="regForm">
        <div class="form-group">
            <label for="name">Full Name:</label>
            <input type="text" id="name" name="name" required>
        </div>
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
        </div>
        <div class="form-group">
            <label for="phone">Phone:</label>
            <input type="tel" id="phone" name="phone" pattern="[0-9]{10}">
        </div>
        <div class="form-group">
            <label for="gender">Gender:</label>
            <select id="gender" name="gender">
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
        </div>
        <button type="submit">Register</button>
    </form>
    
    <script>
        document.getElementById('regForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Registration Successful!');
        });
    </script>
</body>
</html>
```

---

### 🟢 PYQ 2: JavaScript — DOM Manipulation

**Task:** Create a button that changes the background color of a div when clicked.

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        #colorBox { width: 200px; height: 200px; background: #3498db; margin: 20px 0; border-radius: 8px; transition: background 0.3s; }
        button { padding: 10px 20px; cursor: pointer; }
    </style>
</head>
<body>
    <div id="colorBox"></div>
    <button onclick="changeColor()">Change Color</button>
    
    <script>
        function changeColor() {
            var colors = ['#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];
            var randomColor = colors[Math.floor(Math.random() * colors.length)];
            document.getElementById('colorBox').style.background = randomColor;
        }
    </script>
</body>
</html>
```

---

### 🟡 PYQ 3: JavaScript — Array Operations

```javascript
// Find the maximum element in an array
function findMax(arr) {
    return Math.max(...arr);
}

// Sort array in ascending order
function sortAsc(arr) {
    return arr.sort(function(a, b) { return a - b; });
}

// Filter even numbers
function filterEven(arr) {
    return arr.filter(function(n) { return n % 2 === 0; });
}

// Sum of array elements
function sumArray(arr) {
    return arr.reduce(function(sum, n) { return sum + n; }, 0);
}

// Remove duplicates
function removeDuplicates(arr) {
    return [...new Set(arr)];
}

// Example usage:
var arr = [5, 3, 8, 1, 9, 2, 8, 5, 3];
console.log("Max:", findMax(arr));               // 9
console.log("Sorted:", sortAsc(arr));            // [1,2,3,3,5,5,8,8,9]
console.log("Even:", filterEven(arr));           // [8,2,8]
console.log("Sum:", sumArray(arr));              // 44
console.log("Unique:", removeDuplicates(arr));   // [5,3,8,1,9,2]
```

---

### 🟡 PYQ 4: Create a Table with Styling

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        table { border-collapse: collapse; width: 100%; max-width: 600px; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #007bff; color: white; }
        tr:nth-child(even) { background-color: #f2f2f2; }
        tr:hover { background-color: #ddd; }
    </style>
</head>
<body>
    <h2>Employee Table</h2>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Salary</th>
            </tr>
        </thead>
        <tbody>
            <tr><td>1</td><td>Alice</td><td>Engineering</td><td>₹85,000</td></tr>
            <tr><td>2</td><td>Bob</td><td>Marketing</td><td>₹72,000</td></tr>
            <tr><td>3</td><td>Carol</td><td>HR</td><td>₹68,000</td></tr>
            <tr><td>4</td><td>David</td><td>Engineering</td><td>₹90,000</td></tr>
        </tbody>
    </table>
</body>
</html>
```

---

### 🟡 PYQ 5: JavaScript — Form Validation

```html
<!DOCTYPE html>
<html>
<body>
    <form id="loginForm">
        <input type="text" id="username" placeholder="Username"><br><br>
        <input type="password" id="password" placeholder="Password"><br><br>
        <button type="submit">Login</button>
        <p id="error" style="color:red;"></p>
    </form>
    
    <script>
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            var user = document.getElementById('username').value;
            var pass = document.getElementById('password').value;
            var errorMsg = document.getElementById('error');
            
            if (user === '') {
                errorMsg.textContent = 'Username is required!';
            } else if (pass === '') {
                errorMsg.textContent = 'Password is required!';
            } else if (pass.length < 6) {
                errorMsg.textContent = 'Password must be at least 6 characters!';
            } else {
                errorMsg.textContent = '';
                alert('Login Successful! Welcome, ' + user);
            }
        });
    </script>
</body>
</html>
```

---

### 📝 Web UI Quick Reference

**CSS Selectors:**
```css
#id            /* ID selector */
.class         /* Class selector */
element        /* Tag selector */
div > p        /* Direct child */
div p          /* Any descendant */
a:hover        /* Pseudo-class */
::before       /* Pseudo-element */
```

**CSS Box Model:** `content → padding → border → margin`

**JavaScript Events:** `onclick`, `onchange`, `onsubmit`, `onkeyup`, `onload`, `onmouseover`

**JS DOM Methods:**
```javascript
document.getElementById('id')
document.querySelector('.class')
document.querySelectorAll('div')
element.innerHTML = 'text'
element.style.color = 'red'
element.classList.add('active')
element.addEventListener('click', fn)
```

---

## 📊 Exam Strategy Cheat Sheet

| Section | Questions | Time | Strategy |
|---------|-----------|------|----------|
| Java MCQs | 10 | 15 min | Quick conceptual recall, eliminate wrong options |
| Java Coding | 2 | 50 min | Read both, solve easier one first, handle edge cases |
| SQL Queries | 2 | 30 min | Know JOINs and GROUP BY cold, test with sample data mentally |
| Web UI | 1 | 25 min | Structure HTML first, then CSS, then JS logic |

### ⚡ Last-Minute Tips

```
✅ For Java MCQs: Focus on output-based questions — trace code line by line
✅ For Java Coding: Use Scanner for input, handle edge cases (empty, null, single element)
✅ For SQL: Remember execution order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY
✅ For Web UI: Use semantic HTML, proper CSS selectors, addEventListener over inline handlers
✅ TIME: Don't spend >15 min on any single coding question — move on and come back
```

---

> **← Back to** [Cognizant Main](./README.md)
