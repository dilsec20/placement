# 🎯 JUSPAY Quality Engineer (QE) — Hands-On Practice Tasks & Live Lab

> **Target Role:** Quality Engineer (QE / SDET Track) @ JUSPAY  
> **Package:** ₹30,000/mo Stipend ➔ **CTC ₹9.15 LPA**  
> **Prerequisites:** All tools (`python`, `pytest`, `requests`, `selenium`, `flask`) are already installed and tested in this repository!  
> **Live Practice Lab Directory:** [`c:\Users\Dilip\Desktop\Placement\Juspay_QE\practice_lab`](file:///c:/Users/Dilip/Desktop/Placement/Juspay_QE/practice_lab)

---

## ⚡ Quick Start: Spin Up Your Local Mock Server in 10 Seconds

You don't need access to real Juspay production servers to practice. We have built an interactive **Juspay Mock Server & Checkout Sandbox** right inside your repository!

### How to Run:
Open PowerShell / Terminal and run:
```powershell
cd "c:\Users\Dilip\Desktop\Placement\Juspay_QE\practice_lab"
python mock_payment_server.py
```

* 🚀 **API Endpoint:** `http://localhost:8000/api/v1`
* 💳 **Web Checkout UI:** Open your browser and visit [http://localhost:8000/checkout](http://localhost:8000/checkout)
* Keep this terminal window open while you run Postman or Selenium tests!

---

## 📮 TASK 1: API Testing in Postman (Step-by-Step with Expected Results)

During the **Juspay Online Assessment** or **Technical Interview**, interviewers frequently ask:
> *"Here is our `/txns/create` payment endpoint. Show me how you test it in Postman. Write pre-request scripts, headers, body, and test assertions."*

---

### Task 1.1: Test Happy Path Payment Creation (`200 OK`)

#### 1. Setup in Postman:
* **Method:** `POST`
* **URL:** `http://localhost:8000/api/v1/txns/create`
* **Headers:**
  | Key | Value |
  |---|---|
  | `Content-Type` | `application/json` |
  | `Authorization` | `Bearer test_qa_token_jwt` |
  | `x-merchant-id` | `SWIGGY_PROD` |
  | `x-idempotency-key` | `IDEM_TEST_99182` |

* **Body (raw JSON):**
  ```json
  {
      "order_id": "ORD_SWIGGY_1001",
      "amount": 499.00,
      "currency": "INR",
      "payment_method_type": "CARD",
      "card": {
          "number": "4111111111111111",
          "cvv": "123",
          "expiry": "12/28",
          "name": "Dilip Kumar"
      }
  }
  ```

#### 2. Scripts to put in the `Tests` Tab:
```javascript
// Test 1: Verify Status Code
pm.test("Status code is 200 OK", function () {
    pm.response.to.have.status(200);
});

// Test 2: Verify Latency SLA
pm.test("Response time is under 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

// Test 3: Validate Transaction ID format
pm.test("Transaction ID generated with txn_ prefix", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("txn_id");
    pm.expect(jsonData.txn_id).to.match(/^txn_/);
    
    // Save transaction ID for later status verification!
    pm.environment.set("saved_txn_id", jsonData.txn_id);
});

// Test 4: Business Data Integrity
pm.test("Amount, Currency and Status match expectations", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.amount).to.eql(499.00);
    pm.expect(jsonData.currency).to.eql("INR");
    pm.expect(jsonData.status).to.eql("PENDING_VBV");
});
```

#### 3. What Will Be the Expected Result?
* **Status:** `200 OK`
* **Time:** `~15 ms`
* **Response Body:**
  ```json
  {
    "amount": 499.0,
    "created_at": "2026-11-16T14:25:00.000000+00:00",
    "currency": "INR",
    "merchant_id": "SWIGGY_PROD",
    "order_id": "ORD_SWIGGY_1001",
    "payment_method": "CARD",
    "redirect_url": "/otp-verification?txn_id=txn_89ab32c14f",
    "status": "PENDING_VBV",
    "txn_id": "txn_89ab32c14f"
  }
  ```
* **Test Results Badge:** `PASS (4/4)`
  * `PASS: Status code is 200 OK`
  * `PASS: Response time is under 500ms`
  * `PASS: Transaction ID generated with txn_ prefix`
  * `PASS: Amount, Currency and Status match expectations`

---

### Task 1.2: Test Payment Idempotency (Preventing Double Charges)

> **Why this matters for Juspay:** If a user clicks "Pay" twice on a slow 3G connection, the payment gateway must **NOT** create two transactions or deduct money twice.

#### 1. Setup in Postman:
* Without changing the `x-idempotency-key` or the body from Task 1.1, hit **Send** a **second time**.

#### 2. Scripts to put in the `Tests` Tab:
```javascript
pm.test("Status code is 200 OK on duplicate key replay", function () {
    pm.response.to.have.status(200);
});

pm.test("Returns exact same TXN ID (Idempotency Rule Passed)", function () {
    var jsonData = pm.response.json();
    var originalTxnId = pm.environment.get("saved_txn_id");
    
    pm.expect(jsonData.txn_id).to.eql(originalTxnId);
    pm.expect(jsonData.idempotent_replay).to.be.true;
});
```

#### 3. Expected Result:
* `PASS: Returns exact same TXN ID (Idempotency Rule Passed)`
* The server recognizes the idempotency key and returns the identical `txn_id` with `"idempotent_replay": true`.

---

### Task 1.3: Negative Testing (Invalid Card Number & Negative Amount)

#### Scenario A: Invalid 15-Digit Card
* **Payload:** Change `"number": "411111111111111"` (15 digits).
* **Expected Status:** `400 Bad Request`
* **Assertion Script:**
  ```javascript
  pm.test("Status is 400 Bad Request", function () {
      pm.response.to.have.status(400);
  });
  pm.test("Error code is INVALID_CARD_NUMBER", function () {
      var jsonData = pm.response.json();
      pm.expect(jsonData.error_code).to.eql("INVALID_CARD_NUMBER");
  });
  ```

#### Scenario B: Negative Amount (`-250.00`)
* **Payload:** Change `"amount": -250.00`.
* **Expected Status:** `422 Unprocessable Entity`
* **Assertion Script:**
  ```javascript
  pm.test("Status is 422 Unprocessable", function () {
      pm.response.to.have.status(422);
  });
  pm.test("Error code is INVALID_AMOUNT", function () {
      pm.expect(pm.response.json().error_code).to.eql("INVALID_AMOUNT");
  });
  ```

---

### 📦 1-Click Importable Postman Collection:
We have pre-built the entire collection for you!
* **File:** [`c:\Users\Dilip\Desktop\Placement\Juspay_QE\practice_lab\juspay_postman_collection.json`](file:///c:/Users/Dilip/Desktop/Placement/Juspay_QE/practice_lab/juspay_postman_collection.json)
* **How to use:** Open Postman ➔ Click **Import** ➔ Select this JSON file ➔ Click **Run Collection**! All 5 tests will execute automatically!

---

## 🐍 TASK 2: Automated API Regression Suite (Python + Pytest)

Interviewers will ask you to write automated test scripts in Python.

### The Automated Test File:
Check [`test_api_pytest.py`](file:///c:/Users/Dilip/Desktop/Placement/Juspay_QE/practice_lab/test_api_pytest.py) in your repository. It tests:
1. `test_01_create_valid_card_payment`: Happy path card creation.
2. `test_02_idempotency_duplicate_returns_same_txn_id`: Asserting `txn_id_1 == txn_id_2`.
3. `test_03_invalid_card_rejected_with_400`: Asserting rejection of 15-digit card.
4. `test_04_negative_amount_rejected_with_422`: Asserting rejection of negative value.
5. `test_05_missing_auth_header_rejected_with_401`: Verifying authentication gating.
6. `test_06_get_transaction_status`: Querying status via GET endpoint.

### How to Run the Automation Script:
1. Make sure your mock server is running in Terminal 1 (`python mock_payment_server.py`).
2. Open Terminal 2 and run:
   ```powershell
   cd "c:\Users\Dilip\Desktop\Placement\Juspay_QE\practice_lab"
   python -m pytest test_api_pytest.py -v
   ```

### Exact Terminal Output (Verified & Working):
```text
============================= test session starts =============================
platform win32 -- Python 3.14.7, pytest-9.1.1, pluggy-1.7.0
collecting ... collected 6 items

test_api_pytest.py::test_01_create_valid_card_payment PASSED             [ 16%]
test_api_pytest.py::test_02_idempotency_duplicate_returns_same_txn_id PASSED [ 33%]
test_api_pytest.py::test_03_invalid_card_rejected_with_400 PASSED        [ 50%]
test_api_pytest.py::test_04_negative_amount_rejected_with_422 PASSED     [ 66%]
test_api_pytest.py::test_05_missing_auth_header_rejected_with_401 PASSED [ 83%]
test_api_pytest.py::test_06_get_transaction_status PASSED                [100%]

============================== 6 passed in 16.57s ==============================
```

---

## 🌐 TASK 3: End-to-End Web UI Checkout Automation (Selenium WebDriver)

During the **Learnathon** or **Technical Interview**, you will be asked:
> *"Automate the checkout UI flow: open the page, enter card details, click Pay, and assert that the OTP verification modal appears. Also test what happens if an invalid card is entered."*

### The Web UI Page Being Tested:
* Open [http://localhost:8000/checkout](http://localhost:8000/checkout) in your browser.
* You will see the **Juspay Express Checkout** card with Card & UPI tabs, live card validation, and an interactive payment modal!

### The Selenium Automation File:
Check [`test_ui_selenium.py`](file:///c:/Users/Dilip/Desktop/Placement/Juspay_QE/practice_lab/test_ui_selenium.py).

#### How the Selenium Script Works:
1. **Headless Chrome:** Runs seamlessly in memory without popping open distracting windows (ideal for CI/CD / Jenkins).
2. **Explicit Waits (`WebDriverWait`):** Never uses `time.sleep()`. Waits dynamically until DOM elements appear:
   ```python
   wait = WebDriverWait(driver, 10)
   success_modal = wait.until(EC.visibility_of_element_located((By.ID, "success-modal")))
   ```
3. **Form Automation:** Clears inputs, types 16-digit card number, types CVV, clicks `#btn-pay`.
4. **Assertions:** Asserts `#modal-txn-id` displays `"TXN ID: txn_..."`.
5. **Negative Test:** Types only 10 digits, clicks Pay, and asserts that `#card-number-error` becomes visible with red text.

### How to Run the Selenium Script:
Run:
```powershell
cd "c:\Users\Dilip\Desktop\Placement\Juspay_QE\practice_lab"
python -m pytest test_ui_selenium.py -v
```

### Exact Terminal Output (Verified & Working):
```text
============================= test session starts =============================
platform win32 -- Python 3.14.7, pytest-9.1.1, pluggy-1.7.0
collecting ... collected 4 items

test_ui_selenium.py::test_01_checkout_page_loads_with_correct_merchant PASSED [ 25%]
test_ui_selenium.py::test_02_successful_card_payment_flow PASSED         [ 50%]
test_ui_selenium.py::test_03_invalid_short_card_shows_validation_error PASSED [ 75%]
test_ui_selenium.py::test_04_tab_switching_navigation PASSED             [100%]

============================== 4 passed in 22.45s ==============================
```

> **Want to watch Chrome click on screen visually?**  
> In `test_ui_selenium.py`, comment out the line:
> `chrome_options.add_argument("--headless=new")`  
> When you run the script, Chrome will visibly open, fill the form, and click Pay right before your eyes!

---

## 🔍 TASK 4: The Learnathon Real-World Log Analysis Challenge

Juspay's signature **Learnathon Round** gives candidates a dump of server logs and asks them to find failed transactions, identify root causes, and write professional bug reports.

### The Problem Statement:
Below is a raw server log excerpt from Juspay's payment router. **Identify the 2 failed transactions, state the root cause, and write a Jira bug report.**

```text
2026-11-16 14:00:01 INFO  [Router] TXN_101 | Method: UPI | Amount: 299.00 | Gateway: HDFC | Status: 200 OK | Latency: 120ms
2026-11-16 14:00:03 ERROR [Router] TXN_102 | Method: CARD | Amount: 850.00 | Gateway: ICICI | Status: 504 GATEWAY_TIMEOUT | Bank upstream did not respond within 15000ms
2026-11-16 14:00:05 INFO  [Router] TXN_103 | Method: CARD | Amount: 1200.00 | Gateway: SBI | Status: 200 OK | Latency: 310ms
2026-11-16 14:00:08 WARN  [Router] TXN_104 | Method: UPI | Amount: 50.00 | Gateway: AXIS | Status: 400 REJECTED | Reason: VPA_NOT_FOUND (user entered nonexistent @okaxis)
2026-11-16 14:00:10 INFO  [Router] TXN_105 | Method: CARD | Amount: 499.00 | Gateway: HDFC | Status: 200 OK | Latency: 145ms
2026-11-16 14:00:14 ERROR [Router] TXN_106 | Method: CARD | Amount: 999.00 | Gateway: ICICI | Status: 504 GATEWAY_TIMEOUT | Bank upstream did not respond within 15000ms
```

### The Analysis Solution:
1. **Transaction Failures:**
   * `TXN_102` and `TXN_106` both failed with `504 GATEWAY_TIMEOUT` on the **ICICI Bank Gateway**.
   * Upstream timeout exceeded 15,000ms (15 seconds).
2. **Root Cause Analysis (RCA):**
   * The ICICI payment gateway upstream route is degraded or hanging. 100% of ICICI card attempts are timing out, while HDFC and SBI are completing successfully in under 350ms.
3. **Action Required:**
   * Dynamic routing rule should immediately down-rank ICICI and divert all card traffic to HDFC/SBI to prevent further customer drops.

### Model Bug Ticket to Submit to Your Mentor:
```markdown
### 🐞 [BUG] Upstream Gateway Timeout (504) on ICICI Card Route
* **Severity:** S1 (Critical) | **Priority:** P1 (High)
* **Component:** Payment Router / Upstream Gateway Integration
* **Environment:** Production / Merchant Swiggy
* **Transactions Affected:** TXN_102, TXN_106

#### Summary:
Card transactions routed through the ICICI Gateway are timing out after 15,000ms with HTTP 504 GATEWAY_TIMEOUT, while HDFC and SBI gateways are healthy (<350ms).

#### Steps to Reproduce:
1. Initiate payment with `payment_method_type: CARD`.
2. Router assigns transaction to ICICI Gateway.
3. Upstream bank handshake fails to respond within 15 seconds.

#### Expected Behavior:
Payment router should auto-fallback to secondary bank gateway after 5s or route around degraded ICICI node.

#### Suggested Fix:
Trigger automated circuit breaker on ICICI node and shift card volume to backup gateway (HDFC/SBI).
```

---

## 🏋️ 5 Bonus Practice Challenges (For Independent Practice)

Try these yourself in the `practice_lab` directory:

1. **Challenge 1 (API - UPI Validation):**
   * Edit `test_api_pytest.py` to add a test `test_upi_invalid_vpa()`. Send `"vpa": "invalid_user"` (without `@`). Assert it returns `400 Bad Request` with `error_code: "INVALID_VPA"`.
2. **Challenge 2 (UI - UPI Tab Automation):**
   * Edit `test_ui_selenium.py` to click `#tab-upi`, type `"rahul@oksbi"` into `#upi-vpa`, click `#btn-pay-upi`, and assert the success modal appears.
3. **Challenge 3 (Refund API Test):**
   * Call `POST /api/v1/refunds` with a refund amount higher than the transaction amount. Assert that the server rejects it with `422 REFUND_EXCEEDS_AMOUNT`.
4. **Challenge 4 (Postman Newman CLI):**
   * Run your Postman collection directly from your command line:
     ```powershell
     npx newman run juspay_postman_collection.json
     ```
5. **Challenge 5 (Jenkins Integration):**
   * Use the `Jenkinsfile` from [08_Jenkins_and_CICD_Automation.md](file:///c:/Users/Dilip/Desktop/Placement/Juspay_QE/08_Jenkins_and_CICD_Automation.md) and explain line-by-line how it would trigger `pytest test_api_pytest.py`.

---

## 📂 Practice Lab File Directory Index

| File | Purpose |
|---|---|
| [`mock_payment_server.py`](file:///c:/Users/Dilip/Desktop/Placement/Juspay_QE/practice_lab/mock_payment_server.py) | Local Flask server simulating Juspay Payment Gateway & APIs. |
| [`mock_checkout.html`](file:///c:/Users/Dilip/Desktop/Placement/Juspay_QE/practice_lab/mock_checkout.html) | Interactive web checkout UI with Card & UPI forms for testing. |
| [`juspay_postman_collection.json`](file:///c:/Users/Dilip/Desktop/Placement/Juspay_QE/practice_lab/juspay_postman_collection.json) | 1-Click importable Postman collection with JavaScript test scripts. |
| [`test_api_pytest.py`](file:///c:/Users/Dilip/Desktop/Placement/Juspay_QE/practice_lab/test_api_pytest.py) | 6 automated Python tests (Happy path, Idempotency, 400/401/422). |
| [`test_ui_selenium.py`](file:///c:/Users/Dilip/Desktop/Placement/Juspay_QE/practice_lab/test_ui_selenium.py) | 4 automated Selenium tests (Headless Chrome, Explicit waits, Error checks). |
