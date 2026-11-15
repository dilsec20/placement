# 💻 Stage 1 — POD.AI Coding Test Mastery (100 Minutes)

> **Platform:** POD.AI (Proctored Environment — Web Cam + Full-screen lockdown)  
> **Duration:** 100 Minutes | **Difficulty:** Very High (Upper Medium to Hard)  
> **Format:** 3–4 Coding Problems + High-Yield Core CS MCQs  
> **Elimination Target:** Score **>85% to 100% test cases** to qualify for the afternoon Buildathon.

---

## 📋 The 100-Minute Time Management Strategy

```
[00:00 - 00:05] Scan all problems. Identify the easiest problem (Warm-up).
[00:05 - 00:25] Solve Problem 1 (Easy/Medium) — Aim for 100% test cases in 20 mins.
[00:25 - 00:55] Solve Problem 2 (Medium/Hard) — Core algorithmic logic (DP / Sliding Window).
[00:55 - 01:30] Solve Problem 3 (Hard) — Graphs / Monotonic Stack / Trie.
[01:30 - 01:40] Review edge cases, 64-bit integer overflow, fast I/O, submit all solutions.
```

---

# 🔥 Real ACKO Coding Problems in C++ (Reported in Previous Drives)

---

### Problem 1: 3Sum — Unique Triplets Summing to Zero ⭐⭐

> **Reported By:** Multiple ACKO SDE Intern candidates.  
> **Pattern:** Two Pointers + Sorting + Duplicate Elimination.  
> **Constraint:** $N \le 3000$, $-10^5 \le nums[i] \le 10^5$. Target Time: $O(N^2)$, Space: $O(1)$ auxiliary.

```cpp
#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> threeSum(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> result;
    int n = nums.size();
    
    for (int i = 0; i < n - 2; i++) {
        // Optimization: Smallest element > 0 means sum cannot be 0
        if (nums[i] > 0) break;
        
        // Skip duplicate base element
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        
        int left = i + 1, right = n - 1;
        while (left < right) {
            long long sum = (long long)nums[i] + nums[left] + nums[right];
            if (sum == 0) {
                result.push_back({nums[i], nums[left], nums[right]});
                
                // Skip duplicate left and right elements
                while (left < right && nums[left] == nums[left + 1]) left++;
                while (left < right && nums[right] == nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return result;
}

// Time Complexity: O(N^2) | Space Complexity: O(1) auxiliary (ignoring output)
```
* **Hidden Traps:**
  * Failing to skip duplicate elements leads to duplicate triplets in output.
  * Adding large negative/positive integers could overflow 32-bit signed int; use `long long` for sum accumulation.

---

### Problem 2: House Robber II (Circular Dynamic Programming) ⭐⭐

> **Reported By:** ACKO Technical Interview & Assessment candidate.  
> **Pattern:** State Machine DP / Circular Decomposition.  
> **Constraint:** $N \le 10^5$, $0 \le nums[i] \le 10^4$. Time: $O(N)$, Space: $O(1)$.

```cpp
#include <bits/stdc++.h>
using namespace std;

int robLinear(const vector<int>& nums, int start, int end) {
    int prev2 = 0, prev1 = 0;
    for (int i = start; i <= end; i++) {
        int curr = max(prev1, prev2 + nums[i]);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

int rob(vector<int>& nums) {
    int n = nums.size();
    if (n == 0) return 0;
    if (n == 1) return nums[0];
    if (n == 2) return max(nums[0], nums[1]);
    
    // Circular trap: House 0 and House n-1 are neighbors.
    // Case 1: Rob from house 0 to n-2 (exclude last house)
    // Case 2: Rob from house 1 to n-1 (exclude first house)
    return max(robLinear(nums, 0, n - 2), robLinear(nums, 1, n - 1));
}

// Time Complexity: O(N) | Space Complexity: O(1)
```

---

### Problem 3: Frog Jump (LeetCode 403 Hard) ⭐⭐⭐

> **Reported By:** ACKO CP assessment candidate on GeeksforGeeks.  
> **Pattern:** DP with Hash Table / Reachability State.  
> **Problem:** A frog is crossing a river with stones at given sorted positions. If frog's last jump was $k$ units, its next jump must be $k-1, k,$ or $k+1$ units. First jump from stone 0 to stone 1 must be exactly 1 unit. Can it reach the last stone?

```cpp
#include <bits/stdc++.h>
using namespace std;

bool canCross(vector<int>& stones) {
    int n = stones.size();
    // stones[1] must be at position 1 (first jump is exactly 1)
    if (stones[1] != 1) return false;
    
    // Map: stone position -> set of valid jump distances that reached this stone
    unordered_map<int, unordered_set<int>> dp;
    for (int s : stones) dp[s] = unordered_set<int>();
    
    dp[1].insert(1); // At stone 1, jump made was 1
    
    for (int i = 1; i < n; i++) {
        int pos = stones[i];
        for (int k : dp[pos]) {
            // Next possible jumps: k - 1, k, k + 1
            for (int step = k - 1; step <= k + 1; step++) {
                if (step > 0 && dp.count(pos + step)) {
                    dp[pos + step].insert(step);
                }
            }
        }
    }
    
    return !dp[stones.back()].empty();
}

// Time Complexity: O(N * sqrt(N)) or O(N^2) | Space Complexity: O(N^2)
```

---

### Problem 4: Maximum XOR Score (Trie-Based Bit Manipulation) ⭐⭐⭐

> **Reported By:** ACKO online competitive coding test.  
> **Pattern:** Binary Prefix Trie (Bitwise 31 to 0).  
> **Problem:** Given an array of integers, find the maximum XOR of any two elements in $O(N)$ time.

```cpp
#include <bits/stdc++.h>
using namespace std;

class TrieNode {
public:
    TrieNode* children[2];
    TrieNode() {
        children[0] = nullptr;
        children[1] = nullptr;
    }
};

class Solution {
    TrieNode* root;
    
    void insert(int num) {
        TrieNode* curr = root;
        for (int i = 31; i >= 0; i--) {
            int bit = (num >> i) & 1;
            if (!curr->children[bit]) {
                curr->children[bit] = new TrieNode();
            }
            curr = curr->children[bit];
        }
    }
    
    int getMaxXOR(int num) {
        TrieNode* curr = root;
        int maxXor = 0;
        for (int i = 31; i >= 0; i--) {
            int bit = (num >> i) & 1;
            int oppositeBit = 1 - bit;
            
            // Greedily choose opposite bit to maximize XOR (1 ^ 0 = 1)
            if (curr->children[oppositeBit]) {
                maxXor |= (1 << i);
                curr = curr->children[oppositeBit];
            } else {
                curr = curr->children[bit];
            }
        }
        return maxXor;
    }
    
public:
    int findMaximumXOR(vector<int>& nums) {
        root = new TrieNode();
        for (int x : nums) insert(x);
        
        int ans = 0;
        for (int x : nums) {
            ans = max(ans, getMaxXOR(x));
        }
        return ans;
    }
};

// Time Complexity: O(32 * N) = O(N) | Space Complexity: O(32 * N) = O(N)
```

---

### Problem 5: Word Search on 2D Board (Backtracking + DFS) ⭐⭐

> **Reported By:** ACKO SDE Interview Round 1.  
> **Pattern:** 2D Grid DFS with In-Place Visited Masking.

```cpp
#include <bits/stdc++.h>
using namespace std;

bool dfs(vector<vector<char>>& board, const string& word, int r, int c, int idx) {
    if (idx == word.size()) return true;
    if (r < 0 || r >= board.size() || c < 0 || c >= board[0].size() || board[r][c] != word[idx]) {
        return false;
    }
    
    // Mark visited in-place
    char temp = board[r][c];
    board[r][c] = '#';
    
    int dr[] = {-1, 1, 0, 0};
    int dc[] = {0, 0, -1, 1};
    bool found = false;
    
    for (int d = 0; d < 4; d++) {
        if (dfs(board, word, r + dr[d], c + dc[d], idx + 1)) {
            found = true;
            break;
        }
    }
    
    // Backtrack restore
    board[r][c] = temp;
    return found;
}

bool exist(vector<vector<char>>& board, string word) {
    int rows = board.size(), cols = board[0].size();
    
    // Frequency pruning optimization
    unordered_map<char, int> countBoard, countWord;
    for (auto& row : board) for (char ch : row) countBoard[ch]++;
    for (char ch : word) countWord[ch]++;
    for (auto& [ch, cnt] : countWord) {
        if (countBoard[ch] < cnt) return false;
    }
    
    // Reverse word if frequency of first character > frequency of last character
    if (countBoard[word[0]] > countBoard[word.back()]) {
        reverse(word.begin(), word.end());
    }
    
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (board[r][c] == word[0] && dfs(board, word, r, c, 0)) {
                return true;
            }
        }
    }
    return false;
}
```

---

### Problem 6: Count Subarrays with Exactly K Distinct Elements ⭐⭐⭐

> **Reported By:** ACKO online assessment.  
> **Pattern:** Sliding Window Identity: `Exactly(K) = AtMost(K) - AtMost(K - 1)`.

```cpp
#include <bits/stdc++.h>
using namespace std;

// Helper: Count subarrays with AT MOST k distinct integers
int atMostK(const vector<int>& nums, int k) {
    if (k < 0) return 0;
    unordered_map<int, int> freq;
    int left = 0, count = 0;
    
    for (int right = 0; right < nums.size(); right++) {
        if (freq[nums[right]] == 0) k--;
        freq[nums[right]]++;
        
        while (k < 0) {
            freq[nums[left]]--;
            if (freq[nums[left]] == 0) k++;
            left++;
        }
        
        count += (right - left + 1);
    }
    return count;
}

int subarraysWithKDistinct(vector<int>& nums, int k) {
    return atMostK(nums, k) - atMostK(nums, k - 1);
}

// Time Complexity: O(N) | Space Complexity: O(N)
```

---

### Problem 7: Merge K Sorted Arrays / Linked Lists ⭐⭐

> **Pattern:** Priority Queue (Min-Heap).

```cpp
#include <bits/stdc++.h>
using namespace std;

struct Element {
    int val, row, col;
    bool operator>(const Element& other) const {
        return val > other.val;
    }
};

vector<int> mergeKSortedArrays(vector<vector<int>>& arrays) {
    priority_queue<Element, vector<Element>, greater<Element>> minHeap;
    
    for (int i = 0; i < arrays.size(); i++) {
        if (!arrays[i].empty()) {
            minHeap.push({arrays[i][0], i, 0});
        }
    }
    
    vector<int> result;
    while (!minHeap.empty()) {
        auto [val, r, c] = minHeap.top();
        minHeap.pop();
        result.push_back(val);
        
        if (c + 1 < arrays[r].size()) {
            minHeap.push({arrays[r][c + 1], r, c + 1});
        }
    }
    return result;
}

// Time Complexity: O(N * K log K) | Space Complexity: O(K)
```

---

### Problem 8: Minimum Increments to Make Array Strictly Increasing ⭐

> **Reported By:** ACKO online assessment.

```cpp
#include <bits/stdc++.h>
using namespace std;

int minIncrementForUnique(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    int moves = 0;
    for (int i = 1; i < nums.size(); i++) {
        if (nums[i] <= nums[i - 1]) {
            int needed = nums[i - 1] + 1;
            moves += (needed - nums[i]);
            nums[i] = needed;
        }
    }
    return moves;
}

// Time Complexity: O(N log N) | Space Complexity: O(1)
```

---

# 🧠 Core CS MCQs Likely on POD.AI (20 High-Yield Questions)

#### Q1. When a C++ process invokes `fork()`, what mechanism prevents physical copying of page frames until a write occurs?
* (A) Demand Paging
* (B) Copy-on-Write (CoW)
* (C) Swapping
* (D) Address Translation Cache
* **Answer:** **(B)** Copy-on-Write marks the memory pages as read-only. Only when either the parent or child attempts to modify a page is a physical copy instantiated.

#### Q2. In TCP, what purpose does the `TIME_WAIT` state serve after sending the final ACK in a 4-way teardown?
* (A) To renegotiate window size
* (B) To allow stale duplicate packets from the connection to expire in the network and ensure the remote host received the final ACK
* (C) To compress payload headers
* (D) To encrypt the termination packet
* **Answer:** **(B)** `TIME_WAIT` lasts for $2 \times \text{MSL}$ (Maximum Segment Lifetime), ensuring delayed packets don't corrupt a subsequent new connection on the same port.

#### Q3. Which SQL Isolation Level prevents Dirty Reads and Non-Repeatable Reads, but allows Phantom Reads?
* (A) Read Uncommitted
* (B) Read Committed
* (C) Repeatable Read
* (D) Serializable
* **Answer:** **(C)** Repeatable Read locks individual rows, but not table ranges.

#### Q4. In a modern Linux kernel, what is the default scheduling algorithm for normal non-real-time user processes?
* (A) Round Robin
* (B) Completely Fair Scheduler (CFS) using red-black trees
* (C) Shortest Remaining Time First
* (D) Priority Preemptive Scheduling
* **Answer:** **(B)** CFS tracks `vruntime` (virtual runtime) and picks the thread with lowest `vruntime` using a self-balancing Red-Black Tree in $O(\log N)$.

#### Q5. What is the fundamental difference between a Process and a Thread?
* **Answer:** Processes have separate independent virtual address spaces and file descriptor tables; Threads of the same process share the same address space, heap, and open file descriptors, but maintain separate stacks and CPU registers.

---

> **Next Step:** Proceed to [02_Buildathon_AI_Native_Engineering.md](./02_Buildathon_AI_Native_Engineering.md) to master the 5–6 hour Hackathon!
