"use client";

import { useState } from "react";
import { site } from "@/content/site";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 mx-auto max-w-6xl px-4 py-20">
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-void">
          FAQ
        </h2>
        <div className="mt-10 divide-y divide-void/10 overflow-hidden rounded-2xl bg-white shadow-card border border-void/10">
          {site.faq.items.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : i)}
                >
                  <span className="font-medium text-void">{item.question}</span>
                  <svg
                    viewBox="0 0 24 24"
                    className={`h-5 w-5 shrink-0 fill-none stroke-slate transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {open && (
                  <div className="px-5 pb-5 leading-relaxed text-slate">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
