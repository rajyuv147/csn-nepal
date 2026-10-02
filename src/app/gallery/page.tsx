import type { Metadata } from "next";
import { metaFor } from "@/lib/seo";
import { PageHero, DonateBand } from "@/components/site";
import { Card, Badge } from "@/components/ui";

export const metadata: Metadata = metaFor("/gallery");

type Group = { title: string; detail: string; from: number; to: number };

const GROUPS: Group[] = [
  {
    title: "Flood damage field assessment",
    detail: "CSN team surveying the flood-torn Bhotekoshi riverbed and damaged banks.",
    from: 1,
    to: 16,
  },
  {
    title: "Staff & volunteers orientation — Bidur, Oct 2026",
    detail: "Orientation and interaction program for response staff and volunteers.",
    from: 17,
    to: 23,
  },
  {
    title: "Relief kit distribution",
    detail: "CRS-supported Bhotekoshi Flood Response kits reaching affected families.",
    from: 24,
    to: 24,
  },
  {
    title: "Holding shelter & child-friendly space — Bidur",
    detail: "Tents, water and safe spaces with Caritas and CSN volunteers on duty.",
    from: 25,
    to: 31,
  },
  {
    title: "Child-friendly safe space — Kispang",
    detail: "बालमैत्री सुरक्षित स्थान at Kispang RM-9, Archale — learning through play.",
    from: 32,
    to: 38,
  },
];

const src = (n: number) => `/gallery/photo-${String(n).padStart(2, "0")}.jpeg`;

export default function Page() {
  return (
    <>
      <PageHero
        kicker="Media • Bhotekoshi Flood Response 2026"
        title="Gallery"
        intro="Field moments from the Bhotekoshi Flood Response Project with CARITAS Nepal — assessment, orientation, relief, shelters and child-friendly spaces across Nuwakot and Rasuwa."
      />
      <section className="max-w-6xl mx-auto px-4 py-14 space-y-14">
        <div>
          <Badge>
            <span className="w-2 h-2 rounded-full bg-[#157a48]" />
            38 photos • Bhotekoshi Flood Response Project (Aug – Dec 2026)
          </Badge>
        </div>
        {GROUPS.map((g) => (
          <div key={g.title}>
            <h2 className="font-display text-2xl font-semibold">{g.title}</h2>
            <p className="mt-1 text-[15px] text-[#043d24]/65">{g.detail}</p>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: g.to - g.from + 1 }, (_, i) => g.from + i).map((n) => (
                <Card key={n} className="overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src(n)}
                    alt={`${g.title} — photo ${n}`}
                    loading="lazy"
                    className="w-full h-56 object-cover"
                  />
                  <p className="px-5 py-3.5 font-semibold text-sm text-[#043d24]/80">{g.title}</p>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </section>
      <DonateBand />
    </>
  );
}
