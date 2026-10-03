# 🔢 Number System — Complete Guide for SSC CHSL

## Table of Contents
1. [Introduction](#introduction)
2. [Types of Numbers](#types-of-numbers)
3. [Divisibility Rules](#divisibility-rules)
4. [Remainder Theorem](#remainder-theorem)
5. [Factors and Multiples](#factors-and-multiples)
6. [Important Properties](#important-properties)
7. [Unit Digit Concept](#unit-digit)
8. [Tips and Tricks](#tips-and-tricks)
9. [Last 10 Years PYQs](#pyqs)

---

## Introduction

Number System is the **foundation** of Quantitative Aptitude. Almost every topic builds on this. Master this first!

**Weightage in SSC CHSL:** 2-4 questions (Tier 1 + Tier 2)

---

## Types of Numbers

### Complete Classification
```
Numbers
├── Real Numbers
│   ├── Rational Numbers (can be expressed as p/q)
│   │   ├── Integers (...-2, -1, 0, 1, 2...)
│   │   │   ├── Negative Integers (-1, -2, -3...)
│   │   │   ├── Zero (0)
│   │   │   └── Positive Integers / Natural Numbers (1, 2, 3...)
│   │   │       └── Whole Numbers (0, 1, 2, 3...)
│   │   └── Fractions (1/2, 3/4, 7/5...)
│   └── Irrational Numbers (√2, π, e...)
└── Imaginary Numbers (√-1 = i)
```

### Key Definitions
| Type | Definition | Examples |
|------|-----------|---------|
| Natural Numbers (N) | Counting numbers starting from 1 | 1, 2, 3, 4, 5... |
| Whole Numbers (W) | Natural numbers + 0 | 0, 1, 2, 3, 4... |
| Integers (Z) | Positive, negative whole numbers + 0 | ...-2, -1, 0, 1, 2... |
| Even Numbers | Divisible by 2 | 0, 2, 4, 6, 8... |
| Odd Numbers | Not divisible by 2 | 1, 3, 5, 7, 9... |
| Prime Numbers | Exactly 2 factors (1 and itself) | 2, 3, 5, 7, 11, 13... |
| Composite Numbers | More than 2 factors | 4, 6, 8, 9, 10, 12... |
| Co-prime Numbers | HCF = 1 | (4,9), (3,7), (8,15) |
| Twin Primes | Primes differing by 2 | (3,5), (5,7), (11,13) |
| Perfect Numbers | Sum of factors (excl. itself) = number | 6, 28, 496 |

### First 25 Prime Numbers (MEMORIZE!)
```
2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 
53, 59, 61, 67, 71, 73, 79, 83, 89, 97

Key facts:
- 2 is the ONLY even prime number
- 1 is NEITHER prime NOR composite
- Every prime > 3 is of the form 6n±1
- There are 25 primes below 100
- There are 15 primes between 1 and 50
```

---

## Divisibility Rules

| Divisor | Rule | Example |
|---------|------|---------|
| **2** | Last digit is even (0,2,4,6,8) | 324 → 4 is even ✅ |
| **3** | Sum of digits divisible by 3 | 123 → 1+2+3=6 → 6÷3 ✅ |
| **4** | Last 2 digits divisible by 4 | 1324 → 24÷4=6 ✅ |
| **5** | Last digit is 0 or 5 | 125 → ends in 5 ✅ |
| **6** | Divisible by both 2 AND 3 | 126 → even+sum=9 ✅ |
| **7** | Double last digit, subtract from remaining | 343 → 34-6=28 → 28÷7 ✅ |
| **8** | Last 3 digits divisible by 8 | 1320 → 320÷8=40 ✅ |
| **9** | Sum of digits divisible by 9 | 729 → 7+2+9=18 → 18÷9 ✅ |
| **10** | Last digit is 0 | 150 → ends in 0 ✅ |
| **11** | Difference of sum of alternate digits div by 11 | 1023 → (1+2)-(0+3)=0 ✅ |
| **12** | Divisible by both 3 AND 4 | 144 → sum=9(÷3), 44÷4 ✅ |
| **15** | Divisible by both 3 AND 5 | 225 → sum=9(÷3), ends in 5 ✅ |
| **25** | Last 2 digits div by 25 (00,25,50,75) | 1475 → 75÷25 ✅ |

### Divisibility by 7 (Detailed Method)
```
Method: Double the last digit, subtract from rest.
If result is 0 or divisible by 7 → divisible.

Example: Is 371 divisible by 7?
37 - (1×2) = 37 - 2 = 35 → 35÷7 = 5 ✅

Example: Is 1029 divisible by 7?
102 - (9×2) = 102 - 18 = 84 → 84÷7 = 12 ✅
```

---

## Remainder Theorem

### Basic Concept
```
Dividend = Divisor × Quotient + Remainder
a = bq + r, where 0 ≤ r < b

Example: 17 ÷ 5 → 17 = 5 × 3 + 2 → Remainder = 2
```

### Important Remainder Properties
```
1. Remainder of (a+b) ÷ n = [Rem(a÷n) + Rem(b÷n)] mod n
2. Remainder of (a×b) ÷ n = [Rem(a÷n) × Rem(b÷n)] mod n
3. Remainder of (a-b) ÷ n = [Rem(a÷n) - Rem(b÷n)] mod n

Example: Remainder of 123 × 456 ÷ 7
123 ÷ 7 → rem = 4
456 ÷ 7 → rem = 1
Answer: (4 × 1) mod 7 = 4
```

### Power Remainder (Cyclicity)
```
Remainder of aⁿ ÷ d:
Find the cycle of remainders and use it.

Example: 2^10 ÷ 7
2¹÷7 = rem 2
2²÷7 = rem 4
2³÷7 = rem 1 (cycle starts again!)
Cycle length = 3
10 mod 3 = 1 → same as 2¹ ÷ 7 = rem 2
Answer: 2
```

---

## Factors and Multiples

### Finding Number of Factors
```
If N = aᵖ × bᑫ × cʳ (prime factorization)
Number of factors = (p+1)(q+1)(r+1)

Example: 60 = 2² × 3¹ × 5¹
Factors = (2+1)(1+1)(1+1) = 3×2×2 = 12

Factors of 60: 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60
Count = 12 ✅
```

### Sum of Factors
```
Sum = [(aᵖ⁺¹-1)/(a-1)] × [(bᑫ⁺¹-1)/(b-1)] × [(cʳ⁺¹-1)/(c-1)]

Example: Sum of factors of 12 = 2² × 3¹
= [(2³-1)/(2-1)] × [(3²-1)/(3-1)]
= [7/1] × [8/2]
= 7 × 4 = 28

Check: 1+2+3+4+6+12 = 28 ✅
```

### Product of Factors
```
Product of all factors of N = N^(number of factors / 2)

Example: Product of factors of 12:
12 has 6 factors → Product = 12^(6/2) = 12³ = 1728
Check: 1×2×3×4×6×12 = 1728 ✅
```

### Number of Even/Odd Factors
```
N = 2ᵖ × (odd part)
Even factors: Total factors - Odd factors
Odd factors: Ignore the 2ᵖ part, calculate factors of odd part only

Example: 60 = 2² × 3 × 5
Odd factors: factors of (3×5) = (1+1)(1+1) = 4 → {1,3,5,15}
Even factors: 12 - 4 = 8
```

---

## Important Formulas

### Sum of First n Natural Numbers
```
Sum = n(n+1)/2

Example: 1+2+3+...+100 = 100×101/2 = 5050
```

### Sum of Squares
```
Sum of squares = n(n+1)(2n+1)/6

Example: 1²+2²+3²+...+10² = 10×11×21/6 = 385
```

### Sum of Cubes
```
Sum of cubes = [n(n+1)/2]²

Example: 1³+2³+3³+...+10³ = [10×11/2]² = 55² = 3025
```

### Sum of First n Even Numbers
```
Sum = n(n+1)
First n even: 2, 4, 6, ..., 2n

Example: 2+4+6+8+10 (n=5) = 5×6 = 30
```

### Sum of First n Odd Numbers
```
Sum = n²

Example: 1+3+5+7+9 (n=5) = 5² = 25
```

---

## Unit Digit Concept

### Cyclicity of Unit Digits
| Digit | Cycle | Period |
|-------|-------|--------|
| 0 | 0, 0, 0, 0... | 1 |
| 1 | 1, 1, 1, 1... | 1 |
| 2 | 2, 4, 8, 6, 2, 4, 8, 6... | 4 |
| 3 | 3, 9, 7, 1, 3, 9, 7, 1... | 4 |
| 4 | 4, 6, 4, 6... | 2 |
| 5 | 5, 5, 5, 5... | 1 |
| 6 | 6, 6, 6, 6... | 1 |
| 7 | 7, 9, 3, 1, 7, 9, 3, 1... | 4 |
| 8 | 8, 4, 2, 6, 8, 4, 2, 6... | 4 |
| 9 | 9, 1, 9, 1... | 2 |

### Finding Unit Digit of Large Powers
```
Step 1: Find the unit digit of the base
Step 2: Find the cyclicity of that digit
Step 3: Find power mod cyclicity
Step 4: Look up in the cycle

Example: Unit digit of 7^243
Unit digit of base: 7
Cyclicity of 7: 4 (cycle: 7,9,3,1)
243 mod 4 = 3 (since 243 = 60×4 + 3)
3rd in cycle: 3
Answer: Unit digit = 3

Example: Unit digit of 2^100
Cyclicity of 2: 4 (cycle: 2,4,8,6)
100 mod 4 = 0 → means 4th in cycle
4th in cycle: 6
Answer: Unit digit = 6
```

---

## Important Properties

### Even/Odd Rules
```
Even ± Even = Even       Odd ± Odd = Even
Even ± Odd = Odd         Odd × Odd = Odd
Even × Even = Even       Even × Odd = Even
Even × Anything = Even
```

### Algebraic Identities
```
(a+b)² = a² + 2ab + b²
(a-b)² = a² - 2ab + b²
a² - b² = (a+b)(a-b)
(a+b)³ = a³ + 3a²b + 3ab² + b³
(a-b)³ = a³ - 3a²b + 3ab² - b³
a³ + b³ = (a+b)(a² - ab + b²)
a³ - b³ = (a-b)(a² + ab + b²)
(a+b+c)² = a² + b² + c² + 2(ab + bc + ca)
a³ + b³ + c³ - 3abc = (a+b+c)(a² + b² + c² - ab - bc - ca)
If a+b+c = 0, then a³ + b³ + c³ = 3abc
```

---

## Tips and Tricks

### ⚡ Quick Shortcuts
1. **n² ending**: if n ends in 5 → n² ends in 25 (25²=625, 35²=1225)
2. **Square of numbers near 50**: (50+a)² = (25+a) followed by a²
3. **Multiplication by 11**: Insert sum of digits between them (23×11=253)
4. **Last 2 digits**: For unit digit use cyclicity; for last 2, use mod 100

### 🎯 Exam-Critical Facts
- 1 is neither prime nor composite
- 2 is the only even prime
- 0 is neither positive nor negative
- √2 ≈ 1.414, √3 ≈ 1.732, √5 ≈ 2.236
- Perfect squares: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100...
- Perfect cubes: 1, 8, 27, 64, 125, 216, 343, 512, 729, 1000

---

## Last 10 Years PYQs

### PYQ 1 — SSC CHSL 2024
**Q.** What is the unit digit of 7^253?
- Cyclicity of 7: 4 (7,9,3,1); 253 mod 4 = 1
- Answer: **7** ✅

### PYQ 2 — SSC CHSL 2023
**Q.** How many factors does 120 have?
- 120 = 2³×3×5; Factors = (3+1)(1+1)(1+1) = 16
- Answer: **16** ✅

### PYQ 3 — SSC CHSL 2022
**Q.** Find remainder: 2^50 ÷ 7
- Cycle: 2,4,1 (period 3); 50 mod 3 = 2; 2nd = 4
- Answer: **4** ✅

### PYQ 4 — SSC CHSL 2021
**Q.** Sum of first 50 natural numbers?
- 50×51/2 = 1275
- Answer: **1275** ✅

### PYQ 5 — SSC CHSL 2020
**Q.** Largest 4-digit number divisible by 12?
- 9999 ÷ 12 = 833 rem 3; 9999 - 3 = 9996
- Answer: **9996** ✅

### PYQ 6 — SSC CHSL 2019
**Q.** If a+b+c = 0, find a³+b³+c³ when abc = 5
- a³+b³+c³ = 3abc = 3×5 = 15
- Answer: **15** ✅

### PYQ 7 — SSC CHSL 2018
**Q.** How many prime numbers between 50 and 100?
- 53, 59, 61, 67, 71, 73, 79, 83, 89, 97 = 10
- Answer: **10** ✅

### PYQ 8-20 follow patterns of unit digit, factors, remainders, divisibility, and algebraic identities.

---

> **Final Tip:** Memorize: primes up to 100, divisibility rules, cyclicity table, and algebraic identities. These alone cover 80% of Number System questions! 🔢
