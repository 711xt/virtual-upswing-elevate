# Connect form: Google Sheets submission and thank-you screen

## Current state
- Form: `src/components/ConnectForm.tsx`, used only by `/connect` (`src/routes/connect.tsx`).
- It currently posts from the browser to a Formspree address that was never set, so it shows "Form not connected yet". There is no server code yet.
- Validation rules live in `src/lib/connect-schema.ts` (with tests). They stay unchanged.

## 1. What you need to provide (secrets)
- `GOOGLE_SHEETS_WEBAPP_URL`: your Apps Script Web App URL (the `https://script.google.com/macros/s/.../exec` link). I'll ask for it through a secure form, never in code.
- `GOOGLE_SHEETS_SHARED_TOKEN`: a random token generated in the same secure form. You paste it into your Apps Script so the script only accepts rows from this website. I'll give you a 5-line snippet showing where it goes.

## 2. Server-side submission
- New server function `submitEnquiry` (in `src/lib/enquiry.functions.ts`) runs on the server only:
  - Re-checks every field with the existing `connectSchema`, so tampered requests are rejected.
  - Spam protection: a hidden "website2" honeypot field (bots fill it, people never see it) and a minimum 3-second fill time. A failed check is quietly rejected.
  - Sends one row to the Web App with the token, in this exact order: Submission Date (ISO, UTC), First Name, Last Name, Business Email, Phone / WhatsApp, Company Name, Country, Company Website, Organisation Type, Capabilities (comma-separated, blank when not applicable), Requirements, Lead Status = `New`.
  - Returns success only when the Web App answers `{ "ok": true }`. Anything else (timeout, error, wrong token) returns a failure, with the details logged on the server only.
- The browser never sees the Web App URL or the token. The Formspree code and `VITE_FORMSPREE_ENDPOINT` are removed.

## 3. Submission behaviour in the form
- Uses the existing loading state ("sending", spinner on Submit). The button is disabled while sending, so a second click can't send a duplicate.
- On failure: the existing error line shows "We couldn't send your enquiry. Please try again." All entered details stay filled in, and Submit works again.
- The thank-you screen appears only after the server confirms success.
- Fields, labels, dropdowns, conditional capabilities, consent and layout are untouched.

## 4. Thank-you screen (same /connect page, replaces the form)
- Centred, inside the existing near-black panel:
  - **Thank You!** (Inter bold, same heading style as the page)
  - **Your enquiry has been received.**
  - "Thank you for reaching out to Virtual Upswing. We appreciate your interest in connecting with us."
  - "Our team will review your enquiry and get in touch with you soon."
  - The existing official logo (`src/assets/logo.png`, same one as the nav), about 64px.
  - Under it: **ENGINEERING AUTONOMOUS OPERATIONS** in the small spaced-caps style already used on the site, muted grey.
  - No "Virtual Upswing" wordmark beneath the slogan.
- While the thank-you screen shows, the "Let's Connect" heading and intro line above it are hidden so the message stands alone.
- Current green tick and "Close" button are removed. The top-left logo still links back home.
- Teal and lime accents only, works on desktop and phone.

## 5. Not touched
- Homepage, hero, nav, ecosystem animation, footer, global CSS and every other section.

## Files
- New: `src/lib/enquiry.functions.ts`, `src/lib/enquiry.server.ts` (row building), `src/lib/enquiry.test.ts` (column order and `New` status).
- Changed: `src/components/ConnectForm.tsx` (submit call, honeypot, thank-you state), `src/routes/connect.tsx` (hide heading on success).

## Verification
- Tests pass for the column order, `New` status and spam checks.
- With your secrets in place: one real test submission, then confirm the row appears in your sheet (you check it, or share access) and the thank-you screen shows. Also confirm a failed send keeps the details.

## Still open separately
- The hidden centre-logo link to `/connect` from the earlier brief is not built yet. Tell me if you still want it.
