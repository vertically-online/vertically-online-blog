import { site } from "@/content/site";
import DemoPreview from "@/components/DemoPreview";
import InlineCalBooking from "@/components/InlineCalBooking";

export default function LiveDemo() {
  const { eyebrow, heading, body, ctaLabel, ctaUrl, note } = site.liveDemo;

  return (
    <section
      id="live-demo"
      className="scroll-mt-24 mx-auto max-w-[1600px] px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-10 xl:grid-cols-[1.15fr_0.7fr_1.15fr] xl:gap-8">
        {/* Copy: full-width on top at the lg tablet tier, middle column at xl */}
        <div className="order-1 min-w-0 lg:order-1 lg:col-span-2 xl:col-span-1 xl:order-2 xl:mx-auto xl:max-w-sm xl:text-center">
          <span className="inline-flex items-center rounded-full bg-signal/10 px-3 py-1 text-xs font-medium text-signal ring-1 ring-signal/20 xl:mx-auto">
            {eyebrow}
          </span>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl font-bold tracking-tight text-void">
            {heading}
          </h2>
          <p className="mt-5 max-w-lg text-slate leading-relaxed xl:mx-auto">
            {body}
          </p>
          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-signal px-6 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-void-2 transition-colors"
          >
            {ctaLabel}
          </a>
          <p className="mt-3 text-sm text-slate">{note}</p>

          <p className="mt-4 text-sm font-medium text-void">
            Like what you see? Grab a time
            <span className="hidden xl:inline"> on the right →</span>
            <span className="xl:hidden"> below ↓</span>
          </p>
        </div>

        {/* Demo embed: left column */}
        <div className="order-2 min-w-0 lg:order-2 xl:order-1">
          <DemoPreview />
        </div>

        {/* Inline booking calendar: right column */}
        <div className="order-3 min-w-0 lg:order-3 xl:order-3">
          <InlineCalBooking />
        </div>
      </div>
    </section>
  );
}
