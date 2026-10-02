import { PageHero, DonateBand } from "@/components/site";
import { Card, Badge } from "@/components/ui";
import { NEWS } from "@/lib/data";
import { Newspaper, CalendarBlank } from "@phosphor-icons/react/dist/ssr";

const CLIPPINGS = [
  {
    date: "Oct 25, 2019",
    title: "सामाजिक परीक्षण सम्पन्न",
    body: "Social audit of FY 2075/76 educational and social work completed with Sunrise Orphanage, Kalikadevi MaVi Gurje and SCAI Australia.",
  },
  {
    date: "Feb 2019",
    title: "शिवपुरी बाल सञ्जाल गठन",
    body: "Local press covered the formation of the Shivapuri rural-municipality level child-club network.",
  },
  {
    date: "Oct 12, 2018",
    title: "40 students receive copies in Bidur",
    body: "CSN distributed copies and stationery to 40 vulnerable students in Bidur Municipality.",
  },
  {
    date: "Oct 6, 2018",
    title: "CILRP समीक्षा सम्पन्न",
    body: "Joint review with Panchakanya RM and UNDP: 4 drinking-water schemes and 16 irrigation schemes verified, plus livelihood outputs.",
  },
  {
    date: "Oct 2, 2018",
    title: "Teacher grant for Kalikadevi MaVi",
    body: "Teaching grant provided to sustain classes at Kalikadevi Secondary School, Shivapuri.",
  },
  {
    date: "Mar 2017",
    title: "TV handover for study support",
    body: "Television handed over to support a student's learning at home — keeping study continuity for a vulnerable family.",
  },
  {
    date: "Jan 19, 2017",
    title: "Situation update",
    body: "Winter situation update from Nuwakot field sites — school continuity and relief follow-up after the earthquake recovery phase.",
  },
  {
    date: "Jan 11, 2017",
    title: "Battling illiteracy — tuition classes in Mushahar, Sarlahi",
    body: "Tuition classes reached 46 Mushahar children in Sarlahi, tackling early illiteracy in one of the most excluded communities.",
  },
  {
    date: "Dec 5, 2016",
    title: "Completed & ongoing projects list",
    body: "Published round-up of completed and ongoing work — sensitization, earthquake relief, child-friendly spaces and day celebrations.",
  },
  {
    date: "Jun 10, 2016",
    title: "Winter clothes with UNICEF / WCO",
    body: "Winter-clothes distribution carried out with UNICEF support through the Women and Children Office (WCO) Nuwakot.",
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        kicker="News & Media • Press"
        title="News Clippings"
        intro="How local and national media covered CSN's work — social audits, child clubs, school support, water schemes and relief."
      />
      <section className="max-w-6xl mx-auto px-4 py-14 grid gap-6 md:grid-cols-2">
        {CLIPPINGS.map((c) => (
          <Card key={c.title + c.date} className="p-7">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>
                <CalendarBlank size={15} /> {c.date}
              </Badge>
              <Badge className="bg-[#f6b231]/15 border-[#b97d00]/20 text-[#7a5200]">
                <Newspaper size={15} /> Clipping
              </Badge>
            </div>
            <h2 className="font-display text-xl font-semibold mt-4">{c.title}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[#043d24]/70">{c.body}</p>
          </Card>
        ))}
      </section>
      <section className="max-w-6xl mx-auto px-4 pb-14">
        <Card className="p-7 bg-[#e7f3ec]/60">
          <h2 className="font-display text-xl font-semibold">Related archive entries</h2>
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
