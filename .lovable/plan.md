# Final Layout Refinement: wider sections from Section 02 onwards

The Hero and the top menu are not touched. Text, font sizes, colours, cards, animations and buttons stay the same. Only width limits and side spacing change.

## Cause of the empty side space
Every section after the Hero sits inside a box capped at **1280px wide** (`max-w-7xl`), with 24px side padding. On a 1920px screen that leaves about **320px of empty black on each side**.

| Section | Current limit |
|---|---|
| 02 Built for Publishers (`Services.tsx`) | 1280px box |
| 03 Connecting the Ecosystem (`AutonomousOps.tsx`) | 1280px box, and the diagram itself is capped at 1152px (`EcosystemDiagram.tsx`) |
| 04 Unlock More Revenue (`UnlockRevenue.tsx`) | 1280px box |
| 05 Beyond Monetisation (`HowItWorks.tsx`) | 1280px box |
| 06 Final call-to-action (`CtaSection.tsx`) | panel capped at 1024px |
| Footer (`Footer.tsx`) | 1280px box |

## Changes
1. **Section boxes (02 to 05, and the footer):** raise the 1280px cap to a **maximum** of 1600px. Increase the side padding as screens get wider: 24px on mobile, 40px on tablet and 64px on large desktop.
2. **Ecosystem diagram:** raise its cap so it can fill the wider box. It keeps its proportions as it grows.
3. **Final call-to-action panel:** raise its cap from 1024px to 1280px. The headline keeps its own width limit.

## Safeguards against stretching
- 1600px is only a maximum. On screens narrower than that, each section fits the screen width minus the side padding, the same way it works today.
- Headings, subtitles and paragraphs keep their current width limits, so line lengths stay readable.
- Card padding, corners, gaps and the inside layout of each card stay the same. No card gets a fixed width or height.
- The diagram scales evenly, keeping its width-to-height ratio.
- If cards look too wide on very large screens, that section's card grid gets its own smaller width limit, so they stop growing.

## Effect by screen
- **1920px:** content can spread up to 1600px wide instead of 1280px.
- **1440px MacBook:** the gap at each side shrinks to the 64px padding.
- **Tablet and mobile:** the same as today.

## Verification
Take screenshots at 1920, 1440, 1280, 820 and 390px wide. Confirm the Hero and menu are identical, nothing overflows or stretches, and the mobile layout is unchanged.

## Technical details
- Services, AutonomousOps, UnlockRevenue, HowItWorks, Footer: `max-w-7xl` becomes `max-w-[1600px]`, and section `px-6` becomes `px-6 md:px-10 xl:px-16`.
- EcosystemDiagram desktop wrapper: `max-w-6xl` becomes `max-w-[1440px]`. Keep the existing aspect-ratio.
- CtaSection: `max-w-5xl` becomes `max-w-7xl`, and the section gets the same padding steps.
- Keep the existing inner `max-w-*` text limits. Hero.tsx and Nav.tsx are not edited.
- When building starts, add this task to roadmap.md. That file can't be changed while still planning.
