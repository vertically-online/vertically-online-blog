"use client";

import { useState } from "react";
import { Mail, Phone, Plus } from "@/components/ui/icons";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { DarkPanel } from "@/components/ui/dark-panel";
import { SectionHeading } from "@/components/ui/section-heading";

export default function Faq() {
  const { eyebrow, heading, helpHeading, helpBody, items } = site.faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" grid>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:pt-2">
          <SectionHeading eyebrow={eyebrow} title={heading} />

          <DarkPanel reveal={false} padded={false} data-reveal="up" className="mt-10 rounded-[28px] md:rounded-[28px] p-7">
            <p className="font-display text-xl font-bold tracking-tight text-white">{helpHeading}</p>
            <p className="mt-2 text-sm text-[#C9D3DB]">{helpBody}</p>
            <div className="mt-5 flex flex-col gap-3">
              <a
                href={site.contact.phoneHref}
                className="btn-modern-glass inline-flex items-center gap-2.5 self-start rounded-xl px-4 py-2.5 text-sm font-bold"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {site.contact.phone}
              </a>
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-flex items-center gap-2.5 self-start text-sm font-medium text-[#8FCBEB] hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {site.contact.email}
              </a>
            </div>
          </DarkPanel>
        </div>

        <div className="space-y-3">
          {items.map((item, i) => {
            const open = openIndex === i;
            return (
              <div
                key={item.question}
                data-reveal="up"
                className={cn(
                  "light-depth-card rounded-2xl transition-shadow duration-300",
                  open && "shadow-[0_20px_44px_-18px_rgba(10,14,39,0.28)]"
                )}
              >
                <h3>
                  <button
                    type="button"
                    className="faq-button"
                    aria-expanded={open}
                    aria-controls={`faq-answer-${i}`}
                    onClick={() => setOpenIndex(open ? null : i)}
                  >
                    <span className="font-display text-lg font-bold tracking-tight text-void">{item.question}</span>
                    <span
                      className={cn(
                        "faq-toggle",
                        open ? "icon-tile rotate-45" : "bg-void/[0.05] text-void"
                      )}
                      aria-hidden="true"
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                </h3>
                {/* Animated height via grid rows; aria-hidden while collapsed */}
                <div
                  id={`faq-answer-${i}`}
                  aria-hidden={!open}
                  className={cn(
                    "faq-answer",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 leading-relaxed text-slate">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
