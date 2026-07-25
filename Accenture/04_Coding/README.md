# 🖥️ Round 4: Coding Assessment — Concepts (C++)

> **3 Questions | 60 Minutes | ✅ ELIMINATORY | Languages: C, C++, Java, Python**

---

## 📌 Overview

| Detail | Information |
|--------|-------------|
| **Questions** | 3 coding problems |
| **Time** | 60 minutes total |
| **Difficulty** | Easy to Medium |
| **Languages** | C, C++, Java, Python, .NET |
| **Partial Marks** | ✅ Yes — partial credit for test cases passed |
| **To Clear** | Aim for at least 1 full solution + 1 partial |

---

## 🎯 Most Asked Topics

| Priority | Topic | Frequency |
|----------|-------|-----------|
| 🔴 High | Arrays (traversal, sum, max, min, reverse) | Very Common |
| 🔴 High | Strings (count, validate, manipulate) | Very Common |
| 🔴 High | Number Problems (reverse, palindrome, prime, digits) | Very Common |
| 🟡 Medium | Sorting & Searching (bubble sort, linear search) | Common |
| 🟡 Medium | Pattern Printing (stars, numbers) | Common |
| 🟢 Low | Basic Math (GCD, LCM, factorial) | Sometimes |
| 🟢 Low | Matrix Operations (transpose, sum) | Rare |

---

## 📘 Topic 1: Number Problems

### 1.1 Check Prime Number
```cpp
#include <iostream>
using namespace std;

bool isPrime(int n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    for (int i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0)
            return false;
    }
    return true;
}

int main() {
    int n;
    cin >> n;
    if (isPrime(n))
        cout << n << " is Prime" << endl;
    else
        cout << n << " is Not Prime" << endl;
    return 0;
}
// Input: 17 → Output: 17 is Prime
// Input: 15 → Output: 15 is Not Prime
```

### 1.2 Reverse a Number
```cpp
#include <iostream>
using namespace std;

int main() {
    int n, rev = 0;
    cin >> n;
    int original = n;
    while (n > 0) {
        rev = rev * 10 + n % 10;
        n /= 10;
    }
    cout << "Reverse of " << original << " is " << rev << endl;
    return 0;
}
// Input: 1234 → Output: Reverse of 1234 is 4321
```

### 1.3 Check Palindrome Number
```cpp
#include <iostream>
using namespace std;

int main() {
    int n, rev = 0;
    cin >> n;
    int original = n;
    while (n > 0) {
        rev = rev * 10 + n % 10;
        n /= 10;
    }
    if (original == rev)
        cout << original << " is a Palindrome" << endl;
    else
        cout << original << " is NOT a Palindrome" << endl;
    return 0;
}
// Input: 121 → Output: 121 is a Palindrome
// Input: 123 → Output: 123 is NOT a Palindrome
```

### 1.4 Armstrong Number
```cpp
#include <iostream>
#include <cmath>
using namespace std;

int main() {
    int n;
    cin >> n;
    int original = n, sum = 0;
    int digits = 0, temp = n;
    while (temp > 0) { digits++; temp /= 10; }
    
    temp = n;
    while (temp > 0) {
        int d = temp % 10;
        sum += pow(d, digits);
        temp /= 10;
    }
    
    if (sum == original)
        cout << original << " is Armstrong" << endl;
    else
        cout << original << " is NOT Armstrong" << endl;
    return 0;
}
// 153 → 1³+5³+3³ = 1+125+27 = 153 → Armstrong!
// 370 → 3³+7³+0³ = 27+343+0 = 370 → Armstrong!
```

### 1.5 Fibonacci Series
```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a = 0, b = 1;
    cout << a << " " << b << " ";
    for (int i = 2; i < n; i++) {
        int c = a + b;
        cout << c << " ";
        a = b;
        b = c;
    }
    cout << endl;
    return 0;
}
// Input: 8 → Output: 0 1 1 2 3 5 8 13
```

### 1.6 Sum of Digits
```cpp
#include <iostream>
using namespace std;

int main() {
    int n, sum = 0;
    cin >> n;
    while (n > 0) {
        sum += n % 10;
        n /= 10;
    }
    cout << "Sum of digits: " << sum << endl;
    return 0;
}
// Input: 1234 → Output: Sum of digits: 10
```

### 1.7 GCD & LCM
```cpp
#include <iostream>
using namespace std;

int gcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

int main() {
    int a, b;
    cin >> a >> b;
    int g = gcd(a, b);
    int lcm = (a * b) / g;
    cout << "GCD: " << g << ", LCM: " << lcm << endl;
    return 0;
}
// Input: 12 18 → Output: GCD: 6, LCM: 36
```

### 1.8 Factorial
```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    long long fact = 1;
    for (int i = 1; i <= n; i++) {
        fact *= i;
    }
    cout << n << "! = " << fact << endl;
    return 0;
}
// Input: 5 → Output: 5! = 120
```

---

## 📘 Topic 2: Array Problems

### 2.1 Find Second Largest Element
```cpp
#include <iostream>
#include <climits>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[n];
    for (int i = 0; i < n; i++) cin >> arr[i];
    
    int first = INT_MIN, second = INT_MIN;
    for (int i = 0; i < n; i++) {
        if (arr[i] > first) {
            second = first;
            first = arr[i];
        } else if (arr[i] > second && arr[i] != first) {
            second = arr[i];
        }
    }
    cout << "Second largest: " << second << endl;
    return 0;
}
// Input: 5, {3, 7, 1, 9, 5} → Output: Second largest: 7
```

### 2.2 Reverse an Array
```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[n];
    for (int i = 0; i < n; i++) cin >> arr[i];
    
    // Reverse in-place
    for (int i = 0; i < n / 2; i++) {
        swap(arr[i], arr[n - 1 - i]);
    }
    
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    return 0;
}
// Input: 5, {1, 2, 3, 4, 5} → Output: 5 4 3 2 1
```

### 2.3 Sum of Elements at Even/Odd Indices
```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[n];
    for (int i = 0; i < n; i++) cin >> arr[i];
    
    int evenSum = 0, oddSum = 0;
    for (int i = 0; i < n; i++) {
        if (i % 2 == 0) evenSum += arr[i];
        else oddSum += arr[i];
    }
    cout << "Even index sum: " << evenSum << endl;
    cout << "Odd index sum: " << oddSum << endl;
    return 0;
}
// Input: 5, {10, 20, 30, 40, 50}
// Output: Even index sum: 90 (10+30+50), Odd index sum: 60 (20+40)
```

### 2.4 Count Occurrences of an Element
```cpp
#include <iostream>
using namespace std;

int main() {
    int n, target;
    cin >> n;
    int arr[n];
    for (int i = 0; i < n; i++) cin >> arr[i];
    cin >> target;
    
    int count = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) count++;
    }
    cout << target << " appears " << count << " times" << endl;
    return 0;
}
// Input: 6, {1,3,5,3,3,7}, target=3 → Output: 3 appears 3 times
```

### 2.5 Merge Two Sorted Arrays
```cpp
#include <iostream>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    int a[n], b[m], result[n + m];
    for (int i = 0; i < n; i++) cin >> a[i];
    for (int i = 0; i < m; i++) cin >> b[i];
    
    int i = 0, j = 0, k = 0;
    while (i < n && j < m) {
        if (a[i] <= b[j]) result[k++] = a[i++];
        else result[k++] = b[j++];
    }
    while (i < n) result[k++] = a[i++];
    while (j < m) result[k++] = b[j++];
    
    for (int x = 0; x < n + m; x++) cout << result[x] << " ";
    cout << endl;
    return 0;
}
// Input: a={1,3,5}, b={2,4,6} → Output: 1 2 3 4 5 6
```

### 2.6 Find Unique Element (XOR Trick)
```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[n];
    for (int i = 0; i < n; i++) cin >> arr[i];
    
    int unique = 0;
    for (int i = 0; i < n; i++) {
        unique ^= arr[i];
    }
    cout << "Unique element: " << unique << endl;
    return 0;
}
// Input: 5, {2, 3, 5, 3, 2} → Output: Unique element: 5
// Pairs cancel out with XOR: (2^2)^(3^3)^5 = 0^0^5 = 5
```

### 2.7 Rotate Array Left by K Positions
```cpp
#include <iostream>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    int arr[n];
    for (int i = 0; i < n; i++) cin >> arr[i];
    
    k %= n;  // Handle k > n
    // Simple approach: use temp array
    int temp[n];
    for (int i = 0; i < n; i++) {
        temp[i] = arr[(i + k) % n];
    }
    for (int i = 0; i < n; i++) cout << temp[i] << " ";
    cout << endl;
    return 0;
}
// Input: 5 2, {1,2,3,4,5} → Output: 3 4 5 1 2
```

### 2.8 Bubble Sort
```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[n];
    for (int i = 0; i < n; i++) cin >> arr[i];
    
    // Bubble Sort
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
    
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    return 0;
}
// Input: 5, {64, 34, 25, 12, 22} → Output: 12 22 25 34 64
```

---

## 📘 Topic 3: String Problems

### 3.1 Count Character Occurrences
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string str;
    char ch;
    getline(cin, str);
    cin >> ch;
    
    int count = 0;
    for (int i = 0; i < str.length(); i++) {
        if (str[i] == ch) count++;
    }
    cout << "'" << ch << "' appears " << count << " times" << endl;
    return 0;
}
// Input: "hello world", 'l' → Output: 'l' appears 3 times
```

### 3.2 Check Palindrome String
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string str;
    cin >> str;
    
    int n = str.length();
    bool isPalindrome = true;
    for (int i = 0; i < n / 2; i++) {
        if (str[i] != str[n - 1 - i]) {
            isPalindrome = false;
            break;
        }
    }
    
    if (isPalindrome) cout << str << " is a Palindrome" << endl;
    else cout << str << " is NOT a Palindrome" << endl;
    return 0;
}
// Input: "madam" → Output: madam is a Palindrome
// Input: "hello" → Output: hello is NOT a Palindrome
```

### 3.3 Reverse a String
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string str;
    cin >> str;
    
    int n = str.length();
    for (int i = 0; i < n / 2; i++) {
        swap(str[i], str[n - 1 - i]);
    }
    cout << str << endl;
    return 0;
}
// Input: "Accenture" → Output: erutneccA
```

### 3.4 Count Vowels and Consonants
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string str;
    getline(cin, str);
    
    int vowels = 0, consonants = 0;
    for (char c : str) {
        c = tolower(c);
        if (c >= 'a' && c <= 'z') {
            if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u')
                vowels++;
            else
                consonants++;
        }
    }
    cout << "Vowels: " << vowels << ", Consonants: " << consonants << endl;
    return 0;
}
// Input: "Accenture" → Output: Vowels: 4, Consonants: 5
```

### 3.5 Password Validation (Frequently Asked!)
```cpp
#include <iostream>
#include <string>
using namespace std;

bool isValidPassword(string password) {
    if (password.length() < 8) return false;
    
    bool hasUpper = false, hasLower = false;
    bool hasDigit = false, hasSpecial = false;
    
    for (char c : password) {
        if (isupper(c)) hasUpper = true;
        else if (islower(c)) hasLower = true;
        else if (isdigit(c)) hasDigit = true;
        else if (c == '@' || c == '#' || c == '$' || c == '%' || c == '!')
            hasSpecial = true;
        
        // No spaces or slashes allowed
        if (c == ' ' || c == '/') return false;
    }
    
    return hasUpper && hasLower && hasDigit && hasSpecial;
}

int main() {
    string password;
    cin >> password;
    
    if (isValidPassword(password))
        cout << "Valid Password" << endl;
    else
        cout << "Invalid Password" << endl;
    return 0;
}
// Input: "Abc@1234" → Output: Valid Password
// Input: "abc123" → Output: Invalid Password
```

### 3.6 Remove Duplicates from String
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string str;
    cin >> str;
    
    string result = "";
    for (char c : str) {
        if (result.find(c) == string::npos) {
            result += c;
        }
    }
    cout << result << endl;
    return 0;
}
// Input: "programming" → Output: "proaming"
```

### 3.7 Binary String XOR/AND/OR Operations (Accenture Specific!)
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s1, s2;
    cin >> s1 >> s2;
    
    string xorResult = "", andResult = "", orResult = "";
    for (int i = 0; i < s1.length(); i++) {
        xorResult += ((s1[i] - '0') ^ (s2[i] - '0')) + '0';
        andResult += ((s1[i] - '0') & (s2[i] - '0')) + '0';
        orResult  += ((s1[i] - '0') | (s2[i] - '0')) + '0';
    }
    
    cout << "XOR: " << xorResult << endl;
    cout << "AND: " << andResult << endl;
    cout << "OR:  " << orResult << endl;
    return 0;
}
// Input: "1100", "1010"
// Output: XOR: 0110, AND: 1000, OR: 1110
```

---

## 📘 Topic 4: Pattern Printing

### 4.1 Right Triangle
```cpp
// Input: n=5
// *
// **
// ***
// ****
// *****
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= i; j++) cout << "*";
    cout << endl;
}
```

### 4.2 Number Triangle
```cpp
// Input: n=5
// 1
// 12
// 123
// 1234
// 12345
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= i; j++) cout << j;
    cout << endl;
}
```

### 4.3 Inverted Triangle
```cpp
// Input: n=5
// *****
// ****
// ***
// **
// *
for (int i = n; i >= 1; i--) {
    for (int j = 1; j <= i; j++) cout << "*";
    cout << endl;
}
```

### 4.4 Pyramid
```cpp
// Input: n=5
//     *
//    ***
//   *****
//  *******
// *********
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= n - i; j++) cout << " ";
    for (int j = 1; j <= 2 * i - 1; j++) cout << "*";
    cout << endl;
}
```

---

## 📘 Topic 5: Matrix Operations

### 5.1 Matrix Transpose
```cpp
#include <iostream>
using namespace std;

int main() {
    int r, c;
    cin >> r >> c;
    int mat[r][c], trans[c][r];
    
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++)
            cin >> mat[i][j];
    
    // Transpose
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++)
            trans[j][i] = mat[i][j];
    
    // Print transpose
    for (int i = 0; i < c; i++) {
        for (int j = 0; j < r; j++)
            cout << trans[i][j] << " ";
        cout << endl;
    }
    return 0;
}
```

### 5.2 Matrix Multiplication
```cpp
#include <iostream>
using namespace std;

int main() {
    int r1, c1, r2, c2;
    cin >> r1 >> c1 >> r2 >> c2;
    
    if (c1 != r2) {
        cout << "Cannot multiply" << endl;
        return 0;
    }
    
    int a[r1][c1], b[r2][c2], result[r1][c2];
    for (int i = 0; i < r1; i++)
        for (int j = 0; j < c1; j++) cin >> a[i][j];
    for (int i = 0; i < r2; i++)
        for (int j = 0; j < c2; j++) cin >> b[i][j];
    
    // Multiply
    for (int i = 0; i < r1; i++) {
        for (int j = 0; j < c2; j++) {
            result[i][j] = 0;
            for (int k = 0; k < c1; k++) {
                result[i][j] += a[i][k] * b[k][j];
            }
        }
    }
    
    for (int i = 0; i < r1; i++) {
        for (int j = 0; j < c2; j++)
            cout << result[i][j] << " ";
        cout << endl;
    }
    return 0;
}
```

---

## 💡 Coding Tips for the Assessment

| Tip | Why |
|-----|-----|
| **Read ALL test cases** | Understand input format before coding |
| **Handle edge cases** | Empty arrays, single element, n=0, n=1 |
| **Use `long long`** | For large numbers (overflow protection) |
| **Don't optimize early** | Brute force that works > optimized that doesn't |
| **Use `cin.ignore()`** | When mixing `getline` and `cin` |
| **Test locally** | Dry run with sample input before submitting |
| **Partial marks matter** | Even 1 test case passed counts |
| **Time management** | Spend ~20 min per question max |

---

## ⚠️ Common Mistakes to Avoid

```
1. Integer overflow — use long long for large numbers
2. Off-by-one errors — check < vs <=
3. Uninitialized variables — always initialize to 0
4. Array out of bounds — indices go from 0 to n-1
5. Missing newline — use endl or "\n" at end of output
6. Wrong data type — int division when you need float
7. Forgetting break in switch
8. Infinite loops — check loop increment/decrement
```

---

> **Strategy: Solve the easiest problem fully first, then attempt the second, then third.**
