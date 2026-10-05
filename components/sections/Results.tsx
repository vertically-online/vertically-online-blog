import Image from "next/image";
import { site } from "@/content/site";

export default function Results() {
  const { eyebrow, logo, logoAlt, headline, intro, setup, stats, closingNote } =
    site.results;

  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="relative h-10 w-36">
        <Image
          src={logo}
          alt={logoAlt}
          fill
          className="object-contain object-left"
          sizes="144px"
        />
      </div>

      <span className="mt-5 inline-flex items-center rounded-full bg-signal/10 px-3 py-1 text-xs font-medium text-signal ring-1 ring-signal/20">
        {eyebrow}
      </span>
      <h2 className="mt-5 max-w-2xl font-display text-3xl sm:text-4xl font-bold tracking-tight text-void">
        {headline}
      </h2>
      <p className="mt-6 max-w-2xl text-slate leading-relaxed">{intro}</p>
      <p className="mt-2 max-w-2xl font-medium text-void">{setup}</p>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-white shadow-card border border-void/10 p-5"
          >
            <p className="text-xs font-medium text-slate">{stat.label}</p>
            {stat.before !== "—" && (
              <p className="mt-2 text-sm text-slate line-through decoration-slate/30">
                {stat.before}
              </p>
            )}
            <p className="mt-1 font-display text-lg font-semibold text-void">
              {stat.after}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-10 max-w-2xl font-medium text-void">{closingNote}</p>
    </section>
  );
}
