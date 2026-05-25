# 🅱️ Bootstrap 5 — Complete Study Guide

> **Module 1 | Digital Nurture 5.0 — Java FSE Upskilling**

---

## 📋 Topics Covered

1. [Introduction to Bootstrap 5](#1-introduction-to-bootstrap-5)
2. [Bootstrap Grid System](#2-bootstrap-grid-system)
3. [Bootstrap Components](#3-bootstrap-components)
4. [Bootstrap Utilities and Helpers](#4-bootstrap-utilities-and-helpers)
5. [Advanced Bootstrap 5 Features](#5-advanced-bootstrap-5-features)
6. [Practice Questions](#6-practice-questions)

---

## 1. Introduction to Bootstrap 5

### 📌 What is Bootstrap?

**Bootstrap** is the world's most popular front-end CSS framework for building responsive, mobile-first websites quickly. It provides pre-built CSS classes and JavaScript components.

### Key Features of Bootstrap 5

| Feature | Description |
|---------|-------------|
| **Responsive** | Adapts to all screen sizes automatically |
| **Mobile-First** | Designed for small screens first, then scales up |
| **Pre-built Components** | Buttons, cards, modals, navbars, etc. |
| **Grid System** | 12-column responsive layout system |
| **Utility Classes** | Rapid styling without writing CSS |
| **No jQuery** | Bootstrap 5 dropped jQuery dependency |
| **Customizable** | Sass variables for easy theming |

### Bootstrap 5 vs Bootstrap 4

| Feature | Bootstrap 4 | Bootstrap 5 |
|---------|-------------|-------------|
| jQuery | ✅ Required | ❌ Removed |
| CSS Grid | ❌ | ✅ Optional |
| RTL Support | ❌ | ✅ |
| New Components | — | Offcanvas, Accordions improved |
| Forms | `.form-group` | `.form-floating`, simplified |
| Utilities API | Limited | Extended & Customizable |

### Setting Up Bootstrap 5

#### Method 1: CDN (Quick Start)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bootstrap 5 Page</title>

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet">
</head>
<body>

    <h1 class="text-center text-primary">Hello Bootstrap!</h1>

    <!-- Bootstrap JS (with Popper.js for dropdowns, tooltips) -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

#### Method 2: npm Installation

```bash
npm install bootstrap@5.3.0
```

```javascript
// Import in JS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
```

### Bootstrap File Structure

```
bootstrap/
├── css/
│   ├── bootstrap.css          ← Full CSS
│   ├── bootstrap.min.css      ← Minified CSS (use this)
│   ├── bootstrap-grid.css     ← Grid only
│   ├── bootstrap-reboot.css   ← Reset/Normalize only
│   └── bootstrap-utilities.css ← Utilities only
├── js/
│   ├── bootstrap.js           ← Full JS
│   ├── bootstrap.min.js       ← Minified JS
│   └── bootstrap.bundle.min.js ← JS + Popper (use this)
└── scss/                       ← Sass source files
```

---

## 2. Bootstrap Grid System

### 📌 How the Grid Works

Bootstrap uses a **12-column** flexbox-based grid system. Content is placed in **rows** inside **containers**, and each row can have up to 12 column-units.

```
Container → Row → Columns (total = 12)

|--- col-4 ---|--- col-4 ---|--- col-4 ---|
|------------ col-6 ---------|--- col-6 ---|
|----------------- col-12 ------------------|
```

### Containers

```html
<!-- Fixed-width centered container -->
<div class="container">Content</div>

<!-- Full-width container -->
<div class="container-fluid">Content</div>

<!-- Responsive containers (100% until breakpoint) -->
<div class="container-sm">100% until 576px, then fixed</div>
<div class="container-md">100% until 768px, then fixed</div>
<div class="container-lg">100% until 992px, then fixed</div>
<div class="container-xl">100% until 1200px, then fixed</div>
<div class="container-xxl">100% until 1400px, then fixed</div>
```

### Grid Breakpoints

| Breakpoint | Class Infix | Screen Width |
|-----------|-------------|--------------|
| Extra small | (none) | < 576px |
| Small | `sm` | ≥ 576px |
| Medium | `md` | ≥ 768px |
| Large | `lg` | ≥ 992px |
| Extra large | `xl` | ≥ 1200px |
| XXL | `xxl` | ≥ 1400px |

### Column Layouts

```html
<!-- Equal width columns -->
<div class="container">
    <div class="row">
        <div class="col">Column 1</div>
        <div class="col">Column 2</div>
        <div class="col">Column 3</div>
    </div>
</div>

<!-- Specific widths (total = 12) -->
<div class="row">
    <div class="col-4">4 units</div>
    <div class="col-4">4 units</div>
    <div class="col-4">4 units</div>
</div>

<div class="row">
    <div class="col-3">Sidebar</div>
    <div class="col-9">Main Content</div>
</div>

<!-- Responsive columns -->
<div class="row">
    <!-- Full width on mobile, 2 columns on tablet, 4 on desktop -->
    <div class="col-12 col-md-6 col-lg-3">Column 1</div>
    <div class="col-12 col-md-6 col-lg-3">Column 2</div>
    <div class="col-12 col-md-6 col-lg-3">Column 3</div>
    <div class="col-12 col-md-6 col-lg-3">Column 4</div>
</div>

<!-- Auto-sizing columns -->
<div class="row">
    <div class="col-auto">Fits content width</div>
    <div class="col">Takes remaining space</div>
</div>
```

### Alignment and Reordering

```html
<!-- Horizontal alignment -->
<div class="row justify-content-start">Left aligned</div>
<div class="row justify-content-center">Center aligned</div>
<div class="row justify-content-end">Right aligned</div>
<div class="row justify-content-between">Space between</div>
<div class="row justify-content-around">Space around</div>
<div class="row justify-content-evenly">Space evenly</div>

<!-- Vertical alignment -->
<div class="row align-items-start" style="height: 200px;">Top</div>
<div class="row align-items-center" style="height: 200px;">Middle</div>
<div class="row align-items-end" style="height: 200px;">Bottom</div>

<!-- Individual column alignment -->
<div class="row" style="height: 200px;">
    <div class="col align-self-start">Top</div>
    <div class="col align-self-center">Middle</div>
    <div class="col align-self-end">Bottom</div>
</div>

<!-- Reordering -->
<div class="row">
    <div class="col order-3">First in code, third visually</div>
    <div class="col order-1">Second in code, first visually</div>
    <div class="col order-2">Third in code, second visually</div>
</div>

<!-- Offset -->
<div class="row">
    <div class="col-md-4 offset-md-4">Centered column</div>
</div>

<!-- Nesting -->
<div class="row">
    <div class="col-md-8">
        <div class="row">
            <div class="col-6">Nested col 1</div>
            <div class="col-6">Nested col 2</div>
        </div>
    </div>
    <div class="col-md-4">Sidebar</div>
</div>
```

### Responsive Flexbox Utilities

```html
<!-- Display -->
<div class="d-flex">Flex container</div>
<div class="d-inline-flex">Inline flex container</div>

<!-- Direction -->
<div class="d-flex flex-row">Horizontal (default)</div>
<div class="d-flex flex-column">Vertical</div>
<div class="d-flex flex-row-reverse">Horizontal reversed</div>

<!-- Wrap -->
<div class="d-flex flex-wrap">Wrap items</div>
<div class="d-flex flex-nowrap">No wrap (default)</div>

<!-- Justify content -->
<div class="d-flex justify-content-center">Center</div>
<div class="d-flex justify-content-between">Space between</div>

<!-- Align items -->
<div class="d-flex align-items-center" style="height: 100px;">Vertically centered</div>

<!-- Gap -->
<div class="d-flex gap-3">Items with gap</div>

<!-- Grow / Shrink -->
<div class="d-flex">
    <div class="flex-grow-1">Takes remaining space</div>
    <div class="flex-shrink-0">Won't shrink</div>
</div>
```

---

## 3. Bootstrap Components

### Typography

```html
<!-- Headings -->
<h1>h1 heading</h1>
<h2>h2 heading</h2>
<p class="h1">Paragraph styled as h1</p>

<!-- Display headings (larger, lighter) -->
<h1 class="display-1">Display 1</h1>
<h1 class="display-4">Display 4</h1>

<!-- Lead paragraph -->
<p class="lead">This is a lead paragraph that stands out.</p>

<!-- Text formatting -->
<p class="fw-bold">Bold text</p>
<p class="fw-normal">Normal weight</p>
<p class="fw-light">Light weight</p>
<p class="fst-italic">Italic text</p>
<p class="text-decoration-underline">Underlined</p>
<p class="text-decoration-line-through">Strikethrough</p>

<!-- Text alignment -->
<p class="text-start">Left aligned</p>
<p class="text-center">Center aligned</p>
<p class="text-end">Right aligned</p>

<!-- Text transformation -->
<p class="text-lowercase">LOWERCASE</p>
<p class="text-uppercase">uppercase</p>
<p class="text-capitalize">capitalize each word</p>

<!-- Blockquote -->
<blockquote class="blockquote">
    <p>A well-known quote.</p>
    <footer class="blockquote-footer">
        Source <cite title="Source Title">Book Title</cite>
    </footer>
</blockquote>

<!-- Lists -->
<ul class="list-unstyled">No bullets</ul>
<ul class="list-inline">
    <li class="list-inline-item">Item 1</li>
    <li class="list-inline-item">Item 2</li>
</ul>
```

### Forms

```html
<!-- Basic Form -->
<form>
    <!-- Text input with label -->
    <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control" id="name" placeholder="Enter name">
    </div>

    <!-- Email -->
    <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email">
        <div class="form-text">We'll never share your email.</div>
    </div>

    <!-- Password -->
    <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password">
    </div>

    <!-- Select -->
    <div class="mb-3">
        <label for="city" class="form-label">City</label>
        <select class="form-select" id="city">
            <option selected>Select City</option>
            <option value="mumbai">Mumbai</option>
            <option value="delhi">Delhi</option>
        </select>
    </div>

    <!-- Textarea -->
    <div class="mb-3">
        <label for="message" class="form-label">Message</label>
        <textarea class="form-control" id="message" rows="3"></textarea>
    </div>

    <!-- Checkbox -->
    <div class="form-check mb-3">
        <input class="form-check-input" type="checkbox" id="terms">
        <label class="form-check-label" for="terms">I agree to terms</label>
    </div>

    <!-- Radio -->
    <div class="form-check">
        <input class="form-check-input" type="radio" name="gender" id="male">
        <label class="form-check-label" for="male">Male</label>
    </div>
    <div class="form-check mb-3">
        <input class="form-check-input" type="radio" name="gender" id="female">
        <label class="form-check-label" for="female">Female</label>
    </div>

    <!-- Switch -->
    <div class="form-check form-switch mb-3">
        <input class="form-check-input" type="checkbox" id="notifications">
        <label class="form-check-label" for="notifications">Enable notifications</label>
    </div>

    <!-- File -->
    <div class="mb-3">
        <label for="file" class="form-label">Upload file</label>
        <input class="form-control" type="file" id="file">
    </div>

    <!-- Floating labels -->
    <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingName" placeholder="Name">
        <label for="floatingName">Full Name</label>
    </div>

    <!-- Input group -->
    <div class="input-group mb-3">
        <span class="input-group-text">@</span>
        <input type="text" class="form-control" placeholder="Username">
    </div>

    <!-- Sizes -->
    <input class="form-control form-control-lg" type="text" placeholder="Large">
    <input class="form-control form-control-sm" type="text" placeholder="Small">

    <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

### Buttons

```html
<!-- Button styles -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-success">Success</button>
<button class="btn btn-danger">Danger</button>
<button class="btn btn-warning">Warning</button>
<button class="btn btn-info">Info</button>
<button class="btn btn-light">Light</button>
<button class="btn btn-dark">Dark</button>
<button class="btn btn-link">Link</button>

<!-- Outline buttons -->
<button class="btn btn-outline-primary">Outline Primary</button>
<button class="btn btn-outline-danger">Outline Danger</button>

<!-- Sizes -->
<button class="btn btn-primary btn-lg">Large</button>
<button class="btn btn-primary btn-sm">Small</button>

<!-- Block button (full width) -->
<div class="d-grid">
    <button class="btn btn-primary">Block Button</button>
</div>

<!-- Disabled -->
<button class="btn btn-primary" disabled>Disabled</button>

<!-- Button group -->
<div class="btn-group">
    <button class="btn btn-primary">Left</button>
    <button class="btn btn-primary">Middle</button>
    <button class="btn btn-primary">Right</button>
</div>
```

### Navbar

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
        <!-- Brand -->
        <a class="navbar-brand" href="#">MyApp</a>

        <!-- Toggler for mobile -->
        <button class="navbar-toggler" type="button"
                data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Nav items -->
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
                <li class="nav-item">
                    <a class="nav-link active" href="#">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">About</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#"
                       data-bs-toggle="dropdown">Services</a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Web Dev</a></li>
                        <li><a class="dropdown-item" href="#">App Dev</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#">Consulting</a></li>
                    </ul>
                </li>
            </ul>

            <!-- Search form -->
            <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Search">
                <button class="btn btn-outline-light" type="submit">Search</button>
            </form>
        </div>
    </div>
</nav>

<!-- Navbar color variants -->
<!-- navbar-dark bg-dark → White text on dark bg -->
<!-- navbar-light bg-light → Dark text on light bg -->
<!-- bg-primary, bg-success, etc. → Colored backgrounds -->

<!-- Fixed navbar -->
<nav class="navbar fixed-top">...</nav>   <!-- Stays at top -->
<nav class="navbar fixed-bottom">...</nav> <!-- Stays at bottom -->
<nav class="navbar sticky-top">...</nav>  <!-- Sticks when scrolled -->
```

### Cards

```html
<!-- Basic Card -->
<div class="card" style="width: 18rem;">
    <img src="image.jpg" class="card-img-top" alt="Card image">
    <div class="card-body">
        <h5 class="card-title">Card Title</h5>
        <h6 class="card-subtitle mb-2 text-muted">Subtitle</h6>
        <p class="card-text">Some content goes here.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
</div>

<!-- Card with header and footer -->
<div class="card">
    <div class="card-header">Featured</div>
    <div class="card-body">
        <h5 class="card-title">Special Title</h5>
        <p class="card-text">Content text.</p>
    </div>
    <div class="card-footer text-muted">2 days ago</div>
</div>

<!-- Card with list group -->
<div class="card">
    <div class="card-header">Features</div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">Feature 1</li>
        <li class="list-group-item">Feature 2</li>
        <li class="list-group-item">Feature 3</li>
    </ul>
</div>

<!-- Card grid -->
<div class="row row-cols-1 row-cols-md-3 g-4">
    <div class="col">
        <div class="card h-100">
            <div class="card-body">
                <h5 class="card-title">Card 1</h5>
                <p class="card-text">Content</p>
            </div>
        </div>
    </div>
    <div class="col">
        <div class="card h-100">
            <div class="card-body">
                <h5 class="card-title">Card 2</h5>
                <p class="card-text">Content</p>
            </div>
        </div>
    </div>
    <div class="col">
        <div class="card h-100">
            <div class="card-body">
                <h5 class="card-title">Card 3</h5>
                <p class="card-text">Content</p>
            </div>
        </div>
    </div>
</div>
```

### Media Objects (Images with Text)

```html
<!-- Bootstrap 5 uses flex utilities instead of the old media object -->
<div class="d-flex align-items-start">
    <img src="avatar.jpg" class="rounded-circle me-3" width="64" height="64" alt="Avatar">
    <div>
        <h5 class="mt-0">John Doe</h5>
        <p>This is a media object layout using Bootstrap 5 flex utilities.</p>
    </div>
</div>

<!-- Nested media objects -->
<div class="d-flex">
    <img src="avatar1.jpg" class="rounded me-3" width="48" alt="User 1">
    <div>
        <h6>User 1</h6>
        <p>A comment text.</p>
        <div class="d-flex mt-3">
            <img src="avatar2.jpg" class="rounded me-3" width="48" alt="User 2">
            <div>
                <h6>User 2</h6>
                <p>A reply to the comment.</p>
            </div>
        </div>
    </div>
</div>
```

---

## 4. Bootstrap Utilities and Helpers

### Spacing Utilities

```html
<!-- Format: {property}{sides}-{size}
     property: m (margin) or p (padding)
     sides: t(top), b(bottom), s(start/left), e(end/right), x(left+right), y(top+bottom), blank(all)
     size: 0, 1(0.25rem), 2(0.5rem), 3(1rem), 4(1.5rem), 5(3rem), auto -->

<div class="mt-3">margin-top: 1rem</div>
<div class="mb-4">margin-bottom: 1.5rem</div>
<div class="ms-2">margin-left: 0.5rem</div>
<div class="me-auto">margin-right: auto (push left)</div>
<div class="mx-auto">margin horizontal auto (center)</div>

<div class="p-3">padding: 1rem all sides</div>
<div class="px-4">padding left+right: 1.5rem</div>
<div class="py-2">padding top+bottom: 0.5rem</div>

<!-- Responsive spacing -->
<div class="mt-0 mt-md-3 mt-lg-5">0 on mobile, 1rem on tablet, 3rem on desktop</div>
```

| Size | Value |
|------|-------|
| `0` | 0 |
| `1` | 0.25rem (4px) |
| `2` | 0.5rem (8px) |
| `3` | 1rem (16px) |
| `4` | 1.5rem (24px) |
| `5` | 3rem (48px) |
| `auto` | auto |

### Colors and Backgrounds

```html
<!-- Text colors -->
<p class="text-primary">Primary (blue)</p>
<p class="text-secondary">Secondary (gray)</p>
<p class="text-success">Success (green)</p>
<p class="text-danger">Danger (red)</p>
<p class="text-warning">Warning (yellow)</p>
<p class="text-info">Info (teal)</p>
<p class="text-light bg-dark">Light</p>
<p class="text-dark">Dark</p>
<p class="text-muted">Muted (gray)</p>
<p class="text-white bg-dark">White</p>

<!-- Background colors -->
<div class="bg-primary text-white p-3">Primary bg</div>
<div class="bg-success text-white p-3">Success bg</div>
<div class="bg-danger text-white p-3">Danger bg</div>
<div class="bg-warning p-3">Warning bg</div>
<div class="bg-dark text-white p-3">Dark bg</div>
<div class="bg-light p-3">Light bg</div>

<!-- Background with opacity -->
<div class="bg-primary bg-opacity-50 p-3">50% opacity primary</div>
<div class="bg-primary bg-opacity-25 p-3">25% opacity primary</div>

<!-- Background gradient -->
<div class="bg-primary bg-gradient text-white p-3">Gradient</div>
```

### Display and Visibility

```html
<!-- Display -->
<div class="d-none">Hidden</div>
<div class="d-block">Block (default for divs)</div>
<div class="d-inline">Inline</div>
<div class="d-inline-block">Inline-block</div>
<div class="d-flex">Flexbox</div>
<div class="d-grid">Grid</div>

<!-- Responsive display -->
<div class="d-none d-md-block">Hidden on mobile, visible on tablet+</div>
<div class="d-block d-md-none">Visible on mobile, hidden on tablet+</div>

<!-- Visibility (keeps space) -->
<div class="visible">Visible</div>
<div class="invisible">Invisible but takes space</div>

<!-- Print display -->
<div class="d-print-none">Hidden when printing</div>
<div class="d-none d-print-block">Only visible when printing</div>
```

### Borders, Shadows, and Rounded Corners

```html
<!-- Borders -->
<div class="border">All borders</div>
<div class="border-top">Top border only</div>
<div class="border-end">Right border</div>
<div class="border-bottom">Bottom border</div>
<div class="border-start">Left border</div>
<div class="border-0">No border</div>

<!-- Border colors -->
<div class="border border-primary">Primary border</div>
<div class="border border-danger">Danger border</div>

<!-- Border width -->
<div class="border border-3">Thick border</div>

<!-- Rounded corners -->
<div class="rounded">Slightly rounded</div>
<div class="rounded-0">No rounding</div>
<div class="rounded-1">Small rounding</div>
<div class="rounded-2">Medium rounding</div>
<div class="rounded-3">Large rounding</div>
<div class="rounded-circle">Circle</div>
<div class="rounded-pill">Pill shape</div>
<div class="rounded-top">Top rounded</div>
<div class="rounded-end">Right rounded</div>

<!-- Shadows -->
<div class="shadow-none">No shadow</div>
<div class="shadow-sm">Small shadow</div>
<div class="shadow">Regular shadow</div>
<div class="shadow-lg">Large shadow</div>
```

### Positioning Utilities

```html
<!-- Position -->
<div class="position-static">Static (default)</div>
<div class="position-relative">Relative</div>
<div class="position-absolute">Absolute</div>
<div class="position-fixed">Fixed</div>
<div class="position-sticky">Sticky</div>

<!-- Top/Bottom/Start/End with position -->
<div class="position-absolute top-0 start-0">Top-left corner</div>
<div class="position-absolute top-0 end-0">Top-right corner</div>
<div class="position-absolute bottom-0 start-0">Bottom-left corner</div>
<div class="position-absolute top-50 start-50 translate-middle">Center</div>

<!-- Fixed top/bottom (for navbars, etc.) -->
<nav class="fixed-top">Stays at top</nav>
<nav class="fixed-bottom">Stays at bottom</nav>
<nav class="sticky-top">Sticks when scrolled past</nav>
```

---

## 5. Advanced Bootstrap 5 Features

### Bootstrap Icons

```html
<!-- Method 1: CDN -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">

<!-- Method 2: npm -->
<!-- npm install bootstrap-icons -->

<!-- Usage -->
<i class="bi bi-house"></i>          Home icon
<i class="bi bi-search"></i>         Search icon
<i class="bi bi-person-circle"></i>  Person icon
<i class="bi bi-envelope"></i>       Email icon
<i class="bi bi-telephone"></i>      Phone icon
<i class="bi bi-github"></i>         GitHub icon
<i class="bi bi-arrow-right"></i>    Arrow icon

<!-- Sizing -->
<i class="bi bi-house" style="font-size: 2rem;"></i>
<i class="bi bi-house fs-1"></i>  <!-- Using Bootstrap size class -->

<!-- Coloring -->
<i class="bi bi-heart-fill text-danger"></i>
<i class="bi bi-check-circle-fill text-success"></i>

<!-- In buttons -->
<button class="btn btn-primary">
    <i class="bi bi-download me-2"></i> Download
</button>
```

### Bootstrap 5 JavaScript Plugins

#### Modal

```html
<!-- Button trigger -->
<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
    Open Modal
</button>

<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Modal Title</h5>
                <button class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <p>Modal body content here.</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button class="btn btn-primary">Save</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal sizes -->
<div class="modal-dialog modal-sm">Small</div>
<div class="modal-dialog modal-lg">Large</div>
<div class="modal-dialog modal-xl">Extra Large</div>
<div class="modal-dialog modal-fullscreen">Fullscreen</div>

<!-- Centered modal -->
<div class="modal-dialog modal-dialog-centered">Vertically centered</div>

<!-- JS control -->
<script>
    const modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.show();
    modal.hide();
</script>
```

#### Dropdown

```html
<div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown">
        Dropdown
    </button>
    <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">Action 1</a></li>
        <li><a class="dropdown-item" href="#">Action 2</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="#">Action 3</a></li>
    </ul>
</div>
```

#### Carousel (Slideshow)

```html
<div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
    <!-- Indicators -->
    <div class="carousel-indicators">
        <button data-bs-target="#myCarousel" data-bs-slide-to="0" class="active"></button>
        <button data-bs-target="#myCarousel" data-bs-slide-to="1"></button>
        <button data-bs-target="#myCarousel" data-bs-slide-to="2"></button>
    </div>

    <!-- Slides -->
    <div class="carousel-inner">
        <div class="carousel-item active">
            <img src="slide1.jpg" class="d-block w-100" alt="Slide 1">
            <div class="carousel-caption">
                <h5>First Slide</h5>
                <p>Description text.</p>
            </div>
        </div>
        <div class="carousel-item">
            <img src="slide2.jpg" class="d-block w-100" alt="Slide 2">
        </div>
        <div class="carousel-item">
            <img src="slide3.jpg" class="d-block w-100" alt="Slide 3">
        </div>
    </div>

    <!-- Controls -->
    <button class="carousel-control-prev" data-bs-target="#myCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
    </button>
    <button class="carousel-control-next" data-bs-target="#myCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
    </button>
</div>
```

#### Accordion

```html
<div class="accordion" id="faqAccordion">
    <div class="accordion-item">
        <h2 class="accordion-header">
            <button class="accordion-button" data-bs-toggle="collapse"
                    data-bs-target="#collapseOne">
                Question 1
            </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show"
             data-bs-parent="#faqAccordion">
            <div class="accordion-body">
                Answer to question 1.
            </div>
        </div>
    </div>
    <div class="accordion-item">
        <h2 class="accordion-header">
            <button class="accordion-button collapsed" data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo">
                Question 2
            </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse collapse"
             data-bs-parent="#faqAccordion">
            <div class="accordion-body">
                Answer to question 2.
            </div>
        </div>
    </div>
</div>
```

#### Tooltips and Toasts

```html
<!-- Tooltip (must be initialized with JS) -->
<button class="btn btn-secondary" data-bs-toggle="tooltip" title="Tooltip text">
    Hover me
</button>
<script>
    // Initialize all tooltips
    var tooltipList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipList.map(function(el) { return new bootstrap.Tooltip(el); });
</script>

<!-- Toast -->
<div class="toast" role="alert">
    <div class="toast-header">
        <strong class="me-auto">Notification</strong>
        <small>Just now</small>
        <button class="btn-close" data-bs-dismiss="toast"></button>
    </div>
    <div class="toast-body">
        Your action was successful!
    </div>
</div>
```

### Customization with Sass

```scss
// Custom Bootstrap build with Sass

// 1. Override variables BEFORE importing Bootstrap
$primary: #6f42c1;          // Change primary color
$font-family-base: 'Inter', sans-serif;
$border-radius: 0.5rem;
$enable-shadows: true;
$enable-rounded: true;

// Spacing
$spacer: 1rem;

// 2. Import Bootstrap
@import "~bootstrap/scss/bootstrap";

// 3. Add custom styles
.custom-card {
    @extend .card;
    border: none;
    @include box-shadow($box-shadow-lg);
}

// Common Sass variables you can override:
// $primary, $secondary, $success, $danger, $warning, $info
// $font-family-base, $font-size-base
// $border-radius, $border-radius-lg, $border-radius-sm
// $spacer (base spacing unit)
// $enable-shadows, $enable-gradients, $enable-rounded
// $grid-breakpoints, $container-max-widths
```

---

## 6. Practice Questions

### Multiple Choice Questions

**Q1.** How many columns does the Bootstrap grid system have?
- a) 6
- b) 10
- c) 12 ✅
- d) 16

**Q2.** Which class makes a container full-width on all breakpoints?
- a) `container`
- b) `container-fluid` ✅
- c) `container-full`
- d) `container-xl`

**Q3.** What does `col-md-6` mean?
- a) 6px wide on medium screens
- b) 6 columns wide on medium screens and up ✅
- c) 6 rows on medium screens
- d) 6% width on medium screens

**Q4.** Which Bootstrap 5 feature was removed compared to Bootstrap 4?
- a) Grid system
- b) jQuery dependency ✅
- c) Utility classes
- d) Responsive design

**Q5.** What does `d-none d-md-block` achieve?
- a) Always hidden
- b) Always visible
- c) Hidden on mobile, visible on medium screens and up ✅
- d) Visible on mobile, hidden on medium screens

**Q6.** Which class creates a pill-shaped border radius?
- a) `rounded`
- b) `rounded-circle`
- c) `rounded-pill` ✅
- d) `rounded-3`

**Q7.** What does `justify-content-between` do in a flex container?
- a) Centers items
- b) Distributes items with equal space between them ✅
- c) Aligns items to the start
- d) Wraps items

**Q8.** Which attribute triggers a Bootstrap modal?
- a) `data-toggle="modal"`
- b) `data-bs-toggle="modal"` ✅
- c) `data-modal="true"`
- d) `onclick="showModal()"`

**Q9.** What does `mt-3` stand for?
- a) margin-top: 3px
- b) margin-top: 1rem ✅
- c) margin-top: 3rem
- d) margin-total: 3

**Q10.** How do you center a block element horizontally using Bootstrap?
- a) `text-center`
- b) `mx-auto` ✅
- c) `align-center`
- d) `center-block`

**Q11.** Which class makes a navbar stick to the top when scrolling?
- a) `fixed-top`
- b) `sticky-top` ✅
- c) `position-top`
- d) `scroll-top`

**Q12.** What is the correct way to include Bootstrap Icons via CDN?
- a) `<script src="bootstrap-icons.js">`
- b) `<link rel="stylesheet" href="bootstrap-icons.css">` ✅
- c) `<link rel="icon" href="bootstrap-icons">`
- d) `<img src="bootstrap-icons">`

---

> ✅ **Bootstrap 5 Complete!** Next: [JavaScript Build Tools →](../05_JavaScript-Build-Tools/README.md)
