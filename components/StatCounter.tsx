"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

const DURATION_MS = 3000;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function StatCounter({ className = "" }: { className?: string }) {
  const stats = site.hero.stats;
  const [values, setValues] = useState(() => stats.map(() => 0));

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      const raf = requestAnimationFrame(() => {
        setValues(stats.map((stat) => stat.target));
      });
      return () => cancelAnimationFrame(raf);
    }

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION_MS);
      const eased = easeOutCubic(t);
      setValues(stats.map((stat) => stat.target * eased));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // Runs once on mount by design — intentionally omits `stats` from deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ariaLabel = stats
    .map((stat) => `${stat.announce} ${stat.label.toLowerCase()}`)
    .join(", ");

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={`flex divide-x divide-white/15 ${className}`}
    >
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          aria-hidden="true"
          className="px-3 text-left first:pl-0 sm:px-4"
        >
          <p className="font-display text-xl font-bold tabular-nums text-white sm:text-2xl lg:text-2xl">
            {stat.prefix}
            {values[i].toFixed(stat.decimals)}
            {stat.suffix}
          </p>
          <p className="mt-0.5 whitespace-nowrap text-[10px] text-white/60 sm:text-xs">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
