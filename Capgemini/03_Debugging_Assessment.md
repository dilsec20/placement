# 🐛 Stage 3 — Debugging Assessment

> **Type:** Code Debugging | **Time:** ~20-30 mins | **Languages:** C, C++, Java  
> **For ₹13-16 LPA:** Expect tricky logic errors, not just syntax errors

---

## 📋 What's Tested

```
You will be given code snippets with BUGS. Your job:
1. READ the problem statement carefully
2. TRACE the given code line by line
3. IDENTIFY the bug(s)
4. FIX the code to match expected output

Bug Types:
├── Syntax Errors (missing semicolons, wrong brackets)
├── Logic Errors (wrong conditions, off-by-one, wrong operators)
├── Runtime Errors (null access, array out of bounds, division by zero)
└── Semantic Errors (code runs but gives wrong output)
```

---

## 🔥 Debugging PYQs — C++ Edition

### Bug 1: Off-by-One Error (Array Traversal) ⭐

**Problem:** Find the maximum element in an array.

```cpp
// BUGGY CODE
#include <bits/stdc++.h>
using namespace std;
int main() {
    int arr[] = {3, 7, 2, 8, 1, 5};
    int n = sizeof(arr) / sizeof(arr[0]);
    int max = arr[0];
    for (int i = 0; i <= n; i++) {          // ❌ BUG: i <= n → out of bounds
        if (arr[i] > max)
            max = arr[i];
    }
    cout << max;
    return 0;
}
```

**Fix:** `i <= n` → `i < n`

```cpp
for (int i = 0; i < n; i++) {               // ✅ FIXED
```

---

### Bug 2: Wrong Operator in Condition ⭐

**Problem:** Check if a number is even.

```cpp
// BUGGY CODE
bool isEven(int n) {
    if (n % 2 = 0)      // ❌ BUG: = is assignment, not comparison
        return true;
    return false;
}
```

**Fix:** `=` → `==`

```cpp
if (n % 2 == 0)          // ✅ FIXED
```

---

### Bug 3: Uninitialized Variable ⭐

**Problem:** Calculate sum of array elements.

```cpp
// BUGGY CODE
int sumArray(int arr[], int n) {
    int sum;                            // ❌ BUG: uninitialized (garbage value)
    for (int i = 0; i < n; i++)
        sum += arr[i];
    return sum;
}
```

**Fix:** Initialize `sum = 0`

```cpp
int sum = 0;                            // ✅ FIXED
```

---

### Bug 4: Infinite Loop ⭐

**Problem:** Print numbers 1 to 10.

```cpp
// BUGGY CODE
int i = 1;
while (i <= 10) {
    cout << i << " ";
    // ❌ BUG: i is never incremented → infinite loop
}
```

**Fix:** Add `i++`

```cpp
while (i <= 10) {
    cout << i << " ";
    i++;                                // ✅ FIXED
}
```

---

### Bug 5: Wrong Loop Bounds in Bubble Sort ⭐⭐

```cpp
// BUGGY CODE
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {          // ❌ BUG: should be n-i-1
            if (arr[j] > arr[j + 1]) {         // Also causes out-of-bounds
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}
```

**Fix:** Inner loop: `j < n - i - 1`

```cpp
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {          // ✅ n-1
        for (int j = 0; j < n - i - 1; j++) {  // ✅ n-i-1
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}
```

---

### Bug 6: Wrong Return in Recursive Factorial ⭐

```cpp
// BUGGY CODE
int factorial(int n) {
    if (n == 0) return 1;
    return n * factorial(n);             // ❌ BUG: should be n-1
}
```

**Fix:** `factorial(n)` → `factorial(n - 1)`

```cpp
return n * factorial(n - 1);            // ✅ FIXED
```

---

### Bug 7: String Palindrome — Wrong Index ⭐

```cpp
// BUGGY CODE
bool isPalindrome(string s) {
    int n = s.length();
    for (int i = 0; i < n; i++) {
        if (s[i] != s[n - i])           // ❌ BUG: s[n] is out of bounds
            return false;
    }
    return true;
}
```

**Fix:** `s[n - i]` → `s[n - 1 - i]`

```cpp
if (s[i] != s[n - 1 - i])              // ✅ FIXED
```

---

### Bug 8: Binary Search — Wrong Mid Calculation ⭐⭐

```cpp
// BUGGY CODE
int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n;            // ❌ BUG: right should be n-1
    while (left < right) {              // ❌ BUG: should be left <= right
        int mid = (left + right) / 2;   // ⚠️ Potential overflow
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid;  // ❌ BUG: should be mid+1
        else right = mid;                    // ❌ BUG: should be mid-1
    }
    return -1;
}
```

**Fix:** Multiple bugs

```cpp
int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;                    // ✅ n-1
    while (left <= right) {                          // ✅ <=
        int mid = left + (right - left) / 2;         // ✅ overflow-safe
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;       // ✅ mid+1
        else right = mid - 1;                         // ✅ mid-1
    }
    return -1;
}
```

---

### Bug 9: Swap Function — Pass by Value ⭐⭐

```cpp
// BUGGY CODE
void swap(int a, int b) {     // ❌ BUG: pass by VALUE, not reference
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 5, y = 10;
    swap(x, y);
    cout << x << " " << y;    // Still prints 5 10!
}
```

**Fix:** Use references `int&`

```cpp
void swap(int& a, int& b) {   // ✅ FIXED: pass by REFERENCE
    int temp = a;
    a = b;
    b = temp;
}
```

---

### Bug 10: GCD — Wrong Base Case ⭐

```cpp
// BUGGY CODE
int gcd(int a, int b) {
    if (a == 0) return a;      // ❌ BUG: should return b
    return gcd(b % a, a);
}
```

**Fix:** Return `b` when `a == 0`

```cpp
int gcd(int a, int b) {
    if (a == 0) return b;      // ✅ FIXED
    return gcd(b % a, a);
}
```

---

### Bug 11: Fibonacci — Wrong Initial Values ⭐

```cpp
// BUGGY CODE
void fibonacci(int n) {
    int a = 1, b = 1;         // ❌ BUG: should be 0, 1
    for (int i = 0; i < n; i++) {
        cout << a << " ";
        int c = a + b;
        a = b;
        b = c;
    }
}
// Output: 1 1 2 3 5 8... (wrong, should be 0 1 1 2 3 5 8...)
```

**Fix:** `a = 0, b = 1`

```cpp
int a = 0, b = 1;             // ✅ FIXED
```

---

### Bug 12: Reverse Array — Goes Past Midpoint ⭐

```cpp
// BUGGY CODE
void reverse(int arr[], int n) {
    for (int i = 0; i < n; i++) {      // ❌ BUG: should be n/2
        swap(arr[i], arr[n - 1 - i]);
    }
}
// Reverses twice → back to original!
```

**Fix:** Loop only to `n / 2`

```cpp
for (int i = 0; i < n / 2; i++) {      // ✅ FIXED
    swap(arr[i], arr[n - 1 - i]);
}
```

---

### Bug 13: String to Integer — Missing Digit Accumulation ⭐⭐

```cpp
// BUGGY CODE
int strToInt(string s) {
    int result = 0;
    for (int i = 0; i < s.length(); i++) {
        result = s[i] - '0';                    // ❌ BUG: overwrites instead of accumulates
    }
    return result;
}
// "123" → returns 3 instead of 123
```

**Fix:** Multiply by 10 and add

```cpp
result = result * 10 + (s[i] - '0');            // ✅ FIXED
```

---

### Bug 14: Count Vowels — Missing Cases ⭐

```cpp
// BUGGY CODE
int countVowels(string s) {
    int count = 0;
    for (char c : s) {
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u')
            count++;
        // ❌ BUG: doesn't handle UPPERCASE vowels
    }
    return count;
}
// "Hello" → returns 1 instead of 2 (misses 'E' → wait, 'H','e','l','l','o' → e,o=2, but 'e' is lowercase so it catches it. Let me fix the example)
// "HELLO" → returns 0 instead of 2
```

**Fix:** Convert to lowercase or add uppercase checks

```cpp
for (char c : s) {
    c = tolower(c);                              // ✅ FIXED
    if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u')
        count++;
}
```

---

### Bug 15: Prime Check — Wrong Starting Point ⭐

```cpp
// BUGGY CODE
bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i < n; i++) {               // ⚠️ Works but SLOW: O(n)
        if (n % i == 0) return false;
    }
    return true;
}
```

**Optimization (not a bug, but expected fix for higher roles):**

```cpp
bool isPrime(int n) {
    if (n < 2) return false;
    if (n < 4) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    for (int i = 5; i * i <= n; i += 6) {       // ✅ O(√n)
        if (n % i == 0 || n % (i + 2) == 0)
            return false;
    }
    return true;
}
```

---

## 🎯 Top Debugging Patterns to Watch For

| # | Bug Pattern | How to Spot It |
|---|-------------|---------------|
| 1 | Off-by-one (`<=` vs `<`) | Check loop bounds against array size |
| 2 | `=` vs `==` | Assignment in condition = always true |
| 3 | Uninitialized variables | Check all variables before first use |
| 4 | Missing `i++` in while loop | Look for increment/decrement |
| 5 | Wrong recursive call | Check if argument decreases toward base case |
| 6 | Pass by value vs reference | C++: functions modifying params need `&` |
| 7 | Integer overflow | `int` max = 2.1B, use `long long` for big numbers |
| 8 | Array index out of bounds | `arr[n]` when max valid index is `n-1` |
| 9 | Reversed comparison | `<` vs `>`, `&&` vs `||` |
| 10 | Missing break in switch | Fall-through executes all cases below |

---

## 🧪 Debugging Strategy (4-Step Method)

```
1. READ:     Read the problem statement first (understand expected output)
2. TRACE:    Dry-run the code with the sample input on paper
3. COMPARE:  Compare your trace output with expected output
4. LOCATE:   The line where trace diverges = the bug location
```

---

> **Next:** [Stage 4 — AI-Assisted Coding →](./04_AI_Assisted_Coding.md) | **Back to** [Main](./README.md)
