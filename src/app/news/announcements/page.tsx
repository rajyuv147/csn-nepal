import type { Metadata } from "next";
import { metaFor } from "@/lib/seo";
import { PageHero, DonateBand } from "@/components/site";
import { Card, Badge } from "@/components/ui";
import { Briefcase, CalendarBlank } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = metaFor("/news/announcements");

export default function Page() {
  return (
    <>
      <PageHero
        kicker="News & Media • Notices"
        title="Announcements"
        intro="Vacancies, quotation calls and public notices from Co-operation Society Nepal."
      />
      <section className="max-w-5xl mx-auto px-4 py-14 space-y-6">
        <Card className="p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>
              <CalendarBlank size={15} /> Aug 25, 2017
            </Badge>
            <Badge className="bg-[#f6b231]/15 border-[#b97d00]/20 text-[#7a5200]">
              <Briefcase size={15} /> Vacancy
            </Badge>
          </div>
          <h2 className="font-display text-2xl font-semibold mt-4">Vacancy Announcement</h2>
          <p className="mt-2 text-sm font-semibold text-[#043d24]/60">
            First published 22/08/2017
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-[#043d24]/75">
            Co-operation Society Nepal (CSN) — a DAO Nuwakot and Social Welfare Council registered
            NGO — invited applications for the Community Infrastructure and Livelihood Support
            Program run with Panchakanya Rural Municipality, Nuwakot. Positions supported
            community mobilisation, engineering supervision and livelihood recovery at ward level.
          </p>
          <ul className="mt-4 space-y-2 text-[15px] text-[#043d24]/75 leading-relaxed list-disc pl-5">
            <li>Program: Community Infrastructure and Livelihood Support Program</li>
            <li>Partner: Panchakanya Rural Municipality, Nuwakot</li>
            <li>Organisation: SWC-affiliated NGO registered at DAO Nuwakot</li>
          </ul>
        </Card>
        <Card className="p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>
              <CalendarBlank size={15} /> Sep 1, 2020
            </Badge>
            <Badge className="bg-[#f6b231]/15 border-[#b97d00]/20 text-[#7a5200]">
              <Briefcase size={15} /> Quotation call
            </Badge>
          </div>
          <h2 className="font-display text-2xl font-semibold mt-4">Quotation Call Notice</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#043d24]/75">
            CSN called for sealed quotations for COVID-19 response materials in Nuwakot, carried out
            with Sunrise Children&apos;s Association Inc. (SCAI) Australia — covering hygiene kits,
            food support and emergency supplies for vulnerable families.
          </p>
        </Card>
      </section>
      <DonateBand />
    </>
  );
}
