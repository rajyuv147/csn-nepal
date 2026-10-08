import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { metaFor, SITE_URL, SITE_NAME } from "@/lib/seo";
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
  Phone,
  ShieldCheck,
  ArrowLeft,
} from "@phosphor-icons/react/dist/ssr";

export const dynamicParams = false;

export function generateStaticParams() {
  return VACANCIES.map((v) => ({ slug: v.slug }));
}

function findVacancy(slug: string) {
  return VACANCIES.find((v) => v.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/vacancies/[slug]">): Promise<Metadata> {
  const v = findVacancy((await params).slug);
  if (!v) return {};
  return metaFor(`/vacancies/${v.slug}`, {
    title: `${v.title} Vacancy — ${v.location} | CSN Nepal`,
    description: `${v.summary} ${v.deadline}.`,
  });
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <Card className="p-8">
      <h2 className="font-display text-2xl font-semibold">{title}</h2>
      <ul lang="ne" className="mt-4 space-y-2.5 text-[15px] text-[#043d24]/80 leading-relaxed list-disc pl-5">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </Card>
  );
}

export default async function Page({ params }: PageProps<"/vacancies/[slug]">) {
  const v = findVacancy((await params).slug);
  if (!v) notFound();

  const jobPosting = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: v.title,
    description: [v.summary, ...v.responsibilities, ...v.qualifications].join("\n"),
    datePosted: v.postedDate,
    employmentType: "TEMPORARY",
    hiringOrganization: { "@type": "Organization", name: SITE_NAME, sameAs: SITE_URL, logo: `${SITE_URL}/logo.png` },
    jobLocation: ["Rasuwa", "Nuwakot"].map((district) => ({
      "@type": "Place",
      address: { "@type": "PostalAddress", addressRegion: district, addressCountry: "NP" },
    })),
    directApply: false,
    url: `${SITE_URL}/vacancies/${v.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPosting) }}
      />
      <PageHero kicker="Vacancy Notice • कर्मचारी आवश्यकताको सूचना" title={v.title} intro={v.titleNe} />
      <section className="max-w-5xl mx-auto px-4 py-14 grid gap-6 lg:grid-cols-[1fr_320px] items-start">
        <div className="space-y-6 min-w-0">
          <Link
            href="/vacancies"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#01723b] hover:underline"
          >
            <ArrowLeft size={15} /> All vacancies
          </Link>
          <Card className="p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-[#f6b231]/15 border-[#b97d00]/20 text-[#7a5200]">
                <Briefcase size={15} /> {v.project}
              </Badge>
            </div>
            <p lang="ne" className="mt-5 text-[15px] leading-relaxed text-[#043d24]/80">
              {v.intro}
            </p>
          </Card>
          <Section title="Key responsibilities — मुख्य जिम्मेवारीहरू" items={v.responsibilities} />
          <Section
            title="Minimum qualifications & experience — आवश्यक न्यूनतम योग्यता र अनुभव"
            items={v.qualifications}
          />
          <Card className="p-8 bg-[#e7f3ec]/60">
            <h2 className="font-display text-2xl font-semibold flex items-center gap-2">
              <ShieldCheck size={26} className="text-[#01723b]" /> Child protection & safeguarding
            </h2>
            <p className="text-sm font-semibold text-[#043d24]/60 mt-1" lang="ne">
              बाल संरक्षण तथा सुरक्षा प्रतिबद्धता
            </p>
            <div lang="ne" className="mt-4 space-y-3 text-[15px] leading-relaxed text-[#043d24]/80">
              {v.safeguarding.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Card>
          <Card className="p-8">
            <h2 className="font-display text-2xl font-semibold">How to apply — आवेदन दिने प्रक्रिया</h2>
            <div lang="ne" className="mt-4 space-y-3 text-[15px] leading-relaxed text-[#043d24]/80">
              <p>{v.howToApply}</p>
              <ul className="space-y-1.5">
                <li>
                  इमेल:{" "}
                  <a href={applyMailto(v)} className="font-semibold text-[#01723b] underline">
                    {v.applyEmail}
                  </a>
                </li>
                <li>
                  फोन:{" "}
                  <a href="tel:+97710561001" className="font-semibold text-[#01723b] underline">
                    ०१०–५६१००१
                  </a>
                </li>
                <li>ठेगाना: सहकार्य समाज नेपाल (CSN), विदुर–४, बट्टार, नुवाकोट</li>
              </ul>
              <p>{v.closingNote}</p>
              <p className="font-semibold text-[#043d24]">{v.encouragement}</p>
            </div>
          </Card>
        </div>

        <aside className="order-first lg:order-last lg:sticky lg:top-24">
          <Card className="p-6">
            <h2 className="font-display text-xl font-semibold">Position details</h2>
            <dl className="mt-4 space-y-3.5 text-sm">
              {[
                { Icon: MapPin, label: "Duty station", value: v.location },
                { Icon: UsersThree, label: "Positions", value: v.positions },
                { Icon: CalendarBlank, label: "Contract", value: v.contract },
                { Icon: Briefcase, label: "Deadline", value: v.deadline },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="flex gap-2.5">
                  <Icon size={19} className="text-[#01723b] shrink-0 mt-0.5" />
                  <div>
                    <dt className="font-semibold text-[#043d24]">{label}</dt>
                    <dd className="text-[#043d24]/75">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex flex-col gap-3">
              <Button asChild variant="sun" className="w-full">
                <a href={applyMailto(v)}>
                  <EnvelopeSimple size={17} /> Apply by email
                </a>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <a href={v.jobDescriptionUrl} target="_blank" rel="noopener noreferrer">
                  <FileText size={17} /> Full job description
                </a>
              </Button>
            </div>
            <p className="mt-4 text-[13px] text-[#043d24]/60 leading-relaxed">
              Send your CV and application letter to{" "}
              <a href={applyMailto(v)} className="font-semibold text-[#01723b] whitespace-nowrap">
                {v.applyEmail}
              </a>
              . Questions? Call{" "}
              <a href="tel:+97710561001" className="font-semibold text-[#01723b] inline-flex items-center gap-1">
                <Phone size={13} /> 010-561001
              </a>
              .
            </p>
          </Card>
        </aside>
      </section>
      <DonateBand />
    </>
  );
}
