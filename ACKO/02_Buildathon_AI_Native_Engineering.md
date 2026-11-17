# 🛠️ Stage 2 — Buildathon / Hackathon Mastery (5–6 Hours)

> **Format:** 5–6 Hour Real-World Engineering Buildathon  
> **Rule:** **AI Tools are explicitly permitted as assistance!**  
> **Elimination Reality:** When everyone has access to AI, **code volume is cheap**. ACKO evaluates **software craft, systems thinking, edge-case coverage, testing discipline, and how deeply you understand what you built**.

---

## 🎯 How ACKO Evaluates Your Buildathon Submission

ACKO's platform engineers evaluate your project against 5 strict industry rubrics:

| Metric | Amateur Approach (Rejected) | ACKO Platform Engineer Standard (Selected) |
|---|---|---|
| **Modularity & Architecture** | A single 500-line monolithic script | Clean separation: CLI interface $\to$ Parser $\to$ Rule Engine $\to$ Reporter $\to$ Exit Codes. |
| **Testing Discipline** | Zero tests, or only 1 test for the happy path | Comprehensive unit tests covering negative cases, empty inputs, malformed data, and edge conditions ($>85\%$ coverage). |
| **Production Readiness** | Works only on local machine with manual paths | Includes a clean `Dockerfile`, non-root user, proper Unix exit codes (`0` = pass, `1` = policy violation, `2` = syntax error). |
| **CI/CD Integration** | Manual CLI execution only | Includes a working GitHub Actions workflow (`.github/workflows/ci.yml`) so it runs automatically on every pull request. |
| **Documentation & UX** | Empty README or auto-generated boilerplate | High-impact `README.md` with problem statement, architecture diagram, flag documentation, and copy-paste demo commands. |

---

# 🚀 The 5-Hour Buildathon Timeline

```
[00:00 - 00:30] 1. Spec & Scope: Break down problem statement into CLI flags, data models & rules.
[00:30 - 01:30] 2. Domain Core: Implement parser, AST/regex rules, and core evaluation engine.
[01:30 - 02:45] 3. Testing Suite: Write 15+ automated unit tests covering all risky edge cases.
[02:45 - 03:45] 4. Developer Experience: Colored CLI output, JSON/Markdown export, Unix exit codes.
[03:45 - 04:30] 5. Packaging: Write Dockerfile and GitHub Action workflow YAML.
[04:30 - 05:00] 6. Polish & Demo Script: Clean Git commit history, verify demo commands, write README.
```

---

# 🏆 Project 1: Database Migration Risk Checker (Explicitly Named in JD!)

> **JD Direct Reference:** *"A typical first problem is narrow but real — for example, a CI check that flags risky database migrations before review."*  
> **Problem Statement:** In a zero-downtime microservices architecture, bad database migrations lock tables, drop critical columns, or break backward compatibility with running app servers. Build a CLI and CI tool that analyzes SQL migration files and classifies risks.

### Architecture Diagram
```
SQL Migration File (.sql)
         │
         ▼
[SQL Lexer / Parser] ──► Tokenize statements (DDL / DML)
         │
         ▼
[Risk Rule Engine]
 ├── Rule 1: CRITICAL  ──► DROP TABLE, DROP COLUMN, TRUNCATE
 ├── Rule 2: HIGH      ──► ALTER TABLE ADD COLUMN NOT NULL without DEFAULT (Locks table)
 ├── Rule 3: MEDIUM    ──► CREATE INDEX without CONCURRENTLY (Production lock)
 └── Rule 4: LOW       ──► Large table full scan / unindexed foreign key
         │
         ▼
[Reporter & Exit Code]
 ├── Stdout: Colored terminal summary
 ├── Markdown: Formatted PR comment report
 └── Exit Code: 0 (Safe) | 1 (Blocked by Policy)
```

---

### Complete Production Implementation (`db_migration_checker.py`)

```python
#!/usr/bin/env python3
"""
ACKO DevEx Platform Tool: Database Migration Risk Checker
Analyzes SQL migration files for table locks, destructive DDL, and rolling-deployment hazards.
"""

import sys
import os
import re
import argparse
from enum import Enum
from typing import List, Dict, Any

class RiskLevel(Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"

class RiskRule:
    def __init__(self, rule_id: str, pattern: str, level: RiskLevel, title: str, remedy: str):
        self.rule_id = rule_id
        self.pattern = re.compile(pattern, re.IGNORECASE)
        self.level = level
        self.title = title
        self.remedy = remedy

# Core Production Migration Guardrails
RULES = [
    RiskRule(
        rule_id="ACKO-MIG-001",
        pattern=r"\bDROP\s+TABLE\b",
        level=RiskLevel.CRITICAL,
        title="Destructive Action: Dropping Table",
        remedy="Dropping tables causes permanent data loss. Archive table or perform soft-delete deprecation."
    ),
    RiskRule(
        rule_id="ACKO-MIG-002",
        pattern=r"\bDROP\s+COLUMN\b",
        level=RiskLevel.CRITICAL,
        title="Breaking Change: Dropping Column during Rolling Deploy",
        remedy="Active running service replicas will crash on SELECT *. Follow expand-contract deprecation phase."
    ),
    RiskRule(
        rule_id="ACKO-MIG-003",
        pattern=r"\bTRUNCATE\s+TABLE\b|\bTRUNCATE\b",
        level=RiskLevel.CRITICAL,
        title="Destructive Action: Truncating Table",
        remedy="Truncate bypasses transaction logs and deletes all rows instantly."
    ),
    RiskRule(
        rule_id="ACKO-MIG-004",
        pattern=r"\bALTER\s+TABLE\s+\w+\s+ADD\s+COLUMN\s+\w+\s+[^;]+NOT\s+NULL(?!\s+DEFAULT)",
        level=RiskLevel.HIGH,
        title="Table Lock Hazard: ADD COLUMN NOT NULL without DEFAULT",
        remedy="PostgreSQL/MySQL will rewrite the entire table holding an exclusive AccessExclusiveLock. Provide a DEFAULT or add column as nullable first."
    ),
    RiskRule(
        rule_id="ACKO-MIG-005",
        pattern=r"\bCREATE\s+INDEX\s+(?!CONCURRENTLY)",
        level=RiskLevel.MEDIUM,
        title="Index Lock Hazard: CREATE INDEX without CONCURRENTLY",
        remedy="Standard CREATE INDEX blocks all concurrent writes on Postgres. Use 'CREATE INDEX CONCURRENTLY'."
    ),
    RiskRule(
        rule_id="ACKO-MIG-006",
        pattern=r"\bALTER\s+TABLE\s+\w+\s+RENAME\s+(COLUMN|TO)\b",
        level=RiskLevel.HIGH,
        title="Contract Breach: Renaming Column/Table",
        remedy="Breaks running code versions during rolling updates. Add new column, replicate data, then switch."
    )
]

class MigrationAnalyzer:
    def __init__(self, fail_level: RiskLevel = RiskLevel.HIGH):
        self.fail_level = fail_level

    def analyze_sql(self, sql_content: str, filename: str = "migration.sql") -> List[Dict[str, Any]]:
        findings = []
        lines = sql_content.splitlines()
        
        # Clean comments to prevent false positives
        cleaned_statements = []
        for line_num, line in enumerate(lines, 1):
            stripped = line.strip()
            if stripped.startswith("--") or stripped.startswith("/*"):
                continue
            cleaned_statements.append((line_num, line))

        full_clean_sql = " ".join([l[1] for l in cleaned_statements])

        for rule in RULES:
            for match in rule.pattern.finditer(full_clean_sql):
                # Approximate line number
                char_idx = match.start()
                curr_chars = 0
                matched_line = 1
                for line_num, line_str in cleaned_statements:
                    curr_chars += len(line_str) + 1
                    if curr_chars >= char_idx:
                        matched_line = line_num
                        break

                findings.append({
                    "file": filename,
                    "line": matched_line,
                    "rule_id": rule.rule_id,
                    "level": rule.level,
                    "title": rule.title,
                    "remedy": rule.remedy,
                    "match": match.group(0).strip()
                })

        return findings

    def format_terminal_report(self, findings: List[Dict[str, Any]]) -> str:
        if not findings:
            return "\033[92m✅ All migration checks passed! Zero high-risk DDL patterns detected.\033[0m"

        report = ["\n\033[91m⚠️  MIGRATION RISK ASSESSMENT REPORT:\033[0m\n"]
        for f in findings:
            color = "\033[91m" if f["level"] in (RiskLevel.CRITICAL, RiskLevel.HIGH) else "\033[93m"
            report.append(f"{color}[{f['level'].value}] {f['rule_id']}: {f['title']}\033[0m")
            report.append(f"  Location: {f['file']}:{f['line']}")
            report.append(f"  Snippet:  \033[90m{f['match']}\033[0m")
            report.append(f"  Remedy:   {f['remedy']}\n")
        return "\n".join(report)

    def generate_markdown_report(self, findings: List[Dict[str, Any]]) -> str:
        if not findings:
            return "### 🟢 ACKO DB Guard: No Dangerous Migration Patterns Found\nAll statements comply with zero-downtime deployment policies."

        md = ["### 🔴 ACKO DB Guard: Dangerous Migration Patterns Detected\n"]
        md.append("| Risk Level | Rule ID | Line | Issue | Recommended Fix |")
        md.append("|---|---|---|---|---|")
        for f in findings:
            icon = "🚨" if f["level"] == RiskLevel.CRITICAL else ("⚠️" if f["level"] == RiskLevel.HIGH else "ℹ️")
            md.append(f"| {icon} **{f['level'].value}** | `{f['rule_id']}` | Line {f['line']} | {f['title']} | {f['remedy']} |")
        md.append("\n> **Policy:** Migrations with `HIGH` or `CRITICAL` findings must be resolved before merging.")
        return "\n".join(md)

def main():
    parser = argparse.ArgumentParser(description="ACKO Database Migration Risk Checker")
    parser.add_argument("path", help="Path to SQL file or directory of migrations")
    parser.add_argument("--fail-on", choices=["LOW", "MEDIUM", "HIGH", "CRITICAL"], default="HIGH", help="Minimum risk level to trigger exit code 1")
    parser.add_argument("--markdown", action="store_true", help="Generate GitHub PR Markdown comment format")

    args = parser.parse_args()
    fail_threshold = RiskLevel[args.fail_on]
    analyzer = MigrationAnalyzer(fail_level=fail_threshold)

    files_to_check = []
    if os.path.isfile(args.path):
        files_to_check.append(args.path)
    elif os.path.isdir(args.path):
        for root, _, files in os.walk(args.path):
            for file in files:
                if file.endswith(".sql"):
                    files_to_check.append(os.path.join(root, file))

    all_findings = []
    for filepath in files_to_check:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        findings = analyzer.analyze_sql(content, filename=os.path.basename(filepath))
        all_findings.extend(findings)

    if args.markdown:
        print(analyzer.generate_markdown_report(all_findings))
    else:
        print(analyzer.format_terminal_report(all_findings))

    # Determine exit code based on threshold
    level_order = [RiskLevel.LOW, RiskLevel.MEDIUM, RiskLevel.HIGH, RiskLevel.CRITICAL]
    threshold_idx = level_order.index(fail_threshold)

    should_fail = any(level_order.index(f["level"]) >= threshold_idx for f in all_findings)
    sys.exit(1 if should_fail else 0)

if __name__ == "__main__":
    main()
```

---

### Automated Unit Test Suite (`test_migration_checker.py`)

```python
import pytest
from db_migration_checker import MigrationAnalyzer, RiskLevel

@pytest.fixture
def analyzer():
    return MigrationAnalyzer()

def test_safe_migration(analyzer):
    sql = "CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(255));"
    findings = analyzer.analyze_sql(sql)
    assert len(findings) == 0

def test_drop_table_detected(analyzer):
    sql = "DROP TABLE old_policies CASCADE;"
    findings = analyzer.analyze_sql(sql)
    assert len(findings) == 1
    assert findings[0]["rule_id"] == "ACKO-MIG-001"
    assert findings[0]["level"] == RiskLevel.CRITICAL

def test_add_column_not_null_without_default(analyzer):
    sql = "ALTER TABLE claims ADD COLUMN claim_amount NUMERIC NOT NULL;"
    findings = analyzer.analyze_sql(sql)
    assert len(findings) == 1
    assert findings[0]["rule_id"] == "ACKO-MIG-004"
    assert findings[0]["level"] == RiskLevel.HIGH

def test_index_concurrently_safe(analyzer):
    sql = "CREATE INDEX CONCURRENTLY idx_user_email ON users(email);"
    findings = analyzer.analyze_sql(sql)
    assert len(findings) == 0

def test_index_non_concurrently_warned(analyzer):
    sql = "CREATE INDEX idx_user_email ON users(email);"
    findings = analyzer.analyze_sql(sql)
    assert len(findings) == 1
    assert findings[0]["level"] == RiskLevel.MEDIUM
```

---

### CI/CD Workflow (`.github/workflows/migration-check.yml`)

```yaml
name: ACKO DB Migration Guard
on:
  pull_request:
    paths:
      - 'migrations/**.sql'

jobs:
  db-guard:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.10'

      - name: Run Migration Risk Checker
        run: |
          python db_migration_checker.py migrations/ --fail-on HIGH --markdown > report.md
          cat report.md

      - name: Post PR Comment
        if: failure() || success()
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const report = fs.readFileSync('report.md', 'utf8');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: report
            });
```

---

# 🤖 How to Leverage AI Effectively During the Buildathon

When using AI (Claude / ChatGPT / Copilot) during the 5–6 hour challenge, avoid generic prompts. Use this **4-Stage Prompting Framework**:

### Prompt 1: Domain Modeling & Interface Spec
```text
"Act as a Principal Platform Engineer at ACKO. 
I need to build [problem statement, e.g. Developer CLI tool for service health monitoring].
Design a clean, modular Python/Go architecture with clear separation between CLI entrypoint, core business logic, configuration, and reporting.
Provide:
1. Directory structure
2. Data structures/Enums
3. Abstract interfaces
Do not write implementation yet; provide architecture only."
```

### Prompt 2: Core Rule Implementation with Strict Edge Cases
```text
"Implement the core analyzer using regex/AST.
Constraints:
- Must avoid false positives inside SQL/code comments.
- Must handle case-insensitive matching.
- Return structured objects with Rule ID, Severity Enum, Line number, and actionable fix advice.
- Zero external third-party dependencies outside standard library."
```

### Prompt 3: Negative & Adversarial Test Case Generation
```text
"Write a comprehensive pytest suite for this tool.
Include at least 10 test cases:
- 3 valid passing cases
- 4 critical violation cases
- 3 tricky edge cases (nested parentheses, multi-line statements, comments containing keywords, empty files)
Aim for 95% line coverage."
```

---

> **Next Step:** Master live Object-Oriented Machine Coding in [03_Machine_Coding_and_LLD.md](./03_Machine_Coding_and_LLD.md)!
