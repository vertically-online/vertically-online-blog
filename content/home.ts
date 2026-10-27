const VIDEOS = [
  {
    "id": "not-tech-savvy",
    "question": "I'm not tech savvy. Will it work with my setup?",
    "answer": "You don't have to learn anything new: it runs on the website you already have, and if you don't have one, we build that for you too. If you can send a text, you can use it.",
    "video": "/objections/not-tech-savvy.mp4",
    "poster": "/objections/not-tech-savvy-poster.jpg",
    "captions": "/captions/not-tech-savvy.vtt",
    "duration": "0:14",
    "transcript": "I'm not tech savvy. Will it work with my setup? You don't have to learn anything new. It runs on your website that you already own, and if you don't have one, we build that for you as well. If you can send a text, you can use it. Book your free audit below."
  },
  {
    "id": "too-expensive",
    "question": "How expensive is it?",
    "answer": "If the system wins you even one extra roofing job, it pays for itself. And the first 30 days are free, so you see it working before you spend a dollar.",
    "video": "/objections/too-expensive.mp4",
    "poster": "/objections/too-expensive-poster.jpg",
    "captions": "/captions/too-expensive.vtt",
    "duration": "0:20",
    "transcript": "It's too expensive. Quick math. A roof, on average, in the United States costs $8,000, $9,000, $10,000. If we win you one more job with this system, the system pays for itself multiple times over. And with 30 days free, you see it working before you ever spend a single dollar. If you're ready, book your free audit down below."
  },
  {
    "id": "referrals-enough",
    "question": "I already get plenty of work from referrals. Why do I need this?",
    "answer": "Even referred homeowners look you up before they call, and in slow months you want every lead booked, not lost. Vertically makes sure every lead, referral or not, gets answered right away.",
    "video": "/objections/referrals-enough.mp4",
    "poster": "/objections/referrals-enough-poster.jpg",
    "captions": "/captions/referrals-enough.vtt",
    "duration": "0:23",
    "transcript": "I get plenty of work from referrals and from storm season. Referrals are the best leads you have, and we want to protect them. But even a referral is going to look you up before they call. If the website is slow and your reviews are thin, some never dial. And in the slow months, you want every single lead that comes in booked and not lost. We make sure every single one of them gets answered right away. Book your audit down below."
  },
  {
    "id": "no-time",
    "question": "I don't have time to set this up.",
    "answer": "You don't have to. One short call, and we build and connect everything while you stay on the roof.",
    "video": "/objections/no-time.mp4",
    "poster": "/objections/no-time-poster.jpg",
    "captions": "/captions/no-time.vtt",
    "duration": "0:16",
    "transcript": "I don't have time to set this up, and you don't have to. You give us one short call, and we build and connect everything for you. Most roofers spend more time on a single day of phone tag than they will on this. You stay on the roof, we build the setup. Book your meeting down below."
  },
  {
    "id": "burned-before",
    "question": "I've been burned by agencies before. How is this different?",
    "answer": "You get a free audit, we build the whole system, and you run it free for 30 days with no contract. If it doesn't bring you more leads, we shut it down and you owe nothing.",
    "video": "/objections/burned-before.mp4",
    "poster": "/objections/burned-before-poster.jpg",
    "captions": "/captions/burned-before.vtt",
    "duration": "0:28",
    "transcript": "I've been burned by agencies before. Most roofers tell me that they paid a marketing agency for months, only to get confusing reports and no new jobs. We understand that, and that's why we built this completely differently. You get a free audit, we build the whole thing, and you run it for 30 days free. No contract, and you only pay if you keep it. If it doesn't bring you any more leads, we shut it down and you owe us nothing. Book your free audit below."
  },
  {
    "id": "feels-robotic",
    "question": "Won't automation feel robotic to my customers?",
    "answer": "A friendly text in 30 seconds feels more personal than a voicemail returned hours later. Messages are written in your voice, and the moment the homeowner replies, the conversation comes back to you.",
    "video": "/objections/feels-robotic.mp4",
    "poster": "/objections/feels-robotic-poster.jpg",
    "captions": "/captions/feels-robotic.vtt",
    "duration": "0:26",
    "transcript": "Automation feels robotic. My customers want a real person. Think about it from the homeowner side. A friendly text in 30 seconds feels a lot more personal than a voicemail left three hours later. The messages are always written in your voice and the moment that the homeowner replies, it hands the conversation back to you. It doesn't replace you, it just holds the door open until you're free. Book your free audit down below."
  }
] as const;

// Homepage copy and data for the redesign (design/vertically-home.template.html).
// Shared facts (contact, booking link, legal) stay in content/site.ts.
// Numbers: the Arias percentages and the sample lead are pending owner
// approval; see content/approvals.ts.

export const GOOGLE_REVIEWS_URL = "https://share.google/2ckvkUAgnw0lVlQPd";

export const home = {
  rating: { label: "5.0 across 26 Google reviews", href: GOOGLE_REVIEWS_URL },
  hero: {
    lead: "The AI platform roofers use to",
    rotating: ["answer every lead.", "send every quote.", "book every job.", "win more roofs."],
    note: "Free for 30 days. No contract, no credit card.",
  },

  // Pinned phone story: one entry per scroll step.
  steps: [
    { title: "A lead comes in.", body: "A homeowner fills out your form at 2 PM while you are up on a roof.", stat: "2:00 PM", statNote: "Homeowner submits a form while you work" },
    { title: "Answered in 18 seconds.", body: "A text and an email go out under your company name, day or night.", stat: "Still 2 PM", statNote: "and the first text and email reply has already gone out" },
    { title: "A quote, built for you.", body: "Jobs inside your price limits get a PDF estimate from your own price list. Bigger jobs come to you first.", stat: "$11,850", statNote: "sample estimate, built from your price list" },
    { title: "The inspection is booked.", body: "A voice agent calls the homeowner and puts the visit on your Google Calendar.", stat: "Thu 10 AM", statNote: "inspection on your Google Calendar" },
    { title: "You just show up.", body: "Quiet leads get follow-up and finished jobs get a review request, all on their own.", stat: "<30s", statNote: "to answer every lead. Nights and weekends included." },
  ],
  sampleEstimate: [
    ["Tear-off and disposal", "$2,450"],
    ["Underlayment and flashing", "$1,900"],
    ["Architectural shingles", "$5,300"],
    ["Labor and cleanup", "$2,200"],
  ],
  sampleTotal: "$11,850",
  sampleLabel: "Example lead. Names and prices are samples.",

  caseStudy: {
    heading: "Grow jobs like Arias Roofing did",
    byline: "Sewell, NJ · Gustavo Arias, Owner",
    cards: [
      { stat: "4x", label: "More jobs closed per month", image: "/images/home/gustavo.jpg", alt: "Gustavo Arias, owner of Arias Roofing & Siding", position: "50% 18%" },
      { stat: "Up to +900%", label: "More leads from the website alone, from 1–3 to 7–10 a month", image: "/images/home/inspection.jpg", alt: "Roofer in a safety harness walking to a roofing job", position: "50% 50%" },
      { stat: "<30 sec", label: "Response time, down from 24 to 48 hours", image: "/images/home/craft.jpg", alt: "Roofer lining up new shingles on underlayment", position: "62% 50%" },
      { stat: "~30 hrs/wk", label: "Saved on quoting and chasing leads", image: "/images/home/storm.jpg", alt: "Two roofers working near a brick chimney", position: "50% 50%" },
    ],
    source: "Arias Roofing & Siding, Sewell, NJ. Close rate did not change. They answered every lead.",
  },

  whatYouGet: {
    heading: "With Vertically, you get faster replies, sent quotes and booked inspections.",
    tabs: [
      { tab: "Instant Reply", eyebrow: "Answer first", title: "Your reply goes out in seconds, not hours.", body: "Every form, call and quote request gets a text and an email under your company name, day or night, weekends included." },
      { tab: "Automatic Quotes", eyebrow: "Quote it", title: "A PDF estimate from your own price list.", body: "You set the prices and the limits. Jobs inside them get a quote right away. Anything bigger comes to you for review first." },
      { tab: "Booked Inspections", eyebrow: "Book it", title: "The inspection lands on your calendar.", body: "A voice agent calls the homeowner, answers their questions and schedules the inspection straight onto your Google Calendar." },
      { tab: "Follow-Up and Reviews", eyebrow: "Keep it moving", title: "Nothing slips through after the first reply.", body: "Leads who go quiet get a friendly follow-up. When the job is done, the homeowner gets a review request." },
    ],
  },

  reviews: {
    heading: "See why roofers rate Vertically 5 stars",
    // Verbatim excerpts from the Google reviews on the live site. Do not edit.
    items: [
      ["Jorden Sesar", "Every lead gets an instant estimate, text message, phone call, and follow up to book an inspection while we’re on the job.", "jorden-sesar"],
      ["Andres Rivera", "These guys are very professional, know how to use tech to grow a business, and have helped us out a ton.", "andres-rivera"],
      ["Anthony Cruz", "Vertically helped us automate the tasks that we used to spend hours on.", "anthony-cruz"],
      ["John Beshir", "Now most of that is taken care of automatically, and I can focus on getting the work done. Saves me a lot of time and headaches.", "john-beshir"],
      ["Casen Taggart", "We get new leads coming in consistently. It’s reassuring to know they take care of that aspect, while we can focus on serving our clients.", "casen-taggart"],
      ["Brayden King", "Having systems in place to handle followups and keep conversations moving makes everything so much easier.", "brayden-king"],
      ["Jonathan Martinez", "Vertically did an excellent job with the automated quoting system. What used to take time to put together manually can now be handled much more efficiently.", "jonathan-martinez"],
      ["Allthings Man", "They’ve automated all of our inbound leads, and honestly, it’s been a game changer for our business.", "allthings-man"],
      ["Jephson Hadson-Taylor", "One of the biggest benefits of working with Vertically is the amount of time automation can save throughout the week.", "jephson-hadson-taylor"],
      ["Cianna Weinreich", "I can run my business and know that Vertically takes care of everything else.", "cianna-weinreich"],
      ["Kaleb Hernandez", "Vertically automated our entire client management system, and now we can focus on actually running the business.", "kaleb-hernandez"],
      ["Cameron Culver", "We can focus on actually serving our clients while they handle everything else.", "cameron-culver"],
    ] as [string, string, string][],
    badges: { rating: "5.0 on Google Reviews", readAll: "Read all 26 reviews", free: "Free for 30 days" },
  },

  liveDemo: {
    heading: "Built to feel like your own front desk.",
    emailTitle: "Replies come from your email, not ours.",
    emailBody: "Quotes and follow-ups go out from your own business email, under your name. Disconnect any time.",
    sendOnly: "Send-only access. We can't read your inbox.",
    demoTitle: "Try it for yourself.",
    demoBody: "Request a quote from a demo roofing company and get the instant PDF estimate in about 2 minutes.",
    demoCta: "Try the live demo",
  },

  stories: {
    heading: "Trusted by owners",
    gustavo: {
      quote: "Working with Vertically has made a real difference in how we operate and grow our business.",
      by: "Gustavo Arias, Owner, Arias Roofing & Siding",
      stats: [["4x", "More jobs closed per month"], ["<30 sec", "Response time"]],
    },
    // Verbatim from Google reviews.
    reviews: [
      { quote: "Now most of that is taken care of automatically, and I can focus on getting the work done.", by: "John Beshir", image: "/images/home/repair.jpg", alt: "Roofer working on underlayment" },
      { quote: "Every lead gets an instant estimate, text message, phone call, and follow up to book an inspection while we're on the job.", by: "Jorden Sesar", image: "/images/home/inspection.jpg", alt: "Roofer heading to a job" },
    ],
  },

  beliefs: {
    eyebrow: "Why we built Vertically",
    heading: "Three Beliefs That Guide Our Work",
    items: [
      ["We believe the first reply wins the job.", "Most homeowners hire the first roofer who gets back to them. So every lead gets an answer in under 30 seconds, day or night."],
      ["We believe you stay in control.", "You set your prices and limits. Bigger jobs come to you for review. You run the inspection, close the sale and do the roofing."],
      ["We believe trying it should be free.", "Start free for 30 days with no contract and no credit card. You only pay if you decide to keep it."],
    ] as [string, string][],
    founderVideo: { video: "/intro.mp4", poster: "/images/home/founder-thumb.jpg", captions: "/captions/intro.vtt", label: "Meet the founder", duration: "1:32" },
  },

  faq: {
    eyebrow: "Straight answers",
    heading: "Commonly Asked Questions",
    sub: "Real questions from roofing owners, answered by the founder.",
    videosLink: "Watch the founder answer each one",
    videosHref: "/about#videos",
    // From the founder's objection videos. Text answers summarise the video;
    // transcripts are the captions (pending approval, content/approvals.ts).
    videos: VIDEOS,
    more: [
      { question: "Is this just another answering service?", answer: "No. An answering service takes a message. Vertically replies to every lead in under 30 seconds, sends a quote from your own price list, calls the homeowner to book the inspection on your Google Calendar, and follows up if they go quiet." },
      { question: "What if a quote is wrong?", answer: "Quotes are built from your own price list and only go out for jobs inside the limits you set. Anything bigger or unusual comes to you for review first, and nothing launches without your approval." },
      { question: "Do I lose control of my prices?", answer: "No. You set the prices and the limits for automatic quotes, and you can see every quote that goes out in your inbox." },
      { question: "What does it cost after the free 30 days?", answer: "We review your results together. If the system is winning you jobs, we offer a simple monthly plan. If not, we switch it off and you owe nothing." },
      { question: "Which email and calendar does it work with?", answer: "Email goes out from your own address through Gmail and Google Workspace, Outlook and Microsoft 365, or any other provider over SMTP, with send-only access. Inspections are booked on your Google Calendar." },
      { question: "Is it really free?", answer: "Yes. 30 days, no credit card, no contract. You only pay if you decide to keep it." },
      { question: "Do I need a new website?", answer: "No. Vertically plugs into the website you already have." },
      { question: "How much of my time does setup take?", answer: "About an hour: a short audit call and a call to confirm your pricing and limits. We handle the rest." },
    ],
    cta: "Still have a question?",
  },

  guides: {
    heading: "Read our free guides for roofing companies",
    cards: [
      { href: "/roofing-answering-service", title: "How a roofing answering service works", image: "/images/home/repair.jpg", big: true },
      { href: "/roofing-quote-software", title: "Roofing quote software, explained", image: "/images/home/craft.jpg" },
      { href: "/blog/how-to-get-more-roofing-leads", title: "How to get more roofing leads", image: "/images/home/storm.jpg" },
    ],
    blog: { href: "/blog", title: "Learn with Vertically", note: "Plain-English guides for roofing company owners." },
  },

  closing: {
    heading: "Every lead you don't answer today is a job for someone else.",
    body: "Let Vertically answer them for you. Free for 30 days.",
    fine: "No contract. No credit card. Only a few spots each month.",
  },

  footerNote: "Example leads, names and prices on this page are samples.",
};

export type ObjectionVideo = (typeof VIDEOS)[number];
