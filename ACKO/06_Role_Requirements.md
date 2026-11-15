# 06 — SWE role requirements, explained and converted to practice

This guide expands the **Software Engineering Intern – Developer Operations and Experience** description supplied in the placement attachment. It focuses on what a candidate should be able to explain or demonstrate. The adjacent SR&I Platform and Infrastructure profile is not the role you selected, though there is overlap in platform concepts.

## What this team builds

The role builds the software layer between product applications and infrastructure. The “customer” is an engineer or coding agent who needs to build, test and ship services reliably. Examples in the supplied role description include a CI check for risky database migrations and a service-template extension that supplies logging, metrics and security scanning by default.

Connect a technical feature to an engineer’s workflow: What is painful today? What is the smallest safe improvement? How will users adopt it? How will the team know it worked?

## Responsibility-by-responsibility preparation

### 1. Feature delivery: problem → design → code → tests → production

**Be ready to do:** turn an ambiguous request into requirements, write a short low-level design, implement a narrow feature, add tests, demo and explain what happens after release.

**Practice sequence:**

1. Write the user and pain point in one sentence.
2. List input, output, normal flow, failure cases, permissions and non-goals.
3. Write acceptance criteria that can be tested.
4. Sketch modules/interfaces and one data flow.
5. Identify risks, observability and rollback needs.
6. Implement the smallest complete path and tests.
7. Compare actual behavior with acceptance criteria before calling it done.

**Design-note template:**

```text
Title / status / author
Problem and user
Goals and non-goals
Requirements and acceptance criteria
Proposed API or CLI
Data flow and component boundaries
Failure modes, security and compatibility
Testing and rollout plan
Alternatives and trade-offs
Open questions
```

**Interview drill:** Design a CLI check that finds dangerous database changes in a pull request. Explain input contract, SQL dialect assumptions, rule configuration, false-positive handling, exit codes, test fixtures and rollout strategy.

### 2. Code quality: readable code, tests, pull requests and review

**Code quality means:** naming that reveals intent, small functions with clear contracts, validation at boundaries, useful errors, no hidden side effects, tests for behavior, and maintainable interfaces. It does not mean adding abstractions everywhere.

**Unit test checklist:**

- Happy path and expected result.
- Boundary values and empty/missing input.
- Invalid input and useful error.
- Dependency failure or timeout where relevant.
- Regression test for the bug being fixed.
- Deterministic test data; avoid real network or wall-clock dependence unless that is the behavior under test.

**Pull request description:** context/problem, what changed, how to run, tests performed, sample output if useful, risks, rollout/rollback notes, and linked issue. Keep changes scoped so reviewers can understand the diff.

**Review method:** first understand intent; check correctness, edge cases, security, compatibility and tests; distinguish blocking defects from suggestions; explain review comments with a reason. When receiving feedback, ask a focused question if unclear, update code and tests, and summarize what changed.

**Practice:** take the migration checker drill from [the buildathon guide](./02_Buildathon.md), write five unit tests before adding stretch features, then review your own diff as if another engineer must maintain it.

### 3. Platform building: CI checks, templates, pipeline steps, libraries and agents

**CI check:** runs automatically on a defined event (for example, a pull request), gives deterministic feedback, fails with an actionable explanation when needed, and does not require a maintainer to reproduce hidden state. Avoid network calls or nondeterministic inputs in a safety gate unless justified.

**Service template:** a starter structure with defaults such as a health endpoint, structured logs, metrics, tests, build and security checks. Templates should document how to update generated services; avoid silently overwriting a team’s custom changes.

**Pipeline step/library:** define input/output contracts, versions, error behavior, permissions and backward compatibility. Make retries safe: an operation that may run twice should be idempotent or detect duplicates.

**Agentic tooling:** allow an agent to perform a limited task with narrow permissions, explicit inputs, inspectable output and human review for risky changes. Treat model output as untrusted; validate it, run tests, record actions and avoid exposing secrets.

**Design trade-offs to discuss:** strict blocking check vs advisory warning; central standard vs team configuration; developer speed vs safety; flexible API vs predictable defaults; added telemetry vs privacy/cost.

### 4. Ownership in production: CI/CD, rollout, monitoring and recovery

Know the basic path:

```text
change → commit/PR → automated checks → review → build artifact → deploy → health/metrics → learn or rollback
```

**CI** validates and packages changes. **CD** delivers or deploys them through controlled environments. A good release plan describes who/what is affected, health signals, gradual exposure where possible, a rollback or roll-forward path, and how to verify recovery.

**Production debugging order:**

1. Confirm user impact and start time.
2. Check recent deploy/config/dependency changes.
3. Inspect logs, metrics, traces and health checks.
4. Reduce impact (rollback, disable a feature, drain traffic) using the safest available action.
5. Verify recovery with user-facing signals.
6. Preserve evidence and write a blameless follow-up: cause, contributing factors, detection gap and prevention.

**Reliability concepts:** latency, traffic, errors and saturation; timeouts; bounded retries with backoff and jitter; idempotency; graceful degradation; rate limits; health checks; actionable alerting. Avoid retry storms and cascading restarts.

Kubernetes distinguishes startup, liveness and readiness checks: startup gives initialization time, liveness can restart a stuck process, readiness controls whether it receives traffic. Misconfigured liveness checks can cause cascading failures; use the official probe guide linked in the README.

### 5. User empathy: API defaults, feedback and adoption

Platform users are engineers. Observe their workflow before deciding what to build: short interviews, support tickets, failed CI runs, setup time, adoption and repeated manual steps.

Define a simple success measure before shipping. Examples: percentage of new services using the template, median setup time, migration-check false-positive rate, time to fix a flagged issue, or failure rate of the tool itself. A count of features shipped does not prove adoption.

**Practice answer:** “I would talk with two teams, observe setup and review, identify the most repeated friction, prototype one safe default, pilot it with one service, measure usage and false positives, then document and roll out gradually.”

### 6. AI-native engineering and LLM-based tooling

AI can draft code, tests, documentation and review suggestions. You remain responsible for checking correctness, security constraints, test behavior and the final diff. Be able to explain a useful prompt, how you verified its output and what you rejected.

For an AI coding agent used in a platform workflow, consider:

- Least privilege: read-only by default; require approval for writes/deploys.
- Clear task boundaries and allowed files/commands.
- Untrusted input and prompt-injection from issues, code or logs.
- Secrets and sensitive-data redaction.
- Deterministic validations: formatting, static checks, tests and policy checks.
- Audit trail and a human-readable diff.
- Stop conditions, timeouts and safe rollback.

### 7. Strong fundamentals and practical tools

The SWE profile asks for strong DSA, OS and networking; a strong language; OOP/design patterns; Git, Linux CLI and debugging; and clear communication. Work through [the interview guide](./03_Interviews.md) and [worked DSA notes](./05_Solved_Problems.md). Prepare examples in your chosen language for collections, errors/exceptions, interfaces, tests and concurrency basics.

**Good-to-have topics:** APIs/services/libraries, CI/CD, Docker/Kubernetes/cloud, developer CLIs/bots/IDE or build tools, LLM/agent projects, GitHub/open-source. Know enough to discuss a concept honestly; do not claim hands-on experience you do not have.

## API and service design checklist

For a small REST API or internal library, be prepared to state:

- Resource/operation names and request/response schema.
- Validation and stable error shape.
- Authentication/authorization boundary if relevant.
- Idempotency and retry behavior for writes.
- Pagination, timeouts and rate limits if collection size or dependency load warrants them.
- Versioning/backward compatibility.
- Logging/metrics without recording secrets or unnecessary personal data.
- Unit and integration test boundaries.

For a service template, explain how generated services receive security and observability defaults, how teams customize them, and how upgrades avoid breaking existing services.

## Fast oral questions (answer in 60–90 seconds)

1. How do you turn a vague request into acceptance criteria?
2. What makes a CI check trustworthy enough to block a merge?
3. How would you reduce false positives in a migration checker?
4. Explain unit vs integration tests using a service you built.
5. When would you choose composition over inheritance?
6. How do retries become dangerous? What does idempotency solve?
7. What is the difference between readiness and liveness?
8. A release increases errors. What are your first actions?
9. How do you respond when a reviewer requests a change you disagree with?
10. How would you measure whether an internal tool is adopted?
11. What checks would you put before an AI agent can open or merge a PR?
12. What did you personally build in your strongest project, and what would you change now?

## Official references

- [Git command reference](https://git-scm.com/docs)
- [GitHub Actions workflow syntax](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax)
- [Kubernetes probes and failure behavior](https://kubernetes.io/docs/concepts/workloads/pods/probes/)
- [Docker image/build best practices](https://docs.docker.com/build/building/best-practices/)
