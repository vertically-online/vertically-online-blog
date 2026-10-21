# Ranking test: "roofing answering service"

**Baseline (publish) date: 2026-10-21.** Page and posts went live on vertically.online that day.

## Pages under test

| Page | Primary keyword |
|---|---|
| `/roofing-answering-service` (landing, owns the main term) | roofing answering service |
| `/blog/best-roofing-answering-services` | best roofing answering service |
| `/blog/roofing-virtual-assistant-vs-ai-receptionist` | roofing virtual assistant |
| `/blog/what-to-look-for-in-a-roofing-answering-service` | answering service for roofing companies |

All four are indexable, canonical, in `sitemap.xml` with real `lastModified`, and listed in `/llms.txt`.

## Keywords tracked (Semrush Position Tracking, US)

| Keyword | Volume | KD | Target page |
|---|---|---|---|
| roofing answering service | 1,300 | 9-12 | landing |
| roofer answering service | 260 | 5 | landing / best-of post |
| answering service for roofing | 90 | 1 | landing |
| answering service for roofing companies | 90 | 1 | what-to-look-for post |
| answering service for roofing contractors | 70 | 0 | what-to-look-for post |
| roofing answering services | 70 | 5 | best-of post |
| roofer phone answering service | 40 | 9 | landing |
| ai receptionist for roofing companies | 40 | n/a | VA vs AI post |
| roofing virtual assistant | 210 | 9 | VA vs AI post |
| ai answering service for roofing companies | 20 | 0 | best-of post |

Judge the test on the whole cluster: the main term's 1,300 may be inflated by a recent spike.

## Checkpoints

| Day | Date | Report |
|---|---|---|
| 7 | 2026-10-28 | Indexed or not (GSC URL inspection) |
| 14 | 2026-11-04 | Indexed; impressions; clicks; avg position per keyword |
| 30 | 2026-11-20 | Same, plus booking clicks from organic |
| 60 | 2026-12-20 | Same |
| 90 | 2027-01-19 | Same |

Success markers (judgment, not guarantees): indexed within 14 days; top 20 for the low-KD variants by day 60; top 10 by day 90; at least one organic booking click by day 60.

## Measurement

- **GA4** (`NEXT_PUBLIC_GA_ID`): `cta_booking_click`, `phone_tap`, `demo_click` (and `email_click`), each with `page_path` and the section as `location`. Organic booking clicks = `cta_booking_click` filtered to session source `google / organic` and the four page paths.
- **Search Console:** impressions, clicks, average position per page and query.

## UTM links for outreach

Use these instead of bare URLs so outreach traffic doesn't blur the organic numbers:

- `https://vertically.online/roofing-answering-service?utm_source=SOURCE&utm_medium=MEDIUM&utm_campaign=roofing-answering-service-test`
- `https://vertically.online/blog/best-roofing-answering-services?utm_source=SOURCE&utm_medium=MEDIUM&utm_campaign=roofing-answering-service-test`
- `https://vertically.online/blog/roofing-virtual-assistant-vs-ai-receptionist?utm_source=SOURCE&utm_medium=MEDIUM&utm_campaign=roofing-answering-service-test`
- `https://vertically.online/blog/what-to-look-for-in-a-roofing-answering-service?utm_source=SOURCE&utm_medium=MEDIUM&utm_campaign=roofing-answering-service-test`

Examples: `utm_source=linkedin&utm_medium=social`, `utm_source=newsletter&utm_medium=email`.
