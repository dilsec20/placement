# 📐 Geometry — Complete Guide for SSC CHSL

## Table of Contents
1. [Lines and Angles](#lines-angles)
2. [Triangles](#triangles)
3. [Circles](#circles)
4. [Quadrilaterals](#quadrilaterals)
5. [Coordinate Geometry](#coordinate)
6. [Tips and PYQs](#tips-pyqs)

---

## Lines and Angles

### Types of Angles
| Type | Range | Example |
|------|-------|---------|
| Acute | 0° < θ < 90° | 45° |
| Right | θ = 90° | 90° |
| Obtuse | 90° < θ < 180° | 120° |
| Straight | θ = 180° | 180° |
| Reflex | 180° < θ < 360° | 270° |
| Complete | θ = 360° | 360° |

### Angle Relationships
```
Complementary: A + B = 90°
Supplementary: A + B = 180°
Vertically opposite angles are EQUAL
Linear pair: Adjacent angles on a straight line = 180°
```

### Parallel Lines + Transversal
```
When a transversal cuts two parallel lines:
- Corresponding angles are EQUAL
- Alternate interior angles are EQUAL
- Alternate exterior angles are EQUAL
- Co-interior (same-side) angles are SUPPLEMENTARY (sum = 180°)
```

---

## Triangles

### Basic Properties
```
Sum of angles = 180°
Exterior angle = Sum of two non-adjacent interior angles
Sum of any two sides > Third side
Difference of any two sides < Third side
```

### Types of Triangles
| Type | Property |
|------|----------|
| Equilateral | All sides equal, all angles 60° |
| Isosceles | Two sides equal, two angles equal |
| Scalene | All sides different |
| Right | One angle = 90° |
| Acute | All angles < 90° |
| Obtuse | One angle > 90° |

### Triangle Formulas
```
Area = ½ × base × height
Area = ½ × a × b × sinC
Area (Heron's) = √[s(s-a)(s-b)(s-c)] where s = (a+b+c)/2

Equilateral triangle (side a):
Area = (√3/4)a²
Height = (√3/2)a
Inradius = a/(2√3) = a√3/6
Circumradius = a/√3 = a√3/3

Right triangle:
Hypotenuse² = Base² + Height² (Pythagoras)
Area = ½ × base × height
Inradius = (a+b-c)/2 where c = hypotenuse
Circumradius = c/2 (hypotenuse/2)
```

### Pythagorean Triplets (MEMORIZE!)
```
3, 4, 5    →  9+16=25
5, 12, 13  →  25+144=169
6, 8, 10   →  36+64=100
7, 24, 25  →  49+576=625
8, 15, 17  →  64+225=289
9, 12, 15  →  81+144=225
9, 40, 41  →  81+1600=1681
11, 60, 61
12, 35, 37
13, 84, 85
20, 21, 29

Any multiple of a triplet is also a triplet:
(3,4,5) → (6,8,10), (9,12,15), (12,16,20)...
```

### Important Theorems

#### Angle Bisector Theorem
```
If AD bisects angle A in triangle ABC:
BD/DC = AB/AC
```

#### Mid-Point Theorem
```
Line joining midpoints of two sides is parallel to the third side
and half its length.
If D, E are midpoints of AB, AC:
DE ∥ BC and DE = BC/2
```

#### Basic Proportionality Theorem (BPT / Thales)
```
If a line is drawn parallel to one side of a triangle,
it divides the other two sides proportionally.
If DE ∥ BC:
AD/DB = AE/EC
```

### Centers of a Triangle
| Center | Property | Formula |
|--------|----------|---------|
| Centroid (G) | Intersection of medians | Divides median in 2:1 |
| Incenter (I) | Intersection of angle bisectors | Equidistant from all sides |
| Circumcenter (O) | Intersection of perpendicular bisectors | Equidistant from all vertices |
| Orthocenter (H) | Intersection of altitudes | — |

```
Centroid coordinates: G = ((x₁+x₂+x₃)/3, (y₁+y₂+y₃)/3)
Inradius: r = Area/s (where s = semi-perimeter)
Circumradius: R = abc/(4×Area)
```

---

## Circles

### Basic Formulas
```
Circumference = 2πr = πd
Area = πr²
Diameter = 2r

π ≈ 22/7 ≈ 3.14159
```

### Arc and Sector
```
Arc length = (θ/360) × 2πr = πrθ/180 (θ in degrees)
Sector area = (θ/360) × πr² = πr²θ/360
Segment area = Sector area - Triangle area
```

### Chord Properties
```
Perpendicular from center to chord bisects the chord
Equal chords are equidistant from center
If distance from center = d, radius = r, half-chord = √(r²-d²)

Chord length = 2√(r²-d²) where d = perpendicular distance from center
```

### Tangent Properties
```
Tangent is perpendicular to radius at point of contact
Two tangents from external point are equal
Angle between tangent and chord = Angle in alternate segment

Tangent length from external point P at distance d from center:
Length = √(d²-r²)
```

### Important Circle Theorems
```
1. Angle in a semicircle = 90°
2. Central angle = 2 × Inscribed angle (same arc)
3. Angles in same segment are equal
4. Opposite angles of cyclic quadrilateral = 180°
5. Tangent ⊥ Radius at point of contact
6. Two tangents from same external point are equal
```

---

## Quadrilaterals

### Properties and Formulas

| Shape | Area | Perimeter | Properties |
|-------|------|-----------|------------|
| Square (a) | a² | 4a | All sides equal, all angles 90° |
| Rectangle (l,b) | l×b | 2(l+b) | Opposite sides equal, 90° angles |
| Parallelogram | b×h | 2(a+b) | Opposite sides parallel & equal |
| Rhombus (d₁,d₂) | ½×d₁×d₂ | 4a | All sides equal, diagonals bisect at 90° |
| Trapezium | ½×(a+b)×h | Sum of sides | One pair of parallel sides |
| Kite | ½×d₁×d₂ | 2(a+b) | Two pairs of adjacent equal sides |

### Diagonal Formulas
```
Square: d = a√2
Rectangle: d = √(l²+b²)
Rhombus: side = ½√(d₁²+d₂²)
Parallelogram: d₁²+d₂² = 2(a²+b²)
```

---

## Coordinate Geometry

### Key Formulas
```
Distance = √[(x₂-x₁)² + (y₂-y₁)²]
Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2)
Section formula (m:n internally) = ((mx₂+nx₁)/(m+n), (my₂+ny₁)/(m+n))
Slope = (y₂-y₁)/(x₂-x₁) = tanθ
Area of triangle = ½|x₁(y₂-y₃) + x₂(y₃-y₁) + x₃(y₁-y₂)|

Equation of line:
y = mx + c (slope-intercept form)
y - y₁ = m(x - x₁) (point-slope form)

Parallel lines: m₁ = m₂ (same slope)
Perpendicular lines: m₁ × m₂ = -1
```

---

## Last 10 Years PYQs

### PYQ 1 — SSC CHSL 2024
**Q.** In a triangle, angles are in ratio 2:3:4. Find the largest angle.
- 2x+3x+4x=180 → 9x=180 → x=20; Largest=4×20=80°
- Answer: **80°** ✅

### PYQ 2 — SSC CHSL 2023
**Q.** Area of equilateral triangle with side 6 cm?
- (√3/4)×36 = 9√3 cm²
- Answer: **9√3 cm²** ✅

### PYQ 3 — SSC CHSL 2022
**Q.** Circumference of circle with radius 7 cm?
- 2×22/7×7 = 44 cm
- Answer: **44 cm** ✅

### PYQ 4 — SSC CHSL 2021
**Q.** Diagonal of rectangle 6×8?
- √(36+64) = √100 = 10
- Answer: **10 cm** ✅

### PYQ 5 — SSC CHSL 2020
**Q.** Distance between (3,4) and (0,0)?
- √(9+16) = √25 = 5
- Answer: **5 units** ✅

---

> **Final Tip:** Memorize Pythagorean triplets, circle theorems, and area formulas. For triangles, Heron's formula handles any triangle. For circles, remember central angle = 2× inscribed angle! 📐
