import { site } from "@/content/site";
import YouTubeEmbed from "@/components/YouTubeEmbed";

export default function Problem() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
        <div className="lg:col-span-2 mx-auto w-full max-w-xs lg:max-w-none">
          <div className="rounded-2xl overflow-hidden shadow-card">
            <YouTubeEmbed
              youtubeId={site.founder.youtubeId}
              poster={site.founder.poster}
              posterAlt={`${site.founder.name}, ${site.founder.title}`}
              aspectClassName="aspect-[9/16]"
            />
          </div>
        </div>
        <div className="lg:col-span-3">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-void mb-4">
            {site.problem.headline}
          </h2>
          <div className="space-y-4">
            {site.problem.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-slate leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
