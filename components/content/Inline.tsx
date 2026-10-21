import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Lightbulb, MonitorPlay } from "@/components/ui/icons";
import { site } from "@/content/site";

/** "What we'd do" box: the post's actual recommendation. */
export function Recommendation({ title = "What we'd do", children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="light-depth-card my-10 rounded-3xl border-l-4 !border-l-[#008FD0] p-6 sm:p-7">
      <p className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-void">
        <span className="icon-tile flex h-8 w-8 items-center justify-center rounded-lg">
          <Lightbulb className="h-4 w-4" aria-hidden="true" />
        </span>
        {title}
      </p>
      <div className="mt-3 text-[17px] leading-relaxed text-slate [&>p]:mb-3 [&>p:last-child]:mb-0 [&_strong]:text-void">
        {children}
      </div>
    </aside>
  );
}

/**
 * The Arias Roofing & Siding case study, from site.results. These are the
 * only customer results the site is allowed to state.
 */
export function AriasStory() {
  const { stats, closingNote } = site.results;
  return (
    <figure className="premium-depth-card my-10 overflow-hidden rounded-3xl p-6 sm:p-8 text-white">
      <figcaption className="text-xs font-bold uppercase tracking-widest text-[#8FCBEB]/80">
        Case study · Arias Roofing &amp; Siding, Sewell, NJ
      </figcaption>
      <dl className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {stats.map((stat) => (
          <div key={stat.label} className="widget-depth rounded-2xl p-4">
            <dt className="text-[11px] font-bold uppercase tracking-widest text-[#8FCBEB]/70">{stat.label}</dt>
            <dd className="mt-2">
              {stat.before !== "—" && (
                <span className="mr-2 text-sm text-white/45 line-through decoration-white/30">{stat.before}</span>
              )}
              <span className="font-display text-lg font-bold text-white">{stat.after}</span>
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-5 text-[15px] leading-relaxed text-[#C9D3DB]">{closingNote}</p>
    </figure>
  );
}

/** Link card to the live demo site. */
export function DemoCallout({ children }: { children?: ReactNode }) {
  return (
    <a
      href={site.liveDemo.ctaUrl}
      target="_blank"
      rel="noopener"
      className="light-depth-card light-depth-card-hover group my-10 flex items-center gap-5 rounded-3xl p-6 no-underline"
    >
      <span className="icon-tile flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
        <MonitorPlay className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="flex-1">
        <span className="block font-display text-lg font-bold tracking-tight text-void">Try the live demo</span>
        <span className="mt-1 block text-[15px] leading-relaxed text-slate">
          {children ??
            "A demo roofing company running the exact system. Request a quote with your own email and get the PDF estimate in under a minute."}
        </span>
      </span>
      <ArrowUpRight className="h-5 w-5 shrink-0 text-signal transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
    </a>
  );
}

/** Inline internal-link card, e.g. from a post to a landing page. */
export function LinkCard({ href, title, children }: { href: string; title: string; children?: ReactNode }) {
  return (
    <a href={href} className="light-depth-card light-depth-card-hover group my-8 flex items-center gap-4 rounded-2xl p-5 no-underline">
      <span className="flex-1">
        <span className="block font-display font-bold tracking-tight text-void">{title}</span>
        {children && <span className="mt-1 block text-[15px] text-slate">{children}</span>}
      </span>
      <ArrowRight className="h-5 w-5 shrink-0 text-signal transition-transform group-hover:translate-x-1" aria-hidden="true" />
    </a>
  );
}
