import { PageHero, DonateBand } from "@/components/site";
import { Card } from "@/components/ui";
import { ADVISORY_BOARD } from "@/lib/data";
import { SealCheck } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import { metaFor } from "@/lib/seo";

export const metadata: Metadata = metaFor("/about/advisory-board");

export default function Page() {
  return (
    <>
      <PageHero kicker="About • Guidance" title="Advisory Board" intro="Scientists, educators and child-rights activists who counsel CSN's direction." />
      <section className="max-w-5xl mx-auto px-4 py-14">
        <Card className="overflow-hidden">
          {ADVISORY_BOARD.map((a, i) => (
            <div key={a.name} className={`flex items-center gap-4 px-6 py-5 ${i % 2 ? "bg-[#e7f3ec]/60" : ""}`}>
              <SealCheck size={34} weight="duotone" className="text-[#b97d00] shrink-0" />
              <div>
                <p className="font-bold text-lg">{a.name}</p>
                <p className="text-sm text-[#043d24]/60">{a.detail} • {a.role}</p>
              </div>
            </div>
          ))}
        </Card>
      </section>
      <DonateBand />
    </>
  );
}
