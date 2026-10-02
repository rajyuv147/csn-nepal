import type { Metadata } from "next";
import { metaFor } from "@/lib/seo";
import { PageHero, DonateBand } from "@/components/site";
import { Card } from "@/components/ui";
import { Link as LinkIcon, ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = metaFor("/resources/links");

const LINKS = [
  { name: "UNICEF", web: "https://www.unicef.org", desc: "United Nations Children's Fund — child rights worldwide." },
  { name: "Save the Children", web: "http://www.savethechildren.org", desc: "Global movement for children's rights and survival." },
  { name: "UNDP Nepal", web: "https://np.undp.org", desc: "UN Development Programme — our CILRP livelihood partner." },
  { name: "NGO Federation Nepal", web: "https://ngofederation.org", desc: "National umbrella network of Nepali NGOs." },
  { name: "Consortium for Street Children", web: "https://www.streetchildren.org", desc: "Global network for street-connected children." },
];

export default function Page() {
  return (
    <>
      <PageHero
        kicker="Resources • Reference"
        title="Important Links"
        intro="Trusted organisations and networks working for children, development and humanitarian response."
      />
      <section className="max-w-5xl mx-auto px-4 py-14">
        <div className="grid gap-5 md:grid-cols-2">
          {LINKS.map((l) => (
            <Card key={l.name} className="p-7">
              <span className="grid place-items-center w-12 h-12 rounded-2xl bg-[#e7f3ec] text-[#01723b]">
                <LinkIcon size={24} weight="duotone" />
              </span>
              <h3 className="font-bold text-lg mt-4">{l.name}</h3>
              <p className="text-sm text-[#043d24]/70 mt-1">{l.desc}</p>
              <a
                href={l.web}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#157a48] hover:underline mt-3 break-all"
              >
                {l.web.replace(/^https?:\/\//, "")} <ArrowSquareOut size={15} />
              </a>
            </Card>
          ))}
        </div>
      </section>
      <DonateBand />
    </>
  );
}
