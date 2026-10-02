import type { Metadata, Viewport } from "next";
import { Fraunces, Public_Sans, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site";
import { SiteFooter } from "@/components/site";
import { OrganisationJsonLd } from "@/components/json-ld";
import { SITE_URL, SITE_NAME, OG_IMAGE } from "@/lib/seo";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const body = Public_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
const nepali = Noto_Sans_Devanagari({
  variable: "--font-nepali",
  subsets: ["devanagari"],
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  themeColor: "#01723b",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CSN Nepal — Empowering Children, Women & Communities",
    template: "%s | CSN Nepal",
  },
  description:
    "Co-operation Society Nepal (CSN) is a Nuwakot-based nonprofit (est. 2013) working in child protection, education, health, livelihood and disaster recovery.",
  keywords: [
    "CSN Nepal",
    "Co-operation Society Nepal",
    "Nuwakot NGO",
    "Nepal nonprofit",
    "child protection Nepal",
    "sponsor child Nepal",
    "donate Nepal",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { email: true, address: true, telephone: true },
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Co-operation Society Nepal (CSN)",
    description: "Self-sustained, empowered and equitable communities across Nepal.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Co-operation Society Nepal (CSN)",
    description: "Self-sustained, empowered and equitable communities across Nepal.",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${nepali.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#fffdf7] text-[#10231a]">
        <OrganisationJsonLd />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
