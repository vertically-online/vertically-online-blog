import { site } from "@/content/site";
import InlineCalBooking from "@/components/InlineCalBooking";

export default function Problem() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
        <div>
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

        <div className="min-w-0">
          <p className="mb-2 text-sm font-medium text-slate">
            Book your free 15-minute lead audit
          </p>
          <InlineCalBooking />
        </div>
      </div>
    </section>
  );
}
