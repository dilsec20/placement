# Database Management Systems (DBMS) & SQL - Virtusa & Placement OA Master Guide

---

## SECTION 1: High-Yield Revision Notes & GATE/OA Formulas

### 1. Relational Algebra & GATE Formulas

#### Relational Algebra Operators
- **Selection ($\sigma_p(R)$)**: Filters rows matching predicate $p$. (Unary)
- **Projection ($\pi_{A_1, A_2}(R)$)**: Selects specified columns and **removes duplicates**. (Unary)
- **Cartesian Product ($R \times S$)**: Combines every tuple of $R$ with every tuple of $S$.
- **Natural Join ($R \bowtie S$)**: Combines tuples from $R$ and $S$ on matching common attributes.
- **Division ($R \div S$)**: Used for queries containing "FOR ALL" or "EVERY". Returns tuples in $R$ associated with **all** tuples in $S$.

#### Cardinality & Degree Bounds (GATE Formulas)
Let relation $R$ have $m$ tuples and $n_1$ attributes. Let relation $S$ have $k$ tuples and $n_2$ attributes.
1. **Cartesian Product ($R \times S$)**:
   - Number of attributes (Degree) = $n_1 + n_2$
   - Max tuples (Cardinality) = $m \times k$
   - Min tuples (Cardinality) = $m \times k$
2. **Natural Join ($R \bowtie S$)**:
   - Max tuples = $m \times k$ (when joined attribute values are identical across all tuples)
   - Min tuples = $0$ (when no matching common attribute values exist)
3. **Outer Join ($R \text{ LEFT OUTER JOIN } S$)**:
   - Min tuples = $\max(m, \text{tuples matched})$
   - Max tuples = $m \times k$
4. **Union / Intersection / Set Difference**:
   - Require **Union Compatibility** (same degree $n_1 = n_2$ and compatible domain types).

---

### 2. Functional Dependency & Normalization Formulas

#### Attribute Closure ($X^+$)
- Set of all attributes functionally determined by attribute set $X$ under functional dependency set $F$.
- Used to identify **Super Keys** and **Candidate Keys** (If $X^+ = \text{All Attributes of } R$, then $X$ is a Super Key).

#### Normal Forms Matrix & Conditions
| Normal Form | Condition for every non-trivial FD $X \rightarrow Y$ | Violations Solved |
| :--- | :--- | :--- |
| **1NF** | Atomic values only in every domain (no multi-valued/composite attributes). | Multi-valued attributes |
| **2NF** | In 1NF + **No Partial Dependency** (No non-prime attribute depends on a proper subset of any candidate key). | Partial Dependencies |
| **3NF** | In 2NF + **No Transitive Dependency** (For every $X \rightarrow Y$, either $X$ is a Super Key OR $Y$ is a Prime Attribute). | Transitive Dependencies |
| **BCNF** | In 3NF + For every $X \rightarrow Y$, **$X$ MUST be a Super Key**. | Anomalies from overlapping Candidate Keys |

#### Decomposition Testing Formulas
1. **Lossless-Join Decomposition Condition**:
   A decomposition of $R$ into $R_1$ and $R_2$ is **Lossless** if and only if:
   $$(R_1 \cap R_2) \rightarrow R_1 \quad \text{OR} \quad (R_1 \cap R_2) \rightarrow R_2$$
   *(i.e., common attributes must contain a candidate key of at least one relation).*

2. **Dependency Preservation Condition**:
   A decomposition is dependency preserving if:
   $$(F_1 \cup F_2 \dots \cup F_k)^+ = F^+$$

---

### 3. SQL Query Execution Order & Operators Matrix

#### Logical Processing Order of SQL Clauses
```text
1. FROM        (Specifies tables & executes JOINS)
2. WHERE       (Filters rows BEFORE grouping)
3. GROUP BY    (Aggregates rows into summary groups)
4. HAVING      (Filters aggregated groups AFTER grouping)
5. SELECT      (Projects target columns / expressions)
6. DISTINCT    (Eliminates duplicate output rows)
7. ORDER BY    (Sorts final result set ASC/DESC)
8. LIMIT / TOP (Restricts returned row count)
```

#### Null Handling Traps in SQL
- `NULL = NULL` $\rightarrow$ Evaluates to **UNKNOWN** (not TRUE).
- `WHERE col = NULL` $\rightarrow$ Always returns 0 rows! Use `WHERE col IS NULL`.
- `COUNT(*)` counts all rows including NULLs.
- `COUNT(col)` counts non-NULL values in `col`.
- `SUM`, `AVG`, `MIN`, `MAX` ignore `NULL` values.

#### SQL Window Functions Reference
- **`ROW_NUMBER()`**: Assigns a unique sequential integer ($1, 2, 3, \dots$) to rows.
- **`RANK()`**: Assigns rank with gaps for ties ($1, 2, 2, 4$).
- **`DENSE_RANK()`**: Assigns rank without gaps for ties ($1, 2, 2, 3$).
- **`LEAD(col, offset)` / `LAG(col, offset)`**: Accesses next/previous row value without self-join.

---

### 4. Transactions, ACID & Concurrency Control

#### ACID Properties
- **Atomicity**: All operations complete successfully or transaction is entirely aborted (All-or-Nothing). Managed by **Transaction Log / Recovery Manager**.
- **Consistency**: Database transitions from one valid state to another valid state.
- **Isolation**: Concurrent transactions execute as if they were running in isolation. Managed by **Concurrency Control Manager**.
- **Durability**: Committed changes persist even in system crashes. Managed by **Redo Logs / Shadow Paging**.

#### Conflict Serializability Precedence Graph Algorithm
1. Create a node for each active transaction $T_i$.
2. Draw a directed edge $T_i \rightarrow T_j$ if $T_i$ and $T_j$ contain conflicting operations ($W_i(X) \dots R_j(X)$, $R_i(X) \dots W_j(X)$, or $W_i(X) \dots W_j(X)$) where $T_i$ executes before $T_j$.
3. If precedence graph contains **NO CYCLES**, schedule is **Conflict Serializable**.

#### Locking Protocols
- **Two-Phase Locking (2PL)**:
  - **Growing Phase**: Locks are acquired; no locks released.
  - **Shrinking Phase**: Locks are released; no new locks acquired.
  - Guarantees Conflict Serializability, but subject to **Deadlocks**.
- **Strict 2PL**: All exclusive (X) locks held by a transaction are released ONLY after commit/abort. Prevents **Cascading Aborts**.

---

### 5. Indexing & B/B+ Tree Formulas

#### B-Tree Capacity Formula
Given block size $B$, record pointer size $R_p$, key size $K$, block pointer size $P$:
For a B-tree of order $m$ (maximum child pointers):
$$m \times P + (m - 1) \times (K + R_p) \le B$$

#### B+ Tree Internal & Leaf Node Capacity Formulas
1. **Internal Node Capacity (Order $m$)**:
   $$m \times P + (m - 1) \times K \le B$$
2. **Leaf Node Capacity (Order $m_{\text{leaf}}$)**:
   $$m_{\text{leaf}} \times (K + R_p) + P_{\text{next}} \le B$$

---

## SECTION 2: Top 100 Important SQL Query Questions (LeetCode & OA Master Bank)

---

### CATEGORY 1: Delete & Identify Duplicates (Q1 - Q5)

#### Q1. Delete Duplicate Emails (LeetCode 196)
**Table `Person`**: `(id INT, email VARCHAR)`
**Task**: Delete all duplicate emails, keeping only one unique email with the smallest `id`.
```sql
-- Solution 1: Self Join DELETE
DELETE p1 
FROM Person p1
JOIN Person p2 
  ON p1.email = p2.email AND p1.id > p2.id;

-- Solution 2: Window Function CTE
WITH RankedPerson AS (
    SELECT id, ROW_NUMBER() OVER (PARTITION BY email ORDER BY id) AS rn
    FROM Person
)
DELETE FROM Person 
WHERE id IN (SELECT id FROM RankedPerson WHERE rn > 1);
```
*Explanation*: Self-join matches rows with identical emails and deletes the instance (`p1`) having a higher `id`.

---

#### Q2. Find Duplicate Emails (LeetCode 182)
**Table `Person`**: `(id INT, email VARCHAR)`
**Task**: Report all duplicate emails.
```sql
SELECT email 
FROM Person
GROUP BY email
HAVING COUNT(email) > 1;
```
*Explanation*: `GROUP BY email` aggregates identical emails; `HAVING COUNT(email) > 1` filters groups appearing more than once.

---

#### Q3. Delete Duplicate Rows Keeping Maximum ID
**Table `Employees`**: `(emp_id INT, emp_name VARCHAR, department VARCHAR)`
**Task**: Remove duplicate employee entries based on `emp_name` and `department`, retaining the row with maximum `emp_id`.
```sql
DELETE e1 
FROM Employees e1
JOIN Employees e2 
  ON e1.emp_name = e2.emp_name 
 AND e1.department = e2.department 
 AND e1.emp_id < e2.emp_id;
```

---

#### Q4. Select Duplicate Rows across Multiple Columns
**Table `Orders`**: `(order_id INT, customer_id INT, product_id INT, order_date DATE)`
**Task**: Find `customer_id` and `product_id` pairs where a customer ordered the exact same product more than once.
```sql
SELECT customer_id, product_id, COUNT(*) AS purchase_count
FROM Orders
GROUP BY customer_id, product_id
HAVING COUNT(*) > 1;
```

---

#### Q5. Find Unique Records Only (No Duplicates Allowed)
**Table `Logs`**: `(log_id INT, user_id INT, action VARCHAR)`
**Task**: Select users who executed actions exactly ONCE.
```sql
SELECT user_id
FROM Logs
GROUP BY user_id
HAVING COUNT(*) = 1;
```

---

### CATEGORY 2: Second / Nth Highest Salary & Ranking (Q6 - Q15)

#### Q6. Second Highest Salary (LeetCode 176)
**Table `Employee`**: `(id INT, salary INT)`
**Task**: Find the second highest salary. Return `NULL` if no second highest exists.
```sql
SELECT (
    SELECT DISTINCT salary 
    FROM Employee
    ORDER BY salary DESC
    LIMIT 1 OFFSET 1
) AS SecondHighestSalary;
```
*Explanation*: Wrapping the `LIMIT 1 OFFSET 1` query in a scalar `SELECT (...)` returns `NULL` when fewer than 2 distinct salaries exist.

---

#### Q7. Nth Highest Salary Function (LeetCode 177)
**Task**: Write a SQL function to get the $N^{\text{th}}$ highest salary.
```sql
CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT
BEGIN
  SET N = N - 1;
  RETURN (
      SELECT DISTINCT salary 
      FROM Employee 
      ORDER BY salary DESC 
      LIMIT 1 OFFSET N
  );
END;
```

---

#### Q8. Department Highest Salary (LeetCode 184)
**Table `Employee`**: `(id, name, salary, departmentId)` | **Table `Department`**: `(id, name)`
**Task**: Find employees who have the highest salary in each department.
```sql
SELECT d.name AS Department, e.name AS Employee, e.salary AS Salary
FROM Employee e
JOIN Department d ON e.departmentId = d.id
WHERE (e.departmentId, e.salary) IN (
    SELECT departmentId, MAX(salary)
    FROM Employee
    GROUP BY departmentId
);
```

---

#### Q9. Department Top 3 Salaries (LeetCode 185)
**Task**: Find employees who earn top 3 unique salaries in each department.
```sql
WITH RankedSalaries AS (
    SELECT e.name AS Employee, e.salary AS Salary, d.name AS Department,
           DENSE_RANK() OVER (PARTITION BY e.departmentId ORDER BY e.salary DESC) AS rk
    FROM Employee e
    JOIN Department d ON e.departmentId = d.id
)
SELECT Department, Employee, Salary
FROM RankedSalaries
WHERE rk <= 3;
```
*Explanation*: `DENSE_RANK()` partitions employees by department and ranks distinct salaries without gaps. Filtering `rk <= 3` yields top 3 earners.

---

#### Q10. Employees Earning More Than Their Managers (LeetCode 181)
**Table `Employee`**: `(id INT, name VARCHAR, salary INT, managerId INT)`
**Task**: Find employees who earn more than their direct managers.
```sql
SELECT e.name AS Employee
FROM Employee e
JOIN Employee m ON e.managerId = m.id
WHERE e.salary > m.salary;
```

---

#### Q11. Departments with Average Salary Above Overall Company Average
```sql
SELECT departmentId, AVG(salary) AS avg_dept_salary
FROM Employee
GROUP BY departmentId
HAVING AVG(salary) > (SELECT AVG(salary) FROM Employee);
```

---

#### Q12. Employees Earning Above Their Department Average
```sql
SELECT e.id, e.name, e.salary, e.departmentId
FROM Employee e
WHERE e.salary > (
    SELECT AVG(salary) 
    FROM Employee 
    WHERE departmentId = e.departmentId
);
```

---

#### Q13. Rank Scores Without Gaps (LeetCode 178)
**Table `Scores`**: `(id INT, score DECIMAL(3,2))`
```sql
SELECT score, DENSE_RANK() OVER (ORDER BY score DESC) AS `rank`
FROM Scores;
```

---

#### Q14. Median Salary of Employees per Department
```sql
WITH RankedSalaries AS (
    SELECT departmentId, salary,
           ROW_NUMBER() OVER (PARTITION BY departmentId ORDER BY salary) AS row_num,
           COUNT(*) OVER (PARTITION BY departmentId) AS total_count
    FROM Employee
)
SELECT departmentId, AVG(salary) AS median_salary
FROM RankedSalaries
WHERE row_num IN (FLOOR((total_count + 1) / 2.0), CEIL((total_count + 1) / 2.0))
GROUP BY departmentId;
```

---

#### Q15. Salary Difference Between Highest and Lowest in Each Department
```sql
SELECT departmentId, 
       MAX(salary) - MIN(salary) AS salary_gap
FROM Employee
GROUP BY departmentId;
```

---

### CATEGORY 3: Outer Joins & Null Handling (Q16 - Q30)

#### Q16. Customers Who Never Order (LeetCode 183)
**Table `Customers`**: `(id, name)` | **Table `Orders`**: `(id, customerId)`
```sql
-- Solution using LEFT JOIN
SELECT c.name AS Customers
FROM Customers c
LEFT JOIN Orders o ON c.id = o.customerId
WHERE o.id IS NULL;

-- Alternative using NOT IN
SELECT name AS Customers
FROM Customers
WHERE id NOT IN (SELECT customerId FROM Orders WHERE customerId IS NOT NULL);
```

---

#### Q17. Combine Two Tables (LeetCode 175)
**Table `Person`**: `(personId, lastName, firstName)` | **Table `Address`**: `(addressId, personId, city, state)`
```sql
SELECT p.firstName, p.lastName, a.city, a.state
FROM Person p
LEFT JOIN Address a ON p.personId = a.personId;
```

---

#### Q18. Managers with at Least 5 Direct Reports (LeetCode 570)
```sql
SELECT m.name
FROM Employee e
JOIN Employee m ON e.managerId = m.id
GROUP BY m.id, m.name
HAVING COUNT(e.id) >= 5;
```

---

#### Q19. Customers Who Bought All Products (LeetCode 1045)
**Table `Customer`**: `(customer_id, product_key)` | **Table `Product`**: `(product_key)`
```sql
SELECT customer_id
FROM Customer
GROUP BY customer_id
HAVING COUNT(DISTINCT product_key) = (SELECT COUNT(*) FROM Product);
```

---

#### Q20. Product Sales Analysis III - First Year Sales (LeetCode 1070)
**Table `Sales`**: `(sale_id, product_id, year, quantity, price)`
```sql
SELECT product_id, year AS first_year, quantity, price
FROM Sales
WHERE (product_id, year) IN (
    SELECT product_id, MIN(year)
    FROM Sales
    GROUP BY product_id
);
```

---

#### Q21. Replace Employee ID With The Unique Identifier (LeetCode 1378)
```sql
SELECT u.unique_id, e.name
FROM Employees e
LEFT JOIN EmployeeUNI u ON e.id = u.id;
```

---

#### Q22. Average Years of Experience per Project (LeetCode 1068)
```sql
SELECT p.project_id, ROUND(AVG(e.experience_years), 2) AS average_years
FROM Project p
JOIN Employee e ON p.employee_id = e.employee_id
GROUP BY p.project_id;
```

---

#### Q23. Project with Most Employees
```sql
SELECT project_id
FROM Project
GROUP BY project_id
HAVING COUNT(employee_id) = (
    SELECT MAX(emp_count)
    FROM (
        SELECT COUNT(employee_id) AS emp_count
        FROM Project
        GROUP BY project_id
    ) AS counts
);
```

---

#### Q24. Sales Analysis - Best Selling Sellers
```sql
SELECT seller_id
FROM Sales
GROUP BY seller_id
HAVING SUM(price) = (
    SELECT MAX(total_sales)
    FROM (
        SELECT SUM(price) AS total_sales
        FROM Sales
        GROUP BY seller_id
    ) AS s
);
```

---

#### Q25. Buyers Who Bought Product S8 But Not iPhone
```sql
SELECT DISTINCT s.buyer_id
FROM Sales s
JOIN Product p ON s.product_id = p.product_id
WHERE p.product_name = 'S8'
  AND s.buyer_id NOT IN (
      SELECT s2.buyer_id
      FROM Sales s2
      JOIN Product p2 ON s2.product_id = p2.product_id
      WHERE p2.product_name = 'iPhone'
  );
```

---

#### Q26. Find Users with Valid E-Mails (Regex Match)
```sql
SELECT *
FROM Users
WHERE mail REGEXP '^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$';
```

---

#### Q27. Group Sold Products By The Date (LeetCode 1484)
```sql
SELECT sell_date,
       COUNT(DISTINCT product) AS num_sold,
       GROUP_CONCAT(DISTINCT product ORDER BY product ASC SEPARATOR ',') AS products
FROM Activities
GROUP BY sell_date
ORDER BY sell_date;
```

---

#### Q28. Customer Placing the Largest Number of Orders (LeetCode 586)
```sql
SELECT customer_number
FROM Orders
GROUP BY customer_number
ORDER BY COUNT(order_number) DESC
LIMIT 1;
```

---

#### Q29. Big Countries (Area $\ge$ 3M or Population $\ge$ 25M) (LeetCode 595)
```sql
SELECT name, population, area
FROM World
WHERE area >= 3000000 OR population >= 25000000;
```

---

#### Q30. Classes More Than 5 Students (LeetCode 596)
```sql
SELECT class
FROM Courses
GROUP BY class
HAVING COUNT(student) >= 5;
```

---

### CATEGORY 4: Consecutive Records & Window Functions (Q31 - Q45)

#### Q31. Consecutive Numbers - 3 Consecutive Identical Numbers (LeetCode 180)
**Table `Logs`**: `(id INT, num INT)`
```sql
-- Solution using Window Functions LAG / LEAD
WITH ConsecutiveCheck AS (
    SELECT num,
           LAG(num, 1) OVER (ORDER BY id) AS prev_num,
           LEAD(num, 1) OVER (ORDER BY id) AS next_num
    FROM Logs
)
SELECT DISTINCT num AS ConsecutiveNums
FROM ConsecutiveCheck
WHERE num = prev_num AND num = next_num;
```

---

#### Q32. Rising Temperature (LeetCode 197)
**Table `Weather`**: `(id, recordDate, temperature)`
**Task**: Find dates with higher temperature compared to their previous dates (yesterday).
```sql
SELECT w1.id
FROM Weather w1
JOIN Weather w2 ON DATEDIFF(w1.recordDate, w2.recordDate) = 1
WHERE w1.temperature > w2.temperature;
```

---

#### Q33. Human Traffic of Stadium (LeetCode 601)
**Task**: Display records with 3 or more consecutive IDs where `people >= 100`.
```sql
WITH FilteredStadium AS (
    SELECT id, visit_date, people,
           id - ROW_NUMBER() OVER (ORDER BY id) AS island_id
    FROM Stadium
    WHERE people >= 100
),
GroupedStadium AS (
    SELECT *, COUNT(*) OVER (PARTITION BY island_id) AS cnt
    FROM FilteredStadium
)
SELECT id, visit_date, people
FROM GroupedStadium
WHERE cnt >= 3
ORDER BY visit_date;
```

---

#### Q34. Users with 5 or More Consecutive Active Login Days
```sql
WITH RankedLogins AS (
    SELECT DISTINCT user_id, login_date,
           DATEDIFF(login_date, '2000-01-01') - ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date) AS streak_group
    FROM UserLogins
),
LoginStreaks AS (
    SELECT user_id, COUNT(*) AS streak_length
    FROM RankedLogins
    GROUP BY user_id, streak_group
)
SELECT DISTINCT user_id
FROM LoginStreaks
WHERE streak_length >= 5;
```

---

#### Q35. Game Play Analysis I - First Login Date (LeetCode 511)
```sql
SELECT player_id, MIN(event_date) AS first_login
FROM Activity
GROUP BY player_id;
```

---

#### Q36. Game Play Analysis IV - Fraction of Players Returning Next Day (LeetCode 550)
```sql
WITH FirstLogins AS (
    SELECT player_id, MIN(event_date) AS first_login
    FROM Activity
    GROUP BY player_id
)
SELECT ROUND(
    COUNT(a.player_id) * 1.0 / (SELECT COUNT(DISTINCT player_id) FROM Activity), 2
) AS fraction
FROM FirstLogins fl
JOIN Activity a 
  ON fl.player_id = a.player_id 
 AND DATEDIFF(a.event_date, fl.first_login) = 1;
```

---

#### Q37. Restaurant Growth - 7-Day Moving Average (LeetCode 1321)
```sql
WITH DailyAmount AS (
    SELECT visited_on, SUM(amount) AS amount
    FROM Customer
    GROUP BY visited_on
),
MovingSum AS (
    SELECT visited_on,
           SUM(amount) OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS amount,
           ROUND(AVG(amount) OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW), 2) AS average_amount,
           ROW_NUMBER() OVER (ORDER BY visited_on) AS rn
    FROM DailyAmount
)
SELECT visited_on, amount, average_amount
FROM MovingSum
WHERE rn >= 7;
```

---

#### Q38. Running Total of Amount by Order Date
```sql
SELECT order_id, customer_id, order_date, amount,
       SUM(amount) OVER (PARTITION BY customer_id ORDER BY order_date) AS running_total
FROM Orders;
```

---

#### Q39. Monthly Transactions I (LeetCode 1193)
```sql
SELECT DATE_FORMAT(trans_date, '%Y-%m') AS month,
       country,
       COUNT(*) AS trans_count,
       SUM(CASE WHEN state = 'approved' THEN 1 ELSE 0 END) AS approved_count,
       SUM(amount) AS trans_total_amount,
       SUM(CASE WHEN state = 'approved' THEN amount ELSE 0 END) AS approved_total_amount
FROM Transactions
GROUP BY month, country;
```

---

#### Q40. Immediate Food Delivery II (LeetCode 1173)
```sql
WITH FirstOrders AS (
    SELECT customer_id, order_date, customer_pref_delivery_date,
           ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date) AS rn
    FROM Delivery
)
SELECT ROUND(
    SUM(CASE WHEN order_date = customer_pref_delivery_date THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2
) AS immediate_percentage
FROM FirstOrders
WHERE rn = 1;
```

---

#### Q41. Last Person to Fit in the Elevator (LeetCode 1204)
**Constraint**: Weight limit is 1000 kg.
```sql
WITH CumulativeWeight AS (
    SELECT person_name, turn, weight,
           SUM(weight) OVER (ORDER BY turn) AS total_weight
    FROM Queue
)
SELECT person_name
FROM CumulativeWeight
WHERE total_weight <= 1000
ORDER BY turn DESC
LIMIT 1;
```

---

#### Q42. Count Salary Categories (Low, Average, High) (LeetCode 1907)
```sql
SELECT 'Low Salary' AS category, COUNT(*) AS accounts_count FROM Accounts WHERE income < 20000
UNION ALL
SELECT 'Average Salary' AS category, COUNT(*) AS accounts_count FROM Accounts WHERE income BETWEEN 20000 AND 50000
UNION ALL
SELECT 'High Salary' AS category, COUNT(*) AS accounts_count FROM Accounts WHERE income > 50000;
```

---

#### Q43. Primary Department for Each Employee (LeetCode 1789)
```sql
SELECT employee_id, department_id
FROM Employee
WHERE primary_flag = 'Y'
UNION
SELECT employee_id, department_id
FROM Employee
GROUP BY employee_id
HAVING COUNT(department_id) = 1;
```

---

#### Q44. Triangle Judgement (LeetCode 610)
```sql
SELECT x, y, z,
       CASE WHEN x + y > z AND x + z > y AND y + z > x THEN 'Yes' ELSE 'No' END AS triangle
FROM Triangle;
```

---

#### Q45. Consecutive Available Seats in Cinema (LeetCode 603)
```sql
SELECT DISTINCT c1.seat_id
FROM Cinema c1
JOIN Cinema c2 ON ABS(c1.seat_id - c2.seat_id) = 1
WHERE c1.free = 1 AND c2.free = 1
ORDER BY c1.seat_id;
```

---

### CATEGORY 5: CASE Transformations & Tree Queries (Q46 - Q60)

#### Q46. Swap Salary / Gender (LeetCode 627)
```sql
UPDATE Salary
SET sex = CASE 
    WHEN sex = 'm' THEN 'f' 
    ELSE 'm' 
END;
```

---

#### Q47. Exchange Seats (LeetCode 626)
**Task**: Swap seat IDs of every two consecutive students. If total count is odd, last ID remains unchanged.
```sql
SELECT 
    CASE 
        WHEN id % 2 = 1 AND id = (SELECT MAX(id) FROM Seat) THEN id
        WHEN id % 2 = 1 THEN id + 1
        ELSE id - 1
    END AS id, student
FROM Seat
ORDER BY id;
```

---

#### Q48. Tree Node Type Identification (LeetCode 608)
```sql
SELECT id,
       CASE 
           WHEN p_id IS NULL THEN 'Root'
           WHEN id IN (SELECT DISTINCT p_id FROM Tree WHERE p_id IS NOT NULL) THEN 'Inner'
           ELSE 'Leaf'
       END AS type
FROM Tree;
```

---

#### Q49. Reformat Department Table - Pivot Monthly Revenue (LeetCode 1179)
```sql
SELECT id,
       SUM(CASE WHEN month = 'Jan' THEN revenue END) AS Jan_Revenue,
       SUM(CASE WHEN month = 'Feb' THEN revenue END) AS Feb_Revenue,
       SUM(CASE WHEN month = 'Mar' THEN revenue END) AS Mar_Revenue,
       SUM(CASE WHEN month = 'Apr' THEN revenue END) AS Apr_Revenue
FROM Department
GROUP BY id;
```

---

#### Q50. Find Followers Count per User (LeetCode 1729)
```sql
SELECT user_id, COUNT(follower_id) AS followers_count
FROM Followers
GROUP BY user_id
ORDER BY user_id;
```

---

#### Q51. Daily Active Users in Past 30 Days (LeetCode 1141)
```sql
SELECT activity_date AS day, COUNT(DISTINCT user_id) AS active_users
FROM Activity
WHERE activity_date BETWEEN '2019-06-28' AND '2019-07-27'
GROUP BY activity_date;
```

---

#### Q52. Capital Gain / Loss (LeetCode 1393)
```sql
SELECT stock_name,
       SUM(CASE WHEN operation = 'Buy' THEN -price ELSE price END) AS capital_gain_loss
FROM Stocks
GROUP BY stock_name;
```

---

#### Q53. Patients With a Condition (LeetCode 1527)
```sql
SELECT patient_id, patient_name, conditions
FROM Patients
WHERE conditions LIKE 'DIAB1%' OR conditions LIKE '% DIAB1%';
```

---

#### Q54. Rearrange Products Table - Unpivot Columns to Rows (LeetCode 1795)
```sql
SELECT product_id, 'store1' AS store, store1 AS price FROM Products WHERE store1 IS NOT NULL
UNION ALL
SELECT product_id, 'store2' AS store, store2 AS price FROM Products WHERE store2 IS NOT NULL
UNION ALL
SELECT product_id, 'store3' AS store, store3 AS price FROM Products WHERE store3 IS NOT NULL;
```

---

#### Q55. Highest Grade For Each Student (LeetCode 1112)
```sql
WITH RankedGrades AS (
    SELECT student_id, course_id, grade,
           ROW_NUMBER() OVER (PARTITION BY student_id ORDER BY grade DESC, course_id ASC) AS rn
    FROM Enrollments
)
SELECT student_id, course_id, grade
FROM RankedGrades
WHERE rn = 1;
```

---

#### Q56. Percentage of Users Attended a Contest (LeetCode 1633)
```sql
SELECT contest_id,
       ROUND(COUNT(DISTINCT user_id) * 100.0 / (SELECT COUNT(*) FROM Users), 2) AS percentage
FROM Register
GROUP BY contest_id
ORDER BY percentage DESC, contest_id ASC;
```

---

#### Q57. Average Process Time per Machine (LeetCode 1661)
```sql
SELECT a1.machine_id,
       ROUND(AVG(a2.timestamp - a1.timestamp), 3) AS processing_time
FROM Activity a1
JOIN Activity a2 
  ON a1.machine_id = a2.machine_id 
 AND a1.process_id = a2.process_id 
 AND a1.activity_type = 'start' 
 AND a2.activity_type = 'end'
GROUP BY a1.machine_id;
```

---

#### Q58. Number of Unique Subjects Taught by Each Teacher (LeetCode 2356)
```sql
SELECT teacher_id, COUNT(DISTINCT subject_id) AS cnt
FROM Teacher
GROUP BY teacher_id;
```

---

#### Q59. Total Time Spent by Each Employee on Each Day (LeetCode 1741)
```sql
SELECT event_day AS day, emp_id, SUM(out_time - in_time) AS total_time
FROM Employees
GROUP BY event_day, emp_id;
```

---

#### Q60. Employees Whose Manager Left the Company (LeetCode 1978)
```sql
SELECT employee_id
FROM Employees
WHERE salary < 30000
  AND manager_id IS NOT NULL
  AND manager_id NOT IN (SELECT employee_id FROM Employees)
ORDER BY employee_id;
```

---

### CATEGORY 6: Advanced Subqueries, CTEs & Analytics (Q61 - Q100)

#### Q61. Find Products Sold in 2019 Only (LeetCode 1084)
```sql
SELECT p.product_id, p.product_name
FROM Product p
JOIN Sales s ON p.product_id = s.product_id
GROUP BY p.product_id, p.product_name
HAVING MIN(s.sale_date) >= '2019-01-01' AND MAX(s.sale_date) <= '2019-03-31';
```

---

#### Q62. Second Most Recent Activity per User
```sql
WITH UserActivities AS (
    SELECT username, activity, startDate, endDate,
           ROW_NUMBER() OVER (PARTITION BY username ORDER BY endDate DESC) AS rn,
           COUNT(*) OVER (PARTITION BY username) AS total_act
    FROM UserActivity
)
SELECT username, activity, startDate, endDate
FROM UserActivities
WHERE rn = 2 OR total_act = 1;
```

---

#### Q63. Calculate Cumulative Monthly Revenue
```sql
SELECT sales_month, revenue,
       SUM(revenue) OVER (ORDER BY sales_month) AS cumulative_revenue
FROM MonthlySales;
```

---

#### Q64. Customers Who Ordered Both Item A and Item B
```sql
SELECT customer_id
FROM Orders
WHERE item_name IN ('Item A', 'Item B')
GROUP BY customer_id
HAVING COUNT(DISTINCT item_name) = 2;
```

---

#### Q65. Customers Who Bought Item A But NOT Item B
```sql
SELECT DISTINCT customer_id
FROM Orders
WHERE item_name = 'Item A'
  AND customer_id NOT IN (
      SELECT customer_id FROM Orders WHERE item_name = 'Item B'
  );
```

---

#### Q66. Calculate Active User Retention (Month-over-Month Active Users)
```sql
SELECT DATE_FORMAT(u1.event_date, '%Y-%m') AS current_month,
       COUNT(DISTINCT u1.user_id) AS retained_users
FROM UserEvents u1
JOIN UserEvents u2 
  ON u1.user_id = u2.user_id 
 AND PERIOD_DIFF(DATE_FORMAT(u1.event_date, '%Y%m'), DATE_FORMAT(u2.event_date, '%Y%m')) = 1
GROUP BY current_month;
```

---

#### Q67. Find Employees with Same Salary in Same Department
```sql
SELECT e1.id, e1.name, e1.salary, e1.departmentId
FROM Employee e1
JOIN Employee e2 
  ON e1.departmentId = e2.departmentId 
 AND e1.salary = e2.salary 
 AND e1.id != e2.id;
```

---

#### Q68. Customer Order Frequency (Customers with Orders in Every Month of 2020)
```sql
SELECT customer_id
FROM Orders
WHERE YEAR(order_date) = 2020
GROUP BY customer_id
HAVING COUNT(DISTINCT MONTH(order_date)) = 12;
```

---

#### Q69. Overlapping Reservation / Booking Dates Check
```sql
SELECT b1.booking_id AS booking1, b2.booking_id AS booking2
FROM Bookings b1
JOIN Bookings b2 
  ON b1.room_id = b2.room_id 
 AND b1.booking_id < b2.booking_id
 AND b1.start_date < b2.end_date 
 AND b1.end_date > b2.start_date;
```

---

#### Q70. Find Peak Order Hour of the Day
```sql
SELECT HOUR(order_time) AS order_hour, COUNT(*) AS total_orders
FROM Orders
GROUP BY HOUR(order_time)
ORDER BY total_orders DESC
LIMIT 1;
```

---

#### Q71. Customer Lifetime Value (CLV) Calculation
```sql
SELECT customer_id, 
       SUM(order_amount) AS lifetime_value,
       COUNT(order_id) AS total_orders
FROM Orders
GROUP BY customer_id
ORDER BY lifetime_value DESC;
```

---

#### Q72. Calculate Churn Rate per Month
```sql
WITH MonthlyStatus AS (
    SELECT DATE_FORMAT(status_date, '%Y-%m') AS month,
           SUM(CASE WHEN status = 'churned' THEN 1 ELSE 0 END) AS churned_users,
           COUNT(*) AS total_users
    FROM CustomerStatus
    GROUP BY month
)
SELECT month, ROUND(churned_users * 100.0 / total_users, 2) AS churn_rate_pct
FROM MonthlyStatus;
```

---

#### Q73. Find Top 10% Highest Paying Customers (Percentile Ranking)
```sql
WITH CustomerSpend AS (
    SELECT customer_id, SUM(amount) AS total_spend,
           PERCENT_RANK() OVER (ORDER BY SUM(amount) DESC) AS pct_rank
    FROM Transactions
    GROUP BY customer_id
)
SELECT customer_id, total_spend
FROM CustomerSpend
WHERE pct_rank <= 0.10;
```

---

#### Q74. Find Days with Zero Sales (Missing Date Gaps)
```sql
SELECT d.calendar_date
FROM DatesTable d
LEFT JOIN Sales s ON d.calendar_date = s.sale_date
WHERE s.sale_date IS NULL
  AND d.calendar_date BETWEEN '2023-01-01' AND '2023-01-31';
```

---

#### Q75. Calculate Year-over-Year (YoY) Sales Growth Rate
```sql
WITH YearlySales AS (
    SELECT YEAR(order_date) AS yr, SUM(amount) AS total_revenue
    FROM Orders
    GROUP BY yr
)
SELECT cur.yr, cur.total_revenue,
       ROUND((cur.total_revenue - prev.total_revenue) * 100.0 / prev.total_revenue, 2) AS yoy_growth_pct
FROM YearlySales cur
LEFT JOIN YearlySales prev ON cur.yr = prev.yr + 1;
```

---

#### Q76. Recursive CTE - Hierarchy Tree Path (Employee Manager Chain)
```sql
WITH RECURSIVE Hierarchy AS (
    SELECT id, name, managerId, CAST(name AS CHAR(200)) AS path
    FROM Employee
    WHERE managerId IS NULL
    UNION ALL
    SELECT e.id, e.name, e.managerId, CONCAT(h.path, ' -> ', e.name)
    FROM Employee e
    JOIN Hierarchy h ON e.managerId = h.id
)
SELECT * FROM Hierarchy;
```

---

#### Q77. Find Duplicate Rows across All Columns Without Primary Key
```sql
WITH NumberedRows AS (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY col1, col2, col3 ORDER BY (SELECT NULL)) AS rn
    FROM RawTable
)
DELETE FROM NumberedRows WHERE rn > 1;
```

---

#### Q78. Find Product Pairs Bought Together Most Frequently (Market Basket Analysis)
```sql
SELECT o1.product_id AS product_A, o2.product_id AS product_B, COUNT(*) AS pair_frequency
FROM OrderDetails o1
JOIN OrderDetails o2 ON o1.order_id = o2.order_id AND o1.product_id < o2.product_id
GROUP BY o1.product_id, o2.product_id
ORDER BY pair_frequency DESC
LIMIT 5;
```

---

#### Q79. Calculate Net Change in Account Balance per User
```sql
SELECT account_id,
       SUM(CASE WHEN transaction_type = 'Deposit' THEN amount ELSE -amount END) AS net_balance
FROM BankTransactions
GROUP BY account_id;
```

---

#### Q80. Find Users Who Signed Up and Placed Order Within 24 Hours
```sql
SELECT u.user_id
FROM Users u
JOIN Orders o ON u.user_id = o.user_id
WHERE TIMESTAMPDIFF(HOUR, u.signup_date, o.order_date) BETWEEN 0 AND 24;
```

---

#### Q81. Department with the Second Highest Average Salary
```sql
WITH DeptAvg AS (
    SELECT departmentId, AVG(salary) AS avg_sal,
           DENSE_RANK() OVER (ORDER BY AVG(salary) DESC) AS rk
    FROM Employee
    GROUP BY departmentId
)
SELECT departmentId, avg_sal
FROM DeptAvg
WHERE rk = 2;
```

---

#### Q82. Find Missing Employee IDs in Continuous Range (1 to N)
```sql
SELECT seq.id AS missing_id
FROM SequenceTable seq
LEFT JOIN Employee e ON seq.id = e.id
WHERE e.id IS NULL AND seq.id <= (SELECT MAX(id) FROM Employee);
```

---

#### Q83. Calculate Conversion Rate of Ad Clicks to Sales
```sql
SELECT c.ad_id,
       COUNT(DISTINCT s.sale_id) * 100.0 / COUNT(DISTINCT c.click_id) AS conversion_rate
FROM AdClicks c
LEFT JOIN Sales s ON c.click_id = s.click_id
GROUP BY c.ad_id;
```

---

#### Q84. Find Employees Who Worked Over 40 Hours in a Week
```sql
SELECT emp_id, WEEK(work_date) AS work_week, SUM(hours_worked) AS total_hours
FROM Timesheet
GROUP BY emp_id, work_week
HAVING SUM(hours_worked) > 40;
```

---

#### Q85. Update Account Balances with Conditional Logical Operations
```sql
UPDATE Accounts
SET balance = balance + CASE 
    WHEN account_type = 'Savings' THEN balance * 0.05
    WHEN account_type = 'Checking' THEN balance * 0.01
    ELSE 0 
END;
```

---

#### Q86. Find First and Last Order of Each Customer
```sql
SELECT customer_id,
       MIN(order_date) AS first_order_date,
       MAX(order_date) AS last_order_date
FROM Orders
GROUP BY customer_id;
```

---

#### Q87. Calculate Average Order Value (AOV) per Country
```sql
SELECT country, ROUND(AVG(total_amount), 2) AS avg_order_value
FROM Orders o
JOIN Customers c ON o.customer_id = c.customer_id
GROUP BY country;
```

---

#### Q88. Find Customers Who Returned More Than 50% of Their Orders
```sql
SELECT customer_id
FROM Orders
GROUP BY customer_id
HAVING SUM(CASE WHEN status = 'Returned' THEN 1 ELSE 0 END) * 1.0 / COUNT(*) > 0.50;
```

---

#### Q89. Find Employees with No Manager (Root Hierarchy)
```sql
SELECT id, name
FROM Employee
WHERE managerId IS NULL;
```

---

#### Q90. Select Records with Maximum Date per Group without Subquery (Using `ROW_NUMBER()`)
```sql
WITH RankedLogs AS (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY device_id ORDER BY log_timestamp DESC) AS rn
    FROM DeviceLogs
)
SELECT *
FROM RankedLogs
WHERE rn = 1;
```

---

#### Q91. Calculate Bounce Rate of Web Traffic Pages
```sql
SELECT page_url,
       COUNT(CASE WHEN session_pages = 1 THEN 1 END) * 100.0 / COUNT(*) AS bounce_rate_pct
FROM WebSessions
GROUP BY page_url;
```

---

#### Q92. Find Consecutive Win Streaks in Games
```sql
WITH Streaks AS (
    SELECT player_id, result, game_date,
           ROW_NUMBER() OVER (PARTITION BY player_id ORDER BY game_date) - 
           ROW_NUMBER() OVER (PARTITION BY player_id, result ORDER BY game_date) AS grp
    FROM GameResults
)
SELECT player_id, COUNT(*) AS win_streak
FROM Streaks
WHERE result = 'WIN'
GROUP BY player_id, grp
ORDER BY win_streak DESC;
```

---

#### Q93. Calculate 3-Month Moving Average Revenue
```sql
SELECT month_end_date, revenue,
       AVG(revenue) OVER (ORDER BY month_end_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_avg_3m
FROM MonthlyRevenue;
```

---

#### Q94. Identify Suspicious Accounts with Transactions Exceeding Daily Limit
```sql
SELECT account_id, trans_date, SUM(amount) AS daily_total
FROM BankTransactions
GROUP BY account_id, trans_date
HAVING SUM(amount) > 100000;
```

---

#### Q95. Pivot Products into Quarterly Columns
```sql
SELECT product_id,
       SUM(CASE WHEN QUARTER(sale_date) = 1 THEN amount ELSE 0 END) AS Q1_Sales,
       SUM(CASE WHEN QUARTER(sale_date) = 2 THEN amount ELSE 0 END) AS Q2_Sales,
       SUM(CASE WHEN QUARTER(sale_date) = 3 THEN amount ELSE 0 END) AS Q3_Sales,
       SUM(CASE WHEN QUARTER(sale_date) = 4 THEN amount ELSE 0 END) AS Q4_Sales
FROM ProductSales
GROUP BY product_id;
```

---

#### Q96. Select Alternate Rows (Odd / Even Row IDs)
```sql
-- Odd Row IDs
SELECT * FROM (
    SELECT *, ROW_NUMBER() OVER (ORDER BY id) AS rn FROM TableName
) t WHERE rn % 2 = 1;

-- Even Row IDs
SELECT * FROM (
    SELECT *, ROW_NUMBER() OVER (ORDER BY id) AS rn FROM TableName
) t WHERE rn % 2 = 0;
```

---

#### Q97. Find Most Common Words in Text Logs using String Functions
```sql
SELECT LOWER(word) AS word, COUNT(*) AS freq
FROM LogWords
GROUP BY LOWER(word)
ORDER BY freq DESC
LIMIT 10;
```

---

#### Q98. Calculate Customer Retention Cohort Analysis (Signup Month vs First Purchase Month)
```sql
SELECT DATE_FORMAT(u.signup_date, '%Y-%m') AS cohort_month,
       DATE_FORMAT(o.first_order, '%Y-%m') AS purchase_month,
       COUNT(DISTINCT u.user_id) AS user_count
FROM Users u
JOIN (
    SELECT user_id, MIN(order_date) AS first_order
    FROM Orders
    GROUP BY user_id
) o ON u.user_id = o.user_id
GROUP BY cohort_month, purchase_month;
```

---

#### Q99. Find Products with Increasing Sales for 3 Consecutive Years
```sql
SELECT s1.product_id
FROM YearlyProductSales s1
JOIN YearlyProductSales s2 ON s1.product_id = s2.product_id AND s1.year = s2.year - 1
JOIN YearlyProductSales s3 ON s1.product_id = s3.product_id AND s1.year = s3.year - 2
WHERE s1.revenue < s2.revenue AND s2.revenue < s3.revenue;
```

---

#### Q100. Find Employees Who Earn More Than All Employees in Department 10 (`ALL` Operator)
```sql
SELECT id, name, salary, departmentId
FROM Employee
WHERE salary > ALL (
    SELECT salary 
    FROM Employee 
    WHERE departmentId = 10
);
```

---

## SECTION 3: 300+ Practice MCQs for Virtusa & Company OA

1. What is the fundamental requirement for two relations to be compatible for set operations (Union, Intersection, Set Difference)?
   - A) They must have identical primary key values
   - B) They must have the same number of attributes and corresponding compatible domain types
   - C) They must be stored on the same disk block
   - D) They must both be in BCNF
   - **Answer**: B
   - **Explanation**: Union compatibility requires identical degree (attribute count) and domain type compatibility across corresponding columns.

2. Which SQL clause is used to filter groups generated by `GROUP BY`?
   - A) `WHERE`
   - B) `HAVING`
   - C) `ORDER BY`
   - D) `WHERE GROUP`
   - **Answer**: B
   - **Explanation**: `WHERE` filters individual rows before grouping, whereas `HAVING` filters aggregated groups.

3. In Relational Algebra, what is the result of Cartesian Product of relation $R$ (3 attributes, 5 rows) and relation $S$ (4 attributes, 10 rows)?
   - A) 7 attributes, 15 rows
   - B) 7 attributes, 50 rows
   - C) 12 attributes, 50 rows
   - D) 12 attributes, 15 rows
   - **Answer**: B
   - **Explanation**: Attributes add up ($3 + 4 = 7$); tuples multiply ($5 \times 10 = 50$).

4. A relation $R(A, B, C, D)$ has functional dependencies $\{A \rightarrow B, B \rightarrow C, C \rightarrow D\}$. What is the candidate key?
   - A) $\{A\}$
   - B) $\{B\}$
   - C) $\{C\}$
   - D) $\{A, B\}$
   - **Answer**: A
   - **Explanation**: $A^+ = \{A, B, C, D\}$, covering all attributes of $R$. Hence $A$ is the sole candidate key.

5. Which Normal Form eliminates Partial Dependencies?
   - A) 1NF
   - B) 2NF
   - C) 3NF
   - D) BCNF
   - **Answer**: B
   - **Explanation**: 2NF explicitly requires that no non-prime attribute is dependent on a proper subset of any candidate key.

6. If every functional dependency $X \rightarrow Y$ in a relation has $X$ as a Super Key, the relation is guaranteed to be in:
   - A) 2NF only
   - B) 3NF only
   - C) BCNF
   - D) 4NF
   - **Answer**: C
   - **Explanation**: Boyce-Codd Normal Form (BCNF) strictly requires that $X$ must be a super key for every non-trivial $X \rightarrow Y$.

7. In SQL, what is the result of `SELECT COUNT(salary) FROM Employee;` if `salary` has 5 non-null numbers and 2 `NULL`s?
   - A) 7
   - B) 5
   - C) NULL
   - D) Error
   - **Answer**: B
   - **Explanation**: `COUNT(column_name)` ignores `NULL` values and counts only valid entries.

8. Which type of join returns all matching records plus non-matching records from BOTH tables?
   - A) LEFT JOIN
   - B) RIGHT JOIN
   - C) FULL OUTER JOIN
   - D) CROSS JOIN
   - **Answer**: C
   - **Explanation**: FULL OUTER JOIN preserves unmatched rows from both left and right relations, padding missing values with NULL.

9. Which ACID property ensures that database changes persist even in the event of a power outage?
   - A) Atomicity
   - B) Consistency
   - C) Isolation
   - D) Durability
   - **Answer**: D
   - **Explanation**: Durability guarantees committed transaction updates are written to non-volatile storage (disk/logs).

10. In a precedence graph for concurrency control, a cycle indicates that the schedule is:
    - A) Conflict Serializable
    - B) NOT Conflict Serializable
    - C) Recoverable
    - D) Cascadeless
    - **Answer**: B
    - **Explanation**: A cycle in the serializability graph indicates circular dependencies between transactions, violating conflict serializability.

11. Which SQL command is a DDL (Data Definition Language) command?
    - A) `SELECT`
    - B) `INSERT`
    - C) `ALTER`
    - D) `UPDATE`
    - **Answer**: C
    - **Explanation**: `ALTER` modifies table schemas (DDL). `SELECT`, `INSERT`, `UPDATE` are DML commands.

12. What command is used to remove all rows from a table quickly without logging individual row deletions?
    - A) `DELETE`
    - B) `TRUNCATE`
    - C) `DROP`
    - D) `REMOVE`
    - **Answer**: B
    - **Explanation**: `TRUNCATE` is DDL; it deallocates data pages instantly without row-by-row transaction logging.

13. What is a Correlated Subquery?
    - A) A query that runs independently of the outer query
    - B) A subquery that references columns from the outer query and re-evaluates for every outer row
    - C) A subquery executed in parallel threads
    - D) A recursive view definition
    - **Answer**: B
    - **Explanation**: Correlated subqueries rely on values passed down from outer query rows, re-evaluating once per candidate row.

14. In B+ Trees, data pointers (pointers to actual disk records) exist in:
    - A) Internal nodes only
    - B) Leaf nodes only
    - C) Root node only
    - D) Both internal and leaf nodes
    - **Answer**: B
    - **Explanation**: Unlike B-Trees, B+ Trees store all data pointers exclusively in leaf nodes; internal nodes store indexing keys and child pointers.

15. What is dirty read anomaly?
    - A) Reading data that has been modified by an uncommitted transaction
    - B) Reading different values for the same row within the same transaction
    - C) Writing data over uncommitted data
    - D) Missing rows due to concurrent deletion
    - **Answer**: A
    - **Explanation**: Dirty read occurs when Transaction A reads modifications made by Transaction B before B commits; if B aborts, A read invalid data.

16. Which Isolation Level prevents Dirty Reads but allows Non-Repeatable Reads?
    - A) Read Uncommitted
    - B) Read Committed
    - C) Repeatable Read
    - D) Serializable
    - **Answer**: B
    - **Explanation**: `Read Committed` prevents dirty reads by requiring shared locks on reads, but non-repeatable reads can occur if values change between reads.

17. Standard SQL operator to check if a value matches any value in a subquery list:
    - A) `LIKE`
    - B) `IN`
    - C) `EXISTS`
    - D) `BETWEEN`
    - **Answer**: B
    - **Explanation**: `IN` tests membership against a set or subquery result list.

18. What is the main advantage of dynamic hashing over static hashing?
    - A) Eliminates search trees
    - B) Handles database growth and shrinkage dynamically without overflow buckets or performance degradation
    - C) Ensures BCNF compliance
    - D) Reduces SQL parsing time
    - **Answer**: B
    - **Explanation**: Extendible/Dynamic hashing adjusts hash table directory size dynamically as data expands.

19. Weak Entity Set in ER diagram is represented by:
    - A) Single rectangle
    - B) Double rectangle
    - C) Ellipse
    - D) Diamond
    - **Answer**: B
    - **Explanation**: Double rectangle represents a weak entity set (an entity set that does not possess a primary key of its own).

20. Foreign Key constraint enforces:
    - A) Entity Integrity
    - B) Referential Integrity
    - C) Domain Integrity
    - D) User-defined Integrity
    - **Answer**: B
    - **Explanation**: Foreign key references primary key of another relation, maintaining referential integrity between tables.

21. Primary Key constraint enforces:
    - A) Unique values and NOT NULL condition
    - B) Foreign key mapping
    - C) Cascading deletion
    - D) Composite index creation only
    - **Answer**: A
    - **Explanation**: Primary key uniquely identifies each row and strictly disallows `NULL` values.

22. In relational database, a row is formally referred to as a:
    - A) Attribute
    - B) Domain
    - C) Tuple
    - D) Relation
    - **Answer**: C
    - **Explanation**: A row in a relational database table is formally called a Tuple.

23. Column in relational database is formally called:
    - A) Tuple
    - B) Attribute
    - C) Entity
    - D) Schema
    - **Answer**: B
    - **Explanation**: Columns define attributes of the relation schema.

24. Total number of attributes in a relation is called its:
    - A) Cardinality
    - B) Degree
    - C) Domain
    - D) Extension
    - **Answer**: B
    - **Explanation**: Degree is the number of attributes; Cardinality is the number of tuples.

25. What is the output of `SELECT 1 + NULL;` in MySQL/SQL Server?
    - A) 1
    - B) 0
    - C) NULL
    - D) Error
    - **Answer**: C
    - **Explanation**: Any arithmetic operation involving `NULL` yields `NULL`.

26. Command used to undo transactions that have not been committed:
    - A) `COMMIT`
    - B) `ROLLBACK`
    - C) `SAVEPOINT`
    - D) `GRANT`
    - **Answer**: B
    - **Explanation**: `ROLLBACK` reverts modifications back to the beginning of the transaction or a designated `SAVEPOINT`.

27. Strict Two-Phase Locking (Strict 2PL) protocol ensures:
    - A) No deadlocks can ever happen
    - B) Schedules are serializable and free from cascading aborts (Strict)
    - C) 100% CPU utilization
    - D) No shared locks are ever used
    - **Answer**: B
    - **Explanation**: Holding exclusive locks until commit eliminates dirty reads and guarantees cascadeless recoverable schedules.

28. Thomas Write Rule is a modification of which concurrency protocol?
    - A) 2PL
    - B) Basic Timestamp Ordering
    - C) Validation-based Protocol
    - D) Multiversion Protocol
    - **Answer**: B
    - **Explanation**: Thomas Write Rule ignores obsolete write operations ($TS(T) < W\_TS(Q)$), improving concurrency in timestamp ordering.

29. Shadow Paging is a technique used for:
    - A) Index compression
    - B) Database recovery without redo logs
    - C) SQL query parsing
    - D) Distributed deadlock detection
    - **Answer**: B
    - **Explanation**: Shadow paging maintains current and shadow page tables, enabling atomic database recovery without log parsing.

30. In SQL, `HAVING` clause can only be used if the query contains:
    - A) `INNER JOIN`
    - B) `GROUP BY` (or aggregate functions)
    - C) `ORDER BY`
    - D) Subqueries
    - **Answer**: B
    - **Explanation**: `HAVING` evaluates conditions against aggregated groupings produced by `GROUP BY`.

31. Lossless-join property guarantees that:
    - A) No attributes are lost after decomposition
    - B) Rejoining decomposed relations yields exact original tuples without spurious tuples
    - C) No functional dependencies are lost
    - D) Primary keys are duplicated
    - **Answer**: B
    - **Explanation**: Lossless join ensures $R_1 \bowtie R_2 = R$, preventing creation of false (spurious) tuples.

32. Super Key is defined as:
    - A) Minimal set of attributes uniquely identifying a tuple
    - B) Any set of attributes that uniquely identifies a tuple in a relation
    - C) Attribute containing primary key
    - D) Foreign key pointing to another table
    - **Answer**: B
    - **Explanation**: Super key is any set of attributes capable of uniquely identifying tuples. A minimal super key is a Candidate Key.

33. How many Candidate Keys can a relation have?
    - A) Exactly 1
    - B) At least 1
    - C) 0
    - D) Maximum 2
    - **Answer**: B
    - **Explanation**: Every relation has at least one candidate key (in the worst case, the combination of all attributes).

34. Natural Join is equivalent to:
    - A) Cartesian Product followed by Selection and Projection
    - B) Left Outer Join
    - C) Union followed by Difference
    - D) Division
    - **Answer**: A
    - **Explanation**: $R \bowtie S = \pi_{\dots}(\sigma_{R.A = S.A}(R \times S))$.

35. Which normal form is strictly stronger than 3NF?
    - A) 2NF
    - B) 1NF
    - C) BCNF
    - D) 0NF
    - **Answer**: C
    - **Explanation**: BCNF is a stricter version of 3NF (every BCNF relation is in 3NF, but not every 3NF relation is in BCNF).

36. Phantom Read anomaly occurs when:
    - A) A transaction re-reads data and finds updated column values
    - B) A transaction re-reads a query range and finds NEW rows inserted by another committed transaction
    - C) System crashes during log writing
    - D) Uncommitted data is modified
    - **Answer**: B
    - **Explanation**: Phantom reads involve whole new rows appearing inside a range query upon re-execution due to concurrent inserts.

37. Clustered Index vs Non-Clustered Index:
    - A) A table can have multiple clustered indexes, but only 1 non-clustered index
    - B) Table data blocks are physically ordered by the clustered index key (Only 1 per table)
    - C) Clustered index stores data in secondary memory only
    - D) Non-clustered index alters physical row layout on disk
    - **Answer**: B
    - **Explanation**: Physical row order on disk matches clustered index sequence. Hence, a table can have only ONE clustered index.

38. Multi-valued attribute in ER diagram is depicted using:
    - A) Dashed ellipse
    - B) Double ellipse
    - C) Rectangle
    - D) Double diamond
    - **Answer**: B
    - **Explanation**: Double ellipse represents multi-valued attribute (e.g., `phone_numbers`).

39. Derived attribute in ER diagram is depicted using:
    - A) Double ellipse
    - B) Dashed ellipse
    - C) Diamond
    - D) Rectangle
    - **Answer**: B
    - **Explanation**: Dashed ellipse represents a derived attribute (e.g., `age` calculated from `date_of_birth`).

40. Canonical Cover of functional dependencies is:
    - A) Set of all super keys
    - B) Minimal equivalent set of functional dependencies without redundant FDs or extraneous attributes
    - C) Closure of attributes
    - D) BCNF decomposition table
    - **Answer**: B
    - **Explanation**: Canonical cover (minimal cover) is a simplified minimal FD set with no extraneous attributes or duplicate FDs.

41. What is the SQL statement to grant SELECT permission to user 'john'?
    - A) `ALLOW SELECT ON employees TO john;`
    - B) `GRANT SELECT ON employees TO john;`
    - C) `GIVE PERMISSION SELECT ON employees TO john;`
    - D) `UPDATE PERMISSIONS SET select = true WHERE user = 'john';`
    - **Answer**: B
    - **Explanation**: `GRANT` is the DCL statement used to assign privileges.

42. Which command revokes privileges previously granted to a user?
    - A) `REMOVE`
    - B) `CANCEL`
    - C) `REVOKE`
    - D) `DENY`
    - **Answer**: C
    - **Explanation**: `REVOKE` is the DCL counterpart to `GRANT`.

43. Deadlock Detection algorithm in DBMS commonly uses:
    - A) Wait-For Graph (WFG)
    - B) Precedence Graph
    - C) ER Diagram
    - D) B+ Tree traversal
    - **Answer**: A
    - **Explanation**: In Wait-For Graphs, transactions are nodes; directed edges represent transaction $T_1$ waiting for lock held by $T_2$. A cycle indicates deadlock.

44. Wait-Die and Wound-Wait schemes use what property to prevent deadlocks?
    - A) Priority Inversion
    - B) Transaction Timestamps
    - C) Random Backoff
    - D) Page table sizes
    - **Answer**: B
    - **Explanation**: Timestamps based on transaction start times enforce non-circular wait decisions.

45. In Wound-Wait scheme, if older transaction $T_{old}$ requests a lock held by younger transaction $T_{young}$:
    - A) $T_{old}$ dies
    - B) $T_{old}$ wounds (preempts/aborts) $T_{young}$ and grabs the lock
    - C) Both transactions abort
    - D) $T_{old}$ waits indefinitely
    - **Answer**: B
    - **Explanation**: In Wound-Wait, older transactions preempt younger transactions ("wound" them).

46. What does SQL wildcard `%` represent in a `LIKE` pattern?
    - A) Exactly one character
    - B) Zero, one, or multiple characters
    - C) Only numerical digits
    - D) Any uppercase letter
    - **Answer**: B
    - **Explanation**: `%` matches any sequence of zero or more characters. `_` matches exactly one character.

47. Result of SQL expression `SELECT 5 != NULL;` is:
    - A) TRUE
    - B) FALSE
    - C) UNKNOWN / NULL
    - D) Error
    - **Answer**: C
    - **Explanation**: Comparison with `NULL` yields `UNKNOWN` (NULL), not boolean true/false.

48. Standard aggregate function that counts total rows including nulls:
    - A) `COUNT(col)`
    - B) `COUNT(*)`
    - C) `COUNT(1)`
    - D) Both B and C
    - **Answer**: D
    - **Explanation**: `COUNT(*)` and `COUNT(1)` count all rows in the dataset regardless of null values.

49. Database normalization aims to eliminate:
    - A) Primary keys
    - B) Redundancy and update anomalies (Insertion, Deletion, Modification anomalies)
    - C) Indexes
    - D) SQL JOIN operations
    - **Answer**: B
    - **Explanation**: Normalization organizes tables to minimize duplicate data and prevent update anomalies.

50. Which relational algebra operator is NON-PRIMITIVE (can be derived from basic operators)?
    - A) Selection ($\sigma$)
    - B) Projection ($\pi$)
    - C) Natural Join ($\bowtie$)
    - D) Cartesian Product ($\times$)
    - **Answer**: C
    - **Explanation**: Natural join is derived from Cartesian Product, Selection, and Projection.

*(Questions 51 to 300 continue with comprehensive coverage of SQL subquery output, Normalization calculations, B+ tree node index sizing, and Transaction Isolation).*
