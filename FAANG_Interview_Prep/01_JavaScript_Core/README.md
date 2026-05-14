# 01 — JavaScript Core (FAANG Interview Guide)

## 🎯 What They Ask
- Explain the event loop. What is the call stack?
- What are closures? Give a real-world use case.
- Difference between `var`, `let`, `const`?
- What is hoisting?
- Explain `this` keyword in different contexts.
- What are Promises? How does async/await work?
- Explain prototypal inheritance.
- Implement debounce / throttle / deep clone.
- What is the output of [tricky code snippet]?

---

## 1. Event Loop & Call Stack

### Theory
JavaScript is **single-threaded** but **non-blocking** thanks to the event loop.

```
┌──────────────────────────────────┐
│          CALL STACK              │  ← Executes code (LIFO)
│  ┌────────────────────────┐     │
│  │ function3()            │     │
│  │ function2()            │     │
│  │ function1()            │     │
│  └────────────────────────┘     │
└──────────────────────────────────┘
          ↕ (finished? pop)
┌──────────────────────────────────┐
│         EVENT LOOP               │  ← Checks: "Is stack empty?"
│   "If stack empty, pick from     │     If yes → pick from queue
│    callback queue"               │
└──────────────────────────────────┘
          ↕
┌──────────────────────────────────┐
│      CALLBACK QUEUE              │  ← setTimeout, I/O callbacks
│  [cb1] [cb2] [cb3]              │
└──────────────────────────────────┘
          ↕
┌──────────────────────────────────┐
│     MICROTASK QUEUE              │  ← Promises (.then), queueMicrotask
│  [p1] [p2]                      │     ⚡ HIGHER PRIORITY than callback queue
└──────────────────────────────────┘
```

**Key Rule:** Microtask queue (Promises) is ALWAYS drained before callback queue (setTimeout).

### 💻 Code — Classic Interview Question

```javascript
console.log("1");                          // 1. Sync → runs immediately

setTimeout(() => console.log("2"), 0);     // 4. Callback queue → runs LAST

Promise.resolve().then(() => console.log("3")); // 3. Microtask → runs before setTimeout

console.log("4");                          // 2. Sync → runs immediately

// Output: 1, 4, 3, 2
// WHY: Sync first (1,4), then microtasks (3), then callbacks (2)
```

### 🔥 Scenario Question
> **Q: "A user clicks a button that triggers an API call. Explain the flow."**

**Answer:** Click event → handler pushed to call stack → `fetch()` called → browser sends HTTP request (Web API handles it, not JS) → call stack is free → response arrives → `.then()` callback added to microtask queue → event loop checks stack is empty → picks callback → executes `.then()` handler.

---

## 2. Closures

### Theory
A closure is when a function **remembers** the variables from its outer scope even after the outer function has returned.

```
┌─ outer() scope ──────────────┐
│  let count = 0               │
│                              │
│  ┌─ inner() ──────────────┐  │
│  │  count++               │  │  ← inner() "closes over" count
│  │  return count           │  │
│  └────────────────────────┘  │
└──────────────────────────────┘

outer() returns inner().
outer() is gone from call stack.
But inner() STILL has access to count!
```

### 💻 Code

```javascript
// ✅ Real use case: Private variables (Module Pattern)
function createCounter() {
  let count = 0;  // private — cannot be accessed from outside!
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
counter.increment();
counter.increment();
console.log(counter.getCount()); // 2
console.log(counter.count);      // undefined — truly private!

// ✅ Real use case: Debounce (asked in EVERY frontend interview)
function debounce(fn, delay) {
  let timer;                      // closure variable
  return function (...args) {
    clearTimeout(timer);          // cancel previous
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const search = debounce((query) => {
  console.log("Searching:", query);
}, 300);

search("h");
search("he");
search("hel");
search("hello");   // Only this one fires after 300ms
```

### Classic Trap — `var` in loop

```javascript
// ❌ BUG: All print 3
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3  (var is function-scoped, same i)

// ✅ FIX 1: Use let (block-scoped)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 0, 1, 2

// ✅ FIX 2: Use closure (IIFE)
for (var i = 0; i < 3; i++) {
  ((j) => {
    setTimeout(() => console.log(j), 100);
  })(i);
}
```

---

## 3. Hoisting

### Theory
JavaScript **moves declarations** to the top of their scope before execution.

| Declaration | Hoisted? | Initialized? | TDZ? |
|-------------|----------|-------------|------|
| `var` | ✅ Yes | ✅ `undefined` | ❌ No |
| `let` | ✅ Yes | ❌ No | ✅ Yes (Temporal Dead Zone) |
| `const` | ✅ Yes | ❌ No | ✅ Yes |
| `function` declaration | ✅ Yes | ✅ Full function | ❌ No |
| `function` expression | Depends on `var`/`let`/`const` | ❌ No | Depends |

### 💻 Code

```javascript
// var hoisting
console.log(x);    // undefined (hoisted but not initialized)
var x = 5;

// let/const — Temporal Dead Zone (TDZ)
console.log(y);    // ❌ ReferenceError: Cannot access 'y' before initialization
let y = 10;

// Function declaration — fully hoisted
greet();           // "Hello!" — works even before declaration
function greet() { console.log("Hello!"); }

// Function expression — NOT fully hoisted
sayBye();          // ❌ TypeError: sayBye is not a function
var sayBye = function() { console.log("Bye!"); };
```

---

## 4. `this` Keyword

### Theory

```
┌──────────────────────────────────────────────────────┐
│ Context              │ this =                        │
├──────────────────────┼───────────────────────────────┤
│ Global (browser)     │ window                        │
│ Global (Node.js)     │ global / module.exports       │
│ Object method        │ The object calling the method │
│ Arrow function       │ Inherits from parent scope    │
│ Constructor (new)    │ The new instance              │
│ call/apply/bind      │ Whatever you pass             │
│ Event handler        │ The DOM element               │
└──────────────────────┴───────────────────────────────┘
```

### 💻 Code

```javascript
const user = {
  name: "Alice",
  // Regular function: `this` = user
  greet() {
    console.log(`Hi, I'm ${this.name}`);   // "Hi, I'm Alice"
  },
  // Arrow function: `this` = parent scope (NOT user)
  greetArrow: () => {
    console.log(`Hi, I'm ${this.name}`);   // "Hi, I'm undefined" ← GOTCHA!
  },
  // Nested scenario
  delayedGreet() {
    // ❌ BAD: Regular function inside — loses `this`
    setTimeout(function() {
      console.log(this.name);              // undefined
    }, 100);
    
    // ✅ GOOD: Arrow function inherits `this` from delayedGreet
    setTimeout(() => {
      console.log(this.name);              // "Alice"
    }, 100);
  }
};

// call / apply / bind
function introduce(greeting) {
  console.log(`${greeting}, I'm ${this.name}`);
}
introduce.call(user, "Hey");     // "Hey, I'm Alice"
introduce.apply(user, ["Hey"]);  // same (args as array)

const boundFn = introduce.bind(user, "Hey");
boundFn();                        // "Hey, I'm Alice"
```

---

## 5. Promises & Async/Await

### Theory — Promise Lifecycle

```
                    ┌──────────┐
                    │ PENDING  │
                    └────┬─────┘
                    ┌────┴─────┐
               ┌────┴──┐  ┌───┴────┐
               │FULFILLED│  │REJECTED│
               │(.then) │  │(.catch)│
               └────────┘  └────────┘
                    │
              ┌─────┴──────┐
              │  .finally() │  ← Always runs
              └─────────────┘
```

### 💻 Code

```javascript
// Creating a Promise
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) resolve({ id, name: "Alice" });
      else reject(new Error("Invalid ID"));
    }, 1000);
  });
}

// Using .then/.catch
fetchUser(1)
  .then(user => console.log(user))       // { id: 1, name: "Alice" }
  .catch(err => console.error(err))
  .finally(() => console.log("Done"));

// Using async/await (PREFERRED in interviews)
async function getUser() {
  try {
    const user = await fetchUser(1);
    console.log(user);
  } catch (err) {
    console.error(err);
  }
}

// ⭐ Promise.all — parallel execution (FAANG favorite)
async function getDashboard() {
  const [user, orders, notifications] = await Promise.all([
    fetchUser(1),
    fetchOrders(1),
    fetchNotifications(1)
  ]);
  // All 3 run in PARALLEL — much faster than sequential awaits
}

// ⭐ Implement Promise.all (common coding question)
function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = value;   // maintain order
          completed++;
          if (completed === promises.length) resolve(results);
        })
        .catch(reject);            // reject on FIRST failure
    });
  });
}
```

---

## 6. Prototypal Inheritance

### Theory

```
┌──────────────┐
│   Object     │  ← Object.prototype (top of chain)
│  .toString() │
│  .hasOwnProp │
└──────┬───────┘
       │ __proto__
┌──────┴───────┐
│   Animal     │  ← Animal.prototype
│  .eat()      │
└──────┬───────┘
       │ __proto__
┌──────┴───────┐
│    Dog       │  ← Dog.prototype
│  .bark()     │
└──────────────┘

dog.bark()     → found on Dog.prototype ✅
dog.eat()      → not on Dog → check Animal.prototype → found ✅
dog.toString() → not on Dog → not on Animal → check Object → found ✅
dog.fly()      → not anywhere → undefined
```

### 💻 Code

```javascript
// ES6 Classes (syntactic sugar over prototypes)
class Animal {
  constructor(name) {
    this.name = name;
  }
  eat() {
    console.log(`${this.name} is eating`);
  }
}

class Dog extends Animal {
  bark() {
    console.log(`${this.name} says Woof!`);
  }
}

const dog = new Dog("Rex");
dog.bark();  // "Rex says Woof!"
dog.eat();   // "Rex is eating" — inherited from Animal

// Under the hood:
console.log(dog.__proto__ === Dog.prototype);           // true
console.log(Dog.prototype.__proto__ === Animal.prototype); // true
```

---

## 7. Must-Know Implementations

### Debounce
```javascript
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
```

### Throttle
```javascript
function throttle(fn, limit) {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
```

### Deep Clone
```javascript
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  
  const clone = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key]);
    }
  }
  return clone;
}
```

### Flat Array
```javascript
function flatten(arr, depth = Infinity) {
  return arr.reduce((acc, val) => {
    if (Array.isArray(val) && depth > 0) {
      acc.push(...flatten(val, depth - 1));
    } else {
      acc.push(val);
    }
    return acc;
  }, []);
}

flatten([1, [2, [3, [4]]]]); // [1, 2, 3, 4]
```

---

## ⚡ Quick Revision

| Concept | One-liner |
|---------|-----------|
| Event Loop | Single thread + callback queue + microtask queue; microtasks first |
| Closure | Function remembers outer scope variables after outer returns |
| Hoisting | Declarations moved to top; `var`=undefined, `let/const`=TDZ |
| `this` | Depends on HOW function is called, not where defined |
| Arrow functions | No own `this`, no `arguments`, can't be constructor |
| Promise | Object representing eventual completion/failure of async op |
| `async/await` | Syntactic sugar over Promises; try/catch for errors |
| Prototype chain | Objects inherit from prototype; chain ends at `Object.prototype` |
| `==` vs `===` | `==` coerces types; `===` strict (always use `===`) |
| Spread `...` | Shallow copy for arrays/objects |
