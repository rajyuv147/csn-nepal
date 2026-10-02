import type { Metadata } from "next";
import { metaFor } from "@/lib/seo";
import { PageHero, DonateBand } from "@/components/site";
import { Card, Badge } from "@/components/ui";
import { POLICIES } from "@/lib/data";
import { FileText } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = metaFor("/resources/policies");

export default function Page() {
  return (
    <>
      <PageHero
        kicker="Resources • Governance"
        title="Acts & Policies"
        intro="The legal and policy foundations that guide our work with children and communities."
      />
      <section className="max-w-5xl mx-auto px-4 py-14 space-y-8">
        <Card className="p-6 border-l-8 border-l-[#f6b231]">
          <Badge>Internal governance</Badge>
          <p className="mt-3 text-[15px] text-[#043d24]/70 leading-relaxed">
            CSN operates under these 8 governing policies and strategies from its
            organisational profile. Copies are shared on request — email
            csnnepal@gmail.com.
          </p>
        </Card>
        <div className="grid gap-5 md:grid-cols-2">
          {POLICIES.map((policy, i) => (
            <Card key={policy} className="p-7">
              <div className="flex items-start justify-between gap-3">
                <FileText size={34} weight="duotone" className="text-[#01723b]" />
                <span className="text-xs font-bold rounded-full bg-[#fdeecd] text-[#043d24] px-3 py-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-bold text-lg mt-4">{policy}</h3>
              <p className="text-sm text-[#043d24]/70 mt-2 leading-relaxed">
                Official CSN governance document — applied across all programs and field
                offices.
              </p>
            </Card>
          ))}
        </div>
      </section>
      <DonateBand />
    </>
  );
}
