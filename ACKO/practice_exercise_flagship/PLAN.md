# 🗺️ PLAN.md — Checkpoint 1 Plan: Flagship Feature-Flag Service

> **Author:** Dilip Kumar (Candidate)  
> **Role:** Software Engineering Intern – DevEx / Platform & Infrastructure  
> **Submitted At:** Checkpoint 1 (01:15)

---

## 1. The Problem in My Own Words
ACKO microservices currently hardcode on/off switches, making it impossible to know which feature is enabled for which customer or who altered a configuration. If a buggy release causes customer claims to fail, engineers cannot instantly shut off the feature without triggering a slow production redeployment.

**Flagship** is a centralized, high-throughput feature flag and percentage rollout service. Applications query Flagship thousands of times per second to ask: *"Is flag X enabled for user Y?"* It gives engineers granular control over rollouts (0–100%), maintains an immutable audit log of who made changes, provides usage metrics, and presents an operational web UI.

---

## 2. Key Questions Asked to the Product Owner & Answers
1. **Q:** What happens if an application evaluates a non-existent or archived flag?  
   **A:** Return `is_enabled: false` with reason `unknown flag`. Never return HTTP 500 error or crash calling services.
2. **Q:** How should consistent hashing behave when increasing rollout from 20% to 30%?  
   **A:** Monotonic expansion — users who were in the 20% bucket must stay in the 30% bucket. Raising rollout never evicts existing users.
3. **Q:** Do two flags set to 10% target the exact same 10% of users?  
   **A:** No. The flag key must be part of the hash salt so different flags pick independent user cohorts.
4. **Q:** What is the latency SLA?  
   **A:** Evaluation must execute in well under 50ms per call.

---

## 3. Scope: What I Will Build vs What I Will Leave Out

### ✅ In Scope (Must-Haves)
1. **Flag Management API:** REST endpoints to create, read, update, and soft-delete (archive) flags.
2. **Evaluation Engine:** `/api/v1/evaluate` with deterministic hashing using `SHA-256(flag_key + ":" + user_id) % 100`.
3. **Audit Log:** Immutable change history capturing `old_value`, `new_value`, timestamp, and caller identity from `X-User`.
4. **Metrics:** In-memory + persistent counters tracking total evaluations and "on" results.
5. **Operational UI:** Clean HTML5 dashboard to view flags, toggle status, and adjust rollout percentages with a slider.
6. **Containerization:** `docker-compose.yml` for zero-configuration startup.

### ❌ Out of Scope (Explicitly Excluded)
* Complex RBAC / Multi-tenant authentication.
* Multi-environment targeting (Staging vs Prod).
* User attribute targeting (e.g., country == "IN").

---

## 4. System Architecture & Data Model

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           FLAGSHIP SYSTEM ARCHITECTURE                          │
└─────────────────────────────────────────────────────────────────────────────────┘

  [ Applications / Services ]                [ Engineers / Team Leads ]
              │                                           │
              ▼ (High Throughput /evaluate)               ▼ (Management & UI)
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                           FLAGSHIP SERVICE (Node.js)                         │
  │                                                                             │
  │  ├── REST API Layer (Express / Router)                                      │
  │  ├── Evaluation Engine (SHA-256 Consistent Hash Bucket Calculation)          │
  │  ├── Audit Logger (Captures X-User, timestamps, diffs)                      │
  │  └── Metrics Collector (Evaluation counters & hit-ratio)                     │
  └──────────────────────────────────────┬──────────────────────────────────────┘
                                         │
                                         ▼
                            [ Persistent Store (SQLite) ]
                             ├── flags
                             ├── flag_history
                             └── flag_metrics
```

### Data Schema
* **flags:** `key` (PK, string), `description`, `is_enabled` (bool), `rollout_percentage` (int), `is_archived` (bool), `created_at`, `updated_at`.
* **flag_history:** `id` (PK), `flag_key`, `action`, `old_state`, `new_state`, `performed_by`, `timestamp`.
* **flag_metrics:** `flag_key` (PK), `total_evaluations`, `positive_evaluations`.

---

## 5. Test Plan & Metrics
* **Unit Tests:**
  * Consistent hashing: Same `user_id` returns identical result across 10,000 invocations.
  * Monotonicity: Users enabled at 25% remain enabled at 35%.
  * Independence: Distribution across 2 distinct flags at 20% shows independent cohorts.
  * Uniform distribution: 1,000 randomized users at 50% rollout yields $\approx 50\% \pm 3\%$.
* **Integration API Tests:**
  * Missing `user_id` returns HTTP 400 Bad Request.
  * Non-existent flag returns `{ is_enabled: false, reason: "unknown flag" }` with HTTP 200.
* **Success Metric:** P99 Evaluation Latency $< 10\text{ms}$.
