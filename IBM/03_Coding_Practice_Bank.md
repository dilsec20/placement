# 🎯 IBM Coding Practice Bank — 25 Curated LeetCode Problems

> **High-Frequency Algorithmic Patterns Tagged for IBM Online Assessments (OA)**  
> **Direct LeetCode links, pattern categorization, difficulty ratings, and high-yield solving strategies.**

---

## 📑 Summary Master Table

| # | Problem Name | Difficulty | Core Pattern | Direct LeetCode Link |
|---|---|---|---|---|
| 1 | **Gas Station** | 🟡 Medium | Greedy Circular Traversal (Identical to *Aladdin*) | [Solve Problem](https://leetcode.com/problems/gas-station/) |
| 2 | **Boats to Save People** | 🟡 Medium | Two Pointers Greedy (Identical to *Efficient Janitor*) | [Solve Problem](https://leetcode.com/problems/boats-to-save-people/) |
| 3 | **Contiguous Array** | 🟡 Medium | Prefix Sum + Hash Map (0s and 1s) | [Solve Problem](https://leetcode.com/problems/contiguous-array/) |
| 4 | **Group Anagrams** | 🟡 Medium | String Hash Signature (Identical to *Fun with Anagrams*) | [Solve Problem](https://leetcode.com/problems/group-anagrams/) |
| 5 | **String Compression** | 🟡 Medium | In-place Two Pointers (Similar to *Better Compression*) | [Solve Problem](https://leetcode.com/problems/string-compression/) |
| 6 | **Number of Provinces** | 🟡 Medium | Graph DFS / BFS (Identical to *Connected Groups*) | [Solve Problem](https://leetcode.com/problems/number-of-provinces/) |
| 7 | **Minimum Cost to Connect Sticks** | 🟡 Medium | Min-Heap Priority Queue (Identical to *Array Reduction*) | [Solve Problem](https://leetcode.com/problems/minimum-cost-to-connect-sticks/) |
| 8 | **Subarray Sum Equals K** | 🟡 Medium | Prefix Sum + Frequency Map | [Solve Problem](https://leetcode.com/problems/subarray-sum-equals-k/) |
| 9 | **Longest Substring Without Repeating Characters** | 🟡 Medium | Sliding Window + Hash Set | [Solve Problem](https://leetcode.com/problems/longest-substring-without-repeating-characters/) |
| 10 | **Top K Frequent Elements** | 🟡 Medium | Bucket Sort / Min-Heap | [Solve Problem](https://leetcode.com/problems/top-k-frequent-elements/) |
| 11 | **Two Sum II - Input Array Is Sorted** | 🟢 Easy | Two Pointers Inward Scan | [Solve Problem](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) |
| 12 | **3Sum** | 🟡 Medium | Sorting + Two Pointers | [Solve Problem](https://leetcode.com/problems/3sum/) |
| 13 | **Meeting Rooms II** | 🟡 Medium | Min-Heap / Coordinate Sweep | [Solve Problem](https://leetcode.com/problems/meeting-rooms-ii/) |
| 14 | **Rotting Oranges** | 🟡 Medium | Multi-Source BFS Matrix Traversal | [Solve Problem](https://leetcode.com/problems/rotting-oranges/) |
| 15 | **Valid Palindrome II** | 🟢 Easy | Two Pointers with 1 Skip | [Solve Problem](https://leetcode.com/problems/valid-palindrome-ii/) |
| 16 | **Rotate Array** | 🟡 Medium | In-Place 3-Step Reverse | [Solve Problem](https://leetcode.com/problems/rotate-array/) |
| 17 | **Product of Array Except Self** | 🟡 Medium | Prefix & Suffix Products | [Solve Problem](https://leetcode.com/problems/product-of-array-except-self/) |
| 18 | **Minimum Swaps to Group All 1's Together** | 🟡 Medium | Fixed Sliding Window of Size Count(1) | [Solve Problem](https://leetcode.com/problems/minimum-swaps-to-group-all-1s-together/) |
| 19 | **Find All Anagrams in a String** | 🟡 Medium | Fixed Sliding Window + Frequency Array | [Solve Problem](https://leetcode.com/problems/find-all-anagrams-in-a-string/) |
| 20 | **Kth Largest Element in an Array** | 🟡 Medium | Min-Heap of Size K / Quickselect | [Solve Problem](https://leetcode.com/problems/kth-largest-element-in-an-array/) |
| 21 | **Shortest Path in Binary Matrix** | 🟡 Medium | 8-Directional BFS | [Solve Problem](https://leetcode.com/problems/shortest-path-in-binary-matrix/) |
| 22 | **Valid Parentheses** | 🟢 Easy | Stack Matching | [Solve Problem](https://leetcode.com/problems/valid-parentheses/) |
| 23 | **Car Pooling** | 🟡 Medium | Difference Array (Sweep Line) | [Solve Problem](https://leetcode.com/problems/car-pooling/) |
| 24 | **Search a 2D Matrix** | 🟡 Medium | Binary Search on Flattened Grid | [Solve Problem](https://leetcode.com/problems/search-a-2d-matrix/) |
| 25 | **Coin Change** | 🟡 Medium | 1D Dynamic Programming (Unbounded Knapsack) | [Solve Problem](https://leetcode.com/problems/coin-change/) |

---

## 🪟 1. Greedy & Two Pointers (IBM Top Yield)

### 1. Gas Station (LeetCode 134)
* **Link:** [https://leetcode.com/problems/gas-station/](https://leetcode.com/problems/gas-station/)
* **Difficulty:** Medium | **Complexity:** $O(N)$ Time, $O(1)$ Space
* **IBM Relevance:** Exact duplicate of IBM's *Aladdin and His Carpet*.
* **Intuition:** If total gas $\ge$ total cost, a solution is guaranteed. Reset starting station whenever the running tank drops below zero.

### 2. Boats to Save People (LeetCode 881)
* **Link:** [https://leetcode.com/problems/boats-to-save-people/](https://leetcode.com/problems/boats-to-save-people/)
* **Difficulty:** Medium | **Complexity:** $O(N \log N)$ Time, $O(1)$ Space
* **IBM Relevance:** Exact twin of IBM's *Efficient Janitor* (limit = 3.00).
* **Intuition:** Sort people by weight. Pair the lightest with the heaviest. If the sum exceeds limit, the heaviest must ride alone.

### 3. Minimum Swaps to Group All 1's Together (LeetCode 1151)
* **Link:** [https://leetcode.com/problems/minimum-swaps-to-group-all-1s-together/](https://leetcode.com/problems/minimum-swaps-to-group-all-1s-together/)
* **Difficulty:** Medium | **Complexity:** $O(N)$ Time, $O(1)$ Space
* **IBM Relevance:** Frequently reported in 2024–2025 IBM campus OA batches.
* **Intuition:** Total number of 1s in the array ($K$) equals the required window size. Slide a window of size $K$ across the array and find the maximum number of 1s inside any window. The answer is $K - \max(\text{ones})$.

---

## 🧱 2. Prefix Sums & Hashing

### 4. Contiguous Array (LeetCode 525)
* **Link:** [https://leetcode.com/problems/contiguous-array/](https://leetcode.com/problems/contiguous-array/)
* **Difficulty:** Medium | **Complexity:** $O(N)$ Time, $O(N)$ Space
* **IBM Relevance:** Found under IBM *Binary Array Subsegments*.
* **Intuition:** Map `0 -> -1` and `1 -> +1`. When running prefix sum repeats at index $i$, the subarray from the first seen occurrence has equal counts of 0 and 1.

### 5. Subarray Sum Equals K (LeetCode 560)
* **Link:** [https://leetcode.com/problems/subarray-sum-equals-k/](https://leetcode.com/problems/subarray-sum-equals-k/)
* **Difficulty:** Medium | **Complexity:** $O(N)$ Time, $O(N)$ Space
* **Intuition:** Maintain a hash map storing the frequencies of prefix sums. At each index, add `map[current_sum - k]` to the total count.

### 6. Car Pooling / Difference Array (LeetCode 1094)
* **Link:** [https://leetcode.com/problems/car-pooling/](https://leetcode.com/problems/car-pooling/)
* **Difficulty:** Medium | **Complexity:** $O(N + L)$ Time
* **IBM Relevance:** Directly teaches the Difference Array pattern needed to solve *Roll the String* without TLE.
* **Intuition:** Add $+val$ at start coordinate and $-val$ at end coordinate. Take running prefix sum to evaluate capacity at each step.

---

## 🌲 3. Priority Queues & Heaps

### 7. Minimum Cost to Connect Sticks (LeetCode 1167)
* **Link:** [https://leetcode.com/problems/minimum-cost-to-connect-sticks/](https://leetcode.com/problems/minimum-cost-to-connect-sticks/)
* **Difficulty:** Medium | **Complexity:** $O(N \log N)$ Time
* **IBM Relevance:** Exact duplicate of IBM's *Minimum Cost to Reduce Array*.
* **Intuition:** Min-heap to repeatedly pop two smallest elements and push their sum back.

### 8. Top K Frequent Elements (LeetCode 347)
* **Link:** [https://leetcode.com/problems/top-k-frequent-elements/](https://leetcode.com/problems/top-k-frequent-elements/)
* **Difficulty:** Medium | **Complexity:** $O(N \log K)$ Time
* **IBM Relevance:** Evaluates frequency tracking and heap maintenance.

---

## 🌐 4. Graphs, Matrices & BFS

### 9. Number of Provinces (LeetCode 547)
* **Link:** [https://leetcode.com/problems/number-of-provinces/](https://leetcode.com/problems/number-of-provinces/)
* **Difficulty:** Medium | **Complexity:** $O(N^2)$ Time
* **IBM Relevance:** Exact duplicate of IBM's *Connected Groups*.
* **Intuition:** Standard DFS/BFS traversal on adjacency matrix to count disjoint connected components.

### 10. Shortest Path in Binary Matrix (LeetCode 1091)
* **Link:** [https://leetcode.com/problems/shortest-path-in-binary-matrix/](https://leetcode.com/problems/shortest-path-in-binary-matrix/)
* **Difficulty:** Medium | **Complexity:** $O(R \times C)$ Time
* **IBM Relevance:** Tests the exact grid BFS queue mechanics required for *Reach the End in Time*.

---

## 💡 Practice Strategy for IBM OA
1. **Solve by Pattern, Not Memorization:** Notice that IBM heavily favors **Greedy**, **Two Pointers**, and **Prefix Sum + Hash Maps**.
2. **Handle Large Bounds:** Always check if constraints allow $O(N^2)$ or require $O(N)$. For $N = 10^5$, an $O(N^2)$ solution will pass only 3/15 test cases!
3. **Use HackerRank Templates:** Familiarize yourself with writing helper methods inside custom classes and managing 64-bit integer overflows.
