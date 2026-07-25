# 💻 Round 3: Technical Assessment (MCQ) — Concepts

> **45 Questions | 45 Minutes | ✅ ELIMINATORY | No Negative Marking**

---

## 📌 Overview

The Technical Assessment tests your knowledge of **IT fundamentals** using MCQ format.
There is **NO negative marking** — attempt every question!

### Sections:

| Section | Approx. Questions | Topics |
|---------|------------------|--------|
| **Pseudocode** | 18–20 | Logic, Loops, Recursion, Operators, Arrays |
| **Common Applications / MS Office** | 8–10 | Word, Excel, PowerPoint, OS basics |
| **Networking** | 8–10 | OSI, TCP/IP, Protocols, Topologies |
| **Security** | 5–7 | Encryption, Threats, Firewalls, CIA Triad |
| **Cloud Computing** | 5–7 | AWS, Azure basics, Cloud types, DevOps |

---

# 📘 Section 1: Pseudocode (MOST IMPORTANT — 40% weightage)

> **All code examples in C++**

---

## 1.1 Data Types in C++

### Primitive Data Types
| Type | Size | Range | Example |
|------|------|-------|---------|
| `int` | 4 bytes | -2,147,483,648 to 2,147,483,647 | `int x = 10;` |
| `float` | 4 bytes | ~6-7 decimal digits | `float f = 3.14f;` |
| `double` | 8 bytes | ~15-16 decimal digits | `double d = 3.14159;` |
| `char` | 1 byte | -128 to 127 (or a single character) | `char c = 'A';` |
| `bool` | 1 byte | true (1) or false (0) | `bool b = true;` |
| `long long` | 8 bytes | -9.2×10¹⁸ to 9.2×10¹⁸ | `long long big = 1e18;` |
| `short` | 2 bytes | -32,768 to 32,767 | `short s = 100;` |
| `unsigned int` | 4 bytes | 0 to 4,294,967,295 | `unsigned int u = 50;` |

### Type Casting (Implicit & Explicit)
```cpp
// Implicit casting (automatic)
int a = 10;
float b = a;       // int → float → b = 10.0

// Explicit casting
float x = 7.9;
int y = (int)x;    // y = 7 (truncated, NOT rounded)

// Division trap (VERY COMMON IN PYQ)
int p = 7, q = 2;
cout << p / q;     // Output: 3 (integer division!)
cout << (float)p / q;  // Output: 3.5 (forced float division)
```

### sizeof Operator
```cpp
cout << sizeof(int);    // 4
cout << sizeof(char);   // 1
cout << sizeof(double); // 8
cout << sizeof(bool);   // 1
```

---

## 1.2 Operators

### Arithmetic Operators
```
+   Addition         5 + 3 = 8
-   Subtraction      5 - 3 = 2
*   Multiplication   5 * 3 = 15
/   Division         5 / 3 = 1  (integer division!)
                     5.0 / 3 = 1.666...
%   Modulus          5 % 3 = 2  (remainder)
```

### Increment & Decrement (VERY FREQUENTLY ASKED!)
```cpp
int a = 5;
cout << a++;   // Output: 5 (post-increment: use THEN increment)
cout << a;     // Output: 6

int b = 5;
cout << ++b;   // Output: 6 (pre-increment: increment THEN use)
cout << b;     // Output: 6

int c = 5;
cout << c--;   // Output: 5 (post-decrement)
cout << c;     // Output: 4

int d = 5;
cout << --d;   // Output: 4 (pre-decrement)
cout << d;     // Output: 4
```

### Compound Assignment Operators
```cpp
int x = 10;
x += 5;    // x = x + 5 = 15
x -= 3;    // x = 15 - 3 = 12
x *= 2;    // x = 12 * 2 = 24
x /= 4;    // x = 24 / 4 = 6
x %= 4;    // x = 6 % 4 = 2
x <<= 2;   // x = 2 << 2 = 8
x >>= 1;   // x = 8 >> 1 = 4
x &= 3;    // x = 4 & 3 = 0 (100 & 011 = 000)
x ^= 5;    // x = 0 ^ 5 = 5
x |= 2;    // x = 5 | 2 = 7 (101 | 010 = 111)
```

### Bitwise Operators (Very Frequently Asked!)
```
&    AND       → 1 only if BOTH bits are 1
|    OR        → 1 if EITHER bit is 1
^    XOR       → 1 if bits are DIFFERENT
~    NOT       → flips all bits (one's complement)
<<   Left Shift   → multiply by 2^n
>>   Right Shift  → divide by 2^n

Example:
  5 in binary = 0101
  3 in binary = 0011

  5 & 3  = 0001 = 1    (AND)
  5 | 3  = 0111 = 7    (OR)
  5 ^ 3  = 0110 = 6    (XOR)
  ~5     = -(5+1) = -6 (NOT, two's complement)
  5 << 1 = 1010 = 10   (multiply by 2)
  5 >> 1 = 0010 = 2    (divide by 2)
  5 << 2 = 10100 = 20  (multiply by 4)
  5 >> 2 = 0001 = 1    (divide by 4)
```

#### XOR Special Properties (Often Asked!)
```
a ^ a = 0         (any number XOR itself = 0)
a ^ 0 = a         (any number XOR 0 = itself)
a ^ b ^ a = b     (used to find unique element in array)
a ^ b = b ^ a     (commutative)
```

### Comparison & Logical Operators
```
==   Equal to              5 == 5 → true
!=   Not equal             5 != 3 → true
>    Greater than          5 > 3  → true
<    Less than             3 < 5  → true
>=   Greater or equal      5 >= 5 → true
<=   Less or equal         3 <= 5 → true
&&   Logical AND           true && false → false
||   Logical OR            true || false → true
!    Logical NOT           !true → false
```

### Ternary Operator
```cpp
int a = 5, b = 10;
int max = (a > b) ? a : b;   // max = 10
// Same as: if (a > b) max = a; else max = b;

// Nested ternary
int x = 15;
string result = (x > 20) ? "High" : (x > 10) ? "Medium" : "Low";
// result = "Medium"
```

### Operator Precedence (High → Low) — MEMORIZE!
```
1.  ()           Parentheses
2.  ++ -- !  ~   Unary operators
3.  * / %        Multiplicative
4.  + -          Additive
5.  << >>        Bitwise shift
6.  < <= > >=    Relational
7.  == !=        Equality
8.  &            Bitwise AND
9.  ^            Bitwise XOR
10. |            Bitwise OR
11. &&           Logical AND
12. ||           Logical OR
13. ?:           Ternary
14. = += -= etc. Assignment
15. ,            Comma
```

**⚠️ Common Trap:** `&` has LOWER precedence than `==`
```cpp
// WRONG interpretation:
int a = 5 & 3 == 3;
// Parses as: 5 & (3 == 3) = 5 & 1 = 1 (not what you'd expect!)

// Use parentheses:
int a = (5 & 3) == 3;  // 1 == 3 → false → 0
```

---

## 1.3 Control Structures

### If-Else
```cpp
int x = 10;
if (x > 15) {
    cout << "A";
} else if (x > 5) {
    cout << "B";       // ← This executes
} else {
    cout << "C";
}
// Output: B
```

### Tricky Nested If
```cpp
int x = 10;
if (x > 5) {
    if (x > 8) {
        cout << "A";   // ← This executes
    } else {
        cout << "B";
    }
} else {
    cout << "C";
}
// Output: A
```

### Dangling Else Problem (ASKED IN PYQ!)
```cpp
int x = 5;
if (x > 3)
    if (x > 10)
        cout << "A";
else                    // ⚠️ This else belongs to INNER if, not outer!
    cout << "B";

// Output: B
// Because: x > 3 is true, x > 10 is false, so inner else fires
```

### Switch-Case
```cpp
int val = 2;
switch (val) {
    case 1:
        cout << "One";
        break;
    case 2:
        cout << "Two";   // ← This executes
        break;
    case 3:
        cout << "Three";
        break;
    default:
        cout << "Other";
}
// Output: Two
```

### Switch Fall-Through (COMMON TRAP!)
```cpp
int val = 2;
switch (val) {
    case 1: cout << "One ";
    case 2: cout << "Two ";     // No break!
    case 3: cout << "Three ";   // Falls through!
    default: cout << "Other";   // Falls through!
}
// Output: Two Three Other
// Without break, execution falls through to ALL cases below!
```

---

## 1.4 Loops

### For Loop Patterns
```cpp
// Forward loop: 1 to 5
for (int i = 1; i <= 5; i++) {
    cout << i << " ";
}
// Output: 1 2 3 4 5

// Backward loop: 5 to 1
for (int i = 5; i >= 1; i--) {
    cout << i << " ";
}
// Output: 5 4 3 2 1

// Skip values (step of 2)
for (int i = 0; i < 10; i += 2) {
    cout << i << " ";
}
// Output: 0 2 4 6 8

// Count iterations
for (int i = 0; i < 10; i += 3) {
    cout << i << " ";
}
// Output: 0 3 6 9  → 4 iterations
```

### While Loop
```cpp
int i = 0;
while (i < 5) {
    cout << i << " ";
    i++;
}
// Output: 0 1 2 3 4
```

### Do-While Loop (Executes at least ONCE!)
```cpp
int i = 10;
do {
    cout << i << " ";    // Executes ONCE even though condition is false
    i++;
} while (i < 5);
// Output: 10
// ⚠️ Key difference: do-while always runs body at least once
```

### Nested Loop
```cpp
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        cout << i * j << " ";
    }
    cout << endl;
}
// Output:
// 1 2 3
// 2 4 6
// 3 6 9
```

### Break & Continue
```cpp
// Break — exits the loop entirely
for (int i = 1; i <= 10; i++) {
    if (i == 5) break;
    cout << i << " ";
}
// Output: 1 2 3 4

// Continue — skips current iteration
for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) continue;
    cout << i << " ";
}
// Output: 1 3 5 7 9
```

### Infinite Loop Patterns
```cpp
// Intentional infinite loop
while (true) { /* runs forever */ }
for (;;) { /* runs forever */ }

// Accidental infinite loop (common mistake)
int i = 0;
while (i < 5) {
    cout << i;
    // Missing i++ → infinite loop!
}
```

### Loop Tracing — Key Patterns
```cpp
// Pattern 1: Sum of first N numbers
int sum = 0;
for (int i = 1; i <= 5; i++) {
    sum += i;
}
// sum = 1+2+3+4+5 = 15

// Pattern 2: Factorial
int fact = 1;
for (int i = 1; i <= 5; i++) {
    fact *= i;
}
// fact = 1*2*3*4*5 = 120

// Pattern 3: Power of 2
int power = 1;
for (int i = 0; i < 5; i++) {
    power *= 2;
}
// power = 2^5 = 32

// Pattern 4: Count digits
int n = 12345, count = 0;
while (n > 0) {
    n /= 10;
    count++;
}
// count = 5

// Pattern 5: Reverse a number
int n = 1234, rev = 0;
while (n > 0) {
    rev = rev * 10 + n % 10;
    n /= 10;
}
// rev = 4321
```

---

## 1.5 Functions & Recursion

### Basic Function
```cpp
int add(int a, int b) {
    return a + b;
}

int main() {
    int result = add(3, 4);   // result = 7
    cout << result;
    return 0;
}
```

### Function Overloading
```cpp
int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }
int add(int a, int b, int c) { return a + b + c; }

// C++ picks the correct one based on arguments
add(3, 4);        // calls int version → 7
add(3.0, 4.0);    // calls double version → 7.0
add(1, 2, 3);     // calls 3-arg version → 6
```

### Default Arguments
```cpp
int power(int base, int exp = 2) {
    int result = 1;
    for (int i = 0; i < exp; i++) result *= base;
    return result;
}

power(5);      // exp defaults to 2 → 25
power(5, 3);   // exp = 3 → 125
```

### Recursion — Factorial
```cpp
int factorial(int n) {
    if (n == 0 || n == 1)   // Base case
        return 1;
    return n * factorial(n - 1);
}

// Trace for factorial(4):
// factorial(4) = 4 × factorial(3)
// factorial(3) = 3 × factorial(2)
// factorial(2) = 2 × factorial(1)
// factorial(1) = 1        ← base case
// Build up: 1 → 2 → 6 → 24
// Answer: 24
```

### Recursion — Fibonacci
```cpp
int fib(int n) {
    if (n <= 1)
        return n;
    return fib(n - 1) + fib(n - 2);
}

// fib(0)=0, fib(1)=1, fib(2)=1, fib(3)=2, fib(4)=3, fib(5)=5
// Trace for fib(5):
// fib(5) = fib(4) + fib(3)
// fib(4) = fib(3) + fib(2) = 2+1 = 3
// fib(3) = fib(2) + fib(1) = 1+1 = 2
// Answer: 3 + 2 = 5
```

### Recursion — Sum of Digits
```cpp
int sumDigits(int n) {
    if (n == 0) return 0;
    return (n % 10) + sumDigits(n / 10);
}

// sumDigits(1234) = 4 + sumDigits(123)
//                 = 4 + 3 + sumDigits(12)
//                 = 4 + 3 + 2 + sumDigits(1)
//                 = 4 + 3 + 2 + 1 + sumDigits(0)
//                 = 4 + 3 + 2 + 1 + 0 = 10
```

### Recursion — Power
```cpp
int power(int base, int exp) {
    if (exp == 0) return 1;
    return base * power(base, exp - 1);
}

// power(2, 4) = 2 * power(2,3) = 2*8 = 16
```

### Recursion — GCD (Euclidean Algorithm)
```cpp
int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

// gcd(48, 18) → gcd(18, 12) → gcd(12, 6) → gcd(6, 0) → 6
```

### Pass by Value vs Pass by Reference
```cpp
// Pass by VALUE — original NOT modified
void modifyValue(int x) {
    x = 100;
}
int a = 5;
modifyValue(a);
cout << a;     // Output: 5 (unchanged!)

// Pass by REFERENCE — original IS modified
void modifyRef(int &x) {
    x = 100;
}
int b = 5;
modifyRef(b);
cout << b;     // Output: 100 (changed!)

// Pass by POINTER — original IS modified
void modifyPtr(int *x) {
    *x = 100;
}
int c = 5;
modifyPtr(&c);
cout << c;     // Output: 100 (changed!)
```

### Scope of Variables
```cpp
int x = 10;          // Global scope

void func() {
    int x = 20;      // Local scope — shadows global
    cout << x;        // Output: 20 (local)
}

int main() {
    cout << x;        // Output: 10 (global)
    func();           // Output: 20
    {
        int x = 30;   // Block scope
        cout << x;    // Output: 30
    }
    cout << x;        // Output: 10 (global again)
    return 0;
}
```

---

## 1.6 Arrays & Data Structures

### Array Declaration & Operations
```cpp
// Declaration
int arr[5] = {10, 20, 30, 40, 50};

// Access
cout << arr[0];    // 10 (first element)
cout << arr[4];    // 50 (last element)

// Modify
arr[2] = 99;       // arr = {10, 20, 99, 40, 50}

// Length
int n = sizeof(arr) / sizeof(arr[0]);  // n = 5

// Sum of array
int total = 0;
for (int i = 0; i < 5; i++) {
    total += arr[i];
}
// total = 10+20+99+40+50 = 219
```

### 2D Array
```cpp
int matrix[3][3] = {{1,2,3}, {4,5,6}, {7,8,9}};

cout << matrix[0][0];    // 1 (Row 0, Col 0)
cout << matrix[1][2];    // 6 (Row 1, Col 2)
cout << matrix[2][1];    // 8 (Row 2, Col 1)

// Traverse 2D array
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        cout << matrix[i][j] << " ";
    }
    cout << endl;
}
```

### Strings in C++
```cpp
#include <string>

string s = "Hello";
cout << s.length();     // 5
cout << s[0];           // 'H'
cout << s.substr(1, 3); // "ell" (from index 1, length 3)

s += " World";          // Concatenation: "Hello World"
s.find("lo");           // 3 (index where "lo" starts)
s.compare("Hello");     // 0 if equal

// C-style strings (char array)
char str[] = "Hello";
strlen(str);    // 5 (length)
strcmp(str, "Hello");  // 0 if equal
```

### Common Array Algorithms
```cpp
// Find max element
int arr[] = {3, 7, 2, 9, 5};
int maxVal = arr[0];
for (int i = 1; i < 5; i++) {
    if (arr[i] > maxVal)
        maxVal = arr[i];
}
// maxVal = 9

// Linear search
int target = 7;
int index = -1;
for (int i = 0; i < 5; i++) {
    if (arr[i] == target) {
        index = i;
        break;
    }
}
// index = 1

// Bubble sort
for (int i = 0; i < n-1; i++) {
    for (int j = 0; j < n-i-1; j++) {
        if (arr[j] > arr[j+1]) {
            swap(arr[j], arr[j+1]);
        }
    }
}
```

### Pointers (Basic — sometimes asked)
```cpp
int a = 10;
int *p = &a;       // p stores address of a

cout << a;          // 10 (value)
cout << &a;         // 0x7fff... (address)
cout << p;          // 0x7fff... (same address)
cout << *p;         // 10 (dereference — value at address)

*p = 20;            // Changes value at address
cout << a;          // 20 (a is modified!)
```

---

## 1.7 OOP Concepts (Basic — sometimes asked)

### Class & Object
```cpp
class Student {
public:
    string name;
    int age;

    void display() {
        cout << name << " " << age << endl;
    }
};

Student s;
s.name = "Dilip";
s.age = 22;
s.display();    // Dilip 22
```

### Constructor
```cpp
class Student {
public:
    string name;
    int age;

    // Constructor
    Student(string n, int a) {
        name = n;
        age = a;
    }
};

Student s("Dilip", 22);   // Constructor called automatically
```

### 4 Pillars of OOP
```
1. Encapsulation — Bundling data + methods, access control (public/private)
2. Abstraction   — Hiding internal details, showing only interface
3. Inheritance   — Child class inherits from Parent class
4. Polymorphism  — Same function behaves differently (overloading/overriding)
```

---

# 📗 Section 2: Common Applications & MS Office

---

## Microsoft Word

### Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| **Ctrl+S** | Save document |
| **Ctrl+Z** | Undo |
| **Ctrl+Y** | Redo |
| **Ctrl+F** | Find |
| **Ctrl+H** | Find & Replace |
| **Ctrl+B** | Bold |
| **Ctrl+I** | Italic |
| **Ctrl+U** | Underline |
| **Ctrl+A** | Select All |
| **Ctrl+C / Ctrl+V / Ctrl+X** | Copy / Paste / Cut |
| **Ctrl+P** | Print |
| **Ctrl+N** | New Document |
| **Ctrl+O** | Open Document |
| **Ctrl+E** | Center Align |
| **Ctrl+L** | Left Align |
| **Ctrl+R** | Right Align |
| **Ctrl+J** | Justify |
| **Ctrl+K** | Insert Hyperlink |
| **Ctrl+Shift+S** | Apply style |
| **F7** | Spell Check |

### Key Features
| Feature | Description |
|---------|-------------|
| **Mail Merge** | Bulk letters/labels using data source (Excel, CSV) |
| **Track Changes** | Review edits collaboratively — accept/reject changes |
| **Header/Footer** | Repeating content at top/bottom of each page |
| **Table of Contents** | Auto-generated from heading styles |
| **Watermark** | Background text/image on pages |
| **Macro** | Record and replay repeated actions (VBA) |
| **Templates** | Pre-formatted document layouts |
| **Bookmark** | Mark a location in document for cross-referencing |
| **Section Break** | Different formatting in different parts |
| **Page Break** | Force content to next page (Ctrl+Enter) |

### File Formats
| Extension | Description |
|-----------|-------------|
| **.docx** | Default Word format (XML-based) |
| **.doc** | Legacy Word format |
| **.pdf** | Portable Document Format |
| **.rtf** | Rich Text Format (cross-platform) |
| **.txt** | Plain text (no formatting) |
| **.odt** | OpenDocument Text |

---

## Microsoft Excel

### Key Formulas & Functions
| Formula | Purpose | Example |
|---------|---------|---------|
| `=SUM(A1:A10)` | Sum of range | Sum of cells A1 to A10 |
| `=AVERAGE(A1:A10)` | Mean value | Average of range |
| `=COUNT(A1:A10)` | Count numeric cells | How many numbers |
| `=COUNTA(A1:A10)` | Count non-empty cells | How many non-blank |
| `=COUNTIF(A1:A10, ">5")` | Count with condition | Count cells > 5 |
| `=MAX(A1:A10)` | Maximum value | Largest number |
| `=MIN(A1:A10)` | Minimum value | Smallest number |
| `=IF(A1>10, "Yes", "No")` | Conditional formula | If-else logic |
| `=VLOOKUP(val, range, col, FALSE)` | Vertical lookup | Search in table |
| `=HLOOKUP(val, range, row, FALSE)` | Horizontal lookup | Search horizontally |
| `=INDEX(range, row, col)` | Return value at position | Direct cell reference |
| `=MATCH(val, range, 0)` | Find position of value | Returns row number |
| `=CONCATENATE(A1, " ", B1)` | Join text | Combine cells |
| `=LEN(A1)` | Length of text | Count characters |
| `=TRIM(A1)` | Remove extra spaces | Clean data |
| `=LEFT(A1, 3)` | First N characters | Extract from left |
| `=RIGHT(A1, 3)` | Last N characters | Extract from right |
| `=MID(A1, 2, 3)` | Middle characters | Extract from middle |
| `=NOW()` | Current date and time | Timestamp |
| `=TODAY()` | Current date only | Date |
| `=ROUND(A1, 2)` | Round to 2 decimal | Rounding |
| `=SUMIF(range, criteria, sum_range)` | Conditional sum | Sum matching cells |

### Cell References
| Type | Notation | Behavior |
|------|----------|----------|
| **Relative** | A1 | Changes when copied |
| **Absolute** | $A$1 | Stays fixed when copied |
| **Mixed (Row)** | A$1 | Column changes, row fixed |
| **Mixed (Col)** | $A1 | Column fixed, row changes |

### Key Features
| Feature | Description |
|---------|-------------|
| **Pivot Table** | Summarize/analyze large datasets interactively |
| **Filter** | Show only rows matching criteria |
| **Sort** | Arrange data ascending/descending |
| **Conditional Formatting** | Color code cells based on values |
| **Data Validation** | Restrict input (dropdown, range) |
| **Charts** | Bar, Pie, Line, Scatter graphs |
| **Freeze Panes** | Keep headers visible while scrolling |
| **Named Ranges** | Give cell ranges meaningful names |
| **Goal Seek** | Find input needed for a desired output |
| **What-If Analysis** | Test scenarios |

### Important Concepts
```
- Cell: Intersection of row and column (e.g., B3)
- Row: Horizontal (numbered 1, 2, 3...)
- Column: Vertical (lettered A, B, C...)
- Workbook: The entire Excel file
- Worksheet: Individual sheet/tab within workbook
- Range: Group of cells (e.g., A1:C10)
- Formula Bar: Shows formula of selected cell
```

---

## Microsoft PowerPoint

### Features
| Feature | Description |
|---------|-------------|
| **Slide Transition** | Animation between slides |
| **Animation** | Effects on objects within a slide |
| **Slide Master** | Global slide template (consistent design) |
| **Notes Pane** | Speaker notes below each slide |
| **Slide Sorter** | View all slides as thumbnails |
| **Custom Animation** | Fine-tuned animation control |
| **SmartArt** | Pre-built diagrams and flowcharts |
| **Presenter View** | Notes visible only to presenter |
| **Rehearse Timings** | Practice with automatic timing |

### Shortcuts
| Shortcut | Action |
|----------|--------|
| **F5** | Start slideshow from beginning |
| **Shift+F5** | Start from current slide |
| **Esc** | End slideshow |
| **B** | Black screen during presentation |
| **W** | White screen during presentation |
| **Ctrl+M** | New slide |
| **Ctrl+D** | Duplicate slide |

### File Formats
| Extension | Description |
|-----------|-------------|
| **.pptx** | Default PowerPoint format |
| **.ppt** | Legacy format |
| **.ppsx** | Opens directly in slideshow mode |
| **.potx** | Template file |

---

## Microsoft Access (Database)

| Concept | Description |
|---------|-------------|
| **Table** | Stores data in rows and columns |
| **Query** | Retrieve specific data using SQL |
| **Form** | User interface for data entry |
| **Report** | Formatted output for printing |
| **Primary Key** | Unique identifier for each record |
| **Foreign Key** | Links two tables together |
| **Relationship** | One-to-One, One-to-Many, Many-to-Many |

---

## Operating System Basics

### Core Concepts
| Concept | Description |
|---------|-------------|
| **Process** | Program currently in execution |
| **Thread** | Lightweight unit within a process |
| **Multithreading** | Multiple threads within one process |
| **Multiprogramming** | Multiple programs in memory simultaneously |
| **Multitasking** | Running multiple tasks by time-sharing CPU |
| **Deadlock** | Processes waiting on each other forever |
| **Starvation** | Process never gets CPU time |
| **Semaphore** | Synchronization mechanism (counting) |
| **Mutex** | Mutual Exclusion lock (binary semaphore) |
| **Virtual Memory** | Extends RAM using disk space |
| **Paging** | Divides memory into fixed-size pages |
| **Segmentation** | Divides memory into variable-size segments |
| **Page Fault** | Requested page not in RAM → load from disk |
| **Thrashing** | Excessive page faults → system slowdown |
| **Context Switch** | Saving/loading process state when switching |
| **BIOS** | Basic I/O System — firmware that boots the PC |
| **Kernel** | Core of OS — manages hardware & resources |
| **Shell** | Interface between user and kernel (CLI/GUI) |

### CPU Scheduling Algorithms
| Algorithm | Description |
|-----------|-------------|
| **FCFS** | First Come First Served |
| **SJF** | Shortest Job First |
| **Round Robin** | Fixed time quantum per process |
| **Priority** | Higher priority process runs first |
| **SRTF** | Shortest Remaining Time First (preemptive SJF) |

### Deadlock Conditions (All 4 needed)
```
1. Mutual Exclusion — Only one process uses a resource at a time
2. Hold and Wait — Holding one resource, waiting for another
3. No Preemption — Resources cannot be forcibly taken
4. Circular Wait — Circular chain of processes waiting
```

### File Systems
| Type | Description |
|------|-------------|
| **FAT32** | Older, max file size 4GB, works everywhere |
| **NTFS** | Windows default, supports permissions & encryption |
| **ext4** | Linux default file system |
| **APFS** | Apple File System (macOS, iOS) |
| **HFS+** | Older Apple format |

---

# 📙 Section 3: Networking (Expanded)

---

## OSI Model (7 Layers) — MEMORIZE!

```
Layer 7: Application  → HTTP, FTP, SMTP, DNS, SNMP, Telnet
Layer 6: Presentation → SSL/TLS, Encryption, Compression, JPEG, MPEG
Layer 5: Session      → Session Management, NetBIOS, RPC, PPTP
Layer 4: Transport    → TCP, UDP, Ports, Flow Control
Layer 3: Network      → IP, Routing, ICMP, ARP, RARP, IGMP
Layer 2: Data Link    → MAC, Ethernet, Switch, Bridge, PPP
Layer 1: Physical     → Cables, Hubs, Repeaters, Signals, Bits

Mnemonics:
  Top-down: All People Seem To Need Data Processing
  Bottom-up: Please Do Not Throw Sausage Pizza Away
```

### What happens at each layer:
| Layer | Data Unit | Devices |
|-------|-----------|---------|
| Application | Data | — |
| Presentation | Data | — |
| Session | Data | — |
| Transport | Segment | Firewall |
| Network | Packet | Router |
| Data Link | Frame | Switch, Bridge |
| Physical | Bit | Hub, Repeater, Cables |

---

## TCP/IP Model (4 Layers)
```
Layer 4: Application     → HTTP, FTP, DNS, SMTP (OSI 5+6+7)
Layer 3: Transport       → TCP, UDP (OSI 4)
Layer 2: Internet        → IP, ICMP, ARP (OSI 3)
Layer 1: Network Access  → Ethernet, Wi-Fi (OSI 1+2)
```

---

## TCP vs UDP
| Feature | TCP | UDP |
|---------|-----|-----|
| **Full Name** | Transmission Control Protocol | User Datagram Protocol |
| **Connection** | Connection-oriented (3-way handshake) | Connectionless |
| **Reliability** | Reliable (guaranteed delivery) | Unreliable (best effort) |
| **Ordering** | In-order delivery | No order guaranteed |
| **Speed** | Slower (overhead) | Faster (minimal overhead) |
| **Error Checking** | Yes + retransmission | Checksum only |
| **Flow Control** | Yes (sliding window) | No |
| **Use Case** | HTTP, FTP, Email, SSH | DNS, VoIP, Video streaming, Gaming |
| **Header Size** | 20 bytes | 8 bytes |

### TCP 3-Way Handshake
```
Client → SYN → Server          (Client initiates)
Server → SYN-ACK → Client      (Server acknowledges)
Client → ACK → Server          (Connection established!)

Termination: FIN → ACK → FIN → ACK (4-way)
```

---

## IP Addressing

### IPv4
```
Format: 32-bit → 4 octets → e.g., 192.168.1.1
Each octet: 0–255

Classes:
  Class A: 0.0.0.0 – 127.255.255.255     (Large networks, /8)
  Class B: 128.0.0.0 – 191.255.255.255   (Medium networks, /16)
  Class C: 192.0.0.0 – 223.255.255.255   (Small networks, /24)
  Class D: 224.0.0.0 – 239.255.255.255   (Multicast)
  Class E: 240.0.0.0 – 255.255.255.255   (Reserved/Experimental)

Private IPs (NOT routable on internet):
  10.0.0.0/8          (Class A private)
  172.16.0.0/12       (Class B private)
  192.168.0.0/16      (Class C private)

Special IPs:
  127.0.0.1           Loopback (localhost)
  0.0.0.0             Default route / "any" address
  255.255.255.255     Broadcast address
```

### IPv6
```
Format: 128-bit → 8 groups of 4 hex digits
Example: 2001:0db8:85a3:0000:0000:8a2e:0370:7334

Features:
  - 3.4 × 10^38 addresses (virtually unlimited)
  - No need for NAT
  - Built-in IPSec security
  - No broadcast (uses multicast)
```

### Subnetting Basics
```
Subnet Mask: Identifies network vs host portion
  /24 = 255.255.255.0   → 256 IPs → 254 usable hosts
  /25 = 255.255.255.128  → 128 IPs → 126 usable hosts
  /26 = 255.255.255.192  → 64 IPs  → 62 usable hosts
  /27 = 255.255.255.224  → 32 IPs  → 30 usable hosts
  /28 = 255.255.255.240  → 16 IPs  → 14 usable hosts
  /30 = 255.255.255.252  → 4 IPs   → 2 usable hosts (point-to-point)

Formula: Usable hosts = 2^(32-prefix) - 2
  (subtract 2 for network address and broadcast address)
```

---

## Common Protocols & Ports
| Protocol | Port | Purpose |
|----------|------|---------|
| HTTP | 80 | Web traffic (unencrypted) |
| HTTPS | 443 | Secure web (encrypted via SSL/TLS) |
| FTP | 21 (control), 20 (data) | File transfer |
| SFTP | 22 | Secure FTP over SSH |
| SSH | 22 | Secure shell (remote access) |
| Telnet | 23 | Remote access (UNSECURE — plain text) |
| SMTP | 25 / 587 | Email sending |
| POP3 | 110 | Email receiving (downloads & deletes from server) |
| IMAP | 143 | Email receiving (keeps on server, syncs) |
| DNS | 53 | Domain name → IP resolution |
| DHCP | 67 (server) / 68 (client) | Automatic IP assignment |
| SNMP | 161 | Network management & monitoring |
| RDP | 3389 | Remote Desktop Protocol (Windows) |
| NTP | 123 | Network Time Protocol |
| LDAP | 389 | Lightweight Directory Access Protocol |
| MySQL | 3306 | MySQL database |
| PostgreSQL | 5432 | PostgreSQL database |

---

## Network Devices
| Device | Layer | Function |
|--------|-------|----------|
| **Hub** | Physical (1) | Broadcasts data to all ports (dumb) |
| **Repeater** | Physical (1) | Amplifies signal over long distances |
| **Switch** | Data Link (2) | Forwards data to specific MAC address |
| **Bridge** | Data Link (2) | Connects two network segments |
| **Router** | Network (3) | Routes packets between different networks |
| **Gateway** | Application (7) | Connects different network architectures |
| **Modem** | Physical (1) | Modulates/demodulates signals (analog ↔ digital) |
| **Firewall** | Transport/App | Filters traffic by rules |
| **Load Balancer** | Application | Distributes traffic across servers |
| **Proxy Server** | Application | Intermediary between client and server |
| **Access Point** | Data Link (2) | Provides wireless connectivity |

---

## Network Topologies
| Topology | Description | Pros | Cons |
|----------|-------------|------|------|
| **Star** | All nodes connect to central hub/switch | Easy to manage, isolate failures | Hub = single point of failure |
| **Bus** | All nodes on a single cable | Cheap, simple | Cable break = entire network down |
| **Ring** | Each node connects to next in circle | Equal access, no collision | One break halts the entire ring |
| **Mesh** | Every node connected to every other | Highly reliable, redundant | Very expensive, complex |
| **Tree** | Hierarchical (bus + star hybrid) | Scalable, organized | Root failure = major outage |
| **Hybrid** | Mix of multiple topologies | Flexible | Complex to design |

---

## DNS (Domain Name System)
```
Process:
  1. User types www.google.com
  2. Browser checks local cache
  3. OS checks hosts file
  4. Queries DNS Resolver (ISP)
  5. Resolver checks its cache
  6. Queries Root DNS Server → ".com" TLD server
  7. TLD server → "google.com" Authoritative server
  8. Returns IP address: 142.250.190.14
  9. Browser connects to IP

Record Types:
  A     → Domain → IPv4 address
  AAAA  → Domain → IPv6 address
  CNAME → Domain → Another domain (alias)
  MX    → Mail server for domain
  NS    → Nameserver for domain
  TXT   → Arbitrary text (SPF, DKIM for email)
  SOA   → Start of Authority (zone info)
```

---

## DHCP (Dynamic Host Configuration Protocol)
```
DORA Process:
  D - Discover   → Client broadcasts "I need an IP"
  O - Offer      → DHCP server offers an IP
  R - Request    → Client requests the offered IP
  A - Acknowledge → Server confirms IP assignment

Assigns: IP address, Subnet mask, Default gateway, DNS server
```

---

## HTTP Basics
```
Methods:
  GET    → Retrieve data
  POST   → Submit data
  PUT    → Update/replace entire resource
  PATCH  → Partial update
  DELETE → Remove resource
  HEAD   → Same as GET but no body (headers only)

Status Codes:
  1xx → Informational
  2xx → Success (200 OK, 201 Created, 204 No Content)
  3xx → Redirection (301 Moved, 302 Found, 304 Not Modified)
  4xx → Client Error (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found)
  5xx → Server Error (500 Internal Error, 502 Bad Gateway, 503 Service Unavailable)
```

---

# 📕 Section 4: Cybersecurity (Expanded)

---

## CIA Triad (Foundation of Security!)
```
C — Confidentiality → Only authorized people can access data
I — Integrity       → Data is accurate and unaltered
A — Availability    → Data/services are accessible when needed
```

---

## Encryption Types

### Symmetric Encryption (Same key)
| Algorithm | Key Size | Speed | Use Case |
|-----------|----------|-------|----------|
| **AES** | 128/192/256-bit | Fast | File encryption, Wi-Fi (WPA2) |
| **DES** | 56-bit | Fast | Legacy (weak, deprecated) |
| **3DES** | 168-bit | Medium | Banking (being phased out) |
| **Blowfish** | 32-448 bit | Fast | Password hashing |
| **RC4** | 40-2048 bit | Very Fast | Streaming (deprecated) |

### Asymmetric Encryption (Public + Private key pair)
| Algorithm | Key Size | Speed | Use Case |
|-----------|----------|-------|----------|
| **RSA** | 1024-4096 bit | Slow | Digital signatures, SSL/TLS |
| **ECC** | 256-bit | Medium | Mobile, IoT (smaller key = efficient) |
| **DSA** | 1024-3072 bit | Medium | Digital signatures |
| **Diffie-Hellman** | Variable | Medium | Key exchange |

### Hashing (One-way, NOT reversible)
| Algorithm | Output Size | Status |
|-----------|-------------|--------|
| **MD5** | 128-bit | ⚠️ Broken — don't use |
| **SHA-1** | 160-bit | ⚠️ Weak — deprecated |
| **SHA-256** | 256-bit | ✅ Secure — widely used |
| **SHA-512** | 512-bit | ✅ Very secure |
| **bcrypt** | Variable | ✅ Best for password hashing |

---

## Common Attacks & Threats

| Attack | Description | Prevention |
|--------|-------------|------------|
| **Phishing** | Fake emails/sites to steal credentials | Training, email filtering |
| **SQL Injection** | Malicious SQL in input fields | Parameterized queries |
| **XSS** | Inject scripts into web pages | Input sanitization |
| **CSRF** | Trick user into unwanted actions | CSRF tokens |
| **DDoS** | Overwhelm server with traffic | CDN, rate limiting |
| **Man-in-Middle** | Intercept communication | SSL/TLS, VPN |
| **Ransomware** | Encrypt files, demand payment | Backups, anti-malware |
| **Brute Force** | Try all password combinations | Account lockout, CAPTCHA |
| **Social Engineering** | Manipulate humans to reveal info | Security awareness training |
| **Zero-Day** | Exploit unknown vulnerability | Patch management |
| **Keylogger** | Records keystrokes | Anti-malware, MFA |
| **Trojan Horse** | Malware disguised as legitimate software | Anti-virus |
| **Worm** | Self-replicating malware | Network segmentation |
| **Rootkit** | Hidden persistent malware with root access | Secure boot |
| **DNS Spoofing** | Redirect DNS to fake IP | DNSSEC |
| **ARP Spoofing** | Fake ARP replies to intercept traffic | Static ARP entries |

---

## Security Mechanisms

| Mechanism | Description |
|-----------|-------------|
| **Firewall** | Filters network traffic by rules (allow/deny) |
| **IDS** | Intrusion Detection System — detects & alerts |
| **IPS** | Intrusion Prevention System — detects & blocks |
| **VPN** | Virtual Private Network — encrypted tunnel |
| **SSL/TLS** | Encrypts data in transit (HTTPS) |
| **DMZ** | Demilitarized Zone — buffer between internet and internal network |
| **WAF** | Web Application Firewall — protects web apps |
| **SIEM** | Security Info & Event Management — centralized logging |
| **NAC** | Network Access Control — device authentication |
| **DLP** | Data Loss Prevention — prevents data leaks |
| **Antivirus** | Detects and removes malware |
| **Penetration Testing** | Authorized simulated attack to find vulnerabilities |
| **Honeypot** | Decoy system to attract attackers |

---

## Authentication & Authorization
```
Authentication (AuthN) → WHO are you? (verify identity)
Authorization (AuthZ)  → WHAT can you do? (verify permissions)

Types of Authentication:
  Single Factor:    Password only
  Two-Factor (2FA): Password + OTP/Biometric
  MFA:              Multiple factors combined
  Biometric:        Fingerprint, Face, Retina, Voice
  Token-based:      JWT, OAuth tokens
  Certificate:      Digital certificates (X.509)

Factors:
  Something you KNOW → Password, PIN
  Something you HAVE → Phone, Token, Smart Card
  Something you ARE  → Fingerprint, Face, Retina
```

---

# 📒 Section 5: Cloud Computing (Expanded)

---

## Cloud Service Models
| Model | Full Form | You Manage | Provider Manages | Example |
|-------|-----------|------------|-----------------|---------|
| **IaaS** | Infrastructure as a Service | OS, Apps, Data, Runtime | Hardware, Networking, Storage | AWS EC2, Azure VMs |
| **PaaS** | Platform as a Service | Apps, Data | OS, Runtime, Hardware | Google App Engine, Heroku |
| **SaaS** | Software as a Service | Nothing (just use it) | Everything | Gmail, Salesforce, Office 365 |
| **FaaS** | Function as a Service | Only code/functions | Everything else | AWS Lambda, Azure Functions |

**Pizza Analogy:**
```
On-Premise = Make everything yourself (dough, sauce, oven, serve)
IaaS       = Get kitchen + ingredients (you cook & serve)
PaaS       = Get a ready kitchen (you just make the pizza)
SaaS       = Order from restaurant (just eat!)
FaaS       = Uber Eats delivers one slice on demand
```

---

## Cloud Deployment Models
| Model | Description | Who Uses It | Example |
|-------|-------------|-------------|---------|
| **Public Cloud** | Shared infrastructure, provider owns | Startups, general use | AWS, Azure, GCP |
| **Private Cloud** | Dedicated to one organization | Banks, Government | On-prem VMware, OpenStack |
| **Hybrid Cloud** | Mix of public + private | Enterprises | AWS + On-prem |
| **Multi-Cloud** | Multiple public cloud providers | Large enterprises | AWS + Azure + GCP |
| **Community Cloud** | Shared by organizations with common needs | Healthcare, Gov | HIPAA-compliant clouds |

---

## Key Cloud Concepts
| Concept | Definition |
|---------|-----------|
| **Scalability** | Ability to handle increasing load |
| **Vertical Scaling** | Add more power to existing server (scale UP) |
| **Horizontal Scaling** | Add more servers (scale OUT) |
| **Elasticity** | Auto scale up/down based on real-time demand |
| **High Availability** | Minimize downtime (SLA: 99.9% = 8.76 hrs/year downtime) |
| **Fault Tolerance** | Continue operating despite component failures |
| **Disaster Recovery** | Plan to restore after catastrophic failure |
| **Load Balancer** | Distributes traffic across multiple servers |
| **Auto Scaling** | Automatically add/remove instances |
| **CDN** | Content Delivery Network — cache content near users |
| **Region** | Geographic area with multiple data centers |
| **Availability Zone** | Isolated data center within a region |
| **Latency** | Time delay between request and response |
| **Throughput** | Amount of data transferred per unit time |
| **Bandwidth** | Maximum data transfer capacity |

---

## Virtualization & Containers
| Concept | Description |
|---------|-----------|
| **Virtual Machine** | Software emulation of a physical computer |
| **Hypervisor** | Software that creates and manages VMs |
| **Type 1 Hypervisor** | Bare-metal (VMware ESXi, Hyper-V) |
| **Type 2 Hypervisor** | Runs on host OS (VirtualBox, VMware Workstation) |
| **Docker** | Container platform — lightweight app packaging |
| **Container** | Isolated environment sharing host OS kernel |
| **Kubernetes (K8s)** | Container orchestration — auto-deploy, scale, manage |
| **Microservices** | App split into small, independent services |
| **Monolithic** | App as single, tightly-coupled unit |

### VM vs Container
| Feature | Virtual Machine | Container |
|---------|----------------|-----------|
| **Size** | Gigabytes | Megabytes |
| **Boot Time** | Minutes | Seconds |
| **OS** | Full guest OS per VM | Shares host OS kernel |
| **Isolation** | Strong (hardware-level) | Moderate (process-level) |
| **Resource Usage** | Heavy | Lightweight |
| **Use Case** | Different OS needed | Same OS, many apps |

---

## DevOps & CI/CD (Basic)
| Concept | Definition |
|---------|-----------|
| **DevOps** | Culture combining Development + Operations |
| **CI (Continuous Integration)** | Auto-build and test on every code commit |
| **CD (Continuous Delivery)** | Auto-deploy to staging after CI passes |
| **CD (Continuous Deployment)** | Auto-deploy to production (no manual step) |
| **Pipeline** | Automated workflow: Code → Build → Test → Deploy |
| **Git** | Version control system |
| **Jenkins** | Open-source CI/CD automation server |
| **GitHub Actions** | CI/CD built into GitHub |
| **Infrastructure as Code** | Manage infra using code (Terraform, CloudFormation) |
| **Monitoring** | Track app health (Prometheus, Grafana, CloudWatch) |

---

## Major Cloud Providers — Key Services
| Service Type | AWS | Azure | GCP |
|-------------|-----|-------|-----|
| **Compute (VMs)** | EC2 | Virtual Machines | Compute Engine |
| **Serverless** | Lambda | Functions | Cloud Functions |
| **Storage (Object)** | S3 | Blob Storage | Cloud Storage |
| **Database (SQL)** | RDS | Azure SQL | Cloud SQL |
| **Database (NoSQL)** | DynamoDB | Cosmos DB | Firestore |
| **Container** | ECS/EKS | AKS | GKE |
| **AI/ML** | SageMaker | Azure ML | Vertex AI |
| **CDN** | CloudFront | Azure CDN | Cloud CDN |
| **DNS** | Route 53 | Azure DNS | Cloud DNS |
| **IAM** | IAM | Azure AD | Cloud IAM |
| **Messaging** | SQS/SNS | Service Bus | Pub/Sub |

---

# 📋 Section 6: DBMS & SQL Basics (Bonus — Sometimes Asked)

---

## Key DBMS Concepts
| Concept | Definition |
|---------|-----------|
| **DBMS** | Database Management System |
| **RDBMS** | Relational DBMS (uses tables with relationships) |
| **SQL** | Structured Query Language |
| **Table** | Collection of rows (records) and columns (fields) |
| **Primary Key** | Unique identifier for each row |
| **Foreign Key** | Column referencing primary key of another table |
| **Index** | Data structure to speed up queries |
| **View** | Virtual table based on a SQL query |
| **Stored Procedure** | Pre-compiled SQL code stored in DB |
| **Trigger** | Auto-execute code on INSERT/UPDATE/DELETE |
| **Transaction** | Group of operations that must all succeed or all fail |
| **Normalization** | Organizing data to reduce redundancy |

### ACID Properties
```
A — Atomicity    → All-or-nothing (either all operations succeed or none)
C — Consistency  → Database remains valid before and after transaction
I — Isolation    → Concurrent transactions don't interfere
D — Durability   → Once committed, data persists even after crash
```

### Normal Forms
```
1NF → No repeating groups, atomic values in each cell
2NF → 1NF + No partial dependency (non-key depends on full primary key)
3NF → 2NF + No transitive dependency (non-key depends only on primary key)
BCNF → Every determinant is a candidate key
```

### SQL Commands Categories
```
DDL (Data Definition):   CREATE, ALTER, DROP, TRUNCATE
DML (Data Manipulation): SELECT, INSERT, UPDATE, DELETE
DCL (Data Control):      GRANT, REVOKE
TCL (Transaction):       COMMIT, ROLLBACK, SAVEPOINT
```

---

# 📊 Quick Revision Checklists

---

## Pseudocode Dry-Run Checklist
```
Before solving any pseudocode:
1. Identify all variables and their initial values
2. Check data types (int division vs float division!)
3. Trace through each iteration of loops
4. Track variable values in a table
5. Watch for off-by-one errors (< vs <=)
6. Check pre/post increment (++i vs i++)
7. Note return values of functions carefully
8. Watch for break/continue statements
9. Check pass by value vs pass by reference
10. Note operator precedence in complex expressions
```

## Binary ↔ Decimal Conversion Table
```
0000 = 0    0001 = 1    0010 = 2    0011 = 3
0100 = 4    0101 = 5    0110 = 6    0111 = 7
1000 = 8    1001 = 9    1010 = 10   1011 = 11
1100 = 12   1101 = 13   1110 = 14   1111 = 15
```

## Powers of 2 (Memorize!)
```
2^0  = 1        2^6  = 64       2^12 = 4096
2^1  = 2        2^7  = 128      2^13 = 8192
2^2  = 4        2^8  = 256      2^14 = 16384
2^3  = 8        2^9  = 512      2^15 = 32768
2^4  = 16       2^10 = 1024     2^16 = 65536
2^5  = 32       2^11 = 2048     2^20 = 1048576 (~1M)
```

## ASCII Values (Common — Sometimes Asked)
```
'A' = 65    'a' = 97     '0' = 48
'Z' = 90    'z' = 122    '9' = 57
Space = 32  NULL = 0     Newline = 10
```

---

> **⚡ Focus Priority: Pseudocode (40%) → Networking (20%) → Cloud (15%) → Security (15%) → MS Office (10%)**
