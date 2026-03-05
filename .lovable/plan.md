

## Discovery One-Pager Template — Plan

### Context

The current project is a full commercial proposal with 6 steps (Hero → Problem → Solution → Impact → Proposal → Acceptance). The user wants a **separate, simpler template**: a one-pager summarizing findings from an initial discovery meeting. It should feel less formal, more Uvicuo-branded, and be reusable across clients.

### Proposed Structure for the Discovery One-Pager

A single scrollable page (no step navigation) with these sections:

1. **Header** — Uvicuo logo + client name + meeting date + "Discovery Summary" badge. Dark section matching brand.

2. **Key Findings** (3-5 cards) — Each card has an icon, a short title, and 1-2 sentence description of the problem/concern discovered. Grid layout, animated on scroll.

3. **Priority Concerns** — A ranked list (numbered) of the top concerns with severity indicators (High/Medium/Low tags). Simple, scannable.

4. **Quick Win Opportunities** — 2-3 bullet points showing immediate improvements Uvicuo can deliver, with a brief "before → after" framing.

5. **Client Reference** — A compact testimonial/case study card from an existing Uvicuo client (logo, company name, one-line quote, key metric like "40% reduction in reconciliation time").

6. **Next Steps** — A simple CTA section: "Schedule a deep-dive" or similar, with contact info.

### Implementation Plan

1. **New route `/discovery`** — Add to App.tsx
2. **New page `src/pages/DiscoveryPage.tsx`** — Single scrollable page, uses existing Uvicuo brand tokens (dark header, green accents, Space Grotesk headings, Inter body)
3. **New components under `src/components/discovery/`**:
   - `DiscoveryHeader.tsx` — Dark hero-like header, simpler than current HeroSection
   - `FindingsSection.tsx` — Card grid with placeholder findings
   - `ConcernsSection.tsx` — Ranked concern list
   - `QuickWinsSection.tsx` — Before/after bullets
   - `ClientReference.tsx` — Testimonial card
   - `NextStepsSection.tsx` — CTA with contact info
4. **Placeholder data** in a `src/data/discoveryData.ts` file — All text uses `[PLACEHOLDER]` patterns so it's easy to customize per client

### Design Approach

- Reuse existing CSS utilities (`section-dark`, `text-gradient-green`, `glow-green`)
- Reuse `AnimatedSection` and `itemVariants` for scroll animations
- No step-by-step wizard — just a clean vertical scroll
- More casual tone than the formal proposal
- Compact: designed to fit on a single screen or very short scroll
- No Navbar wizard controls, just a simple top bar with logo

### Files to Create/Modify

| Action | File |
|--------|------|
| Create | `src/data/discoveryData.ts` |
| Create | `src/pages/DiscoveryPage.tsx` |
| Create | `src/components/discovery/DiscoveryHeader.tsx` |
| Create | `src/components/discovery/FindingsSection.tsx` |
| Create | `src/components/discovery/ConcernsSection.tsx` |
| Create | `src/components/discovery/QuickWinsSection.tsx` |
| Create | `src/components/discovery/ClientReference.tsx` |
| Create | `src/components/discovery/NextStepsSection.tsx` |
| Edit | `src/App.tsx` — Add `/discovery` route |

No database changes needed.

