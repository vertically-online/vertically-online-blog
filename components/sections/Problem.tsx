import { site } from "@/content/site";

export default function Problem() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="max-w-2xl">
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
    </section>
  );
}
