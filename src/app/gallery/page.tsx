import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero, DonateBand } from "@/components/site";
import { Badge, Card } from "@/components/ui";
import { GALLERIES, galleryPhotoSrc } from "@/lib/gallery";
import { metaFor } from "@/lib/seo";

export const metadata: Metadata = metaFor("/gallery");

const PHOTO_COUNT = GALLERIES.reduce(
  (count, gallery) => count + gallery.to - gallery.from + 1,
  0
);
const RECENT_GALLERIES = [...GALLERIES].reverse();

export default function Page() {
  return (
    <>
      <PageHero
        kicker="Media - Bhotekoshi Flood Response 2026"
        title="Gallery"
        intro="Field moments from the Bhotekoshi Flood Response Project with CARITAS Nepal - assessment, orientation, relief distribution, shelters and child-friendly spaces across Nuwakot and Rasuwa."
      />
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-7">
          <Badge>
            <span className="h-2 w-2 rounded-full bg-[#157a48]" />
            {GALLERIES.length} galleries <span aria-hidden="true">/</span> {PHOTO_COUNT} photos
          </Badge>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {RECENT_GALLERIES.map((gallery, index) => {
            const photoCount = gallery.to - gallery.from + 1;

            return (
              <Link
                key={gallery.slug}
                href={`/gallery/${gallery.slug}`}
                className="group block rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#01723b]"
              >
                <Card className="h-full overflow-hidden transition-transform duration-200 group-hover:-translate-y-1 group-focus-visible:-translate-y-1">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#e7f3ec]">
                    <Image
                      src={galleryPhotoSrc(gallery.from)}
                      alt={`${gallery.title} gallery thumbnail`}
                      fill
                      priority={index < 3}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-sm font-semibold text-[#157a48]">
                      Published {gallery.publishedDate}
                    </p>
                    <h2 className="mt-2 font-display text-xl font-semibold text-[#043d24]">
                      {gallery.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-[#043d24]/65">{gallery.detail}</p>
                    <p className="mt-4 text-sm font-semibold text-[#01723b]">
                      {photoCount} {photoCount === 1 ? "photo" : "photos"}
                      <span className="ml-2" aria-hidden="true">&rarr;</span>
                    </p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
      <DonateBand />
    </>
  );
}