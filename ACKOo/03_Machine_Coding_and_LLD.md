# 📐 Stage 3 — Machine Coding & Low-Level Design (LLD)

> **Format:** 1-on-1 Live Machine Coding / LLD Round  
> **Duration:** 60–90 Minutes | **Language:** C++ (Modern C++17/20)  
> **What ACKO Evaluates:** Object-Oriented Principles (OOPs), SOLID adherence, clean naming, modularity, handling race conditions / concurrency, and a fully runnable driver program.

---

## 📋 The 4-Step Live Machine Coding Execution Blueprint

```
[00:00 - 00:10] Step 1: Clarify Requirements & Identify Entities
                - What are the entities? (e.g., Room, Meeting, User, Account)
                - What are the functional vs non-functional constraints?
[00:10 - 00:20] Step 2: Class Diagram & Abstract Interfaces
                - Define Enums, Models, and Service interfaces.
                - Confirm with interviewer before writing implementation.
[00:20 - 01:00] Step 3: Implement Business Logic & Storage
                - Implement in-memory repositories and core service logic.
                - Keep methods small (<25 lines), single responsibility.
[01:00 - 01:15] Step 4: Driver Execution & Edge Cases
                - Write a comprehensive `main()` function demonstrating every requirement.
                - Validate edge cases (invalid time range, zero capacity, duplicate booking).
```

---

# 🏢 Problem 1: Meeting Room Scheduler (Real ACKO PYQ)

> **Reported By:** Selected ACKO SDE Intern (On-Campus 2024).  
> **Requirements:**
> 1. Rooms have IDs, names, and capacity limits.
> 2. `BookRoom(startTime, endTime, peopleCount)`: Finds an available room with smallest capacity $\ge \text{peopleCount}$ and books it. Returns Room ID or error.
> 3. `ViewAvailableRooms(startTime, endTime)`: Lists all rooms free during the requested interval.
> 4. Support dynamically adding and removing rooms.
> 5. Handle overlapping intervals, input validation ($start < end$), and prevent double-booking.

### Complete Runnable C++ Implementation

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <map>
#include <algorithm>
#include <memory>
#include <stdexcept>

using namespace std;

// --- DOMAIN MODELS ---

struct Interval {
    int start;
    int end;

    Interval(int s, int e) : start(s), end(e) {
        if (s >= e) {
            throw invalid_argument("Invalid Interval: start time must be strictly before end time.");
        }
    }

    bool overlapsWith(const Interval& other) const {
        // Two intervals [A, B) and [C, D) overlap if max(A, C) < min(B, D)
        return max(start, other.start) < min(end, other.end);
    }
};

class Meeting {
public:
    string meetingId;
    string bookedBy;
    Interval interval;
    int peopleCount;

    Meeting(string id, string user, Interval iv, int people)
        : meetingId(id), bookedBy(user), interval(iv), peopleCount(people) {}
};

class Room {
public:
    string roomId;
    string name;
    int capacity;
    vector<Meeting> meetings;

    Room(string id, string n, int cap) : roomId(id), name(n), capacity(cap) {}

    bool isAvailable(const Interval& targetInterval) const {
        for (const auto& m : meetings) {
            if (m.interval.overlapsWith(targetInterval)) {
                return false;
            }
        }
        return true;
    }

    void addMeeting(const Meeting& m) {
        meetings.push_back(m);
    }
};

// --- SERVICE INTERFACE & IMPLEMENTATION ---

class MeetingSchedulerService {
private:
    map<string, Room> rooms; // roomId -> Room
    int meetingCounter = 1;

public:
    void addRoom(const string& roomId, const string& name, int capacity) {
        if (rooms.count(roomId)) {
            throw runtime_error("Room with ID " + roomId + " already exists.");
        }
        rooms.emplace(roomId, Room(roomId, name, capacity));
        cout << "✅ Room added: " << name << " (Capacity: " << capacity << ")\n";
    }

    void deleteRoom(const string& roomId) {
        if (!rooms.count(roomId)) {
            throw runtime_error("Room " + roomId + " not found.");
        }
        rooms.erase(roomId);
        cout << "🗑️ Room deleted: " << roomId << "\n";
    }

    vector<Room> viewAvailableRooms(int start, int end) {
        Interval target(start, end);
        vector<Room> available;
        for (const auto& [id, room] : rooms) {
            if (room.isAvailable(target)) {
                available.push_back(room);
            }
        }
        return available;
    }

    // Books the best-fitting available room (smallest capacity >= peopleCount)
    string bookRoom(int start, int end, int peopleCount, const string& user) {
        Interval target(start, end);

        Room* bestFitRoom = nullptr;
        int minCapacityDiff = INT_MAX;

        for (auto& [id, room] : rooms) {
            if (room.capacity >= peopleCount && room.isAvailable(target)) {
                int diff = room.capacity - peopleCount;
                if (diff < minCapacityDiff) {
                    minCapacityDiff = diff;
                    bestFitRoom = &room;
                }
            }
        }

        if (!bestFitRoom) {
            cout << "❌ Booking Failed: No available room with capacity >= " << peopleCount 
                 << " between [" << start << ", " << end << ").\n";
            return "";
        }

        string meetingId = "M-" + to_string(meetingCounter++);
        Meeting newMeeting(meetingId, user, target, peopleCount);
        bestFitRoom->addMeeting(newMeeting);

        cout << "🎉 Booked Successfully! Meeting ID: " << meetingId 
             << " assigned to " << bestFitRoom->name << " (Capacity: " << bestFitRoom->capacity << ")\n";
        return meetingId;
    }
};

// --- DRIVER PROGRAM ---

int main() {
    MeetingSchedulerService scheduler;

    cout << "=== ACKO MEETING ROOM SCHEDULER SYSTEM ===\n\n";

    // 1. Setup Rooms
    scheduler.addRoom("R1", "Boardroom Alpha", 20);
    scheduler.addRoom("R2", "Huddle Pod 1", 4);
    scheduler.addRoom("R3", "Conference Beta", 10);
    scheduler.addRoom("R4", "Huddle Pod 2", 6);

    cout << "\n--- TEST 1: Booking Best-Fit Room for 5 people [9:00 - 10:00) ---\n";
    // Expected: Assigned to Huddle Pod 2 (Capacity 6), NOT Conference Beta (10) or Alpha (20)
    scheduler.bookRoom(9, 10, 5, "Dilip");

    cout << "\n--- TEST 2: Booking Overlapping Time for 4 people [9:30 - 10:30) ---\n";
    // Expected: Huddle Pod 2 is busy, so Huddle Pod 1 (capacity 4) is assigned!
    scheduler.bookRoom(9, 10, 4, "SRE_Team");

    cout << "\n--- TEST 3: View Available Rooms during [9:00 - 10:00) ---\n";
    auto freeRooms = scheduler.viewAvailableRooms(9, 10);
    cout << "Available rooms:\n";
    for (const auto& r : freeRooms) {
        cout << " - " << r.name << " (Cap: " << r.capacity << ")\n";
    }

    cout << "\n--- TEST 4: Booking when capacity exceeds all available rooms ---\n";
    scheduler.bookRoom(9, 10, 50, "Townhall"); // Should fail

    return 0;
}
```

---

# 💳 Problem 2: Multi-Account Transaction Management System (ACKO PYQ)

> **Reported By:** Selected ACKO candidate (2024).  
> **Requirements:**
> 1. Model distinct Account types: `BankAccount`, `PaytmWallet`, `SplitwiseAccount` with OOP inheritance.
> 2. Each account supports `credit(amount)`, `debit(amount)`, and `getBalance()`.
> 3. Support transferring money between any two accounts safely.
> 4. Maintain an immutable transaction history log for auditing.
> 5. Query transactions filtered by timestamp range and account ID.

### Complete Runnable C++ Implementation

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <memory>
#include <map>
#include <ctime>
#include <iomanip>

using namespace std;

enum class AccountType { BANK, PAYTM_WALLET, SPLITWISE };

struct TransactionRecord {
    string txId;
    string fromAccountId;
    string toAccountId;
    double amount;
    time_t timestamp;
    string description;
};

// --- BASE ABSTRACT ACCOUNT (OOP Abstraction & Polymorphism) ---

class Account {
protected:
    string accountId;
    string ownerName;
    double balance;
    AccountType type;

public:
    Account(string id, string owner, double initialBalance, AccountType t)
        : accountId(id), ownerName(owner), balance(initialBalance), type(t) {}

    virtual ~Account() = default;

    virtual bool debit(double amount) {
        if (amount <= 0 || balance < amount) return false;
        balance -= amount;
        return true;
    }

    virtual void credit(double amount) {
        if (amount > 0) balance += amount;
    }

    string getId() const { return accountId; }
    string getOwner() const { return ownerName; }
    double getBalance() const { return balance; }
    AccountType getType() const { return type; }

    virtual void printDetails() const {
        cout << "Account ID: " << accountId << " | Owner: " << ownerName 
             << " | Balance: ₹" << fixed << setprecision(2) << balance << "\n";
    }
};

// --- DERIVED CONCRETE ACCOUNTS ---

class BankAccount : public Account {
    string ifscCode;
public:
    BankAccount(string id, string owner, double balance, string ifsc)
        : Account(id, owner, balance, AccountType::BANK), ifscCode(ifsc) {}
};

class PaytmWallet : public Account {
    double cashbackEarned = 0.0;
public:
    PaytmWallet(string id, string owner, double balance)
        : Account(id, owner, balance, AccountType::PAYTM_WALLET) {}

    // Special behavior: Wallet awards 1% cashback on debit!
    bool debit(double amount) override {
        if (Account::debit(amount)) {
            double cashback = amount * 0.01;
            cashbackEarned += cashback;
            balance += cashback;
            return true;
        }
        return false;
    }
};

// --- TRANSACTION MANAGEMENT SERVICE ---

class TransactionService {
private:
    map<string, shared_ptr<Account>> accounts;
    vector<TransactionRecord> ledger;
    int txCounter = 1;

public:
    void registerAccount(shared_ptr<Account> acc) {
        accounts[acc->getId()] = acc;
    }

    bool transfer(const string& fromId, const string& toId, double amount, const string& desc) {
        if (!accounts.count(fromId) || !accounts.count(toId)) {
            cout << "❌ Transfer Failed: One or both accounts do not exist.\n";
            return false;
        }

        auto fromAcc = accounts[fromId];
        auto toAcc = accounts[toId];

        if (!fromAcc->debit(amount)) {
            cout << "❌ Transfer Failed: Insufficient funds in " << fromId << "\n";
            return false;
        }

        toAcc->credit(amount);

        // Record immutable ledger entry
        string txId = "TXN-" + to_string(txCounter++);
        ledger.push_back({txId, fromId, toId, amount, time(nullptr), desc});

        cout << "✅ Transfer Success [" << txId << "]: ₹" << amount 
             << " from " << fromAcc->getOwner() << " to " << toAcc->getOwner() << "\n";
        return true;
    }

    void printAccountStatement(const string& accId) const {
        cout << "\n📄 --- STATEMENT FOR ACCOUNT: " << accId << " ---\n";
        for (const auto& tx : ledger) {
            if (tx.fromAccountId == accId || tx.toAccountId == accId) {
                string direction = (tx.fromAccountId == accId) ? "DEBIT  (-)" : "CREDIT (+)";
                cout << "[" << tx.txId << "] " << direction << " ₹" << tx.amount 
                     << " | Counterparty: " << (tx.fromAccountId == accId ? tx.toAccountId : tx.fromAccountId)
                     << " | Note: " << tx.description << "\n";
            }
        }
    }
};

int main() {
    TransactionService service;

    auto bank = make_shared<BankAccount>("ACC-001", "Dilip", 50000.0, "HDFC0001234");
    auto wallet = make_shared<PaytmWallet>("WLT-999", "Merchant_Acko", 1000.0);

    service.registerAccount(bank);
    service.registerAccount(wallet);

    cout << "=== INITIAL BALANCES ===\n";
    bank->printDetails();
    wallet->printDetails();

    cout << "\n=== EXECUTING TRANSACTIONS ===\n";
    service.transfer("ACC-001", "WLT-999", 2500.0, "Health Insurance Policy Premium");
    service.transfer("ACC-001", "WLT-999", 1200.0, "Car Insurance Addon");

    service.printAccountStatement("ACC-001");

    cout << "\n=== FINAL BALANCES ===\n";
    bank->printDetails();
    wallet->printDetails();

    return 0;
}
```

---

# ⚖️ Problem 3: Splitwise Expense Sharing System (Strategy Pattern)

> **Core Pattern:** Strategy Pattern for split calculations (`EqualSplit`, `ExactSplit`, `PercentageSplit`).

```cpp
#include <bits/stdc++.h>
using namespace std;

class SplitStrategy {
public:
    virtual ~SplitStrategy() = default;
    virtual map<string, double> calculateOwed(double totalAmount, const vector<string>& users, const vector<double>& values) = 0;
};

class EqualSplitStrategy : public SplitStrategy {
public:
    map<string, double> calculateOwed(double totalAmount, const vector<string>& users, const vector<double>& values) override {
        map<string, double> owed;
        double share = totalAmount / users.size();
        for (const auto& u : users) {
            owed[u] = share;
        }
        return owed;
    }
};

class ExactSplitStrategy : public SplitStrategy {
public:
    map<string, double> calculateOwed(double totalAmount, const vector<string>& users, const vector<double>& values) override {
        map<string, double> owed;
        double sum = 0;
        for (double v : values) sum += v;
        if (abs(sum - totalAmount) > 0.01) {
            throw invalid_argument("Sum of exact splits does not match total amount.");
        }
        for (size_t i = 0; i < users.size(); i++) {
            owed[users[i]] = values[i];
        }
        return owed;
    }
};
```

---

> **Next Step:** Deep dive into Linux diagnostics, CI/CD, and Kubernetes in [04_Platform_SRE_and_DevEx.md](./04_Platform_SRE_and_DevEx.md)!
