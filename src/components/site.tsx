"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  EnvelopeSimple,
  Phone,
  MapPin,
  List,
  X,
  CaretDown,
  FacebookLogo,
  TwitterLogo,
  LinkedinLogo,
  YoutubeLogo,
  Heart,
  ArrowRight,
} from "@phosphor-icons/react";
import { CONTACT, NAV } from "@/lib/data";
import { Button } from "./ui";
import { cn } from "./ui";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" aria-label="Co-operation Society Nepal — home" className="shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="Co-operation Society Nepal (CSN) — सहकार्य समाज नेपाल"
        className={
          dark
            ? "h-12 md:h-14 w-auto rounded-xl bg-white px-2 py-1 shadow-sm"
            : "h-12 md:h-[52px] w-auto rounded-xl bg-white px-2 py-1 shadow-sm border border-[#01723b]/10"
        }
      />
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState<string | null>(null);
  const path = usePathname();
  return (
    <>
      <div className="bg-[#032e1a] text-white/90 text-[13px]">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center gap-x-6 gap-y-1 justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span className="inline-flex items-center gap-1.5">
              <EnvelopeSimple size={15} className="text-[#f6b231]" /> {CONTACT.email[0]}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Phone size={15} className="text-[#f6b231]" /> {CONTACT.phoneTop}
            </span>
          </div>
          <span className="hidden md:inline-flex items-center gap-1.5">
            <MapPin size={15} className="text-[#f6b231]" /> {CONTACT.poBox}, Bidur-4, Battar, Nuwakot
          </span>
        </div>
      </div>
      <header className="sticky top-0 z-50 bg-[#fffdf7]/92 backdrop-blur-md border-b border-[#01723b]/10">
        <div className="max-w-7xl mx-auto px-4 h-[76px] flex items-center justify-between gap-4">
          <Logo />
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) =>
              n.children ? (
                <div
                  key={n.label}
                  className="relative"
                  onMouseEnter={() => setDrop(n.label)}
                  onMouseLeave={() => setDrop(null)}
                >
                  <Link
                    href={n.href}
                    className={cn(
                      "px-4 py-2.5 rounded-full text-[15px] font-semibold inline-flex items-center gap-1 hover:bg-[#e7f3ec] text-[#043d24]",
                      path.startsWith(n.href) && "bg-[#e7f3ec]"
                    )}
                  >
                    {n.label} <CaretDown size={13} />
                  </Link>
                  {drop === n.label && (
                    <div className="absolute top-full left-0 pt-2 min-w-60">
                      <div className="rounded-2xl bg-white border border-[#01723b]/10 shadow-xl p-2 overflow-hidden">
                        {n.children.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            className="block px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-[#e7f3ec] text-[#043d24]"
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={n.label}
                  href={n.href}
                  className="px-4 py-2.5 rounded-full text-[15px] font-semibold hover:bg-[#e7f3ec] text-[#043d24]"
                >
                  {n.label}
                </Link>
              )
            )}
          </nav>
          <div className="hidden lg:flex items-center gap-2">
            <Button asChild variant="sun" size="sm">
              <Link href="/donate">
                <Heart size={16} weight="fill" /> Donate
              </Link>
            </Button>
          </div>
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-[#e7f3ec]"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
        {open && (
          <div className="lg:hidden border-t border-[#01723b]/10 bg-[#fffdf7] px-4 py-4 space-y-1 max-h-[70vh] overflow-auto">
            {NAV.flatMap((n) => (n.children ? n.children : [n])).map((c) => (
              <Link
                key={c.href + c.label}
                href={c.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 rounded-xl font-medium hover:bg-[#e7f3ec]"
              >
                {c.label}
              </Link>
            ))}
            <Button asChild variant="sun" className="w-full mt-2">
              <Link href="/donate" onClick={() => setOpen(false)}>
                <Heart size={16} weight="fill" /> Donate now
              </Link>
            </Button>
          </div>
        )}
      </header>
    </>
  );
}

export function PageHero({
  kicker,
  title,
  intro,
}: {
  kicker: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#032e1a] text-white">
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #f6b231 0 2px, transparent 3px), radial-gradient(circle at 80% 60%, #419368 0 2px, transparent 3px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#f6b231]/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-16 w-[28rem] h-[28rem] rounded-full bg-[#157a48]/25 blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-20">
        <p className="inline-flex items-center gap-2 text-[13px] font-bold tracking-wide bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-5">
          <span className="w-2 h-2 rounded-full bg-[#f6b231]" /> {kicker}
        </p>
        <h1 className="font-display text-4xl md:text-[3.4rem] leading-[1.05] font-semibold max-w-3xl">
          {title}
        </h1>
        {intro && <p className="mt-4 text-white/75 text-lg max-w-2xl leading-relaxed">{intro}</p>}
      </div>
      <svg viewBox="0 0 1440 54" className="relative block w-full text-[#fffdf7]" preserveAspectRatio="none">
        <path
          d="M0,32 C240,54 480,0 720,22 C960,44 1200,10 1440,30 L1440,54 L0,54 Z"
          fill="currentColor"
        />
      </svg>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="flex items-center gap-2 text-[13px] font-bold text-[#157a48]">
        <span className="w-8 h-[3px] rounded-full bg-[#f6b231] inline-block" /> {eyebrow}
      </p>
      <h2 className="font-display text-3xl md:text-[2.6rem] leading-tight font-semibold mt-3">{title}</h2>
      {body && <p className="mt-3 text-[#043d24]/70 text-[17px] leading-relaxed">{body}</p>}
    </div>
  );
}

export function DonateBand() {
  return (
    <section className="max-w-7xl mx-auto px-4 pb-20">
      <div className="relative overflow-hidden rounded-[2rem] bg-[#01723b] text-white px-8 py-12 md:p-14 flex flex-col md:flex-row items-start md:items-center gap-8">
        <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-[#f6b231]/25 blur-2xl" />
        <div className="flex-1 relative">
          <p className="text-[#f6b231] font-bold text-sm">What we do for others remains and is immortal</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mt-2 leading-tight">
            Your gift keeps a child in school, a family together.
          </h2>
          <p className="text-white/75 mt-3 max-w-xl">
            CSN treats every donor with respect, honesty and openness — gifts are applied to their
            intended purpose with full accountability.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row md:flex-col gap-3 relative">
          <Button asChild variant="sun" size="lg">
            <Link href="/donate">
              Donate <ArrowRight size={18} />
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="text-white hover:bg-white/10 border border-white/25 rounded-full"
          >
            <Link href="/sponsor">Sponsor a child</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#032e1a] text-white/80">
      <div className="max-w-7xl mx-auto px-4 pt-14 pb-8 grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <Logo dark />
          <p className="mt-4 text-[15px] leading-relaxed text-white/65">
            A non-governmental, non-profit, non-political and non-religious social development
            organisation. Change is possible — let&apos;s start from today.
          </p>
          <div className="flex gap-2 mt-5">
            {[FacebookLogo, TwitterLogo, LinkedinLogo, YoutubeLogo].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social link"
                className="w-10 h-10 grid place-items-center rounded-full bg-white/10 hover:bg-[#f6b231] hover:text-[#032e1a] transition-colors"
              >
                <Icon size={19} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="font-bold text-white mb-4">Explore</p>
          <ul className="space-y-2.5 text-[15px]">
            {[
              ["Home", "/"],
              ["CSN in Brief", "/about"],
              ["Executive Board", "/about/executive-board"],
              ["Projects", "/programs/projects"],
              ["Press Releases", "/news/press-releases"],
              ["Gallery", "/gallery"],
            ].map(([l, h]) => (
              <li key={h + l}>
                <Link href={h} className="hover:text-[#f6b231]">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-bold text-white mb-4">Support</p>
          <ul className="space-y-2.5 text-[15px]">
            {[
              ["Donate", "/donate"],
              ["Sponsor", "/sponsor"],
              ["Volunteers", "/about/volunteers"],
              ["Partners", "/about/partners"],
              ["Contact", "/contact"],
            ].map(([l, h]) => (
              <li key={h + l}>
                <Link href={h} className="hover:text-[#f6b231]">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-bold text-white mb-4">Contact information</p>
          <ul className="space-y-2.5 text-[15px] text-white/70">
            <li>{CONTACT.headOffice}</li>
            <li>{CONTACT.branchOffice}</li>
            <li>{CONTACT.phones.join(" / ")}</li>
            <li>{CONTACT.email.join(", ")}</li>
            <li>{CONTACT.poBox}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row justify-between gap-2 text-[13px] text-white/50">
          <span>© {new Date().getFullYear()} Co-operation Society Nepal. All rights reserved.</span>
          <span>
            {CONTACT.regd} • {CONTACT.swc} • {CONTACT.pan}
          </span>
        </div>
      </div>
    </footer>
  );
}
