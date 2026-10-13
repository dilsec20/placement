# 📝 IBM Coding Assessment — Previous Year Questions (PYQ)

> **Real Memory-Based Coding Problems from IBM On-Campus Drives & HackerRank CodeKnack**  
> **All problems include full problem descriptions, constraints, step-by-step logic, complexity analysis, and production-grade solutions in C++, Java, and Python 3.**

---

## 📑 Index of Questions

| # | Problem Name | Core Pattern / Data Structure | Difficulty | Target Time |
|---|---|---|---|---|
| **Q1** | [Aladdin and His Carpet](#q1-aladdin-and-his-carpet) | Circular Array / Greedy (Gas Station) | Medium | 20 mins |
| **Q2** | [Efficient Janitor](#q2-efficient-janitor) | Two Pointers / Greedy Bin Packing | Easy-Medium | 15 mins |
| **Q3** | [Maximize Rental Revenue (Cloud VMs)](#q3-maximize-rental-revenue-cloud-vms) | Max-Heap (Priority Queue) / Greedy | Medium | 20 mins |
| **Q4** | [Price Check](#q4-price-check) | Hash Map / String Matching | Easy | 10 mins |
| **Q5** | [Fun with Anagrams](#q5-fun-with-anagrams) | Hash Set / String Normalization | Easy-Medium | 15 mins |
| **Q6** | [Better Compression](#q6-better-compression) | Two Pointers / String Parsing & Hashing | Medium | 20 mins |
| **Q7** | [Roll the String](#q7-roll-the-string) | Difference Array / Prefix Sums | Medium | 20 mins |
| **Q8** | [Reach the End in Time](#q8-reach-the-end-in-time) | Grid Traversal / BFS Shortest Path | Medium | 25 mins |
| **Q9** | [Connected Groups (Friend Circles)](#q9-connected-groups-friend-circles) | Graph DFS / Disjoint Set Union (DSU) | Medium | 20 mins |
| **Q10** | [Strictly Increasing Contiguous Slopes](#q10-strictly-increasing-contiguous-slopes) | Sliding Window / Array Invariants | Easy-Medium | 15 mins |
| **Q11** | [Minimum Cost to Reduce Array](#q11-minimum-cost-to-reduce-array) | Min-Heap / Huffman Optimal Merge | Easy-Medium | 15 mins |
| **Q12** | [Counting Pairs with Difference K](#q12-counting-pairs-with-difference-k) | Hash Set / Two Pointers | Easy-Medium | 15 mins |
| **Q13** | [Longest Subarray with Equal 0s and 1s](#q13-longest-subarray-with-equal-0s-and-1s) | Prefix Sum / Hash Map | Medium | 20 mins |
| **Q14** | [Triangle Toys](#q14-triangle-toys) | Sorting / Triangle Inequality Theorem | Easy | 10 mins |
| **Q15** | [Maximum Index (Avoid the Bad Index)](#q15-maximum-index-avoid-the-bad-index) | Greedy / Math | Easy-Medium | 15 mins |

---

## Q1. Aladdin and His Carpet

### Problem Statement
Aladdin wants to travel around a circular path using his magic carpet. There are $n$ magical spots along the circular path, numbered from $0$ to $n-1$. At each spot $i$, Aladdin can collect `magic[i]` units of magic power from a magical pile. Traveling from spot $i$ to the next spot $(i+1) \pmod n$ consumes `dist[i]` units of magic.

Aladdin starts his journey with an empty magic reservoir ($0$ magic). He can begin his journey at any spot. Determine the lowest starting spot index from which Aladdin can complete a full circle and return to his starting point without running out of magic power at any point during the trip. If no such starting spot exists, return `-1`.

### Constraints
- $1 \le n \le 10^5$
- $0 \le \text{magic}[i], \text{dist}[i] \le 10^4$

### Sample Input & Output
```text
Input:
magic = [2, 4, 5, 2]
dist  = [4, 3, 1, 3]

Output:
1

Explanation:
Total magic = 2 + 4 + 5 + 2 = 13. Total distance = 4 + 3 + 1 + 3 = 11.
Since total magic (13) >= total dist (11), a valid starting point is guaranteed.
- Start at index 0: magic = 0 + 2 - 4 = -2 < 0 (Invalid)
- Start at index 1:
  Spot 1: magic = 0 + 4 - 3 = 1
  Spot 2: magic = 1 + 5 - 1 = 5
  Spot 3: magic = 5 + 2 - 3 = 4
  Spot 0: magic = 4 + 2 - 4 = 2 >= 0 (Successfully completed loop!)
Answer is 1.
```

### Optimal Approach: Greedy Single Pass ($O(N)$ Time, $O(1)$ Space)
1. If the sum of all `magic[i]` is less than the sum of all `dist[i]`, it is physically impossible to complete the circuit. Return `-1`.
2. Otherwise, start with candidate index `start = 0` and running `current_tank = 0`.
3. Traverse from $i = 0$ to $n-1$. Add `magic[i] - dist[i]` to `current_tank`.
4. If `current_tank < 0`, it means Aladdin ran out of fuel before reaching spot $i+1$. Any starting spot from `start` to $i$ cannot complete the circuit.
5. Set `start = i + 1` and reset `current_tank = 0`.

### Solution Code

#### C++
```cpp
#include <iostream>
#include <vector>
#include <numeric>

using namespace std;

int optimalPoint(const vector<int>& magic, const vector<int>& dist) {
    long long total_magic = 0, total_dist = 0;
    int n = magic.size();
    for (int i = 0; i < n; i++) {
        total_magic += magic[i];
        total_dist += dist[i];
    }
    if (total_magic < total_dist) return -1;

    int start_index = 0;
    long long current_tank = 0;
    for (int i = 0; i < n; i++) {
        current_tank += (magic[i] - dist[i]);
        if (current_tank < 0) {
            start_index = i + 1;
            current_tank = 0;
        }
    }
    return start_index;
}

int main() {
    vector<int> magic = {2, 4, 5, 2};
    vector<int> dist = {4, 3, 1, 3};
    cout << optimalPoint(magic, dist) << endl; // Output: 1
    return 0;
}
```

#### Java
```java
import java.util.*;

public class AladdinCarpet {
    public static int optimalPoint(List<Integer> magic, List<Integer> dist) {
        long totalMagic = 0, totalDist = 0;
        int n = magic.size();
        for (int i = 0; i < n; i++) {
            totalMagic += magic.get(i);
            totalDist += dist.get(i);
        }
        if (totalMagic < totalDist) return -1;

        int startIndex = 0;
        long currentTank = 0;
        for (int i = 0; i < n; i++) {
            currentTank += (magic.get(i) - dist.get(i));
            if (currentTank < 0) {
                startIndex = i + 1;
                currentTank = 0;
            }
        }
        return startIndex;
    }

    public static void main(String[] args) {
        List<Integer> magic = Arrays.asList(2, 4, 5, 2);
        List<Integer> dist = Arrays.asList(4, 3, 1, 3);
        System.out.println(optimalPoint(magic, dist)); // Output: 1
    }
}
```

#### Python 3
```python
def optimalPoint(magic: list[int], dist: list[int]) -> int:
    if sum(magic) < sum(dist):
        return -1
    
    start_index = 0
    current_tank = 0
    for i in range(len(magic)):
        current_tank += magic[i] - dist[i]
        if current_tank < 0:
            start_index = i + 1
            current_tank = 0
            
    return start_index

# Driver
print(optimalPoint([2, 4, 5, 2], [4, 3, 1, 3])) # Output: 1
```

---

## Q2. Efficient Janitor

### Problem Statement
A school janitor has to clean up $n$ trash bags. Each bag has a floating-point weight between $1.01$ and $3.00$ pounds (inclusive). The janitor can carry a maximum total weight of $3.00$ pounds in a single trip. Given the weights of all $n$ bags, determine the **minimum number of trips** the janitor must take to dispose of all bags.

*Key Observation:* Because every bag weighs $\ge 1.01$ pounds, no trip can carry 3 or more bags ($1.01 \times 3 = 3.03 > 3.00$). Thus, each trip carries **at most 2 bags**.

### Constraints
- $1 \le n \le 10^5$
- $1.01 \le \text{weight}[i] \le 3.00$

### Sample Input & Output
```text
Input:
weights = [1.01, 1.99, 2.5, 1.5, 1.01]

Output:
3

Explanation:
Sorted: [1.01, 1.01, 1.5, 1.99, 2.5]
Trip 1: Carry 2.5 (Alone, 2.5 + 1.01 = 3.51 > 3.0) -> 1 bag
Trip 2: Pair 1.99 + 1.01 = 3.00 <= 3.0 -> 2 bags
Trip 3: Pair 1.5 + 1.01 = 2.51 <= 3.0 -> 2 bags
Total trips = 3.
```

### Optimal Approach: Two Pointers with Sorting ($O(N \log N)$ Time, $O(1)$ Space)
1. Sort the `weights` array in ascending order.
2. Initialize two pointers: `left = 0` (lightest) and `right = n - 1` (heaviest).
3. In each step, examine `weights[left] + weights[right]`.
   - If the sum $\le 3.00$, both bags can fit into one trip: increment `left` and decrement `right`.
   - If the sum $> 3.00$, the heaviest bag must travel alone: decrement `right`.
4. Increment the trip count at every iteration. Continue until `left > right`.

### Solution Code

#### C++
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int efficientJanitor(vector<float>& weights) {
    sort(weights.begin(), weights.end());
    int left = 0;
    int right = weights.size() - 1;
    int trips = 0;

    while (left <= right) {
        if (left == right) {
            trips++;
            break;
        }
        if (weights[left] + weights[right] <= 3.00f) {
            left++;
            right--;
        } else {
            right--;
        }
        trips++;
    }
    return trips;
}

int main() {
    vector<float> weights = {1.01f, 1.99f, 2.5f, 1.5f, 1.01f};
    cout << efficientJanitor(weights) << endl; // Output: 3
    return 0;
}
```

#### Java
```java
import java.util.*;

public class EfficientJanitor {
    public static int efficientJanitor(List<Float> weights) {
        Collections.sort(weights);
        int left = 0;
        int right = weights.size() - 1;
        int trips = 0;

        while (left <= right) {
            if (left == right) {
                trips++;
                break;
            }
            if (weights.get(left) + weights.get(right) <= 3.00f) {
                left++;
                right--;
            } else {
                right--;
            }
            trips++;
        }
        return trips;
    }

    public static void main(String[] args) {
        List<Float> weights = Arrays.asList(1.01f, 1.99f, 2.5f, 1.5f, 1.01f);
        System.out.println(efficientJanitor(weights)); // Output: 3
    }
}
```

#### Python 3
```python
def efficientJanitor(weights: list[float]) -> int:
    weights.sort()
    left = 0
    right = len(weights) - 1
    trips = 0
    
    while left <= right:
        if left == right:
            trips += 1
            break
        if weights[left] + weights[right] <= 3.0:
            left += 1
            right -= 1
        else:
            right -= 1
        trips += 1
        
    return trips

# Driver
print(efficientJanitor([1.01, 1.99, 2.5, 1.5, 1.01])) # Output: 3
```

---

## Q3. Maximize Rental Revenue (Cloud VMs)

### Problem Statement
An IBM Cloud data center offers $n$ types of virtual machine (VM) instances. The available stock count of the $i$-th VM type is given by `vmStock[i]`. The rental price of each VM is dynamic and is equal to its current available stock count!

There are $m$ customers waiting to rent VMs one by one. Each customer selects an available VM type that yields the maximum revenue (i.e., has the highest remaining stock count). When a VM is rented, the stock count of that VM type decreases by $1$.

Calculate the **maximum total rental revenue** generated after serving all $m$ customers.

### Constraints
- $1 \le n \le 10^5$
- $1 \le \text{vmStock}[i] \le 10^6$
- $1 \le m \le \sum \text{vmStock}[i]$

### Sample Input & Output
```text
Input:
n = 4
vmStock = [2, 1, 1, 3]
m = 4

Output:
8

Explanation:
Customer 1 rents from stock 3: Revenue = 3, remaining = [2, 1, 1, 2]
Customer 2 rents from stock 2: Revenue = 2, remaining = [1, 1, 1, 2]
Customer 3 rents from stock 2: Revenue = 2, remaining = [1, 1, 1, 1]
Customer 4 rents from stock 1: Revenue = 1, remaining = [0, 1, 1, 1]
Total Revenue = 3 + 2 + 2 + 1 = 8.
```

### Optimal Approach: Max-Heap (Priority Queue) ($O(m \log n)$ Time)
1. Build a Max-Heap from the `vmStock` array.
2. For each customer from $1$ to $m$:
   - Extract the maximum element `top` from the heap.
   - Add `top` to `totalRevenue`.
   - If `top - 1 > 0`, insert `top - 1` back into the heap.
3. Use a 64-bit integer (`long long` in C++, `long` in Java) to store the accumulated revenue.

### Solution Code

#### C++
```cpp
#include <iostream>
#include <vector>
#include <queue>

using namespace std;

long long getMaximumRevenue(const vector<int>& vmStock, int m) {
    priority_queue<int> maxHeap;
    for (int stock : vmStock) {
        if (stock > 0) maxHeap.push(stock);
    }

    long long totalRevenue = 0;
    for (int i = 0; i < m && !maxHeap.empty(); i++) {
        int highest = maxHeap.top();
        maxHeap.pop();
        totalRevenue += highest;
        if (highest - 1 > 0) {
            maxHeap.push(highest - 1);
        }
    }
    return totalRevenue;
}

int main() {
    vector<int> vmStock = {2, 1, 1, 3};
    int m = 4;
    cout << getMaximumRevenue(vmStock, m) << endl; // Output: 8
    return 0;
}
```

#### Java
```java
import java.util.*;

public class CloudRevenue {
    public static long getMaximumRevenue(List<Integer> vmStock, int m) {
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        for (int stock : vmStock) {
            if (stock > 0) maxHeap.offer(stock);
        }

        long totalRevenue = 0;
        for (int i = 0; i < m && !maxHeap.isEmpty(); i++) {
            int top = maxHeap.poll();
            totalRevenue += top;
            if (top - 1 > 0) {
                maxHeap.offer(top - 1);
            }
        }
        return totalRevenue;
    }

    public static void main(String[] args) {
        List<Integer> vmStock = Arrays.asList(2, 1, 1, 3);
        System.out.println(getMaximumRevenue(vmStock, 4)); // Output: 8
    }
}
```

#### Python 3
```python
import heapq

def getMaximumRevenue(vmStock: list[int], m: int) -> int:
    # Python heapq is a min-heap by default; invert signs for max-heap
    max_heap = [-x for x in vmStock if x > 0]
    heapq.heapify(max_heap)
    
    total_revenue = 0
    for _ in range(m):
        if not max_heap:
            break
        top = -heapq.heappop(max_heap)
        total_revenue += top
        if top - 1 > 0:
            heapq.heappush(max_heap, -(top - 1))
            
    return total_revenue

# Driver
print(getMaximumRevenue([2, 1, 1, 3], 4)) # Output: 8
```

---

## Q4. Price Check

### Problem Statement
Given four arrays:
1. `products`: Names of products offered in a store.
2. `productPrices`: The official catalog prices for each product.
3. `productSold`: Names of products purchased by customers.
4. `soldPrice`: The actual price charged to the customer for each purchase in `productSold`.

Determine how many sale transactions charged an **incorrect price** (i.e., `soldPrice[i] != official catalog price`).

### Constraints
- $1 \le \text{products.length} \le 10^5$
- $1 \le \text{productSold.length} \le 10^5$

### Sample Input & Output
```text
Input:
products = ["eggs", "milk", "cheese"]
productPrices = [2.89, 3.29, 5.79]
productSold = ["eggs", "eggs", "cheese", "milk"]
soldPrice = [2.89, 2.99, 5.97, 3.29]

Output:
2

Explanation:
- Transaction 1: eggs charged 2.89 (Official: 2.89) -> Correct
- Transaction 2: eggs charged 2.99 (Official: 2.89) -> Incorrect (+1)
- Transaction 3: cheese charged 5.97 (Official: 5.79) -> Incorrect (+1)
- Transaction 4: milk charged 3.29 (Official: 3.29) -> Correct
Total mismatches = 2.
```

### Optimal Approach: Hash Map ($O(N + M)$ Time, $O(N)$ Space)
1. Map each product name to its official price in an unordered hash map.
2. Iterate through `productSold` and check against `soldPrice`.
3. If `abs(catalog_price - soldPrice[i]) > 1e-4`, increment `errors`.

### Solution Code

#### C++
```cpp
#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>
#include <cmath>

using namespace std;

int priceCheck(const vector<string>& products, const vector<float>& productPrices,
               const vector<string>& productSold, const vector<float>& soldPrice) {
    unordered_map<string, float> priceMap;
    for (size_t i = 0; i < products.size(); i++) {
        priceMap[products[i]] = productPrices[i];
    }

    int errors = 0;
    for (size_t i = 0; i < productSold.size(); i++) {
        const string& item = productSold[i];
        if (priceMap.find(item) != priceMap.end()) {
            if (fabs(priceMap[item] - soldPrice[i]) > 0.0001f) {
                errors++;
            }
        }
    }
    return errors;
}

int main() {
    vector<string> products = {"eggs", "milk", "cheese"};
    vector<float> productPrices = {2.89f, 3.29f, 5.79f};
    vector<string> productSold = {"eggs", "eggs", "cheese", "milk"};
    vector<float> soldPrice = {2.89f, 2.99f, 5.97f, 3.29f};

    cout << priceCheck(products, productPrices, productSold, soldPrice) << endl; // Output: 2
    return 0;
}
```

#### Python 3
```python
def priceCheck(products: list[str], productPrices: list[float], 
               productSold: list[str], soldPrice: list[float]) -> int:
    price_map = {products[i]: productPrices[i] for i in range(len(products))}
    errors = 0
    for item, charged in zip(productSold, soldPrice):
        if item in price_map and abs(price_map[item] - charged) > 1e-4:
            errors += 1
    return errors

# Driver
print(priceCheck(["eggs", "milk", "cheese"], [2.89, 3.29, 5.79],
                 ["eggs", "eggs", "cheese", "milk"], [2.89, 2.99, 5.97, 3.29])) # Output: 2
```

---

## Q5. Fun with Anagrams

### Problem Statement
Given an array of strings, remove each string that is an **anagram** of an earlier string that has already appeared in the array. Return the remaining strings sorted in **ascending alphabetical order**.

Two strings are anagrams if they contain the exact same characters with identical frequencies (e.g., `"code"` and `"doce"`).

### Constraints
- $1 \le \text{text.length} \le 1000$
- $1 \le \text{text}[i]\text{.length} \le 1000$

### Sample Input & Output
```text
Input:
text = ["code", "doce", "ecod", "framer", "frame"]

Output:
["code", "frame", "framer"]

Explanation:
- "code" is first, keep it. Signature: "cdeo"
- "doce" has signature "cdeo" (Already seen) -> Remove
- "ecod" has signature "cdeo" (Already seen) -> Remove
- "framer" has signature "aefmrr" -> Keep
- "frame" has signature "aefmr" -> Keep
Remaining: ["code", "framer", "frame"].
Alphabetically sorted: ["code", "frame", "framer"].
```

### Optimal Approach: Signature Normalization ($O(N \cdot L \log L + N \log N)$ Time)
1. Use an `unordered_set<string>` of seen signatures.
2. For each string in order:
   - Sort its characters to create a normalized signature key.
   - If the key is not in the set, insert the key and keep the original string in the `result` list.
3. Sort `result` alphabetically before returning.

### Solution Code

#### C++
```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <unordered_set>

using namespace std;

vector<string> funWithAnagrams(vector<string> text) {
    unordered_set<string> seenSignatures;
    vector<string> result;

    for (const string& s : text) {
        string key = s;
        sort(key.begin(), key.end());
        if (seenSignatures.find(key) == seenSignatures.end()) {
            seenSignatures.insert(key);
            result.push_back(s);
        }
    }
    sort(result.begin(), result.end());
    return result;
}

int main() {
    vector<string> text = {"code", "doce", "ecod", "framer", "frame"};
    vector<string> ans = funWithAnagrams(text);
    for (const string& s : ans) cout << s << " "; // Output: code frame framer
    cout << endl;
    return 0;
}
```

#### Python 3
```python
def funWithAnagrams(text: list[str]) -> list[str]:
    seen = set()
    result = []
    
    for word in text:
        signature = ''.join(sorted(word))
        if signature not in seen:
            seen.add(signature)
            result.append(word)
            
    return sorted(result)

# Driver
print(funWithAnagrams(["code", "doce", "ecod", "framer", "frame"])) 
# Output: ['code', 'frame', 'framer']
```

---

## Q6. Better Compression

### Problem Statement
A compressed string consists of characters followed by their non-zero integer frequencies. However, the compression is flawed: identical characters may appear at multiple disconnected places, and the characters are not alphabetically sorted.

For example: `"a12b56c1a8"` represents:
- `'a'` with frequency $12 + 8 = 20$
- `'b'` with frequency $56$
- `'c'` with frequency $1$

Write a function `betterCompression(string s)` that parses the string, aggregates all frequencies for each character, and outputs a canonical compressed string where:
1. Characters appear strictly in **alphabetical order (`'a'` through `'z'`)**.
2. Each distinct character appears **exactly once**, immediately followed by its aggregated total frequency.

### Constraints
- $1 \le s.\text{length} \le 10^5$
- Characters are lowercase English letters (`'a'` to `'z'`).

### Sample Input & Output
```text
Input:
s = "a3c9b2c1"

Output:
"a3b2c10"

Explanation:
'a' appears with frequency 3.
'b' appears with frequency 2.
'c' appears with frequency 9 + 1 = 10.
Alphabetical order: 'a', 'b', 'c' -> "a3b2c10".
```

### Optimal Approach: Two-Pointer Linear Parser ($O(N)$ Time, $O(1)$ Space)
1. Use an array `freq` of size 26 initialized to 0.
2. Traverse string $s$:
   - At each character $s[i]$, record `char ch = s[i]`.
   - Read subsequent digits while $i+1 < N$ and $s[i+1]$ is a digit. Build the full integer count (e.g., $12$).
   - Accumulate `freq[ch - 'a'] += count`.
3. Construct the result string from index 0 to 25 for all characters with `freq[idx] > 0`.

### Solution Code

#### C++
```cpp
#include <iostream>
#include <string>
#include <vector>

using namespace std;

string betterCompression(const string& s) {
    long long freq[26] = {0};
    int n = s.length();
    int i = 0;

    while (i < n) {
        char ch = s[i++];
        long long count = 0;
        while (i < n && isdigit(s[i])) {
            count = count * 10 + (s[i] - '0');
            i++;
        }
        freq[ch - 'a'] += count;
    }

    string result = "";
    for (int c = 0; c < 26; c++) {
        if (freq[c] > 0) {
            result += (char)('a' + c);
            result += to_string(freq[c]);
        }
    }
    return result;
}

int main() {
    cout << betterCompression("a3c9b2c1") << endl;    // Output: a3b2c10
    cout << betterCompression("a12b56c1a8") << endl;  // Output: a20b56c1
    return 0;
}
```

#### Java
```java
public class BetterCompression {
    public static String betterCompression(String s) {
        long[] freq = new long[26];
        int n = s.length();
        int i = 0;

        while (i < n) {
            char ch = s.charAt(i++);
            long count = 0;
            while (i < n && Character.isDigit(s.charAt(i))) {
                count = count * 10 + (s.charAt(i) - '0');
                i++;
            }
            freq[ch - 'a'] += count;
        }

        StringBuilder sb = new StringBuilder();
        for (int c = 0; c < 26; c++) {
            if (freq[c] > 0) {
                sb.append((char)('a' + c));
                sb.append(freq[c]);
            }
        }
        return sb.toString();
    }

    public static void main(String[] args) {
        System.out.println(betterCompression("a3c9b2c1"));   // a3b2c10
        System.out.println(betterCompression("a12b56c1a8")); // a20b56c1
    }
}
```

#### Python 3
```python
def betterCompression(s: str) -> str:
    freq = [0] * 26
    n = len(s)
    i = 0
    
    while i < n:
        ch = s[i]
        i += 1
        num_start = i
        while i < n and s[i].isdigit():
            i += 1
        count = int(s[num_start:i])
        freq[ord(ch) - ord('a')] += count
        
    parts = []
    for c in range(26):
        if freq[c] > 0:
            parts.append(f"{chr(ord('a') + c)}{freq[c]}")
            
    return "".join(parts)

# Driver
print(betterCompression("a3c9b2c1"))   # Output: a3b2c10
print(betterCompression("a12b56c1a8")) # Output: a20b56c1
```

---

## Q7. Roll the String

### Problem Statement
Given a string `s` of lowercase English letters and an array `roll` of integers. For each integer $k$ in `roll`, cyclically roll (shift) the first $k$ characters of `s` forward by $1$ in the alphabet (`'a' -> 'b'`, `'z' -> 'a'`).

Simulating each roll operation individually takes $O(M \times N)$ time and results in **Time Limit Exceeded (TLE)** on HackerRank. Find an optimal solution that returns the final rolled string.

### Constraints
- $1 \le \text{length of } s \le 10^5$
- $1 \le \text{roll.length} \le 10^5$
- $1 \le \text{roll}[i] \le \text{length of } s$

### Sample Input & Output
```text
Input:
s = "abz"
roll = [3, 2, 1]

Output:
"deb"

Explanation:
- roll[0] = 3: roll first 3 characters -> "abz" becomes "bca"
- roll[1] = 2: roll first 2 characters -> "bca" becomes "cda"
- roll[2] = 1: roll first 1 character  -> "cda" becomes "dda" -> wait:
Let's trace shifts:
Index 0 is affected by roll=3, roll=2, roll=1 -> 3 shifts: 'a' + 3 = 'd'
Index 1 is affected by roll=3, roll=2 -> 2 shifts: 'b' + 2 = 'd'
Index 2 is affected by roll=3 -> 1 shift: 'z' + 1 = 'a'
Result is "dda".
```

### Optimal Approach: Difference Array / Suffix Counts ($O(N + M)$ Time)
1. Notice that a roll of size $k$ increments the shift count of all characters at indices $0, 1, \dots, k-1$ by $1$.
2. Maintain an array `shifts` of size $N+1$ initialized to $0$.
3. For each value $k$ in `roll`, record `shifts[k-1] += 1`.
4. Propagate backwards from right to left using a running suffix sum:
   `for i from n-2 down to 0: shifts[i] += shifts[i+1]`.
5. Now, each index $i$ has its exact net shift count `shifts[i]`.
6. Compute new character: `s[i] = 'a' + ((s[i] - 'a' + shifts[i]) % 26)`.

### Solution Code

#### C++
```cpp
#include <iostream>
#include <string>
#include <vector>

using namespace std;

string rollTheString(string s, const vector<int>& roll) {
    int n = s.length();
    vector<long long> shifts(n, 0);

    for (int k : roll) {
        if (k > 0) {
            shifts[min(k, n) - 1]++;
        }
    }

    // Cumulative sum from right to left
    for (int i = n - 2; i >= 0; i--) {
        shifts[i] += shifts[i + 1];
    }

    for (int i = 0; i < n; i++) {
        int original = s[i] - 'a';
        int shifted = (original + shifts[i]) % 26;
        s[i] = 'a' + shifted;
    }
    return s;
}

int main() {
    cout << rollTheString("abz", {3, 2, 1}) << endl; // Output: dda
    cout << rollTheString("vwxyz", {1, 2, 3, 4, 5}) << endl;
    return 0;
}
```

#### Python 3
```python
def rollTheString(s: str, roll: list[int]) -> str:
    n = len(s)
    shifts = [0] * n
    
    for k in roll:
        idx = min(k, n) - 1
        shifts[idx] += 1
        
    for i in range(n - 2, -1, -1):
        shifts[i] += shifts[i + 1]
        
    result = []
    for i in range(n):
        orig = ord(s[i]) - ord('a')
        shifted = (orig + shifts[i]) % 26
        result.append(chr(ord('a') + shifted))
        
    return ''.join(result)

# Driver
print(rollTheString("abz", [3, 2, 1])) # Output: dda
```

---

## Q8. Reach the End in Time

### Problem Statement
A grid has $R$ rows and $C$ columns. Some cells are unblocked (`'.'`) and some are blocked (`'#'`). You start at top-left `(0, 0)` at time $t = 0$. You need to reach the bottom-right `(R-1, C-1)`.

In each time unit, you can move exactly 1 step up, down, left, or right to an adjacent unblocked cell. You are given an integer `maxTime`. Return `"Yes"` if you can reach `(R-1, C-1)` at or before `maxTime`, otherwise return `"No"`.

### Constraints
- $1 \le R, C \le 1000$
- $0 \le \text{maxTime} \le 10^6$
- Top-left `grid[0][0]` and bottom-right `grid[R-1][C-1]` are always `'.'`.

### Optimal Approach: Breadth-First Search (BFS) ($O(R \times C)$ Time & Space)
- Standard unweighted shortest path BFS guarantees finding the minimum steps to reach the destination.
- If `min_steps <= maxTime`, return `"Yes"`, else `"No"`.

### Solution Code (C++)
```cpp
#include <iostream>
#include <vector>
#include <string>
#include <queue>

using namespace std;

string reachTheEnd(const vector<string>& grid, int maxTime) {
    int R = grid.size();
    int C = grid[0].size();
    if (grid[0][0] == '#' || grid[R - 1][C - 1] == '#') return "No";

    vector<vector<int>> dist(R, vector<int>(C, -1));
    queue<pair<int, int>> q;

    dist[0][0] = 0;
    q.push({0, 0});

    int dr[] = {-1, 1, 0, 0};
    int dc[] = {0, 0, -1, 1};

    while (!q.empty()) {
        auto [r, c] = q.front();
        q.pop();

        if (r == R - 1 && c == C - 1) {
            return dist[r][c] <= maxTime ? "Yes" : "No";
        }

        for (int i = 0; i < 4; i++) {
            int nr = r + dr[i];
            int nc = c + dc[i];
            if (nr >= 0 && nr < R && nc >= 0 && nc < C && grid[nr][nc] == '.' && dist[nr][nc] == -1) {
                dist[nr][nc] = dist[r][c] + 1;
                q.push({nr, nc});
            }
        }
    }
    return "No";
}

int main() {
    vector<string> grid = {
        "..##",
        "#.##",
        "#..."
    };
    cout << reachTheEnd(grid, 5) << endl; // Output: Yes
    return 0;
}
```

---

## Q9. Connected Groups (Friend Circles)

### Problem Statement
There are $n$ students. Some of them are friends, while some are not. If student $A$ is friends with student $B$, and $B$ is friends with $C$, then $A$ is indirect friends with $C$. A **connected group** is a group of students directly or indirectly connected to each other.

You are given an $n \times n$ adjacency matrix represented by an array of binary strings `related`, where `related[i][j] == '1'` denotes that student $i$ and student $j$ are friends. Find the **total number of connected groups**.

### Optimal Approach: Graph DFS / Disjoint Set ($O(N^2)$ Time, $O(N)$ Space)
Traverse all $n$ students. If student $i$ is not yet visited, increment group count and launch a DFS/BFS to visit the entire component.

### Solution Code (Java)
```java
import java.util.*;

public class ConnectedGroups {
    public static int countGroups(List<String> related) {
        int n = related.size();
        boolean[] visited = new boolean[n];
        int groups = 0;

        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                groups++;
                dfs(i, related, visited, n);
            }
        }
        return groups;
    }

    private static void dfs(int u, List<String> related, boolean[] visited, int n) {
        visited[u] = true;
        for (int v = 0; v < n; v++) {
            if (related.get(u).charAt(v) == '1' && !visited[v]) {
                dfs(v, related, visited, n);
            }
        }
    }

    public static void main(String[] args) {
        List<String> matrix = Arrays.asList(
            "1100",
            "1110",
            "0110",
            "0001"
        );
        System.out.println(countGroups(matrix)); // Output: 2
    }
}
```

---

## Q10. Strictly Increasing Contiguous Slopes

### Problem Statement
Given an array `y` of integers representing the height coordinates across integer $x$-indices $0, 1, \dots, n-1$. Given an integer $k$, find the count of all contiguous subarrays of size $k$ such that the values are **strictly increasing**:
`y[i] < y[i+1] < y[i+2] < ... < y[i+k-1]`.

### Constraints
- $1 \le k \le n \le 10^5$

### Optimal Approach: Single-Pass Running Streak ($O(N)$ Time, $O(1)$ Space)
Maintain a running count `streak` of how many consecutive ascending steps have occurred. Whenever `streak >= k - 1`, increment the answer.

### Solution Code (Python 3)
```python
def countIncreasingSlopes(y: list[int], k: int) -> int:
    if k <= 1:
        return len(y)
    
    count = 0
    streak = 0
    for i in range(1, len(y)):
        if y[i] > y[i - 1]:
            streak += 1
        else:
            streak = 0
            
        if streak >= k - 1:
            count += 1
            
    return count

# Driver
print(countIncreasingSlopes([6, 5, 7, 8, 3, 5, 6], 3)) # Output: 2
```

---

## Q11. Minimum Cost to Reduce Array

### Problem Statement
Given an array `arr` of $n$ integers. In each operation, pick any two elements, remove them, incur a cost equal to their **sum**, and push their sum back into the array. Repeat until only 1 element remains. Find the **minimum possible total cost**.

### Constraints
- $1 \le n \le 10^5$
- $1 \le \text{arr}[i] \le 10^5$

### Optimal Approach: Min-Heap (Optimal Merge Pattern / Huffman) ($O(N \log N)$)
Greedily pick the two smallest elements at every step. Their sum contributes to all future additions.

### Solution Code (C++)
```cpp
#include <iostream>
#include <vector>
#include <queue>

using namespace std;

long long minCostToReduce(const vector<int>& arr) {
    priority_queue<long long, vector<long long>, greater<long long>> minHeap;
    for (int x : arr) minHeap.push(x);

    long long totalCost = 0;
    while (minHeap.size() > 1) {
        long long first = minHeap.top(); minHeap.pop();
        long long second = minHeap.top(); minHeap.pop();
        long long combined = first + second;
        totalCost += combined;
        minHeap.push(combined);
    }
    return totalCost;
}

int main() {
    cout << minCostToReduce({4, 6, 8}) << endl; // (4+6)=10, (10+8)=18 -> Total: 28
    return 0;
}
```

---

## Q12. Counting Pairs with Difference K

### Problem Statement
Given an array of integers and an integer $k \ge 0$, count the number of **unique pairs** $(a, b)$ such that $|a - b| = k$ and $a \le b$. Each unique pair of values should only be counted once.

### Solution Code (Python 3)
```python
def countPairsWithDiffK(nums: list[int], k: int) -> int:
    from collections import Counter
    freq = Counter(nums)
    count = 0
    
    if k == 0:
        for val, f in freq.items():
            if f >= 2:
                count += 1
    else:
        for val in freq:
            if val + k in freq:
                count += 1
                
    return count

# Driver
print(countPairsWithDiffK([1, 5, 3, 4, 2], 2)) # (1,3), (2,4), (3,5) -> 3
```

---

## Q13. Longest Subarray with Equal 0s and 1s

### Problem Statement
Given a binary array containing only `0`s and `1`s, find the **maximum length** of a contiguous subarray that contains an equal number of `0`s and `1`s.

### Optimal Approach: Prefix Sum + Hash Map ($O(N)$ Time, $O(N)$ Space)
Treat every `0` as `-1`. A subarray with equal 0s and 1s has a sum of $0$. If running prefix sum $S$ appears at index $i$ and first appeared at index $j$, the subarray from $j+1$ to $i$ has sum $0$.

### Solution Code (Java)
```java
import java.util.*;

public class Equal01 {
    public static int findMaxLength(int[] nums) {
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, -1);
        int maxLen = 0;
        int runningSum = 0;

        for (int i = 0; i < nums.length; i++) {
            runningSum += (nums[i] == 1 ? 1 : -1);
            if (map.containsKey(runningSum)) {
                maxLen = Math.max(maxLen, i - map.get(runningSum));
            } else {
                map.put(runningSum, i);
            }
        }
        return maxLen;
    }

    public static void main(String[] args) {
        System.out.println(findMaxLength(new int[]{0, 1, 0, 1, 1, 1, 0})); // 6
    }
}
```

---

## Q14. Triangle Toys

### Problem Statement
Given three arrays `a`, `b`, and `c` of length $n$, representing the lengths of three sides of toy triangles. For each index $i$:
1. If sides cannot form a valid triangle ($a+b \le c$, $b+c \le a$, or $a+c \le b$), classify as `"None"`.
2. If all 3 sides are equal, classify as `"Equilateral"`.
3. If exactly 2 sides are equal, classify as `"Isosceles"`.
4. If all 3 sides are different, classify as `"Scalene"`.

Return an array of classifications.

### Solution Code (C++)
```cpp
#include <iostream>
#include <vector>
#include <string>

using namespace std;

vector<string> classifyTriangles(const vector<int>& a, const vector<int>& b, const vector<int>& c) {
    int n = a.size();
    vector<string> result(n);

    for (int i = 0; i < n; i++) {
        long long s1 = a[i], s2 = b[i], s3 = c[i];
        if (s1 + s2 <= s3 || s2 + s3 <= s1 || s1 + s3 <= s2) {
            result[i] = "None";
        } else if (s1 == s2 && s2 == s3) {
            result[i] = "Equilateral";
        } else if (s1 == s2 || s2 == s3 || s1 == s3) {
            result[i] = "Isosceles";
        } else {
            result[i] = "Scalene";
        }
    }
    return result;
}

int main() {
    vector<int> a = {3, 7, 2};
    vector<int> b = {4, 7, 2};
    vector<int> c = {5, 7, 5};
    vector<string> ans = classifyTriangles(a, b, c);
    for (const string& s : ans) cout << s << " "; // Output: Scalene Equilateral None
    cout << endl;
    return 0;
}
```

---

## Q15. Maximum Index (Avoid the Bad Index)

### Problem Statement
You start at index $0$. You perform $n$ steps. At step $i$ ($1 \le i \le n$), you can choose to either:
1. Move forward by $i$ steps (`current_index += i`), OR
2. Stay at your current index.

There is one `badIndex`. You can **never** step onto or land on `badIndex` at any move. Find the **maximum index** you can reach after $n$ moves.

### Optimal Approach: Greedy & Math ($O(1)$ Time)
The theoretical maximum reach after $n$ moves is $\frac{n(n+1)}{2}$.
If moving greedily lands on `badIndex` during any step $j$, we could have skipped the move at step $1$ (which adds $+1$). Skipping step 1 reduces the final maximum position by exactly $1$, while ensuring that all subsequent indices shifted by $-1$, so we never land on `badIndex`!
Hence, if $badIndex$ is reachable along the greedy path, answer is $\frac{n(n+1)}{2} - 1$, otherwise $\frac{n(n+1)}{2}$.

### Solution Code (Python 3)
```python
def maxIndex(n: int, badIndex: int) -> int:
    max_reach = n * (n + 1) // 2
    
    # Check if badIndex is a triangular number k*(k+1)/2
    # k^2 + k - 2*badIndex = 0
    # Discriminant D = 1 + 8*badIndex
    import math
    D = 1 + 8 * badIndex
    sqrt_D = int(math.isqrt(D))
    
    if sqrt_D * sqrt_D == D and (-1 + sqrt_D) % 2 == 0:
        k = (-1 + sqrt_D) // 2
        if 1 <= k <= n:
            return max_reach - 1
            
    return max_reach

# Driver
print(maxIndex(4, 6)) # 4*5/2 = 10. Step sequence reaches 6 (1+2+3=6 bad!). Ans: 9
```
