# 📊 Stage 5 — The Full-Day Learnathon & Log Analysis Mastery

> **Format:** Full-Day Live Engineering Challenge (~11:00 AM – 8:00 PM)  
> **Environment:** Conducted live on Slack / Google Meet with an assigned **Juspay Buddy / Mentor**.  
> **What ACKO & Juspay Look For:** First-principles thinking, independent problem-solving, analytical curiosity, clear communication, and the ability to ask for help without being spoon-fed.

---

## 🕒 The Typical Learnathon Day Schedule

```
[11:00 - 11:30 AM] Kickoff Call & Company Overview: Introduction to problem context and tooling.
[11:30 - 12:00 PM] Mentor Pairing: You are assigned a private Slack channel with a senior Juspay QE.
[12:00 - 03:00 PM] Deep Investigation: Given an API endpoint or Excel log dump; analyze data & test.
[03:00 - 03:30 PM] Mid-Day Sync: Quick 10-minute check-in with your buddy on your progress & blockers.
[03:30 - 06:30 PM] Automation & Report Preparation: Write automated checks, document findings.
[06:30 - 08:00 PM] Final Defense & Evaluation: 1-on-1 walkthrough of your solutions with your mentor.
```

---

# 📑 Practical Scenario: Log Analysis & Dataset Investigation

In documented Juspay Learnathons, candidates were given a dataset of transaction logs (CSV / Excel / JSON) and asked **10–13 analytical questions**. Below is a real simulation.

### Sample Transaction Log Schema

| Column Name | Type | Description |
|---|---|---|
| `tx_id` | String | Unique transaction identifier (`tx_1001`, `tx_1002`) |
| `timestamp` | Datetime | Epoch ISO timestamp (`2026-11-16T14:22:10Z`) |
| `order_id` | String | Merchant order reference (`ord_501`) |
| `amount` | Float | Transaction value in INR |
| `gateway` | String | Upstream aggregator (`HDFC_PG`, `RAZORPAY`, `CASHFREE`) |
| `status` | Enum | `SUCCESS`, `PENDING`, `FAILED` |
| `error_code` | String | `SUCCESS`, `BANK_TIMEOUT_504`, `INSUFFICIENT_FUNDS`, `IDEMPOTENCY_CONFLICT` |
| `latency_ms`| Integer| End-to-end round-trip latency in milliseconds |

---

### The 10 Typical Learnathon Analytical Questions & How to Solve Them

#### Q1. "Calculate the overall Transaction Success Rate (SR) across all gateways."
* **Formula:** $\text{Success Rate (SR)} = \frac{\text{Total SUCCESS Transactions}}{\text{Total Transactions Attempted}} \times 100\%$
* **Python Quick Script:**
  ```python
  import pandas as pd
  df = pd.read_csv("payment_logs.csv")
  total_tx = len(df)
  success_tx = len(df[df["status"] == "SUCCESS"])
  sr = (success_tx / total_tx) * 100
  print(f"Overall Success Rate: {sr:.2f}%")
  ```

#### Q2. "Which payment gateway has the highest failure rate, and what is the primary root cause?"
* **Method:** Group by `gateway` and `status`, compute failure percentage, and analyze the most frequent `error_code` for that gateway.
  ```python
  failed_df = df[df["status"] == "FAILED"]
  print(failed_df.groupby(["gateway", "error_code"]).size())
  ```
* **Sample Insight:** *"HDFC_PG experienced a $42\%$ failure rate between 14:00 and 15:00 UTC primarily caused by `BANK_TIMEOUT_504` errors."*

#### Q3. "Are there duplicate debit events on the same `order_id`?"
* **Investigation:** Filter for `order_id` values that have more than one `SUCCESS` record.
  ```python
  successes = df[df["status"] == "SUCCESS"]
  duplicates = successes[successes.duplicated(subset=["order_id"], keep=False)]
  print("Duplicate successful orders detected:", len(duplicates))
  ```
* **Critical Finding:** If any `order_id` has 2 success entries, an **idempotency violation** occurred!

#### Q4. "Identify transactions exhibiting abnormal latency outliers (p99 latency)."
* **Method:** Compute 50th, 95th, and 99th percentiles:
  ```python
  p50 = df["latency_ms"].quantile(0.50)
  p95 = df["latency_ms"].quantile(0.95)
  p99 = df["latency_ms"].quantile(0.99)
  print(f"p50: {p50}ms | p95: {p95}ms | p99: {p99}ms")
  ```

#### Q5. "What percentage of transactions remain stuck in `PENDING` state?"
* **Analysis:** Transactions in `PENDING` longer than 15 minutes indicate dropped webhooks or missing reconciliation polling.

---

# 📝 How to Write a Professional Bug Report (Juspay Standard)

When submitting bugs during the Learnathon, a sloppy one-liner (*"Payment not working"*) will eliminate you. Use this **production template**:

```markdown
### 🐞 [BUG-042] Duplicate Debit Occurs on Rapid Double-Clicking of "Pay Now"

**Severity:** Critical (P1)  
**Component:** Express Checkout SDK / Payment Initiation API  
**Environment:** Staging / Sandbox (v2.14.0), Android Chrome 124  
**Reporter:** Dilip Kumar (Quality Engineer Intern Candidate)  

---

#### 1. Summary
When a customer clicks the "Pay Now" button twice within 150ms on a 3G network connection, the client sends two independent HTTP POST requests with distinct internal session tokens, resulting in two separate charges of ₹2,500 on the customer's credit card for a single order.

#### 2. Pre-Conditions
- User is logged into the merchant checkout page.
- Network throttled to "Slow 3G" in Chrome DevTools.
- Order #ORD-9812 has a pending balance of ₹2,500.

#### 3. Steps to Reproduce
1. Navigate to `/checkout?order_id=ORD-9812`.
2. Select Credit Card option and input valid test card details.
3. Rapidly double-tap the "Pay Now" button using multi-click.
4. Complete the 3DS OTP verification on both generated windows.
5. Inspect the merchant ledger and database transaction records.

#### 4. Expected Result
The "Pay Now" button should be disabled immediately upon the first click (displaying a loading spinner). The API should enforce the `Idempotency-Key` header; the second request should return `409 Conflict` or return the cached response of the initial request without re-debiting funds.

#### 5. Actual Result
Both requests are accepted (`201 Created`). Two distinct transaction IDs (`tx_88192` and `tx_88193`) are created, resulting in a duplicate debit of ₹2,500 (Total charged: ₹5,000).

#### 6. Request & Response Payloads
```json
// Request Header
POST /v1/payments
Idempotency-Key: MISSING_FROM_CLIENT_PAYLOAD

// Response Body
{
  "payment_id": "tx_88193",
  "order_id": "ORD-9812",
  "status": "SUCCESS",
  "amount": 2500.00
}
```

#### 7. Root Cause Analysis (RCA) & Recommendation
- **Frontend:** Disable the button via `pointer-events: none` and state change `isSubmitting = true`.
- **Backend:** Enforce mandatory `Idempotency-Key` header validation on `POST /v1/payments`. If key is missing, reject request with `400 Bad Request`.
```

---

# 🤝 Communication Playbook: Interacting with Your Juspay Buddy

Your mentor is evaluating your **working style**. Here is how to communicate:

### 1. When You Are Stuck (Don't Sit Silent for 3 Hours!)
* ❌ **Bad Communication:** *"I don't know what to do next."* or total silence for 4 hours.
* ✅ **High-Impact Communication:**  
  *"Hi [Buddy Name], I've analyzed the first 5,000 logs in the dataset and successfully identified that Razorpay had an 18% error spike. However, looking at the error code `GATEWAY_REJECTED`, I noticed two different sub-reasons in the raw payload. My hypothesis is that this was caused by a midnight card network maintenance window. Could you clarify if the dataset includes transactions during scheduled maintenance hours?"*

### 2. During the Final Evaluation Walkthrough (The 5-Minute Pitch)
Structure your demo like a senior engineer:
1. **Executive Summary (60s):** *"Today I investigated the payment gateway log dataset comprising 10,000 transactions. The overall success rate was 88.4%, with two critical vulnerability areas."*
2. **Key Discoveries (2 mins):** Explain your top 2 findings with exact data (e.g. idempotency failure, gateway timeout spike).
3. **Automated Validation (1 min):** Show the Python script or Postman collection you wrote to reproduce the bug automatically.
4. **Engineering Recommendations (1 min):** Propose architectural mitigations (circuit breakers, Redis idempotency locking).

---

> **Next Step:** Master Coding & SQL Queries required for the OA and Technical Round in [06_DSA_and_SQL_for_QE.md](./06_DSA_and_SQL_for_QE.md)!
