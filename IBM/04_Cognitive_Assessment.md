# 🧠 IBM Cognitive Ability Assessment (Cognify) — Master Guide

> **Everything You Need to Know About the IBM Gamified Cognitive Assessment Suite**  
> **Rules, Mechanics, Scoring Traps, and Winning Strategies for all 5 Mini-Games: Shortcuts, Grid Challenge, Resemble, Numbubbles, and Tally Up.**

---

## 🎯 1. Overview of IBM Cognify

In modern on-campus recruitment drives, IBM uses **Cognify** — an interactive, AI-evaluated gamified assessment suite. Instead of traditional multiple-choice aptitude tests, you are presented with mini-games measuring:
- **Spatial Reasoning & Mental Rotation**
- **Working Memory & Executive Planning**
- **Processing Speed & Agility**
- **Quantitative Intuition & Rapid Decision-Making**

```
┌────────────────────────────────────────────────────────────────────────┐
│                        IBM COGNIFY MINI-GAMES                          │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Shortcuts       : Spatial pathfinding, maze navigation & obstacle avoidance
│ 2. Grid Challenge  : Spatial memory, symmetry detection & pattern matching
│ 3. Resemble        : Mental rotation (90°, 180°, 270°) of 2D shapes
│ 4. Numbubbles      : Speed arithmetic & value threshold bubble-popping
│ 5. Tally Up        : Quantitative comparison & token balance estimation
└────────────────────────────────────────────────────────────────────────┘
```

**Assessment Duration:** ~25 to 30 minutes in total.  
**Proctoring:** Proctored via webcam. Do not switch tabs.

---

## 🎮 2. Mini-Game Deep-Dives & Strategies

---

### 🕹️ Game 1: Shortcuts (Maze Pathfinding)

#### What It Is
You are presented with a grid containing a starting token (blue marble), static obstacles (walls/blocks), and a target starred destination. Your objective is to move the marble to the target location in the **minimum possible number of moves**.

```
  [Start] ──► [Wall] ──► [Empty]
     │                      │
  [Empty] ──► [Empty] ──► [Target ⭐️]
```

#### Scoring Mechanics
- Points are awarded based on **Move Efficiency** (solving in optimal steps vs. taking unnecessary detours) and **Speed**.
- Making incorrect moves and spamming clicks heavily penalizes your score.

#### 💡 Winning Strategies
1. **The "Backward Induction" Technique:** Instead of looking forward from the start marble, look at the **target star** first. Identify which 2–3 cells immediately lead into the target, then trace backwards to the start.
2. **Pause 3 Seconds Before the First Click:** Take 3–5 seconds to plan the complete trajectory in your mind. A single deliberate, optimal path is worth 3x more points than a fast trial-and-error path.
3. **Watch Out for Slippery Ice/One-Way Tiles:** In higher levels, some tiles cause the token to slide all the way until it hits a wall. Plan your trajectory to use walls as braking stoppers!

---

### 🧩 Game 2: Grid Challenge / Gridlock (Spatial Memory & Symmetry)

#### What It Is
This game alternates between two cognitive tasks:
1. **Memory Task:** A grid briefly highlights a sequence of dots or shapes (e.g., 3–5 dots light up one by one).
2. **Interference Task:** Immediately after, a shape is presented and you must quickly answer: *"Is this shape symmetrical along the vertical axis?"* (Yes/No).
3. **Recall Task:** Finally, you must click on the original grid to recall the exact locations and order of the highlighted dots.

#### Scoring Mechanics
- Measures **Working Memory Capacity** under cognitive interference.
- Accuracy on both the symmetry question and the dot recall is evaluated.

#### 💡 Winning Strategies
1. **Chunking & Visual Anchoring:** Do not memorize coordinates as numbers (`(2,3), (1,4)`). Instead, visualize the dots as a connecting constellation or geometric shape (e.g., a "triangle", "L-shape", or "diagonal arrow").
2. **Fast Symmetry Heuristic:** Look solely at the outer extremities of the shape. If the leftmost protrusion does not mirror the rightmost protrusion, click "No" immediately. Don't waste time scanning the center.
3. **Maintain Steady Breathing:** The rapid switching between symmetry and recall is designed to induce cognitive fatigue. Focus calmly on one trial at a time.

---

### 🔄 Game 3: Resemble (Mental Rotation)

#### What It Is
The screen displays an asymmetrical figure on the left composed of connected geometric blocks or colored quadrants. Beside it is a stated rotation instruction (e.g., $90^\circ\text{ Clockwise}$, $180^\circ$, or $270^\circ\text{ Counter-Clockwise}$). 

On the right side, you must either select the matching rotated shape from 4 options or rotate the shape interactively to recreate it.

```
Original:                Instruction:             Candidate Match:
  ┌──┬──┐                                            ┌──┬──┐
  │⬛│  │                  Rotate 90°                │  │⬛│
  ├──┼──┤                 Clockwise                  ├──┼──┤
  │  │  │                                            │  │  │
  └──┴──┘                                            └──┴──┘
```

#### 💡 Winning Strategies: The Single Anchor Method
Never try to mentally rotate the entire complex shape at once!
1. **Pick One Distinct Anchor Feature:** Choose the single most unique quadrant (e.g., the only black square, or the sharpest protrusion).
2. **Apply the Degree Transform to the Anchor Alone:**
   - **$90^\circ$ Clockwise:** Top-Left moves to Top-Right. Top-Right moves to Bottom-Right.
   - **$180^\circ$:** Top-Left flips to Bottom-Right. Everything moves to the exact opposite corner.
   - **$270^\circ$ Clockwise ($90^\circ$ Counter-Clockwise):** Top-Left moves to Bottom-Left.
3. **Instantly Eliminate 3 Choices:** Looking only at your single anchor will immediately eliminate 2–3 options. Only check a second feature if two candidates share the same anchor position.

---

### 🫧 Game 4: Numbubbles (Rapid Mental Math)

#### What It Is
Bubbles containing simple arithmetic expressions ($7 \times 8$, $64 / 4$, $85 - 29$, $13 + 38$) float upward from the bottom of the screen. At the bottom, a target threshold is displayed (e.g., *"Pop all bubbles greater than 45"* or *"Pop bubbles equal to 36"*).

You must pop the qualifying bubbles before they exit the top boundary.

#### 💡 Winning Strategies
1. **Order of Magnitude Estimation:** If the target is $> 45$, look at expressions like $7 \times 8 = 56$ (obviously in) and $4 \times 9 = 36$ (obviously out). You don't need exact answers for extreme values!
2. **Prioritize Slower Floating Bubbles First:** Bubbles float at slightly varying speeds. Clear the ones closest to the top margin first to prevent expiration penalties.
3. **Never Randomly Guess:** Popping a bubble that fails the condition deducts points. If unsure of an expression's exact value, let it pass rather than incurring a negative penalty.

---

### ⚖️ Game 5: Tally Up (Quantitative Comparison)

#### What It Is
Two panels (Left and Right) display tokens with numbers or groups of colored dots representing values. You are given a tight time limit (2–3 seconds per trial) to press:
- `Left > Right`
- `Right > Left`
- `Left == Right`

#### 💡 Winning Strategies: The Cancellation Technique
Do not calculate the total sum of each side from scratch!
1. **Cancel Identical Pairs:** If both sides have a token of value 5, ignore both.
2. **Group into 10s:** Group smaller values into tens rapidly ($7+3=10$, $6+4=10$).
3. **Evaluate Residual Difference:** Only compute the remaining difference between the two sides. If Left has an extra $8$ and Right has an extra $5+2=7$, Left is instantly greater.

---

## 📊 3. Performance Benchmarks & Scoring Rubric

| Mini-Game | Core Skill Evaluated | Target Speed | Target Accuracy |
|---|---|---|---|
| **Shortcuts** | Spatial Planning | < 6s per level | 100% optimal paths |
| **Grid Challenge** | Working Memory | < 3s per symmetry check | $\ge 85\%$ dot recall |
| **Resemble** | Mental Rotation | < 4s per item | $\ge 90\%$ accuracy |
| **Numbubbles** | Mental Arithmetic | Constant steady popping | $\le 1$ miss/penalty |
| **Tally Up** | Quantitative Deduction | < 2s per decision | $\ge 90\%$ accuracy |

---

## ⚠️ 4. Essential Dos and Don'ts

### ✅ Dos
- **Use a Physical Mouse:** Trying to play *Shortcuts* or *Grid Challenge* with a laptop trackpad creates physical lag. An external mouse increases navigation speed significantly.
- **Warm Up Your Brain:** Solve 5–10 mental math problems or play a free online rotation puzzle 15 minutes before the test to prime your neural reflexes.
- **Maintain High Accuracy:** Cognify algorithms prioritize accuracy over reckless speed. A candidate with 20 correct answers and 0 errors scores higher than one with 25 attempts and 6 errors.

### ❌ Don'ts
- **Don't Spam-Click:** In games like *Shortcuts*, extra clicks lower your efficiency score.
- **Don't Panic If Levels Get Harder:** The game is adaptive. If puzzles become noticeably more difficult, it means you are scoring in the top percentile!
