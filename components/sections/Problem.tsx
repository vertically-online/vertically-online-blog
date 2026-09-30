import { site } from "@/content/site";

export default function Problem() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-vx max-w-2xl">
        <h2 className="font-display text-3xl font-semibold text-void sm:text-4xl">
          {site.problem.headline}
        </h2>
        <div className="mt-6 space-y-4">
          {site.problem.paragraphs.map((paragraph, i) => (
            <p key={i} className="text-lg leading-relaxed text-slate">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
