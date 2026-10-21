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
    homeUpdated: "2026-10-21",
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

  connectEmail: {
    heading: "Connect your email",
    body: "When you start with Vertically, you connect your own business email so quotes, follow-ups, and review requests go out from your address, not ours. The connection is send-only: we can't read your inbox. You can disconnect it any time.",
    eyebrow: "Your email, your name",
    points: ["Send-only access", "We can't read your inbox", "Disconnect any time"],
    // Matches the three mailbox options in the client onboarding portal.
    providersLabel: "Works with",
    providers: [
      { id: "google", label: "Gmail & Google Workspace" },
      { id: "microsoft", label: "Outlook & Microsoft 365" },
      { id: "smtp", label: "Any other email (SMTP)" },
    ],
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

  // Scroll-driven intro at the very top of the homepage: two taglines, then a
  // card rises with a phone showing a lead getting answered, quoted, and booked.
  cinematicHero: {
    tagline1: "Every lead answered.",
    tagline2: "Every job booked.",
    cardHeading: "Jobs booked on autopilot.",
    cardDescription:
      "Vertically is AI for roofing companies. While you're up on a roof, it texts the homeowner back, builds the quote from your pricing, and books the inspection straight onto your Google Calendar.",
    cardPoints: [
      "Instant reply by text and email, under your name",
      "Quotes built from your pricing and limits",
      "Inspections booked straight onto your Google Calendar",
      "Automatic voice agent phone call to book the inspection",
      "Weekly lead reporting",
      "Automatic review requests after job completion",
    ],
    highlightValue: "<30s",
    highlightCaption: "to answer every lead. Nights and weekends included.",
    phone: {
      eyebrow: "Example · 9:41 PM",
      title: "Your lead desk",
      metricValue: 100,
      metricSuffix: "%",
      metricLabel: "Leads answered",
      feed: [
        { icon: "lead", title: "New lead: Sarah M.", detail: "Roof replacement · Cherry Hill, NJ", time: "now" },
        { icon: "reply", title: "Replied in 18 sec", detail: "“Hi Sarah, thanks for reaching out…”", time: "now" },
        { icon: "quote", title: "Quote sent", detail: "$11,850 · PDF estimate", time: "1m" },
        { icon: "booked", title: "Inspection booked", detail: "Thu 10:00 AM · Google Calendar", time: "4m" },
      ] satisfies LeadFeedItem[],
    },
    badges: [
      { title: "Lead answered", detail: "18 seconds after it came in" },
      { title: "Job booked", detail: "While you were on a roof" },
    ],
    ctaHeading: "Your next job is already calling.",
    ctaDescription:
      "Let Vertically answer it. Start free for 30 days. No contract, no credit card.",
  },

  // "How AI lead response works for roofers" + "in plain English" sections.
  aiExplainer: {
    eyebrow: "AI lead response",
    heading: "How AI lead response works for roofers.",
    intro:
      "Slow replies stretch out your sales cycle and quietly hurt your conversion rate: the homeowner keeps shopping while they wait. AI-powered lead response closes that gap. Here's what happens to every lead, step by step.",
    steps: [
      {
        icon: "lead",
        title: "A lead comes in",
        body: "A homeowner calls, fills out your website form, or asks for a quote, whether it's a small repair or a storm lead with an insurance claim. Vertically picks it up in real time, day or night.",
      },
      {
        icon: "reply",
        title: "An instant reply",
        body: "Within 30 seconds they get a text and an email from your company, under your name. You get a real-time lead alert in your inbox with every detail.",
      },
      {
        icon: "quote",
        title: "A quote from your price list",
        body: "If the roofing job fits the limits you set, the AI builds a PDF estimate from your own pricing. Bigger or unusual jobs come to you first.",
      },
      {
        icon: "call",
        title: "A call that books the inspection",
        body: "An AI voice agent calls the homeowner, answers their questions, and books the inspection straight onto your Google Calendar.",
      },
      {
        icon: "follow",
        title: "Follow-up if they don't book",
        body: "Homeowners who go quiet get friendly, automatic follow-up, so a \"let me think about it\" doesn't turn into a lost job.",
      },
      {
        icon: "review",
        title: "A review request after the job",
        body: "When the work is done, the homeowner gets a review request, which helps your roofing business win the next lead.",
      },
    ] satisfies AiExplainerStep[],
    plain: {
      heading: "AI for roofing companies, in plain English.",
      body: "AI tools are only useful if they take work off your plate without taking control away from you. Here's the split.",
      aiDoes: [
        "Answers every call and web lead in seconds",
        "Replies by text and email under your name",
        "Quotes jobs inside the limits you set",
        "Calls homeowners and books inspections",
        "Follows up and asks for reviews",
      ],
      youDo: [
        "Set your prices and quoting limits",
        "Review bigger and unusual jobs",
        "Run the inspection and close the sale",
        "Do the roofing",
      ],
      closing:
        "It doesn't replace you or your sales reps. It makes sure every homeowner gets a fast, consistent customer experience until a person takes over, and nothing launches without your approval.",
    },
  },

  problem: {
    eyebrow: "The real problem",
    // Visualises the first paragraph: how a lead slips away today.
    timeline: [
      { time: "2:00 PM", text: "A homeowner fills out your form" },
      { time: "8:00 PM", text: "You see it after a day on the roof" },
      { time: "Next morning", text: "You call back" },
      { time: "Too late", text: "They already booked someone else" },
    ] satisfies LostLeadStep[],
    fix: "With Vertically, that lead gets a reply in under 30 seconds, a quote, and an inspection booked on your Google Calendar, before you're even off the roof.",
    bookingLabel: "Book your free 15-minute lead audit",
    headline: "You don't have a closing problem. You have a response problem.",
    paragraphs: [
      "You're on a roof all day. A homeowner fills out your form at 2pm. You see it at 8pm, call back the next morning, and they've already booked someone else.",
      "Most homeowners hire the first roofer who gets back to them, not the cheapest or the best. When it takes you a day or two to reply, you're losing jobs you would have won.",
      "Then there's the back-and-forth: calls, texts, and emails to gather details, measure, price, revise, and send a quote. Hours every week spent chasing jobs instead of doing them.",
    ],
  },

  solution: {
    eyebrow: "The solution",
    headline: "A system that works your leads while you work the roof.",
    features: [
      {
        icon: "zap",
        title: "Instant response, every time.",
        description:
          "Every form, call, and quote request gets a reply in under 30 seconds, day or night, weekends included.",
        image: "/images/service-repair.jpg",
        alt: "Roofer in a white cap kneeling on fresh underlayment beside a roll of roofing membrane",
      },
      {
        icon: "quote",
        title: "Automatic quotes.",
        description:
          "Homeowners answer a few simple questions, and jobs within your price range get a quote automatically. No more hours of back-and-forth. You set the limits; bigger jobs come to you for review. This is entirely custom and specific to your company. We don't launch this without your approval.",
        image: "/images/service-inspection.jpg",
        alt: "Roofer in a safety harness carrying a tool bag across a driveway to the job",
      },
      {
        icon: "phone",
        title: "An automatic call that books the inspection.",
        description:
          "A voice agent phones every new lead right away, answers their questions, and schedules the inspection straight into your Google Calendar.",
        image: "/images/trust-craftsmanship.jpg",
        alt: "Roofer kneeling on underlayment, lining up a new course of asphalt shingles",
      },
      {
        icon: "shield",
        title: "Nothing slips through.",
        description:
          "Leads who go quiet get automatic follow-up. Every lead lands in your inbox with full details. Finished jobs get a review request.",
        image: "/images/service-storm.jpg",
        alt: "Two roofers working near a brick chimney under a dark storm sky",
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
    badges: [
      { title: "Instant PDF estimate", detail: "Sent straight to your inbox" },
      { title: "Lead breakdown", detail: "Everything your company would get" },
    ],
  },

  arias: {
    logo: "/images/clients/arias-logo.png",
    logoAlt: "Arias Roofing & Siding logo",
    websiteUrl: "https://ariasroofingnj.com",
    visitLabel: "Visit ariasroofingnj.com ↗",
    testimonial: {
      paragraphs: [
        "Working with Vertically has made a real difference in how we operate and grow our business.",
        "They helped us put better systems in place, improve how we manage and follow up with leads, and take a lot of manual work off our team. That has allowed us to stay focused on our customers, close more opportunities, and scale the business more efficiently.",
        "I would highly recommend Vertically to any business owner looking to improve their operations and grow.",
      ],
      authorName: "Gustavo Arias",
      authorTitle: "Owner, Arias Roofing and Siding",
      authorLocation: "Sewell, New Jersey",
      rating: 5,
    },
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

  howItWorks: {
    eyebrow: "How it works",
    headline: "Live within hours. You don't lift a finger.",
    steps: [
      {
        title: "Free lead audit (15 minutes)",
        description:
          "We look at how leads come in today and where they're slipping through.",
      },
      {
        title: "We set it up (you don't lift a finger)",
        description:
          "We install the system on your website and phone, set your pricing limits, and connect it to your email and Google Calendar. Live within hours.",
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

  objections: {
    eyebrow: "Straight answers",
    heading: "Your Questions, Answered",
    intro:
      "We know you may have questions. Here are straightforward answers to the ones we hear most often.",
    items: [
      {
        label: "Do I need to understand the tech?",
        answer:
          "We install everything on your website, connected to your existing systems, and it just runs. If you can check your email, you can run this, and you don't need to learn software, log into a dashboard, or manage anything.",
        video: "/objections/not-tech-savvy.mp4",
        poster: "/objections/not-tech-savvy-poster.jpg",
        captions: "/captions/not-tech-savvy.vtt",
      },
      {
        label: "Is this worth the investment?",
        answer:
          "Think of it as the cost of never missing a lead again. Most roofers using this close several extra jobs a month, just from leads they would have lost to a slower competitor. It pays for itself with the very first job it saves you, and it's free for the first 30 days, so you see the numbers before you spend a dollar.",
        video: "/objections/too-expensive.mp4",
        poster: "/objections/too-expensive-poster.jpg",
        captions: "/captions/too-expensive.vtt",
      },
      {
        label: "I'm already getting referrals. Here's why that's not enough.",
        answer:
          "Referrals are great until the phone rings on a Tuesday at 7pm and you're on a roof. Even referred homeowners call around, and the first roofer to respond usually wins the job. This system makes sure every referral, call, and website lead gets answered in under 30 seconds, so none of that goodwill goes to waste.",
        video: "/objections/referrals-enough.mp4",
        poster: "/objections/referrals-enough-poster.jpg",
        captions: "/captions/referrals-enough.vtt",
      },
      {
        label: "I don't have time to set this up.",
        answer:
          "We handle the entire setup, connecting to your existing systems and setting your pricing limits. It's live within hours, it just takes a short audit call and a quick check-in. You keep roofing. We build the system.",
        video: "/objections/no-time.mp4",
        poster: "/objections/no-time-poster.jpg",
        captions: "/captions/no-time.vtt",
      },
      {
        label: "Burned by an agency before? Here's what's different",
        answer:
          "No long-term contract, no upfront payment, and no vague promises. You get 30 days free to watch real leads, quotes, and booked jobs come in before you decide anything. If it's not winning you jobs, we turn it off, no hard feelings.",
        video: "/objections/burned-before.mp4",
        poster: "/objections/burned-before-poster.jpg",
        captions: "/captions/burned-before.vtt",
      },
      {
        label: "Won't this feel robotic to my clients?",
        answer:
          "Every message goes out under your name, in your company's voice. Homeowners never see a bot. They just see a roofer who somehow always responds first.",
        video: "/objections/feels-robotic.mp4",
        poster: "/objections/feels-robotic-poster.jpg",
        captions: "/captions/feels-robotic.vtt",
      },
    ] satisfies Objection[],
  },

  included: {
    heading: "What's included free for 30 days",
    eyebrow: "What you get",
    items: [
      { label: "Instant response to every web lead in under 30 seconds", icon: "zap" },
      { label: "Automated quote builder with your pricing and limits", icon: "quote" },
      { label: "Instant lead breakdown emails", icon: "mail" },
      { label: "Automatic phone call to the lead to book the inspection", icon: "phone" },
      { label: "Automatic follow-up for leads who go quiet", icon: "refresh" },
      { label: "Review requests after completed jobs", icon: "star" },
      { label: "Weekly performance report", icon: "chart" },
    ] satisfies IncludedItem[],
  },

  whoThisIsFor: {
    eyebrow: "Is this you?",
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
    eyebrow: "FAQ",
    heading: "Questions roofers ask us first.",
    helpHeading: "Still have a question?",
    helpBody: "Call or text us. You'll talk to a person, not a bot.",
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
        question: "Does it answer my phone, or just web leads?",
        answer:
          "Both. We set up phone answering so calls get picked up in your company's name, and web leads get a text and email reply in under 30 seconds. Either way, the job details are captured and the inspection gets booked.",
      },
      {
        question: "How does it book inspections?",
        answer:
          "An AI voice agent calls the homeowner, answers their questions, and books the inspection straight onto your Google Calendar. The homeowner gets a confirmation, and you get the details in your inbox.",
      },
      {
        question: "Which email does it send from?",
        answer:
          "Your own business email, so quotes, follow-ups, and review requests come from your address and under your name. It works with Gmail and Google Workspace, Outlook and Microsoft 365, and other providers over SMTP. Access is send-only: we can't read your inbox.",
      },
      {
        question: "What happens to jobs that are too big to quote automatically?",
        answer:
          "They come to you. Automatic quotes only go out for jobs inside the price limits you set; anything larger or unusual waits for your review before a price is sent.",
      },
      {
        question: "Can I see every lead the system handles?",
        answer:
          "Yes. Every lead lands in your inbox the moment it comes in, with the name, address, service type, job details, and any quote that was sent, and you get a weekly report on what the system caught.",
      },
      {
        question: "Will it sound like a robot?",
        answer:
          "Messages are written in your company's voice and sent under your name. Homeowners just see a roofer who responds fast.",
      },
    ] satisfies FaqItem[],
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
