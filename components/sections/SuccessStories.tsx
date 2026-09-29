import { site } from "@/content/site";

export default function SuccessStories() {
  const { heading, items } = site.successStories;
  if (items.length === 0) return null;

  const track = [...items, ...items];

  return (
    <section className="border-y border-void/10 py-16">
      <div className="container-vx">
        <h2 className="text-center font-display text-3xl font-semibold text-void sm:text-4xl">
          {heading}
        </h2>
      </div>

      <div
        className="marquee-wrap relative mt-10 overflow-hidden"
        aria-label={heading}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-glacier to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-glacier to-transparent" />

        <div className="marquee-track flex w-max gap-6">
          {track.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              aria-hidden={i >= items.length ? true : undefined}
              className="glass flex w-72 shrink-0 items-center gap-4 rounded-2xl p-5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-aurora-1 to-aurora-3 font-display text-sm font-semibold text-white">
                {item.initials}
              </span>
              <div>
                <p className="text-sm font-medium text-void">{item.name}</p>
                <p className="mt-0.5 text-sm text-slate/80">{item.result}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
