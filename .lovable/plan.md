# Beyond Monetisation — update the existing "How we work" section

**Section being changed:** the four-card "How we work." section (Discovery / System Design / Deployment / Optimization), which is the section the nav's "Beyond Monetisation" link already scrolls to. Only `src/components/HowItWorks.tsx` changes. No other section, no global styles, no nav or footer.

## Content
- Small green label: "How we work" becomes **"Revenue Growth"**. Same position and styling.
- Main title: **"Beyond Monetisation"**, no full stop. Same heading size, with the gradient accent on "Monetisation".
- Subtitle on two lines, no full stops:
  - "More Than Connections" in white
  - "A Partner in Revenue Growth" with the teal/green gradient accent
- Supporting paragraph, word for word from your brief, in the same muted-white body style as the other sections.
- Four rectangular cards, each with a number, a small line icon, a title, and the description from the reference image:
  1. 01 Monetisation Strategies (target icon): "Tailored approaches to maximise inventory potential."
  2. 02 Revenue Optimisation (bar chart icon): "Smarter strategies to improve yield and eCPMs."
  3. 03 Ad Format Recommendations (screen icon): "Identifying formats that complement your inventory."
  4. 04 Performance Monitoring (activity icon): "Tracking results and identifying growth opportunities."

## Look
- Cards keep the current glass card shape, layout and grid: 4 across on desktop, 2 on tablet, 1 on phone.
- A subtle 3D lift: a soft dark drop shadow, a faint inner top highlight, and a thin teal-to-lime border glow. Cards 1 and 3 lean teal; cards 2 and 4 lean muted lime, like the reference.
- The existing hover glow, slide-in heading and staggered fade-up of the cards stay the same.
- The icons sit in small rounded squares, the same style as the Unlock More Revenue cards.
- The reference image's circles, decorative lines, "We offer" heading and paragraph are not copied.

## Checks
- Check the section on desktop and phone sizes for fit, overflow and exact wording.

## Technical details
- Rewrite only the `steps` data and the JSX in `HowItWorks.tsx`. Keep `id="process"` and `useReveal`.
- The depth comes from inline Tailwind classes (shadow, an `inset` highlight, and a gradient border overlay that uses the existing brand-teal and brand-lime tokens). No changes to `styles.css`.
- Icons come from lucide-react: Target, BarChart3, MonitorPlay, Activity.
