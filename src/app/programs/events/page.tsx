import { PageHero, SectionHeading, DonateBand } from "@/components/site";
import { Card, Badge } from "@/components/ui";
import { CalendarBlank } from "@phosphor-icons/react/dist/ssr";

const EVENTS = [
  {
    date: "Jan 11, 2019",
    title: "Midas e-CLASS launched",
    body: "Interactive digital teaching-learning started at Janaki Secondary School, Shivapuri-5, Nuwakot under the SSDP model-school vision.",
  },
  {
    date: "Dec 30, 2018",
    title: "Capacity Building Training to Child Club Members",
    body: "Two-day training at the Shivapuri RM office, Sherabagar, for members from 16 schools — organised with SCAI Australia and Shivapuri RM.",
  },
  {
    date: "Mar 29, 2017",
    title: "Rupantaran TOT for parents",
    body: "Training of trainers on the Rupantaran life-skills package for parents across 5 VDCs — strengthening family-level child protection.",
  },
  {
    date: "Mar 27, 2017",
    title: "TV handover to Subina Kumal",
    body: "Television handed over to sponsored child Subina Kumal with sponsor support from Jean-aime Corto — supporting learning at home.",
  },
  {
    date: "Feb 22, 2017",
    title: "Rupantaran adolescent training",
    body: "14-day life-skills training for adolescents on the Rupantaran package — confidence, health, safety and decision-making.",
  },
  {
    date: "Jan 23, 2017",
    title: "Child club meeting",
    body: "Monthly child club coordination meeting chaired by Srijana Tamang — planning school outreach and rights awareness activities.",
  },
  {
    date: "Jan 21, 2017",
    title: "AGM presentation of CONSORTIUM",
    body: "CSN presented its child-participation work at the CONSORTIUM Nepal (Consortium for Child Participation) annual general meeting.",
  },
  {
    date: "Jan 19, 2017",
    title: "Situation Update orientation at Kalika Secondary School, Gurje",
    body: "Orientation on the child-protection situation update for teachers and students at Kalika Secondary School, Gurje.",
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        kicker="Programs • Events"
        title="Events"
        intro="Trainings, handovers, orientations and network moments — the day-to-day work behind the programmes."
      />
      <section className="max-w-5xl mx-auto px-4 py-14">
        <SectionHeading eyebrow="Calendar" title="Recent events" />
        <div className="grid gap-5 mt-8">
          {EVENTS.map((e) => (
            <Card key={e.title} className="p-6 md:p-7">
              <Badge>
                <CalendarBlank size={14} /> {e.date}
              </Badge>
              <h3 className="font-display font-semibold text-xl mt-3">{e.title}</h3>
              <p className="mt-2 text-[#043d24]/70 leading-relaxed">{e.body}</p>
            </Card>
          ))}
        </div>
      </section>
      <DonateBand />
    </>
  );
}
