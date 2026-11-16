# 📚 Module 07: Real ACKO Coding & Interview Question Bank (LeetCode, GFG, Reddit)

> **Drive Target:** ACKO General Insurance | Super-Dream Drive (₹19.80 LPA CTC | ₹40k/mo Stipend)  
> **Source:** Candidate-reported questions from LeetCode Discussion, GeeksforGeeks On-Campus Archives, Glassdoor & Reddit.  
> **Difficulty Level:** Upper-Medium to Hard.

---

## 🎯 Summary of Question Categories & Frequency

Based on real candidate reports from previous ACKO on-campus drives across top engineering colleges:

| Category | Frequency | Common Reported Problems | Core Concept / Trick |
|---|---|---|---|
| **Dynamic Programming** | ⭐⭐⭐⭐⭐ | House Robber II, Frog Jump, Edit Distance, Jump Game II | Circular array splitting, memoization, state reduction |
| **Arrays & Two Pointers** | ⭐⭐⭐⭐⭐ | 3Sum, Subarrays with K Distinct, Trapping Rainwater | Sorting + two-pointer collision, sliding window with frequency map |
| **Graphs & Disjoint Sets** | ⭐⭐⭐⭐ | Detect Cycle in Directed Graph, Redundant Connection (DSU), Network Delay Time | DSU with path compression, Topological Sort (Kahn's algo) |
| **Trees & Heaps** | ⭐⭐⭐⭐ | Merge K Sorted Arrays/Lists, Delete Node in BST, Lowest Common Ancestor | Min-Heap priority queue, recursive BST pointer relinking |
| **Stacks & Parsing** | ⭐⭐⭐⭐ | HTML Tag Validator, Largest Rectangle in Histogram, Daily Temperatures | Monotonic Stack, bracket/tag matching |
| **Matrix Operations** | ⭐⭐⭐ | Rotate Matrix 90° Anti-Clockwise, Word Search (DFS) | Transpose + reverse, backtracking with visited tracking |

---

# 🧩 Problem 1: Disjoint Set Union (DSU) — Cycle & Redundant Connection

> **Reported In:** ACKO On-Campus Online Assessment (POD.AI / HackerRank).  
> **Problem Statement:** In a network of $N$ microservices labeled $1$ to $N$, you are given edges where each edge is a bidirectional connection between two services. A new connection is added that creates a cycle (redundant connection). Return the edge that can be removed so that the graph becomes a tree. If multiple edges can be removed, return the edge that occurs last in the input.

### Optimal $O(N \cdot \alpha(N))$ Solution in C++ (Using Union-Find by Rank with Path Compression):

```cpp
#include <iostream>
#include <vector>
#include <numeric>

using namespace std;

class DSU {
private:
    vector<int> parent;
    vector<int> rank;

public:
    DSU(int n) {
        parent.resize(n + 1);
        iota(parent.begin(), parent.end(), 0); // parent[i] = i
        rank.assign(n + 1, 0);
    }

    // Path compression heuristic: O(alpha(N)) amortized
    int find(int i) {
        if (parent[i] == i)
            return i;
        return parent[i] = find(parent[i]);
    }

    // Union by rank heuristic
    bool unite(int u, int v) {
        int rootU = find(u);
        int rootV = find(v);
        if (rootU == rootV) {
            return false; // Cycle detected! They already share the same representative
        }
        if (rank[rootU] < rank[rootV]) {
            parent[rootU] = rootV;
        } else if (rank[rootU] > rank[rootV]) {
            parent[rootV] = rootU;
        } else {
            parent[rootV] = rootU;
            rank[rootU]++;
        }
        return true;
    }
};

vector<int> findRedundantConnection(vector<vector<int>>& edges) {
    int n = edges.size();
    DSU dsu(n);

    for (const auto& edge : edges) {
        int u = edge[0];
        int v = edge[1];
        if (!dsu.unite(u, v)) {
            // This edge connects two vertices already in the same component -> REDUNDANT!
            return edge;
        }
    }
    return {};
}

// Dry-run verification
int main() {
    vector<vector<int>> edges = {{1, 2}, {2, 3}, {3, 4}, {1, 4}, {1, 5}};
    vector<int> redundant = findRedundantConnection(edges);
    cout << "Redundant Edge: [" << redundant[0] << ", " << redundant[1] << "]\n"; // Output: [1, 4]
    return 0;
}
```

* **Time Complexity:** $O(N \cdot \alpha(N)) \approx O(N)$ where $\alpha$ is the Inverse Ackermann function ($\le 4$ for all practical universe sizes).
* **Space Complexity:** $O(N)$ for parent and rank arrays.

---

# 🧩 Problem 2: Frog Jump (LeetCode 403 — Hard DP)

> **Reported In:** ACKO SDE Technical Interview & Online Assessment.  
> **Problem Statement:** A frog is crossing a river divided into units. At each unit, there may or may not be a stone. The frog starts at stone 0 and makes a first jump of 1 unit. If the frog's last jump was $k$ units, its next jump must be either $k - 1$, $k$, or $k + 1$ units. Determine if the frog can reach the last stone.

### Optimal $O(N^2)$ Solution in C++ (Hash Map + DP):

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
#include <unordered_set>

using namespace std;

bool canCross(vector<int>& stones) {
    int n = stones.size();
    if (n <= 1) return true;
    // First jump must be exactly 1 unit to stone 1
    if (stones[1] != 1) return false;

    // dp[stone_position] = set of jump sizes that can reach this stone
    unordered_map<int, unordered_set<int>> dp;
    for (int stone : stones) {
        dp[stone] = unordered_set<int>();
    }
    dp[1].insert(1);

    for (int i = 1; i < n; i++) {
        int currentStone = stones[i];
        for (int k : dp[currentStone]) {
            // From currentStone with previous jump k, next jump can be k-1, k, k+1
            for (int step = k - 1; step <= k + 1; step++) {
                if (step > 0) {
                    int nextStone = currentStone + step;
                    if (nextStone == stones.back()) {
                        return true; // Reached destination!
                    }
                    if (dp.find(nextStone) != dp.end()) {
                        dp[nextStone].insert(step);
                    }
                }
            }
        }
    }
    return !dp[stones.back()].empty();
}

int main() {
    vector<int> stones1 = {0, 1, 3, 5, 6, 8, 12, 17};
    cout << "Can cross stones1? " << (canCross(stones1) ? "YES" : "NO") << "\n"; // Output: YES

    vector<int> stones2 = {0, 1, 2, 3, 4, 8, 9, 11};
    cout << "Can cross stones2? " << (canCross(stones2) ? "YES" : "NO") << "\n"; // Output: NO
    return 0;
}
```

* **Time Complexity:** $O(N^2)$ in worst case where each stone has at most $N$ jump variants.
* **Space Complexity:** $O(N^2)$ to store valid jumps per stone.

---

# 🧩 Problem 3: Count Subarrays with Exactly K Distinct Elements

> **Reported In:** ACKO Placement OA (POD.AI).  
> **Trick:** `exact(K) = atMost(K) - atMost(K - 1)`. Sliding window solves `atMost(K)` in clean $O(N)$!

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>

using namespace std;

// Helper: Count subarrays with AT MOST k distinct integers in O(N)
long long atMostKDistinct(const vector<int>& nums, int k) {
    if (k < 0) return 0;
    unordered_map<int, int> freq;
    long long count = 0;
    int left = 0;

    for (int right = 0; right < nums.size(); right++) {
        freq[nums[right]]++;
        
        while (freq.size() > k) {
            freq[nums[left]]--;
            if (freq[nums[left]] == 0) {
                freq.erase(nums[left]);
            }
            left++;
        }
        // All subarrays ending at 'right' with start from 'left' to 'right' have <= k distinct
        count += (right - left + 1);
    }
    return count;
}

int subarraysWithKDistinct(vector<int>& nums, int k) {
    return atMostKDistinct(nums, k) - atMostKDistinct(nums, k - 1);
}

int main() {
    vector<int> nums = {1, 2, 1, 2, 3};
    int k = 2;
    cout << "Subarrays with exactly " << k << " distinct: " 
         << subarraysWithKDistinct(nums, k) << "\n"; // Output: 7
    return 0;
}
```

---

# 🧩 Problem 4: Merge K Sorted Arrays / Streams (Heap Pattern)

> **Reported In:** ACKO SDE Intern Round 1.  
> **DevEx Relevance:** Used in platform log aggregators to merge time-sorted log streams from $K$ microservices into a single unified stream.

```cpp
#include <iostream>
#include <vector>
#include <queue>

using namespace std;

struct Element {
    int val;
    int arrayIndex;
    int elementIndex;

    // Min-heap comparator
    bool operator>(const Element& other) const {
        return val > other.val;
    }
};

vector<int> mergeKSortedArrays(const vector<vector<int>>& arrays) {
    priority_queue<Element, vector<Element>, greater<Element>> minHeap;
    vector<int> result;

    // 1. Push the first element of each non-empty array
    for (int i = 0; i < arrays.size(); i++) {
        if (!arrays[i].empty()) {
            minHeap.push({arrays[i][0], i, 0});
        }
    }

    // 2. Extract min, add to result, and push the next element from the same array
    while (!minHeap.empty()) {
        Element curr = minHeap.top();
        minHeap.pop();
        result.push_back(curr.val);

        int nextIdx = curr.elementIndex + 1;
        if (nextIdx < arrays[curr.arrayIndex].size()) {
            minHeap.push({arrays[curr.arrayIndex][nextIdx], curr.arrayIndex, nextIdx});
        }
    }
    return result;
}

int main() {
    vector<vector<int>> kArrays = {
        {1, 4, 7},
        {2, 5, 8},
        {3, 6, 9, 12}
    };
    vector<int> merged = mergeKSortedArrays(kArrays);
    cout << "Merged stream: ";
    for (int x : merged) cout << x << " ";
    cout << "\n";
    return 0;
}
```

* **Time Complexity:** $O(N \log K)$ where $N$ is total elements and $K$ is number of arrays.
* **Space Complexity:** $O(K)$ for the min-heap.

---

# 🧩 Problem 5: Rotate Matrix 90° Anti-Clockwise In-Place

> **Reported In:** ACKO On-Campus Technical Round 1.  
> **Trick:** 
> * Clockwise 90° = Transpose + Reverse each row.
> * **Anti-Clockwise 90° = Transpose + Reverse each column** (or Reverse each row + Transpose).

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

void rotateAntiClockwise(vector<vector<int>>& matrix) {
    int n = matrix.size();

    // Step 1: Transpose matrix (swap matrix[i][j] with matrix[j][i])
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            swap(matrix[i][j], matrix[j][i]);
        }
    }

    // Step 2: Reverse each column (top element with bottom element)
    for (int j = 0; j < n; j++) {
        int top = 0, bottom = n - 1;
        while (top < bottom) {
            swap(matrix[top][j], matrix[bottom][j]);
            top++;
            bottom--;
        }
    }
}

void printMatrix(const vector<vector<int>>& mat) {
    for (const auto& row : mat) {
        for (int val : row) cout << val << " ";
        cout << "\n";
    }
}

int main() {
    vector<vector<int>> mat = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    cout << "Original Matrix:\n";
    printMatrix(mat);

    rotateAntiClockwise(mat);
    cout << "\nRotated 90 Deg Anti-Clockwise:\n";
    printMatrix(mat);
    /*
       Expected Output:
       3 6 9
       2 5 8
       1 4 7
    */
    return 0;
}
```

---

# 🧩 Problem 6: Stack-Based Syntax & HTML Tag Validator

> **Reported In:** ACKO Round 2 Technical Interview (DevEx / Tooling Track).  
> **Context:** Acko DevEx builds linters that validate configuration and template files.

```cpp
#include <iostream>
#include <string>
#include <stack>

using namespace std;

bool isValidHtmlTags(const string& code) {
    stack<string> tagStack;
    int n = code.length();
    int i = 0;

    while (i < n) {
        if (code[i] == '<') {
            int closeBracket = code.find('>', i);
            if (closeBracket == string::npos) return false; // Malformed unclosed tag

            string tagContent = code.substr(i + 1, closeBracket - i - 1);
            if (tagContent.empty()) return false;

            if (tagContent[0] == '/') {
                // Closing tag: </tag>
                string tagName = tagContent.substr(1);
                if (tagStack.empty() || tagStack.top() != tagName) {
                    return false; // Mismatched or orphan closing tag!
                }
                tagStack.pop();
            } else {
                // Opening tag: <tag> (ignore self-closing tags like <br/>)
                if (tagContent.back() == '/') {
                    // Self-closing, no stack push needed
                } else {
                    tagStack.push(tagContent);
                }
            }
            i = closeBracket + 1;
        } else {
            i++;
        }
    }
    return tagStack.empty();
}

int main() {
    cout << boolalpha;
    cout << isValidHtmlTags("<div><p>Acko Platform</p></div>") << "\n"; // true
    cout << isValidHtmlTags("<div><p>Unclosed Tag</div>") << "\n";       // false
    cout << isValidHtmlTags("<div><img/><span>OK</span></div>") << "\n"; // true
    return 0;
}
```

---

## 🎯 Top 5 Behavioral & Mindset Questions at ACKO

During the final interview round, ACKO evaluators ask behavioral questions specifically tailored to **Platform & DevEx**:

1. **"What is the difference between writing software for end customers vs writing software for other software engineers (DevEx)?"**
   * *Winning Answer:* *"When building for end consumers, the focus is on visual UX, funnels, and conversion. When building for internal engineers (DevEx), the customers are technical experts. If my tool has bad defaults, cryptic error messages, or adds 30 seconds of CI latency, engineers will bypass it or disable it. DevEx requires extreme empathy: fast execution, clear actionable error diagnostics, self-service CLIs, and zero friction."*

2. **"If a service breaks in production at 2:00 AM, what is your first action?"**
   * *Winning Answer:* *"First, stabilize and mitigate impact: roll back the last release or toggle the kill switch/feature flag. Mitigate first, debug second. Once customers are safe, inspect logs and metrics (`strace`, Grafana, Prometheus), find the root cause, write a post-mortem blameless retro, and build an automated CI check so that bug can never reach production again."*

3. **"Why do you want to work on Platform & Infrastructure rather than user-facing product features?"**
   * *Winning Answer:* *"Platform engineering is a force multiplier. If I build a feature on the app, I help one user journey. If I build a faster CI check, a robust deployment pipeline, or a reliable Kubernetes infrastructure, I empower 200+ engineers at ACKO to ship software safely every day. At ACKO, the platform IS the business."*
