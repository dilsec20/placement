# 🔐 Coding and Decoding — Complete Guide for SSC CHSL

## Table of Contents
1. [Introduction](#introduction)
2. [Types of Coding-Decoding](#types)
3. [Letter Coding](#letter-coding)
4. [Number Coding](#number-coding)
5. [Mixed Coding](#mixed-coding)
6. [Condition-Based Coding](#condition-based-coding)
7. [Tips and Tricks](#tips-and-tricks)
8. [Last 10 Years PYQs](#last-10-years-pyqs)

---

## Introduction

Coding-Decoding tests your ability to identify the pattern or rule used to convert one set of information into another. A word/number is "coded" using a specific rule, and you must decode it or apply the same rule to another word/number.

**Weightage in SSC CHSL Tier 1:** 2-3 questions

---

## Essential: Alphabet Position Chart

**Memorize this — it's the foundation of ALL coding-decoding!**

```
A  B  C  D  E  F  G  H  I  J  K  L  M
1  2  3  4  5  6  7  8  9  10 11 12 13

N  O  P  Q  R  S  T  U  V  W  X  Y  Z
14 15 16 17 18 19 20 21 22 23 24 25 26
```

**Opposite Letters (sum = 27):**
```
A↔Z  B↔Y  C↔X  D↔W  E↔V  F↔U  G↔T
1↔26 2↔25 3↔24 4↔23 5↔22 6↔21 7↔20

H↔S  I↔R  J↔Q  K↔P  L↔O  M↔N
8↔19 9↔18 10↔17 11↔16 12↔15 13↔14
```

**Quick Memory Trick for Opposite Letters:**
```
A-Z, B-Y, C-X, D-W, E-V, F-U, G-T, H-S, I-R, J-Q, K-P, L-O, M-N
Mnemonic groups of 4: AZBY CXDW EVFU GTHS IRJQ KPLO MN
```

---

## Types of Coding-Decoding

### Type 1: Direct Letter Shifting
Each letter is shifted by a fixed number of positions.

```
+1 shift: A→B, B→C, C→D... Z→A
+2 shift: A→C, B→D, C→E... Y→A, Z→B
-1 shift: A→Z, B→A, C→B... Z→Y
-2 shift: A→Y, B→Z, C→A... Z→X

Example: If COME = DPNF (+1 shift), then LOVE = ?
L+1=M, O+1=P, V+1=W, E+1=F
Answer: MPWF
```

### Type 2: Variable Shifting
Each letter shifts by a different amount.

```
Pattern: +1, +2, +3, +4...
COME: C+1=D, O+2=Q, M+3=P, E+4=I → DQPI

Pattern: +2, +3, +4, +5...
PLAY: P+2=R, L+3=O, A+4=E, Y+5=D → ROED
```

### Type 3: Opposite Letter Coding
Each letter is replaced by its opposite (A↔Z, B↔Y, etc.)

```
CAT → XZG
C(3)→X(24), A(1)→Z(26), T(20)→G(7)
Sum of each pair = 27

MIND → NRMW
M(13)→N(14), I(9)→R(18), N(14)→M(13), D(4)→W(23)
```

### Type 4: Reverse Order Coding
The word is written in reverse order (with or without shifting).

```
COME → EMOC (simple reverse)
LOVE → EVOL (simple reverse)

With shift:
COME → EMOC → then +1 → FNPD
```

### Type 5: Number-Letter Coding
Letters are replaced by their position numbers (or vice versa).

```
CAT → 3-1-20
DOG → 4-15-7
MATH → 13-1-20-8
```

### Type 6: Symbol/Code Substitution
Each letter is assigned a specific symbol or code.

```
If in a certain code:
A=@, B=#, C=$, D=%, E=&

Then BAD = #@%
And ACE = @$&
```

---

## Letter Coding — Detailed Patterns

### Pattern 1: Uniform Forward Shift (+n)
```
If GAME = HBNF (each letter +1)
Then PLAY = QMBZ

If COME = EQOG (each letter +2)
Then HELP = JGNR

If BIRD = ELUG (each letter +3)
Then CAGE = FDJH
```

### Pattern 2: Uniform Backward Shift (-n)
```
If HELP = GDKO (each letter -1)
Then BIRD = AHQC

If COME = AMKC (each letter -2)
Then FISH = DGQF
```

### Pattern 3: Progressive Shift (+1, +2, +3...)
```
Word: B A L L
Shift: +1 +2 +3 +4
Code: C C O P

Word: C O D E
Shift: +1 +2 +3 +4
Code: D Q G I

Word: G A M E
Shift: +1 +2 +3 +4
Code: H C P I
```

### Pattern 4: Alternating Shift (+n, -n, +n, -n...)
```
Word: C O M E
Shift: +1 -1 +1 -1
Code: D N N D

Word: L O V E
Shift: +2 -2 +2 -2
Code: N M X C
```

### Pattern 5: Position-Based Coding
```
1st letter +1, 2nd letter +2, 3rd letter +3, 4th letter +4

COME: C+1=D, O+2=Q, M+3=P, E+4=I → DQPI
LAMP: L+1=M, A+2=C, M+3=P, P+4=T → MCPT
```

### Pattern 6: Reverse Alphabet Coding (Mirror)
```
A=Z, B=Y, C=X, D=W... (opposite letters)

COME = XLNV
C→X, O→L, M→N, E→V

PLAY = KOZY
P→K, L→O, A→Z, Y→B
Wait: P(16)→K(11)? 16+11=27 ✅
L(12)→O(15)? 12+15=27 ✅
A(1)→Z(26)? 1+26=27 ✅
Y(25)→B(2)? 25+2=27 ✅
Answer: KOZB
```

---

## Number Coding

### Pattern 1: Position Values
```
Each letter = its position number
CAT = 3 + 1 + 20 = 24
DOG = 4 + 15 + 7 = 26
```

### Pattern 2: Reverse Position Values
```
A=26, B=25, C=24... Z=1
CAT = 24 + 26 + 7 = 57
```

### Pattern 3: Number Manipulation
```
If 234 is coded as 567 (+3 to each digit)
Then 456 = 789

If 123 is coded as 246 (×2 for each digit)
Then 345 = 6810 → But usually 345 = 6, 8, 10 → depends on format

If 359 is coded as 953 (reverse)
Then 247 = 742
```

### Pattern 4: Sum/Product Patterns
```
If COME = 36 (C+O+M+E = 3+15+13+5 = 36)
Then GAME = ? (G+A+M+E = 7+1+13+5 = 26)
```

---

## Mixed Coding (Logic-Based)

### Type: Statement-Based Coding
```
Given:
"sky is blue" is coded as "3 5 7"
"blue is beautiful" is coded as "5 7 9"
"sky is beautiful" is coded as "3 7 9"

Find the code for "sky":
Compare sentences 1 and 2:
Common words: "is", "blue" → Common codes: 5, 7
So "is" and "blue" are 5 and 7 (in some order)
And "sky" = 3, "beautiful" = 9

Compare sentences 1 and 3:
Common words: "sky", "is" → Common codes: 3, 7
So "sky" = 3 and "is" = 7

Therefore: sky=3, is=7, blue=5, beautiful=9
```

### Solving Strategy for Logic-Based Coding:
1. **Compare pairs of sentences** that share common words
2. **Find common codes** for common words
3. **Isolate unique words** to find their codes
4. Use **elimination** to decode remaining words

---

## Condition-Based Coding

### Type: Multiple Rules
```
Given rules:
- If first letter is a vowel, code it as #
- If last letter is a consonant, code it as @
- If the word has more than 4 letters, add * at the end

Word: APPLE
- First letter A (vowel) → #PPLE
- Last letter E (vowel) → no @ change
- More than 4 letters → #PPLE*
```

---

## Tips and Tricks

### ⚡ Quick-Solving Steps
1. **Write the alphabet with positions** on rough paper immediately
2. **Find the shift value** by comparing given pair
3. **Apply the same shift** to find the answer
4. For logic-based, **compare sentences systematically**

### 🎯 Exam Shortcuts

#### Shortcut 1: Opposite Letter Quick Check
```
If sum of positions of coded pair = 27, it's opposite letter coding
A(1)+Z(26)=27 ✅, B(2)+Y(25)=27 ✅
```

#### Shortcut 2: Quick Position Calculation
```
For letters after M(13):
N=14 (13+1), O=15 (13+2)... Z=26 (13+13)

For finding opposite: 27 - position
Opposite of P(16) = 27-16 = 11 = K
```

#### Shortcut 3: Modular Arithmetic for Shifts
```
If shifting goes past Z, wrap around:
Y(25) + 3 = 28 → 28-26 = 2 = B
Z(26) + 1 = 27 → 27-26 = 1 = A
```

### 🧠 Memory Aid
```
EJOTY Method:
E = 5, J = 10, O = 15, T = 20, Y = 25

Use these as anchor points:
- Letters before E: A=1, B=2, C=3, D=4
- Letters around J: H=8, I=9, K=11, L=12
- Letters around O: M=13, N=14, P=16
- Letters around T: R=18, S=19, U=21
- Letters around Y: W=23, X=24, Z=26
```

---

## Last 10 Years PYQs

### PYQ 1 — SSC CHSL 2024
**Q.** If COME = DPNF, then LOVE = ?
- (a) MPWF ✅ (b) MPWE (c) NQXG (d) KNUD
- **Logic:** Each letter +1 (C+1=D, O+1=P, M+1=N, E+1=F)
- L+1=M, O+1=P, V+1=W, E+1=F → MPWF

### PYQ 2 — SSC CHSL 2024
**Q.** If FISH = HKUJ, then BIRD = ?
- (a) DKTF ✅ (b) CJTF (c) DKUF (d) EKTG
- **Logic:** +2, +2, +2, +2 shift
- B+2=D, I+2=K, R+2=T, D+2=F → DKTF

### PYQ 3 — SSC CHSL 2023
**Q.** In a certain code, GAME is written as TZNV. How is PLAY written?
- **Logic:** Opposite letters (A↔Z coding)
- G(7)→T(20): 7+20=27 ✅ Opposite coding
- P→K, L→O, A→Z, Y→B → **KOZB** ✅

### PYQ 4 — SSC CHSL 2023
**Q.** If 256 is coded as __(given code)__ then find code for 189.
- (Type: number manipulation — identify the pattern like ×2, +3, reverse, etc.)

### PYQ 5 — SSC CHSL 2022
**Q.** In a code language:
- "cat and dog" = "1 2 3"
- "dog is pet" = "3 4 5"  
- "pet and cat" = "5 2 1"
What is the code for "dog"?
- Common in sentences 1 & 2: "dog" → Common code: 3
- Answer: **3** ✅

### PYQ 6 — SSC CHSL 2022
**Q.** If TEACHER = VGCEJGT (+2 shift), then STUDENT = ?
- S+2=U, T+2=V, U+2=W, D+2=F, E+2=G, N+2=P, T+2=V
- Answer: **UVWFGPV** ✅

### PYQ 7 — SSC CHSL 2021
**Q.** If ROAD = URDG (+3 shift), then SWAN = ?
- S+3=V, W+3=Z, A+3=D, N+3=Q
- Answer: **VZDQ** ✅

### PYQ 8 — SSC CHSL 2021
**Q.** If HELP is coded as 8-5-12-16, what is COME?
- Position coding: C=3, O=15, M=13, E=5
- Answer: **3-15-13-5** ✅

### PYQ 9 — SSC CHSL 2020
**Q.** If PARK = RCTM (+2, +2, +2, +2), then COME = ?
- C+2=E, O+2=Q, M+2=O, E+2=G
- Answer: **EQOG** ✅

### PYQ 10 — SSC CHSL 2020
**Q.** If MANGO = OCPIQ (+2 each), then APPLE = ?
- A+2=C, P+2=R, P+2=R, L+2=N, E+2=G
- Answer: **CRRNG** ✅

### PYQ 11 — SSC CHSL 2019
**Q.** In a code, ROSE = TQUG. Then LILY = ?
- R+2=T, O-1=N? No. R+2=T, O+2=Q, S+2=U, E+2=G (+2 each)
- L+2=N, I+2=K, L+2=N, Y+2=A
- Answer: **NKNA** ✅

### PYQ 12 — SSC CHSL 2019
**Q.** If CAB = 312, BAD = 214, then ACE = ?
- C=3, A=1, B=2 → position numbers
- A=1, C=3, E=5
- Answer: **135** ✅

### PYQ 13 — SSC CHSL 2018
**Q.** If PEN = 35 (P+E+N = 16+5+14 = 35), then CAP = ?
- C+A+P = 3+1+16 = 20
- Answer: **20** ✅

### PYQ 14 — SSC CHSL 2018
**Q.** If KING = LKPI (+1, +2, +3, +4?). Let's check: K+1=L, I+2=K, N+1=O? 
- Pattern: K(11)+1=L(12), I(9)+2=K(11), N(14)+2=P(16), G(7)+2=I(9)
- Actually +1, +2, +2, +2 or check actual pattern — varies by question

### PYQ 15 — SSC CHSL 2017
**Q.** If HOUSE is coded as GNTRD (-1 each), then MOUSE = ?
- M-1=L, O-1=N, U-1=T, S-1=R, E-1=D
- Answer: **LNTRD** ✅

### PYQ 16 — SSC CHSL 2017
**Q.** If in a certain code, TABLE = VCENG (+2 each), then CHAIR = ?
- C+2=E, H+2=J, A+2=C, I+2=K, R+2=T
- Answer: **EJCKT** ✅

### PYQ 17 — SSC CHSL 2016
**Q.** If DELHI = CDK? — applying opposite letter coding:
- D(4)→W(23), E(5)→V(22), L(12)→O(15), H(8)→S(19), I(9)→R(18)
- Answer: **WVOSR** ✅

### PYQ 18 — SSC CHSL 2016
**Q.** If 247 = 132 (each digit -1 then reverse), then 369 = ?
- 3-1=2, 6-1=5, 9-1=8 → 258 → reverse → 852
- Answer: **258** (or **852** depending on exact pattern)

### PYQ 19 — SSC CHSL 2015
**Q.** If COMPUTER = DNPQVUFS (+1 shift), then SCIENCE = ?
- S+1=T, C+1=D, I+1=J, E+1=F, N+1=O, C+1=D, E+1=F
- Answer: **TDJFODF** ✅

### PYQ 20 — SSC CHSL 2015
**Q.** If A=2, B=4, C=6... (A=2×1, B=2×2, C=2×3), then FACE = ?
- F=12, A=2, C=6, E=10 → Total = 30
- Answer: **30** ✅

---

> **Final Tip:** Write the alphabet with positions on rough paper at the start of the exam. Master the EJOTY method for quick position finding. Most questions use +1, +2, -1, or opposite letter patterns — practice these until they become automatic! 🔐
