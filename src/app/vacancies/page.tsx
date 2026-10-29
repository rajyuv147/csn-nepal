import type { Metadata } from "next";
import Link from "next/link";
import { metaFor } from "@/lib/seo";
import { FaqSection } from "@/components/faq";
import { PageHero, DonateBand } from "@/components/site";
import { Card, Badge, Button } from "@/components/ui";
import { VACANCIES, applyMailto } from "@/lib/data";
import {
  Briefcase,
  MapPin,
  UsersThree,
  CalendarBlank,
  EnvelopeSimple,
  FileText,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = metaFor("/vacancies");

const FAQS = [
  {
    question: "How do I apply for a job at CSN Nepal?",
    answer:
      "Open the vacancy, read the full job description, then email your CV and application letter to csnnepal@gmail.com. Use the position title in the email subject.",
  },
  {
    question: "Are CSN Nepal vacancies open until a deadline?",
    answer:
      "Each vacancy lists its own deadline. Current flood-response positions are open on a rolling basis until filled, and qualified candidates may be added to a roster and contacted as needs arise.",
  },
  {
    question: "Who is encouraged to apply?",
    answer:
      "CSN especially encourages qualified women, local residents, people with disabilities and candidates from marginalised communities to apply.",
  },
  {
    question: "Does CSN Nepal check candidates' backgrounds?",
    answer:
      "Selected candidates must follow CSN's child protection, safeguarding and PSEA policies and code of conduct, and background or reference checks may be carried out.",
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        kicker="Careers • Join our team"
        title="Vacancies"
        intro="Current openings at Co-operation Society Nepal. Read the job description, then email your CV and application letter to apply."
      />
      <section className="max-w-5xl mx-auto px-4 py-14 space-y-6">
        <p className="text-sm font-semibold text-[#043d24]/60">
          {VACANCIES.length} open {VACANCIES.length === 1 ? "vacancy" : "vacancies"}
        </p>
        {VACANCIES.length === 0 && (
          <Card className="p-8">
            <p className="text-[15px] text-[#043d24]/75">
              There are no open vacancies right now. Please check back soon.
            </p>
          </Card>
        )}
        {VACANCIES.map((v) => (
          <Card key={v.slug} className="p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-[#f6b231]/15 border-[#b97d00]/20 text-[#7a5200]">
                <Briefcase size={15} /> Vacancy
              </Badge>
              <Badge>
                <CalendarBlank size={15} /> {v.deadline}
              </Badge>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold mt-4">
              <Link href={`/vacancies/${v.slug}`} className="hover:text-[#01723b]">
                {v.title}
              </Link>
            </h2>
            {v.titleNe && (
              <p lang="ne" className="mt-1 text-lg font-medium text-[#043d24]/70">
                {v.titleNe}
              </p>
            )}
            <p className="mt-2 text-sm font-semibold text-[#157a48]">{v.project}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-[#043d24]/75">{v.summary}</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-3 text-sm text-[#043d24]/80">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="text-[#01723b] shrink-0 mt-0.5" /> {v.location}
              </li>
              <li className="flex items-start gap-2">
                <UsersThree size={18} className="text-[#01723b] shrink-0 mt-0.5" /> {v.positions} positions
              </li>
              <li className="flex items-start gap-2">
                <CalendarBlank size={18} className="text-[#01723b] shrink-0 mt-0.5" /> {v.contract}
              </li>
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild>
                <Link href={`/vacancies/${v.slug}`}>
                  View details <ArrowRight size={17} />
                </Link>
              </Button>
              <Button asChild variant="sun">
                <a href={applyMailto(v)}>
                  <EnvelopeSimple size={17} /> Apply: {v.applyEmail}
                </a>
              </Button>
              {v.jobDescriptionUrl && (
                <Button asChild variant="outline">
                  <a href={v.jobDescriptionUrl} target="_blank" rel="noopener noreferrer">
                    <FileText size={17} /> Job description
                  </a>
                </Button>
              )}
            </div>
          </Card>
        ))}
      </section>
      <FaqSection faqs={FAQS} />
      <DonateBand />
    </>
  );
}
