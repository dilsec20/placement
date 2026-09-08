# 🤖 Stage 4 — AI-Assisted Coding

> **Type:** Coding Round (possibly AI-integrated) | **Questions:** 2 | **Time:** ~45 mins  
> **For ₹13-16 LPA:** Medium-Hard problems expected. You must VERIFY & DEBUG AI output, not blindly accept it.

---

## 📋 What's Tested

```
This is NOT just "code with ChatGPT". Capgemini tests:
1. Can you DIRECT AI with effective prompts?
2. Can you VERIFY AI-generated code for correctness?
3. Can you DEBUG and FIX AI output?
4. Can you handle EDGE CASES the AI misses?
5. Do you UNDERSTAND the code (not just copy-paste)?

CRITICAL: Only use AI tools if the assessment platform EXPLICITLY provides them.
          Do NOT open external AI tools — the exam is PROCTORED.
```

---

## 🎯 Most Asked Coding Topics (Based on PYQs)

| Priority | Topic | Frequency |
|----------|-------|-----------|
| ⭐⭐⭐ | Arrays (search, sort, manipulate) | Very High |
| ⭐⭐⭐ | Strings (manipulation, patterns) | Very High |
| ⭐⭐ | Math (primes, GCD, Fibonacci) | High |
| ⭐⭐ | Two Pointers / Sliding Window | High |
| ⭐ | Hashing (frequency, duplicates) | Medium |
| ⭐ | Basic DP (Fibonacci, Climbing Stairs) | Medium |
| ⭐ | Recursion | Medium |

---

## 🔥 Coding Problems — C++ (Difficulty: Medium-Hard)

### Problem 1: Two Sum — Return Indices ⭐

```cpp
#include <bits/stdc++.h>
using namespace std;

vector<int> twoSum(vector<int>& arr, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < arr.size(); i++) {
        int complement = target - arr[i];
        if (seen.count(complement))
            return {seen[complement], i};
        seen[arr[i]] = i;
    }
    return {-1, -1};
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, target;
    cin >> n >> target;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    auto res = twoSum(arr, target);
    cout << res[0] << " " << res[1] << "\n";
    return 0;
}
// Time: O(n) | Space: O(n)
```

---

### Problem 2: Longest Substring Without Repeating Characters ⭐⭐

```cpp
int lengthOfLongestSubstring(string s) {
    unordered_set<char> window;
    int maxLen = 0, left = 0;
    for (int right = 0; right < s.size(); right++) {
        while (window.count(s[right])) {
            window.erase(s[left]);
            left++;
        }
        window.insert(s[right]);
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}
// "abcabcbb" → 3 ("abc")
// "bbbbb" → 1
// Time: O(n) | Sliding Window
```

---

### Problem 3: Maximum Subarray Sum (Kadane's) ⭐

```cpp
long long maxSubarraySum(vector<int>& arr) {
    long long maxSum = arr[0], currSum = arr[0];
    for (int i = 1; i < arr.size(); i++) {
        currSum = max((long long)arr[i], currSum + arr[i]);
        maxSum = max(maxSum, currSum);
    }
    return maxSum;
}
// [-2,1,-3,4,-1,2,1,-5,4] → 6 ([4,-1,2,1])
```

---

### Problem 4: Sort Array by Frequency ⭐⭐

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    unordered_map<int, int> freq;
    unordered_map<int, int> firstIdx;
    
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
        freq[arr[i]]++;
        if (!firstIdx.count(arr[i])) firstIdx[arr[i]] = i;
    }
    
    sort(arr.begin(), arr.end(), [&](int a, int b) {
        if (freq[a] != freq[b]) return freq[a] > freq[b];
        return firstIdx[a] < firstIdx[b];  // Maintain first occurrence order
    });
    
    for (int x : arr) cout << x << " ";
    cout << "\n";
    return 0;
}
// Input: [2,3,2,4,5,12,2,3,3,3,12]
// Output: [3,3,3,3,2,2,2,12,12,4,5]
```

---

### Problem 5: Find Missing Number in 1..N (XOR Method) ⭐

```cpp
int findMissing(vector<int>& arr, int n) {
    int xorAll = 0, xorArr = 0;
    for (int i = 1; i <= n; i++) xorAll ^= i;
    for (int x : arr) xorArr ^= x;
    return xorAll ^ xorArr;
}
// arr = [1,2,4,5,6], n=6 → Missing: 3
```

---

### Problem 6: Rotate Array by K Positions ⭐

```cpp
void rotateRight(vector<int>& arr, int k) {
    int n = arr.size();
    k %= n;
    reverse(arr.begin(), arr.end());
    reverse(arr.begin(), arr.begin() + k);
    reverse(arr.begin() + k, arr.end());
}
// [1,2,3,4,5], k=2 → [4,5,1,2,3]
// Time: O(n) | Space: O(1)
```

---

### Problem 7: Check if Two Strings are Anagrams ⭐

```cpp
bool isAnagram(string s1, string s2) {
    if (s1.size() != s2.size()) return false;
    int freq[26] = {0};
    for (char c : s1) freq[c - 'a']++;
    for (char c : s2) freq[c - 'a']--;
    for (int f : freq) if (f != 0) return false;
    return true;
}
```

---

### Problem 8: Longest Common Prefix ⭐⭐

```cpp
string longestCommonPrefix(vector<string>& strs) {
    if (strs.empty()) return "";
    string prefix = strs[0];
    for (int i = 1; i < strs.size(); i++) {
        while (strs[i].find(prefix) != 0) {
            prefix = prefix.substr(0, prefix.size() - 1);
            if (prefix.empty()) return "";
        }
    }
    return prefix;
}
// ["flower","flow","flight"] → "fl"
```

---

### Problem 9: Container with Most Water ⭐⭐

```cpp
int maxArea(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int maxWater = 0;
    while (left < right) {
        int water = min(height[left], height[right]) * (right - left);
        maxWater = max(maxWater, water);
        if (height[left] < height[right]) left++;
        else right--;
    }
    return maxWater;
}
// Two-pointer technique | O(n) time
```

---

### Problem 10: Best Time to Buy and Sell Stock ⭐

```cpp
int maxProfit(vector<int>& prices) {
    int minPrice = INT_MAX, maxProfit = 0;
    for (int price : prices) {
        minPrice = min(minPrice, price);
        maxProfit = max(maxProfit, price - minPrice);
    }
    return maxProfit;
}
// [7,1,5,3,6,4] → 5 (buy at 1, sell at 6)
```

---

### Problem 11: Merge Intervals ⭐⭐

```cpp
vector<vector<int>> merge(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end());
    vector<vector<int>> merged;
    for (auto& interval : intervals) {
        if (merged.empty() || merged.back()[1] < interval[0]) {
            merged.push_back(interval);
        } else {
            merged.back()[1] = max(merged.back()[1], interval[1]);
        }
    }
    return merged;
}
// [[1,3],[2,6],[8,10],[15,18]] → [[1,6],[8,10],[15,18]]
```

---

### Problem 12: Valid Parentheses ⭐

```cpp
bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') st.push(c);
        else {
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
```

---

### Problem 13: Product of Array Except Self ⭐⭐

```cpp
vector<int> productExceptSelf(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, 1);
    
    // Left pass
    int leftProd = 1;
    for (int i = 0; i < n; i++) {
        result[i] = leftProd;
        leftProd *= nums[i];
    }
    
    // Right pass
    int rightProd = 1;
    for (int i = n - 1; i >= 0; i--) {
        result[i] *= rightProd;
        rightProd *= nums[i];
    }
    return result;
}
// [1,2,3,4] → [24,12,8,6] | O(n) time, O(1) extra space
```

---

### Problem 14: Find All Primes up to N (Sieve) ⭐

```cpp
vector<int> sieve(int n) {
    vector<bool> is_prime(n + 1, true);
    is_prime[0] = is_prime[1] = false;
    for (int i = 2; i * i <= n; i++)
        if (is_prime[i])
            for (int j = i * i; j <= n; j += i)
                is_prime[j] = false;
    
    vector<int> primes;
    for (int i = 2; i <= n; i++)
        if (is_prime[i]) primes.push_back(i);
    return primes;
}
```

---

### Problem 15: Spiral Matrix Traversal ⭐⭐

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
        if (top <= bottom)
            for (int j = right; j >= left; j--) result.push_back(matrix[bottom][j]);
        bottom--;
        if (left <= right)
            for (int i = bottom; i >= top; i--) result.push_back(matrix[i][left]);
        left++;
    }
    return result;
}
```

---

## 🧩 How to Use AI Effectively in Coding

### If AI tools are provided in the assessment:

```
1. UNDERSTAND the problem first (don't jump to AI)
2. Write your APPROACH in comments before coding
3. Use AI for BOILERPLATE (input parsing, output formatting)
4. ALWAYS review AI-generated code for:
   - Edge cases (empty input, single element, negative numbers)
   - Correctness of logic
   - Time/space complexity
5. TEST with sample inputs before submitting
6. If AI gives wrong code, FIX IT yourself
```

### Effective Prompt Template for Coding

```
"Write a C++ function that:
- Takes: [input description]
- Returns: [output description]
- Handles edge cases: [list edge cases]
- Time complexity should be: O(n) or better
- Use the following approach: [your approach]
Include comments explaining the logic."
```

---

## 📊 Top 20 LeetCode Problems to Practice

| # | Problem | Difficulty | Pattern |
|---|---------|-----------|---------|
| 1 | Two Sum | Easy | HashMap |
| 2 | Best Time to Buy/Sell Stock | Easy | Greedy |
| 3 | Valid Parentheses | Easy | Stack |
| 4 | Merge Two Sorted Lists | Easy | Two Pointers |
| 5 | Maximum Subarray (Kadane's) | Medium | DP/Greedy |
| 6 | 3Sum | Medium | Two Pointers |
| 7 | Container With Most Water | Medium | Two Pointers |
| 8 | Longest Substring No Repeat | Medium | Sliding Window |
| 9 | Product of Array Except Self | Medium | Prefix/Suffix |
| 10 | Merge Intervals | Medium | Sort + Merge |
| 11 | Group Anagrams | Medium | Hashing |
| 12 | Sort Colors (Dutch Flag) | Medium | Three Pointers |
| 13 | Rotate Array | Medium | Reverse |
| 14 | Find Missing Number | Easy | XOR/Math |
| 15 | Spiral Matrix | Medium | Simulation |
| 16 | Next Permutation | Medium | Two Pointers |
| 17 | Jump Game | Medium | Greedy |
| 18 | Set Matrix Zeroes | Medium | In-place |
| 19 | Longest Common Prefix | Easy | String |
| 20 | Coin Change | Medium | DP |

---

> **Next:** [Stage 5 — Cognitive Assessment →](./05_Cognitive_Assessment.md) | **Back to** [Main](./README.md)
