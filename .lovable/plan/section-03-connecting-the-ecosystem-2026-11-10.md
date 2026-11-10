# Section 03 — Connecting the Ecosystem

Only the Autonomous Operations section changes. Hero, nav, Section 02, Beyond Monetisation, the final CTA, the footer and global styles stay as they are.

## What changes in the section
- The small label "AUTONOMOUS OPERATIONS" stays. The headline becomes "Connecting the Ecosystem" (no full stop), with the same heading style and slide-in reveal as now.
- The current lead flow list and fake dashboard come out. An animated ecosystem diagram replaces them.
- The "Book A Call" button (Calendly, new tab) stays and moves to sit under the diagram.

## The diagram (desktop, left to right)
1. **Publishers panel (left):** dark glass panel with five round bubbles: Desktop, Mobile, In-app, CTV, OTT. Each has a minimal icon, a label and a soft teal edge glow. Eleven smaller "Floor Price" bubbles ($1.72, $0.41, $1.22, $0.98, $1.34, $0.72, $0.88, $1.56, $0.63, $1.08, $1.49) float gently at different depths and sizes, placed so no labels overlap. A tiny muted note reads "Illustrative" so the prices aren't taken for real rates.
2. **Centre:** your uploaded circular V logo, unchanged, inside a near-black ring with a thin outline, a deep-teal glow and a soft lime backlight.
3. **Monetising Platforms panel (right):** a matching glass panel with Ad Server, Header Bidding, Video, SSPs and Ad Tags, each with an icon. Six smaller floating chips sit around them: GAM, prebid.js, VAST 4.0, JS, ads.txt, OpenRTB.

## Motion (a continuous loop of about 8 seconds)
- Curved light paths run from each publisher bubble to the logo, and from the logo to each platform bubble.
- Phase 1: teal pulses and small particles travel from the publishers to the centre.
- Phase 2: the ring and logo slowly brighten and a teal and lime backlight swells. No flash.
- Phase 3: pulses travel out to the platform bubbles, and each bubble lights up softly as a pulse arrives.
- Phase 4: return pulses travel from the platforms back to the centre, then back out to the publishers.
- Pulses are staggered so the flow never visibly starts and stops. Floating bubbles drift slowly.
- Reduced motion: everything shows fully lit and still, with the paths drawn and no moving pulses.
- The animation runs only while the section is on screen.

## Tablet and mobile
- The layout stacks vertically: Publishers, then the logo, then Monetising Platforms. Paths run top to bottom.
- Bubbles stay at a readable size in a 3+2 or 2+3 grid. Fewer price and tech bubbles show on small screens (about 6 of each) to keep it clear.
- Nothing spills past the page width.

## Colours
Only black, deep teal #00827A, muted lime #5EAD6E, charcoal and off-white. No new colours.

## Technical details
- `src/components/AutonomousOps.tsx`: the section stays, with `id="operations"` and the heading reveal. The `flow` list and dashboard markup are replaced by `<EcosystemDiagram />`.
- New `src/components/EcosystemDiagram.tsx`: an absolutely positioned layer with one inline SVG for the paths, holding bubbles as HTML elements. Paths are cubic Béziers computed from fixed layout coordinates in a viewBox (desktop, horizontal), plus a second vertical path set for under `md`. Pulses use SVG `<circle>` elements animated with `requestAnimationFrame` via `getPointAtLength`, driven by one shared phase clock. The centre glow and bubble highlights are read from that clock. This is pure SVG and React with no Three.js. An IntersectionObserver pauses the loop off-screen, and `matchMedia('(prefers-reduced-motion)')` renders the static state.
- Icons come from lucide-react (Monitor, Smartphone, AppWindow, Tv, PlaySquare, Server, Gavel, Video, Network, Code).
- Logo: create a Lovable asset pointer from the upload (`src/assets/vu-logo-circle.png.asset.json`) and render it with its original proportions. The existing nav logo is not touched.
- Floating keyframes are scoped in the component (inline `<style>` with section-prefixed names), so nothing is added to global `styles.css`.
- Verify: check the build log, and use Playwright screenshots at 1280 and 390 to confirm the headline, all labels and prices, the logo loading and no horizontal overflow.
