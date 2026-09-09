# 🐛 Stage 3 — Advanced C++ Debugging Assessment

> **Target Roles:** Alpha_Stack (₹13 LPA) | Root_Mind (₹16 LPA)  
> **Format:** Buggy Code Analysis & Fixes | **Time:** ~20–30 mins (approx. 2–3 mins per bug)  
> **Cutoff for ₹13–16 LPA:** Aim for **100% precision**. In the high-tier band, compiler syntax errors are rare; 95% of questions test **subtle logic flaws, undefined behavior, memory corruption, and complexity bottlenecks (TLE)**.

---

## 📋 The 5-Step High-Speed Debugging Framework

When facing a buggy C++ snippet in Capgemini's assessment:
1. **Check the Constraints & Types:** Did intermediate multiplication exceed $2 \times 10^9$ (`int` overflow)? Are negative numbers possible with modulo `%`?
2. **Check Container References:** Is `vector` or `string` passed by value into a recursive function? (Triggers exponential copying and TLE).
3. **Check Loop Bounds & Iterators:** Are iterators erased inside loops without capturing the return value? Is there `i <= n` instead of `i < n`?
4. **Check Operator Precedence:** Bitwise operators (`&`, `^`, `|`, `<<`, `>>`) have **lower precedence** than comparison operators (`==`, `!=`, `<`, `>`).
5. **Check Comparator Invariants:** Does a custom `sort()` comparator use `<=` instead of `<`? (Violates Strict Weak Ordering $\to$ Segfault).

---

# 🔥 15 Advanced C++ Debugging PYQs (₹13–16 LPA Tier)

---

### Bug 1: Iterator Invalidation in `std::vector` (Runtime Crash) ⭐⭐⭐

**Problem:** Remove all even integers from a `std::vector`.

```cpp
// ❌ BUGGY CODE
#include <bits/stdc++.h>
using namespace std;

void removeEvens(vector<int>& vec) {
    for (auto it = vec.begin(); it != vec.end(); it++) {
        if (*it % 2 == 0) {
            vec.erase(it); // 💥 BUG: erase() invalidates 'it' and subsequent iterators!
                           // 'it++' in loop header results in Undefined Behavior / Segfault.
        }
    }
}
```

**Why it Fails:** `vec.erase(it)` invalidates the iterator `it`. Incrementing an invalidated iterator `it++` causes an immediate crash or skips the next adjacent element.

**Fix:** `erase()` returns a valid iterator pointing to the element immediately following the erased one.

```cpp
// ✅ FIXED CODE
void removeEvens(vector<int>& vec) {
    for (auto it = vec.begin(); it != vec.end(); ) {
        if (*it % 2 == 0) {
            it = vec.erase(it); // Returns next valid iterator; do NOT increment
        } else {
            ++it;
        }
    }
}
// Or modern idiomatic C++20:
// std::erase_if(vec, [](int x) { return x % 2 == 0; });
```

---

### Bug 2: Integer Overflow in Binary Search & Multiplication ⭐⭐⭐

**Problem:** Binary search for the square root of $N$ ($1 \le N \le 10^9$).

```cpp
// ❌ BUGGY CODE
int mySqrt(int n) {
    int low = 1, high = n, ans = 0;
    while (low <= high) {
        int mid = (low + high) / 2; // 💥 BUG 1: (low + high) can overflow INT_MAX (2^31 - 1)
        if (mid * mid <= n) {       // 💥 BUG 2: mid * mid overflows 32-bit signed int!
            ans = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return ans;
}
```

**Fix:** Use `low + (high - low) / 2` and cast multiplication to `long long`.

```cpp
// ✅ FIXED CODE
int mySqrt(int n) {
    int low = 1, high = n, ans = 0;
    while (low <= high) {
        int mid = low + (high - low) / 2; // ✅ Safe against overflow
        if ((long long)mid * mid <= n) {   // ✅ Cast to 64-bit
            ans = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return ans;
}
```

---

### Bug 3: Dynamic Memory Leak & Array Delete Mismatch ⭐⭐

**Problem:** Dynamically allocate an array, populate it, and free memory.

```cpp
// ❌ BUGGY CODE
void processBuffer(int size) {
    int* buffer = new int[size];
    for (int i = 0; i < size; i++) buffer[i] = i * 2;
    // ... processing ...
    delete buffer; // 💥 BUG: Using 'delete' instead of 'delete[]'.
                   // Undefined behavior: only destructor of first element is called!
}
```

**Fix:** Use `delete[] buffer;` or preferably `std::vector<int>` / `std::unique_ptr<int[]>`.

```cpp
// ✅ FIXED CODE
delete[] buffer; // ✅ Properly deallocates dynamically allocated array
```

---

### Bug 4: Shallow Copy Double Free (Rule of Three Violation) ⭐⭐⭐

**Problem:** A custom class holding a dynamically allocated buffer.

```cpp
// ❌ BUGGY CODE
class DataStore {
public:
    int* data;
    DataStore(int val) {
        data = new int(val);
    }
    ~DataStore() {
        delete data; // 💥 BUG: Default copy constructor performs a shallow copy!
    }
};

void run() {
    DataStore d1(42);
    DataStore d2 = d1; // Shallow copy: d2.data points to the EXACT same memory as d1.data
} // When d2 and d1 go out of scope, 'delete data' is called TWICE on the same address -> Crash!
```

**Fix:** Define a Deep Copy Constructor or disable copying.

```cpp
// ✅ FIXED CODE: Deep copy constructor
DataStore(const DataStore& other) {
    data = new int(*(other.data)); // Allocate independent memory
}
```

---

### Bug 5: Floating Point Direct Equality Trap ⭐⭐

**Problem:** Check if sum of fractions equals expected value.

```cpp
// ❌ BUGGY CODE
bool verifySum() {
    double a = 0.1 + 0.2;
    double b = 0.3;
    return (a == b); // 💥 BUG: Binary floating-point representation error!
                     // 0.1 + 0.2 evaluates to 0.3000000000000000444... != 0.3
}
```

**Fix:** Compare absolute difference against an epsilon threshold ($\epsilon = 10^{-9}$).

```cpp
// ✅ FIXED CODE
bool verifySum() {
    double a = 0.1 + 0.2;
    double b = 0.3;
    return fabs(a - b) < 1e-9; // ✅ Correct epsilon comparison
}
```

---

### Bug 6: Modulo of Negative Numbers in C++ ⭐⭐

**Problem:** Compute circular array index for previous element: $(i - 1) \pmod N$.

```cpp
// ❌ BUGGY CODE
int getPrevIndex(int i, int n) {
    return (i - 1) % n; // 💥 BUG: In C++11 onwards, if i = 0, (0 - 1) % n == -1 (NOT n - 1)!
                        // C++ % operator keeps the sign of the dividend.
}
```

**Fix:** Add $n$ before applying modulo to guarantee non-negative remainder.

```cpp
// ✅ FIXED CODE
int getPrevIndex(int i, int n) {
    return ((i - 1) % n + n) % n; // ✅ Always yields result in range [0, n - 1]
}
```

---

### Bug 7: Pass-by-Value Exponential TLE in Recursion ⭐⭐⭐

**Problem:** Backtracking to find all subsets summing to a target.

```cpp
// ❌ BUGGY CODE
// 💥 BUG: 'current' and 'ans' are passed by VALUE!
// Copying vector of size k at every step causes O(2^N * N) memory and Time Limit Exceeded!
void findSubsets(vector<int> nums, int idx, int sum, vector<int> current, vector<vector<int>> ans) {
    if (sum == 0) {
        ans.push_back(current); // Caller never sees this addition because 'ans' is a copy!
        return;
    }
    for (int i = idx; i < nums.size(); i++) {
        current.push_back(nums[i]);
        findSubsets(nums, i + 1, sum - nums[i], current, ans);
        current.pop_back();
    }
}
```

**Fix:** Pass `nums`, `current`, and `ans` by reference (`&`).

```cpp
// ✅ FIXED CODE
void findSubsets(const vector<int>& nums, int idx, int sum, vector<int>& current, vector<vector<int>>& ans) {
    if (sum == 0) {
        ans.push_back(current);
        return;
    }
    for (int i = idx; i < nums.size(); i++) {
        if (sum - nums[i] < 0) continue; // Pruning
        current.push_back(nums[i]);
        findSubsets(nums, i + 1, sum - nums[i], current, ans);
        current.pop_back();
    }
}
```

---

### Bug 8: Operator Precedence in Bitwise Operations ⭐⭐⭐

**Problem:** Check if the $k$-th bit of number $n$ is set.

```cpp
// ❌ BUGGY CODE
bool isKthBitSet(int n, int k) {
    if (n & 1 << k != 0) { // 💥 BUG: '!=' has HIGHER precedence than '&'!
                           // Evaluates as: n & (1 << k != 0) -> n & 1
        return true;
    }
    return false;
}
```

**Precedence Hierarchy:** `!=`, `==` > `<<`, `>>` > `&` > `^` > `|` > `&&` > `||`.

**Fix:** Use explicit parentheses around bitwise operation.

```cpp
// ✅ FIXED CODE
bool isKthBitSet(int n, int k) {
    if ((n & (1 << k)) != 0) { // ✅ Correctly grouped
        return true;
    }
    return false;
}
```

---

### Bug 9: `std::sort` Comparator Violates Strict Weak Ordering (Segfault) ⭐⭐⭐

**Problem:** Sort pairs descending by value.

```cpp
// ❌ BUGGY CODE
bool cmp(int a, int b) {
    return a <= b; // 💥 BUG: Using '<=' violates Strict Weak Ordering!
                   // A comparator MUST satisfy irreflexivity: cmp(x, x) must be FALSE.
                   // With '<=', cmp(x, x) is TRUE -> Causes out-of-bounds memory write in std::sort!
}

void doSort(vector<int>& v) {
    sort(v.begin(), v.end(), cmp); // 💥 Triggers Segmentation Fault on large inputs!
}
```

**Fix:** Use strict inequality `<` or `>`.

```cpp
// ✅ FIXED CODE
bool cmp(int a, int b) {
    return a < b; // ✅ Strict Weak Ordering: cmp(x, x) is false
}
```

---

### Bug 10: Vector Pre-Sizing + `push_back` Doubling Trap ⭐⭐

**Problem:** Read $N$ integers into a vector.

```cpp
// ❌ BUGGY CODE
vector<int> readInput(int n) {
    vector<int> v(n); // Vector initialized with 'n' zeroes: size is 'n'!
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        v.push_back(x); // 💥 BUG: Appends AFTER the n zeroes!
                        // Final vector has size 2*n: [0, 0, ..., x1, x2, ...]
    }
    return v;
}
```

**Fix:** Either use `v[i] = x` or initialize with empty vector and reserve capacity.

```cpp
// ✅ FIXED CODE: Option 1
vector<int> v(n);
for (int i = 0; i < n; i++) cin >> v[i]; // Direct index assignment

// ✅ FIXED CODE: Option 2
vector<int> v;
v.reserve(n);
for (int i = 0; i < n; i++) { int x; cin >> x; v.push_back(x); }
```

---

### Bug 11: Map Auto-Insertion Mutating Size During Lookup ⭐⭐

**Problem:** Check if a key exists without modifying the map.

```cpp
// ❌ BUGGY CODE
int countElements(map<string, int>& freqMap, const string& key) {
    if (freqMap[key] > 0) { // 💥 BUG: operator[] automatically INSERTS 'key' with default value (0)
                            // if it does not already exist!
        return freqMap[key];
    }
    return 0; // map size has now been modified!
}
```

**Fix:** Use `.find()` or `.count()`.

```cpp
// ✅ FIXED CODE
int countElements(const map<string, int>& freqMap, const string& key) {
    auto it = freqMap.find(key);
    if (it != freqMap.end()) {
        return it->second;
    }
    return 0; // Does not mutate map; safe on const references
}
```

---

### Bug 12: Loop By-Value Mutation Trap ⭐

**Problem:** Double all elements in an array.

```cpp
// ❌ BUGGY CODE
void doubleElements(vector<int>& nums) {
    for (auto x : nums) { // 💥 BUG: 'x' is a local COPY of each element!
        x = x * 2;       // Modifies local copy; 'nums' remains unchanged!
    }
}
```

**Fix:** Use `auto& x` (reference).

```cpp
// ✅ FIXED CODE
void doubleElements(vector<int>& nums) {
    for (auto& x : nums) { // ✅ Modifies actual container element in-place
        x = x * 2;
    }
}
```

---

### Bug 13: C-String Missing Null Terminator (`\0`) ⭐⭐

**Problem:** Reverse a character array.

```cpp
// ❌ BUGGY CODE
char* reverseStr(const char* s, int len) {
    char* rev = (char*)malloc(len); // 💥 BUG: Allocated only 'len' bytes, missing +1 for '\0'!
    for (int i = 0; i < len; i++) {
        rev[i] = s[len - 1 - i];
    }
    return rev; // 💥 strlen(rev) or printf("%s", rev) reads past memory boundary -> Garbage/Crash!
}
```

**Fix:** Allocate `len + 1` bytes and set `rev[len] = '\0'`.

```cpp
// ✅ FIXED CODE
char* rev = (char*)malloc(len + 1);
for (int i = 0; i < len; i++) rev[i] = s[len - 1 - i];
rev[len] = '\0'; // ✅ Null-terminated
return rev;
```

---

### Bug 14: Unsynchronized Fast I/O Mixed with `scanf`/`cin.getline` ⭐⭐

**Problem:** Fast I/O mixed with C-style I/O functions.

```cpp
// ❌ BUGGY CODE
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n;
    cin >> n;
    char buffer[100];
    scanf("%s", buffer); // 💥 BUG: After sync_with_stdio(false), mixing C++ cin and C scanf
                         // produces undefined I/O stream interleaving and lost inputs!
}
```

**Fix:** Stick purely to C++ stream I/O once synchronization is disabled.

```cpp
// ✅ FIXED CODE
string s;
cin >> s; // Use cin exclusively
```

---

### Bug 15: Stack Overflow from Missing Recursion Base Case / Depth ⭐⭐⭐

**Problem:** Find connected components on a $1000 \times 1000$ grid using recursion.

```cpp
// ❌ BUGGY CODE
void dfs(int r, int c, vector<vector<int>>& grid) {
    grid[r][c] = 0; // Mark visited
    int dr[] = {-1, 1, 0, 0};
    int dc[] = {0, 0, -1, 1};
    for (int i = 0; i < 4; i++) {
        int nr = r + dr[i], nc = c + dc[i];
        if (nr >= 0 && nr < grid.size() && nc >= 0 && nc < grid[0].size() && grid[nr][nc] == 1) {
            dfs(nr, nc, grid); // 💥 BUG: Recursion depth can reach 10^6 on a snake-like path!
                               // Default stack size is typically 8MB -> SIGSEGV (Stack Overflow).
        }
    }
}
```

**Fix:** Replace deep recursive DFS with an explicit **queue-based BFS** or iterative stack to avoid call-stack exhaustion.

```cpp
// ✅ FIXED CODE: Iterative BFS
void bfs(int startR, int startC, vector<vector<int>>& grid) {
    queue<pair<int, int>> q;
    q.push({startR, startC});
    grid[startR][startC] = 0;
    int dr[] = {-1, 1, 0, 0};
    int dc[] = {0, 0, -1, 1};
    while (!q.empty()) {
        auto [r, c] = q.front(); q.pop();
        for (int i = 0; i < 4; i++) {
            int nr = r + dr[i], nc = c + dc[i];
            if (nr >= 0 && nr < grid.size() && nc >= 0 && nc < grid[0].size() && grid[nr][nc] == 1) {
                grid[nr][nc] = 0; // Mark visited immediately upon enqueuing
                q.push({nr, nc});
            }
        }
    }
}
```

---

## 🎯 Quick-Reference Bug Hunt Checklist (Keep in Mind During Exam)

```
[ ] Did you check if integer math can exceed 2 * 10^9? (Use 'long long')
[ ] Is vector.erase(it) assigned back to it? (it = vector.erase(it))
[ ] Are custom sort comparators strictly using '<' and never '<='?
[ ] Are containers passed by reference (&) into recursive calls?
[ ] Are bitwise expressions wrapped in parentheses when combined with == or !=?
[ ] Is modulo used with negative numbers? (Add n: ((x % n) + n) % n)
[ ] Is a map key accessed via map[key] in read-only logic? (Use .find())
[ ] Does float comparison use fabs(a - b) < 1e-9?
[ ] Is base destructor marked 'virtual' when deleting derived class through base pointer?
```

---

> **Next Step:** [Stage 4 — AI-Assisted Coding (Hard Algorithmic Problems) →](./04_AI_Assisted_Coding.md) | **Return to** [Main Roadmap](./README.md)
