"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import BrowserChrome from "@/components/BrowserChrome";

const DESKTOP_WIDTH = 1280;
const MOBILE_BREAKPOINT = 640;
const LARGE_BREAKPOINT = 1024;
// Box heights are fixed via CSS classes below (zero layout shift); these
// mirror them so the iframe's own natural height can be computed to
// exactly fill whichever box is showing. 700 matches InlineCalBooking's
// desktop height for visual parity between the two embeds.
const BOX_HEIGHT_SMALL = 480;
const BOX_HEIGHT_LARGE = 700;

function OpenDemoPill() {
  return (
    <span className="rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-void opacity-0 shadow-[0_20px_40px_-12px_rgba(10,14,39,0.5)] transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
      Open live demo ↗
    </span>
  );
}

export default function DemoPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [isLarge, setIsLarge] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      setIsLarge(window.innerWidth >= LARGE_BREAKPOINT);
      if (containerRef.current) {
        setScale(containerRef.current.offsetWidth / DESKTOP_WIDTH);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (isMobile) {
    return (
      <BrowserChrome label="roofing-demo.vertically.online">
        <a
          href={site.liveDemo.url}
          target="_blank"
          rel="noopener"
          className="flex flex-col items-center justify-center gap-4 bg-glacier px-6 py-16 text-center"
        >
          <span className="font-display text-base font-semibold text-void">
            Vertically Roofing — live demo
          </span>
          <span className="btn-modern-brand rounded-xl px-5 py-2.5 text-sm font-bold">
            Open live demo ↗
          </span>
        </a>
      </BrowserChrome>
    );
  }

  const targetHeight = isLarge ? BOX_HEIGHT_LARGE : BOX_HEIGHT_SMALL;
  const naturalIframeHeight = scale > 0 ? targetHeight / scale : 0;

  return (
    <div>
      <BrowserChrome label="roofing-demo.vertically.online">
        <div
          ref={containerRef}
          className="relative h-[480px] overflow-hidden bg-glacier lg:h-[700px]"
        >
          {!loaded && (
            <div
              className="absolute inset-0 animate-pulse bg-gradient-to-br from-void/5 to-void/10"
              aria-hidden="true"
            />
          )}

          {isMobile === false && scale > 0 && (
            <iframe
              src={site.liveDemo.url}
              width={DESKTOP_WIDTH}
              height={naturalIframeHeight}
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                width: DESKTOP_WIDTH,
                height: naturalIframeHeight,
                border: "none",
              }}
              tabIndex={-1}
              aria-hidden="true"
              loading="lazy"
              title="Vertically Roofing demo preview"
              className="pointer-events-none"
              onLoad={() => setLoaded(true)}
            />
          )}

          <a
            href={site.liveDemo.url}
            target="_blank"
            rel="noopener"
            aria-label="Open the live Vertically Roofing demo"
            className="absolute inset-0 flex items-center justify-center"
          >
            <OpenDemoPill />
          </a>
        </div>
      </BrowserChrome>

      <a
        href={site.liveDemo.url}
        target="_blank"
        rel="noopener"
        className="light-depth-card light-depth-card-hover mt-5 inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-void"
      >
        Open live demo ↗
      </a>
    </div>
  );
}
