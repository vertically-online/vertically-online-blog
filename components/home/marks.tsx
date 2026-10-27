// App marks for the "What you get" boxes (shared look with the roofing demo).
// Decorative: every box has a text title.

export const MessagesMark = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <defs>
      <linearGradient id="wyg-msg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#5ff777" />
        <stop offset="1" stopColor="#0bbd2a" />
      </linearGradient>
    </defs>
    <rect width="32" height="32" rx="8" fill="url(#wyg-msg)" />
    <path fill="#fff" d="M16 7.5c-5.5 0-10 3.6-10 8 0 2.5 1.4 4.7 3.6 6.2-.2 1.4-.9 2.7-2 3.6 2 0 3.8-.7 5.1-1.8 1 .3 2.1.4 3.3.4 5.5 0 10-3.6 10-8.2 0-4.5-4.5-8.2-10-8.2z" />
  </svg>
);

export const PhoneMark = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <defs>
      <linearGradient id="wyg-ph" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#5ff777" />
        <stop offset="1" stopColor="#0bbd2a" />
      </linearGradient>
    </defs>
    <rect width="32" height="32" rx="8" fill="url(#wyg-ph)" />
    <path fill="#fff" d="M11.2 7.6c.6-.2 1.3 0 1.6.6l1.7 3.4c.3.6.1 1.3-.4 1.7l-1.4 1.1c.9 2 2.5 3.6 4.5 4.6l1.1-1.4c.4-.5 1.1-.7 1.7-.4l3.4 1.6c.6.3.9 1 .7 1.6l-.6 2c-.3 1-1.3 1.7-2.4 1.6C13.7 23 9 18.3 8.4 11.9c-.1-1.1.6-2.1 1.6-2.4z" />
  </svg>
);

/** Follow-ups: a blue tile with a paper plane and a small clock badge. */
export const FollowMark = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <defs>
      <linearGradient id="wyg-fu" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#2bb3f0" />
        <stop offset="1" stopColor="#0079b1" />
      </linearGradient>
    </defs>
    <rect width="32" height="32" rx="8" fill="url(#wyg-fu)" />
    <path fill="#fff" d="M6.5 15.2l17.6-7.4c.6-.2 1.1.3.9.9l-5.5 16c-.2.6-1 .7-1.3.1l-3-5.4-5.8-2.4c-.6-.3-.6-1.1-.1-1.4z" />
    <path fill="none" stroke="#0079b1" strokeWidth="1.4" strokeLinecap="round" d="M15.2 19.4l4.5-6.2" />
    <circle cx="24.5" cy="24.5" r="6" fill="#fff" />
    <circle cx="24.5" cy="24.5" r="4.6" fill="none" stroke="#f59e0b" strokeWidth="1.6" />
    <path fill="none" stroke="#f59e0b" strokeWidth="1.6" strokeLinecap="round" d="M24.5 22.2v2.5l1.6 1" />
  </svg>
);

/** Weekly reporting: a light card with rising bars. */
export const ReportMark = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <rect x="1" y="1" width="30" height="30" rx="8" fill="#eef7ff" stroke="#cfe3f3" />
    <rect x="8" y="17" width="4" height="8" rx="1.2" fill="#8ad8f8" />
    <rect x="14" y="12" width="4" height="13" rx="1.2" fill="#2bb3f0" />
    <rect x="20" y="7" width="4" height="18" rx="1.2" fill="#008ccd" />
  </svg>
);
