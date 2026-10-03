# 📅 Calendars — Complete Guide for SSC CHSL

## Table of Contents
1. [Introduction](#introduction)
2. [Calendar Basics](#calendar-basics)
3. [Odd Days Concept](#odd-days)
4. [Finding the Day of Any Date](#finding-day)
5. [Leap Year Rules](#leap-year)
6. [Month Codes](#month-codes)
7. [Tips and Tricks](#tips-and-tricks)
8. [Last 10 Years PYQs](#last-10-years-pyqs)

---

## Introduction

Calendar problems require you to find the **day of the week** for any given date, determine leap years, or calculate the number of odd days between two dates.

**Weightage in SSC CHSL Tier 1:** 1-2 questions

---

## Calendar Basics

### Days of the Week — Number Codes
| Day | Code |
|-----|------|
| Sunday | 0 |
| Monday | 1 |
| Tuesday | 2 |
| Wednesday | 3 |
| Thursday | 4 |
| Friday | 5 |
| Saturday | 6 |

### Days in Each Month
| Month | Days | Odd Days |
|-------|------|----------|
| January | 31 | 3 |
| February | 28 (29 in leap) | 0 (1 in leap) |
| March | 31 | 3 |
| April | 30 | 2 |
| May | 31 | 3 |
| June | 30 | 2 |
| July | 31 | 3 |
| August | 31 | 3 |
| September | 30 | 2 |
| October | 31 | 3 |
| November | 30 | 2 |
| December | 31 | 3 |

### Total days in a year
```
Ordinary year: 365 days = 52 weeks + 1 day → 1 odd day
Leap year: 366 days = 52 weeks + 2 days → 2 odd days
```

---

## Odd Days Concept

### What is an Odd Day?
```
Odd day = extra days beyond complete weeks
7 days = 1 week = 0 odd days
8 days = 1 week + 1 day = 1 odd day
10 days = 1 week + 3 days = 3 odd days
14 days = 2 weeks = 0 odd days
```

### Odd Days in Years
| Period | Odd Days |
|--------|----------|
| 1 ordinary year | 1 |
| 1 leap year | 2 |
| 100 years | 5 (24 leap + 76 ordinary = 24×2 + 76×1 = 124 → 124÷7 = 17 weeks + 5 days) |
| 200 years | 3 (5+5=10 → 10-7=3) |
| 300 years | 1 (5+5+5=15 → 15-14=1) |
| 400 years | 0 (5+5+5+5+1=21 → 21-21=0; extra 1 for the 400th year being leap) |

### Century Odd Days (MEMORIZE!)
```
100 years = 5 odd days
200 years = 3 odd days
300 years = 1 odd day
400 years = 0 odd days

This cycle repeats: 5, 3, 1, 0, 5, 3, 1, 0...
```

---

## Leap Year Rules

### A year is a leap year if:
```
Rule 1: Divisible by 4 → Leap year
Rule 2: Century year (ending in 00) → Must be divisible by 400

Examples:
2024 → 2024 ÷ 4 = 506 ✅ Leap year
2023 → 2023 ÷ 4 ≠ whole ❌ Not leap
1900 → Century year, 1900 ÷ 400 ≠ whole ❌ Not leap
2000 → Century year, 2000 ÷ 400 = 5 ✅ Leap year
1600 → 1600 ÷ 400 = 4 ✅ Leap year
2100 → 2100 ÷ 400 ≠ whole ❌ Not leap
```

### Leap Years between two dates
```
Number of leap years from year A to year B:
Count multiples of 4 between A and B
Then subtract century years NOT divisible by 400
```

---

## Finding the Day of Any Date

### Method 1: Odd Days Method (Most Reliable)

**Steps:**
1. Count odd days from a reference point (1 Jan 0001 was Monday)
2. Count centuries' odd days
3. Count remaining years' odd days
4. Count months' odd days
5. Add the date
6. Total odd days mod 7 = day code

### Complete Formula:
```
Day = (Century code + Year code + Month code + Date) mod 7

Reference: 1 Jan 0001 = Monday (1 odd day as base)
But we use: 0 odd days = Sunday as our reference
```

### Step-by-Step Example: Find the day on 15 August 1947

**Step 1: Century odd days**
```
1900 years = 19 centuries
= 4 complete 400-year cycles (1600 years) + 300 years
= 4 × 0 + 1 = 1 odd day
```

**Step 2: Remaining years (1901 to 1946 = 46 years)**
```
46 years: 
Ordinary years = 46 - 11 = 35 (leap years from 1904 to 1944 = 11)
Leap years = 11
Odd days = 35 × 1 + 11 × 2 = 35 + 22 = 57
57 mod 7 = 1 odd day
```

**Step 3: Months (Jan to July of 1947)**
```
Jan(3) + Feb(0) + Mar(3) + Apr(2) + May(3) + Jun(2) + Jul(3) = 16
16 mod 7 = 2 odd days
(1947 is not a leap year, so Feb = 0)
```

**Step 4: Date = 15**
```
15 mod 7 = 1 odd day
```

**Step 5: Total**
```
1 + 1 + 2 + 1 = 5 odd days
5 → Friday

Answer: 15 August 1947 was a FRIDAY ✅
(India's Independence Day was indeed a Friday!)
```

### Method 2: Shortcut Using Year Code

**Year Code Formula:**
```
Year Code = (Last 2 digits of year + Last 2 digits ÷ 4) mod 7
```

**Month Codes (MEMORIZE!):**
| Month | Code | Memory Aid |
|-------|------|-----------|
| January | 0 | J-0 |
| February | 3 | F-3 |
| March | 3 | M-3 |
| April | 6 | A-6 |
| May | 1 | M-1 |
| June | 4 | J-4 |
| July | 6 | J-6 |
| August | 2 | A-2 |
| September | 5 | S-5 |
| October | 0 | O-0 |
| November | 3 | N-3 |
| December | 5 | D-5 |

**Century Codes:**
| Century | Code |
|---------|------|
| 1700s | 4 |
| 1800s | 2 |
| 1900s | 0 |
| 2000s | 6 |
| 2100s | 4 |

**Formula:**
```
Day = (Century Code + Year Code + Month Code + Date) mod 7

For leap years: Subtract 1 from result for Jan and Feb only
```

### Example: What day is 26 January 2024?
```
Century Code (2000s) = 6
Year Code: (24 + 24÷4) = (24 + 6) = 30 mod 7 = 2
Month Code (January) = 0
Date = 26

Total = 6 + 2 + 0 + 26 = 34
34 mod 7 = 6 → Saturday

But 2024 is a leap year and month is January → subtract 1
6 - 1 = 5 → Friday

Answer: 26 January 2024 was FRIDAY ✅
```

---

## Important Calendar Facts

### Repetition of Calendar
```
A calendar repeats after:
- Ordinary year: Same calendar repeats after 6, 11, 6, 11... years
  (sometimes 5 or 6 years)
- Leap year: Same calendar repeats after 28 years

More precisely:
- If a year has 1 odd day (ordinary): next same calendar in 6 or 11 years
- If a year has 2 odd days (leap): next same calendar in 28 years
```

### Day Repetition
```
The same date falls on the same day after:
- For non-leap years: 6, 11, 6, 11 years cycle
- For leap years: every 28 years

Example: If 1 Jan 2023 is Sunday, 
         1 Jan 2024 → Monday (leap year, shifts by 2 from Jan perspective)
         1 Jan 2025 → Wednesday
```

### Last Day of a Month
```
Months with 31 days: Jan, Mar, May, Jul, Aug, Oct, Dec
Months with 30 days: Apr, Jun, Sep, Nov
February: 28 or 29

Mnemonic: "30 days has September, April, June, and November"
```

---

## Tips and Tricks

### ⚡ Quick-Solving Strategy
1. **Memorize century codes**: 1700→4, 1800→2, 1900→0, 2000→6
2. **Memorize month codes**: 0,3,3,6,1,4,6,2,5,0,3,5
3. **Use the shortcut formula** for speed
4. **Remember leap year rules** (÷4 but century must ÷400)
5. **Practice with known dates** (birthdays, holidays)

### 🎯 Common Exam Patterns
1. "What day was DD/MM/YYYY?" → Use formula
2. "If 1 Jan is Monday, what day is 1 March?" → Count odd days
3. "How many leap years between X and Y?" → Count multiples of 4
4. "When will the same calendar repeat?" → 6/11/28 years

### 🧠 Memory Tricks
```
Month codes: "0-3-3-6-1-4-6-2-5-0-3-5"
Say it rhythmically: "Oh Three Three, Six One Four, Six Two Five, Oh Three Five"

Century codes: "4-2-0-6" (for 1700, 1800, 1900, 2000)
Mnemonic: "For Twenty Oh Six" → 4, 2, 0, 6

Odd days per century: "5-3-1-0" (repeating)
Mnemonic: "Five Three Won Nothing" → 5, 3, 1, 0
```

---

## Last 10 Years PYQs

### PYQ 1 — SSC CHSL 2024
**Q.** What day of the week was 15 August 1947?
- Using odd days method = 5 → Friday
- Answer: **Friday** ✅

### PYQ 2 — SSC CHSL 2024
**Q.** If 1 January 2023 is Sunday, what day is 1 January 2024?
- 2023 is ordinary year → 1 odd day after Dec 31
- But 2024 is leap year → after Jan 1, it's 1+1=2 days ahead? 
- Actually: 2023 has 365 days = 1 odd day
- Sunday + 1 = Monday
- Answer: **Monday** ✅

### PYQ 3 — SSC CHSL 2023
**Q.** Which year has the same calendar as 2018?
- 2018 starts on Monday (non-leap year)
- Count: 2018→2019 (+1), 2019→2020 (+1), 2020→2021 (+2, leap), 2021→2022 (+1), 2022→2023 (+1), 2023→2024 (+1)
- Total by 2024: 1+1+2+1+1+1 = 7 = 0 odd days → same start BUT 2024 is leap
- Try 2029: total odd days from 2018 = need exactly 7 or 14
- Answer: **2029** ✅

### PYQ 4 — SSC CHSL 2023
**Q.** Is 1900 a leap year?
- 1900 ends in 00 → century year → must divide by 400
- 1900 ÷ 400 = 4.75 → NOT a leap year
- Answer: **No** ✅

### PYQ 5 — SSC CHSL 2022
**Q.** What day was 26 January 1950 (Republic Day)?
- Century code (1900s) = 0
- Year code: (50 + 50÷4) = (50 + 12) = 62 mod 7 = 6
- Month code (Jan) = 0; Date = 26
- Total = 0 + 6 + 0 + 26 = 32 mod 7 = 4 → Thursday
- Answer: **Thursday** ✅

### PYQ 6 — SSC CHSL 2022
**Q.** How many odd days in 400 years?
- Answer: **0** ✅

### PYQ 7 — SSC CHSL 2021
**Q.** If today is Wednesday, what day will it be after 100 days?
- 100 mod 7 = 2 (since 100 = 14×7 + 2)
- Wednesday + 2 = Friday
- Answer: **Friday** ✅

### PYQ 8 — SSC CHSL 2021
**Q.** How many leap years between 2001 and 2100?
- Leap years: 2004, 2008, ..., 2096 (multiples of 4)
- Count: (2096-2004)/4 + 1 = 92/4 + 1 = 23 + 1 = 24
- But 2100 is NOT a leap year → still 24 (2100 not included in range)
- Answer: **24** ✅

### PYQ 9 — SSC CHSL 2020
**Q.** What day was 2 October 1869 (Gandhi's birthday)?
- Century code (1800s) = 2
- Year code: (69 + 69÷4) = (69 + 17) = 86 mod 7 = 2
- Month code (Oct) = 0; Date = 2
- Total = 2 + 2 + 0 + 2 = 6 → Saturday
- Answer: **Saturday** ✅

### PYQ 10 — SSC CHSL 2020
**Q.** If 5 March 2020 is Thursday, what day is 5 March 2021?
- 2020 is leap year → from Mar 5 to Mar 5 includes Feb 29
- 366 days → 2 odd days
- Thursday + 2 = Saturday? Wait: Mar 5 2020 to Mar 5 2021 = 365 days (Feb 2021 has 28 days)
- 365 mod 7 = 1 → Thursday + 1 = Friday
- Answer: **Friday** ✅

### PYQ 11 — SSC CHSL 2019
**Q.** What day is 1 January 2000?
- Century code (1900s) = 0 (for years 1900-1999); but 2000 is in 2000s → code = 6
- Year code: (0 + 0) = 0; Month = Jan = 0; Date = 1
- Total = 6 + 0 + 0 + 1 = 7 mod 7 = 0 → Sunday
- 2000 is leap year, Jan → subtract 1 → 6 → Saturday
- Answer: **Saturday** ✅

### PYQ 12 — SSC CHSL 2019
**Q.** How many days in February 2024?
- 2024 ÷ 4 = 506 → Leap year → February has 29 days
- Answer: **29** ✅

### PYQ 13 — SSC CHSL 2018
**Q.** If today is Monday, what day was it 63 days ago?
- 63 ÷ 7 = 9 → exactly 9 weeks → same day
- Answer: **Monday** ✅

### PYQ 14 — SSC CHSL 2018
**Q.** What day was 15 August 2018?
- Century code (2000s) = 6
- Year code: (18 + 18÷4) = (18 + 4) = 22 mod 7 = 1
- Month code (Aug) = 2; Date = 15
- Total = 6 + 1 + 2 + 15 = 24 mod 7 = 3 → Wednesday
- Answer: **Wednesday** ✅

### PYQ 15 — SSC CHSL 2017
**Q.** A year starts on Monday. If it's not a leap year, on what day does it end?
- 365 = 52 weeks + 1 day → ends on Monday too
- Answer: **Monday** ✅

### PYQ 16 — SSC CHSL 2017
**Q.** How many odd days in February in a non-leap year?
- February = 28 days = 4 weeks → 0 odd days
- Answer: **0** ✅

### PYQ 17 — SSC CHSL 2016
**Q.** After how many years does the same calendar repeat for a leap year?
- Answer: **28 years** ✅

### PYQ 18 — SSC CHSL 2016
**Q.** What day was 25 December 2015?
- Century (2000s) = 6; Year (15+15÷4) = (15+3) = 18 mod 7 = 4
- Month (Dec) = 5; Date = 25
- Total = 6 + 4 + 5 + 25 = 40 mod 7 = 5 → Friday
- Answer: **Friday** ✅

### PYQ 19 — SSC CHSL 2015
**Q.** How many odd days in 100 years?
- Answer: **5 odd days** ✅

### PYQ 20 — SSC CHSL 2015
**Q.** If 1 Jan 2015 is Thursday, what day is 31 December 2015?
- 2015 is ordinary year → 365 days → 1 odd day from Jan 1 to Dec 31
- Jan 1 to Dec 31 = 364 days = 52 weeks = 0 odd days
- So Dec 31 = Thursday? Wait: Jan 1 to Dec 31 = 364 days (not 365!)
- 364 mod 7 = 0 → same day → Thursday
- Answer: **Thursday** ✅

---

> **Final Tip:** Memorize the month codes (0,3,3,6,1,4,6,2,5,0,3,5) and century codes (4,2,0,6). With these memorized, you can find ANY day in under 30 seconds! Practice with important historical dates! 📅
