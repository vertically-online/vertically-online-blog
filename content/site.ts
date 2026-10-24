// All site copy, links, and image paths live here.
// Edit this file to change content without touching components.

// Single source of truth for the booking link — imported directly anywhere
// new, and threaded through `site.bookingUrl` for existing call sites.
export const BOOKING_URL =
  "https://cal.com/vertically/free-systems-audit?overlayCalendar=true";

export type Review = {
  author: string;
  rating: number;
  text: string;
  relativeTime?: string;
};

export type SolutionFeature = {
  icon: SolutionIcon;
  title: string;
  description: string;
  image: string;
  alt: string;
};

export type HeroStat = {
  target: number;
  decimals: number;
  prefix?: string;
  suffix?: string;
  label: string;
  // Short, fully-spelled-out phrase for the accessible label, e.g. "600 plus".
  announce: string;
};

// One row in the cinematic hero's phone "lead desk" feed. `icon` is a key
// mapped to a lucide icon inside the component.
export type LeadFeedItem = {
  icon: "lead" | "reply" | "quote" | "booked";
  title: string;
  detail: string;
  time: string;
};

export type SolutionIcon = "zap" | "quote" | "phone" | "shield";

export type IncludedIcon = "zap" | "quote" | "mail" | "phone" | "refresh" | "star" | "chart";

export type IncludedItem = {
  label: string;
  icon: IncludedIcon;
};

// A beat in the "how a lead gets lost today" timeline in the Problem section.
export type LostLeadStep = {
  time: string;
  text: string;
};

export type AiExplainerStep = {
  icon: "lead" | "reply" | "quote" | "call" | "follow" | "review";
  title: string;
  body: string;
};

export type ResultStat = {
  label: string;
  before: string;
  after: string;
};

export type HowItWorksStep = {
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Objection = {
  label: string;
  answer: string;
  video: string;
  poster: string;
  // WebVTT captions, transcribed from the video
  captions: string;
};

export const site = {
  brand: {
    name: "Vertically",
    tagline: "Automatic lead response for roofing companies",
    // Wordmark for light/glass surfaces (dark text, transparent background)
    logoLight: "/images/brand/logo-light.png",
    logoLightDimensions: { width: 900, height: 273 },
    // Wordmark for dark surfaces (white text, transparent background)
    logoDark: "/images/brand/logo-dark.png",
    logoDarkDimensions: { width: 900, height: 273 },
    // Standalone arrow mark, square canvas
    logoMark: "/images/brand/logo-mark.png",
  },

  bookingUrl: BOOKING_URL,

  // Byline for blog posts and landing pages, and the founder in JSON-LD.
  author: {
    name: "Toby Karamoutchev",
    title: "Co-founder, Vertically",
    image: "/images/team/toby-karamoutchev.jpg",
    imageWidth: 640,
    imageHeight: 800,
    bio: "Toby Karamoutchev is the co-founder of Vertically, which sets up automatic lead response, quoting, phone answering, and inspection booking for roofing companies.",
  },

  // Search/social snippet. Keep the description at or under ~155 characters.
  seo: {
    // Primary keyword: "ai for roofing companies" (also "ai for roofers", "ai roofing software")
    title: "AI for Roofing Companies: Instant Lead Response | Vertically",
    description:
      "Vertically is AI for roofing companies: it answers every lead in 30 seconds, builds the quote and books the inspection. Free for 30 days, no contract.",
    ogImageAlt: "Vertically: AI for roofing companies that answers every lead and books the inspection",
    // Sitemap lastModified for the homepage; bump when its content changes.
    homeUpdated: "2026-10-24",
  },

  contact: {
    email: "leads@vertically.online",
    phone: "360-623-5598",
    phoneHref: "tel:+13606235598",
    foundedLine: "Founded in Philadelphia, PA",
    addressLocality: "Philadelphia",
    addressRegion: "PA",
  },

  // Used by /privacy and /terms. The privacy URL is the exact value given to
  // Google Cloud Console for OAuth verification, so don't move these paths.
  legal: {
    entity: "BT Digital Consulting LLC",
    entityWithDba: 'BT Digital Consulting LLC, doing business as "Vertically"',
    effectiveDate: "October 12, 2026",
    governingState: "the Commonwealth of Pennsylvania",
    retentionDays: 30,
    privacyPath: "/privacy",
    termsPath: "/terms",
  },


  social: {
    linkedin: "",
    instagram: "",
    facebook: "",
    youtube: "",
  },

  hero: {
    badge: "No contract. No credit card. 30 days free.",
    headline: "AI for Roofing Companies: Answer Every Lead in 30 Seconds",
    subheadline:
      "Vertically installs an AI system that responds to every lead instantly, builds the quote for you, and books the inspection on your Google Calendar, so no homeowner ever calls your competitor first.",
    // Glass badges floating beside the founder video phone.
    videoBadges: [
      { title: "Meet the founder", detail: "Why we built Vertically" },
      { title: "Arias Roofing & Siding", detail: "1 → 5 jobs a month" },
    ],
    primaryCta: "Start My Free 30 Days",
    reassurance:
      "No contract. No credit card. Free for 30 days. If it isn't working for you, we switch it off and you owe nothing.",
    // Only provable numbers: the product's response time and the Arias
    // Roofing & Siding case study (see results below).
    stats: [
      {
        target: 30,
        decimals: 0,
        prefix: "<",
        suffix: " sec",
        label: "Response time to every lead",
        announce: "under 30 seconds",
      },
      {
        target: 5,
        decimals: 0,
        prefix: "~",
        suffix: "/mo",
        label: "Jobs at Arias Roofing, up from about 1",
        announce: "about 5 jobs a month",
      },
      {
        target: 30,
        decimals: 0,
        prefix: "~",
        suffix: " hrs",
        label: "Saved weekly at Arias on quotes and follow-up",
        announce: "about 30 hours",
      },
    ] satisfies HeroStat[],
  },





  liveDemo: {
    eyebrow: "Live demo",
    heading: "Don't take our word for it. Try it yourself.",
    body: "This is a demo roofing company running our exact system. Request a quote with your own email and you'll get an instant PDF estimate in under a minute, plus the lead breakdown your company would receive.",
    ctaLabel: "Try the live demo →",
    note: "Takes about 2 minutes. Opens in a new tab.",
    // Base URL, previewed in the embedded browser-chrome mockup and linked from the overlay/card.
    url: "https://roofing-demo.vertically.online",
    // Deep link used by the primary CTA button specifically.
    ctaUrl: "https://roofing-demo.vertically.online/quote?ref=vertically-online",
    badges: [
      { title: "Instant PDF estimate", detail: "Sent straight to your inbox" },
      { title: "Lead breakdown", detail: "Everything your company would get" },
    ],
  },


  results: {
    eyebrow: "Case study: Arias Roofing & Siding",
    logo: "/images/clients/arias-logo.png",
    logoAlt: "Arias Roofing & Siding logo",
    headline: "How we helped Arias Roofing & Siding scale from 1 job a month to 5",
    intro:
      "Arias Roofing & Siding in Sewell, NJ was getting 1 to 3 leads a month, almost all from referrals. Replies took 24 to 48 hours, and they were closing about one job a month.",
    setup: "We installed the system. No ad spend. No new marketing.",
    stats: [
      { label: "Response time", before: "24–48 hours", after: "Under 30 seconds" },
      { label: "Leads", before: "1–3/month", after: "7–10/month from their website alone" },
      { label: "Jobs closed", before: "~1/month", after: "~5/month" },
      { label: "Time saved", before: "—", after: "~30 hours/week on quoting and chasing leads" },
    ] satisfies ResultStat[],
    closingNote:
      "Gustavo's close rate didn't change. Arias was always good at closing. They just finally answered every lead.",
  },






  finalCta: {
    eyebrow: "Free for 30 days",
    headline: "Every lead you don't answer today is a job for someone else.",
    subheadline: "Let us answer them for you, free for 30 days.",
    primaryCta: "Start My Free 30 Days",
    reassurance: "No contract. No credit card. Only a few spots each month.",
  },

  fallbackReviews: [] as Review[],
};

export type Site = typeof site;
