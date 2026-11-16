# 🔌 Stage 3 — REST API Testing & Automation (Postman & Python)

> **Why This Matters for Juspay:** Payment orchestration platforms expose APIs as their core product. Every checkout screen, bank redirect, and refund is executed via RESTful APIs.  
> **Job Description Direct Requirement:** *"Experience with Postman for API testing, including the ability to write and manage test scripts, and automate API testing workflows. Proficiency in Python for test automation."*

---

## 🌐 Part 1: REST Architecture & Payment HTTP Status Codes

### 1. HTTP Methods in Financial Systems

| Method | Idempotent? | Safe? (Read-Only) | Typical Payment Use Case |
|---|:---:|:---:|---|
| **`GET`** | ✅ Yes | ✅ Yes | Retrieve order details or query payment status: `GET /v1/orders/{order_id}` |
| **`POST`** | ❌ No | ❌ No | Create a new payment session or initiate a refund: `POST /v1/payments` |
| **`PUT`** | ✅ Yes | ❌ No | Completely replace merchant configuration: `PUT /v1/merchants/{id}/settings` |
| **`PATCH`** | ❌ No | ❌ No | Partially update transaction metadata: `PATCH /v1/payments/{id}` |
| **`DELETE`**| ✅ Yes | ❌ No | Revoke an API token or delete a stored card token: `DELETE /v1/cards/{token}` |

---

### 2. The Complete Payment HTTP Status Code Matrix

```
┌────────────────────────────────────────────────────────────────────────┐
│                        HTTP STATUS CODES CHEAT SHEET                   │
├──────┬──────────────────────┬──────────────────────────────────────────┤
│ CODE │ MEANING              │ REAL-WORLD PAYMENT SCENARIO              │
├──────┼──────────────────────┼──────────────────────────────────────────┤
│ 200  │ OK                   │ Payment status successfully fetched.     │
│ 201  │ Created              │ Order or payment record created in DB.   │
│ 202  │ Accepted             │ Asynchronous payment queued for bank.    │
│ 204  │ No Content           │ Webhook acknowledged successfully.       │
├──────┼──────────────────────┼──────────────────────────────────────────┤
│ 400  │ Bad Request          │ Malformed JSON payload (missing amount). │
│ 401  │ Unauthorized         │ Missing or invalid API secret key.       │
│ 403  │ Forbidden            │ Valid API key, but lacking permissions.  │
│ 404  │ Not Found            │ Order ID does not exist.                 │
│ 409  │ Conflict             │ Duplicate request with same Idempotency. │
│ 422  │ Unprocessable Entity │ Negative amount or unsupported currency. │
│ 429  │ Too Many Requests    │ Rate limit exceeded (>100 RPS / tenant). │
├──────┼──────────────────────┼──────────────────────────────────────────┤
│ 500  │ Internal Server Error│ Unhandled backend exception / DB crash.  │
│ 502  │ Bad Gateway          │ Juspay switch received invalid bank data.│
│ 503  │ Service Unavailable  │ Payment switch down for maintenance.     │
│ 504  │ Gateway Timeout      │ Upstream bank server timed out (>30s).   │
└──────┴──────────────────────┴──────────────────────────────────────────┘
```

---

## 📮 Part 2: Postman Mastery — Pre-Request & Test Scripts

---

### 1. Postman Variable Scope Hierarchy
```
Global Variables ──► Collection Variables ──► Environment Variables ──► Data Variables (CSV) ──► Local Variables
(Broadest Scope)                                                                                 (Narrowest Scope)
```

---

### 2. Pre-Request Script (Dynamic Headers, Timestamps & Idempotency)
Executed automatically in JavaScript **before** the request is sent over the wire:

```javascript
// Postman Pre-request Script: Set dynamic headers for payment request

// 1. Generate unique Idempotency Key (UUID v4)
const uuid = crypto.randomUUID();
pm.environment.set("idempotency_key", uuid);

// 2. Generate Unix Epoch Timestamp in seconds
const timestamp = Math.floor(Date.now() / 1000);
pm.environment.set("request_timestamp", timestamp);

// 3. Generate Request Signature (HMAC-SHA256)
const apiKey = pm.environment.get("api_secret");
const merchantId = pm.environment.get("merchant_id");
const rawPayload = pm.environment.get("order_amount") + ":" + timestamp;

const signature = CryptoJS.HmacSHA256(rawPayload, apiKey).toString(CryptoJS.enc.Hex);
pm.environment.set("request_signature", signature);

console.log("Generated Idempotency Key: " + uuid);
```

---

### 3. Post-Response Test Scripts (Comprehensive Assertions)
Executed in JavaScript **after** receiving the HTTP response:

```javascript
// Postman Tests Script: Validate Payment Creation API Response

// Test 1: Verify Status Code is 201 Created
pm.test("Status code is 201 Created", function () {
    pm.response.to.have.status(201);
});

// Test 2: Verify Latency SLA is below 500ms
pm.test("Response time is under 500ms SLA", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

// Test 3: Parse and Validate JSON Body
const responseJson = pm.response.json();

pm.test("Payment response contains valid ID and PENDING state", function () {
    pm.expect(responseJson).to.have.property("payment_id");
    pm.expect(responseJson.payment_id).to.match(/^pay_[a-zA-Z0-9]{16}$/);
    pm.expect(responseJson.status).to.eql("PENDING");
    pm.expect(responseJson.currency).to.eql("INR");
});

// Test 4: Save payment_id into environment for next chained request!
if (responseJson.payment_id) {
    pm.environment.set("active_payment_id", responseJson.payment_id);
    console.log("Saved payment_id for chaining: " + responseJson.payment_id);
}

// Test 5: Validate JSON Schema Definition
const schema = {
    "type": "object",
    "required": ["payment_id", "order_id", "status", "amount", "currency"],
    "properties": {
        "payment_id": { "type": "string" },
        "order_id": { "type": "string" },
        "status": { "type": "string", "enum": ["PENDING", "SUCCESS", "FAILED"] },
        "amount": { "type": "number", "minimum": 1 },
        "currency": { "type": "string", "maxLength": 3 }
    }
};

pm.test("JSON Schema validation passes", function () {
    pm.response.to.have.jsonSchema(schema);
});
```

---

### 4. Chaining API Requests in Postman (End-to-End Workflow)
In payment testing, you cannot test `POST /v1/payments` in isolation. You must **chain dependent calls**:

```
[Request 1: POST /v1/auth/token]
       │ Extracted: {{access_token}}
       ▼
[Request 2: POST /v1/orders]
       │ Sent: Bearer {{access_token}}, amount: 2500
       │ Extracted: {{order_id}}
       ▼
[Request 3: POST /v1/payments]
       │ Sent: {{order_id}}, {{idempotency_key}}, card details
       │ Extracted: {{payment_id}}
       ▼
[Request 4: GET /v1/payments/{{payment_id}}/status]
       │ Assert: status == "SUCCESS"
```

---

## 🐍 Part 3: Python API Automation Framework (`pytest` + `requests`)

In the Learnathon and technical rounds, you may be asked to write automated API tests in Python. Here is a production-grade template using the popular `pytest` framework.

### 1. Directory Structure
```
api_automation/
├── config.py             # Base URLs, API keys, credentials
├── client.py             # Reusable API Client wrapping requests.Session
├── test_payments_api.py  # Pytest test cases
└── conftest.py           # Reusable fixtures (auth, logging)
```

---

### 2. The Reusable API Client (`client.py`)

```python
import requests
import uuid
import time
from typing import Dict, Any

class JuspayAPIClient:
    def __init__(self, base_url: str, api_key: str):
        self.base_url = base_url.rstrip("/")
        self.session = requests.Session()
        # Default headers for all requests
        self.session.headers.update({
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "Accept": "application/json"
        })

    def create_order(self, amount: float, currency: str = "INR") -> requests.Response:
        url = f"{self.base_url}/v1/orders"
        payload = {
            "order_id": f"ord_{int(time.time())}_{uuid.uuid4().hex[:6]}",
            "amount": amount,
            "currency": currency
        }
        return self.session.post(url, json=payload, timeout=5.0)

    def initiate_payment(self, order_id: str, payment_method: Dict[str, Any], idempotency_key: str = None) -> requests.Response:
        url = f"{self.base_url}/v1/payments"
        headers = {}
        if idempotency_key:
            headers["Idempotency-Key"] = idempotency_key

        payload = {
            "order_id": order_id,
            "payment_method": payment_method
        }
        return self.session.post(url, json=payload, headers=headers, timeout=5.0)

    def get_payment_status(self, payment_id: str) -> requests.Response:
        url = f"{self.base_url}/v1/payments/{payment_id}"
        return self.session.get(url, timeout=5.0)
```

---

### 3. Automated Test Suite (`test_payments_api.py`)

```python
import pytest
import uuid
from client import JuspayAPIClient

BASE_URL = "https://sandbox.api.juspay.in"
API_KEY = "test_sec_key_xyz123"

@pytest.fixture(scope="module")
def api_client():
    return JuspayAPIClient(base_url=BASE_URL, api_key=API_KEY)

class TestPaymentWorkflow:

    def test_create_order_success(self, api_client):
        """Positive Case: Verify order is created with status PENDING"""
        response = api_client.create_order(amount=1500.0, currency="INR")
        
        assert response.status_code == 201, f"Expected 201, got {response.status_code}"
        data = response.json()
        assert "order_id" in data
        assert data["amount"] == 1500.0
        assert data["currency"] == "INR"

    @pytest.mark.parametrize("invalid_amount", [0, -100, -0.01])
    def test_create_order_invalid_amount(self, api_client, invalid_amount):
        """Negative Boundary Case: Rejection of zero or negative amounts"""
        response = api_client.create_order(amount=invalid_amount)
        
        # Must return 400 Bad Request or 422 Unprocessable Entity
        assert response.status_code in (400, 422)
        error_msg = response.json().get("error", "")
        assert "amount" in error_msg.lower()

    def test_payment_idempotency_duplicate_click(self, api_client):
        """Security/Resilience: Verify duplicate requests return identical response without duplicate debit"""
        order_resp = api_client.create_order(amount=2000.0)
        order_id = order_resp.json()["order_id"]

        idempotency_key = str(uuid.uuid4())
        card_payload = {"type": "CARD", "card_number": "4111111111111111"}

        # Request 1 (Initial click)
        resp1 = api_client.initiate_payment(order_id, card_payload, idempotency_key=idempotency_key)
        assert resp1.status_code in (200, 201, 202)
        payment_id_1 = resp1.json().get("payment_id")

        # Request 2 (Duplicate click with identical Idempotency Key)
        resp2 = api_client.initiate_payment(order_id, card_payload, idempotency_key=idempotency_key)
        
        # Server should either return cached response (200/201) with same payment_id OR 409 Conflict
        assert resp2.status_code in (200, 201, 409)
        if resp2.status_code != 409:
            payment_id_2 = resp2.json().get("payment_id")
            assert payment_id_1 == payment_id_2, "Idempotency violation: Different payment IDs generated!"

    def test_unauthenticated_request_rejected(self):
        """Security: Missing API key must yield 401 Unauthorized"""
        unauth_client = JuspayAPIClient(base_url=BASE_URL, api_key="")
        response = unauth_client.create_order(amount=500.0)
        assert response.status_code == 401
```

---

> **Next Step:** Master Web & Mobile UI Automation in Python using Selenium & Appium in [04_Web_and_Mobile_Automation_Selenium_Appium.md](./04_Web_and_Mobile_Automation_Selenium_Appium.md)!
