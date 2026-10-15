import { ArrowUpRight, FileText, Inbox } from "lucide-react";
import { site } from "@/content/site";
import DemoPreview from "@/components/DemoPreview";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export default function LiveDemo() {
  const { eyebrow, heading, body, ctaLabel, ctaUrl, note, badges } = site.liveDemo;

  return (
    <Section id="live-demo" grid>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:items-center">
        <div className="relative min-w-0 order-2 lg:order-1" data-reveal="rise">
          <DemoPreview />

          {/* Floating glass badges around the browser */}
          <div
            data-reveal="pop"
            className="floating-ui-badge floating-badge-dark absolute hidden sm:flex -top-6 -right-4 lg:-right-8 items-center gap-3 rounded-2xl p-3.5 z-20"
            aria-hidden="true"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-b from-sky-400/25 to-sky-900/10 flex items-center justify-center border border-sky-300/30">
              <FileText className="w-4 h-4 text-sky-300" />
            </div>
            <div>
              <p className="text-white text-sm font-bold tracking-tight">{badges[0].title}</p>
              <p className="text-[#8FCBEB]/60 text-xs font-medium">{badges[0].detail}</p>
            </div>
          </div>
          <div
            data-reveal="pop"
            className="floating-ui-badge floating-badge-dark absolute hidden sm:flex bottom-24 -left-4 lg:-left-8 items-center gap-3 rounded-2xl p-3.5 z-20"
            aria-hidden="true"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-b from-emerald-400/25 to-emerald-900/10 flex items-center justify-center border border-emerald-300/30">
              <Inbox className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <p className="text-white text-sm font-bold tracking-tight">{badges[1].title}</p>
              <p className="text-[#8FCBEB]/60 text-xs font-medium">{badges[1].detail}</p>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeading eyebrow={eyebrow} title={heading} intro={body} />
          <div data-reveal="up" className="mt-8">
            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener"
              className="btn-modern-brand group inline-flex items-center justify-center gap-2 rounded-[1.1rem] px-7 py-4 text-base font-bold tracking-tight"
            >
              {ctaLabel.replace(/\s*→\s*$/, "")}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
            <p className="mt-3 text-sm text-slate">{note}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
