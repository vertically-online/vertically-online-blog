import type { ReactNode } from "react";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The browser-window mockup used to frame embedded sites (live demo preview).
 * Styled as physical hardware to match the site's iPhone mockups: a navy
 * title bar, glass address bar, and deep layered shadow.
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
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-white ring-1 ring-void/10 transition-all duration-500",
        "shadow-[0_40px_80px_-24px_rgba(10,14,39,0.45),0_14px_28px_-10px_rgba(10,14,39,0.25)]",
        hoverLift &&
          "hover:-translate-y-1.5 hover:shadow-[0_50px_100px_-24px_rgba(10,14,39,0.55),0_18px_32px_-10px_rgba(10,14,39,0.3)] focus-within:-translate-y-1.5",
        className
      )}
    >
      <div className="flex items-center gap-1.5 bg-gradient-to-b from-[#1b2350] to-[#0a0e27] px-4 py-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#008FD0]" aria-hidden="true" />
        <span className="ml-3 flex flex-1 items-center gap-2 truncate rounded-lg bg-white/[0.07] px-3 py-1.5 text-xs text-white/70 ring-1 ring-white/10">
          <Lock className="h-3 w-3 shrink-0 text-emerald-300" aria-hidden="true" />
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}
