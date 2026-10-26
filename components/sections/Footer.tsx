"use client";

import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { home } from "@/content/home";
import BookCallButton from "@/components/BookCallButton";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { href: "/#how-it-works", label: "How it works" },
      { href: "/#live-demo", label: "Live demo" },
      { href: "/#faq", label: "FAQ" },
      { href: "/blog", label: "Blog" },
      { href: "/about", label: "About" },
    ],
  },
  {
    title: "Products",
    links: [
      { href: "/roofing-answering-service", label: "Roofing answering service" },
      { href: "/roofing-quote-software", label: "Roofing quote software" },
    ],
  },
  {
    title: "Contact",
    links: [
      { href: site.contact.phoneHref, label: site.contact.phone },
      { href: `mailto:${site.contact.email}`, label: site.contact.email },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: site.legal.privacyPath, label: "Privacy Policy" },
      { href: site.legal.termsPath, label: "Terms of Service" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="top">
          <Image
            src={site.brand.logoLight}
            alt="Vertically"
            width={site.brand.logoLightDimensions.width}
            height={site.brand.logoLightDimensions.height}
            sizes="140px"
          />
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <BookCallButton className="btn btn-navy">{site.hero.primaryCta}</BookCallButton>
            <Link className="btn btn-line" href="/#how-it-works">
              See how it works
            </Link>
          </div>
        </div>
        <div className="cols">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="fh">{col.title}</p>
              <ul>
                {col.links.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith("/") ? (
                      <Link href={link.href}>{link.label}</Link>
                    ) : (
                      <a href={link.href}>{link.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="legal">
          <span>
            &copy; 2021–2026 {site.legal.entityWithDba}. {site.contact.foundedLine}.
          </span>
          <span>{home.footerNote}</span>
        </div>
      </div>
    </footer>
  );
}
