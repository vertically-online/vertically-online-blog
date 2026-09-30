import { site } from "@/content/site";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import RoofDivider from "@/components/RoofDivider";

export default function Hero() {
  return (
    <section className="relative overflow-hidden holo-mesh">
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-aurora-2/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-aurora-1/20 blur-3xl" />

      <div className="container-vx relative grid gap-12 py-20 sm:py-28 lg:grid-cols-[11fr_9fr] lg:items-center lg:gap-10 lg:py-24">
        <div>
          <h1 className="font-display text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            {site.hero.headline}
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/75">
            {site.hero.subheadline}
          </p>
          <a
            href={site.bookingUrl}
            className="mt-8 inline-block rounded-full bg-gradient-to-r from-signal to-signal-2 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-signal-2/30 transition-transform hover:scale-[1.03]"
          >
            {site.hero.primaryCta}
          </a>
          <p className="mt-4 max-w-md text-sm text-white/60">
            {site.hero.reassurance}
          </p>
        </div>

        <div className="mx-auto w-full max-w-[240px] lg:mx-0 lg:ml-auto lg:max-w-[280px]">
          <YouTubeEmbed
            youtubeId={site.founder.youtubeId}
            poster={site.founder.poster}
            posterAlt={`${site.founder.name}, ${site.founder.title}`}
            aspectClassName="aspect-[9/16]"
          />
        </div>
      </div>

      <RoofDivider />
    </section>
  );
}
