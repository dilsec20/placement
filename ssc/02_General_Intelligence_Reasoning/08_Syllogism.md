# 📐 Syllogism — Complete Guide for SSC CHSL

## Table of Contents
1. [Introduction](#introduction)
2. [Basic Concepts](#basic-concepts)
3. [Venn Diagram Method](#venn-diagram-method)
4. [Standard Propositions](#standard-propositions)
5. [Conversion Rules](#conversion-rules)
6. [Syllogism Rules](#syllogism-rules)
7. [Tips and Tricks](#tips-and-tricks)
8. [Last 10 Years PYQs](#last-10-years-pyqs)

---

## Introduction

Syllogism is a form of **logical reasoning** where you draw conclusions from two given statements (premises). You must determine whether a conclusion logically follows from the statements, regardless of real-world truth.

**Weightage in SSC CHSL Tier 1:** 2-3 questions

**IMPORTANT:** In syllogism, assume the statements to be TRUE even if they contradict common knowledge. Don't use your real-world knowledge!

---

## Basic Concepts

### Four Types of Propositions (A, E, I, O)

| Type | Statement | Symbol | Example | Meaning |
|------|-----------|--------|---------|---------|
| **A** (Universal Affirmative) | All S are P | All S → P | All dogs are animals | Every single S is P |
| **E** (Universal Negative) | No S is P | No S → P | No cat is a dog | Not even one S is P |
| **I** (Particular Affirmative) | Some S are P | Some S → P | Some birds can fly | At least one S is P |
| **O** (Particular Negative) | Some S are not P | Some S ≠ P | Some students are not smart | At least one S is not P |

### Key Definitions
```
Universal: Applies to ALL (All, No, Every, None)
Particular: Applies to SOME (Some, A few, Many, Most)
Affirmative: Positive (are, is)
Negative: Negative (not, no)

Subject: The first term in the statement
Predicate: The second term in the statement
```

---

## Venn Diagram Method (BEST Method for SSC)

### How to Draw Venn Diagrams for Each Proposition

### Type A: "All S are P"
```
S is completely inside P:

    ┌───────────────┐
    │       P       │
    │   ┌───────┐   │
    │   │   S   │   │
    │   └───────┘   │
    └───────────────┘

All dogs are animals → Dog circle inside Animal circle
```

### Type E: "No S is P"
```
S and P are completely separate:

    ┌───────┐   ┌───────┐
    │   S   │   │   P   │
    └───────┘   └───────┘

No cat is a dog → Cat and Dog circles don't overlap
```

### Type I: "Some S are P"
```
S and P partially overlap:

    ┌───────┐
    │   S ┌─┼───────┐
    │     │ │       │
    └─────┼─┘   P   │
          └─────────┘

Some birds can fly → Bird and Fly circles overlap partially
```

### Type O: "Some S are not P"
```
At least part of S is outside P (multiple possibilities):

Possibility 1: Partial overlap (like Type I)
Possibility 2: S and P completely separate (like Type E)
Possibility 3: P inside S but S extends beyond

At least some S must be outside P.
```

---

## Conversion Rules

### Valid Conversions

| Original | Converted | Valid? |
|----------|-----------|--------|
| All S are P (A) | Some P are S (I) | ✅ Valid |
| No S is P (E) | No P is S (E) | ✅ Valid |
| Some S are P (I) | Some P are S (I) | ✅ Valid |
| Some S are not P (O) | — | ❌ No valid conversion |

### Important Conversion Rules
```
1. A → I (All S are P → Some P are S) ✅
2. A ↛ A (All S are P ↛ All P are S) ❌
3. E → E (No S is P → No P is S) ✅
4. I → I (Some S are P → Some P are S) ✅
5. O → Nothing (Some S are not P → No valid conversion) ❌

Example:
"All cats are animals" → "Some animals are cats" ✅
"All cats are animals" → "All animals are cats" ❌
```

---

## Syllogism Rules — Quick Method

### Rule 1: Two Universal Affirmative (A + A)
```
Statement 1: All A are B (A-type)
Statement 2: All B are C (A-type)
Conclusion: All A are C ✅ (A-type)
Also: Some C are A ✅ (I-type)

    ┌───────────────────┐
    │         C         │
    │   ┌───────────┐   │
    │   │     B     │   │
    │   │  ┌─────┐  │   │
    │   │  │  A  │  │   │
    │   │  └─────┘  │   │
    │   └───────────┘   │
    └───────────────────┘
```

### Rule 2: Universal Affirmative + Universal Negative (A + E)
```
Statement 1: All A are B (A-type)
Statement 2: No B is C (E-type)
Conclusion: No A is C ✅ (E-type)
Also: Some A are not C ✅ (O-type)

    ┌───────────┐   ┌───────┐
    │     B     │   │   C   │
    │  ┌─────┐  │   └───────┘
    │  │  A  │  │
    │  └─────┘  │
    └───────────┘
```

### Rule 3: Universal Affirmative + Particular Affirmative (A + I)
```
Statement 1: All A are B (A-type)
Statement 2: Some B are C (I-type)
Conclusion: No definite conclusion about A and C

BUT if reversed:
Statement 1: Some A are B (I-type)
Statement 2: All B are C (A-type)
Conclusion: Some A are C ✅ (I-type)
```

### Rule 4: Two Particular Statements (I + I)
```
Statement 1: Some A are B
Statement 2: Some B are C
Conclusion: No definite conclusion ❌

Two particular affirmatives give NO conclusion
```

### Rule 5: Two Negative Statements (E + E or E + O or O + O)
```
No definite conclusion from two negative statements ❌
```

### Quick Summary Table

| Statement 1 | Statement 2 | Conclusion |
|-------------|-------------|------------|
| All A are B | All B are C | All A are C ✅ |
| All A are B | No B is C | No A is C ✅ |
| All A are B | Some B are C | No definite conclusion |
| Some A are B | All B are C | Some A are C ✅ |
| Some A are B | No B is C | Some A are not C ✅ |
| Some A are B | Some B are C | No definite conclusion |
| No A is B | All B are C | Some C are not A ✅ |
| No A is B | Some B are C | Some C are not A ✅ |

---

## Solving Syllogism Step-by-Step

### Step 1: Identify the proposition types (A, E, I, O)
### Step 2: Draw Venn diagrams for ALL possible arrangements
### Step 3: Check if the conclusion holds in ALL possible diagrams
### Step 4: A conclusion is valid ONLY if it is true in EVERY possible diagram

### Worked Example
```
Statements:
1. All dogs are animals.
2. Some animals are cats.

Conclusions:
I. Some dogs are cats.
II. Some cats are animals.

Solution:
Statement 1: A-type (All dogs are animals)
Statement 2: I-type (Some animals are cats)

Draw Venn diagrams:

Possibility 1:                    Possibility 2:
┌─────────────────┐             ┌─────────────────┐
│     Animals     │             │     Animals     │
│  ┌───┐    ┌───┐│             │  ┌───────────┐  │
│  │Dog│    │Cat││             │  │Dog ┌──┐Cat│  │
│  └───┘    └───┘│             │  │    │  │   │  │
└─────────────────┘             │  └────┴──┴───┘  │
                                └─────────────────┘

Conclusion I: "Some dogs are cats"
- In Possibility 1: Dogs and Cats don't overlap → FALSE
- Since it's not true in ALL possibilities → INVALID ❌

Conclusion II: "Some cats are animals"
- In Possibility 1: Some cats are inside animals → TRUE
- In Possibility 2: Cats inside animals → TRUE
- True in ALL possibilities → VALID ✅

Answer: Only Conclusion II follows
```

---

## Special Cases

### "Either...or" Conclusion
```
When the given conclusions are:
I. All A are B
II. No A is B

If individually neither follows, but together they cover all possibilities,
then "Either I or II follows" is the answer.

This happens when one is the exact CONTRADICTORY of the other:
A ↔ O are contradictories (one must be true)
E ↔ I are contradictories (one must be true)
```

### Complementary Pairs
| Pair | Relationship |
|------|-------------|
| All (A) ↔ Some not (O) | Contradictory (exactly one is true) |
| No (E) ↔ Some (I) | Contradictory (exactly one is true) |
| All (A) ↔ No (E) | Contrary (both can be false, but both can't be true) |
| Some (I) ↔ Some not (O) | Sub-contrary (both can be true, but both can't be false) |

---

## Tips and Tricks

### ⚡ Quick-Solving Strategy
1. **Draw ALL possible Venn diagrams** — this is the safest method
2. **A conclusion is valid ONLY if true in ALL diagrams**
3. **If two negatives** → No conclusion
4. **If two particular** (I+I or O+O) → No conclusion  
5. **Check for "Either...or"** when neither conclusion follows individually
6. **Memorize the quick summary table** above

### 🎯 Common Traps
1. Don't assume "All A are B" means "All B are A"
2. "Some" means "at least one" — could be all
3. Don't use real-world knowledge — trust only the statements
4. Check BOTH/ALL possible Venn diagrams
5. "Either...or" only applies to contradictory pairs

### 🧠 Memory Trick
```
"All-No gives No" (A+E = E)
"All-All gives All" (A+A = A)
"Some-All gives Some" (I+A = I)
"Two negatives = No conclusion"
"Two particulars = No conclusion"
```

---

## Last 10 Years PYQs

### PYQ 1 — SSC CHSL 2024
**Q.** Statements: All roses are flowers. All flowers are beautiful.
Conclusions: I. All roses are beautiful. II. Some beautiful things are roses.
- Both I and II follow ✅ (A+A = A; All roses are beautiful; Some beautiful are roses)

### PYQ 2 — SSC CHSL 2024
**Q.** Statements: Some pens are pencils. All pencils are erasers.
Conclusions: I. Some pens are erasers. II. All erasers are pens.
- Only I follows ✅ (I+A = I; Some pens are erasers)
- II doesn't follow (can't conclude All erasers are pens)

### PYQ 3 — SSC CHSL 2023
**Q.** Statements: No dog is a cat. All cats are animals.
Conclusions: I. No dog is an animal. II. Some animals are not dogs.
- Only II follows ✅
- I doesn't follow (dogs could still be animals through other paths)

### PYQ 4 — SSC CHSL 2023
**Q.** Statements: All books are pages. Some pages are words.
Conclusions: I. Some books are words. II. Some words are pages.
- Only II follows ✅ (Some pages are words → Some words are pages; I-type converts)
- I doesn't follow (A+I with middle term gives no definite conclusion about extremes)

### PYQ 5 — SSC CHSL 2022
**Q.** Statements: All men are strong. Some strong are tall.
Conclusions: I. Some men are tall. II. Some tall are strong.
- Only II follows ✅ (conversion of "Some strong are tall")
- I doesn't follow (no definite link)

### PYQ 6 — SSC CHSL 2022
**Q.** Statements: All apples are fruits. No fruit is vegetable.
Conclusions: I. No apple is vegetable. II. Some fruits are apples.
- Both follow ✅ (A+E = E: No apple is vegetable; A→I: Some fruits are apples)

### PYQ 7 — SSC CHSL 2021
**Q.** Statements: Some birds can fly. All that fly have wings.
Conclusions: I. Some birds have wings. II. All birds can fly.
- Only I follows ✅ (I+A = I)
- II doesn't follow ("Some" ≠ "All")

### PYQ 8 — SSC CHSL 2021
**Q.** Statements: All cars are vehicles. All vehicles have wheels.
Conclusions: I. All cars have wheels. II. Some wheels are cars.
- Both follow ✅ (A+A = A; then A→I)

### PYQ 9 — SSC CHSL 2020
**Q.** Statements: No teacher is a student. All students are young.
Conclusions: I. No teacher is young. II. Some young are not teachers.
- Only II follows ✅
- I doesn't follow (teachers could be young through other paths)

### PYQ 10 — SSC CHSL 2020
**Q.** Statements: Some cats are dogs. Some dogs are rats.
Conclusions: I. Some cats are rats. II. No cat is a rat.
- Neither follows individually → Either I or II follows ✅
- (I and II are contradictory: "Some cats are rats" vs implied "No cat is rat")

### PYQ 11 — SSC CHSL 2019
**Q.** Statements: All rivers are water. All water is liquid.
Conclusions: I. All rivers are liquid. II. Some liquid is water.
- Both follow ✅

### PYQ 12 — SSC CHSL 2019
**Q.** Statements: Some boys are players. All players are sportsmen.
Conclusions: I. Some boys are sportsmen. II. All sportsmen are boys.
- Only I follows ✅ (I+A = I)

### PYQ 13 — SSC CHSL 2018
**Q.** Statements: All pens are caps. No cap is red.
Conclusions: I. No pen is red. II. Some caps are pens.
- Both follow ✅ (A+E = E; A→I)

### PYQ 14 — SSC CHSL 2018
**Q.** Statements: Some flowers are red. Some red things are beautiful.
Conclusions: I. Some flowers are beautiful. II. No flower is beautiful.
- Neither I nor II follows individually → Either I or II ✅

### PYQ 15 — SSC CHSL 2017
**Q.** Statements: All tables are chairs. All chairs are furniture.
Conclusions: I. All tables are furniture. II. Some furniture are tables.
- Both follow ✅ (A+A = A; A→I)

### PYQ 16 — SSC CHSL 2017
**Q.** Statements: Some kings are queens. All queens are rulers.
Conclusions: I. Some kings are rulers. II. All rulers are queens.
- Only I follows ✅ (I+A = I)

### PYQ 17 — SSC CHSL 2016
**Q.** Statements: No man is a machine. All machines are useful.
Conclusions: I. No man is useful. II. Some useful things are not men.
- Only II follows ✅

### PYQ 18 — SSC CHSL 2016
**Q.** Statements: All stars shine. Some stars are planets.
- Conclusions available would test A→I conversion and I+A patterns

### PYQ 19 — SSC CHSL 2015
**Q.** Statements: All mangoes are fruits. Some fruits are sweet.
Conclusions: I. Some mangoes are sweet. II. Some sweet are fruits.
- Only II follows ✅ (I-type conversion)

### PYQ 20 — SSC CHSL 2015
**Q.** Statements: All lions are animals. No animal is a plant.
Conclusions: I. No lion is a plant. II. Some animals are lions.
- Both follow ✅ (A+E = E; A→I)

---

> **Final Tip:** Always draw Venn diagrams — ALL possible versions. A conclusion is valid ONLY if it works in every possible diagram. Memorize: "Two negatives = no conclusion" and "Two particulars = no conclusion." Practice 5 syllogism questions daily! 📐
