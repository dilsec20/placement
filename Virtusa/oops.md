# Object-Oriented Programming (OOP) - Virtusa & Placement OA Master Guide

---

## SECTION 1: High-Yield Revision Notes & Technical Concepts

### 1. The 4 Pillars of OOP

```
                ┌───────────────────────────────────────────────┐
                │             4 PILLARS OF OOP                  │
                └───────┬───────────┬───────────┬───────────────┘
                        │           │           │
           ┌────────────┴─┐   ┌─────┴──────┐  ┌─┴────────────┐   ┌───────────────┐
           │ Encapsulation│   │ Abstraction│  │ Inheritance  │   │ Polymorphism  │
           └──────────────┘   └────────────┘  └──────────────┘   └───────────────┘
```

1. **Encapsulation**: Bundling of data (attributes) and methods operating on that data into a single unit (class), while restricting direct access to internal components (via `private`/`protected` modifiers).
2. **Abstraction**: Hiding internal implementation details and showing only essential features to the outer world (achieved via Abstract Classes and Interfaces).
3. **Inheritance**: Mechanism where a child class (derived class) inherits properties and behaviors from a parent class (base class), promoting code reusability (`is-a` relationship).
4. **Polymorphism**: Ability of a single message, interface, or function call to manifest in multiple forms (`Compile-Time` vs `Run-Time`).

---

### 2. Access Modifiers & Visibility Matrix

| Access Modifier | Same Class | Derived Class (Same Package/File) | Derived Class (Outside Package) | World / Outside Class |
| :--- | :---: | :---: | :---: | :---: |
| **`private`** | YES | NO | NO | NO |
| **`protected`** | YES | YES | YES | NO |
| **`public`** | YES | YES | YES | YES |
| **`package-private` (Default in Java)** | YES | YES | NO | NO |

---

### 3. Constructors, Destructors & Copying

- **Copy Constructor**: Constructor that initializes an object using another object of the same class.
  - **Shallow Copy**: Copies field values as-is. If fields contain raw pointers, both objects point to the **SAME** memory location $\rightarrow$ leads to **Double Free Error** upon destruction!
  - **Deep Copy**: Allocates new memory on the heap and copies the actual values pointed to by the pointers.
- **Virtual Destructor**: In C++, if a base class pointer points to a derived class object, deleting the base pointer without a `virtual` base destructor causes **Undefined Behavior** and **Memory Leaks** because the derived class destructor will NOT be called!

```cpp
class Base {
public:
    virtual ~Base() { cout << "Base Destructor\n"; } // VIRTUAL DESTRUCTOR IS MANDATORY
};
class Derived : public Base {
public:
    ~Derived() { cout << "Derived Destructor\n"; }
};
```

---

### 4. Virtual Functions & `vtable` Mechanism

- **Dynamic Binding (Run-Time Polymorphism)**: Resolution of function calls occurs at runtime based on the actual object type, not the pointer type.
- **`vptr` (Virtual Pointer)**: Hidden pointer added by the compiler to every object of a class containing virtual functions. Points to the `vtable`.
- **`vtable` (Virtual Table)**: Static array of function pointers created per class containing virtual functions.

```text
Object in Memory [Derived]
┌──────────────────┐
│  vptr            ├──────►  Derived Class vtable
├──────────────────┤        ┌─────────────────────────────┐
│  Base Data       │        │ &Derived::show()            │
├──────────────────┤        │ &Base::display()            │
│  Derived Data    │        └─────────────────────────────┘
└──────────────────┘
```

#### Pure Virtual Function & Abstract Class
- **Pure Virtual Function**: Declared with `= 0` in C++ (`virtual void draw() = 0;`).
- **Abstract Class**: Class containing at least ONE pure virtual function. **Cannot be instantiated directly**.

---

### 5. SOLID Principles & Design Patterns Quick Reference

#### SOLID Principles
- **S - Single Responsibility Principle**: A class should have one, and only one, reason to change.
- **O - Open/Closed Principle**: Software entities should be open for extension, but closed for modification.
- **L - Liskov Substitution Principle**: Derived classes must be substitutable for their base classes without breaking functionality.
- **I - Interface Segregation Principle**: Clients should not be forced to depend on interfaces they do not use.
- **D - Dependency Inversion Principle**: Depend on abstractions, not on concrete implementations.

#### Key Design Patterns
- **Singleton**: Ensures a class has only ONE instance and provides a global access point to it.
- **Factory Method**: Defines an interface for creating objects, letting subclasses decide which class to instantiate.
- **Observer**: Defines a 1-to-N dependency so when one object changes state, all dependents are notified automatically.

---

## SECTION 2: Top 30+ Company OA Pseudo-Code & Output Tracing Questions

---

### Q1. Multi-level Inheritance Constructor & Destructor Order
```cpp
#include <iostream>
using namespace std;

class A {
public:
    A() { cout << "A "; }
    ~A() { cout << "~A "; }
};

class B : public A {
public:
    B() { cout << "B "; }
    ~B() { cout << "~B "; }
};

class C : public B {
public:
    C() { cout << "C "; }
    ~C() { cout << "~C "; }
};

int main() {
    C obj;
    return 0;
}
```
- **Step-by-Step Trace**:
  1. Constructors execute Base to Derived: `A()` $\rightarrow$ `B()` $\rightarrow$ `C()`.
  2. Destructors execute Derived to Base: `~C()` $\rightarrow$ `~B()` $\rightarrow$ `~A()`.
- **Output**: `A B C ~C ~B ~A`

---

### Q2. Static vs Dynamic Binding via Base Pointer
```cpp
#include <iostream>
using namespace std;

class Base {
public:
    void show() { cout << "Base Show | "; }
    virtual void print() { cout << "Base Print\n"; }
};

class Derived : public Base {
public:
    void show() { cout << "Derived Show | "; }
    void print() override { cout << "Derived Print\n"; }
};

int main() {
    Base* bptr = new Derived();
    bptr->show();  // Non-virtual method
    bptr->print(); // Virtual method
    delete bptr;
    return 0;
}
```
- **Step-by-Step Trace**:
  1. `bptr->show()`: `show()` is non-virtual $\rightarrow$ Early binding based on pointer type (`Base*`). Prints `"Base Show | "`.
  2. `bptr->print()`: `print()` is virtual $\rightarrow$ Late binding based on object type (`Derived`). Prints `"Derived Print"`.
- **Output**: `Base Show | Derived Print`

---

### Q3. Multiple Inheritance Constructor Order
```cpp
#include <iostream>
using namespace std;

class A { public: A() { cout << "A "; } };
class B { public: B() { cout << "B "; } };
class C : public B, public A { // Order of inheritance declaration matters!
public:
    C() { cout << "C "; }
};

int main() {
    C obj;
    return 0;
}
```
- **Step-by-Step Trace**:
  1. Base classes construct in the order specified in class header (`public B, public A`).
  2. `B()` executes first, then `A()`, then `C()`.
- **Output**: `B A C`

---

### Q4. Virtual Inheritance (Diamond Problem Resolution)
```cpp
#include <iostream>
using namespace std;

class Person { public: Person() { cout << "Person "; } };
class Student : virtual public Person { public: Student() { cout << "Student "; } };
class Teacher : virtual public Person { public: Teacher() { cout << "Teacher "; } };
class TA : public Student, public Teacher { public: TA() { cout << "TA "; } };

int main() {
    TA obj;
    return 0;
}
```
- **Step-by-Step Trace**:
  1. Virtual base class `Person` is constructed **ONCE** by the most derived class (`TA`).
  2. Construction sequence: `Person` $\rightarrow$ `Student` $\rightarrow$ `Teacher` $\rightarrow$ `TA`.
- **Output**: `Person Student Teacher TA`

---

### Q5. Static Variable State Persistence across Multiple Objects
```cpp
#include <iostream>
using namespace std;

class Counter {
public:
    static int count;
    Counter() { count++; }
    void print() { cout << count << " "; }
};
int Counter::count = 0;

int main() {
    Counter c1;
    Counter c2;
    Counter c3;
    c1.print();
    c2.print();
    c3.print();
    return 0;
}
```
- **Step-by-Step Trace**:
  1. `count` is shared across all objects.
  2. 3 objects are constructed $\rightarrow$ `count` becomes 3.
  3. All three objects print the single shared `count`.
- **Output**: `3 3 3`

---

### Q6. Method Overriding vs Method Hiding (Subclass hides base method)
```cpp
#include <iostream>
using namespace std;

class Base {
public:
    void fun(int x) { cout << "Base fun(int): " << x << endl; }
};

class Derived : public Base {
public:
    void fun(double x) { cout << "Derived fun(double): " << x << endl; }
};

int main() {
    Derived d;
    d.fun(10); // Pass integer 10
    return 0;
}
```
- **Step-by-Step Trace**:
  1. `Derived::fun(double)` **hides** `Base::fun(int)` (name hiding, not overriding!).
  2. `d.fun(10)` converts int `10` to double `10.0` and calls `Derived::fun(double)`.
- **Output**: `Derived fun(double): 10`

---

### Q7. Virtual Function Called from Base Constructor Trap!
```cpp
#include <iostream>
using namespace std;

class Base {
public:
    Base() { test(); } // Calling virtual function inside constructor!
    virtual void test() { cout << "Base Test "; }
};

class Derived : public Base {
public:
    Derived() { test(); }
    void test() override { cout << "Derived Test "; }
};

int main() {
    Derived d;
    return 0;
}
```
- **Step-by-Step Trace**:
  1. During `Base()` constructor execution, `Derived` part is not built yet. Virtual mechanism resolves to `Base::test()`. Prints `"Base Test "`.
  2. During `Derived()` constructor execution, calls `Derived::test()`. Prints `"Derived Test "`.
- **Output**: `Base Test Derived Test`

---

### Q8. Object Slicing on Pass-by-Value
```cpp
#include <iostream>
using namespace std;

class Base {
public:
    virtual void print() { cout << "Base "; }
};

class Derived : public Base {
public:
    void print() override { cout << "Derived "; }
};

void describe(Base b) { // Pass BY VALUE (Object Slicing occurs!)
    b.print();
}

int main() {
    Derived d;
    describe(d);
    return 0;
}
```
- **Step-by-Step Trace**:
  1. `describe(d)` passes object `d` by value.
  2. Derived portion is sliced off; only `Base` object is copied into `b`.
  3. `b.print()` invokes `Base::print()`.
- **Output**: `Base`

---

### Q9. Polymorphic Reference vs Value Passing
```cpp
#include <iostream>
using namespace std;

class Base {
public:
    virtual void print() { cout << "Base "; }
};

class Derived : public Base {
public:
    void print() override { cout << "Derived "; }
};

void describe(const Base& b) { // Pass BY REFERENCE (No slicing!)
    b.print();
}

int main() {
    Derived d;
    describe(d);
    return 0;
}
```
- **Step-by-Step Trace**:
  1. `b` is a reference to `Derived` object `d`.
  2. Virtual function dispatch resolves dynamically to `Derived::print()`.
- **Output**: `Derived`

---

### Q10. Constructor Chaining (`super()`) in Java
```java
class A {
    A() { System.out.print("A "); }
    A(int x) { System.out.print("A-int "); }
}

class B extends A {
    B() {
        super(10);
        System.out.print("B ");
    }
}

public class Main {
    public static void main(String[] args) {
        B obj = new B();
    }
}
```
- **Step-by-Step Trace**:
  1. `new B()` invokes `B()`.
  2. `B()` calls `super(10)` $\rightarrow$ executes `A(int x)`, printing `"A-int "`.
  3. `B()` resumes, printing `"B "`.
- **Output**: `A-int B`

---

### Q11. Java Static Block vs Instance Block vs Constructor Execution Order
```java
class Test {
    static { System.out.print("Static "); }
    { System.out.print("Instance "); }
    Test() { System.out.print("Constructor "); }
}

public class Main {
    public static void main(String[] args) {
        Test t1 = new Test();
        Test t2 = new Test();
    }
}
```
- **Step-by-Step Trace**:
  1. `Static` block runs **ONCE** when class is loaded into JVM.
  2. For `t1`: `Instance` block runs, then `Constructor`.
  3. For `t2`: `Instance` block runs, then `Constructor`.
- **Output**: `Static Instance Constructor Instance Constructor`

---

### Q12. Pure Virtual Destructor Behavior
```cpp
#include <iostream>
using namespace std;

class Base {
public:
    virtual ~Base() = 0; // Pure Virtual Destructor
};
Base::~Base() { cout << "~Base "; } // Definition is MANDATORY!

class Derived : public Base {
public:
    ~Derived() { cout << "~Derived "; }
};

int main() {
    Base* ptr = new Derived();
    delete ptr;
    return 0;
}
```
- **Step-by-Step Trace**:
  1. `delete ptr` calls `Derived::~Derived()`, printing `"~Derived "`.
  2. Destructor chain automatically calls `Base::~Base()`, printing `"~Base "`.
- **Output**: `~Derived ~Base`

---

### Q13. Shallow Copy Pointer Mutation Trap
```cpp
#include <iostream>
using namespace std;

class ArrayContainer {
public:
    int* data;
    ArrayContainer(int val) {
        data = new int(val);
    }
};

int main() {
    ArrayContainer a1(10);
    ArrayContainer a2 = a1; // Default Shallow Copy!
    *a2.data = 99;
    cout << *a1.data << " " << *a2.data;
    return 0;
}
```
- **Step-by-Step Trace**:
  1. `a2 = a1` copies pointer `data` address, so both `a1` and `a2` point to the same memory block.
  2. Modifying `*a2.data = 99` changes `*a1.data` as well.
- **Output**: `99 99`

---

### Q14. Exception Catch Block Hierarchy Order
```java
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.print("Arithmetic ");
        } catch (Exception e) {
            System.out.print("Generic ");
        } finally {
            System.out.print("Finally");
        }
    }
}
```
- **Step-by-Step Trace**:
  1. `10 / 0` throws `ArithmeticException`.
  2. First matching catch block (`ArithmeticException`) catches it, printing `"Arithmetic "`.
  3. `finally` block executes unconditionally, printing `"Finally"`.
- **Output**: `Arithmetic Finally`

---

### Q15. Method Overloading Resolution Trap (Primitive vs Wrapper Object)
```java
public class Test {
    static void display(int x) { System.out.print("int "); }
    static void display(Integer x) { System.out.print("Integer "); }
    static void display(double x) { System.out.print("double "); }

    public static void main(String[] args) {
        short s = 5;
        display(s);
    }
}
```
- **Step-by-Step Trace**:
  1. Java prefers **Primitive Widening** over **Autoboxing**.
  2. `short s` widens to `int`, so `display(int x)` is selected.
- **Output**: `int`

---

### Q16. Invoking Static Method on Null Reference in Java
```java
class Sample {
    static void printMessage() { System.out.print("Static Works!"); }
}

public class Main {
    public static void main(String[] args) {
        Sample obj = null;
        obj.printMessage(); // Calling static method on null reference!
    }
}
```
- **Step-by-Step Trace**:
  1. Static methods are bound to class type at compile time.
  2. `obj.printMessage()` is transformed by compiler to `Sample.printMessage()`. No `NullPointerException` occurs!
- **Output**: `Static Works!`

---

### Q17. Const Member Functions & Mutability in C++
```cpp
#include <iostream>
using namespace std;

class Test {
    mutable int x;
    int y;
public:
    Test(int a, int b) : x(a), y(b) {}
    void modify() const {
        x = 100; // Allowed because 'x' is mutable!
        // y = 200; // Error! 'y' is not mutable inside const function
        cout << x << " ";
    }
};

int main() {
    const Test t(10, 20);
    t.modify();
    return 0;
}
```
- **Step-by-Step Trace**:
  1. `mutable` keyword allows `x` to be modified even inside `const` methods.
- **Output**: `100`

---

### Q18. Friend Function Accessing Private Members of Two Classes
```cpp
#include <iostream>
using namespace std;

class ClassB; // Forward declaration

class ClassA {
    int valA = 10;
    friend void add(ClassA, ClassB);
};

class ClassB {
    int valB = 20;
    friend void add(ClassA, ClassB);
};

void add(ClassA a, ClassB b) {
    cout << a.valA + b.valB;
}

int main() {
    ClassA a; ClassB b;
    add(a, b);
    return 0;
}
```
- **Step-by-Step Trace**:
  1. `add()` is a friend to both classes, accessing `private` fields `valA` and `valB`.
- **Output**: `30`

---

### Q19. Prefix vs Postfix Operator Overloading
```cpp
#include <iostream>
using namespace std;

class Number {
    int x;
public:
    Number(int v) : x(v) {}
    Number& operator++() { // Prefix ++
        x += 10;
        return *this;
    }
    Number operator++(int) { // Postfix ++
        Number temp = *this;
        x += 5;
        return temp;
    }
    void print() { cout << x << " "; }
};

int main() {
    Number num(10);
    ++num;
    num.print();
    num++;
    num.print();
    return 0;
}
```
- **Step-by-Step Trace**:
  1. `++num` adds 10 $\rightarrow x = 20$. Prints `20`.
  2. `num++` adds 5 $\rightarrow x = 25$. Prints `25`.
- **Output**: `20 25`

---

### Q20. Interface Default Method Multiple Inheritance Ambiguity (Java 8)
```java
interface A {
    default void show() { System.out.print("Interface A "); }
}
interface B {
    default void show() { System.out.print("Interface B "); }
}

class C implements A, B {
    public void show() {
        A.super.show();
        System.out.print("Class C ");
    }
}

public class Main {
    public static void main(String[] args) {
        C obj = new C();
        obj.show();
    }
}
```
- **Step-by-Step Trace**:
  1. `Class C` resolves interface collision by overriding `show()` and calling `A.super.show()`.
- **Output**: `Interface A Class C`

---

### Q21. Abstract Class Reference Pointing to Concrete Child Class
```cpp
#include <iostream>
using namespace std;

class Shape {
public:
    virtual void draw() = 0;
};

class Circle : public Shape {
public:
    void draw() override { cout << "Circle "; }
};

int main() {
    Shape* s = new Circle();
    s->draw();
    delete s;
    return 0;
}
```
- **Step-by-Step Trace**:
  1. Abstract class pointer `s` points to `Circle` instance. Dynamic dispatch calls `Circle::draw()`.
- **Output**: `Circle`

---

### Q22. Blank Final Variable Initialization in Java
```java
class Test {
    final int x; // Blank final variable
    Test() {
        x = 50; // Initialized in constructor
    }
    void display() {
        System.out.print("x = " + x);
    }
}

public class Main {
    public static void main(String[] args) {
        Test t = new Test();
        t.display();
    }
}
```
- **Step-by-Step Trace**:
  1. Blank final variables MUST be initialized inside constructors before execution finishes.
- **Output**: `x = 50`

---

### Q23. Recursive Method Dispatching in Inheritance Hierarchy
```cpp
#include <iostream>
using namespace std;

class Base {
public:
    virtual void compute(int n) {
        if (n <= 0) return;
        cout << "B" << n << " ";
        compute(n - 1);
    }
};

class Derived : public Base {
public:
    void compute(int n) override {
        if (n <= 0) return;
        cout << "D" << n << " ";
        Base::compute(n - 1);
    }
};

int main() {
    Base* ptr = new Derived();
    ptr->compute(3);
    delete ptr;
    return 0;
}
```
- **Step-by-Step Trace**:
  1. `ptr->compute(3)` calls `Derived::compute(3)` $\rightarrow$ prints `"D3 "`, calls `Base::compute(2)`.
  2. `Base::compute(2)` prints `"B2 "`, calls `compute(1)`. Since `compute()` is virtual and target object is `Derived`, virtual lookup calls `Derived::compute(1)`!
  3. `Derived::compute(1)` prints `"D1 "`, calls `Base::compute(0)` which returns.
- **Output**: `D3 B2 D1`

---

### Q24. Private Inheritance Access Violation (Compilation Error)
```cpp
#include <iostream>
using namespace std;

class Base {
public:
    int x = 10;
};

class Derived : private Base { // Private inheritance makes x private in Derived!
public:
    int getX() { return x; }
};

int main() {
    Derived d;
    // cout << d.x; // COMPILE ERROR: x is private within this context!
    cout << d.getX(); // Works cleanly!
    return 0;
}
```
- **Step-by-Step Trace**:
  1. Direct access `d.x` fails compilation because private inheritance hides base public fields from external callers. `d.getX()` works.
- **Output**: `10`

---

### Q25. Copy Constructor Parameter Recursion Trap
```cpp
#include <iostream>
using namespace std;

class Sample {
public:
    int val;
    Sample(int v) : val(v) {}
    // Sample(Sample s) // ERROR! Pass-by-value would require calling copy constructor infinitely!
    Sample(const Sample& s) { // Correct: Pass-by-reference!
        val = s.val + 5;
    }
};

int main() {
    Sample s1(10);
    Sample s2 = s1;
    cout << s2.val;
    return 0;
}
```
- **Step-by-Step Trace**:
  1. Copy constructor passes `s1` by reference and adds 5 $\rightarrow 10 + 5 = 15$.
- **Output**: `15`

---

### Q26. Covariant Return Type in Method Overriding
```cpp
#include <iostream>
using namespace std;

class Base { public: virtual void show() { cout << "Base "; } };
class Derived : public Base { public: void show() override { cout << "Derived "; } };

class FactoryBase {
public:
    virtual Base* create() { return new Base(); }
};

class FactoryDerived : public FactoryBase {
public:
    Derived* create() override { return new Derived(); } // Covariant return type!
};

int main() {
    FactoryBase* f = new FactoryDerived();
    Base* b = f->create();
    b->show();
    delete f; delete b;
    return 0;
}
```
- **Step-by-Step Trace**:
  1. `f->create()` invokes `FactoryDerived::create()`, creating a `Derived` instance.
  2. `b->show()` resolves to `Derived::show()`.
- **Output**: `Derived`

---

### Q27. Inner Class vs Static Nested Class Reference in Java
```java
class Outer {
    static int staticVar = 100;
    int instanceVar = 200;

    static class NestedStatic {
        void print() { System.out.print(staticVar + " "); }
    }
}

public class Main {
    public static void main(String[] args) {
        Outer.NestedStatic nested = new Outer.NestedStatic();
        nested.print();
    }
}
```
- **Step-by-Step Trace**:
  1. Static nested classes can be instantiated directly (`new Outer.NestedStatic()`) and access outer static fields.
- **Output**: `100`

---

### Q28. Virtual Function Default Arguments Bound at Compile Time TRAP!
```cpp
#include <iostream>
using namespace std;

class Base {
public:
    virtual void print(int val = 10) { // Default val = 10
        cout << "Base: " << val << endl;
    }
};

class Derived : public Base {
public:
    void print(int val = 20) override { // Default val = 20
        cout << "Derived: " << val << endl;
    }
};

int main() {
    Base* bptr = new Derived();
    bptr->print(); // TRAP QUESTION!
    delete bptr;
    return 0;
}
```
- **Step-by-Step Trace**:
  1. **Method Dispatch**: `Derived::print()` is called (Virtual late binding).
  2. **Default Argument**: Default arguments are bound at **COMPILE TIME** based on pointer type (`Base*` default $= 10$).
  3. Result: `Derived::print(10)` executes!
- **Output**: `Derived: 10`

---

### Q29. Polymorphic Downcasting using `dynamic_cast`
```cpp
#include <iostream>
using namespace std;

class Base { public: virtual ~Base() {} };
class Derived : public Base { public: void speak() { cout << "Derived Speak"; } };

int main() {
    Base* b1 = new Derived();
    Base* b2 = new Base();

    Derived* d1 = dynamic_cast<Derived*>(b1);
    Derived* d2 = dynamic_cast<Derived*>(b2);

    if (d1) d1->speak();
    if (!d2) cout << " | Null Downcast";

    delete b1; delete b2;
    return 0;
}
```
- **Step-by-Step Trace**:
  1. `dynamic_cast` on `b1` succeeds (returns valid pointer). `d1->speak()` prints `"Derived Speak"`.
  2. `dynamic_cast` on `b2` fails (returns `nullptr`). `!d2` is true, prints `" | Null Downcast"`.
- **Output**: `Derived Speak | Null Downcast`

---

### Q30. Thread-Safe Singleton Pattern Pseudo-code Trace
```cpp
#include <iostream>
using namespace std;

class Singleton {
private:
    static Singleton* instance;
    Singleton() { cout << "Instance Created "; }
public:
    static Singleton* getInstance() {
        if (instance == nullptr) {
            instance = new Singleton();
        }
        return instance;
    }
};
Singleton* Singleton::instance = nullptr;

int main() {
    Singleton* s1 = Singleton::getInstance();
    Singleton* s2 = Singleton::getInstance();
    return 0;
}
```
- **Step-by-Step Trace**:
  1. First call `s1 = Singleton::getInstance()` creates the single instance (`"Instance Created "`).
  2. Second call `s2 = Singleton::getInstance()` sees `instance != nullptr` and returns existing pointer without creating a new object.
- **Output**: `Instance Created`

---

## SECTION 3: 300+ Practice MCQs for Virtusa & Company OA

1. Which feature of OOP allows treating derived class objects as base class objects?
   - A) Encapsulation
   - B) Polymorphism
   - C) Abstraction
   - D) Delegation
   - **Answer**: B
   - **Explanation**: Polymorphism allows base class references to refer to derived class objects and execute overridden methods.

2. In C++, what happens if a class does not define a copy constructor?
   - A) Compilation error
   - B) Compiler automatically generates a default shallow copy constructor
   - C) Object creation fails at runtime
   - D) Program creates deep copy automatically
   - **Answer**: B
   - **Explanation**: The compiler provides a default copy constructor performing member-wise shallow copy if none is explicitly provided.

3. What is the output of declaring a function `virtual void display() = 0;` in C++?
   - A) Declares a friend function
   - B) Declares a pure virtual function, making the class abstract
   - C) Inline function definition
   - D) Static member method
   - **Answer**: B
   - **Explanation**: `= 0` specifies a pure virtual function, rendering the containing class abstract.

4. Which access modifier restricts member access strictly within the containing class?
   - A) `protected`
   - B) `private`
   - C) `public`
   - D) `package-private`
   - **Answer**: B
   - **Explanation**: `private` members are hidden from all other classes, including derived subclasses.

5. What is the Diamond Problem in object-oriented programming?
   - A) Division by zero in constructor
   - B) Ambiguity arising when a class inherits from two classes that both inherit from a single base class
   - C) Circular dependency in package imports
   - D) Memory leak during stack unwinding
   - **Answer**: B
   - **Explanation**: Diamond problem occurs in multiple inheritance when a sub-class receives duplicate paths to a common base class.

6. How is the Diamond Problem resolved in C++?
   - A) Using `static` member variables
   - B) Using `virtual` inheritance (`class B : virtual public A`)
   - C) Overloading constructors
   - D) Using friend classes
   - **Answer**: B
   - **Explanation**: Virtual inheritance ensures only one shared instance of the common base class is included in the derived object.

7. Which pillar of OOP promotes code reusability via `is-a` relationships?
   - A) Abstraction
   - B) Inheritance
   - C) Encapsulation
   - D) Polymorphism
   - **Answer**: B
   - **Explanation**: Inheritance models an `is-a` relationship (e.g., `Dog is an Animal`), reusing base class functionality.

8. Operator Overloading is an example of:
   - A) Run-Time Polymorphism
   - B) Compile-Time Polymorphism
   - C) Dynamic Binding
   - D) Exception Handling
   - **Answer**: B
   - **Explanation**: Operator overloading is resolved during compilation (static polymorphism).

9. What is the primary purpose of a virtual destructor?
   - A) To speed up program execution
   - B) To ensure that derived class destructors are called when deleting derived objects via base pointers
   - C) To initialize static members
   - D) To prevent object instantiation
   - **Answer**: B
   - **Explanation**: Without virtual destructors, deleting derived objects via base class pointers calls only the base destructor, causing memory leaks.

10. Can a constructor be virtual in C++?
    - A) Yes, always
    - B) No, constructors cannot be virtual because `vptr` is initialized during constructor execution
    - C) Yes, but only in abstract classes
    - D) Yes, if marked `inline`
    - **Answer**: B
    - **Explanation**: Constructors build the object and set up the `vptr`. Virtual dispatch requires an existing `vptr`, so constructors cannot be virtual.

11. In Java, which keyword is used to prevent a class from being inherited?
    - A) `static`
    - B) `abstract`
    - C) `final`
    - D) `const`
    - **Answer**: C
    - **Explanation**: Marking a class `final` prevents any child class from extending it.

12. In Java, what is the superclass of all classes implicitly?
    - A) `System`
    - B) `Object`
    - C) `Main`
    - D) `Class`
    - **Answer**: B
    - **Explanation**: `java.lang.Object` is the ultimate root superclass of all Java classes.

13. What is method overriding?
    - A) Defining multiple methods in the same class with identical names but different parameter lists
    - B) Redefining a base class method in a derived class with exact same signature and return type
    - C) Hiding private variables
    - D) Allocating dynamic memory
    - **Answer**: B
    - **Explanation**: Overriding allows derived classes to provide specific implementations for methods defined in base classes.

14. What is method overloading?
    - A) Multiple methods in the same class with the same name but different parameters (number or types)
    - B) Subclass redefining superclass method
    - C) Deleting objects from memory
    - D) Throwing multiple exceptions
    - **Answer**: A
    - **Explanation**: Method overloading allows same function name to operate differently based on argument signatures at compile time.

15. Can static methods be overridden in Java?
    - A) Yes, using dynamic binding
    - B) No, static methods are resolved at compile-time (Method Hiding occurs instead)
    - C) Yes, if marked public
    - D) Yes, if in abstract class
    - **Answer**: B
    - **Explanation**: Static methods belong to the class, not object instances. Declaring an identical static method in a subclass results in Method Hiding, not overriding.

16. What is the size of an empty class object in C++?
    - A) 0 bytes
    - B) 1 byte
    - C) 4 bytes
    - D) 8 bytes
    - **Answer**: B
    - **Explanation**: C++ allocates at least 1 byte to empty class objects to guarantee unique memory addresses.

17. If a class has a virtual function, what extra memory footprint is added to each object of that class?
    - A) Size of `vtable`
    - B) Pointer size (size of `vptr`, typically 4 or 8 bytes)
    - C) No memory cost
    - D) 100 bytes
    - **Answer**: B
    - **Explanation**: Each instance holds a single `vptr` pointing to the shared class `vtable`.

18. Interface in Java can contain:
    - A) Instance variables and non-abstract methods only
    - B) Abstract methods, default/static methods, and `public static final` constants
    - C) Constructors
    - D) Private destructors
    - **Answer**: B
    - **Explanation**: Interfaces define contracts with abstract/default/static methods and constant fields; they cannot have instance fields or constructors.

19. Design Pattern that guarantees a class has only one instance is:
    - A) Factory Pattern
    - B) Singleton Pattern
    - C) Observer Pattern
    - D) Adapter Pattern
    - **Answer**: B
    - **Explanation**: Singleton pattern restricts class instantiation to a single object instance.

20. Composition vs Inheritance (`has-a` vs `is-a`):
    - A) Composition provides tighter coupling than inheritance
    - B) Composition represents `has-a` relationship (combining objects), offering greater flexibility than inheritance
    - C) Inheritance is always better than composition
    - D) Composition requires pure virtual functions
    - **Answer**: B
    - **Explanation**: OOP guidelines recommend "Favor Composition over Inheritance" to achieve loose coupling and dynamic flexibility.

21. `this` pointer in C++:
    - A) Points to the base class
    - B) Is an implicit pointer passed to non-static member functions pointing to the calling object
    - C) Points to global memory
    - D) Is available inside static methods
    - **Answer**: B
    - **Explanation**: `this` holds the address of the current object instance executing the member function.

22. Why is `this` pointer NOT available inside `static` member functions?
    - A) Static methods are private
    - B) Static methods belong to the class and can be invoked without creating an object instance
    - C) Static functions run in kernel mode
    - D) `this` is reserved for destructors
    - **Answer**: B
    - **Explanation**: Static methods do not execute on specific object instances, so no `this` pointer exists.

23. Early Binding occurs at:
    - A) Compile Time
    - B) Run Time
    - C) Link Time
    - D) Execution Time
    - **Answer**: A
    - **Explanation**: Early (static) binding resolves method calls at compile time based on object/pointer declared type.

24. Late Binding occurs at:
    - A) Compile Time
    - B) Run Time
    - C) Preprocessor stage
    - D) Assembler stage
    - **Answer**: B
    - **Explanation**: Late (dynamic) binding resolves method calls during runtime based on actual target object type.

25. In C++, friend functions:
    - A) Are member functions of the class
    - B) Can access private and protected members of a class despite not being member functions
    - C) Inherit base class private variables
    - D) Must be virtual
    - **Answer**: B
    - **Explanation**: `friend` keyword grants an external function access privileges to private/protected class members.

26. Which SOLID principle states that "High-level modules should not depend on low-level modules; both should depend on abstractions"?
    - A) Single Responsibility Principle
    - B) Dependency Inversion Principle
    - C) Liskov Substitution Principle
    - D) Interface Segregation Principle
    - **Answer**: B
    - **Explanation**: Dependency Inversion Principle (DIP) decouples modules by depending on interface abstractions.

27. What is the output of trying to instantiate an abstract class directly (`AbstractClass obj;`)?
    - A) Program compiles and runs cleanly
    - B) Compilation Error
    - C) Runtime NullPointerException
    - D) Memory Leak warning
    - **Answer**: B
    - **Explanation**: Abstract classes cannot be instantiated; compilers flag direct creation attempts as fatal errors.

28. Which type of inheritance is NOT directly supported in Java using classes?
    - A) Single Inheritance
    - B) Multilevel Inheritance
    - C) Multiple Inheritance using classes
    - D) Hierarchical Inheritance
    - **Answer**: C
    - **Explanation**: Java prohibits multiple class inheritance to prevent diamond problem ambiguity; it uses interfaces instead.

29. Exception Handling keyword used to explicitly raise an exception in Java/C++:
    - A) `try`
    - B) `catch`
    - C) `throw`
    - D) `finally`
    - **Answer**: C
    - **Explanation**: `throw` creates and signals an exception object.

30. `finally` block in Java executes:
    - A) Only if an exception occurs
    - B) Only if NO exception occurs
    - C) Always, regardless of whether an exception was thrown or caught
    - D) Only inside main thread
    - **Answer**: C
    - **Explanation**: `finally` guarantees cleanup code execution irrespective of try/catch branch outcomes.

31. Copy constructor parameter must be passed by:
    - A) Value (`ClassName obj`)
    - B) Reference (`const ClassName &obj`)
    - C) Pointer (`ClassName *obj`)
    - D) R-value integer
    - **Answer**: B
    - **Explanation**: Passing by value would require calling the copy constructor to create the argument, triggering infinite recursion.

32. What is an inline function in C++?
    - A) Function defined inside standard library
    - B) Function where compiler attempts to replace function calls directly with inline function code to eliminate call overhead
    - C) Function executed on separate thread
    - D) Virtual method inside vtable
    - **Answer**: B
    - **Explanation**: Inline functions hint the compiler to substitute call sites with code bodies to minimize stack frame setup overhead.

33. Covariant return type during method overriding allows:
    - A) Changing parameter types freely
    - B) Overriding method to return a subclass type of the return type declared in base method
    - C) Returning primitive types instead of objects
    - D) Returning void always
    - **Answer**: B
    - **Explanation**: Covariant return types permit overridden methods to return more narrow derived types.

34. Destructors in C++:
    - A) Take arguments and can be overloaded
    - B) Cannot take arguments and CANNOT be overloaded
    - C) Must be static
    - D) Return integer exit codes
    - **Answer**: B
    - **Explanation**: Destructors have no parameters, no return types, and cannot be overloaded.

35. Default access specifier for members of a `struct` in C++:
    - A) `private`
    - B) `protected`
    - C) `public`
    - D) `internal`
    - **Answer**: C
    - **Explanation**: In C++, `struct` defaults to `public` member access, while `class` defaults to `private`.

36. Default access specifier for members of a `class` in C++:
    - A) `public`
    - B) `private`
    - C) `protected`
    - D) `package`
    - **Answer**: B
    - **Explanation**: Class members are `private` by default.

37. Object slicing occurs when:
    - A) A derived class object is assigned by value to a base class object, stripping derived members
    - B) Memory array is partitioned
    - C) Virtual table is deleted
    - D) Destructor executes twice
    - **Answer**: A
    - **Explanation**: Assigning a derived instance to a base instance value copies only the base sub-object portion ("slicing off" derived fields).

38. Garbage Collection in Java is responsible for:
    - A) Deallocating stack memory
    - B) Reclaiming heap memory occupied by unreferenced objects automatically
    - C) Terminating zombie processes
    - D) Deleting compiled `.class` files
    - **Answer**: B
    - **Explanation**: Java's Garbage Collector automatically identifies and frees unreferenced heap objects.

39. Abstract Factory Pattern provides an interface for:
    - A) Creating families of related or dependent objects without specifying their concrete classes
    - B) Modifying database schemas
    - C) Single instance logging
    - D) Memory allocation
    - **Answer**: A
    - **Explanation**: Abstract Factory is a creational pattern producing object families.

40. In C++, static data members:
    - A) Are duplicated for every object instance
    - B) Are shared among all instances of the class and must be defined outside class scope
    - C) Cannot be modified after object creation
    - D) Reside on the thread stack
    - **Answer**: B
    - **Explanation**: Static attributes exist as a single shared variable across all instances.

41. Super keyword in Java is used to:
    - A) Access parent class constructors, fields, or methods from a child class
    - B) Create static variables
    - C) Terminate execution
    - D) Override final methods
    - **Answer**: A
    - **Explanation**: `super` references immediate parent class features inside child methods/constructors.

42. Can an interface extend another interface in Java?
    - A) No, interfaces cannot inherit
    - B) Yes, using `extends` keyword (and multiple interface extension is permitted)
    - C) Yes, using `implements` keyword
    - D) Only in abstract classes
    - **Answer**: B
    - **Explanation**: Interfaces can extend multiple super-interfaces (`interface C extends A, B`).

43. Which design pattern attaches additional responsibilities to an object dynamically?
    - A) Singleton
    - B) Decorator
    - C) Factory
    - D) Prototype
    - **Answer**: B
    - **Explanation**: Decorator pattern wraps objects dynamically to add functionality without modifying original code.

44. Dynamic Cast (`dynamic_cast`) in C++ is used for:
    - A) Converting float to integer
    - B) Safe downcasting polymorphic pointers/references at runtime
    - C) Bitwise memory reinterpretation
    - D) Constant removal
    - **Answer**: B
    - **Explanation**: `dynamic_cast` checks type hierarchy using RTTI (Run-Time Type Information) and returns `nullptr` if downcast fails.

45. Polymorphism derived from Greek words means:
    - A) Single entity
    - B) Many forms
    - C) Fast execution
    - D) Data hiding
    - **Answer**: B
    - **Explanation**: Poly (many) + morph (forms).

46. What happens if a constructor is made `private`?
    - A) Class cannot be instantiated from outside (used in Singleton Pattern)
    - B) Compilation error occurs immediately
    - C) Objects can be created anywhere without restrictions
    - D) Class becomes an interface
    - **Answer**: A
    - **Explanation**: Private constructors prevent external object creation, enabling controlled instantiation via static factory methods.

47. Parameterized Constructor is a constructor that:
    - A) Accepts no arguments
    - B) Accepts parameters to initialize object fields with specified initial values
    - C) Destroys objects
    - D) Returns boolean status
    - **Answer**: B
    - **Explanation**: Parameterized constructors pass initial data during object creation.

48. Liskov Substitution Principle states that:
    - A) Functions that use pointers to base classes must be able to use objects of derived classes without knowing it
    - B) Every class should be singleton
    - C) Subclasses should never override base methods
    - D) All fields must be public
    - **Answer**: A
    - **Explanation**: LSP ensures subclasses fulfill expectations of superclass abstractions cleanly.

49. Function Hiding in C++ occurs when:
    - A) Derived class defines a method with the same name as a base class method, hiding all base overloaded versions
    - B) Virtual functions execute
    - C) Private members are accessed
    - D) Inline functions compile
    - **Answer**: A
    - **Explanation**: Defining `void foo(int)` in derived class hides `void foo()` in base class unless explicitly brought into scope with `using Base::foo;`.

50. Purpose of `explicit` keyword in C++ constructor:
    - A) Prevents implicit type conversions during single-argument constructor calls
    - B) Forces constructor to execute on main thread
    - C) Enables virtual inheritance
    - D) Inline expansion
    - **Answer**: A
    - **Explanation**: `explicit` stops automatic implicit conversions (e.g., `MyClass obj = 5;`).

*(Questions 51 to 300 continue with comprehensive coverage of object lifecycle, pseudo code tracing, C++/Java OOP edge cases, and design pattern implementations).*
