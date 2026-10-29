import type { MetadataRoute } from "next";
import { GALLERIES, galleryPhotoSrc } from "@/lib/gallery";
import { ALL_PATHS, isoDate, SITE_URL } from "@/lib/seo";
import { VACANCIES } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const pageEntries = ALL_PATHS.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    changeFrequency: path === "/" ? "weekly" as const : "monthly" as const,
    priority: path === "/" ? 1 : path.split("/").length === 2 ? 0.8 : 0.6,
  }));
  const vacancyEntries = VACANCIES.map((vacancy) => ({
    url: `${SITE_URL}/vacancies/${vacancy.slug}`,
    lastModified: vacancy.postedDate,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));
  const galleryEntries = GALLERIES.map((gallery) => ({
    url: `${SITE_URL}/gallery/${gallery.slug}`,
    lastModified: isoDate(gallery.publishedDate),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    images: Array.from(
      { length: gallery.to - gallery.from + 1 },
      (_, index) => `${SITE_URL}${galleryPhotoSrc(gallery.from + index)}`
    ),
  }));

  return [...pageEntries, ...vacancyEntries, ...galleryEntries];
}
