# Navbar & Hero Content Update (text only, no redesign)

Only two files change: `src/components/Nav.tsx` and `src/components/Hero.tsx`. No styling, class names, animation, background, scroll indicator, sections below the hero or footer are touched.

## 1. Navigation bar — `src/components/Nav.tsx`
Update the labels in the `links` array; keep the existing section anchors (they already point to the right homepage sections, so the active highlight keeps working):

| Anchor | Old label | New label |
|---|---|---|
| `#services` | Systems We Deploy | Built for Publishers |
| `#operations` | Autonomous Operations | Connecting the Ecosystem |
| `#process` | How We Work | Beyond Monetisation |

Top-right button: text "Book A Call" becomes "Connect". Same teal styling, same Calendly link opening in a new tab.

## 2. Hero — `src/components/Hero.tsx`
- **Headline:** "Bridging Publishers with <accent>Global Advertising Ecosystem</accent>." The existing `text-gradient` span and the desktop line break (placed before "with") stay as they are. Size, weight, spacing and alignment don't change.
- **Slogan:** "ENGINEERING AUTONOMOUS OPERATIONS" stays exactly as it is.
- **Supporting paragraph:** becomes "Virtual Upswing bridges digital inventory with global advertising demand, driving advertising revenue growth for publishers." Same styling.
- **Primary CTA:** "Book A Call →" becomes "Partner with Us →". Same button and the same Calendly link.
- **Secondary CTA:** "See what we build" becomes "Explore Solutions". It still links to `#services` (Built for Publishers).
- `ParticlesBackground`, the gradient overlay, the scroll indicator and the bottom divider stay exactly as they are.

## 3. Page metadata (optional, small)
The page title and description in `src/routes/index.tsx` still describe AI workflows. I can update them to match the publisher positioning if you like. If not, I'll leave them alone.

## Verification after build
- Screenshot the desktop view at 1350px and a mobile view at 390px. Confirm the new labels, the Connect button, both hero buttons and the headline wrapping.
- Check that the particle canvas still renders and reacts to the mouse, and that the scroll indicator still pulses.

## Notes / assumptions
- "Connect" and "Partner with Us" keep your Calendly link. Tell me if either should go somewhere else, such as a contact email or the #contact section.
- The section content below the hero (e.g. the "Systems We Deploy" heading) is not changed, per your brief. That means the nav labels will differ from those section headings for now.
