

## Discovery Template — Shorter, Better Rhythm, Peajes Estimate

### Problems to Fix

1. **Too long** — 8 sections after the hero. UvicuoSection and BeyondFuelSection are redundant (both describe Uvicuo's capabilities). Merge them.
2. **Color rhythm** — Current flow: DARK → light → light → **DARK** → light → light → light → light. One isolated dark section feels jarring. Better pattern: DARK hero → light → light → dark → dark → light → dark footer.
3. **Peajes estimate** — Armstrong JSON says "Por cuantificar". Add a reasonable estimate.

### Plan

#### 1. Merge UvicuoSection + BeyondFuelSection into one section
Combine `uvicuoPositioning.capabilities` and `additionalCapabilities` into a single "Sobre Uvicuo" section. The positioning headline/description stays, then all capabilities (both core and additional) render in one grid. Remove `BeyondFuelSection` from `DealPage.tsx`.

This eliminates one full section scroll.

#### 2. Fix color rhythm
- **BenefitsDashboardSection** — keep `section-dark` (dark)
- **Merged UvicuoSection** — change to `section-dark` (dark) → two dark sections back-to-back feel intentional, like a "dark band"
- **NextStepsSection** — keep light (`bg-muted/30`)
- **TrustedBySection** — keep light
- **Footer** — change to `section-dark` for a strong close

New flow: `DARK hero → light exec summary → light findings → DARK benefits → DARK uvicuo → light next steps → light trusted → DARK footer`

This creates a deliberate dark/light/dark/light sandwich instead of a random dark section in the middle.

#### 3. Add peajes estimate to Armstrong JSON
Change `"estimatedSaving": "Por cuantificar"` to a conservative range estimate like `"$40K–80K/mes"` with updated calculation text explaining the math (e.g., 650 units × avg 15 cruces/mes × 7-9% error rate × avg toll cost).

#### 4. Tighten section padding
Reduce `py-16 md:py-24` to `py-12 md:py-16` on FindingsSection and BenefitsDashboardSection to reduce overall scroll length.

### Files Changed
- `src/components/discovery/UvicuoSection.tsx` — merge in additional capabilities, change to `section-dark`
- `src/pages/DealPage.tsx` — remove BeyondFuelSection import/usage
- `src/data/deals/armstrong.json` — update peajes estimate
- `src/components/discovery/FindingsSection.tsx` — reduce padding
- `src/components/discovery/BenefitsDashboardSection.tsx` — reduce padding
- Footer in `DealPage.tsx` — change to `section-dark`

