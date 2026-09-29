import { site } from "@/content/site";
import Timeline from "@/components/Timeline";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <div className="container-vx">
        <h2 className="font-display text-3xl font-semibold text-void sm:text-4xl">
          How it works
        </h2>
        <p className="mt-3 max-w-lg text-lg text-slate">
          {site.howItWorks.intro}
        </p>

        <div className="mt-14">
          <Timeline steps={site.howItWorks.steps} />
        </div>

        <a
          href={site.bookingUrl}
          className="mt-4 inline-block rounded-full bg-gradient-to-r from-signal to-signal-2 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-signal-2/30 transition-transform hover:scale-[1.03]"
        >
          {site.hero.primaryCta}
        </a>
      </div>
    </section>
  );
}
