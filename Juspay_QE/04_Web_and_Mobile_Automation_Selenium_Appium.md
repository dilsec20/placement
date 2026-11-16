# 🎭 Stage 4 — Web & Mobile Automation (Selenium & Appium in Python)

> **Job Description Direct Requirement:** *"Hands-on experience in test automation for UI, Mobile applications, APIs, and Web applications (Appium, Selenium). Proficiency in Python for test automation and scripting. Experience in testing mobile apps on iOS and Android OS."*  
> **Juspay Context:** Juspay builds the **Express Checkout Web SDK** (embedded in iframes on web) and the **HyperSDK / UPI SDK** (embedded inside Android & iOS mobile apps).

---

## 🏗️ Part 1: Selenium WebDriver Architecture (Python)

```
[Python Test Script (pytest)]
              │
              ▼ (W3C WebDriver Standard Protocol / JSON over HTTP)
      [Browser Driver (chromedriver / geckodriver)]
              │
              ▼ (Native OS / Browser Automation Hooks)
      [Real Browser (Chrome / Firefox / Edge / Headless)]
```

### Headless Chrome Setup for CI/CD Pipelines
In headless mode, the browser runs in memory without launching a visible GUI window, which is mandatory for Jenkins/GitHub Actions servers:

```python
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

def get_driver(headless: bool = True):
    options = Options()
    if headless:
        options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--window-size=1920,1080")
    options.add_argument("--disable-notifications")
    
    driver = webdriver.Chrome(
        service=Service(ChromeDriverManager().install()),
        options=options
    )
    return driver
```

---

## 🎯 Part 2: Locators Strategy — Dynamic XPath & CSS Selectors

In payment systems, developers often use dynamic frameworks (React/Vue/Flutter) where IDs change on every build (e.g. `input id="field_981742"`). **Hardcoding dynamic IDs will break your automation immediately!**

### 1. Robust XPath Strategies (Must-Know)

```text
1. By Substring Class or Attribute:
   //button[contains(@class, 'pay-btn')]
   //input[contains(@placeholder, 'Card number')]

2. Combining Multiple Attributes:
   //input[@name='cvv' and not(@disabled)]

3. Text-Based Matching (Normalized Space):
   //button[normalize-space()='Pay ₹2,500']
   //span[contains(text(), 'Proceed to Pay')]

4. XPath Axes (Traversing Parent & Siblings):
   # Find input directly following a label:
   //label[text()='Cardholder Name']/following-sibling::input
   
   # Find parent container of an active radio button:
   //input[@value='UPI']/parent::div[contains(@class, 'radio-tile')]
   
   # Ancestor navigation:
   //span[text()='HDFC Bank']/ancestor::div[@class='bank-card']
```

---

## ⏳ Part 3: Synchronization & Waits (Eliminating Flakiness)

Payment redirect flows take variable time depending on network latency. **Hardcoded `time.sleep()` is strictly prohibited in enterprise QE.**

| Wait Type | Mechanism | Pros & Cons |
|---|---|---|
| **`time.sleep(5)`** | Pauses the entire Python execution thread unconditionally. | ❌ **Anti-Pattern:** Wastes time if element appears in 100ms; fails if network takes 5.1s. |
| **Implicit Wait** | Global setting telling driver to poll DOM for up to $N$ seconds for any missing element. | ⚠️ **Limited:** Only checks presence in DOM; does NOT check if element is clickable or visible. |
| **Explicit Wait (`WebDriverWait`)** | Custom condition evaluated dynamically with a polling frequency (default 500ms). | ✅ **Industry Standard:** Continues immediately when condition is met. |

### Explicit Wait Implementation in Python

```python
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Initialize explicit wait with 10-second timeout
wait = WebDriverWait(driver, timeout=10, poll_frequency=0.5)

# Wait 1: Wait until the Payment Button is clickable
pay_button = wait.until(
    EC.element_to_be_clickable((By.XPATH, "//button[contains(@class, 'pay-submit')]"))
)
pay_button.click()

# Wait 2: Wait until the loading spinner disappears (Invisibility)
wait.until(
    EC.invisibility_of_element_located((By.CLASS_NAME, "payment-loading-spinner"))
)

# Wait 3: Wait until the Success banner appears
success_banner = wait.until(
    EC.visibility_of_element_located((By.ID, "order-success-title"))
)
assert success_banner.text == "Payment Successful"
```

---

## 💳 Part 4: Handling Complex Payment UI Scenarios (iFrames & Popups)

---

### 1. Handling iFrames (Crucial for Payment Gateways!)
Most payment gateways (Juspay Express Checkout, Razorpay, Stripe) render inside an **`<iframe>`** for PCI-DSS security isolation. **Selenium cannot locate elements inside an iframe unless you explicitly switch context into it!**

```python
# 1. Switch into the Payment Gateway iFrame using locator
wait = WebDriverWait(driver, 10)
wait.until(EC.frame_to_be_available_and_switch_to_it((By.ID, "juspay-checkout-iframe")))

# 2. Now you can interact with elements INSIDE the iframe:
card_input = wait.until(EC.presence_of_element_located((By.NAME, "cardNumber")))
card_input.send_keys("4111111111111111")

# 3. CRITICAL: Switch back to the main document after iframe interaction!
driver.switch_to.default_content()
```

---

### 2. Handling Multiple Window Tabs (3DS Bank Redirection)
When an OTP verification page opens in a new browser tab or popup window:

```python
# Store parent window handle
parent_window = driver.current_window_handle

# Perform action that opens bank popup tab
driver.find_element(By.ID, "btn-3ds-auth").click()

# Wait for 2 windows to exist
WebDriverWait(driver, 10).until(lambda d: len(d.window_handles) == 2)

# Switch to the new child window tab
for window_handle in driver.window_handles:
    if window_handle != parent_window:
        driver.switch_to.window(window_handle)
        break

# Interact with the Bank OTP page in the popup tab
driver.find_element(By.ID, "otp-input").send_keys("123456")
driver.find_element(By.ID, "submit-otp-btn").click()

# Close popup and switch back to main merchant window
driver.switch_to.window(parent_window)
```

---

## 🏛️ Part 5: Page Object Model (POM) Framework Architecture

The **Page Object Model (POM)** is a design pattern where each web page is represented by a Python class. Tests do NOT hold locators; they call high-level business methods.

```
automation_framework/
├── pages/
│   ├── base_page.py        # Reusable wait/click/type wrappers
│   └── checkout_page.py    # Locators and actions for payment checkout
└── tests/
    └── test_checkout.py    # Pytest test cases
```

### 1. The Base Page (`base_page.py`)
```python
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class BasePage:
    def __init__(self, driver, timeout=10):
        self.driver = driver
        self.wait = WebDriverWait(driver, timeout)

    def find(self, locator):
        return self.wait.until(EC.visibility_of_element_located(locator))

    def click(self, locator):
        element = self.wait.until(EC.element_to_be_clickable(locator))
        element.click()

    def type_text(self, locator, text):
        element = self.find(locator)
        element.clear()
        element.send_keys(text)

    def get_text(self, locator):
        return self.find(locator).text
```

### 2. The Checkout Page Object (`checkout_page.py`)
```python
from selenium.webdriver.common.by import By
from base_page import BasePage

class CheckoutPage(BasePage):
    # Locators encapsulated inside the page class
    CARD_NUMBER_INPUT = (By.ID, "card_number")
    EXPIRY_INPUT = (By.ID, "card_expiry")
    CVV_INPUT = (By.ID, "card_cvv")
    PAY_NOW_BUTTON = (By.XPATH, "//button[contains(@class, 'pay-now')]")
    ERROR_ALERT = (By.CLASS_NAME, "payment-error-toast")

    def enter_card_details(self, card_num: str, expiry: str, cvv: str):
        self.type_text(self.CARD_NUMBER_INPUT, card_num)
        self.type_text(self.EXPIRY_INPUT, expiry)
        self.type_text(self.CVV_INPUT, cvv)

    def submit_payment(self):
        self.click(self.PAY_NOW_BUTTON)

    def get_error_message(self) -> str:
        return self.get_text(self.ERROR_ALERT)
```

### 3. The Clean Test Script (`test_checkout.py`)
```python
import pytest
from checkout_page import CheckoutPage

def test_expired_card_payment_fails(driver):
    driver.get("https://sandbox.juspay.in/demo-checkout")
    
    checkout = CheckoutPage(driver)
    checkout.enter_card_details("4111111111111111", "01/21", "123")
    checkout.submit_payment()
    
    assert "Card has expired" in checkout.get_error_message()
```

---

## 📱 Part 6: Mobile App Automation with Appium (Android & iOS)

### 1. Appium Architecture
Appium uses the same W3C WebDriver wire protocol, routing commands to OS-level mobile automation drivers:
* **Android:** UIAutomator2 driver.
* **iOS:** XCUITest driver.

### 2. Appium Python Setup & Desired Capabilities (Android Example)

```python
from appium import webdriver
from appium.options.android import UiAutomator2Options
from appium.webdriver.common.appiumby import AppiumBy

def init_appium_driver():
    options = UiAutomator2Options()
    options.platform_name = "Android"
    options.device_name = "Pixel_7_API_34"
    options.automation_name = "UiAutomator2"
    # Target mobile APK
    options.app_package = "in.juspay.hypersdk.demo"
    options.app_activity = ".MainActivity"
    options.no_reset = True # Retain app login state

    driver = webdriver.Remote("http://127.0.0.1:4723", options=options)
    return driver

# Locating mobile elements:
driver = init_appium_driver()

# 1. By Accessibility ID (Best cross-platform locator for iOS & Android)
upi_button = driver.find_element(AppiumBy.ACCESSIBILITY_ID, "upi_payment_tab")
upi_button.click()

# 2. By Android UIAutomator (Native Android selector)
vpa_input = driver.find_element(
    AppiumBy.ANDROID_UIAUTOMATOR, 
    'new UiSelector().className("android.widget.EditText").instance(0)'
)
vpa_input.send_keys("user@okhdfcbank")
```

---

> **Next Step:** Master the Full-Day Learnathon, Log Debugging & Bug Reporting in [05_Learnathon_and_Log_Analysis.md](./05_Learnathon_and_Log_Analysis.md)!
