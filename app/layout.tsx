import type { Metadata } from "next";
import { Bricolage_Grotesque, Public_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { site } from "@/content/site";
import CalProvider from "@/components/CalProvider";
import AnalyticsEvents from "@/components/AnalyticsEvents";
import JsonLd from "@/components/JsonLd";
import { GoogleAnalytics } from "@next/third-parties/google";
import { organizationJsonLd, siteUrl } from "@/lib/seo";

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

const homeTitle = `${site.brand.name} | ${site.brand.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: homeTitle, template: `%s | ${site.brand.name}` },
  description: site.seo.description,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/images/brand/apple-touch-icon.png",
  },
  openGraph: {
    title: homeTitle,
    description: site.seo.description,
    url: siteUrl,
    siteName: site.brand.name,
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: site.seo.ogImageAlt }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: site.seo.description,
    images: [{ url: "/images/og.jpg", alt: site.seo.ogImageAlt }],
  },
};

// GA4 measurement ID (G-XXXXXXX), set in Vercel env. Analytics stay off until it's set.
const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${publicSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-slate">
        <JsonLd data={organizationJsonLd()} />
        <CalProvider />
        {children}
        <Analytics />
        {gaId && <GoogleAnalytics gaId={gaId} />}
        <AnalyticsEvents />
      </body>
    </html>
  );
}
