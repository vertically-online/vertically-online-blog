import { site } from "@/content/site";
import ReviewsPanel from "@/components/ReviewsPanel";

export default function Hero() {
  return (
    <section className="relative overflow-hidden holo-mesh">
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-aurora-2/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-aurora-1/20 blur-3xl" />

      <div className="container-vx relative grid gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:items-center lg:py-32">
        <div>
          <h1 className="font-display text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            {site.hero.headline}
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/75">
            {site.hero.subtext}
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href={site.bookingUrl}
              className="rounded-full bg-gradient-to-r from-signal to-signal-2 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-signal-2/30 transition-transform hover:scale-[1.03]"
            >
              {site.hero.primaryCta}
            </a>
            <a
              href="#how-it-works"
              className="rounded-full glass-dark px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {site.hero.secondaryCta}
            </a>
          </div>
        </div>

        <div>
          <ReviewsPanel />
        </div>
      </div>
    </section>
  );
}
