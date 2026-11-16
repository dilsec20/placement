"""
FILE: test_ui_selenium.py
PURPOSE: Automated End-to-End UI Test Suite for Juspay Checkout using Selenium WebDriver.
RUN COMMAND: python test_ui_selenium.py
OR WITH PYTEST: pytest test_ui_selenium.py -v
"""

import sys
import time
import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

CHECKOUT_URL = "http://localhost:8000/checkout"

@pytest.fixture(scope="module")
def driver():
    """Initializes a headless Chrome browser session."""
    chrome_options = Options()
    chrome_options.add_argument("--headless=new")  # Runs silently without opening a physical window
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--window-size=1280,800")
    
    driver = webdriver.Chrome(options=chrome_options)
    driver.implicitly_wait(5)
    yield driver
    driver.quit()

def test_01_checkout_page_loads_with_correct_merchant(driver):
    """Verify page title and merchant badge."""
    driver.get(CHECKOUT_URL)
    wait = WebDriverWait(driver, 10)
    
    merchant_tag = wait.until(EC.visibility_of_element_located((By.ID, "merchant-tag")))
    assert merchant_tag.text == "SWIGGY_PROD", f"Expected SWIGGY_PROD, got {merchant_tag.text}"
    
    order_amount = driver.find_element(By.ID, "order-amount")
    assert "₹499.00" in order_amount.text
    print("\n[UI PASS] Checkout page loaded successfully with merchant SWIGGY_PROD.")

def test_02_successful_card_payment_flow(driver):
    """
    HAPPY PATH: Enter valid 16-digit card and CVV, click Pay,
    and assert that the success modal displays with a valid Transaction ID.
    """
    driver.get(CHECKOUT_URL)
    wait = WebDriverWait(driver, 10)

    # 1. Fill Card Number
    card_input = driver.find_element(By.ID, "card-number")
    card_input.clear()
    card_input.send_keys("4111111111111111")

    # 2. Fill Name & Expiry
    driver.find_element(By.ID, "card-holder").send_keys("Dilip Kumar")
    driver.find_element(By.ID, "card-expiry").send_keys("12/28")

    # 3. Fill CVV
    cvv_input = driver.find_element(By.ID, "card-cvv")
    cvv_input.clear()
    cvv_input.send_keys("123")

    # 4. Click 'Pay ₹499.00'
    pay_btn = driver.find_element(By.ID, "btn-pay")
    pay_btn.click()

    # 5. Wait for Success Modal to appear
    success_modal = wait.until(EC.visibility_of_element_located((By.ID, "success-modal")))
    assert success_modal.is_displayed(), "Success modal did not appear!"

    txn_badge = driver.find_element(By.ID, "modal-txn-id")
    assert "TXN ID: txn_" in txn_badge.text, f"Unexpected TXN badge text: {txn_badge.text}"
    print(f"\n[UI PASS] Payment flow completed successfully! {txn_badge.text}")

    # Close modal
    driver.find_element(By.ID, "btn-close-modal").click()

def test_03_invalid_short_card_shows_validation_error(driver):
    """
    NEGATIVE UI PATH: Entering only 10 digits must show the red validation error.
    """
    driver.get(CHECKOUT_URL)
    wait = WebDriverWait(driver, 10)

    # Enter invalid 10-digit card
    card_input = driver.find_element(By.ID, "card-number")
    card_input.clear()
    card_input.send_keys("4111222233")  # Short card

    driver.find_element(By.ID, "card-cvv").send_keys("123")

    # Click Pay
    driver.find_element(By.ID, "btn-pay").click()

    # Assert inline error message becomes visible
    error_msg = wait.until(EC.visibility_of_element_located((By.ID, "card-number-error")))
    assert error_msg.is_displayed()
    assert "Card number must be 16 digits" in error_msg.text

    # Assert top banner error appears
    banner = driver.find_element(By.ID, "error-banner")
    assert banner.is_displayed()
    assert "Invalid Card Number" in banner.text
    print("\n[UI PASS] Invalid card input correctly triggered client-side UI error banners.")

def test_04_tab_switching_navigation(driver):
    """Verify switching between 'Card' and 'UPI' tabs."""
    driver.get(CHECKOUT_URL)
    
    # Click UPI Tab
    driver.find_element(By.ID, "tab-upi").click()
    
    # Verify UPI content visible, Card content hidden
    assert driver.find_element(By.ID, "upi-content").is_displayed()
    assert not driver.find_element(By.ID, "card-content").is_displayed()
    print("\n[UI PASS] Tab navigation between Card and UPI verified.")

if __name__ == '__main__':
    pytest.main(["-v", __file__])
