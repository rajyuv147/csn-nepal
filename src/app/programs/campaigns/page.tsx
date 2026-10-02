import { PageHero, SectionHeading, DonateBand } from "@/components/site";
import { Card, Badge } from "@/components/ui";
import { CalendarBlank, Megaphone } from "@phosphor-icons/react/dist/ssr";

const CAMPAIGNS = [
  {
    date: "Jan 11, 2019",
    title: "Midas e-CLASS",
    body: "Digital interactive classrooms launched at Janaki Secondary School, Shivapuri-5, Nuwakot — moving teaching-learning beyond rote learning toward the School Sector Development Plan model-school vision.",
  },
  {
    date: "Dec 30, 2018",
    title: "Capacity Building Training to Child Club Members",
    body: "Two-day training (Dec 29–30) at the Shivapuri Rural Municipality office, Sherabagar, for child club members from 16 schools — organised by CSN with Sunrise Children's Association Inc. (SCAI) Australia and Shivapuri RM matching funds.",
  },
  {
    date: "Dec 2016",
    title: "People's Caravan for Reconstruction and Recovery",
    body: "Post-earthquake rally in Bidur bringing communities, civil society and local authorities together to demand safe, child-friendly and timely reconstruction and recovery across Nuwakot.",
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        kicker="Programs • Movements & Campaigns"
        title="Movements & Campaigns"
        intro="Public mobilisations that turn awareness into action — from digital classrooms to post-earthquake reconstruction."
      />
      <section className="max-w-5xl mx-auto px-4 py-14">
        <SectionHeading
          eyebrow="Advocacy"
          title="Campaigns that move communities"
        />
        <div className="grid gap-5 mt-8">
          {CAMPAIGNS.map((c) => (
            <Card key={c.title} className="p-6 md:p-7">
              <div className="flex flex-wrap gap-2">
                <Badge>
                  <CalendarBlank size={14} /> {c.date}
                </Badge>
                <Badge>
                  <Megaphone size={14} /> Campaign
                </Badge>
              </div>
              <h3 className="font-display font-semibold text-xl mt-3">{c.title}</h3>
              <p className="mt-2 text-[#043d24]/70 leading-relaxed">{c.body}</p>
            </Card>
          ))}
        </div>
      </section>
      <DonateBand />
    </>
  );
}
