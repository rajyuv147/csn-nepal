import type { MetadataRoute } from "next";
import { GALLERIES, galleryPhotoSrc } from "@/lib/gallery";
import { ALL_PATHS, SITE_URL } from "@/lib/seo";
import { VACANCIES } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [...ALL_PATHS, ...VACANCIES.map((vacancy) => `/vacancies/${vacancy.slug}`)];
  const pageEntries = staticPages.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    changeFrequency: path === "/" ? "weekly" as const : "monthly" as const,
    priority: path === "/" ? 1 : path.split("/").length === 2 ? 0.8 : 0.6,
  }));
  const galleryEntries = GALLERIES.map((gallery) => ({
    url: `${SITE_URL}/gallery/${gallery.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    images: Array.from(
      { length: gallery.to - gallery.from + 1 },
      (_, index) => `${SITE_URL}${galleryPhotoSrc(gallery.from + index)}`
    ),
  }));

  return [...pageEntries, ...galleryEntries];
}
