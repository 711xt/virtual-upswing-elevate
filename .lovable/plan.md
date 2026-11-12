# Make the central ecosystem logo secretly link to /connect

## 1. Target element
- File: `src/components/EcosystemDiagram.tsx`, the `Core` component (the circular VU logo inside a black ring with the backlight glow).
- `Core` is used in two places: desktop (centre of the diagram, where the lines meet) and tablet/phone (between the two stacked groups). Both get the same click, so the logo works on every screen size.
- The navbar and footer logos are in other files and are not touched.

## 2. Smallest change
- Inside `Core`, wrap the existing inner ring (the round black circle holding the logo) in a router `<Link to="/connect">`.
- The Link gets only: `className="block h-full w-full rounded-full cursor-default"`, `aria-label="Connect with Virtual Upswing"` and `draggable={false}`.
- `cursor-default` keeps the normal arrow cursor (no pointer hand). The round shape means only the logo circle is clickable, not the glow around it.
- No hover, focus-colour, underline, opacity or animation styles are added. The ring, glow, backlight, logo image and their animations keep their exact classes.

## 3. Navigation
- Uses the existing `/connect` page and form through the router's `Link`, the same way the Connect buttons already work. No new page or route.

## 4. Why nothing else changes
- The wrapper fills the same space the ring already uses, so size and position stay the same.
- The SVG lines, pulses, bubbles, labels, price and tech chips, and the reduced-motion and pause behaviour are not edited.
- The browser's default focus outline would only show for keyboard users pressing Tab; mouse visitors never see it. (I can hide it too if you want, but that would make the link invisible to keyboard users.)

## 5. Files modified
- `src/components/EcosystemDiagram.tsx` only (one import line plus the `Core` wrapper).

## Verification
- Build log clean; in a test browser, clicking the centre logo on desktop and phone width opens `/connect`, and the cursor stays the normal arrow.
