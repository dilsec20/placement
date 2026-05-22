# ⚡ Vedic Maths, Speed Tricks & Most Expected Questions — TCS NQT 2026

> **Section:** Bonus Preparation Module | **Purpose:** Save 30-40% time on calculations | **Impact:** ALL Sections

---

## 📑 Table of Contents

1. [The 16 Vedic Maths Sutras](#1-the-16-vedic-maths-sutras)
2. [Lightning Multiplication Tricks](#2-lightning-multiplication-tricks)
3. [Fast Squaring Techniques](#3-fast-squaring-techniques)
4. [Fast Cube & Cube Root Tricks](#4-fast-cube--cube-root-tricks)
5. [Speed Division Tricks](#5-speed-division-tricks)
6. [Fast Subtraction Techniques](#6-fast-subtraction-techniques)
7. [Percentage & Fraction Speed Hacks](#7-percentage--fraction-speed-hacks)
8. [Square Root & Approximation](#8-square-root--approximation)
9. [Remainder Tricks (Modular Arithmetic)](#9-remainder-tricks-modular-arithmetic)
10. [Digit Sum / Digital Root Method](#10-digit-sum--digital-root-method)
11. [Tables, Squares, Cubes — Must Memorize](#11-tables-squares-cubes--must-memorize)
12. [Missing Formulas — Complete Formula Sheet](#12-missing-formulas--complete-formula-sheet)
13. [50 Most Expected Questions with Solutions](#13-50-most-expected-questions-with-solutions)
14. [Last-Minute Revision Cheat Sheet](#14-last-minute-revision-cheat-sheet)

---

## 1. The 16 Vedic Maths Sutras

| # | Sutra (Sanskrit) | Meaning | Application |
|---|-----------------|---------|-------------|
| 1 | **Ekadhikena Purvena** | By one more than the previous | Squaring numbers ending in 5, vulgar fractions |
| 2 | **Nikhilam Navatashcaramam Dashatah** | All from 9, last from 10 | Multiplication near base (100, 1000) |
| 3 | **Urdhva-Tiryagbhyam** | Vertically and Crosswise | General multiplication of any numbers |
| 4 | **Paraavartya Yojayet** | Transpose and adjust | Division |
| 5 | **Shunyam Saamyasamuccaye** | When sum is same, sum is zero | Solving equations |
| 6 | **Anurupye Shunyamanyat** | If one is in ratio, other is zero | Simultaneous equations |
| 7 | **Sankalana-Vyavakalanabhyam** | By addition and subtraction | Simultaneous equations, HCF |
| 8 | **Puranapuranabyham** | By completion or non-completion | Completing the square |
| 9 | **Chalana-Kalanabyham** | Differences and similarities | Quadratic equations, special division |
| 10 | **Yaavadunam** | Whatever the extent of deficiency | Squaring near base |
| 11 | **Vyeshtisamanstih** | Part and Whole | Averages, partial fractions |
| 12 | **Shesanyankena Charamena** | Remainder by last digit | Expressing fractions as decimals |
| 13 | **Sopaantyadvayamantyam** | Ultimate and twice the penultimate | Specific equation solving |
| 14 | **Ekanyunena Purvena** | By one less than the previous | Multiplication with 9s |
| 15 | **Gunitasamuchyah** | Product of sum = sum of product | Verification of calculations |
| 16 | **Gunakasamuchyah** | All the multipliers | Verification technique |

---

## 2. Lightning Multiplication Tricks

### 2.1 Nikhilam Method — Multiplication Near a Base (100, 1000)

**When to use:** Both numbers are close to 100 (or 1000)

```
FORMULA:
  Number 1:  a  → deviation = a - 100
  Number 2:  b  → deviation = b - 100

  Left part:  a + (b's deviation)  OR  b + (a's deviation)
  Right part: deviation₁ × deviation₂  (pad to 2 digits for base 100)

  Answer = Left | Right
```

#### Examples — Both Below Base 100

```
97 × 96:
  97 → -3
  96 → -4
  Left:  97 - 4 = 93  (or 96 - 3 = 93)
  Right: (-3) × (-4) = 12
  Answer: 9312 ✅

88 × 93:
  88 → -12
  93 → -7
  Left:  88 - 7 = 81
  Right: (-12) × (-7) = 84
  Answer: 8184 ✅

91 × 89:
  91 → -9
  89 → -11
  Left:  91 - 11 = 80
  Right: (-9) × (-11) = 99
  Answer: 8099 ✅
```

#### Examples — Both Above Base 100

```
103 × 107:
  103 → +3
  107 → +7
  Left:  103 + 7 = 110
  Right: 3 × 7 = 21
  Answer: 11021 ✅

112 × 104:
  112 → +12
  104 → +4
  Left:  112 + 4 = 116
  Right: 12 × 4 = 48
  Answer: 11648 ✅
```

#### Examples — One Above, One Below Base 100

```
98 × 103:
  98 → -2
  103 → +3
  Left:  98 + 3 = 101
  Right: (-2) × 3 = -06 → Borrow 1 from left
  Left becomes: 101 - 1 = 100
  Right becomes: 100 - 06 = 94
  Answer: 10094 ✅
```

#### Near Base 1000

```
998 × 994:
  998 → -2
  994 → -6
  Left:  998 - 6 = 992
  Right: (-2) × (-6) = 012  (pad to 3 digits for base 1000)
  Answer: 992012 ✅
```

### 2.2 Urdhva Tiryagbhyam — Crosswise Multiplication (Any Numbers)

**When to use:** ANY multiplication — universal method

#### Two-Digit × Two-Digit

```
For ab × cd:

Step 1: b × d = units (carry if > 9)
Step 2: (a × d) + (b × c) = tens (carry if > 9)
Step 3: a × c = hundreds

    a  b
    c  d
    ----
Step 1: b×d
Step 2: a×d + b×c  (crosswise)
Step 3: a×c

Example: 23 × 14
Step 1: 3 × 4 = 12   → write 2, carry 1
Step 2: (2×4) + (3×1) = 8 + 3 = 11 + carry 1 = 12 → write 2, carry 1
Step 3: 2 × 1 = 2 + carry 1 = 3
Answer: 322 ✅

Example: 45 × 67
Step 1: 5 × 7 = 35   → write 5, carry 3
Step 2: (4×7) + (5×6) = 28 + 30 = 58 + carry 3 = 61 → write 1, carry 6
Step 3: 4 × 6 = 24 + carry 6 = 30
Answer: 3015 ✅
```

#### Three-Digit × Three-Digit

```
For abc × def:

Step 1: c × f
Step 2: (b×f) + (c×e)
Step 3: (a×f) + (b×e) + (c×d)
Step 4: (a×e) + (b×d)
Step 5: a × d

Example: 124 × 132
Step 1: 4 × 2 = 8
Step 2: (2×2) + (4×3) = 4 + 12 = 16 → write 6, carry 1
Step 3: (1×2) + (2×3) + (4×1) = 2 + 6 + 4 = 12 + carry 1 = 13 → write 3, carry 1
Step 4: (1×3) + (2×1) = 3 + 2 = 5 + carry 1 = 6
Step 5: 1 × 1 = 1
Answer: 16368 ✅
```

### 2.3 Multiply by 11 — Instant Method

```
To multiply any number by 11:

Two-digit × 11: Split digits, put SUM in middle
  23 × 11 = 2_(2+3)_3 = 253
  35 × 11 = 3_(3+5)_5 = 385
  47 × 11 = 4_(4+7)_7 = 4_(11)_7 = 517  (carry the 1)
  99 × 11 = 9_(9+9)_9 = 9_(18)_9 = 1089

Three-digit × 11:
  123 × 11 = 1_(1+2)_(2+3)_3 = 1353
  246 × 11 = 2_(2+4)_(4+6)_6 = 2706
```

### 2.4 Multiply by 5, 25, 50, 125

```
× 5  = × 10 ÷ 2      → 248 × 5 = 2480 ÷ 2 = 1240
× 25 = × 100 ÷ 4     → 48 × 25 = 4800 ÷ 4 = 1200
× 50 = × 100 ÷ 2     → 36 × 50 = 3600 ÷ 2 = 1800
× 125 = × 1000 ÷ 8   → 48 × 125 = 48000 ÷ 8 = 6000
× 9  = × 10 - number  → 43 × 9 = 430 - 43 = 387
× 99 = × 100 - number → 43 × 99 = 4300 - 43 = 4257
× 999 = × 1000 - number → 43 × 999 = 43000 - 43 = 42957
```

### 2.5 Ekanyunena Purvena — Multiply by 9, 99, 999...

```
RULE: Number × (string of 9s of same digit count)

Example: 76 × 99
  Left part = 76 - 1 = 75
  Right part = 99 - 75 = 24  (or complement: 100 - 76 = 24)
  Answer: 7524 ✅

Example: 432 × 999
  Left = 432 - 1 = 431
  Right = 999 - 431 = 568
  Answer: 431568 ✅

When digit counts differ:
  76 × 999 = 76 × 1000 - 76 = 76000 - 76 = 75924
```

---

## 3. Fast Squaring Techniques

### 3.1 Squaring Numbers Ending in 5 (Ekadhikena Purvena)

```
RULE: n5² = n × (n+1) | 25

  25² = 2 × 3 | 25 = 625
  35² = 3 × 4 | 25 = 1225
  45² = 4 × 5 | 25 = 2025
  55² = 5 × 6 | 25 = 3025
  65² = 6 × 7 | 25 = 4225
  75² = 7 × 8 | 25 = 5625
  85² = 8 × 9 | 25 = 7225
  95² = 9 × 10 | 25 = 9025
  105² = 10 × 11 | 25 = 11025
  115² = 11 × 12 | 25 = 13225
  125² = 12 × 13 | 25 = 15625
```

### 3.2 Squaring Near Base (Yaavadunam)

```
RULE: For number near base b, with deviation d = number - b
  Number² = (number + d) × b + d²

Near 100:
  102² = (102 + 2) × 100 + 4 = 10400 + 4 = 10404
  97²  = (97 - 3) × 100 + 9  = 9400 + 9  = 9409
  108² = (108 + 8) × 100 + 64 = 11600 + 64 = 11664
  93²  = (93 - 7) × 100 + 49  = 8600 + 49  = 8649

Near 50:
  52² = (52 + 2) × 50 + 4  = 2700 + 4  = 2704
  48² = (48 - 2) × 50 + 4  = 2300 + 4  = 2304
  47² = (47 - 3) × 50 + 9  = 2200 + 9  = 2209
```

### 3.3 Squaring Any Two-Digit Number (a×10 + b)

```
FORMULA: (a×10 + b)² = a² × 100 + 2ab × 10 + b²

  37² = 9 × 100 + 42 × 10 + 49 = 900 + 420 + 49 = 1369
  43² = 16 × 100 + 24 × 10 + 9 = 1600 + 240 + 9 = 1849
  56² = 25 × 100 + 60 × 10 + 36 = 2500 + 600 + 36 = 3136

Alternative: Duplex Method
  For number ab: a² | 2ab | b²
  
  67: 36 | 84 | 49
  = 36 | 84 | 49
  = 36 | 84+4 | 9  (carry 4 from 49)
  = 36 | 88 | 9
  = 36+8 | 8 | 9  (carry 8 from 88)
  = 44 | 8 | 9
  = 4489 ✅
```

### 3.4 Squaring Numbers Near 50

```
SHORTCUT: (50 ± x)² = (25 ± x) × 100 + x²

  51² = 26 × 100 + 1  = 2601
  52² = 27 × 100 + 4  = 2704
  53² = 28 × 100 + 9  = 2809
  54² = 29 × 100 + 16 = 2916
  48² = 23 × 100 + 4  = 2304
  47² = 22 × 100 + 9  = 2209
  46² = 21 × 100 + 16 = 2116
  44² = 19 × 100 + 36 = 1936
```

### 3.5 Difference of Squares Shortcut

```
a² - b² = (a+b)(a-b)

83² - 17² = (83+17)(83-17) = 100 × 66 = 6600
67² - 33² = (67+33)(67-33) = 100 × 34 = 3400
56² - 44² = (56+44)(56-44) = 100 × 12 = 1200
```

---

## 4. Fast Cube & Cube Root Tricks

### 4.1 Cubes to Memorize

| n | n³ | n | n³ |
|---|-----|---|-----|
| 1 | 1 | 11 | 1331 |
| 2 | 8 | 12 | 1728 |
| 3 | 27 | 13 | 2197 |
| 4 | 64 | 14 | 2744 |
| 5 | 125 | 15 | 3375 |
| 6 | 216 | 16 | 4096 |
| 7 | 343 | 17 | 4913 |
| 8 | 512 | 18 | 5832 |
| 9 | 729 | 19 | 6859 |
| 10 | 1000 | 20 | 8000 |

### 4.2 Cube Root of Perfect Cubes (Instant Method)

```
For a 4-6 digit perfect cube:

Step 1: Look at the LAST digit → gives UNIT digit of cube root
  Last digit 0→0, 1→1, 2→8, 3→7, 4→4, 5→5, 6→6, 7→3, 8→2, 9→9

Step 2: Remove last 3 digits. Find the largest cube ≤ remaining number → gives TENS digit

Example: ∛79507 = ?
  Last digit: 7 → unit digit = 3
  Remove 507 → 79 → 4³=64 ≤ 79 < 5³=125 → tens digit = 4
  Answer: 43 ✅ (43³ = 79507)

Example: ∛175616 = ?
  Last digit: 6 → unit digit = 6
  Remove 616 → 175 → 5³=125 ≤ 175 < 6³=216 → tens digit = 5
  Answer: 56 ✅ (56³ = 175616)

Example: ∛132651 = ?
  Last digit: 1 → unit digit = 1
  Remove 651 → 132 → 5³=125 ≤ 132 < 6³=216 → tens digit = 5
  Answer: 51 ✅ (51³ = 132651)
```

---

## 5. Speed Division Tricks

### 5.1 Divide by 5, 25, 50

```
÷ 5   = × 2 ÷ 10      → 735 ÷ 5 = 1470 ÷ 10 = 147
÷ 25  = × 4 ÷ 100     → 625 ÷ 25 = 2500 ÷ 100 = 25
÷ 50  = × 2 ÷ 100     → 350 ÷ 50 = 700 ÷ 100 = 7
÷ 125 = × 8 ÷ 1000    → 625 ÷ 125 = 5000 ÷ 1000 = 5
```

### 5.2 Check Divisibility Instantly

```
By 2:  Last digit even
By 3:  Digit sum divisible by 3
By 4:  Last 2 digits divisible by 4
By 5:  Ends in 0 or 5
By 6:  Divisible by both 2 AND 3
By 7:  Double last digit, subtract from rest (repeat)
       343 → 34 - 6 = 28 → 28/7 = 4 ✅
By 8:  Last 3 digits divisible by 8
By 9:  Digit sum divisible by 9
By 11: (Sum of odd-position digits) - (Sum of even-position digits) = 0 or multiple of 11
       85214 → (8+2+4) - (5+1) = 14 - 6 = 8 → ❌ Not divisible by 11
By 12: Divisible by both 3 AND 4
By 13: Multiply last digit by 4, add to rest
       169 → 16 + 36 = 52 → 5 + 8 = 13 ✅
By 15: Divisible by both 3 AND 5
```

---

## 6. Fast Subtraction Techniques

### 6.1 Nikhilam — All from 9, Last from 10

```
Subtract from powers of 10 instantly:

1000 - 748:
  9-7 = 2, 9-4 = 5, 10-8 = 2
  Answer: 252 ✅

10000 - 6237:
  9-6 = 3, 9-2 = 7, 9-3 = 6, 10-7 = 3
  Answer: 3763 ✅

100000 - 84521:
  9-8 = 1, 9-4 = 5, 9-5 = 4, 9-2 = 7, 10-1 = 9
  Answer: 15479 ✅
```

### 6.2 Complement Method for Any Subtraction

```
853 - 467:
  Think: 467 + ? = 853
  Complement of 467 from 1000 = 533
  853 - 467 = 853 + 533 - 1000 = 1386 - 1000 = 386 ✅
  
OR simply: 
  (8-4-1) = 3, (15-6) = 9 wait... this gets complicated.
  Better: standard subtraction but use "all from 9, last from 10" for mental math.
```

---

## 7. Percentage & Fraction Speed Hacks

### 7.1 Percentage Calculation Shortcuts

```
10% of any number → move decimal one place left
  10% of 450 = 45

5% = half of 10%
  5% of 450 = 22.5

1% = move decimal two places left
  1% of 450 = 4.5

15% = 10% + 5%
  15% of 450 = 45 + 22.5 = 67.5

20% = 10% × 2  OR  ÷ 5
  20% of 450 = 90

25% = ÷ 4
  25% of 450 = 112.5

33.33% = ÷ 3
  33.33% of 450 = 150

12.5% = ÷ 8
  12.5% of 400 = 50

37.5% = 3/8
  37.5% of 400 = 150

75% = 3/4
  75% of 400 = 300

Any% of any number = reverse
  17% of 50 = 50% of 17 = 8.5  (much easier!)
  4% of 75 = 75% of 4 = 3
  8% of 25 = 25% of 8 = 2
```

### 7.2 Fraction-Percentage Conversion (COMPLETE TABLE)

| Fraction | % | Fraction | % | Fraction | % |
|----------|---|----------|---|----------|---|
| 1/2 | 50 | 1/9 | 11.11 | 2/7 | 28.57 |
| 1/3 | 33.33 | 1/10 | 10 | 3/7 | 42.86 |
| 1/4 | 25 | 1/11 | 9.09 | 4/7 | 57.14 |
| 1/5 | 20 | 1/12 | 8.33 | 5/7 | 71.43 |
| 1/6 | 16.67 | 1/13 | 7.69 | 6/7 | 85.71 |
| 1/7 | 14.29 | 1/14 | 7.14 | 2/3 | 66.67 |
| 1/8 | 12.5 | 1/15 | 6.67 | 3/4 | 75 |
| 2/5 | 40 | 3/5 | 60 | 4/5 | 80 |
| 3/8 | 37.5 | 5/8 | 62.5 | 7/8 | 87.5 |
| 1/16 | 6.25 | 1/20 | 5 | 5/6 | 83.33 |

### 7.3 Successive Percentage Change — Quick Method

```
Two successive changes of a% and b%:
Net effect = a + b + (ab/100)%

20% increase then 10% decrease:
= 20 + (-10) + (20 × -10)/100 = 20 - 10 - 2 = 8% increase

25% increase then 20% decrease:
= 25 + (-20) + (25 × -20)/100 = 25 - 20 - 5 = 0% (no change!)

Pairs that cancel each other:
  +10% and -9.09% (≈ -1/11)
  +20% and -16.67% (= -1/6)
  +25% and -20%
  +50% and -33.33%
  +100% and -50%
```

---

## 8. Square Root & Approximation

### 8.1 Square Roots to Memorize

| n | √n | n | √n |
|---|-----|---|-----|
| 2 | 1.414 | 8 | 2.828 |
| 3 | 1.732 | 10 | 3.162 |
| 5 | 2.236 | 12 | 3.464 |
| 6 | 2.449 | 13 | 3.606 |
| 7 | 2.646 | 15 | 3.873 |

### 8.2 Approximation Method

```
To find √N approximately:
1. Find the nearest perfect square p² close to N
2. √N ≈ p + (N - p²) / (2p)

Example: √50
  Nearest square: 49 = 7²
  √50 ≈ 7 + (50-49)/(2×7) = 7 + 1/14 ≈ 7.071

Example: √200
  Nearest square: 196 = 14²
  √200 ≈ 14 + (200-196)/(2×14) = 14 + 4/28 ≈ 14.143

Example: √110
  Nearest square: 100 = 10²
  √110 ≈ 10 + 10/20 = 10.5 (actual: 10.488)
```

---

## 9. Remainder Tricks (Modular Arithmetic)

### 9.1 Key Remainder Theorems

```
Fermat's Little Theorem:
  a^(p-1) ≡ 1 (mod p)  where p is prime, gcd(a,p)=1

Euler's Theorem:
  a^φ(n) ≡ 1 (mod n)  where gcd(a,n)=1

Wilson's Theorem:
  (p-1)! ≡ -1 (mod p)  where p is prime

Cyclicity of Remainders:
  2^n mod 7 cycles: {2,4,1,2,4,1,...} period 3
  Powers of 10 mod 7: {3,2,6,4,5,1,...} period 6
```

### 9.2 Quick Remainder Tricks

```
Remainder when divided by 9:
  = digit sum mod 9
  5834 → 5+8+3+4 = 20 → 2+0 = 2 → remainder = 2

Remainder when divided by 11:
  = alternate digit sum difference mod 11
  85214 → (8+2+4) - (5+1) = 14 - 6 = 8 → remainder = 8

For powers: use cyclicity
  Find unit digit of 7^123:
  7^1=7, 7^2=9, 7^3=3, 7^4=1 → cycle=4
  123 mod 4 = 3 → unit digit = 3

  Find 2^100 mod 7:
  2^1≡2, 2^2≡4, 2^3≡1 (mod 7) → cycle=3
  100 mod 3 = 1 → 2^100 ≡ 2 (mod 7)
```

### 9.3 Chinese Remainder Theorem (Simplified)

```
Find x where x ≡ 2 (mod 3), x ≡ 3 (mod 5), x ≡ 2 (mod 7)

Brute force for small numbers:
  x mod 3 = 2 → x = 2, 5, 8, 11, 14, 17, 20, 23...
  x mod 5 = 3 → x = 3, 8, 13, 18, 23...
  Common: x = 8, 23...
  x mod 7 = 2 → 8 mod 7 = 1 ❌, 23 mod 7 = 2 ✅
  Answer: x = 23 (then x = 23 + LCM(3,5,7) = 23 + 105k)
```

---

## 10. Digit Sum / Digital Root Method

### Verify Answers Quickly

```
Digital Root = repeatedly sum digits until single digit
  (Same as number mod 9, except 9 remains 9, not 0)

VERIFICATION of multiplication:
  Check: 267 × 139 = 37113
  
  DR(267) = 2+6+7 = 15 → 1+5 = 6
  DR(139) = 1+3+9 = 13 → 1+3 = 4
  Product of DRs = 6 × 4 = 24 → 2+4 = 6
  
  DR(37113) = 3+7+1+1+3 = 15 → 1+5 = 6
  
  Both are 6 → LIKELY CORRECT ✅

  Note: This is a necessary condition, not sufficient.
  If DRs don't match → DEFINITELY WRONG
  If DRs match → PROBABLY correct (not 100%)
```

---

## 11. Tables, Squares, Cubes — Must Memorize

### Multiplication Tables (13-20)

```
13: 13,26,39,52,65,78,91,104,117,130
14: 14,28,42,56,70,84,98,112,126,140
15: 15,30,45,60,75,90,105,120,135,150
16: 16,32,48,64,80,96,112,128,144,160
17: 17,34,51,68,85,102,119,136,153,170
18: 18,36,54,72,90,108,126,144,162,180
19: 19,38,57,76,95,114,133,152,171,190
20: 20,40,60,80,100,120,140,160,180,200
```

### Squares (1-30)

| n | n² | n | n² | n | n² |
|---|-----|---|-----|---|-----|
| 1 | 1 | 11 | 121 | 21 | 441 |
| 2 | 4 | 12 | 144 | 22 | 484 |
| 3 | 9 | 13 | 169 | 23 | 529 |
| 4 | 16 | 14 | 196 | 24 | 576 |
| 5 | 25 | 15 | 225 | 25 | 625 |
| 6 | 36 | 16 | 256 | 26 | 676 |
| 7 | 49 | 17 | 289 | 27 | 729 |
| 8 | 64 | 18 | 324 | 28 | 784 |
| 9 | 81 | 19 | 361 | 29 | 841 |
| 10 | 100 | 20 | 400 | 30 | 900 |

### Powers of 2

```
2^1 = 2       2^7 = 128      2^13 = 8192
2^2 = 4       2^8 = 256      2^14 = 16384
2^3 = 8       2^9 = 512      2^15 = 32768
2^4 = 16      2^10 = 1024    2^16 = 65536
2^5 = 32      2^11 = 2048    2^17 = 131072
2^6 = 64      2^12 = 4096    2^20 = 1048576
```

---

## 12. Missing Formulas — Complete Formula Sheet

### Formulas NOT Covered in Previous Sections

#### Algebra — Additional

```
(a + b + c)³ = a³ + b³ + c³ + 3(a²b + a²c + b²a + b²c + c²a + c²b) + 6abc
             = a³ + b³ + c³ + 3(a+b)(b+c)(c+a)

If a + b + c = 0: a³ + b³ + c³ = 3abc

(a² + b²) = (a+b)² - 2ab  OR  (a-b)² + 2ab
(a³ + b³) = (a+b)(a² - ab + b²)
(a³ - b³) = (a-b)(a² + ab + b²)

AM ≥ GM ≥ HM (for positive numbers)
AM × HM = GM²

For two numbers a, b:
  AM = (a+b)/2
  GM = √(ab)
  HM = 2ab/(a+b)
```

#### Geometry — Missing Formulas

```
Sine Rule: a/sinA = b/sinB = c/sinC = 2R (circumradius)
Cosine Rule: c² = a² + b² - 2ab·cosC

Area of quadrilateral = ½ × d × (h₁ + h₂)
  where d = diagonal, h₁ and h₂ = perpendicular distances

Parallelogram:
  Area = base × height = ab·sinθ
  Diagonals: d₁² + d₂² = 2(a² + b²)

Rhombus:
  Area = ½ × d₁ × d₂
  Side = ½√(d₁² + d₂²)

Trapezium:
  Area = ½ × (a + b) × h
  where a, b are parallel sides, h = height

Regular Hexagon (side a):
  Area = (3√3/2)a²
  Perimeter = 6a

Arc and Sector:
  Arc length = (θ/360) × 2πr
  Sector area = (θ/360) × πr²
  Segment area = Sector area - Triangle area

Ellipse:
  Area = πab (a = semi-major, b = semi-minor)
  Perimeter ≈ π(3(a+b) - √((3a+b)(a+3b)))
```

#### Number System — Missing

```
Number of factors of N = p₁^a₁ × p₂^a₂ × ... × pₖ^aₖ:
  = (a₁+1)(a₂+1)...(aₖ+1)

Sum of factors: [(p₁^(a₁+1) - 1)/(p₁ - 1)] × [(p₂^(a₂+1) - 1)/(p₂ - 1)] × ...

Product of factors: N^(number of factors / 2)

Number of ways to express N as product of two factors:
  = (number of factors) / 2     [if N is not a perfect square]
  = (number of factors + 1) / 2 [if N is a perfect square]

Highest power of prime p in n!:
  = ⌊n/p⌋ + ⌊n/p²⌋ + ⌊n/p³⌋ + ...
  
  Example: Highest power of 2 in 10!:
  ⌊10/2⌋ + ⌊10/4⌋ + ⌊10/8⌋ = 5 + 2 + 1 = 8

Number of trailing zeros in n!:
  = ⌊n/5⌋ + ⌊n/25⌋ + ⌊n/125⌋ + ...
  
  Example: Trailing zeros in 100!:
  ⌊100/5⌋ + ⌊100/25⌋ = 20 + 4 = 24
```

#### Statistics — Missing

```
Mean = Σx / n

Median:
  Odd n: Middle value when sorted
  Even n: Average of two middle values

Mode: Most frequently occurring value

Range = Maximum - Minimum

Standard Deviation = √[Σ(x - mean)² / n]

Variance = (Standard Deviation)²

Weighted Mean = Σ(wᵢ × xᵢ) / Σwᵢ
```

#### Work & Wages

```
Wages are distributed in ratio of work done (efficiencies)
If A, B, C work together:
  A's wage = (A's efficiency / Total efficiency) × Total wages

Man-Days concept:
  M₁ × D₁ × H₁ / W₁ = M₂ × D₂ × H₂ / W₂
  (M=men, D=days, H=hours, W=work)
```

#### Partnership

```
Simple Partnership (same time):
  Profit ratio = Capital ratio = A : B : C

Compound Partnership (different time):
  Profit ratio = A×t₁ : B×t₂ : C×t₃
  (Capital × Time invested)
```

#### Races & Games

```
In a 100m race, if A beats B by 10m:
  When A finishes 100m, B has run 90m
  A's speed / B's speed = 100/90 = 10/9

Dead heat = both reach together

If A beats B by t seconds in a 100m race:
  When A finishes, B is t seconds behind
  Distance covered by B in t seconds = (B's speed × t)
  A beats B by (B's speed × t) meters
```

---

## 13. 50 Most Expected Questions with Solutions

### 🔥 Numerical Ability — Most Expected

**Q1:** A shopkeeper marks up goods by 40% and gives a discount of 20%. Find profit %.

```
Let CP = 100
MP = 140
SP = 140 × 0.8 = 112
Profit = 12%
Shortcut: 40 - 20 - (40×20)/100 = 40 - 20 - 8 = 12%
```
**Answer: 12%**

---

**Q2:** The ratio of boys to girls in a class is 3:2. If 6 more girls join, the ratio becomes 3:4. Find the total original students.

```
Boys = 3x, Girls = 2x
3x / (2x + 6) = 3/4
12x = 6x + 18 → 6x = 18 → x = 3
Original total = 3(3) + 2(3) = 15
```
**Answer: 15 students**

---

**Q3:** A train 200m long crosses a bridge 300m long in 25 seconds. Find speed in km/hr.

```
Speed = (200+300)/25 = 500/25 = 20 m/s = 20 × 18/5 = 72 km/hr
```
**Answer: 72 km/hr**

---

**Q4:** If 20% of a number is 50, find 40% of the same number.

```
20% = 50 → 100% = 250 → 40% = 100
```
**Answer: 100**

---

**Q5:** A sum doubles in 5 years at SI. In how many years will it become 5 times?

```
If doubles in 5 years → SI = P in 5 years → R = 20%
5 times → SI = 4P → 4P = P×20×T/100 → T = 20 years
```
**Answer: 20 years**

---

**Q6:** The average age of 30 students is 15. If the teacher's age is included, average becomes 16. Find teacher's age.

```
Sum of students = 30 × 15 = 450
Sum with teacher = 31 × 16 = 496
Teacher's age = 496 - 450 = 46
```
**Answer: 46 years**

---

**Q7:** In a mixture of 60 litres, the ratio of milk to water is 2:1. How much water must be added to make the ratio 1:2?

```
Milk = 40L, Water = 20L
After adding x litres water: 40/(20+x) = 1/2
80 = 20 + x → x = 60
```
**Answer: 60 litres**

---

**Q8:** A can do a work in 12 days, B in 18 days. They work together for 4 days, then A leaves. How many more days for B?

```
LCM(12,18) = 36 units
A = 3 units/day, B = 2 units/day
Together 4 days = 4 × 5 = 20 units done
Remaining = 36 - 20 = 16 units
B alone = 16/2 = 8 days
```
**Answer: 8 days**

---

**Q9:** The product of two numbers is 192 and their sum is 28. Find the numbers.

```
x + y = 28, xy = 192
x and y are roots of: t² - 28t + 192 = 0
t = (28 ± √(784-768))/2 = (28 ± 4)/2
t = 16 or 12
```
**Answer: 12 and 16**

---

**Q10:** How many trailing zeros in 100! ?

```
⌊100/5⌋ + ⌊100/25⌋ = 20 + 4 = 24
```
**Answer: 24 zeros**

---

### 🔥 Reasoning — Most Expected

**Q11:** If CLOUD is coded as 19, how is RAIN coded? (Position sum method)

```
C=3, L=12, O=15, U=21, D=4 → Sum = 55? No, given as 19...
Let's check: C(3)+L(12)+O(15)+U(21)+D(4) = 55 ≠ 19
Maybe different coding. Opposite letters: C=24,L=15,O=12,U=6,D=23 → 80 ≠ 19

Actually, CLOUD: C=3,L=12,O=15,U=21,D=4 → let's try digit sum:
55 → 5+5 = 10 → 1+0 = 1 ≠ 19

Try: Vowels as position, consonants as 0:
O=15, U=21 → 15+21 = 36 ≠ 19

Try alternating: C+O+D = 3+15+4 = 22 ❌ OR L+U = 33 ❌

Actually with simpler coding like: each letter = position, and CLOUD = some operation:
If CLOUD = C×L-O-U+D = 3×12-15-21+4 = 36-15-21+4 = 4 ❌

Most likely: A=1,B=2 but reversed or A=0: C=2,L=11,O=14,U=20,D=3 → nah

Let's try: CLOUD → number of letters × consonants or similar.
5 letters, vowels = O,U → 2 vowels × 5 + 9 = 19?

Since exact coding unknown without full question, typical answer with 
reverse alphabet: R=9, A=26, I=18, N=13 = 66? 

For TCS: Read the pattern in the question carefully before guessing.
```

**Q12:** Complete the series: 2, 10, 30, 68, 130, ?

```
Differences: 8, 20, 38, 62
Second differences: 12, 18, 24
Third differences: 6, 6 → constant!

Next second difference = 24 + 6 = 30
Next first difference = 62 + 30 = 92
Answer = 130 + 92 = 222

OR pattern: n³ + n → 1+1=2, 8+2=10, 27+3=30, 64+4=68, 125+5=130, 216+6=222
```
**Answer: 222**

---

**Q13:** Pointing to a man, Rekha said "He is the only son of my mother's mother." How is the man related to Rekha?

```
Rekha's mother's mother = Rekha's grandmother
Only son of grandmother = Rekha's mother's brother = Maternal uncle
```
**Answer: Maternal uncle**

---

**Q14:** A man walks 3 km North, turns right, walks 4 km. How far from start?

```
√(3² + 4²) = √(9+16) = √25 = 5 km
Direction: North-East from start
```
**Answer: 5 km**

---

**Q15:** All flowers are plants. Some plants are trees. Conclusion: Some flowers are trees.

```
All flowers ⊂ plants. Some plants ∩ trees.
The "some plants" that are trees may not include flowers.
```
**Answer: Does NOT follow**

---

### 🔥 Verbal — Most Expected

**Q16:** Choose the synonym for "UBIQUITOUS"
- (a) Rare (b) Omnipresent (c) Unknown (d) Ancient

**Answer: (b) Omnipresent** — present everywhere

---

**Q17:** Choose the antonym for "VERBOSE"
- (a) Lengthy (b) Concise (c) Complex (d) Simple

**Answer: (b) Concise** — verbose means using too many words

---

**Q18:** Error spotting: "Each of the students (A) / have submitted (B) / their assignments (C) / No error (D)"

**Answer: (B)** — "Each" takes singular verb → "has submitted"

---

**Q19:** "Burning the midnight oil" means:
- (a) Wasting oil (b) Working/studying late at night (c) Burning things (d) Night shift

**Answer: (b)** — Working or studying late into the night

---

**Q20:** Fill in: "The committee _____ divided in their opinions."
- (a) is (b) are (c) was (d) were

**Answer: (d) were** — "divided" implies members acting individually → plural verb

---

### 🔥 Advanced Quantitative — Most Expected

**Q21:** If log₂(log₃(x)) = 1, find x.

```
log₂(log₃(x)) = 1 → log₃(x) = 2¹ = 2 → x = 3² = 9
```
**Answer: 9**

---

**Q22:** Find sum of infinite GP: 4, 2, 1, 1/2, ...

```
a = 4, r = 1/2
S∞ = 4/(1-0.5) = 4/0.5 = 8
```
**Answer: 8**

---

**Q23:** How many ways to arrange the letters of "MISSISSIPPI"?

```
M=1, I=4, S=4, P=2 → Total = 11 letters
Arrangements = 11! / (4! × 4! × 2!) = 39916800 / (24×24×2) = 39916800/1152 = 34650
```
**Answer: 34,650**

---

**Q24:** A bag has 5 red, 4 blue, 3 green balls. 3 balls drawn randomly. P(all different colors)?

```
P = (5C1 × 4C1 × 3C1) / 12C3 = (5×4×3)/220 = 60/220 = 3/11
```
**Answer: 3/11**

---

**Q25:** Find the area of triangle with vertices (0,0), (4,0), (0,3).

```
Area = ½ × base × height = ½ × 4 × 3 = 6
OR: ½|0(0-3) + 4(3-0) + 0(0-0)| = ½|12| = 6
```
**Answer: 6 sq units**

---

### 🔥 Advanced Reasoning — Most Expected

**Q26:** Statement: "Buy our toothpaste for whiter teeth!" — Assumption?
- I. People want whiter teeth.
- II. No other toothpaste provides white teeth.

**Answer: Only I** — The ad assumes people want whiter teeth. II is too extreme.

---

**Q27:** If + means ×, - means ÷, × means +, ÷ means -, find: 8 + 4 - 2 × 6 ÷ 3

```
Replace: 8 × 4 ÷ 2 + 6 - 3
= 32 ÷ 2 + 6 - 3
= 16 + 6 - 3
= 19
```
**Answer: 19**

---

**Q28:** A is 2nd to the left of B. C is 3rd to the right of A. D is between B and C. If there are 8 people, find the arrangement.

```
This needs more clues for exact solution. But approach:
B is at position x, A is at position x-2
C is at position (x-2)+3 = x+1
D is between B(x) and C(x+1) → D and B/C must have space between them.
If "between" means anywhere between, with 8 people, try specific positions.
```
**Answer: Solve by trying specific positions with all given clues**

---

### 🔥 Coding — Most Expected

**Q29:** Find the sum of all prime numbers between 1 and N.

```python
def sum_primes(n):
    if n < 2:
        return 0
    sieve = [True] * (n + 1)
    sieve[0] = sieve[1] = False
    for i in range(2, int(n**0.5) + 1):
        if sieve[i]:
            for j in range(i*i, n+1, i):
                sieve[j] = False
    return sum(i for i in range(2, n+1) if sieve[i])

n = int(input())
print(sum_primes(n))
```

---

**Q30:** Reverse a number without using string conversion.

```python
def reverse_number(n):
    rev = 0
    negative = n < 0
    n = abs(n)
    while n > 0:
        rev = rev * 10 + n % 10
        n //= 10
    return -rev if negative else rev

n = int(input())
print(reverse_number(n))
```

---

**Q31:** Check if a number is a perfect square without using sqrt.

```python
def is_perfect_square(n):
    if n < 0:
        return False
    i = 0
    while i * i <= n:
        if i * i == n:
            return True
        i += 1
    return False

# Efficient: Binary search
def is_perfect_square_fast(n):
    if n < 0:
        return False
    lo, hi = 0, n
    while lo <= hi:
        mid = (lo + hi) // 2
        sq = mid * mid
        if sq == n:
            return True
        elif sq < n:
            lo = mid + 1
        else:
            hi = mid - 1
    return False
```

---

**Q32:** Find GCD of an array of numbers.

```python
from math import gcd
from functools import reduce

def gcd_array(arr):
    return reduce(gcd, arr)

n = int(input())
arr = list(map(int, input().split()))
print(gcd_array(arr))
```

---

**Q33:** Count the number of set bits in binary representation.

```python
def count_bits(n):
    count = 0
    while n:
        n &= (n - 1)
        count += 1
    return count

n = int(input())
print(count_bits(n))
```

---

**Q34:** Check if two strings are rotations of each other.

```python
def are_rotations(s1, s2):
    if len(s1) != len(s2):
        return False
    return s2 in (s1 + s1)

s1 = input()
s2 = input()
print(are_rotations(s1, s2))
# "abcde" and "cdeab" → True (cdeab is in abcdeabcde)
```

---

**Q35:** Find the second most frequent character in a string.

```python
from collections import Counter

def second_most_frequent(s):
    freq = Counter(s.replace(" ", ""))
    sorted_freq = freq.most_common()
    if len(sorted_freq) < 2:
        return None
    return sorted_freq[1][0]

s = input()
print(second_most_frequent(s))
```

---

### 🔥 More High-Probability Questions

**Q36:** Two pipes A and B fill a tank in 20 and 30 minutes. A drain pipe C empties it in 15 minutes. If all three are open, how long to fill?

```
LCM(20,30,15) = 60
A fills 3 units/min, B fills 2 units/min, C empties 4 units/min
Net = 3 + 2 - 4 = 1 unit/min
Time = 60/1 = 60 minutes
```
**Answer: 60 minutes**

---

**Q37:** A boat goes 12 km upstream in 1.5 hours and 12 km downstream in 1 hour. Find speed of boat and stream.

```
Upstream speed = 12/1.5 = 8 km/hr
Downstream speed = 12/1 = 12 km/hr
Boat speed = (12+8)/2 = 10 km/hr
Stream speed = (12-8)/2 = 2 km/hr
```
**Answer: Boat = 10 km/hr, Stream = 2 km/hr**

---

**Q38:** CP of 15 articles = SP of 12 articles. Find profit %.

```
Profit% = [(15-12)/12] × 100 = 3/12 × 100 = 25%
```
**Answer: 25%**

---

**Q39:** A clock shows 4:30. What is the angle between hands?

```
Angle = |30H - 5.5M| = |30×4 - 5.5×30| = |120 - 165| = 45°
```
**Answer: 45°**

---

**Q40:** In how many ways can 8 people be seated around a circular table?

```
Circular permutations = (n-1)! = 7! = 5040
```
**Answer: 5040**

---

**Q41:** A number when divided by 5 gives remainder 3, when divided by 7 gives remainder 4. What is the remainder when divided by 35?

```
x ≡ 3 (mod 5) → x = 5k + 3
x ≡ 4 (mod 7) → try: 3, 8, 13, 18, 23, 28, 33...
  3 mod 7 = 3 ❌, 8 mod 7 = 1 ❌, 13 mod 7 = 6 ❌, 18 mod 7 = 4 ✅
x = 18 → 18 mod 35 = 18
```
**Answer: 18**

---

**Q42:** Find the unit digit of (27)^35.

```
Unit digit of 7^n cycles: 7,9,3,1 → period 4
35 mod 4 = 3 → 3rd in cycle = 3
```
**Answer: 3**

---

**Q43:** What is the day on January 1, 2026?

```
Jan 1, 2025 = Wednesday (known)
2025 is not a leap year → 365 days → 1 odd day
January 1, 2026 = Wednesday + 1 = Thursday
```
**Answer: Thursday**

---

**Q44:** If price increases by 25%, by how much should consumption decrease to keep expenditure same?

```
Decrease = [25/(100+25)] × 100 = (25/125) × 100 = 20%
Shortcut: r/(100+r) × 100
```
**Answer: 20%**

---

**Q45:** The diagonal of a rectangle is 10 cm. If the length is 8 cm, find the area.

```
Width = √(10² - 8²) = √(100-64) = √36 = 6
Area = 8 × 6 = 48 cm²
```
**Answer: 48 cm²**

---

**Q46:** Find the compound interest on ₹8000 at 10% for 2 years compounded annually.

```
A = 8000(1.1)² = 8000 × 1.21 = 9680
CI = 9680 - 8000 = ₹1680
```
**Answer: ₹1680**

---

**Q47:** A can do 1/3 of a work in 5 days. B can do 2/5 of the work in 10 days. Who is faster and together how long?

```
A: 1/3 in 5 days → full work in 15 days → rate = 1/15
B: 2/5 in 10 days → full work in 25 days → rate = 1/25
A is faster.
Together: 1/15 + 1/25 = (5+3)/75 = 8/75
Days = 75/8 = 9.375 = 9 days 9 hours
```
**Answer: A is faster; together 75/8 days = 9⅜ days**

---

**Q48:** Find next in series: 1, 4, 13, 40, 121, ?

```
Pattern: ×3 + 1
1 × 3 + 1 = 4
4 × 3 + 1 = 13
13 × 3 + 1 = 40
40 × 3 + 1 = 121
121 × 3 + 1 = 364
```
**Answer: 364**

---

**Q49:** A shopkeeper uses a weight of 900g instead of 1kg. What is his actual profit %?

```
He gives 900g but charges for 1000g.
Profit on each "kg" = 100g worth
Profit% = (100/900) × 100 = 11.11%
```
**Answer: 11.11%**

---

**Q50:** In a class of 50 students, 30 play cricket, 25 play football, and 15 play both. How many play neither?

```
n(C ∪ F) = 30 + 25 - 15 = 40
Neither = 50 - 40 = 10
```
**Answer: 10 students**

---

## 14. Last-Minute Revision Cheat Sheet

### ⚡ Top 10 Shortcuts to Remember

| # | Trick | Formula | Example |
|---|-------|---------|---------|
| 1 | Successive % change | a + b + ab/100 | 20%, then -10% = 8% |
| 2 | CP of x = SP of y | Profit = (x-y)/y × 100 | CP 15 = SP 12 → 25% |
| 3 | Same SP, x% profit & x% loss | Net Loss = x²/100 % | 25%,25% → 6.25% loss |
| 4 | Price ↑ r%, reduce consumption | r/(100+r) × 100 | 25% ↑ → 20% ↓ |
| 5 | Average speed (same distance) | 2ab/(a+b) | 40,60 → 48 km/hr |
| 6 | Doubles in T years (SI) | Rate = 100/T % | Doubles in 5yr → 20% |
| 7 | N times in T years (SI) | Time = (N-1) × T | 5× in 20yr if 2× in 5yr |
| 8 | CI-SI difference (2 years) | P(R/100)² | Diff = 50, R=10 → P=5000 |
| 9 | Trailing zeros in N! | ⌊N/5⌋ + ⌊N/25⌋ + ... | 100! → 24 zeros |
| 10 | Square near 50 | (25±x)×100 + x² | 52² = 2704 |

### 📋 Must-Know Values

```
√2 = 1.414    √3 = 1.732    √5 = 2.236    √7 = 2.646
π = 3.14159   e = 2.718     log2 ≈ 0.301   log3 ≈ 0.477

1 km/hr = 5/18 m/s     1 m/s = 18/5 km/hr
1 hour = 3600 seconds   1 km = 1000 m
```

### 🎯 Final Exam Day Checklist

```
☐ Attempt ALL questions (no negative marking)
☐ Easy questions first → Medium → Hard
☐ Use on-screen calculator for complex calculations
☐ Use on-screen rough pad for diagrams
☐ Don't spend more than 1.5 min on any foundation question
☐ For coding: read BOTH problems first, solve easier one first
☐ Verify answers using digital root method where possible
☐ Keep an eye on the section timer
☐ Don't move your eyes down during the exam
☐ Stay calm and confident — you've prepared well! 💪
```

---

> **← Back to:** [Main Index](../README.md)
