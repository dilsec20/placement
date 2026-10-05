# 🎯 Accenture Coding Assessment: Master 47 DSA Practice Bank

> **Target Roles:** Associate Software Engineer (ASE - ₹4.5 LPA) | Advanced ASE (AASE - ₹6.5 LPA) | Digital / Prime Track (₹9–12 LPA)  
> **Assessment Format:** 2 Coding Problems | **Time:** 45–60 Minutes | **Evaluation:** Automated Hidden Test Cases  
> **Source:** Official Accenture Mock Test Suite (`mock-test/data/accenture-data.js` & `accenture.json`) & Recent Campus Drive PYQs.

---

## 📑 Table of Contents

1. [🏢 Assessment Blueprint & Platform Quirks](#-assessment-blueprint--platform-quirks)
2. [⚡ Master Summary Table (All 47 Accenture Coding Problems)](#-master-summary-table-all-47-accenture-coding-problems)
3. [🧱 Category 1: Classic Drive PYQs & Basic Array Invariants](#-category-1-classic-drive-pyqs--basic-array-invariants)
4. [🪟 Category 2: Sliding Window, Strings & Anagrams](#-category-2-sliding-window-strings--anagrams)
5. [🥞 Category 3: Monotonic Stacks, Queues & Two Pointers](#-category-3-monotonic-stacks-queues--two-pointers)
6. [🔍 Category 4: Binary Search & Sorting](#-category-4-binary-search--sorting)
7. [🔢 Category 5: Bit Manipulation & Number Theory](#-category-5-bit-manipulation--number-theory)
8. [🔗 Category 6: Linked Lists & Matrix Traversal](#-category-6-linked-lists--matrix-traversal)
9. [🌲 Category 7: Heaps & Hash Maps](#-category-7-heaps--hash-maps)
10. [🧩 Category 8: Dynamic Programming & Backtracking](#-category-8-dynamic-programming--backtracking)
11. [🛠️ Ready-to-Use Boilerplate Templates (C++, Java, Python)](#-ready-to-use-boilerplate-templates)

---

## 🏢 Assessment Blueprint & Platform Quirks

### 1. Structure of the Coding Round
- **Questions:** 2 coding questions.
  - **Question 1 (Easy):** Basic array traversal, string validation, math/number problem, or bitwise logic (e.g. Pangram, Missing Number, Diagonal Sum, Password Validator). Expected solve time: **12–15 minutes**.
  - **Question 2 (Medium):** Two pointers, prefix sums with hash map, monotonic stack, binary search on answer, or Dutch National Flag partitioning (e.g. Nearest Smaller Element, Subarray Sum Equals K, Rotated Sorted Array, Product Except Self). Expected solve time: **20–25 minutes**.
- **Languages Permitted:** C, C++, Java, Python 3, C#.
- **Partial Marking:** ✅ Available. Test cases are split into:
  - 3–4 **Public Test Cases** (visible in console).
  - 6–10 **Private / Hidden Test Cases** (testing bounds: $N=0$, $N=1$, negative numbers, large constraints $10^5$, and $O(N)$ vs $O(N^2)$ time limit timeouts).

### 2. Crucial Accenture Auto-Grader Traps
1. **Never print debugging messages:** Statements like `cout << "Enter n: ";` or `print(f"DEBUG: {x}")` will cause instant fail because standard output comparison is exact string match.
2. **Whitespace & Trailing Characters:** Print single space between numbers and a trailing newline `\n` as specified. Do not append extra trailing spaces after the last element unless required.
3. **Integer Overflow:** If computing products, sums of squares, or cumulative prefix sums with $N=10^5$ and $A[i] \le 10^9$, 32-bit `int` will overflow. Always use `long long` in C++ or `long` in Java.
4. **Input Reading on Platform:** Some questions pass space-separated arrays on a single line, while others give each element on a newline. Always use robust token-based reading.

---

## ⚡ Master Summary Table (All 47 Accenture Coding Problems)

| # | ID | Problem Name | Difficulty | Core Topics | Time / Space | Direct Practice Link |
|---|---|---|---|---|---|---|
| 1 | `code1` | **Replace Elements with Nearest Smaller on Right** | 🟡 Medium | Monotonic Stack, Arrays | $O(N)$ / $O(N)$ | [Solve on GeeksforGeeks](https://www.geeksforgeeks.org/next-smaller-element/) |
| 2 | `code2` | **Product of Array Except Self** | 🟡 Medium | Prefix/Suffix Products, Arrays | $O(N)$ / $O(1)$ | [Solve on LeetCode](https://leetcode.com/problems/product-of-array-except-self/) |
| 3 | `code3` | **Password Validator** | 🟢 Easy | String Parsing, ASCII Rules | $O(N)$ / $O(1)$ | [Solve on LeetCode](https://leetcode.com/problems/strong-password-checker/) |
| 4 | `code4` | **Binary String XOR/AND/OR** | 🟢 Easy | Bitwise Operations, Strings | $O(N)$ / $O(1)$ | [Solve on GeeksforGeeks](https://www.geeksforgeeks.org/xor-of-two-binary-strings/) |
| 5 | `code5` | **Check if String is Pangram** | 🟢 Easy | Strings, Bitmask / Hash Set | $O(N)$ / $O(1)$ | [Solve on LeetCode](https://leetcode.com/problems/check-if-the-sentence-is-pangram/) |
| 6 | `code6` | **Find Missing Number in Array** | 🟢 Easy | Gauss Summation, XOR | $O(N)$ / $O(1)$ | [Solve on LeetCode](https://leetcode.com/problems/missing-number/) |
| 7 | `code7` | **Sort Array of 0s, 1s, and 2s** | 🟡 Medium | Dutch National Flag, 3 Pointers | $O(N)$ / $O(1)$ | [Solve on LeetCode](https://leetcode.com/problems/sort-colors/) |
| 8 | `code8` | **Remove Consecutive Duplicates** | 🟢 Easy | Stack / In-place Two Pointers | $O(N)$ / $O(N)$ | [Solve on LeetCode](https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/) |
| 9 | `code9` | **Sum of Primes in Range** | 🟢 Easy | Sieve of Eratosthenes, Math | $O(R \log \log R)$ / $O(R)$ | [Solve on GeeksforGeeks](https://www.geeksforgeeks.org/sieve-of-eratosthenes/) |
| 10 | `code10` | **Check Anagrams (Valid Anagram)** | 🟢 Easy | Frequency Array (26 letters) | $O(N)$ / $O(1)$ | [Solve on LeetCode](https://leetcode.com/problems/valid-anagram/) |
| 11 | `code11` | **Matrix Diagonal Sum** | 🟢 Easy | Matrix Traversal, Overlap Deduplication | $O(N)$ / $O(1)$ | [Solve on LeetCode](https://leetcode.com/problems/matrix-diagonal-sum/) |
| 12 | `code12` | **Find Second Largest Element** | 🟢 Easy | Single-Pass Scan, Invariants | $O(N)$ / $O(1)$ | [Solve on GeeksforGeeks](https://www.geeksforgeeks.org/find-second-largest-element-array/) |
| 13 | `code13` | **Decimal to Binary Conversion** | 🟢 Easy | Radix Division, Bitwise Shifts | $O(\log N)$ / $O(1)$ | [Solve on GeeksforGeeks](https://www.geeksforgeeks.org/program-decimal-binary-conversion/) |
| 14 | `code14` | **Reverse a String In-Place** | 🟢 Easy | Two Pointers, Swapping | $O(N)$ / $O(1)$ | [Solve on LeetCode](https://leetcode.com/problems/reverse-string/) |
| 15 | `code15` | **Count Vowels and Consonants** | 🟢 Easy | Character Classification | $O(N)$ / $O(1)$ | [Solve on GeeksforGeeks](https://www.geeksforgeeks.org/program-count-vowels-consonant-digits-special-characters-string/) |
| 16 | `code16` | **Koko Eating Bananas** | 🟡 Medium | Binary Search on Answer | $O(N \log(\max P))$ / $O(1)$ | [Solve on LeetCode](https://leetcode.com/problems/koko-eating-bananas/) |
| 17 | `code17` | **Two Sum** | 🟢 Easy | Hash Map Complement Lookup | $O(N)$ / $O(N)$ | [Solve on LeetCode](https://leetcode.com/problems/two-sum/) |
| 18 | `code18` | **Longest Substring Without Repeating Characters** | 🟡 Medium | Sliding Window, Hash Map | $O(N)$ / $O(\min(N, \Sigma))$ | [Solve on LeetCode](https://leetcode.com/problems/longest-substring-without-repeating-characters/) |
| 19 | `code19` | **Group Anagrams** | 🟡 Medium | Sorted Key / Frequency Tuple Hash | $O(N \cdot K \log K)$ / $O(NK)$ | [Solve on LeetCode](https://leetcode.com/problems/group-anagrams/) |
| 20 | `code20` | **Subarray Sum Equals K** | 🟡 Medium | Prefix Sum + Frequency Hash Map | $O(N)$ / $O(N)$ | [Solve on LeetCode](https://leetcode.com/problems/subarray-sum-equals-k/) |
| 21 | `code21` | **Top K Frequent Elements** | 🟡 Medium | Bucket Sort / Min-Heap | $O(N)$ or $O(N \log K)$ / $O(N)$ | [Solve on LeetCode](https://leetcode.com/problems/top-k-frequent-elements/) |
| 22 | `code22` | **Search in Rotated Sorted Array** | 🟡 Medium | Modified Binary Search | $O(\log N)$ / $O(1)$ | [Solve on LeetCode](https://leetcode.com/problems/search-in-rotated-sorted-array/) |
| 23 | `code23` | **Merge Intervals** | 🟡 Medium | Interval Sorting, Sweep Line | $O(N \log N)$ / $O(N)$ | [Solve on LeetCode](https://leetcode.com/problems/merge-intervals/) |
| 24 | `code24` | **Longest Consecutive Sequence** | 🟡 Medium | Hash Set, Sequence Boundary Check | $O(N)$ / $O(N)$ | [Solve on LeetCode](https://leetcode.com/problems/longest-consecutive-sequence/) |
| 25 | `code25` | **Longest Palindromic Substring** | 🟡 Medium | Expand Around Centers / 2D DP | $O(N^2)$ / $O(1)$ | [Solve on LeetCode](https://leetcode.com/problems/longest-palindromic-substring/) |
| 26 | `code26` | **Count Tested Devices After Test Operations** | 🟢 Easy | Array Simulation, Decrement Offset | $O(N)$ / $O(1)$ | [Solve on LeetCode](https://leetcode.com/problems/count-tested-devices-after-test-operations/) |
| 27 | `code27` | **Sum of Values at Indices With K Set Bits** | 🟢 Easy | Bit Counting (`popcount`), Arrays | $O(N)$ / $O(1)$ | [Solve on LeetCode](https://leetcode.com/problems/sum-of-values-at-indices-with-k-set-bits/) |
| 28 | `code28` | **Minimum Right Shifts to Sort the Array** | 🟢 Easy | Drop Count & Rotation Validation | $O(N)$ / $O(1)$ | [Solve on LeetCode](https://leetcode.com/problems/minimum-right-shifts-to-sort-the-array/) |
| 29 | `code29` | **Roman to Integer** | 🟢 Easy | Subtractive Symbol Mapping | $O(N)$ / $O(1)$ | [Solve on LeetCode](https://leetcode.com/problems/roman-to-integer/) |
| 30 | `code30` | **Longest Increasing Subsequence (LIS)** | 🟡 Medium | Patience Sorting + Binary Search | $O(N \log N)$ / $O(N)$ | [Solve on LeetCode](https://leetcode.com/problems/longest-increasing-subsequence/) |
| 31 | `code31` | **Coin Change II** | 🟡 Medium | Unbounded Knapsack DP (Combinations) | $O(N \cdot \text{Amount})$ / $O(\text{Amount})$ | [Solve on LeetCode](https://leetcode.com/problems/coin-change-ii/) |
| 32 | `code32` | **Find Subsequence of Length K With Largest Sum** | 🟢 Easy | Min-Heap / Index Sorting | $O(N \log K)$ / $O(K)$ | [Solve on LeetCode](https://leetcode.com/problems/find-subsequence-of-length-k-with-the-largest-sum/) |
| 33 | `code33` | **Restore the Array From Adjacent Pairs** | 🟡 Medium | Graph Adjacency List, Linear DFS | $O(N)$ / $O(N)$ | [Solve on LeetCode](https://leetcode.com/problems/restore-the-array-from-adjacent-pairs/) |
| 34 | `code34` | **Count Odd Numbers in an Interval Range** | 🟢 Easy | Closed-form Formula | $O(1)$ / $O(1)$ | [Solve on LeetCode](https://leetcode.com/problems/count-odd-numbers-in-an-interval-range/) |
| 35 | `code35` | **Sort Integers by the Number of 1 Bits** | 🟢 Easy | Custom Comparator, Bit Counting | $O(N \log N)$ / $O(1)$ | [Solve on LeetCode](https://leetcode.com/problems/sort-integers-by-the-number-of-1-bits/) |
| 36 | `code36` | **Check If It Is a Straight Line** | 🟢 Easy | Cross-Multiplication Slopes | $O(N)$ / $O(1)$ | [Solve on LeetCode](https://leetcode.com/problems/check-if-it-is-a-straight-line/) |
| 37 | `code37` | **Relative Ranks** | 🟢 Easy | Index-Value Mapping / Max-Heap | $O(N \log N)$ / $O(N)$ | [Solve on LeetCode](https://leetcode.com/problems/relative-ranks/) |
| 38 | `code38` | **Add Two Numbers II** | 🟡 Medium | Stack for Reversal, Carry Tracking | $O(N + M)$ / $O(N + M)$ | [Solve on LeetCode](https://leetcode.com/problems/add-two-numbers-ii/) |
| 39 | `code39` | **Implement Stack using Queues** | 🟢 Easy | Queue Rotation on Push | $O(N)$ push, $O(1)$ pop / $O(N)$ | [Solve on LeetCode](https://leetcode.com/problems/implement-stack-using-queues/) |
| 40 | `code40` | **Kth Largest Element in an Array** | 🟡 Medium | Quickselect / Min-Heap of size K | $O(N)$ avg, $O(N \log K)$ / $O(K)$ | [Solve on LeetCode](https://leetcode.com/problems/kth-largest-element-in-an-array/) |
| 41 | `code41` | **Linked List Cycle** | 🟢 Easy | Floyd's Tortoise & Hare Pointers | $O(N)$ / $O(1)$ | [Solve on LeetCode](https://leetcode.com/problems/linked-list-cycle/) |
| 42 | `code42` | **Word Break** | 🟡 Medium | 1D Dynamic Programming / Trie | $O(N \cdot L^2)$ / $O(N)$ | [Solve on LeetCode](https://leetcode.com/problems/word-break/) |
| 43 | `code43` | **Search a 2D Matrix** | 🟡 Medium | Flattened Virtual Binary Search | $O(\log(M \cdot N))$ / $O(1)$ | [Solve on LeetCode](https://leetcode.com/problems/search-a-2d-matrix/) |
| 44 | `code44` | **Spiral Matrix** | 🟡 Medium | 4 Boundaries Inward Simulation | $O(M \cdot N)$ / $O(1)$ | [Solve on LeetCode](https://leetcode.com/problems/spiral-matrix/) |
| 45 | `code45` | **Permutations** | 🟡 Medium | In-place Backtracking / Swap | $O(N \cdot N!)$ / $O(N)$ | [Solve on LeetCode](https://leetcode.com/problems/permutations/) |
| 46 | `code46` | **Merge Two Sorted Lists** | 🟢 Easy | Iterative Sentinel / Dummy Head | $O(N + M)$ / $O(1)$ | [Solve on LeetCode](https://leetcode.com/problems/merge-two-sorted-lists/) |
| 47 | `code47` | **Palindrome Number** | 🟢 Easy | Reversing Half the Number (No String) | $O(\log_{10} N)$ / $O(1)$ | [Solve on LeetCode](https://leetcode.com/problems/palindrome-number/) |

---

## 🧱 Category 1: Classic Drive PYQs & Basic Array Invariants

### 1. Replace Elements with Nearest Smaller on Right (`code1`)
* **Difficulty:** Medium | **Tags:** `Arrays`, `Monotonic Stack`
* **Direct Link:** [GeeksforGeeks Next Smaller Element](https://www.geeksforgeeks.org/next-smaller-element/)
* **Problem Statement:** Given an integer array `arr` of size $n$, replace every element with the nearest strictly smaller element present on its right side. If no strictly smaller element exists to the right, replace it with `-1`.
* **Sample Input:** `n = 5`, `arr = [4, 5, 2, 10, 8]`  
* **Sample Output:** `[2, 2, -1, 8, -1]`  
* **Optimal Logic:**
  - Traverse from right to left ($i = n-1$ down to $0$).
  - Maintain a monotonic increasing stack storing candidates for smaller values.
  - While stack is non-empty and `stack.top() >= arr[i]`, pop elements because `arr[i]` shadows them for all elements to the left.
  - If stack is empty, answer is `-1`; otherwise `stack.top()`. Push `arr[i]`.
* **Complexity:** Time: $O(N)$ (each element pushed/popped at most once) | Space: $O(N)$

```cpp
#include <iostream>
#include <vector>
#include <stack>
using namespace std;

vector<int> nearestSmallerRight(int n, const vector<int>& arr) {
    vector<int> ans(n);
    stack<int> st;
    for (int i = n - 1; i >= 0; --i) {
        while (!st.empty() && st.top() >= arr[i]) {
            st.pop();
        }
        ans[i] = st.empty() ? -1 : st.top();
        st.push(arr[i]);
    }
    return ans;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> arr(n);
    for (int i = 0; i < n; ++i) cin >> arr[i];
    vector<int> res = nearestSmallerRight(n, arr);
    for (int i = 0; i < n; ++i) cout << res[i] << (i + 1 == n ? "" : " ");
    cout << "
";
    return 0;
}
```

---

### 2. Product of Array Except Self (`code2`)
* **Difficulty:** Medium | **Tags:** `Arrays`, `Prefix/Suffix Products`
* **Direct Link:** [LeetCode 238](https://leetcode.com/problems/product-of-array-except-self/)
* **Problem Statement:** Given an array `nums`, return an array `output` such that `output[i]` is equal to the product of all elements of `nums` except `nums[i]`. Solve **without using the division operator** and in $O(N)$ time.
* **Sample Input:** `nums = [1, 2, 3, 4]`  
* **Sample Output:** `[24, 12, 8, 6]`  
* **Optimal Logic:**
  - Initialize `output[0] = 1`. In a first pass from left to right, store the prefix products: `output[i] = output[i-1] * nums[i-1]`.
  - In a second pass from right to left, maintain a running suffix product variable `R = 1`. Multiply `output[i] *= R`, then update `R *= nums[i]`.
* **Complexity:** Time: $O(N)$ | Space: $O(1)$ extra (output array does not count as auxiliary space).

```python
def productExceptSelf(nums: list[int]) -> list[int]:
    n = len(nums)
    res = [1] * n
    prefix = 1
    for i in range(n):
        res[i] = prefix
        prefix *= nums[i]
    
    suffix = 1
    for i in range(n - 1, -1, -1):
        res[i] *= suffix
        suffix *= nums[i]
    return res
```

---

### 3. Sort Array of 0s, 1s, and 2s (`code7`)
* **Difficulty:** Medium | **Tags:** `Arrays`, `Dutch National Flag`, `Two Pointers`
* **Direct Link:** [LeetCode 75 - Sort Colors](https://leetcode.com/problems/sort-colors/)
* **Problem Statement:** Given an array containing only `0`s, `1`s, and `2`s, sort the array in-place without using library sort functions.
* **Sample Input:** `nums = [2, 0, 2, 1, 1, 0]`  
* **Sample Output:** `[0, 0, 1, 1, 2, 2]`  
* **Optimal Logic (Dutch National Flag Algorithm):**
  - Maintain three pointers: `low = 0`, `mid = 0`, `high = n - 1`.
  - While `mid <= high`:
    - If `nums[mid] == 0`: `swap(nums[low], nums[mid])`, `low++`, `mid++`.
    - If `nums[mid] == 1`: `mid++`.
    - If `nums[mid] == 2`: `swap(nums[mid], nums[high])`, `high--` (do not increment `mid` yet, as swapped element from high must be inspected).
* **Complexity:** Time: $O(N)$ (single pass) | Space: $O(1)$ in-place.

```java
public class Solution {
    public void sortColors(int[] nums) {
        int low = 0, mid = 0, high = nums.length - 1;
        while (mid <= high) {
            if (nums[mid] == 0) {
                int temp = nums[low];
                nums[low] = nums[mid];
                nums[mid] = temp;
                low++;
                mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                int temp = nums[mid];
                nums[mid] = nums[high];
                nums[high] = temp;
                high--;
            }
        }
    }
}
```

---

### 4. Find Missing Number in Array (`code6`)
* **Difficulty:** Easy | **Tags:** `Arrays`, `Math`, `Bitwise XOR`
* **Direct Link:** [LeetCode 268 - Missing Number](https://leetcode.com/problems/missing-number/)
* **Problem Statement:** Given an array `nums` containing $n$ distinct numbers in the range $[0, n]$, return the only number in the range that is missing from the array.
* **Optimal Approaches:**
  1. **Gauss Formula:** Expected sum $= \frac{n(n+1)}{2}$. Missing $= \text{Expected} - \sum nums[i]$. (Caution: use 64-bit to prevent overflow on huge $n$).
  2. **XOR Trick ($O(1)$ space, no overflow):** $\text{XOR}(0 \dots n) \oplus \text{XOR}(nums)$. All matching pairs cancel to 0, leaving the missing number.
* **Complexity:** Time: $O(N)$ | Space: $O(1)$

```cpp
int missingNumber(const vector<int>& nums) {
    int n = nums.size();
    int xorVal = 0;
    for (int i = 0; i <= n; ++i) xorVal ^= i;
    for (int num : nums) xorVal ^= num;
    return xorVal;
}
```

---

### 5. Find Second Largest Element (`code12`)
* **Difficulty:** Easy | **Tags:** `Arrays`, `Invariants`
* **Direct Link:** [GeeksforGeeks Second Largest](https://www.geeksforgeeks.org/find-second-largest-element-array/)
* **Problem Statement:** Find the second largest distinct element in an array without sorting. If no second largest exists (all elements identical or $n < 2$), return `-1`.
* **Optimal Logic:**
  - Maintain two variables: `first = -1`, `second = -1`.
  - For each `x` in array:
    - If `x > first`: `second = first; first = x;`
    - Else if `x < first` and `x > second`: `second = x;`
* **Complexity:** Time: $O(N)$ (single pass) | Space: $O(1)$

---

## 🪟 Category 2: Sliding Window, Strings & Anagrams

### 6. Longest Substring Without Repeating Characters (`code18`)
* **Difficulty:** Medium | **Tags:** `Strings`, `Sliding Window`, `Hash Map`
* **Direct Link:** [LeetCode 3](https://leetcode.com/problems/longest-substring-without-repeating-characters/)
* **Problem Statement:** Given a string `s`, find the length of the longest substring without repeating characters.
* **Sample Input:** `s = "abcabcbb"` | **Sample Output:** `3` (substring `"abc"`)
* **Optimal Logic:**
  - Two pointers `left = 0`, `right = 0`. Maintain a hash table or array `lastSeen[256]` initialized to `-1`.
  - For each character `s[right]`:
    - If `s[right]` was seen at index $\ge left$, advance `left = lastSeen[s[right]] + 1`.
    - Update `lastSeen[s[right]] = right`.
    - `maxLen = max(maxLen, right - left + 1)`.
* **Complexity:** Time: $O(N)$ | Space: $O(\min(N, \Sigma))$ where $\Sigma = 128$ ASCII.

```cpp
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int lengthOfLongestSubstring(string s) {
    vector<int> lastSeen(256, -1);
    int maxLen = 0, left = 0;
    for (int right = 0; right < (int)s.size(); ++right) {
        unsigned char c = s[right];
        if (lastSeen[c] >= left) {
            left = lastSeen[c] + 1;
        }
        lastSeen[c] = right;
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}
```

---

### 7. Group Anagrams (`code19`)
* **Difficulty:** Medium | **Tags:** `Strings`, `Hash Map`, `Sorting`
* **Direct Link:** [LeetCode 49](https://leetcode.com/problems/group-anagrams/)
* **Problem Statement:** Given an array of strings `strs`, group the anagrams together in any order.
* **Optimal Logic:**
  - Use a hash map where key is either:
    1. The lexicographically sorted string (e.g. `"eat" -> "aet"`), or
    2. A 26-element character frequency count string (e.g. `#1#0#0...`).
  - Append original string to `map[key]`. Return all value buckets.
* **Complexity:** Time: $O(N \cdot K \log K)$ where $K$ is max string length | Space: $O(N \cdot K)$

---

### 8. Subarray Sum Equals K (`code20`)
* **Difficulty:** Medium | **Tags:** `Arrays`, `Prefix Sum`, `Hash Map`
* **Direct Link:** [LeetCode 560](https://leetcode.com/problems/subarray-sum-equals-k/)
* **Problem Statement:** Given an array of integers `nums` and an integer `k`, return the total number of continuous subarrays whose sum equals `k`.
* **Why Two Pointers Fails Here:** The array can contain **negative numbers**, which destroys monotonicity required for sliding windows.
* **Optimal Logic:**
  - Maintain running `prefixSum`.
  - Subarray sum between $(j+1, i)$ is `prefixSum[i] - prefixSum[j] = k` $\implies$ `prefixSum[j] = prefixSum[i] - k`.
  - Use a hash map storing the frequency of all observed prefix sums. Initialize `map[0] = 1` (to account for subarrays starting at index 0).
  - For each element:
    - `prefixSum += num`
    - `count += map[prefixSum - k]`
    - `map[prefixSum]++`
* **Complexity:** Time: $O(N)$ | Space: $O(N)$

```python
def subarraySum(nums: list[int], k: int) -> int:
    prefix_counts = {0: 1}
    current_sum = 0
    total_subarrays = 0
    for num in nums:
        current_sum += num
        needed = current_sum - k
        if needed in prefix_counts:
            total_subarrays += prefix_counts[needed]
        prefix_counts[current_sum] = prefix_counts.get(current_sum, 0) + 1
    return total_subarrays
```

---

### 9. Check if String is Pangram (`code5`)
* **Difficulty:** Easy | **Tags:** `Strings`, `Bit Manipulation`
* **Direct Link:** [LeetCode 1832](https://leetcode.com/problems/check-if-the-sentence-is-pangram/)
* **Problem Statement:** A sentence is a pangram if every letter of the English alphabet appears at least once.
* **Optimal Bitmask Trick ($O(1)$ auxiliary memory):**
  - An integer `bitmask = 0`.
  - For char `c` in string: `bitmask |= (1 << (tolower(c) - 'a'))`.
  - A full alphabet requires all lower 26 bits set: `bitmask == (1 << 26) - 1` (value `67108863`).
* **Complexity:** Time: $O(N)$ | Space: $O(1)$ (single 32-bit integer).

---

## 🥞 Category 3: Monotonic Stacks, Queues & Two Pointers

### 10. Merge Intervals (`code23`)
* **Difficulty:** Medium | **Tags:** `Intervals`, `Sorting`
* **Direct Link:** [LeetCode 56](https://leetcode.com/problems/merge-intervals/)
* **Problem Statement:** Given an array of intervals `intervals[i] = [start, end]`, merge all overlapping intervals.
* **Optimal Logic:**
  - Sort intervals primarily by `start` time ascending.
  - Iterate through sorted intervals:
    - If `result` is empty or current `interval.start > result.back().end`: push as a new non-overlapping interval.
    - Else: Overlap detected! Merge by setting `result.back().end = max(result.back().end, interval.end)`.
* **Complexity:** Time: $O(N \log N)$ | Space: $O(N)$

```cpp
#include <vector>
#include <algorithm>
using namespace std;

vector<vector<int>> merge(vector<vector<int>>& intervals) {
    if (intervals.empty()) return {};
    sort(intervals.begin(), intervals.end());
    vector<vector<int>> merged;
    for (const auto& interval : intervals) {
        if (merged.empty() || merged.back()[1] < interval[0]) {
            merged.push_back(interval);
        } else {
            merged.back()[1] = max(merged.back()[1], interval[1]);
        }
    }
    return merged;
}
```

---

### 11. Longest Consecutive Sequence (`code24`)
* **Difficulty:** Medium | **Tags:** `Hash Set`, `Array Invariants`
* **Direct Link:** [LeetCode 128](https://leetcode.com/problems/longest-consecutive-sequence/)
* **Problem Statement:** Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence in $O(N)$ time.
* **Optimal Logic:**
  - Insert all elements into an `unordered_set`.
  - Iterate through set:
    - Check if `num - 1` exists in set. If it does, `num` is **NOT the start** of a streak; skip it!
    - If `num - 1` does not exist, `num` is the start of a streak. Loop `curr = num + 1` while present in set, counting streak length.
  - Because each number is visited at most twice across all checks, runtime is strictly linear $O(N)$.
* **Complexity:** Time: $O(N)$ | Space: $O(N)$

---

## 🔍 Category 4: Binary Search & Sorting

### 12. Search in Rotated Sorted Array (`code22`)
* **Difficulty:** Medium | **Tags:** `Binary Search`, `Arrays`
* **Direct Link:** [LeetCode 33](https://leetcode.com/problems/search-in-rotated-sorted-array/)
* **Problem Statement:** An integer array sorted in ascending order with distinct values is rotated at an unknown pivot index. Given `target`, return its index or `-1` in $O(\log N)$ time.
* **Optimal Logic:**
  - Calculate `mid = left + (right - left) / 2`.
  - At least one half (`[left..mid]` or `[mid..right]`) is **guaranteed to be normally sorted**:
    - **Case 1: Left half is sorted (`nums[left] <= nums[mid]`):**
      - If `nums[left] <= target && target < nums[mid]`, search left (`right = mid - 1`); else search right (`left = mid + 1`).
    - **Case 2: Right half is sorted (`nums[mid] < nums[left]`):**
      - If `nums[mid] < target && target <= nums[right]`, search right (`left = mid + 1`); else search left (`right = mid - 1`).
* **Complexity:** Time: $O(\log N)$ | Space: $O(1)$

```java
public class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            
            if (nums[left] <= nums[mid]) {
                if (nums[left] <= target && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                if (nums[mid] < target && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return -1;
    }
}
```

---

### 13. Koko Eating Bananas (`code16`)
* **Difficulty:** Medium | **Tags:** `Binary Search on Answer`
* **Direct Link:** [LeetCode 875](https://leetcode.com/problems/koko-eating-bananas/)
* **Problem Statement:** Koko loves to eat bananas. There are $n$ piles of bananas with `piles[i]` bananas. The guards will return in $h$ hours. Determine the minimum integer speed $k$ (bananas/hour) such that Koko can eat all the bananas within $h$ hours.
* **Optimal Logic:**
  - Search range for speed $k$: `low = 1`, `high = max(piles)`.
  - For a given speed $m$, hours needed is $\sum \lceil \text{pile} / m \rceil = \sum (\text{pile} + m - 1) / m$.
  - If total hours $\le h$, speed $m$ is feasible $\implies$ record answer, try slower speed `high = m - 1`.
  - Else speed $m$ is too slow $\implies$ `low = m + 1`.
* **Complexity:** Time: $O(N \log(\max(P)))$ | Space: $O(1)$

---

## 🔢 Category 5: Bit Manipulation & Number Theory

### 14. Sum of Primes in Range (`code9`)
* **Difficulty:** Easy | **Tags:** `Math`, `Sieve of Eratosthenes`
* **Direct Link:** [GeeksforGeeks Sieve of Eratosthenes](https://www.geeksforgeeks.org/sieve-of-eratosthenes/)
* **Problem Statement:** Given two integers `L` and `R`, find the sum of all prime numbers in the inclusive range $[L, R]$.
* **Optimal Logic:**
  - Precompute primes up to $R$ using Sieve of Eratosthenes in $O(R \log \log R)$.
  - Accumulate sum of primes whose index $\ge L$.
* **Complexity:** Time: $O(R \log \log R)$ | Space: $O(R)$ boolean array.

```cpp
#include <iostream>
#include <vector>
using namespace std;

long long sumPrimesInRange(int L, int R) {
    if (R < 2) return 0;
    vector<bool> isPrime(R + 1, true);
    isPrime[0] = isPrime[1] = false;
    for (int p = 2; p * p <= R; ++p) {
        if (isPrime[p]) {
            for (int i = p * p; i <= R; i += p) {
                isPrime[i] = false;
            }
        }
    }
    long long sum = 0;
    int start = max(L, 2);
    for (int i = start; i <= R; ++i) {
        if (isPrime[i]) sum += i;
    }
    return sum;
}
```

---

### 15. Sum of Values at Indices With K Set Bits (`code27`)
* **Difficulty:** Easy | **Tags:** `Arrays`, `Bit Manipulation`
* **Direct Link:** [LeetCode 2859](https://leetcode.com/problems/sum-of-values-at-indices-with-k-set-bits/)
* **Problem Statement:** Given a 0-indexed integer array `nums` and an integer `k`, return the sum of elements at indices whose binary representation contains exactly `k` set bits.
* **Optimal Code:** Use compiler intrinsic `__builtin_popcount(i)` in C++ or `Integer.bitCount(i)` in Java.
* **Complexity:** Time: $O(N)$ | Space: $O(1)$

```cpp
int sumIndicesWithKSetBits(const vector<int>& nums, int k) {
    int total = 0;
    for (int i = 0; i < (int)nums.size(); ++i) {
        if (__builtin_popcount(i) == k) {
            total += nums[i];
        }
    }
    return total;
}
```

---

## 🔗 Category 6: Linked Lists & Matrix Traversal

### 16. Linked List Cycle Detection (`code41`)
* **Difficulty:** Easy | **Tags:** `Linked List`, `Floyd's Cycle Algorithm`
* **Direct Link:** [LeetCode 141](https://leetcode.com/problems/linked-list-cycle/)
* **Problem Statement:** Given `head`, the head of a linked list, determine if the linked list has a cycle in it.
* **Optimal Logic:**
  - Initialize two pointers `slow = head`, `fast = head`.
  - Advance `slow` by 1 step, `fast` by 2 steps.
  - If `fast == slow`, a cycle exists. If `fast == NULL || fast->next == NULL`, list terminates without cycle.
* **Complexity:** Time: $O(N)$ | Space: $O(1)$

---

### 17. Spiral Matrix (`code44`)
* **Difficulty:** Medium | **Tags:** `Matrix`, `Simulation`
* **Direct Link:** [LeetCode 54](https://leetcode.com/problems/spiral-matrix/)
* **Problem Statement:** Given an $M \times N$ matrix, return all elements in clockwise spiral order.
* **Optimal Logic:**
  - Maintain 4 boundaries: `top = 0`, `bottom = m - 1`, `left = 0`, `right = n - 1`.
  - While `top <= bottom && left <= right`:
    1. Traverse left $\to$ right along `top`, then `top++`.
    2. Traverse top $\to$ bottom along `right`, then `right--`.
    3. If `top <= bottom`: traverse right $\to$ left along `bottom`, then `bottom--`.
    4. If `left <= right`: traverse bottom $\to$ top along `left`, then `left++`.
* **Complexity:** Time: $O(M \cdot N)$ | Space: $O(1)$ auxiliary.

---

## 🌲 Category 7: Heaps & Hash Maps

### 18. Top K Frequent Elements (`code21`)
* **Difficulty:** Medium | **Tags:** `Hash Map`, `Bucket Sort`, `Heap`
* **Direct Link:** [LeetCode 347](https://leetcode.com/problems/top-k-frequent-elements/)
* **Problem Statement:** Given an integer array `nums` and an integer `k`, return the `k` most frequent elements in any order.
* **Optimal Bucket Sort Approach ($O(N)$ time):**
  - Count frequencies with hash map: `num -> freq`.
  - Create array of buckets where index is frequency (size $N+1$).
  - Iterate buckets from $N$ down to 0, gathering elements until $k$ elements are found.
* **Complexity:** Time: $O(N)$ | Space: $O(N)$

---

### 19. Kth Largest Element in an Array (`code40`)
* **Difficulty:** Medium | **Tags:** `Quickselect`, `Min-Heap`
* **Direct Link:** [LeetCode 215](https://leetcode.com/problems/kth-largest-element-in-an-array/)
* **Problem Statement:** Given an integer array `nums` and an integer `k`, return the `k`th largest element without sorting.
* **Optimal Approach 1 (Min-Heap):** Maintain a min-heap of size $k$. For each element, push and pop if size $> k$. Root holds $k$th largest. Time: $O(N \log K)$, Space: $O(K)$.
* **Optimal Approach 2 (Quickselect):** Partition array around pivot like Quicksort, recursing only into the partition containing index $N - k$. Average Time: $O(N)$, Worst: $O(N^2)$, Space: $O(1)$.

---

## 🧩 Category 8: Dynamic Programming & Backtracking

### 20. Longest Increasing Subsequence (`code30`)
* **Difficulty:** Medium | **Tags:** `Dynamic Programming`, `Patience Sorting`, `Binary Search`
* **Direct Link:** [LeetCode 300](https://leetcode.com/problems/longest-increasing-subsequence/)
* **Problem Statement:** Given an integer array `nums`, return the length of the longest strictly increasing subsequence.
* **Optimal Patience Sorting ($O(N \log N)$):**
  - Maintain array `tails` where `tails[i]` stores the smallest tail of all increasing subsequences of length $i+1$.
  - For each `x` in `nums`:
    - Binary search (`lower_bound`) for `x` in `tails`.
    - If `x` is larger than all elements in `tails`, append it (`tails.push_back(x)`).
    - Else replace the first element $\ge x$ with `x`.
  - Length of `tails` is the answer.
* **Complexity:** Time: $O(N \log N)$ | Space: $O(N)$

```cpp
#include <vector>
#include <algorithm>
using namespace std;

int lengthOfLIS(const vector<int>& nums) {
    vector<int> tails;
    for (int x : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) {
            tails.push_back(x);
        } else {
            *it = x;
        }
    }
    return tails.size();
}
```

---

### 21. Word Break (`code42`)
* **Difficulty:** Medium | **Tags:** `Dynamic Programming`, `Hash Set`
* **Direct Link:** [LeetCode 139](https://leetcode.com/problems/word-break/)
* **Problem Statement:** Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.
* **Optimal 1D DP Logic:**
  - Let `dp[i]` be boolean: whether prefix `s[0..i-1]` can be segmented. `dp[0] = true`.
  - For $i = 1 \dots n$:
    - For $j = 0 \dots i-1$:
      - If `dp[j] && wordSet.count(s.substr(j, i - j))`:
        - `dp[i] = true; break;`
* **Complexity:** Time: $O(N^2 \cdot L)$ where $L$ is max word length | Space: $O(N)$

---

## 🛠️ Ready-to-Use Boilerplate Templates

### C++ Fast I/O Boilerplate for Accenture
```cpp
#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
#include <cmath>

using namespace std;

void fastIO() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
}

int main() {
    fastIO();
    int n;
    if (cin >> n) {
        vector<int> arr(n);
        for (int i = 0; i < n; ++i) cin >> arr[i];
        
        // Solution execution
        // Example: cout << result << "\n";
    }
    return 0;
}
```

### Java Fast I/O Template
```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    static class FastScanner {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer("");
        String next() {
            while (!st.hasMoreTokens()) {
                try {
                    String line = br.readLine();
                    if (line == null) return null;
                    st = new StringTokenizer(line);
                } catch (IOException e) {
                    return null;
                }
            }
            return st.nextToken();
        }
        int nextInt() { return Integer.parseInt(next()); }
    }

    public static void main(String[] args) {
        FastScanner fs = new FastScanner();
        String token = fs.next();
        if (token != null) {
            int n = Integer.parseInt(token);
            int[] arr = new int[n];
            for (int i = 0; i < n; i++) arr[i] = fs.nextInt();
            // Solution logic
        }
    }
}
```

### Python 3 Fast Input Template
```python
import sys

def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    
    n = int(input_data[0])
    arr = [int(x) for x in input_data[1:n+1]]
    
    # Process problem
    # print(result)

if __name__ == '__main__':
    main()
```

---

> 🚀 **Next Steps for Accenture Success:**  
> • Review classic memory-based problems in [Accenture PYQs (`pyq.md`)](./pyq.md)  
> • Practice core assessment modules in [Accenture Coding Concepts (`README.md`)](./README.md)  
> • Review Technical & Pseudocode MCQs in [Accenture Technical Module](../03_Technical_MCQ/README.md)
