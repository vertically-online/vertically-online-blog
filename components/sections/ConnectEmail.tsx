import type React from "react";
import Link from "next/link";
import { EyeOff, Mail, Paperclip, Server, ShieldCheck, Unplug, type LucideIcon } from "lucide-react";
import { site } from "@/content/site";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

// Paired by position with site.connectEmail.points
const POINT_ICONS: LucideIcon[] = [ShieldCheck, EyeOff, Unplug];

function GmailLogo() {
  return (
    <svg viewBox="52 42 88 66" className="h-4 w-auto" aria-hidden="true">
      <path fill="#4285f4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6" />
      <path fill="#34a853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15" />
      <path fill="#fbbc04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2" />
      <path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92" />
      <path fill="#c5221f" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2" />
    </svg>
  );
}

function MicrosoftLogo() {
  return (
    <svg viewBox="0 0 21 21" className="h-4 w-4" aria-hidden="true">
      <rect x="1" y="1" width="9" height="9" fill="#f25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
      <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
    </svg>
  );
}

const PROVIDER_LOGOS: Record<string, () => React.ReactElement> = {
  google: GmailLogo,
  microsoft: MicrosoftLogo,
  smtp: () => <Server className="h-4 w-4 text-signal" aria-hidden="true" />,
};

export default function ConnectEmail() {
  const { eyebrow, heading, body, points, providersLabel, providers } = site.connectEmail;

  return (
    <Section id="connect-email" className="pt-4 sm:pt-6 lg:pt-8">
      <div
        data-reveal="up"
        className="light-depth-card grid grid-cols-1 gap-10 rounded-[32px] p-8 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14 lg:p-14"
      >
        <div>
          <SectionHeading eyebrow={eyebrow} title={heading} />
          <p className="mt-5 text-lg leading-relaxed text-slate">{body}</p>
          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-widest text-slate/70">{providersLabel}</p>
            <ul className="mt-3 flex flex-wrap gap-2.5">
              {providers.map((provider) => {
                const Logo = PROVIDER_LOGOS[provider.id];
                return (
                  <li
                    key={provider.id}
                    className="light-depth-card inline-flex items-center gap-2.5 rounded-xl px-3.5 py-2 text-sm font-semibold text-void"
                  >
                    {Logo && <Logo />}
                    {provider.label}
                  </li>
                );
              })}
            </ul>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {points.map((point, i) => {
              const Icon = POINT_ICONS[i] ?? ShieldCheck;
              return (
                <li
                  key={point}
                  className="inline-flex items-center gap-2 rounded-full bg-signal/[0.07] px-3.5 py-1.5 text-sm font-semibold text-void ring-1 ring-signal/15"
                >
                  <Icon className="h-4 w-4 text-signal" aria-hidden="true" />
                  {point}
                </li>
              );
            })}
          </ul>
          <p className="mt-6 text-sm text-slate">
            Read exactly what we access and why in our{" "}
            <Link href={site.legal.privacyPath} className="font-medium text-signal underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        {/* Illustrative email going out from the roofer's own address */}
        <div data-reveal="right" className="premium-depth-card rounded-3xl p-5 sm:p-6 text-white" aria-hidden="true">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="icon-tile flex h-10 w-10 items-center justify-center rounded-xl">
              <Mail className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">Your Roofing Co</p>
              <p className="truncate text-xs text-[#8FCBEB]/70">office@yourroofingco.com</p>
            </div>
            <span className="ml-auto rounded-full bg-emerald-400/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-300">
              Sent
            </span>
          </div>
          <p className="mt-4 text-xs font-bold uppercase tracking-widest text-white/40">To: Sarah M.</p>
          <p className="mt-1 font-display text-lg font-bold">Your roof replacement estimate</p>
          <div className="mt-3 space-y-2">
            <div className="h-2 w-11/12 rounded-full bg-white/10" />
            <div className="h-2 w-9/12 rounded-full bg-white/10" />
            <div className="h-2 w-10/12 rounded-full bg-white/10" />
          </div>
          <div className="widget-depth mt-5 flex items-center gap-3 rounded-xl p-3">
            <Paperclip className="h-4 w-4 text-sky-300" />
            <span className="text-sm font-semibold">Estimate.pdf</span>
            <span className="ml-auto text-xs text-white/40">PDF</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
