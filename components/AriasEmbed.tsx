"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import BrowserChrome from "@/components/BrowserChrome";

const MOBILE_BREAKPOINT = 1024; // matches the lg breakpoint used elsewhere
const MOBILE_BASE_WIDTH = 1280;
const MOBILE_VISIBLE_HEIGHT = 480;

export default function AriasEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const update = () => {
      setIsDesktop(window.innerWidth >= MOBILE_BREAKPOINT);
      if (containerRef.current) {
        setScale(containerRef.current.offsetWidth / MOBILE_BASE_WIDTH);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const mobileNaturalHeight = scale > 0 ? MOBILE_VISIBLE_HEIGHT / scale : 0;

  return (
    <div>
      <BrowserChrome label={site.arias.embedLabel} hoverLift={false}>
        <div
          ref={containerRef}
          className="relative h-[480px] overflow-hidden bg-glacier lg:h-[680px]"
        >
          {isDesktop === null && (
            <div
              className="absolute inset-0 animate-pulse bg-gradient-to-br from-void/5 to-void/10"
              aria-hidden="true"
            />
          )}

          {isDesktop === true && (
            <iframe
              src={site.arias.embedUrl}
              loading="lazy"
              title="Arias Roofing & Siding website"
              className="h-full w-full border-0"
            />
          )}

          {isDesktop === false && scale > 0 && (
            <iframe
              src={site.arias.embedUrl}
              width={MOBILE_BASE_WIDTH}
              height={mobileNaturalHeight}
              loading="lazy"
              title="Arias Roofing & Siding website"
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                width: MOBILE_BASE_WIDTH,
                height: mobileNaturalHeight,
                border: "none",
              }}
            />
          )}
        </div>
      </BrowserChrome>

      <a
        href={site.arias.embedUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center justify-center rounded-lg border border-void/15 bg-white px-5 py-2.5 text-sm font-semibold text-void shadow-card transition-shadow hover:shadow-lg"
      >
        {site.arias.visitLabel}
      </a>
    </div>
  );
}
