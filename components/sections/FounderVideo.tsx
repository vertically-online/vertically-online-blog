import { site } from "@/content/site";
import YouTubeEmbed from "@/components/YouTubeEmbed";

export default function FounderVideo() {
  return (
    <section id="founder" className="py-20 sm:py-28">
      <div className="container-vx grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-16">
        <div className="mx-auto w-full max-w-[280px] lg:max-w-none">
          <YouTubeEmbed
            youtubeId={site.founder.youtubeId}
            poster={site.founder.poster}
            posterAlt={`${site.founder.name}, ${site.founder.title}`}
            aspectClassName="aspect-[9/16]"
          />
        </div>
        <div>
          <h2 className="font-display text-2xl font-semibold text-void sm:text-3xl">
            {site.founder.name}
          </h2>
          <p className="mt-1 text-sm font-medium text-signal">
            {site.founder.title}
          </p>
          <p className="mt-5 text-lg leading-relaxed text-slate">
            {site.founder.note}
          </p>
        </div>
      </div>
    </section>
  );
}
