# 📝 Technical Assessment — Previous Year Questions (Accenture PYQ)

> **Memory-based questions from Accenture assessments | With Detailed Solutions | All code in C++**

---

## 📑 Topic Index

1. [Pseudocode — Operators & Expressions](#1-pseudocode--operators--expressions)
2. [Pseudocode — Loops & Control Flow](#2-pseudocode--loops--control-flow)
3. [Pseudocode — Recursion](#3-pseudocode--recursion)
4. [Pseudocode — Arrays & Strings](#4-pseudocode--arrays--strings)
5. [Pseudocode — Bitwise Operators](#5-pseudocode--bitwise-operators)
6. [MS Office & Common Applications](#6-ms-office--common-applications)
7. [Networking](#7-networking)
8. [Cybersecurity](#8-cybersecurity)
9. [Cloud Computing](#9-cloud-computing)

---

## 1. Pseudocode — Operators & Expressions

---

**Q1.** What is the output of the following code?
```cpp
int a = 5, b = 3;
int c = a / b;
cout << c;
```
- (a) 1.67  (b) 1  (c) 2  (d) 1.0

> **Answer: (b) 1**
> Integer division: 5/3 = 1 (truncated, not rounded)

---

**Q2.** What is the output?
```cpp
int x = 10;
cout << x++ << " " << ++x;
```
- (a) 10 12  (b) 11 12  (c) 10 11  (d) Undefined Behavior

> **Answer: (d) Undefined Behavior**
> Modifying a variable more than once in the same expression is undefined behavior in C++.
> ⚠️ However, if asked individually: x++ prints THEN increments, ++x increments THEN prints.

---

**Q3.** What is the output?
```cpp
int a = 5;
int b = a++;
int c = ++a;
cout << a << " " << b << " " << c;
```
- (a) 7 5 7  (b) 6 5 7  (c) 7 6 7  (d) 6 5 6

> **Answer: (a) 7 5 7**
> b = a++ → b gets 5, then a becomes 6.
> c = ++a → a becomes 7 first, then c gets 7.
> Final: a=7, b=5, c=7

---

**Q4.** What is the output?
```cpp
int a = 10, b = 20, c = 30;
int result = a < b ? b < c ? c : b : a;
cout << result;
```
- (a) 10  (b) 20  (c) 30  (d) Error

> **Answer: (c) 30**
> a < b → true → evaluate (b < c ? c : b) → b < c is true → result = c = 30

---

**Q5.** What is the output?
```cpp
int x = 5;
int y = (x > 3) && (x < 10);
cout << y;
```
- (a) 0  (b) 1  (c) true  (d) 5

> **Answer: (b) 1**
> (5 > 3) is true(1) AND (5 < 10) is true(1) → 1 && 1 = 1

---

**Q6.** What is the output?
```cpp
int a = 0;
if (a = 5) {
    cout << "Yes";
} else {
    cout << "No";
}
```
- (a) Yes  (b) No  (c) Error  (d) 0

> **Answer: (a) Yes**
> ⚠️ Trap: `a = 5` is ASSIGNMENT (not comparison ==). a becomes 5, which is non-zero (truthy).

---

**Q7.** What is the output?
```cpp
int x = 3;
cout << (x == 3 ? "Equal" : "Not Equal");
```
- (a) Equal  (b) Not Equal  (c) 3  (d) Error

> **Answer: (a) Equal**
> x == 3 is true → prints "Equal"

---

**Q8.** What is the value of `result`?
```cpp
int result = 2 + 3 * 4 - 1;
```
- (a) 19  (b) 13  (c) 20  (d) 14

> **Answer: (b) 13**
> Precedence: 3*4=12, then 2+12-1 = 13

---

**Q9.** What is the output?
```cpp
int a = 10;
int b = a / 3;
int c = a % 3;
cout << b << " " << c;
```
- (a) 3 1  (b) 3.33 1  (c) 3 0  (d) 4 1

> **Answer: (a) 3 1**
> 10/3 = 3 (integer division), 10%3 = 1 (remainder)

---

**Q10.** What is the output?
```cpp
float x = 7.0 / 2;
int y = 7 / 2;
cout << x << " " << y;
```
- (a) 3.5 3.5  (b) 3 3  (c) 3.5 3  (d) 3 3.5

> **Answer: (c) 3.5 3**
> 7.0/2 = float division = 3.5. 7/2 = integer division = 3.

---

## 2. Pseudocode — Loops & Control Flow

---

**Q11.** What is the output?
```cpp
for (int i = 0; i < 5; i++) {
    if (i == 3) break;
    cout << i << " ";
}
```
- (a) 0 1 2 3  (b) 0 1 2  (c) 0 1 2 3 4  (d) 1 2 3

> **Answer: (b) 0 1 2**
> Loop runs: i=0,1,2 prints. When i=3, break exits the loop.

---

**Q12.** What is the output?
```cpp
for (int i = 0; i < 5; i++) {
    if (i == 3) continue;
    cout << i << " ";
}
```
- (a) 0 1 2 4  (b) 0 1 2  (c) 0 1 2 3 4  (d) 3

> **Answer: (a) 0 1 2 4**
> When i=3, continue skips that iteration but loop continues.

---

**Q13.** What is the output?
```cpp
int sum = 0;
for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0)
        sum += i;
}
cout << sum;
```
- (a) 30  (b) 25  (c) 20  (d) 55

> **Answer: (a) 30**
> Even numbers: 2+4+6+8+10 = 30

---

**Q14.** How many times does this loop execute?
```cpp
int i = 1;
while (i <= 100) {
    i = i * 2;
}
```
- (a) 100  (b) 7  (c) 50  (d) 6

> **Answer: (b) 7**
> i values: 1→2→4→8→16→32→64→128 (exceeds 100). 7 iterations.

---

**Q15.** What is the output?
```cpp
int x = 1;
do {
    cout << x << " ";
    x++;
} while (x <= 5);
```
- (a) 1 2 3 4  (b) 1 2 3 4 5  (c) 2 3 4 5  (d) 1 2 3 4 5 6

> **Answer: (b) 1 2 3 4 5**
> do-while: prints first, then checks condition.

---

**Q16.** What is the output?
```cpp
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= i; j++) {
        cout << "*";
    }
    cout << endl;
}
```
- (a) *** / *** / ***  (b) * / ** / ***  (c) *** / ** / *  (d) * / * / *

> **Answer: (b) * / ** / ***
> i=1: j runs 1 time → *
> i=2: j runs 2 times → **
> i=3: j runs 3 times → ***

---

**Q17.** What is the output?
```cpp
int count = 0;
for (int i = 0; i < 5; i++) {
    for (int j = 0; j < 5; j++) {
        count++;
    }
}
cout << count;
```
- (a) 10  (b) 25  (c) 5  (d) 30

> **Answer: (b) 25**
> Nested loop: 5 × 5 = 25 iterations.

---

**Q18.** What is the output?
```cpp
int val = 2;
switch (val) {
    case 1: cout << "A";
    case 2: cout << "B";
    case 3: cout << "C";
    default: cout << "D";
}
```
- (a) B  (b) BCD  (c) ABCD  (d) BD

> **Answer: (b) BCD**
> ⚠️ No break statements! Switch falls through from case 2 → case 3 → default.

---

**Q19.** What is the output?
```cpp
int n = 5, rev = 0;
while (n > 0) {
    rev = rev * 10 + n % 10;
    n /= 10;
}
cout << rev;
```
- (a) 5  (b) 50  (c) 0  (d) 5

> **Answer: (a) 5**
> n=5 (single digit): rev = 0*10 + 5%10 = 5. n=5/10=0. Loop ends. rev=5.

---

**Q20.** What is the output?
```cpp
int n = 1234, rev = 0;
while (n > 0) {
    rev = rev * 10 + n % 10;
    n /= 10;
}
cout << rev;
```
- (a) 1234  (b) 4321  (c) 432  (d) 1

> **Answer: (b) 4321**
> Iteration 1: rev=4, n=123
> Iteration 2: rev=43, n=12
> Iteration 3: rev=432, n=1
> Iteration 4: rev=4321, n=0

---

## 3. Pseudocode — Recursion

---

**Q21.** What is the output?
```cpp
int func(int n) {
    if (n <= 0) return 0;
    return n + func(n - 1);
}
cout << func(5);
```
- (a) 10  (b) 15  (c) 5  (d) 20

> **Answer: (b) 15**
> func(5) = 5+func(4) = 5+4+func(3) = 5+4+3+2+1+0 = 15

---

**Q22.** What is the output?
```cpp
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
cout << factorial(5);
```
- (a) 60  (b) 120  (c) 24  (d) 720

> **Answer: (b) 120**
> 5! = 5×4×3×2×1 = 120

---

**Q23.** What is the output?
```cpp
int fib(int n) {
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);
}
cout << fib(6);
```
- (a) 5  (b) 8  (c) 13  (d) 6

> **Answer: (b) 8**
> fib(0)=0, fib(1)=1, fib(2)=1, fib(3)=2, fib(4)=3, fib(5)=5, fib(6)=8

---

**Q24.** What is the output?
```cpp
void func(int n) {
    if (n == 0) return;
    func(n - 1);
    cout << n << " ";
}
func(4);
```
- (a) 4 3 2 1  (b) 1 2 3 4  (c) 0 1 2 3  (d) 1 2 3 4 5

> **Answer: (b) 1 2 3 4**
> Print happens AFTER recursive call (prints during unwinding).

---

**Q25.** What is the output?
```cpp
void func(int n) {
    if (n == 0) return;
    cout << n << " ";
    func(n - 1);
}
func(4);
```
- (a) 4 3 2 1  (b) 1 2 3 4  (c) 0 1 2 3  (d) 4 3 2 1 0

> **Answer: (a) 4 3 2 1**
> Print happens BEFORE recursive call (prints during winding).

---

**Q26.** What is the output?
```cpp
int power(int base, int exp) {
    if (exp == 0) return 1;
    return base * power(base, exp - 1);
}
cout << power(3, 4);
```
- (a) 12  (b) 27  (c) 81  (d) 64

> **Answer: (c) 81**
> 3^4 = 3×3×3×3 = 81

---

**Q27.** How many times is `func()` called?
```cpp
int func(int n) {
    if (n <= 1) return n;
    return func(n-1) + func(n-2);
}
func(5);
```
- (a) 5  (b) 9  (c) 15  (d) 25

> **Answer: (c) 15**
> Draw the recursion tree:
> func(5) calls func(4) + func(3)
> func(4) calls func(3) + func(2)
> ... total 15 calls

---

**Q28.** What is the output?
```cpp
int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}
cout << gcd(48, 18);
```
- (a) 2  (b) 3  (c) 6  (d) 12

> **Answer: (c) 6**
> gcd(48,18)→gcd(18,12)→gcd(12,6)→gcd(6,0)→6

---

## 4. Pseudocode — Arrays & Strings

---

**Q29.** What is the output?
```cpp
int arr[] = {1, 2, 3, 4, 5};
int sum = 0;
for (int i = 0; i < 5; i++) {
    if (arr[i] % 2 != 0)
        sum += arr[i];
}
cout << sum;
```
- (a) 6  (b) 9  (c) 15  (d) 10

> **Answer: (b) 9**
> Odd numbers: 1+3+5 = 9

---

**Q30.** What is the output?
```cpp
int arr[] = {5, 3, 8, 1, 9, 2};
int maxVal = arr[0];
for (int i = 1; i < 6; i++) {
    if (arr[i] > maxVal)
        maxVal = arr[i];
}
cout << maxVal;
```
- (a) 5  (b) 8  (c) 9  (d) 2

> **Answer: (c) 9**
> Finds maximum: 5→5→8→8→9→9 = 9

---

**Q31.** What is the output?
```cpp
int arr[] = {1, 2, 3, 4, 5};
for (int i = 0; i < 5; i++) {
    arr[i] = arr[i] * 2;
}
cout << arr[2] << " " << arr[4];
```
- (a) 3 5  (b) 6 10  (c) 4 8  (d) 2 4

> **Answer: (b) 6 10**
> After doubling: {2,4,6,8,10}. arr[2]=6, arr[4]=10.

---

**Q32.** What is the output?
```cpp
int arr[] = {10, 20, 30, 40, 50};
int n = 5;
for (int i = 0; i < n/2; i++) {
    int temp = arr[i];
    arr[i] = arr[n-1-i];
    arr[n-1-i] = temp;
}
for (int i = 0; i < n; i++)
    cout << arr[i] << " ";
```
- (a) 10 20 30 40 50  (b) 50 40 30 20 10  (c) 50 20 30 40 10  (d) 10 40 30 20 50

> **Answer: (b) 50 40 30 20 10**
> This reverses the array.

---

**Q33.** What is the output?
```cpp
char str[] = "HELLO";
int count = 0;
for (int i = 0; str[i] != '\0'; i++) {
    count++;
}
cout << count;
```
- (a) 4  (b) 5  (c) 6  (d) 0

> **Answer: (b) 5**
> Counts characters until null terminator: H-E-L-L-O = 5

---

**Q34.** What is the output?
```cpp
string s = "ACCENTURE";
cout << s.length() << " " << s[0] << " " << s[s.length()-1];
```
- (a) 9 A E  (b) 8 A E  (c) 9 A R  (d) 10 A E

> **Answer: (a) 9 A E**
> Length=9, first char='A', last char='E'

---

## 5. Pseudocode — Bitwise Operators

---

**Q35.** What is the output?
```cpp
int a = 12, b = 10;
cout << (a & b);
```
- (a) 8  (b) 10  (c) 12  (d) 14

> **Answer: (a) 8**
> 12 = 1100, 10 = 1010. AND: 1000 = 8

---

**Q36.** What is the output?
```cpp
int a = 12, b = 10;
cout << (a | b);
```
- (a) 8  (b) 10  (c) 12  (d) 14

> **Answer: (d) 14**
> 12 = 1100, 10 = 1010. OR: 1110 = 14

---

**Q37.** What is the output?
```cpp
int a = 12, b = 10;
cout << (a ^ b);
```
- (a) 2  (b) 4  (c) 6  (d) 8

> **Answer: (c) 6**
> 12 = 1100, 10 = 1010. XOR: 0110 = 6

---

**Q38.** What is the output?
```cpp
int x = 5;
cout << (x << 2);
```
- (a) 10  (b) 20  (c) 2  (d) 7

> **Answer: (b) 20**
> 5 << 2 = 5 × 2² = 5 × 4 = 20. Binary: 0101 → 10100

---

**Q39.** What is the output?
```cpp
int x = 20;
cout << (x >> 2);
```
- (a) 10  (b) 5  (c) 40  (d) 80

> **Answer: (b) 5**
> 20 >> 2 = 20 ÷ 2² = 20 ÷ 4 = 5. Binary: 10100 → 00101

---

**Q40.** What is the output?
```cpp
int a = 5;
cout << (~a);
```
- (a) -5  (b) -6  (c) 4  (d) -4

> **Answer: (b) -6**
> ~a = -(a+1) = -(5+1) = -6 (two's complement)

---

**Q41.** What is the value?
```cpp
int a = 7 & 5 | 3;
cout << a;
```
- (a) 1  (b) 3  (c) 5  (d) 7

> **Answer: (d) 7**
> Precedence: & before |
> 7 & 5 = (0111 & 0101) = 0101 = 5
> 5 | 3 = (0101 | 0011) = 0111 = 7

---

**Q42.** XOR trick: What is the output?
```cpp
int arr[] = {2, 3, 5, 3, 2};
int result = 0;
for (int i = 0; i < 5; i++) {
    result ^= arr[i];
}
cout << result;
```
- (a) 0  (b) 5  (c) 2  (d) 3

> **Answer: (b) 5**
> XOR: 2^3^5^3^2. Pairs cancel: (2^2)^(3^3)^5 = 0^0^5 = 5
> This finds the unique element!

---

## 6. MS Office & Common Applications

---

**Q43.** Which shortcut is used for Find & Replace in MS Word?
- (a) Ctrl+F  (b) Ctrl+H  (c) Ctrl+R  (d) Ctrl+G

> **Answer: (b) Ctrl+H**
> Ctrl+F is Find only. Ctrl+H is Find & Replace.

---

**Q44.** What is the result of =VLOOKUP in Excel?
- (a) Searches vertically in the first column and returns a value from a specified column
- (b) Searches horizontally
- (c) Counts cells
- (d) Sums a range

> **Answer: (a)**
> VLOOKUP searches vertically in the first column of a range and returns a value from a specified column.

---

**Q45.** What does the Excel formula =IF(A1>10, "Pass", "Fail") return if A1 = 8?
- (a) Pass  (b) Fail  (c) 8  (d) Error

> **Answer: (b) Fail**
> 8 > 10 is false → returns "Fail"

---

**Q46.** What is the shortcut to start a PowerPoint slideshow from the current slide?
- (a) F5  (b) Shift+F5  (c) Ctrl+F5  (d) Alt+F5

> **Answer: (b) Shift+F5**
> F5 starts from beginning. Shift+F5 from current slide.

---

**Q47.** The default file extension for Excel 2007+ is:
- (a) .xls  (b) .xlsx  (c) .csv  (d) .xlsm

> **Answer: (b) .xlsx**
> .xls is legacy. .xlsx is XML-based. .xlsm supports macros.

---

**Q48.** Which Excel function counts only non-empty cells?
- (a) COUNT  (b) COUNTA  (c) COUNTIF  (d) LEN

> **Answer: (b) COUNTA**
> COUNT counts only numeric cells. COUNTA counts all non-empty cells.

---

**Q49.** What is a Pivot Table used for in Excel?
- (a) Creating charts  (b) Summarizing and analyzing large datasets  (c) Formatting cells  (d) Printing

> **Answer: (b)**
> Pivot Tables let you summarize, sort, filter, and analyze large datasets interactively.

---

**Q50.** What is a macro in MS Office?
- (a) A type of chart  (b) An automated sequence of recorded actions  (c) A font style  (d) A file format

> **Answer: (b)**
> Macros record and replay repeated actions using VBA (Visual Basic for Applications).

---

**Q51.** What does Mail Merge in Word do?
- (a) Merges two documents  (b) Creates bulk personalized letters using a data source  (c) Converts Word to PDF  (d) Tracks changes

> **Answer: (b)**
> Mail Merge creates personalized bulk letters/labels using data from Excel, CSV, or a database.

---

**Q52.** Which Excel formula returns the position of a value in a range?
- (a) INDEX  (b) MATCH  (c) VLOOKUP  (d) FIND

> **Answer: (b) MATCH**
> MATCH returns the position (row number). INDEX returns the value at a position.

---

## 7. Networking

---

**Q53.** How many layers does the OSI model have?
- (a) 4  (b) 5  (c) 6  (d) 7

> **Answer: (d) 7**
> Physical, Data Link, Network, Transport, Session, Presentation, Application

---

**Q54.** Which layer of the OSI model is responsible for routing?
- (a) Transport  (b) Network  (c) Data Link  (d) Application

> **Answer: (b) Network (Layer 3)**
> Network layer handles IP addressing and routing (routers operate here).

---

**Q55.** Which protocol uses port 443?
- (a) HTTP  (b) FTP  (c) HTTPS  (d) SSH

> **Answer: (c) HTTPS**
> HTTP=80, HTTPS=443, FTP=21, SSH=22

---

**Q56.** What is the loopback IP address?
- (a) 0.0.0.0  (b) 192.168.1.1  (c) 127.0.0.1  (d) 255.255.255.255

> **Answer: (c) 127.0.0.1**
> Loopback (localhost) — used to test network on the local machine.

---

**Q57.** TCP uses a ___-way handshake to establish a connection.
- (a) 2  (b) 3  (c) 4  (d) 5

> **Answer: (b) 3**
> SYN → SYN-ACK → ACK

---

**Q58.** Which protocol is connectionless?
- (a) TCP  (b) HTTP  (c) UDP  (d) FTP

> **Answer: (c) UDP**
> UDP is connectionless (no handshake). TCP is connection-oriented.

---

**Q59.** Which device operates at Layer 3 of the OSI model?
- (a) Hub  (b) Switch  (c) Router  (d) Repeater

> **Answer: (c) Router**
> Hub/Repeater = Layer 1, Switch = Layer 2, Router = Layer 3.

---

**Q60.** What does DNS stand for and what does it do?
- (a) Data Network Service — transfers files
- (b) Domain Name System — translates domain names to IP addresses
- (c) Dynamic Network Setup — assigns IPs
- (d) Digital Network Security — encrypts data

> **Answer: (b)**
> DNS translates human-readable domain names (google.com) to IP addresses.

---

**Q61.** IPv4 addresses are ___-bit long.
- (a) 16  (b) 32  (c) 64  (d) 128

> **Answer: (b) 32**
> IPv4 = 32-bit (4 octets). IPv6 = 128-bit.

---

**Q62.** DHCP is used to:
- (a) Encrypt data  (b) Assign IP addresses automatically  (c) Resolve domain names  (d) Transfer files

> **Answer: (b)**
> DHCP dynamically assigns IP addresses to devices on a network (DORA process).

---

**Q63.** Which topology has the highest redundancy?
- (a) Star  (b) Bus  (c) Ring  (d) Mesh

> **Answer: (d) Mesh**
> Every node connects to every other node — highest redundancy but most expensive.

---

**Q64.** What is the subnet mask for a /24 network?
- (a) 255.0.0.0  (b) 255.255.0.0  (c) 255.255.255.0  (d) 255.255.255.255

> **Answer: (c) 255.255.255.0**
> /24 means 24 bits for network, 8 bits for host. 255.255.255.0

---

## 8. Cybersecurity

---

**Q65.** What does the "C" in the CIA triad stand for?
- (a) Control  (b) Confidentiality  (c) Compliance  (d) Certification

> **Answer: (b) Confidentiality**
> CIA = Confidentiality, Integrity, Availability

---

**Q66.** Which type of encryption uses the SAME key for encryption and decryption?
- (a) Asymmetric  (b) Hashing  (c) Symmetric  (d) Digital Signature

> **Answer: (c) Symmetric**
> Symmetric = same key (AES, DES). Asymmetric = public+private key pair (RSA).

---

**Q67.** Which of the following is a hashing algorithm?
- (a) AES  (b) RSA  (c) SHA-256  (d) DES

> **Answer: (c) SHA-256**
> AES and DES are encryption. RSA is asymmetric encryption. SHA-256 is hashing.

---

**Q68.** What is phishing?
- (a) A type of DDoS attack  (b) Sending fake emails/websites to steal credentials  (c) Injecting SQL code  (d) Intercepting network traffic

> **Answer: (b)**
> Phishing tricks users into revealing sensitive info via fake emails/websites.

---

**Q69.** A firewall is used to:
- (a) Encrypt data  (b) Filter network traffic based on rules  (c) Create backups  (d) Assign IP addresses

> **Answer: (b)**
> Firewalls filter incoming/outgoing traffic using predefined rules.

---

**Q70.** SQL Injection is an attack on:
- (a) Hardware  (b) Network  (c) Web applications / databases  (d) Operating systems

> **Answer: (c)**
> SQL Injection targets web apps by inserting malicious SQL into input fields.

---

**Q71.** What is a VPN?
- (a) Virtual Private Network — creates encrypted tunnel over public internet
- (b) Very Personal Network — local only
- (c) Visual Processing Node — handles graphics
- (d) Verified Protocol Network — checks packets

> **Answer: (a)**
> VPN creates a secure, encrypted connection over the internet.

---

**Q72.** What is the difference between IDS and IPS?
- (a) IDS blocks, IPS detects
- (b) IDS detects and alerts, IPS detects and blocks
- (c) They are the same
- (d) IDS is hardware, IPS is software

> **Answer: (b)**
> IDS = Intrusion Detection System (detect + alert). IPS = Intrusion Prevention System (detect + block).

---

**Q73.** Two-Factor Authentication (2FA) requires:
- (a) Two passwords  (b) Two different types of authentication factors  (c) Two users  (d) Two devices

> **Answer: (b)**
> 2FA uses two DIFFERENT factors: something you know (password) + something you have (OTP/phone).

---

## 9. Cloud Computing

---

**Q74.** Which cloud model provides "pay-per-use" infrastructure like virtual machines?
- (a) SaaS  (b) PaaS  (c) IaaS  (d) FaaS

> **Answer: (c) IaaS**
> IaaS provides infrastructure (VMs, storage, networking). Example: AWS EC2.

---

**Q75.** Gmail is an example of which cloud service model?
- (a) IaaS  (b) PaaS  (c) SaaS  (d) FaaS

> **Answer: (c) SaaS**
> SaaS = Software as a Service. You just use it — no management needed.

---

**Q76.** A hybrid cloud is:
- (a) Fully public cloud
- (b) A combination of public and private cloud
- (c) A cloud for one company only
- (d) A community cloud

> **Answer: (b)**
> Hybrid = Public + Private cloud working together.

---

**Q77.** Which of the following is NOT a major cloud provider?
- (a) AWS  (b) Microsoft Azure  (c) Google Cloud  (d) Oracle Linux

> **Answer: (d)**
> Oracle Linux is an OS, not a cloud provider. (Oracle Cloud is, but "Oracle Linux" is not).

---

**Q78.** What is the difference between scalability and elasticity?
- (a) They are the same
- (b) Scalability is manual, elasticity is automatic
- (c) Elasticity is manual, scalability is automatic
- (d) Neither relates to cloud

> **Answer: (b)**
> Scalability = ability to handle growth (manual or planned). Elasticity = auto scale up/down based on real-time demand.

---

**Q79.** Docker is used for:
- (a) Cloud storage  (b) Containerization — packaging apps with dependencies  (c) Database management  (d) Email services

> **Answer: (b)**
> Docker creates containers — lightweight, isolated environments to run applications.

---

**Q80.** AWS S3 is used for:
- (a) Computing  (b) Object storage  (c) Networking  (d) Monitoring

> **Answer: (b) Object storage**
> S3 = Simple Storage Service. Used for storing files, images, backups etc.

---

> **Tip: Attempt ALL 45 questions — there is NO negative marking. Even guessing is better than leaving blank!**
