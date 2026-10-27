"use client";

import { useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";

/**
 * One delegated click listener for the whole site, so every booking button,
 * phone link, and demo link is tracked, including ones on future pages.
 * Capture phase, so it still fires for BookCallButton (which preventDefaults
 * to open the Cal popup instead of navigating).
 *
 * Events (GA4): cta_booking_click, phone_tap, email_click, demo_click, each with
 * the page path and the nearest section id as `location`.
 */
export default function AnalyticsEvents() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";

      const event = href.includes("cal.com/")
        ? "cta_booking_click"
        : href.startsWith("tel:")
          ? "phone_tap"
          : href.startsWith("mailto:")
            ? "email_click"
            : href.includes("demo.vertically.online")
              ? "demo_click"
              : null;
      if (!event || typeof window.gtag !== "function") return;

      sendGAEvent("event", event, {
        page_path: window.location.pathname,
        location: link.closest("section[id]")?.id ?? link.closest("header,footer")?.tagName.toLowerCase() ?? "page",
        link_url: href,
      });
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
