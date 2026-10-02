import { PageHero, DonateBand } from "@/components/site";
import { Card } from "@/components/ui";
import { NETWORKS } from "@/lib/data";
import { GlobeHemisphereWest, ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";

export default function Page() {
  return (
    <>
      <PageHero
        kicker="About • Solidarity"
        title="Networks"
        intro="We are connected with a huge network of organisations — from district protection clusters to global child-rights movements."
      />
      <section className="max-w-5xl mx-auto px-4 py-14">
        <Card className="overflow-hidden">
          {NETWORKS.map((n, i) => (
            <div
              key={n.name}
              className={`flex items-center gap-4 px-6 py-5 ${i % 2 ? "bg-[#e7f3ec]/60" : ""}`}
            >
              <GlobeHemisphereWest
                size={34}
                weight="duotone"
                className="text-[#01723b] shrink-0"
              />
              <div className="flex-1">
                <p className="font-bold text-lg">{n.name}</p>
                {n.web ? (
                  <a
                    href={n.web}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#157a48] hover:underline break-all"
                  >
                    Visit website <ArrowSquareOut size={15} />
                  </a>
                ) : (
                  <p className="text-sm text-[#043d24]/60">District / national coordination network</p>
                )}
              </div>
            </div>
          ))}
        </Card>
      </section>
      <DonateBand />
    </>
  );
}
