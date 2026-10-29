import { NAV } from "@/lib/data";
import { ALL_PATHS } from "@/lib/seo";

export type Crumb = { label: string; path: string };

// Top-level sections use the menu's parent label; deeper pages use the submenu label.
const PARENT_LABELS = new Map(NAV.map((n) => [n.href, n.label]));
const CHILD_LABELS = new Map(
  NAV.flatMap((n) => (n.children ?? []).map((c) => [c.href, c.label] as const))
);
const EXTRA_LABELS: Record<string, string> = {
  "/donate": "Donate",
  "/sponsor": "Sponsor a Child",
};

function labelFor(path: string) {
  const isTopLevel = path.split("/").length === 2;
  return (
    EXTRA_LABELS[path] ??
    (isTopLevel ? PARENT_LABELS.get(path) : undefined) ??
    CHILD_LABELS.get(path) ??
    PARENT_LABELS.get(path)
  );
}

/** Home → each existing ancestor page → current page (labelled with `pageTitle` if not in the menu). */
export function breadcrumbsFor(path: string, pageTitle: string): Crumb[] {
  const segments = path.split("/").filter(Boolean);
  const crumbs: Crumb[] = [{ label: "Home", path: "/" }];
  segments.forEach((_, i) => {
    const p = "/" + segments.slice(0, i + 1).join("/");
    const isLast = i === segments.length - 1;
    if (isLast) crumbs.push({ label: labelFor(p) ?? pageTitle, path: p });
    else if (ALL_PATHS.includes(p)) crumbs.push({ label: labelFor(p) ?? p, path: p });
  });
  return crumbs;
}
