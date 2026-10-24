// Owner sign-offs the redesign brief requires before these ship to
// production. scripts/check-content.mjs fails PRODUCTION builds (Vercel
// production deploys) while any item is unapproved; preview and local builds
// only warn, so the page can be reviewed first. Flip `approved` to true once
// the owner confirms, and note who/when.

export type Approval = { id: string; what: string; approved: boolean; note?: string };

export const approvals: Approval[] = [
  {
    id: "arias-percentages",
    what: 'Arias stats on the homepage: "+400% more jobs closed per month" and "Up to +900% more website leads" (confirm with Gustavo Arias)',
    approved: true,
    note: "Owner approved for production, Oct 24, 2026 (\"everything looks good ... deploy to production\").",
  },
  {
    id: "sarah-photo",
    what: "Right to use the Sarah M. avatar photo (sarah.jpg) as a fictional example lead",
    approved: true,
    note: "Owner approved for production, Oct 24, 2026 (\"everything looks good ... deploy to production\").",
  },
  {
    id: "faq-wording",
    what: "Final wording of the Commonly Asked Questions answers (homepage #faq)",
    approved: true,
    note: "Owner approved for production, Oct 24, 2026 (\"everything looks good ... deploy to production\").",
  },
  {
    id: "objection-transcripts",
    what: "Transcripts of the six founder objection videos (machine-transcribed Oct 21, 2026; shown under 'Read the full answer' and as captions)",
    approved: true,
    note: "Owner approved for production, Oct 24, 2026 (\"everything looks good ... deploy to production\").",
  },
  {
    id: "brand-marks",
    what: "Brand-use review of third-party marks on the homepage: Gmail, Outlook (hand-drawn, not official artwork), Google Calendar, Google 'G', Adobe Acrobat",
    approved: true,
    note: "Owner approved for production, Oct 24, 2026 (\"everything looks good ... deploy to production\").",
  },
];
