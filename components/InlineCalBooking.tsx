"use client";

import { useEffect, useRef, useState } from "react";
import Cal from "@calcom/embed-react";
import BrowserChrome from "@/components/BrowserChrome";
import { CAL_NAMESPACE, CAL_ORIGIN, CAL_LINK, CAL_EMBED_CONFIG } from "@/lib/cal";

export default function InlineCalBooking() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Lazy-mount the embed only once this section is near the viewport, so it
  // doesn't cost anything for visitors who never scroll to it.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-slate">
        Book your free 15-minute lead audit
      </p>
      <BrowserChrome label="Book a call" hoverLift={false}>
        <div
          id="book"
          ref={containerRef}
          className="relative h-[480px] scroll-mt-24 bg-glacier lg:h-[700px]"
        >
          {/* Reserved-height skeleton, visible until Cal's iframe paints over it — no layout shift either way. */}
          <div
            className="absolute inset-0 animate-pulse bg-gradient-to-br from-void/5 to-void/10"
            aria-hidden="true"
          />

          {visible && (
            <Cal
              namespace={CAL_NAMESPACE}
              calLink={CAL_LINK}
              calOrigin={CAL_ORIGIN}
              config={CAL_EMBED_CONFIG}
              style={{ width: "100%", height: "100%", overflow: "auto" }}
            />
          )}
        </div>
      </BrowserChrome>
    </div>
  );
}
