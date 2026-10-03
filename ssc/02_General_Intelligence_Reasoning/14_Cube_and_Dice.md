# 🎲 Cube and Dice Problems — Complete Guide for SSC CHSL

## Table of Contents
1. [Introduction](#introduction)
2. [Cube Basics](#cube-basics)
3. [Painting Cubes](#painting-cubes)
4. [Cutting Cubes](#cutting-cubes)
5. [Dice Problems](#dice-problems)
6. [Unfolded Dice (Net of Cube)](#unfolded-dice)
7. [Tips and Tricks](#tips-and-tricks)
8. [Last 10 Years PYQs](#last-10-years-pyqs)

---

## Introduction

Cube and Dice problems test spatial reasoning. You need to visualize 3D objects mentally — understanding which faces are opposite, adjacent, and how cubes behave when cut or painted.

**Weightage in SSC CHSL Tier 1:** 1-2 questions

---

## Cube Basics

### Properties of a Cube
```
Faces: 6
Edges: 12
Vertices (Corners): 8
Each face is a square
All edges are equal
```

### Types of Positions
```
Corner piece: Shares 3 faces (vertex)
Edge piece: Shares 2 faces (along edge)
Face/Center piece: Shows only 1 face (center of a face)
Inner piece: No face visible (fully inside)
```

---

## Painting Cubes

### When a cube of side 'n' is painted and cut into unit cubes:

### Master Formula Table

| Type | Formula | Example (n=3) |
|------|---------|---------------|
| Total unit cubes | n³ | 27 |
| 3 faces painted (corners) | 8 (always) | 8 |
| 2 faces painted (edges) | 12(n-2) | 12(1) = 12 |
| 1 face painted (face centers) | 6(n-2)² | 6(1)² = 6 |
| 0 faces painted (inner) | (n-2)³ | (1)³ = 1 |

### Verification: 8 + 12 + 6 + 1 = 27 ✅

### Common Values

| Side (n) | Total | 3-painted | 2-painted | 1-painted | 0-painted |
|----------|-------|-----------|-----------|-----------|-----------|
| 2 | 8 | 8 | 0 | 0 | 0 |
| 3 | 27 | 8 | 12 | 6 | 1 |
| 4 | 64 | 8 | 24 | 24 | 8 |
| 5 | 125 | 8 | 36 | 54 | 27 |
| 6 | 216 | 8 | 48 | 96 | 64 |

### Special Case: Only Some Faces Painted
```
If only ONE face is painted on a cube of side n:
- 1 face painted: (n-2)² cubes have 1 painted face
- 2 faces painted: 0 (since adjacent faces aren't painted)
- 3 faces painted: 0
- 0 faces painted: n³ - n² (total minus the painted layer)

If opposite faces painted (2 faces):
- 2 faces painted: 0
- 1 face painted: 2(n-2)²
- 0 faces painted: n³ - 2n² (approximately)
```

---

## Cutting Cubes

### Number of Pieces After Cuts
```
If a cube is cut:
- x times along length
- y times along width  
- z times along height

Total pieces = (x+1) × (y+1) × (z+1)

Example: A cube cut 2 times each way:
Pieces = (2+1) × (2+1) × (2+1) = 3 × 3 × 3 = 27
```

### Minimum Cuts for n Equal Pieces
```
To get n³ identical small cubes from a big cube:
Minimum cuts = 3(n-1)

Example: To get 27 small cubes:
27 = 3³, so n = 3
Minimum cuts = 3(3-1) = 6 cuts (2 along each dimension)

Example: To get 64 small cubes:
64 = 4³, so n = 4
Minimum cuts = 3(4-1) = 9 cuts (3 along each dimension)
```

---

## Dice Problems

### Standard Dice
```
In a standard dice:
- Sum of opposite faces = 7
- Pairs: 1↔6, 2↔5, 3↔4

Face arrangement (when 1 is on top, 2 faces you):
    1 (top)
    6 (bottom)
    2 (front)
    5 (back)
    3 (right)
    4 (left)
```

### Non-Standard Dice
```
Any dice where opposite faces DON'T sum to 7.
These are the tricky ones in SSC exams!
```

### Finding Opposite Faces from Dice Positions

#### Rule 1: Two Dice Positions — Common Face Method
```
If in two positions of the same die, ONE face is common:
The faces shown in the other positions are ADJACENT (not opposite) to each other.

Position 1: Top=1, Front=2, Right=3
Position 2: Top=1, Front=5, Right=4
Common: 1 (top in both)
So: 2↔5 and 3↔4 are NOT opposite (they're adjacent)
What IS opposite? 2↔4 or 2↔5? No!
Since 1 is common and on same position:
- In Pos 1: 2 is front, 3 is right
- In Pos 2: 5 is front, 4 is right
Rotating around 1 (top), 2→5 and 3→4
So 2 is opposite to the face not visible = need more info
```

#### Rule 2: Clockwise/Anti-clockwise Method
```
Look at three visible faces of a die.
If you read the numbers going clockwise:
Example: 1, 2, 3 (clockwise around a corner)

Then opposite pairs can be determined:
- Face opposite to 1 = the face not visible
- Use two or three positions to figure out all opposites
```

---

## Unfolded Dice (Net of Cube)

### Six Standard Nets of a Cube
```
A cube can be unfolded into 11 different net patterns.
The most common ones tested in SSC:

Net 1 (Cross/Plus shape):
    ┌───┐
    │ 1 │
┌───┼───┼───┬───┐
│ 2 │ 3 │ 4 │ 5 │
└───┼───┼───┴───┘
    │ 6 │
    └───┘

In this net:
- 1 is opposite to 6
- 2 is opposite to 4
- 3 is opposite to 5
```

### Finding Opposite Faces from Net

#### Method: Count Gap Method
```
In any unfolded net:
- If two faces are separated by EXACTLY ONE face → they are OPPOSITE
- If two faces share an edge → they are ADJACENT

For the cross-shaped net:
    ┌───┐
    │ A │
┌───┼───┼───┬───┐
│ B │ C │ D │ E │
└───┼───┼───┴───┘
    │ F │
    └───┘

Opposite pairs:
A ↔ F (separated by C)
B ↔ D (separated by C)
C ↔ E (separated by D)
```

#### Common Net Patterns and Their Opposite Faces

```
Pattern: T-shape
┌───┬───┬───┬───┐
│ 1 │ 2 │ 3 │ 4 │
└───┴───┼───┼───┘
        │ 5 │
        └───┼───┐
            │ 6 │
            └───┘

Opposites: 1↔3, 2↔5, 4↔6

Pattern: L-shape
┌───┬───┬───┐
│ 1 │ 2 │ 3 │
└───┴───┼───┤
        │ 4 │
        ├───┤
        │ 5 │
        ├───┤
        │ 6 │
        └───┘

Opposites: 1↔4, 2↔5, 3↔6... (verify by folding mentally)
```

### Quick Rules for Nets
```
Rule 1: In a straight line of 4 faces:
        Face 1 and Face 4 are OPPOSITE

Rule 2: In a straight line of 3+ faces:
        Faces separated by one face are OPPOSITE

Rule 3: In an L-shape:
        The corner face is OPPOSITE to the face 2 positions away
        on the longer arm

Rule 4: NEVER opposite:
        Two faces that share an edge in the net are ADJACENT (never opposite)
```

---

## Tips and Tricks

### ⚡ Quick-Solving Strategy
1. **For painted cubes:** Memorize the formula table
2. **For dice:** Find opposite faces using the common-face method
3. **For nets:** Use the gap method to find opposite faces
4. **For standard dice:** Opposite faces sum to 7 (1↔6, 2↔5, 3↔4)

### 🎯 Common Exam Patterns
1. "How many cubes have 2 faces painted?" → Use 12(n-2) formula
2. "What is opposite to face X?" → Use two dice positions
3. "Which net forms this cube?" → Check opposite face rules

### 🧠 Memory Aids
```
Painted Cube Formulas:
3-painted: Always 8 (corners)
2-painted: 12(n-2) → edges
1-painted: 6(n-2)² → face centers
0-painted: (n-2)³ → hidden inside

Standard Dice: 1+6=7, 2+5=7, 3+4=7
```

---

## Last 10 Years PYQs

### PYQ 1 — SSC CHSL 2024
**Q.** A cube of side 4 cm is painted on all faces and cut into 1 cm cubes. How many cubes have exactly 2 faces painted?
- Formula: 12(n-2) = 12(4-2) = 12(2) = 24
- Answer: **24** ✅

### PYQ 2 — SSC CHSL 2024
**Q.** In a standard dice, if 3 is on top, what is on the bottom?
- Standard dice: opposite faces sum to 7
- 3 + ? = 7 → ? = 4
- Answer: **4** ✅

### PYQ 3 — SSC CHSL 2023
**Q.** A cube of side 3 is painted and cut into unit cubes. How many have exactly 1 face painted?
- Formula: 6(n-2)² = 6(1)² = 6
- Answer: **6** ✅

### PYQ 4 — SSC CHSL 2023
**Q.** Two positions of a dice are shown. In both, face 2 is common. Other faces visible: Position 1 shows 3,5; Position 2 shows 4,6. What is opposite to 3?
- Since 2 is common, the other faces rotate around it
- Need to determine which face is opposite 3
- Answer: **4** or **6** (depends on exact positioning shown)

### PYQ 5 — SSC CHSL 2022
**Q.** A cube of side 5 painted all faces, cut into unit cubes. How many have no face painted?
- Formula: (n-2)³ = (5-2)³ = 3³ = 27
- Answer: **27** ✅

### PYQ 6 — SSC CHSL 2022
**Q.** How many unit cubes have 3 faces painted (any cube)?
- Always 8 (at the 8 corners)
- Answer: **8** ✅

### PYQ 7 — SSC CHSL 2021
**Q.** A cube of side 4 is painted. Total unit cubes?
- n³ = 4³ = 64
- Answer: **64** ✅

### PYQ 8 — SSC CHSL 2021
**Q.** From a net of a cube, find which face is opposite to face marked 'A'.
- Use gap/net method
- Answer: Depends on specific net shown

### PYQ 9 — SSC CHSL 2020
**Q.** In a standard dice, if 1 is at top and 2 faces you, what is to your right?
- Standard arrangement: top=1, front=2 → right=3
- Answer: **3** ✅

### PYQ 10 — SSC CHSL 2020
**Q.** A cube of side 3 is painted. How many cubes have at least 2 faces painted?
- 3 faces: 8; 2 faces: 12(1)=12
- At least 2 = 8 + 12 = 20
- Answer: **20** ✅

### PYQ 11 — SSC CHSL 2019
**Q.** A cube painted on all faces is cut into 125 small cubes. How many have 2 faces painted?
- n³ = 125 → n = 5
- 2-painted: 12(5-2) = 36
- Answer: **36** ✅

### PYQ 12 — SSC CHSL 2019
**Q.** Which number is opposite to 4 in a standard dice?
- 4 + ? = 7 → ? = 3
- Answer: **3** ✅

### PYQ 13 — SSC CHSL 2018
**Q.** If a cube is cut 3 times parallel to each face, how many pieces?
- (3+1)(3+1)(3+1) = 4×4×4 = 64? No!
- Actually: 3 cuts along each of 3 dimensions → not clear if 3 total or 3 each
- If 3 cuts total (1 each way): (1+1)³ = 8
- If 3 cuts each way: (3+1)³ = 64

### PYQ 14 — SSC CHSL 2018
**Q.** A cube of side 6 is painted red. How many unit cubes have exactly 1 face painted?
- 6(n-2)² = 6(4)² = 6×16 = 96
- Answer: **96** ✅

### PYQ 15 — SSC CHSL 2017
**Q.** Two dice show faces: Die 1: top=1, front=5, right=2. Die 2: top=1, front=4, right=3. What is opposite 5?
- Common face: 1 (top)
- Die 1: front=5, right=2
- Die 2: front=4, right=3
- Rotating around 1: 5→4 means 5 and 4 are adjacent. Also 2→3 means adjacent.
- Opposite to 5: must be the unseen face. With 1 on top, 6 on bottom (if standard). If 5 front, 2 right → 4 left? Then opposite of 5 = back face.
- Answer: Depends on exact configuration

### PYQ 16 — SSC CHSL 2017
**Q.** A cube of side 4 painted. Cubes with exactly 3 painted faces?
- Always 8
- Answer: **8** ✅

### PYQ 17 — SSC CHSL 2016
**Q.** A cube painted on all faces cut into 8 equal pieces. All cubes have how many faces painted?
- n³ = 8 → n = 2
- When n=2, all 8 cubes are corner cubes → all have 3 faces painted
- Answer: **3 faces each** ✅

### PYQ 18 — SSC CHSL 2016
**Q.** In a dice, 1 is opposite 5, 2 is opposite 3. What is opposite 4?
- 1↔5, 2↔3, so remaining: 4↔6
- Answer: **6** ✅

### PYQ 19 — SSC CHSL 2015
**Q.** A cube of side 3 painted. How many cubes have at least 1 face painted?
- Total: 27; No face painted: (3-2)³ = 1
- At least 1 painted: 27 - 1 = 26
- Answer: **26** ✅

### PYQ 20 — SSC CHSL 2015
**Q.** A cube of side 5 painted blue. How many cubes have exactly 2 blue faces?
- 12(n-2) = 12(3) = 36
- Answer: **36** ✅

---

> **Final Tip:** Memorize the painted cube formulas — they save huge time. For dice, remember standard dice (opposite = 7). For nets, use the gap rule. Practice folding nets mentally! 🎲
