// Inline SVGs from the redesign template: 2px round-cap stroke icons, the
// phone status bar, and the email provider marks. All decorative unless a
// label is passed. (Brand marks pending review: content/approvals.ts.)

type P = { className?: string };
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const ArrowRight = ({ className }: P) => (
  <svg viewBox="0 0 16 16" className={className} aria-hidden="true" {...stroke}>
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);
export const ArrowUpRight = ({ className }: P) => (
  <svg viewBox="0 0 20 20" className={className} aria-hidden="true" {...stroke}>
    <path d="M6 14L14 6M7 6h7v7" />
  </svg>
);
export const ArrowLeftLong = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" {...stroke}>
    <path d="M16 10H4M9 5l-5 5 5 5" />
  </svg>
);
export const ArrowRightLong = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" {...stroke}>
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
);
export const Check = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" {...stroke}>
    <path d="M4 10.5l4 4 8-9" />
  </svg>
);
export const SmallCheck = () => (
  <svg viewBox="0 0 14 14" aria-hidden="true" fill="none" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7.5l2.6 2.6L11 4.5" />
  </svg>
);
export const CheckCircle = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" {...stroke}>
    <circle cx="10" cy="10" r="7.5" />
    <path d="M6.5 10.2l2.4 2.4 4.6-5" />
  </svg>
);
export const CalendarIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" {...stroke}>
    <rect x="3" y="4" width="14" height="13" rx="2" />
    <path d="M3 8h14M7 2v3M13 2v3" />
  </svg>
);
export const Search = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" {...stroke}>
    <circle cx="9" cy="9" r="5.5" />
    <path d="M13.5 13.5L17 17" />
  </svg>
);
export const PlayTriangle = () => (
  <svg viewBox="0 0 12 12" aria-hidden="true" fill="currentColor">
    <path d="M3 1.8v8.4L10 6z" />
  </svg>
);
export const CloseX = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" {...stroke}>
    <path d="M5 5l10 10M15 5L5 15" />
  </svg>
);
export const Plus = () => (
  <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true" {...stroke}>
    <path d="M10 4v12M4 10h12" />
  </svg>
);

/** Five filled stars (SVG, not text glyphs). */
export function Stars({ className = "stars5", label }: { className?: string; label?: string }) {
  return (
    <span className={className} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20">
          <path d="M10 1.6l2.5 5.3 5.8.7-4.3 4 1.1 5.7L10 14.5l-5.1 2.8 1.1-5.7-4.3-4 5.8-.7z" />
        </svg>
      ))}
    </span>
  );
}

export const StatusBarIcons = () => (
  <svg viewBox="0 0 66 12" aria-hidden="true">
    <rect x="0" y="8" width="3" height="4" rx="1" />
    <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
    <rect x="10" y="3" width="3" height="9" rx="1" />
    <rect x="15" y="0" width="3" height="12" rx="1" />
    <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M24 4.6a9 9 0 0 1 12.6 0" />
      <path d="M26.7 7.3a5.2 5.2 0 0 1 7.2 0" />
    </g>
    <circle cx="30.3" cy="10.3" r="1.4" />
    <rect x="42" y=".6" width="20" height="10.8" rx="3.3" fill="none" stroke="currentColor" strokeOpacity=".45" />
    <rect x="43.7" y="2.3" width="15.4" height="7.4" rx="1.9" />
    <rect x="63.2" y="4" width="1.6" height="4" rx=".8" fillOpacity=".45" />
  </svg>
);

export const GmailMark = ({ label }: { label?: string }) => (
  <svg viewBox="52 42 88 66" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
    <path fill="#4285f4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6" />
    <path fill="#34a853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15" />
    <path fill="#fbbc04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2" />
    <path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92" />
    <path fill="#c5221f" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2" />
  </svg>
);
export const OutlookMark = () => (
  <svg viewBox="0 0 32 32" role="img" aria-label="Outlook">
    <rect x="10" y="5" width="21" height="22" rx="2.5" fill="#28a8ea" />
    <path d="M10.5 9.5L20.5 16.5 30.5 9.5" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" opacity=".85" />
    <rect x="1" y="8" width="17" height="17" rx="2.5" fill="#0364b8" />
    <ellipse cx="9.5" cy="16.5" rx="3.6" ry="4.4" fill="none" stroke="#fff" strokeWidth="2.2" />
  </svg>
);
export const SmtpMark = () => (
  <svg viewBox="0 0 32 32" role="img" aria-label="SMTP">
    <rect width="32" height="32" rx="8" fill="#0a1551" />
    <rect x="6.5" y="9.5" width="19" height="13" rx="2.5" fill="none" stroke="#fff" strokeWidth="1.8" />
    <path d="M7.5 11.5l8.5 6.2 8.5-6.2" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M22 6.5h4.5V11" fill="none" stroke="#7dd3fc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M26.3 6.7L21 12" stroke="#7dd3fc" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
