import { PageHero, DonateBand, SectionHeading } from "@/components/site";
import { Card, Badge } from "@/components/ui";
import {
  EXECUTIVE_BOARD,
  EXECUTIVE_DIRECTOR,
  FOUNDER_BOARD,
  FORMER_BOARD,
} from "@/lib/data";
import { UserCircle, GraduationCap, Briefcase, Crown } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import { metaFor } from "@/lib/seo";

export const metadata: Metadata = metaFor("/about/executive-board");

export default function Page() {
  return (
    <>
      <PageHero kicker="About • Governance" title="Executive Board" intro="Elected leadership guiding CSN's strategy, accountability and community trust — as listed in the CSN organisational profile." />
      <section className="max-w-5xl mx-auto px-4 py-14 space-y-10">
        <div>
          <h2 className="font-display text-2xl font-semibold mb-4">Current Executive Board</h2>
          <Card className="overflow-hidden">
            {EXECUTIVE_BOARD.map((r, i) => (
              <div key={r.name} className={`flex items-start gap-4 px-6 py-5 ${i % 2 ? "bg-[#e7f3ec]/60" : "bg-white"}`}>
                <UserCircle size={36} weight="duotone" className="text-[#01723b] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-bold">{r.name}</p>
                  <p className="text-sm text-[#043d24]/60">{r.role}</p>
                  <p className="mt-1.5 flex items-start gap-1.5 text-sm text-[#043d24]/75">
                    <GraduationCap size={16} className="shrink-0 mt-0.5 text-[#157a48]" />
                    <span><strong>Qualification:</strong> {r.qualification}</span>
                  </p>
                  <p className="mt-1 flex items-start gap-1.5 text-sm text-[#043d24]/75">
                    <Briefcase size={16} className="shrink-0 mt-0.5 text-[#157a48]" />
                    <span><strong>Experience:</strong> {r.experience}</span>
                  </p>
                </div>
                <Badge>{r.role}</Badge>
              </div>
            ))}
          </Card>
        </div>

        <div>
          <h2 className="font-display text-2xl font-semibold mb-4">Executive Director</h2>
          <Card className="p-6 flex items-start gap-4 border-l-8 !border-l-[#f6b231]">
            <Crown size={36} weight="duotone" className="text-[#d19406] shrink-0" />
            <div>
              <p className="font-bold text-lg">{EXECUTIVE_DIRECTOR.name}</p>
              <p className="text-sm text-[#043d24]/60">{EXECUTIVE_DIRECTOR.role}</p>
              <p className="mt-2 text-sm text-[#043d24]/75">
                <strong>Qualification:</strong> {EXECUTIVE_DIRECTOR.qualification}
              </p>
              <p className="mt-1 text-sm text-[#043d24]/75">
                <strong>Experience:</strong> {EXECUTIVE_DIRECTOR.experience}
              </p>
            </div>
          </Card>
        </div>

        <div>
          <h2 className="font-display text-2xl font-semibold mb-4">Founder Executive Board</h2>
          <Card className="overflow-hidden">
            {FOUNDER_BOARD.map((r, i) => (
              <div key={r.name} className={`flex items-center gap-4 px-6 py-4 ${i % 2 ? "bg-[#e7f3ec]/60" : "bg-white"}`}>
                <UserCircle size={34} weight="duotone" className="text-[#01723b] shrink-0" />
                <div className="flex-1">
                  <p className="font-bold">{r.name}</p>
                  <p className="text-sm text-[#043d24]/60">{r.role}</p>
                </div>
                <Badge>{r.role}</Badge>
              </div>
            ))}
          </Card>
        </div>

        <div>
          <SectionHeading
            eyebrow="Archive"
            title="Previous board (website archive, 2024)"
            body="Kept for record — as listed on the previous website before the current profile board."
          />
          <div className="mt-4">
            <Card className="overflow-hidden">
              {FORMER_BOARD.map((r, i) => (
                <div key={`${r.name}-${r.role}`} className={`flex items-center gap-4 px-6 py-4 ${i % 2 ? "bg-[#fdeecd]/50" : "bg-white"}`}>
                  <UserCircle size={34} weight="duotone" className="text-[#419368] shrink-0" />
                  <div className="flex-1">
                    <p className="font-bold">{r.name}</p>
                    <p className="text-sm text-[#043d24]/60">{r.role}</p>
                  </div>
                  <Badge>{r.role}</Badge>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </section>
      <DonateBand />
    </>
  );
}
