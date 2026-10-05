import Image from "next/image";
import { site } from "@/content/site";
import AriasEmbed from "@/components/AriasEmbed";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-5 w-5 ${i < rating ? "fill-aurora-2" : "fill-slate/20"}`}
          aria-hidden="true"
        >
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.2 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.2 6.1-.6z" />
        </svg>
      ))}
    </div>
  );
}

export default function AriasFeature() {
  const { eyebrow, heading, subhead, logo, logoAlt, testimonial } = site.arias;

  return (
    <section id="results" className="scroll-mt-24 mx-auto max-w-6xl px-4 py-20">
      <span className="inline-flex items-center rounded-full bg-signal/10 px-3 py-1 text-xs font-medium text-signal ring-1 ring-signal/20">
        {eyebrow}
      </span>
      <h2 className="mt-5 max-w-2xl font-display text-3xl sm:text-4xl font-bold tracking-tight text-void">
        {heading}
      </h2>
      <p className="mt-4 max-w-2xl text-slate leading-relaxed">{subhead}</p>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[13fr_7fr] lg:gap-10">
        <div className="order-2 lg:order-1">
          <AriasEmbed />
        </div>

        <div className="order-1 lg:order-2">
          <div className="rounded-2xl bg-white p-6 shadow-card border border-void/10 sm:p-8">
            <div className="relative h-14 w-40">
              <Image
                src={logo}
                alt={logoAlt}
                fill
                className="object-contain object-left"
                sizes="160px"
              />
            </div>

            <div className="mt-5">
              <Stars rating={testimonial.rating} />
            </div>

            <blockquote className="mt-5">
              <span className="font-display text-5xl leading-none text-signal/30" aria-hidden="true">
                &ldquo;
              </span>
              <div className="-mt-3 space-y-4 text-base leading-relaxed text-void">
                {testimonial.paragraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </blockquote>

            <div className="mt-6">
              <p className="font-display font-semibold text-void">
                {testimonial.authorName}
              </p>
              <p className="text-sm text-slate">{testimonial.authorTitle}</p>
              <p className="text-sm text-slate">{testimonial.authorLocation}</p>
            </div>

            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-signal px-6 py-3.5 text-base font-semibold text-white shadow-lg transition-colors hover:bg-void-2"
            >
              {site.hero.primaryCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
