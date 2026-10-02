import { PageHero, DonateBand } from "@/components/site";
import { Card, Badge } from "@/components/ui";
import { PARTNERS } from "@/lib/data";
import { Handshake, ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import { metaFor } from "@/lib/seo";

export const metadata: Metadata = metaFor("/about/partners");

export default function Page() {
  return (
    <>
      <PageHero
        kicker="About • Collaboration"
        title="Partners"
        intro="Change is a team effort. These government bodies, UN agencies and grassroots organisations make our work possible."
      />
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PARTNERS.map((p) => (
            <Card key={p.name} className="p-7 flex flex-col gap-3">
              <span className="grid place-items-center w-12 h-12 rounded-2xl bg-[#e7f3ec] text-[#01723b]">
                <Handshake size={26} weight="duotone" />
              </span>
              <h3 className="font-bold text-lg leading-snug">{p.name}</h3>
              {p.web ? (
                <a
                  href={p.web}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#157a48] hover:underline break-all"
                >
                  Visit website <ArrowSquareOut size={15} />
                </a>
              ) : (
                <Badge className="self-start">Community partner</Badge>
              )}
            </Card>
          ))}
        </div>
      </section>
      <DonateBand />
    </>
  );
}
