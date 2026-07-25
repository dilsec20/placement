# 📝 Cognitive Assessment — Practice Questions (Accenture PYQ)

> **Game-based patterns from real Accenture assessments | With detailed explanations**

---

## 📑 Index

1. [Fast Math — Number Series](#1-fast-math--number-series)
2. [Fast Math — Quick Arithmetic](#2-fast-math--quick-arithmetic)
3. [Fast Math — Bubble Sort](#3-fast-math--bubble-sort-ascending-order)
4. [Pathfinding Grid Puzzles](#4-pathfinding-grid-puzzles)
5. [Memory Recall Patterns](#5-memory-recall-patterns)
6. [Practice Exercises](#6-practice-exercises)

---

## 1. Fast Math — Number Series

**Find the missing number(s):**

---

**Q1.** 2, 4, 8, 16, __, 64
> **Answer: 32**
> Pattern: × 2 each time (Geometric, ratio = 2)

---

**Q2.** 3, 6, 11, 18, 27, __
> **Answer: 38**
> Differences: 3, 5, 7, 9, 11 (odd numbers increasing)

---

**Q3.** 1, 1, 2, 3, 5, 8, 13, __
> **Answer: 21**
> Fibonacci: each = sum of previous two

---

**Q4.** 100, 91, 83, 76, 70, __
> **Answer: 65**
> Differences: 9, 8, 7, 6, 5 (decreasing by 1)

---

**Q5.** 2, 3, 5, 7, 11, 13, __
> **Answer: 17**
> Prime number sequence

---

**Q6.** 4, 9, 25, 49, 121, __
> **Answer: 169**
> Squares of primes: 2², 3², 5², 7², 11², 13² = 169

---

**Q7.** 1, 8, 27, 64, __
> **Answer: 125**
> Cubes: 1³, 2³, 3³, 4³, 5³

---

**Q8.** 7, 14, 28, 56, __
> **Answer: 112**
> × 2 each time

---

**Q9.** 144, 121, 100, 81, __, 49
> **Answer: 64**
> Perfect squares in decreasing order: 12², 11², 10², 9², 8², 7²

---

**Q10.** 2, 6, 12, 20, 30, 42, __
> **Answer: 56**
> Pattern: n(n+1) → 1×2, 2×3, 3×4, 4×5, 5×6, 6×7, 7×8 = 56

---

## 2. Fast Math — Quick Arithmetic

**Solve within 3 seconds (speed is key):**

---

**Q11.** 48 × 5 = ?
> **Answer: 240**
> Trick: 48 ÷ 2 = 24, then × 10 = 240

---

**Q12.** 76 + 58 = ?
> **Answer: 134**
> Quick: 76 + 60 - 2 = 134

---

**Q13.** 63 × 11 = ?
> **Answer: 693**
> Trick: 6 _ 3 → middle = 6+3 = 9 → 693

---

**Q14.** 144 ÷ 12 = ?
> **Answer: 12**

---

**Q15.** 35² = ?
> **Answer: 1225**
> Trick: 3×4 = 12, append 25 → 1225

---

**Q16.** 15% of 280 = ?
> **Answer: 42**
> 10% = 28, 5% = 14 → 28+14 = 42

---

**Q17.** 125 + 246 + 375 = ?
> **Answer: 746**
> Group: (125+375) + 246 = 500 + 246 = 746

---

**Q18.** 7 × 8 × 9 = ?
> **Answer: 504**
> 7×8 = 56, 56×9 = 504

---

**Q19.** √196 = ?
> **Answer: 14**

---

**Q20.** 2⁸ = ?
> **Answer: 256**
> 2,4,8,16,32,64,128,256

---

## 3. Fast Math — Bubble Sort (Ascending Order)

**In the game, bubbles appear randomly — mentally sort and click smallest to largest:**

---

**Q21.** Bubbles: [17] [4] [23] [9] [11]
> **Click order:** 4 → 9 → 11 → 17 → 23

---

**Q22.** Bubbles: [3.5] [1.2] [7.8] [2.1] [5.5]
> **Click order:** 1.2 → 2.1 → 3.5 → 5.5 → 7.8

---

**Q23.** Bubbles: [100] [45] [78] [12] [89] [34]
> **Click order:** 12 → 34 → 45 → 78 → 89 → 100

---

**Q24.** Bubbles: [-5] [3] [-1] [7] [0]
> **Click order:** -5 → -1 → 0 → 3 → 7

---

**Tip:** Quickly identify the **minimum** first, click, then find next minimum. Don't try to sort all in head first.

---

## 4. Pathfinding Grid Puzzles

**Find the shortest valid path from S to G:**

---

**Q25.**
```
S . . # .
. # . . .
. . . # .
# . . . G
```
> **S = (0,0), G = (3,4)**
> Path: Right → Down → Right → Right → Down → Right → Down
> Steps: R, D, R, R, D, R, D (avoid # walls)

---

**Q26.**
```
S # . . .
. # . # .
. . . # .
. # . . G
```
> Path: Down → Down → Right → Right → Up → Right → Down → Down → Down
> Always check all possible routes — may be multiple valid paths.

---

**Q27.** Key Collection Problem:
```
S . . . .
. # K # .
. . . . .
. # . # K
G . . . .
```
> K = keys to collect (must collect ALL before reaching G)
> Strategy: Collect K(1,2) → Collect K(3,4) → Reach G

---

**Q28.** Direction Sequence — Set the arrows:
```
Character at (0,0), Goal at (2,3)
Available moves: ↑ ↓ ← →
Arrange: ↓ ↓ → → ↓ ← (6 moves maximum)
```
> **Optimal:** → → → ↓ ↓ (5 moves, depends on walls)

---

**Tips for Pathfinding:**
```
1. Scan for walls/obstacles FIRST
2. Count rows and columns to goal
3. Simple paths: go in 2 directions only
4. Complex paths: trace manually step by step
5. If stuck: work backwards from Goal
```

---

## 5. Memory Recall Patterns

**Study the pattern, then answer from memory:**

---

**Q29.** Grid pattern shown for 4 seconds:
```
[✓][  ][✓]
[  ][✓][  ]
[✓][  ][✓]
```
> This is an X-pattern (diagonals + center)
> **Memory trick:** Diagonal cross pattern

---

**Q30.** Sequence shown: 🔴 🔵 🟡 🔴 🟢
> **Recall:** Red, Blue, Yellow, Red, Green
> **Memory trick:** Group into pairs + last → (RB)(YR)G

---

**Q31.** Card positions shown briefly:
```
Position 1: ♠A   Position 2: ♥K   Position 3: ♦Q
Position 4: ♣J   Position 5: ♠10  Position 6: ♥9
```
> **Q: Which card is at Position 4?**
> **Answer: ♣J (Club Jack)**

---

**Q32.** Number grid shown for 3 seconds:
```
7  3  9
1  5  8
4  2  6
```
> Common questions: "What was in row 2, column 3?" → **Answer: 8**
> **Memory trick:** Read row by row and say it aloud mentally

---

**Memory Techniques:**
```
1. CHUNKING: Group items into 3-4 item clusters
2. STORY: Create a short story linking items
3. SPATIAL: Remember positions left-to-right, top-to-bottom
4. FIRST LETTER: Use initials (like acronyms)
5. REPETITION: Mentally repeat the pattern twice during display time
```

---

## 6. Practice Exercises

**Full mini-game simulations:**

---

**Exercise 1 — Fast Math Sprint (30 seconds):**
Solve as many as possible:
1. 13 × 7 = ? → **91**
2. 256 ÷ 8 = ? → **32**
3. 45 + 78 = ? → **123**
4. 99 × 11 = ? → **1089**
5. √225 = ? → **15**
6. 2⁶ = ? → **64**
7. 17 × 5 = ? → **85**
8. 144 ÷ 9 = ? → **16**

---

**Exercise 2 — Series Sprint:**
1. 2, 4, 8, 16, __ → **32**
2. 81, 64, 49, __ → **36**
3. 1, 4, 9, 16, __ → **25**
4. 11, 22, 44, __ → **88**
5. 5, 10, 20, 40, __ → **80**

---

**Exercise 3 — Grid Path (trace on paper):**
```
[S][ ][ ][#][ ]
[ ][#][ ][ ][ ]
[ ][ ][ ][#][ ]
[#][ ][#][ ][ ]
[ ][ ][ ][ ][G]
```
> Find a valid path from S(0,0) to G(4,4). Draw on paper!

---

> **Practice daily for 10–15 minutes with brain training apps for best results!**
