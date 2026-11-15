# Connect form: submission error fix and control improvements

## 1. Cause of "Form not connected yet"
- That message no longer exists anywhere in the current site code. It came from the old Formspree version, which was fully removed when the form was switched to Google Sheets.
- The current preview sends through the server to your Google Apps Script; the last test there reached the thank-you screen.
- So the error is almost certainly coming from the **live site (virtualupswing.com), which still runs the older version** because the Google Sheets change was never published.
- Fix: publish the current version. Then I re-test on the live address (see Verification). If the live site still shows the message after publishing, I investigate further before changing anything else.

## 2. Google Sheets safeguards (kept, re-checked)
- Secrets stay server-only; the browser never sees the URL or token.
- Thank-you screen only after the script confirms success; failure keeps all typed details and shows "We couldn't send your enquiry. Please try again."
- Duplicate sends blocked: Submit disabled while sending, plus a guard in the submit handler.
- Phone value sent to the sheet as "+<code> <number>" in the existing Phone / WhatsApp column (no new column).

## 3. Phone country-code selector
- A compact code button sits immediately left of the phone input, same height, border, background and rounding as the existing inputs.
- Shows flag + code (e.g. "🇮🇳 +91"); empty by default ("Code").
- Opens a searchable list of all countries (flag, name, calling code); search matches name or code ("ind", "+91", "91").
- Uses the site's existing dropdown style (near-black menu) and the built-in search list component already in the project; no new library. Country list with codes kept in a small data file.
- Code becomes required alongside the number; validation message: "Select a country code".

## 4. Capabilities dropdown closes on scroll
- The dropdown closes when the page scrolls (desktop wheel/trackpad and phone touch scroll).
- Scrolling inside the dropdown's own list does not close it (so users can still reach all options); it only closes when the page itself moves.
- Selections are kept; options, conditional logic and selection behaviour unchanged.

## 5. Country field on phones
- The Country field becomes a searchable dropdown (same list, same look as the current field) with a search box at the top that is focused automatically on open, so the phone keyboard appears.
- Typing filters countries; list height limited to fit small screens; tapping selects and closes.
- Desktop looks the same as now, also gaining type-to-search.

## 6. Not touched
Homepage, hero, nav, footer, /connect layout, headings, labels, typography, colours, other fields, organisation and capability options, global styling.

## Files
- Changed: `src/components/ConnectForm.tsx` (phone code picker, searchable country, close-on-scroll), `src/lib/connect-schema.ts` (phone code rule), `src/lib/enquiry.server.ts` (combine code + number), tests `src/lib/connect-schema.test.ts`, `src/lib/enquiry.test.ts`.
- New: `src/lib/countries.ts` (names, flags, calling codes).

## Verification
1. Tests: phone code required, sheet gets "+91 98765 43210", column order and "New" unchanged.
2. Test browser at desktop and phone width: code search, country search with focused box, capabilities close on page scroll and keep selections, double-click Submit sends once.
3. One real test enquiry from the preview reaches the thank-you screen.
4. After you publish: one test enquiry on virtualupswing.com; you confirm the row in the sheet and delete it.
