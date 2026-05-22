# 🔢 Numerical Ability — TCS NQT 2026

> **Section:** Part A (Foundation) | **Questions:** 20 | **Time:** 25 minutes | **Difficulty:** Moderate

---

## 📑 Table of Contents

1. [Number System](#1-number-system)
2. [HCF & LCM](#2-hcf--lcm)
3. [Percentages](#3-percentages)
4. [Profit, Loss & Discount](#4-profit-loss--discount)
5. [Simple & Compound Interest](#5-simple--compound-interest)
6. [Ratio & Proportion](#6-ratio--proportion)
7. [Averages](#7-averages)
8. [Mixtures & Alligation](#8-mixtures--alligation)
9. [Time & Work](#9-time--work)
10. [Pipes & Cisterns](#10-pipes--cisterns)
11. [Time, Speed & Distance](#11-time-speed--distance)
12. [Trains](#12-trains)
13. [Boats & Streams](#13-boats--streams)
14. [Ages](#14-ages)
15. [Calendar & Clocks](#15-calendar--clocks)
16. [Probability (Basic)](#16-probability-basic)
17. [Permutation & Combination (Basic)](#17-permutation--combination-basic)
18. [Data Interpretation (Basic)](#18-data-interpretation-basic)
19. [Previous Year Questions](#19-previous-year-questions)
20. [Tips & Tricks](#20-tips--tricks)

---

## 1. Number System

### Key Concepts

#### Types of Numbers
| Type | Definition | Examples |
|------|-----------|----------|
| Natural Numbers (N) | Counting numbers starting from 1 | 1, 2, 3, 4, 5... |
| Whole Numbers (W) | Natural numbers + 0 | 0, 1, 2, 3, 4... |
| Integers (Z) | Whole numbers + negative numbers | ...-3, -2, -1, 0, 1, 2, 3... |
| Rational Numbers (Q) | Numbers in form p/q (q ≠ 0) | 1/2, 3/4, -5/7 |
| Irrational Numbers | Cannot be expressed as p/q | √2, √3, π |
| Prime Numbers | Divisible only by 1 and itself | 2, 3, 5, 7, 11, 13... |
| Composite Numbers | More than 2 factors | 4, 6, 8, 9, 10... |
| Co-prime Numbers | HCF = 1 | (8, 15), (7, 9) |

#### Divisibility Rules
| Divisible by | Rule | Example |
|-------------|------|---------|
| 2 | Last digit is even (0,2,4,6,8) | 248 → 8 is even ✓ |
| 3 | Sum of digits divisible by 3 | 123 → 1+2+3=6 ✓ |
| 4 | Last two digits divisible by 4 | 1324 → 24÷4=6 ✓ |
| 5 | Last digit is 0 or 5 | 125 → ends in 5 ✓ |
| 6 | Divisible by both 2 and 3 | 126 → even & 1+2+6=9 ✓ |
| 7 | Double last digit, subtract from rest | 343 → 34-6=28 ✓ |
| 8 | Last three digits divisible by 8 | 1000 → 000÷8=0 ✓ |
| 9 | Sum of digits divisible by 9 | 729 → 7+2+9=18 ✓ |
| 11 | Difference of sum of alternate digits = 0 or ×11 | 1331 → (1+3)-(3+1)=0 ✓ |

### Important Formulas

```
Sum of first n natural numbers         = n(n+1)/2
Sum of squares of first n numbers      = n(n+1)(2n+1)/6
Sum of cubes of first n numbers        = [n(n+1)/2]²
Number of prime numbers between 1-100  = 25

Unit digit cycles:
  2: {2,4,8,6} → cycle of 4
  3: {3,9,7,1} → cycle of 4
  4: {4,6}     → cycle of 2
  7: {7,9,3,1} → cycle of 4
  8: {8,4,2,6} → cycle of 4
  9: {9,1}     → cycle of 2
```

### Solved Examples

**Q1:** Find the unit digit of 7^253

**Solution:**
- Unit digit cycle of 7: {7, 9, 3, 1} → cycle = 4
- 253 ÷ 4 = 63 remainder 1
- Remainder 1 → first element = **7**
- **Answer: 7**

**Q2:** Find the remainder when 17^23 is divided by 5

**Solution:**
- 17 mod 5 = 2
- So find 2^23 mod 5
- Cycle of 2 mod 5: {2, 4, 3, 1} → cycle = 4
- 23 ÷ 4 = 5 remainder 3
- Third element = 3
- **Answer: 3**

**Q3:** How many numbers between 1 and 100 are divisible by both 3 and 5?

**Solution:**
- LCM(3,5) = 15
- Numbers divisible by 15 between 1-100: 15, 30, 45, 60, 75, 90
- **Answer: 6**

---

## 2. HCF & LCM

### Key Concepts

- **HCF (Highest Common Factor):** Largest number that divides two or more numbers exactly
- **LCM (Least Common Multiple):** Smallest number that is divisible by two or more numbers

### Formulas

```
Product of two numbers = HCF × LCM

HCF of fractions = HCF of numerators / LCM of denominators
LCM of fractions = LCM of numerators / HCF of denominators

For co-prime numbers: HCF = 1, LCM = Product of numbers
```

### Methods to Find HCF
1. **Prime Factorization:** Take common prime factors with least power
2. **Division Method (Euclidean Algorithm):** Divide larger by smaller, continue with remainder

### Methods to Find LCM
1. **Prime Factorization:** Take all prime factors with highest power
2. **Division Method:** Divide by prime numbers

### Solved Examples

**Q1:** Find HCF and LCM of 12, 18, and 24

**Solution:**
```
12 = 2² × 3
18 = 2 × 3²
24 = 2³ × 3

HCF = 2¹ × 3¹ = 6 (common primes, least powers)
LCM = 2³ × 3² = 72 (all primes, highest powers)
```
- **Answer: HCF = 6, LCM = 72**

**Q2:** Find the greatest number that divides 57 and 93 leaving remainders 3 and 5 respectively.

**Solution:**
- 57 - 3 = 54 and 93 - 5 = 88
- HCF(54, 88) = HCF(54, 88)
- 88 = 54×1 + 34 → 54 = 34×1 + 20 → 34 = 20×1 + 14 → 20 = 14×1 + 6 → 14 = 6×2 + 2 → 6 = 2×3 + 0
- **Answer: 2**

**Q3:** The LCM of two numbers is 48, and their HCF is 4. If one number is 12, find the other.

**Solution:**
- Product = HCF × LCM = 4 × 48 = 192
- Other number = 192 / 12 = **16**

---

## 3. Percentages

### Key Concepts

```
Percentage = (Part / Whole) × 100

If a value increases by x%, new value  = Original × (1 + x/100)
If a value decreases by x%, new value = Original × (1 - x/100)

Successive percentage change:
  Net effect of a% and b% = a + b + (ab/100) %

Population formula:
  After n years = P × (1 + r/100)^n
  Before n years = P / (1 + r/100)^n
```

### Fraction-Percentage Conversion Table (MEMORIZE THIS!)

| Fraction | Percentage | Fraction | Percentage |
|----------|-----------|----------|-----------|
| 1/2 | 50% | 1/8 | 12.5% |
| 1/3 | 33.33% | 1/9 | 11.11% |
| 1/4 | 25% | 1/10 | 10% |
| 1/5 | 20% | 1/11 | 9.09% |
| 1/6 | 16.67% | 1/12 | 8.33% |
| 1/7 | 14.28% | 1/15 | 6.67% |
| 2/3 | 66.67% | 2/5 | 40% |
| 3/4 | 75% | 3/5 | 60% |
| 4/5 | 80% | 5/6 | 83.33% |

### Solved Examples

**Q1:** A number is increased by 20% and then decreased by 20%. What is the net percentage change?

**Solution:**
- Net change = 20 + (-20) + (20 × -20)/100 = 0 - 4 = **-4%**
- **Answer: 4% decrease**

**Q2:** The population of a city is 50,000. It increases at 10% per annum. What will it be after 2 years?

**Solution:**
- Population = 50000 × (1 + 10/100)² = 50000 × 1.21 = **60,500**

**Q3:** If the price of sugar increases by 25%, by what percentage must a family reduce consumption so that the expenditure remains the same?

**Solution:**
- Reduction = (25/125) × 100 = **20%**
- **Formula shortcut:** r/(100+r) × 100

---

## 4. Profit, Loss & Discount

### Key Concepts & Formulas

```
Profit = Selling Price (SP) - Cost Price (CP)     [when SP > CP]
Loss = Cost Price (CP) - Selling Price (SP)        [when CP > SP]

Profit %  = (Profit / CP) × 100
Loss %    = (Loss / CP) × 100

SP = CP × (100 + Profit%) / 100
SP = CP × (100 - Loss%) / 100

Marked Price (MP):
  Discount = MP - SP
  Discount % = (Discount / MP) × 100
  SP = MP × (100 - Discount%) / 100

If CP of x articles = SP of y articles:
  Profit % = [(x-y)/y] × 100

Successive discounts of a% and b%:
  Equivalent single discount = (a + b - ab/100)%

When two items sold at same SP:
  One at x% profit and other at x% loss:
  Net loss% = x²/100 %   (ALWAYS A LOSS)
```

### Solved Examples

**Q1:** A man buys a watch for ₹800 and sells it for ₹920. Find profit %.

**Solution:**
- Profit = 920 - 800 = ₹120
- Profit % = (120/800) × 100 = **15%**

**Q2:** Successive discounts of 20% and 10% are given on an article whose marked price is ₹500. Find the selling price.

**Solution:**
- After 20%: 500 × 0.80 = 400
- After 10%: 400 × 0.90 = **₹360**
- OR: Equivalent discount = 20 + 10 - (20×10)/100 = 28%
- SP = 500 × 0.72 = **₹360**

**Q3:** A shopkeeper sells two items at ₹1000 each. He gains 25% on one and loses 25% on other. Find net profit/loss %.

**Solution:**
- Net loss = x²/100 = 25²/100 = 625/100 = **6.25% loss**

---

## 5. Simple & Compound Interest

### Key Formulas

```
Simple Interest (SI):
  SI = (P × R × T) / 100
  Amount (A) = P + SI = P(1 + RT/100)

Compound Interest (CI):
  A = P(1 + R/100)^T
  CI = A - P = P[(1 + R/100)^T - 1]

  Half-yearly: A = P(1 + R/200)^(2T)
  Quarterly:   A = P(1 + R/400)^(4T)

Difference between CI and SI:
  For 2 years: CI - SI = P(R/100)²
  For 3 years: CI - SI = P(R/100)² × (3 + R/100)

When rates are different for different years:
  A = P(1 + R₁/100)(1 + R₂/100)(1 + R₃/100)
```

### Solved Examples

**Q1:** Find SI on ₹5000 at 8% per annum for 3 years.

**Solution:**
- SI = (5000 × 8 × 3) / 100 = **₹1200**
- Amount = 5000 + 1200 = **₹6200**

**Q2:** Find CI on ₹10,000 at 10% per annum for 2 years.

**Solution:**
- A = 10000(1 + 10/100)² = 10000 × 1.21 = 12100
- CI = 12100 - 10000 = **₹2100**

**Q3:** The difference between CI and SI on a sum at 10% for 2 years is ₹50. Find the sum.

**Solution:**
- Difference = P(R/100)²
- 50 = P × (10/100)²
- 50 = P × 0.01
- P = **₹5000**

---

## 6. Ratio & Proportion

### Key Concepts & Formulas

```
Ratio: a:b = a/b

Properties:
  a:b = ka:kb (multiplying both by same number)
  a:b:c can be found by making common terms equal

Proportion: a:b = c:d → a/b = c/d
  Product of extremes = Product of means
  a × d = b × c

Types:
  Direct Proportion: If x increases, y increases → x/y = constant
  Inverse Proportion: If x increases, y decreases → xy = constant

Componendo: (a+b)/b = (c+d)/d
Dividendo: (a-b)/b = (c-d)/d
Componendo-Dividendo: (a+b)/(a-b) = (c+d)/(c-d)

If a:b = p:q and b:c = r:s
Then a:b:c = pr : qr : qs
```

### Solved Examples

**Q1:** The ratio of ages of A and B is 3:5. If the sum of their ages is 40, find their ages.

**Solution:**
- A = (3/8) × 40 = **15 years**
- B = (5/8) × 40 = **25 years**

**Q2:** If a:b = 2:3 and b:c = 4:5, find a:b:c

**Solution:**
- Make 'b' common: a:b = 2:3 = 8:12, b:c = 4:5 = 12:15
- a:b:c = **8:12:15**

**Q3:** Divide ₹1760 among A, B, C in ratio 2:3:6.

**Solution:**
- Total parts = 2+3+6 = 11
- A = (2/11) × 1760 = **₹320**
- B = (3/11) × 1760 = **₹480**
- C = (6/11) × 1760 = **₹960**

---

## 7. Averages

### Key Formulas

```
Average = Sum of observations / Number of observations
Sum = Average × Number of observations

Weighted Average = (w₁x₁ + w₂x₂ + ... + wₙxₙ) / (w₁ + w₂ + ... + wₙ)

Average of first n natural numbers = (n+1)/2
Average of first n even numbers = (n+1)
Average of first n odd numbers = n
Average of consecutive numbers from a to b = (a+b)/2

If a person joins/leaves a group:
  New member's age = New avg + n × (New avg - Old avg)
  where n = new number of people
```

### Solved Examples

**Q1:** The average of 5 numbers is 27. If one number is excluded, the average becomes 25. Find the excluded number.

**Solution:**
- Sum of 5 numbers = 5 × 27 = 135
- Sum of 4 numbers = 4 × 25 = 100
- Excluded number = 135 - 100 = **35**

**Q2:** The average weight of a class of 30 students is 40 kg. A new student joins and the average becomes 40.5 kg. Find the weight of the new student.

**Solution:**
- Weight = New avg + n × (New avg - Old avg)
- Weight = 40.5 + 31 × (40.5 - 40) = 40.5 + 15.5 = **55.5 kg**
- OR: New sum = 31 × 40.5 = 1255.5, Old sum = 30 × 40 = 1200
- New student = 1255.5 - 1200 = **55.5 kg**

---

## 8. Mixtures & Alligation

### Key Concepts & Formulas

```
Alligation Rule:
  If two ingredients of price C₁ and C₂ are mixed to get a 
  mixture of price Cₘ (where C₁ < Cₘ < C₂):

  Quantity of cheaper / Quantity of dearer = (C₂ - Cₘ) / (Cₘ - C₁)

  Represented as:
       C₁           C₂
         \         /
          \       /
            Cₘ
          /       \
         /         \
    (C₂-Cₘ)    (Cₘ-C₁)

Replacement Formula:
  If a container has 'a' litres of liquid A, and 'b' litres
  are taken out and replaced with liquid B, repeated n times:
  
  Liquid A left = a × (1 - b/a)^n
```

### Solved Examples

**Q1:** In what ratio should tea at ₹60/kg be mixed with tea at ₹80/kg to get a mixture worth ₹68/kg?

**Solution:**
```
  60          80
    \        /
      68
    /        \
  12    :    8
  = 3   :    2
```
- **Answer: 3:2**

**Q2:** A container has 80 litres of milk. 8 litres are removed and replaced with water. This is done 3 times. Find the quantity of milk left.

**Solution:**
- Milk left = 80 × (1 - 8/80)³ = 80 × (0.9)³ = 80 × 0.729 = **58.32 litres**

---

## 9. Time & Work

### Key Concepts & Formulas

```
If A can do a work in 'a' days:
  A's 1 day work = 1/a

If A can do work in 'a' days and B in 'b' days:
  Together: 1 day work = 1/a + 1/b
  Together they finish in = ab/(a+b) days

If A is x times as efficient as B:
  Time taken by A : Time taken by B = 1 : x

If A can do a work in 'a' days and B can do it in 'b' days:
  A and B together = ab/(a+b) days

LCM Method (VERY USEFUL):
  Total work = LCM of individual days
  Efficiency = Total work / Individual days
```

### Solved Examples

**Q1:** A can do a work in 12 days, B can do it in 15 days. How many days will they take together?

**Solution (LCM Method):**
```
Total work = LCM(12,15) = 60 units
A's efficiency = 60/12 = 5 units/day
B's efficiency = 60/15 = 4 units/day
Together = 5 + 4 = 9 units/day
Days = 60/9 = 20/3 = 6⅔ days
```
- **Answer: 6 days and 16 hours**

**Q2:** A can do a work in 10 days, B in 12 days, and C in 15 days. In how many days can they finish together?

**Solution:**
```
Total work = LCM(10,12,15) = 60
A = 6 units/day, B = 5 units/day, C = 4 units/day
Together = 15 units/day
Days = 60/15 = 4 days
```
- **Answer: 4 days**

**Q3:** A and B together can do a work in 6 days. A alone can do it in 10 days. In how many days can B alone do it?

**Solution:**
- 1/6 - 1/10 = (5-3)/30 = 2/30 = 1/15
- **Answer: B alone takes 15 days**

---

## 10. Pipes & Cisterns

### Key Concepts & Formulas

```
(Same as Time & Work but with pipes)

Inlet pipe fills in 'a' hours → Rate = 1/a per hour
Outlet pipe empties in 'b' hours → Rate = -1/b per hour (negative)

If inlet fills in 'a' hours and outlet empties in 'b' hours (a < b):
  Net rate = 1/a - 1/b
  Time to fill = ab/(b-a) hours

If both inlet and outlet open and a > b (emptying faster):
  Time to empty = ab/(a-b) hours
```

### Solved Examples

**Q1:** Pipe A fills a tank in 6 hours, Pipe B fills in 8 hours, Pipe C empties in 12 hours. If all three are open, how long to fill?

**Solution:**
```
LCM(6,8,12) = 24 units (total capacity)
A fills = 24/6 = 4 units/hr
B fills = 24/8 = 3 units/hr
C empties = 24/12 = -2 units/hr
Net = 4 + 3 - 2 = 5 units/hr
Time = 24/5 = 4.8 hours = 4 hours 48 mins
```
- **Answer: 4 hours 48 minutes**

---

## 11. Time, Speed & Distance

### Key Formulas

```
Distance = Speed × Time
Speed = Distance / Time
Time = Distance / Speed

Unit conversions:
  km/hr to m/s → multiply by 5/18
  m/s to km/hr → multiply by 18/5

Average Speed:
  If same distance at speeds a and b:
  Average speed = 2ab/(a+b)
  
  If same time at speeds a and b:
  Average speed = (a+b)/2

Relative Speed:
  Same direction: |S₁ - S₂|
  Opposite direction: S₁ + S₂

Meeting time:
  Two persons from A and B (D apart) towards each other:
  Meeting time = D / (S₁ + S₂)
```

### Solved Examples

**Q1:** A car travels 240 km in 4 hours. What is its speed in m/s?

**Solution:**
- Speed = 240/4 = 60 km/hr
- In m/s = 60 × 5/18 = **16.67 m/s**

**Q2:** A person goes from A to B at 40 km/hr and returns at 60 km/hr. Find average speed.

**Solution:**
- Average = 2×40×60/(40+60) = 4800/100 = **48 km/hr**

**Q3:** Two trains start from stations A and B, 300 km apart, towards each other at 50 km/hr and 70 km/hr. When will they meet?

**Solution:**
- Relative speed = 50 + 70 = 120 km/hr
- Time = 300/120 = **2.5 hours**

---

## 12. Trains

### Key Formulas

```
Time to cross a pole/person = Length of train / Speed
Time to cross a platform = (Length of train + Length of platform) / Speed
Time to cross another train:
  Same direction: (L₁ + L₂) / |S₁ - S₂|
  Opposite direction: (L₁ + L₂) / (S₁ + S₂)

Time for train to cross a person on platform:
  Time = Length of train / Speed of train
```

### Solved Examples

**Q1:** A train 150m long passes a pole in 10 seconds. Find its speed in km/hr.

**Solution:**
- Speed = 150/10 = 15 m/s = 15 × 18/5 = **54 km/hr**

**Q2:** A train 200m long passes a platform 300m long in 25 seconds. Find its speed.

**Solution:**
- Speed = (200+300)/25 = 500/25 = 20 m/s = **72 km/hr**

**Q3:** Two trains of length 100m and 150m are running in opposite directions at 60 km/hr and 40 km/hr. Time to cross each other?

**Solution:**
- Relative speed = 60+40 = 100 km/hr = 100 × 5/18 = 250/9 m/s
- Time = (100+150)/(250/9) = 250 × 9/250 = **9 seconds**

---

## 13. Boats & Streams

### Key Formulas

```
Downstream speed = Boat speed + Stream speed = u + v
Upstream speed = Boat speed - Stream speed = u - v

Speed of boat in still water = (Downstream + Upstream) / 2
Speed of stream = (Downstream - Upstream) / 2

If boat takes 't₁' hours downstream and 't₂' hours upstream for same distance:
  Speed of boat / Speed of stream = (t₁ + t₂) / (t₂ - t₁)
```

### Solved Examples

**Q1:** A boat goes 36 km downstream in 4 hours and 24 km upstream in 4 hours. Find speed of boat and stream.

**Solution:**
- Downstream speed = 36/4 = 9 km/hr
- Upstream speed = 24/4 = 6 km/hr
- Boat speed = (9+6)/2 = **7.5 km/hr**
- Stream speed = (9-6)/2 = **1.5 km/hr**

---

## 14. Ages

### Key Concepts

```
Key phrases:
  "x years ago"   → subtract x from current age
  "x years hence" → add x to current age
  "twice as old"  → one age = 2 × other age

Common approach: Let present ages be variables and form equations
```

### Solved Examples

**Q1:** Father is 3 times as old as his son. 5 years later, he will be 2.5 times his son's age. Find present ages.

**Solution:**
- Let son = x, father = 3x
- After 5 years: 3x+5 = 2.5(x+5)
- 3x+5 = 2.5x+12.5 → 0.5x = 7.5 → x = 15
- **Son = 15, Father = 45**

**Q2:** The sum of ages of A and B is 50. 5 years ago, A was twice as old as B. Find their current ages.

**Solution:**
- A + B = 50
- (A-5) = 2(B-5) → A = 2B-5
- 2B-5+B = 50 → 3B = 55 → B = 55/3 ≈ 18.33
- But let's recalculate: A-5 = 2(B-5) → A-5 = 2B-10 → A = 2B-5
- 2B-5+B = 50 → 3B = 55 → **B ≈ 18.33, A ≈ 31.67**

---

## 15. Calendar & Clocks

### Calendar Concepts

```
Odd Days concept:
  1 ordinary year = 365 days = 52 weeks + 1 odd day
  1 leap year = 366 days = 52 weeks + 2 odd days

  100 years = 76 ordinary + 24 leap = 76 + 48 = 124 odd days
            = 5 odd days (124 mod 7)
  200 years = 3 odd days
  300 years = 1 odd day
  400 years = 0 odd days

Leap Year: 
  Divisible by 4 (but not by 100, unless also by 400)
  2024 → leap, 1900 → not leap, 2000 → leap

Day codes: Sun=0, Mon=1, Tue=2, Wed=3, Thu=4, Fri=5, Sat=6
```

### Clock Concepts

```
Speed of minute hand: 6° per minute
Speed of hour hand: 0.5° per minute
Relative speed: 5.5° per minute

Angle between hands = |30H - 5.5M| degrees
(where H = hour, M = minutes)

In 12 hours, minute hand gains 11 rounds over hour hand
Hands coincide 11 times in 12 hours (22 times in 24 hours)
Hands are opposite 11 times in 12 hours
Hands are at right angle 22 times in 12 hours (44 times in 24 hours)

Time between two coincidences = 12/11 hours = 65 5/11 minutes
```

### Solved Examples

**Q1:** What was the day on 15th August, 1947?

**Solution:**
```
Odd days in 1600 years = 0
Odd days in 300 years = 1
Odd days from 1901-1946:
  46 years = 35 ordinary + 11 leap = 35 + 22 = 57 odd days
  57 mod 7 = 1
Jan(3) + Feb(0) + Mar(3) + Apr(2) + May(3) + Jun(2) + Jul(3) + Aug(15)
= 31+28+31+30+31+30+31+15 = 227 days
227 mod 7 = 3 odd days
Total = 0+1+1+3 = 5 → Friday
```
- **Answer: Friday**

**Q2:** At what time between 3 and 4 will the hands of a clock be at right angle?

**Solution:**
- Angle = |30H - 5.5M| = 90
- |90 - 5.5M| = 90
- Case 1: 90 - 5.5M = 90 → M = 0 → 3:00
- Case 2: 90 - 5.5M = -90 → 5.5M = 180 → M = 32 8/11 → **3:32 8/11**

---

## 16. Probability (Basic)

### Key Formulas

```
P(Event) = Favorable outcomes / Total outcomes
0 ≤ P(E) ≤ 1
P(E) + P(not E) = 1

P(A or B) = P(A) + P(B) - P(A and B)
P(A and B) = P(A) × P(B)   [if independent]

Playing cards: 52 cards, 4 suits, 13 each
  Hearts ♥ (red), Diamonds ♦ (red), Clubs ♣ (black), Spades ♠ (black)
  Face cards: 12 (3 per suit: J, Q, K)

Dice: 1 die has 6 faces (1-6), 2 dice have 36 outcomes
Coins: 1 coin has 2 outcomes, n coins have 2^n outcomes
```

### Solved Examples

**Q1:** Two dice are thrown. Probability that sum is 7?

**Solution:**
- Favorable: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6
- Total = 36
- P = 6/36 = **1/6**

**Q2:** A bag contains 3 red, 5 blue balls. Two balls are drawn. Probability both are red?

**Solution:**
- P = ³C₂/⁸C₂ = 3/28 = **3/28**

---

## 17. Permutation & Combination (Basic)

### Key Formulas

```
Factorial: n! = n × (n-1) × (n-2) × ... × 1
  0! = 1, 1! = 1

Permutation (arrangement, order matters):
  nPr = n! / (n-r)!

Combination (selection, order doesn't matter):
  nCr = n! / [r! × (n-r)!]

Important Results:
  nCr = nC(n-r)
  nC0 = nCn = 1
  nC1 = n
  nCr + nC(r-1) = (n+1)Cr

Circular permutations = (n-1)!
With identical items: n! / (p! × q! × r!)
```

### Solved Examples

**Q1:** In how many ways can the letters of "APPLE" be arranged?

**Solution:**
- Total letters = 5, P repeats 2 times
- Arrangements = 5!/2! = 120/2 = **60**

**Q2:** A committee of 3 is to be formed from 5 men and 4 women with at least 1 woman. How many ways?

**Solution:**
- Total ways - No woman = ⁹C₃ - ⁵C₃ = 84 - 10 = **74**

---

## 18. Data Interpretation (Basic)

### Types of Data Interpretation
1. **Bar Graphs** — Compare quantities across categories
2. **Line Graphs** — Show trends over time
3. **Pie Charts** — Show proportion of whole (360° = 100%)
4. **Tables** — Raw numerical data
5. **Mixed/Caselets** — Combination of text and data

### Key Formulas for DI

```
Percentage change = [(New - Old) / Old] × 100
Growth rate = [(Final - Initial) / Initial] × 100
Ratio = Part / Total
Pie chart degree = (Value / Total) × 360°
Pie chart percentage = (Degree / 360) × 100
```

### Tips for DI
- Read the question first, then look at the data
- Approximate calculations wherever possible
- Use fractions instead of actual division for speed
- Note the units carefully (lakhs, crores, thousands)

---

## 19. Previous Year Questions

### PYQ 1 (Number System)
**Q:** What is the remainder when 2^256 is divided by 17?

**Solution:**
- 2⁴ = 16 ≡ -1 (mod 17)
- 2^256 = (2⁴)^64 = (-1)^64 = 1
- **Answer: 1**

### PYQ 2 (Percentage)
**Q:** If A's salary is 20% less than B's salary, by what percent is B's salary more than A's?

**Solution:**
- Let B = 100, then A = 80
- B more than A = (20/80) × 100 = **25%**

### PYQ 3 (Profit & Loss)
**Q:** A sells an article to B at 20% profit. B sells to C at 25% profit. If C pays ₹225, what did A pay?

**Solution:**
- B's CP = 225/1.25 = 180
- A's CP = 180/1.20 = **₹150**

### PYQ 4 (Time & Work)
**Q:** A can do a piece of work in 10 days, B in 15 days. They work together for 2 days then A leaves. How many more days does B take?

**Solution:**
```
LCM(10,15) = 30 units
A = 3 units/day, B = 2 units/day
In 2 days together = 2 × 5 = 10 units done
Remaining = 30 - 10 = 20 units
B alone = 20/2 = 10 days
```
- **Answer: 10 days**

### PYQ 5 (Time Speed Distance)
**Q:** A train running at 72 km/hr crosses a platform in 30 seconds and a man standing on the platform in 18 seconds. What is the length of the platform?

**Solution:**
- Speed = 72 × 5/18 = 20 m/s
- Length of train = 20 × 18 = 360 m
- Train + Platform = 20 × 30 = 600 m
- Platform = 600 - 360 = **240 m**

### PYQ 6 (Ratio)
**Q:** The ratio of incomes of two persons is 5:3 and that of their expenditures is 3:1. If each saves ₹2000, find their incomes.

**Solution:**
- Income: 5x, 3x; Expenditure: 3y, y
- 5x - 3y = 2000 ... (1)
- 3x - y = 2000 ... (2)
- From (2): y = 3x - 2000
- Sub in (1): 5x - 3(3x-2000) = 2000 → 5x - 9x + 6000 = 2000 → -4x = -4000 → x = 1000
- **Income: ₹5000 and ₹3000**

### PYQ 7 (Calendar)
**Q:** If 1st January 2024 is Monday, what day is 1st January 2025?

**Solution:**
- 2024 is a leap year → 366 days → 2 odd days
- Monday + 2 = **Wednesday**

### PYQ 8 (Interest)
**Q:** A sum of money doubles itself in 8 years at SI. In how many years will it become 5 times?

**Solution:**
- Doubles in 8 years → SI = P in 8 years → Rate = P×R×8/100 = P → R = 12.5%
- 5 times → SI = 4P → 4P = P×12.5×T/100 → T = **32 years**

---

## 20. Tips & Tricks

### ⚡ Speed Calculation Tricks

1. **Multiplication by 11:** 
   - 23 × 11 = 2_(2+3)_3 = 253
   - 45 × 11 = 4_(4+5)_5 = 495

2. **Squaring numbers ending in 5:**
   - 25² = 2×3 | 25 = 625
   - 45² = 4×5 | 25 = 2025
   - 85² = 8×9 | 25 = 7225

3. **Percentage shortcuts:**
   - 10% → divide by 10
   - 5% → half of 10%
   - 1% → divide by 100
   - 15% → 10% + 5%
   - 20% → divide by 5

4. **Division tricks:**
   - Divide by 5 → multiply by 2, divide by 10
   - Divide by 25 → multiply by 4, divide by 100
   - Divide by 50 → multiply by 2, divide by 100

### 🎯 Exam Strategy for Numerical Ability
1. **Time per question:** ~75 seconds (25 min / 20 questions)
2. **Do easy ones first:** Ages, Percentages, Averages
3. **Use approximation** when options are far apart
4. **Substitute options** — work backward from answer choices
5. **Learn tables up to 20** and squares up to 30
6. **Memorize cubes** up to 15
7. **No negative marking** → ATTEMPT EVERY QUESTION

### 📊 Important Tables to Memorize

| n | n² | n³ | √n (approx) |
|---|----|----|------|
| 1 | 1 | 1 | 1 |
| 2 | 4 | 8 | 1.414 |
| 3 | 9 | 27 | 1.732 |
| 4 | 16 | 64 | 2 |
| 5 | 25 | 125 | 2.236 |
| 6 | 36 | 216 | 2.449 |
| 7 | 49 | 343 | 2.646 |
| 8 | 64 | 512 | 2.828 |
| 9 | 81 | 729 | 3 |
| 10 | 100 | 1000 | 3.162 |
| 11 | 121 | 1331 | 3.317 |
| 12 | 144 | 1728 | 3.464 |
| 13 | 169 | 2197 | 3.606 |
| 14 | 196 | 2744 | 3.742 |
| 15 | 225 | 3375 | 3.873 |

---

> **Next Section:** [Verbal Ability →](../02_Verbal_Ability/README.md)
