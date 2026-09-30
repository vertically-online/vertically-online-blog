# Image slots

Every path below already has a generated placeholder so the site builds and
looks intentional. Replace the files in place (same path, same filename)
when real assets are ready — no code changes needed.

| Path | Used for | Recommended dimensions |
| --- | --- | --- |
| `/images/brand/logo-light.png` | Header logo (dark text, transparent bg — for light/glass surfaces) | ~900x273, transparent PNG |
| `/images/brand/logo-dark.png` | Footer logo (white text, transparent bg — for dark surfaces) | ~900x273, transparent PNG |
| `/images/brand/logo-mark.png` | Standalone arrow mark (icon-only, square canvas) | Square, transparent PNG |
| `app/favicon.ico` | Browser tab icon | Multi-size .ico (16–256px), generated from the arrow mark |
| `/images/founder-poster.jpg` | Founder video poster (real YouTube thumbnail; shown before play, or if no YouTube ID is set) | 1080x1920 (9:16, matches the Shorts embed) |
| `/images/og.jpg` | Open Graph / Twitter share image | 1200x630 |

## Notes

- All images render through `next/image`; keep `alt` text in `content/site.ts` accurate when swapping files.
- Original, full-resolution brand exports (favicon + logo lockups, black/white/transparent variants) live in `/assets/brand-source/` at the project root — not served publicly. Regenerate the files above from those sources if the brand mark ever changes.
- The rooftop skyline divider between the hero and the next section (`components/RoofDivider.tsx`) is a generated inline SVG, not an image file — edit the `HOUSES` array in that component to change its shape.
