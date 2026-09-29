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

export type PipelinePhase = {
  title: string;
  description: string;
  items: string[];
};

export type HeroStep = {
  title: string;
  caption?: string;
  emphasized?: boolean;
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  linkedin?: string;
};

export type SuccessStoryItem = {
  name: string;
  initials: string;
  result: string;
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
    tagPill: "Growth + Automation",
    headlineLines: ["More Customers.", "Less Busywork."],
    // Kept for SEO metadata (app/layout.tsx) even though it's no longer shown in the hero body.
    subtext:
      "We bring new customers to your door with ads, maps, and a website that sells. Then we automate the follow-ups, scheduling, and data entry that eat up your week.",
    primaryCta: "Try 30 Days Free",
  },

  heroSteps: {
    subheading: "How it works?",
    steps: [
      { title: "FREE Discovery Call" },
      { title: "FREE Scoping Meeting" },
      {
        title: "Try Implementations 30 Days FREE",
        caption: "Pay only if you keep.",
        emphasized: true,
      },
    ] satisfies HeroStep[],
  },

  trustBar: {
    rating: 5.0,
    reviewCount: 87,
    googleMapsUri: "",
  },

  schemaBox: {
    label: "How it flows",
    nodes: ["Leads in", "AI automation", "Happy customers"],
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

  team: [
    {
      slug: "sergi",
      name: "Sergi",
      role: "Associate",
      linkedin: "",
    },
  ] satisfies TeamMember[],

  successStories: {
    heading: "Success stories",
    items: [
      { name: "Harbor & Stone Plumbing", initials: "HS", result: "3.1x more booked jobs in 90 days" },
      { name: "Maple Street Dental", initials: "MD", result: "42 new patients in the first quarter" },
      { name: "Coastal Bloom Landscaping", initials: "CB", result: "18 hrs/week saved on scheduling" },
      { name: "Union Row Barbershop", initials: "UR", result: "4.9★ average, 3x more reviews" },
      { name: "Ridgeline HVAC", initials: "RH", result: "2.4x lead response speed" },
      { name: "Northside Auto Care", initials: "NA", result: "$38k added in repeat bookings" },
    ] satisfies SuccessStoryItem[],
  },

  fallbackReviews: [] as Review[],
};

export type Site = typeof site;
