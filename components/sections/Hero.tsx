import Image from "next/image";
import { site } from "@/content/site";
import StatCounter from "@/components/StatCounter";
import YouTubeEmbed from "@/components/YouTubeEmbed";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-void text-white">
      <Image
        src={site.hero.image}
        alt={site.hero.imageAlt}
        fill
        priority
        quality={55}
        sizes="100vw"
        className="object-cover object-center opacity-45"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, rgba(10,14,39,0.97) 20%, rgba(10,14,39,0.75) 55%, rgba(10,14,39,0.55) 100%), radial-gradient(circle at 85% 15%, rgba(109,95,216,0.35), transparent 45%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[3fr_2fr] lg:gap-12">
          {/* Text content: left column on desktop, first on mobile */}
          <div className="max-w-xl lg:col-start-1 lg:row-start-1">
            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-[#9fdaff] mb-5 ring-1 ring-white/10">
              {site.hero.badge}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-white">
              {site.hero.headline}
            </h1>
            <p className="mt-5 text-lg text-white/80 max-w-lg">
              {site.hero.subheadline}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center rounded-lg bg-signal px-6 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-void-2 transition-colors"
              >
                {site.hero.primaryCta}
              </a>
              <a
                href={site.contact.phoneHref}
                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Call {site.contact.phone}
              </a>
            </div>
            <p className="mt-4 max-w-md text-sm text-white/60">
              {site.hero.reassurance}
            </p>
          </div>

          {/* Founder video: right column on desktop (spans both rows, centered), second on mobile */}
          <div className="mx-auto w-full max-w-xs lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:mx-0 lg:max-w-none lg:self-center">
            <div className="rounded-2xl overflow-hidden shadow-card">
              <YouTubeEmbed
                youtubeId={site.founder.youtubeId}
                poster={site.founder.poster}
                posterAlt={`${site.founder.name}, ${site.founder.title}`}
                aspectClassName="aspect-[9/16]"
              />
            </div>
          </div>

          {/* Stats: stays in the left column on desktop, last on mobile */}
          <div className="lg:col-start-1 lg:row-start-2">
            <StatCounter className="max-w-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
