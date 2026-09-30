import { site } from "@/content/site";

export default function Solution() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-vx">
        <h2 className="max-w-2xl font-display text-3xl font-semibold text-void sm:text-4xl">
          {site.solution.headline}
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {site.solution.features.map((feature) => (
            <div key={feature.title} className="glass holo-sheen rounded-2xl p-6">
              <h3 className="font-display text-lg font-semibold text-void">
                {feature.title}
              </h3>
              <p className="mt-2 leading-relaxed text-slate">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
