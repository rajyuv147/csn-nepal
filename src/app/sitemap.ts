import type { MetadataRoute } from "next";
import { ALL_PATHS, SITE_URL } from "@/lib/seo";
import { VACANCIES } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [...ALL_PATHS, ...VACANCIES.map((v) => `/vacancies/${v.slug}`)];
  return paths.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.split("/").length === 2 ? 0.8 : 0.6,
  }));
}
