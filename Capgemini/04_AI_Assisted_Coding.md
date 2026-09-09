# 🤖 Stage 4 — AI-Assisted Coding (₹13–16 LPA Root_Mind Tier)

> **Target Roles:** Alpha_Stack (₹13 LPA) | Root_Mind (₹16 LPA)  
> **Format:** 2 Complex Problems | **Time:** ~45 mins  
> **Cutoff for ₹13–16 LPA:** Must pass **100% of public AND private test cases**. Partial marks are insufficient for Root_Mind shortlisting.

---

## 📋 What Makes "AI-Assisted" Coding Harder, Not Easier

Many candidates assume AI makes this round easy. In reality:
1. **The Assessment System Logs Your Prompts:** The platform (e.g., HackerRank Copilot / Mercer Mettl AI mode) tracks prompt specificity, prompt count, and diffs between AI suggestions and your submitted code.
2. **Hidden Test Cases Have Strict Time Limits ($1.0\text{s}$ for $N = 10^5$):** Naive prompts make AI generate $O(N^2)$ brute force or poorly memoized recursion, resulting in **Time Limit Exceeded (TLE)** on 60% of hidden test cases.
3. **AI Frequently Misses Edge Cases:** AI code often misses negative numbers, empty arrays, integer overflows on intermediate sums, or disconnected graph components.
4. **Blind Copy-Pasting Disqualifies You in Technical Interviews:** In Stage 6, the interviewer will ask you to walk through the exact space/time trade-offs and invariants of the code you submitted in Stage 4.

---

## 🎯 The 4 Golden Prompting Templates for Coding Rounds

### Template 1: The Constraint & Complexity Enforcer (Initial Solution)
```text
"Write an optimal C++17 solution for the following problem:
[Insert Problem Description]

Constraints:
- Array length N up to 2 * 10^5
- Values up to 10^9
- Time Limit: 1.0s (Requires O(N) or O(N log N) time complexity)
- Space Complexity: O(N) or better

Requirements:
1. Use fast I/O.
2. Use 'long long' to prevent 32-bit integer overflow.
3. Include explicit handling for edge cases: N = 1, all elements identical, negative inputs.
4. Provide only clean, production-ready code with concise comments explaining invariants."
```

### Template 2: The Complexity Optimizer (When AI code gives TLE)
```text
"The previous solution exceeds the 1.0s time limit on large test cases (N = 10^5).
Analyze the time complexity of the current approach:
[Paste current code snippet]

Identify the bottleneck (nested loops / recursion without memoization).
Rewrite this using [Two Pointers / Sliding Window / Monotonic Stack / Binary Search on Answer / Dynamic Programming] to achieve O(N log N) or O(N) time complexity."
```

### Template 3: The Edge-Case Stress Tester
```text
"Review this C++ solution against extreme edge cases:
[Paste code]

Check specifically for:
1. Empty input or single element (N = 0, N = 1).
2. Large values causing integer overflow in multiplication or summation.
3. Cyclic graph dependencies / disconnected components.
4. Negative numbers or zero.
List any failure points and provide the patched logic."
```

---

# 🔥 15 Root_Mind (16 LPA) Algorithmic Problems in C++

---

### Problem 1: 0/1 Knapsack (Space-Optimized $O(W)$ DP) ⭐⭐

**Problem:** Given weights `wt[]` and values `val[]` of $N$ items, find maximum value in knapsack of capacity $W$.

```cpp
#include <bits/stdc++.h>
using namespace std;

// Time: O(N * W) | Space: O(W) (1D DP Array)
int knapSack(int W, const vector<int>& wt, const vector<int>& val, int n) {
    vector<int> dp(W + 1, 0);
    for (int i = 0; i < n; i++) {
        // Traverse backwards so previous items are not used multiple times
        for (int w = W; w >= wt[i]; w--) {
            dp[w] = max(dp[w], val[i] + dp[w - wt[i]]);
        }
    }
    return dp[W];
}
```

---

### Problem 2: Coin Change II (Unique Combinations) ⭐⭐

**Problem:** Given infinite supply of coins, return number of combinations that make up target amount.

```cpp
// Time: O(N * amount) | Space: O(amount)
int change(int amount, vector<int>& coins) {
    vector<unsigned long long> dp(amount + 1, 0);
    dp[0] = 1; // Base case: 1 way to make 0
    
    // Outer loop over coins prevents counting permutations (e.g. 1+2 vs 2+1)
    for (int coin : coins) {
        for (int i = coin; i <= amount; i++) {
            dp[i] += dp[i - coin];
        }
    }
    return dp[amount];
}
```

---

### Problem 3: Longest Increasing Subsequence ($O(N \log N)$ Patience Sorting) ⭐⭐⭐

**Problem:** Find length of longest strictly increasing subsequence.

```cpp
// Time: O(N log N) | Space: O(N)
int lengthOfLIS(vector<int>& nums) {
    vector<int> tails;
    for (int x : nums) {
        // lower_bound finds first element >= x
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) {
            tails.push_back(x);
        } else {
            *it = x; // Overwrite with smaller end-element to leave room for future numbers
        }
    }
    return tails.size();
}
```

---

### Problem 4: Edit Distance (Levenshtein Distance) ⭐⭐⭐

**Problem:** Minimum operations (insert, delete, replace) to convert `word1` to `word2`.

```cpp
// Time: O(M * N) | Space: O(N)
int minDistance(string word1, string word2) {
    int m = word1.size(), n = word2.size();
    vector<int> prev(n + 1), curr(n + 1);
    
    for (int j = 0; j <= n; j++) prev[j] = j;
    
    for (int i = 1; i <= m; i++) {
        curr[0] = i;
        for (int j = 1; j <= n; j++) {
            if (word1[i - 1] == word2[j - 1]) {
                curr[j] = prev[j - 1];
            } else {
                curr[j] = 1 + min({prev[j],      // Delete
                                   curr[j - 1],   // Insert
                                   prev[j - 1]}); // Replace
            }
        }
        prev = curr;
    }
    return prev[n];
}
```

---

### Problem 5: Course Schedule II (Topological Sort / Kahn's BFS) ⭐⭐⭐

**Problem:** Return valid ordering of courses given prerequisite graph, or empty if cyclic.

```cpp
// Time: O(V + E) | Space: O(V + E)
vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
    vector<vector<int>> adj(numCourses);
    vector<int> inDegree(numCourses, 0);
    
    for (auto& pre : prerequisites) {
        adj[pre[1]].push_back(pre[0]);
        inDegree[pre[0]]++;
    }
    
    queue<int> q;
    for (int i = 0; i < numCourses; i++) {
        if (inDegree[i] == 0) q.push(i);
    }
    
    vector<int> order;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        order.push_back(u);
        for (int v : adj[u]) {
            if (--inDegree[v] == 0) {
                q.push(v);
            }
        }
    }
    
    if (order.size() != (size_t)numCourses) return {}; // Cycle detected
    return order;
}
```

---

### Problem 6: Dijkstra's Shortest Path with Min-Heap ⭐⭐⭐

**Problem:** Shortest path from source `src` to all nodes in weighted graph ($w \ge 0$).

```cpp
// Time: O(E log V) | Space: O(V + E)
vector<int> dijkstra(int n, vector<vector<pair<int, int>>>& adj, int src) {
    vector<int> dist(n, INT_MAX);
    // Min-heap: {distance, node}
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    
    dist[src] = 0;
    pq.push({0, src});
    
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue; // Stale heap entry
        
        for (auto& [v, weight] : adj[u]) {
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}
```

---

### Problem 7: Lowest Common Ancestor (LCA) in Binary Tree ⭐⭐

**Problem:** Find lowest common ancestor of two nodes $p$ and $q$ in a binary tree.

```cpp
struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

// Time: O(N) | Space: O(H)
TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (!root || root == p || root == q) return root;
    
    TreeNode* left = lowestCommonAncestor(root->left, p, q);
    TreeNode* right = lowestCommonAncestor(root->right, p, q);
    
    if (left && right) return root; // p and q are on opposite sides
    return left ? left : right;
}
```

---

### Problem 8: Binary Tree Maximum Path Sum ⭐⭐⭐

**Problem:** Find maximum path sum between any two nodes in a binary tree.

```cpp
// Time: O(N) | Space: O(H)
class Solution {
    int maxSum = INT_MIN;
    
    int maxGain(TreeNode* node) {
        if (!node) return 0;
        // Ignore negative path sums by taking max with 0
        int leftGain = max(0, maxGain(node->left));
        int rightGain = max(0, maxGain(node->right));
        
        // Path through current node as root
        int currentPath = node->val + leftGain + rightGain;
        maxSum = max(maxSum, currentPath);
        
        // Return maximum branch that can be extended upwards to parent
        return node->val + max(leftGain, rightGain);
    }
public:
    int maxPathSum(TreeNode* root) {
        maxGain(root);
        return maxSum;
    }
};
```

---

### Problem 9: Trapping Rain Water (Optimal Two Pointers) ⭐⭐⭐

**Problem:** Given elevation map array, compute how much water it can trap after raining.

```cpp
// Time: O(N) | Space: O(1)
int trap(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int leftMax = 0, rightMax = 0;
    int totalWater = 0;
    
    while (left < right) {
        if (height[left] <= height[right]) {
            if (height[left] >= leftMax) leftMax = height[left];
            else totalWater += leftMax - height[left];
            left++;
        } else {
            if (height[right] >= rightMax) rightMax = height[right];
            else totalWater += rightMax - height[right];
            right--;
        }
    }
    return totalWater;
}
```

---

### Problem 10: Sliding Window Maximum (Monotonic Deque) ⭐⭐⭐

**Problem:** Given array and window size $K$, return max value in each sliding window.

```cpp
// Time: O(N) | Space: O(K)
vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq; // Stores indices; values maintain strictly decreasing order
    vector<int> result;
    
    for (int i = 0; i < nums.size(); i++) {
        // Remove indices outside current sliding window
        if (!dq.empty() && dq.front() <= i - k) dq.pop_front();
        
        // Maintain decreasing order: pop elements smaller than nums[i]
        while (!dq.empty() && nums[dq.back()] <= nums[i]) {
            dq.pop_back();
        }
        
        dq.push_back(i);
        
        // First window ends at index k - 1
        if (i >= k - 1) {
            result.push_back(nums[dq.front()]);
        }
    }
    return result;
}
```

---

### Problem 11: Largest Rectangle in Histogram (Monotonic Stack) ⭐⭐⭐

**Problem:** Find area of largest rectangle in histogram bars.

```cpp
// Time: O(N) | Space: O(N)
int largestRectangleArea(vector<int>& heights) {
    heights.push_back(0); // Sentinel bar to flush remaining stack at end
    stack<int> st;
    int maxArea = 0;
    
    for (int i = 0; i < heights.size(); i++) {
        while (!st.empty() && heights[st.top()] > heights[i]) {
            int h = heights[st.top()]; st.pop();
            int w = st.empty() ? i : (i - st.top() - 1);
            maxArea = max(maxArea, h * w);
        }
        st.push(i);
    }
    return maxArea;
}
```

---

### Problem 12: Disjoint Set Union (DSU with Path Compression & Rank) ⭐⭐

**Problem:** Efficiently track connected components and cycle detection.

```cpp
class DSU {
    vector<int> parent, rank;
public:
    DSU(int n) {
        parent.resize(n);
        iota(parent.begin(), parent.end(), 0);
        rank.assign(n, 0);
    }
    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]); // Path compression
    }
    bool unite(int i, int j) {
        int rootI = find(i), rootJ = find(j);
        if (rootI == rootJ) return false; // Already in same set (Cycle!)
        if (rank[rootI] < rank[rootJ]) parent[rootI] = rootJ;
        else if (rank[rootI] > rank[rootJ]) parent[rootJ] = rootI;
        else { parent[rootJ] = rootI; rank[rootI]++; }
        return true;
    }
};
```

---

### Problem 13: Trie (Prefix Tree) Implementation ⭐⭐

**Problem:** Implement Trie supporting `insert`, `search`, and `startsWith`.

```cpp
class Trie {
    struct TrieNode {
        TrieNode* children[26] = {nullptr};
        bool isEnd = false;
    };
    TrieNode* root;
public:
    Trie() { root = new TrieNode(); }
    
    void insert(const string& word) {
        TrieNode* curr = root;
        for (char c : word) {
            int idx = c - 'a';
            if (!curr->children[idx]) curr->children[idx] = new TrieNode();
            curr = curr->children[idx];
        }
        curr->isEnd = true;
    }
    
    bool search(const string& word) {
        TrieNode* curr = root;
        for (char c : word) {
            int idx = c - 'a';
            if (!curr->children[idx]) return false;
            curr = curr->children[idx];
        }
        return curr->isEnd;
    }
    
    bool startsWith(const string& prefix) {
        TrieNode* curr = root;
        for (char c : prefix) {
            int idx = c - 'a';
            if (!curr->children[idx]) return false;
            curr = curr->children[idx];
        }
        return true;
    }
};
```

---

### Problem 14: Search in Rotated Sorted Array ⭐⭐

**Problem:** Find target in array rotated at unknown pivot in $O(\log N)$ time.

```cpp
// Time: O(log N) | Space: O(1)
int search(vector<int>& nums, int target) {
    int low = 0, high = nums.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;
        
        // Left half is sorted
        if (nums[low] <= nums[mid]) {
            if (nums[low] <= target && target < nums[mid]) high = mid - 1;
            else low = mid + 1;
        } 
        // Right half is sorted
        else {
            if (nums[mid] < target && target <= nums[high]) low = mid + 1;
            else high = mid - 1;
        }
    }
    return -1;
}
```

---

### Problem 15: Subarray Sum Equals K (Prefix Sum + Hash Map) ⭐⭐

**Problem:** Find total number of continuous subarrays whose sum equals $K$.

```cpp
// Time: O(N) | Space: O(N)
int subarraySum(vector<int>& nums, int k) {
    unordered_map<long long, int> prefixCounts;
    prefixCounts[0] = 1; // Base case: prefix sum of 0 appears once
    
    long long currSum = 0;
    int count = 0;
    
    for (int x : nums) {
        currSum += x;
        long long target = currSum - k;
        if (prefixCounts.count(target)) {
            count += prefixCounts[target];
        }
        prefixCounts[currSum]++;
    }
    return count;
}
```

---

## ⚠️ Checklist: Spotting AI Hallucinations in Proctored Exams

Before hitting "Submit" on any AI-assisted code:
* [ ] **Did AI use 32-bit `int` when prefix sums can exceed $2 \cdot 10^9$?** Switch to `long long`.
* [ ] **Did AI write an $O(N^2)$ nested loop when $N = 10^5$?** Prompt it specifically for $O(N \log N)$ or $O(N)$ approaches.
* [ ] **Did AI handle $N = 0$ or $N = 1$?** Verify boundary conditions.
* [ ] **Are there custom hash collisions?** For `unordered_map` with adversarial test cases, use custom splitmix64 hash or `std::map`.

---

> **Next Step:** [Stage 5 — Cognitive Assessment & ADEPT-15 →](./05_Cognitive_Assessment.md) | **Return to** [Main Roadmap](./README.md)
