# 📝 Advanced Coding — Previous Year Questions (TCS NQT)

> **Memory-based coding questions from TCS NQT 2022–2025 | With C++ Solutions**
> **Section:** Part B (Advanced) | 2 Problems | 90 Minutes

---

## 📑 Problem Index

1. [Array Problems](#1-array-problems)
2. [String Problems](#2-string-problems)
3. [Number Theory / Math Problems](#3-number-theory--math-problems)
4. [Pattern / Series Problems](#4-pattern--series-problems)
5. [Sorting & Searching](#5-sorting--searching)
6. [Greedy / Logic Problems](#6-greedy--logic-problems)
7. [Recursion / DP Problems](#7-recursion--dp-problems)

---

## 1. Array Problems

### Q1. Move All Zeros to End (Maintaining Order)

**Problem:** Given an array, move all zeros to the end while maintaining the relative order of non-zero elements.

**Input:** n = 6, arr = [0, 1, 0, 3, 12, 0]
**Output:** [1, 3, 12, 0, 0, 0]

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    int pos = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] != 0) {
            arr[pos++] = arr[i];
        }
    }
    while (pos < n) arr[pos++] = 0;

    for (int x : arr) cout << x << " ";
    cout << "\n";
    return 0;
}
// Time: O(n), Space: O(1)
```

---

### Q2. Find Equilibrium Index

**Problem:** Find the index where the sum of elements on the left equals the sum on the right.

**Input:** n = 7, arr = [1, 3, 5, 2, 2, 3, 1]
**Output:** 3 (left sum = 1+3+5 = 9, right sum = 2+3+1 = 6)... Actually sum left of index 3 = 9, right = 6. Let's use: [-7, 1, 5, 2, -4, 3, 0] → index 3.

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    long long totalSum = 0;
    for (int x : arr) totalSum += x;

    long long leftSum = 0;
    for (int i = 0; i < n; i++) {
        long long rightSum = totalSum - leftSum - arr[i];
        if (leftSum == rightSum) {
            cout << i << "\n";
            return 0;
        }
        leftSum += arr[i];
    }
    cout << -1 << "\n";
    return 0;
}
// Time: O(n), Space: O(1)
```

---

### Q3. Maximum Product Subarray

**Problem:** Find the contiguous subarray with the largest product.

**Input:** arr = [2, 3, -2, 4]
**Output:** 6 (subarray [2, 3])

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    long long maxProd = arr[0], minProd = arr[0], result = arr[0];

    for (int i = 1; i < n; i++) {
        if (arr[i] < 0) swap(maxProd, minProd);

        maxProd = max((long long)arr[i], maxProd * arr[i]);
        minProd = min((long long)arr[i], minProd * arr[i]);

        result = max(result, maxProd);
    }
    cout << result << "\n";
    return 0;
}
// Time: O(n), Space: O(1)
```

---

### Q4. Sort Array of 0s, 1s, and 2s (Dutch National Flag)

**Problem:** Sort an array containing only 0s, 1s, and 2s without using a sorting algorithm.

**Input:** arr = [0, 1, 2, 0, 1, 2]
**Output:** [0, 0, 1, 1, 2, 2]

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    int low = 0, mid = 0, high = n - 1;

    while (mid <= high) {
        if (arr[mid] == 0) swap(arr[low++], arr[mid++]);
        else if (arr[mid] == 1) mid++;
        else swap(arr[mid], arr[high--]);
    }

    for (int x : arr) cout << x << " ";
    cout << "\n";
    return 0;
}
// Time: O(n), Space: O(1) — Single pass!
```

---

### Q5. Leaders in an Array

**Problem:** An element is a leader if it is greater than all elements to its right. Find all leaders.

**Input:** arr = [16, 17, 4, 3, 5, 2]
**Output:** 17 5 2

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    vector<int> leaders;
    int maxRight = arr[n - 1];
    leaders.push_back(maxRight);

    for (int i = n - 2; i >= 0; i--) {
        if (arr[i] > maxRight) {
            maxRight = arr[i];
            leaders.push_back(maxRight);
        }
    }

    reverse(leaders.begin(), leaders.end());
    for (int x : leaders) cout << x << " ";
    cout << "\n";
    return 0;
}
// Time: O(n), Space: O(n)
```

---

## 2. String Problems

### Q6. Remove Balanced Parentheses

**Problem:** Remove all balanced/matched parentheses from a string and print the remaining characters.

**Input:** "(a(b)c)d(e"
**Output:** "d(e" (After removing matched pairs)

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    getline(cin, s);
    int n = s.size();
    vector<bool> toRemove(n, false);
    stack<int> st;

    for (int i = 0; i < n; i++) {
        if (s[i] == '(') st.push(i);
        else if (s[i] == ')') {
            if (!st.empty()) {
                toRemove[st.top()] = true;
                toRemove[i] = true;
                st.pop();
            }
        }
    }

    for (int i = 0; i < n; i++) {
        if (!toRemove[i]) cout << s[i];
    }
    cout << "\n";
    return 0;
}
```

---

### Q7. Longest Palindromic Substring

**Problem:** Find the longest palindromic substring in the given string.

**Input:** "babad"
**Output:** "bab" or "aba"

```cpp
#include <bits/stdc++.h>
using namespace std;

string longestPalindrome(string s) {
    int n = s.size();
    if (n < 2) return s;
    int start = 0, maxLen = 1;

    auto expand = [&](int l, int r) {
        while (l >= 0 && r < n && s[l] == s[r]) {
            if (r - l + 1 > maxLen) {
                start = l;
                maxLen = r - l + 1;
            }
            l--; r++;
        }
    };

    for (int i = 0; i < n; i++) {
        expand(i, i);     // Odd length
        expand(i, i + 1); // Even length
    }
    return s.substr(start, maxLen);
}

int main() {
    string s;
    cin >> s;
    cout << longestPalindrome(s) << "\n";
    return 0;
}
// Time: O(n²), Space: O(1)
```

---

### Q8. Count Distinct Substrings

**Problem:** Count the number of distinct substrings of a given string.

**Input:** "abc"
**Output:** 7 (a, b, c, ab, bc, abc, "")... or 6 without empty string.

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    set<string> substrings;

    for (int i = 0; i < s.size(); i++) {
        string temp = "";
        for (int j = i; j < s.size(); j++) {
            temp += s[j];
            substrings.insert(temp);
        }
    }
    cout << substrings.size() << "\n";
    return 0;
}
// Time: O(n² × n) for set insertions. Use Trie for O(n²).
```

---

## 3. Number Theory / Math Problems

### Q9. Prime Numbers in a Range

**Problem:** Print all prime numbers between L and R.

```cpp
#include <bits/stdc++.h>
using namespace std;

bool isPrime(int n) {
    if (n < 2) return false;
    if (n < 4) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    for (int i = 5; i * i <= n; i += 6)
        if (n % i == 0 || n % (i + 2) == 0) return false;
    return true;
}

int main() {
    int L, R;
    cin >> L >> R;
    for (int i = L; i <= R; i++)
        if (isPrime(i)) cout << i << " ";
    cout << "\n";
    return 0;
}
```

---

### Q10. Armstrong Number Check

**Problem:** Check if a number is an Armstrong number (sum of each digit raised to the power of number of digits equals the number itself).

**Input:** 153
**Output:** Yes (1³ + 5³ + 3³ = 153)

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    int original = n;
    int digits = to_string(n).length();
    int sum = 0;

    while (n > 0) {
        int d = n % 10;
        sum += pow(d, digits);
        n /= 10;
    }

    cout << (sum == original ? "Yes" : "No") << "\n";
    return 0;
}
```

---

### Q11. GCD & LCM of Two Numbers

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    long long a, b;
    cin >> a >> b;
    long long g = __gcd(a, b);
    long long l = a / g * b;
    cout << "GCD: " << g << "\nLCM: " << l << "\n";
    return 0;
}
```

---

### Q12. Decimal to Binary Conversion

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    string binary = "";
    if (n == 0) { cout << 0; return 0; }
    while (n > 0) {
        binary = char('0' + n % 2) + binary;
        n /= 2;
    }
    cout << binary << "\n";
    return 0;
}
```

---

### Q13. Toggle Bits After MSB

**Problem:** Convert a number to binary, toggle all bits after the most significant bit.

**Input:** 10 (binary: 1010)
**Output:** 5 (binary: 0101 → after toggle: 1101? or just toggle after MSB: 1101)

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;

    // Find the mask with all bits set up to MSB
    int mask = 1;
    while (mask <= n) mask <<= 1;
    mask -= 1; // All 1s up to MSB

    // XOR with mask toggles all bits
    cout << (n ^ mask) << "\n";
    return 0;
}
// Input: 10 (1010) → mask = 1111 = 15. 10 XOR 15 = 5 (0101)
```

---

## 4. Pattern / Series Problems

### Q14. Fibonacci Series (Nth Term)

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    if (n <= 0) { cout << 0; return 0; }
    if (n == 1) { cout << 1; return 0; }

    long long a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        long long c = a + b;
        a = b;
        b = c;
    }
    cout << b << "\n";
    return 0;
}
```

---

### Q15. Nth Term of Mixed Series

**Problem:** A series alternates between two patterns — prime numbers and powers of 2.
Series: 2, 2, 3, 4, 5, 8, 7, 16, 11, 32, ...
Find the Nth term.

```cpp
#include <bits/stdc++.h>
using namespace std;

bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++)
        if (n % i == 0) return false;
    return true;
}

int main() {
    int n;
    cin >> n;

    if (n % 2 == 1) {
        // Odd positions: primes (1st, 3rd, 5th, ...)
        int count = 0, num = 2;
        int target = (n + 1) / 2;
        while (true) {
            if (isPrime(num)) {
                count++;
                if (count == target) { cout << num << "\n"; return 0; }
            }
            num++;
        }
    } else {
        // Even positions: powers of 2 (2nd, 4th, 6th, ...)
        int pos = n / 2;
        cout << (1 << pos) << "\n"; // 2^pos
    }
    return 0;
}
```

---

### Q16. Star Pattern — Diamond

**Problem:** Print a diamond pattern for n rows.

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;

    // Upper half
    for (int i = 1; i <= n; i++) {
        for (int j = n - i; j > 0; j--) cout << " ";
        for (int j = 1; j <= 2 * i - 1; j++) cout << "*";
        cout << "\n";
    }
    // Lower half
    for (int i = n - 1; i >= 1; i--) {
        for (int j = n - i; j > 0; j--) cout << " ";
        for (int j = 1; j <= 2 * i - 1; j++) cout << "*";
        cout << "\n";
    }
    return 0;
}
```

---

## 5. Sorting & Searching

### Q17. Find Kth Smallest Element

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    sort(arr.begin(), arr.end());
    cout << arr[k - 1] << "\n";
    return 0;
}
// For O(n) average: use nth_element(arr.begin(), arr.begin()+k-1, arr.end());
```

---

### Q18. Count Occurrences in Sorted Array (Binary Search)

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, target;
    cin >> n >> target;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    auto lo = lower_bound(arr.begin(), arr.end(), target);
    auto hi = upper_bound(arr.begin(), arr.end(), target);

    cout << (hi - lo) << "\n";
    return 0;
}
// Time: O(log n)
```

---

## 6. Greedy / Logic Problems

### Q19. Car Rental Cost Calculator (Tiered Pricing)

**Problem:** A car rental charges:
- First 5 hours: ₹100/hr
- Next 5 hours: ₹80/hr  
- Beyond 10 hours: ₹50/hr

Given hours, calculate total cost.

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int hours;
    cin >> hours;
    int cost = 0;

    if (hours <= 5) cost = hours * 100;
    else if (hours <= 10) cost = 500 + (hours - 5) * 80;
    else cost = 500 + 400 + (hours - 10) * 50;

    cout << cost << "\n";
    return 0;
}
```

---

### Q20. Minimum Platforms at Railway Station

**Problem:** Given arrival and departure times of trains, find the minimum number of platforms required.

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> arr(n), dep(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    for (int i = 0; i < n; i++) cin >> dep[i];

    sort(arr.begin(), arr.end());
    sort(dep.begin(), dep.end());

    int platforms = 0, maxPlatforms = 0;
    int i = 0, j = 0;

    while (i < n && j < n) {
        if (arr[i] <= dep[j]) {
            platforms++;
            maxPlatforms = max(maxPlatforms, platforms);
            i++;
        } else {
            platforms--;
            j++;
        }
    }
    cout << maxPlatforms << "\n";
    return 0;
}
// Time: O(n log n)
```

---

## 7. Recursion / DP Problems

### Q21. Climbing Stairs (Fibonacci DP)

**Problem:** You can climb 1 or 2 steps. How many distinct ways to reach the nth step?

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    if (n <= 2) { cout << n; return 0; }

    long long a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        long long c = a + b;
        a = b;
        b = c;
    }
    cout << b << "\n";
    return 0;
}
// Time: O(n), Space: O(1)
```

---

### Q22. Coin Change — Minimum Coins

**Problem:** Given coins of denominations and a target amount, find minimum coins needed.

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, amount;
    cin >> n;
    vector<int> coins(n);
    for (int i = 0; i < n; i++) cin >> coins[i];
    cin >> amount;

    vector<int> dp(amount + 1, INT_MAX);
    dp[0] = 0;

    for (int i = 1; i <= amount; i++) {
        for (int c : coins) {
            if (c <= i && dp[i - c] != INT_MAX) {
                dp[i] = min(dp[i], dp[i - c] + 1);
            }
        }
    }

    cout << (dp[amount] == INT_MAX ? -1 : dp[amount]) << "\n";
    return 0;
}
// Time: O(amount × n), Space: O(amount)
```

---

### Q23. Longest Common Subsequence (LCS)

**Problem:** Find the length of the longest common subsequence of two strings.

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    string s1, s2;
    cin >> s1 >> s2;
    int m = s1.size(), n = s2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i - 1] == s2[j - 1])
                dp[i][j] = dp[i - 1][j - 1] + 1;
            else
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    cout << dp[m][n] << "\n";
    return 0;
}
// Time: O(m×n), Space: O(m×n)
```

---

## 🎯 Quick Revision — TCS Coding Must-Knows

| Problem Type | Key Algorithm | Time Complexity |
|-------------|--------------|-----------------|
| Max Subarray Sum | Kadane's | O(n) |
| Two Sum | HashMap | O(n) |
| Sort 0s,1s,2s | Dutch National Flag | O(n) |
| Missing Number | XOR / Sum formula | O(n) |
| Palindrome Check | Two pointers | O(n) |
| Binary Search | Iterative BS | O(log n) |
| GCD | Euclidean / __gcd | O(log(min)) |
| Fibonacci | Iterative DP | O(n) |
| Coin Change | Bottom-up DP | O(amount × n) |
| LCS | 2D DP | O(m×n) |

### ⚠️ Common Mistakes to Avoid
1. **Integer overflow** — Use `long long` for large calculations
2. **Missing edge cases** — Empty arrays, single element, all same elements
3. **Wrong I/O format** — Use `\n` not `endl`; read input correctly
4. **Not using Fast I/O** — Always add `ios_base::sync_with_stdio(false); cin.tie(NULL);`
5. **Off-by-one errors** — Be careful with 0-indexed vs 1-indexed

---

> 💡 **Tip:** In TCS NQT, focus on getting partial test cases right. Even if you can't solve optimally, a brute-force solution that passes basic test cases gets partial marks. Always handle edge cases (n=0, n=1) first!
