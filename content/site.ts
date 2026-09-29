// All site copy, links, team members, and image paths live here.
// Edit this file to change content without touching components.

export type Review = {
  author: string;
  rating: number;
  text: string;
  relativeTime?: string;
};

export type ServiceBlock = {
  title: string;
  description: string;
  image: string;
  alt: string;
  href?: string;
};

export type Step = {
  title: string;
  description: string;
};

export type PipelinePhase = {
  title: string;
  description: string;
  items: string[];
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  linkedin?: string;
};

export type CaseStudy = {
  client: string;
  industry: string;
  result: string;
  image: string;
  alt: string;
  href?: string;
};

export type ClientLogo = {
  name: string;
  image: string;
  href?: string;
};

export const site = {
  brand: {
    name: "Vertically",
    tagline: "Growth + AI automation for local small businesses",
    // Wordmark for light/glass surfaces (dark text, transparent background)
    logoLight: "/images/brand/logo-light.png",
    logoLightDimensions: { width: 900, height: 273 },
    // Wordmark for dark surfaces (white text, transparent background)
    logoDark: "/images/brand/logo-dark.png",
    logoDarkDimensions: { width: 900, height: 273 },
    // Standalone arrow mark, square canvas
    logoMark: "/images/brand/logo-mark.png",
  },

  bookingUrl: "https://cal.com/REPLACE",

  contact: {
    email: "hello@vertically.online",
    phone: "+1 (555) 010-2024",
    address: "120 Harbor Street, Suite 4, Portland, ME 04101",
  },

  social: {
    linkedin: "",
    instagram: "",
    facebook: "",
    youtube: "",
  },

  hero: {
    headline: "More customers. Less manual work.",
    subtext:
      "We bring new customers to your door with ads, maps, and a website that sells. Then we automate the follow-ups, scheduling, and data entry that eat up your week.",
    primaryCta: "Book your free audit",
    secondaryCta: "See how it works",
  },

  founder: {
    name: "Sergi Marcos",
    title: "Founder, Vertically",
    note: "I started Vertically after watching local business owners lose customers to bigger competitors with bigger budgets, not better service. Our job is to level that field with the same tools, without the overhead.",
    youtubeId: "HeYrSpjc-vE",
    poster: "/images/founder-poster.jpg",
  },

  pipeline: {
    phases: [
      {
        title: "We bring the customers in",
        description:
          "People find you through ads, Google Maps and reviews, a website that converts, social media, and AI search.",
        items: ["Ads", "Reviews", "Website", "Social media", "AI search"],
      },
      {
        title: "You run the business",
        description:
          "You focus on the work only you can do. We keep the pipeline full behind the scenes.",
        items: [],
      },
      {
        title: "It runs on autopilot",
        description:
          "Speed to lead, follow-ups, scheduling, data entry, and job workflows, handled automatically.",
        items: [
          "Speed to lead",
          "Follow-ups",
          "Scheduling",
          "Data entry",
          "Job workflows",
        ],
      },
    ] satisfies PipelinePhase[],
  },

  services: [
    {
      title: "More customers",
      description:
        "Ads, Google Maps and reviews, and a website that turns visitors into calls and bookings.",
      image: "/images/more-customers.jpg",
      alt: "A local business owner reviewing new customer leads on a laptop",
      href: "",
    },
    {
      title: "Less manual work",
      description:
        "Automated follow-ups, scheduling, and data entry, so your week goes back to running the business.",
      image: "/images/less-work.jpg",
      alt: "An automated scheduling and follow-up dashboard on a tablet",
      href: "",
    },
  ] satisfies ServiceBlock[],

  howItWorks: {
    intro: "Try it free for 30 days. Pay only if you keep it.",
    steps: [
      {
        title: "Free opportunity audit",
        description:
          "We meet, look at how you get customers today, and show you where you're leaving money on the table.",
      },
      {
        title: "We build your system",
        description:
          "Ads, maps, website, and automations set up around how your business already works.",
      },
      {
        title: "Try it free for 30 days",
        description: "See the new customers and saved hours for yourself.",
      },
      {
        title: "Pay only if you keep it",
        description:
          "If it's not worth it, you walk away and owe nothing.",
      },
    ] satisfies Step[],
  },

  team: [
    {
      slug: "sergi",
      name: "Sergi",
      role: "Associate",
      linkedin: "",
    },
  ] satisfies TeamMember[],

  caseStudies: [] as CaseStudy[],

  clientLogos: [] as ClientLogo[],

  fallbackReviews: [] as Review[],
};

export type Site = typeof site;
