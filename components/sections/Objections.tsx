import { site } from "@/content/site";
import ClickToPlayVideo from "@/components/ClickToPlayVideo";

export default function Objections() {
  return (
    <section id="objections" className="scroll-mt-24 mx-auto max-w-6xl px-4 py-20">
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-void">
          {site.objections.heading}
        </h2>
        <p className="mt-3 text-slate">{site.objections.intro}</p>
      </div>

      <div className="mt-12 space-y-8">
        {site.objections.items.map((item) => (
          <div
            key={item.label}
            className="grid grid-cols-1 items-center gap-6 rounded-2xl bg-white p-6 shadow-card border border-void/10 sm:grid-cols-[200px_1fr] sm:gap-8"
          >
            <ClickToPlayVideo src={item.video} poster={item.poster} className="mx-auto max-w-[200px]" />
            <div>
              <h3 className="font-display font-semibold text-lg text-void mb-2">
                {item.label}
              </h3>
              <p className="text-slate leading-relaxed">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
