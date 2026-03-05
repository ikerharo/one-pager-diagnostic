

## Design Improvements for the Discovery One-Pager

After reviewing the full codebase and current preview, here are targeted design upgrades to elevate the template:

### 1. Dark hero section
The header with the video currently uses the light theme. Wrapping it in the existing `section-dark` utility would make the video pop, the wordmark glow, and the gradient overlay feel more cinematic. The client name and subtitle would render in white against the dark video.

### 2. Subtle accent line under the header
Add a thin gradient line (green → transparent) at the bottom of the hero to visually separate it from the findings section — a small detail that adds polish.

### 3. Finding cards — hover micro-interaction
Currently the cards lift with shadow on hover. Adding a subtle green top-border animation on hover (from 0 to 3px) would make the interaction feel more intentional.

### 4. Quick Wins — arrow indicator between Before/After
Replace the plain gradient divider with a small animated chevron-right icon (on desktop) to reinforce the "transformation" metaphor visually.

### 5. Next Steps CTA — add a button
The "Siguientes Pasos" section has contact info but no clear call-to-action. Adding a primary button like "Agendar sesión" that opens a `mailto:` or a Calendly link would improve conversion.

### 6. Footer — more breathing room and a subtle divider
The footer feels tight. Adding more vertical padding and a faint green accent dot next to the copyright would tie it back to the brand.

### 7. Remove `App.css` dead styles
The `App.css` file has leftover Vite boilerplate (logo spin, `.card`, `.read-the-docs`) that isn't used. Cleaning it up keeps things tidy.

---

### Files to modify

| File | Changes |
|---|---|
| `src/components/discovery/DiscoveryHeader.tsx` | Add `section-dark` class, accent line div |
| `src/components/discovery/FindingsSection.tsx` | Add hover top-border animation to cards |
| `src/components/discovery/QuickWinsSection.tsx` | Add chevron icon between before/after |
| `src/components/discovery/NextStepsSection.tsx` | Add CTA button |
| `src/pages/Index.tsx` | Increase footer padding, add accent dot |
| `src/App.css` | Remove unused boilerplate styles |
| `src/index.css` | Add small keyframe for border animation if needed |

All changes are CSS/layout only — no data or structural changes required.

