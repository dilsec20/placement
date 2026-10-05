# 🎯 Capgemini Practice: Master Coding Bank & Assessment Questions

> **Super-Dream Tier Preparation Guide**  
> Targets: **`alpha_<stack>` (₹13 LPA)** & **`root_<mind>` (₹16 LPA)**  
> Includes the **30 Core Algorithmic Coding Problems with direct LeetCode links**, Capgemini SQL & Frontend practice tasks, and the **Complete Assessment MCQ Question Bank** (AI Literacy, Technical, English, Debugging, Prompting & Cognitive).  
> 🚨 **Struggling with the Hard MCQs?** Master the [Advanced 3–4 Yr Industry-Level MCQ Question Bank (mcq_practice.md)](./mcq_practice.md).

---

## 📑 Table of Contents

1. [🏢 Assessment Overview & Role Profiles](#-assessment-overview--role-profiles)
2. [⚡ 30 Master Algorithmic Problems (With Direct LeetCode Links)](#-30-master-algorithmic-problems-with-direct-leetcode-links)
   - [Summary Master Table](#summary-master-table)
   - [🪟 1. Sliding Window & Two Pointers](#1-sliding-window--two-pointers)
   - [🧱 2. Monotonic Stack & Deque](#2-monotonic-stack--deque)
   - [🌐 3. Graphs, BFS & Shortest Paths](#3-graphs-bfs--shortest-paths)
   - [🌲 4. Trees & Priority Queues (Heaps)](#4-trees--priority-queues-heaps)
   - [♟️ 5. Backtracking](#5-backtracking)
   - [🧩 6. Dynamic Programming & String Matching](#6-dynamic-programming--string-matching)
   - [🔍 7. Binary Search & Array Operations](#7-binary-search--array-operations)
   - [🔗 8. Linked Lists](#8-linked-lists)
   - [🏗️ 9. Data Structure Design & Greedy Algorithms](#9-data-structure-design--greedy-algorithms)
3. [🗄️ Capgemini SQL Practice Problems (10 Problems with Links)](#-capgemini-sql-practice-problems)
4. [🌐 Frontend & DOM Skeleton Tasks (10 Tasks with References)](#-frontend--dom-skeleton-tasks)
5. [🤖 Capgemini Question Bank (MCQs with Answers & Explanations)](#-capgemini-question-bank)
   - [🤖 Section 1: AI Literacy (20 Questions)](#-section-1-ai-literacy-20-questions)
   - [🧠 Section 2: Technical Assessment (20 Questions)](#-section-2-technical-assessment-20-questions)
   - [🎙️ Section 3: English Communication (20 Questions)](#-section-3-english-communication-20-questions)
   - [🧩 Section 4: Problem Solving (Logic & Algorithms)](#-section-4-problem-solving)
   - [🐞 Section 5: AI-Assisted Debugging](#-section-5-ai-assisted-debugging)
   - [🛠️ Section 6: AI-Assisted Feature Development](#-section-6-ai-assisted-feature-development)
   - [✍️ Section 7: Prompt Engineering](#-section-7-prompt-engineering)
   - [🧠 Section 8: Cognitive Assessment](#-section-8-cognitive-assessment)

---

## 🏢 Assessment Overview & Role Profiles

| Property | Details |
|---|---|
| **Target Roles** | `alpha_<stack>` (₹13 LPA) & `root_<mind>` (₹16 LPA) |
| **Assessment Duration** | 45–60 minutes per round |
| **Allowed Attempts** | 10 practice attempts |
| **Eligible Streams** | BE / BTech (CSE, IT, Circuit & Allied branches) |
| **Preferred Exposure** | DSA, Cloud, DevOps, Distributed Systems, Full-Stack, Generative AI & Agents, API Design |

### Candidate Cohorts
- **`alpha_<stack>` (₹13 LPA):** High-velocity full-stack delivery, modern UI engineering (React/TypeScript), cloud-native APIs, and AI-augmented software development.
- **`root_<mind>` (₹16 LPA):** Core computer science foundations, advanced data structures, algorithmic design (DP, Graphs, Trees), and distributed platform engineering.

---

## ⚡ 30 Master Algorithmic Problems (With Direct LeetCode Links)

### Summary Master Table

| # | Problem Name | Difficulty | Pattern / Core Topics | Optimal Complexity | Direct LeetCode Link |
|---|---|---|---|---|---|
| 1 | **Longest Consecutive Sequence** | 🔴 Hard / Medium | Hash Set, Array Invariants | Time: $O(N)$, Space: $O(N)$ | [Solve Problem](https://leetcode.com/problems/longest-consecutive-sequence/) |
| 2 | **Minimum Window Substring** | 🔴 Hard | Sliding Window, Frequency Map | Time: $O(N + M)$, Space: $O(\Sigma)$ | [Solve Problem](https://leetcode.com/problems/minimum-window-substring/) |
| 3 | **Trapping Rain Water** | 🔴 Hard | Two Pointers, Monotonic Stack | Time: $O(N)$, Space: $O(1)$ | [Solve Problem](https://leetcode.com/problems/trapping-rain-water/) |
| 4 | **Word Ladder** | 🔴 Hard | BFS, Shortest Path, Hash Set | Time: $O(N \cdot L^2)$, Space: $O(N \cdot L)$ | [Solve Problem](https://leetcode.com/problems/word-ladder/) |
| 5 | **Course Schedule** | 🟡 Medium | Graph, Topological Sort (Kahn's) | Time: $O(V + E)$, Space: $O(V + E)$ | [Solve Problem](https://leetcode.com/problems/course-schedule/) |
| 6 | **N-Queens** | 🔴 Hard | Backtracking, Bitmask / Vectors | Time: $O(N!)$, Space: $O(N)$ | [Solve Problem](https://leetcode.com/problems/n-queens/) |
| 7 | **Median of Two Sorted Arrays** | 🔴 Hard | Binary Search on Partition | Time: $O(\log(\min(M, N)))$, Space: $O(1)$ | [Solve Problem](https://leetcode.com/problems/median-of-two-sorted-arrays/) |
| 8 | **Edit Distance** | 🔴 Hard | 2D Dynamic Programming | Time: $O(M \cdot N)$, Space: $O(M \cdot N)$ | [Solve Problem](https://leetcode.com/problems/edit-distance/) |
| 9 | **Serialize and Deserialize Binary Tree** | 🔴 Hard | Tree Traversal (BFS / Preorder) | Time: $O(N)$, Space: $O(N)$ | [Solve Problem](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/) |
| 10 | **Sliding Window Maximum** | 🔴 Hard | Monotonic Deque | Time: $O(N)$, Space: $O(K)$ | [Solve Problem](https://leetcode.com/problems/sliding-window-maximum/) |
| 11 | **Number of Islands** | 🟡 Medium | Grid BFS / DFS, Connected Components | Time: $O(M \cdot N)$, Space: $O(M \cdot N)$ | [Solve Problem](https://leetcode.com/problems/number-of-islands/) |
| 12 | **LRU Cache** | 🟡 Medium | Hash Map + Doubly Linked List | Time: $O(1)$ all ops, Space: $O(C)$ | [Solve Problem](https://leetcode.com/problems/lru-cache/) |
| 13 | **Merge K Sorted Lists** | 🔴 Hard | Min-Heap / Priority Queue | Time: $O(N \log K)$, Space: $O(K)$ | [Solve Problem](https://leetcode.com/problems/merge-k-sorted-lists/) |
| 14 | **Largest Rectangle in Histogram** | 🔴 Hard | Monotonic Increasing Stack | Time: $O(N)$, Space: $O(N)$ | [Solve Problem](https://leetcode.com/problems/largest-rectangle-in-histogram/) |
| 15 | **Pacific Atlantic Water Flow** | 🟡 Medium | Multi-source BFS / DFS | Time: $O(M \cdot N)$, Space: $O(M \cdot N)$ | [Solve Problem](https://leetcode.com/problems/pacific-atlantic-water-flow/) |
| 16 | **Coin Change** | 🟡 Medium | Bottom-Up 1D DP | Time: $O(A \cdot N)$, Space: $O(A)$ | [Solve Problem](https://leetcode.com/problems/coin-change/) |
| 17 | **Network Delay Time** | 🟡 Medium | Dijkstra's Shortest Path | Time: $O((V + E) \log V)$, Space: $O(V + E)$ | [Solve Problem](https://leetcode.com/problems/network-delay-time/) |
| 18 | **Regular Expression Matching** | 🔴 Hard | 2D Dynamic Programming | Time: $O(M \cdot N)$, Space: $O(M \cdot N)$ | [Solve Problem](https://leetcode.com/problems/regular-expression-matching/) |
| 19 | **Maximal Rectangle** | 🔴 Hard | Monotonic Stack on Matrix | Time: $O(M \cdot N)$, Space: $O(N)$ | [Solve Problem](https://leetcode.com/problems/maximal-rectangle/) |
| 20 | **Word Break** | 🟡 Medium | 1D Dynamic Programming + Hash Set | Time: $O(N^2 \cdot L)$, Space: $O(N)$ | [Solve Problem](https://leetcode.com/problems/word-break/) |
| 21 | **Coin Change II** | 🟡 Medium | Unbounded Knapsack DP | Time: $O(N \cdot A)$, Space: $O(A)$ | [Solve Problem](https://leetcode.com/problems/coin-change-ii/) |
| 22 | **Reorganize String** | 🟡 Medium | Greedy, Max-Heap, Hash Map | Time: $O(N \log \Sigma)$, Space: $O(\Sigma)$ | [Solve Problem](https://leetcode.com/problems/reorganize-string/) |
| 23 | **Design HashSet** | 🟢 Easy | Hash Table Design, Bucket Chaining | Time: $O(1)$ amortized, Space: $O(N)$ | [Solve Problem](https://leetcode.com/problems/design-hashset/) |
| 24 | **Maximum Length of Pair Chain** | 🟡 Medium | Greedy Interval Scheduling | Time: $O(N \log N)$, Space: $O(1)$ | [Solve Problem](https://leetcode.com/problems/maximum-length-of-pair-chain/) |
| 25 | **Find the Duplicate Number** | 🟡 Medium | Floyd's Fast & Slow Pointers | Time: $O(N)$, Space: $O(1)$ | [Solve Problem](https://leetcode.com/problems/find-the-duplicate-number/) |
| 26 | **Linked List Cycle** | 🟢 Easy | Two Pointers (Tortoise & Hare) | Time: $O(N)$, Space: $O(1)$ | [Solve Problem](https://leetcode.com/problems/linked-list-cycle/) |
| 27 | **Pascal’s Triangle** | 🟢 Easy | Simulation, Dynamic Programming | Time: $O(N^2)$, Space: $O(1)$ aux | [Solve Problem](https://leetcode.com/problems/pascals-triangle/) |
| 28 | **Interleaving String** | 🟡 Medium | 2D Dynamic Programming | Time: $O(M \cdot N)$, Space: $O(N)$ | [Solve Problem](https://leetcode.com/problems/interleaving-string/) |
| 29 | **Reverse Linked List II** | 🟡 Medium | Linked List In-Place Manipulation | Time: $O(N)$, Space: $O(1)$ | [Solve Problem](https://leetcode.com/problems/reverse-linked-list-ii/) |
| 30 | **Search in Rotated Sorted Array** | 🟡 Medium | Modified Binary Search | Time: $O(\log N)$, Space: $O(1)$ | [Solve Problem](https://leetcode.com/problems/search-in-rotated-sorted-array/) |

---

### 🪟 1. Sliding Window & Two Pointers

#### 🔹 [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/) (🔴 Hard — LeetCode 76)
- **Problem Statement:** Given strings `s` and `t`, find the minimum window substring of `s` such that every character in `t` (including duplicates) is contained within the window.
- **Key Invariant:** Maintain a frequency count of characters needed from `t`. Expand the right pointer until the window is valid (`matched == requiredCount`). Then contract the left pointer while keeping the window valid to minimize length.
- **Complexity:** $O(N + M)$ Time, $O(\Sigma)$ Space.

#### 🔹 [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/) (🔴 Hard — LeetCode 42)
- **Problem Statement:** Given $n$ non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.
- **Key Invariant:** Two pointers (`left`, `right`) with running maximum heights `left_max` and `right_max`. Water trapped at any index is governed strictly by $\min(\text{left\_max}, \text{right\_max}) - \text{height}[i]$.
- **Complexity:** $O(N)$ Time, $O(1)$ Space.

#### 🔹 [Maximum Length of Pair Chain](https://leetcode.com/problems/maximum-length-of-pair-chain/) (🟡 Medium — LeetCode 646)
- **Problem Statement:** You are given an array of $n$ pairs where $\text{pairs}[i] = [a_i, b_i]$. A pair $(c, d)$ follows $(a, b)$ if and only if $b < c$. Find the longest length of a pair chain.
- **Key Invariant:** Classic interval scheduling. Sort pairs greedily by their ending coordinates ($b_i$). Pick the pair that finishes earliest to leave maximal room for subsequent pairs.
- **Complexity:** $O(N \log N)$ Time, $O(1)$ extra Space.

#### 🔹 [Find the Duplicate Number](https://leetcode.com/problems/find-the-duplicate-number/) (🟡 Medium — LeetCode 287)
- **Problem Statement:** Given an array of integers `nums` containing $n + 1$ integers where each integer is in the range $[1, n]$ inclusive, find the duplicate number without modifying the array and using constant $O(1)$ extra space.
- **Key Invariant:** Treat the array as a functional directed graph where $i \to \text{nums}[i]$. Because indices range $0 \dots n$ and values are $1 \dots n$, index 0 has an in-degree of 0. A duplicate value implies multiple pointers pointing to the same node, creating a cycle. Use Floyd's Tortoise and Hare cycle detection.
- **Complexity:** $O(N)$ Time, $O(1)$ Space.

---

### 🧱 2. Monotonic Stack & Deque

#### 🔹 [Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/) (🔴 Hard — LeetCode 84)
- **Problem Statement:** Given an array of integers `heights` representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.
- **Key Invariant:** For each bar, find the first smaller bar to its left and first smaller bar to its right using a monotonic strictly increasing stack. When a smaller bar is encountered, pop elements and compute the rectangular area with the popped bar as the shortest limiting height.
- **Complexity:** $O(N)$ Time, $O(N)$ Space.

#### 🔹 [Maximal Rectangle](https://leetcode.com/problems/maximal-rectangle/) (🔴 Hard — LeetCode 85)
- **Problem Statement:** Given a `rows x cols` binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.
- **Key Invariant:** Reduce the 2D problem to $M$ instances of *Largest Rectangle in Histogram*. Maintain a running height array updated per row: $\text{heights}[j] = (\text{matrix}[i][j] == '1') ? \text{heights}[j] + 1 : 0$.
- **Complexity:** $O(M \cdot N)$ Time, $O(N)$ Space.

#### 🔹 [Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/) (🔴 Hard — LeetCode 239)
- **Problem Statement:** Given an array of integers `nums` and a sliding window of size $k$ moving from left to right, return the maximum element in each window.
- **Key Invariant:** Maintain a double-ended queue (`std::deque`) storing indices in monotonically decreasing order of values. Pop indices outside the current window $[i - k + 1, i]$ from the front. Pop all elements smaller than the incoming `nums[i]` from the back. The front of the deque always holds the maximum.
- **Complexity:** $O(N)$ Time, $O(K)$ Space.

---

### 🌐 3. Graphs, BFS & Shortest Paths

#### 🔹 [Course Schedule](https://leetcode.com/problems/course-schedule/) (🟡 Medium — LeetCode 207)
- **Problem Statement:** There are $n$ courses labelled 0 to $n - 1$ and a list of prerequisite pairs $[a, b]$. Determine if you can finish all courses.
- **Key Invariant:** Cycle detection in a directed graph. Apply Kahn's Algorithm (BFS with in-degrees): push all vertices with $\text{in-degree} = 0$ into a queue. As vertices are popped, decrement the in-degrees of their neighbors. If the count of processed vertices equals $n$, no cycle exists.
- **Complexity:** $O(V + E)$ Time, $O(V + E)$ Space.

#### 🔹 [Word Ladder](https://leetcode.com/problems/word-ladder/) (🔴 Hard — LeetCode 127)
- **Problem Statement:** Given two words (`beginWord`, `endWord`) and a dictionary `wordList`, return the number of words in the shortest transformation sequence from `beginWord` to `endWord` changing only one letter at a time.
- **Key Invariant:** Unweighted shortest path on an implicit graph $\implies$ Breadth-First Search (BFS). Replace each of the $L$ character positions with `'a'` through `'z'` to find valid 1-edit neighbours in $O(26 \cdot L)$ time per word. Two-ended bidirectional BFS provides quadratic speedups.
- **Complexity:** $O(N \cdot L^2)$ Time, $O(N \cdot L)$ Space.

#### 🔹 [Pacific Atlantic Water Flow](https://leetcode.com/problems/pacific-atlantic-water-flow/) (🟡 Medium — LeetCode 417)
- **Problem Statement:** Given an $m \times n$ matrix of heights, find all coordinates where rain water can flow to both the Pacific (top/left) and Atlantic (bottom/right) oceans.
- **Key Invariant:** Reverse water flow! Start multi-source BFS / DFS from ocean boundary cells inward, moving only to adjacent cells of equal or greater height. Output cells reachable from both ocean searches.
- **Complexity:** $O(M \cdot N)$ Time, $O(M \cdot N)$ Space.

#### 🔹 [Network Delay Time](https://leetcode.com/problems/network-delay-time/) (🟡 Medium — LeetCode 743)
- **Problem Statement:** You are given a network of $n$ nodes and a list of travel times as directed edges with weights. Compute the minimum time needed for all $n$ nodes to receive a signal sent from node $k$.
- **Key Invariant:** Single-source shortest path on a weighted directed graph with non-negative weights $\implies$ Dijkstra's Algorithm using a min-heap (`std::priority_queue`). Answer is $\max_{1 \le i \le n} \text{dist}[i]$ (or $-1$ if unreachable).
- **Complexity:** $O((V + E) \log V)$ Time, $O(V + E)$ Space.

#### 🔹 [Number of Islands](https://leetcode.com/problems/number-of-islands/) (🟡 Medium — LeetCode 200)
- **Problem Statement:** Given an $m \times n$ 2D binary grid representing a map of '1's (land) and '0's (water), count the number of islands.
- **Key Invariant:** Connected components on a grid graph. Iterate over each cell; when an unvisited `'1'` is encountered, trigger BFS/DFS to flood-fill and mark all connected land cells as visited (`'0'`), incrementing island count.
- **Complexity:** $O(M \cdot N)$ Time, $O(M \cdot N)$ Space.

---

### 🌲 4. Trees & Priority Queues (Heaps)

#### 🔹 [Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/) (🔴 Hard — LeetCode 297)
- **Problem Statement:** Design an algorithm to serialize a binary tree to a string and deserialize that string back to the original tree structure.
- **Key Invariant:** Use preorder DFS or level-order BFS with an explicit delimiter (e.g. `,`) and a sentinel character for null pointers (e.g. `#`). In preorder traversal, the root is always at index 0, enabling deterministic recursive reconstruction.
- **Complexity:** $O(N)$ Time, $O(N)$ Space.

#### 🔹 [Merge K Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/) (🔴 Hard — LeetCode 23)
- **Problem Statement:** You are given an array of $k$ linked-lists, each sorted in ascending order. Merge all lists into one sorted linked-list and return it.
- **Key Invariant:** Maintain a min-heap of size $k$ holding the current head pointer of each non-empty list. Extract the minimum node, attach it to the merged list tail, and push the next node from that list into the heap.
- **Complexity:** $O(N \log K)$ Time (where $N$ is total nodes across all lists), $O(K)$ Space.

---

### ♟️ 5. Backtracking

#### 🔹 [N-Queens](https://leetcode.com/problems/n-queens/) (🔴 Hard — LeetCode 51)
- **Problem Statement:** The $n$-queens puzzle is the problem of placing $n$ queens on an $n \times n$ chessboard such that no two queens attack each other.
- **Key Invariant:** Place queens row by row. Maintain three lookup arrays / bitmasks for occupied positions: columns, main diagonals (`row - col + n`), and anti-diagonals (`row + col`). Backtrack whenever a collision occurs.
- **Complexity:** $O(N!)$ Time, $O(N)$ Space.

---

### 🧩 6. Dynamic Programming & String Matching

#### 🔹 [Edit Distance](https://leetcode.com/problems/edit-distance/) (🔴 Hard — LeetCode 72)
- **Problem Statement:** Given strings `word1` and `word2`, find the minimum number of operations (insert, delete, replace) required to convert `word1` to `word2`.
- **Key Invariant:** Let $dp[i][j]$ denote edit distance between prefixes `word1[0...i-1]` and `word2[0...j-1]`.
  $$\text{If } word1[i-1] == word2[j-1]: dp[i][j] = dp[i-1][j-1]$$
  $$\text{Else}: dp[i][j] = 1 + \min(dp[i-1][j] \text{ [delete]}, dp[i][j-1] \text{ [insert]}, dp[i-1][j-1] \text{ [replace]})$$
- **Complexity:** $O(M \cdot N)$ Time, $O(M \cdot N)$ Space (optimizable to $O(\min(M, N))$ Space).

#### 🔹 [Regular Expression Matching](https://leetcode.com/problems/regular-expression-matching/) (🔴 Hard — LeetCode 10)
- **Problem Statement:** Implement regular expression matching with support for `.` (matches any single character) and `*` (matches zero or more of the preceding element).
- **Key Invariant:** $dp[i][j]$ matches `s[0...i-1]` with `p[0...j-1]`. When `p[j-1] == '*'`:
  - Zero occurrences: $dp[i][j] = dp[i][j-2]$
  - One or more: $dp[i][j] = dp[i-1][j]$ (if `s[i-1]` matches `p[j-2]`).
- **Complexity:** $O(M \cdot N)$ Time, $O(M \cdot N)$ Space.

#### 🔹 [Word Break](https://leetcode.com/problems/word-break/) (🟡 Medium — LeetCode 139)
- **Problem Statement:** Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.
- **Key Invariant:** Boolean 1D DP: $dp[i]$ is true if prefix $s[0 \dots i-1]$ can be segmented.
  $$dp[i] = \bigvee_{j=0}^{i-1} (dp[j] \land (s[j \dots i-1] \in \text{dict}))$$
- **Complexity:** $O(N^2 \cdot L)$ Time, $O(N)$ Space.

#### 🔹 [Coin Change](https://leetcode.com/problems/coin-change/) (🟡 Medium — LeetCode 322)
- **Problem Statement:** Return the fewest number of coins needed to make up a target `amount`. If that amount cannot be made up by any combination, return `-1`.
- **Key Invariant:** Unbounded knapsack minimizing items:
  $$dp[a] = \min_{c \in coins, c \le a} (dp[a - c] + 1)$$
  Initialize $dp[0] = 0$, all others with $\infty$.
- **Complexity:** $O(\text{amount} \cdot N)$ Time, $O(\text{amount})$ Space.

#### 🔹 [Coin Change II](https://leetcode.com/problems/coin-change-ii/) (🟡 Medium — LeetCode 518)
- **Problem Statement:** Return the number of distinct combinations that make up a target amount.
- **Key Invariant:** Distinct combinations (not permutations) $\implies$ loop over coins on the **outer** loop, amounts on the **inner** loop:
  $$\text{for } c \in coins: \text{for } a \in [c \dots amount]: dp[a] += dp[a - c]$$
- **Complexity:** $O(N \cdot \text{amount})$ Time, $O(\text{amount})$ Space.

#### 🔹 [Interleaving String](https://leetcode.com/problems/interleaving-string/) (🟡 Medium — LeetCode 97)
- **Problem Statement:** Given strings `s1`, `s2`, and `s3`, find whether `s3` is formed by an interleaving of `s1` and `s2`.
- **Key Invariant:** $dp[i][j]$ is true if $s3[0 \dots i+j-1]$ is formed by interleaving $s1[0 \dots i-1]$ and $s2[0 \dots j-1]$. Check if current char of $s3$ matches $s1[i-1]$ or $s2[j-1]$.
- **Complexity:** $O(M \cdot N)$ Time, $O(N)$ Space.

---

### 🔍 7. Binary Search & Array Operations

#### 🔹 [Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/) (🔴 Hard — LeetCode 4)
- **Problem Statement:** Given two sorted arrays `nums1` and `nums2` of size $m$ and $n$ respectively, return the median of the two sorted arrays in $O(\log(\min(m, n)))$ time.
- **Key Invariant:** Binary search on the partition cut of the smaller array. Partition $A$ into $[A_{left} \mid A_{right}]$ and $B$ into $[B_{left} \mid B_{right}]$ such that:
  $$\text{size}(A_{left}) + \text{size}(B_{left}) = \lfloor (m + n + 1) / 2 \rfloor$$
  Valid cut condition: $\max(A_{left}) \le \min(B_{right}) \land \max(B_{left}) \le \min(A_{right})$.
- **Complexity:** $O(\log(\min(M, N)))$ Time, $O(1)$ Space.

#### 🔹 [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/) (🟡 Medium — LeetCode 33)
- **Problem Statement:** Given integer array `nums` sorted in ascending order with distinct values, rotated at unknown pivot, find index of target in $O(\log n)$ time.
- **Key Invariant:** For any midpoint `mid`, at least one half ($[left, mid]$ or $[mid, right]$) is guaranteed to be normally sorted. Test if `target` lies within the sorted half's boundaries; if so, narrow search to that half; otherwise search the other half.
- **Complexity:** $O(\log N)$ Time, $O(1)$ Space.

#### 🔹 [Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/) (🔴 Hard / Medium — LeetCode 128)
- **Problem Statement:** Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence in $O(n)$ time.
- **Key Invariant:** Insert all numbers into an `std::unordered_set`. Only start counting sequences from values $x$ where $x - 1$ is **not** in the set (i.e. $x$ is the true sequence start). Each element is visited at most twice.
- **Complexity:** $O(N)$ Time, $O(N)$ Space.

#### 🔹 [Pascal’s Triangle](https://leetcode.com/problems/pascals-triangle/) (🟢 Easy — LeetCode 118)
- **Problem Statement:** Given an integer `numRows`, return the first `numRows` of Pascal's triangle.
- **Key Invariant:** Each row starts and ends with 1. For interior cells: $\text{row}[i][j] = \text{row}[i-1][j-1] + \text{row}[i-1][j]$.
- **Complexity:** $O(N^2)$ Time, $O(1)$ auxiliary Space.

---

### 🔗 8. Linked Lists

#### 🔹 [Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/) (🟢 Easy — LeetCode 141)
- **Problem Statement:** Given `head`, the head of a linked list, determine if the linked list has a cycle in it using $O(1)$ memory.
- **Key Invariant:** Floyd's Cycle-Finding Algorithm. Move `slow` by 1 step and `fast` by 2 steps. If a cycle exists, `fast` will inevitably lap and meet `slow`.
- **Complexity:** $O(N)$ Time, $O(1)$ Space.

#### 🔹 [Reverse Linked List II](https://leetcode.com/problems/reverse-linked-list-ii/) (🟡 Medium — LeetCode 92)
- **Problem Statement:** Given head of singly linked list and two integers `left` and `right` where `left <= right`, reverse nodes from position `left` to `right` in a single pass.
- **Key Invariant:** Use a dummy node. Traverse to node at position `left - 1`. Perform in-place pointer swinging for $right - left$ iterations by repeatedly moving `curr->next` to the front of the sublist.
- **Complexity:** $O(N)$ Time, $O(1)$ Space.

---

### 🏗️ 9. Data Structure Design & Greedy Algorithms

#### 🔹 [LRU Cache](https://leetcode.com/problems/lru-cache/) (🟡 Medium — LeetCode 146)
- **Problem Statement:** Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with $O(1)$ time complexity for both `get` and `put`.
- **Key Invariant:** Combine an `unordered_map<int, list<Node>::iterator>` with a custom doubly linked list with dummy head and tail. On `get()` or `put()`, splice the referenced node to the head (most recently used). When capacity overflows, evict the node preceding the tail.
- **Complexity:** $O(1)$ for all operations, $O(\text{capacity})$ Space.

#### 🔹 [Design HashSet](https://leetcode.com/problems/design-hashset/) (🟢 Easy — LeetCode 705)
- **Problem Statement:** Design a HashSet without using any built-in hash table libraries.
- **Key Invariant:** Implement separate chaining using an array of linked lists / vectors with a prime modulo base (e.g. 769 or 10007) and standard equality checks.
- **Complexity:** $O(1)$ amortized time for `add`, `remove`, `contains`.

#### 🔹 [Reorganize String](https://leetcode.com/problems/reorganize-string/) (🟡 Medium — LeetCode 767)
- **Problem Statement:** Given a string `s`, rearrange the characters of `s` so that any two adjacent characters are not the same. Return `""` if impossible.
- **Key Invariant:** Pigeonhole principle: if any character frequency exceeds $\lfloor (N + 1) / 2 \rfloor$, it is impossible. Otherwise, greedily extract the two most frequent characters from a max-heap and interleave them.
- **Complexity:** $O(N \log \Sigma)$ Time, $O(\Sigma)$ Space.

---

## 🗄️ Capgemini SQL Practice Problems

| # | Problem Title | Difficulty | Key Topics | Direct LeetCode Link | Problem Objective |
|---|---|---|---|---|---|
| 1 | **Department Highest Salary** | 🟡 Medium | JOIN, Subquery, GROUP BY | [Solve Problem](https://leetcode.com/problems/department-highest-salary/) | Return employees with the highest salary in each department. |
| 2 | **Second Highest Salary** | 🟡 Medium | Subquery, `IFNULL`, `LIMIT` | [Solve Problem](https://leetcode.com/problems/second-highest-salary/) | Return the second highest distinct salary or `NULL`. |
| 3 | **Duplicate Emails** | 🟢 Easy | `GROUP BY`, `HAVING` | [Solve Problem](https://leetcode.com/problems/duplicate-emails/) | Report all emails that appear more than once in Person table. |
| 4 | **Customers Who Never Order** | 🟢 Easy | `LEFT JOIN`, `IS NULL` | [Solve Problem](https://leetcode.com/problems/customers-who-never-order/) | Find all customers who never placed an order using anti-join. |
| 5 | **Average Time of Process per Machine** | 🟢 Easy | Self-Join, `AVG`, Aggregation | [Solve Problem](https://leetcode.com/problems/average-time-of-process-per-machine/) | Join start and end machine events to compute average run time. |
| 6 | **Monthly Transactions I** | 🟡 Medium | Conditional Aggregation | [Solve Problem](https://leetcode.com/problems/monthly-transactions-i/) | Group transactions by month/country and count approved totals. |
| 7 | **Managers with at Least 5 Direct Reports** | 🟡 Medium | Self-Join, `GROUP BY`, `HAVING` | [Solve Problem](https://leetcode.com/problems/managers-with-at-least-5-direct-reports/) | Identify managers supervising 5 or more direct reports. |
| 8 | **Rank Scores** | 🟡 Medium | `DENSE_RANK()`, Window Function | [Solve Problem](https://leetcode.com/problems/rank-scores/) | Rank scores in descending order without gaps between ties. |
| 9 | **Customer Who Visited but Made No Trans.** | 🟡 Medium | `LEFT JOIN`, `GROUP BY`, `COUNT` | [Solve Problem](https://leetcode.com/problems/customer-who-visited-but-did-not-make-any-transactions/) | Count visits that did not result in a recorded transaction. |
| 10 | **Number of Unique Subjects Taught** | 🟢 Easy | `COUNT(DISTINCT ...)`, `GROUP BY` | [Solve Problem](https://leetcode.com/problems/number-of-unique-subjects-taught-by-each-teacher/) | Calculate distinct subjects taught by each teacher. |

---

## 🌐 Frontend & DOM Skeleton Tasks

| # | Task Title | Stack / Topics | Reference / Practice Link | Objective |
|---|---|---|---|---|
| 1 | **React Searchable Todo Skeleton** | React, State Lifting, CSS | [React Sharing State](https://react.dev/learn/sharing-state-between-components) | Build complete todo app with add, filter, toggle, search, and delete with lifted state. |
| 2 | **Debounced Search Component** | React Hooks, `useEffect`, Timers | [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects) | Implement debounced search input that ignores stale results and cleans up timers. |
| 3 | **Accessible Modal Dialog** | DOM, HTML5 Dialog, A11y | [MDN HTMLDialogElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement) | Implement keyboard `Escape` closing, focus trap, focus restoration, and backdrop dismissal. |
| 4 | **Filterable Data Table** | React, Sorting, Filtering | [React Component State](https://react.dev/learn/sharing-state-between-components) | Build table with multi-column sorting, case-insensitive query filter, and empty state. |
| 5 | **Responsive Dashboard Grid** | CSS Grid, Flexbox, Media Queries | [MDN CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout) | Build 12-column adaptive dashboard grid layout without horizontal overflow on mobile. |
| 6 | **Todo Event Delegation** | Vanilla JS DOM, Event Delegation | [MDN EventTarget addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) | Attach single event listener to parent `<ul>` to handle add, toggle, and delete actions. |
| 7 | **Form Validation UI** | HTML5, Constraint Validation API | [MDN Form Validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation) | Build form with real-time feedback, regex validation, and accessible error badges. |
| 8 | **Pagination Component** | React, Component State | [React Official Docs](https://react.dev/learn) | Create modular pagination controls with bounded page numbers, next/prev, and custom page size. |
| 9 | **Keyboard Navigable Dropdown** | DOM, ARIA Listbox | [W3C ARIA Listbox Role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role) | Implement dropdown with `ArrowUp`, `ArrowDown`, `Home`, `End`, `Enter`, and proper ARIA states. |
| 10 | **Drag and Drop Task Board** | React / DOM, Drag & Drop API | [MDN HTML Drag & Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) | Build Kanban board to drag cards between "To Do", "In Progress", and "Done" columns. |

---

## 🤖 Capgemini Question Bank

### 🤖 Section 1: AI Literacy (20 Questions)

#### Q1. What is the main role of a large language model?
- **Options:** 1) Store exact copies of every webpage &nbsp; 2) Predict likely token sequences from context &nbsp; 3) Replace every database &nbsp; 4) Encrypt all network traffic
- **✅ Correct Answer:** `2. Predict likely token sequences from context`
- **💡 Explanation:** LLMs generate text by predicting likely next tokens from learned patterns and context.

#### Q2. What does an embedding represent?
- **Options:** 1) A vector representation of meaning or features &nbsp; 2) A database password &nbsp; 3) A browser cookie &nbsp; 4) A compiled binary only
- **✅ Correct Answer:** `1. A vector representation of meaning or features`
- **💡 Explanation:** Embeddings represent items as high-dimensional vectors so semantic distance and similarity can be measured geometrically.

#### Q3. Which is a generative AI task?
- **Options:** 1) Sorting a fixed array &nbsp; 2) Creating a summary from a document &nbsp; 3) Checking a CPU temperature &nbsp; 4) Opening a network port
- **✅ Correct Answer:** `2. Creating a summary from a document`
- **💡 Explanation:** Summarization involves novel textual content generation rather than deterministic scalar evaluation.

#### Q4. Which prompt is most precise?
- **Options:** 1) Fix this &nbsp; 2) Explain the bug, preserve the API, show a patch, and add a test &nbsp; 3) Make it good &nbsp; 4) Write code
- **✅ Correct Answer:** `2. Explain the bug, preserve the API, show a patch, and add a test`
- **💡 Explanation:** Precise prompts explicitly supply the context, constraints, expected output diff, and verification requirements.

#### Q5. Why provide an output format in a prompt?
- **Options:** 1) To constrain the response into a usable structure &nbsp; 2) To increase monitor brightness &nbsp; 3) To remove all model errors &nbsp; 4) To disable validation
- **✅ Correct Answer:** `1. To constrain the response into a usable structure`
- **💡 Explanation:** Structured output specifications (JSON, Markdown table, patch diff) make model outputs machine-parseable and easily validated.

#### Q6. What is few-shot prompting?
- **Options:** 1) Giving examples of the desired input-output behaviour &nbsp; 2) Using only one word &nbsp; 3) Running a prompt offline &nbsp; 4) Deleting the context
- **✅ Correct Answer:** `1. Giving examples of the desired input-output behaviour`
- **💡 Explanation:** Few-shot prompting equips the model with canonical input/output examples within the prompt context to anchor format and reasoning.

#### Q7. What problem does retrieval-augmented generation (RAG) address?
- **Options:** 1) It supplies relevant external context to the model &nbsp; 2) It replaces CSS &nbsp; 3) It guarantees perfect reasoning &nbsp; 4) It removes the need for data
- **✅ Correct Answer:** `1. It supplies relevant external context to the model`
- **💡 Explanation:** RAG searches an external knowledge base and supplies ground-truth documents to prevent hallucinations and provide up-to-date context.

#### Q8. Why are document chunks used in a retrieval system?
- **Options:** 1) To search and provide focused context &nbsp; 2) To make documents unreadable &nbsp; 3) To remove metadata &nbsp; 4) To avoid indexing
- **✅ Correct Answer:** `1. To search and provide focused context`
- **💡 Explanation:** Chunking isolates relevant semantic units and ensures documents fit comfortably within the LLM's prompt token limits.

#### Q9. What distinguishes an AI agent from a single prompt response?
- **Options:** 1) It can plan, use tools, and act across steps &nbsp; 2) It never uses context &nbsp; 3) It only generates CSS &nbsp; 4) It cannot inspect results
- **✅ Correct Answer:** `1. It can plan, use tools, and act across steps`
- **💡 Explanation:** Agents execute an iterative observe-plan-act loop using tools (APIs, code execution, databases) across multiple turns.

#### Q10. Why should an agent tool have a clear schema?
- **Options:** 1) It defines valid inputs and predictable outputs &nbsp; 2) It hides all errors &nbsp; 3) It prevents logging &nbsp; 4) It removes authorization
- **✅ Correct Answer:** `1. It defines valid inputs and predictable outputs`
- **💡 Explanation:** Explicit JSON/Type schemas prevent hallucinated argument values and enable client validation before invoking destructive tools.

#### Q11. What is a regression test for an AI feature?
- **Options:** 1) A fixed case used to detect behaviour changes &nbsp; 2) A random prompt with no expected result &nbsp; 3) A UI colour choice &nbsp; 4) A production password
- **✅ Correct Answer:** `1. A fixed case used to detect behaviour changes`
- **💡 Explanation:** Regression tests use established benchmark inputs to verify that newer models or prompts do not degrade quality or break contracts.

#### Q12. What should be checked before accepting AI-generated code?
- **Options:** 1) Tests, edge cases, security, and maintainability &nbsp; 2) Only whether it looks short &nbsp; 3) Only the variable names &nbsp; 4) Nothing if it compiles
- **✅ Correct Answer:** `1. Tests, edge cases, security, and maintainability`
- **💡 Explanation:** AI suggestions must be rigorously reviewed for injection vulnerabilities, memory leaks, boundary conditions, and time complexities.

#### Q13. What is data minimization?
- **Options:** 1) Collecting only data needed for the stated purpose &nbsp; 2) Collecting every possible field &nbsp; 3) Removing all access controls &nbsp; 4) Duplicating private data
- **✅ Correct Answer:** `1. Collecting only data needed for the stated purpose`
- **💡 Explanation:** Data minimization is a core privacy principle restricting collection to only information strictly essential for task completion.

#### Q14. What is a hallucination in an AI response?
- **Options:** 1) A confident but unsupported or false claim &nbsp; 2) A successful unit test &nbsp; 3) A valid database join &nbsp; 4) A compressed image
- **✅ Correct Answer:** `1. A confident but unsupported or false claim`
- **💡 Explanation:** Hallucinations occur when a model synthesizes ungrounded, fabricated facts or APIs with high apparent confidence.

#### Q15. Which practice helps protect confidential code sent to an AI tool?
- **Options:** 1) Use approved tools and remove unnecessary secrets &nbsp; 2) Paste production credentials &nbsp; 3) Disable authentication &nbsp; 4) Share all customer records
- **✅ Correct Answer:** `1. Use approved tools and remove unnecessary secrets`
- **💡 Explanation:** Stripping API keys, credentials, and PII prior to prompting avoids leaking IP or compliance breaches.

#### Q16. What is a good use of AI in debugging?
- **Options:** 1) Suggest hypotheses that the developer validates with tests &nbsp; 2) Accept every suggestion blindly &nbsp; 3) Skip reproducing the defect &nbsp; 4) Remove error handling
- **✅ Correct Answer:** `1. Suggest hypotheses that the developer validates with tests`
- **💡 Explanation:** AI accelerates initial triaging by highlighting plausible failure points, which the engineer then validates against automated unit tests.

#### Q17. What context is most useful when asking AI to explain a failure?
- **Options:** 1) Error, relevant code, inputs, expected result, and actual result &nbsp; 2) Only the project name &nbsp; 3) Only the word error &nbsp; 4) An unrelated screenshot
- **✅ Correct Answer:** `1. Error, relevant code, inputs, expected result, and actual result`
- **💡 Explanation:** Complete reproducible bug reports furnish the model with exact boundary values to locate the failing condition.

#### Q18. What does a context window limit affect?
- **Options:** 1) How much input and conversation the model can consider at once &nbsp; 2) The monitor size &nbsp; 3) The keyboard layout &nbsp; 4) The database schema only
- **✅ Correct Answer:** `1. How much input and conversation the model can consider at once`
- **💡 Explanation:** Context windows cap the maximum number of prompt tokens plus response tokens the attention mechanism can attend to concurrently.

#### Q19. Why should important AI output be grounded in sources?
- **Options:** 1) Sources make claims easier to verify &nbsp; 2) Sources guarantee no bugs &nbsp; 3) Sources remove all bias &nbsp; 4) Sources replace testing
- **✅ Correct Answer:** `1. Sources make claims easier to verify`
- **💡 Explanation:** Grounding binds model statements directly to citations or source documents, enabling swift auditability and trust verification.

#### Q20. Who remains accountable for using AI-generated code in a product?
- **Options:** 1) The engineering team and organization using it &nbsp; 2) The model alone &nbsp; 3) The browser &nbsp; 4) Nobody
- **✅ Correct Answer:** `1. The engineering team and organization using it`
- **💡 Explanation:** Accountability for production outages, security vulnerabilities, and licensing compliance rests solely with human engineers and their organization.

---

### 🧠 Section 2: Technical Assessment (20 Questions)

#### Q1. What is the time complexity of a loop that doubles `i` until `n`?
- **Options:** 1) O(1) &nbsp; 2) O(log n) &nbsp; 3) O(n) &nbsp; 4) O(n log n)
- **✅ Correct Answer:** `2. O(log n)`
- **💡 Explanation:** The counter grows exponentially ($1, 2, 4, 8, \dots, 2^k \ge n \implies k = \lceil\log_2 n\rceil$).

#### Q2. Which structure follows last-in-first-out (LIFO) order?
- **Options:** 1) Queue &nbsp; 2) Stack &nbsp; 3) Graph &nbsp; 4) Hash table
- **✅ Correct Answer:** `2. Stack`
- **💡 Explanation:** Stacks insert and pop from the same top end, enforcing LIFO ordering.

#### Q3. Which technique finds a pair sum in O(n) average time?
- **Options:** 1) Nested loops only &nbsp; 2) Hash map lookup &nbsp; 3) Bubble sort only &nbsp; 4) Depth-first search
- **✅ Correct Answer:** `2. Hash map lookup`
- **💡 Explanation:** By caching seen numbers in a hash map, we verify if $(target - num)$ exists in $O(1)$ average time per element.

#### Q4. Which structure is useful for counting character frequencies?
- **Options:** 1) Hash map &nbsp; 2) Stack only &nbsp; 3) Queue only &nbsp; 4) Linked list only
- **✅ Correct Answer:** `1. Hash map`
- **💡 Explanation:** A hash map or fixed-size array provides direct indexing from characters to integer frequency tallies.

#### Q5. Binary search requires which property?
- **Options:** 1) Sorted search space &nbsp; 2) A graph cycle &nbsp; 3) A hash collision &nbsp; 4) A recursive function always
- **✅ Correct Answer:** `1. Sorted search space`
- **💡 Explanation:** Monotonicity allows the search space to be halved definitively at each comparison.

#### Q6. What is the average complexity of merge sort?
- **Options:** 1) O(log n) &nbsp; 2) O(n) &nbsp; 3) O(n log n) &nbsp; 4) O(n^2) always
- **✅ Correct Answer:** `3. O(n log n)`
- **💡 Explanation:** Merge sort divides the array in $\log n$ levels and executes $O(n)$ merging work across each level in all cases.

#### Q7. What does a primary key provide?
- **Options:** 1) A unique identifier for each row &nbsp; 2) Duplicate row storage &nbsp; 3) Automatic encryption &nbsp; 4) A network route
- **✅ Correct Answer:** `1. A unique identifier for each row`
- **💡 Explanation:** Primary keys enforce entity integrity by guaranteeing unique, non-null values for each tuple.

#### Q8. Which clause filters groups after aggregation?
- **Options:** 1) WHERE &nbsp; 2) HAVING &nbsp; 3) ORDER BY &nbsp; 4) FROM
- **✅ Correct Answer:** `2. HAVING`
- **💡 Explanation:** `WHERE` operates on row-level predicates before aggregation; `HAVING` filters aggregated group records.

#### Q9. Which JOIN keeps all rows from the left table?
- **Options:** 1) INNER JOIN &nbsp; 2) LEFT JOIN &nbsp; 3) CROSS JOIN only &nbsp; 4) RIGHT JOIN only
- **✅ Correct Answer:** `2. LEFT JOIN`
- **💡 Explanation:** `LEFT JOIN` preserves all tuples from the left table, padding right-side attributes with `NULL` when unmatched.

#### Q10. What does GROUP BY do?
- **Options:** 1) Combines rows into groups for aggregation &nbsp; 2) Deletes duplicate tables &nbsp; 3) Creates an index automatically &nbsp; 4) Encrypts columns
- **✅ Correct Answer:** `1. Combines rows into groups for aggregation`
- **💡 Explanation:** `GROUP BY` clusters records possessing identical keys so aggregate functions (`COUNT`, `SUM`, `AVG`) compute summaries per partition.

#### Q11. What is polymorphism?
- **Options:** 1) One interface with multiple implementations &nbsp; 2) One variable with no type &nbsp; 3) Deleting inherited methods &nbsp; 4) Encrypting objects
- **✅ Correct Answer:** `1. One interface with multiple implementations`
- **💡 Explanation:** Polymorphism enables client code to interact with derived instances via a uniform base class interface (e.g. virtual methods).

#### Q12. Which status code means a resource was not found?
- **Options:** 1) 200 &nbsp; 2) 201 &nbsp; 3) 404 &nbsp; 4) 500
- **✅ Correct Answer:** `3. 404`
- **💡 Explanation:** HTTP 404 Not Found signifies that the requested endpoint or resource was not located on the origin server.

#### Q13. Which method is commonly used to partially update a resource?
- **Options:** 1) GET &nbsp; 2) PATCH &nbsp; 3) TRACE &nbsp; 4) HEAD
- **✅ Correct Answer:** `2. PATCH`
- **💡 Explanation:** `PATCH` conveys partial delta updates, whereas `PUT` replaces the entire resource representation.

#### Q14. What is a process?
- **Options:** 1) A program in execution &nbsp; 2) A CSS selector &nbsp; 3) A database column &nbsp; 4) A network cable
- **✅ Correct Answer:** `1. A program in execution`
- **💡 Explanation:** A process is an active instance of a computer program with its own address space, memory pages, threads, and file descriptors.

#### Q15. Which protocol translates domain names to IP addresses?
- **Options:** 1) DNS &nbsp; 2) FTP &nbsp; 3) SSH &nbsp; 4) SMTP
- **✅ Correct Answer:** `1. DNS`
- **💡 Explanation:** Domain Name System (DNS) resolves human-friendly hostnames into machine-routable IPv4/IPv6 addresses.

#### Q16. What does horizontal scaling usually mean?
- **Options:** 1) Adding more instances &nbsp; 2) Increasing one machine’s RAM only &nbsp; 3) Deleting replicas &nbsp; 4) Changing a font size
- **✅ Correct Answer:** `1. Adding more instances`
- **💡 Explanation:** Horizontal scaling (scale-out) provisions multiple compute nodes behind a load balancer to distribute concurrent traffic.

#### Q17. What is the safest place for a password in a database?
- **Options:** 1) Plain text &nbsp; 2) A salted slow hash &nbsp; 3) A URL parameter &nbsp; 4) A CSS file
- **✅ Correct Answer:** `2. A salted slow hash`
- **💡 Explanation:** Passwords must be hashed using deliberately slow, salted cryptographic functions (bcrypt, Argon2, PBKDF2) to resist brute-force and rainbow table attacks.

#### Q18. What does a commit represent in Git?
- **Options:** 1) A recorded set of repository changes &nbsp; 2) A database join &nbsp; 3) A browser refresh &nbsp; 4) A cloud region
- **✅ Correct Answer:** `1. A recorded set of repository changes`
- **💡 Explanation:** A Git commit is an immutable snapshot of staged modifications associated with a unique SHA-1/SHA-256 hash.

#### Q19. What does the DOM represent?
- **Options:** 1) The document as an object tree &nbsp; 2) A database index &nbsp; 3) A CPU scheduler &nbsp; 4) A network packet
- **✅ Correct Answer:** `1. The document as an object tree`
- **💡 Explanation:** The Document Object Model (DOM) is an in-memory, tree-structured API representing an HTML document.

#### Q20. What is a regression test?
- **Options:** 1) A test that catches a previously fixed defect returning &nbsp; 2) A random manual click &nbsp; 3) A production deployment &nbsp; 4) A code formatter
- **✅ Correct Answer:** `1. A test that catches a previously fixed defect returning`
- **💡 Explanation:** Regression tests safeguard established behavior against inadvertent side effects from refactoring or new features.

---

### 🎙️ Section 3: English Communication (20 Questions)

| # | Question & Context | Options | Correct Answer | Explanation |
|---|---|---|---|---|
| **1** | Choose the clearest professional sentence. *(Reading)* | 1. Send report when done.<br>2. Please send the completed report by 5 PM.<br>3. Report send fast.<br>4. You sending report? | **2. Please send the completed report by 5 PM.** | Explicit deadline, polite modality, actionable tone. |
| **2** | Choose the correct sentence. *(Grammar)* | 1. The team have finished the task.<br>2. The team has finished the task.<br>3. The team finishing task.<br>4. The team finish the task yesterday. | **2. The team has finished the task.** | Collective noun "team" is singular in standard corporate English. |
| **3** | Choose the correct sentence. *(Grammar)* | 1. She has completed the report.<br>2. She have completed the report.<br>3. She completing report.<br>4. She complete yesterday report. | **1. She has completed the report.** | Third-person singular "she" pairs with singular auxiliary "has". |
| **4** | By next Monday, the team ___ the migration. *(Tenses)* | 1. will complete<br>2. will have completed<br>3. completed<br>4. has complete | **2. will have completed** | Future perfect indicates an action to be finished before a specified future milestone. |
| **5** | The meeting starts ___ 10 AM. *(Prepositions)* | 1. in<br>2. on<br>3. at<br>4. by | **3. at** | Exact clock times take the preposition "at". |
| **6** | Choose closest meaning of *reliable*. *(Vocabulary)* | 1. Dependable<br>2. Doubtful<br>3. Temporary<br>4. Delayed | **1. Dependable** | Trustworthy and consistent. |
| **7** | Choose the corrected sentence. *(Error Correction)* | 1. Neither answer are correct.<br>2. Neither answer is correct.<br>3. Neither answers is correct.<br>4. Neither answer be correct. | **2. Neither answer is correct.** | "Neither" functions as a singular subject governing "is". |
| **8** | She is ___ honest developer. *(Articles)* | 1. a<br>2. an<br>3. the only<br>4. no article | **2. an** | Silent 'h' in "honest" produces initial vowel sound `/ˈɒnɪst/`. |
| **9** | Active voice of: *The defect was fixed by Ravi.* *(Voice)* | 1. Ravi fixed the defect.<br>2. Ravi was fixed by the defect.<br>3. The defect fixed Ravi.<br>4. Ravi is fixing by defect. | **1. Ravi fixed the defect.** | Subject (Ravi) performs action directly. |
| **10** | Which sentence should begin a formal email? *(Email)* | 1. Send it now.<br>2. I hope you are doing well.<br>3. Why did you delay?<br>4. Reply immediately. | **2. I hope you are doing well.** | Standard polite business greeting. |
| **11** | A concise summary should contain what? *(Reading)* | 1. Every minor detail<br>2. The central idea and key supporting points<br>3. Only an opinion<br>4. Unrelated examples | **2. The central idea and key supporting points** | Core message preservation without extraneous filler. |
| **12** | Choose correct conditional sentence. *(Grammar)* | 1. If I had time, I will help.<br>2. If I have time, I will help.<br>3. If I have time, I helped.<br>4. If I having time, I help. | **2. If I have time, I will help.** | Type 1 Conditional: If + Present Simple, will + base form. |
| **13** | Choose the opposite of *expand*. *(Vocabulary)* | 1. Increase<br>2. Extend<br>3. Contract<br>4. Improve | **3. Contract** | To decrease in dimensions. |
| **14** | The build failed; ___, the deployment was postponed. *(Connectors)* | 1. however<br>2. therefore<br>3. although<br>4. meanwhile | **2. therefore** | Demonstrates cause-and-effect relationship. |
| **15** | Choose correct sentence. *(Grammar)* | 1. The information are useful.<br>2. The information is useful.<br>3. The informations is useful.<br>4. The information be useful. | **2. The information is useful.** | "Information" is an uncountable singular noun. |
| **16** | Reported form of: *He said, "I am ready."* *(Reported Speech)* | 1. He said that he was ready.<br>2. He said that I am ready.<br>3. He says he ready.<br>4. He said he is ready yesterday. | **1. He said that he was ready.** | Present "am" backshifts to past "was" in indirect speech. |
| **17** | Appropriate formal request closing? *(Writing)* | 1. Do it fast.<br>2. Thanks in advance for your help.<br>3. Whatever works.<br>4. Bye. | **2. Thanks in advance for your help.** | Professional courtesy. |
| **18** | What does an inference require? *(Reading)* | 1. A conclusion supported by clues<br>2. A random guess only<br>3. A copied title<br>4. No evidence | **1. A conclusion supported by clues** | Textual evidence evaluated via logical reasoning. |
| **19** | Choose correct comparative sentence. *(Grammar)* | 1. This solution is more efficient than the old one.<br>2. This solution is most efficient than old.<br>3. This solution more efficient the old.<br>4. This solution is efficient than old. | **1. This solution is more efficient than the old one.** | Proper comparative construction "more efficient than". |
| **20** | Which sentence uses punctuation correctly? *(Punctuation)* | 1. Before deploying, test the change.<br>2. Before deploying test, the change.<br>3. Before, deploying test the change.<br>4. Before deploying test the, change. | **1. Before deploying, test the change.** | Dependent introductory clause isolated with comma. |

---

### 🧩 Section 4: Problem Solving

#### Q1. A process doubles its output each hour. If it produces 3 units in hour 1, how many units does it produce in hour 5?
- **Options:** 1) 12 &nbsp;&nbsp; 2) 24 &nbsp;&nbsp; 3) 48 &nbsp;&nbsp; 4) 96
- **✅ Correct Answer:** `3. 48`
- **💡 Explanation:** Geometric progression: $a_1 = 3$, $r = 2$. $a_5 = 3 \times 2^{5-1} = 3 \times 16 = 48$.

#### Q2. Which data structure is best for breadth-first traversal (BFS) of a graph?
- **Options:** 1) Stack &nbsp;&nbsp; 2) Queue &nbsp;&nbsp; 3) Heap only &nbsp;&nbsp; 4) Hash set only
- **✅ Correct Answer:** `2. Queue`
- **💡 Explanation:** FIFO (First-In, First-Out) order ensures vertices at distance $d$ are processed before those at distance $d+1$.

---

### 🐞 Section 5: AI-Assisted Debugging

#### Q1. A loop accesses `array[i]` while `i <= array.length`. What is the likely defect?
- **Options:** 1) The loop should start at 1 &nbsp; 2) The final access is out of bounds &nbsp; 3) Arrays cannot use loops &nbsp; 4) The array must be sorted
- **✅ Correct Answer:** `2. The final access is out of bounds.`
- **💡 Explanation:** Array indices range $0 \le i \le \text{length} - 1$. Testing $i \le \text{length}$ accesses index $\text{length}$, causing an out-of-bounds error.

#### Q2. A UI handler reads `input.value` before the input element is queried. What should be fixed first?
- **Options:** 1) Add a second stylesheet &nbsp; 2) Query the element before reading its value &nbsp; 3) Convert the value to an array &nbsp; 4) Remove the event handler
- **✅ Correct Answer:** `2. Query the element before reading its value.`
- **💡 Explanation:** Calling `.value` on an `undefined` element reference raises a `TypeError: Cannot read properties of null`.

---

### 🛠️ Section 6: AI-Assisted Feature Development

#### Q1. Which React practice prevents a list warning when rendering items from an array?
- **Options:** 1) Use a stable key for each item &nbsp; 2) Put all items in one string &nbsp; 3) Use document.write &nbsp; 4) Reload the page after every render
- **✅ Correct Answer:** `1. Use a stable key for each item.`
- **💡 Explanation:** React's virtual DOM reconciliation relies on unique, stable keys to identify item identity shifts between renders.

#### Q2. Which approach is best for a reusable form field component?
- **Options:** 1) Hard-code every field label &nbsp; 2) Accept label, value, and onChange as props &nbsp; 3) Store values in global HTML attributes only &nbsp; 4) Use inline SQL in the component
- **✅ Correct Answer:** `2. Accept label, value, and onChange as props.`
- **💡 Explanation:** Passing controlled state props ensures unidirectional data flow, composability, and testability.

---

### ✍️ Section 7: Prompt Engineering

#### Q1. Which prompt is most useful for asking an AI to fix a defect?
- **Options:** 1) Fix it &nbsp; 2) Make this better &nbsp; 3) Explain the error, preserve the public API, show the patch, and add a regression test &nbsp; 4) Write anything
- **✅ Correct Answer:** `3. Explain the error, preserve the public API, show the patch, and add a regression test.`
- **💡 Explanation:** Constraining the AI to preserve contracts and supply automated regression tests ensures verified, non-breaking bug fixes.

#### Q2. What should be included when asking AI to generate a feature safely?
- **Options:** 1) Only the feature name &nbsp; 2) Requirements, constraints, existing interfaces, and acceptance tests &nbsp; 3) A random example &nbsp; 4) No expected behaviour
- **✅ Correct Answer:** `2. Requirements, constraints, existing interfaces, and acceptance tests.`
- **💡 Explanation:** Specification grounding eliminates guesswork and guarantees the output meets design constraints.

---

### 🧠 Section 8: Cognitive Assessment

#### Q1. Some employees who work day shifts also work double shifts. All double-shift employees receive a meal break. Which conclusion must be true?
- **Options:** 1) All day-shift employees receive a meal break &nbsp; 2) Some day-shift employees receive a meal break &nbsp; 3) No day-shift employees receive a meal break &nbsp; 4) Only day-shift employees receive a meal break
- **✅ Correct Answer:** `2. Some day-shift employees receive a meal break.`
- **💡 Explanation:** The subset of day-shift workers who work double shifts unconditionally receive meal breaks.

#### Q2. A project must finish before the audit. The audit is scheduled after testing, and testing starts only after integration. What must happen before the audit?
- **Options:** 1) Integration and testing &nbsp; 2) The audit and integration &nbsp; 3) Only project planning &nbsp; 4) Nothing; order is unknown
- **✅ Correct Answer:** `1. Integration and testing.`
- **💡 Explanation:** Order: $\text{Integration} \to \text{Testing} \to \text{Audit}$. Both precede the audit.

#### Q3. A, B, C, and D are seated in a row. A is left of B. C is right of B. D is left of A. Which order is possible?
- **Options:** 1) D, A, B, C &nbsp; 2) A, D, B, C &nbsp; 3) B, A, C, D &nbsp; 4) C, B, A, D
- **✅ Correct Answer:** `1. D, A, B, C`
- **💡 Explanation:** Positional constraints: $D < A < B < C$.

#### Q4. A number is increased by 20%, then reduced by 20%. Compared with the original number, the result is:
- **Options:** 1) The same &nbsp; 2) 4% lower &nbsp; 3) 4% higher &nbsp; 4) 20% lower
- **✅ Correct Answer:** `2. 4% lower.`
- **💡 Explanation:** $1.20 \times 0.80 = 0.96 \implies 1 - 0.96 = 0.04$ (4% reduction).

#### Q5. Every approved request has a reference number. Request R has no reference number. What follows?
- **Options:** 1) Request R is approved &nbsp; 2) Request R is not approved &nbsp; 3) Request R is urgent &nbsp; 4) No conclusion can be made
- **✅ Correct Answer:** `2. Request R is not approved.`
- **💡 Explanation:** Contrapositive rule ($P \implies Q \iff \neg Q \implies \neg P$).

#### Q6. A team completes 18 reviews in 3 hours at a steady rate. How many reviews can it complete in 5 hours?
- **Options:** 1) 24 &nbsp; 2) 27 &nbsp; 3) 30 &nbsp; 4) 36
- **✅ Correct Answer:** `3. 30`
- **💡 Explanation:** Velocity = $18 / 3 = 6$ reviews/hour. In 5 hours: $6 \times 5 = 30$ reviews.

---

> 🚀 **Return to Master Guide:** [Capgemini Master Overview](./README.md) | [Stage 4 — AI-Assisted Coding](./04_AI_Assisted_Coding.md)
