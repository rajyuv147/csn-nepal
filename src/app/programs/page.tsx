import { PageHero, SectionHeading, DonateBand } from "@/components/site";
import { Card, Badge } from "@/components/ui";
import { PROGRAM_AREAS, INTERVENTION_AREAS } from "@/lib/data";
import {
  Baby,
  BookOpen,
  Users,
  Heartbeat,
  Plant,
  House,
  Leaf,
  Mountains,
} from "@phosphor-icons/react/dist/ssr";

const ICONS: Record<string, typeof Baby> = {
  Baby,
  BookOpen,
  Users,
  HeartPulse: Heartbeat,
  Sprout: Plant,
  House,
  Leaf,
  Mountain: Mountains,
};

const DETAILS: Record<string, string> = {
  education:
    "In Nuwakot many children walk up to two hours each way to reach school, and dropout is highest among Tamang, Kumal, Dalit and other excluded communities. CSN responds with e-learning through the Midas e-CLASS model, teacher grants, tuition classes, scholarships, school materials and parental counselling — so vulnerable children stay enrolled, learn meaningfully and complete their schooling.",
  health:
    "Health awareness, school health check-ups, sanitation and hygiene promotion and referral support reach vulnerable children, women and youth. CSN runs health camps, menstrual-hygiene sessions and clean-water and toilet-use awareness together with schools, health posts and rural municipalities.",
  women:
    "Women's education, entrepreneurship and skills training sit at the heart of trafficking prevention. CSN supports literacy, income-generation, gender sensitisation and anti-trafficking awareness so women earn, decide and lead — keeping girls in school and families together.",
};

export default function Page() {
  return (
    <>
      <PageHero
        kicker="Programs • Areas of Work"
        title="Areas of Work"
        intro="Eight interlinked areas through which CSN protects children, empowers women and strengthens communities across Nuwakot."
      />
      <section className="max-w-7xl mx-auto px-4 py-14">
        <SectionHeading
          eyebrow="What we do"
          title="Eight areas, one goal"
          body="Child protection cuts across everything — education, health, livelihood, disaster recovery and the environment."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          {PROGRAM_AREAS.map((a) => {
            const Icon = ICONS[a.icon] ?? BookOpen;
            return (
              <Card key={a.slug} className="p-6 flex flex-col gap-3">
                <span className="grid place-items-center w-12 h-12 rounded-2xl bg-[#e7f3ec] text-[#01723b]">
                  <Icon size={26} weight="duotone" />
                </span>
                <h3 className="font-display font-semibold text-lg leading-snug">{a.title}</h3>
                <p className="text-[15px] text-[#043d24]/70 leading-relaxed">{a.body}</p>
              </Card>
            );
          })}
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-4 pb-2">
        <SectionHeading
          eyebrow="Organisational profile"
          title="Nine major areas of intervention (organisational profile)"
          body="As listed in the CSN organisational profile, our work spans these nine major areas of intervention."
        />
        <Card className="p-6 md:p-8 mt-8">
          <ol className="space-y-4">
            {INTERVENTION_AREAS.map((area, i) => (
              <li key={area} className="flex gap-4 items-start">
                <span className="grid place-items-center w-9 h-9 shrink-0 rounded-full bg-[#01723b] text-white font-display font-semibold text-[15px]">
                  {i + 1}
                </span>
                <p className="text-[15px] text-[#043d24]/80 leading-relaxed pt-1.5">{area}</p>
              </li>
            ))}
          </ol>
        </Card>
      </section>
      <section className="max-w-5xl mx-auto px-4 pb-14 space-y-5">
        <SectionHeading eyebrow="In depth" title="Spotlight on three pillars" />
        {[
          { slug: "education", label: "Education", title: "Education for the most vulnerable" },
          { slug: "health", label: "Health", title: "Health, water & sanitation" },
          { slug: "women", label: "Women", title: "Women's rights & empowerment" },
        ].map((s) => (
          <Card key={s.slug} className="p-6 md:p-8">
            <Badge>{s.label}</Badge>
            <h3 className="font-display font-semibold text-xl mt-3">{s.title}</h3>
            <p className="mt-2 text-[#043d24]/70 leading-relaxed">{DETAILS[s.slug]}</p>
          </Card>
        ))}
      </section>
      <DonateBand />
    </>
  );
}
