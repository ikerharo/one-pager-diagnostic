

## Animation Enhancements — Techy & Elegant

The current proposal has minimal animation: the Hero has SVG path-drawing and framer-motion fade-ins, but the remaining 5 sections (Problem, Solution, Impact, Proposal, Acceptance) are completely static. Adding scroll-triggered, staggered animations will make the presentation feel polished and high-tech without being distracting.

### What to Add

**1. Scroll-triggered stagger animations on all section content**
- Each section header (badge, title, subtitle) fades up with a slight stagger (0 → 0.1s → 0.2s delay)
- Cards/rows animate in with `fadeInUp` + stagger per item (0.08s offset per card)
- Uses framer-motion `whileInView` with `viewport={{ once: true }}` so animations fire once on scroll

**2. Problem Section — Glitch/scan-line effect on icon hover**
- Cards get a subtle `scale(1.02)` + green border glow on hover via framer-motion `whileHover`
- Stat numbers use a counting/typewriter-style reveal when they scroll into view
- A faint animated horizontal scan line sweeps across the card grid background (pure CSS, very subtle)

**3. Solution Section — Row-by-row "data stream" reveal**
- Each before/after row slides in from left/right respectively with stagger
- The arrow icon pulses once on entry
- The static SVG dot pattern gets a slow drift animation (CSS `translateY` loop)

**4. Impact Section — Animated counters + chart entrance**
- The 3 big metric values (Ahorro, Payback, ROI) use a number-counting animation on scroll entry
- Donut chart segments animate in sequentially (recharts supports `isAnimationActive` — already built-in, just needs `animationBegin` stagger)
- Savings rows fade in with stagger from bottom
- The dark panel's circuit SVG lines get a slow path-drawing animation similar to the Hero

**5. Proposal Section — Timeline node pulse + connector draw**
- The horizontal connector line animates its width from 0 to full (like a loading bar)
- Each phase card pops in sequentially with `scale(0.9) → 1` + `opacity(0 → 1)`
- Phase number circles get a subtle pulse ring animation on entry

**6. Acceptance Section — Form field focus glow**
- Section content fades in on scroll
- Interactive glow ring on input focus (green tint)
- Submit button gets a subtle shimmer/gradient sweep animation on hover

**7. Global: Floating particle layer (optional, very subtle)**
- A reusable `<FloatingParticles />` component renders 5-8 tiny green dots that float slowly across sections using CSS keyframes
- Extremely low opacity (0.04-0.08), adds depth without distraction

### Files to Create/Edit

| File | Action |
|------|--------|
| `src/components/proposal/AnimatedSection.tsx` | **Create** — Reusable wrapper with `whileInView` stagger logic |
| `src/components/proposal/AnimatedCounter.tsx` | **Create** — Number counting animation component |
| `src/components/proposal/FloatingParticles.tsx` | **Create** — Subtle background particle layer |
| `src/components/proposal/ProblemSection.tsx` | **Edit** — Add stagger, hover glow, scroll reveal |
| `src/components/proposal/SolutionSection.tsx` | **Edit** — Row slide-in, SVG drift, arrow pulse |
| `src/components/proposal/ImpactSection.tsx` | **Edit** — Counter animation, circuit path draw, chart stagger |
| `src/components/proposal/ProposalSection.tsx` | **Edit** — Timeline connector draw, card pop-in sequence |
| `src/components/proposal/AcceptanceSection.tsx` | **Edit** — Scroll fade-in, button shimmer |
| `src/index.css` | **Edit** — Add scan-line, shimmer, particle keyframes |

### Technical Notes

- All animations use `framer-motion` (already installed) with `whileInView` and `viewport={{ once: true, margin: "-50px" }}` to trigger slightly before entering the viewport
- No new dependencies needed
- Counter animation uses `useEffect` + `requestAnimationFrame` for smooth number interpolation
- All animations are performant (transform/opacity only, no layout triggers)
- Reduced motion is respected via framer-motion's built-in `useReducedMotion`

