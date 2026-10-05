import Image from "next/image";
import { site } from "@/content/site";
import BookCallButton from "@/components/BookCallButton";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 shrink-0" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${i < rating ? "fill-aurora-2" : "fill-slate/20"}`}
          aria-hidden="true"
        >
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.2 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.2 6.1-.6z" />
        </svg>
      ))}
    </div>
  );
}

export default function CredibilityStrip() {
  const { logo, logoAlt, websiteUrl, visitLabel, testimonial } = site.arias;

  return (
    <section className="border-b border-void/10 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div className="relative h-8 w-28 shrink-0">
            <Image src={logo} alt={logoAlt} fill className="object-contain object-left" sizes="112px" />
          </div>
          <Stars rating={testimonial.rating} />
          <p className="max-w-xl text-sm leading-snug text-slate">
            <span className="italic">&ldquo;{testimonial.paragraphs[0]}&rdquo;</span>{" "}
            <span className="font-medium text-void">— {testimonial.authorName}</span>
          </p>
        </div>

        <div className="flex items-center gap-5 shrink-0">
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener"
            className="text-sm font-semibold text-signal hover:text-void-2 transition-colors"
          >
            {visitLabel}
          </a>
          <BookCallButton className="inline-flex items-center justify-center rounded-lg bg-signal px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-void-2 transition-colors">
            {site.hero.primaryCta}
          </BookCallButton>
        </div>
      </div>
    </section>
  );
}
