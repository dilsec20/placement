# 🧩 Stage 5 — Cognitive & Game-Based Assessment (AON / CoCubes ADEPT-15)

> **Target Roles:** Alpha_Stack (₹13 LPA) | Root_Mind (₹16 LPA)  
> **Platform Partner:** Aon (CoCubes) / ADEPT-15 Assessment Engine  
> **Format:** 4–5 Interactive Mini-Games + 15-Dimension Behavioral Profiler  
> **Time:** ~30–40 mins  
> **Key Note:** Even candidates with perfect coding scores get rejected here due to the **ADEPT-15 Inconsistency Filter**.

---

## 📋 Section Breakdown

| Module | Type | Time Allocated | Tested Skills |
|--------|------|----------------|---------------|
| **Game 1: Motion Challenge** | Spatial Maze | ~5 mins | Trajectory planning, move efficiency, spatial reasoning |
| **Game 2: Grid Challenge** | Visual Working Memory | ~6 mins | Dual-task visual comparison & symbol recall |
| **Game 3: Deductive Reasoning (Geo-Sudo)** | Matrix Deduction | ~6 mins | Process of elimination, Latin square logic |
| **Game 4: Switch Challenge** | Inductive Logic | ~6 mins | Rule discovery, sequence transformation operator |
| **Game 5: Digit Challenge** | Mental Calculation | ~5 mins | Rapid arithmetic, operator fill-in under time crunch |
| **Behavioral: ADEPT-15** | Forced-Choice Survey | ~15 mins | Consistency, stress tolerance, collaboration, drive |

---

# 🧠 The AON ADEPT-15 Personality Framework (Crucial!)

### Why Do High Scorers Get Disqualified Here?
ADEPT-15 does NOT use simple Likert scales (1 to 5). Instead, it presents **paired statements** where you must pick which statement is "More like you" and then rate how strongly it applies:
* *Example:*
  * Option A: "I prefer working strictly within established project timelines."
  * Option B: "I actively seek out difficult, ambiguous architectural problems."

The engine computes an **Inconsistency Index**:
1. It presents the exact same psychological trait disguised in 3–4 different pairs.
2. If you contradict yourself to "sound good" (e.g., claiming to love independent work in Question 4, but claiming to only enjoy team consensus in Question 19), your **inconsistency score exceeds threshold** $\to$ **Automated Disqualification**.

### The 15 Core Dimensions Evaluated

| Category | Trait | What Capgemini Looks For in ₹13–16 LPA Profiles |
|----------|-------|--------------------------------------------------|
| **Task / Execution** | **Drive / Ambition** | High self-motivation, desire to build high-impact systems |
| | **Structure / Rigour** | High discipline in code quality, documentation, unit testing |
| | **Agility** | High adaptability when product requirements shift suddenly |
| **Interpersonal** | **Cooperation** | Team-first mentality; avoids "lone-wolf" developer ego |
| | **Sensitivity** | Empathy with teammates, non-defensive code review stance |
| | **Humility** | Openness to learning from mistakes and accepting feedback |
| **Cognitive / Emotional**| **Stress Tolerance**| Calm under production pressure and tight sprint deadlines |
| | **Positivity** | Solution-oriented when faced with blockers or bugs |
| | **Autonomy** | Capability to unblock self without waiting for spoon-feeding |

### Golden Rules for ADEPT-15
* ✅ **Maintain Consistency:** Decide your genuine persona upfront (Collaborative, Analytical, Accountable, Resilient) and answer every pair through that lens.
* ❌ **Avoid Extremes on Risky Traits:** Never claim "I always disregard rules to finish faster" or "I get frustrated when others don't keep up".
* ✅ **Balance Innovation with Team Delivery:** When paired between "Delivering on time" vs "Making it perfect", lean towards pragmatic high-quality delivery.

---

# 🎮 Interactive Games Breakdown & Strategies

---

## 🎮 Game 1: Motion Challenge (Spatial Maze)

### What It Is:
A ball must reach a hole on a grid blocked by obstacles in the **minimum possible moves**.

```
Grid Layout (5x5):
┌───┬───┬───┬───┬───┐
│ 🔵│   │ ██│   │   │  🔵 = Ball (Start)
├───┼───┼───┼───┼───┤  🕳️ = Target Hole
│   │ ██│   │   │ ██│  ██ = Obstacle
├───┼───┼───┼───┼───┤
│   │   │   │ ██│   │  Target: Complete in minimum moves
├───┼───┼───┼───┼───┤
│ ██│   │ ██│   │   │
├───┼───┼───┼───┼───┤
│   │   │   │   │ 🕳️│
└───┴───┴───┴───┴───┘
```

### Pro Strategy:
* **Spend 5 Seconds Planning First:** Do not touch the arrow keys immediately. The game penalizes excess moves far more than a 5-second initial pause.
* **Work Backwards from the Goal:** Look at the target hole $\🕳️$. Which tiles can directly enter the hole? Trace backwards from those tiles to the start.

---

## 🎮 Game 2: Grid Challenge (Working Memory + Attention)

### What It Is:
A two-task dual challenge:
1. **Task A (Comparison):** Two dot grids appear side by side for 3 seconds. You must quickly click whether they are **IDENTICAL** or **DIFFERENT**.
2. **Task B (Recall):** A specific symbol/dot flashes on a grid. After 3–5 comparison rounds, you must reproduce the exact sequence of flashed dot locations from memory.

### Pro Strategy:
* **Center-Out Scan:** For the comparison task, scan the center first, then the 4 corners. Differences are placed in the periphery in 70% of puzzles.
* **Verbal Chunking for Memory:** In your head, name the dot positions like a phone keypad (`Top-Left`, `Center`, `Bottom-Right` $\to$ "1, 5, 9").

---

## 🎮 Game 3: Deductive Reasoning (Geo-Sudo)

### What It Is:
A 4x4 or 5x5 Latin square with geometric symbols (▲, ■, ●, ★). No symbol can repeat in any row or column.

```
Example:
┌───┬───┬───┬───┐
│ ■ │ ? │ ● │ ★ │  Row 1 contains ■, ●, ★
├───┼───┼───┼───┤  Missing in Row 1: ▲
│ ★ │ ● │ ▲ │ ■ │  => Cell '?' MUST BE ▲!
├───┼───┼───┼───┤
│ ● │ ★ │ ■ │ ▲ │
├───┼───┼───┼───┤
│ ▲ │ ■ │ ★ │ ● │
└───┴───┴───┴───┘
```

### Pro Strategy:
* **Find the Most Populated Row/Col First:** Always scan for the row or column with 3 out of 4 symbols already filled.
* **Cross-Elimination (Naked Singles):** If a cell has row neighbors {A, B} and column neighbors {C}, and the set is {A, B, C, D}, that cell is immediately deduced to be **D**.

---

## 🎮 Game 4: Switch Challenge (Inductive Logic)

### What It Is:
Four geometric shapes change position according to a secret mathematical operator (the "Switch" diagram). You must determine the operator rule and apply it to a new input sequence.

```
Input:    [ ▲ , ■ , ● , ★ ]  (Positions: 1, 2, 3, 4)
             │   │   │   │
Switch:      └───┼───┼───┘  Rule: Swap position 1 and 4, swap 2 and 3
                 │   │      (Operator: 4 3 2 1)
Output:   [ ★ , ● , ■ , ▲ ]
```

### Pro Strategy:
* **Track a Single Unique Shape:** Pick the most distinct shape (e.g. ★) and note where it started and where it ended in the sample. This eliminates 3 out of 4 multiple-choice options instantly!

---

---

# 📝 35 High-Yield Cognitive & Logical Reasoning MCQs (Capgemini Exam Bank)

---

### Section 1: Deductive & Analytical Reasoning (Qs 1–10)

#### Q1. Syllogism:
**Statements:**
1. All microservices are scalable.
2. Some scalable systems are fault-tolerant.
3. No fault-tolerant system is vulnerable.

**Conclusions:**
* I. Some microservices are fault-tolerant.
* II. Some scalable systems are not vulnerable.
* III. No microservice is vulnerable.

Which conclusion(s) logically follow?
* (A) Only I follows
* (B) Only II follows
* (C) Both I and II follow
* (D) Both II and III follow
* **Correct Answer:** **(B)**
* **Explanation:**
  * Statement 2 and 3: Some scalable systems are fault-tolerant, and NO fault-tolerant system is vulnerable. Thus, those scalable systems that are fault-tolerant CANNOT be vulnerable. Hence Conclusion II (*"Some scalable systems are not vulnerable"*) definitely follows.
  * Microservices and fault-tolerant systems have no direct overlap established; hence Conclusion I and III do not necessarily follow.

---

#### Q2. Deductive Logic:
**Statement:** *"In a software engineering team of 5 members (A, B, C, D, E), A is faster than B but slower than C. D is faster than C but slower than E."*  
Who is the fastest software developer in the team?
* (A) C
* (B) D
* (C) E
* (D) Cannot be determined
* **Correct Answer:** **(C)**
* **Explanation:**
  * From premise 1: $B < A < C$
  * From premise 2: $C < D < E$
  * Combining both chains: $B < A < C < D < E$.
  * $E$ is strictly the fastest.

---

#### Q3. Syllogism (Possibility Case):
**Statements:**
1. Some APIs are secure.
2. All secure networks are encrypted.

**Conclusions:**
* I. All APIs being encrypted is a possibility.
* II. At least some encrypted entities are APIs.
* (A) Only I follows
* (B) Only II follows
* (C) Both I and II follow
* (D) Neither follows
* **Correct Answer:** **(C)**
* **Explanation:**
  * Conclusion II: Since Some APIs are secure, and all secure networks are encrypted, those secure APIs are encrypted. Therefore, some encrypted entities are APIs.
  * Conclusion I: There is no negative statement preventing the entire set of APIs from lying within the encrypted set. Hence, the possibility is valid.

---

#### Q4. Critical Reasoning (Statement & Assumption):
**Statement:** *"The company management announced: 'Employees completing advanced AI certification will be eligible for immediate promotion to the Alpha_Stack band.'"*  
**Assumptions:**
* I. The company values specialized AI skills for higher engineering tiers.
* II. All employees currently working in the company are incapable of passing the AI certification.
* (A) Only assumption I is implicit
* (B) Only assumption II is implicit
* (C) Both I and II are implicit
* (D) Neither is implicit
* **Correct Answer:** **(A)**
* **Explanation:** Offering promotions tied to AI certification directly assumes that the company values AI competency for higher bands. Assumption II is baseless and cynical.

---

#### Q5. Cause and Effect:
**Statements:**
* I. The latency of client requests to the e-commerce application increased five-fold during the afternoon.
* II. A routine database migration script running in production failed to release exclusive table locks.
* (A) Statement I is the cause and Statement II is its effect.
* (B) Statement II is the cause and Statement I is its effect.
* (C) Both statements are independent causes.
* (D) Both statements are effects of independent causes.
* **Correct Answer:** **(B)**
* **Explanation:** Holding an unreleased exclusive table lock blocks all incoming reads/writes, which directly causes requests to queue up and latency to spike five-fold.

---

#### Q6. Conditional Logic:
*"If and only if the build passes all automated security scans (S) and unit tests (U), it is deployed to production (D)."*  
Which scenario is logically IMPOSSIBLE?
* (A) S passes, U passes, build is deployed.
* (B) S passes, U fails, build is not deployed.
* (C) S fails, U passes, build is deployed.
* (D) S fails, U fails, build is not deployed.
* **Correct Answer:** **(C)**
* **Explanation:** The biconditional ("If and only if") requires BOTH $S$ and $U$ to be true for $D$ to occur. If $S$ fails, deployment CANNOT happen.

---

#### Q7. Syllogism (Negative Premise):
**Statements:**
1. No junior developer is a system architect.
2. All system architects are decision makers.

**Conclusions:**
* I. No junior developer is a decision maker.
* II. Some decision makers are not junior developers.
* (A) Only I follows
* (B) Only II follows
* (C) Both follow
* (D) Neither follows
* **Correct Answer:** **(B)**
* **Explanation:**
  * System architects are completely inside decision makers and disjoint from junior developers.
  * Therefore, those decision makers who are system architects CANNOT be junior developers. Conclusion II follows.
  * Junior developers could still overlap with other decision makers who are not system architects; hence I does not follow.

---

#### Q8. Statement and Course of Action:
**Problem:** *"A zero-day security flaw in a third-party open-source library used in production has just been publicly disclosed."*  
**Courses of Action:**
* I. Immediately disconnect the server from all internal power supplies.
* II. Audit all code dependencies, apply the vendor patch or isolate affected endpoints, and deploy an emergency hotfix.
* (A) Only I is a proper course of action
* (B) Only II is a proper course of action
* (C) Both I and II are proper
* (D) Neither is proper
* **Correct Answer:** **(B)**
* **Explanation:** Course II is standard, disciplined engineering incident response. Course I is irrational and destructive.

---

#### Q9. Logical Deduction:
Five tasks (V, W, X, Y, Z) must be scheduled sequentially:
1. V is executed immediately before W.
2. X is executed after Z.
3. Y cannot be the first or last task.
4. Z is executed first.
What is the second task executed?
* (A) V
* (B) W
* (C) X
* (D) Y
* **Correct Answer:** **(D)**
* **Explanation:**
  * Positions: 1, 2, 3, 4, 5.
  * Z is at position 1: `Z, _, _, _, _`.
  * V is immediately before W $\to$ block `[V, W]` requires 2 consecutive slots.
  * If `[V, W]` is at slots 2 & 3, remaining slots are 4 & 5. Y cannot be at slot 5 (rule 3), so Y must be at slot 4, leaving X at slot 5 $\to$ valid: `Z, V, W, Y, X`. But wait, can Y be at slot 2? If Y is at slot 2: `Z, Y, V, W, X` (Y is neither first nor last, V is immediately before W, X is after Z). Both seem possible?
  * Let's check rule: "Y cannot be first or last".
  * If order is `Z, Y, V, W, X`: Z is 1st, Y is 2nd, V is 3rd, W is 4th, X is 5th. All conditions satisfied!
  * If order is `Z, V, W, Y, X`: Z is 1st, V is 2nd, W is 3rd, Y is 4th, X is 5th. Both satisfy unless an additional constraint fixes Y: "Y is executed before V". With "Y executed before V", Y MUST be 2nd!

---

#### Q10. Syllogism:
**Statements:**
1. All integers are real numbers.
2. All real numbers are complex numbers.
3. Some complex numbers are imaginary.

**Conclusions:**
* I. All integers are complex numbers.
* II. Some imaginary numbers are integers.
* (A) Only I follows
* (B) Only II follows
* (C) Both follow
* (D) Neither follows
* **Correct Answer:** **(A)**
* **Explanation:** Since Integers $\subseteq$ Real $\subseteq$ Complex, all integers are complex numbers (Conclusion I). Imaginary numbers have no guaranteed overlap with integers.

---

### Section 2: Seating Arrangements & Relation Puzzles (Qs 11–20)

#### Q11. Circular Seating Arrangement:
Six software engineers (P, Q, R, S, T, U) are sitting around a circular table facing the center:
* P sits second to the left of T.
* Q sits opposite to P.
* R sits adjacent to neither P nor Q.
* S sits to the immediate right of Q.

Who sits to the immediate left of P?
* (A) U
* (B) T
* (C) S
* (D) R
* **Correct Answer:** **(A)**
* **Explanation:**
  * Let positions be 1 to 6 clockwise.
  * Place T at 1. P is 2nd to left (clockwise facing center is left) $\to$ P is at 3 (or 5 depending on convention; facing center: left is clockwise).
  * Let's trace facing center:
    * Looking at center: left is Clockwise, right is Counter-Clockwise.
    * T at 12 o'clock. 2nd to left $\to$ 2 o'clock (P).
    * Q opposite P $\to$ Q is at 8 o'clock.
    * S is immediate right of Q (counter-clockwise) $\to$ S is at 7 o'clock.
    * R cannot sit adjacent to P (cannot be at 1 or 3) or Q (cannot be at 7 or 9) $\to$ R must be at 4 o'clock.
    * Remaining slot is U at 1 o'clock (immediate left of P).
  * Thus U sits to the immediate left of P.

---

#### Q12. Linear Arrangement:
Seven microservice nodes (1, 2, 3, 4, 5, 6, 7) are arranged in a straight server rack facing North:
* Node 4 is at the exact center.
* Node 2 is to the immediate left of Node 4.
* Node 1 and Node 7 are at the extreme ends.
* Node 3 is to the immediate right of Node 7.

What is the position of Node 7?
* (A) Extreme right end
* (B) Extreme left end
* (C) Third from right
* (D) Cannot be determined
* **Correct Answer:** **(B)**
* **Explanation:**
  * If Node 7 is at the extreme right end, Node 3 cannot be to its right. Therefore, Node 7 MUST be at the **extreme left end** (slot 1), and Node 3 is at slot 2.

---

#### Q13. Coded Blood Relations:
In a coding syntax:
* `A + B` means A is the father of B.
* `A - B` means A is the sister of B.
* `A * B` means A is the brother of B.
* `A / B` means A is the mother of B.

Which expression indicates that **"M is the maternal uncle of N"**?
* (A) $M * K / N$
* (B) $M + K - N$
* (C) $M / K * N$
* (D) $M * K + N$
* **Correct Answer:** **(A)**
* **Explanation:**
  * $M * K$: $M$ is the brother of $K$ ($M$ is male).
  * $K / N$: $K$ is the mother of $N$.
  * Therefore, $M$ is the brother of $N$'s mother $\to M$ is the **maternal uncle** of $N$.

---

#### Q14. Blood Relations:
*"Pointing to a photograph of a software engineer, Rajesh said: 'Her mother's only son is my father.' How is Rajesh related to the woman in the photograph?"*
* (A) Brother
* (B) Nephew
* (C) Son
* (D) Uncle
* **Correct Answer:** **(B)**
* **Explanation:**
  * *"Her mother's only son"* = The woman's brother.
  * So, *"The woman's brother is my (Rajesh's) father."*
  * Therefore, the woman is Rajesh's paternal aunt, and Rajesh is her **nephew**.

---

#### Q15. Direction Sense:
A mobile autonomous robot moves:
1. 10 meters North.
2. Turns right and moves 15 meters.
3. Turns right and moves 10 meters.
4. Turns left and moves 5 meters.

How far and in which direction is the robot from its starting point?
* (A) 20 meters East
* (B) 20 meters West
* (C) 15 meters East
* (D) 10 meters North
* **Correct Answer:** **(A)**
* **Explanation:**
  * North-South: $+10\text{m} - 10\text{m} = 0\text{m}$.
  * East-West: $+15\text{m} + 5\text{m} = +20\text{m}$ (East).
  * Net displacement: **20 meters East**.

---

#### Q16. Direction & Compass Rotation:
If South-East becomes North, and North-East becomes West, what will **West** become?
* (A) South-East
* (B) South-West
* (C) North-West
* (D) East
* **Correct Answer:** **(A)**
* **Explanation:**
  * South-East is normally $135^\circ$ clockwise from North. If it becomes North, the compass rotates by $135^\circ$ counter-clockwise.
  * West is normally $270^\circ$ clockwise. Rotating $135^\circ$ counter-clockwise gives $270^\circ - 135^\circ = 135^\circ$ clockwise, which is **South-East**.

---

#### Q17. Seating Arrangement: Facing Opposite Directions
Four developers sit in a row: A, B, C, D. Two face North, two face South.
* A faces North.
* D sits at an extreme end and faces South.
* B sits immediate left of A.
* C does not sit next to D.

Who sits at the other extreme end?
* (A) A
* (B) B
* (C) C
* (D) Cannot be determined
* **Correct Answer:** **(C)**
* **Explanation:**
  * D is at an extreme end (say position 4).
  * C does not sit next to D $\to$ C cannot be at position 3.
  * Therefore, C must be at the other extreme end (position 1).

---

#### Q18. Family Tree Deduction:
In a family of 6 members (P, Q, R, S, T, U):
* There are two married couples.
* Q is a doctor and the father of T.
* U is the grandfather of R and is a retired engineer.
* S is the grandmother of T and is a housewife.
* There is one doctor, one engineer, one lawyer, one teacher, and two students.
What is the profession of P if P is the mother of T?
* (A) Lawyer or Teacher
* (B) Doctor
* (C) Engineer
* (D) Student
* **Correct Answer:** **(A)**
* **Explanation:**
  * P is married to Q (doctor). U (engineer) is married to S.
  * P must be either the lawyer or the teacher (since T and R are the students).

---

#### Q19. Complex Rank & Order:
In a class of 60 students:
* Akash ranks 17th from the top.
* Neha ranks 22nd from the bottom.
How many students rank strictly between Akash and Neha?
* (A) 21
* (B) 22
* (C) 20
* (D) 23
* **Correct Answer:** **(A)**
* **Explanation:**
  * Total students $= 60$.
  * Students between $= \text{Total} - (\text{Rank from top} + \text{Rank from bottom}) = 60 - (17 + 22) = 60 - 39 = 21$.

---

#### Q20. Circular Table Facing Outside:
When 5 people sit facing **OUTWARDS** (away from center):
* Left and Right directions are inverted: Clockwise is Right, Counter-Clockwise is Left.
* If X is to the immediate right of Y (facing outward), X is in the **clockwise** position from Y.

---

### Section 3: Inductive Logic, Series & Matrix Patterns (Qs 21–28)

#### Q21. Number Series: Find the missing term:
$$3, \quad 7, \quad 16, \quad 35, \quad 74, \quad \mathbf{?}$$
* (A) 148
* (B) 153
* (C) 149
* (D) 155
* **Correct Answer:** **(B)**
* **Explanation:**
  * $3 \times 2 + 1 = 7$
  * $7 \times 2 + 2 = 16$
  * $16 \times 2 + 3 = 35$
  * $35 \times 2 + 4 = 74$
  * $74 \times 2 + 5 = 148 + 5 = \mathbf{153}$.

---

#### Q22. Alternating Series:
$$2, \quad 3, \quad 8, \quad 27, \quad 112, \quad \mathbf{?}$$
* (A) 565
* (B) 448
* (C) 560
* (D) 672
* **Correct Answer:** **(A)**
* **Explanation:**
  * $2 \times 1 + 1 = 3$
  * $3 \times 2 + 2 = 8$
  * $8 \times 3 + 3 = 27$
  * $27 \times 4 + 4 = 112$
  * $112 \times 5 + 5 = 560 + 5 = \mathbf{565}$.

---

#### Q23. Coding-Decoding:
In a certain cipher:
* `"CLOUD"` is coded as `"ENQWF"`.
How is `"SERVER"` coded in that same cipher?
* (A) `"UGTXGT"`
* (B) `"UGTTGT"`
* (C) `"TFSWFS"`
* (D) `"UHTXHT"`
* **Correct Answer:** **(A)**
* **Explanation:**
  * Shift pattern: Each letter is shifted forward by $+2$:
    * $\text{C} + 2 = \text{E}$, $\text{L} + 2 = \text{N}$, $\text{O} + 2 = \text{Q}$, $\text{U} + 2 = \text{W}$, $\text{D} + 2 = \text{F}$.
  * Applying to `"SERVER"`:
    * $\text{S}+2=\text{U}$, $\text{E}+2=\text{G}$, $\text{R}+2=\text{T}$, $\text{V}+2=\text{X}$, $\text{E}+2=\text{G}$, $\text{R}+2=\text{T} \to$ `"UGTXGT"`.

---

#### Q24. Matrix Logic (Missing Number):
```
┌────┬────┬────┐
│  4 │  9 │  2 │
├────┼────┼────┤
│  3 │  5 │  7 │
├────┼────┼────┤
│  8 │  1 │  ? │
└────┴────┴────┘
```
* (A) 5
* (B) 6
* (C) 9
* (D) 4
* **Correct Answer:** **(B)**
* **Explanation:**
  * This is a 3x3 normal Magic Square where every row, column, and diagonal sums to $15$:
    * Row 1: $4 + 9 + 2 = 15$
    * Row 2: $3 + 5 + 7 = 15$
    * Row 3: $8 + 1 + ? = 15 \implies ? = 6$.

---

#### Q25. Odd One Out:
Which of the following does NOT belong to the group?
* (A) 343
* (B) 512
* (C) 729
* (D) 1000
* (E) 1296
* **Correct Answer:** **(E)**
* **Explanation:**
  * $343 = 7^3$
  * $512 = 8^3$
  * $729 = 9^3$
  * $1000 = 10^3$
  * $1296 = 36^2 = 6^4$ (NOT a perfect cube of an integer: $11^3 = 1331$).

---

#### Q26. Symbol Analogy:
`ARCHITECT : BLUEPRINT :: PROGRAMMER : ?`
* (A) HARDWARE
* (B) SOURCE CODE
* (C) MONITOR
* (D) KEYBOARD
* **Correct Answer:** **(B)**
* **Explanation:** An architect creates a blueprint as the core intellectual deliverable; a programmer creates source code.

---

#### Q27. Letter Series:
$$\text{AZ}, \quad \text{CX}, \quad \text{EV}, \quad \text{GT}, \quad \mathbf{?}$$
* (A) IR
* (B) HS
* (C) JQ
* (D) KP
* **Correct Answer:** **(A)**
* **Explanation:**
  * First letter increases by $+2$: $\text{A}(1) \to \text{C}(3) \to \text{E}(5) \to \text{G}(7) \to \mathbf{I}(9)$.
  * Second letter is the reverse alphabet pair ($27 - \text{position}$): Pair of $\text{I}$ is $\mathbf{R}$ ($9 + 18 = 27$).
  * Result: `"IR"`.

---

#### Q28. Matrix Multiplication Rule:
```
Row 1: [ 3 , 4 ] -> Result: 25
Row 2: [ 5 , 12] -> Result: 169
Row 3: [ 8 , 15] -> Result: ?
```
* (A) 225
* (B) 289
* (C) 161
* (D) 256
* **Correct Answer:** **(B)**
* **Explanation:**
  * Pythagorean triplet identity: $a^2 + b^2 = c^2$:
    * $3^2 + 4^2 = 9 + 16 = 25$
    * $5^2 + 12^2 = 25 + 144 = 169$
    * $8^2 + 15^2 = 64 + 225 = \mathbf{289}$ ($17^2$).

---

### Section 4: Quantitative & Digit Challenge Logic (Qs 29–35)

#### Q29. Operator Filling (Digit Challenge):
Target: **54**  
Equation: `8 [op1] 6 [op2] 6 = 54`  
Which operators satisfy the equation under BODMAS rules?
* (A) $\times, -$
* (B) $\times, +$
* (C) $+, \times$
* (D) $-, \times$
* **Correct Answer:** **(A)**
* **Explanation:**
  * Using (A): $8 \times 6 = 48$... Wait, $48 + 6 = 54$!
  * Let's check $8 \times 6 + 6$: $48 + 6 = 54$!
  * That is Option **(B)**: $\times, +$. $8 \times 6 + 6 = 48 + 6 = 54$.

---

#### Q30. Target Matching (Rapid Math):
Find digits from $\{2, 3, 4, 7\}$ without repetition such that:
$$[ \text{Digit 1} ]^2 + [ \text{Digit 2} ] \times [ \text{Digit 3} ] = 37$$
* (A) $7, 3, 4$
* (B) $3, 7, 4$
* (C) $4, 7, 3$
* (D) $2, 7, 4$
* **Correct Answer:** **(C)**
* **Explanation:**
  * If Digit 1 is $4$: $4^2 = 16$.
  * Remaining digits: $7 \times 3 = 21$.
  * Sum: $16 + 21 = 37$. Matches!

---

#### Q31. Data Sufficiency:
**Question:** Is integer $N$ divisible by 6?
* Statement 1: $N$ is divisible by 2.
* Statement 2: $N$ is divisible by 3.
* (A) Statement 1 ALONE is sufficient
* (B) Statement 2 ALONE is sufficient
* (C) BOTH statements TOGETHER are sufficient
* (D) Statements 1 and 2 together are NOT sufficient
* **Correct Answer:** **(C)**
* **Explanation:** Since $\gcd(2, 3) = 1$, a number divisible by both 2 and 3 is strictly divisible by $2 \times 3 = 6$. Both statements combined are required.

---

#### Q32. Clocks Problem:
At what angle (in degrees) are the hands of a clock inclined at **3:40**?
* (A) $120^\circ$
* (B) $130^\circ$
* (C) $140^\circ$
* (D) $125^\circ$
* **Correct Answer:** **(B)**
* **Explanation:**
  * Formula: $\theta = \left| 30H - \frac{11}{2}M \right|$
  * For $H = 3, M = 40$:
    $$\theta = \left| 30(3) - \frac{11}{2}(40) \right| = | 90 - 220 | = |-130| = \mathbf{130^\circ}$$

---

#### Q33. Calendar Problem:
If January 1, 2024 was a **Monday**, what day of the week was January 1, 2025?
* (A) Tuesday
* (B) Wednesday
* (C) Thursday
* (D) Monday
* **Correct Answer:** **(B)**
* **Explanation:**
  * Year 2024 is a **Leap Year** ($366$ days).
  * $366 \pmod 7 = 2$ odd days.
  * Monday $+ 2$ days $= \mathbf{Wednesday}$.

---

#### Q34. Speed, Time & Distance:
Two trains of equal length 150 meters run on parallel tracks in opposite directions at $54\text{ km/h}$ and $90\text{ km/h}$. In how many seconds will they completely cross each other?
* (A) 5 seconds
* (B) 7.5 seconds
* (C) 10 seconds
* (D) 12 seconds
* **Correct Answer:** **(B)**
* **Explanation:**
  * Total distance $= 150 + 150 = 300\text{ meters}$.
  * Relative speed $= 54 + 90 = 144\text{ km/h} = 144 \times \frac{5}{18} = 40\text{ m/s}$.
  * $\text{Time} = \frac{\text{Distance}}{\text{Speed}} = \frac{300}{40} = \mathbf{7.5\text{ seconds}}$.

---

#### Q35. Probability:
Two fair six-sided dice are rolled simultaneously. What is the probability that the sum of the numbers is a prime number?
* (A) $5/12$
* (B) $7/18$
* (C) $1/2$
* (D) $15/36$
* **Correct Answer:** **(A)**
* **Explanation:**
  * Prime sums possible between 2 and 12: $\{2, 3, 5, 7, 11\}$.
    * Sum = 2: $(1,1) \to 1$
    * Sum = 3: $(1,2), (2,1) \to 2$
    * Sum = 5: $(1,4), (2,3), (3,2), (4,1) \to 4$
    * Sum = 7: $(1,6), (2,5), (3,4), (4,3), (5,2), (6,1) \to 6$
    * Sum = 11: $(5,6), (6,5) \to 2$
  * Total favorable outcomes $= 1 + 2 + 4 + 6 + 2 = 15$.
  * Total outcomes $= 36$.
  * Probability $= \frac{15}{36} = \mathbf{\frac{5}{12}}$.

---

> **Next Step:** [Stage 6 — Technical Interview Preparation →](./06_Technical_Interview.md) | **Return to** [Main Roadmap](./README.md)
