import { Phone, Zap } from "lucide-react";
import { site } from "@/content/site";
import BookCallButton from "@/components/BookCallButton";
import { DarkPanel } from "@/components/ui/dark-panel";

/** Free-30-days + phone call to action, for posts and landing pages. */
export default function CTA({
  heading = "Answer every lead in under 30 seconds.",
  body = "Vertically replies to your leads, sends the quote, calls them, and books the inspection on your Google Calendar. Free for 30 days. No contract, no credit card.",
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <DarkPanel reveal={false} padded={false} className="my-12 rounded-[28px] md:rounded-[32px] px-7 py-9 sm:px-10 sm:py-11">
      <p className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-card-silver-matte">{heading}</p>
      <p className="mt-3 max-w-xl text-[#C9D3DB] leading-relaxed">{body}</p>
      <div className="mt-7 flex flex-col sm:flex-row sm:flex-wrap gap-3">
        <BookCallButton className="btn-modern-brand group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-[1.1rem] px-6 py-3.5 text-base font-bold tracking-tight">
          <Zap className="h-4 w-4 transition-transform group-hover:scale-110" aria-hidden="true" />
          {site.hero.primaryCta}
        </BookCallButton>
        <a
          href={site.contact.phoneHref}
          className="btn-modern-glass group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-[1.1rem] px-6 py-3.5 text-base font-bold tracking-tight"
        >
          <Phone className="h-4 w-4 transition-transform group-hover:scale-110" aria-hidden="true" />
          Call {site.contact.phone}
        </a>
      </div>
    </DarkPanel>
  );
}
