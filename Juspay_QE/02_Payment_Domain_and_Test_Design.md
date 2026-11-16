# 💳 Stage 2 — Payment Gateway Domain & Test Case Design

> **Why This Matters for Juspay:** Juspay is India's preeminent payment orchestration platform, processing **over 100 Million transactions daily** across UPI, Credit/Debit Cards, Netbanking, and Wallets.  
> **The Quality Bar:** If an e-commerce site has a bug in its product description, a user is mildly annoyed. If Juspay has a bug in payment orchestration, **money is deducted, policies fail to issue, and merchants lose millions in revenue**.

---

## 🏛️ Part 1: How Payments Work (The End-to-End Architecture)

### 1. The Key Entities in an Online Transaction
1. **The Cardholder / Customer:** The user initiating payment on an app (e.g., Swiggy, Amazon, Cred).
2. **The Merchant:** The business selling the service/goods.
3. **The Payment Orchestrator (Juspay):** The intelligent router sitting between the merchant and multiple payment gateways/banks. Routes transactions to the bank with the **highest real-time success rate (SR)** and lowest latency.
4. **The Payment Aggregator / Gateway (PA/PG):** (e.g., Razorpay, PayU, Cashfree, BillDesk).
5. **The Card Network / Payment Rail:** (Visa, Mastercard, RuPay, or **NPCI for UPI**).
6. **The Issuing Bank:** The customer's bank (e.g., HDFC, SBI) holding the customer's funds.
7. **The Acquiring Bank:** The merchant's bank receiving the funds.

---

### 2. Complete Transaction Sequence Diagram

```
[Customer]        [Merchant App]         [Juspay Switch]        [Payment Rail / Bank]
    │                    │                      │                         │
    ├── 1. Click Pay ───►│                      │                         │
    │                    ├── 2. Create Order ──►│                         │
    │                    │   (order_id, amt)    │                         │
    │                    │                      ├── 3. Health & SR Check ─┤ (Pings HDFC, ICICI)
    │                    │                      │   (Selects best gateway)│
    │◄── 4. Render Checkout SDK (Juspay) ───────┤                         │
    │                    │                      │                         │
    ├── 5. Select UPI/Card & Submit ───────────►│                         │
    │                    │                      ├── 6. Forward Auth Req ─►│
    │                    │                      │                         │
    │◄── 7. 3DS Challenge (OTP Screen / UPI PIN Request) ─────────────────┤
    │                    │                      │                         │
    ├── 8. Enter OTP / PIN ──────────────────────────────────────────────►│ (Bank verifies funds)
    │                    │                      │                         │
    │                    │                      │◄── 9. Auth Success ─────┤ (Bank debits customer)
    │                    │                      │                         │
    │                    │◄── 10. Webhook Alert ┤                         │
    │                    │    (tx_id, SUCCESS)  │                         │
    │◄── 11. "Payment Successful!" Screen ──────┘                         │
```

---

## 🔐 Part 2: Critical Payment Mechanisms & Failure Modes

---

### 1. Payment Idempotency (The Most Asked Interview Scenario)

#### The Problem:
A customer is on a slow 3G connection and clicks *"Pay ₹5,000"*. The network lags, no spinner appears, and the user frantically taps the *"Pay"* button 4 times.  
* Without idempotency: The backend initiates 4 separate debit transactions, charging the customer **₹20,000** for one purchase!

#### How Idempotency Works Under the Hood:
1. The client generates a unique cryptographically secure key: `Idempotency-Key: 8a4f2b90-1c7d-4e92-91f8-d4e5f6a7b8c9`.
2. When the request hits the Juspay API, the backend executes an atomic operation in **Redis**:
   ```text
   SET idempotency:8a4f2b90-1c7d-4e92-91f8-d4e5f6a7b8c9 "PROCESSING" NX EX 120
   ```
   * `NX`: Set only if key does NOT already exist.
   * `EX 120`: Key expires automatically after 120 seconds.
3. If the first request is processing, subsequent duplicate requests hit the Redis check, detect that the key exists, and are **immediately rejected** with `409 Conflict` or queued.
4. Once the payment finishes, the response payload is cached in Redis against that key. Any retry within the window receives the **exact original response** without re-charging the bank account.

---

### 2. Transaction States & Asynchronous Reconciliation

A payment is NOT an instantaneous boolean (True/False). It transitions through an asynchronous state machine:

```
[INITIATED] ──► [PENDING] ──► [AUTHORIZED] ──► [CAPTURED / SUCCESS]
                    │                              │
                    ├──────► [FAILED]              └──► [REFUND_REQUESTED]
                    │                                          │
                    └──────► [TIMED_OUT / EXPIRED]             ▼
                                                          [REFUNDED]
```

#### What Happens When a Bank Times Out? (The Asynchronous Black Hole)
1. Customer enters OTP; bank server hangs for 45 seconds without responding.
2. Juspay gateway marks transaction as **`PENDING`** (or `AUTHORIZATION_PENDING`), NOT `FAILED`.
3. The merchant displays: *"We are waiting for bank confirmation. Please do not re-pay."*
4. **Background Reconciliation (Recon Worker):**
   * Juspay runs a background cron worker polling the bank's status API every 5 minutes: `GET /bank/transactions/{id}/status`.
   * Alternatively, the bank sends an asynchronous **Webhook** 10 minutes later: `{ "status": "DEBITED_SUCCESS" }`.
   * If debited, Juspay transitions state to `SUCCESS` and issues policy. If never debited, transitions to `FAILED`.

---

## 📋 Part 3: Comprehensive Test Case Suites (Juspay Standard)

---

### Test Suite 1: Payment Checkout Page (Cards, UPI, Netbanking)

| Test ID | Test Scenario | Test Steps | Input Data | Expected Result | Test Type |
|---|---|---|---|---|:---:|
| **TC_PAY_001** | Successful Credit Card Payment | Enter valid 16-digit card, future expiry, valid CVV, submit valid OTP | Visa: `4111 1111 1111 1111`, Exp: `12/28`, CVV: `123`, OTP: `123456` | Transaction status `SUCCESS`; user redirected to order confirmation page. | Positive |
| **TC_PAY_002** | Expired Credit Card | Enter card with past expiry month/year | Card: `4111...`, Exp: `05/2021`, CVV: `123` | Inline error displayed: *"Card has expired"*; Pay button remains disabled. | Negative / Boundary |
| **TC_PAY_003** | Invalid Card Luhn Check | Enter 16-digit number that fails Luhn algorithm checksum | `4111 1111 1111 1112` | Inline error: *"Invalid card number"*; network request is NOT triggered. | Negative |
| **TC_PAY_004** | Short CVV Validation | Enter 2 digits for Visa/Mastercard (requires 3) or 3 digits for Amex (requires 4) | Visa with CVV `12` | Field validation error: *"Enter a valid 3-digit CVV"*. | Boundary |
| **TC_PAY_005** | Double-Click on Pay Button (Idempotency) | Rapidly double-click / multi-click *"Pay Now"* button | Click frequency $< 100\text{ms}$ | Button is disabled immediately after first click (shows loading spinner); only ONE payment request sent to backend. | Negative / Concurrency |
| **TC_PAY_006** | Invalid UPI ID Format | Enter malformed Virtual Payment Address (VPA) | `user@randomunknown` (missing bank handle) | Error: *"Invalid UPI ID format"*. | Negative |
| **TC_PAY_007** | Valid UPI Intent Flow (Mobile) | Click UPI option on mobile device | Installed Apps: GPay, PhonePe, Paytm | Bottom sheet opens listing installed UPI apps; clicking GPay launches GPay app via intent URL. | Integration |
| **TC_PAY_008** | UPI Request Timeout | Send UPI collect request to customer's app; customer does not approve for 5 minutes | VPA: `user@okhdfcbank` | At $T=300\text{s}$, collect request expires on screen; status shows *"Transaction Expired"*. | Negative / State |
| **TC_PAY_009** | Insufficient Account Balance | Attempt payment where order amount > available account balance | Order: ₹50,000, Balance: ₹1,200 | Bank returns code `INSUFFICIENT_FUNDS`; Juspay displays clear error message offering alternative payment methods. | Negative |
| **TC_PAY_010** | Zero or Negative Amount Tampering | Intercept checkout request via proxy (Burp/Charles) and modify amount | Change `amount: 1000` to `amount: 0` or `-500` | Backend API rejects with `400 Bad Request` or `422 Unprocessable Entity`; transaction rejected. | Security |
| **TC_PAY_011** | Currency Mismatch | Send currency code not supported by merchant | `currency: "JPY"` on domestic INR merchant | API returns `400 Bad Request`: *"Unsupported currency"*. | Boundary |
| **TC_PAY_012** | Network Disconnect During Gateway Processing | Turn off Wi-Fi/mobile data immediately after submitting OTP | Network disconnect | App shows *"Connecting..."* with graceful retry button; does not crash; queries backend for status on reconnect. | Edge Case / Resilience |
| **TC_PAY_013** | Browser Refresh (F5) on Payment Redirection | Press F5 / Reload while on bank redirect page | On 3DS iframe URL | Browser alert: *"Do you want to leave this page?"*; if reloaded, transaction reconciles as Pending/Failed cleanly without double debit. | Edge Case |
| **TC_PAY_014** | Payment with RuPay Card (Indian Domestic Rail) | Enter 16-digit RuPay card | RuPay BIN: `60`, `65`, `81`, `82` | Card network correctly identified as RuPay; routed via domestic NPCI rail. | Compatibility |
| **TC_PAY_015** | Cross-Site Scripting (XSS) in Cardholder Name | Enter malicious JavaScript in Name field | `<script>alert('XSS')</script>` | Input is sanitized and encoded; script does not execute in DOM or database. | Security |

---

### Test Suite 2: OTP Verification Screen (2FA / 3DS)

| Test ID | Test Scenario | Input Data | Expected Result | Test Type |
|---|---|---|---|:---:|
| **TC_OTP_001** | Valid 6-Digit OTP | `654321` | OTP validated; transaction transitions to `SUCCESS`. | Positive |
| **TC_OTP_002** | Incorrect OTP (Attempt 1 of 3) | `000000` | Error: *"Incorrect OTP. 2 attempts remaining"*; field clears. | Negative |
| **TC_OTP_003** | Max Invalid Attempts Exhaustion | Enter incorrect OTP 3 consecutive times | `000000` x 3 | Error: *"Maximum OTP attempts exceeded. Transaction blocked."*; transaction terminated. | Security |
| **TC_OTP_004** | Expired OTP Submission | Wait for timer to reach 00:00 (e.g. 120s), then enter valid OTP | Valid OTP after timer expires | Error: *"OTP has expired. Please request a new OTP."* | Boundary / Time |
| **TC_OTP_005** | Resend OTP Button Cooldown | Observe *"Resend OTP"* button during active timer | During first 30 seconds | Resend OTP link is disabled; displays countdown: *"Resend in 28s"*. | Functional |
| **TC_OTP_006** | Clicking Resend OTP | Click Resend after cooldown expires | At 00:00 | Previous OTP is invalidated; new OTP generated; cooldown timer resets. | State Transition |
| **TC_OTP_007** | Copy-Paste 6 Digits into First Box | Copy `"987654"` and paste into box 1 | String: `"987654"` | Auto-distributes 1 digit into each of the 6 individual OTP input boxes. | Usability / UI |
| **TC_OTP_008** | Non-Numeric Characters in OTP | Enter letters or symbols: `"A#12B"` | Non-numeric input | Keyboard allows numeric entry only; non-digit characters ignored. | Negative |
| **TC_OTP_009** | Auto-Read OTP Permission (Android) | Device receives SMS containing OTP | SMS: *"Your Juspay OTP is 445566"* | Android SMS Retriever API extracts 6 digits and auto-fills without user typing. | Integration |

---

### Test Suite 3: Refunds, Cancellations & Reversals

| Test ID | Test Scenario | Input Data | Expected Result | Test Type |
|---|---|---|---|:---:|
| **TC_REF_001** | Full Refund on Captured Transaction | Successful transaction of ₹2,500; initiate full refund | `refund_amount: 2500` | Refund API returns `200 OK`; transaction status becomes `REFUNDED`; ledger balances update. | Positive |
| **TC_REF_002** | Partial Refund | Original transaction ₹10,000; refund ₹3,000 | `refund_amount: 3000` | Refund succeeds; status is `PARTIALLY_REFUNDED`; remaining refundable balance is ₹7,000. | Positive |
| **TC_REF_003** | Refund Exceeding Original Transaction Amount | Original transaction ₹1,000; attempt refund of ₹1,500 | `refund_amount: 1500` | API rejects with `400 Bad Request`: *"Refund amount exceeds original transaction total"*. | Boundary / Negative |
| **TC_REF_004** | Refund on Already Refunded Transaction | Attempt second refund when remaining balance is 0 | `refund_amount: 500` on 0 balance | Error: *"Transaction has already been fully refunded"*. | State Transition |
| **TC_REF_005** | Refund on Failed Transaction | Attempt refund on a transaction with status `FAILED` | Transaction ID of failed order | Error: *"Cannot refund a failed or uncaptured transaction"*. | Negative |

---

> **Next Step:** Master REST API Testing & Automation in [03_API_Testing_and_Postman.md](./03_API_Testing_and_Postman.md)!
