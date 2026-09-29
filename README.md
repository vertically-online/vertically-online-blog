# Vertically Online

Marketing site for Vertically — growth + AI automation for local small businesses.

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS v4, deployed on Vercel.

## Editing content

All copy, links, team members, and image paths live in [`content/site.ts`](content/site.ts). Edit that file to change what's on the site without touching any component. Each homepage section is its own component in [`components/sections/`](components/sections/).

Image slots and recommended dimensions are documented in [`public/images/README.md`](public/images/README.md).

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and fill in as needed:

- `GOOGLE_PLACES_API_KEY` / `GOOGLE_PLACE_ID` — power the live Google reviews panel via `/app/api/reviews/route.ts`. If unset, the panel falls back to `fallbackReviews` in `content/site.ts`, and hides entirely if that's also empty.
- `NEXT_PUBLIC_SITE_URL` — used in metadata, JSON-LD, and the sitemap. Set to the production domain.

## Deploying

```bash
vercel
```

Set the environment variables above in the Vercel project settings before deploying to production.
