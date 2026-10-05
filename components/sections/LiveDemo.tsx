import { site } from "@/content/site";
import DemoPreview from "@/components/DemoPreview";

export default function LiveDemo() {
  const { eyebrow, heading, body, ctaLabel, ctaUrl, note } = site.liveDemo;

  return (
    <section id="live-demo" className="scroll-mt-24 mx-auto max-w-6xl px-4 py-20">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
        <div className="min-w-0 order-2 lg:order-1">
          <DemoPreview />
        </div>

        <div className="order-1 lg:order-2">
          <span className="inline-flex items-center rounded-full bg-signal/10 px-3 py-1 text-xs font-medium text-signal ring-1 ring-signal/20">
            {eyebrow}
          </span>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl font-bold tracking-tight text-void">
            {heading}
          </h2>
          <p className="mt-5 max-w-lg text-slate leading-relaxed">{body}</p>
          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-signal px-6 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-void-2 transition-colors"
          >
            {ctaLabel}
          </a>
          <p className="mt-3 text-sm text-slate">{note}</p>
        </div>
      </div>
    </section>
  );
}
