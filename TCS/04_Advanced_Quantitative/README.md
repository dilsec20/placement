# 📐 Advanced Quantitative Ability — TCS NQT 2026

> **Section:** Part B (Advanced) | **Questions:** 14-16 (shared with Advanced Reasoning) | **Time:** 25 mins (shared) | **Difficulty:** High

---

## 📑 Table of Contents

1. [Advanced Algebra](#1-advanced-algebra)
2. [Quadratic Equations](#2-quadratic-equations)
3. [Inequalities](#3-inequalities)
4. [Functions & Graphs](#4-functions--graphs)
5. [Logarithms](#5-logarithms)
6. [Set Theory](#6-set-theory)
7. [Advanced Permutation & Combination](#7-advanced-permutation--combination)
8. [Advanced Probability](#8-advanced-probability)
9. [Geometry & Mensuration (Advanced)](#9-geometry--mensuration-advanced)
10. [Coordinate Geometry](#10-coordinate-geometry)
11. [Trigonometry](#11-trigonometry)
12. [Number Theory (Advanced)](#12-number-theory-advanced)
13. [Progressions (AP, GP, HP)](#13-progressions-ap-gp-hp)
14. [Advanced Data Interpretation](#14-advanced-data-interpretation)
15. [Previous Year Questions](#15-previous-year-questions)
16. [Tips & Tricks](#16-tips--tricks)

---

## 1. Advanced Algebra

### Algebraic Identities (Must Know)

```
(a + b)² = a² + 2ab + b²
(a - b)² = a² - 2ab + b²
(a + b)(a - b) = a² - b²
(a + b)³ = a³ + 3a²b + 3ab² + b³ = a³ + b³ + 3ab(a+b)
(a - b)³ = a³ - 3a²b + 3ab² - b³ = a³ - b³ - 3ab(a-b)
a³ + b³ = (a + b)(a² - ab + b²)
a³ - b³ = (a - b)(a² + ab + b²)
a³ + b³ + c³ - 3abc = (a + b + c)(a² + b² + c² - ab - bc - ca)

If a + b + c = 0, then a³ + b³ + c³ = 3abc

(a + b + c)² = a² + b² + c² + 2(ab + bc + ca)

Sophie Germain Identity:
a⁴ + 4b⁴ = (a² + 2b² + 2ab)(a² + 2b² - 2ab)
```

### Factorization Techniques

```
Factor Theorem: If f(a) = 0, then (x - a) is a factor of f(x)

Remainder Theorem: When f(x) is divided by (x - a), remainder = f(a)

Common factoring patterns:
  ax + ay = a(x + y)
  x² + 5x + 6 = (x + 2)(x + 3)
  x² - 9 = (x + 3)(x - 3)
```

### Solved Examples

**Q1:** If x + 1/x = 5, find x² + 1/x²

**Solution:**
```
(x + 1/x)² = x² + 2 + 1/x²
25 = x² + 1/x² + 2
x² + 1/x² = 23
```
**Answer: 23**

**Q2:** If x + 1/x = 5, find x³ + 1/x³

**Solution:**
```
x³ + 1/x³ = (x + 1/x)³ - 3(x + 1/x)
= 125 - 15 = 110
```
**Answer: 110**

**Q3:** If a + b + c = 0, find (a² + b² + c²)/(a² - bc)

**Solution:**
```
a + b + c = 0 → a = -(b+c)
a² = (b+c)²  = b² + 2bc + c²
a² + b² + c² = b² + 2bc + c² + b² + c² = 2b² + 2c² + 2bc = 2(b² + c² + bc)
a² - bc = b² + 2bc + c² - bc = b² + bc + c²
Result = 2(b² + c² + bc) / (b² + bc + c²) = 2
```
**Answer: 2**

---

## 2. Quadratic Equations

### Standard Form & Formulas

```
Standard form: ax² + bx + c = 0

Quadratic formula: x = [-b ± √(b² - 4ac)] / 2a

Discriminant (D) = b² - 4ac
  D > 0 → Two distinct real roots
  D = 0 → Two equal real roots
  D < 0 → No real roots (complex roots)

Sum of roots (α + β) = -b/a
Product of roots (α × β) = c/a

If roots are α and β, the equation is:
  x² - (α+β)x + αβ = 0
```

### Relationship Between Roots

```
α² + β² = (α + β)² - 2αβ
α³ + β³ = (α + β)³ - 3αβ(α + β)
|α - β| = √[(α + β)² - 4αβ] = √D / |a|
1/α + 1/β = (α + β) / αβ = -b/c
```

### Nature of Roots Quick Reference

| Condition | Nature of Roots |
|-----------|----------------|
| D > 0, D is perfect square | Rational and distinct |
| D > 0, D is not perfect square | Irrational and distinct |
| D = 0 | Real and equal |
| D < 0 | Complex/Imaginary |
| a > 0 | Parabola opens upward |
| a < 0 | Parabola opens downward |

### Solved Examples

**Q1:** Find the nature of roots: 3x² - 4x + 5 = 0

**Solution:**
```
D = b² - 4ac = 16 - 60 = -44
D < 0 → No real roots (complex roots)
```

**Q2:** If one root of x² - 5x + k = 0 is 2, find k and the other root.

**Solution:**
```
If 2 is a root: 4 - 10 + k = 0 → k = 6
Sum of roots = 5 → other root = 5 - 2 = 3
Product check: 2 × 3 = 6 = k ✓
```
**Answer: k = 6, other root = 3**

**Q3:** Form the quadratic equation whose roots are 3 and -5.

**Solution:**
```
Sum = 3 + (-5) = -2
Product = 3 × (-5) = -15
Equation: x² - (-2)x + (-15) = 0
→ x² + 2x - 15 = 0
```

---

## 3. Inequalities

### Basic Rules

```
1. If a > b, then a + c > b + c (adding same to both sides)
2. If a > b and c > 0, then ac > bc (multiply by positive)
3. If a > b and c < 0, then ac < bc (multiply by negative → FLIP)
4. If a > b > 0, then 1/a < 1/b (reciprocal flips for positives)
5. |x| < a → -a < x < a
6. |x| > a → x < -a or x > a
```

### Solving Quadratic Inequalities

```
Method: Find roots, then check sign in intervals

Example: x² - 5x + 6 < 0
Step 1: Factor → (x-2)(x-3) < 0
Step 2: Roots are x=2 and x=3
Step 3: Sign chart:
  x < 2: (+)(+) = + > 0 ❌
  2 < x < 3: (-)(+) = - < 0 ✅
  x > 3: (+)(+) = + > 0 ❌
Answer: 2 < x < 3

SHORTCUT: For (x-a)(x-b) < 0 where a < b → a < x < b
          For (x-a)(x-b) > 0 where a < b → x < a or x > b
```

### Solved Examples

**Q1:** Solve: x² - 7x + 10 ≤ 0

**Solution:**
```
(x-2)(x-5) ≤ 0
Roots: 2 and 5
Since coefficient of x² is positive and ≤ 0:
Answer: 2 ≤ x ≤ 5
```

**Q2:** Solve: |2x - 3| < 7

**Solution:**
```
-7 < 2x - 3 < 7
-4 < 2x < 10
-2 < x < 5
```

---

## 4. Functions & Graphs

### Types of Functions

```
One-One (Injective): Each element of domain maps to unique element in codomain
  f(a) = f(b) → a = b

Onto (Surjective): Every element of codomain has a pre-image

Bijective: Both one-one and onto

Even function: f(-x) = f(x) → symmetric about y-axis
Odd function: f(-x) = -f(x) → symmetric about origin
```

### Important Functions

```
Linear: f(x) = ax + b (straight line)
Quadratic: f(x) = ax² + bx + c (parabola)
Cubic: f(x) = ax³ + bx² + cx + d
Modulus: f(x) = |x| (V-shape)
Greatest Integer: f(x) = [x] (step function)
  [3.7] = 3, [-2.3] = -3, [5] = 5

Composite function: (f∘g)(x) = f(g(x))
Inverse function: f⁻¹(x) where f(f⁻¹(x)) = x
```

### Solved Examples

**Q1:** If f(x) = 2x + 3 and g(x) = x², find f(g(2)).

**Solution:**
```
g(2) = 4
f(g(2)) = f(4) = 2(4) + 3 = 11
```

**Q2:** Find the range of f(x) = x² + 4x + 7

**Solution:**
```
f(x) = (x + 2)² + 3
Minimum value = 3 (when x = -2)
Range: [3, ∞)
```

---

## 5. Logarithms

### Key Formulas

```
Definition: If aˣ = N, then log_a(N) = x

Basic Properties:
  log_a(1) = 0
  log_a(a) = 1
  log_a(mn) = log_a(m) + log_a(n)
  log_a(m/n) = log_a(m) - log_a(n)
  log_a(mⁿ) = n × log_a(m)
  log_a(b) = 1 / log_b(a)
  log_a(b) = log_c(b) / log_c(a)    [Change of base]
  a^(log_a(x)) = x

Common logarithm: log₁₀(x) = log(x)
Natural logarithm: logₑ(x) = ln(x)

Important values:
  log₁₀(2) ≈ 0.3010
  log₁₀(3) ≈ 0.4771
  log₁₀(5) = log₁₀(10/2) = 1 - 0.3010 = 0.6990
  log₁₀(7) ≈ 0.8451
```

### Solved Examples

**Q1:** Find the value of log₂(64)

**Solution:**
```
64 = 2⁶
log₂(64) = 6
```

**Q2:** If log₁₀(2) = 0.301, find log₁₀(50)

**Solution:**
```
log₁₀(50) = log₁₀(100/2) = log₁₀(100) - log₁₀(2)
= 2 - 0.301 = 1.699
```

**Q3:** Simplify: log₃(27) + log₃(9) - log₃(81)

**Solution:**
```
= log₃(3³) + log₃(3²) - log₃(3⁴)
= 3 + 2 - 4 = 1
```

**Q4:** Solve: log₂(x) + log₂(x-2) = 3

**Solution:**
```
log₂[x(x-2)] = 3
x(x-2) = 8
x² - 2x - 8 = 0
(x-4)(x+2) = 0
x = 4 or x = -2
Since log requires positive argument: x = 4
Check: log₂(4) + log₂(2) = 2 + 1 = 3 ✓
```

---

## 6. Set Theory

### Key Formulas

```
Union: A ∪ B = elements in A or B or both
Intersection: A ∩ B = elements in both A and B
Complement: A' = elements not in A
Difference: A - B = elements in A but not in B

n(A ∪ B) = n(A) + n(B) - n(A ∩ B)
n(A ∪ B ∪ C) = n(A) + n(B) + n(C) - n(A∩B) - n(B∩C) - n(A∩C) + n(A∩B∩C)

n(only A) = n(A) - n(A ∩ B)
n(A') = n(U) - n(A)    [where U = universal set]

De Morgan's Laws:
  (A ∪ B)' = A' ∩ B'
  (A ∩ B)' = A' ∪ B'
```

### Solved Examples

**Q1:** In a class of 100 students, 60 like Cricket, 50 like Football, and 20 like both. How many like neither?

**Solution:**
```
n(C ∪ F) = 60 + 50 - 20 = 90
Neither = 100 - 90 = 10
```

**Q2:** In a survey of 200 people, 120 read newspaper A, 100 read B, 80 read C, 50 read A and B, 40 read B and C, 30 read A and C, and 10 read all three. How many read at least one?

**Solution:**
```
n(A ∪ B ∪ C) = 120 + 100 + 80 - 50 - 40 - 30 + 10 = 190
```

**Q3:** From Q2, how many read exactly one newspaper?

**Solution:**
```
Exactly one = n(A∪B∪C) - exactly two - exactly three
Exactly two = (50-10) + (40-10) + (30-10) = 40 + 30 + 20 = 90
Wait, let me recalculate:
  n(A only) = 120 - 50 - 30 + 10 = 50
  n(B only) = 100 - 50 - 40 + 10 = 20
  n(C only) = 80 - 40 - 30 + 10 = 20
Exactly one = 50 + 20 + 20 = 90
```

---

## 7. Advanced Permutation & Combination

### Advanced Formulas

```
Permutations with repetition: n^r (n choices for each of r positions)
Combinations with repetition: (n+r-1)C(r)
Circular permutations: (n-1)!
Necklace/Bracelet: (n-1)!/2

Derangements (no element in original position):
  D(n) = n! [1 - 1/1! + 1/2! - 1/3! + ... + (-1)ⁿ/n!]
  D(1) = 0, D(2) = 1, D(3) = 2, D(4) = 9, D(5) = 44

Distribution of identical objects:
  n identical items into r distinct groups = (n+r-1)C(r-1)
  (Stars and Bars method)

Number of ways to form a committee:
  At least 1 from each group → use complementary counting
```

### Important Concepts

#### Arrangement with Restrictions
```
If certain people MUST sit together:
  Treat them as one unit → (n-k+1)! × k!
  (n = total people, k = people in group)

If certain people must NOT sit together:
  Total - arrangements where they sit together

Arrangement of n people at a round table where 
  2 specific people must NOT sit adjacent:
  = (n-1)! - 2 × (n-2)!
```

#### Selection with Conditions
```
At least one woman from m men and n women:
  Total - No women = (m+n)Cr - mCr

Exactly k women:
  nCk × mC(r-k)  [k women from n, remaining from m men]
```

### Solved Examples

**Q1:** In how many ways can 5 boys and 3 girls sit in a row such that no two girls are adjacent?

**Solution:**
```
Step 1: Arrange 5 boys: 5! = 120 ways
Step 2: Available gaps for girls: _B_B_B_B_B_ = 6 gaps
Step 3: Choose 3 gaps from 6: ⁶C₃ = 20
Step 4: Arrange 3 girls in 3 gaps: 3! = 6
Total = 120 × 20 × 6 = 14,400
```

**Q2:** How many 4-digit numbers can be formed using digits 1,2,3,4,5 (repetition allowed) that are divisible by 4?

**Solution:**
```
A number is divisible by 4 if last two digits form a number divisible by 4.
Possible last two digits from {1,2,3,4,5}: 
  12, 24, 32, 44, 52 → 5 options
First two digits: 5 × 5 = 25 options each
Total = 25 × 5 = 125

Wait, let me list carefully:
Last two digits divisible by 4: 
11→no, 12→yes, 13→no, 14→no, 15→no
21→no, 22→no, 23→no, 24→yes, 25→no
31→no, 32→yes, 33→no, 34→no, 35→no
41→no, 42→no, 43→no, 44→yes, 45→no
51→no, 52→yes, 53→no, 54→no, 55→no
= 5 valid last two digits: 12, 24, 32, 44, 52

First two digits: 5 choices each → 5 × 5 = 25
Total = 25 × 5 = 125
```

**Q3:** Find the number of derangements of 4 elements.

**Solution:**
```
D(4) = 4![1 - 1 + 1/2 - 1/6 + 1/24]
= 24[0 + 0.5 - 0.1667 + 0.0417]
= 24 × 0.375 = 9
```
**Answer: 9**

---

## 8. Advanced Probability

### Key Formulas

```
Conditional Probability: P(A|B) = P(A ∩ B) / P(B)

Bayes' Theorem:
  P(A|B) = P(B|A) × P(A) / P(B)

Independent Events: P(A ∩ B) = P(A) × P(B)
Mutually Exclusive: P(A ∩ B) = 0

Binomial Distribution:
  P(X = r) = ⁿCr × p^r × q^(n-r)
  where p = probability of success, q = 1-p, n = trials

Expected Value: E(X) = Σ(xᵢ × P(xᵢ))
```

### Solved Examples

**Q1:** A bag has 5 red and 3 blue balls. Two balls are drawn without replacement. What is the probability that both are red?

**Solution:**
```
P(both red) = 5/8 × 4/7 = 20/56 = 5/14
```

**Q2:** Three coins are tossed. Find P(at least 2 heads).

**Solution:**
```
Total outcomes = 2³ = 8
At least 2 heads: HHH, HHT, HTH, THH = 4
P = 4/8 = 1/2

OR using complement:
P(at least 2H) = P(2H) + P(3H) = ³C₂(1/2)³ + ³C₃(1/2)³
= 3/8 + 1/8 = 4/8 = 1/2
```

**Q3:** Two dice are rolled. What is P(sum ≥ 10)?

**Solution:**
```
Sum 10: (4,6),(5,5),(6,4) = 3
Sum 11: (5,6),(6,5) = 2
Sum 12: (6,6) = 1
Total favorable = 6
P = 6/36 = 1/6
```

**Q4:** A box has 4 defective and 6 good items. If 3 are drawn randomly, what is the probability that at most one is defective?

**Solution:**
```
P(at most 1 defective) = P(0 defective) + P(1 defective)

P(0 defective) = ⁶C₃/¹⁰C₃ = 20/120 = 1/6
P(1 defective) = (⁴C₁ × ⁶C₂)/¹⁰C₃ = (4 × 15)/120 = 60/120 = 1/2

P(at most 1) = 1/6 + 1/2 = 2/3
```

---

## 9. Geometry & Mensuration (Advanced)

### Triangle Formulas

```
Area = ½ × base × height
Area = ½ × a × b × sin(C)
Area (Heron's) = √[s(s-a)(s-b)(s-c)]  where s = (a+b+c)/2

Equilateral triangle (side a):
  Area = (√3/4)a²
  Height = (√3/2)a
  Inradius = a/(2√3)
  Circumradius = a/√3

Pythagoras Theorem (right triangle): a² + b² = c²

Common Pythagorean triplets:
  (3,4,5), (5,12,13), (7,24,25), (8,15,17), (9,40,41)
  (6,8,10), (10,24,26), (12,35,37), (20,21,29)

Angle Bisector Theorem: BD/DC = AB/AC
Basic Proportionality (Thales): If DE ∥ BC in triangle ABC,
  then AD/DB = AE/EC
```

### Circle Formulas

```
Area = πr²
Circumference = 2πr
Arc length = (θ/360) × 2πr
Area of sector = (θ/360) × πr²
Area of segment = Area of sector - Area of triangle

Chord: If perpendicular from center to chord = d, half chord = √(r²-d²)
Tangent from external point: Length = √(d²-r²)  [d = distance from center]

Two tangents from same external point are equal in length
Angle between tangent and radius at point of contact = 90°
```

### 3D Mensuration

```
Cube (side a):
  Volume = a³
  Surface Area = 6a²
  Diagonal = a√3

Cuboid (l × b × h):
  Volume = lbh
  Surface Area = 2(lb + bh + hl)
  Diagonal = √(l² + b² + h²)

Cylinder (radius r, height h):
  Volume = πr²h
  Curved Surface Area = 2πrh
  Total Surface Area = 2πr(r + h)

Cone (radius r, height h, slant l):
  l = √(r² + h²)
  Volume = (1/3)πr²h
  Curved Surface Area = πrl
  Total Surface Area = πr(r + l)

Sphere (radius r):
  Volume = (4/3)πr³
  Surface Area = 4πr²

Hemisphere:
  Volume = (2/3)πr³
  Curved Surface Area = 2πr²
  Total Surface Area = 3πr²

Frustum of cone (R = larger radius, r = smaller):
  Volume = (πh/3)(R² + r² + Rr)
  Slant height = √[h² + (R-r)²]
  CSA = π(R+r)l
```

### Solved Examples

**Q1:** A cylinder has radius 7 cm and height 10 cm. Find the volume and TSA.

**Solution:**
```
Volume = π(7)²(10) = 490π ≈ 1539.38 cm³
TSA = 2π(7)(7+10) = 2π(7)(17) = 238π ≈ 747.7 cm²
```

**Q2:** A cone is made from a sector of a circle of radius 10 cm with angle 216°. Find the radius and height of the cone.

**Solution:**
```
Slant height of cone = radius of sector = 10 cm
Arc length = (216/360) × 2π(10) = 12π
Circumference of cone base = 12π → 2πr = 12π → r = 6 cm
Height = √(10² - 6²) = √64 = 8 cm
```

**Q3:** Water flows from a cylindrical tank (radius 14 cm) at 5 cm/min. How long to fill a cone of radius 7 cm and height 12 cm?

**Solution:**
```
Volume of cone = (1/3)π(7)²(12) = 196π cm³
Rate = π(14)²(5) = 980π cm³/min
Wait — water FLOWS from tank, we need to know what size pipe, etc.
Actually, if the rate of water flow is such that it drops 5cm/min in the cylinder:
Volume per min = π(14)²(5) = 980π cm³/min

But cone volume = 196π cm³
Time = 196π/980π = 0.2 min = 12 seconds
```

---

## 10. Coordinate Geometry

### Key Formulas

```
Distance between (x₁,y₁) and (x₂,y₂):
  d = √[(x₂-x₁)² + (y₂-y₁)²]

Midpoint: ((x₁+x₂)/2, (y₁+y₂)/2)

Section Formula (divides in ratio m:n):
  Internal: ((mx₂+nx₁)/(m+n), (my₂+ny₁)/(m+n))
  External: ((mx₂-nx₁)/(m-n), (my₂-ny₁)/(m-n))

Area of triangle with vertices (x₁,y₁), (x₂,y₂), (x₃,y₃):
  = ½|x₁(y₂-y₃) + x₂(y₃-y₁) + x₃(y₁-y₂)|

Slope: m = (y₂-y₁)/(x₂-x₁)
  Parallel lines: m₁ = m₂
  Perpendicular lines: m₁ × m₂ = -1

Equation of line:
  Slope-intercept: y = mx + c
  Point-slope: y - y₁ = m(x - x₁)
  Two-point: (y-y₁)/(y₂-y₁) = (x-x₁)/(x₂-x₁)
  Intercept form: x/a + y/b = 1

Distance from point (x₁,y₁) to line ax + by + c = 0:
  d = |ax₁ + by₁ + c| / √(a² + b²)

Equation of circle:
  Center (h,k), radius r: (x-h)² + (y-k)² = r²
  General form: x² + y² + 2gx + 2fy + c = 0
    Center = (-g, -f), radius = √(g² + f² - c)
```

### Solved Examples

**Q1:** Find the distance between (3, 4) and (6, 8).

**Solution:**
```
d = √[(6-3)² + (8-4)²] = √[9+16] = √25 = 5
```

**Q2:** Find the area of triangle with vertices (1,1), (4,2), (3,5).

**Solution:**
```
Area = ½|1(2-5) + 4(5-1) + 3(1-2)|
= ½|(-3) + 16 + (-3)|
= ½|10| = 5 sq units
```

**Q3:** Find the equation of line passing through (2,3) with slope 4.

**Solution:**
```
y - 3 = 4(x - 2)
y = 4x - 5
```

---

## 11. Trigonometry

### Basic Ratios & Values

```
sin θ = Opposite/Hypotenuse    cosec θ = 1/sin θ
cos θ = Adjacent/Hypotenuse    sec θ = 1/cos θ
tan θ = Opposite/Adjacent      cot θ = 1/tan θ

Fundamental Identity: sin²θ + cos²θ = 1
                      1 + tan²θ = sec²θ
                      1 + cot²θ = cosec²θ
```

### Standard Values Table

| θ | 0° | 30° | 45° | 60° | 90° |
|---|-----|------|------|------|------|
| sin | 0 | 1/2 | 1/√2 | √3/2 | 1 |
| cos | 1 | √3/2 | 1/√2 | 1/2 | 0 |
| tan | 0 | 1/√3 | 1 | √3 | ∞ |

### Important Formulas

```
sin(A+B) = sinA cosB + cosA sinB
sin(A-B) = sinA cosB - cosA sinB
cos(A+B) = cosA cosB - sinA sinB
cos(A-B) = cosA cosB + sinA sinB
tan(A+B) = (tanA + tanB) / (1 - tanA tanB)

sin 2A = 2 sinA cosA
cos 2A = cos²A - sin²A = 2cos²A - 1 = 1 - 2sin²A
tan 2A = 2tanA / (1 - tan²A)

Heights and Distances:
  Angle of elevation → looking UP
  Angle of depression → looking DOWN
  tan(angle) = Height / Distance
```

### Solved Examples

**Q1:** If sin A = 3/5, find cos A and tan A (A is acute).

**Solution:**
```
cos A = √(1 - sin²A) = √(1 - 9/25) = √(16/25) = 4/5
tan A = sin A / cos A = (3/5)/(4/5) = 3/4
```

**Q2:** A tower is 50m high. The angle of elevation from a point on the ground is 30°. Find the distance from the point to the base.

**Solution:**
```
tan 30° = 50/d
1/√3 = 50/d
d = 50√3 ≈ 86.6 m
```

**Q3:** Simplify: sin²30° + cos²60° + tan²45°

**Solution:**
```
= (1/2)² + (1/2)² + 1²
= 1/4 + 1/4 + 1
= 3/2 = 1.5
```

---

## 12. Number Theory (Advanced)

### Key Concepts

```
Euler's Totient Function φ(n):
  Count of numbers from 1 to n that are coprime to n
  φ(p) = p - 1 (for prime p)
  φ(p^k) = p^k - p^(k-1)
  φ(mn) = φ(m) × φ(n)  [if gcd(m,n) = 1]

  φ(12) = 12 × (1-1/2) × (1-1/3) = 12 × 1/2 × 2/3 = 4
  Numbers coprime to 12: {1, 5, 7, 11} = 4 ✓

Euler's Theorem:
  If gcd(a,n) = 1, then a^φ(n) ≡ 1 (mod n)

Fermat's Little Theorem:
  If p is prime and gcd(a,p) = 1, then a^(p-1) ≡ 1 (mod p)

Wilson's Theorem:
  (p-1)! ≡ -1 (mod p) for prime p

Number of divisors of n = p₁^a₁ × p₂^a₂ × ... × pₖ^aₖ:
  Count = (a₁+1)(a₂+1)...(aₖ+1)
  
Sum of divisors:
  σ(n) = [(p₁^(a₁+1)-1)/(p₁-1)] × [(p₂^(a₂+1)-1)/(p₂-1)] × ...

Last non-zero digit concepts
Chinese Remainder Theorem
Modular arithmetic
```

### Solved Examples

**Q1:** Find the number of divisors of 360.

**Solution:**
```
360 = 2³ × 3² × 5¹
Number of divisors = (3+1)(2+1)(1+1) = 4 × 3 × 2 = 24
```

**Q2:** Find the remainder when 7^100 is divided by 5.

**Solution:**
```
By Fermat's Little Theorem: 7^4 ≡ 1 (mod 5) [since φ(5) = 4]
7^100 = (7^4)^25 ≡ 1^25 ≡ 1 (mod 5)
Remainder = 1
```

**Q3:** Find the sum of divisors of 12.

**Solution:**
```
12 = 2² × 3¹
σ(12) = [(2³-1)/(2-1)] × [(3²-1)/(3-1)]
= [7/1] × [8/2] = 7 × 4 = 28
Check: 1+2+3+4+6+12 = 28 ✓
```

---

## 13. Progressions (AP, GP, HP)

### Arithmetic Progression (AP)

```
General term: aₙ = a + (n-1)d
  a = first term, d = common difference

Sum of n terms: Sₙ = n/2 × [2a + (n-1)d] = n/2 × (first + last)

Properties:
  If a, b, c are in AP: 2b = a + c (middle = average of extremes)
  AM = (a + b) / 2
  Common difference: d = aₙ - aₙ₋₁
  
If 3 numbers in AP: a-d, a, a+d
If 4 numbers in AP: a-3d, a-d, a+d, a+3d
If 5 numbers in AP: a-2d, a-d, a, a+d, a+2d
```

### Geometric Progression (GP)

```
General term: aₙ = arⁿ⁻¹
  a = first term, r = common ratio

Sum of n terms:
  Sₙ = a(rⁿ - 1)/(r - 1)   [if r > 1]
  Sₙ = a(1 - rⁿ)/(1 - r)   [if r < 1]

Sum of infinite GP (|r| < 1):
  S∞ = a / (1 - r)

Properties:
  If a, b, c are in GP: b² = ac
  GM = √(ab)
  
If 3 numbers in GP: a/r, a, ar
```

### Harmonic Progression (HP)

```
If a₁, a₂, a₃... are in HP, then 1/a₁, 1/a₂, 1/a₃... are in AP

Harmonic Mean of a and b: HM = 2ab/(a+b)

Relationship: AM × HM = GM²
Also: AM ≥ GM ≥ HM (for positive numbers)
```

### Solved Examples

**Q1:** Find the sum of first 20 terms of AP: 5, 8, 11, 14...

**Solution:**
```
a = 5, d = 3, n = 20
S₂₀ = 20/2 × [2(5) + 19(3)] = 10 × [10 + 57] = 10 × 67 = 670
```

**Q2:** Find the sum of infinite GP: 1, 1/3, 1/9, 1/27...

**Solution:**
```
a = 1, r = 1/3
S∞ = 1/(1-1/3) = 1/(2/3) = 3/2 = 1.5
```

**Q3:** Insert 3 arithmetic means between 3 and 19.

**Solution:**
```
AP: 3, _, _, _, 19
a = 3, a₅ = 19
19 = 3 + 4d → d = 4
Means: 7, 11, 15
AP: 3, 7, 11, 15, 19 ✓
```

**Q4:** If AM of two numbers is 10 and GM is 8, find the numbers.

**Solution:**
```
AM = (a+b)/2 = 10 → a + b = 20
GM = √(ab) = 8 → ab = 64

a and b are roots of: x² - 20x + 64 = 0
(x-4)(x-16) = 0
Numbers: 4 and 16
```

---

## 14. Advanced Data Interpretation

### Types in TCS NQT Advanced

```
1. Multi-graph interpretation (combining bar + line + pie)
2. Caselets (paragraph-based data problems)
3. Missing data interpretation
4. Tables with multiple variables
5. Growth rate and CAGR calculations
```

### Key Formulas for DI

```
Percentage Change = [(New - Old)/Old] × 100
CAGR = (Final/Initial)^(1/n) - 1
Weighted Average = Σ(wᵢ × xᵢ) / Σwᵢ

Profit Margin = (Profit/Revenue) × 100
Market Share = (Company Revenue / Total Market) × 100

Ratio comparison:
  To compare a/b and c/d → compare ad and bc
  If ad > bc, then a/b > c/d
```

### Practice DI Set

**Data: Monthly sales (in lakhs) of Company XYZ**

| Month | Product A | Product B | Product C |
|-------|----------|----------|----------|
| Jan | 20 | 30 | 25 |
| Feb | 25 | 28 | 30 |
| Mar | 30 | 35 | 28 |
| Apr | 22 | 32 | 35 |
| May | 28 | 25 | 32 |
| Jun | 35 | 40 | 30 |

**Q1:** What is the percentage increase in Product A sales from Jan to Jun?
```
= [(35-20)/20] × 100 = 75%
```

**Q2:** In which month was the total sales maximum?
```
Jan: 75, Feb: 83, Mar: 93, Apr: 89, May: 85, Jun: 105
Answer: June (105 lakhs)
```

**Q3:** What is the average monthly sales of Product B?
```
= (30+28+35+32+25+40)/6 = 190/6 ≈ 31.67 lakhs
```

**Q4:** Ratio of total Product C sales to total Product A sales?
```
C total = 25+30+28+35+32+30 = 180
A total = 20+25+30+22+28+35 = 160
Ratio = 180:160 = 9:8
```

---

## 15. Previous Year Questions

### PYQ 1: Quadratic Equations
**Q:** If α and β are roots of x² - 6x + 8 = 0, find α² + β².

**Solution:**
```
α + β = 6, αβ = 8
α² + β² = (α+β)² - 2αβ = 36 - 16 = 20
```

### PYQ 2: Logarithm
**Q:** If log₂(log₃(log₄(x))) = 0, find x.

**Solution:**
```
log₂(log₃(log₄(x))) = 0
→ log₃(log₄(x)) = 2⁰ = 1
→ log₄(x) = 3¹ = 3
→ x = 4³ = 64
```

### PYQ 3: Probability
**Q:** A box contains 10 bulbs, 4 are defective. If 3 are drawn, probability that at least 1 is defective?

**Solution:**
```
P(at least 1 defective) = 1 - P(no defective)
P(no defective) = ⁶C₃/¹⁰C₃ = 20/120 = 1/6
P(at least 1) = 1 - 1/6 = 5/6
```

### PYQ 4: Geometry
**Q:** Two circles of radii 5 and 12 have their centers 13 apart. Find the length of the common tangent.

**Solution:**
```
For direct common tangent:
Length = √[d² - (r₁-r₂)²] = √[169 - 49] = √120 = 2√30

For transverse:
Length = √[d² - (r₁+r₂)²] = √[169 - 289] → not possible (circles overlap)

Wait: 5² + 12² = 25 + 144 = 169 = 13² → circles touch externally!
When touching externally: 
  Direct tangent length = √[d² - (r₁-r₂)²] = √[169 - 49] = √120 = 2√30 ≈ 10.95
  Transverse: they touch, so tangent at that point has length 0
```

### PYQ 5: AP/GP
**Q:** The 5th term of an AP is 23 and the 10th term is 48. Find the first term and common difference.

**Solution:**
```
a + 4d = 23 ... (1)
a + 9d = 48 ... (2)
(2)-(1): 5d = 25 → d = 5
a = 23 - 20 = 3
First term = 3, d = 5
```

### PYQ 6: Number Theory
**Q:** Find the last two digits of 7^2023.

**Solution:**
```
Find 7^2023 mod 100
By Euler: φ(100) = 40
7^40 ≡ 1 (mod 100)
2023 = 40 × 50 + 23
7^2023 ≡ 7^23 (mod 100)

7^1 = 7, 7^2 = 49, 7^4 = 2401 → 01 (mod 100)
7^8 ≡ 01 (mod 100)
7^16 ≡ 01 (mod 100)
7^23 = 7^16 × 7^4 × 7^2 × 7^1 = 01 × 01 × 49 × 7 = 343 → 43 (mod 100)
Last two digits: 43
```

---

## 16. Tips & Tricks

### ⚡ Speed Tricks for Advanced Quant

```
1. For quadratic roots: sum = -b/a, product = c/a (no need to solve)
2. For AP/GP: use middle term = average concept
3. For probability: P(at least 1) = 1 - P(none) is ALWAYS faster
4. For mensuration: memorize formulas cold — no time to derive
5. For coordinate geometry: use distance formula, don't try to graph
6. For logs: convert everything to same base first
7. For inequalities: wavy curve method for polynomial inequalities
```

### 🎯 Exam Strategy

```
Time: ~25 minutes shared with Advanced Reasoning for 14-16 questions
This means: ~1.5-2 minutes per question MAX

Priority (do these first):
1. Direct formula-based (Progressions, Mensuration)
2. Probability (usually 1-2 questions, well-practiced)
3. Coordinate Geometry (straightforward formula application)
4. Number Theory (if you know the tricks)
5. DI (time-consuming but straightforward)
6. Complex Algebra & Functions (skip if time is short)

Key: Don't get stuck. If >2 minutes on one question, MOVE ON.
No negative marking → attempt everything with at least an educated guess.
```

### 📊 Quick Reference: Must-Memorize Values

| Value | Result |
|-------|--------|
| √2 | 1.414 |
| √3 | 1.732 |
| √5 | 2.236 |
| π | 3.14159 |
| log₁₀(2) | 0.3010 |
| log₁₀(3) | 0.4771 |
| e | 2.718 |
| 1 radian | 57.3° |

---

> **← Previous:** [Reasoning Ability](../03_Reasoning_Ability/README.md) | **Next →** [Advanced Reasoning](../05_Advanced_Reasoning/README.md)
