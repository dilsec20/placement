# 📊 DSA - Searching & Sorting Algorithms - Cognizant Assessment Preparation

## 📋 Topics Covered
1. [Searching Algorithms](#1-searching-algorithms)
2. [Sorting Algorithms](#2-sorting-algorithms)
3. [Time & Space Complexity](#3-time--space-complexity)
4. [Practice Problems](#4-practice-problems)

---

## 1. Searching Algorithms

### 1.1 Linear Search

> **Definition**: Checks every element one by one from the start until the target element is found or the array ends. Works on both **sorted and unsorted** arrays.

**Time Complexity**: O(n) | **Space Complexity**: O(1)

```java
public class LinearSearch {

    // Basic Linear Search
    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i; // Return index if found
            }
        }
        return -1; // Not found
    }

    // Linear Search - Find all occurrences
    public static List<Integer> linearSearchAll(int[] arr, int target) {
        List<Integer> indices = new ArrayList<>();
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                indices.add(i);
            }
        }
        return indices;
    }

    // Linear Search in String array
    public static int linearSearch(String[] arr, String target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i].equals(target)) {
                return i;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] arr = {10, 25, 30, 15, 40, 25, 50};

        // Search for 30
        int index = linearSearch(arr, 30);
        System.out.println("Element 30 found at index: " + index);  // 2

        // Search for 100 (not present)
        int index2 = linearSearch(arr, 100);
        System.out.println("Element 100 found at index: " + index2); // -1

        // Find all occurrences of 25
        List<Integer> all = linearSearchAll(arr, 25);
        System.out.println("Element 25 found at indices: " + all);   // [1, 5]
    }
}
```

**When to Use Linear Search:**
- Unsorted arrays
- Small arrays (< 100 elements)
- Single search operation
- Linked Lists (no random access)

---

### 1.2 Binary Search

> **Definition**: Divides the search interval in half repeatedly. Compares the target with the middle element. Works ONLY on **sorted arrays**.

**Time Complexity**: O(log n) | **Space Complexity**: O(1) iterative, O(log n) recursive

```java
public class BinarySearch {

    // ===== ITERATIVE Binary Search =====
    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2; // Prevents integer overflow

            if (arr[mid] == target) {
                return mid;           // Found at mid
            } else if (arr[mid] < target) {
                left = mid + 1;       // Search right half
            } else {
                right = mid - 1;      // Search left half
            }
        }
        return -1; // Not found
    }

    // ===== RECURSIVE Binary Search =====
    public static int binarySearchRecursive(int[] arr, int target, int left, int right) {
        if (left > right) {
            return -1; // Base case: not found
        }

        int mid = left + (right - left) / 2;

        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            return binarySearchRecursive(arr, target, mid + 1, right);
        } else {
            return binarySearchRecursive(arr, target, left, mid - 1);
        }
    }

    // ===== Find First Occurrence =====
    public static int findFirst(int[] arr, int target) {
        int left = 0, right = arr.length - 1, result = -1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) {
                result = mid;
                right = mid - 1; // Continue searching left
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return result;
    }

    // ===== Find Last Occurrence =====
    public static int findLast(int[] arr, int target) {
        int left = 0, right = arr.length - 1, result = -1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) {
                result = mid;
                left = mid + 1; // Continue searching right
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return result;
    }

    // ===== Count Occurrences of an element =====
    public static int countOccurrences(int[] arr, int target) {
        int first = findFirst(arr, target);
        if (first == -1) return 0;
        int last = findLast(arr, target);
        return last - first + 1;
    }

    public static void main(String[] args) {
        int[] arr = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};

        // Iterative
        System.out.println("Index of 23: " + binarySearch(arr, 23));  // 5

        // Recursive
        System.out.println("Index of 56: " +
            binarySearchRecursive(arr, 56, 0, arr.length - 1));       // 7

        // Not found
        System.out.println("Index of 100: " + binarySearch(arr, 100)); // -1

        // Count occurrences
        int[] arr2 = {1, 2, 2, 2, 3, 4, 5};
        System.out.println("Count of 2: " + countOccurrences(arr2, 2)); // 3
    }
}
```

**How Binary Search Works (Visual):**

```
Array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
Target: 23

Step 1: left=0, right=9, mid=4 → arr[4]=16 < 23 → search right
Step 2: left=5, right=9, mid=7 → arr[7]=56 > 23 → search left
Step 3: left=5, right=6, mid=5 → arr[5]=23 == 23 → Found at index 5!
```

### Linear vs Binary Search

| Feature | Linear Search | Binary Search |
|---------|--------------|---------------|
| Array requirement | Any (sorted/unsorted) | Must be sorted |
| Time Complexity | O(n) | O(log n) |
| Space Complexity | O(1) | O(1) iterative / O(log n) recursive |
| Best for | Small or unsorted arrays | Large sorted arrays |
| Approach | Sequential | Divide and conquer |

---

## 2. Sorting Algorithms

### 2.1 Bubble Sort

> **Definition**: Repeatedly swaps adjacent elements if they are in the wrong order. The largest element "bubbles up" to the end in each pass.

**Time**: O(n²) worst/average, O(n) best (already sorted) | **Space**: O(1) | **Stable**: Yes

```java
public class BubbleSort {

    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        boolean swapped;

        for (int i = 0; i < n - 1; i++) {
            swapped = false;

            for (int j = 0; j < n - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap adjacent elements
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }

            // Optimization: if no swaps occurred, array is sorted
            if (!swapped) break;
        }
    }

    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Before: " + Arrays.toString(arr));
        bubbleSort(arr);
        System.out.println("After:  " + Arrays.toString(arr));
        // Before: [64, 34, 25, 12, 22, 11, 90]
        // After:  [11, 12, 22, 25, 34, 64, 90]
    }
}
```

**How Bubble Sort Works:**
```
Array: [64, 34, 25, 12, 22]

Pass 1: [34, 25, 12, 22, 64]  → 64 bubbles to end
Pass 2: [25, 12, 22, 34, 64]  → 34 bubbles to position
Pass 3: [12, 22, 25, 34, 64]  → 25 bubbles to position
Pass 4: [12, 22, 25, 34, 64]  → Already sorted, no swaps → STOP
```

---

### 2.2 Selection Sort

> **Definition**: Finds the minimum element from the unsorted portion and places it at the beginning. Divides array into sorted (left) and unsorted (right) parts.

**Time**: O(n²) all cases | **Space**: O(1) | **Stable**: No

```java
public class SelectionSort {

    public static void selectionSort(int[] arr) {
        int n = arr.length;

        for (int i = 0; i < n - 1; i++) {
            // Find the minimum element in unsorted portion
            int minIndex = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }

            // Swap the found minimum with the first element of unsorted portion
            if (minIndex != i) {
                int temp = arr[i];
                arr[i] = arr[minIndex];
                arr[minIndex] = temp;
            }
        }
    }

    public static void main(String[] args) {
        int[] arr = {64, 25, 12, 22, 11};
        System.out.println("Before: " + Arrays.toString(arr));
        selectionSort(arr);
        System.out.println("After:  " + Arrays.toString(arr));
        // Before: [64, 25, 12, 22, 11]
        // After:  [11, 12, 22, 25, 64]
    }
}
```

**How Selection Sort Works:**
```
Array: [64, 25, 12, 22, 11]

Pass 1: Find min (11) → swap with arr[0] → [11, 25, 12, 22, 64]
Pass 2: Find min (12) → swap with arr[1] → [11, 12, 25, 22, 64]
Pass 3: Find min (22) → swap with arr[2] → [11, 12, 22, 25, 64]
Pass 4: Find min (25) → already at arr[3] → [11, 12, 22, 25, 64]
```

---

### 2.3 Insertion Sort

> **Definition**: Builds the sorted array one element at a time by inserting each element into its correct position in the already-sorted portion. Like sorting playing cards in your hand.

**Time**: O(n²) worst/average, O(n) best (already sorted) | **Space**: O(1) | **Stable**: Yes

```java
public class InsertionSort {

    public static void insertionSort(int[] arr) {
        int n = arr.length;

        for (int i = 1; i < n; i++) {
            int key = arr[i]; // Element to be inserted
            int j = i - 1;

            // Move elements greater than key one position ahead
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }

            arr[j + 1] = key; // Insert key at correct position
        }
    }

    public static void main(String[] args) {
        int[] arr = {12, 11, 13, 5, 6};
        System.out.println("Before: " + Arrays.toString(arr));
        insertionSort(arr);
        System.out.println("After:  " + Arrays.toString(arr));
        // Before: [12, 11, 13, 5, 6]
        // After:  [5, 6, 11, 12, 13]
    }
}
```

**How Insertion Sort Works:**
```
Array: [12, 11, 13, 5, 6]

Step 1: key=11 → Compare with 12, shift 12 → [11, 12, 13, 5, 6]
Step 2: key=13 → Already in place                → [11, 12, 13, 5, 6]
Step 3: key=5  → Shift 13, 12, 11               → [5, 11, 12, 13, 6]
Step 4: key=6  → Shift 13, 12, 11               → [5, 6, 11, 12, 13]
```

---

### 2.4 Merge Sort

> **Definition**: A divide-and-conquer algorithm that divides the array into two halves, recursively sorts each half, then merges them back together in sorted order.

**Time**: O(n log n) all cases | **Space**: O(n) | **Stable**: Yes

```java
public class MergeSort {

    public static void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;

            // Sort first half
            mergeSort(arr, left, mid);

            // Sort second half
            mergeSort(arr, mid + 1, right);

            // Merge sorted halves
            merge(arr, left, mid, right);
        }
    }

    private static void merge(int[] arr, int left, int mid, int right) {
        // Sizes of two sub-arrays
        int n1 = mid - left + 1;
        int n2 = right - mid;

        // Create temp arrays
        int[] leftArr = new int[n1];
        int[] rightArr = new int[n2];

        // Copy data
        for (int i = 0; i < n1; i++)
            leftArr[i] = arr[left + i];
        for (int j = 0; j < n2; j++)
            rightArr[j] = arr[mid + 1 + j];

        // Merge temp arrays
        int i = 0, j = 0, k = left;

        while (i < n1 && j < n2) {
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }
            k++;
        }

        // Copy remaining elements
        while (i < n1) {
            arr[k] = leftArr[i];
            i++;
            k++;
        }
        while (j < n2) {
            arr[k] = rightArr[j];
            j++;
            k++;
        }
    }

    public static void main(String[] args) {
        int[] arr = {38, 27, 43, 3, 9, 82, 10};
        System.out.println("Before: " + Arrays.toString(arr));
        mergeSort(arr, 0, arr.length - 1);
        System.out.println("After:  " + Arrays.toString(arr));
        // Before: [38, 27, 43, 3, 9, 82, 10]
        // After:  [3, 9, 10, 27, 38, 43, 82]
    }
}
```

**How Merge Sort Works:**
```
                [38, 27, 43, 3, 9, 82, 10]
               /                          \
        [38, 27, 43]                [3, 9, 82, 10]
        /         \                 /            \
    [38, 27]    [43]          [3, 9]        [82, 10]
    /     \                  /     \        /      \
  [38]   [27]             [3]    [9]     [82]    [10]
    \     /                  \     /        \      /
    [27, 38]    [43]          [3, 9]        [10, 82]
        \         /                 \            /
        [27, 38, 43]                [3, 9, 10, 82]
               \                          /
            [3, 9, 10, 27, 38, 43, 82]
```

---

### 2.5 Quick Sort

> **Definition**: A divide-and-conquer algorithm that picks a **pivot** element and partitions the array around it — elements smaller than pivot go left, larger go right. Then recursively sorts the sub-arrays.

**Time**: O(n log n) average, O(n²) worst | **Space**: O(log n) | **Stable**: No

```java
public class QuickSort {

    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            // Partition and get pivot index
            int pivotIndex = partition(arr, low, high);

            // Sort left of pivot
            quickSort(arr, low, pivotIndex - 1);

            // Sort right of pivot
            quickSort(arr, pivotIndex + 1, high);
        }
    }

    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high]; // Choose last element as pivot
        int i = low - 1;       // Index of smaller element

        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                // Swap arr[i] and arr[j]
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }

        // Place pivot in correct position
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;

        return i + 1; // Return pivot's final position
    }

    public static void main(String[] args) {
        int[] arr = {10, 80, 30, 90, 40, 50, 70};
        System.out.println("Before: " + Arrays.toString(arr));
        quickSort(arr, 0, arr.length - 1);
        System.out.println("After:  " + Arrays.toString(arr));
        // Before: [10, 80, 30, 90, 40, 50, 70]
        // After:  [10, 30, 40, 50, 70, 80, 90]
    }
}
```

**How Quick Sort Works:**
```
Array: [10, 80, 30, 90, 40, 50, 70]  pivot = 70

Partition:
- 10 < 70 → left
- 80 > 70 → stay
- 30 < 70 → left
- 90 > 70 → stay
- 40 < 70 → left
- 50 < 70 → left

Result: [10, 30, 40, 50, 70, 90, 80]
                        ↑ pivot in correct position

Then recursively sort: [10, 30, 40, 50] and [90, 80]
```

---

### 2.6 Counting Sort

> **Definition**: Non-comparison sort that counts occurrences of each element and uses those counts to place elements in the correct position. Works only with **non-negative integers** within a limited range.

**Time**: O(n + k) where k = range | **Space**: O(k) | **Stable**: Yes

```java
public class CountingSort {

    public static void countingSort(int[] arr) {
        if (arr.length == 0) return;

        // Find max value
        int max = arr[0];
        for (int num : arr) {
            if (num > max) max = num;
        }

        // Create count array
        int[] count = new int[max + 1];

        // Count occurrences
        for (int num : arr) {
            count[num]++;
        }

        // Rebuild sorted array
        int index = 0;
        for (int i = 0; i <= max; i++) {
            while (count[i] > 0) {
                arr[index] = i;
                index++;
                count[i]--;
            }
        }
    }

    public static void main(String[] args) {
        int[] arr = {4, 2, 2, 8, 3, 3, 1};
        System.out.println("Before: " + Arrays.toString(arr));
        countingSort(arr);
        System.out.println("After:  " + Arrays.toString(arr));
        // Before: [4, 2, 2, 8, 3, 3, 1]
        // After:  [1, 2, 2, 3, 3, 4, 8]
    }
}
```

---

### 2.7 Java Built-in Sorting

```java
import java.util.*;

// Sort primitive array
int[] arr = {5, 2, 8, 1, 9};
Arrays.sort(arr);                  // [1, 2, 5, 8, 9]

// Sort in descending order (need Integer array)
Integer[] arr2 = {5, 2, 8, 1, 9};
Arrays.sort(arr2, Collections.reverseOrder());  // [9, 8, 5, 2, 1]

// Sort partial array
int[] arr3 = {5, 2, 8, 1, 9};
Arrays.sort(arr3, 1, 4);          // Sort index 1 to 3: [5, 1, 2, 8, 9]

// Sort ArrayList
List<Integer> list = new ArrayList<>(Arrays.asList(5, 2, 8, 1, 9));
Collections.sort(list);           // [1, 2, 5, 8, 9]
Collections.sort(list, Collections.reverseOrder()); // [9, 8, 5, 2, 1]

// Sort String array
String[] names = {"Charlie", "Alice", "Bob"};
Arrays.sort(names);               // Alphabetical: [Alice, Bob, Charlie]

// Sort with custom Comparator
String[] words = {"banana", "apple", "cherry"};
Arrays.sort(words, (a, b) -> a.length() - b.length());  // Sort by length
// [apple, banana, cherry]

// Sort objects
List<int[]> intervals = new ArrayList<>();
intervals.add(new int[]{3, 7});
intervals.add(new int[]{1, 5});
intervals.add(new int[]{2, 6});
intervals.sort((a, b) -> a[0] - b[0]); // Sort by first element
```

---

## 3. Time & Space Complexity

### Big-O Notation

> **Definition**: Big-O notation describes the **worst-case** performance of an algorithm as input size grows.

### Common Complexities (fastest → slowest)

| Big-O | Name | Example |
|-------|------|---------|
| O(1) | Constant | Array access by index |
| O(log n) | Logarithmic | Binary Search |
| O(n) | Linear | Linear Search |
| O(n log n) | Linearithmic | Merge Sort, Quick Sort (avg) |
| O(n²) | Quadratic | Bubble Sort, Selection Sort |
| O(n³) | Cubic | Matrix multiplication |
| O(2ⁿ) | Exponential | Recursive Fibonacci |
| O(n!) | Factorial | Permutations |

### Sorting Algorithms Comparison

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| **Bubble Sort** | O(n) | O(n²) | O(n²) | O(1) | ✅ Yes |
| **Selection Sort** | O(n²) | O(n²) | O(n²) | O(1) | ❌ No |
| **Insertion Sort** | O(n) | O(n²) | O(n²) | O(1) | ✅ Yes |
| **Merge Sort** | O(n log n) | O(n log n) | O(n log n) | O(n) | ✅ Yes |
| **Quick Sort** | O(n log n) | O(n log n) | O(n²) | O(log n) | ❌ No |
| **Counting Sort** | O(n+k) | O(n+k) | O(n+k) | O(k) | ✅ Yes |

### What is Stable Sort?

> A **stable** sort preserves the relative order of equal elements.

```
Input:  [(A,3), (B,1), (C,3), (D,2)]
Sort by number:

Stable:   [(B,1), (D,2), (A,3), (C,3)]  → A comes before C (original order preserved)
Unstable: [(B,1), (D,2), (C,3), (A,3)]  → Order of A,C may change
```

### When to Use Which Sort?

| Use Case | Best Algorithm |
|----------|---------------|
| Small arrays (< 50 elements) | Insertion Sort |
| Nearly sorted arrays | Insertion Sort |
| General purpose / guaranteed O(n log n) | Merge Sort |
| In-place sorting with good average | Quick Sort |
| Integers in small range | Counting Sort |
| Need stable sort | Merge Sort or Insertion Sort |
| Memory is limited | Quick Sort or Insertion Sort |

---

## 4. Practice Problems

### Problem 1: Sort an array of 0s, 1s, and 2s (Dutch National Flag)

```java
public static void sort012(int[] arr) {
    int low = 0, mid = 0, high = arr.length - 1;

    while (mid <= high) {
        switch (arr[mid]) {
            case 0:
                swap(arr, low, mid);
                low++;
                mid++;
                break;
            case 1:
                mid++;
                break;
            case 2:
                swap(arr, mid, high);
                high--;
                break;
        }
    }
}

private static void swap(int[] arr, int i, int j) {
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// Input:  [0, 2, 1, 2, 0, 1]
// Output: [0, 0, 1, 1, 2, 2]
```

### Problem 2: Find pair with given sum in sorted array

```java
public static int[] twoSumSorted(int[] arr, int target) {
    int left = 0, right = arr.length - 1;

    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) {
            return new int[]{left, right};
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return new int[]{-1, -1}; // Not found
}

// Input: arr = [1, 3, 5, 7, 9], target = 12
// Output: [1, 4] → 3 + 9 = 12
```

### Problem 3: Find the element that appears once (all others appear twice)

```java
public static int findSingle(int[] arr) {
    int result = 0;
    for (int num : arr) {
        result ^= num; // XOR cancels out pairs
    }
    return result;
}

// Input:  [2, 3, 5, 4, 5, 3, 4]
// Output: 2
```

### Problem 4: Move all zeros to end

```java
public static void moveZeros(int[] arr) {
    int nonZeroIndex = 0;

    for (int i = 0; i < arr.length; i++) {
        if (arr[i] != 0) {
            arr[nonZeroIndex] = arr[i];
            nonZeroIndex++;
        }
    }

    while (nonZeroIndex < arr.length) {
        arr[nonZeroIndex] = 0;
        nonZeroIndex++;
    }
}

// Input:  [0, 1, 0, 3, 12]
// Output: [1, 3, 12, 0, 0]
```

### Problem 5: Find the peak element

```java
public static int findPeak(int[] arr) {
    int left = 0, right = arr.length - 1;

    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] < arr[mid + 1]) {
            left = mid + 1;  // Peak is on the right
        } else {
            right = mid;     // Peak is on the left (including mid)
        }
    }
    return left; // or right, they are equal
}

// Input:  [1, 3, 20, 4, 1, 0]
// Output: 2 (index of peak element 20)
```

### Problem 6: Sort strings by length

```java
public static void sortByLength(String[] arr) {
    Arrays.sort(arr, (a, b) -> {
        if (a.length() != b.length()) {
            return a.length() - b.length();
        }
        return a.compareTo(b); // Alphabetical if same length
    });
}

// Input:  ["banana", "pie", "apple", "ox"]
// Output: ["ox", "pie", "apple", "banana"]
```

### Problem 7: Merge intervals

```java
public static int[][] mergeIntervals(int[][] intervals) {
    if (intervals.length <= 1) return intervals;

    // Sort by start time
    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);

    List<int[]> merged = new ArrayList<>();
    merged.add(intervals[0]);

    for (int i = 1; i < intervals.length; i++) {
        int[] last = merged.get(merged.size() - 1);
        if (intervals[i][0] <= last[1]) {
            last[1] = Math.max(last[1], intervals[i][1]); // Merge
        } else {
            merged.add(intervals[i]);
        }
    }

    return merged.toArray(new int[0][]);
}

// Input:  [[1,3], [2,6], [8,10], [15,18]]
// Output: [[1,6], [8,10], [15,18]]
```

### Problem 8: Kth Largest Element

```java
// Method 1: Sort and pick
public static int kthLargest(int[] arr, int k) {
    Arrays.sort(arr);
    return arr[arr.length - k];
}

// Method 2: Using PriorityQueue (Min Heap)
public static int kthLargestHeap(int[] arr, int k) {
    PriorityQueue<Integer> minHeap = new PriorityQueue<>();
    for (int num : arr) {
        minHeap.offer(num);
        if (minHeap.size() > k) {
            minHeap.poll();
        }
    }
    return minHeap.peek();
}

// Input:  arr = [3, 2, 1, 5, 6, 4], k = 2
// Output: 5 (2nd largest)
```

### Problem 9: Search in rotated sorted array

```java
public static int searchRotated(int[] arr, int target) {
    int left = 0, right = arr.length - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (arr[mid] == target) return mid;

        // Left half is sorted
        if (arr[left] <= arr[mid]) {
            if (target >= arr[left] && target < arr[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        // Right half is sorted
        else {
            if (target > arr[mid] && target <= arr[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
}

// Input:  arr = [4, 5, 6, 7, 0, 1, 2], target = 0
// Output: 4
```

### Problem 10: Find square root using binary search

```java
public static int sqrt(int n) {
    if (n < 2) return n;

    int left = 1, right = n / 2, result = 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;
        long square = (long) mid * mid;

        if (square == n) {
            return mid;
        } else if (square < n) {
            result = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return result;
}

// sqrt(16) → 4
// sqrt(8)  → 2 (floor value)
```

---

## 🔑 Quick Revision - Key Points

| Concept | Remember |
|---------|----------|
| Linear Search | Goes element by element, O(n) |
| Binary Search | Needs sorted array, halves search space, O(log n) |
| Bubble Sort | Swaps adjacent, largest bubbles up, O(n²) |
| Selection Sort | Finds minimum, places at front, O(n²) |
| Insertion Sort | Inserts at correct position like cards, O(n²) |
| Merge Sort | Divide-conquer-merge, guaranteed O(n log n), needs extra space |
| Quick Sort | Pivot-based partition, O(n log n) avg, in-place |
| Stable sort | Preserves order of equal elements |
| In-place sort | Doesn't use extra array (O(1) space) |

---

> 📌 **Assessment Tip**: They may ask you to write sorting/searching code from scratch, or give you a problem that requires you to decide which algorithm to use. Know the tradeoffs between approaches!
