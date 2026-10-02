import { PageHero, DonateBand } from "@/components/site";
import { Card } from "@/components/ui";
import { STAFF } from "@/lib/data";
import { IdentificationCard } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import { metaFor } from "@/lib/seo";

export const metadata: Metadata = metaFor("/about/staff");

export default function Page() {
  return (
    <>
      <PageHero
        kicker="About • Team"
        title="Staff Members"
        intro="The dedicated team carrying out CSN's child protection, education, livelihood and emergency work across Nuwakot."
      />
      <section className="max-w-5xl mx-auto px-4 py-14">
        <Card className="overflow-hidden">
          {STAFF.map((s, i) => (
            <div
              key={`${s.name}-${i}`}
              className={`flex items-center gap-4 px-6 py-5 ${i % 2 ? "bg-[#e7f3ec]/60" : ""}`}
            >
              <IdentificationCard size={34} weight="duotone" className="text-[#01723b] shrink-0" />
              <div>
                <p className="font-bold text-lg">{s.name}</p>
                <p className="text-sm text-[#043d24]/60">{s.role}</p>
              </div>
            </div>
          ))}
        </Card>
      </section>
      <DonateBand />
    </>
  );
}
