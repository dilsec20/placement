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

51. Given relation $R(A, B, C, D, E)$ with FDs $\{A \rightarrow B, B \rightarrow C, C \rightarrow D, D \rightarrow E\}$. What is the total number of Super Keys for $R$?
   - A) 1
   - B) 16
   - C) 8
   - D) 32
   - **Answer**: B
   - **Explanation**: $A^+ = \{A, B, C, D, E\}$, so $A$ is the candidate key. Any set containing $A$ is a super key. Since $A$ must be present and the remaining 4 attributes $\{B, C, D, E\}$ can either be present or absent, total super keys = $2^4 = 16$.

52. Relation $R(A, B, C, D)$ has FDs $\{AB \rightarrow C, C \rightarrow D, D \rightarrow A\}$. What are all the Candidate Keys of $R$?
   - A) $\{AB\}$ only
   - B) $\{AB, BC, BD\}$
   - C) $\{AB, BC\}$ only
   - D) $\{AB, CD\}$
   - **Answer**: B
   - **Explanation**: $(AB)^+ = ABCD$, $(BC)^+ = BCDA$, $(BD)^+ = BDAC$. Thus $AB$, $BC$, and $BD$ are all minimal super keys (candidate keys).

53. If a relation $R(A, B, C)$ is decomposed into $R_1(A, B)$ and $R_2(B, C)$, under which FD condition is this decomposition guaranteed to be Lossless?
   - A) $A \rightarrow B$
   - B) $B \rightarrow A$ or $B \rightarrow C$
   - C) $C \rightarrow A$
   - D) $A \rightarrow C$
   - **Answer**: B
   - **Explanation**: $R_1 \cap R_2 = \{B\}$. For a lossless decomposition, the common attribute $B$ must be a super key for at least one decomposed relation ($B \rightarrow A$ or $B \rightarrow C$).

54. Relation $R(A, B, C, D)$ with FDs $\{A \rightarrow B, B \rightarrow C, C \rightarrow D, D \rightarrow A\}$ is in which highest Normal Form?
   - A) 1NF
   - B) 2NF
   - C) 3NF
   - D) BCNF
   - **Answer**: D
   - **Explanation**: Candidate keys are $A, B, C, D$. Every attribute is prime. For every FD $X \rightarrow Y$, the left-hand side $X$ is a candidate key. Hence it satisfies BCNF.

55. In 3NF decomposition, which property is ALWAYS preserved, but might NOT be preserved in BCNF decomposition?
   - A) Lossless Join
   - B) Dependency Preservation
   - C) Minimality of Candidate Keys
   - D) Referential Integrity
   - **Answer**: B
   - **Explanation**: 3NF decomposition can always achieve both Lossless Join and Dependency Preservation. BCNF decomposition guarantees Lossless Join, but dependency preservation may be lost.

56. Given relation $R(A, B, C)$ with FD set $F = \{A \rightarrow B, B \rightarrow C\}$. What is the Canonical Cover (Minimal Cover) of $F$?
   - A) $\{A \rightarrow B, B \rightarrow C, A \rightarrow C\}$
   - B) $\{A \rightarrow B, B \rightarrow C\}$
   - C) $\{A \rightarrow C, B \rightarrow C\}$
   - D) $\{A \rightarrow B\}$
   - **Answer**: B
   - **Explanation**: $A \rightarrow C$ is transitive and redundant. The minimal cover removes redundant FDs, giving $\{A \rightarrow B, B \rightarrow C\}$.

57. A prime attribute is defined as an attribute that:
   - A) Is part of the primary key only
   - B) Is part of ANY candidate key of the relation
   - C) Uniquely identifies a row on its own
   - D) Cannot be NULL
   - **Answer**: B
   - **Explanation**: A prime attribute is any attribute that belongs to at least one candidate key of the relation.

58. What normal form violation occurs when a non-prime attribute depends on a proper subset of a candidate key?
   - A) Transitive Dependency (violates 3NF)
   - B) Partial Dependency (violates 2NF)
   - C) Multi-valued Dependency (violates 4NF)
   - D) Overlapping Candidate Key violation (violates BCNF)
   - **Answer**: B
   - **Explanation**: Partial dependency occurs when a non-prime attribute is functionally dependent on a proper subset of a composite candidate key, which violates 2NF.

59. Relation $R(A, B, C, D, E)$ has FDs $\{AB \rightarrow C, C \rightarrow D, D \rightarrow E\}$. What is the highest normal form of $R$?
   - A) 1NF
   - B) 2NF
   - C) 3NF
   - D) BCNF
   - **Answer**: A
   - **Explanation**: Candidate key is $AB$. Prime attributes: $A, B$. Non-prime attributes: $C, D, E$. In $C \rightarrow D$, $C$ is a proper subset of no key, but $C$ is non-prime and $C \rightarrow D$ represents a transitive dependency. Moreover, is there partial dependency? No, because $C$ is not a proper subset of $AB$. However, $C \rightarrow D$ violates 3NF (neither $C$ superkey nor $D$ prime). Wait! $AB \rightarrow C$ is fine. Is $R$ in 2NF? Candidate key is $AB$. No non-prime depends on $A$ alone or $B$ alone. So 2NF is satisfied! But $C \rightarrow D$ has non-prime $C \rightarrow$ non-prime $D$, violating 3NF. Thus highest NF is 2NF!
   *(Correction check: Candidate key $AB$. No FD has left side $A$ or $B$ alone, so 2NF holds. $C \rightarrow D$ violates 3NF. Highest NF = 2NF).*
   - **Answer**: B
   - **Explanation**: $AB$ is the candidate key. No non-prime attribute depends on a proper subset of $AB$ (so 2NF holds). $C \rightarrow D$ has a non-prime LHS and non-prime RHS, causing a transitive dependency which violates 3NF.

60. For a relation with $n$ attributes, what is the maximum possible number of candidate keys?
   - A) $n$
   - B) $2^n$
   - C) $\binom{n}{\lfloor n/2 \rfloor}$
   - D) $n!$
   - **Answer**: C
   - **Explanation**: Sperner's Theorem states that the maximum number of minimal keys (candidate keys) in a relation with $n$ attributes is $\binom{n}{\lfloor n/2 \rfloor}$.

61. Given $R(A, B, C)$ with $F = \{A \rightarrow B, B \rightarrow A\}$. Which of the following is true?
   - A) $R$ is in BCNF
   - B) $R$ is in 3NF but not BCNF
   - C) $R$ is in 2NF but not 3NF
   - D) $R$ is in 1NF only
   - **Answer**: A
   - **Explanation**: Candidate keys are $A$ and $B$. $C$ is non-prime. In both $A \rightarrow B$ and $B \rightarrow A$, the left-hand side is a candidate key (super key). Thus $R$ satisfies BCNF.

62. What is an extraneous attribute in a functional dependency $X \rightarrow Y$?
   - A) An attribute in $X$ or $Y$ that can be removed without changing the closure of $F$
   - B) An attribute that is NULL
   - C) A foreign key attribute
   - D) An attribute not present in the relation
   - **Answer**: A
   - **Explanation**: An attribute is extraneous if removing it from an FD yields an equivalent set of functional dependencies.

63. Which condition guarantees that a 3NF relation is also in BCNF?
   - A) The relation has only one candidate key
   - B) All candidate keys are simple (consist of a single attribute) and no candidate keys overlap
   - C) Every candidate key consists of all attributes
   - D) All of the above
   - **Answer**: D
   - **Explanation**: If candidate keys do not overlap or every key is a single attribute without key-to-key partial dependencies, 3NF coincides with BCNF.

64. What is the minimal number of tables needed to represent a relation in 3NF decomposed from $R(A, B, C, D)$ with FDs $\{A \rightarrow B, B \rightarrow C, C \rightarrow D\}$?
   - A) 1
   - B) 2
   - C) 3
   - D) 4
   - **Answer**: C
   - **Explanation**: Bernstein's 3NF synthesis algorithm yields 3 relations: $R_1(A, B)$, $R_2(B, C)$, and $R_3(C, D)$ to preserve all FDs and ensure 3NF.

65. Insertion anomaly occurs when:
   - A) Inserting a record requires adding dummy/null data for unrelated attributes because a primary key is missing
   - B) Updating a record leaves inconsistent duplicate rows
   - C) Deleting one fact unintentionally deletes another unrelated fact
   - D) A foreign key constraint fails
   - **Answer**: A
   - **Explanation**: Insertion anomaly happens when facts cannot be recorded without introducing invalid NULLs for primary key components.

66. Deletion anomaly occurs when:
   - A) Deleting a record causes unintended loss of other independent data facts
   - B) Deleting a row takes too long due to indexes
   - C) A row cannot be deleted due to locking
   - D) Duplicate rows are deleted
   - **Answer**: A
   - **Explanation**: Deletion anomaly is the unintentional loss of data when deleting a tuple causes attributes describing another entity to be erased.

67. In Fourth Normal Form (4NF), what type of dependency is eliminated?
   - A) Partial Dependencies
   - B) Transitive Dependencies
   - C) Multi-valued Dependencies (MVDs)
   - D) Join Dependencies
   - **Answer**: C
   - **Explanation**: 4NF requires that for every non-trivial multi-valued dependency $X \twoheadrightarrow Y$, $X$ must be a super key.

68. Fifth Normal Form (5NF / Project-Join Normal Form) deals with:
   - A) Multi-valued Dependencies
   - B) Join Dependencies
   - C) Transitive Dependencies
   - D) Domain-Key constraints
   - **Answer**: B
   - **Explanation**: 5NF guarantees that a relation cannot be non-trivially decomposed into smaller relations and rejoined without losing data or producing spurious tuples.

69. Given $R(A, B, C, D)$ with FDs $\{A \rightarrow B, C \rightarrow D\}$. What is the candidate key of $R$?
   - A) $\{A, C\}$
   - B) $\{A, B\}$
   - C) $\{C, D\}$
   - D) $\{A, B, C, D\}$
   - **Answer**: A
   - **Explanation**: $(AC)^+ = ABCD$. Neither $A$ nor $C$ alone can derive the other. Thus $AC$ is the minimal super key.

70. If $F = \{A \rightarrow B, B \rightarrow C\}$, which of the following is logically implied by Armstrong's Axioms?
   - A) $A \rightarrow C$ (Transitivity)
   - B) $AC \rightarrow BC$ (Augmentation)
   - C) $A \rightarrow AB$ (Reflexivity & Augmentation)
   - D) All of the above
   - **Answer**: D
   - **Explanation**: Armstrong's axioms include Reflexivity, Augmentation, and Transitivity, which collectively imply all three rules.

71. Armstrong's Axiom: If $X \subseteq Y$, then $Y \rightarrow X$. This rule is called:
   - A) Augmentation
   - B) Transitivity
   - C) Reflexivity
   - D) Decomposition
   - **Answer**: C
   - **Explanation**: Reflexivity rule states that if $Y$ includes $X$, then $Y$ functionally determines $X$.

72. Armstrong's Axiom: If $X \rightarrow Y$, then $XZ \rightarrow YZ$. This rule is called:
   - A) Transitivity
   - B) Augmentation
   - C) Union
   - D) Pseudo-transitivity
   - **Answer**: B
   - **Explanation**: Augmentation rule states that adding attribute set $Z$ to both sides preserves functional dependency.

73. If $X \rightarrow Y$ and $WY \rightarrow Z$, then $WX \rightarrow Z$. This derived inference rule is known as:
   - A) Decomposition
   - B) Pseudo-transitivity
   - C) Union
   - D) Composition
   - **Answer**: B
   - **Explanation**: Pseudo-transitivity combines $X \rightarrow Y$ and $WY \rightarrow Z$ to yield $WX \rightarrow Z$.

74. The closure of an attribute set $X$ under $F$ is denoted as $X^+$. If $X^+ = R$, then $X$ is a:
   - A) Prime attribute
   - B) Super Key
   - C) Foreign Key
   - D) Canonical Cover
   - **Answer**: B
   - **Explanation**: Any attribute set whose closure contains all attributes of relation $R$ is by definition a Super Key.

75. A Candidate Key is a:
   - A) Maximal Super Key
   - B) Minimal Super Key (no proper subset is a super key)
   - C) Foreign Key with UNIQUE constraint
   - D) Primary key with NULL values
   - **Answer**: B
   - **Explanation**: A candidate key is a minimal super key; removing any attribute from it breaks its ability to uniquely identify tuples.

76. If a relation $R(A, B, C)$ has NO functional dependencies other than trivial ones, what is its candidate key and normal form?
   - A) Candidate Key: $\{A, B, C\}$, Normal Form: BCNF
   - B) Candidate Key: $\{A\}$, Normal Form: 1NF
   - C) Candidate Key: None, Normal Form: 0NF
   - D) Candidate Key: $\{A, B\}$, Normal Form: 3NF
   - **Answer**: A
   - **Explanation**: Without non-trivial FDs, the only key that determines all attributes is the full set $\{A, B, C\}$. Since there are no non-trivial FDs $X \rightarrow Y$, BCNF conditions are vacuously satisfied!

77. Which of the following functional dependencies is TRIVIAL?
   - A) $A \rightarrow B$
   - B) $AB \rightarrow A$
   - C) $A \rightarrow BC$
   - D) $B \rightarrow C$
   - **Answer**: B
   - **Explanation**: A functional dependency $X \rightarrow Y$ is trivial if $Y \subseteq X$. Here $A \subseteq AB$.

78. Decomposing $R(A, B, C, D)$ into $R_1(A, B, C)$ and $R_2(C, D)$ with FD $C \rightarrow D$ is:
   - A) Lossy and non-dependency preserving
   - B) Lossless and dependency preserving
   - C) Lossy but dependency preserving
   - D) Lossless but non-dependency preserving
   - **Answer**: B
   - **Explanation**: Common attribute $R_1 \cap R_2 = \{C\}$. Since $C \rightarrow D$, $C$ is a key for $R_2$, guaranteeing a Lossless Join. All FDs are preserved in $R_1$ or $R_2$.

79. Spurious tuples are created when joining decomposed tables if the decomposition is:
   - A) Lossless
   - B) Lossy (Non-lossless)
   - C) Dependency Preserving
   - D) In BCNF
   - **Answer**: B
   - **Explanation**: Lossy decomposition loses the structural integrity of relationships, generating extra false (spurious) tuples upon rejoining.

80. Relation $R(A, B, C, D)$ has $F = \{A \rightarrow B, B \rightarrow C, C \rightarrow A\}$. Is $R$ in BCNF?
   - A) Yes, because $A, B, C$ are all candidate keys and $D$ is prime
   - B) No, because attribute $D$ is not functionally determined by $A, B$, or $C$
   - C) Yes, because it is in 3NF
   - D) No, because $C \rightarrow A$ is partial
   - **Answer**: B
   - **Explanation**: Candidate keys must include $D$ because $D$ does not appear on the RHS of any FD. So candidate keys are $AD, BD, CD$. In $A \rightarrow B$, $A$ is NOT a super key (since $A^+ = ABC \neq ABCD$). Thus $A \rightarrow B$ violates BCNF!

81. In a relation schema $R(A, B, C, D)$, if $A \rightarrow B$ and $A \rightarrow C$, then $A \rightarrow BC$ follows by:
   - A) Decomposition Rule
   - B) Union Rule
   - C) Pseudo-transitivity Rule
   - D) Reflexivity Rule
   - **Answer**: B
   - **Explanation**: The Union Rule states that if $X \rightarrow Y$ and $X \rightarrow Z$, then $X \rightarrow YZ$.

82. In a relation schema $R(A, B, C, D)$, if $A \rightarrow BC$, then $A \rightarrow B$ and $A \rightarrow C$ follow by:
   - A) Decomposition Rule
   - B) Augmentation Rule
   - C) Transitivity Rule
   - D) Composition Rule
   - **Answer**: A
   - **Explanation**: The Decomposition Rule states that if $X \rightarrow YZ$, then $X \rightarrow Y$ and $X \rightarrow Z$.

83. What is the relation between 3NF and BCNF?
   - A) Every BCNF relation is in 3NF
   - B) Every 3NF relation is in BCNF
   - C) 3NF and BCNF are mutually exclusive
   - D) BCNF allows transitive dependencies while 3NF does not
   - **Answer**: A
   - **Explanation**: BCNF is stricter than 3NF. Therefore, BCNF $\subset$ 3NF (every BCNF relation is in 3NF).

84. Multi-valued dependency $X \twoheadrightarrow Y$ means:
   - A) $X$ determines a single value of $Y$
   - B) For a given value of $X$, the set of values of $Y$ is completely independent of the values of the remaining attributes
   - C) $X$ and $Y$ are candidate keys
   - D) $Y$ is a subset of $X$
   - **Answer**: B
   - **Explanation**: MVD $X \twoheadrightarrow Y$ specifies that the presence of tuple components for $Y$ depends only on $X$ and is independent of other attributes in $R$.

85. Boyced-Codd Normal Form (BCNF) was introduced to handle anomalies caused by:
   - A) Partial dependencies
   - B) Transitive dependencies
   - C) Multiple overlapping candidate keys
   - D) Foreign key constraints
   - **Answer**: C
   - **Explanation**: 3NF allows $X \rightarrow Y$ if $Y$ is prime even when $X$ is not a super key. BCNF tightens this to eliminate anomalies when candidate keys overlap.

86. For relation $R(A, B, C, D, E)$ with FDs $\{A \rightarrow BC, CD \rightarrow E, B \rightarrow D, E \rightarrow A\}$. What is $(A)^+$?
   - A) $\{A, B, C\}$
   - B) $\{A, B, C, D, E\}$
   - C) $\{A, D, E\}$
   - D) $\{A, B, D\}$
   - **Answer**: B
   - **Explanation**: Start with $A$. $A \rightarrow BC \implies \{A,B,C\}$. $B \rightarrow D \implies \{A,B,C,D\}$. $CD \rightarrow E \implies \{A,B,C,D,E\}$. Thus $A^+ = ABCDE$.

87. Which normal form is based on the concept of Full Functional Dependency?
   - A) 1NF
   - B) 2NF
   - C) 3NF
   - D) 4NF
   - **Answer**: B
   - **Explanation**: 2NF requires every non-prime attribute to be fully functionally dependent on primary/candidate keys (no partial dependencies).

88. If $R(A, B)$ has 10 tuples and $S(C, D)$ has 5 tuples, how many tuples does $R \bowtie S$ (Natural Join with no common attributes) contain?
   - A) 10
   - B) 5
   - C) 50
   - D) 0
   - **Answer**: C
   - **Explanation**: Natural join on relations with no common attributes reduces to the Cartesian Product ($10 \times 5 = 50$).

89. Minimum and Maximum number of tables resulting from mapping a Binary 1:N Relationship in ER diagram to Relational Model (assuming total participation on N side):
   - A) 1 min, 2 max
   - B) 2 min, 2 max
   - C) 2 min, 3 max
   - D) 3 min, 3 max
   - **Answer**: B
   - **Explanation**: The 1:N relationship can be merged into the N-side table as a foreign key. Thus, exactly 2 tables are needed (one for 1-side, one for N-side).

90. Minimal cover algorithm step order:
   - A) 1. Right-hand side single attribute simplification 2. Remove extraneous LHS attributes 3. Remove redundant FDs
   - B) 1. Remove redundant FDs 2. Right-hand side simplification
   - C) 1. Remove extraneous LHS 2. Right-hand side simplification
   - D) 1. Convert to 3NF 2. Find keys
   - **Answer**: A
   - **Explanation**: Standard minimal cover procedure splits RHS into single attributes, removes extraneous LHS attributes using closure, and then eliminates redundant FDs.

---

### CATEGORY B: Relational Algebra & Calculus (Q91 - Q120)

91. Which relational algebra operator is equivalent to the SQL clause `SELECT DISTINCT`?
   - A) Selection ($\sigma$)
   - B) Projection ($\pi$)
   - C) Join ($\bowtie$)
   - D) Cartesian Product ($\times$)
   - **Answer**: B
   - **Explanation**: Projection ($\pi$) in pure relational algebra automatically removes duplicate tuples from the output relation.

92. The relational algebra expression $R \div S$ (Division) is used to answer queries involving:
   - A) "At least one"
   - B) "For all" or "Every"
   - C) "None of"
   - D) "Between"
   - **Answer**: B
   - **Explanation**: Division $R \div S$ returns tuples in $R$ that are associated with ALL tuples in $S$.

93. Which pair of relational algebra operators are COMMUTATIVE?
   - A) Set Difference ($R - S$)
   - B) Selection ($\sigma_{p1}(\sigma_{p2}(R))$)
   - C) Cartesian Product ($R \times S$)
   - D) Both B and C
   - **Answer**: D
   - **Explanation**: Selection operations commute ($\sigma_{p1}(\sigma_{p2}(R)) = \sigma_{p2}(\sigma_{p1}(R))$) and Cartesian product is commutative up to column reordering.

94. What is the fundamental difference between Tuple Relational Calculus (TRC) and Domain Relational Calculus (DRC)?
   - A) TRC variables range over tuples; DRC variables range over domain values (attributes)
   - B) TRC is procedural; DRC is non-procedural
   - C) TRC supports aggregation; DRC does not
   - D) TRC is SQL; DRC is Relational Algebra
   - **Answer**: A
   - **Explanation**: TRC uses tuple variables $\{t \mid P(t)\}$, whereas DRC uses attribute/domain variables $\{ \langle x_1, x_2, \dots \rangle \mid P(x_1, x_2, \dots) \}$.

95. A relational calculus expression is said to be UNSAFE if:
   - A) It contains syntax errors
   - B) It yields an INFINITE relation as its result
   - C) It contains nested subqueries
   - D) It uses outer joins
   - **Answer**: B
   - **Explanation**: An unsafe expression (e.g., $\{ t \mid \neg (t \in R) \}$) can evaluate to infinitely many tuples not present in the database domain.

96. Which relational algebra operations form a COMPLETE set (all other operations can be derived from them)?
   - A) $\{\sigma, \pi, \cup, -, \times\}$
   - B) $\{\bowtie, \sigma, \pi\}$
   - C) $\{\cap, \cup, -, \times\}$
   - D) $\{\sigma, \pi, \div, \cup\}$
   - **Answer**: A
   - **Explanation**: Selection, Projection, Union, Set Difference, and Cartesian Product form the core primitive set capable of expressing all relational algebra queries.

97. Expressing Intersection $R \cap S$ using primitive relational algebra operators gives:
   - A) $R - (R - S)$
   - B) $(R \cup S) - R$
   - C) $R \times S$
   - D) $\sigma_{R=S}(R \cup S)$
   - **Answer**: A
   - **Explanation**: $R - (R - S)$ subtracts tuples in $R$ that are NOT in $S$, leaving only tuples present in both $R$ and $S$.

98. Theta Join ($R \bowtie_\theta S$) is equivalent to:
   - A) $\sigma_\theta(R \times S)$
   - B) $\pi_\theta(R \times S)$
   - C) $(R - S) \cup \theta$
   - D) $R \div S$
   - **Answer**: A
   - **Explanation**: Theta join is defined as a Cartesian Product followed by a Selection operation with predicate $\theta$.

99. In Relational Algebra, what does the rename operator ($\rho$) do?
   - A) Renames tables and attributes in relation schemas
   - B) Changes data types of columns
   - C) Deletes columns
   - D) Updates row contents
   - **Answer**: A
   - **Explanation**: Rename operator $\rho_{S(A_1, A_2, \dots)}(E)$ gives expression $E$ a new name $S$ and renames attributes to $A_1, A_2, \dots$.

100. If relation $R$ has 8 tuples and relation $S$ has 0 tuples, how many tuples are in $R \text{ LEFT OUTER JOIN } S$?
    - A) 0
    - B) 8
    - C) 4
    - D) Error
    - **Answer**: B
    - **Explanation**: LEFT OUTER JOIN preserves all rows from the left relation $R$, padding right side attributes with NULL when no match exists.

101. Domain Relational Calculus (DRC) query syntax: $\{ \langle p, q \rangle \mid \exists r (\langle p, q, r \rangle \in R) \}$. What does this represent in Relational Algebra?
    - A) $\sigma_{r}(R)$
    - B) $\pi_{p, q}(R)$
    - C) $R \div S$
    - D) $R \times S$
    - **Answer**: B
    - **Explanation**: Projecting attributes $p, q$ while existential quantifier $\exists r$ projects out $r$ corresponds to Projection $\pi_{p, q}(R)$.

102. What is the relation between Relational Algebra, Safe TRC, and Safe DRC in terms of expressive power?
    - A) Relational Algebra > Safe TRC > Safe DRC
    - B) They are EQUIVALENT in expressive power (Codd's Theorem)
    - C) Safe TRC > Relational Algebra
    - D) Safe DRC > Relational Algebra
    - **Answer**: B
    - **Explanation**: Codd's Theorem proves that basic Relational Algebra, Safe TRC, and Safe DRC are logically equivalent in expressive power.

103. Given $R(A, B)$ and $S(B, C)$. $R \bowtie S$ yields how many attributes?
    - A) 4
    - B) 3
    - C) 2
    - D) 5
    - **Answer**: B
    - **Explanation**: Common attribute $B$ is merged once. Attributes in output = $A, B, C$ (3 attributes).

104. Which operator is used for grouping and aggregation in extended relational algebra?
    - A) $\sigma$
    - B) $\gamma$ (Gamma)
    - C) $\pi$
    - D) $\rho$
    - **Answer**: B
    - **Explanation**: The Aggregate/Grouping operator is denoted by $\gamma_{G_1, G_2, \dots, F_1(A_1), \dots}(E)$.

105. What is the result of set difference operation $R - S$ if $R$ and $S$ have no common tuples?
    - A) Empty Set ($\emptyset$)
    - B) Relation $R$
    - C) Relation $S$
    - D) $R \cup S$
    - **Answer**: B
    - **Explanation**: If no tuples in $R$ exist in $S$, subtracting $S$ removes nothing, leaving relation $R$.

106. In Tuple Relational Calculus, $\forall t \in R (P(t))$ is equivalent to:
    - A) $\neg \exists t \in R (\neg P(t))$
    - B) $\exists t \in R (P(t))$
    - C) $\neg \exists t \in R (P(t))$
    - D) $\forall t \in R (\neg P(t))$
    - **Answer**: A
    - **Explanation**: De Morgan's laws for quantifiers state that "For all $t$, $P(t)$" is logically equivalent to "There does NOT exist $t$ where NOT $P(t)$".

107. Which relational algebra operator corresponds to INNER JOIN with equality condition on common columns?
    - A) Natural Join ($\bowtie$)
    - B) Semi Join ($\ltimes$)
    - C) Anti Join ($\triangleright$)
    - D) Division ($\div$)
    - **Answer**: A
    - **Explanation**: Natural join automatically joins relations on all attributes sharing identical names using equality conditions.

108. Semi-join operation $R \ltimes S$ is defined as:
    - A) $\pi_{\text{attrs}(R)}(R \bowtie S)$
    - B) $R \times S$
    - C) $R - S$
    - D) $\pi_{\text{attrs}(S)}(R \bowtie S)$
    - **Answer**: A
    - **Explanation**: Left semi-join $R \ltimes S$ returns tuples of $R$ that participate in the natural join $R \bowtie S$, projecting only attributes of $R$.

109. Anti-join operation $R \triangleright S$ returns:
    - A) Tuples in $R$ that HAVE matching tuples in $S$
    - B) Tuples in $R$ that DO NOT have any matching tuples in $S$
    - C) All tuples of $S$
    - D) Empty relation
    - **Answer**: B
    - **Explanation**: Anti-join returns rows from $R$ for which NO matching join tuple exists in $S$.

110. Which SQL predicate implements Anti-join?
    - A) `WHERE EXISTS (...)`
    - B) `WHERE NOT EXISTS (...)` or `LEFT JOIN ... WHERE right.id IS NULL`
    - C) `WHERE IN (...)`
    - D) `WHERE UNIQUE (...)`
    - **Answer**: B
    - **Explanation**: `NOT EXISTS` or `LEFT JOIN` filtering on `NULL` matches the definition of Anti-join.

111. Natural join $R \bowtie S$ can produce an empty result (0 tuples) if:
    - A) $R$ and $S$ have no common attribute values in matching columns
    - B) Either $R$ or $S$ is empty
    - C) Both A and B
    - D) Never
    - **Answer**: C
    - **Explanation**: If common attribute values do not overlap or if one table contains 0 rows, the natural join returns 0 tuples.

112. Let degree of $R$ be 4 and degree of $S$ be 3. What is the degree of $R \times S$?
    - A) 12
    - B) 7
    - C) 1
    - D) 4
    - **Answer**: B
    - **Explanation**: Degree is attribute count: $4 + 3 = 7$.

113. Relational completeness means a language can express any query that can be expressed in:
    - A) Basic SQL
    - B) Relational Algebra
    - C) Python
    - D) C++
    - **Answer**: B
    - **Explanation**: A database query language is relationally complete if it is at least as powerful as basic Relational Algebra.

114. How to write "Find names of suppliers who supply EVERY part" in Relational Algebra?
    - A) $\pi_{\text{sname}}(S \bowtie (\pi_{\text{sid, pid}}(SP) \div \pi_{\text{pid}}(P)))$
    - B) $\pi_{\text{sname}}(S \times P)$
    - C) $\sigma_{\text{pid}}(S \bowtie P)$
    - D) $\pi_{\text{sname}}(S - P)$
    - **Answer**: A
    - **Explanation**: Division $(\pi_{\text{sid, pid}}(SP) \div \pi_{\text{pid}}(P))$ finds `sid` of suppliers supplying all `pid`s, then joins with $S$ to retrieve supplier names.

115. In Relational Algebra, is Selection ($\sigma$) projection-lossless?
    - A) Yes, it filters rows without dropping columns
    - B) No, it removes columns
    - C) It depends on predicate $p$
    - D) Selection is not an operator
    - **Answer**: A
    - **Explanation**: Selection operates on horizontal subsets (rows) and retains all original schema columns.

116. Equi-join is a special case of Theta Join where the condition contains:
    - A) Only equality ($=$) comparison operators
    - B) Less than ($<$) operators
    - C) `LIKE` wildcards
    - D) `NOT EQUAL` operators
    - **Answer**: A
    - **Explanation**: Equi-join uses strictly equality comparison operators ($=$) between attributes.

117. How does Natural Join differ from Equi-join?
    - A) Natural join automatically drops duplicate join attributes, whereas Equi-join retains both join columns
    - B) Natural join allows `<` comparison
    - C) Equi-join drops duplicate columns
    - D) They are identical in all aspects
    - **Answer**: A
    - **Explanation**: Natural join projects out duplicate common attribute columns, whereas Equi-join keeps all attributes from both tables.

118. Union operation $R \cup S$ on relations with 5 tuples each yields a minimum of how many tuples?
    - A) 0
    - B) 5 (when $R$ and $S$ are identical)
    - C) 10
    - D) 25
    - **Answer**: B
    - **Explanation**: If $R$ and $S$ contain the exact same 5 tuples, set union eliminates duplicates, returning 5 tuples.

119. Union operation $R \cup S$ on relations with 5 tuples each yields a maximum of how many tuples?
    - A) 5
    - B) 10 (when $R$ and $S$ share no common tuples)
    - C) 25
    - D) 0
    - **Answer**: B
    - **Explanation**: If all tuples in $R$ and $S$ are distinct, total tuples = $5 + 5 = 10$.

120. Which of the following operations is NOT monotonic in relational algebra?
    - A) Selection
    - B) Projection
    - C) Set Difference ($-$)
    - D) Union
    - **Answer**: C
    - **Explanation**: An operator is monotonic if adding tuples to input relations never shrinks the output. Set Difference $R - S$ shrinks if tuples are added to $S$, so it is non-monotonic.

---

### CATEGORY C: Advanced SQL Queries, Joins, Window Functions & Output Mechanics (Q121 - Q180)

121. What is the output of the query: `SELECT 1 WHERE NULL NOT IN (1, 2, NULL);`?
    - A) 1
    - B) NULL
    - C) No rows returned (Empty result set)
    - D) Error
    - **Answer**: C
    - **Explanation**: `NULL NOT IN (1, 2, NULL)` evaluates to `UNKNOWN`. In a `WHERE` clause, `UNKNOWN` filters out the row, returning 0 rows.

122. What does `SELECT COUNT(DISTINCT col) FROM Table` return if `col` contains values `{10, 10, 20, NULL, NULL}`?
    - A) 5
    - B) 3
    - C) 2
    - D) NULL
    - **Answer**: C
    - **Explanation**: Distinct non-null values are `10` and `20`. `COUNT(DISTINCT col)` ignores `NULL`s, yielding 2.

123. What is the output of `SELECT COALESCE(NULL, NULL, 'Virtusa', 'Placement');`?
    - A) NULL
    - B) Virtusa
    - C) Placement
    - D) Error
    - **Answer**: B
    - **Explanation**: `COALESCE()` returns the FIRST non-NULL argument from left to right, which is `'Virtusa'`.

124. Difference between `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()` for scores `{100, 90, 90, 80}`:
    - A) ROW_NUMBER: 1,2,3,4 | RANK: 1,2,2,4 | DENSE_RANK: 1,2,2,3
    - B) ROW_NUMBER: 1,2,2,3 | RANK: 1,2,3,4 | DENSE_RANK: 1,2,2,4
    - C) All three output 1,2,3,4
    - D) RANK leaves no gaps; DENSE_RANK leaves gaps
    - **Answer**: A
    - **Explanation**: `ROW_NUMBER` gives sequential numbers (1,2,3,4). `RANK` skips ranks after ties (1,2,2,4). `DENSE_RANK` assigns sequential ranks without gaps (1,2,2,3).

125. SQL query to update table values: `UPDATE Emp SET salary = salary * 1.1 WHERE dept = 'IT';`. What lock is acquired in InnoDB under default Isolation?
    - A) Shared (S) lock on table
    - B) Exclusive (X) record/gap locks on matching IT department rows
    - C) Intent Shared (IS) lock on rows
    - D) No lock acquired
    - **Answer**: B
    - **Explanation**: `UPDATE` acquires Exclusive (X) locks on matching index records to prevent concurrent modifications.

126. Which window function retrieves the value from a row 2 positions behind the current row in a partition?
    - A) `LEAD(col, 2)`
    - B) `LAG(col, 2)`
    - C) `FIRST_VALUE(col)`
    - D) `NTILE(2)`
    - **Answer**: B
    - **Explanation**: `LAG(col, offset)` accesses previous rows at specified offset behind current row.

127. `NTILE(4) OVER (ORDER BY salary)` divides 100 employee rows into:
    - A) 4 equal groups (buckets) of 25 employees each
    - B) 100 groups
    - C) 4 rows total
    - D) Employees earning over 40,000
    - **Answer**: A
    - **Explanation**: `NTILE(N)` divides ordered partition into $N$ roughly equal buckets (quartiles for $N=4$).

128. What will be returned by `SELECT NULL = NULL;` in standard ANSI SQL?
    - A) TRUE
    - B) FALSE
    - C) UNKNOWN / NULL
    - D) 1
    - **Answer**: C
    - **Explanation**: In ANSI SQL, comparing NULL with anything (including another NULL) using `=` evaluates to UNKNOWN.

129. SQL statement to create an inline virtual table that does NOT store physical data on disk:
    - A) `CREATE TABLE`
    - B) `CREATE VIEW`
    - C) `CREATE INDEX`
    - D) `CREATE MATERIALIZED VIEW`
    - **Answer**: B
    - **Explanation**: Standard SQL `VIEW` is a virtual table defined by a query; it stores no physical data.

130. Materialized View differs from standard View because:
    - A) Materialized View physically stores query results on disk and must be refreshed
    - B) Standard view stores data on disk
    - C) Materialized view cannot be indexed
    - D) They are identical
    - **Answer**: A
    - **Explanation**: Materialized views physically persist query output on disk for faster retrieval, requiring periodic refresh.

131. In MySQL, `GROUP_CONCAT(name SEPARATOR ', ')` does what?
    - A) Sums numeric names
    - B) Concatenates non-null column string values from a group into a single string
    - C) Splits strings by comma
    - D) Counts unique names
    - **Answer**: B
    - **Explanation**: `GROUP_CONCAT()` aggregates multiple row string values in a group into a single comma-separated text string.

132. What happens if you execute `DELETE FROM Employee;` vs `TRUNCATE TABLE Employee;`?
    - A) `DELETE` can be rolled back (DML); `TRUNCATE` is DDL and resets AUTO_INCREMENT counters faster
    - B) `TRUNCATE` can be rolled back; `DELETE` cannot
    - C) `DELETE` removes table definition
    - D) Both perform identical underlying disk operations
    - **Answer**: A
    - **Explanation**: `DELETE` logs row deletions one-by-one (DML). `TRUNCATE` deallocates data pages (DDL), resets identity columns, and executes faster.

133. Output of `SELECT SUBSTRING('VIRTUSA placement', 1, 7);` in SQL:
    - A) VIRTUSA
    - B) IRTUSA
    - C) placement
    - D) VIRTUS
    - **Answer**: A
    - **Explanation**: SQL string indexing is 1-based. Position 1 for length 7 extracts `'VIRTUSA'`.

134. Which SQL clause is evaluated FIRST in logical processing order?
    - A) `SELECT`
    - B) `WHERE`
    - C) `FROM`
    - D) `GROUP BY`
    - **Answer**: C
    - **Explanation**: Logical processing starts at `FROM` (identifying target tables/joins), followed by `WHERE`, `GROUP BY`, `HAVING`, `SELECT`, `DISTINCT`, `ORDER BY`, `LIMIT`.

135. What is the behavior of `ON DELETE CASCADE` in a Foreign Key constraint?
    - A) Deleting a parent row automatically deletes all referencing child rows in the child table
    - B) Prevents parent row deletion
    - C) Sets foreign key in child rows to NULL
    - D) Throws a runtime error
    - **Answer**: A
    - **Explanation**: `ON DELETE CASCADE` automatically removes child rows when their referenced parent record is deleted.

136. What is the behavior of `ON DELETE SET NULL`?
    - A) Deletes child rows
    - B) Sets foreign key column values in child table to `NULL` when parent row is deleted
    - C) Prevents parent deletion
    - D) Sets child rows to 0
    - **Answer**: B
    - **Explanation**: `ON DELETE SET NULL` updates referencing foreign key columns in child rows to `NULL` upon parent deletion.

137. Standard SQL constraint to ensure values in a column satisfy a boolean condition (e.g., `age >= 18`):
    - A) `PRIMARY KEY`
    - B) `DEFAULT`
    - C) `CHECK`
    - D) `FOREIGN KEY`
    - **Answer**: C
    - **Explanation**: `CHECK` constraint validates that inserted/updated column values satisfy a designated boolean expression.

138. Output of `SELECT CHAR_LENGTH('DB\nMS');` in MySQL:
    - A) 5
    - B) 4
    - C) 6
    - D) 3
    - **Answer**: B
    - **Explanation**: Characters are `'D'`, `'B'`, `'\n'`, `'MS'` $\rightarrow$ 5 characters? Wait: `'D'`, `'B'`, newline character `'\n'`, `'M'`, `'S'` = 5 characters.
    *(Check string `'DB\nMS'` has 5 chars: D, B, newline, M, S).*
    - **Answer**: A
    - **Explanation**: The string contains 5 characters: 'D', 'B', newline character '\n', 'M', and 'S'.

139. Which SQL clause allows creating named temporary result sets accessible within a single query (Common Table Expression)?
    - A) `HAVING`
    - B) `WITH`
    - C) `GROUP BY`
    - D) `OVER`
    - **Answer**: B
    - **Explanation**: `WITH cte_name AS (...)` defines a Common Table Expression (CTE).

140. What is a Recursive CTE used for in SQL?
    - A) Iterating through hierarchical data (e.g., organizational charts, bill of materials, tree structures)
    - B) Speeding up simple SELECT queries
    - C) Replacing primary keys
    - D) Deleting duplicate emails
    - **Answer**: A
    - **Explanation**: Recursive CTEs self-reference anchor definitions to traverse graphs and hierarchical trees.

141. Result of `SELECT 10 / 0;` in MySQL default mode:
    - A) 0
    - B) Exception Error
    - C) NULL
    - D) Infinity
    - **Answer**: C
    - **Explanation**: By default, MySQL evaluates division by zero to `NULL` (without throwing a fatal runtime crash unless strict SQL modes prevent it).

142. Output of `SELECT INSTR('placement', 'ce');`:
    - A) 4
    - B) 5
    - C) 3
    - D) 0
    - **Answer**: A
    - **Explanation**: `'placement'`: p(1), l(2), a(3), c(4), e(5)... Substring `'ce'` starts at index position 4.

143. Which of the following commands is TCL (Transaction Control Language)?
    - A) `GRANT`
    - B) `COMMIT`
    - C) `TRUNCATE`
    - D) `UPDATE`
    - **Answer**: B
    - **Explanation**: `COMMIT`, `ROLLBACK`, and `SAVEPOINT` are TCL commands.

144. Which SQL command is DCL (Data Control Language)?
    - A) `REVOKE`
    - B) `ALTER`
    - C) `SELECT`
    - D) `DROP`
    - **Answer**: A
    - **Explanation**: `GRANT` and `REVOKE` control permissions (DCL).

145. What does the `EXISTS` operator test?
    - A) Checks if subquery returns AT LEAST ONE row
    - B) Checks if subquery returns NULL
    - C) Checks if table exists in database
    - D) Checks column data type
    - **Answer**: A
    - **Explanation**: `EXISTS (subquery)` evaluates to TRUE as soon as the inner subquery produces 1 or more matching rows.

146. `EXISTS` vs `IN` performance rule:
    - A) `EXISTS` is usually faster than `IN` when subquery result set is LARGE because `EXISTS` short-circuits on first match
    - B) `IN` is always faster than `EXISTS`
    - C) Both have identical execution plans in all SQL engines
    - D) `IN` handles NULLs better than `EXISTS`
    - **Answer**: A
    - **Explanation**: `EXISTS` short-circuits immediately upon finding the first matching tuple, making it more efficient for large inner result sets.

147. What will `SELECT * FROM Emp WHERE dept_id NOT IN (1, 2, NULL);` return?
    - A) Rows with dept_id other than 1 and 2
    - B) ZERO rows (Empty result set)
    - C) All rows
    - D) Rows where dept_id IS NULL
    - **Answer**: B
    - **Explanation**: `NOT IN (1, 2, NULL)` expands to `dept_id != 1 AND dept_id != 2 AND dept_id != NULL`. Since `dept_id != NULL` is UNKNOWN, the entire `AND` condition evaluates to UNKNOWN, returning 0 rows!

148. SQL Aggregate function that ignores NULL values:
    - A) `SUM()`
    - B) `AVG()`
    - C) `MAX()`
    - D) All of the above
    - **Answer**: D
    - **Explanation**: All standard aggregate functions (`SUM`, `AVG`, `MIN`, `MAX`, `COUNT(col)`) ignore `NULL` values during calculation.

149. Output of `SELECT AVG(val) FROM T;` where `val` column has rows `{10, 20, NULL}`:
    - A) 10
    - B) 15
    - C) NULL
    - D) 30
    - **Answer**: B
    - **Explanation**: Aggregate ignores NULL. Sum = $10 + 20 = 30$. Count of non-null values = 2. Average = $30 / 2 = 15$.

150. SQL clause used to combine output of two `SELECT` queries while ELIMINATING duplicate rows:
    - A) `UNION ALL`
    - B) `UNION`
    - C) `JOIN`
    - D) `INTERSECT ALL`
    - **Answer**: B
    - **Explanation**: `UNION` performs set union and filters out duplicate rows. `UNION ALL` retains duplicate rows.

151. Why is `UNION ALL` faster than `UNION`?
    - A) `UNION ALL` does NOT perform a duplicate-elimination sorting/hashing pass over the result set
    - B) `UNION ALL` runs on GPU
    - C) `UNION` ignores indexing
    - D) They have identical speed
    - **Answer**: A
    - **Explanation**: `UNION ALL` simply appends datasets without spending CPU time sorting/hashing to deduplicate tuples.

152. Output of `SELECT DATEDIFF('2026-07-30', '2026-07-20');` in MySQL:
    - A) 10
    - B) -10
    - C) 2026
    - D) NULL
    - **Answer**: A
    - **Explanation**: `DATEDIFF(expr1, expr2)` calculates `expr1 - expr2` in days ($30 - 20 = 10$).

153. Function used in MySQL to format dates into custom strings (e.g. `'2026-07'`):
    - A) `DATE_FORMAT(date, '%Y-%m')`
    - B) `TO_CHAR(date)`
    - C) `GETDATE()`
    - D) `CONVERT_DATE()`
    - **Answer**: A
    - **Explanation**: `DATE_FORMAT()` converts date values into formatted strings based on specifiers like `%Y-%m`.

154. What is a Database Trigger?
    - A) Procedural code automatically executed by DBMS in response to DML events (INSERT, UPDATE, DELETE) on a table
    - B) An index type
    - C) A manual transaction commit command
    - D) A backup daemon
    - **Answer**: A
    - **Explanation**: Triggers are event-driven stored procedures bound to table DML events (`BEFORE` or `AFTER` modifications).

155. In a SQL Trigger, `:NEW.col` and `:OLD.col` pseudo-records are available during:
    - A) `UPDATE` operations
    - B) `INSERT` operations (`:NEW` only)
    - C) `DELETE` operations (`:OLD` only)
    - D) All of the above
    - **Answer**: D
    - **Explanation**: `INSERT` has `:NEW`, `DELETE` has `:OLD`, and `UPDATE` provides access to both `:OLD` (previous state) and `:NEW` (new state).

156. In SQL, `CASCADE` option on `DROP TABLE Supplier CASCADE;` will:
    - A) Drop `Supplier` table and automatically drop dependent foreign key constraints/views referencing it
    - B) Delete database
    - C) Create backup
    - D) Truncate table
    - **Answer**: A
    - **Explanation**: `CASCADE` in DML/DDL drops referencing dependent objects or constraint links to maintain schema consistency.

157. SQL `MERGE` statement (UPSERT) is used to:
    - A) Perform INSERT, UPDATE, or DELETE operations on a target table based on results of a join with a source table in a single atomic statement
    - B) Merge two databases physically
    - C) Drop duplicate rows
    - D) Combine index blocks
    - **Answer**: A
    - **Explanation**: `MERGE` (also known as UPSERT) conditionally inserts new rows or updates existing matching rows in one command.

158. SQL `CROSS JOIN` between table $A$ (3 rows) and table $B$ (4 rows) yields how many rows?
    - A) 7
    - B) 12
    - C) 1
    - D) 0
    - **Answer**: B
    - **Explanation**: `CROSS JOIN` computes Cartesian Product ($3 \times 4 = 12$ rows).

159. Query: `SELECT emp_name FROM Employee WHERE salary > ALL (SELECT salary FROM Employee WHERE dept = 'Sales');`. What does `> ALL` mean?
    - A) Salary must be greater than EVERY single salary in Sales department (i.e. greater than MAX salary in Sales)
    - B) Salary must be greater than AT LEAST ONE salary in Sales
    - C) Salary equals average Sales salary
    - D) Returns 0 rows
    - **Answer**: A
    - **Explanation**: `> ALL (subquery)` requires the LHS value to exceed every value returned by the subquery (equivalent to `> MAX(...)`).

160. Query: `SELECT emp_name FROM Employee WHERE salary > ANY (SELECT salary FROM Employee WHERE dept = 'Sales');`. What does `> ANY` mean?
    - A) Greater than MAX salary in Sales
    - B) Greater than AT LEAST ONE salary in Sales (equivalent to `> MIN(...)`)
    - C) Equal to all salaries
    - D) Less than MIN salary
    - **Answer**: B
    - **Explanation**: `> ANY` evaluates to TRUE if the value is strictly greater than at least one element in the set (equivalent to `> MIN(...)`).

161. SQL standard clause to limit query output to 5 rows starting from 10th row:
    - A) `LIMIT 5 OFFSET 9`
    - B) `TOP 5 START 10`
    - C) `FETCH FIRST 5 ROWS ONLY`
    - D) `WHERE ROWNUM <= 5`
    - **Answer**: A
    - **Explanation**: `LIMIT 5 OFFSET 9` skips the first 9 rows and retrieves the next 5 rows.

162. Result of `SELECT '10' + 20;` in MySQL:
    - A) '1020'
    - B) 30
    - C) Error
    - D) NULL
    - **Answer**: B
    - **Explanation**: MySQL implicitly converts string `'10'` to numeric `10` in arithmetic operations, evaluating $10 + 20 = 30$.

163. Result of `SELECT CONCAT('10', 20);` in MySQL:
    - A) 30
    - B) '1020'
    - C) NULL
    - D) Error
    - **Answer**: B
    - **Explanation**: `CONCAT()` coerces parameters to string values, outputting `'1020'`.

164. Logical processing order: `HAVING` vs `WHERE`:
    - A) `WHERE` filters rows BEFORE grouping; `HAVING` filters aggregated groups AFTER `GROUP BY`
    - B) `HAVING` runs first
    - C) Both execute simultaneously
    - D) `HAVING` filters individual rows
    - **Answer**: A
    - **Explanation**: `WHERE` restricts rows feeding into `GROUP BY`, while `HAVING` filters grouped rows after aggregation.

165. Can aggregate functions like `SUM()` or `COUNT()` be used directly in a `WHERE` clause?
    - A) Yes, always
    - B) NO, aggregate functions cannot appear in `WHERE` clauses (use `HAVING` instead)
    - C) Only if table is indexed
    - D) Only in correlated subqueries
    - **Answer**: B
    - **Explanation**: `WHERE` executes before groups are formed, so row-level filtering in `WHERE` cannot evaluate aggregate functions over groups.

166. Correct way to find departments having total salary expenditure over 100,000:
    - A) `SELECT dept, SUM(sal) FROM Emp WHERE SUM(sal) > 100000 GROUP BY dept;`
    - B) `SELECT dept, SUM(sal) FROM Emp GROUP BY dept HAVING SUM(sal) > 100000;`
    - C) `SELECT dept FROM Emp HAVING sal > 100000;`
    - D) `SELECT dept FROM Emp WHERE sal > 100000;`
    - **Answer**: B
    - **Explanation**: Group filtering based on aggregate sum must be placed inside the `HAVING` clause.

167. Output of `SELECT NULLIF(10, 10);` in SQL:
    - A) 10
    - B) NULL
    - C) 0
    - D) True
    - **Answer**: B
    - **Explanation**: `NULLIF(expr1, expr2)` returns `NULL` if `expr1 = expr2`; otherwise it returns `expr1`.

168. Output of `SELECT NULLIF(10, 20);`:
    - A) 10
    - B) 20
    - C) NULL
    - D) False
    - **Answer**: A
    - **Explanation**: Since $10 \neq 20$, `NULLIF` returns the first expression (`10`).

169. What is a Correlated Subquery execution behavior?
    - A) Executed ONCE for the entire query
    - B) Executed REPEATEDLY, once for EVERY candidate row processed by the outer query
    - C) Executed in parallel before outer query
    - D) Executed only when outer query returns NULL
    - **Answer**: B
    - **Explanation**: Correlated subqueries reference outer query columns, forcing re-evaluation for each outer table row.

170. Which query finds the employee who earns the maximum salary WITHOUT using `MAX()` or `ORDER BY LIMIT`?
    - A) `SELECT name FROM Emp e WHERE NOT EXISTS (SELECT 1 FROM Emp WHERE salary > e.salary);`
    - B) `SELECT name FROM Emp WHERE salary = ALL(SELECT salary FROM Emp);`
    - C) `SELECT name FROM Emp WHERE salary IN (NULL);`
    - D) Both A and B are impossible
    - **Answer**: A
    - **Explanation**: Anti-join logic (`NOT EXISTS`) asserts there is no employee with a strictly higher salary, correctly identifying top earner(s).

171. In SQL, `SELF JOIN` is useful for:
    - A) Comparing rows within the SAME table (e.g. Employee vs Manager, finding duplicate values)
    - B) Joining tables from two different databases
    - C) Deleting tables
    - D) Re-indexing primary keys
    - **Answer**: A
    - **Explanation**: Self join joins a table to itself using aliases to compare intra-table row pairs.

172. SQL statement to create an INDEX on `emp_name` column of `Employee` table:
    - A) `CREATE INDEX idx_emp_name ON Employee(emp_name);`
    - B) `MAKE INDEX ON Employee(emp_name);`
    - C) `ADD INDEX idx_emp_name TO Employee;`
    - D) `INDEX Employee(emp_name);`
    - **Answer**: A
    - **Explanation**: Standard DDL syntax is `CREATE INDEX index_name ON table_name(column_name);`.

173. What is a Composite Index?
    - A) An index created on TWO OR MORE columns of a table
    - B) An index combining B-Tree and Hash
    - C) An index on multiple tables
    - D) A primary key index
    - **Answer**: A
    - **Explanation**: Composite (multicolumn) index indexing preserves sorted order across a multi-column key sequence $(A, B)$.

174. Leftmost Prefix Rule in Composite Indexes: An index on $(A, B, C)$ CAN BE USED for queries filtering on:
    - A) $A$ only, $(A, B)$, or $(A, B, C)$
    - B) $B$ only
    - C) $C$ only
    - D) $(B, C)$ only
    - **Answer**: A
    - **Explanation**: Composite indexes require queries to filter on a leading contiguous prefix of the indexed columns starting from the leftmost attribute ($A$).

175. What is an Index Skip Scan?
    - A) Scanning secondary index blocks by skipping lead column equality checks when lead column has very low cardinality
    - B) Skipping index entirely to run full table scan
    - C) Deleting bad indexes
    - D) Skipping locked rows
    - **Answer**: A
    - **Explanation**: Skip scan optimization allows using multicolumn indexes even when leading columns are omitted if lead column distinct values are few.

176. Default sorting order in `ORDER BY` clause:
    - A) Ascending (`ASC`)
    - B) Descending (`DESC`)
    - C) Random
    - D) Primary key order
    - **Answer**: A
    - **Explanation**: `ORDER BY column` sorts in Ascending (`ASC`) order by default.

177. Where are `NULL` values placed in `ORDER BY col ASC` in MySQL vs Oracle?
    - A) MySQL places NULLs FIRST; Oracle places NULLs LAST (by default in ASC)
    - B) Both place NULLs first
    - C) Both place NULLs last
    - D) Oracle ignores NULLs
    - **Answer**: A
    - **Explanation**: In `ASC` sorting, MySQL considers `NULL` as lowest value (placed first), while Oracle considers `NULL` as highest (placed last).

178. What does `SELECT REPLACE('123Virtusa', '123', 'OA_');` output?
    - A) OA_Virtusa
    - B) Virtusa
    - C) 123Virtusa
    - D) NULL
    - **Answer**: A
    - **Explanation**: `REPLACE(str, from_str, to_str)` substitutes occurrences of `'123'` with `'OA_'`.

179. What does `SELECT LOWER(UPPER('dbms'));` return?
    - A) dbms
    - B) DBMS
    - C) Dbms
    - D) Error
    - **Answer**: A
    - **Explanation**: Inner `UPPER` gives `'DBMS'`, outer `LOWER` converts it back to lower case `'dbms'`.

180. SQL query to select current system date and time in MySQL:
    - A) `SELECT NOW();` or `SELECT CURRENT_TIMESTAMP;`
    - B) `SELECT SYSDATE;`
    - C) `SELECT GETDATE();` (SQL Server)
    - D) All of the above depend on RDBMS vendor dialect
    - **Answer**: D
    - **Explanation**: `NOW()` works in MySQL, `GETDATE()` in SQL Server, `SYSDATE` in Oracle/MySQL. All are vendor temporal functions.

---

### CATEGORY D: Transactions, ACID, Isolation Levels & Concurrency Control (Q181 - Q220)

181. Isolation property of ACID is primarily enforced by which database subsystem?
    - A) Concurrency Control Manager (Lock Manager / Timestamp Manager)
    - B) Recovery Manager
    - C) Security Manager
    - D) Parser & Optimizer
    - **Answer**: A
    - **Explanation**: Concurrency control algorithms (2PL, Multi-versioning) manage isolation among concurrent transactions.

182. Atomicity & Durability properties of ACID are primarily enforced by:
    - A) Recovery Manager (Write-Ahead Logging / Redo-Undo Logs)
    - B) Query Optimizer
    - C) Index Manager
    - D) DDL Compiler
    - **Answer**: A
    - **Explanation**: Recovery manager maintains transaction logs (undo/redo logs) to guarantee atomicity and durability.

183. Which transaction anomaly occurs when $T_1$ reads an item updated by $T_2$, and then $T_2$ ABORTS?
    - A) Dirty Read (Inconsistent Read)
    - B) Non-Repeatable Read
    - C) Phantom Read
    - D) Lost Update
    - **Answer**: A
    - **Explanation**: Dirty read happens when a transaction reads uncommitted data that subsequently gets rolled back.

184. Which anomaly occurs when $T_1$ reads a row, $T_2$ UPDATES that row and COMMITS, and $T_1$ re-reads the row obtaining a DIFFERENT value?
    - A) Dirty Read
    - B) Non-Repeatable Read (Fuzzy Read)
    - C) Phantom Read
    - D) Lost Update
    - **Answer**: B
    - **Explanation**: Non-Repeatable Read occurs when repeated reads of the exact same row yield modified attribute values due to committed concurrent updates.

185. Phantom Read anomaly occurs when:
    - A) $T_1$ reads a set of rows matching a predicate, $T_2$ INSERTS new rows matching the predicate and commits, and $T_1$ re-executes the query finding NEW "phantom" rows
    - B) $T_1$ reads modified uncommitted values
    - C) $T_1$ writes over $T_2$'s uncommitted data
    - D) Database disk crashes
    - **Answer**: A
    - **Explanation**: Phantom read involves range queries where new matching rows inserted by committed concurrent transactions appear upon re-querying.

186. Which ANSI SQL Isolation Level guarantees complete prevention of Dirty Reads, Non-Repeatable Reads, AND Phantom Reads?
    - A) Read Uncommitted
    - B) Read Committed
    - C) Repeatable Read
    - D) Serializable
    - **Answer**: D
    - **Explanation**: `Serializable` isolation provides full isolation, preventing all read/write concurrency anomalies.

187. ANSI Isolation Matrix mapping:
    - A) Read Uncommitted allows ALL anomalies | Read Committed prevents Dirty Read | Repeatable Read prevents Dirty & Non-Repeatable | Serializable prevents ALL
    - B) Repeatable read prevents Phantom reads
    - C) Read committed prevents Phantom reads
    - D) Read uncommitted prevents Lost updates
    - **Answer**: A
    - **Explanation**: Standard isolation matrix strictly establishes progressively stronger isolation levels from Read Uncommitted to Serializable.

188. Lost Update anomaly occurs when:
    - A) Two transactions read the same initial state, compute updates concurrently, and the second commit overwrites the first commit without accounting for its changes
    - B) Data is deleted accidentally
    - C) Disk space runs out
    - D) System reboots
    - **Answer**: A
    - **Explanation**: Lost Update happens when overlapping write transactions overwrite each other's committed updates ($W_1(X) \dots W_2(X)$).

189. Precedence Graph (Serialization Graph) nodes represent:
    - A) Transactions
    - B) Data items
    - C) Disk blocks
    - D) SQL statements
    - **Answer**: A
    - **Explanation**: Graph nodes represent active transactions $T_i$; directed edges represent conflicting operations between them.

190. If the Precedence Graph of a schedule has a CYCLE, the schedule is:
    - A) Conflict Serializable
    - B) NOT Conflict Serializable
    - C) View Serializable
    - D) Strict
    - **Answer**: B
    - **Explanation**: A precedence graph cycle proves the existence of circular execution dependencies, violating Conflict Serializability.

191. Is every Conflict Serializable schedule also View Serializable?
    - A) YES, Conflict Serializability is a strict subset of View Serializability
    - B) No, never
    - C) Only if there are blind writes
    - D) Only under 2PL
    - **Answer**: A
    - **Explanation**: Conflict Serializability $\subset$ View Serializability. Every conflict serializable schedule is guaranteed to be view serializable.

192. View Serializability allows schedules that are NOT Conflict Serializable ONLY IF the schedule contains:
    - A) Blind Writes (Write operations without prior Read)
    - B) Read operations only
    - C) Cascading aborts
    - D) Shared locks
    - **Answer**: A
    - **Explanation**: Schedules that are View Serializable but NOT Conflict Serializable necessarily involve Blind Writes ($W(X)$ without $R(X)$).

193. Two operations in a schedule are in CONFLICT if:
    - A) They belong to different transactions, access the SAME data item, and AT LEAST ONE operation is a WRITE ($W$)
    - B) They belong to same transaction
    - C) Both operations are Read ($R$)
    - D) They access different data items
    - **Answer**: A
    - **Explanation**: Conflicting operations must satisfy 3 conditions: different transactions, same item, at least one write ($R-W, W-R, W-W$).

194. Two Read operations $R_1(X)$ and $R_2(X)$ on the same data item by different transactions:
    - A) Conflict with each other
    - B) DO NOT conflict (Read-Read is non-conflicting)
    - C) Cause deadlocks
    - D) Require exclusive locks
    - **Answer**: B
    - **Explanation**: Concurrent reads ($R-R$) do not alter data states or dependencies, so they never conflict.

195. Basic Two-Phase Locking (2PL) protocol guarantees:
    - A) Conflict Serializability
    - B) Freedom from Deadlocks
    - C) Freedom from Cascading Aborts
    - D) Strictness
    - **Answer**: A
    - **Explanation**: 2PL guarantees that any acceptable execution schedule is Conflict Serializable, though deadlocks can still occur.

196. Does Basic 2PL protocol prevent Deadlocks?
    - A) Yes, deadlocks cannot happen in 2PL
    - B) NO, 2PL schedules CAN suffer from deadlocks
    - C) 2PL prevents deadlocks only in MySQL
    - D) Deadlocks occur only in 3NF
    - **Answer**: B
    - **Explanation**: 2PL enforces growing and shrinking phases but does not control lock acquisition ordering, leaving it susceptible to deadlocks.

197. Strict 2PL protocol requires:
    - A) ALL Exclusive (X) locks held by a transaction to be released ONLY AFTER the transaction COMMITS or ABORTS
    - B) All locks released in growing phase
    - C) No shared locks allowed
    - D) Transactions execute sequentially
    - **Answer**: A
    - **Explanation**: Strict 2PL holds exclusive locks until transaction termination, preventing dirty reads and cascading aborts.

198. Rigorous 2PL protocol requires:
    - A) ALL locks (both Shared S and Exclusive X) to be held until transaction COMMITS or ABORTS
    - B) Shared locks released immediately after read
    - C) No exclusive locks
    - D) Lock escalation disabled
    - **Answer**: A
    - **Explanation**: Rigorous 2PL retains ALL locks (Shared and Exclusive) until transaction commit/abort, enforcing strict serial order.

199. What is a Cascading Abort (Cascading Rollback)?
    - A) Aborting one transaction forces a chain reaction of aborting multiple dependent transactions that read uncommitted data
    - B) Server crash recovery
    - C) B+ tree deletion
    - D) Deadlock resolution strategy
    - **Answer**: A
    - **Explanation**: If $T_2$ reads uncommitted data written by $T_1$, aborting $T_1$ invalidates $T_2$'s work, forcing $T_2$ (and its dependents) to abort.

200. A schedule is CASCASELESS (avoids cascading aborts) if:
    - A) Transactions read ONLY COMMITTED data written by other transactions ($R_j(X)$ occurs only after $T_i$ commits $W_i(X)$)
    - B) Transactions use no locks
    - C) Transactions execute concurrently
    - D) Precedence graph has cycles
    - **Answer**: A
    - **Explanation**: Cascadelessness guarantees no transaction ever reads uncommitted modifications of another transaction.

201. Relationship between Schedule Classes:
    - A) Strict Schedules $\subset$ Cascadeless Schedules $\subset$ Recoverable Schedules
    - B) Recoverable $\subset$ Cascadeless $\subset$ Strict
    - C) Conflict Serializable $\subset$ Recoverable $\subset$ Strict
    - D) View Serializable = Strict
    - **Answer**: A
    - **Explanation**: Strictness is the most restrictive subset; every Strict schedule is Cascadeless, and every Cascadeless schedule is Recoverable.

202. What is a RECOVERABLE schedule?
    - A) For every pair of transactions $T_i$ and $T_j$, if $T_j$ reads a data item written by $T_i$, then $T_i$ COMMITS BEFORE $T_j$ commits
    - B) Schedule that can survive disk failure
    - C) Schedule with no deadlocks
    - D) Schedule in BCNF
    - **Answer**: A
    - **Explanation**: Recoverability ensures commit dependency ordering: supplier transaction $T_i$ must commit before consumer transaction $T_j$ commits.

203. In Basic Timestamp Ordering (TO) protocol, transaction $T_i$ attempts $R_i(X)$. Transaction is ABORTED and restarted if:
    - A) $TS(T_i) < W\_TS(X)$ (Item $X$ was written by a younger transaction)
    - B) $TS(T_i) > W\_TS(X)$
    - C) $TS(T_i) = R\_TS(X)$
    - D) $X$ is locked
    - **Answer**: A
    - **Explanation**: If $T_i$ tries to read $X$ after a younger transaction with $TS > TS(T_i)$ has already written $X$, $T_i$ is reading an invalid future value and must abort.

204. Thomas Write Rule modifies Timestamp Ordering by:
    - A) IGNORING obsolete write operations ($W_i(X)$ when $TS(T_i) < W\_TS(X)$) instead of aborting transaction $T_i$
    - B) Aborting all write operations
    - C) Converting write locks to read locks
    - D) Enforcing 2PL
    - **Answer**: A
    - **Explanation**: Thomas Write Rule recognizes that an obsolete write would be overwritten by a younger write anyway, so it safely skips (ignores) the write without aborting $T_i$.

205. Conservative 2PL (Static 2PL) prevents deadlocks by:
    - A) Requiring a transaction to lock ALL its needed data items BEFORE starting execution (Pre-declaration of locks)
    - B) Using timestamps
    - C) Aborting young transactions
    - D) Locking entire database
    - **Answer**: A
    - **Explanation**: Conservative 2PL acquires all necessary locks up front before execution begins; if any lock is unavailable, it acquires none and waits.

206. What is Lock Escalation?
    - A) Converting many fine-grained locks (e.g. row locks) into a single coarse-grained lock (e.g. table lock) to save memory overhead
    - B) Upgrading read lock to write lock
    - C) Downgrading write lock
    - D) Releasing all locks
    - **Answer**: A
    - **Explanation**: Lock escalation reduces lock manager memory footprint by upgrading numerous row-level locks into a table-level lock.

207. Intent Locks (IS, IX) in Multiple Granularity Locking are used to:
    - A) Indicate that locking is taking place at a lower level in the node hierarchy tree
    - B) Prevent dirty reads
    - C) Force strict serializability
    - D) Speed up B+ tree insertion
    - **Answer**: A
    - **Explanation**: Intent locks on higher-level nodes (e.g. table) signal that child nodes (e.g. rows) contain explicit locks, avoiding full tree scans.

208. Lock Compatibility Matrix: Can Transaction A hold a Shared (S) lock while Transaction B holds a Shared (S) lock on the same item?
    - A) YES (Shared-Shared is compatible)
    - B) No (Exclusive block)
    - C) Only in Serializable mode
    - D) Only if table is small
    - **Answer**: A
    - **Explanation**: Shared locks permit concurrent read access; multiple transactions can hold S locks simultaneously.

209. Can Transaction A hold an Exclusive (X) lock while Transaction B holds a Shared (S) lock on the same item?
    - A) NO (Exclusive lock conflicts with ALL other locks)
    - B) Yes
    - C) Depends on SQL dialect
    - D) Only in Read Uncommitted
    - **Answer**: A
    - **Explanation**: Exclusive (X) locks grant sole write access and are incompatible with all S and X lock requests.

210. What is Starvation in concurrency control?
    - A) A transaction is repeatedly bypassed and waits indefinitely to acquire a lock while other transactions proceed
    - B) System disk failure
    - C) CPU thermal throttling
    - D) Deadlock cycle of length 2
    - **Answer**: A
    - **Explanation**: Starvation (indefinite postponement) occurs when lock grant algorithms repeatedly favor other transactions over a waiting transaction.

211. Wait-For Graph (WFG) deadlock detection: A deadlock exists if and only if:
    - A) The Wait-For Graph contains a DIRECTED CYCLE
    - B) Graph has no edges
    - C) Graph has 100 nodes
    - D) All transactions are committed
    - **Answer**: A
    - **Explanation**: Nodes are active transactions and edges represent lock dependencies; a directed cycle indicates cyclic waiting (deadlock).

212. In Wait-Die deadlock prevention (non-preemptive): If older transaction $T_{old}$ requests an item locked by younger $T_{young}$:
    - A) $T_{old}$ is allowed to WAIT
    - B) $T_{old}$ DIES (aborts)
    - C) $T_{young}$ dies
    - D) Both wait
    - **Answer**: A
    - **Explanation**: Wait-Die scheme: Older transactions WAIT for younger ones; younger transactions DIE when requesting items held by older ones.

213. In Wait-Die scheme: If younger transaction $T_{young}$ requests an item locked by older $T_{old}$:
    - A) $T_{young}$ DIES (aborts and restarts)
    - B) $T_{young}$ waits
    - C) $T_{old}$ dies
    - D) Lock is granted immediately
    - **Answer**: A
    - **Explanation**: Under Wait-Die, younger requesting transactions are preemptively aborted ("die") to prevent potential deadlocks.

214. Optimistic Concurrency Control (OCC) phases in correct sequence:
    - A) 1. Read Phase 2. Validation Phase 3. Write Phase
    - B) 1. Write Phase 2. Read Phase 3. Validation
    - C) 1. Validation 2. Lock Phase 3. Commit
    - D) 1. Lock 2. Execute 3. Unlock
    - **Answer**: A
    - **Explanation**: OCC assumes conflicts are rare: transactions read and compute locally (Read), check for serializability conflicts (Validation), and apply updates (Write).

215. Validation phase in Optimistic Concurrency Control checks for:
    - A) Conflict serializability violations with transactions committed after current transaction started
    - B) Syntax errors
    - C) Disk sector corruption
    - D) Foreign key constraints
    - **Answer**: A
    - **Explanation**: Validation verifies whether local updates interfere with transactions that committed during execution.

216. Multi-Version Concurrency Control (MVCC) core benefit:
    - A) READS NEVER BLOCK WRITES, AND WRITES NEVER BLOCK READS
    - B) Eliminates primary keys
    - C) Replaces disk storage with RAM
    - D) Prevents foreign key creation
    - **Answer**: A
    - **Explanation**: MVCC maintains multiple historical versions of records, allowing readers to view consistent snapshots without acquiring read locks.

217. In Multi-Version Timestamp Ordering (MVTO), a READ operation $R_i(X)$:
    - A) Always succeeds by reading the version of $X$ whose write timestamp is the LARGEST timestamp $\le TS(T_i)$
    - B) Never succeeds
    - C) Aborts if $X$ is locked
    - D) Creates a new table
    - **Answer**: A
    - **Explanation**: Readers inspect timestamped version histories and select the latest committed version created prior to the reader's timestamp.

218. Write-Ahead Logging (WAL) protocol rule:
    - A) Log records (undo/redo logs) MUST be flushed to stable storage BEFORE the corresponding modified data block is written to disk
    - B) Write data blocks first, then logs
    - C) Do not write logs
    - D) Write logs only once a week
    - **Answer**: A
    - **Explanation**: WAL guarantees durability and crash recovery by writing state modifications to disk logs before updating database data pages.

219. In Log-Based Recovery, the UNDO phase:
    - A) Restores database items to original values for all transactions that were UNCOMMITTED at crash time
    - B) Re-applies updates of committed transactions
    - C) Deletes all tables
    - D) Reboots operating system
    - **Answer**: A
    - **Explanation**: UNDO traverses log records backward to reverse uncommitted operations, restoring consistency.

220. Checkpointing in database log recovery serves to:
    - A) Limit the length of log file that must be processed during system recovery after a crash
    - B) Delete user data
    - C) Lock all tables permanently
    - D) Generate B+ tree indexes
    - **Answer**: A
    - **Explanation**: Checkpoints periodically flush dirty buffer pool pages to disk and write a checkpoint record, bounding recovery log scan depth.

---

### CATEGORY E: Indexing, B/B+ Trees & Storage Math (Q221 - Q250)

221. Primary Index vs Secondary Index definition:
    - A) Primary Index is created on an ordered key attribute (Sequential file sorted on Primary Key); Secondary Index is on an unordered field or non-search key
    - B) Primary Index is in RAM; Secondary on disk
    - C) Secondary index has only 1 level
    - D) They are identical
    - **Answer**: A
    - **Explanation**: Primary indexes are built on primary key search attributes of physically ordered files. Secondary indexes provide alternative access paths.

222. Clustered Index definition:
    - A) Index built on an ordered NON-KEY attribute (file physically ordered by non-key column like `dept_id`)
    - B) Index with duplicate primary keys
    - C) Index containing no pointers
    - D) Hash table index
    - **Answer**: A
    - **Explanation**: Clustering index indexes physically ordered data files sorted on non-key attributes that may contain duplicate values.

223. How many Clustered Indexes can exist on a single table?
    - A) EXACTLY 1 (because physical file data rows on disk can be sorted in only one order)
    - B) Unlimited
    - C) 10
    - D) 0
    - **Answer**: A
    - **Explanation**: Table data blocks on disk can physically follow only one sorted order, restricting tables to at most 1 clustered index.

224. How many Non-Clustered (Secondary) Indexes can exist on a single table?
    - A) Multiple (Up to database engine limits, e.g. 64 or 999)
    - B) Exactly 1
    - C) 0
    - D) 2
    - **Answer**: A
    - **Explanation**: Secondary indexes create separate logical index structures pointing back to heap/clustered rows, allowing multiple per table.

225. Dense Index vs Sparse Index:
    - A) Dense index has an index entry for EVERY search key value/record in the data file; Sparse index has index entries for only SOME search key values (usually block anchors)
    - B) Sparse index has entries for all rows
    - C) Dense index uses less memory
    - D) Sparse index is used only for non-clustered indexes
    - **Answer**: A
    - **Explanation**: Dense indexing creates an explicit pointer entry for every data record; sparse indexing keeps one pointer per data disk block.

226. Can a Sparse Index be constructed on an UNORDERED data file?
    - A) NO, Sparse Index REQUIRES the data file to be physically sorted on the search key
    - B) Yes, always
    - C) Only if file has < 100 rows
    - D) Only in B-Trees
    - **Answer**: A
    - **Explanation**: Sparse index pointers rely on physical file ordering to bound binary searches across data blocks. Unordered files require Dense Indexes.

227. Main structural difference between B-Tree and B+ Tree:
    - A) B-Tree stores data pointers in internal AND leaf nodes; B+ Tree stores ALL data pointers exclusively in LEAF nodes, and leaf nodes are linked as a linked list
    - B) B+ Tree stores data pointers only in root
    - C) B-Tree leaves are linked
    - D) B+ Tree height is always greater
    - **Answer**: A
    - **Explanation**: B+ Tree internal nodes store only index keys and child pointers, maximizing fan-out. Leaf nodes store data pointers and form a sequential linked list for fast range scans.

228. Fan-out of an index node refers to:
    - A) The maximum number of child pointers a node can hold
    - B) The height of the tree
    - C) Total records in file
    - D) Number of leaf nodes
    - **Answer**: A
    - **Explanation**: Node Fan-out ($m$) measures child branch capacity, directly influencing tree height and search depth.

229. **Capacity Formula Math**: Disk block size $B = 512$ bytes. Search key size $K = 10$ bytes. Block pointer size $P = 6$ bytes. What is the order $m$ of an internal B+ tree node?
    - Formula: $m \cdot P + (m - 1) \cdot K \le B$
    - A) 32
    - B) 31
    - C) 33
    - D) 16
    - **Answer**: B
    - **Calculation**:
      $$m(6) + (m - 1)(10) \le 512$$
      $$6m + 10m - 10 \le 512 \implies 16m \le 522 \implies m = \lfloor 522 / 16 \rfloor = 32? \text{ Wait! } 16 \times 32 = 512.$$
      $$16m - 10 \le 512 \implies 16m \le 522 \implies m = 32.$$
      Let's re-verify: $32 \times 6 + 31 \times 10 = 192 + 310 = 502 \le 512$.
      For $m = 33$: $33 \times 6 + 32 \times 10 = 198 + 320 = 518 > 512$.
      So $m = 32$!
    - **Answer**: A
    - **Explanation**: Substituting into $m \cdot P + (m-1) \cdot K \le B \implies 6m + 10m - 10 \le 512 \implies 16m \le 522 \implies m = 32$.

230. **Leaf Node Capacity Math**: Block size $B = 1024$ bytes. Key size $K = 16$ bytes. Record pointer $R_p = 8$ bytes. Block pointer $P_{\text{next}} = 8$ bytes. How many record pointers can a B+ tree leaf node hold?
    - Formula: $n \cdot (K + R_p) + P_{\text{next}} \le B$
    - A) 42
    - B) 40
    - C) 50
    - D) 32
    - **Answer**: A
    - **Calculation**:
      $$n(16 + 8) + 8 \le 1024 \implies 24n + 8 \le 1024 \implies 24n \le 1016 \implies n = \lfloor 1016 / 24 \rfloor = 42.$$
    - **Explanation**: $24n \le 1016 \implies n = 42$ records per leaf node block.

231. Minimum fill factor / occupancy constraint for non-root nodes in a B+ Tree of order $m$:
    - A) Internal nodes must have at least $\lceil m / 2 \rceil$ child pointers
    - B) Must be 100% full
    - C) Must be at least 10% full
    - D) Exactly 1 pointer
    - **Answer**: A
    - **Explanation**: B+ Tree structural invariants mandate that every non-root node remain at least half-full: $\lceil m / 2 \rceil$ pointers.

232. What is the height $h$ of a B+ tree storing $N$ key entries with leaf capacity $L$ and internal node order $m$?
    - A) $h \approx 1 + \lceil \log_{m} (N / L) \rceil$
    - B) $N / L$
    - C) $m \cdot N$
    - D) $\log_2 N$
    - **Answer**: A
    - **Explanation**: B+ Tree height scales logarithmically with base equal to fan-out $m$, enabling fast key lookup in $O(\log_m N)$ I/Os.

233. Major advantage of B+ Tree index over Hash index:
    - A) B+ Tree efficiently supports RANGE QUERIES (`BETWEEN`, `<`, `>`) and SORTING; Hash indexes support only point equality queries (`=`)
    - B) B+ Tree is faster for point queries
    - C) Hash index requires no memory
    - D) Hash index supports sorting
    - **Answer**: A
    - **Explanation**: Hash functions destroy key ordering, disabling range scans. B+ Tree leaf nodes maintain sequential links, supporting range range retrieval.

234. In Extendible Hashing, what happens when a bucket overflows and local depth $d$ equals global depth $D$?
    - A) Directory size DOUBLES ($2^{D+1}$), global depth increments $D = D + 1$, and overflowing bucket splits
    - B) Database crashes
    - C) Overflow bucket chain is created
    - D) Rehash all tables
    - **Answer**: A
    - **Explanation**: Extendible hashing dynamically doubles directory entries when local depth equals global depth upon bucket overflow.

235. In Extendible Hashing, if local depth $d < D$ upon bucket overflow:
    - A) Directory size remains unchanged; only the overflowing bucket splits and local depth increments $d = d + 1$
    - B) Directory size doubles
    - C) Global depth decreases
    - D) Error is thrown
    - **Answer**: A
    - **Explanation**: If local depth is strictly smaller than global depth, the directory pointer space accommodates the split without doubling the main directory array.

236. What is Static Hashing's main weakness?
    - A) Fixed number of buckets leads to long overflow chains (performance degradation) when database grows unexpectedly
    - B) Cannot handle numbers
    - C) Cannot index text
    - D) Consumes too much CPU
    - **Answer**: A
    - **Explanation**: Static hashing uses a fixed bucket count allocated up front; data growth causes bucket overflow chains and linear search costs.

237. Multi-level Indexing is created when:
    - A) Primary index itself becomes too large to fit in main memory (RAM)
    - B) Table has > 2 rows
    - C) Hash collisions occur
    - D) SQL query uses JOIN
    - **Answer**: A
    - **Explanation**: When a primary index file spans many disk blocks, a top-level sparse index is built over the primary index blocks to speed up searching.

238. Secondary index MUST be:
    - A) Dense index
    - B) Sparse index
    - C) Primary key
    - D) Hash index only
    - **Answer**: A
    - **Explanation**: Data file records are not physically ordered by secondary key attributes; hence every data record requires a explicit index entry (Dense).

239. Binary search on an UNORDERED data file of 100,000 blocks requires how many block accesses?
    - A) Cannot use Binary Search on unordered files! Full file scan required ($100,000$ block I/Os)
    - B) $\log_2(100,000) \approx 17$
    - C) 1 block I/O
    - D) 0 block I/O
    - **Answer**: A
    - **Explanation**: Binary search requires strict physical sequence ordering. Unordered files force linear scanning of all blocks.

240. Binary search on an ORDERED data file of 1024 blocks requires at most how many block accesses?
    - A) $\log_2(1024) = 10$ block accesses
    - B) 1024
    - C) 512
    - D) 1
    - **Answer**: A
    - **Explanation**: Binary search on $N$ ordered disk blocks completes in $\lceil \log_2 N \rceil$ I/O calls ($\log_2 1024 = 10$).

241. Secondary index pointers point to:
    - A) Data record pointers (or primary key values)
    - B) Machine IP addresses
    - C) Query text strings
    - D) Next database transaction
    - **Answer**: A
    - **Explanation**: Secondary index leaf entries hold search keys mapped to disk record pointers ($R_p$) or clustered primary key values.

242. Index Covering Query (Covering Index) is a query where:
    - A) ALL columns requested in `SELECT`, `WHERE`, and `JOIN` clauses exist inside the INDEX itself, avoiding lookup of main table data blocks
    - B) Query uses table scan
    - C) Index covers multiple databases
    - D) Query drops index
    - **Answer**: A
    - **Explanation**: Covering indexes satisfy queries entirely from the index tree blocks, eliminating costly secondary data block lookups.

243. In B+ Tree insertion, if a leaf node holding $m-1$ keys receives a new key, it:
    - A) Splits into two nodes, each keeping $\lceil m/2 \rceil$ keys, and promotes middle key up to parent
    - B) Overwrites adjacent node
    - C) Deletes lowest key
    - D) Throws duplicate key exception
    - **Answer**: A
    - **Explanation**: Node overflow triggers a $50/50$ node split, copying/promoting the median key up to the internal parent node.

244. B+ Tree node deletion underflow condition:
    - A) Node key count falls below $\lceil (m-1)/2 \rceil$ keys
    - B) Node has 0 keys
    - C) Tree height becomes 0
    - D) Parent node is deleted
    - **Answer**: A
    - **Explanation**: Underflow occurs when deletion drops key count below minimum threshold, prompting redistribution or node merging with siblings.

245. In B+ Tree, keys in internal nodes serve as:
    - A) Router/Search guide values to direct search down to correct child subtree
    - B) Actual database rows
    - C) Primary keys only
    - D) Encryption keys
    - **Answer**: A
    - **Explanation**: Internal keys function strictly as search pivot values routing tree traversal to appropriate child pointers.

246. Bitmap Index is ideal for columns with:
    - A) LOW Cardinality (few distinct values, e.g. `Gender`, `Marital_Status`, `State`)
    - B) HIGH Cardinality (e.g. `SSN`, `UUID`, `Email`)
    - C) Float numbers
    - D) Text BLOBs
    - **Answer**: A
    - **Explanation**: Bitmap indexes store bit arrays per distinct column value, excelling on low-cardinality attributes and boolean AND/OR bitwise queries.

247. B-Tree index is optimal for columns with:
    - A) HIGH Cardinality (many unique distinct values)
    - B) Low cardinality
    - C) Boolean values only
    - D) Empty values
    - **Answer**: A
    - **Explanation**: B-Trees perform best on high-cardinality attributes where tree searches rapidly filter small result subsets.

248. Index Scan vs Full Table Scan choice by Query Optimizer:
    - A) Optimizer chooses Full Table Scan when query selects a LARGE percentage of total table rows (e.g. > 20-30%)
    - B) Optimizer always uses Index Scan
    - C) Full Table Scan is always faster
    - D) Optimizer never uses Full Table Scan
    - **Answer**: A
    - **Explanation**: Sequential disk reads during Full Table Scan are faster than random index block reads when retrieving a substantial fraction of table rows.

249. In Linear Hashing, bucket splits occur:
    - A) Gracefully and incrementally one bucket at a time based on overall load factor, without doubling directory size
    - B) By doubling entire directory
    - C) On every insertion
    - D) Never
    - **Answer**: A
    - **Explanation**: Linear hashing handles growth smoothly by splitting buckets sequentially ($0, 1, 2, \dots$) as load factor thresholds are breached.

250. File organization method where records are placed in disk blocks in exact order of arrival without sorting:
    - A) Heap File Organization
    - B) Sequential File Organization
    - C) Hash File Organization
    - D) Clustered File Organization
    - **Answer**: A
    - **Explanation**: Heap file organization appends incoming records to the end of data pages without enforcing attribute order.

---

### CATEGORY F: ER Diagrams, Database Architecture, Views, Triggers & Security (Q251 - Q300)

251. In ER Diagram, an Entity Set that does not have a primary key of its own is called:
    - A) Strong Entity Set
    - B) Weak Entity Set
    - C) Derived Entity Set
    - D) Associative Entity
    - **Answer**: B
    - **Explanation**: A Weak Entity Set lacks sufficient attributes to form a primary key independently and relies on an identifying strong entity set.

252. How is a Weak Entity Set identified?
    - A) By combining its Partial Key (Discriminator) with Primary Key of identifying Strong Entity Set
    - B) By its own primary key
    - C) By foreign key only
    - D) By UUID
    - **Answer**: A
    - **Explanation**: Weak entities are uniquely identified by compounding the owner strong entity's primary key with the weak entity's discriminator (partial key).

253. Symbol for Weak Entity Set in standard Chen ER diagram notation:
    - A) Single Rectangle
    - B) Double Rectangle
    - C) Dashed Ellipse
    - D) Double Diamond
    - **Answer**: B
    - **Explanation**: Double rectangle denotes weak entity sets.

254. Symbol for Identifying Relationship of a weak entity set in ER diagram:
    - A) Single Diamond
    - B) Double Diamond
    - C) Double Rectangle
    - D) Ellipse
    - **Answer**: B
    - **Explanation**: Double diamond represents identifying relationships connecting weak entity sets to their owner strong entity sets.

255. Partial Key (Discriminator) of a weak entity set is represented by:
    - A) Solidly underlined text inside ellipse
    - B) Dashed (Dotted) underlined text inside ellipse
    - C) Double ellipse
    - D) Rectangle
    - **Answer**: B
    - **Explanation**: Partial key attributes are distinguished by dashed underlines.

256. Participation constraint where EVERY entity in entity set must participate in relationship:
    - A) Total Participation (represented by Double Line)
    - B) Partial Participation (Single Line)
    - C) Cardinality 1:1
    - D) Optional constraint
    - **Answer**: A
    - **Explanation**: Total participation (existence dependency) mandates that all instances of an entity set belong to the relationship, drawn as double lines.

257. Mapping Binary M:N Relationship Set into Relational Schema requires:
    - A) Creating a SEPARATE relationship table whose primary key is the composite set of primary keys from both participating entity sets
    - B) Merging into one table
    - C) Adding foreign key to left table only
    - D) 0 tables
    - **Answer**: A
    - **Explanation**: Many-to-Many (M:N) relationships require a distinct junction table containing foreign keys referencing both participating tables.

258. Minimum number of tables needed to map ER model with 2 Strong Entity Sets and 1 Binary M:N Relationship Set:
    - A) 2
    - B) 3 (Table for Entity A, Table for Entity B, Table for Relationship)
    - C) 1
    - D) 4
    - **Answer**: B
    - **Explanation**: 2 entity tables + 1 junction relationship table = 3 tables minimum.

259. Minimum number of tables needed for 2 Strong Entity Sets with Binary 1:N Relationship Set (Partial participation on both sides):
    - A) 2 tables (1-side table, N-side table with 1-side primary key as foreign key)
    - B) 3 tables
    - C) 1 table
    - D) 4 tables
    - **Answer**: A
    - **Explanation**: 1:N relationship can be folded into the N-side relation table as a foreign key attribute, requiring only 2 tables.

260. Minimum number of tables needed for 1 Strong Entity Set and 1 Weak Entity Set connected by Identifying Relationship:
    - A) 2 tables (Strong Entity Table, Weak Entity Table incorporating owner primary key as composite key)
    - B) 3 tables
    - C) 1 table
    - D) 4 tables
    - **Answer**: A
    - **Explanation**: The weak entity table incorporates the owner's primary key along with its partial key. The identifying relationship requires no separate table.

261. ER Abstraction: Process of synthesizing lower-level entity sets sharing common features into a higher-level superclass entity set:
    - A) Specialization
    - B) Generalization (Bottom-up approach)
    - C) Aggregation
    - D) Normalization
    - **Answer**: B
    - **Explanation**: Generalization combines common attributes of multiple entity sets into a generalized superclass (Bottom-Up).

262. ER Abstraction: Process of designating sub-groupings of an entity set into specialized subclasses based on distinguishing characteristics:
    - A) Specialization (Top-down approach)
    - B) Generalization
    - C) Aggregation
    - D) Composition
    - **Answer**: A
    - **Explanation**: Specialization breaks down a high-level entity set into specialized lower-level entity sets (Top-Down).

263. ER Abstraction: Abstraction technique used when a relationship set itself must participate in another relationship set:
    - A) Aggregation
    - B) Generalization
    - C) Specialization
    - D) Categorization
    - **Answer**: A
    - **Explanation**: Aggregation treats a relationship along with its connected entities as a higher-level composite aggregate entity.

264. Disjointness Constraint in Generalization: "Disjoint" means:
    - A) An entity can belong to AT MOST ONE lower-level entity set
    - B) An entity can belong to multiple lower-level entity sets simultaneously (Overlapping)
    - C) Entities must have NULL values
    - D) Entity keys are numbers
    - **Answer**: A
    - **Explanation**: Disjoint constraint mandates that entity instances can belong to at most one subclass branch.

265. Three-Schema Database Architecture levels:
    - A) 1. Internal/Physical Level 2. Conceptual/Logical Level 3. External/View Level
    - B) 1. User Level 2. Code Level 3. Disk Level
    - C) 1. SQL 2. C++ 3. OS
    - D) 1. Input 2. Process 3. Output
    - **Answer**: A
    - **Explanation**: ANSI/SPARC 3-schema architecture separates physical storage structures, conceptual logical models, and external user views.

266. Physical Data Independence definition:
    - A) Ability to modify physical storage structures (indexes, file organization, storage hardware) WITHOUT altering conceptual schema or application programs
    - B) Ability to change table names
    - C) Ability to delete data
    - D) Ability to modify SQL syntax
    - **Answer**: A
    - **Explanation**: Physical data independence insulates logical schemas and user applications from physical storage layout changes.

267. Logical Data Independence definition:
    - A) Ability to modify conceptual schema (adding columns, expanding tables) WITHOUT altering external user views or application code
    - B) Changing disk drives
    - C) Changing OS
    - D) Rewriting triggers
    - **Answer**: A
    - **Explanation**: Logical data independence allows conceptual schema updates without breaking existing external view mappings or client programs.

268. Which level of 3-schema architecture defines table schemas, relationships, constraints, and normal forms?
    - A) Conceptual (Logical) Level
    - B) Internal Level
    - C) External Level
    - D) Physical Hardware Level
    - **Answer**: A
    - **Explanation**: Conceptual level describes all database entities, data types, relationships, and integrity constraints.

269. Which level of 3-schema architecture describes how data is physically stored on disk (block allocation, index structures, page layouts)?
    - A) Internal (Physical) Level
    - B) Conceptual Level
    - C) External Level
    - D) User View Level
    - **Answer**: A
    - **Explanation**: Internal level defines low-level physical data structures, file access paths, and compression.

270. Data Dictionary (System Catalog) stores:
    - A) Metadata (data about data: table schemas, column data types, constraints, index definitions, user permissions)
    - B) User passwords in plaintext
    - C) System audio files
    - D) Binary executables
    - **Answer**: A
    - **Explanation**: Data dictionary is the DBMS repository storing metadata about database objects, schemas, privileges, and statistics.

271. In SQL, an Updatable View MUST satisfy which condition?
    - A) View query references EXACTLY ONE base table, contains NO aggregate functions (`SUM`, `COUNT`), NO `GROUP BY`, NO `DISTINCT`, and NO `HAVING`
    - B) View query joins 5 tables
    - C) View contains `GROUP BY`
    - D) View contains `UNION`
    - **Answer**: A
    - **Explanation**: Views are directly updatable via DML only if row modifications map unambiguously to a single underlying base table without aggregation.

272. SQL `WITH CHECK OPTION` clause on a VIEW does what?
    - A) Prevents `INSERT` or `UPDATE` operations through the view that produce rows failing to satisfy the view's `WHERE` clause condition
    - B) Checks database for corruption
    - C) Disables foreign keys
    - D) Makes view read-only
    - **Answer**: A
    - **Explanation**: `WITH CHECK OPTION` enforces view integrity by rejecting DML modifications that would cause affected rows to disappear from the view.

273. Granting privileges in SQL: `GRANT SELECT, INSERT ON Emp TO user1 WITH GRANT OPTION;`. What does `WITH GRANT OPTION` mean?
    - A) `user1` is authorized to GRANT these exact privileges to OTHER database users
    - B) `user1` can delete database
    - C) `user1` is database admin
    - D) Privilege expires in 1 day
    - **Answer**: A
    - **Explanation**: `WITH GRANT OPTION` empowers the grantee to pass along assigned object privileges to third-party accounts.

274. What is Revoke Cascading behavior?
    - A) Revoking a privilege from $A$ who granted it to $B$ via `WITH GRANT OPTION` automatically revokes that privilege from $B$ as well
    - B) Revoking privilege deletes user table
    - C) Prevents revoking permissions
    - D) Server reboot
    - **Answer**: A
    - **Explanation**: Cascading revoke traces authorization dependency chains and strips privileges granted downstream by the revoked user.

275. In Database Security, Discretionary Access Control (DAC) is based on:
    - A) Explicit user privileges granted/revoked on specific database objects (`GRANT`/`REVOKE`)
    - B) Security clearances and classification levels (Secret, Top Secret)
    - C) User IP addresses only
    - D) Encryption keys only
    - **Answer**: A
    - **Explanation**: DAC controls access by granting discrete user privileges on database resources at owner discretion.

276. Mandatory Access Control (MAC) is based on:
    - A) Security clearances assigned to users and security labels (e.g. Unclassified, Secret, Top Secret) attached to database objects
    - B) `GRANT` command
    - C) Password length
    - D) User role names
    - **Answer**: A
    - **Explanation**: MAC enforces system-wide security policies comparing subject clearance levels against object security classification labels.

277. SQL Injection Attack (SQLi) is caused by:
    - A) Unsanitized user input directly concatenated into dynamic SQL strings executed by application code
    - B) Strong password usage
    - C) Index corruption
    - D) Database buffer overflow
    - **Answer**: A
    - **Explanation**: SQLi occurs when untrusted input alters application SQL syntax due to string concatenation.

278. Primary defense mechanism to completely PREVENT SQL Injection:
    - A) Prepared Statements (Parameterized Queries) / Stored Procedures
    - B) String concatenation
    - C) Disabling database logging
    - D) Using GET requests
    - **Answer**: A
    - **Explanation**: Parameterized queries separate SQL query logic from user data input, preventing payload input from executing as executable SQL commands.

279. What is Database Normalization main trade-off?
    - A) Higher Normalization eliminates data redundancy and update anomalies, but INCREASES query `JOIN` overhead and query response latency
    - B) Higher normalization increases data size
    - C) Normalization disables indexes
    - D) Normalization prevents updates
    - **Answer**: A
    - **Explanation**: Normalizing splits tables to remove redundancy, forcing queries to execute multi-table `JOIN` operations that increase response latency.

280. What is Denormalization?
    - A) Intentionally introducing controlled redundancy into normalized tables to reduce `JOIN` operations and optimize READ performance
    - B) Deleting indexes
    - C) Converting database to 0NF
    - D) Corrupting data files
    - **Answer**: A
    - **Explanation**: Denormalization strategically re-introduces redundant fields into schemas to speed up read-intensive analytical reporting queries.

281. OLTP (Online Transaction Processing) vs OLAP (Online Analytical Processing):
    - A) OLTP handles high-volume fast READ/WRITE transactions (Normalized 3NF schemas); OLAP handles complex reporting queries over large historical datasets (Star/Snowflake schemas)
    - B) OLTP is for historical data; OLAP is for live sales
    - C) OLTP uses no databases
    - D) OLAP runs only in RAM
    - **Answer**: A
    - **Explanation**: OLTP databases prioritize rapid operational transactions. OLAP data warehouses prioritize multi-dimensional reporting across aggregated historical data.

282. In Data Warehousing, a STAR Schema consists of:
    - A) A single central FACT table surrounded by un-normalized DIMENSION tables
    - B) Fully normalized dimension tables
    - C) No fact table
    - D) Linked list tables
    - **Answer**: A
    - **Explanation**: Star schema links a central fact table directly to denormalized single-layer dimension tables.

283. Snowflake Schema differs from Star Schema because:
    - A) Dimension tables in a Snowflake Schema are fully NORMALIZED into multiple related sub-dimension tables
    - B) Star schema is normalized
    - C) Snowflake schema has no fact table
    - D) Snowflake schema contains no primary keys
    - **Answer**: A
    - **Explanation**: Snowflake schema normalizes dimension hierarchies into nested sub-tables, reducing dimensional data redundancy.

284. A Fact Table in Data Warehouse typically contains:
    - A) Numerical measures/metrics (e.g. `sales_amount`, `quantity_sold`) and foreign key pointers referencing dimension tables
    - B) User passwords
    - C) Text descriptions only
    - D) Unindexed data
    - **Answer**: A
    - **Explanation**: Fact tables store quantitative performance measures alongside foreign keys linked to surrounding context dimensions.

285. BASE properties in NoSQL databases stand for:
    - A) Basically Available, Soft-state, Eventual consistency
    - B) Basic ACID System Engine
    - C) Binary Access Storage Entity
    - D) Block Allocation State Entry
    - **Answer**: A
    - **Explanation**: NoSQL databases trade strict ACID consistency for high availability via BASE properties.

286. CAP Theorem states a distributed data system can simultaneously provide at most TWO of which three guarantees?
    - A) Consistency, Availability, Partition Tolerance
    - B) Concurrency, Accuracy, Performance
    - C) Atomicity, Persistence, Security
    - D) Capacity, Availability, Processing
    - **Answer**: A
    - **Explanation**: CAP theorem proves distributed systems can guarantee at most two properties among Consistency, Availability, and Partition Tolerance.

287. In CAP Theorem, when a Network Partition occurs, a system must choose between:
    - A) Consistency (CP) OR Availability (AP)
    - B) Atomicity OR Security
    - C) Speed OR Storage
    - D) Primary OR Foreign key
    - **Answer**: A
    - **Explanation**: During network partitions, systems must elect either to return errors to maintain strict consistency (CP) or serve stale reads to preserve availability (AP).

288. MongoDB is an example of which NoSQL database category?
    - A) Document Store (JSON / BSON format)
    - B) Key-Value Store
    - C) Graph Database
    - D) Wide-Column Store
    - **Answer**: A
    - **Explanation**: MongoDB stores data as flexible BSON (Binary JSON) documents.

289. Redis is an example of which NoSQL database category?
    - A) In-Memory Key-Value Store
    - B) Relational DBMS
    - C) Graph Database
    - D) Document Store
    - **Answer**: A
    - **Explanation**: Redis operates as an ultra-fast in-memory key-value data structure store.

290. Neo4j is an example of which NoSQL database category?
    - A) Graph Database (Nodes, Edges, Properties)
    - B) Document Store
    - C) Relational DBMS
    - D) Key-Value Store
    - **Answer**: A
    - **Explanation**: Neo4j stores connected graph data structures composed of nodes and directional edges.

291. Apache Cassandra is an example of which NoSQL database category?
    - A) Wide-Column (Column-Family) Store
    - B) Document Store
    - C) Relational DBMS
    - D) In-Memory Cache
    - **Answer**: A
    - **Explanation**: Cassandra is a distributed wide-column store designed for high write throughput across clusters.

292. Database Sharding definition:
    - A) Horizontal partitioning of a database table across multiple independent database server nodes/instances
    - B) Vertical splitting of columns
    - C) Creating table backup
    - D) Re-indexing primary keys
    - **Answer**: A
    - **Explanation**: Sharding distributes distinct row subsets across independent database servers to scale write throughput horizontally.

293. Vertical Partitioning vs Horizontal Partitioning:
    - A) Horizontal partitioning splits rows across tables/nodes; Vertical partitioning splits COLUMNS across separate tables
    - B) Horizontal splits columns; Vertical splits rows
    - C) They are identical
    - D) Vertical partitioning deletes data
    - **Answer**: A
    - **Explanation**: Horizontal partitioning divides tuple subsets (rows). Vertical partitioning splits attribute subsets (columns) into smaller schemas.

294. Write-Ahead Logging (WAL) ARIES Recovery algorithm 3 phases in order:
    - A) 1. Analysis Phase 2. Redo Phase 3. Undo Phase
    - B) 1. Undo 2. Redo 3. Analysis
    - C) 1. Redo 2. Analysis 3. Undo
    - D) 1. Commit 2. Checkpoint 3. Flush
    - **Answer**: A
    - **Explanation**: ARIES recovery runs Analysis (identifying dirty pages/active transactions), Redo (replaying history to crash point), and Undo (reversing uncommitted transactions).

295. Database Deadlock resolution strategy: Choosing a transaction to abort is called:
    - A) Victim Selection
    - B) Starvation
    - C) Preemption
    - D) Lock Escalation
    - **Answer**: A
    - **Explanation**: When deadlocks occur, deadlock detectors execute Victim Selection to abort the least expensive transaction and break the cycle.

296. Criteria used during Victim Selection in deadlock resolution:
    - A) Transaction age, number of items modified, remaining execution time, and locks held
    - B) Transaction IP address
    - C) User name length
    - D) Disk block number
    - **Answer**: A
    - **Explanation**: Victim selection minimizes rollback cost by evaluating transaction runtime age, lock counts, and updated row volume.

297. Point-in-Time Recovery (PITR) requires:
    - A) Full Database Backup + Continuous Write-Ahead Transaction Logs (WAL / Archive Logs)
    - B) Standard view creation
    - C) Primary keys only
    - D) Table truncation
    - **Answer**: A
    - **Explanation**: PITR restores a full base backup and replays sequential transaction logs up to the exact requested timestamp.

298. RAID level that provides Disk Mirroring (100% redundancy, 0 fault tolerance overhead):
    - A) RAID 1
    - B) RAID 0
    - C) RAID 5
    - D) RAID 6
    - **Answer**: A
    - **Explanation**: RAID 1 mirrors data identical across pairs of drives, permitting complete survival of single-drive failures.

299. RAID level that provides Striping WITH Distributed Parity across at least 3 drives:
    - A) RAID 5
    - B) RAID 0
    - C) RAID 1
    - D) RAID 10
    - **Answer**: A
    - **Explanation**: RAID 5 stripes data and block-level parity across a minimum of 3 drives, surviving single-drive failure with optimal storage efficiency.

300. What is the PRIMARY benefit of database Connection Pooling in application servers?
    - A) Reuses a set of pre-established database connections, avoiding the high latency overhead of opening/closing physical TCP database connections per HTTP request
    - B) Automatically normalizes queries
    - C) Prevents foreign key crashes
    - D) Encrypts database disks
    - **Answer**: A
    - **Explanation**: Connection pooling eliminates connection handshake overhead by maintaining reusable active connection pools for application worker threads.

