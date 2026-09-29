import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-28">
      <div className="container-vx">
        <h2 className="font-display text-3xl font-semibold text-void sm:text-4xl">
          What we do
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {site.services.map((service) => {
            const content = (
              <>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-void sm:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-2 leading-relaxed text-slate">
                  {service.description}
                </p>
                {service.href && (
                  <span className="mt-4 inline-block text-sm font-medium text-signal group-hover:text-tide">
                    Learn more
                  </span>
                )}
              </>
            );

            return service.href ? (
              <Link
                key={service.title}
                href={service.href}
                className="group glass holo-sheen rounded-2xl p-6"
              >
                {content}
              </Link>
            ) : (
              <div key={service.title} className="group glass rounded-2xl p-6">
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
