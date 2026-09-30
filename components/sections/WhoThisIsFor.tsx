import { site } from "@/content/site";

export default function WhoThisIsFor() {
  const { heading, intro, criteria, closingNote } = site.whoThisIsFor;

  return (
    <section className="relative overflow-hidden holo-mesh py-20 sm:py-28">
      <div className="container-vx relative max-w-2xl">
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
          {heading}
        </h2>
        <p className="mt-4 text-lg text-white/75">{intro}</p>
        <ul className="mt-6 space-y-3">
          {criteria.map((criterion) => (
            <li key={criterion} className="flex items-start gap-3 text-lg text-white/90">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-aurora-2" />
              {criterion}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-white/60">{closingNote}</p>
      </div>
    </section>
  );
}
