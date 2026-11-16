# 🤖 Module 08: The AI-Assisted Buildathon Winning Playbook & Oral Defense

> **Target Stage:** 5–6 Hours Buildathon (Day 1, November 18, 2026)  
> **Key Rule:** **AI Tools (ChatGPT, Claude, Copilot, Cursor) are explicitly allowed!**  
> **Target Package:** ₹19.80 LPA CTC (₹40,000/month Internship Stipend)

---

## ⚡ The Brutal Truth: Why ACKO Allows AI and How You Will Be Evaluated

Many students assume: *"If AI is allowed, everyone will get full marks and it will be easy."*  
**The reality is the exact opposite: It is an aggressive elimination filter.**

```
┌────────────────────────────────────────────────────────────────────────┐
│               WHY ACKO EXPLICITLY ALLOWS AI TOOLS                      │
└────────────────────────────────────────────────────────────────────────┘
  1. At ACKO, real Platform & DevEx engineers use AI daily to ship faster.
  2. ACKO is NOT testing whether you can memorize language syntax.
  3. ACKO is testing whether you can act like a SOFTWARE ARCHITECT:
     • Can you decompose an ambiguous problem into clean modules?
     • Can you guide AI to write safe, maintainable code rather than garbage?
     • Do you enforce rigorous testing discipline (>85% test coverage)?
     • Most importantly: ON NOVEMBER 19, CAN YOU DEFEND EVERY SINGLE LINE?
```

---

## 🚫 The 3 Deadly Traps That Eliminate 85% of Students Using AI

| The Deadly Trap | What Amateurs Do | What Happens in the November 19 Interview |
|---|---|---|
| **Trap 1: The Monolith Prompt** | Prompts ChatGPT: *"Write a complete database migration checker in Python"*. Copies a single 600-line file into `main.py`. | Interviewer asks: *"Why is your rule engine coupled with your CLI parser? How would you add a new rule without modifying the core?"* Candidate stumbles $\to$ **REJECTED**. |
| **Trap 2: The "Ghost Code" Blunder** | AI generates advanced metaprogramming or complex regular expressions with lookaheads. | Interviewer asks: *"Explain line 47 of this regex."* Candidate says *"Uh, ChatGPT gave that to me..."* $\to$ **IMMEDIATE REJECTION**. |
| **Trap 3: Zero Automated Tests** | Candidate writes code, runs it once on their laptop with 1 sample file, and stops. | Platform engineers test edge cases (empty files, binary files, 1GB files, syntax errors). The tool crashes $\to$ **REJECTED**. |

---

## 🏆 The 6-Step "AI-Native Engineering Protocol" to Win

Follow this exact protocol during the 5–6 hours. You will guide AI to build software that looks like a Senior Platform Engineer built it:

```
[HOUR 0:00 - 0:30] Step 1: System Spec & Directory Structure (Modular Architecture)
[HOUR 0:30 - 1:30] Step 2: Implement the Core Domain Engine (Step-by-step modular prompts)
[HOUR 1:30 - 2:45] Step 3: Write Comprehensive Unit Tests with Mocking (>15 tests!)
[HOUR 2:45 - 3:30] Step 4: Polish Developer Experience (Colored CLI, Exit codes 0/1/2)
[HOUR 3:30 - 4:30] Step 5: Containerize (Multi-Stage Dockerfile) & GitHub Actions CI YAML
[HOUR 4:30 - 5:00] Step 6: Write Senior-Grade Documentation (README with architecture diagram)
```

---

### Step 1: Force AI to Generate a Clean Modular Directory Structure

Never write a single-file script. Start your Buildathon with this exact prompt:

```text
PROMPT 1 (Architecture Scaffolding):
"I am building a production-grade CLI tool for a platform engineering team at a high-scale digital insurance company (ACKO). 
The problem is: [PASTE ACKO PROBLEM STATEMENT HERE, e.g. Database Migration Risk Checker].
Before writing any implementation code, design a clean, modular project directory structure in Python (or Go). 
Follow the Single Responsibility Principle: separate CLI parsing, core rule engine, models/types, reporting, and unit tests. 
Also include Dockerfile, requirements.txt, and .github/workflows/ci.yml."
```

#### The Gold Standard Directory Structure to Create:
```
acko-migration-guard/
├── README.md                      # High-impact documentation with architecture
├── requirements.txt               # Pinned dependencies
├── Dockerfile                     # Multi-stage container build
├── .github/
│   └── workflows/
│       └── ci.yml                 # Automated CI check on pull requests
├── src/
│   ├── __init__.py
│   ├── cli.py                     # Command-line interface (argparse / click)
│   ├── models.py                  # Dataclasses (RiskLevel, Violation, MigrationRule)
│   ├── parser.py                  # SQL/Config parser and tokenizer
│   ├── engine.py                  # Evaluates rules against parsed statements
│   └── reporter.py                # Outputs colored terminal tables and Markdown reports
└── tests/
    ├── __init__.py
    ├── test_parser.py             # Tests parsing edge cases
    ├── test_rules.py              # Tests each risk rule individually
    └── test_cli_integration.py    # Tests end-to-end exit codes (0 vs 1)
```

---

### Step 2: Implement Modular Components One-by-One

Never ask AI to write the whole project at once. Prompt it module-by-module so you understand every function:

```text
PROMPT 2 (Core Models & Types):
"Write src/models.py using Python 3.11 dataclasses and Enums. 
Define RiskLevel (CRITICAL, HIGH, MEDIUM, LOW, SAFE). 
Define Violation dataclass containing rule_name, risk_level, line_number, statement, description, and suggested_remediation.
Include clear docstrings and type hints."
```

```text
PROMPT 3 (Engine & Rule Definitions):
"Write src/engine.py. I want a RuleEngine class that accepts SQL statements. 
Define rules as modular classes or functions:
1. Rule: DROP TABLE or DROP COLUMN is CRITICAL risk.
2. Rule: ADD COLUMN NOT NULL without DEFAULT is HIGH risk (locks PostgreSQL tables).
3. Rule: CREATE INDEX without CONCURRENTLY is MEDIUM risk (causes table write lock).
4. Rule: TRUNCATE is CRITICAL risk.
Ensure the engine is extensible so new rules can be registered without modifying existing logic (Open/Closed Principle)."
```

---

### Step 3: Write 15+ Comprehensive Unit Tests (The #1 Differentiator)

When AI writes code, tell AI to write thorough unit tests covering negative and malicious edge cases:

```text
PROMPT 4 (Unit Testing):
"Write comprehensive tests in tests/test_rules.py using pytest.
I need at least 15 distinct test cases covering:
- Happy paths: Safe migrations (CREATE TABLE with standard columns, CREATE INDEX CONCURRENTLY).
- Critical violations: DROP TABLE, DROP COLUMN, TRUNCATE.
- High violations: ALTER TABLE ADD COLUMN NOT NULL without default.
- Edge cases: SQL with mixed case ('dRoP TaBLe'), SQL with comments (-- drop table in comments should NOT trigger violation!), multi-line statements, empty files, and malformed SQL.
Use parameterized tests (@pytest.mark.parametrize)."
```

---

### Step 4: Implement Unix Exit Codes & Developer UX

Platform tools MUST follow Unix CLI conventions because they run inside automated CI pipelines:
* **Exit Code `0`:** All checks passed. Safe to merge.
* **Exit Code `1`:** High or Critical violations detected. CI build **FAILED** (blocks PR).
* **Exit Code `2`:** CLI error (file not found, invalid flag, malformed file).

```python
# src/cli.py snippet
if has_critical_or_high_violations:
    print("\n❌ CI CHECK FAILED: Dangerous database migration detected!")
    sys.exit(1)  # Triggers CI failure in GitHub Actions!
else:
    print("\n✅ CI CHECK PASSED: Migration is safe for production rollout.")
    sys.exit(0)
```

---

### Step 5: Containerize & CI Pipeline

```dockerfile
# Multi-stage Dockerfile for minimum image size and non-root security
FROM python:3.11-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

FROM python:3.11-slim
WORKDIR /app
# Security: Run as non-privileged user (Crucial for SRE / Platform evaluation!)
RUN useradd -u 1000 appuser
USER appuser
COPY --from=builder /root/.local /home/appuser/.local
COPY src/ ./src/
ENV PATH=/home/appuser/.local/bin:$PATH
ENTRYPOINT ["python", "src/cli.py"]
```

---

## 🎤 The November 19 Oral Defense Playbook (How to Ace the Technical Interview)

On Day 2, the interviewers will open your Buildathon repository. They will cross-examine you. Here are the **top 5 questions you WILL be asked** and how to answer them:

---

### Q1: "Walk me through the architecture of what you built in the Buildathon."
* **Senior-Engineer Answer:**
  > *"I approached this problem like an internal platform tool for ACKO engineers. I separated the system into 4 distinct layers:  
  > 1. The **CLI and Input Layer** (`cli.py`), which handles arguments, file discovery, and flag parsing.  
  > 2. The **Parser** (`parser.py`), which cleans comments and extracts statements.  
  > 3. The **Rule Engine** (`engine.py`), which uses an extensible Strategy pattern where each rule evaluates a statement independently and returns a structured `Violation` object.  
  > 4. The **Reporter** (`reporter.py`), which outputs human-readable colored terminal output and emits Unix exit code 1 on critical violations to halt CI pipelines.  
  > I also wrote 16 automated unit tests with `pytest` covering edge cases like SQL comments and multi-line queries, and packaged it inside a multi-stage Docker container running as a non-root user."*

---

### Q2: "Did you use AI to build this? Which parts did AI write?"
* **Honest & Confident Answer:**
  > *"Yes, absolutely. AI was explicitly permitted, and in production Platform/DevEx engineering, using AI tools effectively is standard practice.  
  > I acted as the architect: I defined the module boundaries, designed the data contracts (`Violation`, `RiskLevel`), and determined the high-risk SQL rules based on PostgreSQL locking mechanics.  
  > I leveraged AI to scaffold the boilerplate, draft regex patterns, and generate extensive test suites for edge cases. I reviewed, tested, and refactored every single generated function to ensure proper exit codes, comment-stripping, and zero hallucinated bugs."*

---

### Q3: "How does your tool prevent false positives (e.g. if the word 'DROP' appears inside an SQL comment or string literal)?"
* **Technical Answer:**
  > *"That was one of the critical edge cases I specifically tested. In `parser.py`, before feeding the SQL string to the rule engine, I run a sanitization pass:  
  > 1. Strip single-line comments (`-- ...`) and multi-line comments (`/* ... */`).  
  > 2. Mask string literals inside quotes.  
  > This guarantees that an SQL comment like `-- Remember to drop old table next month` is completely ignored and does not block developer pull requests."*

---

### Q4: "If this tool needs to run on 500 microservices across ACKO with 5,000 migrations per day, how would you scale it?"
* **Platform/SRE Answer:**
  > *"Three optimizations:  
  > 1. **Git Diff Targeting:** Never scan the entire repository history. Only scan the files modified in the current pull request using `git diff --name-only origin/main...HEAD`. This keeps execution under 200 milliseconds.  
  > 2. **Pre-commit Hook & CI Action:** Distribute it as a lightweight pre-commit hook on developer laptops so mistakes are caught locally before code is even pushed, backed by a mandatory GitHub Actions Quality Gate on the remote repository.  
  > 3. **Caching:** Cache evaluation results by hashing the SQL file content (SHA-256) in Redis or CI cache."*

---

### Q5: "Why did you use Unix Exit Code 1 vs Exit Code 2?"
* **Technical Answer:**
  > *"Unix conventions dictate:  
  > * `Exit Code 0` means success (migration is safe).  
  > * `Exit Code 1` means business logic / policy violation (migration is dangerous, blocking the merge).  
  > * `Exit Code 2` means tool/execution failure (file not found or bad CLI flags).  
  > In an automated CI pipeline like GitHub Actions or Jenkins, exit code 1 halts the pipeline, sends an alert to Slack, and prevents broken or table-locking migrations from deploying to production."*
