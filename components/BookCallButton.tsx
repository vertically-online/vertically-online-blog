"use client";

import type { ReactNode } from "react";
import { site } from "@/content/site";
import { CAL_LINK, CAL_NAMESPACE, CAL_ORIGIN, CAL_EMBED_CONFIG } from "@/lib/cal";

/**
 * Every "Start My Free 30 Days" button, site-wide. Renders a plain <a> to
 * the booking URL so it always works, even with JS disabled or Cal's script
 * blocked. The data-cal-* attributes are Cal's own documented progressive-
 * enhancement pattern: once its embed script has loaded, Cal attaches a
 * global click listener that recognizes these attributes on ANY element,
 * calls preventDefault, and opens the popup instead — no manual click
 * handler needed here, and nothing to fight with Cal's own listener.
 */
export default function BookCallButton({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={site.bookingUrl}
      target="_blank"
      rel="noopener"
      data-cal-link={CAL_LINK}
      data-cal-namespace={CAL_NAMESPACE}
      data-cal-origin={CAL_ORIGIN}
      data-cal-config={JSON.stringify(CAL_EMBED_CONFIG)}
      onClick={onClick}
      className={className}
    >
      {children}
    </a>
  );
}
