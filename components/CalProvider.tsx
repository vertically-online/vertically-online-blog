"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { CAL_NAMESPACE, CAL_UI_CONFIG } from "@/lib/cal";

/**
 * Initializes Cal once for the whole site, in one shared namespace, so the
 * inline embed (live demo section) and every popup trigger (BookCallButton)
 * share the same loaded script instead of each re-initializing it.
 *
 * Mounted once in the root layout. Renders nothing.
 */
export default function CalProvider() {
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const cal = await getCalApi({ namespace: CAL_NAMESPACE });
        if (cancelled) return;

        cal("ui", CAL_UI_CONFIG);

        const win = window as unknown as {
          Cal?: { config?: Record<string, unknown> };
        };
        if (win.Cal) {
          win.Cal.config = { ...win.Cal.config, forwardQueryParams: true };
        }
      } catch {
        // Cal's script failed to load (network error, ad blocker, etc).
        // BookCallButton and the inline embed both degrade gracefully:
        // buttons fall back to a plain link to BOOKING_URL, and the inline
        // calendar just never mounts past its loading skeleton.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
