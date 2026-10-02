import type { Metadata } from "next";
import { Fraunces, Public_Sans, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site";
import { SiteFooter } from "@/components/site";

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

export const metadata: Metadata = {
  title: {
    default: "Co-operation Society Nepal (CSN) — Empowering Children, Women & Communities",
    template: "%s | CSN Nepal",
  },
  description:
    "CSN Nepal is a non-profit social development organisation (est. 2013, Nuwakot) working in child protection, education, health, livelihood, DRR and community empowerment.",
  metadataBase: new URL("https://csnnepal.org.np"),
  icons: { icon: "/logo.png", apple: "/logo.png" },
  openGraph: {
    title: "Co-operation Society Nepal (CSN)",
    description: "Self-sustained, empowered and equitable communities across Nepal.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${nepali.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#fffdf7] text-[#10231a]">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
