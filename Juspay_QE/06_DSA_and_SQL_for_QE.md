# 💻 Stage 6 — Coding (C++ & Python) & SQL Queries for Quality Engineers

> **Target:** Excel in the Online Assessment Coding Section and live coding/database verification during Technical Interviews.  
> **Juspay Expectation:** QEs are software engineers who specialize in quality. You must write clean, bug-free code with $O(N)$ or $O(N \log N)$ complexity and query databases effortlessly to verify ledger balances.

---

# 🧠 Part 1: Top Coding Problems for QE (C++ & Python)

---

### Problem 1: Find All Duplicate Transactions / Numbers in Array ⭐

**Problem:** Given an array of $N$ transaction IDs, find all duplicate elements in $O(N)$ time and $O(N)$ space.

#### C++ Solution
```cpp
#include <bits/stdc++.h>
using namespace std;

vector<int> findDuplicates(vector<int>& nums) {
    unordered_map<int, int> freq;
    vector<int> duplicates;
    
    for (int x : nums) {
        freq[x]++;
    }
    for (const auto& [val, count] : freq) {
        if (count > 1) {
            duplicates.push_back(val);
        }
    }
    return duplicates;
}
```

#### Python Solution
```python
def find_duplicates(nums: list[int]) -> list[int]:
    seen = set()
    duplicates = set()
    for x in nums:
        if x in seen:
            duplicates.add(x)
        seen.add(x)
    return list(duplicates)
```

---

### Problem 2: Subarray Sum Equals K (Prefix Sum + Hash Map) ⭐⭐

**Problem:** Given an array of integers representing debit/credit values and a target $K$, find the total number of continuous subarrays whose sum equals $K$. (Crucial for transaction ledger audits).

#### C++ Solution ($O(N)$ Time, $O(N)$ Space)
```cpp
#include <bits/stdc++.h>
using namespace std;

int subarraySum(vector<int>& nums, int k) {
    unordered_map<long long, int> prefixCounts;
    prefixCounts[0] = 1; // Base case: empty subarray sum is 0
    
    long long currSum = 0;
    int count = 0;
    
    for (int x : nums) {
        currSum += x;
        long long target = currSum - k;
        if (prefixCounts.count(target)) {
            count += prefixCounts[target];
        }
        prefixCounts[currSum]++;
    }
    return count;
}
```

---

### Problem 3: Longest Substring Without Repeating Characters ⭐⭐

**Problem:** Given a string `s`, find the length of the longest substring without repeating characters.

#### C++ Solution (Sliding Window $O(N)$)
```cpp
#include <bits/stdc++.h>
using namespace std;

int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> lastIdx;
    int maxLen = 0, left = 0;
    
    for (int right = 0; right < s.size(); right++) {
        char ch = s[right];
        if (lastIdx.count(ch) && lastIdx[ch] >= left) {
            left = lastIdx[ch] + 1;
        }
        lastIdx[ch] = right;
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}
```

---

### Problem 4: Group Anagrams (String Hashing) ⭐⭐

#### C++ Solution
```cpp
#include <bits/stdc++.h>
using namespace std;

vector<vector<string>> groupAnagrams(vector<string>& strs) {
    unordered_map<string, vector<string>> groups;
    for (const string& s : strs) {
        string key = s;
        sort(key.begin(), key.end());
        groups[key].push_back(s);
    }
    
    vector<vector<string>> result;
    for (auto& [k, v] : groups) {
        result.push_back(v);
    }
    return result;
}
```

---

### Problem 5: Valid Parentheses / JSON Payload Bracket Validation ⭐

#### C++ Solution
```cpp
#include <bits/stdc++.h>
using namespace std;

bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') {
            st.push(c);
        } else {
            if (st.empty()) return false;
            char top = st.top();
            if ((c == ')' && top != '(') ||
                (c == '}' && top != '{') ||
                (c == ']' && top != '[')) {
                return false;
            }
            st.pop();
        }
    }
    return st.empty();
}
```

---

# 🗄️ Part 2: SQL Queries for Payment QA Verification

Payment QEs must independently query databases to verify transaction states, reconcile amounts, and catch duplicate charges.

### Database Schema for Payment Verification:
1. `orders (order_id, user_id, order_amount, status, created_at)`
2. `payments (payment_id, order_id, gateway, amount, status, created_at)`
3. `refunds (refund_id, payment_id, refund_amount, status, created_at)`

---

### Query 1: Detect Duplicate Debited Payments for a Single Order
Find all orders that have more than one successful payment record (Idempotency violation detection):

```sql
SELECT 
    order_id, 
    COUNT(payment_id) AS total_success_payments,
    SUM(amount) AS total_amount_debited
FROM payments
WHERE status = 'SUCCESS'
GROUP BY order_id
HAVING COUNT(payment_id) > 1;
```

---

### Query 2: Find Orders with Reconciliation Amount Mismatch
Find orders where the amount in `orders` does NOT match the successful amount in `payments`:

```sql
SELECT 
    o.order_id, 
    o.order_amount AS expected_amount, 
    p.amount AS actual_amount_paid,
    ABS(o.order_amount - p.amount) AS difference
FROM orders o
JOIN payments p ON o.order_id = p.order_id
WHERE p.status = 'SUCCESS' AND o.order_amount != p.amount;
```

---

### Query 3: Identify Transactions Stuck in `PENDING` State for $>15$ Minutes
Find transactions where webhooks were dropped or delayed:

```sql
SELECT 
    payment_id, 
    order_id, 
    gateway, 
    created_at, 
    TIMESTAMPDIFF(MINUTE, created_at, NOW()) AS minutes_pending
FROM payments
WHERE status = 'PENDING'
  AND created_at < NOW() - INTERVAL 15 MINUTE
ORDER BY created_at ASC;
```

---

### Query 4: Calculate Gateway Success Rate (SR) Percentage
Compute real-time performance of each payment gateway:

```sql
SELECT 
    gateway,
    COUNT(*) AS total_attempts,
    SUM(CASE WHEN status = 'SUCCESS' THEN 1 ELSE 0 END) AS successful_tx,
    ROUND((SUM(CASE WHEN status = 'SUCCESS' THEN 1 ELSE 0 END) * 100.0) / COUNT(*), 2) AS success_rate_percentage
FROM payments
WHERE created_at >= NOW() - INTERVAL 24 HOUR
GROUP BY gateway
ORDER BY success_rate_percentage DESC;
```

---

### Query 5: Find Orders That Have NO Payment Attempt Logged
Find abandoned carts / orders where the user never initiated payment:

```sql
SELECT 
    o.order_id, 
    o.user_id, 
    o.order_amount, 
    o.created_at
FROM orders o
LEFT JOIN payments p ON o.order_id = p.order_id
WHERE p.payment_id IS NULL;
```

---

### Query 6: Find Payments Where Total Refunds Exceed Payment Amount
Detect fraudulent or defective refund over-crediting:

```sql
SELECT 
    p.payment_id, 
    p.amount AS original_payment, 
    SUM(r.refund_amount) AS total_refunded
FROM payments p
JOIN refunds r ON p.payment_id = r.payment_id
WHERE r.status = 'SUCCESS'
GROUP BY p.payment_id, p.amount
HAVING SUM(r.refund_amount) > p.amount;
```

---

> **Next Step:** Review 50+ Real Interview Questions & Word-for-Word Answers in [07_Technical_and_HR_Interview.md](./07_Technical_and_HR_Interview.md)!
