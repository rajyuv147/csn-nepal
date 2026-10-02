import { PageHero, DonateBand } from "@/components/site";
import { Card, Badge } from "@/components/ui";
import { Megaphone, CalendarBlank } from "@phosphor-icons/react/dist/ssr";

const COMPLETED = [
  "Community sensitization on child rights, trafficking, child labour and early marriage",
  "2015 earthquake rescue, relief distribution and temporary-shelter construction",
  "Child-friendly spaces for quake-affected children",
  "Temporary Learning Centres (TLC) run in coordination with DDRC Nuwakot",
  "Children's Day, Education Day and other day celebrations with DDC, DCWB, DEO, VDCs and schools",
];

const ONGOING = [
  "Scholarships and school-continuity support for vulnerable children",
  "Child-club formation, training and municipality-level networking",
  "Community infrastructure and livelihood recovery with local governments",
];

export default function Page() {
  return (
    <>
      <PageHero
        kicker="News & Media • Official"
        title="Press Releases"
        intro="Official statements from Co-operation Society Nepal — what we have completed and what is ongoing."
      />
      <section className="max-w-5xl mx-auto px-4 py-14 space-y-6">
        <Card className="p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>
              <CalendarBlank size={15} /> Dec 5, 2016
            </Badge>
            <Badge className="bg-[#f6b231]/15 border-[#b97d00]/20 text-[#7a5200]">
              <Megaphone size={15} /> Press release
            </Badge>
          </div>
          <h2 className="font-display text-2xl font-semibold mt-4">
            CSN releases completed &amp; ongoing work summary
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#043d24]/70">
            Issued Dec 5, 2016, this release summarised CSN&apos;s post-earthquake and child-focused
            work in Nuwakot — carried out with the DDRC, DDC, District Child Welfare Board (DCWB),
            District Education Office (DEO), VDCs and community schools.
          </p>
        </Card>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-8">
            <h3 className="font-display text-xl font-semibold">Completed work</h3>
            <ul className="mt-4 space-y-3 text-[15px] text-[#043d24]/75 leading-relaxed list-disc pl-5">
              {COMPLETED.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Card>
          <Card className="p-8">
            <h3 className="font-display text-xl font-semibold">Ongoing work</h3>
            <ul className="mt-4 space-y-3 text-[15px] text-[#043d24]/75 leading-relaxed list-disc pl-5">
              {ONGOING.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Card>
        </div>
      </section>
      <DonateBand />
    </>
  );
}
