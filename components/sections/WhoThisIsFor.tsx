import { site } from "@/content/site";

export default function WhoThisIsFor() {
  const { heading, intro, criteria, closingNote } = site.whoThisIsFor;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-void">
            {heading}
          </h2>
          <p className="mt-4 text-slate">{intro}</p>
          <ul className="mt-6 space-y-3">
            {criteria.map((criterion) => (
              <li key={criterion} className="flex items-start gap-3 text-void">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-aurora-1" />
                {criterion}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-slate">{closingNote}</p>
        </div>
      </div>
    </section>
  );
}
