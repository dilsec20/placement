# 03 — Technical interviews

The role profile explicitly calls out DSA, OS, networking, programming, OOP/design patterns, Git, Linux, debugging, tests and communication. Acko candidate reports also describe project deep dives, DP/graph problems, OOP, DBMS and distributed-systems questions. The exact interviews on 19 Nov may differ.

## DSA interview routine

For every problem: restate it → ask about constraints → give a simple baseline → improve it → dry-run a small case → code → test edge cases → state complexity. Explain why the approach works, not only what the code does.

Prioritize these:

- Arrays/hash maps, two pointers, sorting and binary search.
- Stack/queue and string processing.
- BFS/DFS, connected components, shortest paths, topological order, DSU, cycle detection.
- 1D and grid DP; reconstructing a choice if asked.
- Trees and level-order traversal.
- Greedy and interval problems.

## Build/project deep dive

Prepare one 2-minute explanation for each project on your resume:

- Who had the problem and what did you build?
- Why this stack? What were the alternatives?
- What is the data/API flow? Where are the important boundaries?
- What failed, how did you debug it, and what tests catch regressions?
- What trade-off did you make? What would version 2 change?
- What did you personally implement? Be precise and honest.

For a platform role, be ready to describe how you would make an internal tool easy to adopt: safe defaults, good errors, documentation, backwards compatibility, metrics and a rollback path.

## Core CS rapid review

### OOP and design

- Encapsulation, abstraction, inheritance, polymorphism; composition versus inheritance.
- Interface versus abstract class in your chosen language.
- SOLID in practical terms; when a pattern adds value versus needless abstraction.
- Factory/Strategy/Observer basics; dependency injection and testability.
- Design a transaction ledger or migration checker: entities, interfaces, validation, errors and tests.

### OS

- Process vs thread; context switching; concurrency vs parallelism.
- Race condition, mutex, semaphore, deadlock conditions and prevention.
- Virtual memory, stack vs heap, paging, system calls.
- What happens when a process crashes or a thread blocks on I/O?

### Networking

- DNS lookup, TCP handshake, TLS, HTTP request/response, status codes.
- TCP vs UDP; connection timeout vs read timeout; retries and idempotency.
- What happens when a client retries after a timeout but the server completed the request?
- How would you debug a service that works locally but cannot reach a dependency?

### DBMS and distributed systems

- ACID, isolation levels, indexes and query plans.
- SQL vs document database trade-offs; transactions and constraints.
- Replication vs sharding; cache invalidation; consistency and availability.
- CAP theorem in the context of a network partition; do not present it as a simplistic database ranking.
- Safe schema changes: expand/contract, backfill, deploy compatibility, then cleanup.

### Git, Linux and debugging

- `status`, `diff`, `log`, branch, commit, merge/rebase, resolve conflict, revert.
- `grep`/`rg`, `find`, `cat`, `less`, pipes, environment variables, permissions, process/log inspection.
- Reproduce → narrow scope → inspect logs/stack trace → add a focused test → fix → rerun relevant checks.
- Explain how to debug a failing CI job and separate a flaky test from a real regression.

## Likely platform scenarios to practice

1. A CI check rejects a migration. How do you keep it useful without blocking safe changes?
2. A service template adds logging and health checks. How do you handle old services and template upgrades?
3. A deployment fails after rollout. What signals do you inspect, how do you rollback, and what would you add to prevent recurrence?
4. A developer says an internal CLI is confusing. How do you collect evidence and improve adoption?
5. An AI agent proposes a code change. How should tests, permissions, review and auditability constrain the workflow?

## Communication and questions

Think aloud in small steps. If stuck, state what you know, identify the unknown and propose a way to test it. Ask the interviewer about the team’s platform users, how intern projects are scoped, and what makes a tool successful after it ships.
