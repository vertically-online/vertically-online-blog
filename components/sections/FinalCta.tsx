import { site } from "@/content/site";
import BookCallButton from "@/components/BookCallButton";

export default function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div
        className="rounded-2xl px-8 py-10 text-center text-white"
        style={{
          background: "linear-gradient(120deg, #5a4fe0 0%, #008ccd 100%)",
        }}
      >
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2 text-white">
          {site.finalCta.headline}
        </h2>
        <p className="text-white/85 mb-6 max-w-lg mx-auto">
          {site.finalCta.subheadline}
        </p>
        <BookCallButton className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-signal-2 shadow-lg hover:bg-glacier transition-colors">
          {site.finalCta.primaryCta}
        </BookCallButton>
        <p className="mt-4 text-sm text-white/70">{site.finalCta.reassurance}</p>
      </div>
    </section>
  );
}
