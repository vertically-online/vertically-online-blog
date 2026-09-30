import { site } from "@/content/site";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-vx">
        <h2 className="font-display text-3xl font-semibold text-void sm:text-4xl">
          How it works
        </h2>
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {site.howItWorks.steps.map((step, i) => (
            <li key={step.title} className="glass rounded-2xl p-6">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-aurora-1 to-aurora-3 text-sm font-semibold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-void">
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-slate">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
