# Java Output Prediction Questions — MCQ Round Prep (Recruit CRM + TCS)

> ⚠️ **These are the MOST COMMON "tricky" output questions asked in online MCQ rounds.**
> For each question: First try to predict the output yourself, then check the answer.

---

## CATEGORY 1: Static Blocks, Instance Blocks & Constructors

---

### Q1. Initialization Order with Inheritance

```java
class Parent {
    static { System.out.print("1 "); }
    { System.out.print("2 "); }
    Parent() { System.out.print("3 "); }
}

class Child extends Parent {
    static { System.out.print("4 "); }
    { System.out.print("5 "); }
    Child() { System.out.print("6 "); }

    public static void main(String[] args) {
        new Child();
    }
}
```

<details>
<summary><b>🔍 Click to reveal answer</b></summary>

**Output:** `1 4 2 3 5 6`

**Execution Order:**
1. Parent static block → `1`
2. Child static block → `4`
3. Parent instance block → `2`
4. Parent constructor → `3`
5. Child instance block → `5`
6. Child constructor → `6`

**Rule:** Static blocks (parent→child) → Instance blocks + Constructor (parent→child)

</details>

---

### Q2. Multiple Objects — Static runs only ONCE

```java
class Test {
    static { System.out.print("S "); }
    { System.out.print("I "); }
    Test() { System.out.print("C "); }

    public static void main(String[] args) {
        new Test();
        new Test();
    }
}
```

<details>
<summary><b>🔍 Click to reveal answer</b></summary>

**Output:** `S I C I C`

**Why:** Static block executes only ONCE when class is loaded. Instance block + Constructor execute for each `new`.

</details>

---

### Q3. Constructor Chaining

```java
class A {
    A() { this(10); System.out.print("A() "); }
    A(int x) { System.out.print("A(int) "); }
}

class B extends A {
    B() { System.out.print("B() "); }

    public static void main(String[] args) {
        new B();
    }
}
```

<details>
<summary><b>🔍 Click to reveal answer</b></summary>

**Output:** `A(int) A() B()`

**Why:**
1. `new B()` → calls `B()` constructor
2. `B()` has implicit `super()` → calls `A()`
3. `A()` calls `this(10)` → calls `A(int)`
4. `A(int)` prints "A(int)"
5. Back in `A()` → prints "A()"
6. Back in `B()` → prints "B()"

</details>

---

## CATEGORY 2: Polymorphism & Method Resolution

---

### Q4. Runtime Polymorphism

```java
class Animal {
    void sound() { System.out.println("Animal sound"); }
}

class Dog extends Animal {
    void sound() { System.out.println("Bark"); }
}

class Cat extends Animal {
    void sound() { System.out.println("Meow"); }
}

public class Test {
    public static void main(String[] args) {
        Animal a = new Dog();
        a.sound();

        a = new Cat();
        a.sound();
    }
}
```

<details>
<summary><b>🔍 Click to reveal answer</b></summary>

**Output:**
```
Bark
Meow
```

**Why:** Method resolution happens at **runtime** based on the actual object type, not the reference type. This is **Dynamic Method Dispatch**.

</details>

---

### Q5. Static Methods — Method HIDING (Not Overriding!)

```java
class Parent {
    static void display() { System.out.println("Parent"); }
}

class Child extends Parent {
    static void display() { System.out.println("Child"); }
}

public class Test {
    public static void main(String[] args) {
        Parent obj = new Child();
        obj.display();
    }
}
```

<details>
<summary><b>🔍 Click to reveal answer</b></summary>

**Output:** `Parent`

**Why:** Static methods are resolved at **compile-time** based on the **reference type** (Parent), not the object type (Child). Static methods are **hidden**, not overridden.

</details>

---

### Q6. Overloading with Type Promotion

```java
class Test {
    void method(int a) { System.out.println("int"); }
    void method(long a) { System.out.println("long"); }
    void method(double a) { System.out.println("double"); }

    public static void main(String[] args) {
        Test t = new Test();
        t.method(10);       // ?
        t.method(10L);      // ?
        t.method(10.0f);    // ?
        t.method('A');      // ?
    }
}
```

<details>
<summary><b>🔍 Click to reveal answer</b></summary>

**Output:**
```
int
long
double
int
```

**Why:**
- `10` → exact match `int`
- `10L` → exact match `long`
- `10.0f` → no `float` method → promotes to `double`
- `'A'` → no `char` method → promotes to `int` (char → int → long → double)

**Type Promotion Order:** `byte → short → int → long → float → double`

</details>

---

### Q7. Variable Hiding vs Method Overriding

```java
class Parent {
    int x = 10;
    void show() { System.out.println(x); }
}

class Child extends Parent {
    int x = 20;
    void show() { System.out.println(x); }
}

public class Test {
    public static void main(String[] args) {
        Parent obj = new Child();
        System.out.println(obj.x);  // ?
        obj.show();                 // ?
    }
}
```

<details>
<summary><b>🔍 Click to reveal answer</b></summary>

**Output:**
```
10
20
```

**Why:**
- **Variables** are resolved at **compile-time** → `obj.x` uses Parent's x (10)
- **Methods** are resolved at **runtime** → `obj.show()` uses Child's show() which prints Child's x (20)

**Key Rule:** Variables are NOT polymorphic. Only methods are.

</details>

---

## CATEGORY 3: String Pool & Immutability

---

### Q8. String Pool Behavior

```java
public class Test {
    public static void main(String[] args) {
        String s1 = "Hello";
        String s2 = "Hello";
        String s3 = new String("Hello");
        String s4 = new String("Hello").intern();

        System.out.println(s1 == s2);      // ?
        System.out.println(s1 == s3);      // ?
        System.out.println(s1 == s4);      // ?
        System.out.println(s1.equals(s3)); // ?
    }
}
```

<details>
<summary><b>🔍 Click to reveal answer</b></summary>

**Output:**
```
true
false
true
true
```

**Why:**
- `s1 == s2` → Both point to same object in **String Pool** → `true`
- `s1 == s3` → `new String()` creates new object in **Heap** → different reference → `false`
- `s1 == s4` → `intern()` returns reference from String Pool → same as s1 → `true`
- `s1.equals(s3)` → compares content → `true`

</details>

---

### Q9. String Immutability Trap

```java
public class Test {
    public static void main(String[] args) {
        String s = "Hello";
        s.concat(" World");
        System.out.println(s);

        s = s.concat(" World");
        System.out.println(s);
    }
}
```

<details>
<summary><b>🔍 Click to reveal answer</b></summary>

**Output:**
```
Hello
Hello World
```

**Why:** Strings are **immutable**. `s.concat(" World")` creates a NEW String object but doesn't assign it back. The original `s` is unchanged. You must reassign: `s = s.concat(...)`.

</details>

---

## CATEGORY 4: Integer Caching & Autoboxing

---

### Q10. Integer Cache Surprise

```java
public class Test {
    public static void main(String[] args) {
        Integer a = 127;
        Integer b = 127;
        System.out.println(a == b);       // ?

        Integer c = 128;
        Integer d = 128;
        System.out.println(c == d);       // ?

        System.out.println(c.equals(d));  // ?
    }
}
```

<details>
<summary><b>🔍 Click to reveal answer</b></summary>

**Output:**
```
true
false
true
```

**Why:** Java caches `Integer` objects for values **-128 to 127**. Within this range, autoboxing returns the same cached object. Outside this range, new objects are created.

- `127` is cached → same object → `==` is `true`
- `128` is NOT cached → different objects → `==` is `false`
- `.equals()` compares value → always `true`

**Interview Tip:** Always use `.equals()` for wrapper class comparisons!

</details>

---

## CATEGORY 5: Exception Handling

---

### Q11. try-catch-finally with return

```java
public class Test {
    public static int getValue() {
        try {
            return 1;
        } catch (Exception e) {
            return 2;
        } finally {
            System.out.println("Finally executed");
        }
    }

    public static void main(String[] args) {
        System.out.println(getValue());
    }
}
```

<details>
<summary><b>🔍 Click to reveal answer</b></summary>

**Output:**
```
Finally executed
1
```

**Why:** `finally` block ALWAYS executes, even when `try` has a `return`. The return value (1) is saved, finally executes, then the saved value is returned.

</details>

---

### Q12. finally overriding return

```java
public class Test {
    public static int getValue() {
        try {
            return 1;
        } finally {
            return 2;  // WARNING: This overrides try's return!
        }
    }

    public static void main(String[] args) {
        System.out.println(getValue());
    }
}
```

<details>
<summary><b>🔍 Click to reveal answer</b></summary>

**Output:** `2`

**Why:** If `finally` has its own `return`, it **overrides** the `try` block's return value. This is a bad practice and most IDEs will warn about it.

</details>

---

### Q13. Exception in Catch

```java
public class Test {
    public static void main(String[] args) {
        try {
            System.out.println("try");
            throw new RuntimeException();
        } catch (Exception e) {
            System.out.println("catch");
            throw new RuntimeException();
        } finally {
            System.out.println("finally");
        }
    }
}
```

<details>
<summary><b>🔍 Click to reveal answer</b></summary>

**Output:**
```
try
catch
finally
```
Then a `RuntimeException` is thrown.

**Why:** Even if `catch` throws an exception, `finally` still executes before the exception propagates.

</details>

---

## CATEGORY 6: Collections & Iterators

---

### Q14. ConcurrentModificationException

```java
import java.util.*;

public class Test {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));
        for (String s : list) {
            if (s.equals("B")) {
                list.remove(s);  // What happens?
            }
        }
    }
}
```

<details>
<summary><b>🔍 Click to reveal answer</b></summary>

**Answer:** Throws `ConcurrentModificationException`!

**Why:** You cannot modify a collection while iterating over it with a for-each loop (which uses an Iterator internally).

**Fix:** Use `Iterator.remove()` or `list.removeIf(s -> s.equals("B"))`.

```java
// Correct approach 1: Iterator
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    if (it.next().equals("B")) it.remove();
}

// Correct approach 2: removeIf (Java 8+)
list.removeIf(s -> s.equals("B"));
```

</details>

---

### Q15. HashMap with Custom Key

```java
import java.util.*;

class Key {
    int id;
    Key(int id) { this.id = id; }
}

public class Test {
    public static void main(String[] args) {
        Map<Key, String> map = new HashMap<>();
        Key k1 = new Key(1);
        map.put(k1, "Hello");
        System.out.println(map.get(new Key(1)));  // ?
    }
}
```

<details>
<summary><b>🔍 Click to reveal answer</b></summary>

**Output:** `null`

**Why:** The `Key` class doesn't override `hashCode()` and `equals()`. So `new Key(1)` is a completely different object with a different hashCode. The map can't find the value.

**Fix:** Override both `hashCode()` and `equals()` in the Key class.

</details>

---

## CATEGORY 7: Post-increment & Operator Tricks

---

### Q16. Post-increment Assignment

```java
public class Test {
    public static void main(String[] args) {
        int num = 0;
        num = num++;
        System.out.println(num);  // ?
    }
}
```

<details>
<summary><b>🔍 Click to reveal answer</b></summary>

**Output:** `0`

**Why:** `num++` returns the CURRENT value (0) before incrementing. Then the assignment `num =` overwrites the incremented value with 0.

Step by step:
1. `num++` evaluates to 0 (post-increment returns current value)
2. num is incremented to 1 internally
3. `num = 0` assigns 0 back, overwriting the increment

</details>

---

### Q17. Pre vs Post Increment

```java
public class Test {
    public static void main(String[] args) {
        int a = 5;
        int b = a++ + ++a;
        System.out.println("a = " + a + ", b = " + b);
    }
}
```

<details>
<summary><b>🔍 Click to reveal answer</b></summary>

**Output:** `a = 7, b = 12`

**Why:**
1. `a++` → evaluates to 5 (a becomes 6 after)
2. `++a` → a becomes 7, evaluates to 7
3. `b = 5 + 7 = 12`
4. Final: `a = 7, b = 12`

</details>

---

## CATEGORY 8: Miscellaneous Tricky Questions

---

### Q18. Array vs ArrayList Size

```java
public class Test {
    public static void main(String[] args) {
        int[] arr = new int[5];
        System.out.println(arr.length);    // ? (no parentheses!)

        String str = "Hello";
        System.out.println(str.length());  // ? (with parentheses!)

        java.util.List<Integer> list = new java.util.ArrayList<>();
        list.add(1); list.add(2);
        System.out.println(list.size());   // ? (size, not length!)
    }
}
```

<details>
<summary><b>🔍 Click to reveal answer</b></summary>

**Output:**
```
5
5
2
```

**Key Differences:**
- **Array** → `.length` (field, no parentheses)
- **String** → `.length()` (method, with parentheses)
- **Collection** → `.size()` (method, different name!)

</details>

---

### Q19. Short-Circuit Evaluation

```java
public class Test {
    public static void main(String[] args) {
        int a = 5;
        if (a > 3 || ++a > 5) {
            System.out.println(a);  // ?
        }

        int b = 5;
        if (b > 3 && ++b > 5) {
            System.out.println(b);  // ?
        }
    }
}
```

<details>
<summary><b>🔍 Click to reveal answer</b></summary>

**Output:**
```
5
6
```

**Why:**
- `||` (OR): Since `a > 3` is true, `++a` is NEVER evaluated (short-circuit). a stays 5.
- `&&` (AND): Since `b > 3` is true, `++b` IS evaluated. b becomes 6, and `6 > 5` is true.

</details>

---

### Q20. Ternary Operator Type Promotion

```java
public class Test {
    public static void main(String[] args) {
        int x = 5;
        System.out.println(x > 3 ? "Yes" : 10);  // ?

        Object result = true ? new Integer(1) : new Double(2.0);
        System.out.println(result);  // ?
    }
}
```

<details>
<summary><b>🔍 Click to reveal answer</b></summary>

**Output:**
```
Yes
1.0
```

**Why:**
- First: condition is true, so "Yes" is returned.
- Second: Even though the condition is true and returns `Integer(1)`, the ternary operator promotes both sides to a common type. Since one side is `Double`, the `Integer` is promoted to `Double` → `1.0`.

</details>

---

## CATEGORY 9: `this` and `super` Tricky Scenarios

---

### Q21. Calling super() and this() together

```java
class Parent {
    Parent() { System.out.print("Parent "); }
}

class Child extends Parent {
    Child() {
        super();
        // this(10);  // ← Would cause COMPILATION ERROR!
        System.out.print("Child ");
    }
    Child(int x) { System.out.print("Child(int) "); }

    public static void main(String[] args) {
        new Child();
    }
}
```

<details>
<summary><b>🔍 Click to reveal answer</b></summary>

**Output:** `Parent Child`

**Rule:** `super()` and `this()` both MUST be the first statement in a constructor. Therefore, they can NEVER be used together in the same constructor.

</details>

---

### Q22. Abstract Class Constructor

```java
abstract class Shape {
    Shape() { System.out.print("Shape "); }
    abstract void draw();
}

class Circle extends Shape {
    Circle() {
        super();
        System.out.print("Circle ");
    }
    void draw() { System.out.print("Drawing "); }

    public static void main(String[] args) {
        Shape s = new Circle();
        s.draw();
    }
}
```

<details>
<summary><b>🔍 Click to reveal answer</b></summary>

**Output:** `Shape Circle Drawing`

**Key Insight:** Abstract classes CAN have constructors! They are called when a concrete subclass is instantiated. You just can't do `new Shape()` directly.

</details>

---

## CATEGORY 10: Java 8 Stream & Lambda Questions

---

### Q23. Stream Pipeline

```java
import java.util.*;
import java.util.stream.*;

public class Test {
    public static void main(String[] args) {
        List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6);

        int result = nums.stream()
            .filter(n -> n % 2 == 0)
            .map(n -> n * n)
            .reduce(0, Integer::sum);

        System.out.println(result);  // ?
    }
}
```

<details>
<summary><b>🔍 Click to reveal answer</b></summary>

**Output:** `56`

**Why:**
1. `filter(n -> n % 2 == 0)` → [2, 4, 6]
2. `map(n -> n * n)` → [4, 16, 36]
3. `reduce(0, Integer::sum)` → 0 + 4 + 16 + 36 = 56

</details>

---

### Q24. Stream Laziness

```java
import java.util.stream.*;

public class Test {
    public static void main(String[] args) {
        Stream.of("a", "b", "c", "d")
            .filter(s -> {
                System.out.println("filter: " + s);
                return true;
            })
            .forEach(s -> System.out.println("forEach: " + s));
    }
}
```

<details>
<summary><b>🔍 Click to reveal answer</b></summary>

**Output:**
```
filter: a
forEach: a
filter: b
forEach: b
filter: c
forEach: c
filter: d
forEach: d
```

**Why:** Streams process elements **one at a time**, not all-at-once. Each element goes through the entire pipeline before the next element starts. This is called **lazy evaluation with vertical processing**.

</details>

---

## 📊 Quick Reference: Common Trap Summary

| Trap | Key Rule |
| :--- | :--- |
| Static block order | Parent static → Child static (runs ONCE) |
| Instance block order | Parent instance → Parent constructor → Child instance → Child constructor |
| Static method with polymorphism | Resolved by **reference type** (compile-time) |
| Instance method with polymorphism | Resolved by **object type** (runtime) |
| Variable with polymorphism | Resolved by **reference type** (NOT polymorphic) |
| String Pool `==` | Literals share pool reference; `new String()` creates heap object |
| Integer caching | -128 to 127 cached; outside uses new objects |
| `num = num++` | Returns 0 (post-increment returns before incrementing) |
| `finally` with return | `finally` ALWAYS runs; its return overrides try's return |
| ConcurrentModification | Can't modify collection during for-each; use Iterator.remove() |
| `hashCode/equals` contract | Must override BOTH for HashMap keys |
| Short-circuit `||` and `&&` | Second operand may not execute |
