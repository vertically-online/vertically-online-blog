import Image from "next/image";
import { Star } from "lucide-react";
import { site } from "@/content/site";
import BookCallButton from "@/components/BookCallButton";
import { Section } from "@/components/ui/section";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 shrink-0" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-[#008FD0] text-[#008FD0]" : "fill-slate/20 text-slate/20"}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function CredibilityStrip() {
  const { logo, logoAlt, websiteUrl, visitLabel, testimonial } = site.arias;

  return (
    <Section className="py-6 sm:py-8 lg:py-10" start="top 92%">
      <div
        data-reveal="up"
        className="light-depth-card flex flex-col gap-5 rounded-3xl px-6 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-8"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
          <div className="relative h-11 w-[70px] shrink-0">
            <Image src={logo} alt={logoAlt} fill className="object-cover" sizes="70px" />
          </div>
          <div className="hidden sm:block h-10 w-px bg-void/10" aria-hidden="true" />
          <div>
            <Stars rating={testimonial.rating} />
            <p className="mt-1.5 max-w-xl text-sm leading-snug text-slate">
              <span className="italic">&ldquo;{testimonial.paragraphs[0]}&rdquo;</span>{" "}
              <span className="font-semibold text-void">— {testimonial.authorName}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-5 shrink-0">
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener"
            className="text-sm font-semibold text-signal hover:text-void-2 transition-colors"
          >
            {visitLabel}
          </a>
          <BookCallButton className="btn-modern-brand whitespace-nowrap inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-bold">
            {site.hero.primaryCta}
          </BookCallButton>
        </div>
      </div>
    </Section>
  );
}
