# 05 — Worked DSA solutions and reasoning

These are reference explanations for the practice questions, not claimed answers to the upcoming POD.AI test. Use the language you intend to use in the test and re-implement from memory after reading each explanation.

## 1. Remove `ab` / `ba` for maximum score

### Key idea

Only substrings `ab` and `ba` score points. If `x ≥ y`, remove `ab` first everywhere; otherwise remove `ba` first. Then remove the other pair from the remaining string.

### Why the higher score goes first

For these two opposite pairs, taking the higher-valued pair first preserves the most valuable available removal; taking the lower-valued pair can consume a character needed for the higher score. Repeatedly remove the more valuable pair, then scan the residual string for the lower-valued pair. This exchange argument is specific to these pairs and should not be generalized to arbitrary substring-removal problems.

### Stack scan

For a chosen pair `(left,right)`, scan characters left-to-right. Push each character. If the stack ends in `left,right`, pop both and add the pair score. Each character is pushed and popped at most once.

```text
removePair(s, left, right, score):
    stack = []
    points = 0
    for ch in s:
        if ch == right and stack is nonempty and stack.top == left:
            stack.pop()
            points += score
        else:
            stack.push(ch)
    return join(stack), points

if x >= y:
    s, p1 = removePair(s, 'a', 'b', x)
    s, p2 = removePair(s, 'b', 'a', y)
else:
    s, p1 = removePair(s, 'b', 'a', y)
    s, p2 = removePair(s, 'a', 'b', x)
answer = p1 + p2
```

### Complexity and tests

- Time: `O(n)`; space: `O(n)`.
- Test `""`, `"ab"`, `"ba"`, `"abba"`, unrelated letters, `x = y`, and a long repeated pattern.
- Use a 64-bit integer for points if language integer size is limited; score can be on the order of `n * max(x,y)`.

## 2. Can every word form a circle?

### Model it as a directed graph

Each word is a directed edge from its first letter to its last letter. A valid circle is an Eulerian circuit: every word/edge is used exactly once, and the trail returns to its starting letter.

### Conditions

1. For every letter, in-degree equals out-degree.
2. All letters that appear in at least one edge belong to one strongly connected component of the directed graph (equivalently, after degree balance, the used graph is connected in the underlying undirected sense).

Degree balance alone is not enough: two separate cycles can each be balanced, but one circle cannot move between them.

### Algorithm

1. Count `out[u]`, `in[v]`; add each edge to forward and reverse adjacency lists.
2. Reject if any used vertex has `in != out`.
3. Choose a used vertex `s`; DFS from `s` in the forward graph and in the reversed graph.
4. Every used vertex must be visited in both traversals. If so, accept.

### Complexity and tests

- Time: `O(V + E)`; space: `O(V + E)`; here `V ≤ 26` and `E` is word count.
- `["ab","bc","ca"]` → true.
- `["ab","ba","cd","dc"]` → false (disconnected cycles).
- `["ab","bc"]` → false (degree imbalance).
- `["aa"]` → true. Decide explicitly how empty input should behave from the contract.

## 3. Fill zeros with adjacent difference at most one

Let `dp[v]` be the number of valid prefixes ending at value `v`. Values are in `[1,m]`.

### Initialization

- If the first entry is zero: `dp[v] = 1` for all `v`.
- If the first entry is fixed to `k`: `dp[k] = 1`, all others zero.

### Transition

At the next position, a value `v` can follow only `v-1`, `v`, or `v+1`:

`next[v] = dp[v-1] + dp[v] + dp[v+1] (mod M)`.

If the current input is fixed to `k`, retain only `next[k]`; all other endings become zero. Sum the final `dp` values.

### Complexity and implementation cautions

- Time: `O(nm)`; space: `O(m)` using two rows.
- Guard `v=1` and `v=m`; do not index outside the row.
- Apply modulo during each addition to avoid overflow in fixed-width languages.
- A fixed value outside `[1,m]` makes the answer zero or invalid, depending on the contract; handle explicitly.
- For `n=1`, a zero has `m` completions; a fixed value has one if in range.

## 4. House Robber II (circular houses)

In a circle, the first and last houses are adjacent. Any valid solution must exclude at least one of them. Solve the linear problem twice: houses `[0,n-2]` and `[1,n-1]`, then take the maximum. For `n=1`, return that value.

Linear recurrence with `prev2` and `prev1`:

```text
for value in range:
    current = max(prev1, prev2 + value)
    prev2 = prev1
    prev1 = current
```

- Time `O(n)`, extra space `O(1)`.
- State whether empty selection is allowed. If all values can be negative and at least one house must be selected, initialization must reflect that contract. The common LeetCode formulation uses nonnegative values and permits taking none.

## 5. Frog Jump

Given sorted stone coordinates, maintain `reachable[stone][lastJump]`. The first jump must be one unit; after a jump of `k`, the next jump may be `k-1`, `k`, or `k+1`, and must be positive. A hash map from coordinate to stone index finds the destination efficiently.

```text
reachable[0].add(0)
for each stone i:
    for k in reachable[i]:
        for step in [k-1, k, k+1]:
            if step > 0 and position[i] + step exists:
                reachable[destination].add(step)
return reachable[last] is nonempty
```

Complexity is `O(n^2)` worst-case time and space. Test a missing first-step stone, a reachable sequence, a large gap, and the one-stone case according to the prompt’s contract.

## 6. Majority Element

If a strict majority is guaranteed, Boyer–Moore voting finds a candidate in `O(n)` time and `O(1)` space: increment a candidate's count when equal, decrement otherwise, and replace it when the count reaches zero. If a majority is **not** guaranteed, perform a second pass to verify the candidate occurs more than `n/2` times.

## 7. Course Schedule / directed cycle

Represent prerequisite `u → v` as a directed edge according to the statement’s direction convention. Use Kahn’s algorithm: count in-degrees, enqueue zero-in-degree nodes, repeatedly remove one and decrement neighbors. If processed count equals vertex count, the graph is acyclic; otherwise a cycle remains.

- Time `O(V+E)`, space `O(V+E)`.
- Test disconnected DAG components, self-loop, duplicate-edge behavior, and no edges.
- Confirm edge direction before coding; a reversed interpretation may pass some examples and fail hidden cases.

## 8. Interview-reported truck and vehicle collection prompt

Reports do not specify all constraints, so there is no single defensible algorithm. Ask:

1. Is truck capacity a count of vehicles or total weight?
2. Must every vehicle be collected? Can trips be split across vehicles?
3. Is distance Euclidean, Manhattan/grid, or a road-network shortest path?
4. Must the truck return to the garage after each full load and at the end?
5. What are the bounds on vehicle count, coordinates, weights and capacity?

If `n` is small and each trip can collect a subset fitting capacity, a subset DP is a possible exact route: compute shortest route cost for each feasible subset, then DP over the remaining subset/trips. If capacity is number of vehicles and locations are one-dimensional, sorting and batching may yield a greedy solution. For general 2D metric routing with capacity, this resembles a capacitated vehicle-routing problem and can be computationally hard; do not claim nearest-neighbor is globally optimal. Show a small brute-force baseline, then use constraints to choose an exact or approximate approach.

## 9. Minimum operations to make values strictly increasing

The exact prompt must specify whether changing an element by `d` costs `|d|` and whether values are bounded. For the common unconstrained integer case, transform `b[i] = a[i] - i`; strict increase in `a` becomes nondecreasing `b`. Minimize the sum of absolute changes while making `b` nondecreasing. This is L1 isotonic regression; a median-block algorithm (pool adjacent violators with each block’s median) solves it. For a small bounded value range, DP over candidate values is easier to reason about. For strictly decreasing, reverse the input or negate values, with care for numeric bounds.

Do not conflate this cost-minimization version with changing as few elements as possible, which relates to LIS.

## Explain every solution aloud

For each problem, practice saying:

1. “I understand the inputs and output as …; I want to confirm …”
2. A simple correct baseline and its complexity.
3. The bottleneck and the data structure/state that removes it.
4. The invariant that remains true during the algorithm.
5. A dry run on a small case and one adversarial case.
6. Time, space, integer-range and edge-case checks.
