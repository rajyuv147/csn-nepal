import { PageHero, DonateBand } from "@/components/site";
import { Card } from "@/components/ui";
import { GOVERNANCE } from "@/lib/data";
import { TreeStructure } from "@phosphor-icons/react/dist/ssr";

const LEVELS = [
  { t: "General Assembly", d: "All members — the highest decision-making body." },
  { t: "Executive Board", d: "Chairperson, Vice-Chair, Secretary, Treasurer + 3 members." },
  { t: "Advisory Board", d: "Scientist, professor and child-rights activist advisors." },
  { t: "Executive Director & Program Team", d: "Program Coordinator, Finance Officers, Field Coordinators." },
  { t: "Field Staff", d: "Engineers, social mobilizers, field officers across Nuwakot." },
  { t: "Community Structures", d: "Child clubs, child networks, mothers' groups, ward committees." },
];

export default function Page() {
  return (
    <>
      <PageHero kicker="About • How we're organised" title="Organisational Structure" intro="From the general assembly to ward-level child clubs — clear accountability at every tier." />
      <section className="max-w-4xl mx-auto px-4 py-14">
        <Card className="p-8">
          <p className="flex items-center gap-2 font-bold text-[#157a48]"><TreeStructure size={20} /> Structure (as per CSN charter)</p>
          <ol className="mt-6 relative border-l-[3px] border-[#f6b231] ml-2 space-y-6">
            {LEVELS.map((l) => (
              <li key={l.t} className="pl-6 relative">
                <span className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-[#01723b] border-[3px] border-[#f6b231]" />
                <p className="font-display font-semibold text-lg">{l.t}</p>
                <p className="text-[15px] text-[#043d24]/65">{l.d}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-[#043d24]/55">Original chart image (image00.png, 2017) is preserved in the archive; this page restates it accessibly.</p>
          <div className="mt-6 rounded-2xl bg-[#e7f3ec] border border-[#01723b]/10 p-5">
            <p className="font-bold text-[#157a48]">Governance</p>
            <p className="mt-2 text-[15px] leading-relaxed text-[#043d24]/80">{GOVERNANCE}</p>
            <p className="mt-3 text-sm leading-relaxed text-[#043d24]/65">
              Note: the organogram chart in the organisational profile places the General Assembly
              above the Executive Board, followed by the program team, field staff and community
              structures (child clubs, networks and ward-level groups) — matching the tier order shown above.
            </p>
          </div>
        </Card>
      </section>
      <DonateBand />
    </>
  );
}
