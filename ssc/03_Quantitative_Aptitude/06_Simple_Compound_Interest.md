# 🏦 Simple & Compound Interest — Complete Guide for SSC CHSL

## Table of Contents
1. [Simple Interest](#simple-interest)
2. [Compound Interest](#compound-interest)
3. [Difference Between SI and CI](#difference)
4. [Special Cases](#special-cases)
5. [Tips and Tricks](#tips)
6. [Last 10 Years PYQs](#pyqs)

---

## Simple Interest (SI)

### Formula
```
SI = (P × R × T) / 100

Where:
P = Principal (initial amount)
R = Rate of interest (% per annum)
T = Time (in years)

Amount = P + SI = P(1 + RT/100)
```

### Derived Formulas
```
P = (SI × 100) / (R × T)
R = (SI × 100) / (P × T)
T = (SI × 100) / (P × R)
```

### Examples
```
Q: Find SI on ₹5000 at 8% for 3 years.
SI = (5000 × 8 × 3)/100 = ₹1200

Q: At what rate will ₹2000 become ₹2500 in 5 years?
SI = 2500-2000 = 500
R = (500×100)/(2000×5) = 5%

Q: In how many years will ₹4000 double at 10%?
SI = 4000 (to double, SI = P)
T = (4000×100)/(4000×10) = 10 years
```

### Doubling Time
```
Time to double = 100/R years

At 5% → doubles in 20 years
At 10% → doubles in 10 years
At 12.5% → doubles in 8 years
At 20% → doubles in 5 years
At 25% → doubles in 4 years

Time to become n times = (n-1) × 100/R years
```

---

## Compound Interest (CI)

### Formula
```
Amount = P(1 + R/100)ⁿ
CI = Amount - P = P[(1 + R/100)ⁿ - 1]

Where:
P = Principal
R = Rate % per annum
n = Number of years
```

### When Compounded Half-Yearly
```
Amount = P(1 + R/200)^(2n)
Rate becomes R/2, Time becomes 2n
```

### When Compounded Quarterly
```
Amount = P(1 + R/400)^(4n)
Rate becomes R/4, Time becomes 4n
```

### When Rates Are Different Each Year
```
Amount = P(1 + R₁/100)(1 + R₂/100)(1 + R₃/100)

Example: P=10000, R₁=10%, R₂=20%, R₃=15%
Amount = 10000 × 1.1 × 1.2 × 1.15 = ₹15180
```

### Quick CI Values (MEMORIZE!)
```
At 10% CI:
1 year: Amount = 1.1P,  CI = 0.1P
2 years: Amount = 1.21P, CI = 0.21P
3 years: Amount = 1.331P, CI = 0.331P

At 20% CI:
1 year: Amount = 1.2P,   CI = 0.2P
2 years: Amount = 1.44P,  CI = 0.44P
3 years: Amount = 1.728P, CI = 0.728P

At 5% CI:
1 year: Amount = 1.05P
2 years: Amount = 1.1025P
```

---

## Difference Between SI and CI

### For 2 Years
```
CI - SI = P(R/100)²

Example: P=5000, R=10%, T=2 years
SI = 5000×10×2/100 = 1000
CI = 5000[(1.1)²-1] = 5000×0.21 = 1050
Difference = 1050-1000 = 50

Using formula: 5000×(10/100)² = 5000×0.01 = 50 ✅
```

### For 3 Years
```
CI - SI = P(R/100)² × (3 + R/100)

Example: P=10000, R=10%, T=3 years
CI-SI = 10000×(0.1)²×(3+0.1) = 10000×0.01×3.1 = 310
```

---

## Special Cases

### When Amount Becomes n Times
```
CI: P(1+R/100)^T = nP → (1+R/100)^T = n

If amount doubles in T years, it will:
- Become 4 times in 2T years
- Become 8 times in 3T years
- Become 16 times in 4T years
- Become 2^k times in kT years
```

### Population Growth/Depreciation
```
Growth: P_final = P_initial(1 + R/100)^n
Depreciation: P_final = P_initial(1 - R/100)^n

Example: Machine worth ₹100000 depreciates 10% yearly. Value after 3 years?
= 100000(1-0.1)³ = 100000(0.9)³ = 100000×0.729 = ₹72900
```

### Installment Problems
```
If a sum P is to be paid in n equal annual installments of ₹x each at R%:

For SI: P = nx - [n(n-1)/2] × xR/100

For CI: P = x/(1+R/100) + x/(1+R/100)² + ... + x/(1+R/100)ⁿ
```

---

## Tips and Tricks

### ⚡ Quick Shortcuts
```
1. CI for 2 years at R%: First year interest = PR/100
   Second year interest = First year interest + (First year interest × R/100)
   CI = Sum of both years' interest

2. SI is SAME every year: Each year's interest = PR/100

3. CI-SI for 2 years = PR²/100² (quick formula)

4. Rule of 72: Money doubles in approximately 72/R years at CI
   At 12%: 72/12 = 6 years (approx)
   At 8%: 72/8 = 9 years (approx)

5. For half-yearly: Halve the rate, double the time
   For quarterly: Quarter the rate, quadruple the time
```

---

## Last 10 Years PYQs

### PYQ 1 — SSC CHSL 2024
**Q.** SI on ₹8000 at 12% for 2.5 years?
- SI = 8000×12×2.5/100 = ₹2400
- Answer: **₹2400** ✅

### PYQ 2 — SSC CHSL 2023
**Q.** CI on ₹10000 at 10% for 2 years?
- A = 10000(1.1)² = 12100; CI = 2100
- Answer: **₹2100** ✅

### PYQ 3 — SSC CHSL 2022
**Q.** Difference between CI and SI for 2 years on ₹5000 at 10%?
- P(R/100)² = 5000(0.01) = 50
- Answer: **₹50** ✅

### PYQ 4 — SSC CHSL 2021
**Q.** In how many years will ₹2000 become ₹2420 at 10% CI?
- 2420/2000 = 1.21 = (1.1)² → 2 years
- Answer: **2 years** ✅

### PYQ 5 — SSC CHSL 2020
**Q.** At what rate SI will ₹3000 become ₹4500 in 5 years?
- SI=1500; R=(1500×100)/(3000×5)=10%
- Answer: **10%** ✅

---

> **Final Tip:** For SI, remember P×R×T/100. For CI, use the multiplier (1+R/100)ⁿ. CI-SI for 2 years = PR²/10000. Rule of 72 is great for quick doubling estimates! 🏦
