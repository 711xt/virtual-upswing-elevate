# Connect form: three phone-only fixes

Only `src/components/ConnectForm.tsx` changes. Every new rule applies only below 640px wide (`max-sm:`) or only to touch screens, so the desktop form stays exactly as it is now.

## 1. White fields after autofill (First Name, Last Name, Business Email)
**Cause:** the light-blue fill in your screenshot is the phone browser's own autofill colour. The dark override added last time only covers some of the browser's autofill states. Safari on iPhone also re-applies its colour when the field loses focus. It's also possible the live site was showing the older version, if it hadn't been published since that fix.

**Fix (phones only):** for the autofill, focused and unfocused-but-filled states, add a solid inset shadow in the existing field colour, white text, a white cursor and the delayed background trick. Covers both the `:-webkit-autofill` and `:autofill` selectors. Border, rounding and size don't change.

## 2. Green press on Submit Enquiry (touch only)
**Cause:** the green only shows on hover, and phones have no hover.

**Fix:** a pressed state that applies only on touch screens: green background with the existing lime colour and glow, shown only while the finger is down. It reverts as soon as the finger lifts. It doesn't apply while the form is sending or the button is disabled. The default white look, the loading spinner, and the success and error states are unchanged. Desktop hover is untouched.

## 3. Unwanted zoom when tapping the phone code or number
**Cause:** iPhone Safari zooms in on any text field with text smaller than 16px. The form's fields use 14px text.

**Fix (phones only):** set 16px text on every field: text boxes, phone code, country, "I represent", capabilities, the requirements box, and the search boxes inside the code and country lists. Padding and height stay the same, so the layout barely changes. The page's zoom setting is not touched, so pinch-to-zoom still works. I'll check that nothing on the page spills sideways.

## Desktop guarantee
- At 640px and wider, every new rule is off.
- The touch-only pressed state never matches a mouse.
- No global styles, no other files, no changes to fields, wording, checks or the Google Sheet sending.

## Verification
1. At 1280px, check the computed text size, colours and button hover. They must match today's values.
2. At 390px, check that the fields show 16px text, nothing spills sideways, the autofill colour stays dark (simulated), and the touch press turns green, then white again.
3. Please test on your iPhone after publishing: autofill your name and email, tap the phone fields, and press Submit.
