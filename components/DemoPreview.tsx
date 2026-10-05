"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import BrowserChrome from "@/components/BrowserChrome";

const DESKTOP_WIDTH = 1280;
// ~1.5 screens of content at an assumed 800px desktop viewport height.
const IFRAME_HEIGHT = 1200;
const MOBILE_BREAKPOINT = 640;

function OpenDemoPill() {
  return (
    <span className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-void opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
      Open live demo ↗
    </span>
  );
}

export default function DemoPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
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
          <span className="rounded-lg bg-signal px-5 py-2.5 text-sm font-semibold text-white">
            Open live demo ↗
          </span>
        </a>
      </BrowserChrome>
    );
  }

  const previewHeight = scale > 0 ? IFRAME_HEIGHT * scale : 360;

  return (
    <BrowserChrome label="roofing-demo.vertically.online">
      <div
        ref={containerRef}
        className="relative bg-glacier"
        style={{ height: previewHeight }}
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
            height={IFRAME_HEIGHT}
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              width: DESKTOP_WIDTH,
              height: IFRAME_HEIGHT,
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
  );
}
