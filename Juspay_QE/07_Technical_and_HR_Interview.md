# 🎙️ Stage 7 — Technical & HR Interview Questions & Model Answers

> **Format:** 2 Technical Rounds + 1 Managerial/HR Discussion  
> **Source:** Compiled from verified Juspay QA/QE interview reports on LinkedIn, Glassdoor, and GeeksforGeeks.  
> **What Interviewers Look For:** Structured thought process, technical depth in automation/APIs, and a relentless focus on **resilience and edge cases**.

---

# 🌐 Category 1: Selenium & UI Automation (10 Qs)

#### Q1. "How would you structure a production-grade Selenium automation framework from scratch?"
* **Model Answer:**  
  "I structure automation frameworks using the **Page Object Model (POM)** combined with **pytest** in Python. The directory structure is divided into:
  1. `pages/`: BasePage (encapsulating dynamic `WebDriverWait`, click, and type wrappers) and individual Page Classes containing locators (By tuple) and user action methods.
  2. `tests/`: Pure test logic with assertions (`test_checkout.py`), keeping locators out of test scripts.
  3. `config/` & `conftest.py`: Fixtures managing driver initialization, headless browser options, and teardown (`yield driver; driver.quit()`).
  4. `utils/`: Test data loaders (JSON/Excel), custom loggers, and screenshot capturers on test failure.
  5. `reports/`: HTML test execution reports and CI/CD integration via GitHub Actions or Jenkins."

#### Q2. "What is the difference between Implicit Wait, Explicit Wait, and Fluent Wait?"
* **Model Answer:**
  * **Implicit Wait:** A global setting applied to all `find_element` calls that polls the DOM for up to $N$ seconds. It only checks *presence* in DOM, not *interactability*.
  * **Explicit Wait (`WebDriverWait`):** Custom condition evaluated on a specific element until a condition is met (e.g. `element_to_be_clickable`, `visibility_of`). It resumes immediately when ready, avoiding unnecessary delay.
  * **Fluent Wait:** An explicit wait variant where you configure the maximum timeout, the polling frequency (e.g. check every 250ms), and explicitly ignore specific exceptions like `NoSuchElementException` during polling.

#### Q3. "How do you handle elements inside an `<iframe>` (like a Payment Gateway form)?"
* **Model Answer:**  
  "Selenium cannot locate elements inside an iframe by default. I switch the driver context into the iframe first:
  ```python
  wait.until(EC.frame_to_be_available_and_switch_to_it((By.ID, "juspay-checkout-iframe")))
  # Interact with elements inside
  driver.find_element(By.ID, "card-number").send_keys("4111111111111111")
  # Return back to main DOM
  driver.switch_to.default_content()
  ```
  Failing to call `switch_to.default_content()` after finishing will cause subsequent element lookups in the parent document to fail."

#### Q4. "What is a `StaleElementReferenceException` and how do you resolve it?"
* **Model Answer:**  
  "It occurs when an element was located in the DOM, but before the driver interacted with it, the DOM updated, refreshed, or re-rendered, detaching that node reference.
  * **Solutions:**
    1. Re-locate the element immediately prior to interaction: `wait.until(EC.presence_of_element_located(locator)).click()`.
    2. Wrap the interaction in a retry loop (e.g., attempt 3 times with a try-except block).
    3. Use JavaScript executor: `driver.execute_script("arguments[0].click();", element)`."

#### Q5. "How do you handle OTP or Two-Factor Authentication in automated UI tests?"
* **Model Answer:**  
  "In production test automation, you should never attempt to automate SMS delivery over cellular networks because telco delays introduce severe test flakiness.
  * **Industry Best Practices:**
    1. **Mock / Fixed Test OTP:** In Staging/Sandbox environments, configure mock test OTPs (e.g., `123456` or `000000`) for test phone numbers.
    2. **Direct Backend API / Redis Query:** The test automation script queries the test Redis server or a QA helper API: `GET /api/test/otp?phone=+919876543210` to fetch the generated OTP directly.
    3. **TOTP / Authenticator Secrets:** For Google Authenticator flows, use the Python `pyotp` library with the shared secret key to generate the 6-digit TOTP code dynamically in code."

---

# 🔌 Category 2: API & Backend Testing (10 Qs)

#### Q6. "Explain the difference between `401 Unauthorized` and `403 Forbidden`."
* **Model Answer:**  
  * **`401 Unauthorized`:** Authentication has failed or is missing. The server does not know who the client is (e.g., missing API token or expired JWT). The client can retry with valid credentials.
  * **`403 Forbidden`:** Authentication was successful (the server knows who you are), but the client does NOT possess authorization permissions to access this specific resource (e.g. a Merchant employee attempting to delete a Global Juspay System Admin configuration). Providing credentials again will not help.

#### Q7. "What is the difference between `PUT` and `PATCH` in REST APIs?"
* **Model Answer:**  
  * **`PUT`:** Full resource replacement. The client must supply the entire resource representation. Any unsupplied fields are typically overwritten or reset to default/null.
  * **`PATCH`:** Partial resource modification. The client provides only the specific key-value pairs that need updating (e.g., `{ "status": "REFUNDED" }`), leaving other fields untouched.

#### Q8. "How do you validate a JSON response schema in Postman?"
* **Model Answer:**  
  "I define a JSON Schema object containing required fields, data types, string regexes, and enums, then assert using Postman's built-in AJV validator:
  ```javascript
  const schema = {
      "type": "object",
      "required": ["payment_id", "status", "amount"],
      "properties": {
          "payment_id": { "type": "string" },
          "status": { "type": "string", "enum": ["PENDING", "SUCCESS", "FAILED"] },
          "amount": { "type": "number", "minimum": 1 }
      }
  };
  pm.test("Schema is valid", () => {
      pm.response.to.have.jsonSchema(schema);
  });
  ```
  This guarantees contract adherence even if field values change."

#### Q9. "How do you test API Rate Limiting (e.g. 100 requests / minute)?"
* **Model Answer:**  
  "I write an automated script in Python or use a Postman Collection Runner:
  1. Send 100 rapid requests within 60 seconds; assert that all return `200 OK`.
  2. Send the 101st request; assert that the API returns **`429 Too Many Requests`**.
  3. Validate headers: `Retry-After: 60`, `X-RateLimit-Limit: 100`, `X-RateLimit-Remaining: 0`.
  4. Wait for the cooldown window to elapse; assert that subsequent requests succeed again."

---

# 💳 Category 3: Payment Domain & Resiliency (10 Qs)

#### Q10. "A user clicks 'Pay Now' and the bank account is debited, but the merchant order page shows 'Payment Failed'. What happened and how do you test it?"
* **Model Answer:**  
  "This is a classic **Asynchronous Reconciliation Disconnect**:
  * **Root Causes:**
    1. The customer was debited at the bank, but the bank's redirect back to Juspay was interrupted by network drop or browser closure.
    2. The bank's webhook to Juspay was delayed or failed with a 5xx error.
  * **How to Test & Mitigate:**
    1. Verify that the transaction is held in **`PENDING`** state rather than immediately defaulting to `FAILED`.
    2. Test the **Reconciliation Cron Job**: Simulate an unconfirmed transaction and verify that the background worker queries the bank's transaction status API (`GET /bank/tx/{id}`), retrieves the `SUCCESS` state, updates the ledger, and notifies the merchant to fulfill the order.
    3. Test the **Auto-Refund Flow**: If the bank was debited but the merchant order timed out, verify that an automated refund is triggered to the source account."

#### Q11. "How do you test Payment Idempotency?"
* **Model Answer:**  
  "1. Generate a single UUID `Idempotency-Key: e9a2-4bf...`.
  2. Fire two concurrent requests with identical payloads and the same Idempotency-Key.
  3. Assertions:
     - Only ONE debit transaction record is created in the database.
     - Both requests receive the same response status and payment ID.
     - The second request must NEVER trigger a second bank charge.
  4. Also test with different payloads using the same key: the API must reject with `400 Bad Request` or `422 Unprocessable Entity` because payload parameters changed under the same key."

---

# 🔍 Category 4: Debugging & Flakiness (10 Qs)

#### Q12. "An automated test passed yesterday in CI, but failed today with zero code changes. How do you investigate?"
* **Model Answer:**  
  "This indicates a **Flaky Test or Environment Drift**:
  1. **Inspect Artifacts:** Review the CI test failure logs, stack trace, and captured failure screenshot.
  2. **Isolate Root Cause:**
     - *Timing / Race Condition:* Did an element take 3.2s to load when explicit wait was 3.0s?
     - *Test Data Pollution:* Did yesterday's test run consume or mutate test data (e.g. an order ID or voucher code) that was not cleaned up?
     - *Third-Party Dependency:* Did a mock server or sandbox bank endpoint experience downtime?
  3. **Local Reproduction:** Run the test locally in a loop 20 times (`pytest -k test_name --count=20`) under throttled network conditions to observe intermittent failure points."

#### Q13. "How do you distinguish an application bug from an automation script bug?"
* **Model Answer:**  
  "1. **Manual Reproduction:** I manually execute the exact steps described in the test script in the staging browser/API. If the application misbehaves manually, it is an **Application Bug**.
  2. **Inspect Failure Reason:** If manual execution works smoothly, the script has an **Automation Bug** (e.g., stale element reference, improper wait condition, hardcoded locator changed by frontend developers, or race condition in test assertions)."

---

# 🤖 Category 5: AI in Quality Engineering (5 Qs)

#### Q14. "Can AI replace Quality Engineers?"
* **Model Answer:**  
  "No, but Quality Engineers who use AI will replace those who don't.
  * **Where AI Excels:** Generating boilerplate test cases, discovering edge cases through combinatorial expansion, writing regex parsers, and synthesizing synthetic mock test data.
  * **Where AI Fails:** AI has zero real-world business context, cannot understand nuanced financial risk models, cannot evaluate subjective user experience, and frequently hallucinates invalid test assertions. Human engineers remain essential for critical test design, architecture, and production risk validation."

#### Q15. "How would you use an LLM to generate test cases safely?"
* **Model Answer:**  
  "I provide the LLM with structured System Prompts including the API JSON schema, business rules, and boundary constraints. I explicitly ask it for:
  1. Equivalence partitions (valid vs invalid).
  2. Boundary values ($min-1, min, max, max+1$).
  3. Security payloads (SQL injection, XSS, null bytes, long strings).
  Then, as a QE, I review every generated case against technical requirements before committing them into the regression suite."

---

# 🤝 Category 6: Behavioral & Juspay Cultural Fit (5 Qs)

#### Q16. "A developer says: 'This bug is too minor to fix right before release, and it works on my machine.' How do you handle this?"
* **Model Answer:**  
  "I never make it personal. I rely strictly on objective data:
  1. I share clear evidence: step-by-step reproduction steps, browser/OS version, and video recording.
  2. I explain the business risk rather than technical ego: *'While it works on your high-speed development network, under 3G latency on Android, it causes a 500 error for users attempting checkout, directly risking payment drop-off.'*
  3. If there is a genuine time constraint, I collaborate with the developer and Product Manager to assess whether we can deploy a temporary fallback or defer with documented monitoring."

#### Q17. "Why do you want to join Juspay as a Quality Engineer?"
* **Model Answer:**  
  "Juspay is the technological backbone of India's digital payment revolution, processing billions in Gross Merchandise Value. At this scale, quality is not a checklist—it is the core product feature. I am passionate about moving beyond manual validation into building automated test harnesses, testing high-concurrency API orchestration, and ensuring zero-downtime payments."

---

## ❓ 3 Great Questions to Ask the Juspay Interviewer

1. *"How does the Juspay QE team currently simulate third-party bank downtime and intermittent gateway latencies during automated CI/CD pipeline runs?"*
2. *"With the rapid growth of Hyperswitch (Juspay's open-source payment orchestrator), what are the biggest automation and quality challenges when supporting global payment rails like Stripe, Adyen, and UPI simultaneously?"*
3. *"What distinguishes an exceptional Quality Engineer intern at Juspay within the first 90 days?"*

---

> **Preparation Complete!** Review your cheat sheets and conquer the Juspay Quality Engineer on-campus drive with total confidence!
