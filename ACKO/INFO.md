# 📘 ACKO Buildathon Master Strategy & AI Prompting Playbook (`INFO.md`)

> **Drive:** ACKO General Insurance (TC.AC17009.2027.65056)  
> **Package:** ₹40,000/mo Stipend ➔ **CTC ₹19.80 LPA** (₹18.00 LPA Fixed + 10% Variable)  
> **Author:** Dilip Kumar (CSE, LPU)  
> **Dates:** November 18 & 19, 2026

---

## 🧭 Executive Summary: What ACKO is Actually Testing

ACKO's student guide states explicitly:
> *"The skill that matters now is not typing code. It is understanding a problem, deciding what to build, directing an AI tool well, checking its work, and owning the result."*

ACKO **wants** you to use AI, but they will disqualify anyone who does **"vibe coding"** (pasting the entire problem into an AI and blindly accepting the output). 

This guide gives you the exact blueprint: **what you do manually**, **what you delegate to AI**, **how to prompt AI step-by-step**, and **how to defend your work on Day 2**.

---

## ⚖️ Part 1: Division of Work (Manual vs. AI)

To ensure your submission looks like it was designed by a Senior Engineer rather than an AI chatbot, follow this strict division:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        HUMAN (YOU) vs. AI CODING TOOL DIVISION                         │
└────────────────────────────────────────────────────────────────────────────────────────┘

  YOU DO MANUALLY (100% Human Judgment)        DELEGATE TO AI (Execution & Scaffolding)
  ──────────────────────────────────────        ───────────────────────────────────────
  1. Ask Product Owner questions on chat        1. Scaffolding project directory & files
  2. Decide what to LEAVE OUT (scope cuts)      2. Drafting boilerplate CRUD endpoints
  3. Design data models & system contracts      3. Writing 15+ automated unit/API tests
  4. Write PLAN.md and DECISIONS.md             4. Generating regex & parsing algorithms
  5. Review AI code line-by-line                5. Writing Dockerfile & docker-compose.yml
  6. Catch & correct AI mistakes                6. Polishing HTML/CSS for the dashboard UI
  7. Oral defense & live demo on Day 2          7. Creating realistic mock test datasets
```

---

## ⏱️ Part 2: The 6-Hour Timeline & Checkpoint Strategy

There are **4 strict checkpoints** throughout the 6-hour buildathon. Plan your day around them:

```
[0:00 - 0:15] 1. Choose Problem: Read both options, pick ONE (cannot switch).
[0:15 - 1:15] 2. Discovery & Planning: Ask PO questions, write PLAN.md.
              🔴 CHECKPOINT 1 (01:15): Submit PLAN.md!
[1:15 - 3:30] 3. Core Engine Build: Commit working core + progress note.
              🔴 CHECKPOINT 2 (03:30): Commit code & progress note!
[3:30 - 5:30] 4. Testing & Metrics: Write 10+ automated tests, add usage metrics.
              🔴 Commit at least every 45 minutes!
[5:30 - 6:00] 5. Wrap-Up & Transcripts: Write README.md, REVIEW.md, export transcripts.
              🔴 FINAL SUBMISSION (06:00): Push entire Git repository!
```

---

## 💬 Part 3: The "Anti-Vibe-Coding" AI Prompting Playbook

### ❌ The Amateur Mistake (Instant Rejection)
* **Bad Prompt:** *"Here is the ACKO problem statement: [paste 3 pages of PDF]. Write the complete full-stack app in Node.js."*
* **Why it fails:** The AI produces a bloated, 800-line monolithic script with subtle logic errors, missing edge cases, zero tests, and code you cannot explain.

---

### ✅ The 5-Stage Professional Prompt Chain

Direct the AI in small, disciplined iterations just like an Engineering Lead directs a Junior Developer:

#### Stage 1: Architecture & Directory Scaffolding (No Code Yet!)
```text
PROMPT 1:
"I am building a high-scale service for ACKO's platform engineering team. 
The problem statement is: [Brief 2-sentence summary of the problem].
Do NOT write any implementation code yet. 
Help me design a clean, modular project directory structure in Node.js (ES modules). 
Follow the Single Responsibility Principle: separate routing, business logic, storage, and tests. 
Also list what npm dependencies we will need."
```

#### Stage 2: Data Models & Interfaces
```text
PROMPT 2:
"Now write the data model in src/types.js (or JSDoc). 
Define the core entity [e.g. FeatureFlag] with fields: key, description, is_enabled, rollout_percentage, is_archived, created_at, updated_at.
Enforce that key must match regex /^[a-z0-9-]{3,50}$/.
Include clean comments explaining each field."
```

#### Stage 3: Core Algorithm / Business Logic
```text
PROMPT 3:
"Write src/engine.js containing the evaluation function. 
Requirements:
1. Use Node.js built-in crypto module to compute SHA-256 hash of `${flagKey}:${userId}` mapped to modulo 100.
2. If flag is missing or archived, return { is_enabled: false, reason: 'unknown flag' }.
3. If flag is disabled, return { is_enabled: false, reason: 'flag off' }.
4. If rollout is 0%, return { is_enabled: false, reason: 'user not in rollout' }.
5. If rollout is 100%, return { is_enabled: true, reason: 'user in rollout' }.
Keep this file pure logic with zero external dependencies so it evaluates in under 2ms."
```

#### Stage 4: Comprehensive Unit & Edge-Case Tests (The Differentiator!)
```text
PROMPT 4:
"Write comprehensive tests in tests/engine.test.js using Node.js native test runner (node:test and node:assert).
Cover these critical edge cases:
- Determinism: Calling evaluate 100 times for the same user returns the exact same result.
- Monotonicity: Increasing rollout from 20% to 40% never turns off a user who was already ON at 20%.
- Independence: Two distinct flags at 20% do NOT enable the exact same users.
- Boundaries: 0% enables 0 users; 100% enables all users.
- Missing/Archived flags never throw an exception."
```

#### Stage 5: Containerization & Packaging
```text
PROMPT 5:
"Write a multi-stage Dockerfile using node:20-slim. 
Run the application as a non-root user (USER node) for container security. 
Also write a docker-compose.yml exposing port 7001 with volume mounts for persistent data."
```

---

## 📁 Part 4: The 4 Required Deliverable Documents (Templates)

Your Git repository MUST contain these 4 markdown files alongside your code:

### 1. `PLAN.md` (Submitted at Checkpoint 1 - 01:15)
* **Problem in your own words:** Explain what pain the company has and why this tool solves it.
* **Product Owner Q&A:** List the questions you asked the PO on chat and the answers you received.
* **Scope boundaries:** Explicitly list what is **IN SCOPE** (must-haves) vs what is **OUT OF SCOPE** (e.g. multi-tenancy, complex RBAC).
* **System sketch & Data model:** Text diagram of components and tables.
* **Test Plan & Metrics:** What you will test and how you measure latency.

### 2. `DECISIONS.md` (Updated while you work, with timestamps)
Record every major technical choice you made:
```markdown
* **1:30 PM - Consistent Hashing:** Chose SHA-256 modulo 100 over MurmurHash3 to avoid native C++ build dependencies in Docker.
* **2:15 PM - Soft Deletes:** Decided to archive flags rather than purge rows so audit history remains intact.
* **3:00 PM - Error Strategy:** Downstream apps calling missing flags receive `is_enabled: false` (HTTP 200) rather than HTTP 404, preventing cascading microservice failures.
```

### 3. `REVIEW.md` (Written between 5:30 and 6:00 PM)
* **What works:** List all completed and verified features.
* **What doesn't / Limitations:** Be 100% honest! (e.g. *"Currently runs as a single instance; multi-instance deployment requires distributed Redis locking"*).
* **What the AI got wrong & How I caught it (⭐ The Winning Section):**  
  *Example:* *"The AI initially hashed only `userId`, which caused two different 10% flags to target the exact same 10% of users. I caught this during unit testing and salted the hash with `flagKey + ':' + userId` to ensure independent cohorts."*
* **What I'd do next:** Next 2 features (e.g. Client SDK with local memory caching, Prometheus metrics exporter).

### 4. `transcripts/` Folder (Mandatory!)
* Create a folder named `transcripts/` in your repository.
* Copy your exported AI coding sessions and your Product Owner chat transcript into this folder before pushing at 6:00 PM.

---

## 🌿 Part 5: Git Commit Cadence (Do Not Make 1 Giant Commit!)

ACKO evaluators inspect your commit history. Make commits every **30 to 45 minutes**:

```bash
# Recommended Commit Progression:
git commit -m "docs: checkpoint 1 plan and system architecture"
git commit -m "feat: core data models and flag validation logic"
git commit -m "feat: evaluation engine with SHA-256 consistent hashing"
git commit -m "test: add 10 unit tests for monotonicity and hashing"
git commit -m "feat: add Express REST API and audit history logging"
git commit -m "feat: add interactive operational web dashboard"
git commit -m "chore: add multi-stage Dockerfile and docker-compose.yml"
git commit -m "docs: add decisions log, self-review, and AI transcripts"
```

---

## 🎤 Part 6: How to Ace the Day 2 Technical Demo & Defense

On November 19, you will present your product to an ACKO Engineering Leader. Here is how to handle the 30-minute session:

### 1. The 2-Minute Elevator Pitch
> *"I built Flagship, a high-throughput feature flag and percentage rollout service. It allows ACKO teams to decouple code deployments from feature releases and safely ramp traffic from 0% to 100% using consistent hashing. I focused heavily on production reliability: zero-downtime evaluation, immutable audit trails with caller identity, sub-2ms latency, and 100% test coverage."*

### 2. How to Handle the "Small Live Change" Request
The evaluators will ask you to make a small live change using your AI tool (e.g. *"Add an optional environment variable `EVAL_TIMEOUT_MS`"* or *"Add a new field `owner_email` to flags"*).

**How to do it smoothly:**
1. Do not panic. Read the request carefully.
2. Prompt your AI: *"Add a configuration option `EVAL_TIMEOUT_MS` that defaults to 50ms if unset. Update src/server.js and write 1 unit test verifying it."*
3. Review the code the AI gives you, run `npm test` to prove nothing broke, and demo it to the panel!

---

## 💻 Part 7: Quick Reference to Your Verified Laptop Setup

Your laptop has already been configured and verified. Keep these commands handy:

| Task | Command |
|---|---|
| **Start Docker in WSL** | `wsl -u root -e service docker start` |
| **Check Docker Status** | `wsl -e docker ps` |
| **Run Setup Script** | `wsl -e bash -c "cd /mnt/c/Users/Dilip/Desktop/Placement/ACKOo && bash setup-check.sh"` |
| **Run Flagship Tests** | `cd c:\Users\Dilip\Desktop\Placement\ACKOo\practice_exercise_flagship && npm test` |
| **Start Flagship UI** | `npm start` ➔ Visit `http://localhost:7001` |
| **Run via Docker Compose** | `docker compose up --build` |
| **Your Setup Report** | [setup-report.txt](file:///c:/Users/Dilip/Desktop/Placement/ACKOo/setup-report.txt) (`RESULT: READY`) |
