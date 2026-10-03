import Link from "next/link";
import type { Metadata } from "next";
import { metaFor } from "@/lib/seo";
import {
  ArrowRight,
  Baby,
  BookOpen,
  Users,
  Heartbeat,
  Plant,
  House,
  Leaf,
  Mountains,
  Quotes,
  Megaphone,
  HandHeart,
  MapPin,
  Package,
  Drop,
  Briefcase,
  HeartHandshake,
} from "@phosphor-icons/react/dist/ssr";
import { Badge, Button, Card } from "@/components/ui";
import { SectionHeading, DonateBand } from "@/components/site";
import HeroSlider from "@/components/hero-slider";
import { PROGRAM_AREAS, PROJECTS, NEWS, COVID_MESSAGES, CONTACT } from "@/lib/data";

const ICONS: Record<string, React.ReactNode> = {
  Baby: <Baby size={26} weight="duotone" />,
  BookOpen: <BookOpen size={26} weight="duotone" />,
  Users: <Users size={26} weight="duotone" />,
  HeartPulse: <Heartbeat size={26} weight="duotone" />,
  Sprout: <Plant size={26} weight="duotone" />,
  House: <House size={26} weight="duotone" />,
  Leaf: <Leaf size={26} weight="duotone" />,
  Mountain: <Mountains size={26} weight="duotone" />,
};

const HERO_IMG =
  "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1200&auto=format&fit=crop";

export const metadata: Metadata = metaFor("/");

export default function Home() {
  return (
    <>
      <HeroSlider />

      {/* BHOTEKOSHI FLOOD RESPONSE */}
      <section className="bg-[#032e1a] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 text-[13px] font-bold text-[#f6b231]">
              <span className="w-8 h-[3px] rounded-full bg-[#f6b231] inline-block" /> Emergency Response
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold mt-3 leading-tight">
              Bhotekoshi Flood Response
            </h2>
            <p className="mt-3 text-white/70 text-lg">
              CSN Response Update – Nuwakot &amp; Rasuwa
            </p>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: <Baby size={26} weight="duotone" />,
                title: "Child Protection",
                lines: ["15 CFS", "427 children/students supported"],
              },
              {
                icon: <Package size={26} weight="duotone" />,
                title: "Relief Assistance",
                lines: ["55 Baby Kits", "125 Food Packages", "50 WASH Kits", "200 Dignity Kits"],
              },
              {
                icon: <Users size={26} weight="duotone" />,
                title: "Community Support",
                lines: ["499 households", "2,155 people reached"],
              },
              {
                icon: <Drop size={26} weight="duotone" />,
                title: "WASH & Water Support",
                lines: ["Water storage and WASH facilities established across affected communities", "5"],
              },
              {
                icon: <Briefcase size={26} weight="duotone" />,
                title: "Livelihood Support",
                lines: ["50 people supported through Cash-for-Work"],
              },
              {
                icon: <HeartHandshake size={26} weight="duotone" />,
                title: "Volunteers",
                lines: ["157 volunteers mobilized for relief, child protection, WASH, community support and other response activities"],
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl bg-white/[.06] border border-white/10 p-6"
              >
                <span className="w-12 h-12 grid place-items-center rounded-2xl bg-white/10 text-[#f6b231]">
                  {item.icon}
                </span>
                <h3 className="font-display font-semibold text-xl mt-4">{item.title}</h3>
                <div className="mt-2 space-y-1">
                  {item.lines.map((line) => (
                    <p key={line} className="text-sm text-white/70 leading-relaxed">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl bg-white/[.06] border border-white/10 px-6 py-5">
            <p className="text-[13px] font-bold text-[#f6b231] uppercase tracking-wider">
              Response at a Glance
            </p>
            <div className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
              {[
                "15 CFS",
                "427 Children/Students",
                "499 Households",
                "2,155 People Reached",
                "WASH 5",
                "157 Volunteers",
              ].map((stat) => (
                <span key={stat} className="font-display font-semibold text-lg text-white">
                  {stat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE ARE strip */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-20 grid lg:grid-cols-[.9fr_1.1fr] gap-10 items-start">
        <SectionHeading
          eyebrow="Who we are"
          title="A young team doing patient, community-rooted work"
          body="CSN is a non-governmental, non-profit, non-political and non-religious organisation founded by young, energetic development professionals."
        />
        <Card className="p-7 md:p-9 leading-relaxed text-[16px] text-[#043d24]/80">
          <p>
            We work with the most vulnerable, poorest of the poor and underprivileged people of
            remote, semi-urban and urban areas — on children, youth and women, health, education,
            livelihood, gender and cross-cutting agriculture, environment, tourism, disaster risk
            reduction, energy and infrastructure.
          </p>
          <p className="mt-4">
            <strong>Vision:</strong> self-sustained communities where people are empowered and
            self-dependent, and social practices are non-discriminatory and equitable.{" "}
            <strong>Mission:</strong> to act as a development partner turning backward communities
            into prosperous ones through holistic initiatives.
          </p>
          <p className="mt-4 text-sm text-[#043d24]/60">
            {CONTACT.regd} • {CONTACT.swc} • {CONTACT.pan}
          </p>
          <Button asChild variant="outline" size="sm" className="mt-5">
            <Link href="/about">
              Read CSN in brief <ArrowRight size={15} />
            </Link>
          </Button>
        </Card>
      </section>

      {/* PROGRAM AREAS — not uniform SaaS cards: alternating editorial rows with icons */}
      <section className="bg-[#032e1a] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="flex items-center gap-2 text-[13px] font-bold text-[#f6b231]">
                <span className="w-8 h-[3px] rounded-full bg-[#f6b231] inline-block" /> Areas of work
              </p>
              <h2 className="font-display text-3xl md:text-5xl font-semibold mt-3 leading-tight">
                Eight threads, one fabric of care
              </h2>
            </div>
            <Button asChild variant="sun">
              <Link href="/programs">
                All programs <ArrowRight size={17} />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROGRAM_AREAS.map((p) => (
              <Link
                key={p.slug}
                href="/programs"
                className="group rounded-3xl bg-white/[.06] border border-white/10 p-6 hover:bg-[#f6b231] hover:text-[#032e1a] hover:border-[#f6b231] transition-colors"
              >
                <span className="w-12 h-12 grid place-items-center rounded-2xl bg-white/10 group-hover:bg-[#032e1a] group-hover:text-[#f6b231] text-[#f6b231]">
                  {ICONS[p.icon]}
                </span>
                <h3 className="font-display font-semibold text-xl mt-4">{p.title}</h3>
                <p className="text-sm mt-2 leading-relaxed opacity-70 line-clamp-3">{p.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <SectionHeading
          eyebrow="Projects"
          title="Long-term work, not one-off aid"
          body="From earthquake rescue to digital classrooms and UNDP-backed livelihood recovery — a few of the efforts that define CSN."
        />
        <div className="mt-8 grid md:grid-cols-2 gap-5">
          {PROJECTS.slice(0, 4).map((p) => (
            <Card key={p.title} className="p-7 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 text-[13px]">
                <span className="font-bold bg-[#032e1a] text-[#f6b231] rounded-full px-3 py-1">{p.tag}</span>
                <span className="text-[#043d24]/55 font-medium">{p.date}</span>
              </div>
              <h3 className="font-display font-semibold text-[1.35rem] leading-snug mt-3">{p.title}</h3>
              <p className="text-[15px] text-[#043d24]/70 mt-2 leading-relaxed">{p.excerpt}</p>
            </Card>
          ))}
        </div>
        <Button asChild variant="outline" className="mt-8">
          <Link href="/programs/projects">
            View all projects <ArrowRight size={17} />
          </Link>
        </Button>
      </section>

      {/* COVID messages — Nepali voice preserved */}
      <section className="bg-[#e7f3ec] border-y border-[#01723b]/10">
        <div className="max-w-7xl mx-auto px-4 py-14 grid lg:grid-cols-[.8fr_1.2fr] gap-8 items-center">
          <div>
            <p className="flex items-center gap-2 text-[13px] font-bold text-[#157a48]">
              <Megaphone size={17} /> Community message
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mt-2">
              Protecting children through the pandemic
            </h2>
            <p className="mt-3 text-[#043d24]/70">
              Messages CSN carried to every ward during COVID-19 — kept here in their original
              Nepali.
            </p>
          </div>
          <ul className="space-y-3">
            {COVID_MESSAGES.map((m) => (
              <li key={m} className="bg-white rounded-2xl border border-[#01723b]/10 px-5 py-3.5 text-[15px] flex gap-3">
                <Quotes size={18} weight="fill" className="text-[#d19406] shrink-0 mt-0.5" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* NEWS */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="News & media" title="CSN in action" />
          <Button asChild variant="ghost">
            <Link href="/news">
              All news <ArrowRight size={17} />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {NEWS.slice(0, 3).map((n) => (
            <Card key={n.title} className="p-6 flex flex-col">
              <p className="text-[13px] font-bold text-[#157a48]">{n.date} • {n.tag}</p>
              <h3 className="font-display font-semibold text-lg leading-snug mt-2">{n.title}</h3>
              <p className="text-sm text-[#043d24]/65 mt-2 line-clamp-3">{n.excerpt}</p>
              <Link href="/news" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#01723b]">
                Read more <ArrowRight size={15} />
              </Link>
            </Card>
          ))}
        </div>
        <div className="mt-10 flex items-center gap-3 rounded-3xl bg-[#fdeecd] border border-[#d19406]/30 px-6 py-5">
          <HandHeart size={30} className="text-[#8a5c00] shrink-0" weight="duotone" />
          <p className="text-[15px]">
            <strong>Always get connected:</strong> change is possible — let&apos;s start from today.{" "}
            <Link href="/contact" className="font-bold underline underline-offset-2">Get in touch</Link> or{" "}
            <Link href="/news/announcements" className="font-bold underline underline-offset-2">see vacancy announcements</Link>.
          </p>
        </div>
      </section>

      <DonateBand />
    </>
  );
}
