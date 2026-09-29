"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import type { PipelinePhase } from "@/content/site";

function Panel({ phase }: { phase: PipelinePhase }) {
  return (
    <div className="container-vx">
      <div className="max-w-xl">
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
          {phase.title}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-white/70">
          {phase.description}
        </p>
        {phase.items.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {phase.items.map((item) => (
              <li
                key={item}
                className="glass-dark rounded-full px-4 py-2 text-sm text-white/90"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function Pipeline() {
  const phases = site.pipeline.phases;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const desktopMql = window.matchMedia("(min-width: 768px)");
    const reduceMql = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!desktopMql.matches || reduceMql.matches) {
      return;
    }

    let ticking = false;

    const update = () => {
      ticking = false;
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const raw = scrollable > 0 ? -rect.top / scrollable : 0;
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
  }, []);

  const activeIndex = Math.round(progress * (phases.length - 1));

  return (
    <section aria-label="How Vertically works with your business" className="relative">
      {/* Pinned horizontal scroll — desktop, motion-safe only */}
      <div
        ref={wrapperRef}
        className="relative hidden md:motion-safe:block"
        style={{ height: `${phases.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden holo-mesh">
          <div
            className="flex h-full"
            style={{
              width: `${phases.length * 100}vw`,
              transform: `translateX(-${progress * (phases.length - 1) * 100}vw)`,
            }}
          >
            {phases.map((phase) => (
              <div
                key={phase.title}
                className="flex h-full w-screen shrink-0 items-center"
              >
                <Panel phase={phase} />
              </div>
            ))}
          </div>

          <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-2">
            {phases.map((phase, i) => (
              <span
                key={phase.title}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-6 bg-white" : "w-1.5 bg-white/30"
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stacked fallback — mobile, and motion-reduce at any size */}
      <div className="block holo-mesh md:motion-safe:hidden">
        {phases.map((phase) => (
          <div
            key={phase.title}
            className="border-t border-white/10 py-16 first:border-t-0"
          >
            <Panel phase={phase} />
          </div>
        ))}
      </div>
    </section>
  );
}
