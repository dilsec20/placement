# ⚙️ Module 08: Automation Scripts & Jenkins CI/CD for Quality Engineers

> **Target Role:** Quality Engineer (QE / SDET) @ JUSPAY  
> **Prerequisites:** None — Written from first principles for absolute beginners.

---

## 📌 Executive Summary: The Big Picture

If you have never written automated tests or used Jenkins before, here is the simplest explanation:

1. **What is an "Automation Script"?**
   * When a human tests an app, they open a browser, click buttons, enter credit card numbers, or open Postman and press "Send". This is **Manual Testing**.
   * An **Automation Script** is a short Python (or Java/JS) program written by the Quality Engineer that does this *programmatically without human intervention* — it launches the browser, sends the payment request, checks if the database updated, and verifies that the response is correct in milliseconds.

2. **Why do we need Jenkins?**
   * If you have 500 automation scripts on your laptop, how does the company run them? Do you wake up at 2 AM to run them when developers deploy code? No!
   * **Jenkins is an automated robot server (CI/CD tool)**. Whenever a developer pushes new code to GitHub, Jenkins automatically pulls the code, deploys it to a test server, **triggers your Python automation scripts**, and generates a report.
   * If any test fails, Jenkins **blocks the deployment** so broken code never reaches real customers.

---

## 🗺️ Part 1: Which Parts of the System Do You Write Automation Scripts For?

In a fintech and payment gateway company like **Juspay** (which powers payments for Swiggy, Flipkart, Cred, and Amazon), your application is split into multiple layers. You write automation scripts for **4 distinct layers**:

```
                       ┌──────────────────────────────────────────────┐
                       │           THE APPLICATION LAYERS             │
                       └──────────────────────────────────────────────┘

  1. WEB UI / CHECKOUT SDK         2. MOBILE SDK (Android/iOS)
  [Embedded Iframe on Swiggy]       [HyperSDK inside Zepto / Cred]
  Tools: Selenium, Playwright       Tools: Appium, UIAutomator
         │                                 │
         └─────────────────┬───────────────┘
                           │ (HTTP/HTTPS Requests)
                           ▼
  3. BACKEND REST APIS (Microservices)  <-- ⭐ 65% OF JUSPAY QE WORK!
  [/txns/create, /orders, /refunds, /session]
  Tools: Python (pytest + requests), Postman + Newman
                           │
                           ▼
  4. DATABASE & RECONCILIATION LEDGER
  [PostgreSQL, Redis, Kafka queues]
  Tools: Python (psycopg2, sqlalchemy)
```

---

### Detailed Breakdown of the 4 Parts:

| # | System Part / Layer | What Actually Runs There? | What Your Automation Script Does | Tools Used |
|---|---|---|---|---|
| **1** | **Backend REST APIs** *(65% of test suite)* | Payment engine, routing microservices, order creation, refund logic. | Sends JSON payloads directly to backend endpoints, verifies HTTP status `200 OK`, validates JSON schema, verifies idempotency keys, tests timeout retries. | **Python (`pytest` + `requests`)**, Postman / Newman |
| **2** | **Web Checkout UI (Iframe SDK)** *(15% of test suite)* | The payment popup you see when checking out on Amazon or Swiggy desktop web. | Opens headless Chrome, switches into payment iframe, types card number, selects UPI/Netbanking, clicks "Pay Now", asserts that OTP modal or success redirect occurs. | **Python + Selenium WebDriver**, Playwright |
| **3** | **Mobile App & HyperSDK** *(10% of test suite)* | Juspay HyperSDK embedded inside Android/iOS merchant apps (e.g. Swiggy, Cred). | Launches app on Android Emulator, clicks "Pay via UPI", checks if PhonePe/GPay intent opens, simulates biometric prompt, tests back-button press. | **Appium + Python**, Android ADB |
| **4** | **Database & Data Integrity** *(10% of test suite)* | PostgreSQL tables (`transactions`, `orders`, `merchant_ledgers`). | Connects directly to DB after an API payment test, asserts that `status == 'CHARGED'`, verifies no duplicate debit records exist, verifies timestamps. | **Python (`psycopg2`)**, SQL queries |

---

## 💻 Part 2: Concrete Code Examples for Each Automation Script

Let's look at real-world scripts you will actually write as a Quality Engineer.

### 1. The API Automation Script (`test_payment_api.py`)

This script tests Juspay's payment initiation endpoint. It simulates a merchant sending a ₹500 payment request.

```python
"""
FILE: tests/api/test_payment_api.py
PURPOSE: Automated regression test for Juspay Payment Creation API.
RUN WITH: pytest tests/api/test_payment_api.py -v
"""
import uuid
import requests
import pytest

BASE_URL = "https://sandbox.juspay.in/api/v1"
API_KEY = "test_api_key_xyz123"

@pytest.fixture
def api_headers():
    """Standard authenticated headers for API requests."""
    return {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
        "x-merchant-id": "MERCHANT_SWIGGY_PROD"
    }

def test_successful_card_payment_initiation(api_headers):
    """
    TEST CASE: Verify that a valid card payment initiation returns 200 OK
    and a valid transaction status of 'PENDING_VBV' (waiting for OTP).
    """
    idempotency_key = str(uuid.uuid4())
    payload = {
        "order_id": f"ORD_{uuid.uuid4().hex[:8]}",
        "amount": 500.00,
        "currency": "INR",
        "customer_id": "CUST_998877",
        "payment_method_type": "CARD",
        "card": {
            "number": "4111111111111111",  # Test Visa Card
            "expiry_month": "12",
            "expiry_year": "2028",
            "cvv": "123"
        }
    }
    
    headers = api_headers.copy()
    headers["x-idempotency-key"] = idempotency_key

    # Act: Send HTTP POST to initiate payment
    response = requests.post(f"{BASE_URL}/txns/create", json=payload, headers=headers)

    # Assert 1: HTTP Status must be 200 OK
    assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
    
    data = response.json()
    
    # Assert 2: Business Logic Validation
    assert data["status"] in ["PENDING_VBV", "INITIATED"]
    assert data["amount"] == 500.00
    assert "txn_id" in data
    assert data["txn_id"].startswith("txn_")
    print(f"\n[PASS] Payment initiated successfully with TXN ID: {data['txn_id']}")

def test_idempotency_blocks_duplicate_charge(api_headers):
    """
    TEST CASE: Sending the exact same request twice with the SAME Idempotency Key
    MUST NOT create two payments. The second call must return cached first response.
    """
    shared_key = f"IDEM_{uuid.uuid4().hex[:10]}"
    payload = {
        "order_id": f"ORD_{uuid.uuid4().hex[:8]}",
        "amount": 250.00,
        "currency": "INR"
    }
    headers = api_headers.copy()
    headers["x-idempotency-key"] = shared_key

    # Call 1: First attempt
    res1 = requests.post(f"{BASE_URL}/txns/create", json=payload, headers=headers)
    assert res1.status_code == 200
    txn_id_1 = res1.json()["txn_id"]

    # Call 2: Accidental duplicate retry (e.g. user double clicked "Pay")
    res2 = requests.post(f"{BASE_URL}/txns/create", json=payload, headers=headers)
    assert res2.status_code == 200
    txn_id_2 = res2.json()["txn_id"]

    # Crucial Assertion: Both calls must return the SAME transaction ID!
    assert txn_id_1 == txn_id_2, "Idempotency FAILED! Created duplicate charge!"
    print(f"\n[PASS] Idempotency verified: Both calls returned same TXN ID: {txn_id_1}")
```

---

### 2. The Web UI Checkout Automation Script (`test_checkout_ui.py`)

This script launches a browser, opens the checkout page, interacts with the payment iframe, and verifies the card entry UI.

```python
"""
FILE: tests/ui/test_checkout_ui.py
PURPOSE: Automate Web Checkout iframe interaction using Selenium WebDriver.
RUN WITH: pytest tests/ui/test_checkout_ui.py --headless
"""
import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

@pytest.fixture
def driver():
    options = Options()
    options.add_argument("--headless=new")  # Required for running in Jenkins (no display)
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--window-size=1920,1080")
    
    driver = webdriver.Chrome(options=options)
    driver.implicitly_wait(10)
    yield driver
    driver.quit()

def test_juspay_checkout_iframe_card_validation(driver):
    """
    TEST CASE: Verify that selecting 'Credit Card' in Juspay Checkout
    and entering a test card displays the bank OTP redirect button.
    """
    # 1. Open mock merchant checkout page
    driver.get("https://sandbox.juspay.in/demo-checkout")
    
    # 2. Switch inside Juspay's payment iframe
    wait = WebDriverWait(driver, 15)
    iframe_element = wait.until(EC.presence_of_element_located((By.ID, "juspay-checkout-iframe")))
    driver.switch_to.frame(iframe_element)
    
    # 3. Click 'Cards' accordion
    card_tab = wait.until(EC.element_to_be_clickable((By.XPATH, "//div[contains(text(), 'Cards')]")))
    card_tab.click()
    
    # 4. Fill card details
    driver.find_element(By.ID, "card-number-input").send_keys("4111111111111111")
    driver.find_element(By.ID, "card-exp-input").send_keys("12/28")
    driver.find_element(By.ID, "card-cvv-input").send_keys("123")
    
    # 5. Click 'Proceed to Pay'
    pay_btn = driver.find_element(By.ID, "submit-payment-btn")
    assert pay_btn.is_enabled(), "Pay button should be active for 16-digit card!"
    pay_btn.click()
    
    # 6. Verify OTP screen loader appears
    otp_header = wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "otp-verification-header")))
    assert "Enter OTP" in otp_header.text
    print("\n[PASS] UI Checkout verified up to OTP screen!")
```

---

### 3. The Database Integrity Assertion Script (`test_db_reconciliation.py`)

This script verifies that the database state matches the API response (preventing "phantom payments").

```python
"""
FILE: tests/db/test_db_reconciliation.py
PURPOSE: Automated check to assert Database records match Payment API state.
"""
import psycopg2
import pytest

DB_CONFIG = {
    "dbname": "juspay_payments_test",
    "user": "test_qa_user",
    "password": "qa_secure_password",
    "host": "staging-db.juspay.internal",
    "port": 5432
}

def get_transaction_record(txn_id):
    """Query PostgreSQL directly to fetch the transaction row."""
    conn = psycopg2.connect(**DB_CONFIG)
    cursor = conn.cursor()
    cursor.execute("SELECT txn_id, order_id, amount, status FROM transactions WHERE txn_id = %s;", (txn_id,))
    record = cursor.fetchone()
    conn.close()
    return record

def test_db_reflects_charged_payment():
    sample_txn_id = "txn_8847291038"  # Result from API test
    
    row = get_transaction_record(sample_txn_id)
    assert row is not None, f"Transaction {sample_txn_id} not found in PostgreSQL!"
    
    txn_id, order_id, amount, status = row
    assert status == "CHARGED", f"Database status should be CHARGED, but was {status}"
    assert float(amount) == 500.00
    print(f"\n[PASS] Database state verified for {txn_id}: Status={status}, Amount={amount}")
```

---

## 🏗️ Part 3: What is Jenkins and Why Do We Need It?

### The "Before vs After" Jenkins Picture:

#### ❌ Life Without Jenkins (Manual & Fragile):
1. Developer Dev-1 writes new code for UPI Auto-pay and merges it.
2. Dev-1 forgets to tell the QA team.
3. The broken code gets deployed straight to production at 6:00 PM.
4. Real Swiggy users cannot order dinner because UPI fails! ₹10 Crore transaction volume lost.

#### ✅ Life With Jenkins (Automated CI/CD Quality Gate):
1. Developer Dev-1 creates a Pull Request (PR) on GitHub.
2. **GitHub immediately notifies Jenkins via a Webhook.**
3. **Jenkins automatically spins up an isolated Linux container:**
   * It pulls the new code.
   * It builds and deploys it to a private staging environment.
   * **Jenkins executes YOUR automation test suite (`pytest tests/`)**.
4. **The Gatekeeper:**
   * **If all 250 tests PASS:** Jenkins reports `✅ All Tests Passed` on GitHub PR. The PR is allowed to merge.
   * **If even 1 test FAILS:** Jenkins marks the PR with `❌ Build Failed: test_payment_api.py FAILED`. The deploy button is LOCKED! The developer cannot deploy broken code.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        THE JENKINS CONTINUOUS TESTING PIPELINE                         │
└────────────────────────────────────────────────────────────────────────────────────────┘

 [Developer] 
     │ git push (Pull Request)
     ▼
 [GitHub / GitLab] 
     │ Webhook Trigger
     ▼
 [JENKINS SERVER]
     │
     ├── STAGE 1: Checkout Code (git clone repository)
     │
     ├── STAGE 2: Install Dependencies (pip install -r requirements.txt)
     │
     ├── STAGE 3: Run Unit Tests (Developer unit tests)
     │
     ├── STAGE 4: Deploy to Staging Environment
     │
     ├── STAGE 5: ⭐ RUN QE AUTOMATION SCRIPTS (The Quality Gate!)
     │            ├── Step A: Run API Regression (pytest tests/api/)
     │            ├── Step B: Run UI Checkout Tests (pytest tests/ui/ --headless)
     │            └── Step C: Run Database Verification (pytest tests/db/)
     │
     ├── STAGE 6: Generate Test Report (Allure / JUnit HTML Report)
     │
     └── DECISION GATE:
            ├── If ANY test failed ➔ ❌ BLOCK RELEASE + Ping Slack #alerts-payments
            └── If ALL tests passed ➔ ✅ APPROVE PR / Auto-Deploy to Production
```

---

## 📜 Part 4: The Jenkinsfile (Pipeline as Code)

In modern companies like Juspay, Jenkins is configured using a file called **`Jenkinsfile`** stored directly in the Git repository.

Here is the exact `Jenkinsfile` that runs the automation scripts we wrote above:

```groovy
pipeline {
    // Run on a Docker agent with Python 3.11 installed
    agent {
        docker {
            image 'python:3.11-slim'
            args '-u root'
        }
    }

    environment {
        ENV = 'staging'
        TEST_API_URL = 'https://staging.juspay.internal/api/v1'
        SLACK_CHANNEL = '#qe-payment-alerts'
    }

    stages {
        stage('1. Checkout Code') {
            steps {
                echo 'Pulling latest code and test automation repository...'
                checkout scm
            }
        }

        stage('2. Setup Environment') {
            steps {
                sh '''
                    echo "Setting up Python virtual environment..."
                    python -m venv venv
                    . venv/bin/activate
                    pip install --upgrade pip
                    pip install -r requirements.txt
                '''
            }
        }

        stage('3. Run API Automation Suite') {
            steps {
                sh '''
                    . venv/bin/activate
                    echo "Executing API Regression Tests against Staging..."
                    # Run pytest and output results in JUnit XML format for Jenkins reporting
                    pytest tests/api/ --junitxml=reports/api_results.xml -v
                '''
            }
        }

        stage('4. Run UI Headless Smoke Suite') {
            steps {
                sh '''
                    . venv/bin/activate
                    echo "Running Headless Chrome Checkout UI Tests..."
                    pytest tests/ui/ --junitxml=reports/ui_results.xml -v
                '''
            }
        }

        stage('5. Run DB Integrity Checks') {
            steps {
                sh '''
                    . venv/bin/activate
                    echo "Verifying Database Ledger Consistency..."
                    pytest tests/db/ --junitxml=reports/db_results.xml -v
                '''
            }
        }
    }

    // Post-actions run after all stages finish
    post {
        always {
            echo 'Publishing Test Results to Jenkins UI...'
            // Generates the green/red charts on the Jenkins dashboard
            junit 'reports/*.xml'
        }
        success {
            echo '✅ All Automation Tests Passed! Release Gate Approved.'
        }
        failure {
            echo '❌ Automation Tests Failed! Sending notification to Slack...'
            // Alert developers that a bug was caught
            slackSend channel: env.SLACK_CHANNEL,
                      color: '#FF0000',
                      message: "CRITICAL: Automated Payment Tests FAILED on build ${env.BUILD_NUMBER}. Deployment BLOCKED. Check report: ${env.BUILD_URL}"
        }
    }
}
```

---

## 🎯 Part 5: Top 10 Jenkins & Automation Interview Questions for Juspay QE

### Q1: What is the difference between Smoke Testing and Regression Testing in Jenkins?
* **Answer:**
  * **Smoke Testing (Sanity):** A fast test suite (runs in 2–5 minutes) testing only the critical "happy paths" (e.g., Can a user create an order? Can a payment succeed?). It runs on *every single commit / pull request*.
  * **Regression Testing:** A comprehensive test suite (runs in 30–60 minutes) testing all edge cases, negative scenarios, boundary values, and refunds. It runs *nightly via a scheduled Jenkins cron job* (e.g. at 2:00 AM) or before a major release.

### Q2: How do you run UI tests (Selenium) in Jenkins if Jenkins runs on a Linux server without a monitor/screen?
* **Answer:**
  * Standard browsers need a display server (X11). On a headless CI/CD Linux server, we use:
    1. **Headless Mode:** Passing `--headless=new` in Chrome/Firefox options (runs browser in memory without rendering pixels).
    2. **Virtual Framebuffer (Xvfb):** Emulates a virtual monitor in memory.
    3. **Dockerized Selenium Grid:** Running a Docker container containing a standalone headless Chrome instance.

### Q3: What is a "Flaky Test", and why is it dangerous in Jenkins? How do you fix it?
* **Answer:**
  * A **Flaky Test** is a test that passes sometimes and fails other times without any change in the application code (usually due to network latency, hardcoded `sleep()`, or race conditions).
  * **Why it's dangerous:** If tests fail randomly in Jenkins, developers stop trusting test results ("Oh, that test always fails, just ignore it and deploy"). This causes real production bugs to slip through!
  * **How to fix it:**
    1. Replace `time.sleep()` with dynamic `WebDriverWait` (Explicit Waits).
    2. Ensure test isolation (tests must create their own unique dummy order IDs and not share state).
    3. Use retry mechanisms (e.g. `pytest-rerunfailures`) for transient network glitches while investigating root causes.

### Q4: What happens when a test fails in a Jenkins Pipeline?
* **Answer:**
  * Pytest exits with a non-zero exit code (e.g. code `1`).
  * Jenkins detects the failure and immediately marks the stage as **FAILED (RED)**.
  * Any downstream stages (like "Deploy to Production") are **skipped**.
  * The `post { failure { ... } }` block triggers, sending a webhook alert to Slack with the failure log and stack trace, blocking the PR merge on GitHub.

### Q5: How do you pass secrets (like API keys, DB passwords) securely into Jenkins automation scripts?
* **Answer:**
  * Never hardcode passwords in Git code.
  * We use **Jenkins Credentials Manager** (or AWS Secrets Manager / HashiCorp Vault).
  * In the `Jenkinsfile`, we bind secrets to environment variables using `withCredentials([string(credentialsId: 'JUSPAY_SECRET_KEY', variable: 'API_KEY')])`.
  * The Python script reads them via `os.environ.get("API_KEY")`.

---

## 📋 Summary Checklist for Your Interview

When the interviewer asks:
> *"What kind of automation scripts will you write here, and how will you use Jenkins?"*

**Give this structured, high-impact answer:**
1. *"As a QE at Juspay, I'll write automation scripts across three key tiers: **API Automation** using Python (`pytest` + `requests`) to test payment endpoints, idempotency, and status webhooks; **UI Checkout Automation** using Selenium to test the payment iframe modal; and **Data Verification scripts** to ensure transactions match database records."*
2. *"For CI/CD, we check these test scripts into Git alongside a `Jenkinsfile`. Jenkins acts as our automated Quality Gate: on every developer pull request, a webhook triggers Jenkins to run our smoke suite in headless mode. If all tests pass, the PR is approved; if any payment test fails, the build turns red, notifications fire to Slack, and broken code is stopped from reaching production."*
