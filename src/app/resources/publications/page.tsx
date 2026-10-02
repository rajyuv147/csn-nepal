import { PageHero, DonateBand } from "@/components/site";
import { Card, Badge, Button } from "@/components/ui";
import { FilePdf, DownloadSimple } from "@phosphor-icons/react/dist/ssr";

export default function Page() {
  return (
    <>
      <PageHero
        kicker="Resources • Knowledge"
        title="Publications"
        intro="Project reports, reviews and learning documents from our work with communities and partners."
      />
      <section className="max-w-5xl mx-auto px-4 py-14">
        <Card className="overflow-hidden">
          <div className="grid grid-cols-[1fr_auto] items-center gap-4 px-6 py-5 bg-[#032e1a] text-white">
            <p className="font-bold text-sm tracking-wide">TITLE</p>
            <p className="font-bold text-sm tracking-wide hidden sm:block">FILE</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 px-6 py-6">
            <span className="grid place-items-center w-12 h-12 rounded-2xl bg-[#e7f3ec] text-[#01723b] shrink-0">
              <FilePdf size={26} weight="duotone" />
            </span>
            <div className="flex-1">
              <p className="font-bold text-lg">CILRP / UNDP / CSN Final Report 2018</p>
              <p className="text-sm text-[#043d24]/60">
                Community Infrastructure Rehabilitation &amp; Livelihood Improvement Programme —
                Panchakanya Rural Municipality
              </p>
              <div className="mt-2">
                <Badge>PDF • Final report</Badge>
              </div>
            </div>
            <Button asChild variant="outline" size="sm">
              <a href="#" download>
                <DownloadSimple size={16} /> Download
              </a>
            </Button>
          </div>
        </Card>
      </section>
      <DonateBand />
    </>
  );
}
