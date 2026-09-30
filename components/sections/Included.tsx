import { site } from "@/content/site";

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0 fill-none stroke-signal"
      strokeWidth={2.2}
      aria-hidden="true"
    >
      <path d="M5 12l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Included() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-vx">
        <h2 className="font-display text-3xl font-semibold text-void sm:text-4xl">
          {site.included.heading}
        </h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {site.included.items.map((item) => (
            <li key={item} className="glass flex items-start gap-3 rounded-2xl p-4">
              <CheckIcon />
              <span className="text-slate">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
