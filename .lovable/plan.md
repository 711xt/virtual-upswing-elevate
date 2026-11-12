# Final Layout Refinement: wider sections from Section 02 onwards

The Hero and the top menu are not touched. Text, font sizes, colours, cards, animations and buttons stay the same. Only width limits and side spacing change.

## Cause of the empty side space
Every section after the Hero sits inside a box capped at **1280px wide** (`max-w-7xl`), with 24px side padding. On a 1920px screen that leaves about **320px of empty black on each side**. On a 1440px MacBook it leaves about 80px. The screenshots show this.

| Section | Current limit |
|---|---|
| 02 Built for Publishers (`Services.tsx`) | 1280px box |
| 03 Connecting the Ecosystem (`AutonomousOps.tsx`) | 1280px box, and the diagram itself is capped at 1152px (`EcosystemDiagram.tsx`, `max-w-6xl`) |
| 04 Unlock More Revenue (`UnlockRevenue.tsx`) | 1280px box |
| 05 Beyond Monetisation (`HowItWorks.tsx`) | 1280px box |
| 06 Final call-to-action (`CtaSection.tsx`) | glass panel capped at 1024px (`max-w-5xl`) |
| Footer (`Footer.tsx`) | 1280px box |

## Changes
1. **Section boxes (02, 03, 04, 05, footer):** change the 1280px cap to about **1600px**. Increase side padding step by step as screens get wider (24px on mobile, 40px on tablet, 64px on large desktop) so content never touches the edges.
2. **Ecosystem diagram:** raise its cap from 1152px to fill the new box. It already scales evenly, so it stays in proportion and does not stretch.
3. **Final call-to-action panel:** raise its cap from 1024px to about 1280px so it lines up with the wider sections. The headline keeps its own text width, so line breaks stay the same.
4. **Unchanged on purpose:** heading and paragraph text widths stay the same so line lengths stay readable. The card grids (4 across, 2×2 on tablet, 1 column on mobile) and the Unlock More Revenue two-column split stay the same. Cards simply get proportionally wider.

## Effect by screen
- **1920px desktop:** content fills about 1600px instead of 1280px. Side space shrinks from about 320px to about 160px on each side.
- **1440px MacBook:** content spans almost the full width with 64px side padding.
- **Tablet and mobile:** look the same as today, because these screens never reached the 1280px cap.

## Verification
Take screenshots at 1920, 1440, 1280, 820 and 390px wide. Confirm the Hero is identical, nothing overflows, the cards and diagram keep their proportions, and the mobile layout is unchanged.

## Technical details
- Replace `mx-auto max-w-7xl` with `mx-auto max-w-[1600px]` in Services, AutonomousOps, UnlockRevenue, HowItWorks and Footer.
- Replace section padding `px-6` with `px-6 md:px-10 xl:px-16` in those sections (footer included).
- EcosystemDiagram desktop wrapper: change `max-w-6xl` to `max-w-[1440px]`.
- CtaSection panel: change `max-w-5xl` to `max-w-7xl`, and add the same section padding steps.
- Hero.tsx and Nav.tsx are not edited.
