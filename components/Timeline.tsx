"use client";

import { useEffect, useRef, useState } from "react";
import type { Step } from "@/content/site";

export default function Timeline({ steps }: { steps: Step[] }) {
  const containerRef = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduceMotion(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    let ticking = false;

    const update = () => {
      ticking = false;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = (vh - rect.top) / (rect.height + vh);
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduceMotion]);

  const effectiveProgress = reduceMotion ? 1 : progress;

  return (
    <ol ref={containerRef} className="relative pl-14 sm:pl-20">
      <div
        className="absolute left-5 top-2 bottom-2 w-px bg-void/10 sm:left-8"
        aria-hidden="true"
      />
      <div
        className="absolute left-5 top-2 w-px bg-gradient-to-b from-aurora-1 via-aurora-2 to-aurora-3 sm:left-8"
        style={{
          height: `calc((100% - 1rem) * ${effectiveProgress})`,
          transition: reduceMotion ? "none" : "height 80ms linear",
          boxShadow: "0 0 12px rgba(0, 140, 205, 0.55)",
        }}
        aria-hidden="true"
      />
      {steps.map((step, i) => {
        const active = effectiveProgress >= (i + 0.5) / steps.length;
        return (
          <li key={step.title} className="relative pb-12 last:pb-0">
            <span
              className={`absolute -left-14 top-0 flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold sm:-left-20 transition-colors duration-300 ${
                active
                  ? "bg-gradient-to-br from-aurora-1 to-aurora-3 text-white"
                  : "glass text-slate"
              }`}
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <h3 className="font-display text-lg font-semibold text-void mb-1.5 sm:text-xl">
              {step.title}
            </h3>
            <p className="text-slate leading-relaxed max-w-prose">
              {step.description}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
