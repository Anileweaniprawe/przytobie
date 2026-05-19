# Remove Stage 4 Hero Card Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the prominent "Chemioterapia" hero card from the Stage 4 dashboard while keeping other dashboard elements functional.

**Architecture:** Modify the static stage configuration to remove hero data for stage 4 and update the dashboard layout to conditionally render the HeroCard component only when its data exists.

**Tech Stack:** Next.js (App Router), React, Vanilla CSS.

---

### Task 1: Update Dashboard UI Logic

**Files:**
- Modify: `app/dashboard/page.js`

- [ ] **Step 1: Make HeroCard conditional in DashboardContent**

Update the `DashboardContent` component to only render `HeroCard` if `data.heroTitle` is present. Also remove the Stage 4 specific CTA logic.

```javascript
// Around line 790 in DashboardContent return:
{data.heroTitle && (
  <HeroCard data={data} onCTA={
    stage === 1 ? () => setScreen('find-clinic') :
    stage === 3 ? () => { setChatTopic('Co to jest konsylium?'); setScreen('chat'); } :
    // stage === 4 ? () => setScreen('appointment-detail') : // Remove this
    stage === 5 ? () => setScreen('rehab-plan') : undefined
  }/>
)}
```

- [ ] **Step 2: Commit UI logic changes**

```bash
git add app/dashboard/page.js
git commit -m "feat: make HeroCard conditional and remove stage 4 CTA logic"
```

---

### Task 2: Update Stage 4 Configuration

**Files:**
- Modify: `app/dashboard/page.js`

- [ ] **Step 1: Remove hero data from STAGE_DATA[4]**

Find `STAGE_DATA` for stage 4 and remove the hero-related fields.

```javascript
// Around line 174
  4: {
    // heroGradient: 'linear-gradient(145deg, #F0F4EE 0%, #D4E8D0 100%)', // Remove
    // heroDotColor: '#5A9E6A', // Remove
    // heroTitle: 'Jutro: Chemioterapia, cykl 3/6', // Remove
    // heroSubtitle: '09:00 · Salve Medica, ul. Inflancka 3', // Remove
    // heroCTA: 'Szczegóły wizyty', // Remove
    grid: [
      { label: 'Zgłoś objaw',   icon: 'alert'    },
      { label: 'Moje wyniki',   icon: 'chart'    },
      { label: 'Wizyty',        icon: 'calendar' },
      { label: 'Wsparcie',      icon: 'heart'    },
    ],
    hasSymptomCheckin: true,
  },
```

- [ ] **Step 2: Commit configuration changes**

```bash
git add app/dashboard/page.js
git commit -m "feat: remove hero card data from stage 4 configuration"
```

---

### Task 3: Verification

- [ ] **Step 1: Verify Stage 4**
Open the application, navigate to the dashboard, and use the demo switcher to select "Etap 4". 
**Expected:** The green hero card is gone. "Twoja ścieżka" and "Szybkie akcje" are at the top.

- [ ] **Step 2: Verify Stage 3**
Switch to "Etap 3".
**Expected:** The lilac hero card "Masz plan. Teraz krok po kroku." is visible.

- [ ] **Step 3: Verify Stage 5**
Switch to "Etap 5".
**Expected:** The green hero card "Najtrudniejsza część za Tobą..." is visible.
