https://kpatelboka646-prog.github.io/api-landing-page4.github.io/

API Studio — Version 7 (focus fix)

Files:
- index.html
- style.css
- script.js
- logo.png (place in same folder)
- document.html (link target for download button)

What changed in v7:
- Removed mobile blue/transparent focus highlight by disabling UA tap highlight.
- Removed global browser focus outlines.
- Added a subtle rounded focus ring that appears only around the OPEN badge when a tile is focused/clicked (via .api-card:focus .open & helper class).
- Ensured the card is programmatically focused on pointerdown so the OPEN ring shows reliably on mobile and desktop.
- No other functional or visual changes from v6.

How to use:
1. Put files in a folder with logo.png.
2. Open index.html.
3. Click/tap any tile — the OPEN badge gets a subtle rounded ring while focused; the mobile blue highlight is gone.

Notes:
- Accessibility: keyboard users still see the focus ring when navigating to a tile (Enter/Space will activate it).
- I kept the OPEN badge as a non-interactive span inside the link; the ring is shown by focusing the card itself (this avoids nested interactive elements).

If you want the ring to be visually stronger / different color, I can tweak the `box-shadow` value in style.css — otherwise this is optimally subtle as requested.


