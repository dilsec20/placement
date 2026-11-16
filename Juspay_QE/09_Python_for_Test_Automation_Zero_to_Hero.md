# 🐍 Module 09: Python for Test Automation — Zero to Hero (Learnathon & SDET Manual)

> **Target Audience:** Absolute Beginners with Zero Python Experience preparing for **Juspay's 8-Hour Learnathon & QE Technical Rounds**.  
> **Goal:** Teach you all the Python you need to write automated test scripts, analyze gigabytes of server logs, and build test frameworks from scratch.

---

## 🧭 Roadmap of this Master Guide

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                      PYTHON FOR TEST AUTOMATION MASTERY ROADMAP                        │
└────────────────────────────────────────────────────────────────────────────────────────┘
  LEVEL 1: PYTHON SYNTAX & CORE DATA STRUCTURES (Variables, Strings, Lists, Dictionaries)
  LEVEL 2: CONTROL FLOW & ERROR HANDLING (if/else, loops, try/except/finally)
  LEVEL 3: FILE HANDLING, LOG PARSING & REGEX (Crucial for the 8-Hour Learnathon!)
  LEVEL 4: FUNCTIONS, MODULES & OOP (Writing reusable test code & Page Object Model)
  LEVEL 5: API AUTOMATION FROM SCRATCH (requests library, headers, status, auth)
  LEVEL 6: TEST FRAMEWORKS WITH PYTEST (Assertions, Fixtures, Parametrization)
  LEVEL 7: WEB AUTOMATION WITH SELENIUM (Locators, Waits, iframes, Actions)
  LEVEL 8: 4 READY-TO-USE PLUG-AND-PLAY BOILERPLATES FOR THE 8-HOUR LEARNATHON
```

---

# 🔰 LEVEL 1: Python Basics & Core Data Structures

In Python, you do not need semicolons (`;`) or curly braces (`{}`). Python uses **Indentation (spaces)** to define code blocks.

### 1. Variables & Data Types
```python
# A variable stores data in memory. You don't need to declare types!
merchant_name = "Swiggy"      # String (text)
order_amount = 499.00         # Float (decimal number)
retry_count = 3               # Integer (whole number)
is_payment_success = True     # Boolean (True or False - capital T and F!)

print(f"Merchant: {merchant_name}, Amount: {order_amount}")
```

---

### 2. Strings & String Manipulation (Essential for Assertions)
As a tester, you will constantly verify transaction IDs, order numbers, and error messages.

```python
txn_id = "txn_89ab32c14f"
error_message = "  Invalid Card Number: Must be 16 digits  "

# 1. Clean whitespace
clean_msg = error_message.strip()  # "Invalid Card Number: Must be 16 digits"

# 2. Check if text contains a substring (in keyword)
if "Invalid Card" in clean_msg:
    print("Found expected error!")

# 3. Check prefixes and suffixes (common for IDs)
assert txn_id.startswith("txn_"), "TXN ID must start with 'txn_'"
assert txn_id.isalnum() == False, "Contains underscore"

# 4. Splitting strings (e.g. parsing log lines)
log_entry = "2026-11-16|ERROR|504|GATEWAY_TIMEOUT"
parts = log_entry.split("|")
# parts is now: ['2026-11-16', 'ERROR', '504', 'GATEWAY_TIMEOUT']
timestamp = parts[0]
status_code = parts[2]
```

---

### 3. Lists (Arrays of Test Data)
A list holds multiple ordered items. You use lists to store test cases, failed transaction IDs, or API responses.

```python
# Create a list
test_cards = ["4111111111111111", "5500000000000004", "340000000000009"]

# Add an item
test_cards.append("4242424242424242")

# Access by index (0-indexed)
first_card = test_cards[0]  # "4111111111111111"
last_card = test_cards[-1]  # "4242424242424242" (negative index counts from end)

# Get length of list
print(f"Total cards to test: {len(test_cards)}")

# Iterate over a list
for card in test_cards:
    print(f"Testing card: {card}")
```

---

### 4. Dictionaries (The #1 Most Important Concept: Dict == JSON)
In API testing, every single request payload and response body is JSON. In Python, JSON is represented as a **Dictionary (`dict`)** made of `key: value` pairs.

```python
# A payment request dictionary
payment_payload = {
    "order_id": "ORD_1001",
    "amount": 499.00,
    "currency": "INR",
    "is_retry": False,
    "card": {
        "number": "4111111111111111",
        "cvv": "123",
        "expiry": "12/28"
    }
}

# Accessing dictionary values:
print(payment_payload["order_id"])         # "ORD_1001"
print(payment_payload["card"]["cvv"])       # "123"

# Safe access with .get() (never crashes if key doesn't exist!)
discount = payment_payload.get("discount", 0.0)  # returns 0.0 if "discount" key is missing

# Adding / Updating fields:
payment_payload["status"] = "PENDING_VBV"
payment_payload["amount"] = 550.00

# Checking if a key exists:
if "currency" in payment_payload:
    print(f"Currency is {payment_payload['currency']}")
```

---

# 🔀 LEVEL 2: Control Flow & Error Handling

### 1. Conditionals (`if / elif / else`)
```python
status_code = 200

if status_code == 200:
    print("Test Passed: Payment Processed")
elif status_code == 400:
    print("Test Failed: Bad Request")
elif status_code == 504:
    print("Test Failed: Gateway Timeout")
else:
    print(f"Unexpected status: {status_code}")
```

---

### 2. Loops (`for` and `while`)

```python
# 1. Loop through numbers (useful for retrying requests)
for attempt in range(1, 4):  # 1, 2, 3
    print(f"Retry attempt #{attempt}")

# 2. Loop through a dictionary (keys and values)
response_data = {"txn_id": "txn_123", "status": "CHARGED", "amount": 499.0}
for key, value in response_data.items():
    print(f"{key} => {value}")

# 3. While loop with timeout (useful for polling transaction status)
import time
timeout_seconds = 10
start_time = time.time()
payment_status = "PENDING"

while payment_status == "PENDING":
    if time.time() - start_time > timeout_seconds:
        print("Polling timed out! Transaction stuck in PENDING.")
        break
    print("Waiting for bank status update...")
    time.sleep(2)
    payment_status = "CHARGED"  # Simulated update
```

---

### 3. Exception Handling (`try / except / finally`)
When an automated test encounters a network timeout or an invalid JSON response, you don't want the entire script to crash. Use `try-except`:

```python
import requests

try:
    response = requests.get("https://sandbox.juspay.in/api/v1/txns/txn_123", timeout=3)
    # Check if HTTP status code is 4xx or 5xx
    response.raise_for_status()
    data = response.json()
    print("Success:", data)
except requests.exceptions.Timeout:
    print("ALERT: Request timed out after 3 seconds!")
except requests.exceptions.HTTPError as err:
    print(f"HTTP Error occurred: {err}")
except Exception as e:
    print(f"An unexpected error occurred: {e}")
finally:
    print("Cleanup: Execution finished (runs regardless of pass/fail)")
```

---

# 📂 LEVEL 3: File Handling & Log Parsing (Crucial for Learnathon)

During Juspay's **8-hour Learnathon**, candidates are given huge server logs (text files or CSVs) and asked:
> *"Parse this log file with Python, count how many transactions failed with 504 Gateway Timeout, and print all affected Order IDs."*

### 1. Reading Files Safely with `with open()`
Always use the `with` statement. It automatically closes the file even if errors occur.

```python
# Reading line-by-line (low memory consumption for massive logs)
with open("server_logs.txt", "r") as file:
    for line in file:
        line = line.strip()
        if "ERROR" in line:
            print("Found error line:", line)
```

---

### 2. Regular Expressions (`re` Module)
Regex allows you to extract patterns like Order IDs (`ORD_[0-9]+`), Transaction IDs (`txn_[a-z0-9]+`), or IP addresses from messy logs.

```python
import re

log_line = "2026-11-16 14:02:11 [Router] TXN_89218 Failed for ORD_99812 with status 504 GATEWAY_TIMEOUT"

# Extract the Transaction ID
txn_match = re.search(r"TXN_\d+", log_line)
if txn_match:
    print("Extracted TXN:", txn_match.group())  # Output: TXN_89218

# Extract the Order ID
ord_match = re.search(r"ORD_\d+", log_line)
if ord_match:
    print("Extracted Order:", ord_match.group())  # Output: ORD_99812

# Extract the 3-digit status code
status_match = re.search(r"\b(200|400|404|500|504)\b", log_line)
if status_match:
    print("Extracted Status:", status_match.group())  # Output: 504
```

---

### 3. Writing Output / Bug Reports to a File
```python
failed_orders = ["ORD_101", "ORD_205", "ORD_884"]

with open("learnathon_bug_report.txt", "w") as out_file:
    out_file.write("=== JUSPAY LEARNATHON FAILED TRANSACTIONS REPORT ===\n")
    out_file.write(f"Total Failures Found: {len(failed_orders)}\n\n")
    for order in failed_orders:
        out_file.write(f"- {order} failed due to ICICI Gateway Timeout\n")

print("Report saved to learnathon_bug_report.txt!")
```

---

# 🏗️ LEVEL 4: Functions & Object-Oriented Programming (OOP)

In automated testing, you write helper functions and classes to prevent duplicating code across 100 test cases.

### 1. Reusable Helper Functions
```python
import uuid

def generate_payment_payload(amount=499.00, card_num="4111111111111111"):
    """Generates a dynamic mock payment payload with unique IDs."""
    return {
        "order_id": f"ORD_{uuid.uuid4().hex[:6]}",
        "amount": amount,
        "currency": "INR",
        "payment_method_type": "CARD",
        "card": {
            "number": card_num,
            "cvv": "123",
            "expiry": "12/28"
        }
    }

# Usage:
payload1 = generate_payment_payload()                   # Default ₹499
payload2 = generate_payment_payload(amount=1200.00)     # Custom ₹1200
```

---

### 2. Classes & OOP (The Foundation of Page Object Model)
A `class` is a blueprint. In test automation, we represent each web page (like the Checkout Page) as a class.

```python
class CheckoutPage:
    def __init__(self, driver):
        # __init__ is the constructor: runs whenever an object is created
        self.driver = driver
        self.url = "http://localhost:8000/checkout"
        # Locators (IDs of HTML elements)
        self.card_input_id = "card-number"
        self.pay_button_id = "btn-pay"

    def open(self):
        self.driver.get(self.url)

    def enter_card(self, card_number):
        elem = self.driver.find_element("id", self.card_input_id)
        elem.clear()
        elem.send_keys(card_number)

    def click_pay(self):
        self.driver.find_element("id", self.pay_button_id).click()
```

---

# 🌐 LEVEL 5: API Automation from Scratch (`requests`)

The `requests` library is Python's standard tool for API testing.

### 1. Installing & Importing
```bash
pip install requests
```
```python
import requests
```

---

### 2. The 4 Essential HTTP Methods
```python
import requests

BASE_URL = "http://localhost:8000/api/v1"
HEADERS = {
    "Authorization": "Bearer test_qa_token_jwt",
    "x-merchant-id": "SWIGGY_PROD",
    "Content-Type": "application/json"
}

# 1. POST Request (Create resource)
payload = {"order_id": "ORD_101", "amount": 499.00}
post_resp = requests.post(f"{BASE_URL}/txns/create", json=payload, headers=HEADERS)

# 2. GET Request (Read resource)
get_resp = requests.get(f"{BASE_URL}/txns/txn_123", headers=HEADERS)

# 3. PUT / PATCH Request (Update resource)
patch_resp = requests.patch(f"{BASE_URL}/orders/ORD_101", json={"status": "CANCELLED"}, headers=HEADERS)

# 4. DELETE Request (Delete resource)
del_resp = requests.delete(f"{BASE_URL}/orders/ORD_101", headers=HEADERS)
```

---

### 3. Inspecting the Response
```python
response = requests.post("http://localhost:8000/api/v1/txns/create", json=payload, headers=HEADERS)

# 1. HTTP Status Code (Integer)
print(response.status_code)  # e.g. 200, 400, 404, 500

# 2. Response Body as Parsed Python Dictionary
data = response.json()
print(data["txn_id"])

# 3. Response Time (Latency in seconds)
latency = response.elapsed.total_seconds()
print(f"API took {latency * 1000} milliseconds")

# 4. Response Headers
print(response.headers.get("Content-Type"))
```

---

# 🧪 LEVEL 6: Test Frameworks with `pytest`

`pytest` is the industry-standard Python testing framework.

### 1. Pytest Rules You MUST Memorize:
1. File names must start or end with `test_`: e.g. `test_payment_api.py`.
2. Test function names must start with `test_`: e.g. `def test_valid_checkout():`.
3. Use simple Python `assert` statements. If the assertion is `True`, the test passes. If `False`, the test fails.
4. Run tests with: `python -m pytest <filename> -v`.

---

### 2. Essential Assertions
```python
def test_sample_assertions():
    status = 200
    txn_id = "txn_894819"
    amount = 499.00
    error_list = []

    # Equality
    assert status == 200, f"Expected 200, got {status}"
    
    # Inequality
    assert status != 500
    
    # Substring / Prefix
    assert txn_id.startswith("txn_")
    
    # Numeric comparison
    assert amount > 0
    assert amount == pytest.approx(499.00)
    
    # Emptiness
    assert len(error_list) == 0, "Error list should be empty"
```

---

### 3. Pytest Fixtures (`@pytest.fixture`)
Fixtures are setup functions that prepare data, tokens, or browser drivers before tests run.

```python
import pytest

@pytest.fixture
def auth_headers():
    """Provides common authenticated headers to tests that request it."""
    return {
        "Authorization": "Bearer test_jwt_token",
        "x-merchant-id": "SWIGGY_PROD",
        "Content-Type": "application/json"
    }

# Notice 'auth_headers' is passed directly as an argument to the test!
def test_payment_with_fixture(auth_headers):
    assert "Authorization" in auth_headers
    assert auth_headers["x-merchant-id"] == "SWIGGY_PROD"
```

---

### 4. Parametrization (`@pytest.mark.parametrize`)
Instead of writing 5 different functions to test 5 bad card numbers, write **one** function and run it 5 times with different parameters!

```python
import pytest
import requests

BAD_CARDS = [
    ("411111", "Too short"),
    ("41111111111111111119", "Too long"),
    ("4111ABCD1111XXXX", "Non-numeric"),
    ("", "Empty string")
]

@pytest.mark.parametrize("card_number, reason", BAD_CARDS)
def test_rejected_cards(card_number, reason):
    payload = {
        "order_id": "ORD_TEST",
        "amount": 100.0,
        "payment_method_type": "CARD",
        "card": {"number": card_number, "cvv": "123"}
    }
    resp = requests.post("http://localhost:8000/api/v1/txns/create", 
                         json=payload, 
                         headers={"Authorization": "Bearer test", "x-merchant-id": "M1"})
    
    # Every bad card must return 400 Bad Request
    assert resp.status_code == 400, f"Failed for {reason}: Expected 400, got {resp.status_code}"
```

---

# 🖥️ LEVEL 7: Web Automation with `selenium`

### 1. The Core Architecture
```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

# Setup Headless Chrome
options = Options()
options.add_argument("--headless=new")  # Runs in background
driver = webdriver.Chrome(options=options)
```

---

### 2. How to Locate Elements on a Web Page:
| Method | Syntax | When to Use? |
|---|---|---|
| By ID | `driver.find_element(By.ID, "card-number")` | **Best & Fastest** (Unique elements). |
| By Name | `driver.find_element(By.NAME, "cvv")` | Input fields with `name="cvv"`. |
| By XPath | `driver.find_element(By.XPATH, "//button[text()='Pay']")` | Dynamic buttons, text search. |
| By CSS | `driver.find_element(By.CSS_SELECTOR, ".btn-pay")` | Class names and nested structures. |

---

### 3. Interacting with Elements
```python
# 1. Typing text
element = driver.find_element(By.ID, "card-number")
element.clear()               # Clears existing text
element.send_keys("4111111111111111")  # Types keys

# 2. Clicking
pay_button = driver.find_element(By.ID, "btn-pay")
pay_button.click()

# 3. Reading text from screen
error_banner = driver.find_element(By.ID, "error-banner")
print("Displayed error:", error_banner.text)

# 4. Checking states
assert pay_button.is_enabled() == True
assert error_banner.is_displayed() == True
```

---

### 4. Dynamic Waits (`WebDriverWait`) — Never Use `time.sleep()`!
`time.sleep(5)` wastes time if the page loads in 0.5s, and fails if the page takes 5.1s. **Always use Explicit Waits:**

```python
wait = WebDriverWait(driver, timeout=10)

# Wait until an element is visible on the screen
modal = wait.until(EC.visibility_of_element_located((By.ID, "success-modal")))

# Wait until a button is clickable
button = wait.until(EC.element_to_be_clickable((By.ID, "btn-pay")))

# Wait until an iframe is ready and switch into it (Crucial for Juspay!)
wait.until(EC.frame_to_be_available_and_switch_to_it((By.ID, "juspay-iframe")))

# Switch back to main page after exiting iframe
driver.switch_to.default_content()
```

---

# 🚀 LEVEL 8: 4 Plug-and-Play Boilerplates for the 8-Hour Learnathon

If the Juspay interviewer or mentor gives you a problem in the Learnathon, pick the matching boilerplate below, fill in the endpoint or file path, and run it!

---

### 📋 Boilerplate 1: Standalone API Health & Idempotency Tester
Use this when asked to test an API endpoint directly from a raw Python script.

```python
"""
BOILERPLATE 1: Standalone API Tester with Idempotency Verification
Run with: python api_tester.py
"""
import requests
import uuid

API_ENDPOINT = "http://localhost:8000/api/v1/txns/create"
HEADERS = {
    "Authorization": "Bearer test_qa_token_jwt",
    "x-merchant-id": "SWIGGY_PROD",
    "Content-Type": "application/json"
}

def run_api_checks():
    print("--- [TEST 1: Happy Path Creation] ---")
    shared_key = f"IDEM_{uuid.uuid4().hex[:8]}"
    headers = HEADERS.copy()
    headers["x-idempotency-key"] = shared_key

    payload = {
        "order_id": f"ORD_{uuid.uuid4().hex[:6]}",
        "amount": 499.00,
        "currency": "INR",
        "payment_method_type": "CARD",
        "card": {"number": "4111111111111111", "cvv": "123", "expiry": "12/28"}
    }

    # Attempt 1
    resp1 = requests.post(API_ENDPOINT, json=payload, headers=headers)
    print(f"Call 1 Status: {resp1.status_code}, Latency: {resp1.elapsed.total_seconds():.3f}s")
    assert resp1.status_code == 200, f"Failed: {resp1.text}"
    txn_id_1 = resp1.json()["txn_id"]
    print(f"Created TXN ID: {txn_id_1}")

    # Attempt 2 (Idempotency Replay)
    print("\n--- [TEST 2: Idempotency Duplicate Replay] ---")
    resp2 = requests.post(API_ENDPOINT, json=payload, headers=headers)
    print(f"Call 2 Status: {resp2.status_code}")
    assert resp2.status_code == 200
    txn_id_2 = resp2.json()["txn_id"]
    
    # Assert
    if txn_id_1 == txn_id_2:
        print(f"✅ IDEMPOTENCY PASSED: Replay safely returned identical TXN ID {txn_id_1}")
    else:
        print(f"❌ IDEMPOTENCY FAILED: Duplicate debit created! {txn_id_1} != {txn_id_2}")

if __name__ == '__main__':
    run_api_checks()
```

---

### 📋 Boilerplate 2: Learnathon Server Log Analyzer & RCA Script
Use this when handed a log file and asked to find failed transactions, count error codes, and find culprit banks.

```python
"""
BOILERPLATE 2: Server Log Analyzer & Root Cause Detector
Run with: python log_analyzer.py
"""
import re
from collections import Counter

LOG_SAMPLE = """
2026-11-16 14:00:01 INFO  [Router] TXN_101 | Method: UPI | Gateway: HDFC | Status: 200 OK | Latency: 120ms
2026-11-16 14:00:03 ERROR [Router] TXN_102 | Method: CARD | Gateway: ICICI | Status: 504 GATEWAY_TIMEOUT | Upstream timeout
2026-11-16 14:00:05 INFO  [Router] TXN_103 | Method: CARD | Gateway: SBI | Status: 200 OK | Latency: 310ms
2026-11-16 14:00:08 WARN  [Router] TXN_104 | Method: UPI | Gateway: AXIS | Status: 400 REJECTED | Reason: VPA_NOT_FOUND
2026-11-16 14:00:10 INFO  [Router] TXN_105 | Method: CARD | Gateway: HDFC | Status: 200 OK | Latency: 145ms
2026-11-16 14:00:14 ERROR [Router] TXN_106 | Method: CARD | Gateway: ICICI | Status: 504 GATEWAY_TIMEOUT | Upstream timeout
"""

def analyze_logs(log_data):
    total_transactions = 0
    failures = []
    status_counter = Counter()
    gateway_failure_counter = Counter()

    for line in log_data.strip().split("\n"):
        if not line.strip():
            continue
        total_transactions += 1

        # Extract Fields using regex
        status_match = re.search(r"Status:\s*([0-9]{3}|[A-Z_]+)", line)
        gateway_match = re.search(r"Gateway:\s*([A-Za-z0-9]+)", line)
        txn_match = re.search(r"TXN_[0-9]+", line)

        status = status_match.group(1) if status_match else "UNKNOWN"
        gateway = gateway_match.group(1) if gateway_match else "UNKNOWN"
        txn_id = txn_match.group(0) if txn_match else "UNKNOWN"

        status_counter[status] += 1

        if "ERROR" in line or "504" in line or "500" in line:
            failures.append({"txn_id": txn_id, "gateway": gateway, "line": line})
            gateway_failure_counter[gateway] += 1

    print("=================== LEARNATHON LOG TRIAGE REPORT ===================")
    print(f"Total Transactions Parsed: {total_transactions}")
    print(f"Total Failures: {len(failures)} (Failure Rate: {(len(failures)/total_transactions)*100:.1f}%)")
    print(f"Status Code Breakdown: {dict(status_counter)}")
    print(f"Failures by Upstream Gateway: {dict(gateway_failure_counter)}")
    print("-------------------------------------------------------------------")
    print("ROOT CAUSE IDENTIFIED:")
    culprit_gateway = gateway_failure_counter.most_common(1)[0][0]
    print(f"⚠️ Gateway '{culprit_gateway}' is responsible for 100% of critical 504 Timeouts!")
    print("Recommended Action: Shift router weighting away from ICICI immediately.")
    print("===================================================================")

if __name__ == '__main__':
    analyze_logs(LOG_SAMPLE)
```

---

### 📋 Boilerplate 3: Standalone Selenium Form Automator
Use this when asked to write a script that opens a browser, fills a form, and verifies error banners or success modals.

```python
"""
BOILERPLATE 3: Standalone Selenium Form Automator
Run with: python ui_tester.py
"""
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

def run_checkout_automation():
    options = Options()
    # options.add_argument("--headless=new") # Uncomment to run silently in background
    driver = webdriver.Chrome(options=options)
    driver.implicitly_wait(5)
    wait = WebDriverWait(driver, 10)

    try:
        print("1. Opening Checkout Page...")
        driver.get("http://localhost:8000/checkout")

        print("2. Filling Card Form...")
        card_box = wait.until(EC.element_to_be_clickable((By.ID, "card-number")))
        card_box.clear()
        card_box.send_keys("4111111111111111")

        driver.find_element(By.ID, "card-holder").send_keys("Dilip Kumar")
        driver.find_element(By.ID, "card-expiry").send_keys("12/28")
        driver.find_element(By.ID, "card-cvv").send_keys("123")

        print("3. Submitting Payment...")
        pay_btn = driver.find_element(By.ID, "btn-pay")
        pay_btn.click()

        print("4. Waiting for Success Modal...")
        modal = wait.until(EC.visibility_of_element_located((By.ID, "success-modal")))
        assert modal.is_displayed()

        txn_text = driver.find_element(By.ID, "modal-txn-id").text
        print(f"✅ UI TEST PASSED! Received: {txn_text}")

    except Exception as e:
        print(f"❌ UI TEST FAILED: {e}")
        # Take screenshot on failure for bug report!
        driver.save_screenshot("ui_test_failure.png")
        print("Failure screenshot saved to 'ui_test_failure.png'")
    finally:
        driver.quit()

if __name__ == '__main__':
    run_checkout_automation()
```

---

### 📋 Boilerplate 4: Concurrency & Race Condition Load Tester
Use this when the interviewer asks:
> *"What happens if two requests with the same card hit the server at the exact same millisecond? Write a Python script to test for race conditions."*

```python
"""
BOILERPLATE 4: Concurrency & Race Condition Stress Tester
Run with: python concurrent_tester.py
"""
import requests
import concurrent.futures
import time

URL = "http://localhost:8000/api/v1/txns/create"
HEADERS = {
    "Authorization": "Bearer test_qa_token_jwt",
    "x-merchant-id": "SWIGGY_PROD",
    "x-idempotency-key": "RACE_CONDITION_KEY_999",
    "Content-Type": "application/json"
}
PAYLOAD = {
    "order_id": "ORD_CONCURRENCY_TEST",
    "amount": 500.00,
    "payment_method_type": "CARD",
    "card": {"number": "4111111111111111", "cvv": "123"}
}

def send_payment(request_num):
    start = time.time()
    resp = requests.post(URL, json=PAYLOAD, headers=HEADERS)
    elapsed = time.time() - start
    return request_num, resp.status_code, resp.json().get("txn_id"), elapsed

def run_concurrent_test():
    print("Firing 5 identical requests simultaneously using ThreadPoolExecutor...")
    results = []
    
    # Send 5 threads simultaneously
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        futures = [executor.submit(send_payment, i) for i in range(1, 6)]
        for f in concurrent.futures.as_completed(futures):
            results.append(f.result())

    print("\n--- RESULTS ---")
    txn_ids = set()
    for req_num, status, txn_id, duration in results:
        print(f"Req #{req_num} => Status: {status}, TXN_ID: {txn_id}, Latency: {duration:.3f}s")
        if txn_id:
            txn_ids.add(txn_id)

    print("\n--- CONCURRENCY ASSERTION ---")
    if len(txn_ids) == 1:
        print("✅ RACE CONDITION DEFENSE PASSED: Only 1 unique transaction was created across all 5 threads!")
    else:
        print(f"❌ CRITICAL RACE CONDITION BUG: {len(txn_ids)} distinct transactions were created!")

if __name__ == '__main__':
    run_concurrent_test()
```

---

## 💡 How to Prepare with this Guide Tonight

1. **Spend 30 minutes reading Levels 1, 2, and 4** to become familiar with Python syntax (variables, dictionaries, loops, and functions).
2. **Spend 20 minutes running Boilerplate 1 & Boilerplate 2** on your laptop against the local mock server.
3. Keep this guide open during the Learnathon — if the mentor asks you to write code, find the closest boilerplate, paste it into VS Code, adapt the field names, and hit run!
