# 📝 Coding Assessment — Previous Year Questions (Accenture PYQ)

> **Memory-based coding problems from Accenture drives | With C++ Solutions**

---

## 📑 Index

1. [Replace Elements with Nearest Smaller on Right](#q1-replace-elements-with-nearest-smaller-on-right)
2. [Product of Array Elements at Even Positions](#q2-product-of-array-elements-at-even-positions)
3. [Sum of Odd-position Digits and Even-position Digits](#q3-sum-of-odd-position-and-even-position-digits)
4. [Password Validator](#q4-password-validator)
5. [Binary String Operations](#q5-binary-string-operations)
6. [Check if String is Pangram](#q6-check-if-string-is-pangram)
7. [Find Missing Number in Array](#q7-find-missing-number-in-array)
8. [Sort Array of 0s, 1s, and 2s](#q8-sort-array-of-0s-1s-and-2s)
9. [Remove Consecutive Duplicate Characters](#q9-remove-consecutive-duplicate-characters)
10. [Sum of Prime Numbers in Range](#q10-sum-of-prime-numbers-in-range)
11. [Check if Two Strings are Anagrams](#q11-check-if-two-strings-are-anagrams)
12. [Matrix Diagonal Sum](#q12-matrix-diagonal-sum)
13. [Count Words in a String](#q13-count-words-in-a-string)
14. [Find Second Largest Without Sorting](#q14-find-second-largest-without-sorting)
15. [Decimal to Binary Conversion](#q15-decimal-to-binary-conversion)

---

## Q1. Replace Elements with Nearest Smaller on Right

**Problem:** Given an array, replace every element with the nearest smaller element on its right. If no smaller element exists, replace with -1.

```cpp
#include <iostream>
#include <stack>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[n], result[n];
    for (int i = 0; i < n; i++) cin >> arr[i];
    
    stack<int> s;
    for (int i = n - 1; i >= 0; i--) {
        while (!s.empty() && s.top() >= arr[i]) {
            s.pop();
        }
        result[i] = s.empty() ? -1 : s.top();
        s.push(arr[i]);
    }
    
    for (int i = 0; i < n; i++) cout << result[i] << " ";
    cout << endl;
    return 0;
}

// Input:  5, {4, 5, 2, 10, 8}
// Output: 2 2 -1 8 -1
// Explanation:
//   4 → nearest smaller on right = 2
//   5 → nearest smaller on right = 2
//   2 → no smaller on right = -1
//   10 → nearest smaller on right = 8
//   8 → no smaller on right = -1
```

---

## Q2. Product of Array Elements at Even Positions

**Problem:** Given an array, find the product of all elements at even indices (0, 2, 4...).

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[n];
    for (int i = 0; i < n; i++) cin >> arr[i];
    
    long long product = 1;
    for (int i = 0; i < n; i += 2) {
        product *= arr[i];
    }
    cout << product << endl;
    return 0;
}

// Input:  5, {2, 3, 4, 5, 6}
// Output: 48
// Even indices: arr[0]*arr[2]*arr[4] = 2*4*6 = 48
```

---

## Q3. Sum of Odd-position and Even-position Digits

**Problem:** Given a number, find the sum of digits at odd positions and even positions separately (from right, 1-indexed).

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    int oddSum = 0, evenSum = 0, pos = 1;
    while (n > 0) {
        int digit = n % 10;
        if (pos % 2 == 1)
            oddSum += digit;
        else
            evenSum += digit;
        n /= 10;
        pos++;
    }
    cout << "Odd position sum: " << oddSum << endl;
    cout << "Even position sum: " << evenSum << endl;
    return 0;
}

// Input: 123456
// Positions from right: 6(1) 5(2) 4(3) 3(4) 2(5) 1(6)
// Odd positions (1,3,5): 6+4+2 = 12
// Even positions (2,4,6): 5+3+1 = 9
```

---

## Q4. Password Validator

**Problem:** Check if a password is valid based on these rules:
- At least 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one digit
- At least one special character (@, #, $, %)
- No spaces or slashes

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string password;
    cin >> password;
    
    if (password.length() < 8) {
        cout << "Invalid" << endl;
        return 0;
    }
    
    bool upper = false, lower = false, digit = false, special = false;
    for (char c : password) {
        if (c == ' ' || c == '/') {
            cout << "Invalid" << endl;
            return 0;
        }
        if (isupper(c)) upper = true;
        if (islower(c)) lower = true;
        if (isdigit(c)) digit = true;
        if (c == '@' || c == '#' || c == '$' || c == '%') special = true;
    }
    
    if (upper && lower && digit && special)
        cout << "Valid" << endl;
    else
        cout << "Invalid" << endl;
    return 0;
}

// Input: "Acc@1234" → Output: Valid
// Input: "weakpass" → Output: Invalid
```

---

## Q5. Binary String Operations

**Problem:** Given two binary strings of equal length, perform XOR, AND, and OR and print results.

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s1, s2;
    cin >> s1 >> s2;
    
    int n = s1.length();
    string xorR = "", andR = "", orR = "";
    
    for (int i = 0; i < n; i++) {
        int a = s1[i] - '0', b = s2[i] - '0';
        xorR += to_string(a ^ b);
        andR += to_string(a & b);
        orR  += to_string(a | b);
    }
    
    cout << "XOR: " << xorR << endl;
    cout << "AND: " << andR << endl;
    cout << "OR:  " << orR << endl;
    return 0;
}

// Input: "1100" "1010"
// Output: XOR: 0110, AND: 1000, OR: 1110
```

---

## Q6. Check if String is Pangram

**Problem:** A pangram contains every letter of the alphabet at least once. Check if given string is a pangram.

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string str;
    getline(cin, str);
    
    bool letters[26] = {false};
    for (char c : str) {
        if (isalpha(c)) {
            letters[tolower(c) - 'a'] = true;
        }
    }
    
    bool isPangram = true;
    for (int i = 0; i < 26; i++) {
        if (!letters[i]) {
            isPangram = false;
            break;
        }
    }
    
    if (isPangram) cout << "Pangram" << endl;
    else cout << "Not Pangram" << endl;
    return 0;
}

// Input: "The quick brown fox jumps over the lazy dog"
// Output: Pangram
```

---

## Q7. Find Missing Number in Array

**Problem:** Array contains n-1 numbers from 1 to n. Find the missing number.

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[n - 1];
    for (int i = 0; i < n - 1; i++) cin >> arr[i];
    
    int totalSum = n * (n + 1) / 2;
    int arrSum = 0;
    for (int i = 0; i < n - 1; i++) arrSum += arr[i];
    
    cout << "Missing number: " << totalSum - arrSum << endl;
    return 0;
}

// Input: n=6, {1, 2, 4, 5, 6}
// Output: Missing number: 3
// Total sum(1-6) = 21, Array sum = 18, Missing = 3
```

---

## Q8. Sort Array of 0s, 1s, and 2s

**Problem:** Sort an array containing only 0s, 1s, and 2s without using a sorting algorithm (Dutch National Flag).

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[n];
    for (int i = 0; i < n; i++) cin >> arr[i];
    
    int low = 0, mid = 0, high = n - 1;
    while (mid <= high) {
        if (arr[mid] == 0) {
            swap(arr[low], arr[mid]);
            low++; mid++;
        } else if (arr[mid] == 1) {
            mid++;
        } else {
            swap(arr[mid], arr[high]);
            high--;
        }
    }
    
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    return 0;
}

// Input: 8, {0, 1, 2, 0, 1, 2, 0, 1}
// Output: 0 0 0 1 1 1 2 2
```

---

## Q9. Remove Consecutive Duplicate Characters

**Problem:** Remove consecutive duplicate characters from a string.

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string str;
    cin >> str;
    
    string result = "";
    result += str[0];
    for (int i = 1; i < str.length(); i++) {
        if (str[i] != str[i - 1]) {
            result += str[i];
        }
    }
    cout << result << endl;
    return 0;
}

// Input: "aabbccddee" → Output: "abcde"
// Input: "aaabbbccc"  → Output: "abc"
// Input: "abcabc"     → Output: "abcabc" (non-consecutive not removed)
```

---

## Q10. Sum of Prime Numbers in Range

**Problem:** Find the sum of all prime numbers between two given numbers (inclusive).

```cpp
#include <iostream>
using namespace std;

bool isPrime(int n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    for (int i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) return false;
    }
    return true;
}

int main() {
    int a, b;
    cin >> a >> b;
    
    long long sum = 0;
    for (int i = a; i <= b; i++) {
        if (isPrime(i)) sum += i;
    }
    cout << "Sum of primes: " << sum << endl;
    return 0;
}

// Input: 1 10 → Primes: 2,3,5,7 → Output: Sum of primes: 17
// Input: 10 20 → Primes: 11,13,17,19 → Output: Sum of primes: 60
```

---

## Q11. Check if Two Strings are Anagrams

**Problem:** Check if two strings are anagrams (contain same characters in different order).

```cpp
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string s1, s2;
    cin >> s1 >> s2;
    
    if (s1.length() != s2.length()) {
        cout << "Not Anagram" << endl;
        return 0;
    }
    
    // Count frequency
    int freq[26] = {0};
    for (char c : s1) freq[tolower(c) - 'a']++;
    for (char c : s2) freq[tolower(c) - 'a']--;
    
    bool isAnagram = true;
    for (int i = 0; i < 26; i++) {
        if (freq[i] != 0) {
            isAnagram = false;
            break;
        }
    }
    
    if (isAnagram) cout << "Anagram" << endl;
    else cout << "Not Anagram" << endl;
    return 0;
}

// Input: "listen" "silent" → Output: Anagram
// Input: "hello" "world"  → Output: Not Anagram
```

---

## Q12. Matrix Diagonal Sum

**Problem:** Find the sum of primary and secondary diagonals of a square matrix.

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int mat[n][n];
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            cin >> mat[i][j];
    
    int primarySum = 0, secondarySum = 0;
    for (int i = 0; i < n; i++) {
        primarySum += mat[i][i];           // Primary diagonal
        secondarySum += mat[i][n - 1 - i]; // Secondary diagonal
    }
    
    cout << "Primary diagonal sum: " << primarySum << endl;
    cout << "Secondary diagonal sum: " << secondarySum << endl;
    return 0;
}

// Input: 3x3 matrix:
// 1 2 3
// 4 5 6
// 7 8 9
// Output: Primary = 1+5+9=15, Secondary = 3+5+7=15
```

---

## Q13. Count Words in a String

**Problem:** Count the number of words in a given string.

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string str;
    getline(cin, str);
    
    int words = 0;
    bool inWord = false;
    for (char c : str) {
        if (c != ' ' && !inWord) {
            words++;
            inWord = true;
        } else if (c == ' ') {
            inWord = false;
        }
    }
    cout << "Word count: " << words << endl;
    return 0;
}

// Input: "Hello World How Are You"
// Output: Word count: 5
```

---

## Q14. Find Second Largest Without Sorting

**Problem:** Find the second largest element in an array without sorting.

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
    
    if (second == INT_MIN)
        cout << "No second largest" << endl;
    else
        cout << "Second largest: " << second << endl;
    return 0;
}

// Input: 5, {12, 35, 1, 10, 34}
// Output: Second largest: 34
```

---

## Q15. Decimal to Binary Conversion

**Problem:** Convert a decimal number to its binary representation.

```cpp
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    if (n == 0) {
        cout << "0" << endl;
        return 0;
    }
    
    string binary = "";
    int temp = n;
    while (temp > 0) {
        binary += to_string(temp % 2);
        temp /= 2;
    }
    reverse(binary.begin(), binary.end());
    
    cout << n << " in binary: " << binary << endl;
    return 0;
}

// Input: 10 → Output: 10 in binary: 1010
// Input: 25 → Output: 25 in binary: 11001
```

---

## ⏰ Time Management Strategy

| Question | Time | Goal |
|----------|------|------|
| **Q1 (Easiest)** | 15–20 min | Full solution (all test cases) |
| **Q2 (Medium)** | 20 min | Full or partial solution |
| **Q3 (Hardest)** | 15–20 min | At least partial (basic test cases) |

---

> **Remember: Partial marks are awarded! Even passing 1 test case counts. Never leave a question blank!**
