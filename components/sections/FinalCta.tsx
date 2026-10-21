"use client";

import { CalendarCheck, Phone, Zap } from "@/components/ui/icons";
import { site } from "@/content/site";
import BookCallButton from "@/components/BookCallButton";
import { Section } from "@/components/ui/section";
import { DarkPanel } from "@/components/ui/dark-panel";
import { Eyebrow } from "@/components/ui/section-heading";

export default function FinalCta() {
  const { eyebrow, headline, subheadline, primaryCta, reassurance } = site.finalCta;
  // Callback to the opening hero's badges
  const [answered, booked] = site.cinematicHero.badges;

  return (
    <Section>
      <DarkPanel className="py-20 sm:py-24 lg:py-28">
        <div className="bg-grid-theme absolute inset-0 opacity-[0.15] invert pointer-events-none" aria-hidden="true" />

        <div className="relative mx-auto max-w-3xl text-center">
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          <h2
            data-reveal="up"
            className="mt-6 font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.02] text-card-silver-matte box-decoration-clone pb-2"
          >
            {headline}
          </h2>
          <p data-reveal="up" className="mt-6 text-lg sm:text-xl text-[#C9D3DB]">
            {subheadline}
          </p>
          <div data-reveal="up" className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <BookCallButton className="btn-modern-brand group inline-flex items-center justify-center gap-3 rounded-[1.25rem] px-8 py-4 text-lg font-bold tracking-tight whitespace-nowrap">
              <Zap className="h-5 w-5 transition-transform group-hover:scale-110" aria-hidden="true" />
              {primaryCta}
            </BookCallButton>
            <a
              href={site.contact.phoneHref}
              className="btn-modern-glass group inline-flex items-center justify-center gap-3 rounded-[1.25rem] px-8 py-4 text-lg font-bold tracking-tight whitespace-nowrap"
            >
              <Phone className="h-5 w-5 transition-transform group-hover:scale-110" aria-hidden="true" />
              Call {site.contact.phone}
            </a>
          </div>
          <p data-reveal="up" className="mt-6 text-sm text-white/55">{reassurance}</p>
        </div>

        {/* Floating glass badges, desktop only */}
        <div
          data-reveal="pop"
          className="floating-ui-badge absolute hidden xl:flex left-0 -top-16 items-center gap-3 rounded-2xl p-4"
          aria-hidden="true"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-b from-sky-400/25 to-sky-900/10 flex items-center justify-center border border-sky-300/30">
            <Zap className="w-5 h-5 text-sky-300" />
          </div>
          <div>
            <p className="text-white text-sm font-bold tracking-tight">{answered.title}</p>
            <p className="text-[#8FCBEB]/60 text-xs font-medium">{answered.detail}</p>
          </div>
        </div>
        <div
          data-reveal="pop"
          className="floating-ui-badge absolute hidden xl:flex right-0 -bottom-16 items-center gap-3 rounded-2xl p-4"
          aria-hidden="true"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-b from-emerald-400/25 to-emerald-900/10 flex items-center justify-center border border-emerald-300/30">
            <CalendarCheck className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <p className="text-white text-sm font-bold tracking-tight">{booked.title}</p>
            <p className="text-[#8FCBEB]/60 text-xs font-medium">{booked.detail}</p>
          </div>
        </div>
      </DarkPanel>
    </Section>
  );
}
