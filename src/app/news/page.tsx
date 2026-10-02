import { PageHero, DonateBand } from "@/components/site";
import { Card, Badge } from "@/components/ui";
import { NEWS } from "@/lib/data";
import { Newspaper, CalendarBlank } from "@phosphor-icons/react/dist/ssr";

const ACTIONS = [
  {
    date: "Jul 15, 2020",
    tag: "Livelihood",
    title: "Cash for Work — COVID response",
    body: "Work-based support for unemployed people during the COVID-19 crisis, aligned with the Government of Nepal's Prime Minister Employment Program. Daily-wage families earned a living while rebuilding community assets.",
  },
  {
    date: "Feb 4, 2019",
    tag: "Child clubs",
    title: "शिवपुरी बाल सञ्जाल गठन",
    body: "Rural-municipality level child-club network formed in Shivapuri — children organise for their own rights, elect their leadership, and raise their voice with the rural municipality.",
  },
  {
    date: "Jan 11, 2019",
    tag: "Education",
    title: "Midas e-CLASS launched",
    body: "Interactive digital teaching-learning (Midas e-CLASS) introduced under the School Sector Development Plan model-school vision — moving classrooms beyond rote learning.",
  },
  {
    date: "Dec 30, 2018",
    tag: "Training",
    title: "Capacity Building Training for child clubs",
    body: "Two-day capacity building (Dec 29–30) for child-club members from 16 schools at the Shivapuri RM office, Sherabagar — leadership, child rights and club management.",
  },
  {
    date: "Mar 29, 2017",
    tag: "Parenting",
    title: "Rupantaran parent training",
    body: "Rupantaran (transformation) parenting sessions helped caregivers replace harsh discipline with positive guidance and keep children — especially girls — in school.",
  },
  {
    date: "Jan 21, 2017",
    tag: "Networks",
    title: "CONSORTIUM AGM presentation",
    body: "CSN presented its child-participation practice at the CONSORTIUM Nepal annual general meeting — sharing how child clubs feed into local planning.",
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        kicker="News & Media • CSN in Action"
        title="CSN in Action"
        intro="Field updates from Nuwakot and beyond — what our teams, children and communities have been doing together."
      />
      <section className="max-w-6xl mx-auto px-4 py-14 grid gap-6 md:grid-cols-2">
        {ACTIONS.map((a) => (
          <Card key={a.title} className="p-7">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>
                <CalendarBlank size={15} /> {a.date}
              </Badge>
              <Badge className="bg-[#f6b231]/15 border-[#b97d00]/20 text-[#7a5200]">
                <Newspaper size={15} /> {a.tag}
              </Badge>
            </div>
            <h2 className="font-display text-xl font-semibold mt-4">{a.title}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[#043d24]/70">{a.body}</p>
          </Card>
        ))}
      </section>
      <section className="max-w-6xl mx-auto px-4 pb-14">
        <Card className="p-7 bg-[#e7f3ec]/60">
          <h2 className="font-display text-xl font-semibold">More from the newsroom archive</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {NEWS.slice(0, 4).map((n) => (
              <li key={n.title} className="text-sm text-[#043d24]/75">
                <span className="font-semibold text-[#043d24]">{n.date} — </span>
                {n.title}
              </li>
            ))}
          </ul>
        </Card>
      </section>
      <DonateBand />
    </>
  );
}
