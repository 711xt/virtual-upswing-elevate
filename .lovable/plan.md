# Section 02 Update: Built for Publishers (content only, no redesign)

Only one file changes: `src/components/Services.tsx`, the second homepage section (`#services`). The rest of the site stays the same: the menu, the top section, the other sections, the final call-to-action, the footer, the shared styles and the moving background.

## What the section looks like now
- A small green label: "Systems we deploy". It is shown in capitals by its existing styling.
- A heading: "Systems we **deploy**." The last word uses the teal gradient.
- Three glass cards. Each has a small teal number (01, 02, 03), a title and a description.
- A teal glow lights up behind a card on hover.
- The heading slides in from the left. The cards fade up one after another, 0.1s apart.
- Cards sit three across on desktop and stack on mobile.

## Changes
1. **Label:** no change. It still reads "SYSTEMS WE DEPLOY".
2. **Heading:** becomes "Built for **Publishers**." The teal gradient moves to "Publishers", the same way it sits on the last word today. Size, weight, spacing and position stay the same.
3. **Cards:** the card text is replaced with your copy, word for word, and a fourth card is added:
   - Unlock Web Revenue: "We connect mobile and desktop web publishers with monetisation partners to unlock ad revenue."
   - In-App Advertising: "Connecting app inventory with advertising demand through our monetisation partners."
   - Building Publisher Partnerships: "We partner with digital publishers across categories, markets and platforms."
   - Connecting the Advertising Ecosystem: "We partner with established AdTech platforms to bring technology and advertising demand to our publisher network."
4. **Numbers:** the 01/02/03 labels are removed, and nothing replaces them. The title moves up into the space the number used, so the gap at the top of each card stays tidy.
5. **Hover glow and animations:** no change. The fourth card is built from the same card design, so it gets the same teal glow and joins the fade-up sequence. It appears 0.3s after the first card.

## Layout (the only spacing change)
Four cards in today's three-column grid would leave one card alone on a second row. The grid will change as follows:
- Desktop (large screens): 4 cards in one row.
- Tablet: 2 by 2.
- Mobile: stacked in one column, as now.

The page width, margins, padding and gap between cards stay the same. On a laptop-width screen, each of the four cards will be narrower than today's cards. The longer titles, such as "Connecting the Advertising Ecosystem", will wrap onto two lines.

## Verification after the change
- Take screenshots at desktop (1280px), tablet (820px) and mobile (390px) widths. Check that the label is unchanged, the heading reads "Built for Publishers." and all four cards show your exact copy with no numbers.
- Hover over each of the four cards and confirm the teal glow appears.
- Confirm the other sections look exactly as they did before.

## Technical details
- `services` array: remove the `n` field, put in the 4 new title/body entries and use `title` as the React key.
- Delete the `<span>` that showed the number, and remove `mt-4` from the `h3`.
- Grid classes: change `md:grid-cols-3` to `md:grid-cols-2 lg:grid-cols-4`, keeping `gap-6`.
- Heading markup: `Built for <span className="text-gradient">Publishers</span>.`
