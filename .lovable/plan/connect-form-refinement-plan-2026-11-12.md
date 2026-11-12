# Connect form refinement — plan

## Files changed (only these)
- `src/components/ConnectForm.tsx` — swap the two chip groups for dropdowns; reset logic.
- `src/components/ConnectDialog.tsx` — remove "CONNECT" eyebrow, centre heading + statement, darker panel.
- `src/lib/connect-schema.test.ts` — add one test for the reset rule (helper below).

Nothing else is touched: Hero, Nav, Footer, other sections, `styles.css`, the three button hookups, other fields, enquiry box, consent, and Formspree submission logic stay exactly as they are.

## 1. "I represent *" — single-select dropdown
- Uses the existing `Select` component (`src/components/ui/select.tsx`), full width, same input look as the other fields.
- Placeholder "Select your organisation type"; five options listed vertically; the chosen one shows inside the input.
- Inline error stays under it.

## 2. Capabilities — multi-select dropdown
- Built from the existing `Popover` + `Checkbox` components: a full-width trigger styled like the other inputs, opening a vertical list of the 8 options, each with a checkbox. The list stays open while ticking several.
- Placeholder "Select your capabilities"; selections appear inside the trigger as small teal tags that wrap neatly (with a chevron at the right).
- Inline error stays under it.

## 3. Reset on every role change
- Any change of "I represent" (including between Monetisation Partner, Ad Network / Demand Partner and Other) clears all capabilities, done in the role change handler.
- Capabilities dropdown shows only for those three roles, hidden for Publisher and App Developer (existing `needsCapabilities` rule).
- Small pure helper `nextCapabilities()` returns `[]` on any role change; tested.

## 4. Centred heading
- Delete the eyebrow paragraph. "Let's Connect" and the supporting statement get `text-center`; the statement uses `mx-auto` so it centres under the heading with the existing spacing. Navbar Connect button untouched.

## 5. Darker glass panel
- Replace `bg-background/90` on the panel with a near-black `#080808` at ~97% opacity (applied locally on the dialog, no global CSS change); keep the `glass` blur, border and the soft teal glow corner.
- Dropdown lists get the same near-black background and sit above the modal, so options stay readable and nothing behind shows through.

## Verification
- Run the test file; open the form via all three buttons in a browser; check role switching clears capabilities, multi-select works, validation errors still show, and "Form not connected yet" still appears. Styling look to be confirmed by you in the preview.
