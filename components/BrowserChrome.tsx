import type { ReactNode } from "react";

/**
 * The browser-window mockup used to frame embedded sites (live demo preview,
 * Arias feature embed). Three dots + a fake address bar, then whatever
 * content is passed in.
 */
export default function BrowserChrome({
  label,
  children,
  hoverLift = true,
  className = "",
}: {
  label: string;
  children: ReactNode;
  /** Lift + shadow on hover. Disable for embeds meant to be scrolled/clicked in place. */
  hoverLift?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-void/10 bg-white shadow-lg transition-all duration-300 ${
        hoverLift ? "hover:-translate-y-1 hover:shadow-2xl focus-within:-translate-y-1 focus-within:shadow-2xl" : ""
      } ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-void/10 bg-glacier px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-aurora-3" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-aurora-2" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-aurora-1" aria-hidden="true" />
        <span className="ml-3 flex-1 truncate rounded-md bg-void/5 px-3 py-1 text-xs text-slate">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}
