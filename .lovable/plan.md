# Final touches: Business Email on phones, footer email

## 1. Business Email stays dark on phones
Only the Business Email field on `/connect` changes, and only below 640px wide.

**Cause (not yet confirmed):** for email fields, iPhone Safari paints its autofill colour with a stronger built-in rule than the one it uses for name fields. That rule beats the dark override we added. I can't reproduce iPhone autofill here, so this needs confirming on your phone.

**Fix:** extra rules for this one field on phones only, each set to win over the browser's own rule:
- a dark inset shadow in the existing field colour, plus a dark background colour
- white text and a white cursor
- a delayed background colour change, so the browser's colour never shows
- the same rules in the autofilled, focused, unfocused and pressed states, for both autofill selectors Safari uses

Size, border, rounding and wording stay the same. Other fields and the desktop form don't change.

## 2. Footer email
- Add **contact@virtualupswing.com** as an email link that opens the visitor's mail app.
- It uses the same muted grey, small spaced capitals as the "Engineering Autonomous Operations" tagline. Email addresses can't be in capitals, so it uses the tagline's colour and size in normal lowercase.
- **Desktop:** it goes in the empty right-hand column of the footer, aligned right.
- **Phone:** it sits under the copyright line, in the same single-column order. Long addresses can wrap, so nothing spills sideways.
- Logo, tagline, copyright, divider and spacing stay as they are.

## Files
- `src/components/ConnectForm.tsx`: classes on the Business Email field only.
- `src/components/Footer.tsx`: the email link replaces the empty right column.

## Checks
- At 1280px: the Connect form text sizes and colours are unchanged, and the footer email sits at the bottom right.
- At 390px: the footer email is visible with no sideways spill, and the email field has the dark styles (autofill simulated).
- On your iPhone after publishing: autofill the email field and confirm it stays dark.
