import type { Metadata } from "next";
import { metaFor } from "@/lib/seo";
import { PageHero, SectionHeading, DonateBand } from "@/components/site";
import { Card, Badge } from "@/components/ui";
import { CalendarBlank, Tag } from "@phosphor-icons/react/dist/ssr";

const ACTIVITIES = [
  {
    date: "Feb 4, 2019",
    tag: "Child clubs",
    title: "शिवपुरी बाल सञ्जाल गठन",
    body: "Rural-municipality level child-club network formed in Shivapuri — children organise for their own rights across the municipality.",
  },
  {
    date: "Jan 11, 2019",
    tag: "Education",
    title: "Midas e-CLASS",
    body: "Digital interactive classrooms started at Janaki Secondary School, Shivapuri-5 — a model-school step under the School Sector Development Plan.",
  },
  {
    date: "Dec 30, 2018",
    tag: "Training",
    title: "Capacity Building Training to Child Club Members",
    body: "Two-day training for child club members from 16 schools at the Shivapuri RM office, Sherabagar, with SCAI Australia and RM matching funds.",
  },
  {
    date: "Oct 1, 2018",
    tag: "Child protection",
    title: "Scholarship project",
    body: "Scholarships for vulnerable children and parental empowerment in Nuwakot — preventing trafficking, child labour, early marriage and school dropout with APC Nepal/France.",
  },
  {
    date: "Aug 11, 2018",
    tag: "Integrated",
    title: "Disadvantaged children project, Shivapuri",
    body: "Holistic support for disadvantaged and vulnerable children and families in Shivapuri through child protection, education, livelihood and school strengthening.",
  },
  {
    date: "Sep 1, 2017",
    tag: "Livelihood",
    title: "CILRP with UNDP",
    body: "Community Infrastructure Rehabilitation & Livelihood Improvement Programme in Panchakanya RM — drinking-water schemes, irrigation and productive infrastructure rebuilt.",
  },
  {
    date: "Mar 29, 2017",
    tag: "Rupantaran",
    title: "Rupantaran TOT for parents",
    body: "Training of trainers on the Rupantaran life-skills package for parents across 5 VDCs.",
  },
  {
    date: "Feb 22, 2017",
    tag: "Rupantaran",
    title: "Rupantaran adolescent training",
    body: "14-day adolescent life-skills training on health, safety, confidence and decision-making.",
  },
];

export const metadata: Metadata = metaFor("/programs/activities");

export default function Page() {
  return (
    <>
      <PageHero
        kicker="Programs • Activities"
        title="Activities"
        intro="Field highlights across child clubs, classrooms, scholarships, livelihood recovery and life-skills training."
      />
      <section className="max-w-5xl mx-auto px-4 py-14">
        <SectionHeading
          eyebrow="Field notes"
          title="Activity highlights"
          body="A combined view of recent projects, trainings and community milestones."
        />
        <div className="grid gap-5 mt-8">
          {ACTIVITIES.map((a) => (
            <Card key={a.title} className="p-6 md:p-7">
              <div className="flex flex-wrap gap-2">
                <Badge>
                  <CalendarBlank size={14} /> {a.date}
                </Badge>
                <Badge>
                  <Tag size={14} /> {a.tag}
                </Badge>
              </div>
              <h3 className="font-display font-semibold text-xl mt-3">{a.title}</h3>
              <p className="mt-2 text-[#043d24]/70 leading-relaxed">{a.body}</p>
            </Card>
          ))}
        </div>
      </section>
      <DonateBand />
    </>
  );
}
