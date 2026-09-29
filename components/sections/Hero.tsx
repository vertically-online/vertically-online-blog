import { site } from "@/content/site";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import TrustBar from "@/components/TrustBar";
import SchemaBox from "@/components/SchemaBox";

function ArrowConnector() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0 rotate-90 fill-none stroke-white/40 sm:rotate-0"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path d="M4 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeroSteps() {
  const { subheading, steps } = site.heroSteps;

  return (
    <div id="how-it-works" className="mt-12 scroll-mt-24">
      <h2 className="font-display text-sm font-semibold text-white/80">
        {subheading}
      </h2>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-3">
        {steps.map((step, i) => (
          <div key={step.title} className="contents">
            <div
              className={`glass-dark rounded-2xl p-4 sm:flex sm:flex-col sm:justify-center ${
                step.emphasized
                  ? "border-aurora-2/40 bg-gradient-to-br from-aurora-1/15 to-aurora-2/15 sm:flex-[1.4]"
                  : "sm:flex-1"
              }`}
            >
              <p
                className={`font-display font-semibold text-white ${
                  step.emphasized ? "text-lg" : "text-base"
                }`}
              >
                {step.title}
              </p>
              {step.caption && (
                <p className="mt-1 text-sm text-white/70">{step.caption}</p>
              )}
            </div>
            {i < steps.length - 1 && (
              <div className="flex justify-center py-1 sm:items-center sm:py-0">
                <ArrowConnector />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden holo-mesh">
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-aurora-2/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-aurora-1/20 blur-3xl" />

      <div className="container-vx relative grid gap-12 py-20 sm:py-28 lg:grid-cols-[11fr_9fr] lg:items-start lg:gap-10 lg:py-24">
        {/* Left column */}
        <div>
          <span className="inline-block rounded-full border border-white/25 px-4 py-1.5 text-xs font-medium text-white/85">
            {site.hero.tagPill}
          </span>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            {site.hero.headlineLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <a
            href={site.bookingUrl}
            className="mt-8 inline-block rounded-full bg-gradient-to-r from-signal to-signal-2 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-signal-2/30 transition-transform hover:scale-[1.03]"
          >
            {site.hero.primaryCta}
          </a>

          <HeroSteps />
        </div>

        {/* Right column */}
        <div>
          <div className="flex justify-end">
            <TrustBar />
          </div>

          <div className="mx-auto mt-5 w-full max-w-[280px] lg:mx-0 lg:ml-auto lg:max-w-sm">
            <p className="mb-2 text-right text-xs font-medium text-white/50">
              Founder video
            </p>
            <YouTubeEmbed
              youtubeId={site.founder.youtubeId}
              poster={site.founder.poster}
              posterAlt={`${site.founder.name}, ${site.founder.title}`}
              aspectClassName="aspect-[9/16]"
            />

            <div className="mt-5">
              <SchemaBox />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
