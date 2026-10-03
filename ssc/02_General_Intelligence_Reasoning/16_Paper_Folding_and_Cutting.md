# ✂️ Paper Folding and Cutting — Complete Guide for SSC CHSL

## Table of Contents
1. [Introduction](#introduction)
2. [Paper Folding Concepts](#paper-folding)
3. [Paper Cutting Concepts](#paper-cutting)
4. [Common Patterns](#common-patterns)
5. [Tips and Tricks](#tips-and-tricks)
6. [Last 10 Years PYQs](#pyqs)

---

## Introduction

Paper Folding and Cutting questions show a paper being folded in specific ways, then cut or punched with holes. You must determine how the paper looks when unfolded. This tests **spatial visualization**.

**Weightage in SSC CHSL Tier 1:** 1-2 questions

---

## Paper Folding Concepts

### Basic Folds

#### Fold 1: Vertical Fold (Left to Right)
```
Original:           After Fold:
┌─────────┐        ┌────┐
│         │   →    │    │
│         │        │    │ (right half folded onto left)
│         │        │    │
└─────────┘        └────┘
```

#### Fold 2: Horizontal Fold (Bottom to Top)
```
Original:           After Fold:
┌─────────┐        ┌─────────┐
│         │   →    │         │ (bottom folded onto top)
│         │        └─────────┘
│         │
└─────────┘
```

#### Fold 3: Diagonal Fold
```
Original:           After Fold:
┌─────────┐        ┌────┐
│         │   →    │   /│ (triangle shape)
│         │        │  / │
│         │        │ /  │
└─────────┘        └────┘
```

---

## Paper Cutting Concepts

### Rule: When you unfold, cuts are MIRRORED along the fold line

### Single Fold + Cut
```
1. Paper folded once (halved)
2. A shape is cut
3. When unfolded: The cut appears on BOTH halves, mirrored

Example:
Folded paper with a triangular cut at the edge:
When unfolded → Two symmetrical triangles
```

### Double Fold + Cut
```
1. Paper folded twice (quartered)
2. A shape is cut
3. When unfolded once → Mirrored on first fold line
4. When fully unfolded → Mirrored on BOTH fold lines
Result: Cut pattern appears 4 times (once in each quarter)
```

### Key Rules

#### Rule 1: Each fold DOUBLES the cuts
```
0 folds: 1 cut → 1 hole
1 fold: 1 cut → 2 holes (mirrored)
2 folds: 1 cut → 4 holes (mirrored twice)
3 folds: 1 cut → 8 holes
n folds: 1 cut → 2^n holes
```

#### Rule 2: Mirror along fold line
```
The cut pattern reflects across EACH fold line when unfolded.
Think of it like a mirror at the fold line.
```

#### Rule 3: Track the fold direction
```
- If folded left → mirror left-right when unfolding
- If folded up → mirror top-bottom when unfolding
- If folded diagonally → mirror diagonally
```

---

## Step-by-Step Solving Method

### Step 1: Note the original shape (usually square)
### Step 2: Track each fold carefully (direction matters!)
### Step 3: Note where the cut/hole is made
### Step 4: Unfold in REVERSE order
### Step 5: At each unfold, mirror the cut across the fold line
### Step 6: The final result shows the complete pattern

### Worked Example
```
Step 1: Square paper
Step 2: Fold vertically (left to right)
Step 3: A circle is punched at the center of the folded paper
Step 4: Unfold left to right
Step 5: The circle mirrors → Two circles, one on each half
Result: Two circles side by side, horizontally centered
```

---

## Common Patterns

### Pattern 1: Corner Cut After One Fold
```
Fold: Top to Bottom
Cut: Small triangle at bottom-right corner

When unfolded: 
- Original cut at bottom-right stays
- Mirror appears at top-right (reflected across horizontal fold)
Result: Two triangles on the right side, one top and one bottom
```

### Pattern 2: Edge Cut After Two Folds
```
Fold 1: Left to Right
Fold 2: Top to Bottom
Cut: Semi-circle at bottom edge

Unfold 2 (bottom to top): Mirror → Semi-circles at top and bottom
Unfold 1 (right to left): Mirror → Semi-circles on both left and right

Result: 4 semi-circles (one at each edge)
```

### Pattern 3: Center Hole After Two Folds
```
Fold 1: Left to Right
Fold 2: Top to Bottom
Hole: Circle at center

After full unfolding: 4 circles, one in each quarter of the paper
```

### Pattern 4: Diagonal Fold
```
Fold: Along diagonal (corner to corner)
Cut: At the folded edge

When unfolded: Pattern is symmetric along the diagonal
```

---

## Tips and Tricks

### ⚡ Quick-Solving Strategy
1. **Count the folds** → 2^n holes expected
2. **Track fold direction** (left-right, top-bottom, diagonal)
3. **Unfold in REVERSE order** — most important!
4. **Mirror at each unfold** — reflect across the fold line
5. **Check symmetry** — the answer should be symmetric along fold lines

### 🎯 Common Traps
1. Unfolding in wrong order (must be reverse!)
2. Mirroring in wrong direction
3. Forgetting that 2 folds = 4 copies of the cut
4. Position of cut changes meaning when folded

### 🧠 Key Principle
```
"Every fold doubles the symmetry. Every unfold mirrors the pattern."

1 fold = 1 mirror line → 2x symmetry
2 folds = 2 mirror lines → 4x symmetry (horizontal + vertical)
3 folds = 8x symmetry
```

---

## Last 10 Years PYQs

Paper Folding questions in SSC CHSL are figure-based. Here are the typical patterns:

### PYQ 1-5: Single Fold + Single Cut
- Paper folded once, a shape cut from edge/corner
- When unfolded: 2 symmetric cuts
- **Strategy:** Mirror across the fold line

### PYQ 6-10: Double Fold + Single Cut  
- Paper folded twice, one cut/punch made
- When unfolded: 4 symmetric cuts
- **Strategy:** Unfold in reverse, mirror each time

### PYQ 11-15: Fold + Hole Punch
- Paper folded, holes punched
- Count: 2^n holes per punch after n folds
- **Strategy:** Count folds, multiply holes

### PYQ 16-20: Complex Folds
- Multiple folds in different directions
- Diagonal + straight folds combined
- **Strategy:** Track each fold carefully, unfold in exact reverse

### Most Common Question:
```
Q: A square paper is folded as shown (sequence of 2-3 fold diagrams), 
   then a cut is made as shown. What does it look like when unfolded?

Approach:
1. Track fold 1 direction
2. Track fold 2 direction  
3. Note the cut position and shape
4. Unfold fold 2 (mirror the cut)
5. Unfold fold 1 (mirror everything again)
6. Match with options
```

---

> **Final Tip:** The key to paper folding is REVERSE UNFOLDING with MIRRORING. Each fold creates a mirror line. Practice with actual paper — fold it, cut it, unfold it to see the pattern! ✂️
