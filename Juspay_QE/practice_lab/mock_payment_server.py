"""
FILE: mock_payment_server.py
PURPOSE: Local Mock Payment Gateway Server simulating Juspay's API and Checkout.
RUN COMMAND: python mock_payment_server.py
SERVER URL: http://localhost:8000
"""

import os
import sys
import uuid
import datetime
from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__, static_folder='.')

# In-memory data store for transactions and idempotency keys
TRANSACTIONS_DB = {}
IDEMPOTENCY_CACHE = {}

@app.route('/', methods=['GET'])
def index():
    return send_from_directory('.', 'mock_checkout.html')

@app.route('/checkout', methods=['GET'])
def checkout():
    return send_from_directory('.', 'mock_checkout.html')

@app.route('/api/v1/txns/create', methods=['POST'])
def create_transaction():
    # 1. Verify Authentication & Headers
    auth_header = request.headers.get('Authorization', '')
    if not auth_header.startswith('Bearer '):
        return jsonify({
            "error_code": "UNAUTHORIZED",
            "message": "Missing or malformed Authorization header. Must be 'Bearer <token>'"
        }), 401

    merchant_id = request.headers.get('x-merchant-id')
    if not merchant_id:
        return jsonify({
            "error_code": "MISSING_HEADER",
            "message": "Missing mandatory header: 'x-merchant-id'"
        }), 400

    # 2. Check Idempotency Key
    idempotency_key = request.headers.get('x-idempotency-key')
    if idempotency_key and idempotency_key in IDEMPOTENCY_CACHE:
        # Return the cached previous response (Payment Idempotency Rule)
        cached_resp = IDEMPOTENCY_CACHE[idempotency_key].copy()
        cached_resp["idempotent_replay"] = True
        return jsonify(cached_resp), 200

    # 3. Parse and Validate Request Body
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error_code": "INVALID_JSON", "message": "Request body must be valid JSON"}), 400

    order_id = data.get('order_id')
    amount = data.get('amount')
    currency = data.get('currency', 'INR')
    payment_method = data.get('payment_method_type', 'CARD').upper()

    if not order_id:
        return jsonify({"error_code": "MISSING_FIELD", "message": "'order_id' is mandatory"}), 400

    # Business Validation: Amount must be > 0
    try:
        amount_val = float(amount)
        if amount_val <= 0:
            return jsonify({
                "error_code": "INVALID_AMOUNT",
                "message": "Transaction amount must be strictly greater than 0"
            }), 422
    except (ValueError, TypeError):
        return jsonify({"error_code": "INVALID_AMOUNT", "message": "Amount must be a numeric value"}), 422

    # Business Validation: Card Details
    if payment_method == 'CARD':
        card = data.get('card', {})
        card_number = str(card.get('number', '')).replace(' ', '').replace('-', '')
        cvv = str(card.get('cvv', ''))

        if len(card_number) != 16 or not card_number.isdigit():
            return jsonify({
                "error_code": "INVALID_CARD_NUMBER",
                "message": "Card number must be exactly 16 numeric digits"
            }), 400

        if len(cvv) not in [3, 4] or not cvv.isdigit():
            return jsonify({
                "error_code": "INVALID_CVV",
                "message": "CVV must be 3 or 4 numeric digits"
            }), 400

    elif payment_method == 'UPI':
        vpa = data.get('upi', {}).get('vpa', '')
        if '@' not in vpa:
            return jsonify({
                "error_code": "INVALID_VPA",
                "message": "UPI ID (VPA) must be in format username@bank (e.g. rahul@okaxis)"
            }), 400

    # 4. Success State Generation
    txn_id = f"txn_{uuid.uuid4().hex[:12]}"
    created_at = datetime.datetime.now(datetime.timezone.utc).isoformat()

    txn_record = {
        "txn_id": txn_id,
        "order_id": order_id,
        "merchant_id": merchant_id,
        "amount": amount_val,
        "currency": currency,
        "payment_method": payment_method,
        "status": "PENDING_VBV" if payment_method == "CARD" else "CHARGED",
        "redirect_url": f"/otp-verification?txn_id={txn_id}",
        "created_at": created_at
    }

    # Store in memory
    TRANSACTIONS_DB[txn_id] = txn_record
    if idempotency_key:
        IDEMPOTENCY_CACHE[idempotency_key] = txn_record

    return jsonify(txn_record), 200

@app.route('/api/v1/txns/<txn_id>', methods=['GET'])
def get_transaction(txn_id):
    if txn_id not in TRANSACTIONS_DB:
        return jsonify({
            "error_code": "TXN_NOT_FOUND",
            "message": f"No transaction found matching ID '{txn_id}'"
        }), 404

    return jsonify(TRANSACTIONS_DB[txn_id]), 200

@app.route('/api/v1/refunds', methods=['POST'])
def process_refund():
    data = request.get_json(silent=True) or {}
    txn_id = data.get('txn_id')
    refund_amount = data.get('amount')

    if not txn_id or txn_id not in TRANSACTIONS_DB:
        return jsonify({"error_code": "TXN_NOT_FOUND", "message": "Invalid transaction ID for refund"}), 404

    original_txn = TRANSACTIONS_DB[txn_id]
    try:
        ref_amt = float(refund_amount)
        if ref_amt > original_txn["amount"]:
            return jsonify({
                "error_code": "REFUND_EXCEEDS_AMOUNT",
                "message": f"Refund amount ({ref_amt}) exceeds original transaction amount ({original_txn['amount']})"
            }), 422
    except (ValueError, TypeError):
        return jsonify({"error_code": "INVALID_AMOUNT", "message": "Refund amount is invalid"}), 400

    refund_id = f"ref_{uuid.uuid4().hex[:10]}"
    return jsonify({
        "refund_id": refund_id,
        "txn_id": txn_id,
        "amount": ref_amt,
        "status": "REFUND_SUCCESS"
    }), 200

if __name__ == '__main__':
    port = 8000
    print(f"🚀 [JUSPAY MOCK SERVER] Running at http://localhost:{port}")
    print(f"💳 [CHECKOUT UI URL] Visit: http://localhost:{port}/checkout")
    print(f"⚡ Press Ctrl+C to stop.")
    app.run(host='127.0.0.1', port=port, debug=False)
