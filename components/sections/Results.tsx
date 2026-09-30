import { site } from "@/content/site";

export default function Results() {
  const { headline, intro, setup, stats, closingNote } = site.results;

  return (
    <section className="relative overflow-hidden holo-mesh py-20 sm:py-28">
      <div className="pointer-events-none absolute -top-24 right-1/4 h-80 w-80 rounded-full bg-aurora-2/20 blur-3xl" />
      <div className="container-vx relative">
        <h2 className="max-w-2xl font-display text-3xl font-semibold text-white sm:text-4xl">
          {headline}
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
          {intro}
        </p>
        <p className="mt-2 max-w-2xl text-lg font-medium text-white">{setup}</p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-dark rounded-2xl p-5">
              <p className="text-xs font-medium text-white/50">{stat.label}</p>
              {stat.before !== "—" && (
                <p className="mt-2 text-sm text-white/40 line-through decoration-white/30">
                  {stat.before}
                </p>
              )}
              <p className="mt-1 font-display text-lg font-semibold text-white">
                {stat.after}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-2xl text-lg font-medium text-white/90">
          {closingNote}
        </p>
      </div>
    </section>
  );
}
