# ⚡ SSC CHSL / CGL Quantitative Aptitude — Complete Shortcuts, Tricks & Variations

> **Exam Target:** SSC CHSL Tier-I (25 Questions · 15–20 Min Target)  
> **How to use this sheet:** Every chapter below gives you the **exact high-frequency SSC shortcut**, a **solved example** (showing the 10-second method), and **exam variations** where SSC twists the question.

---

## 📑 Chapter Index

1. [Number System & Simplification](#1-number-system--simplification)
2. [LCM & HCF](#2-lcm--hcf)
3. [Percentage](#3-percentage)
4. [Profit, Loss & Discount](#4-profit-loss--discount)
5. [Ratio, Proportion, Mixture & Average](#5-ratio-proportion-mixture--average)
6. [Simple & Compound Interest](#6-simple--compound-interest)
7. [Time, Work & Pipes-Cisterns](#7-time-work--pipes-cisterns)
8. [Time, Speed & Distance (Trains, Boats & Races)](#8-time-speed--distance-trains-boats--races)
9. [Geometry](#9-geometry)
10. [Mensuration (2D & 3D)](#10-mensuration-2d--3d)
11. [Trigonometry & Heights-Distances](#11-trigonometry--heights-distances)
12. [Algebra & Data Interpretation](#12-algebra--data-interpretation)

---

## 1. Number System & Simplification

### 1.1 Composite Divisibility Rules (72, 88, 99, 36, 45)
Break composite divisors into **co-prime** factors:
- **Divisible by $72$:** Check **$8$** (last 3 digits) and **$9$** (sum of digits).
- **Divisible by $88$:** Check **$8$** (last 3 digits) and **$11$** ($|\text{Sum of odd-place digits} - \text{Sum of even-place digits}| = 0, 11, 22\dots$).
- **Divisible by $99$:** Check **$9$** and **$11$** (or sum 2-digit blocks from right; must be divisible by $99$).
- **Divisible by $7, 11, 13$:** Alternating sum of 3-digit blocks from right; any 6-digit repeated block `abcabc` is always divisible by $7 \times 11 \times 13 = 1001$.

**Example:** If 9-digit number `789x531y2` is divisible by $72$, find $5x - 3y$ for maximum $y$.  
- **Shortcut:** Last 3 digits `1y2` divisible by $8$ $\Rightarrow$ test $y = 9, 5, 1$: `192` ($192/8 = 24$), so max $y = 9$.  
- Digit sum $= 7+8+9+x+5+3+1+9+2 = 44 + x$. Nearest multiple of $9$ is $45 \Rightarrow x = 1$.  
- Answer: $5(1) - 3(9) = -22$.

**Variations:**
- **Minimum $y$:** Test from $y = 0$ upward (`112/8 = 14`, so min $y = 1$).
- **Divisible by $88$:** Always fix the last 3 digits using **$8$** first, then solve the middle digit using **$11$**.

---

### 1.2 Unit Digit Cyclicity
| Last Digit of Base | Cyclicity | Rule for Power $n$ |
| :--- | :---: | :--- |
| $0, 1, 5, 6$ | $1$ | Always same digit ($0, 1, 5, 6$) |
| $4, 9$ | $2$ | $4^{\text{odd}} \to 4,\ 4^{\text{even}} \to 6$ ; $9^{\text{odd}} \to 9,\ 9^{\text{even}} \to 1$ |
| $2, 3, 7, 8$ | $4$ | Divide $n$ by $4$: remainder $r \in \{1,2,3\}$; if $r = 0$, take power **$4$** |

**Example:** Unit digit of $(264)^{102} + (264)^{103}$.  
- **Shortcut:** $4^{\text{even}} + 4^{\text{odd}} \to 6 + 4 = 10 \Rightarrow$ unit digit **$0$**.

**Variations:**
- **Factorial powers ($n!$):** For $n \ge 4$, $n!$ is always divisible by $4$, so treat the power as $4$.
- **Subtraction cases:** If $(17)^{1999} - (13)^{1999}$ gives $3 - 7$, borrow $10$: $13 - 7 = 6$.

---

### 1.3 Factors, Sum of Factors & Trailing Zeros
For $N = p^a \cdot q^b \cdot r^c$:
- **Total factors:** $(a+1)(b+1)(c+1)$
- **Even factors:** $a(b+1)(c+1)$ (where $p = 2$)
- **Odd factors:** $(b+1)(c+1)$ (ignore power of $2$)
- **Trailing zeros in $n!$:** $\lfloor n/5 \rfloor + \lfloor n/25 \rfloor + \lfloor n/125 \rfloor + \dots$

**Example:** Trailing zeros in $125!$.  
- **Shortcut:** $125/5 + 125/25 + 125/125 = 25 + 5 + 1 = 31$.

**Variations:**
- **Product of all factors of $N$:** $N^{(\text{Total factors})/2}$.
- **Number of factors of $N$ that are multiples of $k$:** Factor out $k$ from $N$ and count total factors of $N/k$.

---

### 1.4 Remainder Shortcuts
- **$(a^n + b^n)$:** Always divisible by $(a + b)$ when **$n$ is odd**.
- **$(a^n - b^n)$:** Always divisible by $(a - b)$ for **all $n$**, and by $(a + b)$ when **$n$ is even**.
- **$(x^n) \div (x - 1)$:** Remainder is always **$1$**.
- **$(x^n) \div (x + 1)$:** Remainder is **$1$** if $n$ is even, and **$x$** (i.e. $-1$) if $n$ is odd.

**Example:** Remainder when $67^{67} + 67$ is divided by $68$.  
- **Shortcut:** $67 \equiv -1 \pmod{68} \Rightarrow (-1)^{67} + (-1) = -1 - 1 = -2 \equiv 68 - 2 = 66$.

**Variations:**
- **Base difference $> 1$:** Rewrite $2^{33} \div 9$ as $(2^3)^{11} \div 9 = 8^{11} \div 9 \Rightarrow (-1)^{11} = -1 \Rightarrow 9 - 1 = 8$.

---

## 2. LCM & HCF

### 2.1 Core Identities
- $\text{HCF}(a, b) \times \text{LCM}(a, b) = a \times b$
- **Fractions:** $\text{LCM} = \dfrac{\text{LCM of Numerators}}{\text{HCF of Denominators}}$ ; $\text{HCF} = \dfrac{\text{HCF of Numerators}}{\text{LCM of Denominators}}$
- **Numbers in ratio $a : b$ with $\text{HCF} = H$:** Numbers are $Ha$ and $Hb$, $\text{LCM} = Hab$ (where $\gcd(a,b) = 1$).

**Example:** Two numbers have $\text{HCF} = 12$ and sum $= 120$. How many such pairs exist?  
- **Shortcut:** $12a + 12b = 120 \Rightarrow a + b = 10$. Co-prime pairs $(a, b)$ summing to $10$: $(1, 9)$ and $(3, 7)$ $\Rightarrow$ **2 pairs**.

**Variations:**
- **Product given ($H \cdot a \cdot H \cdot b = P$):** Find co-prime pairs $(a, b)$ such that $a \times b = P / H^2$.
- **LCM given:** $a \times b = \text{LCM} / H$, count co-prime factor pairs of $\text{LCM} / H$.

---

### 2.2 Remainder Types (Least Number vs Greatest Divisor)
| Question Type | Formula |
| :--- | :--- |
| **Least number** leaving **same remainder $r$** when divided by $a, b, c$ | $\text{LCM}(a, b, c) + r$ |
| **Least number** leaving **different remainders** $r_1, r_2, r_3$ where $a-r_1 = b-r_2 = c-r_3 = d$ | $\text{LCM}(a, b, c) - d$ |
| **Greatest divisor** leaving **same remainder** on $a, b, c$ | $\text{HCF}(|a-b|, |b-c|, |c-a|)$ |
| **Greatest divisor** leaving remainders $r_1, r_2, r_3$ on $a, b, c$ | $\text{HCF}(a-r_1,\ b-r_2,\ c-r_3)$ |

**Example:** Greatest number that divides $43, 91, 183$ leaving the same remainder in each case.  
- **Shortcut:** $\text{HCF}(91-43,\ 183-91,\ 183-43) = \text{HCF}(48, 92, 140) = \mathbf{4}$.

**Variations:**
- **4-digit / 5-digit largest or smallest number:** Take $\text{LCM} \times k + r$ (or $- d$) fitting the digit range.

---

## 3. Percentage

### 3.1 Must-Know Fraction Equivalents
$$\frac{1}{6} = 16.\overline{6}\%, \quad \frac{1}{7} = 14\frac{2}{7}\%, \quad \frac{1}{8} = 12.5\%, \quad \frac{1}{9} = 11.\overline{1}\%, \quad \frac{1}{11} = 9.\overline{09}\%, \quad \frac{1}{12} = 8.\overline{3}\%$$
$$\frac{3}{8} = 37.5\%, \quad \frac{5}{8} = 62.5\%, \quad \frac{7}{8} = 87.5\%, \quad \frac{4}{7} = 57\frac{1}{7}\%, \quad \frac{2}{3} = 66.\overline{6}\%$$

---

### 3.2 Successive % Change & Expenditure Invariance
- **Successive % change ($x\%$ then $y\%$):** $\text{Net } \% = x + y + \dfrac{xy}{100}$ (use negative sign for decrease).
- **A is $x\%$ more than B $\Rightarrow$ B is less than A by:** $\dfrac{x}{100 + x} \times 100\%$ (use $100 - x$ if "less").
- **Ratio/Fraction shortcut:** If price rises by $+1/n$, reduce consumption by $1/(n+1)$ to keep expenditure constant!

**Example:** Price of sugar rises by $25\%$. By how much % must consumption decrease so expenditure stays the same?  
- **Shortcut:** $+25\% = +\dfrac{1}{4} \Rightarrow \text{Decrease} = \dfrac{1}{4+1} = \dfrac{1}{5} = \mathbf{20\%}$.

**Variations:**
- **Expenditure changes by $+E\%$ instead of $0\%$:** Use ratio table $\text{Price} \times \text{Consumption} = \text{Expenditure}$. E.g., Price $+20\%$ ($5 \to 6$), Exp $+8\%$ ($25 \to 27$), so Consumption $= \frac{27}{6} : \frac{25}{5} = 4.5 : 5 \Rightarrow -10\%$.
- **Quantity bought for fixed ₹:** If price drops by $20\%$ ($5 \to 4$), quantity rises $4 \to 5$ (+1 unit). If +1 unit = 4 kg for ₹320, new quantity = 20 kg $\Rightarrow$ new price = ₹16/kg.

---

## 4. Profit, Loss & Discount

### 4.1 Direct SSC Golden Shortcuts
- **$\text{CP}$ of $x$ articles $= \text{SP}$ of $y$ articles:** $\text{Profit/Loss}\% = \dfrac{x - y}{y} \times 100\%$
- **Two articles sold at SAME SP**, one at $+x\%$ profit and one at $-x\%$ loss: **Always Net Loss** $= \dfrac{x^2}{100}\%$
- **MP–CP Link:** $\dfrac{\text{MP}}{\text{CP}} = \dfrac{100 + P\%}{100 - D\%}$ (use $100 - L\%$ for loss)
- **"Buy $x$ Get $y$ Free":** $\text{Discount}\% = \dfrac{y}{x + y} \times 100\%$
- **Selling Price Shift:** If SP changes from $P_1\%$ to $P_2\%$ (or loss $L_1\%$ to profit $P_2\%$), $\text{CP} = \dfrac{\Delta\text{SP}}{\Delta\%} \times 100$.

**Example:** Shopkeeper marks goods $40\%$ above CP and gives $25\%$ discount. Find profit %.  
- **Shortcut:** Successive $+40\%$ and $-25\%$: $40 - 25 - \dfrac{40 \times 25}{100} = 15 - 10 = \mathbf{5\% \text{ profit}}$.

**Variations:**
- **Dishonest Shopkeeper:** Combines markup $+m\%$, discount $-d\%$, and false weight (gives $w$ grams instead of $W$ grams). Multiply ratios:
  $$\frac{\text{SP}}{\text{CP}} = \left(\frac{100+m}{100}\right) \times \left(\frac{100-d}{100}\right) \times \left(\frac{W}{w}\right)$$
- **Two articles with SAME CP** at $+x\%$ and $-x\%$: Net profit/loss is **$0\%$** (do NOT apply $x^2/100$).

---

## 5. Ratio, Proportion, Mixture & Average

### 5.1 Proportion & Cross-Method
- **Mean proportional** between $a, b$: $\sqrt{ab}$
- **Third proportional** to $a, b$: $\dfrac{b^2}{a}$
- **Fourth proportional** to $a, b, c$: $\dfrac{bc}{a}$
- **Income–Expenditure–Savings Cross Method:** If Income ratio $= I_1:I_2$, Expenditure ratio $= E_1:E_2$, Savings $= S_1, S_2$:
  $$1\text{ unit} = \frac{|I_1 S_2 - I_2 S_1|}{|I_1 E_2 - I_2 E_1|} \quad \text{(only valid when cross-products differ!)}$$

---

### 5.2 Mixture Replacement Formula
If a vessel has $V$ litres of pure milk, and $x$ litres is removed and replaced with water **$n$ times**:
$$\text{Milk left} = V \left(1 - \frac{x}{V}\right)^n$$

**Example:** From $40\text{ L}$ milk, $4\text{ L}$ is drawn and replaced with water twice. Find milk left.  
- **Shortcut:** $40 \times \left(1 - \frac{4}{40}\right)^2 = 40 \times \left(\frac{9}{10}\right)^2 = 40 \times 0.81 = \mathbf{32.4\text{ L}}$.

**Variations:**
- **Different quantities drawn each time ($x_1, x_2$):** Multiply $V \left(1 - \frac{x_1}{V}\right)\left(1 - \frac{x_2}{V}\right)$.
- **Final Milk:Total ratio given:** Take the $n$-th root of $(\text{Milk}/\text{Total})$ to find $(1 - x/V)$.

---

### 5.3 Average Replacement & Wrong Entry
- **Person replaced ($n$ persons, average changes by $\pm\Delta$):** $\text{New value} = \text{Old value} \pm n\Delta$
- **Wrong entry corrected:** $\text{New Avg} = \text{Old Avg} + \dfrac{\text{Correct} - \text{Wrong}}{n}$
- **Consecutive odd/even/AP numbers:** Average $=$ **Middle term** $= \dfrac{\text{First} + \text{Last}}{2}$.

**Example:** Average weight of 8 men increases by $1.5\text{ kg}$ when a man of $65\text{ kg}$ is replaced by a new man. Find new man's weight.  
- **Shortcut:** $65 + 8 \times 1.5 = 65 + 12 = \mathbf{77\text{ kg}}$.

**Variations:**
- **New person joins ($n \to n+1$):** $\text{New person} = \text{New Avg} + n_{\text{old}} \times \Delta\text{Avg}$ (or $\text{Old Avg} + n_{\text{new}} \times \Delta\text{Avg}$).

---

## 6. Simple & Compound Interest

### 6.1 Doubling / Tripling Shortcuts
- **SI:** If a sum becomes $n$ times in $T$ years $\Rightarrow R \times T = 100(n - 1)$.  
  To become $m$ times at same rate: $\dfrac{T_2}{T_1} = \dfrac{m - 1}{n - 1}$.
- **CI:** If a sum becomes $k$ times in $T$ years, it becomes $k^m$ times in **$mT$ years**!

**Example:** Under CI, a sum doubles in $5$ years. In how many years will it become $8$ times?  
- **Shortcut:** $8 = 2^3 \Rightarrow 3 \times 5 = \mathbf{15\text{ years}}$.

---

### 6.2 CI – SI Difference Shortcuts
- **For 2 years:** $D_2 = P\left(\dfrac{R}{100}\right)^2$
- **For 3 years:** $D_3 = P\left(\dfrac{R}{100}\right)^2 \left(3 + \dfrac{R}{100}\right) = D_2 \left(3 + \dfrac{R}{100}\right)$
- **Rate from SI & CI of 2 years:** $R\% = \dfrac{2(\text{CI} - \text{SI})}{\text{SI}} \times 100\%$

**Example:** For 2 years, $\text{SI} = ₹400$ and $\text{CI} = ₹420$. Find rate $R$ and principal $P$.  
- **Shortcut:** 1st year SI $= ₹200$, extra ₹20 is interest on ₹200 $\Rightarrow R = \dfrac{20}{200} \times 100 = \mathbf{10\%}$.  
- $10\%$ of $P = 200 \Rightarrow P = \mathbf{₹2,000}$.

**Variations:**
- **Half-yearly / Quarterly / 8-monthly:** Adjust $R_{\text{eff}} = R \times \frac{\text{months}}{12}$ and $n = \frac{\text{total months}}{\text{period months}}$.
- **CI Installments (2 equal annual installments $X$ at rate $R\%$):**
  $$P = \frac{X}{1 + \frac{R}{100}} + \frac{X}{\left(1 + \frac{R}{100}\right)^2}$$
  *(Ratio trick: if $R = 10\% \to 10:11$, square for 2nd yr $100:121$, equalize installments to $121$).*

---

## 7. Time, Work & Pipes-Cisterns

### 7.1 Standard Shortcuts
- **2 workers ($a, b$ days together):** $\dfrac{ab}{a + b}$
- **Together = $x$ days; A alone = $x + a$, B alone = $x + b$:** $x = \sqrt{ab}$
- **MDH Chain Rule:** $\dfrac{M_1 D_1 H_1 E_1}{W_1} = \dfrac{M_2 D_2 H_2 E_2}{W_2}$
- **Leaving $k$ days BEFORE completion:** Add $k \times (\text{leaving person's 1-day work})$ to Total Work, then divide by combined efficiency!

**Example:** A and B can do a work in $12$ and $18$ days. They start together, but A leaves $3$ days before completion. Total days?  
- **Shortcut:** Total Work $= \text{LCM}(12, 18) = 36$. Efficiencies: $A = 3,\ B = 2$.  
- A leaves 3 days early $\Rightarrow$ add $3 \times 3 = 9$ units: $(36 + 9) / (3 + 2) = 45/5 = \mathbf{9\text{ days}}$.

**Variations:**
- **Alternate days:** Group 2-day cycle work first; handle remainder carefully on the last day (don't blindly divide).
- **Pipes with leak:** If pipe fills in $a$ hrs, with leak fills in $b$ hrs $\Rightarrow$ Leak empties full tank in $\dfrac{ab}{b - a}$ hrs.

---

## 8. Time, Speed & Distance (Trains, Boats & Races)

### 8.1 Core Shortcuts
- **Unit conversion:** $\text{km/h} \times \frac{5}{18} = \text{m/s}$ ; $\text{m/s} \times \frac{18}{5} = \text{km/h}$
- **Average speed (equal distances at $x, y$):** $\dfrac{2xy}{x + y}$ (for 3 equal distances: $\dfrac{3xyz}{xy + yz + zx}$)
- **Early/Late trick:** Reaching at speed $S_1$ vs $S_2$ with total time difference $\Delta t$:
  $$D = \frac{S_1 \cdot S_2}{|S_1 - S_2|} \times \Delta t$$
- **With & Without Stoppages:** $\text{Stoppage time per hour} = \dfrac{S_{\text{without}} - S_{\text{with}}}{S_{\text{without}}} \times 60\text{ min}$

**Example:** Walking at $3/4$ of usual speed, a man is $15$ min late. Find usual time.  
- **Shortcut:** Speed ratio $4 : 3 \Rightarrow$ Time ratio $3 : 4$. Difference $1\text{ unit} = 15\text{ min} \Rightarrow$ Usual time $= 3 \times 15 = \mathbf{45\text{ min}}$.  
  *(Direct formula: $\frac{a}{|a-b|} \times \Delta t = \frac{3}{4-3} \times 15 = 45\text{ min}$.)*

---

### 8.2 Boats, Streams & Circular Track
- **Downstream ($D$) $= u + v$, Upstream ($U$) $= u - v$** $\Rightarrow u = \dfrac{D + U}{2},\ v = \dfrac{D - U}{2}$
- **Same distance downstream ($t_1$) and upstream ($t_2$):** $\dfrac{u}{v} = \dfrac{t_2 + t_1}{t_2 - t_1}$
- **Round-trip time $T$ for distance $d$:** $d = \dfrac{T(u^2 - v^2)}{2u}$
- **Circular Track ($L$):**
  - First meeting anywhere: $L / v_{\text{rel}}$ (subtract speeds in same direction, add in opposite).
  - First meeting at **starting point**: $\text{LCM}(L/v_1,\ L/v_2,\ \dots)$.

---

## 9. Geometry

### 9.1 Triangle Centre Angles (Instant Answers!)
| Centre | Angle Formula |
| :--- | :--- |
| **Incentre ($I$)** (internal angle bisectors) | $\angle BIC = 90^\circ + \dfrac{\angle A}{2}$ |
| **Excentre ($E$)** (external angle bisectors) | $\angle BEC = 90^\circ - \dfrac{\angle A}{2}$ |
| **Circumcentre ($O$)** | $\angle BOC = 2\angle A$ |
| **Orthocentre ($H$)** | $\angle BHC = 180^\circ - \angle A$ |
| **Angle between bisector & altitude** from $A$ | $\dfrac{|\angle B - \angle C|}{2}$ |

- **Right triangle ($a, b, c$):** Inradius $r = \dfrac{a + b - c}{2}$, Circumradius $R = \dfrac{c}{2}$
- **Equilateral triangle (side $a$):** $h = \dfrac{\sqrt{3}}{2}a$, $r = \dfrac{a}{2\sqrt{3}}$, $R = \dfrac{a}{\sqrt{3}}$ ($R : r = 2 : 1$)
- **Stewart's / Apollonius Median Theorem:** $AB^2 + AC^2 = 2(AD^2 + BD^2)$

---

### 9.2 Circle Power & Tangent Shortcuts
- **Intersecting chords ($AB, CD$ at $P$):** $PA \times PB = PC \times PD$
- **Secant & Tangent ($PT$ tangent, $PAB$ secant):** $PT^2 = PA \times PB$
- **Two circles (radii $R, r$, centre distance $d$):**
  - Direct Common Tangent ($\text{DCT}$) $= \sqrt{d^2 - (R - r)^2}$
  - Transverse Common Tangent ($\text{TCT}$) $= \sqrt{d^2 - (R + r)^2}$
  - If circles touch externally ($d = R + r$): $\text{DCT} = 2\sqrt{Rr}$
- **Alternate Segment Theorem:** Angle between tangent and chord $=$ angle subtended by chord in alternate segment.
- **Regular $n$-sided polygon:** Each exterior angle $= \dfrac{360^\circ}{n}$, sum of interior angles $= (n - 2) \times 180^\circ$, diagonals $= \dfrac{n(n - 3)}{2}$.

---

## 10. Mensuration (2D & 3D)

### 10.1 High-Speed Mensuration Ratios
- **Pythagorean Triplets to memorize:** $(3,4,5)$, $(5,12,13)$, $(7,24,25)$, $(8,15,17)$, $(9,40,41)$, $(11,60,61)$, $(20,21,29)$.
- **Equal Perimeter Rule:** Circle $>$ Square $>$ Equilateral Triangle (Circle has max area).
- **Melting & Recasting:** $\text{Number of small solids} = \dfrac{\text{Volume of large solid}}{\text{Volume of 1 small solid}}$ ($\pi$ always cancels!).
- **Same base & height ($r, h$) Volume Ratio:**
  $$\text{Cylinder} : \text{Hemisphere (if } h=r\text{)} : \text{Cone} = 3 : 2 : 1$$

**Example:** How many spherical lead balls of radius $1\text{ cm}$ can be made from a solid sphere of radius $8\text{ cm}$?  
- **Shortcut:** Ratio of radii $= 8 : 1 \Rightarrow$ Number of balls $= 8^3 = \mathbf{512}$.

**Variations:**
- **% change in radius $r$ ($+x\%$):**
  - Area / CSA / TSA changes by $2x + \dfrac{x^2}{100}\%$
  - Volume of sphere / cube changes by successive $x\%$ applied **3 times** (e.g. $+10\% \to +33.1\%$, $-10\% \to -27.1\%$).
- **Hollow Cylinder / Spherical Shell:** Replace $R^2 \to (R^2 - r^2)$ for cylinder/annulus, and $R^3 \to (R^3 - r^3)$ for spherical shell.
- **Path inside/outside rectangle ($l \times b$, width $w$):** $\text{Area} = 2w(l + b \pm 2w)$ (`+` outside, `-` inside).

---

## 11. Trigonometry & Heights-Distances

### 11.1 SSC Instant-Solve Identities
1. If $\sec\theta + \tan\theta = k \implies \sec\theta - \tan\theta = \dfrac{1}{k}$ (Same for $\csc\theta \pm \cot\theta$)
2. If $a\sin\theta + b\cos\theta = c$ and $a\cos\theta - b\sin\theta = x \implies x = \pm\sqrt{a^2 + b^2 - c^2}$
3. $\sin\theta + \csc\theta = 2 \implies \sin^n\theta + \csc^n\theta = 2$ (Same for $\cos\theta + \sec\theta = 2$ and $\tan\theta + \cot\theta = 2$)
4. **Complementary pair ($\alpha + \beta = 90^\circ$):** $\tan\alpha \cdot \tan\beta = 1$, $\cot\alpha \cdot \cot\beta = 1$, $\sin^2\alpha + \sin^2\beta = 1$, $\cos^2\alpha + \cos^2\beta = 1$
5. **Max / Min value of $a\sin\theta + b\cos\theta$:** $\pm\sqrt{a^2 + b^2}$
6. **Min value of $a\sin^2\theta + b\csc^2\theta$ (or $\tan/\cot$, $\cos/\sec$):** $2\sqrt{ab}$ (when $a \le b$; if $a > b$ for $\sin/\csc$ or $\cos/\sec$, min $= a + b$)

**Example:** If $\sec\theta + \tan\theta = 5$, find $\sin\theta$.  
- **Shortcut:** $\sec\theta - \tan\theta = 1/5 \Rightarrow 2\sec\theta = 5 + \frac{1}{5} = \frac{26}{5} \Rightarrow \sec\theta = \frac{13}{5}$ (triplet $5,12,13$) $\Rightarrow \sin\theta = \mathbf{\frac{12}{13}}$.

---

### 11.2 Heights & Distances Ratio Shortcuts
- **$30^\circ$–$60^\circ$–$90^\circ$ triangle:** Sides opposite $30^\circ : 60^\circ : 90^\circ = \mathbf{1 : \sqrt{3} : 2}$
- **$45^\circ$–$45^\circ$–$90^\circ$ triangle:** Sides $= \mathbf{1 : 1 : \sqrt{2}}$
- **Elevation shifts from $30^\circ$ to $60^\circ$** walking distance $d$ toward tower of height $h$:
  $$h = \frac{d\sqrt{3}}{2}, \quad \text{remaining distance} = \frac{d}{2}$$
- **Elevation shifts from $30^\circ$ to $45^\circ$:** $d = h(\sqrt{3} - 1) \implies h = \dfrac{d(\sqrt{3} + 1)}{2}$
- **Elevation shifts from $45^\circ$ to $60^\circ$:** $d = h\left(1 - \dfrac{1}{\sqrt{3}}\right) \implies h = \dfrac{d\sqrt{3}}{\sqrt{3} - 1}$

---

## 12. Algebra & Data Interpretation

### 12.1 Power Shortcuts for $x + \frac{1}{x} = k$ (and $x - \frac{1}{x} = k$)
| Target | Given $x + \frac{1}{x} = k$ | Given $x - \frac{1}{x} = k$ |
| :--- | :--- | :--- |
| **Power 2** ($x^2 + \frac{1}{x^2}$) | $k^2 - 2$ | $k^2 + 2$ |
| **Power 3** ($x^3 \pm \frac{1}{x^3}$) | $x^3 + \frac{1}{x^3} = k^3 - 3k$ | $x^3 - \frac{1}{x^3} = k^3 + 3k$ |
| **Power 4** ($x^4 + \frac{1}{x^4}$) | $(k^2 - 2)^2 - 2$ | $(k^2 + 2)^2 - 2$ |
| **Power 5** ($x^5 \pm \frac{1}{x^5}$) | $(k^2 - 2)(k^3 - 3k) - k$ | $(k^2 + 2)(k^3 + 3k) - k$ |
| **Power 6** ($x^6 + \frac{1}{x^6}$) | $(k^3 - 3k)^2 - 2$ | $(k^3 + 3k)^2 + 2$ |
| **Sign Flip** | $x - \frac{1}{x} = \pm\sqrt{k^2 - 4}$ | $x + \frac{1}{x} = \pm\sqrt{k^2 + 4}$ |

**Special Cases (Instant 1-Second Answers!):**
- $x + \frac{1}{x} = 2 \implies x = 1$ (Always!)
- $x + \frac{1}{x} = -2 \implies x = -1$
- $x + \frac{1}{x} = 1 \implies x^3 = -1$
- $x + \frac{1}{x} = -1 \implies x^3 = +1$
- $x + \frac{1}{x} = \sqrt{3} \implies x^6 = -1$ (any terms with power gap of $6$ sum to **$0$**!)

**Example:** If $x + \frac{1}{x} = 3$, find $x^5 + \frac{1}{x^5}$.  
- **Shortcut:** $P_2 = 3^2 - 2 = 7$, $P_3 = 3^3 - 3(3) = 18 \Rightarrow P_5 = 7 \times 18 - 3 = 126 - 3 = \mathbf{123}$.

**Variations:**
- **Coefficient on $1/x$ ($ax + \frac{b}{x} = k$):** $a^2 x^2 + \frac{b^2}{x^2} = k^2 - 2ab$ ; $a^3 x^3 + \frac{b^3}{x^3} = k^3 - 3abk$.
- **Quadratic disguised:** $x^2 - 5x + 1 = 0 \xrightarrow{\div x} x + \frac{1}{x} = 5$.

---

### 12.2 Three-Variable Identities & Symmetry
- **Master Identity:**
  $$a^3 + b^3 + c^3 - 3abc = (a + b + c)\left[(a + b + c)^2 - 3(ab + bc + ca)\right] = \frac{1}{2}(a + b + c)\left[(a - b)^2 + (b - c)^2 + (c - a)^2\right]$$
- **If $a + b + c = 0$:** $a^3 + b^3 + c^3 = 3abc$
- **If $a, b, c$ are consecutive numbers ($d = 1$):** $a^3 + b^3 + c^3 - 3abc = 3(a + b + c)$ (for difference $d$: $3d^2(a + b + c)$!)
- **Value-Putting / Symmetry Trick:** If an equation has 1 condition and 3 variables ($a + b + c = 0$), put $a = 1, b = 1, c = -2$ or $c = 0$ (as long as denominator $\ne 0$).

---

### 12.3 Data Interpretation (DI) Speed Hacks
- **Pie Chart Angle $\leftrightarrow$ %:** $100\% = 360^\circ \implies 1\% = 3.6^\circ$, $5\% = 18^\circ$, $10\% = 36^\circ$, $25\% = 90^\circ$.
- **Don't multiply by Total until the last step!** If asked for ratio or % difference between two sectors, use their **raw % or degrees directly**.
- **Approximation:** Round 4-digit denominators to nearest 2 significant digits when options are $>3\%$ apart.

---

*📌 Revise the special cases ($x^3 = \pm 1,\ x^6 = -1$), Pythagorean triplets, $R:r$ ratios, and $D_2 = P(R/100)^2$ right before your 23 Dec exam — these alone save 5+ minutes in Tier-I!*
