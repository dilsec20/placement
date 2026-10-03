# 🕐 Clocks — Complete Guide for SSC CHSL

## Table of Contents
1. [Introduction](#introduction)
2. [Clock Basics](#clock-basics)
3. [Angle Between Hands](#angle-between-hands)
4. [Coincidence and Overlap](#coincidence)
5. [Mirror and Water Image of Clock](#mirror-clock)
6. [Faulty Clock Problems](#faulty-clock)
7. [Tips and Tricks](#tips-and-tricks)
8. [Last 10 Years PYQs](#last-10-years-pyqs)

---

## Introduction

Clock problems test your understanding of the relationship between the hour and minute hands. The key concept is the **angle between the two hands** at any given time.

**Weightage in SSC CHSL Tier 1:** 1-2 questions

---

## Clock Basics

### Speed of Clock Hands
```
Minute Hand:
- Completes one full rotation (360°) in 60 minutes
- Speed = 360° ÷ 60 = 6° per minute
- Moves 12 times faster than hour hand

Hour Hand:
- Completes one full rotation (360°) in 12 hours = 720 minutes
- Speed = 360° ÷ 720 = 0.5° per minute
- In 1 hour, moves 30° (360° ÷ 12)

Relative Speed:
- Minute hand gains over hour hand = 6° - 0.5° = 5.5° per minute
- In 1 hour, minute hand gains 330° over hour hand
```

### Positions at Standard Times
```
At 12:00 → Both hands at 12 → Angle = 0°
At 3:00 → Hour at 3, Minute at 12 → Angle = 90°
At 6:00 → Hour at 6, Minute at 12 → Angle = 180°
At 9:00 → Hour at 9, Minute at 12 → Angle = 90° (or 270°)
```

---

## Angle Between Hands

### Master Formula
```
Angle = |30H - 5.5M|

Where:
H = Hour (use 12-hour format)
M = Minutes

If result > 180°, subtract from 360° to get the smaller angle.
```

### Examples

#### Example 1: Find angle at 3:30
```
H = 3, M = 30
Angle = |30(3) - 5.5(30)| = |90 - 165| = |-75| = 75°
Answer: 75°
```

#### Example 2: Find angle at 7:20
```
H = 7, M = 20
Angle = |30(7) - 5.5(20)| = |210 - 110| = 100°
Answer: 100°
```

#### Example 3: Find angle at 4:45
```
H = 4, M = 45
Angle = |30(4) - 5.5(45)| = |120 - 247.5| = |-127.5| = 127.5°
Answer: 127.5°
```

#### Example 4: Find angle at 12:30
```
H = 12, M = 30
Angle = |30(12) - 5.5(30)| = |360 - 165| = 195°
Since 195° > 180°, smaller angle = 360° - 195° = 165°
Answer: 165°
```

### Quick Reference — Angles at Common Times
| Time | Angle |
|------|-------|
| 12:00 | 0° |
| 1:00 | 30° |
| 2:00 | 60° |
| 3:00 | 90° |
| 4:00 | 120° |
| 5:00 | 150° |
| 6:00 | 180° |
| 7:00 | 150° |
| 8:00 | 120° |
| 9:00 | 90° |
| 10:00 | 60° |
| 11:00 | 30° |
| 3:30 | 75° |
| 6:30 | 15° |
| 9:30 | 105° |

---

## Coincidence and Special Positions

### When do hands coincide (overlap at 0°)?
```
Hands coincide when angle = 0°
30H - 5.5M = 0 → M = (30H)/5.5 = 60H/11

Coincidence times:
12:00:00
1:05:27
2:10:54
3:16:22
4:21:49
5:27:16
6:32:44
7:38:11
8:43:38
9:49:05
10:54:33

Total: 11 times in 12 hours (NOT 12, because 11 and 12 coincidence is at 12:00)
In 24 hours: 22 times
```

### When are hands at right angles (90°)?
```
30H - 5.5M = ±90°

In 12 hours: 22 times
In 24 hours: 44 times
```

### When are hands in straight line (180°)?
```
30H - 5.5M = 180°

In 12 hours: 11 times
In 24 hours: 22 times
```

### When are hands at straight line (0° or 180°)?
```
In 12 hours: 11 + 11 = 22 times
In 24 hours: 44 times
```

### Summary Table
| Position | In 12 hours | In 24 hours |
|----------|-------------|-------------|
| Coincide (0°) | 11 | 22 |
| Right angle (90°) | 22 | 44 |
| Straight line (180°) | 11 | 22 |
| At right angle or straight line | 33 | 66 |

---

## Mirror Image of Clock

### Rule: Subtract from 12:00 (or 11:60)
```
Mirror time = 12:00 - Actual time

If actual time = 3:15
Mirror time = 12:00 - 3:15 = 8:45

If actual time = 7:40
Mirror time = 11:60 - 7:40 = 4:20

If actual time = 10:25
Mirror time = 11:60 - 10:25 = 1:35
```

### Why 11:60?
```
12:00 = 11 hours 60 minutes (for easier subtraction)
When minutes in actual time > 0, use 11:60
When minutes = 0, use 12:00

Example:
5:00 → Mirror = 12:00 - 5:00 = 7:00
5:20 → Mirror = 11:60 - 5:20 = 6:40
```

### Quick Reference
| Actual Time | Mirror Image |
|-------------|-------------|
| 1:00 | 11:00 |
| 2:00 | 10:00 |
| 3:00 | 9:00 |
| 4:00 | 8:00 |
| 5:00 | 7:00 |
| 6:00 | 6:00 |
| 3:30 | 8:30 |
| 7:15 | 4:45 |
| 10:40 | 1:20 |
| 2:50 | 9:10 |

---

## Water Image of Clock

### Rule: Subtract from 6:00 (or 5:60)
```
Water image time = 6:00 - Actual time (if result is positive)
                 = 6:00 + (12:00 - Actual time) = 18:00 - Actual time (if negative)

Simpler approach: 
Water image = 18:00 - Actual time (then convert to 12-hour)

Example:
Actual = 3:00 → Water = 18:00 - 3:00 = 15:00 = 3:00
Actual = 9:00 → Water = 18:00 - 9:00 = 9:00
Actual = 2:30 → Water = 17:60 - 2:30 = 15:30 = 3:30
Actual = 8:15 → Water = 17:60 - 8:15 = 9:45
```

---

## Faulty/Gaining/Losing Clock

### Gaining Clock (Runs Fast)
```
A clock that gains x minutes per hour runs FASTER than normal.
In 1 hour, it shows 60+x minutes.

Example: A clock gains 5 minutes every hour.
After 12 real hours, it shows: 12 × (60+5)/60 = 12 × 65/60 = 13 hours
It will show 1:00 PM when actual time is 12:00 PM.
```

### Losing Clock (Runs Slow)
```
A clock that loses x minutes per hour runs SLOWER than normal.
In 1 hour, it shows 60-x minutes.

Example: A clock loses 5 minutes every hour.
After 12 real hours, it shows: 12 × (60-5)/60 = 12 × 55/60 = 11 hours
It shows 11:00 when actual time is 12:00.
```

### When Will a Faulty Clock Show Correct Time?
```
A clock that gains/loses x minutes per day will show correct time when
it has gained/lost exactly 12 hours (720 minutes).

Time to show correct time = 720/x days

Example: Clock gains 10 minutes per day.
Correct time after = 720/10 = 72 days
```

---

## Tips and Tricks

### ⚡ Quick-Solving Strategy
1. **For angles:** Use formula |30H - 5.5M| directly
2. **For mirror image:** Subtract from 11:60 (or 12:00)
3. **For coincidence:** Remember 11 times in 12 hours
4. **For right angles:** 22 times in 12 hours
5. **For faulty clocks:** Calculate gain/loss per unit time

### 🎯 Common Traps
1. **Angle > 180°** → Subtract from 360° for smaller angle
2. **At 12:00**, the angle is **0°** (not 360°)
3. **Mirror image confusion** → Use 11:60, not 12:00 for subtraction
4. **Hands coincide 11 times** in 12 hours (NOT 12)
5. **Right angles = 22 times** (NOT 24)

### 🧠 Memory Tips
```
Quick formula: Angle = |30H - 5.5M|
Mirror: 11:60 - time
Coincidence: 11 times/12 hours
Right angle: 22 times/12 hours
Straight line: 11 times/12 hours
Minute hand speed: 6°/min
Hour hand speed: 0.5°/min
Relative speed: 5.5°/min
```

---

## Last 10 Years PYQs

### PYQ 1 — SSC CHSL 2024
**Q.** What is the angle between the hands at 3:30?
- |30(3) - 5.5(30)| = |90 - 165| = 75°
- Answer: **75°** ✅

### PYQ 2 — SSC CHSL 2024
**Q.** At what time between 4 and 5 do the hands coincide?
- 30(4) - 5.5M = 0 → 120 = 5.5M → M = 120/5.5 = 21.8 ≈ 21 minutes 49 seconds
- Answer: **4:21:49** (approximately 4:22) ✅

### PYQ 3 — SSC CHSL 2023
**Q.** What is the angle at 7:20?
- |30(7) - 5.5(20)| = |210 - 110| = 100°
- Answer: **100°** ✅

### PYQ 4 — SSC CHSL 2023
**Q.** A clock shows 8:20. What time does the mirror show?
- Mirror = 11:60 - 8:20 = 3:40
- Answer: **3:40** ✅

### PYQ 5 — SSC CHSL 2022
**Q.** How many times do clock hands coincide in 24 hours?
- Answer: **22 times** ✅

### PYQ 6 — SSC CHSL 2022
**Q.** What is the angle at 5:15?
- |30(5) - 5.5(15)| = |150 - 82.5| = 67.5°
- Answer: **67.5°** ✅

### PYQ 7 — SSC CHSL 2021
**Q.** At what angle are the hands at 6:00?
- |30(6) - 5.5(0)| = |180 - 0| = 180°
- Answer: **180°** ✅

### PYQ 8 — SSC CHSL 2021
**Q.** A clock shows 2:50. Mirror image time?
- Mirror = 11:60 - 2:50 = 9:10
- Answer: **9:10** ✅

### PYQ 9 — SSC CHSL 2020
**Q.** What is the angle at 4:40?
- |30(4) - 5.5(40)| = |120 - 220| = 100°
- Answer: **100°** ✅

### PYQ 10 — SSC CHSL 2020
**Q.** How many times are hands at right angles in 12 hours?
- Answer: **22 times** ✅

### PYQ 11 — SSC CHSL 2019
**Q.** What is the angle at 8:30?
- |30(8) - 5.5(30)| = |240 - 165| = 75°
- Answer: **75°** ✅

### PYQ 12 — SSC CHSL 2019
**Q.** A clock gains 5 minutes every hour. If set right at 12:00, what does it show at 6:00 PM?
- In 6 hours, gains 6 × 5 = 30 minutes
- Shows: 6:30 PM
- Answer: **6:30 PM** ✅

### PYQ 13 — SSC CHSL 2018
**Q.** What is the angle at 9:15?
- |30(9) - 5.5(15)| = |270 - 82.5| = 187.5° → 360 - 187.5 = 172.5°
- Answer: **172.5°** ✅

### PYQ 14 — SSC CHSL 2018
**Q.** When between 3 and 4 are the hands at right angles?
- |30(3) - 5.5M| = 90 → 90 - 5.5M = ±90
- Case 1: 90 - 5.5M = 90 → M = 0 (not between 3 and 4 if M=0 means 3:00)
- Case 2: 90 - 5.5M = -90 → 5.5M = 180 → M = 32.7 ≈ 32 min 44 sec
- Answer: **3:32:44** ✅

### PYQ 15 — SSC CHSL 2017
**Q.** What is the angle at 2:20?
- |30(2) - 5.5(20)| = |60 - 110| = 50°
- Answer: **50°** ✅

### PYQ 16 — SSC CHSL 2017
**Q.** Clock shows 10:25. Mirror image?
- Mirror = 11:60 - 10:25 = 1:35
- Answer: **1:35** ✅

### PYQ 17 — SSC CHSL 2016
**Q.** At what time between 5 and 6 are hands at 180°?
- |30(5) - 5.5M| = 180 → 150 - 5.5M = ±180
- Case 1: 150 - 5.5M = 180 → M = -30/5.5 (negative, invalid)
- Case 2: 150 - 5.5M = -180 → 5.5M = 330 → M = 60 (means 6:00, not between 5-6)
- Answer: **No time between 5-6** when hands are exactly at 180° (they can't achieve it in this interval) — this is a tricky question!

### PYQ 18 — SSC CHSL 2016
**Q.** Clock loses 6 minutes every hour. After how many hours will it show correct time again?
- Loses 6 min/hour → loses 6×24 = 144 min/day
- Needs to lose 12 hours = 720 min
- Days = 720/144 = 5 days → Hours = 120 hours
- Answer: **120 hours / 5 days** ✅

### PYQ 19 — SSC CHSL 2015
**Q.** What is the angle at 3:00?
- |30(3) - 5.5(0)| = 90°
- Answer: **90°** ✅

### PYQ 20 — SSC CHSL 2015
**Q.** How many times in a day (24h) are the hands in a straight line?
- 0° (coincide): 22 times; 180° (opposite): 22 times
- Total straight line: 44 times
- Answer: **44 times** ✅

---

> **Final Tip:** Memorize the formula |30H - 5.5M| — it solves 80% of clock problems instantly! For mirror image, always use 11:60 - time. Remember: 11 coincidences and 22 right angles in 12 hours! 🕐
