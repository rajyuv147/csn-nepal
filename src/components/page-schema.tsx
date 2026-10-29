"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { breadcrumbsFor } from "@/lib/breadcrumbs";
import { META, SITE_URL } from "@/lib/seo";

function pageType(path: string) {
  if (path === "/about") return "AboutPage";
  if (path === "/contact") return "ContactPage";
  if (path.startsWith("/gallery/")) return "ImageGallery";
  if (path === "/gallery" || path === "/vacancies" || path.startsWith("/news")) return "CollectionPage";
  return "WebPage";
}

/** Visible breadcrumb trail plus WebPage + BreadcrumbList structured data for the current route. */
export function PageSchema({ title, intro }: { title: string; intro?: string }) {
  const path = usePathname();
  const crumbs = breadcrumbsFor(path, title);
  const url = `${SITE_URL}${path}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": pageType(path),
        "@id": `${url}#webpage`,
        url,
        name: title,
        description: META[path]?.description ?? intro,
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organisation` },
        publisher: { "@id": `${SITE_URL}/#organisation` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: crumbs.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.label,
          item: `${SITE_URL}${c.path === "/" ? "" : c.path}`,
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav aria-label="Breadcrumb" className="mb-5">
        <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-white/65">
          {crumbs.map((c, i) => (
            <li key={c.path} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === crumbs.length - 1 ? (
                <span aria-current="page" className="text-white/90 font-semibold">
                  {c.label}
                </span>
              ) : (
                <Link href={c.path} className="hover:text-[#f6b231] underline-offset-4 hover:underline">
                  {c.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
