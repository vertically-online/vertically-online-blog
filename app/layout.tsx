import type { Metadata } from "next";
import { Bricolage_Grotesque, Public_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { site } from "@/content/site";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vertically.online";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${site.brand.name} | ${site.brand.tagline}`,
  description: site.hero.subheadline,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/images/brand/apple-touch-icon.png",
  },
  openGraph: {
    title: `${site.brand.name} | ${site.brand.tagline}`,
    description: site.hero.subheadline,
    url: siteUrl,
    siteName: site.brand.name,
    images: [{ url: "/images/og.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brand.name} | ${site.brand.tagline}`,
    description: site.hero.subheadline,
    images: ["/images/og.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.brand.name,
    description: site.brand.tagline,
    email: site.contact.email,
    telephone: site.contact.phoneHref.replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.contact.addressLocality,
      addressRegion: site.contact.addressRegion,
    },
    url: siteUrl,
    sameAs: Object.values(site.social).filter(Boolean),
  };

  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${publicSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-glacier text-slate">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
