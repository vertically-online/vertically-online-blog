import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

export default function SuccessStories() {
  const { caseStudies, clientLogos } = site;
  if (caseStudies.length === 0 && clientLogos.length === 0) {
    return null;
  }

  return (
    <section className="py-20 sm:py-28">
      <div className="container-vx">
        {caseStudies.length > 0 && (
          <>
            <h2 className="font-display text-3xl font-semibold text-void sm:text-4xl">
              Success stories
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((story) => {
                const content = (
                  <>
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                      <Image
                        src={story.image}
                        alt={story.alt}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      />
                    </div>
                    <p className="mt-4 text-sm font-medium text-signal">
                      {story.industry}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-semibold text-void">
                      {story.client}
                    </h3>
                    <p className="mt-2 leading-relaxed text-slate">
                      {story.result}
                    </p>
                  </>
                );
                return story.href ? (
                  <Link
                    key={story.client}
                    href={story.href}
                    className="group glass holo-sheen rounded-2xl p-6"
                  >
                    {content}
                  </Link>
                ) : (
                  <div key={story.client} className="glass rounded-2xl p-6">
                    {content}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {clientLogos.length > 0 && (
          <div className={caseStudies.length > 0 ? "mt-16" : ""}>
            <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
              {clientLogos.map((logo) => {
                const img = (
                  <Image
                    src={logo.image}
                    alt={logo.name}
                    width={120}
                    height={48}
                    className="h-10 w-auto object-contain grayscale transition-all hover:grayscale-0"
                  />
                );
                return logo.href ? (
                  <a
                    key={logo.name}
                    href={logo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {img}
                  </a>
                ) : (
                  <span key={logo.name}>{img}</span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
