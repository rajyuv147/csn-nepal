import { CONTACT, GOAL, GOVERNANCE, INTERVENTION_AREAS, MISSION, NETWORKS, PARTNERS, PROJECTS, VACANCIES } from "@/lib/data";
import { GALLERIES } from "@/lib/gallery";
import { META, SITE_URL } from "@/lib/seo";

// Generated from the same data as the site, so AI answer engines always see current facts.
export const dynamic = "force-static";

const page = (path: string, label: string) =>
  `- [${label}](${SITE_URL}${path === "/" ? "" : path}): ${META[path]?.description ?? ""}`.trimEnd();

export function GET() {
  const lines = [
    "# Co-operation Society Nepal (CSN)",
    "",
    "> Co-operation Society Nepal (CSN; Nepali: सहकार्य समाज नेपाल) is a youth-led, non-governmental, non-profit, non-political and non-religious social development organisation established in 2013 and headquartered in Bidur, Nuwakot, Nepal. It works with children, women, youth and marginalised communities on child protection, education, health, livelihoods and disaster response.",
    "",
    "## Key facts",
    "",
    "- Official name: Co-operation Society Nepal (CSN)",
    `- Established: ${CONTACT.established}`,
    `- Registration: ${CONTACT.regd}`,
    `- ${CONTACT.swc}`,
    `- ${CONTACT.pan}`,
    `- Head office: ${CONTACT.headOffice}`,
    `- Contact office: ${CONTACT.branchOffice}`,
    `- Field offices: ${CONTACT.fieldOffices.join("; ")}`,
    `- Working districts: ${CONTACT.workingDistricts}`,
    `- Executive leadership: ${CONTACT.principal}`,
    `- Email: ${CONTACT.email.join(", ")}`,
    `- Phone: ${CONTACT.phones.join(", ")}`,
    `- Website: ${SITE_URL}`,
    "",
    "## Mission and goal",
    "",
    `- Mission: ${MISSION}`,
    `- Goal: ${GOAL}`,
    `- Governance: ${GOVERNANCE}`,
    "",
    "## Areas of work",
    "",
    ...INTERVENTION_AREAS.map((a) => `- ${a}`),
    "",
    "## Projects (most recent first)",
    "",
    ...PROJECTS.map((p) => `- ${p.title} (${p.date}): ${p.excerpt}`),
    "",
    "## Partners",
    "",
    PARTNERS.map((p) => p.name).join("; "),
    "",
    "## Networks and memberships",
    "",
    NETWORKS.map((n) => n.name).join("; "),
    "",
    "## Current vacancies",
    "",
    ...(VACANCIES.length
      ? VACANCIES.map(
          (v) =>
            `- [${v.title} (${v.titleNe})](${SITE_URL}/vacancies/${v.slug}): ${v.location}; ${v.contract}; ${v.deadline}. Apply by emailing a CV and application letter to ${v.applyEmail}.`
        )
      : ["- No open vacancies at the moment."]),
    "",
    "## Photo galleries",
    "",
    ...[...GALLERIES]
      .reverse()
      .map((g) => `- [${g.title}](${SITE_URL}/gallery/${g.slug}) (${g.publishedDate}): ${g.detail}`),
    "",
    "## Main pages",
    "",
    page("/about", "About CSN — mission, governance and FAQ"),
    page("/programs", "Areas of work"),
    page("/programs/projects", "Projects"),
    page("/news", "News"),
    page("/news/announcements", "Announcements"),
    page("/vacancies", "Vacancies"),
    page("/gallery", "Photo gallery"),
    page("/about/partners", "Partners"),
    page("/resources/policies", "Policies and safeguarding"),
    page("/donate", "Donate"),
    page("/contact", "Contact"),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
