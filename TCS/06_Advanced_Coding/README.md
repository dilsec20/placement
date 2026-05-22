# 💻 Advanced Coding — TCS NQT 2026 (C++ Edition)

> **Section:** Part B (Advanced) | **Questions:** 2 Coding Problems | **Time:** 90 minutes | **Difficulty:** High

---

## 📑 Table of Contents

1. [Coding Section Overview](#1-coding-section-overview)
2. [C++ Essentials & Templates](#2-c-essentials--templates)
3. [Arrays & Strings](#3-arrays--strings)
4. [Sorting & Searching](#4-sorting--searching)
5. [Mathematics & Number Theory](#5-mathematics--number-theory)
6. [Recursion & Backtracking](#6-recursion--backtracking)
7. [Dynamic Programming (Basic)](#7-dynamic-programming-basic)
8. [Greedy Algorithms](#8-greedy-algorithms)
9. [Hashing & Maps](#9-hashing--maps)
10. [Linked Lists](#10-linked-lists)
11. [Stacks & Queues](#11-stacks--queues)
12. [Trees (Basics)](#12-trees-basics)
13. [Graphs (Basics)](#13-graphs-basics)
14. [Bit Manipulation](#14-bit-manipulation)
15. [Pattern-Based Problems](#15-pattern-based-problems)
16. [TCS NQT Coding Patterns & PYQs](#16-tcs-nqt-coding-patterns--pyqs)
17. [Tips & Tricks for Coding Round](#17-tips--tricks-for-coding-round)

---

## 1. Coding Section Overview

### What to Expect

| Detail | Information |
|--------|-------------|
| Number of Questions | 2 |
| Time Allotted | 90 minutes |
| Languages Allowed | C, C++, Java, Python, Perl |
| Difficulty | 1 Medium + 1 Hard (usually) |
| Evaluation | Based on test cases passed |
| Partial Marking | Yes — partial marks for partial test cases |

### Why C++?

```
✅ Fastest execution — passes strict time limits easily
✅ Rich STL (Standard Template Library) — built-in data structures
✅ Widely used in competitive programming
✅ Most online resources/solutions are in C++
✅ Excellent for TCS NQT where performance matters
```

### Input/Output — Fast I/O (ALWAYS USE THIS!)

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    // ⚡ FAST I/O — add this in EVERY program
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;                          // Read single integer

    int a, b;
    cin >> a >> b;                     // Read two integers

    vector<int> arr(n);
    for (int i = 0; i < n; i++)
        cin >> arr[i];                 // Read array

    string s;
    cin >> s;                          // Read string (no spaces)
    // getline(cin, s);                // Read string with spaces

    cout << result << "\n";            // Output (use "\n" not endl)
    return 0;
}
```

> ⚠️ **IMPORTANT:** Always use `"\n"` instead of `endl`. `endl` flushes the buffer and is significantly slower!

---

## 2. C++ Essentials & Templates

### STL Cheat Sheet — Know These Cold!

```cpp
// ============ VECTORS ============
vector<int> v;                    // Empty vector
vector<int> v(n);                 // Vector of size n (default 0)
vector<int> v(n, val);            // Vector of size n filled with val
v.push_back(x);                  // Add element at end — O(1)
v.pop_back();                    // Remove last element — O(1)
v.size();                        // Number of elements
v.empty();                       // Check if empty
v.front(); v.back();             // First/Last element
v.begin(); v.end();              // Iterators
v.clear();                       // Remove all elements
sort(v.begin(), v.end());        // Sort ascending
sort(v.begin(), v.end(), greater<int>()); // Sort descending
reverse(v.begin(), v.end());     // Reverse
*max_element(v.begin(), v.end()); // Maximum element
*min_element(v.begin(), v.end()); // Minimum element
accumulate(v.begin(), v.end(), 0); // Sum (include <numeric>)

// ============ STRINGS ============
string s = "hello";
s.length(); s.size();            // Length
s.substr(pos, len);              // Substring
s.find("ll");                    // Find position (string::npos if not found)
s += " world";                   // Concatenate
reverse(s.begin(), s.end());     // Reverse string
sort(s.begin(), s.end());        // Sort characters
s[i] - 'a';                     // Position of lowercase letter (0-25)
s[i] - '0';                     // Char to digit
to_string(123);                  // int → string
stoi("123");                     // string → int
stoll("123456789");              // string → long long

// ============ PAIRS ============
pair<int, int> p = {1, 2};
p.first; p.second;               // Access elements
vector<pair<int,int>> vp;
vp.push_back({a, b});

// ============ MAPS ============
map<string, int> mp;             // Ordered map (Red-Black Tree)
unordered_map<string, int> ump;  // Hash map — O(1) average
mp["key"] = value;               // Insert/Update
mp.count("key");                 // Check if key exists (0 or 1)
mp.erase("key");                 // Delete
for (auto& [key, val] : mp)     // Iterate (C++17)
    cout << key << " " << val;

// ============ SETS ============
set<int> s;                      // Ordered set (unique, sorted)
unordered_set<int> us;           // Hash set — O(1) average
s.insert(x);                    // Insert
s.erase(x);                     // Remove
s.count(x);                     // Check if exists
s.find(x) != s.end();           // Check if exists (alternative)

// ============ STACK & QUEUE ============
stack<int> st;
st.push(x); st.pop(); st.top(); st.empty(); st.size();

queue<int> q;
q.push(x); q.pop(); q.front(); q.back(); q.empty();

priority_queue<int> pq;                      // Max-heap
priority_queue<int, vector<int>, greater<int>> minpq; // Min-heap
pq.push(x); pq.pop(); pq.top();

// ============ USEFUL FUNCTIONS ============
min(a, b); max(a, b);
swap(a, b);
abs(x);                          // Absolute value
__gcd(a, b);                     // GCD (built-in)
__builtin_popcount(n);           // Count set bits
__builtin_clz(n);                // Count leading zeros
pow(base, exp);                  // Power (returns double)
sqrt(n);                         // Square root (returns double)
ceil(x); floor(x);              // Ceiling/Floor
```

### Time Complexity Guide

| Notation | Name | Example | n=10⁶ OK? |
|----------|------|---------|-----------|
| O(1) | Constant | Array access | ✅ |
| O(log n) | Logarithmic | Binary search | ✅ |
| O(n) | Linear | Single loop | ✅ |
| O(n log n) | Log-linear | sort() | ✅ |
| O(n²) | Quadratic | Nested loops | ❌ (10¹² ops) |
| O(n³) | Cubic | 3 nested loops | ❌ |
| O(2ⁿ) | Exponential | Subsets | ❌ |

```
Rule of thumb: ~10⁸ operations per second in C++
  n ≤ 10: O(n!) OK
  n ≤ 20: O(2ⁿ) OK
  n ≤ 500: O(n³) OK
  n ≤ 5000: O(n²) OK
  n ≤ 10⁶: O(n log n) OK
  n ≤ 10⁸: O(n) OK
  n ≤ 10¹⁸: O(log n) or O(1) needed
```

### Master Template for TCS NQT

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
typedef vector<int> vi;
typedef vector<ll> vll;
typedef pair<int,int> pii;

#define pb push_back
#define all(v) v.begin(), v.end()
#define F first
#define S second

void solve() {
    int n;
    cin >> n;

    vi arr(n);
    for (int i = 0; i < n; i++)
        cin >> arr[i];

    // Your logic here

    cout << /* result */ "\n";
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int t = 1;
    // cin >> t;  // Uncomment if multiple test cases
    while (t--) solve();

    return 0;
}
```

---

## 3. Arrays & Strings

### Array Problems — Must Practice

#### 3.1 Find Second Largest Element

```cpp
#include <bits/stdc++.h>
using namespace std;

int secondLargest(vector<int>& arr) {
    int first = INT_MIN, second = INT_MIN;
    for (int num : arr) {
        if (num > first) {
            second = first;
            first = num;
        } else if (num > second && num != first) {
            second = num;
        }
    }
    return (second == INT_MIN) ? -1 : second;
}

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    cout << secondLargest(arr) << "\n";
    return 0;
}

// Input:  6 → 12 35 1 10 34 1
// Output: 34
```

#### 3.2 Rotate Array by K Positions

```cpp
#include <bits/stdc++.h>
using namespace std;

// Method 1: Using reverse (In-place, O(n) time, O(1) space)
void rotateRight(vector<int>& arr, int k) {
    int n = arr.size();
    k = k % n;
    reverse(arr.begin(), arr.end());
    reverse(arr.begin(), arr.begin() + k);
    reverse(arr.begin() + k, arr.end());
}

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    rotateRight(arr, k);

    for (int x : arr) cout << x << " ";
    cout << "\n";
    return 0;
}

// Input:  5 2 → 1 2 3 4 5
// Output: 4 5 1 2 3
```

#### 3.3 Find Missing Number (1 to N)

```cpp
#include <bits/stdc++.h>
using namespace std;

int missingNumber(vector<int>& arr, int n) {
    long long expected = (long long)n * (n + 1) / 2;
    long long actual = 0;
    for (int x : arr) actual += x;
    return (int)(expected - actual);
}

// Alternative: XOR method (no overflow)
int missingNumberXOR(vector<int>& arr, int n) {
    int xorAll = 0, xorArr = 0;
    for (int i = 1; i <= n; i++) xorAll ^= i;
    for (int x : arr) xorArr ^= x;
    return xorAll ^ xorArr;
}

int main() {
    int n;
    cin >> n;
    vector<int> arr(n - 1);
    for (int i = 0; i < n - 1; i++) cin >> arr[i];
    cout << missingNumber(arr, n) << "\n";
    return 0;
}

// Input:  6 → 1 2 4 5 6
// Output: 3
```

#### 3.4 Two Sum Problem

```cpp
#include <bits/stdc++.h>
using namespace std;

pair<int,int> twoSum(vector<int>& arr, int target) {
    unordered_map<int,int> seen;
    for (int i = 0; i < arr.size(); i++) {
        int complement = target - arr[i];
        if (seen.count(complement))
            return {seen[complement], i};
        seen[arr[i]] = i;
    }
    return {-1, -1};
}

int main() {
    int n, target;
    cin >> n >> target;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    auto [a, b] = twoSum(arr, target);
    cout << a << " " << b << "\n";
    return 0;
}

// Input:  4 9 → 2 7 11 15
// Output: 0 1
```

#### 3.5 Maximum Subarray Sum (Kadane's Algorithm) ⭐

```cpp
#include <bits/stdc++.h>
using namespace std;

long long kadane(vector<int>& arr) {
    long long maxSum = arr[0], currSum = arr[0];
    for (int i = 1; i < arr.size(); i++) {
        currSum = max((long long)arr[i], currSum + arr[i]);
        maxSum = max(maxSum, currSum);
    }
    return maxSum;
}

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    cout << kadane(arr) << "\n";
    return 0;
}

// Input:  9 → -2 1 -3 4 -1 2 1 -5 4
// Output: 6 (subarray [4, -1, 2, 1])
```

#### 3.6 Find Duplicates in Array

```cpp
#include <bits/stdc++.h>
using namespace std;

vector<int> findDuplicates(vector<int>& arr) {
    unordered_map<int,int> freq;
    vector<int> result;
    for (int x : arr) freq[x]++;
    for (auto& [val, cnt] : freq) {
        if (cnt > 1) result.push_back(val);
    }
    sort(result.begin(), result.end());
    return result;
}

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    vector<int> dups = findDuplicates(arr);
    for (int x : dups) cout << x << " ";
    cout << "\n";
    return 0;
}
```

#### 3.7 Merge Two Sorted Arrays

```cpp
#include <bits/stdc++.h>
using namespace std;

vector<int> mergeSorted(vector<int>& a, vector<int>& b) {
    vector<int> result;
    int i = 0, j = 0;
    while (i < a.size() && j < b.size()) {
        if (a[i] <= b[j]) result.push_back(a[i++]);
        else result.push_back(b[j++]);
    }
    while (i < a.size()) result.push_back(a[i++]);
    while (j < b.size()) result.push_back(b[j++]);
    return result;
}

int main() {
    int m, n;
    cin >> m >> n;
    vector<int> a(m), b(n);
    for (int i = 0; i < m; i++) cin >> a[i];
    for (int i = 0; i < n; i++) cin >> b[i];

    vector<int> merged = mergeSorted(a, b);
    for (int x : merged) cout << x << " ";
    cout << "\n";
    return 0;
}
```

### String Problems — Must Practice

#### 3.8 Check Palindrome

```cpp
#include <bits/stdc++.h>
using namespace std;

bool isPalindrome(string s) {
    int left = 0, right = s.size() - 1;
    while (left < right) {
        if (s[left] != s[right]) return false;
        left++;
        right--;
    }
    return true;
}

// One-liner using STL:
// bool isPalin(string s) { string t = s; reverse(t.begin(), t.end()); return s == t; }

int main() {
    string s;
    cin >> s;
    cout << (isPalindrome(s) ? "YES" : "NO") << "\n";
    return 0;
}
```

#### 3.9 Count Vowels and Consonants

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    getline(cin, s);

    int vowels = 0, consonants = 0;
    string v = "aeiouAEIOU";

    for (char c : s) {
        if (isalpha(c)) {
            if (v.find(c) != string::npos) vowels++;
            else consonants++;
        }
    }
    cout << "Vowels: " << vowels << "\nConsonants: " << consonants << "\n";
    return 0;
}
```

#### 3.10 Reverse Words in a String

```cpp
#include <bits/stdc++.h>
using namespace std;

string reverseWords(string s) {
    // Method: Use stringstream to split, then reverse
    vector<string> words;
    stringstream ss(s);
    string word;
    while (ss >> word) words.push_back(word);

    reverse(words.begin(), words.end());

    string result;
    for (int i = 0; i < words.size(); i++) {
        if (i > 0) result += " ";
        result += words[i];
    }
    return result;
}

int main() {
    string s;
    getline(cin, s);
    cout << reverseWords(s) << "\n";
    return 0;
}

// Input:  "Hello World"
// Output: "World Hello"
```

#### 3.11 Check Anagram

```cpp
#include <bits/stdc++.h>
using namespace std;

bool isAnagram(string s1, string s2) {
    if (s1.size() != s2.size()) return false;
    sort(s1.begin(), s1.end());
    sort(s2.begin(), s2.end());
    return s1 == s2;
}

// Efficient O(n) using frequency array:
bool isAnagramFreq(string s1, string s2) {
    if (s1.size() != s2.size()) return false;
    int freq[26] = {0};
    for (char c : s1) freq[c - 'a']++;
    for (char c : s2) freq[c - 'a']--;
    for (int i = 0; i < 26; i++)
        if (freq[i] != 0) return false;
    return true;
}

int main() {
    string s1, s2;
    cin >> s1 >> s2;
    cout << (isAnagram(s1, s2) ? "YES" : "NO") << "\n";
    return 0;
}

// "listen" and "silent" → YES
```

#### 3.12 Remove Duplicates from String

```cpp
#include <bits/stdc++.h>
using namespace std;

string removeDuplicates(string s) {
    string result;
    unordered_set<char> seen;
    for (char c : s) {
        if (seen.find(c) == seen.end()) {
            seen.insert(c);
            result += c;
        }
    }
    return result;
}

int main() {
    string s;
    cin >> s;
    cout << removeDuplicates(s) << "\n";
    return 0;
}

// Input:  "programming"
// Output: "progamin"
```

---

## 4. Sorting & Searching

### Sorting Algorithms

#### 4.1 Bubble Sort — O(n²)
```cpp
void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;  // Optimization: already sorted
    }
}
```

#### 4.2 Selection Sort — O(n²)
```cpp
void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++)
            if (arr[j] < arr[minIdx]) minIdx = j;
        swap(arr[i], arr[minIdx]);
    }
}
```

#### 4.3 Insertion Sort — O(n²)
```cpp
void insertionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}
```

#### 4.4 Merge Sort — O(n log n) ⭐
```cpp
void merge(vector<int>& arr, int left, int mid, int right) {
    vector<int> temp;
    int i = left, j = mid + 1;

    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) temp.push_back(arr[i++]);
        else temp.push_back(arr[j++]);
    }
    while (i <= mid) temp.push_back(arr[i++]);
    while (j <= right) temp.push_back(arr[j++]);

    for (int k = left; k <= right; k++)
        arr[k] = temp[k - left];
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left >= right) return;
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}

// Usage: mergeSort(arr, 0, arr.size() - 1);
```

#### 4.5 Quick Sort — O(n log n) average ⭐
```cpp
int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

// Usage: quickSort(arr, 0, arr.size() - 1);
```

#### 4.6 Using STL sort() — Preferred in TCS NQT!
```cpp
vector<int> arr = {5, 2, 8, 1, 9};

sort(arr.begin(), arr.end());                     // Ascending
sort(arr.begin(), arr.end(), greater<int>());      // Descending

// Custom sort: sort by absolute value
sort(arr.begin(), arr.end(), [](int a, int b) {
    return abs(a) < abs(b);
});

// Sort pairs by second element
vector<pair<int,int>> vp = {{1,3}, {2,1}, {3,2}};
sort(vp.begin(), vp.end(), [](auto& a, auto& b) {
    return a.second < b.second;
});
```

### Searching Algorithms

#### 4.7 Binary Search — O(log n) ⭐⭐⭐
```cpp
#include <bits/stdc++.h>
using namespace std;

int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;  // Avoids overflow!
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;  // Not found
}

// Using STL:
// binary_search(arr.begin(), arr.end(), target);  // Returns bool
// lower_bound(arr.begin(), arr.end(), target);     // Iterator to first >= target
// upper_bound(arr.begin(), arr.end(), target);     // Iterator to first > target

int main() {
    vector<int> arr = {1, 3, 5, 7, 9, 11, 13};
    cout << binarySearch(arr, 7) << "\n";  // Output: 3
    return 0;
}
```

#### 4.8 Find First/Last Occurrence
```cpp
int firstOccurrence(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1, result = -1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            result = mid;
            right = mid - 1;  // Keep looking left
        } else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return result;
}

int lastOccurrence(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1, result = -1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            result = mid;
            left = mid + 1;  // Keep looking right
        } else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return result;
}
```

### Sorting Comparison Table

| Algorithm | Best | Average | Worst | Space | Stable? |
|-----------|------|---------|-------|-------|---------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | ✅ |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | ❌ |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | ✅ |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | ✅ |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | ❌ |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | ❌ |
| STL sort() | O(n log n) | O(n log n) | O(n log n) | O(log n) | ❌ |
| STL stable_sort() | O(n log n) | O(n log n) | O(n log²n) | O(n) | ✅ |

---

## 5. Mathematics & Number Theory

### 5.1 GCD & LCM
```cpp
#include <bits/stdc++.h>
using namespace std;

// GCD using Euclidean Algorithm
int gcd(int a, int b) {
    while (b) {
        a %= b;
        swap(a, b);
    }
    return a;
}

// LCM
long long lcm(int a, int b) {
    return (long long)a / gcd(a, b) * b;  // Divide first to avoid overflow
}

// Built-in: __gcd(a, b) works in most compilers
// C++17: std::gcd(a, b) and std::lcm(a, b) in <numeric>

int main() {
    cout << __gcd(12, 18) << "\n";  // 6
    cout << lcm(12, 18) << "\n";    // 36
    return 0;
}
```

### 5.2 Check Prime
```cpp
bool isPrime(int n) {
    if (n < 2) return false;
    if (n < 4) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    for (int i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) return false;
    }
    return true;
}
```

### 5.3 Sieve of Eratosthenes (All Primes up to N) ⭐
```cpp
vector<int> sieve(int n) {
    vector<bool> is_prime(n + 1, true);
    is_prime[0] = is_prime[1] = false;

    for (int i = 2; i * i <= n; i++) {
        if (is_prime[i]) {
            for (int j = i * i; j <= n; j += i)
                is_prime[j] = false;
        }
    }

    vector<int> primes;
    for (int i = 2; i <= n; i++)
        if (is_prime[i]) primes.push_back(i);
    return primes;
}

// sieve(50) → {2,3,5,7,11,13,17,19,23,29,31,37,41,43,47}
```

### 5.4 Prime Factorization
```cpp
vector<int> primeFactors(int n) {
    vector<int> factors;
    for (int d = 2; d * d <= n; d++) {
        while (n % d == 0) {
            factors.push_back(d);
            n /= d;
        }
    }
    if (n > 1) factors.push_back(n);
    return factors;
}

// primeFactors(360) → {2,2,2,3,3,5}
```

### 5.5 Modular Exponentiation (Fast Power) ⭐⭐
```cpp
long long powerMod(long long base, long long exp, long long mod) {
    long long result = 1;
    base %= mod;
    while (exp > 0) {
        if (exp & 1)  // If exp is odd
            result = (result * base) % mod;
        exp >>= 1;    // exp /= 2
        base = (base * base) % mod;
    }
    return result;
}

// Example: powerMod(2, 100, 1e9+7)
```

### 5.6 Fibonacci Number
```cpp
// O(n) iterative
long long fibonacci(int n) {
    if (n <= 1) return n;
    long long a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        long long c = a + b;
        a = b;
        b = c;
    }
    return b;
}

// First 10: 0 1 1 2 3 5 8 13 21 34
```

### 5.7 nCr (Binomial Coefficient)
```cpp
// Simple O(r) method
long long nCr(int n, int r) {
    if (r > n - r) r = n - r;  // Optimization
    long long result = 1;
    for (int i = 0; i < r; i++) {
        result *= (n - i);
        result /= (i + 1);
    }
    return result;
}

// nCr with modular inverse for large values
const int MOD = 1e9 + 7;
long long nCrMod(int n, int r) {
    if (r > n) return 0;
    long long num = 1, den = 1;
    for (int i = 0; i < r; i++) {
        num = (num * ((n - i) % MOD)) % MOD;
        den = (den * ((i + 1) % MOD)) % MOD;
    }
    return (num * powerMod(den, MOD - 2, MOD)) % MOD;
}
```

### 5.8 Count Divisors
```cpp
int countDivisors(int n) {
    int count = 0;
    for (int i = 1; i * i <= n; i++) {
        if (n % i == 0) {
            count++;
            if (i != n / i) count++;
        }
    }
    return count;
}
```

---

## 6. Recursion & Backtracking

### 6.1 Tower of Hanoi
```cpp
void towerOfHanoi(int n, char src, char dest, char aux) {
    if (n == 1) {
        cout << "Move disk 1 from " << src << " to " << dest << "\n";
        return;
    }
    towerOfHanoi(n - 1, src, aux, dest);
    cout << "Move disk " << n << " from " << src << " to " << dest << "\n";
    towerOfHanoi(n - 1, aux, dest, src);
}

// towerOfHanoi(3, 'A', 'C', 'B');
// Total moves = 2^n - 1
```

### 6.2 Generate All Subsets (Power Set)
```cpp
void subsets(vector<int>& arr, int idx, vector<int>& current, vector<vector<int>>& result) {
    result.push_back(current);
    for (int i = idx; i < arr.size(); i++) {
        current.push_back(arr[i]);
        subsets(arr, i + 1, current, result);
        current.pop_back();  // Backtrack
    }
}

// Alternative: Bitmask method
void subsetsIterative(vector<int>& arr) {
    int n = arr.size();
    for (int mask = 0; mask < (1 << n); mask++) {
        cout << "{ ";
        for (int i = 0; i < n; i++)
            if (mask & (1 << i)) cout << arr[i] << " ";
        cout << "}\n";
    }
}
```

### 6.3 Generate All Permutations
```cpp
void permutations(vector<int>& arr, int start, vector<vector<int>>& result) {
    if (start == arr.size()) {
        result.push_back(arr);
        return;
    }
    for (int i = start; i < arr.size(); i++) {
        swap(arr[start], arr[i]);
        permutations(arr, start + 1, result);
        swap(arr[start], arr[i]);  // Backtrack
    }
}

// STL Alternative:
// sort(arr.begin(), arr.end());
// do {
//     // process current permutation
// } while (next_permutation(arr.begin(), arr.end()));
```

### 6.4 N-Queens Problem
```cpp
bool isSafe(vector<int>& board, int row, int col) {
    for (int i = 0; i < row; i++) {
        if (board[i] == col || abs(board[i] - col) == abs(i - row))
            return false;
    }
    return true;
}

int nQueens(vector<int>& board, int row, int n) {
    if (row == n) return 1;
    int count = 0;
    for (int col = 0; col < n; col++) {
        if (isSafe(board, row, col)) {
            board[row] = col;
            count += nQueens(board, row + 1, n);
            board[row] = -1;
        }
    }
    return count;
}

// vector<int> board(8, -1);
// cout << nQueens(board, 0, 8);  // 92 solutions
```

---

## 7. Dynamic Programming (Basic)

### Key Concept
```
DP = Recursion + Memoization (or Bottom-Up Tabulation)

Steps to solve DP:
1. Define dp[i]: What does it represent?
2. Transition: dp[i] = f(dp[j]) for some j < i
3. Base case: dp[0] = ? dp[1] = ?
4. Answer: dp[n] or max(dp[...])
```

### 7.1 Fibonacci (DP)
```cpp
// Bottom-Up (Tabulation) — O(n) time, O(n) space
int fibTab(int n) {
    if (n <= 1) return n;
    vector<int> dp(n + 1);
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i <= n; i++)
        dp[i] = dp[i - 1] + dp[i - 2];
    return dp[n];
}

// Space-Optimized — O(n) time, O(1) space
int fibOpt(int n) {
    if (n <= 1) return n;
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        int c = a + b;
        a = b;
        b = c;
    }
    return b;
}
```

### 7.2 Climbing Stairs
```cpp
// How many ways to climb n stairs (1 or 2 steps at a time)?
int climbStairs(int n) {
    if (n <= 2) return n;
    vector<int> dp(n + 1);
    dp[1] = 1; dp[2] = 2;
    for (int i = 3; i <= n; i++)
        dp[i] = dp[i - 1] + dp[i - 2];
    return dp[n];
}

// climbStairs(5) → 8
```

### 7.3 0/1 Knapsack ⭐
```cpp
int knapsack(vector<int>& wt, vector<int>& val, int W) {
    int n = wt.size();
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));

    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            dp[i][w] = dp[i - 1][w];  // Don't take item i
            if (wt[i - 1] <= w)
                dp[i][w] = max(dp[i][w], dp[i - 1][w - wt[i - 1]] + val[i - 1]);
        }
    }
    return dp[n][W];
}

// weights = {2,3,4,5}, values = {3,4,5,6}, capacity = 8 → Output: 10
```

### 7.4 Longest Common Subsequence (LCS) ⭐
```cpp
int lcs(string& s1, string& s2) {
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
    return dp[m][n];
}

// lcs("ABCBDAB", "BDCAB") → 4 ("BCAB")
```

### 7.5 Coin Change — Minimum Coins
```cpp
int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, INT_MAX);
    dp[0] = 0;

    for (int coin : coins) {
        for (int i = coin; i <= amount; i++) {
            if (dp[i - coin] != INT_MAX)
                dp[i] = min(dp[i], dp[i - coin] + 1);
        }
    }
    return dp[amount] == INT_MAX ? -1 : dp[amount];
}

// coins = {1,5,10,25}, amount = 36 → 3 (25+10+1)
```

### 7.6 Longest Increasing Subsequence (LIS)
```cpp
// O(n²) approach
int lisN2(vector<int>& arr) {
    int n = arr.size();
    vector<int> dp(n, 1);
    for (int i = 1; i < n; i++)
        for (int j = 0; j < i; j++)
            if (arr[j] < arr[i])
                dp[i] = max(dp[i], dp[j] + 1);
    return *max_element(dp.begin(), dp.end());
}

// O(n log n) approach using binary search
int lisNLogN(vector<int>& arr) {
    vector<int> tails;
    for (int x : arr) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    return tails.size();
}

// {10,22,9,33,21,50,41,60,80} → 6
```

---

## 8. Greedy Algorithms

### 8.1 Activity Selection
```cpp
int activitySelection(vector<int>& start, vector<int>& end) {
    int n = start.size();
    vector<pair<int,int>> activities(n);
    for (int i = 0; i < n; i++)
        activities[i] = {end[i], start[i]};

    sort(activities.begin(), activities.end());  // Sort by end time

    int count = 1, lastEnd = activities[0].first;
    for (int i = 1; i < n; i++) {
        if (activities[i].second >= lastEnd) {
            count++;
            lastEnd = activities[i].first;
        }
    }
    return count;
}
```

### 8.2 Fractional Knapsack
```cpp
double fractionalKnapsack(vector<int>& wt, vector<int>& val, int W) {
    int n = wt.size();
    vector<pair<double,int>> ratio(n);
    for (int i = 0; i < n; i++)
        ratio[i] = {(double)val[i] / wt[i], i};

    sort(ratio.rbegin(), ratio.rend());  // Sort by value/weight descending

    double totalValue = 0;
    for (auto& [r, idx] : ratio) {
        if (W >= wt[idx]) {
            totalValue += val[idx];
            W -= wt[idx];
        } else {
            totalValue += r * W;
            break;
        }
    }
    return totalValue;
}
```

---

## 9. Hashing & Maps

### 9.1 Frequency Counter
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    unordered_map<int, int> freq;
    for (int x : arr) freq[x]++;

    for (auto& [val, cnt] : freq)
        cout << val << " → " << cnt << "\n";
    return 0;
}
```

### 9.2 First Non-Repeating Character
```cpp
char firstNonRepeating(string s) {
    int freq[256] = {0};
    for (char c : s) freq[(int)c]++;
    for (char c : s)
        if (freq[(int)c] == 1) return c;
    return '\0';
}

// firstNonRepeating("aabcbd") → 'c'
```

### 9.3 Group Anagrams
```cpp
vector<vector<string>> groupAnagrams(vector<string>& words) {
    unordered_map<string, vector<string>> groups;
    for (string& word : words) {
        string key = word;
        sort(key.begin(), key.end());
        groups[key].push_back(word);
    }

    vector<vector<string>> result;
    for (auto& [key, group] : groups)
        result.push_back(group);
    return result;
}
```

### 9.4 Subarray with Given Sum (Prefix Sum + Hash)
```cpp
pair<int,int> subarraySum(vector<int>& arr, int target) {
    unordered_map<long long, int> seen;
    seen[0] = -1;
    long long prefix = 0;

    for (int i = 0; i < arr.size(); i++) {
        prefix += arr[i];
        if (seen.count(prefix - target))
            return {seen[prefix - target] + 1, i};
        seen[prefix] = i;
    }
    return {-1, -1};
}

// {1,4,20,3,10,5}, target=33 → (2, 4)
```

---

## 10. Linked Lists

### 10.1 Implementation
```cpp
struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class LinkedList {
public:
    Node* head = nullptr;

    void append(int val) {
        Node* newNode = new Node(val);
        if (!head) { head = newNode; return; }
        Node* curr = head;
        while (curr->next) curr = curr->next;
        curr->next = newNode;
    }

    void printList() {
        Node* curr = head;
        while (curr) {
            cout << curr->data << " -> ";
            curr = curr->next;
        }
        cout << "NULL\n";
    }

    void reverse() {
        Node* prev = nullptr;
        Node* curr = head;
        while (curr) {
            Node* next = curr->next;
            curr->next = prev;
            prev = curr;
            curr = next;
        }
        head = prev;
    }

    int findMiddle() {
        Node* slow = head;
        Node* fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        return slow->data;
    }

    bool hasCycle() {
        Node* slow = head;
        Node* fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) return true;
        }
        return false;
    }
};
```

---

## 11. Stacks & Queues

### 11.1 Balanced Parentheses ⭐ (Very Common in TCS)
```cpp
#include <bits/stdc++.h>
using namespace std;

bool isBalanced(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') {
            st.push(c);
        } else {
            if (st.empty()) return false;
            char top = st.top();
            if ((c == ')' && top != '(') ||
                (c == '}' && top != '{') ||
                (c == ']' && top != '['))
                return false;
            st.pop();
        }
    }
    return st.empty();
}

int main() {
    string s;
    cin >> s;
    cout << (isBalanced(s) ? "YES" : "NO") << "\n";
    return 0;
}

// "{[()]}" → YES
// "{[(])}" → NO
```

### 11.2 Next Greater Element
```cpp
vector<int> nextGreater(vector<int>& arr) {
    int n = arr.size();
    vector<int> result(n, -1);
    stack<int> st;  // Stack of indices

    for (int i = n - 1; i >= 0; i--) {
        while (!st.empty() && st.top() <= arr[i])
            st.pop();
        if (!st.empty())
            result[i] = st.top();
        st.push(arr[i]);
    }
    return result;
}

// {4, 5, 2, 25} → {5, 25, 25, -1}
```

### 11.3 Evaluate Postfix Expression
```cpp
int evaluatePostfix(string expr) {
    stack<int> st;
    for (char c : expr) {
        if (isdigit(c)) {
            st.push(c - '0');
        } else {
            int b = st.top(); st.pop();
            int a = st.top(); st.pop();
            switch (c) {
                case '+': st.push(a + b); break;
                case '-': st.push(a - b); break;
                case '*': st.push(a * b); break;
                case '/': st.push(a / b); break;
            }
        }
    }
    return st.top();
}

// "231*+9-" → 2 + 3*1 - 9 = -4
```

### 11.4 Min Stack (Get Minimum in O(1))
```cpp
class MinStack {
    stack<long long> st;
    long long minVal;
public:
    void push(long long x) {
        if (st.empty()) {
            st.push(x);
            minVal = x;
        } else if (x >= minVal) {
            st.push(x);
        } else {
            st.push(2 * x - minVal);
            minVal = x;
        }
    }

    void pop() {
        if (st.top() < minVal)
            minVal = 2 * minVal - st.top();
        st.pop();
    }

    long long top() {
        return (st.top() < minVal) ? minVal : st.top();
    }

    long long getMin() { return minVal; }
};
```

---

## 12. Trees (Basics)

### 12.1 Binary Tree Implementation & Traversals
```cpp
#include <bits/stdc++.h>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

// Inorder: Left → Root → Right
void inorder(TreeNode* root) {
    if (!root) return;
    inorder(root->left);
    cout << root->val << " ";
    inorder(root->right);
}

// Preorder: Root → Left → Right
void preorder(TreeNode* root) {
    if (!root) return;
    cout << root->val << " ";
    preorder(root->left);
    preorder(root->right);
}

// Postorder: Left → Right → Root
void postorder(TreeNode* root) {
    if (!root) return;
    postorder(root->left);
    postorder(root->right);
    cout << root->val << " ";
}

// Level Order (BFS)
void levelOrder(TreeNode* root) {
    if (!root) return;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        TreeNode* node = q.front(); q.pop();
        cout << node->val << " ";
        if (node->left) q.push(node->left);
        if (node->right) q.push(node->right);
    }
}
```

### 12.2 Height of Binary Tree
```cpp
int height(TreeNode* root) {
    if (!root) return 0;
    return 1 + max(height(root->left), height(root->right));
}
```

### 12.3 BST Insert & Search
```cpp
TreeNode* bstInsert(TreeNode* root, int val) {
    if (!root) return new TreeNode(val);
    if (val < root->val) root->left = bstInsert(root->left, val);
    else root->right = bstInsert(root->right, val);
    return root;
}

TreeNode* bstSearch(TreeNode* root, int val) {
    if (!root || root->val == val) return root;
    if (val < root->val) return bstSearch(root->left, val);
    return bstSearch(root->right, val);
}
```

---

## 13. Graphs (Basics)

### 13.1 Graph Representation (Adjacency List)
```cpp
#include <bits/stdc++.h>
using namespace std;

class Graph {
public:
    int V;
    vector<vector<int>> adj;

    Graph(int V) : V(V), adj(V) {}

    void addEdge(int u, int v) {
        adj[u].push_back(v);
        adj[v].push_back(u);  // Remove for directed graph
    }
};
```

### 13.2 BFS (Breadth-First Search)
```cpp
void bfs(Graph& g, int start) {
    vector<bool> visited(g.V, false);
    queue<int> q;

    visited[start] = true;
    q.push(start);

    while (!q.empty()) {
        int node = q.front(); q.pop();
        cout << node << " ";
        for (int neighbor : g.adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}
```

### 13.3 DFS (Depth-First Search)
```cpp
void dfs(Graph& g, int node, vector<bool>& visited) {
    visited[node] = true;
    cout << node << " ";
    for (int neighbor : g.adj[node]) {
        if (!visited[neighbor])
            dfs(g, neighbor, visited);
    }
}

// Usage:
// vector<bool> visited(g.V, false);
// dfs(g, 0, visited);
```

### 13.4 Detect Cycle (Undirected Graph)
```cpp
bool hasCycleDFS(Graph& g, int node, int parent, vector<bool>& visited) {
    visited[node] = true;
    for (int neighbor : g.adj[node]) {
        if (!visited[neighbor]) {
            if (hasCycleDFS(g, neighbor, node, visited)) return true;
        } else if (neighbor != parent) {
            return true;
        }
    }
    return false;
}

bool hasCycle(Graph& g) {
    vector<bool> visited(g.V, false);
    for (int i = 0; i < g.V; i++)
        if (!visited[i])
            if (hasCycleDFS(g, i, -1, visited)) return true;
    return false;
}
```

### 13.5 Shortest Path (Dijkstra's)
```cpp
vector<int> dijkstra(int V, vector<vector<pair<int,int>>>& adj, int src) {
    vector<int> dist(V, INT_MAX);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;

    dist[src] = 0;
    pq.push({0, src});

    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}
```

---

## 14. Bit Manipulation

### Key Operations
```cpp
n & 1           // Check if odd (1=odd, 0=even)
n & (n-1)       // Remove last set bit
n & (-n)        // Isolate last set bit
n ^ n           // Always 0
n ^ 0           // Always n
n << k          // Multiply by 2^k
n >> k          // Divide by 2^k
(1 << k)        // 2^k
n | (1 << k)    // Set k-th bit
n & ~(1 << k)   // Clear k-th bit
n ^ (1 << k)    // Toggle k-th bit
(n >> k) & 1    // Check k-th bit
```

### 14.1 Count Set Bits
```cpp
// Brian Kernighan's Algorithm
int countBits(int n) {
    int count = 0;
    while (n) {
        n &= (n - 1);
        count++;
    }
    return count;
}

// Built-in: __builtin_popcount(n) for int, __builtin_popcountll(n) for long long
```

### 14.2 Check Power of 2
```cpp
bool isPowerOf2(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}
```

### 14.3 Find the Only Non-Repeating Element
```cpp
int findUnique(vector<int>& arr) {
    int result = 0;
    for (int x : arr) result ^= x;
    return result;
}

// {1,2,3,2,1} → 3
```

### 14.4 Swap Two Numbers Without Temp
```cpp
void swapXOR(int& a, int& b) {
    a ^= b;
    b ^= a;
    a ^= b;
}
```

---

## 15. Pattern-Based Problems

### 15.1 Star Patterns
```cpp
// Right Triangle
void rightTriangle(int n) {
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j < i; j++) cout << "* ";
        cout << "\n";
    }
}

// Pyramid
void pyramid(int n) {
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j < n - i; j++) cout << " ";
        for (int j = 0; j < i; j++) cout << "* ";
        cout << "\n";
    }
}

// Diamond
void diamond(int n) {
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j < n - i; j++) cout << " ";
        for (int j = 0; j < i; j++) cout << "* ";
        cout << "\n";
    }
    for (int i = n - 1; i >= 1; i--) {
        for (int j = 0; j < n - i; j++) cout << " ";
        for (int j = 0; j < i; j++) cout << "* ";
        cout << "\n";
    }
}
```

### 15.2 Number Patterns
```cpp
// Floyd's Triangle
void floydsTriangle(int n) {
    int num = 1;
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j < i; j++)
            cout << num++ << " ";
        cout << "\n";
    }
}

// Pascal's Triangle
void pascalsTriangle(int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i - 1; j++) cout << " ";
        int val = 1;
        for (int j = 0; j <= i; j++) {
            cout << val << " ";
            val = val * (i - j) / (j + 1);
        }
        cout << "\n";
    }
}
```

---

## 16. TCS NQT Coding Patterns & PYQs

### Most Frequently Asked Problem Types

| Rank | Problem Type | Frequency | Difficulty |
|------|-------------|-----------|------------|
| 1 | Array manipulation | Very High | Medium |
| 2 | String operations | Very High | Medium |
| 3 | Number theory (prime, GCD) | High | Medium |
| 4 | Sorting/Searching | High | Medium |
| 5 | Pattern printing | Medium | Easy |
| 6 | Matrix operations | Medium | Medium |
| 7 | Dynamic Programming | Medium | Hard |
| 8 | Recursion | Medium | Medium |
| 9 | Stack/Queue | Low-Medium | Medium |
| 10 | Graph traversal | Low | Hard |

### PYQ 1: Sum of Digits Until Single Digit

```cpp
#include <bits/stdc++.h>
using namespace std;

int digitalRoot(int n) {
    while (n >= 10) {
        int sum = 0;
        while (n > 0) {
            sum += n % 10;
            n /= 10;
        }
        n = sum;
    }
    return n;
}

// Shortcut: n == 0 ? 0 : (n % 9 == 0 ? 9 : n % 9)
int digitalRootFast(int n) {
    if (n == 0) return 0;
    return (n % 9 == 0) ? 9 : n % 9;
}

int main() {
    int n;
    cin >> n;
    cout << digitalRoot(n) << "\n";
    return 0;
}

// 9875 → 9+8+7+5=29 → 2+9=11 → 1+1=2
```

### PYQ 2: Armstrong Number

```cpp
bool isArmstrong(int n) {
    int original = n;
    int digits = to_string(n).length();
    int sum = 0;
    int temp = n;
    while (temp > 0) {
        int d = temp % 10;
        sum += (int)pow(d, digits);
        temp /= 10;
    }
    return sum == original;
}

// 153 = 1³+5³+3³ = 1+125+27 = 153 ✓
// 370 = 3³+7³+0³ = 27+343+0 = 370 ✓
```

### PYQ 3: Matrix Multiplication

```cpp
vector<vector<int>> matMul(vector<vector<int>>& A, vector<vector<int>>& B) {
    int m = A.size(), n = A[0].size(), p = B[0].size();
    vector<vector<int>> C(m, vector<int>(p, 0));

    for (int i = 0; i < m; i++)
        for (int j = 0; j < p; j++)
            for (int k = 0; k < n; k++)
                C[i][j] += A[i][k] * B[k][j];
    return C;
}
```

### PYQ 4: Sort Array by Frequency

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    unordered_map<int, int> freq;
    for (int x : arr) freq[x]++;

    sort(arr.begin(), arr.end(), [&freq](int a, int b) {
        if (freq[a] != freq[b]) return freq[a] > freq[b];  // Higher freq first
        return a < b;  // Same freq → smaller value first
    });

    for (int x : arr) cout << x << " ";
    cout << "\n";
    return 0;
}

// Input:  2 3 2 4 5 12 2 3 3 3 12
// Output: 3 3 3 3 2 2 2 12 12 4 5
```

### PYQ 5: Caesar Cipher

```cpp
string caesarEncrypt(string text, int k) {
    string result;
    for (char c : text) {
        if (isupper(c))
            result += (char)(((c - 'A' + k) % 26) + 'A');
        else if (islower(c))
            result += (char)(((c - 'a' + k) % 26) + 'a');
        else
            result += c;
    }
    return result;
}

string caesarDecrypt(string text, int k) {
    return caesarEncrypt(text, 26 - k);
}

// caesarEncrypt("Hello World", 3) → "Khoor Zruog"
```

### PYQ 6: Spiral Matrix Traversal

```cpp
vector<int> spiralOrder(vector<vector<int>>& matrix) {
    vector<int> result;
    if (matrix.empty()) return result;

    int top = 0, bottom = matrix.size() - 1;
    int left = 0, right = matrix[0].size() - 1;

    while (top <= bottom && left <= right) {
        for (int j = left; j <= right; j++) result.push_back(matrix[top][j]);
        top++;
        for (int i = top; i <= bottom; i++) result.push_back(matrix[i][right]);
        right--;
        if (top <= bottom) {
            for (int j = right; j >= left; j--) result.push_back(matrix[bottom][j]);
            bottom--;
        }
        if (left <= right) {
            for (int i = bottom; i >= top; i--) result.push_back(matrix[i][left]);
            left++;
        }
    }
    return result;
}

// [[1,2,3],[4,5,6],[7,8,9]] → {1,2,3,6,9,8,7,4,5}
```

### PYQ 7: Longest Palindromic Substring

```cpp
string longestPalindrome(string s) {
    int n = s.size();
    if (n < 2) return s;

    int start = 0, maxLen = 1;

    auto expand = [&](int left, int right) {
        while (left >= 0 && right < n && s[left] == s[right]) {
            if (right - left + 1 > maxLen) {
                start = left;
                maxLen = right - left + 1;
            }
            left--;
            right++;
        }
    };

    for (int i = 0; i < n; i++) {
        expand(i, i);      // Odd length
        expand(i, i + 1);  // Even length
    }

    return s.substr(start, maxLen);
}

// "babad" → "bab" or "aba"
```

### PYQ 8: Maximum Product Subarray

```cpp
int maxProduct(vector<int>& arr) {
    int maxProd = arr[0], minProd = arr[0], result = arr[0];

    for (int i = 1; i < arr.size(); i++) {
        if (arr[i] < 0) swap(maxProd, minProd);
        maxProd = max(arr[i], maxProd * arr[i]);
        minProd = min(arr[i], minProd * arr[i]);
        result = max(result, maxProd);
    }
    return result;
}

// {2,3,-2,4} → 6
// {-2,3,-4}  → 24
```

### PYQ 9: Check String Rotation

```cpp
bool areRotations(string s1, string s2) {
    if (s1.size() != s2.size()) return false;
    return (s1 + s1).find(s2) != string::npos;
}

// "abcde" and "cdeab" → true
```

### PYQ 10: Reverse a Number

```cpp
int reverseNumber(int n) {
    int rev = 0;
    bool negative = n < 0;
    n = abs(n);
    while (n > 0) {
        rev = rev * 10 + n % 10;
        n /= 10;
    }
    return negative ? -rev : rev;
}

// 12345 → 54321
```

---

## 17. Tips & Tricks for Coding Round

### ⚡ Before the Exam

```
1. Practice 50+ problems on HackerRank / LeetCode / GFG

2. Master these in order of priority:
   ① Arrays & Strings (most questions)
   ② Math/Number Theory (GCD, primes, modular arithmetic)
   ③ Sorting & STL sort() with custom comparators
   ④ Basic DP (Fibonacci, knapsack, LCS, coin change)
   ⑤ Stacks & Queues (balanced parentheses, NGE)
   ⑥ Binary Search (on sorted arrays, on answer)

3. Memorize the C++ template and STL functions

4. Practice reading input and producing exact output format
```

### 🎯 During the Exam (90 min, 2 problems)

```
STEP 1 (5 min):  Read BOTH problems, pick the easier one first
STEP 2 (5 min):  Plan approach, think about edge cases
STEP 3 (25 min): Code Problem 1
STEP 4 (5 min):  Test with sample input + custom edge cases
STEP 5 (35 min): Code Problem 2
STEP 6 (15 min): Debug, optimize, handle edge cases
```

### 🐛 Common C++ Mistakes

| Mistake | Fix |
|---------|-----|
| Integer overflow | Use `long long` for large values |
| Off-by-one (loop bounds) | Double-check `<` vs `<=` |
| Uninitialized variables | Always initialize: `int x = 0;` |
| `endl` causing TLE | Use `"\n"` instead |
| Missing `ios_base::sync_with_stdio(false)` | Always include fast I/O |
| Accessing `v[v.size()]` | Last valid index is `v.size()-1` |
| Forgetting `return 0;` | Always end `main()` with `return 0;` |
| Wrong data type for `sqrt`/`pow` | Cast result: `(int)sqrt(n)` |

### 🔥 Top 20 Must-Solve Problems

| # | Problem | Difficulty | Category |
|---|---------|-----------|----------|
| 1 | Reverse array | Easy | Array |
| 2 | Find duplicates | Easy | Hash |
| 3 | Palindrome check | Easy | String |
| 4 | Two Sum | Easy | Hash |
| 5 | Balanced parentheses | Medium | Stack |
| 6 | GCD/LCM of array | Easy | Math |
| 7 | Armstrong number | Easy | Math |
| 8 | Fibonacci series | Easy | DP |
| 9 | Sort by frequency | Medium | Hash+Sort |
| 10 | Matrix multiply | Medium | Matrix |
| 11 | Binary search | Medium | Search |
| 12 | Kadane's algorithm | Medium | DP |
| 13 | LCS | Medium | DP |
| 14 | Missing number | Easy | XOR/Math |
| 15 | Caesar cipher | Medium | String |
| 16 | Spiral matrix | Medium | Matrix |
| 17 | Count vowels/consonants | Easy | String |
| 18 | Sieve of Eratosthenes | Medium | Math |
| 19 | Coin change | Medium | DP |
| 20 | Merge sorted arrays | Medium | Array |

---

> **← Previous:** [Advanced Reasoning](../05_Advanced_Reasoning/README.md) | **Back to** [Main Index](../README.md)
