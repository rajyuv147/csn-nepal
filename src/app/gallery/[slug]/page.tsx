import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GalleryPhotoGrid } from "@/components/gallery-photo-grid";
import { DonateBand, PageHero } from "@/components/site";
import { GALLERIES, galleryPhotoSrc, getGalleryBySlug } from "@/lib/gallery";
import { metaFor, SITE_URL } from "@/lib/seo";

type GalleryPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return GALLERIES.map((gallery) => ({ slug: gallery.slug }));
}

export async function generateMetadata({ params }: GalleryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const gallery = getGalleryBySlug(slug);

  if (!gallery) return metaFor("/gallery");

  return metaFor(`/gallery/${gallery.slug}`, {
    title: `${gallery.title} | CSN`,
    description: gallery.detail,
    image: `${SITE_URL}${galleryPhotoSrc(gallery.from)}`,
    imageAlt: gallery.title,
  });
}

export default async function GalleryDetailPage({ params }: GalleryPageProps) {
  const { slug } = await params;
  const gallery = getGalleryBySlug(slug);

  if (!gallery) notFound();

  const photos = Array.from(
    { length: gallery.to - gallery.from + 1 },
    (_, index) => {
      const number = gallery.from + index;
      return {
        src: galleryPhotoSrc(number),
        alt: `${gallery.title} - photo ${index + 1}`,
      };
    }
  );

  return (
    <>
      <PageHero
        kicker={`Photo gallery / Published ${gallery.publishedDate}`}
        title={gallery.title}
        intro={gallery.detail}
      />
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-24 md:pt-14 md:pb-28">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/gallery"
            className="text-sm font-semibold text-[#01723b] underline-offset-4 hover:underline"
          >
            &larr; All galleries
          </Link>
          <p className="text-sm text-[#043d24]/65">
            {photos.length} {photos.length === 1 ? "photo" : "photos"} <span aria-hidden="true">/</span> Published {gallery.publishedDate}
          </p>
        </div>
        <GalleryPhotoGrid title={gallery.title} photos={photos} />
      </section>
      <DonateBand />
    </>
  );
}