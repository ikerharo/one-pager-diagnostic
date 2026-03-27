

## Discovery Template Redesign — MBB-Grade Structure

### Problem

The current Discovery template reads like a feature/product pitch rather than a strategic consulting deliverable. Compared to the Diagnostic Pitch (which already follows an MBB-style flow), the Discovery page has:

- **No executive framing** — jumps straight from hero into findings without context
- **Hardcoded sections** — FuelImpactSection and BeyondFuelSection are static, not data-driven
- **Generic titles** — "Quick Wins", "Hallazgos Clave" feel product-y, not consultive
- **No financial quantification** — no "money on the table" summary
- **No personalization** — missing "prepared for" block and "why this client" narrative
- **Weak narrative arc** — sections feel disconnected, not building toward a recommendation

### Proposed New Flow

```text
┌─────────────────────────────────────────────┐
│  1. HERO (enhanced)                         │
│     - Provocative subtitle (not generic)    │
│     - "Prepared for" recipients block       │
│     - Meeting date badge                    │
├─────────────────────────────────────────────┤
│  2. EXECUTIVE SUMMARY (NEW)                 │
│     - 2-3 sentence thesis: what we found    │
│     - Financial impact bar: key $ numbers   │
│     - Editorial tone, large type            │
├─────────────────────────────────────────────┤
│  3. FINDINGS (restructured)                 │
│     - Retitled: "Lo que encontramos"        │
│     - Keep hero card + grid layout          │
│     - Add strategic context/framing per card│
├─────────────────────────────────────────────┤
│  4. FINANCIAL IMPACT (data-driven, NEW)     │
│     - Replaces hardcoded FuelImpactSection  │
│     - Pulls from JSON: savings breakdown    │
│     - Monthly/annual totals with breakdown  │
│     - Dark section for visual contrast      │
├─────────────────────────────────────────────┤
│  5. CURRENT vs PROPOSED (renamed QuickWins) │
│     - Retitled: "Situación actual vs        │
│       propuesta"                            │
│     - Same before/after mechanic, better    │
│       framing                               │
├─────────────────────────────────────────────┤
│  6. SOLUTION POSITIONING (keep UvicuoSection│
│     but enhance)                            │
│     - Better headline: "Nuestra propuesta"  │
│     - Capabilities as a clean grid          │
├─────────────────────────────────────────────┤
│  7. ADDITIONAL CAPABILITIES (conditional)   │
│     - BeyondFuelSection only if data exists │
│     - Data-driven from JSON                 │
├─────────────────────────────────────────────┤
│  8. NEXT STEPS (keep, minor refinements)    │
│     - Past interactions + roadmap           │
├─────────────────────────────────────────────┤
│  9. TRUSTED BY + FOOTER (keep)              │
└─────────────────────────────────────────────┘
```

### Technical Changes

#### 1. Data Model Updates (`discoveryData.ts` + JSON files)

Add new fields to the deal JSON schema:
- `executiveSummary`: `{ thesis: string, impactItems: { value: string, label: string }[] }`
- `preparedFor`: `{ label: string, recipients: { name: string, role: string }[] }`
- `financialImpact`: `{ headline: string, items: { concept: string, monthlySaving: string, detail: string }[], totalMonthly: string, totalAnnual: string }` (optional — some deals like Armstrong don't have this yet, Bodesa does)
- `additionalCapabilities`: array (replaces hardcoded BeyondFuelSection categories)

Update `processDealContent()` to map these new fields with safe fallbacks.

#### 2. New Component: `ExecutiveSummarySection.tsx`

- Editorial block with large typography
- 2-3 sentence thesis about what was found
- Grid of 2-4 key financial metrics (similar to diagnostic hero stats)
- Positioned right after hero for immediate impact

#### 3. New Component: `FinancialImpactSection.tsx`

- Replaces hardcoded `FuelImpactSection`
- Dark section (`section-dark`) for visual weight
- Pulls savings breakdown from `financialImpact` in JSON
- Shows monthly/annual totals prominently
- Only renders if data exists

#### 4. Refactor Existing Components

- **FindingsSection**: Rename heading to "Lo que encontramos". Minor copy tweaks.
- **QuickWinsSection**: Rename to "Situación Actual vs Propuesta". Update heading/subtitle.
- **BeyondFuelSection**: Make data-driven — pull categories from JSON instead of hardcoded array. Only render if data exists.
- **DiscoveryHeader**: Add "Prepared for" block (same pattern as DiagnosticHero).

#### 5. Update `DealPage.tsx` Section Order

Replace `FuelImpactSection` with new `FinancialImpactSection`. Add `ExecutiveSummarySection` after header. Conditionally render `BeyondFuelSection`.

#### 6. Update All Existing Deal JSONs

Add the new fields to `armstrong.json`, `bodesa.json`, `demo.json`, `modelo.json`, `nadro.json`, `elola.json`. Bodesa already has `impactSummary` data in its JSON — restructure it into the new `financialImpact` format.

### What Stays the Same
- Overall look & feel (dark hero, card-based layout, animations)
- NextStepsSection (already well structured)
- TrustedBySection
- ScrollProgress
- Color system and typography

