"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

const navLinks = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#team", label: "Team" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="container-vx flex items-center justify-between gap-4 py-3">
        <Link href="/" className="flex flex-col min-w-0">
          <Image
            src={site.brand.logoLight}
            alt={site.brand.name}
            width={site.brand.logoLightDimensions.width}
            height={site.brand.logoLightDimensions.height}
            priority
            className="h-7 w-auto"
          />
          <span className="hidden sm:block text-xs text-slate/80 leading-tight truncate mt-0.5">
            {site.brand.tagline}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate hover:text-signal transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={site.bookingUrl}
            className="rounded-full bg-gradient-to-r from-signal to-signal-2 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-signal-2/25 transition-transform hover:scale-[1.03]"
          >
            Book a free audit
          </a>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg glass md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-void" fill="none" strokeWidth={2}>
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" className="glass border-t border-void/5 md:hidden">
          <div className="container-vx flex flex-col gap-1 py-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate hover:bg-void/5"
              >
                {link.label}
              </a>
            ))}
            <a
              href={site.bookingUrl}
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gradient-to-r from-signal to-signal-2 px-5 py-2.5 text-center text-sm font-semibold text-white"
            >
              Book a free audit
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
