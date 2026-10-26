"use client";

import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import BookCallButton from "@/components/BookCallButton";

// Site-wide nav from the redesign. Section links point at the homepage so
// they work from every page.
const NAV_LINKS = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#live-demo", label: "Live demo" },
  { href: "/#proof", label: "Results" },
  { href: "/#faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export default function Header() {
  return (
    <header className="nav">
      <div className="wrap">
        <Link className="logo" href="/" aria-label="Vertically home">
          <Image
            src={site.brand.logoLight}
            alt="Vertically"
            width={site.brand.logoLightDimensions.width}
            height={site.brand.logoLightDimensions.height}
            sizes="120px"
            priority
          />
        </Link>
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
        <a className="tel" href={site.contact.phoneHref}>
          {site.contact.phone}
        </a>
        <BookCallButton className="btn btn-navy">{site.hero.primaryCta}</BookCallButton>
      </div>
    </header>
  );
}
