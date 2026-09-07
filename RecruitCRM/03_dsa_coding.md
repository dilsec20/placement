# DSA Coding Problems — Recruit CRM Coding Round Prep

> 🎯 **Focus Areas**: HashMap, Stack, Arrays, Strings — Medium difficulty LeetCode problems
> The coding round typically has **2 problems in 60 minutes**. Start with brute-force, then optimize.

---

## 📋 Must-Solve Problem Checklist

### 🔴 Priority 1: HashMap Problems (Most Frequently Asked!)

| # | Problem | LeetCode | Difficulty | Pattern |
| :---: | :--- | :---: | :---: | :--- |
| 1 | Two Sum | [#1](https://leetcode.com/problems/two-sum/) | Easy | HashMap Lookup |
| 2 | Group Anagrams | [#49](https://leetcode.com/problems/group-anagrams/) | Medium | HashMap Grouping |
| 3 | Subarray Sum Equals K | [#560](https://leetcode.com/problems/subarray-sum-equals-k/) | Medium | Prefix Sum + HashMap |
| 4 | Top K Frequent Elements | [#347](https://leetcode.com/problems/top-k-frequent-elements/) | Medium | HashMap + Sorting/Heap |
| 5 | Contains Duplicate II | [#219](https://leetcode.com/problems/contains-duplicate-ii/) | Easy | HashMap Window |
| 6 | Longest Substring Without Repeating Characters | [#3](https://leetcode.com/problems/longest-substring-without-repeating-characters/) | Medium | HashMap + Sliding Window |
| 7 | Valid Anagram | [#242](https://leetcode.com/problems/valid-anagram/) | Easy | HashMap Frequency |
| 8 | First Unique Character | [#387](https://leetcode.com/problems/first-unique-character-in-a-string/) | Easy | HashMap Frequency |

### 🔴 Priority 2: Stack Problems (Commonly Asked!)

| # | Problem | LeetCode | Difficulty | Pattern |
| :---: | :--- | :---: | :---: | :--- |
| 9 | Valid Parentheses | [#20](https://leetcode.com/problems/valid-parentheses/) | Easy | Stack Matching |
| 10 | Next Greater Element I | [#496](https://leetcode.com/problems/next-greater-element-i/) | Easy | Monotonic Stack |
| 11 | Min Stack | [#155](https://leetcode.com/problems/min-stack/) | Medium | Stack Design |
| 12 | Daily Temperatures | [#739](https://leetcode.com/problems/daily-temperatures/) | Medium | Monotonic Stack |
| 13 | Minimum Remove to Make Valid Parentheses | [#1249](https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/) | Medium | Stack + String |
| 14 | Evaluate Reverse Polish Notation | [#150](https://leetcode.com/problems/evaluate-reverse-polish-notation/) | Medium | Stack Evaluation |

### 🟡 Priority 3: Array / String Problems

| # | Problem | LeetCode | Difficulty | Pattern |
| :---: | :--- | :---: | :---: | :--- |
| 15 | Reverse a String | [#344](https://leetcode.com/problems/reverse-string/) | Easy | Two Pointers |
| 16 | Second Largest in Array | — | Easy | Single Pass |
| 17 | Move Zeroes | [#283](https://leetcode.com/problems/move-zeroes/) | Easy | Two Pointers |
| 18 | Sort Colors | [#75](https://leetcode.com/problems/sort-colors/) | Medium | Dutch National Flag |
| 19 | Merge Intervals | [#56](https://leetcode.com/problems/merge-intervals/) | Medium | Sorting + Greedy |
| 20 | Product of Array Except Self | [#238](https://leetcode.com/problems/product-of-array-except-self/) | Medium | Prefix/Suffix |

### 🟡 Priority 4: Linked List Basics

| # | Problem | LeetCode | Difficulty | Pattern |
| :---: | :--- | :---: | :---: | :--- |
| 21 | Reverse Linked List | [#206](https://leetcode.com/problems/reverse-linked-list/) | Easy | Iterative/Recursive |
| 22 | Detect Cycle in Linked List | [#141](https://leetcode.com/problems/linked-list-cycle/) | Easy | Floyd's Tortoise & Hare |
| 23 | Merge Two Sorted Lists | [#21](https://leetcode.com/problems/merge-two-sorted-lists/) | Easy | Two Pointers |

---

## 🔑 Detailed Solutions — Top Problems

---

### Problem 1: Two Sum (THE most important HashMap problem)

**Problem:** Given an array and target, return indices of two numbers that add up to target.

```java
// ❌ Brute Force — O(n²)
public int[] twoSum(int[] nums, int target) {
    for (int i = 0; i < nums.length; i++) {
        for (int j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] == target) return new int[]{i, j};
        }
    }
    return new int[]{};
}

// ✅ Optimized — O(n) using HashMap
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();  // value → index
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[]{map.get(complement), i};
        }
        map.put(nums[i], i);
    }
    return new int[]{};
}
```

**Approach:** For each element, check if `target - element` already exists in the map.
**Time:** O(n) | **Space:** O(n)

---

### Problem 2: Group Anagrams

**Problem:** Group strings that are anagrams of each other.

```java
public List<List<String>> groupAnagrams(String[] strs) {
    Map<String, List<String>> map = new HashMap<>();
    
    for (String s : strs) {
        char[] chars = s.toCharArray();
        Arrays.sort(chars);
        String key = new String(chars);  // Sorted string as key
        
        map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
    }
    
    return new ArrayList<>(map.values());
}
```

**Key Insight:** Anagrams, when sorted, produce the same string. Use sorted string as HashMap key.
**Time:** O(n · k·log(k)) where k = max string length | **Space:** O(n·k)

---

### Problem 3: Subarray Sum Equals K

**Problem:** Find total number of continuous subarrays whose sum equals K.

```java
public int subarraySum(int[] nums, int k) {
    Map<Integer, Integer> prefixSumCount = new HashMap<>();
    prefixSumCount.put(0, 1);  // Base case: empty subarray
    
    int sum = 0, count = 0;
    
    for (int num : nums) {
        sum += num;
        // If (sum - k) exists in map, we found subarrays ending here
        if (prefixSumCount.containsKey(sum - k)) {
            count += prefixSumCount.get(sum - k);
        }
        prefixSumCount.put(sum, prefixSumCount.getOrDefault(sum, 0) + 1);
    }
    
    return count;
}
```

**Key Insight:** If `prefixSum[j] - prefixSum[i] = k`, then subarray `[i+1, j]` has sum k.
**Time:** O(n) | **Space:** O(n)

---

### Problem 4: Top K Frequent Elements

**Problem:** Given an array, return the k most frequent elements.

```java
public int[] topKFrequent(int[] nums, int k) {
    // Step 1: Count frequencies
    Map<Integer, Integer> freqMap = new HashMap<>();
    for (int n : nums) {
        freqMap.put(n, freqMap.getOrDefault(n, 0) + 1);
    }
    
    // Step 2: Min-heap of size k (by frequency)
    PriorityQueue<Integer> heap = new PriorityQueue<>(
        (a, b) -> freqMap.get(a) - freqMap.get(b)
    );
    
    for (int key : freqMap.keySet()) {
        heap.add(key);
        if (heap.size() > k) heap.poll();
    }
    
    // Step 3: Extract elements
    int[] result = new int[k];
    for (int i = 0; i < k; i++) result[i] = heap.poll();
    return result;
}
```

**Time:** O(n·log(k)) | **Space:** O(n)

---

### Problem 5: Longest Substring Without Repeating Characters

**Problem:** Find length of longest substring without repeating characters.

```java
public int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> lastIndex = new HashMap<>();
    int maxLen = 0, left = 0;
    
    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        if (lastIndex.containsKey(c) && lastIndex.get(c) >= left) {
            left = lastIndex.get(c) + 1;  // Move window past the duplicate
        }
        lastIndex.put(c, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}
```

**Pattern:** Sliding Window + HashMap
**Time:** O(n) | **Space:** O(min(n, 26))

---

### Problem 6: Valid Parentheses

**Problem:** Check if string has valid matching brackets.

```java
public boolean isValid(String s) {
    Stack<Character> stack = new Stack<>();
    Map<Character, Character> map = Map.of(')', '(', '}', '{', ']', '[');
    
    for (char c : s.toCharArray()) {
        if (map.containsValue(c)) {
            stack.push(c);  // Opening bracket
        } else if (map.containsKey(c)) {
            if (stack.isEmpty() || stack.pop() != map.get(c)) {
                return false;
            }
        }
    }
    
    return stack.isEmpty();
}
```

**Time:** O(n) | **Space:** O(n)

---

### Problem 7: Next Greater Element I

**Problem:** Find next greater element for each element in nums1 from nums2.

```java
public int[] nextGreaterElement(int[] nums1, int[] nums2) {
    Map<Integer, Integer> nextGreater = new HashMap<>();
    Stack<Integer> stack = new Stack<>();
    
    // Process nums2 from right to left
    for (int i = nums2.length - 1; i >= 0; i--) {
        while (!stack.isEmpty() && stack.peek() <= nums2[i]) {
            stack.pop();
        }
        nextGreater.put(nums2[i], stack.isEmpty() ? -1 : stack.peek());
        stack.push(nums2[i]);
    }
    
    // Map results for nums1
    int[] result = new int[nums1.length];
    for (int i = 0; i < nums1.length; i++) {
        result[i] = nextGreater.get(nums1[i]);
    }
    return result;
}
```

**Pattern:** Monotonic Stack (decreasing)
**Time:** O(n + m) | **Space:** O(n)

---

### Problem 8: Daily Temperatures

**Problem:** For each day, find how many days until a warmer temperature.

```java
public int[] dailyTemperatures(int[] temperatures) {
    int n = temperatures.length;
    int[] result = new int[n];
    Stack<Integer> stack = new Stack<>();  // Stores indices
    
    for (int i = 0; i < n; i++) {
        while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
            int prevIndex = stack.pop();
            result[prevIndex] = i - prevIndex;
        }
        stack.push(i);
    }
    
    return result;
}
```

**Pattern:** Monotonic Stack (decreasing, stores indices)
**Time:** O(n) | **Space:** O(n)

---

### Problem 9: Min Stack

**Problem:** Design a stack that supports push, pop, top, and getMin in O(1).

```java
class MinStack {
    Stack<int[]> stack;  // Each entry: [value, currentMin]
    
    public MinStack() {
        stack = new Stack<>();
    }
    
    public void push(int val) {
        int min = stack.isEmpty() ? val : Math.min(val, stack.peek()[1]);
        stack.push(new int[]{val, min});
    }
    
    public void pop() {
        stack.pop();
    }
    
    public int top() {
        return stack.peek()[0];
    }
    
    public int getMin() {
        return stack.peek()[1];
    }
}
```

**Key Insight:** Store the current minimum alongside each value.
**All operations:** O(1)

---

### Problem 10: Reverse Linked List

**Problem:** Reverse a singly linked list.

```java
// Iterative — O(n) time, O(1) space
public ListNode reverseList(ListNode head) {
    ListNode prev = null, curr = head;
    
    while (curr != null) {
        ListNode next = curr.next;  // Save next
        curr.next = prev;           // Reverse pointer
        prev = curr;                // Move prev forward
        curr = next;                // Move curr forward
    }
    
    return prev;  // New head
}

// Recursive — O(n) time, O(n) space (call stack)
public ListNode reverseList(ListNode head) {
    if (head == null || head.next == null) return head;
    
    ListNode newHead = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    
    return newHead;
}
```

---

### Problem 11: Second Largest Element in Array (Common Interview Code)

```java
public int secondLargest(int[] arr) {
    int first = Integer.MIN_VALUE, second = Integer.MIN_VALUE;
    
    for (int num : arr) {
        if (num > first) {
            second = first;
            first = num;
        } else if (num > second && num != first) {
            second = num;
        }
    }
    
    return second;  // Integer.MIN_VALUE if doesn't exist
}
```

**Time:** O(n) — Single pass | **Space:** O(1)

---

### Problem 12: Product of Array Except Self

**Problem:** Return array where result[i] = product of all elements except nums[i]. No division!

```java
public int[] productExceptSelf(int[] nums) {
    int n = nums.length;
    int[] result = new int[n];
    
    // Left pass: result[i] = product of all elements to the LEFT of i
    result[0] = 1;
    for (int i = 1; i < n; i++) {
        result[i] = result[i - 1] * nums[i - 1];
    }
    
    // Right pass: multiply by product of all elements to the RIGHT of i
    int rightProduct = 1;
    for (int i = n - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= nums[i];
    }
    
    return result;
}
```

**Time:** O(n) | **Space:** O(1) (excluding output array)

---

### Problem 13: Merge Intervals

```java
public int[][] merge(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
    List<int[]> merged = new ArrayList<>();
    
    for (int[] interval : intervals) {
        if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < interval[0]) {
            merged.add(interval);  // No overlap
        } else {
            merged.get(merged.size() - 1)[1] = 
                Math.max(merged.get(merged.size() - 1)[1], interval[1]);  // Merge
        }
    }
    
    return merged.toArray(new int[merged.size()][]);
}
```

**Time:** O(n·log(n)) | **Space:** O(n)

---

## 🧠 Pattern Recognition Cheat Sheet

| Pattern | When to Use | Key Data Structure |
| :--- | :--- | :--- |
| **HashMap Lookup** | Need O(1) existence/count check | HashMap |
| **Prefix Sum + HashMap** | Subarray sum problems | HashMap + running sum |
| **Sliding Window** | Contiguous subarray/substring optimization | HashMap/Set + two pointers |
| **Monotonic Stack** | Next greater/smaller element | Stack (decreasing/increasing) |
| **Two Pointers** | Sorted array, reverse, partition | Two indices |
| **Frequency Count** | Anagrams, top-K, duplicates | HashMap/int[26] |
| **Sort + Greedy** | Intervals, scheduling | Arrays.sort() |

---

## ⚡ Quick Java Syntax Reference (for coding rounds)

```java
// HashMap
Map<String, Integer> map = new HashMap<>();
map.put("key", 1);
map.getOrDefault("key", 0);
map.containsKey("key");
map.keySet();  map.values();  map.entrySet();

// Stack
Stack<Integer> stack = new Stack<>();
stack.push(1);  stack.pop();  stack.peek();  stack.isEmpty();

// Queue
Queue<Integer> queue = new LinkedList<>();
queue.offer(1);  queue.poll();  queue.peek();

// PriorityQueue (Min-Heap by default)
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());

// Sorting
Arrays.sort(arr);
Arrays.sort(arr, (a, b) -> a[0] - b[0]);  // Custom comparator
list.sort(Comparator.comparingInt(a -> a[0]));

// String ↔ char[]
char[] chars = str.toCharArray();
String s = new String(chars);
String s = String.valueOf(chars);

// StringBuilder
StringBuilder sb = new StringBuilder();
sb.append("text");  sb.reverse();  sb.toString();

// List ↔ Array
List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3));
int[] arr = list.stream().mapToInt(Integer::intValue).toArray();

// Stream operations
list.stream().filter(x -> x > 5).map(x -> x * 2).collect(Collectors.toList());
```
