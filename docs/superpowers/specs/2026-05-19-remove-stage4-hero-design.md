# Spec: Remove Hero Card from Stage 4 Dashboard

## Context
The "PrzyTobie" dashboard features a "Hero Card" at the top that changes based on the patient's treatment stage. The user has requested to remove this specific card for Stage 4 (Leczenie okołooperacyjne), which currently shows an upcoming chemotherapy appointment.

## Proposed Changes

### 1. Data Configuration (`app/dashboard/page.js`)
- Modify `STAGE_DATA[4]` to remove the following properties:
  - `heroGradient`
  - `heroDotColor`
  - `heroTitle`
  - `heroSubtitle`
  - `heroCTA`
- Keep `grid` and `hasSymptomCheckin` as they are essential for the dashboard functionality in this stage.

### 2. UI Logic (`app/dashboard/page.js`)
- Update the `DashboardContent` component to conditionally render the `HeroCard`.
- It should only render if `data.heroTitle` is present.

### 3. Cleanup
- Remove the `onCTA` logic for `stage === 4` in `DashboardContent` as the Hero card will no longer be visible to trigger it.

## Success Criteria
- In Stage 4, the green chemotherapy hero card is no longer visible.
- Other stages (1, 2, 3, 5) still display their respective hero cards.
- The dashboard for Stage 4 remains functional (Quick Actions and Symptom Check-in are visible).

## Verification Plan
- Manually switch to Stage 4 using the demo switcher and verify the hero card is gone.
- Verify that switching to Stage 3 or 5 still shows their hero cards.
