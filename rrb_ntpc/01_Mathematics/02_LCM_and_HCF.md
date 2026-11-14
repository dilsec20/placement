# 📌 LCM and HCF (Least Common Multiple & Highest Common Factor)

## Overview

**LCM and HCF** is one of the most frequently tested topics in the RRB NTPC Mathematics section. Questions can appear directly (find LCM/HCF) or indirectly (problems on bells ringing together, circular tracks, largest tile size, etc.). A strong grip on this topic also helps in Fractions, Ratio, and Number System questions.

| Detail | Info |
|---|---|
| **Exam** | RRB NTPC CBT-1 (CEN 07/2026) |
| **Total Math Questions** | 30 out of 100 |
| **Expected Questions from this Topic** | 2–3 questions |
| **Difficulty Level** | Easy to Moderate |
| **Negative Marking** | -1/3 per wrong answer |

> LCM/HCF questions are usually straightforward and high-scoring. Don't skip this chapter!

---

## 📖 Complete Theory

### 1. Basic Definitions

| Term | Definition |
|---|---|
| **Factor (Divisor)** | A number that divides another number exactly (with remainder 0) |
| **Multiple** | A number obtained by multiplying a number by an integer |
| **HCF (Highest Common Factor)** | The largest number that divides two or more numbers exactly. Also called GCD (Greatest Common Divisor) or GCF |
| **LCM (Least Common Multiple)** | The smallest positive number that is a multiple of two or more numbers |

**Example:**
- Factors of 12: 1, 2, 3, 4, 6, 12
- Factors of 18: 1, 2, 3, 6, 9, 18
- Common factors: 1, 2, 3, 6
- **HCF = 6** (highest among common factors)

- Multiples of 4: 4, 8, 12, 16, 20, 24, 28, 32, 36, …
- Multiples of 6: 6, 12, 18, 24, 30, 36, …
- Common multiples: 12, 24, 36, …
- **LCM = 12** (least among common multiples)

### 2. Methods to Find HCF

#### Method 1: Prime Factorisation Method

**Step 1:** Express each number as product of prime factors.
**Step 2:** HCF = Product of common prime factors with the **smallest** power.

**Example:** Find HCF of 36, 48, and 60.
- 36 = 2² × 3²
- 48 = 2⁴ × 3¹
- 60 = 2² × 3¹ × 5¹
- Common primes: 2 and 3
- HCF = 2²(smallest power) × 3¹(smallest power) = 4 × 3 = **12**

#### Method 2: Division Method (Long Division / Euclidean Algorithm)

**For two numbers:** Divide the larger by the smaller. Then divide the divisor by the remainder. Repeat until remainder = 0. The last divisor is the HCF.

**Example:** HCF of 252 and 105.
```
252 = 105 × 2 + 42
105 = 42 × 2 + 21
42 = 21 × 2 + 0
```
**HCF = 21**

#### Method 3: Successive Division Method (for 3+ numbers)

Find HCF of first two numbers, then find HCF of that result with the third number, and so on.

**Example:** HCF of 12, 18, 24
- HCF(12, 18) = 6
- HCF(6, 24) = 6
- **HCF = 6**

### 3. Methods to Find LCM

#### Method 1: Prime Factorisation Method

**Step 1:** Express each number as product of prime factors.
**Step 2:** LCM = Product of all prime factors with the **highest** power.

**Example:** Find LCM of 12, 15, and 20.
- 12 = 2² × 3¹
- 15 = 3¹ × 5¹
- 20 = 2² × 5¹
- LCM = 2² × 3¹ × 5¹ = 4 × 3 × 5 = **60**

#### Method 2: Common Division Method

Divide all numbers simultaneously by the smallest possible prime. Continue until all quotients become 1.

**Example:** LCM of 8, 12, 15
```
2 | 8   12   15
2 | 4    6   15
2 | 2    3   15
3 | 1    3   15
5 | 1    1    5
  | 1    1    1
```
LCM = 2 × 2 × 2 × 3 × 5 = **120**

### 4. Fundamental Relationship between LCM and HCF

> **For two numbers a and b:**
> **LCM(a, b) × HCF(a, b) = a × b**

This is **ONLY valid for two numbers**, NOT for three or more.

**Example:** LCM of 12 and 18.
- HCF(12, 18) = 6
- LCM = (12 × 18) / 6 = 216/6 = **36**

### 5. LCM and HCF of Fractions

| Operation | Formula |
|---|---|
| **HCF of fractions** | HCF of numerators / LCM of denominators |
| **LCM of fractions** | LCM of numerators / HCF of denominators |

**Example:** Find HCF and LCM of 2/3, 4/5, and 6/7.
- HCF = HCF(2, 4, 6) / LCM(3, 5, 7) = 2/105
- LCM = LCM(2, 4, 6) / HCF(3, 5, 7) = 12/1 = 12

### 6. LCM and HCF of Decimals

**Step 1:** Make the number of decimal places equal in all numbers.
**Step 2:** Remove decimal points and find LCM/HCF.
**Step 3:** Put back the decimal point (same number of decimal places).

**Example:** Find LCM of 0.6, 1.5, and 0.75.
- Make equal decimals: 0.60, 1.50, 0.75
- Remove decimals: 60, 150, 75
- LCM(60, 150, 75) = 300
- Put back decimal: **3.00 = 3**

### 7. Important Properties

| Property | Detail |
|---|---|
| HCF of co-prime numbers | Always **1** |
| LCM of co-prime numbers | Product of the numbers |
| HCF always divides LCM | True |
| HCF ≤ smallest number | Always true |
| LCM ≥ largest number | Always true |
| HCF of consecutive numbers | Always **1** |
| LCM of consecutive numbers | Product of the numbers |
| HCF(a, b) divides (a - b) | Always true |

### 8. Word Problem Types

#### Type 1: Bells Ringing Together
*"Three bells ring at intervals of 4, 7, and 14 minutes. If they ring together at 12:00, when will they ring together next?"*
- LCM(4, 7, 14) = 28 minutes
- They ring together at **12:28 PM**

#### Type 2: Largest Tile / Square
*"Find the largest square tile that can be used to pave a floor of 4m × 6m."*
- Side of largest square tile = HCF(4, 6) = **2m**

#### Type 3: Maximum People / Groups
*"490 boys and 350 girls are to be divided into equal groups. What is the maximum number of people in each group?"*
- HCF(490, 350) = 70
- Maximum in each group = **70**

#### Type 4: Remainder Type Problems
*"Find the largest number that divides 615 and 963 leaving remainder 6 in each case."*
- Subtract remainder: 615 - 6 = 609, 963 - 6 = 957
- HCF(609, 957) = 87
- Largest number = **87**

#### Type 5: Different Remainders
*"Find the largest number that divides 245, 1029, and 1263 leaving remainders 5, 5, and 3 respectively."*
- 245 - 5 = 240, 1029 - 5 = 1024, 1263 - 3 = 1260
- HCF(240, 1024, 1260) = **4**

#### Type 6: Circular Track
*"A, B, and C take 40, 60, and 80 seconds respectively to complete a round. If they start together, after how many seconds will they meet at the starting point?"*
- LCM(40, 60, 80) = 240 seconds = **4 minutes**

### 9. Finding Numbers When LCM and HCF Are Given

If HCF = h, let the numbers be **h × a** and **h × b** where a and b are co-prime.
- LCM = h × a × b

**Example:** HCF of two numbers is 6 and LCM is 180. If one number is 36, find the other.
- LCM × HCF = Product of numbers
- 180 × 6 = 36 × x
- x = 1080/36 = **30**

---

## 📐 All Formulas — Quick Reference

| # | Formula/Rule | Expression |
|---|---|---|
| 1 | Relationship (for 2 numbers) | LCM × HCF = a × b |
| 2 | HCF of fractions | HCF(numerators) / LCM(denominators) |
| 3 | LCM of fractions | LCM(numerators) / HCF(denominators) |
| 4 | HCF by prime factorisation | Common primes with lowest powers |
| 5 | LCM by prime factorisation | All primes with highest powers |
| 6 | Same remainder type | Subtract remainder → Find HCF |
| 7 | Different remainder type | Subtract respective remainders → Find HCF |
| 8 | Bells / Circular track | Find LCM of intervals |
| 9 | Largest tile / Max group | Find HCF of dimensions |
| 10 | If HCF(a,b) = h, numbers = ha, hb | LCM = h × a × b (a, b co-prime) |
| 11 | HCF divides LCM | LCM/HCF is always a whole number |
| 12 | HCF(a,b) divides |a - b| | Always true |

---

## 💡 Tips, Tricks & Shortcuts

### ⚡ Speed Techniques

1. **Quick HCF by Difference Method:**
   - HCF(a, b) always divides (a - b)
   - Example: HCF(91, 78) → 91 - 78 = 13 → HCF must be a factor of 13 → HCF = **13**

2. **LCM Shortcut for 2 numbers:**
   - If you know HCF, use: LCM = (a × b) / HCF — much faster than full factorisation.

3. **Quick Check: Is one number a multiple of the other?**
   - If yes → HCF = smaller number, LCM = larger number.
   - Example: HCF(12, 36) = 12, LCM(12, 36) = 36

4. **Co-prime shortcut:**
   - If numbers are co-prime: HCF = 1, LCM = product.
   - Example: LCM(7, 9) = 63, HCF(7, 9) = 1

5. **Time-saving for prime factorisation:**
   - Start dividing by 2, then 3, then 5, then 7… Only check primes up to √n.

6. **For "bells ringing" problems:**
   - Always find LCM.
   - Number of times they ring together in T hours = T/LCM + 1 (including start)

### ⚠️ Common Traps to Avoid

- **LCM × HCF = a × b works ONLY for 2 numbers** — This is the #1 trap.
- **HCF of fractions: HCF of numerators, LCM of denominators** — Don't mix up.
- **For remainder-type problems:** Subtract the remainder from the number FIRST, then find HCF.
- **Different remainders problem:** Don't confuse with same-remainder problems.
- **Always verify:** HCF should be ≤ smallest number, LCM should be ≥ largest number.

---

## 📝 RRB NTPC Previous Year Questions (PYQs)

### Question 1 (RRB NTPC 2021 Phase 1)
**The LCM of 12, 16, and 24 is:**

(A) 48  (B) 96  (C) 144  (D) 36

**Answer: (A) 48**

**Solution:**
- 12 = 2² × 3
- 16 = 2⁴
- 24 = 2³ × 3
- LCM = 2⁴ × 3 = 16 × 3 = **48**

---

### Question 2 (RRB NTPC 2021 Phase 3)
**The HCF of 72 and 120 is:**

(A) 12  (B) 24  (C) 36  (D) 48

**Answer: (B) 24**

**Solution:**
- 72 = 2³ × 3²
- 120 = 2³ × 3 × 5
- HCF = 2³ × 3 = 8 × 3 = **24**

---

### Question 3 (RRB NTPC 2020)
**Find the largest number which divides 615 and 963 leaving remainder 6 in each case.**

(A) 87  (B) 57  (C) 29  (D) 58

**Answer: (A) 87**

**Solution:**
- 615 - 6 = 609
- 963 - 6 = 957
- HCF(609, 957):
  - 957 = 609 × 1 + 348
  - 609 = 348 × 1 + 261
  - 348 = 261 × 1 + 87
  - 261 = 87 × 3 + 0
- HCF = **87**

---

### Question 4 (RRB NTPC 2021 Phase 2)
**Three bells toll at intervals of 9, 12, and 15 minutes. If they start tolling together at 8:00 AM, at what time will they next toll together?**

(A) 9:00 AM  (B) 10:00 AM  (C) 11:00 AM  (D) 8:45 AM

**Answer: (C) 11:00 AM**

**Solution:**
- LCM(9, 12, 15):
  - 9 = 3², 12 = 2² × 3, 15 = 3 × 5
  - LCM = 2² × 3² × 5 = 4 × 9 × 5 = 180 minutes = 3 hours
- 8:00 AM + 3 hours = **11:00 AM**

---

### Question 5 (RRB NTPC 2019)
**The HCF of two numbers is 15 and their LCM is 300. If one of the numbers is 60, find the other.**

(A) 75  (B) 45  (C) 90  (D) 100

**Answer: (A) 75**

**Solution:**
Using LCM × HCF = a × b:
- 300 × 15 = 60 × b
- b = 4500/60 = **75**

---

### Question 6 (RRB NTPC 2021 Phase 4)
**What is the LCM of 2/3, 4/9, and 8/27?**

(A) 8/3  (B) 8/27  (C) 2/27  (D) 4/3

**Answer: (A) 8/3**

**Solution:**
- LCM of fractions = LCM of numerators / HCF of denominators
- LCM(2, 4, 8) = 8
- HCF(3, 9, 27) = 3
- LCM = 8/3 = **8/3**

---

### Question 7 (RRB NTPC 2020)
**The product of two numbers is 4107. Their HCF is 37. Find their LCM.**

(A) 111  (B) 222  (C) 333  (D) 444

**Answer: (A) 111**

**Solution:**
- LCM × HCF = Product of two numbers
- LCM × 37 = 4107
- LCM = 4107/37 = **111**

---

### Question 8 (RRB NTPC 2021 Phase 5)
**The HCF of two numbers is 23 and the other two factors of their LCM are 13 and 14. Find the larger number.**

(A) 276  (B) 299  (C) 322  (D) 345

**Answer: (C) 322**

**Solution:**
- Numbers are: 23 × 13 = 299 and 23 × 14 = 322
- Larger number = **322**

---

### Question 9 (RRB NTPC 2021 Phase 1)
**Find the greatest number that will divide 43, 91, and 183 leaving the same remainder in each case.**

(A) 4  (B) 7  (C) 9  (D) 3

**Answer: (A) 4**

**Solution:**
When the remainder is same (unknown), find differences:
- 91 - 43 = 48
- 183 - 91 = 92
- 183 - 43 = 140
- HCF(48, 92, 140):
  - HCF(48, 92) = HCF(48, 44) = HCF(44, 4) = 4
  - HCF(4, 140) = 4
- Answer: **4**

---

### Question 10 (RRB NTPC 2020)
**A rectangular courtyard is 18m 72cm long and 13m 20cm broad. It is to be paved with square tiles of the same size. Find the least possible number of tiles.**

(A) 4290  (B) 4160  (C) 3120  (D) 5765

**Answer: (B) 4160**

**Solution:**
- Length = 1872 cm, Breadth = 1320 cm
- Side of square tile = HCF(1872, 1320)
- 1872 = 1320 × 1 + 552
- 1320 = 552 × 2 + 216
- 552 = 216 × 2 + 120
- 216 = 120 × 1 + 96
- 120 = 96 × 1 + 24
- 96 = 24 × 4 + 0
- HCF = 24 cm
- Number of tiles = (1872/24) × (1320/24) = 78 × 55 = **4290**

Wait, let me recheck: 78 × 55 = 4290. But option (B) says 4160. Let me recompute.
- Actually, 1872 ÷ 24 = 78, 1320 ÷ 24 = 55, 78 × 55 = 4290 → Answer: **(A) 4290**

---

### Question 11 (RRB NTPC 2021)
**Find the HCF of 0.63, 1.05, and 2.1.**

(A) 0.__(B) 0.__(C) 0.21  (D) 0.__(E) 0.21

(A) 0.__(B) 0.07  (C) 0.21  (D) 0.63

**Answer: (C) 0.21**

**Solution:**
- Convert: 0.63, 1.05, 2.10 → 63, 105, 210
- HCF(63, 105, 210):
  - 63 = 3² × 7, 105 = 3 × 5 × 7, 210 = 2 × 3 × 5 × 7
  - HCF = 3 × 7 = 21
- Put back decimal: **0.21**

---

### Question 12 (RRB NTPC 2019)
**The ratio of two numbers is 3:4 and their HCF is 5. Find their LCM.**

(A) 45  (B) 60  (C) 75  (D) 30

**Answer: (B) 60**

**Solution:**
- Numbers = 3 × 5 = 15 and 4 × 5 = 20
- LCM(15, 20) = 60
- Or: Since ratio terms 3 and 4 are co-prime, LCM = HCF × 3 × 4 = 5 × 12 = **60**

---

### Question 13 (RRB NTPC 2021 Phase 3)
**Six bells commence tolling together and toll at intervals of 2, 4, 6, 8, 10, 12 seconds. How many times do they toll together in 30 minutes?**

(A) 16  (B) 15  (C) 11  (D) 10

**Answer: (A) 16**

**Solution:**
- LCM(2, 4, 6, 8, 10, 12) = 120 seconds = 2 minutes
- In 30 minutes: 30/2 = 15 intervals
- Total times together = 15 + 1 (initial toll) = **16**

---

### Question 14 (RRB NTPC 2020)
**The LCM of two numbers is 12 times their HCF. The sum of HCF and LCM is 403. If one number is 93, find the other.**

(A) 124  (B) 128  (C) 134  (D) 138

**Answer: (A) 124**

**Solution:**
- LCM = 12 × HCF
- LCM + HCF = 403 → 12 × HCF + HCF = 403 → 13 × HCF = 403 → HCF = 31
- LCM = 12 × 31 = 372
- Other number = (LCM × HCF) / 93 = (372 × 31) / 93 = 11532/93 = **124**

---

## 🎯 Exam Strategy & Revision Tips

### During Preparation
1. **Master both methods** (prime factorisation and division) — use whichever is faster for the given numbers.
2. **Practice word problems extensively** — bell tolling, circular track, tiling are exam favorites.
3. **Memorize the fraction formula** for HCF and LCM — it's tested directly.
4. **Practice the "same remainder" and "different remainder" types** — they appear frequently.

### During the Exam
1. **Identify the type first:** Is it asking for HCF or LCM? The word problem will guide you:
   - "Greatest/largest number that divides" → **HCF**
   - "Smallest/least number divisible by" → **LCM**
   - "Meet at starting point / ring together" → **LCM**
   - "Maximum size of tile / equal groups" → **HCF**
2. **Use the relationship formula** LCM × HCF = a × b for quick calculations with two numbers.
3. **Verify your answer:** HCF ≤ smallest number, LCM ≥ largest number.
4. **For remainder problems:** Always subtract the remainder before finding HCF.

### Revision Checklist
- [ ] Prime factorisation method for LCM & HCF
- [ ] Division (Euclidean) method
- [ ] LCM × HCF = Product (for 2 numbers only)
- [ ] HCF & LCM of fractions formulas
- [ ] HCF & LCM of decimals method
- [ ] All 6 word problem types
- [ ] Same remainder vs. different remainder problems

---

*Last Updated: November 2026 | RRB NTPC CEN 07/2026 Preparation Material*
