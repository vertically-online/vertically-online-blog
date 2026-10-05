import { site } from "@/content/site";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-void">
          How it works
        </h2>
        <ol className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {site.howItWorks.steps.map((step, i) => (
            <li
              key={step.title}
              className="rounded-2xl bg-white shadow-card border border-void/10 p-6"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-aurora-1/10 text-base font-display font-semibold text-signal">
                {i + 1}
              </div>
              <h3 className="font-display font-semibold text-base text-void mb-1.5">
                {step.title}
              </h3>
              <p className="text-sm text-slate leading-relaxed">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
