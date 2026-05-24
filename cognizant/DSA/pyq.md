# 📊 DSA — Previous Year Questions (PYQs) | Cognizant GenC Cluster 1

> **Focus:** Searching & Sorting Algorithms + Arrays | Asked in Coding Round + Technical Interview

---

## 📑 Table of Contents

1. [Searching Algorithm PYQs](#1-searching-algorithm-pyqs)
2. [Sorting Algorithm PYQs](#2-sorting-algorithm-pyqs)
3. [Array-Based DSA PYQs](#3-array-based-dsa-pyqs)
4. [String-Based DSA PYQs](#4-string-based-dsa-pyqs)
5. [Conceptual / Interview PYQs](#5-conceptual--interview-pyqs)
6. [Complexity Analysis](#6-complexity-analysis)

---

## 1. Searching Algorithm PYQs

### PYQ 1: Linear Search

```java
public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}

// Time: O(n) | Space: O(1)
// Input: [5, 3, 8, 1, 9], target=8 → Output: 2
```

---

### PYQ 2: Binary Search (Iterative) ⭐⭐

```java
public static int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;  // Avoids overflow
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

// Time: O(log n) | Space: O(1)
// Input: [1, 3, 5, 7, 9, 11], target=7 → Output: 3
// IMPORTANT: Array MUST be sorted!
```

---

### PYQ 3: Binary Search (Recursive)

```java
public static int binarySearchRecursive(int[] arr, int target, int left, int right) {
    if (left > right) return -1;
    int mid = left + (right - left) / 2;
    if (arr[mid] == target) return mid;
    else if (arr[mid] < target) 
        return binarySearchRecursive(arr, target, mid + 1, right);
    else 
        return binarySearchRecursive(arr, target, left, mid - 1);
}

// Usage: binarySearchRecursive(arr, target, 0, arr.length - 1)
// Time: O(log n) | Space: O(log n) — recursion stack
```

---

### PYQ 4: First & Last Occurrence in Sorted Array ⭐

```java
public static int firstOccurrence(int[] arr, int target) {
    int left = 0, right = arr.length - 1, result = -1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            result = mid;
            right = mid - 1;    // Keep searching LEFT
        } else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return result;
}

public static int lastOccurrence(int[] arr, int target) {
    int left = 0, right = arr.length - 1, result = -1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            result = mid;
            left = mid + 1;     // Keep searching RIGHT
        } else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return result;
}

// Count occurrences = lastOccurrence - firstOccurrence + 1
// Input: [1,2,2,2,3,4], target=2 → first=1, last=3, count=3
```

---

### PYQ 5: Search in Rotated Sorted Array ⭐⭐

```java
public static int searchRotated(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        
        // Left half is sorted
        if (arr[left] <= arr[mid]) {
            if (target >= arr[left] && target < arr[mid])
                right = mid - 1;
            else
                left = mid + 1;
        }
        // Right half is sorted
        else {
            if (target > arr[mid] && target <= arr[right])
                left = mid + 1;
            else
                right = mid - 1;
        }
    }
    return -1;
}

// Input: [4,5,6,7,0,1,2], target=0 → Output: 4
```

---

### PYQ 6: Find Peak Element

```java
public static int findPeak(int[] arr) {
    int left = 0, right = arr.length - 1;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] < arr[mid + 1])
            left = mid + 1;     // Peak is on the right
        else
            right = mid;        // Peak is on the left (or mid itself)
    }
    return left;  // Index of peak
}

// Input: [1,3,5,7,6,4,2] → Peak=7, index=3
```

---

### PYQ 7: Floor and Ceil of a Number

```java
// Floor: largest element ≤ target
public static int floor(int[] arr, int target) {
    int left = 0, right = arr.length - 1, result = -1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] <= target) {
            result = arr[mid];
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return result;
}

// Ceil: smallest element ≥ target
public static int ceil(int[] arr, int target) {
    int left = 0, right = arr.length - 1, result = -1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] >= target) {
            result = arr[mid];
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return result;
}

// Input: [1,3,5,7,9], target=6 → floor=5, ceil=7
```

---

## 2. Sorting Algorithm PYQs

### PYQ 8: Bubble Sort

```java
public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        boolean swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;  // Already sorted
    }
}
// Best: O(n) | Avg/Worst: O(n²) | Space: O(1) | Stable: ✅
```

**Q: How many swaps to sort [5, 3, 4, 1, 2] using Bubble Sort?**
```
Pass 1: [3,4,1,2,5] → 4 swaps
Pass 2: [3,1,2,4,5] → 2 swaps
Pass 3: [1,2,3,4,5] → 2 swaps
Pass 4: [1,2,3,4,5] → 0 swaps (break)
Total: 8 swaps
```

---

### PYQ 9: Selection Sort

```java
public static void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        int temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
    }
}
// Best/Avg/Worst: O(n²) | Space: O(1) | Stable: ❌
// Always does n-1 swaps (minimum swaps of any comparison sort)
```

---

### PYQ 10: Insertion Sort

```java
public static void insertionSort(int[] arr) {
    int n = arr.length;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}
// Best: O(n) when nearly sorted | Avg/Worst: O(n²) | Space: O(1) | Stable: ✅
```

---

### PYQ 11: Merge Sort ⭐⭐⭐ (Most Asked!)

```java
public static void mergeSort(int[] arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);         // Sort left half
        mergeSort(arr, mid + 1, right);    // Sort right half
        merge(arr, left, mid, right);       // Merge both halves
    }
}

public static void merge(int[] arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    int[] L = new int[n1];
    int[] R = new int[n2];
    
    for (int i = 0; i < n1; i++) L[i] = arr[left + i];
    for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];
    
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

// Usage: mergeSort(arr, 0, arr.length - 1);
// Time: O(n log n) always | Space: O(n) | Stable: ✅
// Divide and Conquer approach
```

**Dry Run: mergeSort([38, 27, 43, 3, 9, 82, 10])**
```
[38, 27, 43, 3, 9, 82, 10]
Split: [38, 27, 43] and [3, 9, 82, 10]
Split: [38] [27, 43]   and   [3, 9] [82, 10]
Split: [27] [43]       and   [3] [9] [82] [10]
Merge: [27, 43]        and   [3, 9] [10, 82]
Merge: [27, 38, 43]    and   [3, 9, 10, 82]
Merge: [3, 9, 10, 27, 38, 43, 82]  ✅
```

---

### PYQ 12: Quick Sort ⭐⭐

```java
public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

public static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];  // Last element as pivot
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
        }
    }
    int temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;
    return i + 1;
}

// Usage: quickSort(arr, 0, arr.length - 1);
// Best/Avg: O(n log n) | Worst: O(n²) when already sorted | Space: O(log n) | Stable: ❌
```

---

### PYQ 13: Sort 0s, 1s, and 2s (Dutch National Flag) ⭐

```java
public static void sortColors(int[] arr) {
    int low = 0, mid = 0, high = arr.length - 1;
    
    while (mid <= high) {
        if (arr[mid] == 0) {
            int temp = arr[low]; arr[low] = arr[mid]; arr[mid] = temp;
            low++; mid++;
        } else if (arr[mid] == 1) {
            mid++;
        } else {
            int temp = arr[mid]; arr[mid] = arr[high]; arr[high] = temp;
            high--;
        }
    }
}

// Input: [2,0,1,2,1,0] → Output: [0,0,1,1,2,2]
// Time: O(n) single pass | Space: O(1)
```

---

### PYQ 14: Using Arrays.sort() with Comparator

```java
import java.util.*;

// Sort integers descending
Integer[] arr = {5, 2, 8, 1, 9};
Arrays.sort(arr, Collections.reverseOrder());
// [9, 8, 5, 2, 1]

// Sort strings by length
String[] words = {"banana", "apple", "kiwi", "cherry"};
Arrays.sort(words, (a, b) -> a.length() - b.length());
// ["kiwi", "apple", "banana", "cherry"]

// Sort 2D array by second column
int[][] intervals = {{3,5}, {1,3}, {2,6}};
Arrays.sort(intervals, (a, b) -> a[1] - b[1]);
// [[1,3], [3,5], [2,6]]
```

---

### PYQ 15: Count Number of Inversions (Merge Sort Application) ⭐

```java
// Inversion: arr[i] > arr[j] where i < j
public static int countInversions(int[] arr, int left, int right) {
    int count = 0;
    if (left < right) {
        int mid = left + (right - left) / 2;
        count += countInversions(arr, left, mid);
        count += countInversions(arr, mid + 1, right);
        count += mergeAndCount(arr, left, mid, right);
    }
    return count;
}

public static int mergeAndCount(int[] arr, int left, int mid, int right) {
    int[] L = Arrays.copyOfRange(arr, left, mid + 1);
    int[] R = Arrays.copyOfRange(arr, mid + 1, right + 1);
    int i = 0, j = 0, k = left, count = 0;
    
    while (i < L.length && j < R.length) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else {
            arr[k++] = R[j++];
            count += (L.length - i);  // All remaining in L are inversions
        }
    }
    while (i < L.length) arr[k++] = L[i++];
    while (j < R.length) arr[k++] = R[j++];
    return count;
}

// Input: [2,4,1,3,5] → Inversions: (2,1), (4,1), (4,3) → Output: 3
```

---

## 3. Array-Based DSA PYQs

### PYQ 16: Kadane's Algorithm (Maximum Subarray Sum) ⭐

```java
public static int maxSubarraySum(int[] arr) {
    int maxSum = arr[0], currSum = arr[0];
    for (int i = 1; i < arr.length; i++) {
        currSum = Math.max(arr[i], currSum + arr[i]);
        maxSum = Math.max(maxSum, currSum);
    }
    return maxSum;
}
// Input: [-2,1,-3,4,-1,2,1,-5,4] → Output: 6 (subarray [4,-1,2,1])
```

---

### PYQ 17: Two Pointer — Pair with Given Sum in Sorted Array

```java
public static int[] twoSum(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) return new int[]{left, right};
        else if (sum < target) left++;
        else right--;
    }
    return new int[]{-1, -1};
}
// Input: [1,3,5,7,9], target=12 → Output: [1,4] (3+9=12)
```

---

### PYQ 18: Move All Zeros to End

```java
public static void moveZeros(int[] arr) {
    int j = 0;
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] != 0) {
            int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
            j++;
        }
    }
}
// Input: [0,1,0,3,12] → Output: [1,3,12,0,0]
```

---

### PYQ 19: Find Kth Smallest/Largest Element

```java
// Method 1: Sort and pick (O(n log n))
public static int kthSmallest(int[] arr, int k) {
    Arrays.sort(arr);
    return arr[k - 1];
}

// Method 2: Using PriorityQueue (O(n log k))
public static int kthLargest(int[] arr, int k) {
    PriorityQueue<Integer> pq = new PriorityQueue<>();  // Min-heap
    for (int num : arr) {
        pq.add(num);
        if (pq.size() > k) pq.poll();
    }
    return pq.peek();
}
```

---

### PYQ 20: Leaders in an Array

```java
// Element is a leader if it is greater than all elements to its right
public static List<Integer> findLeaders(int[] arr) {
    List<Integer> leaders = new ArrayList<>();
    int maxRight = arr[arr.length - 1];
    leaders.add(maxRight);
    
    for (int i = arr.length - 2; i >= 0; i--) {
        if (arr[i] > maxRight) {
            leaders.add(arr[i]);
            maxRight = arr[i];
        }
    }
    Collections.reverse(leaders);
    return leaders;
}
// Input: [16,17,4,3,5,2] → Output: [17,5,2]
```

---

## 4. String-Based DSA PYQs

### PYQ 21: Check if Two Strings are Anagrams

```java
public static boolean isAnagram(String s1, String s2) {
    if (s1.length() != s2.length()) return false;
    int[] freq = new int[26];
    for (char c : s1.toCharArray()) freq[c - 'a']++;
    for (char c : s2.toCharArray()) freq[c - 'a']--;
    for (int f : freq) if (f != 0) return false;
    return true;
}
// "listen", "silent" → true
```

---

### PYQ 22: First Non-Repeating Character

```java
public static char firstNonRepeating(String s) {
    int[] freq = new int[256];
    for (char c : s.toCharArray()) freq[c]++;
    for (char c : s.toCharArray()) {
        if (freq[c] == 1) return c;
    }
    return '\0';
}
// "aabcbd" → 'c'
```

---

### PYQ 23: Longest Substring Without Repeating Characters ⭐

```java
public static int longestUnique(String s) {
    HashSet<Character> set = new HashSet<>();
    int maxLen = 0, left = 0;
    
    for (int right = 0; right < s.length(); right++) {
        while (set.contains(s.charAt(right))) {
            set.remove(s.charAt(left));
            left++;
        }
        set.add(s.charAt(right));
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}
// "abcabcbb" → 3 ("abc")
// Sliding Window technique
```

---

### PYQ 24: Check if String is a Rotation of Another

```java
public static boolean isRotation(String s1, String s2) {
    if (s1.length() != s2.length()) return false;
    return (s1 + s1).contains(s2);
}
// "abcde", "cdeab" → true (found in "abcdeabcde")
```

---

## 5. Conceptual / Interview PYQs

### PYQ 25: When to Use Which Sort?

| Scenario | Best Algorithm | Why |
|----------|---------------|-----|
| Small array (n < 50) | Insertion Sort | Low overhead, adaptive |
| Nearly sorted data | Insertion Sort | O(n) best case |
| Need guaranteed O(n log n) | Merge Sort | Always O(n log n) |
| In-place needed | Quick Sort | O(log n) space |
| Stability required | Merge Sort | Preserves equal-element order |
| Linked list | Merge Sort | No random access needed |
| External sorting (huge data) | Merge Sort | Sequential access pattern |
| Integers in known range | Counting Sort | O(n + k) |

---

### PYQ 26: Stability in Sorting

**Q: What does "stable" mean in sorting?**  
> A stable sort preserves the relative order of elements with equal keys.

```
Input:  [(A,3), (B,1), (C,3), (D,2)]
Sort by number:

Stable:   [(B,1), (D,2), (A,3), (C,3)]  ← A before C preserved
Unstable: [(B,1), (D,2), (C,3), (A,3)]  ← Order may change

Stable: Bubble, Insertion, Merge, TimSort
Unstable: Selection, Quick, Heap
```

---

### PYQ 27: Explain Divide and Conquer

```
Pattern:
1. DIVIDE the problem into smaller subproblems
2. CONQUER each subproblem recursively
3. COMBINE the results

Examples:
- Merge Sort: divide array → sort halves → merge
- Quick Sort: partition around pivot → sort halves
- Binary Search: divide search space in half

Recurrence:     T(n) = 2T(n/2) + O(n)  → O(n log n)  [Merge Sort]
                T(n) = T(n/2) + O(1)   → O(log n)    [Binary Search]
```

---

### PYQ 28: Dry Run — Trace the Sort

**Q: Show each step of Selection Sort on [64, 25, 12, 22, 11]**

```
Step 1: Find min(64,25,12,22,11)=11, swap with 64 → [11, 25, 12, 22, 64]
Step 2: Find min(25,12,22,64)=12, swap with 25    → [11, 12, 25, 22, 64]
Step 3: Find min(25,22,64)=22, swap with 25        → [11, 12, 22, 25, 64]
Step 4: Find min(25,64)=25, no swap                → [11, 12, 22, 25, 64] ✅
```

---

## 6. Complexity Analysis

### Sorting Algorithms Comparison

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | ✅ |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | ❌ |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | ✅ |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | ✅ |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | ❌ |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | ❌ |
| Counting Sort | O(n+k) | O(n+k) | O(n+k) | O(k) | ✅ |
| Arrays.sort() (Java) | O(n log n) | O(n log n) | O(n log n) | O(n) | ✅ |

### Searching Algorithms

| Algorithm | Best | Average | Worst | Prerequisite |
|-----------|------|---------|-------|-------------|
| Linear Search | O(1) | O(n) | O(n) | None |
| Binary Search | O(1) | O(log n) | O(log n) | Sorted array |

### Master Theorem Quick Reference

```
T(n) = aT(n/b) + O(n^c)

If c < log_b(a): T(n) = O(n^(log_b(a)))
If c = log_b(a): T(n) = O(n^c × log n)
If c > log_b(a): T(n) = O(n^c)

Examples:
T(n) = 2T(n/2) + O(n)   → a=2, b=2, c=1 → log₂2=1=c → O(n log n) [Merge Sort]
T(n) = T(n/2) + O(1)    → a=1, b=2, c=0 → log₂1=0=c → O(log n)   [Binary Search]
T(n) = 2T(n/2) + O(1)   → a=2, b=2, c=0 → log₂2=1>c → O(n)       [Tree traversal]
```

---

> **← Back to** [Cognizant Main](../README.md) | [DSA Concepts](./README.md)
