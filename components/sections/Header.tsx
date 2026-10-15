import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import BookCallButton from "@/components/BookCallButton";

const navLinks = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#live-demo", label: "Live demo" },
  { href: "/#faq", label: "FAQ" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-void/10">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 min-w-0">
          <Image
            src={site.brand.logoLight}
            alt={site.brand.name}
            width={site.brand.logoLightDimensions.width}
            height={site.brand.logoLightDimensions.height}
            priority
            className="h-8 w-auto shrink-0"
          />
          <span className="hidden lg:block truncate border-l border-void/10 pl-2 ml-1 text-sm text-slate">
            {site.brand.tagline}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-void transition-colors">
              {link.label}
            </a>
          ))}
          <a href={site.contact.phoneHref} className="hover:text-void transition-colors">
            {site.contact.phone}
          </a>
        </nav>

        <BookCallButton className="btn-modern-brand whitespace-nowrap inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-bold shrink-0">
          {site.hero.primaryCta}
        </BookCallButton>
      </div>
    </header>
  );
}
