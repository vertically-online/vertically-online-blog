"use client";

import { Check, Users, Zap } from "@/components/ui/icons";
import { site } from "@/content/site";
import BookCallButton from "@/components/BookCallButton";
import { Section } from "@/components/ui/section";
import { DarkPanel } from "@/components/ui/dark-panel";
import { SectionHeading } from "@/components/ui/section-heading";

export default function WhoThisIsFor() {
  const { eyebrow, heading, intro, criteria, closingNote } = site.whoThisIsFor;

  return (
    <Section>
      <DarkPanel>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-14 lg:items-center">
          <div>
            <SectionHeading tone="dark" eyebrow={eyebrow} title={heading} intro={intro} />
            <div data-reveal="up" className="mt-8 flex flex-col items-start gap-5">
              <p className="inline-flex items-center gap-3 rounded-2xl bg-white/[0.06] px-4 py-3 text-sm font-medium text-white/85 ring-1 ring-white/10">
                <Users className="h-4 w-4 shrink-0 text-sky-300" aria-hidden="true" />
                {closingNote}
              </p>
              <BookCallButton className="btn-modern-brand group inline-flex items-center justify-center gap-2.5 rounded-[1.1rem] px-6 py-3.5 text-base font-bold tracking-tight whitespace-nowrap">
                <Zap className="h-4 w-4 transition-transform group-hover:scale-110" aria-hidden="true" />
                {site.hero.primaryCta}
              </BookCallButton>
            </div>
          </div>

          <ul className="space-y-3">
            {criteria.map((criterion) => (
              <li key={criterion} data-reveal="right" className="widget-depth flex items-center gap-4 rounded-2xl p-4 sm:p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400/25 to-transparent border border-emerald-300/25">
                  <Check className="h-4 w-4 text-emerald-300" strokeWidth={3} aria-hidden="true" />
                </span>
                <span className="font-medium text-white/90">{criterion}</span>
              </li>
            ))}
          </ul>
        </div>
      </DarkPanel>
    </Section>
  );
}
