# Salmon Color Change Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Change the active treatment stage color from blue to a warm salmon palette across the Dashboard and Timeline.

**Architecture:** Update central theme tokens in `lib/theme.js` and local palette overrides in `app/timeline/page.js` to ensure consistent application of the new "Salmon" identity.

**Tech Stack:** Next.js (App Router), Vanilla CSS, Design Tokens.

---

### Task 1: Update Central Theme Tokens

**Files:**
- Modify: `lib/theme.js`

- [ ] **Step 1: Update `PT.salmon` and `PT.salmonDeep`**

Replace the old blueish values with new warm salmon tones.

```javascript
// lib/theme.js

export const PT = {
  // ... existing colors
  salmon:    '#E68A8A', // New warm salmon
  salmonDeep:'#D16B6B', // New deeper salmon for accents
  // ...
};
```

- [ ] **Step 2: Commit**

```bash
git add lib/theme.js
git commit -m "style: update salmon color tokens in theme"
```

### Task 2: Update Timeline Local Palette

**Files:**
- Modify: `app/timeline/page.js`

- [ ] **Step 1: Update `TC` palette constants**

Update the `TC` object (rose-aliased colors) to use the new salmon tones.

```javascript
// app/timeline/page.js

const TC = {
  sageLine:   '#A8C5A0',
  sageBg:     '#EAF2E7',
  sageIcon:   '#4E7E4C',
  roseLine:   '#D16B6B', // Matches PT.salmonDeep
  roseBg:     '#FCEEEE', // New soft salmon background
  roseIcon:   '#B15252', // Darker salmon for text/icons on roseBg
  grayLine:   '#D0C8C0',
  grayBg:     '#EDE8E3',
  grayIcon:   'rgba(58,42,63,0.28)',
};
```

- [ ] **Step 2: Commit**

```bash
git add app/timeline/page.js
git commit -m "style: update timeline palette to salmon"
```

### Task 3: Verification

- [ ] **Step 1: Verify Dashboard (Local Dev)**

Run the development server and check the dashboard.
- The pulse animation behind the active stage should be salmon (`PT.salmon` with opacity).
- The active stage circle should be salmon.

- [ ] **Step 2: Verify Timeline (Local Dev)**

Navigate to `/timeline`.
- The progress pill "Etap X z 6" should have a salmon background (`TC.roseBg`) and icon/text (`TC.roseIcon`).
- The vertical line between stages should be salmon (`TC.roseLine`).
- The "Jesteś tutaj" badge and "Zapytaj asystentkę" button should be salmon.

- [ ] **Step 3: Final check of colors**

Ensure no hardcoded blue `#7BBCD8` or `#4AAAC6` remains in `app/dashboard/page.js` or `app/timeline/page.js`.
