"use client";

import { CalendarDays, CheckCircle2, Clock, X } from "@/components/ui/icons";
import { site } from "@/content/site";
import InlineCalBooking from "@/components/InlineCalBooking";
import { Section } from "@/components/ui/section";
import { DarkPanel } from "@/components/ui/dark-panel";
import { SectionHeading } from "@/components/ui/section-heading";

export default function Problem() {
  const { eyebrow, headline, paragraphs, timeline, fix, bookingLabel } = site.problem;
  const lastIndex = timeline.length - 1;

  return (
    <Section>
      <DarkPanel>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-14 lg:items-start">
          <div>
            <SectionHeading tone="dark" eyebrow={eyebrow} title={headline} />
            <div className="mt-6 space-y-4">
              {paragraphs.map((paragraph, i) => (
                <p key={i} data-reveal="up" className="text-[#C9D3DB] leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div data-reveal="right" className="min-w-0">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-white/80">
              <CalendarDays className="h-4 w-4 text-sky-300" aria-hidden="true" />
              {bookingLabel}
            </p>
            <div className="rounded-2xl bg-white p-1.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
              <InlineCalBooking />
            </div>
          </div>
        </div>

        {/* How a lead slips away today */}
        <ol className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {timeline.map((step, i) => {
            const lost = i === lastIndex;
            return (
              <li
                key={step.time}
                data-reveal="up"
                className="widget-depth relative rounded-2xl p-4"
                // widget-depth's own fill/border would win over utilities
                style={lost ? { background: "rgba(244,63,94,0.09)", borderColor: "rgba(251,113,133,0.3)" } : undefined}
              >
                <div className="flex items-center gap-2">
                  {lost ? (
                    <X className="h-4 w-4 text-rose-300" aria-hidden="true" />
                  ) : (
                    <Clock className="h-4 w-4 text-sky-300/80" aria-hidden="true" />
                  )}
                  <span className={`text-xs font-bold uppercase tracking-widest ${lost ? "text-rose-300" : "text-[#8FCBEB]/70"}`}>
                    {step.time}
                  </span>
                </div>
                <p className={`mt-2 text-sm font-medium ${lost ? "text-rose-100" : "text-white/85"}`}>{step.text}</p>
              </li>
            );
          })}
        </ol>
        <p
          data-reveal="up"
          className="mt-3 flex items-start gap-3 rounded-2xl border border-emerald-400/25 bg-emerald-500/[0.08] p-4 text-sm font-medium text-emerald-50"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
          {fix}
        </p>
      </DarkPanel>
    </Section>
  );
}
