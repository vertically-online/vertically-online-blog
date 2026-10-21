import Image from "next/image";
import { ArrowRight, Quote, Star, TrendingUp } from "lucide-react";
import { site } from "@/content/site";
import { Section } from "@/components/ui/section";
import { DarkPanel } from "@/components/ui/dark-panel";
import { Eyebrow } from "@/components/ui/section-heading";

export default function Results() {
  const { eyebrow, logo, logoAlt, headline, intro, setup, stats, closingNote } = site.results;
  const { testimonial } = site.arias;

  return (
    <Section>
      <DarkPanel>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:items-center">
          <div>
            <div data-reveal="up" className="inline-flex rounded-2xl bg-white px-3 py-1.5 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.6)]">
              <Image src={logo} alt={logoAlt} width={180} height={112} className="h-14 w-[90px] object-cover" />
            </div>
            <div className="mt-6">
              <Eyebrow tone="dark">{eyebrow}</Eyebrow>
            </div>
            <h2
              data-reveal="up"
              className="mt-5 font-display text-4xl sm:text-5xl font-bold tracking-tight leading-[1.06] text-white"
            >
              {headline}
            </h2>
            <p data-reveal="up" className="mt-6 text-lg leading-relaxed text-[#C9D3DB]">{intro}</p>
            <p data-reveal="up" className="mt-3 font-semibold text-white">{setup}</p>
          </div>

          {/* Gustavo's full testimonial */}
          <figure data-reveal="right" className="floating-ui-badge relative rounded-3xl p-7 sm:p-8">
            <Quote className="absolute right-6 top-6 h-10 w-10 text-white/10" aria-hidden="true" />
            <div className="flex gap-0.5" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-[#7DD3FC] text-[#7DD3FC]" aria-hidden="true" />
              ))}
            </div>
            <blockquote className="mt-5 space-y-3 text-[15px] leading-relaxed text-white/85">
              {testimonial.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </blockquote>
            <figcaption className="mt-6 border-t border-white/10 pt-5">
              <p className="font-display font-bold text-white">{testimonial.authorName}</p>
              <p className="text-sm text-[#8FCBEB]/70">
                {testimonial.authorTitle} · {testimonial.authorLocation}
              </p>
            </figcaption>
          </figure>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} data-reveal="up" className="widget-depth rounded-2xl p-5">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#8FCBEB]/70">{stat.label}</p>
              {stat.before !== "—" && (
                <p className="mt-3 flex items-center gap-2 text-sm text-white/45">
                  <span className="line-through decoration-white/30">{stat.before}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-sky-300/70" aria-hidden="true" />
                </p>
              )}
              <p className="mt-1.5 font-display text-2xl font-bold leading-tight tracking-tight text-card-silver-matte">
                {stat.after}
              </p>
            </div>
          ))}
        </div>

        <p
          data-reveal="up"
          className="mt-4 flex items-start gap-3 rounded-2xl border border-emerald-400/25 bg-emerald-500/[0.08] p-4 font-medium text-emerald-50"
        >
          <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />
          {closingNote}
        </p>
      </DarkPanel>
    </Section>
  );
}
