# 02 — Buildathon playbook (5–6 hours)

The hiring email confirms a 5–6 hour buildathon and says AI tools may be used as assistance. The prompt and judging criteria are not yet known. This practice is tailored to the role: developer tooling, CI checks, service templates, APIs, tests, and safe shipping.

## A repeatable delivery loop

1. **Clarify (15–20 min):** identify user, trigger, inputs, outputs, failure behavior, constraints and definition of done. Ask focused questions early.
2. **Write a short design (15 min):** user flow, API/CLI shape, data model, modules, edge cases, test strategy and one trade-off.
3. **Ship a thin vertical slice (2–3 hours):** one end-to-end path that works before adding optional features.
4. **Test and harden (45–60 min):** happy path, malformed input, missing data, failure/retry, duplicate operation, boundary conditions.
5. **Polish (30 min):** README, setup/run commands, sample output, clear errors, lint/format, Git status and commit history.
6. **Demo (10 min):** explain the user problem, show it working, describe tests, limitations and next steps.

## Practice project: risky database migration checker

Build a command-line tool that reads migration files and reports likely dangerous SQL changes before code review.

### Minimum viable scope

- Input: a directory or file list of SQL migrations.
- Detect at least: `DROP TABLE`, `DROP COLUMN`, `ALTER COLUMN` type changes, and `CREATE INDEX` without a concurrent/nonblocking option (document dialect assumptions).
- Output: file, line, rule ID, severity, short explanation and suggested safer action.
- Exit code: `0` when clean, `1` when findings are present, `2` for usage/parse errors.
- Include tests for a clean migration, one finding per rule, comments/quoted strings, empty file and nonexistent path.

### Stretch scope

- Config file for severity/rule exclusions.
- JSON output for CI annotations.
- Baseline/allow-list support that requires a reason.
- GitHub Actions example and documentation.

### Acceptance criteria

- `--help` is useful and examples run from a fresh checkout.
- False positives are reduced by ignoring SQL comments and string literals, or explicitly documented as a limitation.
- Deterministic output and exit codes make it safe to use in CI.
- The tool never edits migrations automatically.

## Alternative drill: service starter/template checker

Given a directory containing a service, check whether it has a health endpoint, structured logging, a test command, a Dockerfile, and a CI workflow. Report missing capabilities with actionable messages. Add `--json` output and tests. This closely matches the role’s service-template and defaults examples.

## AI-assisted build rules

- Use AI to brainstorm tests, explain an unfamiliar API, review a diff, or scaffold a small function.
- Ask it to list assumptions and edge cases. Verify every suggestion against the actual requirements.
- Keep the prompt, code and final decisions understandable to you; you may need to explain them.
- Run the program and tests yourself. Never claim a command passed unless you ran it.
- Avoid pasting secrets, private keys or real credentials into prompts.

## What to prepare to demo

1. Problem and target user in one sentence.
2. Architecture and one design choice/trade-off.
3. A 60–90 second live happy-path run.
4. One failure/edge case and the test that covers it.
5. What you would improve next if given another hour.

## Buildathon starter checklist

- [ ] Create project and run a minimal hello-world/health check.
- [ ] Add README setup, run and test instructions immediately.
- [ ] Keep a small task list; finish the core behavior before stretch features.
- [ ] Commit a working baseline, then make small commits.
- [ ] Use clear errors and stable exit codes/status codes.
- [ ] Add unit tests as behavior is implemented.
- [ ] Check `git status`, remove debug output, and rehearse the demo.
