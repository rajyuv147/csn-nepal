import type { Metadata } from "next";
import { metaFor } from "@/lib/seo";
import { PageHero, DonateBand } from "@/components/site";
import { Card, Badge } from "@/components/ui";
import { Heart, GraduationCap, Drop, Users } from "@phosphor-icons/react/dist/ssr";

const HIGHLIGHTS = [
  {
    icon: GraduationCap,
    place: "Mushahar, Sarlahi",
    title: "Deepak Majhi stays in class",
    body: "Evening tuition classes in the Mushahar settlement helped Deepak — one of 46 children enrolled — catch up on reading and stay in school instead of dropping into daily-wage work.",
  },
  {
    icon: Heart,
    place: "Nuwakot",
    title: "A TV that kept Subina studying",
    body: "A simple television handover gave Subina Kumal light, lessons and company for evening study — small material support that protected learning continuity at home.",
  },
  {
    icon: Users,
    place: "Nuwakot",
    title: "A scholarship girl stays in school",
    body: "For a girl walking up to two hours each way to school, CSN's sponsorship — fees, uniform and family follow-up — meant she did not have to choose between household work and class.",
  },
  {
    icon: Drop,
    place: "Panchakanya",
    title: "Water closer to home",
    body: "Under the CILRP livelihood program, a rehabilitated drinking-water scheme in Panchakanya cut fetching time for mothers and children — one of 4 water and 16 irrigation schemes reviewed jointly.",
  },
];

export const metadata: Metadata = metaFor("/stories");

export default function Page() {
  return (
    <>
      <PageHero
        kicker="Stories • Field highlights"
        title="Success Stories"
        intro="Our public archive holds no standalone published stories — so we share four honest field highlights drawn from verified program work."
      />
      <section className="max-w-6xl mx-auto px-4 py-14">
        <Card className="p-7 bg-[#e7f3ec]/60 mb-6">
          <p className="text-[15px] leading-relaxed text-[#043d24]/75">
            These are illustrative highlights based on real activities (tuition classes, study
            support, scholarships, water schemes) — not verbatim case studies. Names and details are
            kept general to protect children&apos;s privacy.
          </p>
        </Card>
        <div className="grid gap-6 md:grid-cols-2">
          {HIGHLIGHTS.map((h) => (
            <Card key={h.title} className="p-7">
              <div className="flex items-center gap-3">
                <span className="grid place-items-center w-12 h-12 rounded-2xl bg-[#e7f3ec] text-[#01723b] shrink-0">
                  <h.icon size={26} weight="duotone" />
                </span>
                <div>
                  <Badge>{h.place}</Badge>
                  <p className="text-xs font-semibold text-[#043d24]/50 mt-1">Field highlight</p>
                </div>
              </div>
              <h2 className="font-display text-xl font-semibold mt-4">{h.title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[#043d24]/70">{h.body}</p>
            </Card>
          ))}
        </div>
      </section>
      <DonateBand />
    </>
  );
}
