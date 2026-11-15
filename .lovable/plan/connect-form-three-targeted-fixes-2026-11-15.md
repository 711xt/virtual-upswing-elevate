# Connect form: three targeted fixes

## 1. Missing sheet values (Business Email, Phone / WhatsApp, Company Name, Company Website)

**What the code sends today** (`submitEnquiry` in `src/lib/enquiry.functions.ts`): a correct 12-item `row` array in sheet order, plus named fields `email`, `phone`, `company`, `website`. The form's own values are correct (state keys `email`, `phone` + `phoneCode`, `company`, `website`, joined as "+91 98765 43210" by `buildRow`).

**Most likely cause:** your Apps Script builds the row from named fields, and for these four columns it reads different names (for example `businessEmail`, `phoneWhatsapp`, `companyName`, `companyWebsite`). The other eight names happen to match, which is why only these four come through blank. I can't see your script, so this is unconfirmed; step 1 below confirms it.

**Fix:**
- Server function sends each value under every reasonable name: the current names, the sheet-header names (`"Business Email"`, `"Phone / WhatsApp"`, `"Company Name"`, `"Company Website"`), and camelCase forms (`businessEmail`, `phoneWhatsapp`, `companyName`, `companyWebsite`). The `row` array stays as is.
- Your existing `doPost` handler, its shared-token check and all server-side safeguards (validation, spam checks, secrets kept on the server) stay exactly as they are. Nothing in the script is replaced or bypassed.
- If your script reads names other than those above, you paste its `doPost` here (no token), and I match the server payload to the exact names it reads, changing nothing else.
- Column order and sheet structure stay unchanged.

## 2. Phone input layout (`ConnectForm.tsx`, phone block only)
- Code button: drop the inherited full width; fixed compact width (about 6.5rem desktop, 6rem phone) fits a flag, "+971" and the arrow; `shrink-0`, same padding/height/border/background as other fields.
- Number input: `min-w-0 flex-1` so it takes the remaining space and long numbers scroll inside the box instead of spilling out.
- Both share the same height and alignment.

## 3. Black backgrounds incl. autofill
- The fields share one style; the white comes from the browser's autofill (company name/website are commonly autofilled).
- Add autofill overrides to the shared input style, local to the form only: an inset shadow in the same dark field colour, white text fill, matching caret, and a long background transition so the browser's colour never shows. Applies to all text inputs in this form, so they stay identical in empty, focused, filled and autofilled states. No global CSS changes.

## Files
- `src/lib/enquiry.functions.ts` (field names in the payload)
- `src/components/ConnectForm.tsx` (phone block classes, shared input class autofill rules)
- `src/lib/enquiry.test.ts` (test that the four values and the joined phone appear under the sheet-header names)

## Testing
1. Run existing and new tests.
2. Send one test enquiry ("TEST Lovable") and ask you to confirm all 12 columns are filled, then delete it. If the four are still blank, I'll ask you to paste your script's `doPost` (no token) and match the names exactly.
3. Test browser at 1280px and 390px: measure that the code button is compact, the number input fills the rest, a 15-digit number stays inside, nothing overflows.
4. Fill Company Name/Website (and simulate autofill) and check the background stays dark.
5. Nothing else on the form or site changes.
