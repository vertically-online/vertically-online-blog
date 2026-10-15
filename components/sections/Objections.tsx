"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { site, type Objection } from "@/content/site";
import ClickToPlayVideo from "@/components/ClickToPlayVideo";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { DarkPanel } from "@/components/ui/dark-panel";
import { SectionHeading } from "@/components/ui/section-heading";

function Answer({ item, index, animate }: { item: Objection; index: number; animate: boolean }) {
  return (
    // Keyed by index so switching questions remounts it: replays the fade
    // and resets the video to its poster. No fade on first paint, where the
    // section's own scroll reveal already brings it in.
    <div
      key={index}
      className={cn(animate && "animate-fade-up", "grid grid-cols-1 items-center gap-6 sm:grid-cols-[1fr_220px] sm:gap-8")}
    >
      <div>
        <p className="font-display text-2xl font-bold tracking-tight text-white">{item.label}</p>
        <p className="mt-3 leading-relaxed text-[#C9D3DB]">{item.answer}</p>
      </div>
      <ClickToPlayVideo
        src={item.video}
        poster={item.poster}
        className="mx-auto max-w-[220px] ring-1 ring-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]"
      />
    </div>
  );
}

export default function Objections() {
  const { eyebrow, heading, intro, items } = site.objections;
  const [active, setActive] = useState(0);
  const [switched, setSwitched] = useState(false);

  return (
    <Section id="objections">
      <DarkPanel>
        <SectionHeading tone="dark" eyebrow={eyebrow} title={heading} intro={intro} />

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          {/* Questions: tabs on desktop, accordion on mobile */}
          <div data-reveal="left" className="space-y-2.5">
            {items.map((item, i) => {
              const open = active === i;
              return (
                <div key={item.label}>
                  <button
                    type="button"
                    onClick={() => {
                      setActive(i);
                      setSwitched(true);
                    }}
                    aria-expanded={open}
                    aria-controls={`objection-answer-${i}`}
                    className={cn(
                      "group flex w-full items-center gap-4 rounded-2xl p-4 text-left transition-all duration-300",
                      open
                        ? "bg-white/[0.09] ring-1 ring-sky-300/30 shadow-[0_12px_30px_-12px_rgba(0,143,208,0.5)]"
                        : "ring-1 ring-white/[0.06] hover:bg-white/[0.04]"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-display text-sm font-bold transition-colors",
                        open ? "bg-[#008FD0] text-white" : "bg-white/[0.06] text-white/60"
                      )}
                    >
                      {i + 1}
                    </span>
                    <span className={cn("flex-1 font-semibold", open ? "text-white" : "text-white/75")}>
                      {item.label}
                    </span>
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 shrink-0 transition-transform",
                        open ? "rotate-90 text-sky-300 lg:rotate-0" : "text-white/30"
                      )}
                      aria-hidden="true"
                    />
                  </button>
                  {open && (
                    <div id={`objection-answer-${i}`} className="px-1 pb-4 pt-5 lg:hidden">
                      <Answer item={item} index={i} animate={switched} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop answer panel */}
          <div data-reveal="right" className="hidden lg:block">
            <div className="widget-depth rounded-3xl p-8">
              <Answer item={items[active]} index={active} animate={switched} />
            </div>
          </div>
        </div>
      </DarkPanel>
    </Section>
  );
}
