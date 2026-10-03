# 🔗 LCM and HCF — Complete Guide for SSC CHSL

## Table of Contents
1. [Introduction](#introduction)
2. [HCF (Highest Common Factor)](#hcf)
3. [LCM (Least Common Multiple)](#lcm)
4. [Relationship Between LCM and HCF](#relationship)
5. [Word Problems](#word-problems)
6. [Tips and Tricks](#tips-and-tricks)
7. [Last 10 Years PYQs](#pyqs)

---

## Introduction

LCM and HCF are fundamental concepts used extensively in simplification, fractions, time & work, pipes & cisterns, and more.

**Weightage in SSC CHSL:** 2-3 questions

---

## HCF (Highest Common Factor)

### Definition
HCF is the **largest number** that divides two or more numbers exactly.

### Method 1: Prime Factorization
```
Find HCF of 24 and 36:
24 = 2³ × 3¹
36 = 2² × 3²

HCF = Take MINIMUM power of COMMON primes
HCF = 2² × 3¹ = 4 × 3 = 12
```

### Method 2: Division Method (Euclid's Algorithm)
```
Find HCF of 56 and 98:
98 = 56 × 1 + 42
56 = 42 × 1 + 14
42 = 14 × 3 + 0

Last non-zero remainder = 14
HCF(56, 98) = 14
```

### Method 3: Successive Division
```
Find HCF of 36, 48, 60:
Step 1: HCF(36, 48) → 48 = 36×1+12, 36 = 12×3+0 → HCF = 12
Step 2: HCF(12, 60) → 60 = 12×5+0 → HCF = 12
Answer: HCF(36, 48, 60) = 12
```

---

## LCM (Least Common Multiple)

### Definition
LCM is the **smallest number** that is divisible by two or more given numbers.

### Method 1: Prime Factorization
```
Find LCM of 24 and 36:
24 = 2³ × 3¹
36 = 2² × 3²

LCM = Take MAXIMUM power of ALL primes
LCM = 2³ × 3² = 8 × 9 = 72
```

### Method 2: Division Method
```
Find LCM of 12, 18, 24:

2 | 12, 18, 24
2 | 6,  9,  12
2 | 3,  9,  6
3 | 3,  9,  3
3 | 1,  3,  1
  | 1,  1,  1

LCM = 2 × 2 × 2 × 3 × 3 = 72
```

---

## Relationship Between LCM and HCF

### Key Formula
```
For TWO numbers a and b:
LCM × HCF = a × b

Example: LCM(12,18) × HCF(12,18) = 12 × 18
36 × 6 = 216 ✅ (LCM=36, HCF=6, 12×18=216)
```

### Important Properties
```
1. HCF of two numbers always divides their LCM
2. HCF ≤ Both numbers ≤ LCM
3. For co-prime numbers: HCF = 1, LCM = product
4. LCM of fractions = LCM of numerators / HCF of denominators
5. HCF of fractions = HCF of numerators / LCM of denominators
```

### LCM and HCF of Fractions
```
LCM of fractions = LCM of Numerators / HCF of Denominators
HCF of fractions = HCF of Numerators / LCM of Denominators

Example: LCM of 2/3 and 4/5
LCM = LCM(2,4) / HCF(3,5) = 4/1 = 4

HCF of 2/3 and 4/5
HCF = HCF(2,4) / LCM(3,5) = 2/15
```

---

## Word Problems

### Type 1: Finding Largest Tile Size
```
Q: A floor is 6m × 8m. What is the largest square tile that can be used?
Answer: HCF(6, 8) = 2m
Number of tiles = (6/2) × (8/2) = 3 × 4 = 12 tiles
```

### Type 2: Bell/Alarm Ringing Together
```
Q: Three bells ring at intervals of 4, 6, and 12 minutes. 
   If they ring together at 12:00, when will they ring together next?
Answer: LCM(4, 6, 12) = 12 minutes → at 12:12
```

### Type 3: Maximum Groups
```
Q: 24 boys and 36 girls need to be divided into groups.
   Each group has equal boys and equal girls. Max groups?
Answer: HCF(24, 36) = 12 groups
Boys per group = 24/12 = 2
Girls per group = 36/12 = 3
```

### Type 4: Finding Numbers Given LCM and HCF
```
Q: LCM of two numbers = 120, HCF = 6. If one number is 24, find the other.
Using: LCM × HCF = a × b
120 × 6 = 24 × b
b = 720/24 = 30
Answer: 30
```

### Type 5: Largest Number Dividing with Remainders
```
Q: Find the largest number that divides 25 and 73 leaving remainders 1 and 1.
Numbers become: 25-1=24 and 73-1=72
Answer: HCF(24, 72) = 24
```

### Type 6: Least Number Divisible with Remainders
```
Q: Find least number which when divided by 3, 5, 7 leaves remainder 2.
LCM(3, 5, 7) = 105
Number = 105 + 2 = 107
(Number = LCM + common remainder)
```

### Type 7: Different Remainders
```
Q: Find least number which when divided by 3 leaves 1, by 5 leaves 3, by 7 leaves 5.
Differences: 3-1=2, 5-3=2, 7-5=2 (constant difference = 2)
Number = LCM(3,5,7) - 2 = 105 - 2 = 103
```

---

## Tips and Tricks

### ⚡ Quick Shortcuts
```
1. HCF of consecutive numbers = 1 (always co-prime)
2. HCF of consecutive even numbers = 2
3. LCM of 1 to n: Use prime factorization
4. If a÷b leaves remainder r, then a = b×q + r
5. For "leaves same remainder r": Number = LCM + r
6. For "leaves different remainders with same difference d": Number = LCM - d
```

### 🎯 Exam-Critical:
- HCF questions usually involve "largest/maximum/greatest"
- LCM questions usually involve "smallest/minimum/least"
- "When will events coincide?" → LCM
- "Largest tile/group?" → HCF

---

## Last 10 Years PYQs

### PYQ 1 — SSC CHSL 2024
**Q.** LCM of 12, 15, 20?
- 12=2²×3, 15=3×5, 20=2²×5
- LCM = 2²×3×5 = 60
- Answer: **60** ✅

### PYQ 2 — SSC CHSL 2023
**Q.** HCF of 36, 48, 72?
- 36=2²×3², 48=2⁴×3, 72=2³×3²
- HCF = 2²×3 = 12
- Answer: **12** ✅

### PYQ 3 — SSC CHSL 2022
**Q.** LCM×HCF = Product for two numbers. LCM=60, one number=12, other=15. Verify.
- HCF(12,15)=3, LCM=60; 3×60=180=12×15 ✅

### PYQ 4 — SSC CHSL 2021
**Q.** Three alarms ring at 6, 8, 12 min. Next simultaneous ring?
- LCM(6,8,12) = 24 minutes
- Answer: **24 minutes** ✅

### PYQ 5 — SSC CHSL 2020
**Q.** Largest number dividing 65 and 117 leaving remainder 5.
- 65-5=60, 117-5=112; HCF(60,112)=4
- Answer: **4** ✅

---

> **Final Tip:** Remember — HCF = "largest dividing" (use MIN powers), LCM = "smallest multiple" (use MAX powers). The product formula LCM×HCF = a×b works ONLY for TWO numbers! 🔗
