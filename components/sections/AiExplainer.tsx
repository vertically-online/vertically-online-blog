import Link from "next/link";
import {
  ArrowRight,
  Check,
  FileText,
  Inbox,
  MessageSquareText,
  PhoneCall,
  RefreshCw,
  Star,
  type LucideIcon,
} from "lucide-react";
import { site, type AiExplainerStep } from "@/content/site";
import { Section } from "@/components/ui/section";
import { DarkPanel } from "@/components/ui/dark-panel";
import { SectionHeading } from "@/components/ui/section-heading";

const ICONS: Record<AiExplainerStep["icon"], LucideIcon> = {
  lead: Inbox,
  reply: MessageSquareText,
  quote: FileText,
  call: PhoneCall,
  follow: RefreshCw,
  review: Star,
};

const linkClass =
  "font-semibold text-signal underline decoration-signal/30 underline-offset-[3px] transition-colors hover:decoration-signal";

/** "How AI lead response works for roofers" + "AI for roofing companies, in plain English". */
export default function AiExplainer() {
  const { eyebrow, heading, intro, steps, plain } = site.aiExplainer;

  return (
    <Section id="ai-lead-response" grid>
      <SectionHeading eyebrow={eyebrow} title={heading} intro={intro} />

      <ol className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, i) => {
          const Icon = ICONS[step.icon];
          return (
            <li key={step.title} data-reveal="up" className="light-depth-card light-depth-card-hover rounded-3xl p-6">
              <div className="flex items-center gap-3">
                <span className="icon-tile flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={2.25} aria-hidden="true" />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-signal">Step {i + 1}</span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-void">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate">{step.body}</p>
            </li>
          );
        })}
      </ol>

      <p data-reveal="up" className="mt-8 max-w-3xl text-[17px] leading-relaxed text-slate">
        See the phone side in detail on our{" "}
        <Link href="/roofing-answering-service" className={linkClass}>roofing answering service</Link> page, and how
        estimates are built on the{" "}
        <Link href="/roofing-quote-software" className={linkClass}>roofing quote software</Link> page.
      </p>

      <DarkPanel className="mt-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr_1fr] lg:gap-10">
          <div>
            <h2 data-reveal="up" className="font-display text-3xl sm:text-4xl font-bold leading-[1.08] tracking-tight text-white">
              {plain.heading}
            </h2>
            <p data-reveal="up" className="mt-4 leading-relaxed text-[#C9D3DB]">{plain.body}</p>
          </div>
          <div data-reveal="up" className="widget-depth rounded-3xl p-6">
            <h3 className="font-display text-lg font-bold tracking-tight text-white">What the AI does</h3>
            <ul className="mt-4 space-y-3">
              {plain.aiDoes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-white/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" strokeWidth={3} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal="up" className="widget-depth rounded-3xl p-6">
            <h3 className="font-display text-lg font-bold tracking-tight text-white">What you still do</h3>
            <ul className="mt-4 space-y-3">
              {plain.youDo.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-white/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" strokeWidth={3} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div data-reveal="up" className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-2xl text-[15px] leading-relaxed text-[#C9D3DB]">{plain.closing}</p>
          <Link
            href="/blog/how-to-get-more-roofing-leads"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-sky-300 hover:text-white transition-colors"
          >
            How to get more roofing leads
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </DarkPanel>
    </Section>
  );
}
