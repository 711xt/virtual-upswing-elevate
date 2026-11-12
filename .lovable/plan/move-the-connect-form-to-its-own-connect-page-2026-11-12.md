# Move the Connect form to its own /connect page

## 1. Route and files
- **New:** `src/routes/connect.tsx` — the standalone `/connect` page, with its own title, description and social tags ("Connect | Virtual Upswing").
- **Modified (click behaviour only):** `src/components/Nav.tsx` (Connect), `src/components/CtaSection.tsx` (bottom Connect), `src/components/Hero.tsx` (Partner with Us).
- **Modified:** `src/routes/index.tsx` — remove the `ConnectProvider` wrapper only. Section order and markup stay the same.
- **Removed:** `src/components/ConnectDialog.tsx` (the pop-up). Once nothing opens the pop-up it is dead code. The form itself is not removed or copied.
- **Unchanged:** `src/components/ConnectForm.tsx`, `src/lib/connect-schema.ts` and its test, `styles.css`, every other section and the footer layout.

## 2. Reusing the form
- `/connect` renders the existing `ConnectForm` directly. Labels, options, validation, the conditional capabilities with reset, the consent box, loading/success/error states and the Formspree / "not connected yet" handling all stay exactly as they are.
- The only adjustment is that the form's `onClose` (used by the Close button on the thank-you screen) gets a page action instead of closing a pop-up. That action is "Back to home", which goes to `/`. The form code does not change.

## 3. Page design
- Full page on solid `#000000`, with a centred column (max about 768px) and comfortable vertical padding.
- A small top bar holds the existing logo lockup, linking back to `/`. It reuses the same logo image and wordmark style. The homepage nav is not changed.
- An opaque near-black panel (`#080808`, no transparency or backdrop blur), rounded like the current pop-up, with a subtle teal border and one restrained teal glow at the corner.
- Centred "Let's Connect" heading (Inter bold, with the gradient on "Connect", as in the current pop-up), with the existing supporting statement centred underneath.
- Dropdown menus keep their opaque `#080808` style. Only brand colours are used.
- Responsive: two-column fields on desktop and one column on phone, as the form already does.

## 4. Button navigation
- Each of the three buttons becomes `<Button asChild>` wrapping a router `<Link to="/connect">`. Every existing class, variant, text and arrow stays the same, so they look and sit the same, but they now act as real links.
- The `useConnect` imports and `onClick={connect.open}` are removed from the three buttons.

## 5. How the homepage stays unaffected
- No changes to section components other than swapping the click behaviour on those three buttons.
- Hero visuals and copy, the Connecting the Ecosystem section, the footer layout, typography, global CSS, animations and spacing are untouched.
- The section order in `index.tsx` stays the same.

## Verification after build
- Build log is clean. The existing form rule tests pass.
- In a browser: all three buttons go to `/connect`, the form renders and validates on an empty submit, the capabilities show and reset, and the homepage sections are still present.
