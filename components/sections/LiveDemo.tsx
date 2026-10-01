import { site } from "@/content/site";
import DemoPreview from "@/components/DemoPreview";

export default function LiveDemo() {
  const { eyebrow, heading, body, ctaLabel, ctaUrl, note } = site.liveDemo;

  return (
    <section id="live-demo" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-vx grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <span className="inline-block rounded-full border border-signal/30 bg-signal/5 px-4 py-1.5 text-xs font-medium text-signal">
            {eyebrow}
          </span>
          <h2 className="mt-5 font-display text-3xl font-semibold text-void sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate">
            {body}
          </p>
          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener"
            className="mt-8 inline-block rounded-full bg-gradient-to-r from-signal to-signal-2 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-signal-2/30 transition-transform hover:scale-[1.03]"
          >
            {ctaLabel}
          </a>
          <p className="mt-3 text-sm text-slate/60">{note}</p>
        </div>

        <DemoPreview />
      </div>
    </section>
  );
}
