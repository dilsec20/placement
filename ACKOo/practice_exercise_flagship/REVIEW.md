# 🔍 REVIEW.md — Post-Build Self-Review

> **Candidate:** Dilip Kumar  
> **Target:** ACKO Buildathon Rehearsal Assessment

---

## 1. What Works
* **Flag Management:** Complete CRUD API with strict key validation (`^[a-z0-9-]{3,50}$`) and immutability.
* **Deterministic Consistent Hashing:** SHA-256 modulo-100 logic correctly guarantees that the same user always receives the exact same evaluation across restarts and nodes.
* **Monotonic Rollout:** Verified by automated tests that raising rollout from 20% to 40% never turns off users who already had the feature.
* **Audit Trail:** Immutable record of all mutations capturing `X-User`, timestamps, and state diffs.
* **Operational Dashboard:** Responsive HTML5 UI allowing live flag toggling, rollout slider adjustments, evaluation testing with latency readout, and audit history.
* **Containerization:** Runs cleanly via `docker compose up` on port 7001.

---

## 2. What Doesn't / Current Limitations
* **In-Memory Concurrency:** While atomic file writes persist data, multiple concurrent server instances running behind a round-robin load balancer would require a centralized Redis or PostgreSQL database for distributed lock coordination.
* **User Attribute Filtering:** Rollout is currently based solely on consistent hashing of user IDs; advanced targeting rules (e.g. `user.country == 'IN'` or `user.is_internal == true`) are not implemented.

---

## 3. What the AI Got Wrong & How I Caught/Fixed It
1. **The Hash Salt Mistake:**  
   * *AI Error:* The initial AI-generated code hashed only `userId` (`hash(userId) % 100`).  
   * *Impact:* If two different flags were set to a 10% rollout, the exact same 10% of users would have received both features, directly violating the Product Owner FAQ!  
   * *Fix:* I caught this during testing and updated the hash input to `${flagKey}:${userId}`, ensuring independent cohorts across distinct flags.
2. **Missing User ID Error Handling:**  
   * *AI Error:* The AI assumed a missing `user_id` should return `is_enabled: false`.  
   * *Fix:* The PO FAQ explicitly states that a request with no `user_id` is an error. I added an explicit check returning HTTP 400 Bad Request.

---

## 4. What I Would Do Next (With 2 Extra Hours)
1. **Client SDK:** Build a lightweight Node.js/Go client library with local memory caching and 30-second background polling to drop evaluation latency to $< 0.1\text{ms}$.
2. **Prometheus Metrics Exporter:** Expose a standard `/metrics` endpoint with Prometheus formatting (`flagship_evaluations_total{flag="...", result="on"}`) for easy Grafana dashboard integration.
