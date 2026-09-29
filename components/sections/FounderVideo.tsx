import { site } from "@/content/site";
import YouTubeEmbed from "@/components/YouTubeEmbed";

export default function FounderVideo() {
  return (
    <section id="founder" className="py-20 sm:py-28">
      <div className="container-vx grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <YouTubeEmbed
          youtubeId={site.founder.youtubeId}
          poster={site.founder.poster}
          posterAlt={`${site.founder.name}, ${site.founder.title}`}
        />
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
