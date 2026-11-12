# Connect form — implementation plan

## Where the form lives
One shared **modal** (pop-up window) holding the single "Let's Connect" form. A modal is used instead of a new page section so the locked section order and every existing layout stay exactly as they are. It opens over the current page with a soft fade and scale, dark glass panel, teal/lime accents, matching the existing site. It scrolls internally on small screens and closes with X, Esc, or clicking outside.

## How the three buttons open it
- Nav **Connect**, final-section **Connect**, Hero **Partner with Us** all call the same "open form" action.
- Only an `onClick` is added to each button. Classes, text, size and position are untouched. No Calendly or external links remain on them.

## Form contents
- Heading "Let's Connect" plus the given supporting text.
- Contact details: First Name, Last Name, Business Email, Phone / WhatsApp, Company Name, Country (dropdown list), Company Website. All required, two-column on desktop, one on phone.
- "I represent" (required, single choice): the five options.
- Monetisation Partner, Ad Network / Demand Partner or Other shows the multi-select "Which solutions or capabilities do you support?" (8 options, at least one required). Publisher or App Developer hides it and clears its selections.
- "Tell Us About Your Requirements" box with the given placeholder (required, max 2000 characters).
- Required consent checkbox, unticked by default, using the exact text.
- "Submit Enquiry" button with a spinner and disabled state while sending.
- Validation: inline error under each field, email and website format checks, length limits.
- Success: a branded confirmation inside the modal ("Thank you — we'll be in touch") with a Close button. On failure: a clear error, and the form keeps what was typed.

## Formspree
- The form sends to a Formspree endpoint read from one setting (`VITE_FORMSPREE_ENDPOINT`). No endpoint is made up.
- Until you give me your Formspree form ID, Submit shows an honest message: "Form not connected yet". It never fakes a success.
- Once you send the ID (looks like `https://formspree.io/f/xxxxxxx`), I plug it in and send one test submission to confirm it arrives.

## Files
- New: `src/components/ConnectForm.tsx` (form), `src/components/ConnectDialog.tsx` (modal plus shared open/close context), `src/lib/connect-schema.ts` (validation rules), plus a small test for the conditional/required rules.
- Modified (onClick only): `Nav.tsx`, `Hero.tsx`, `CtaSection.tsx`.
- `src/routes/index.tsx`: wrap the page in the shared provider and render the modal once. No section order or markup changes.

## How the existing site stays unaffected
- No changes to styles.css tokens, section components, typography, animations or spacing.
- The modal uses existing brand tokens and the existing `glass` look; it only appears when opened.
- Hero, navbar design and button designs are unchanged apart from the click behaviour.
