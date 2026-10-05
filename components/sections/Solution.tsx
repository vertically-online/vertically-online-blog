import Image from "next/image";
import { site } from "@/content/site";

export default function Solution() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-void">
            {site.solution.headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {site.solution.features.map((feature) => (
            <div
              key={feature.title}
              className="group overflow-hidden rounded-2xl bg-white shadow-card border border-void/10 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/50 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-display font-semibold text-lg text-void mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
