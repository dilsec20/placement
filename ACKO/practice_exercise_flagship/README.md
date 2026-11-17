# 🚩 Flagship — High-Performance Feature Flag Service

> **Centralized Feature Toggling, Consistent Percentage Rollouts & Audit System**  
> Built for the ACKO Product Buildathon Rehearsal Exercise.

---

## ⚡ Quick Start: Run in 10 Seconds

### Option A: Run via Docker Compose (Recommended)
```bash
docker compose up --build
```
* Dashboard UI: [http://localhost:7001](http://localhost:7001)
* API Health: [http://localhost:7001/health](http://localhost:7001/health)

### Option B: Run Locally with Node.js
```bash
npm install
npm start
```

---

## 🧪 Run Automated Tests
```bash
npm test
```
* Runs 10+ automated tests using Node's native test runner (`node --test`).
* Verifies consistent hashing determinism, monotonicity on rollout increases, flag independence, boundary conditions, and API status codes.

---

## 📡 REST API Reference

### 1. Evaluate a Flag (High-Throughput Endpoint)
Answers whether a feature flag is enabled for a given user.
* **Method / Endpoint:** `GET /api/v1/evaluate?flag_key=<key>&user_id=<user_id>`  
  *(Also supports `POST /api/v1/evaluate` with JSON body)*
* **Sample Response:**
  ```json
  {
    "flag_key": "instant-policy-download",
    "user_id": "cust_88291",
    "is_enabled": true,
    "reason": "user in rollout"
  }
  ```
* **Status Codes:**
  * `200 OK`: Valid evaluation (even if flag is unknown or disabled).
  * `400 Bad Request`: If `user_id` query parameter/body is missing.

---

### 2. Manage Flags (CRUD)
* `GET /api/v1/flags` — List all active flags.
* `POST /api/v1/flags` — Create a new flag:
  ```json
  {
    "key": "new-claims-flow",
    "description": "Streamlined one-click claim filing"
  }
  ```
  *(Pass `X-User: your-name` header to record caller identity)*
* `PATCH /api/v1/flags/:key` — Update flag status or rollout:
  ```json
  {
    "is_enabled": true,
    "rollout_percentage": 35
  }
  ```
* `DELETE /api/v1/flags/:key` — Soft-deletes (archives) the flag.

---

### 3. Change History & Metrics
* `GET /api/v1/flags/:key/history` — Audit trail showing who changed the flag, when, and old vs new values.
* `GET /api/v1/metrics` — Returns total evaluations and positive "on" count per flag.

---

## 🏗️ Architecture & Consistent Hashing Mechanism
Flagship uses **SHA-256 consistent hashing** across `flagKey + ":" + userId` mapped to modulo 100:
1. **Determinism:** The same user always gets the exact same answer across restarts and distributed instances.
2. **Monotonic Expansion:** When rollout percentage is increased (e.g. from 20% to 30%), users who were enabled in the 20% bucket remain enabled in the 30% bucket.
3. **Flag Independence:** Salted with `flagKey` so different flags target independent user cohorts.
4. **Latency:** Evaluation computes in $< 2\text{ms}$ on a standard laptop.
