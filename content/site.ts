// All site copy, links, and image paths live here.
// Edit this file to change content without touching components.

export type Review = {
  author: string;
  rating: number;
  text: string;
  relativeTime?: string;
};

export type SolutionFeature = {
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

export const site = {
  brand: {
    name: "Vertically",
    tagline: "AI-powered lead response for roofing companies",
    // Wordmark for light/glass surfaces (dark text, transparent background)
    logoLight: "/images/brand/logo-light.png",
    logoLightDimensions: { width: 900, height: 273 },
    // Wordmark for dark surfaces (white text, transparent background)
    logoDark: "/images/brand/logo-dark.png",
    logoDarkDimensions: { width: 900, height: 273 },
    // Standalone arrow mark, square canvas
    logoMark: "/images/brand/logo-mark.png",
  },

  bookingUrl: "https://cal.com/vertical-ai-y2xlue/free-systems-audit",

  contact: {
    email: "vertically.online@gmail.com",
    phone: "360-623-5598",
    phoneHref: "tel:+13606235598",
    foundedLine: "Founded in Philadelphia, PA",
    addressLocality: "Philadelphia",
    addressRegion: "PA",
  },

  social: {
    linkedin: "",
    instagram: "",
    facebook: "",
    youtube: "",
  },

  founder: {
    name: "Sergi Marcos",
    title: "Founder, Vertically",
    youtubeId: "HeYrSpjc-vE",
    poster: "/images/founder-poster.jpg",
  },

  hero: {
    badge: "No contract. No credit card. 30 days free.",
    headline: "Answer every roofing lead in 30 seconds. Close 5x more jobs.",
    subheadline:
      "Vertically installs an AI system that responds to every lead instantly, builds the quote for you, and books the inspection, so no homeowner ever calls your competitor first.",
    image: "/images/service-replacement.jpg",
    imageAlt: "Roofer nailing down architectural shingles on a sunny day",
    primaryCta: "Start My Free 30 Days",
    reassurance:
      "No contract. No credit card. No catch. If it doesn't win you more jobs, you don't pay a dime.",
    stats: [
      {
        target: 600,
        decimals: 0,
        suffix: "+",
        label: "Businesses served",
        announce: "600 plus",
      },
      {
        target: 4.2,
        decimals: 1,
        suffix: "x",
        label: "More leads",
        announce: "4.2 times",
      },
      {
        target: 30,
        decimals: 0,
        prefix: "<",
        suffix: " sec",
        label: "Response time",
        announce: "under 30 seconds",
      },
    ] satisfies HeroStat[],
  },

  problem: {
    headline: "You don't have a closing problem. You have a response problem.",
    paragraphs: [
      "You're on a roof all day. A homeowner fills out your form at 2pm. You see it at 8pm, call back the next morning, and they've already booked someone else.",
      "Most homeowners hire the first roofer who gets back to them, not the cheapest or the best. When it takes you a day or two to reply, you're losing jobs you would have won.",
      "Then there's the back-and-forth: calls, texts, and emails to gather details, measure, price, revise, and send a quote. Hours every week spent chasing jobs instead of doing them.",
    ],
  },

  solution: {
    headline: "A system that works your leads while you work the roof.",
    features: [
      {
        title: "Instant response, every time.",
        description:
          "Every form, call, and quote request gets a reply in under 30 seconds, day or night, weekends included.",
        image: "/images/service-repair.jpg",
        alt: "Roofer quickly addressing a repair on a shingle roof",
      },
      {
        title: "Automatic quotes.",
        description:
          "Homeowners answer a few simple questions, and jobs within your price range get a quote automatically. No more hours of back-and-forth. You set the limits; bigger jobs come to you for review. This is entirely custom and specific to your company. We don't launch this without your approval.",
        image: "/images/service-inspection.jpg",
        alt: "Roofer inspecting a roof to prepare an estimate",
      },
      {
        title: "Every lead lands in your inbox, fully detailed.",
        description:
          "Name, address, service type, job details, and quote, the moment it comes in. No digging and no missing information.",
        image: "/images/trust-craftsmanship.jpg",
        alt: "Roofer carefully installing shingles with attention to detail",
      },
      {
        title: "Nothing slips through.",
        description:
          "Missed calls get an instant text back. Leads who go quiet get automatic follow-up. Finished jobs get a review request.",
        image: "/images/service-storm.jpg",
        alt: "Roofing crew working on a roof against a dramatic sky",
      },
    ] satisfies SolutionFeature[],
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
  },

  results: {
    headline: "What happened when one local roofer stopped leaving leads waiting",
    intro:
      "A local roofing company was getting 1 to 3 leads a month, almost all from referrals. Replies took 24 to 48 hours, and they were closing about one job a month.",
    setup: "We installed the system. No ad spend. No new marketing.",
    stats: [
      { label: "Response time", before: "24–48 hours", after: "Under 30 seconds" },
      { label: "Leads", before: "1–3/month", after: "7–10/month from their website alone" },
      { label: "Jobs closed", before: "~1/month", after: "~5/month" },
      { label: "Added revenue", before: "—", after: "~$38,000/month at a $9,500 average job" },
      { label: "Time saved", before: "—", after: "~30 hours/week on quoting and chasing leads" },
    ] satisfies ResultStat[],
    closingNote:
      "Their close rate didn't change. They were always good at closing. They just finally answered every lead.",
  },

  howItWorks: {
    steps: [
      {
        title: "Free lead audit (15 minutes)",
        description:
          "We look at how leads come in today and where they're slipping through.",
      },
      {
        title: "We set it up (you don't lift a finger)",
        description:
          "We install the system on your website and phone, set your pricing limits, and connect it to your email and calendar. Live within days.",
      },
      {
        title: "You get 30 days free",
        description:
          "Watch the leads, quotes, and booked jobs come in. We send you a weekly report on what the system caught.",
      },
      {
        title: "You decide",
        description:
          "If it's winning you jobs, keep it. If not, we turn it off. No contract and no hard feelings.",
      },
    ] satisfies HowItWorksStep[],
  },

  included: {
    heading: "What's included free for 30 days",
    items: [
      "Instant response to every web lead in under 30 seconds",
      "Automated quote builder with your pricing and limits",
      "Instant lead breakdown emails",
      "Missed-call text-back",
      "Automatic follow-up for leads who go quiet",
      "Review requests after completed jobs",
      "Weekly performance report",
    ],
  },

  whoThisIsFor: {
    heading: "Who this is for",
    intro: "This is built for roofing companies that:",
    criteria: [
      "Already get leads from calls, referrals, their website, or Google",
      "Are losing jobs because they can't respond fast enough",
      "Spend too many hours on quotes and follow-up",
      "Want more jobs without spending more on marketing",
    ],
    closingNote: "We only take on a few new roofers each month so every setup gets done right.",
  },

  faq: {
    items: [
      {
        question: "Is it really free?",
        answer:
          "Yes. 30 days, no credit card, no contract. You only pay if you decide to keep it.",
      },
      {
        question: "What happens after 30 days?",
        answer:
          "We review your results together. If the system is winning you jobs, we'll offer a simple monthly plan. If not, we switch it off.",
      },
      {
        question: "Do I need a new website?",
        answer:
          "No. We plug into what you already have. If your site is holding you back, we can talk about that later.",
      },
      {
        question: "Will the automatic quotes undercut me?",
        answer:
          "No. You set the pricing and limits. Anything outside them comes to you for review before a quote goes out.",
      },
      {
        question: "How much of my time does setup take?",
        answer:
          "About an hour total: a short audit call and a call to confirm your eligibility. We handle the rest.",
      },
      {
        question: "Will it sound like a robot?",
        answer:
          "Messages are written in your company's voice and sent under your name. Homeowners just see a roofer who responds fast.",
      },
    ] satisfies FaqItem[],
  },

  finalCta: {
    headline: "Every lead you don't answer today is a job for someone else.",
    subheadline: "Let us answer them for you, free for 30 days.",
    primaryCta: "Start My Free 30 Days",
    reassurance: "No contract. No credit card. Only a few spots each month.",
  },

  fallbackReviews: [] as Review[],
};

export type Site = typeof site;
