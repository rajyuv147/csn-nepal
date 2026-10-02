import type { Metadata } from "next";
import { metaFor } from "@/lib/seo";
import Link from "next/link";
import { PageHero, DonateBand } from "@/components/site";
import { Card, Badge, Button } from "@/components/ui";
import { FileText, DownloadSimple } from "@phosphor-icons/react/dist/ssr";

const SHEETS = [
  {
    title: "नेपालमा बालबालिकाको अवस्था २०७३",
    meta: "PDF • Situation of children in Nepal, 2073 BS",
    body: "National-level snapshot of children's status — survival, protection, development and participation indicators in Nepali.",
  },
  {
    title: "Child Protection Policy of CSN",
    meta: "PDF • Organisational policy",
    body: "CSN's own child-protection commitments: safe recruitment, conduct, reporting and referral for every staff member and volunteer.",
  },
  {
    title: "National Child Policy 2069",
    meta: "PDF • Government of Nepal policy",
    body: "The Government of Nepal's National Child Policy 2069 BS — the framework guiding child-friendly governance and services.",
  },
];

export const metadata: Metadata = metaFor("/news/fact-sheets");

export default function Page() {
  return (
    <>
      <PageHero
        kicker="News & Media • Reference"
        title="Fact Sheets"
        intro="Short reference documents — the situation of children, our protection standards, and the national policy frame."
      />
      <section className="max-w-5xl mx-auto px-4 py-14 space-y-6">
        {SHEETS.map((s) => (
          <Card key={s.title} className="p-7 flex flex-col md:flex-row md:items-center gap-6">
            <span className="grid place-items-center w-14 h-14 rounded-2xl bg-[#e7f3ec] text-[#01723b] shrink-0">
              <FileText size={28} weight="duotone" />
            </span>
            <div className="flex-1">
              <Badge>{s.meta}</Badge>
              <h2 className="font-display text-xl font-semibold mt-3">{s.title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[#043d24]/70">{s.body}</p>
            </div>
            <Button asChild variant="primary" size="md" className="shrink-0">
              <Link href="#">
                <DownloadSimple size={17} /> Download
              </Link>
            </Button>
          </Card>
        ))}
      </section>
      <DonateBand />
    </>
  );
}
