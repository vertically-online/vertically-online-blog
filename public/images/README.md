# Image slots

Every path below already has a generated placeholder so the site builds and
looks intentional. Replace the files in place (same path, same filename)
when real assets are ready — no code changes needed.

| Path | Used for | Recommended dimensions |
| --- | --- | --- |
| `/images/logo.svg` | Header + footer logo mark | Vector, square artboard (e.g. 40x40) |
| `/images/founder-poster.jpg` | Founder video poster (shown before play, or if no YouTube ID is set) | 1280x720 (16:9) |
| `/images/more-customers.jpg` | "What we do" — More customers block | 1200x900 (4:3) |
| `/images/less-work.jpg` | "What we do" — Less manual work block | 1200x900 (4:3) |
| `/images/team/<slug>.jpg` | Team grid photo, one per member (slug = `team[].slug` in `content/site.ts`) | 600x600 (1:1) |
| `/images/og.jpg` | Open Graph / Twitter share image | 1200x630 |

## Added later (currently empty in config)

These slots only render once entries exist in `content/site.ts`:

| Path | Used for | Recommended dimensions |
| --- | --- | --- |
| `/images/case-studies/<slug>.jpg` | Success story image (add path via `caseStudies[].image`) | 1200x900 (4:3) |
| `/images/logos/<slug>.png` | Client logo strip (add path via `clientLogos[].image`), transparent background preferred | ~240px wide, transparent PNG |

## Notes

- All images render through `next/image`; keep `alt` text in `content/site.ts` accurate when swapping files.
- Team photos without a matching file automatically fall back to an initials avatar — no broken images.
