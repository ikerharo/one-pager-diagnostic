

## Plan: Rebuild `/elola` Page with Detailed Content

This is a significant content and structural upgrade to the Elola deal page. The page keeps the same visual design language as `/armstrong` but introduces new section types and removes sections that don't apply to Elola's stage in the sales cycle.

### What Changes

**Current `/elola`** renders: Hero → Executive Summary → Findings (with proposals) → Benefits Dashboard → Uvicuo Section → Next Steps → Logos → Footer

**New `/elola`** renders: Hero → Executive Summary → Findings (no proposals, with data tables) → Opportunities Section (NEW) → Validation Questions (NEW) → Next Steps → Footer with closing quote → Logos

Key differences from Armstrong:
- No "Propuesta" boxes inside findings
- No BenefitsDashboard section
- No Uvicuo/About section
- Finding #2 includes a data table (patio breakdown by % cash)
- New "Oportunidades por explorar" section with stat cards, quotes, and status badges
- New "Lo que necesitamos validar" section with a checklist of questions

---

### Implementation Steps

#### 1. Update `elola.json` with all new content

Rewrite the entire JSON file with the 7 sections of content provided. Key structural additions:
- `config.meetingDate` → "Abril 2026", badge text → "Estudio de Gastos Operativos"
- `preparedFor` with Carlos Arellano
- New `executiveSummary` with 5 impact items ($15.9M, 59%, 284, 7, 6,077)
- 5 detailed findings with embedded `tableData` for finding #2 (patio breakdown)
- Empty `quickWins` array (no proposals)
- New `opportunities` array with fuel and tolls data
- New `validationQuestions` array with 7 questions
- Updated `timeline` with 4 steps including completion status
- `closingQuote` from Carlos Arellano
- Remove `exclusionNote`, `uvicuoPositioning`

#### 2. Extend the data model (`discoveryData.ts`)

Add new types and processing:
- `Finding` gets optional `tableData: { headers: string[]; rows: string[][] }` for embedded tables
- New `Opportunity` type with title, description, stats, quote, status
- New `validationQuestions: string[]` field on `DealData`
- New `opportunities` array on `DealData`
- Update `processDealContent()` to map these new fields

#### 3. Update `FindingsSection.tsx`

- Render `finding.tableData` as a responsive table inside the finding card when present (using existing Table components)
- Skip rendering "Propuesta" when `quickWins` is empty or has no matching entry

#### 4. Create `OpportunitiesSection.tsx`

New component following the existing visual patterns (AnimatedSection, motion variants, section-dark background). Renders:
- Section header ("Oportunidades por explorar")
- For each opportunity: title, description, stat cards (grid of 2-3), quote block, status badge
- Uses the same card/border/typography patterns as FindingsSection

#### 5. Create `ValidationSection.tsx`

New component with light background. Renders:
- Header ("Siguiente paso" / "Completar el análisis con datos de Elola")
- Intro text
- Numbered checklist of questions with checkbox-style icons

#### 6. Update `DealPage.tsx`

Conditionally render sections:
- Import and render `OpportunitiesSection` (only shows when data exists)
- Import and render `ValidationSection` (only shows when data exists)
- `BenefitsDashboardSection` and `UvicuoSection` already return `null` when data is absent, so no changes needed there

#### 7. Update `DiscoveryHeader.tsx`

- For Elola, the badge should say "Estudio de Gastos Operativos · Abril 2026" — this is already handled by `config.meetingDate`, just need to add a `badgePrefix` field to config or use the meetingDate field creatively

---

### Technical Details

**Files modified:**
- `src/data/deals/elola.json` — full rewrite with new content
- `src/data/discoveryData.ts` — add `Opportunity`, `tableData` on Finding, `validationQuestions`
- `src/components/discovery/FindingsSection.tsx` — render optional table data
- `src/pages/DealPage.tsx` — import 2 new sections

**Files created:**
- `src/components/discovery/OpportunitiesSection.tsx`
- `src/components/discovery/ValidationSection.tsx`

