# 01 — 100-minute coding test

## What is confirmed, and what is only a forecast

**Confirmed:** 100 minutes on POD.AI. The email calls the test coding based and warns that it will be difficult.

**Not confirmed:** number of questions, exact difficulty, whether it includes MCQs, language/runtime rules, and whether external tools are allowed. Do not assume the older Acko HackerRank or Smart-Browser format applies.

Recent candidate reports suggest practicing varied DSA rather than memorizing one set: stack/string reduction, graph connectivity/Eulerian circuits, dynamic programming, arrays, trees, and shortest-path or route optimization have all appeared in different Acko hiring rounds. These are practice signals only.

## Timed mock A (100 minutes)

Use your strongest language. No AI assistance for this mock. Set a timer and write runnable code with edge-case checks.

### Q1 — Remove patterns for maximum score (20 min)

Given a string `s`, repeatedly remove either substring `"ab"` for `x` points or `"ba"` for `y` points. Choose the removals and order to maximize the total score. Return the maximum.

Example: `s = "cdbcbbaaabab"`, `x = 4`, `y = 5` → `19`.

Constraints: `1 ≤ |s| ≤ 200000`, `1 ≤ x,y ≤ 10^9`.

Practice focus: greedy ordering plus stack scan; justify why removing the higher-value pair first is optimal, and use a second scan for the other pair.

### Q2 — Can words form a circle? (30 min)

Given lowercase words, can you arrange every word exactly once so that the last character of each word equals the first character of the next, including the last-to-first connection? Return true/false.

Example: `["ab", "bc", "ca"]` → `true`; `["ab", "bc"]` → `false`.

Constraints: up to `200000` words.

Practice focus: directed multigraph on 26 letters; degree balance and one strongly connected component among nonzero-degree vertices, or an equivalent Eulerian-circuit test. Explain why checking only in-degree = out-degree is insufficient if the used vertices are disconnected.

### Q3 — Fill missing values with adjacent difference at most one (50 min)

An array has known positive values and zeroes for missing entries. Replace every zero by a value in `[1,m]` so adjacent values differ by at most one. Count valid completed arrays modulo `1,000,000,007`.

Example: `arr = [0,0]`, `m = 2` → `4` (`[1,1]`, `[1,2]`, `[2,1]`, `[2,2]`).

Constraints: `1 ≤ n ≤ 100000`, `1 ≤ m ≤ 100`.

Practice focus: DP by position and ending value; transitions from `v-1`, `v`, `v+1`. For fixed values, permit only that value. State complexity and memory optimization.

### Mock A self-review

- Did you clarify constraints and return type before coding?
- Did you test empty/minimum input, one element, repeated values, boundaries and maximum constraints?
- Did you state time and space complexity?
- For Q2, did you cover disconnected balanced components?
- For Q3, did you handle the modulo and zero/known values correctly?

## Timed mock B (100 minutes)

Use this as a second attempt after reviewing mock A.

1. **20 min — Make array strictly increasing at minimum cost.** Each value may be incremented or decremented by one per operation. Find the fewest operations to make the sequence strictly increasing (and compare with strictly decreasing if asked). Practice the dynamic programming/order-statistics formulation; brute force over a tiny value range first, then explain how constraints affect the solution.
2. **30 min — House Robber II.** Circular houses; adjacent houses cannot both be robbed. Split into ranges excluding the first or last house and apply the linear DP. Include `n = 1`.
3. **50 min — Minimum route to collect weighted vehicles.** Points have coordinates and a pickup weight; a truck with capacity `C` starts and returns to the garage, may make multiple trips, and must collect all vehicles. Clarify whether the task asks exact minimum distance, whether capacity is by weight or item count, and whether the route is Euclidean or grid distance. Start with a correct small-input exponential/DP solution, then optimize only after the constraints are known. This mirrors an interview-reported prompt, not a known POD.AI question.

## High-yield problem list

Use these names to find canonical statements on LeetCode/GFG; solve by pattern, not by memorizing a company tag.

| Pattern | Practice problems |
|---|---|
| Arrays / hash maps | Two Sum; 3Sum; Majority Element; Move Zeroes |
| Stack / greedy | Maximum Score From Removing Substrings (LeetCode 1717); Valid Parentheses; Next Greater Element |
| Graphs | Course Schedule; Number of Connected Components; Critical Connections; Reconstruct Itinerary / Eulerian circuit; Min-Cut basics |
| DP | Frog Jump; House Robber II; Unique Paths II; Coin Change; Longest Increasing Subsequence |
| Trees | Binary Tree Level Order Traversal; level-wise sums; validate BST |
| Regex / strings | regex matching a first/last-character condition; KMP or string hashing basics |

## 100-minute execution strategy

- First 5 minutes: scan all questions, constraints, input/output and language requirements.
- Pick the highest-confidence full solve first; don’t spend half the test stuck on one hard problem.
- Reserve the final 10 minutes for compilation, boundary tests, complexity and fixing rushed errors.
- If partial scoring exists, submit a correct baseline before attempting a risky optimization.
- Keep code readable. Use helper functions when they reduce mistakes; avoid clever shortcuts under time pressure.
