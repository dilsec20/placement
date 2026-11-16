"""
FILE: test_api_pytest.py
PURPOSE: Automated API Test Suite testing the Juspay Payment Gateway endpoints.
RUN COMMAND: pytest test_api_pytest.py -v
"""

import uuid
import pytest
import requests

BASE_URL = "http://localhost:8000/api/v1"
AUTH_TOKEN = "test_qa_token_jwt"
MERCHANT_ID = "SWIGGY_PROD"

@pytest.fixture
def default_headers():
    return {
        "Authorization": f"Bearer {AUTH_TOKEN}",
        "x-merchant-id": MERCHANT_ID,
        "Content-Type": "application/json"
    }

def test_01_create_valid_card_payment(default_headers):
    """
    HAPPY PATH: Verify creating a valid card payment returns 200 OK
    and assigns a unique transaction ID in PENDING_VBV status.
    """
    idempotency_key = f"IDEM_{uuid.uuid4().hex[:8]}"
    headers = default_headers.copy()
    headers["x-idempotency-key"] = idempotency_key

    payload = {
        "order_id": f"ORD_{uuid.uuid4().hex[:6]}",
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

    response = requests.post(f"{BASE_URL}/txns/create", json=payload, headers=headers)
    
    assert response.status_code == 200, f"Expected 200 OK, got: {response.text}"
    data = response.json()
    assert "txn_id" in data
    assert data["txn_id"].startswith("txn_")
    assert data["amount"] == 499.00
    assert data["status"] == "PENDING_VBV"
    assert "redirect_url" in data
    print(f"\n[PASS] Payment created: {data['txn_id']}")

def test_02_idempotency_duplicate_returns_same_txn_id(default_headers):
    """
    IDEMPOTENCY TEST: Sending the exact same request with the SAME Idempotency Key
    must return the CACHED transaction ID (preventing double charges).
    """
    fixed_idempotency_key = f"IDEM_FIXED_{uuid.uuid4().hex[:8]}"
    headers = default_headers.copy()
    headers["x-idempotency-key"] = fixed_idempotency_key

    payload = {
        "order_id": "ORD_DOUBLE_CLICK_TEST",
        "amount": 750.00,
        "currency": "INR",
        "payment_method_type": "CARD",
        "card": {
            "number": "4111111111111111",
            "cvv": "999"
        }
    }

    # Call 1 (Original request)
    resp1 = requests.post(f"{BASE_URL}/txns/create", json=payload, headers=headers)
    assert resp1.status_code == 200
    txn_id_1 = resp1.json()["txn_id"]

    # Call 2 (Accidental duplicate click by user)
    resp2 = requests.post(f"{BASE_URL}/txns/create", json=payload, headers=headers)
    assert resp2.status_code == 200
    txn_id_2 = resp2.json()["txn_id"]

    # Crucial Assertion
    assert txn_id_1 == txn_id_2, "CRITICAL BUG: Duplicate transaction created for identical idempotency key!"
    assert resp2.json().get("idempotent_replay") is True
    print(f"\n[PASS] Idempotency verified: Replay returned same TXN ID {txn_id_1}")

def test_03_invalid_card_rejected_with_400(default_headers):
    """
    NEGATIVE TEST: Verify that a 15-digit card is rejected with 400 Bad Request
    and error code 'INVALID_CARD_NUMBER'.
    """
    payload = {
        "order_id": "ORD_INVALID_CARD",
        "amount": 100.00,
        "payment_method_type": "CARD",
        "card": {
            "number": "411111111111111",  # Only 15 digits
            "cvv": "123"
        }
    }

    response = requests.post(f"{BASE_URL}/txns/create", json=payload, headers=default_headers)
    assert response.status_code == 400
    data = response.json()
    assert data["error_code"] == "INVALID_CARD_NUMBER"
    print(f"\n[PASS] Invalid card correctly rejected: {data['message']}")

def test_04_negative_amount_rejected_with_422(default_headers):
    """
    NEGATIVE TEST: Verify that a negative amount (-50.00) is rejected with 422 Unprocessable Entity.
    """
    payload = {
        "order_id": "ORD_NEGATIVE_AMT",
        "amount": -50.00,
        "payment_method_type": "CARD",
        "card": {"number": "4111111111111111", "cvv": "123"}
    }

    response = requests.post(f"{BASE_URL}/txns/create", json=payload, headers=default_headers)
    assert response.status_code == 422
    data = response.json()
    assert data["error_code"] == "INVALID_AMOUNT"
    print(f"\n[PASS] Negative amount rejected: {data['message']}")

def test_05_missing_auth_header_rejected_with_401():
    """
    SECURITY TEST: Sending request without Authorization header must return 401 Unauthorized.
    """
    payload = {"order_id": "ORD_NO_AUTH", "amount": 100.00}
    # No Authorization header
    response = requests.post(f"{BASE_URL}/txns/create", json=payload, headers={"x-merchant-id": MERCHANT_ID})
    assert response.status_code == 401
    assert response.json()["error_code"] == "UNAUTHORIZED"
    print("\n[PASS] Unauthorized request rejected with 401.")

def test_06_get_transaction_status(default_headers):
    """
    STATUS VERIFICATION: Create transaction and query its status via GET.
    """
    # 1. Create
    payload = {
        "order_id": "ORD_STATUS_CHECK",
        "amount": 300.00,
        "payment_method_type": "CARD",
        "card": {"number": "4111111111111111", "cvv": "123"}
    }
    create_resp = requests.post(f"{BASE_URL}/txns/create", json=payload, headers=default_headers)
    txn_id = create_resp.json()["txn_id"]

    # 2. Query Status
    get_resp = requests.get(f"{BASE_URL}/txns/{txn_id}")
    assert get_resp.status_code == 200
    assert get_resp.json()["txn_id"] == txn_id
    assert get_resp.json()["amount"] == 300.00
    print(f"\n[PASS] Query transaction status succeeded for {txn_id}")
