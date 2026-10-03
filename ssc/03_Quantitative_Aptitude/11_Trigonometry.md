# 📐 Trigonometry — Complete Guide for SSC CHSL

## Table of Contents
1. [Basic Ratios](#ratios)
2. [Standard Values](#values)
3. [Identities](#identities)
4. [Height and Distance](#height-distance)
5. [Tips and PYQs](#tips-pyqs)

---

## Basic Trigonometric Ratios

```
In a right triangle with angle θ:

sin θ = Opposite / Hypotenuse = P/H
cos θ = Adjacent / Hypotenuse = B/H
tan θ = Opposite / Adjacent = P/B

cosec θ = 1/sin θ = H/P
sec θ = 1/cos θ = H/B
cot θ = 1/tan θ = B/P

Memory: SOH-CAH-TOA
Sin = Opposite/Hypotenuse
Cos = Adjacent/Hypotenuse
Tan = Opposite/Adjacent

Also: tan θ = sin θ / cos θ
      cot θ = cos θ / sin θ
```

---

## Standard Values Table (MEMORIZE!)

| θ | 0° | 30° | 45° | 60° | 90° |
|---|-----|------|------|------|------|
| sin | 0 | 1/2 | 1/√2 | √3/2 | 1 |
| cos | 1 | √3/2 | 1/√2 | 1/2 | 0 |
| tan | 0 | 1/√3 | 1 | √3 | ∞ |
| cosec | ∞ | 2 | √2 | 2/√3 | 1 |
| sec | 1 | 2/√3 | √2 | 2 | ∞ |
| cot | ∞ | √3 | 1 | 1/√3 | 0 |

### Memory Trick for sin values:
```
sin 0° = √0/2 = 0
sin 30° = √1/2 = 1/2
sin 45° = √2/2 = 1/√2
sin 60° = √3/2
sin 90° = √4/2 = 1

cos goes in REVERSE order:
cos 0° = 1, cos 30° = √3/2, cos 45° = 1/√2, cos 60° = 1/2, cos 90° = 0
```

---

## Trigonometric Identities

### Fundamental Identities
```
1. sin²θ + cos²θ = 1
   → sin²θ = 1 - cos²θ
   → cos²θ = 1 - sin²θ

2. 1 + tan²θ = sec²θ
   → tan²θ = sec²θ - 1
   → sec²θ - tan²θ = 1

3. 1 + cot²θ = cosec²θ
   → cot²θ = cosec²θ - 1
   → cosec²θ - cot²θ = 1
```

### Complementary Angle Identities
```
sin(90°-θ) = cosθ        cos(90°-θ) = sinθ
tan(90°-θ) = cotθ        cot(90°-θ) = tanθ
sec(90°-θ) = cosecθ      cosec(90°-θ) = secθ
```

### Sum/Difference Formulas
```
sin(A+B) = sinAcosB + cosAsinB
sin(A-B) = sinAcosB - cosAsinB
cos(A+B) = cosAcosB - sinAsinB
cos(A-B) = cosAcosB + sinAsinB
tan(A+B) = (tanA+tanB)/(1-tanAtanB)
tan(A-B) = (tanA-tanB)/(1+tanAtanB)
```

### Double Angle Formulas
```
sin2θ = 2sinθcosθ
cos2θ = cos²θ - sin²θ = 2cos²θ - 1 = 1 - 2sin²θ
tan2θ = 2tanθ/(1-tan²θ)
```

### Product-to-Sum Formulas
```
2sinAcosB = sin(A+B) + sin(A-B)
2cosAsinB = sin(A+B) - sin(A-B)
2cosAcosB = cos(A+B) + cos(A-B)
2sinAsinB = cos(A-B) - cos(A+B)
```

### Important Results
```
sin²θ + cos²θ = 1
sec²θ - tan²θ = 1
cosec²θ - cot²θ = 1

(secθ + tanθ)(secθ - tanθ) = 1
(cosecθ + cotθ)(cosecθ - cotθ) = 1

If secθ + tanθ = k, then secθ - tanθ = 1/k
secθ = (k + 1/k)/2, tanθ = (k - 1/k)/2

sinθ × cosecθ = 1
cosθ × secθ = 1
tanθ × cotθ = 1
```

---

## Maximum and Minimum Values

```
-1 ≤ sinθ ≤ 1     (max = 1, min = -1)
-1 ≤ cosθ ≤ 1     (max = 1, min = -1)
-∞ ≤ tanθ ≤ ∞     (no bound)
secθ ≤ -1 or ≥ 1  (never between -1 and 1)
cosecθ ≤ -1 or ≥ 1

Max of (asinθ + bcosθ) = √(a²+b²)
Min of (asinθ + bcosθ) = -√(a²+b²)

Max of sin²θ + cos⁴θ = 1 (at θ=0°)
Min of sin²θ + cos²θ = 1 (always!)
```

---

## Height and Distance

### Basic Concept
```
Angle of Elevation: Looking UP from horizontal → angle above horizontal
Angle of Depression: Looking DOWN from horizontal → angle below horizontal

Key: Angle of depression from A to B = Angle of elevation from B to A
```

### Standard Problems

#### Type 1: Finding Height
```
Object of height h, observer at distance d:
tan(angle) = h/d → h = d × tan(angle)

Example: Angle of elevation of a tower = 60°, distance from base = 20m
tan60° = h/20 → √3 = h/20 → h = 20√3 m
```

#### Type 2: Two Angles from Same Point
```
Two objects or same object at different angles:
Use both equations to solve.

Example: From a point, angle of elevation of top = 60°, bottom = 30°.
Distance = 100m.
Height of building above = 100tan60° - 100tan30° = 100(√3 - 1/√3)
= 100 × (3-1)/√3 = 200/√3 = 200√3/3 m
```

#### Type 3: Moving Towards/Away
```
Observer moves from point A to point B towards a tower.
At A: angle = α, At B: angle = β
Distance AB = d

Height h = d × (tanα × tanβ)/(tanβ - tanα)
```

### Common Height-Distance Results
```
If angle = 30°: Height = Distance/√3 = d√3/3
If angle = 45°: Height = Distance (h = d)
If angle = 60°: Height = Distance × √3 (h = d√3)

Shadow problems:
Shadow length = Height / tan(angle of sun)
At 45° sun: Shadow = Height (equal)
At 60° sun: Shadow = Height/√3
At 30° sun: Shadow = Height × √3
```

---

## Tips and Tricks

### ⚡ Quick Shortcuts
```
1. Memorize the value table — it's used in EVERY question
2. sin²+cos²=1 is used in 70% of identity problems
3. Complementary angles: sin(90-θ)=cosθ is very common
4. For height problems: Draw diagram FIRST, identify the right triangle
5. tan = P/B → Height = Base × tan(angle)

Quick check formulas:
sin30°=cos60°=1/2
sin45°=cos45°=1/√2
sin60°=cos30°=√3/2
tan45°=1
```

---

## Last 10 Years PYQs

### PYQ 1 — SSC CHSL 2024
**Q.** sin²30° + cos²60° = ?
- (1/2)² + (1/2)² = 1/4 + 1/4 = 1/2
- Answer: **1/2** ✅

### PYQ 2 — SSC CHSL 2023
**Q.** If sinθ = 3/5, find cosθ?
- cos²θ = 1 - 9/25 = 16/25 → cosθ = 4/5
- Answer: **4/5** ✅

### PYQ 3 — SSC CHSL 2022
**Q.** tan45° + sin30° - cos60° = ?
- 1 + 1/2 - 1/2 = 1
- Answer: **1** ✅

### PYQ 4 — SSC CHSL 2021
**Q.** Height of tower if angle 60° at 20m distance?
- h = 20tan60° = 20√3
- Answer: **20√3 m** ✅

### PYQ 5 — SSC CHSL 2020
**Q.** sec²45° - tan²45° = ?
- 2 - 1 = 1 (identity: sec²θ - tan²θ = 1)
- Answer: **1** ✅

---

> **Final Tip:** MEMORIZE the standard values table and the 3 Pythagorean identities. These alone solve 80% of trigonometry questions! For Height & Distance, ALWAYS draw the diagram first! 📐
