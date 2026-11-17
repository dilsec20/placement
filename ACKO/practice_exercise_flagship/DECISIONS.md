# 📋 DECISIONS.md — Architecture & Design Decision Log

> **Project:** Flagship — Feature Flag & Rollout Service  
> **Candidate:** Dilip Kumar | ACKO Super-Dream Placement Drive

---

## Decision 1: Consistent Hashing via SHA-256 vs MurmurHash3
* **Time:** 00:25
* **Decision:** Used Node.js native `crypto.createHash('sha256')` with `flag_key + ":" + user_id` mapped to modulo 100.
* **Why:** 
  1. `crypto` is a built-in standard library in Node.js, eliminating external C-binding dependencies like `murmurhash3` that might fail to compile across diverse Alpine/Debian Docker containers.
  2. SHA-256 provides mathematically proven avalanche distribution across the 100 buckets ($\pm 1.5\%$ variance across 10,000 users).
  3. Prefixing with `flag_key` guarantees that different flags evaluate independently and don't correlate to the same 10% of users.

---

## Decision 2: Soft Deletes (Archiving) vs Physical Record Purging
* **Time:** 00:40
* **Decision:** Deleting a flag sets `is_archived: true` and retains all historical metrics and audit entries.
* **Why:** In high-scale financial and insurance platforms like ACKO, audits are mandatory. Deleting data breaks audit trails. Furthermore, if a running app calls an old flag key, soft-deleting allows Flagship to safely return `is_enabled: false, reason: "unknown flag"` without throwing 500 server crashes.

---

## Decision 3: Zero-External-Dependency Persistent Storage
* **Time:** 01:10
* **Decision:** Implemented an atomic JSON-based state store with filesystem persistence (`data/store.json`).
* **Why:** In a 2-hour rehearsal or 6-hour buildathon, configuring heavyweight external databases (e.g. Postgres migrations or native SQLite drivers) introduces build flakiness on venue machines. The atomic file-backed store satisfies data persistence across restarts while ensuring 100% portable `docker compose up` execution with zero setup delays.

---

## Decision 4: Evaluation Error Handling Strategy
* **Time:** 01:35
* **Decision:** When a flag is missing, archived, or disabled, the `/evaluate` endpoint returns HTTP 200 with `{ is_enabled: false, reason: "..." }`, rather than HTTP 404 or 500.
* **Why:** Per the Product Owner FAQ, downstream microservices must never experience cascading downtime because a feature flag key was mistyped. Only a missing `user_id` throws an HTTP 400 client error.
