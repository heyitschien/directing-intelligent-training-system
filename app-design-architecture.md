This is a powerful build. I’m going to design this like a **real product spec + visual system + working prototype (HTML)** so you can *actually use it*.

---

# 🧠 STRATEGIST OS — MOBILE APP DESIGN

*(Single Page · Vertical Flow · Tap to Expand)*

---

# 🎯 DESIGN PHILOSOPHY

This app should feel like:

* 🧘 Calm (Zhuge Liang mind)
* ⚡ Precise (CEO thinking)
* 🧠 Structured (systems thinking)

---

## 🎨 COLOR SYSTEM

### Base

* Background: `#F7FAFB` (soft clarity)
* Primary Text: `#1E2A33` (deep navy — focus)
* Secondary Text: `#5B6B75` (muted intelligence)

### Accents

* Yi (Define): `#3B82F6` (blue — direction)
* Li (Model): `#10B981` (green — structure)
* Interrogate: `#F59E0B` (amber — inquiry)
* Execute: `#EF4444` (red — action)
* Reflect: `#8B5CF6` (purple — wisdom)

### UI

* Cards: `#FFFFFF`
* Borders: `#E6EEF2`
* Shadow: soft (depth without noise)

---

## 🔤 TYPOGRAPHY

* Headings: **Inter / SF Pro Bold**
* Body: **Inter Regular**
* Spacing: generous (breathing room = clarity)

---

# 📱 APP STRUCTURE

---

## 🧭 HOME SCREEN (CORE FLOW)

Vertical scroll:

```
[ HERO ]

DEFINE ↓
MODEL ↓
INTERROGATE ↓
EXECUTE ↓
REFLECT
```

Each step is a **card with arrow flow ↓**

Tap → expands

---

# 🧩 COMPONENT DESIGN

## 🔹 Step Card (Collapsed)

```
[ STEP 1 ]
DEFINE (Yi)
“What do I want?”
↓
```

---

## 🔹 Step Card (Expanded)

```
DEFINE (Yi)

Intent:
What outcome do I seek precisely?

Framework:
• Outcome
• Time horizon
• Constraints
• Success metric

Insight:
Clarity compresses possibility into strategy
```

---

# 🧠 FULL CONTENT STRUCTURE

---

## 1. DEFINE (Yi)

**Copy:**

> Define the outcome clearly before thinking.

**Expand:**

* What do I want?
* Why does it matter?
* What does success look like?

---

## 2. MODEL (Li)

**Copy:**

> Understand the system before acting.

**Expand → Nested System**

```
MODEL (Li)

System Breakdown:

[ Goal ]
[ Components ]
[ Interactions ]
[ Constraints ]
[ Leverage ]
```

Each is tappable.

---

### 🔹 Nested Example (Goal)

```
GOAL

What is this system designed to do?

Insight:
Your goal ≠ system goal
```

---

### 🔹 Nested Example (Leverage)

```
LEVERAGE

Where does small input → big output?

Insight:
Strategy = leverage, not effort
```

---

## 3. INTERROGATE

**Copy:**

> Extract intelligence through questioning

**Expand:**

* What am I missing?
* Where does this break?
* What is highest leverage?

---

## 4. EXECUTE

**Copy:**

> Apply leverage with precision

**Expand:**

* What is the next move?
* What sequence wins?

---

## 5. REFLECT

**Copy:**

> Learn and refine the system

**Expand:**

* What worked?
* What failed?
* What changed?

---

# 🧪 EXAMPLES SECTION (SEPARATE PAGES)

---

## 📄 Example Page Layout

```
[ Title ]
Scenario

↓ SYSTEM BREAKDOWN ↓

Goal
Components
Interactions
Constraints
Leverage
```

---

## Example 1 — Energy

**Visual Style:**
Soft gradient (blue → green)

---

## Example 2 — Learning

**Visual Style:**
Amber accents (growth)

---

## Example 3 — AI + You

**Visual Style:**
Purple + blue (intelligence)

---

# 🧠 UX INTERACTIONS

* Tap card → expand smoothly
* Tap nested → drill deeper
* Swipe → navigate examples
* Sticky header → “Strategist OS”

---

# ⚡ MICRO COPY (VERY IMPORTANT)

Use **short, sharp language**

Examples:

* “See the system”
* “Find the leverage”
* “Ask better”
* “Move precisely”

---

# 💻 WORKING HTML PROTOTYPE

You can paste this into a `.html` file and open it.

---

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Strategist OS</title>
<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  background: #F7FAFB;
  margin: 0;
  color: #1E2A33;
}

.container {
  padding: 20px;
  max-width: 480px;
  margin: auto;
}

.card {
  background: white;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  cursor: pointer;
}

.title {
  font-weight: bold;
  font-size: 16px;
}

.step {
  font-size: 12px;
  opacity: 0.6;
}

.content {
  display: none;
  margin-top: 12px;
  font-size: 14px;
  color: #5B6B75;
}

.arrow {
  text-align: center;
  margin: 10px 0;
  opacity: 0.4;
}
</style>
</head>

<body>
<div class="container">

<h2>🧠 Strategist OS</h2>

<div class="card" onclick="toggle(this)">
  <div class="step">STEP 1</div>
  <div class="title">DEFINE (Yi)</div>
  <div class="content">
    What do I want?<br>
    Define outcome, constraints, success.
  </div>
</div>

<div class="arrow">↓</div>

<div class="card" onclick="toggle(this)">
  <div class="step">STEP 2</div>
  <div class="title">MODEL (Li)</div>
  <div class="content">
    Goal<br>
    Components<br>
    Interactions<br>
    Constraints<br>
    Leverage
  </div>
</div>

<div class="arrow">↓</div>

<div class="card" onclick="toggle(this)">
  <div class="step">STEP 3</div>
  <div class="title">INTERROGATE</div>
  <div class="content">
    What am I missing?<br>
    Where does this break?<br>
    What matters most?
  </div>
</div>

<div class="arrow">↓</div>

<div class="card" onclick="toggle(this)">
  <div class="step">STEP 4</div>
  <div class="title">EXECUTE</div>
  <div class="content">
    Apply leverage<br>
    Take action
  </div>
</div>

<div class="arrow">↓</div>

<div class="card" onclick="toggle(this)">
  <div class="step">STEP 5</div>
  <div class="title">REFLECT</div>
  <div class="content">
    Learn<br>
    Improve<br>
    Iterate
  </div>
</div>

</div>

<script>
function toggle(el) {
  let content = el.querySelector(".content");
  content.style.display = content.style.display === "block" ? "none" : "block";
}
</script>

</body>
</html>
```

---

# 🧠 FINAL DESIGN INTENT

This app is not just UI.

It is:

> A **thinking interface**

---

# ⚔️ IF WE TAKE THIS FURTHER

We can evolve this into:

* React app (Next.js)
* Save notes per system
* AI-powered “interrogate” button
* Daily strategist training mode

---

If you want next step, I can:

👉 Turn this into a **production-ready Next.js app**
👉 Or design your **personal AI strategist dashboard**

This is exactly the kind of tool that can change how you think daily.
