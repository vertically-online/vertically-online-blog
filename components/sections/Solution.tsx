"use client";

import Image from "next/image";
import { FileText, PhoneCall, ShieldCheck, Zap, type IconComponent } from "@/components/ui/icons";
import { site, type SolutionIcon } from "@/content/site";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

const ICONS: Record<SolutionIcon, IconComponent> = {
  zap: Zap,
  quote: FileText,
  phone: PhoneCall,
  shield: ShieldCheck,
};

export default function Solution() {
  const { eyebrow, headline, features } = site.solution;

  return (
    <Section>
      <SectionHeading eyebrow={eyebrow} title={headline} align="center" />

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => {
          const Icon = ICONS[feature.icon];
          return (
            <div
              key={feature.title}
              data-reveal="up"
              className="light-depth-card light-depth-card-hover group overflow-hidden rounded-3xl"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  width={600}
                  height={352}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-void/10 to-transparent" />
              </div>
              <div className="relative px-6 pb-7 pt-9">
                <div className="icon-tile absolute -top-6 left-6 flex h-12 w-12 items-center justify-center rounded-2xl">
                  <Icon className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
                </div>
                <h3 className="font-display font-bold text-xl tracking-tight text-void mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate leading-relaxed">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
