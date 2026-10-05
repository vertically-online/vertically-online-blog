"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

const DURATION_MS = 3000;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function StatCounter({ className = "" }: { className?: string }) {
  const stats = site.hero.stats;
  // Default to the final target values so the counters are correct on first
  // paint — server-rendered, before hydration, and with JS disabled. The
  // effect below only resets to 0 and counts up when motion is safe to animate.
  const [values, setValues] = useState(() => stats.map((stat) => stat.target));

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

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
    <dl
      role="group"
      aria-label={ariaLabel}
      className={`grid grid-cols-3 gap-6 ${className}`}
    >
      {stats.map((stat, i) => (
        <div key={stat.label} aria-hidden="true">
          <dd className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">
            {stat.prefix}
            {values[i].toLocaleString("en-US", {
              minimumFractionDigits: stat.decimals,
              maximumFractionDigits: stat.decimals,
            })}
            {stat.suffix}
          </dd>
          <dd className="mt-1 text-xs sm:text-sm text-white/70">{stat.label}</dd>
        </div>
      ))}
    </dl>
  );
}
