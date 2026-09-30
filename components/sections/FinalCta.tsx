import { site } from "@/content/site";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden holo-mesh py-20 sm:py-28">
      <div className="pointer-events-none absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-aurora-1/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-aurora-3/20 blur-3xl" />
      <div className="container-vx relative text-center">
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
          {site.finalCta.headline}
        </h2>
        <p className="mt-4 text-lg text-white/75">{site.finalCta.subheadline}</p>
        <a
          href={site.bookingUrl}
          className="mt-8 inline-block rounded-full bg-gradient-to-r from-signal to-signal-2 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-signal-2/30 transition-transform hover:scale-[1.03]"
        >
          {site.finalCta.primaryCta}
        </a>
        <p className="mt-4 text-sm text-white/60">{site.finalCta.reassurance}</p>
      </div>
    </section>
  );
}
