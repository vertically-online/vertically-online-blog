import Image from "next/image";
import type { ReactElement } from "react";
import { site } from "@/content/site";

const socialIcons: Record<string, ReactElement> = {
  linkedin: (
    <path d="M4.98 3.5a2 2 0 11-4 0 2 2 0 014 0zM.5 8h4v13h-4V8zm7.5 0h3.8v1.78h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V21h-4v-6.4c0-1.53-.03-3.5-2.13-3.5-2.14 0-2.47 1.67-2.47 3.4V21h-4V8z" />
  ),
  instagram: (
    <path d="M12 2c2.72 0 3.06.01 4.12.06 1.07.05 1.8.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.64.42 1.36.47 2.43C21.99 8.94 22 9.28 22 12s-.01 3.06-.06 4.12c-.05 1.07-.22 1.8-.47 2.43a4.9 4.9 0 01-1.15 1.77 4.9 4.9 0 01-1.77 1.15c-.64.25-1.36.42-2.43.47C15.06 21.99 14.72 22 12 22s-3.06-.01-4.12-.06c-1.07-.05-1.8-.22-2.43-.47a4.9 4.9 0 01-1.77-1.15 4.9 4.9 0 01-1.15-1.77c-.25-.64-.42-1.36-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.07.22-1.8.47-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 015.45 2.53c.64-.25 1.36-.42 2.43-.47C8.94 2.01 9.28 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-8.38a1.17 1.17 0 100-2.34 1.17 1.17 0 000 2.34z" />
  ),
  facebook: (
    <path d="M13.5 21v-8.1h2.72l.41-3.16H13.5V7.75c0-.92.25-1.54 1.57-1.54h1.68V3.4C16.46 3.32 15.5 3.25 14.4 3.25c-2.3 0-3.87 1.4-3.87 3.98v2.51H8v3.16h2.53V21h2.97z" />
  ),
  youtube: (
    <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.4 3.5 12 3.5 12 3.5s-7.4 0-9.4.6A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c2 .6 9.4.6 9.4.6s7.4 0 9.4-.6a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
  ),
};

export default function Footer() {
  const socialEntries = Object.entries(site.social).filter(([, url]) => url);

  return (
    <footer className="holo-mesh mt-auto">
      <div className="container-vx py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <Image src={site.brand.logo} alt="" width={32} height={32} />
              <span className="font-display text-lg font-semibold text-white">
                {site.brand.name}
              </span>
            </div>
            <p className="mt-3 text-sm text-white/65">{site.brand.tagline}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Contact</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/65">
              <li>
                <a href={`mailto:${site.contact.email}`} className="hover:text-white">
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.contact.phone}`} className="hover:text-white">
                  {site.contact.phone}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Address</h3>
            <p className="mt-3 text-sm text-white/65">{site.contact.address}</p>
          </div>

          {socialEntries.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-white">Follow</h3>
              <div className="mt-3 flex gap-3">
                {socialEntries.map(([name, url]) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="flex h-9 w-9 items-center justify-center rounded-full glass-dark text-white/80 transition-colors hover:text-white"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                      {socialIcons[name]}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-white/50">
          &copy; {new Date().getFullYear()} {site.brand.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
