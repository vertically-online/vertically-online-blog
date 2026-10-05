"use client";

import type { MouseEvent, ReactNode } from "react";
import { getCalApi } from "@calcom/embed-react";
import { site } from "@/content/site";
import { CAL_LINK, CAL_NAMESPACE, CAL_ORIGIN, CAL_EMBED_CONFIG } from "@/lib/cal";

/**
 * Every "Start My Free 30 Days" button, site-wide. We open the modal
 * ourselves via the Cal API (rather than Cal's data-cal-link auto-click
 * interception) so preventDefault always fires before the browser acts on
 * href/target — otherwise, if Cal's script hadn't attached its listener yet,
 * the click would navigate to cal.com in a new tab AND still queue the
 * modal to pop open in this tab once you switched back to it. href stays as
 * a plain fallback for no-JS or a blocked Cal script.
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
  const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.();
    try {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("modal", {
        calLink: CAL_LINK,
        calOrigin: CAL_ORIGIN,
        config: CAL_EMBED_CONFIG,
      });
    } catch {
      window.open(site.bookingUrl, "_blank", "noopener");
    }
  };

  return (
    <a href={site.bookingUrl} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
