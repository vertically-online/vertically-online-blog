"use client";

import {
  BarChart3,
  FileText,
  Mail,
  PhoneCall,
  RefreshCw,
  Star,
  Zap,
  type IconComponent,
} from "@/components/ui/icons";
import { site, type IncludedIcon } from "@/content/site";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

const ICONS: Record<IncludedIcon, IconComponent> = {
  zap: Zap,
  quote: FileText,
  mail: Mail,
  phone: PhoneCall,
  refresh: RefreshCw,
  star: Star,
  chart: BarChart3,
};

export default function Included() {
  const { eyebrow, heading, items } = site.included;
  const [featured, ...rest] = items;
  const FeaturedIcon = ICONS[featured.icon];

  return (
    <Section grid>
      <SectionHeading eyebrow={eyebrow} title={heading} className="max-w-4xl" />

      <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Headline feature: the navy tile */}
        <li
          data-reveal="up"
          className="premium-depth-card relative flex flex-col justify-between gap-8 overflow-hidden rounded-3xl p-7 sm:col-span-2"
        >
          <div className="icon-tile flex h-12 w-12 items-center justify-center rounded-2xl">
            <FeaturedIcon className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
          </div>
          <div>
            <p className="font-display text-7xl sm:text-8xl font-black tracking-tighter leading-none text-card-silver-matte" aria-hidden="true">
              &lt;30s
            </p>
            <p className="mt-4 max-w-sm font-display text-xl font-bold tracking-tight text-white">
              {featured.label}
            </p>
          </div>
        </li>

        {rest.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <li
              key={item.label}
              data-reveal="up"
              className="light-depth-card light-depth-card-hover flex items-center gap-4 rounded-3xl p-5 sm:flex-col sm:items-start sm:gap-5 sm:p-6"
            >
              <div className="icon-tile flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
                <Icon className="h-[18px] w-[18px]" strokeWidth={2.25} aria-hidden="true" />
              </div>
              <span className="font-display text-lg font-bold leading-snug tracking-tight text-void">{item.label}</span>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
