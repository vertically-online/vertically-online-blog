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
    <section className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-void">
        {site.included.heading}
      </h2>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {site.included.items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 rounded-2xl bg-white shadow-card border border-void/10 p-4"
          >
            <CheckIcon />
            <span className="text-slate">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
