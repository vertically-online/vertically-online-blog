"use client";

import { useState } from "react";
import type React from "react";
import { ChevronRight } from "lucide-react";
import { site } from "@/content/site";
import ClickToPlayVideo from "@/components/ClickToPlayVideo";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { DarkPanel } from "@/components/ui/dark-panel";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Every answer is in the HTML (search engines and AI crawlers read all six),
 * rendered once. DOM order is question, answer, question, answer… so on
 * mobile each answer sits under its question; on desktop a grid places all
 * answers in the right-hand column, overlapping, with only the active shown.
 */
export default function Objections() {
  const { eyebrow, heading, intro, items } = site.objections;
  const [active, setActive] = useState(0);
  const [switched, setSwitched] = useState(false);

  return (
    <Section id="objections">
      <DarkPanel>
        <SectionHeading tone="dark" eyebrow={eyebrow} title={heading} intro={intro} />

        <div
          data-reveal="up"
          className="mt-12 grid grid-cols-1 gap-2.5 lg:grid-cols-[0.85fr_1.15fr] lg:grid-rows-[repeat(var(--rows),auto)] lg:gap-x-12 lg:content-start"
          style={{ "--rows": items.length } as React.CSSProperties}
        >
          {items.map((item, i) => {
            const open = active === i;
            return (
              <div key={item.label} className="contents">
                <h3 className="lg:col-start-1">
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
                </h3>

                <div
                  id={`objection-answer-${i}`}
                  hidden={!open}
                  className="pb-4 pt-3 lg:col-start-2 lg:row-start-1 lg:[grid-row-end:span_var(--rows)] lg:pb-0 lg:pt-0"
                >
                  {/* Remounted per question (key) so the fade replays and the
                      video resets; no fade on first paint. */}
                  <div
                    key={open ? `open-${i}` : `closed-${i}`}
                    className={cn(
                      open && switched && "animate-fade-up",
                      "objection-panel grid grid-cols-1 items-center gap-6 rounded-3xl sm:grid-cols-[1fr_220px] sm:gap-8 lg:p-8"
                    )}
                  >
                    <div>
                      <p className="font-display text-2xl font-bold tracking-tight text-white">{item.label}</p>
                      <p className="mt-3 leading-relaxed text-[#C9D3DB]">{item.answer}</p>
                    </div>
                    <ClickToPlayVideo
                      src={item.video}
                      poster={item.poster}
                      captions={item.captions}
                      className="mx-auto max-w-[220px] ring-1 ring-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </DarkPanel>
    </Section>
  );
}
