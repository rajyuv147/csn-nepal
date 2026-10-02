import { PageHero, SectionHeading, DonateBand } from "@/components/site";
import { Card, Badge } from "@/components/ui";
import {
  OBJECTIVES,
  STRATEGIES,
  CONTACT,
  MISSION,
  GOAL,
  NORMS,
  TARGET_GROUP,
  GOVERNANCE,
  HR_SUMMARY,
} from "@/lib/data";
import {
  CheckCircle,
  Compass,
  Eye,
  Target,
  MapPin,
  Users,
  Scales,
  Buildings,
} from "@phosphor-icons/react/dist/ssr";

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About us • CSN in brief"
        title="A youth-led non-profit for Nepal's most vulnerable"
        intro="Non-profit, non-partisan and non-governmental — established 2013 by young development professionals to empower children, women and youth."
      />
      <section className="max-w-7xl mx-auto px-4 py-14 grid lg:grid-cols-2 gap-8">
        <Card className="p-8">
          <SectionHeading eyebrow="Identity" title="Who we are" />
          <p className="mt-4 leading-relaxed text-[#043d24]/80">
            Co-operation Society Nepal (CSN) is a youth-led organisation established in 2013 A.D.
            (2070 B.S.) and registered as a non-profit, non-political, non-governmental
            organisation at the District Administration Office, Nuwakot ({CONTACT.regd}),
            affiliated with the Social Welfare Council ({CONTACT.swc}), Kathmandu.{" "}
            {CONTACT.pan}.
          </p>
          <p className="mt-4 leading-relaxed text-[#043d24]/80">
            CSN is dedicated to promoting human rights and increasing access to basic social
            services — education, health, WASH and livelihoods — for poor, marginalised and
            vulnerable people including children, youths, women and differently-abled persons.
            It adopts a rights-based approach through social mobilisation and technical
            backstopping: strengthening service-delivery mechanisms, promoting local
            technologies, and conserving natural resources for sustainable development.
          </p>
          <p className="mt-4 leading-relaxed text-[#043d24]/80">
            CSN directly works with local governments (rural municipalities / municipalities),
            district-level government line agencies, civil society and target communities.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["NGO", "Youth-led", "Non-profit", "Non-partisan", "Rights-based", "Community-rooted"].map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </Card>
        <div className="space-y-4">
          <Card className="p-8 border-l-8 !border-l-[#f6b231]">
            <p className="flex items-center gap-2 font-bold text-[#157a48]"><Eye size={19} /> Vision</p>
            <p className="font-display text-xl mt-2 leading-relaxed">
              Development of self-sustained communities where people are empowered and
              self-dependent and social practices are non-discriminatory and equitable.
            </p>
          </Card>
          <Card className="p-8 border-l-8 !border-l-[#157a48]">
            <p className="flex items-center gap-2 font-bold text-[#157a48]"><Compass size={19} /> Mission</p>
            <p className="text-lg mt-2 leading-relaxed">{MISSION}</p>
          </Card>
          <Card className="p-8 border-l-8 !border-l-[#419368]">
            <p className="flex items-center gap-2 font-bold text-[#157a48]"><Target size={19} /> Goal</p>
            <p className="text-lg mt-2 leading-relaxed">{GOAL}</p>
          </Card>
        </div>
      </section>

      <section className="bg-[#e7f3ec] border-y border-[#01723b]/10">
        <div className="max-w-7xl mx-auto px-4 py-14 grid lg:grid-cols-2 gap-8">
          <div>
            <SectionHeading eyebrow="Objectives" title="What we set out to do" />
            <ul className="mt-6 space-y-2.5">
              {OBJECTIVES.map((o) => (
                <li key={o} className="flex gap-2.5 bg-white rounded-2xl border border-[#01723b]/10 px-4 py-3 text-[15px]">
                  <CheckCircle size={19} weight="fill" className="text-[#157a48] shrink-0 mt-0.5" /> {o}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="How we work" title="Strategies & approaches" body="To fulfil the aims and objectives above, CSN implements the following schemes." />
            <div className="mt-6 flex flex-wrap gap-2">
              {STRATEGIES.map((s) => (
                <span key={s} className="rounded-full bg-[#032e1a] text-white text-[13.5px] font-medium px-4 py-2">{s}</span>
              ))}
            </div>

            <div className="mt-8">
              <SectionHeading eyebrow="Norms & values" title="What guides us" />
              <ul className="mt-4 space-y-2.5">
                {NORMS.map((n) => (
                  <li key={n} className="flex gap-2.5 bg-white rounded-2xl border border-[#01723b]/10 px-4 py-3 text-[15px]">
                    <Scales size={19} weight="fill" className="text-[#d19406] shrink-0 mt-0.5" /> {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-14 grid lg:grid-cols-2 gap-8">
        <Card className="p-8">
          <p className="flex items-center gap-2 font-bold text-[#157a48]"><Users size={19} /> Target group</p>
          <p className="mt-3 leading-relaxed text-[#043d24]/80">{TARGET_GROUP}</p>
          <p className="mt-5 flex items-center gap-2 font-bold text-[#157a48]"><MapPin size={19} /> Working districts</p>
          <p className="mt-2 leading-relaxed text-[#043d24]/80">{CONTACT.workingDistricts}</p>
          <p className="mt-2 text-sm text-[#043d24]/60">Head office: {CONTACT.headOffice}. Contact office: {CONTACT.branchOffice}.</p>
        </Card>
        <div className="space-y-4">
          <Card className="p-8">
            <p className="flex items-center gap-2 font-bold text-[#157a48]"><Buildings size={19} /> Governance</p>
            <p className="mt-3 leading-relaxed text-[#043d24]/80">{GOVERNANCE}</p>
          </Card>
          <Card className="p-8 bg-[#fdeecd] !border-[#f6b231]/40">
            <p className="flex items-center gap-2 font-bold text-[#157a48]"><Users size={19} /> Human resources</p>
            <p className="mt-3 leading-relaxed text-[#043d24]/80">{HR_SUMMARY}</p>
          </Card>
        </div>
      </section>

      <div className="pb-14"><DonateBand /></div>
    </>
  );
}
