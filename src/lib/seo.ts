import type { Metadata } from "next";

export const SITE_URL = "https://www.csnnepal.org.np";
export const SITE_NAME = "Co-operation Society Nepal (CSN)";
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

type Meta = {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
};

// Unique title (50–60 chars) + description (150–160 chars) per route
export const META: Record<string, Meta> = {
  "/": {
    title: "CSN Nepal — Empowering Children, Women & Communities",
    description:
      "Co-operation Society Nepal (CSN) is a Nuwakot-based nonprofit (est. 2013) working in child protection, education, health, livelihood and disaster recovery.",
  },
  "/about": {
    title: "CSN in Brief — Vision, Mission & Objectives | CSN Nepal",
    description:
      "Learn who CSN Nepal is: youth-led nonprofit vision, mission, 13 objectives, norms, governance, human resources and working districts across Nepal.",
  },
  "/about/executive-board": {
    title: "Executive Board & Leadership | CSN Nepal",
    description:
      "Meet CSN Nepal's 7-member executive board, executive director and founder board — qualifications, experience, governance and leadership responsibilities.",
  },
  "/about/advisory-board": {
    title: "Advisory Board — Experts Guiding CSN | CSN Nepal",
    description:
      "Meet the scientists, professors and child-rights activists advising CSN Nepal on strategy, community development, education, health and child protection.",
  },
  "/about/structure": {
    title: "Organisational Structure | CSN Nepal",
    description:
      "See how CSN Nepal is organised: General Assembly, executive board, program teams, field staff and community structures across its working districts.",
  },
  "/about/staff": {
    title: "Staff Members — Our Team in Nuwakot | CSN Nepal",
    description:
      "Meet CSN Nepal's program coordinators, finance officers, engineers, social mobilizers and field officers delivering projects in Nuwakot and nearby districts.",
  },
  "/about/volunteers": {
    title: "Volunteer in Nepal With CSN — Roles & Sign-up",
    description:
      "Volunteer with CSN Nepal in teaching, health camps and disaster response. Explore roles and ways to support children and communities in Nuwakot.",
  },
  "/about/partners": {
    title: "Our Partners — UNDP, CARITAS, UNICEF & More | CSN Nepal",
    description:
      "UNDP, UNICEF, CARITAS, APC France, SCAI Australia and local governments partner with CSN Nepal on community development, relief and recovery programs.",
  },
  "/about/networks": {
    title: "Our Networks — NGO Federation & Alliances | CSN Nepal",
    description:
      "Learn about CSN Nepal's civil-society networks, including NGO Federation, CONSORTIUM Nepal, Consortium for Street Children and DiMaNN, and shared advocacy.",
  },
  "/programs": {
    title: "Areas of Work — 9 Intervention Sectors | CSN Nepal",
    description:
      "Child protection, education, WASH, health, livelihood, disaster response, human rights and inclusive governance — CSN Nepal's areas of work.",
  },
  "/programs/projects": {
    title: "Projects — Flood Response, Tourism & More | CSN Nepal",
    description:
      "Bhotekoshi Flood Response, sustainable tourism trails, coffee livelihoods, scholarships and CILRP — explore CSN Nepal's current and completed projects.",
  },
  "/programs/campaigns": {
    title: "Movements & Campaigns | CSN Nepal",
    description:
      "Discover Midas e-CLASS, child-club capacity building and the People's Caravan for reconstruction — community campaigns led with partners across Nepal.",
  },
  "/programs/events": {
    title: "Events — Trainings & Community Milestones | CSN Nepal",
    description:
      "Rupantaran trainings, TV handovers, child-club meetings and CONSORTIUM presentations — explore milestones from CSN Nepal's events and field work.",
  },
  "/programs/activities": {
    title: "Activities Across Nuwakot | CSN Nepal",
    description:
      "Child networks, scholarships, CILRP livelihoods and parent trainings — explore CSN Nepal's ongoing community activities across Nuwakot and nearby districts.",
  },
  "/news": {
    title: "CSN in Action — News & Updates | CSN Nepal",
    description:
      "Cash-for-work COVID response, child networks, e-learning and trainings — read updates from CSN Nepal's projects and community work across its districts.",
  },
  "/news/clippings": {
    title: "News Clippings & Press Coverage | CSN Nepal",
    description:
      "Social audits, CILRP reviews, teacher grants and relief distributions — browse local and national news coverage of CSN Nepal's community programmes.",
  },
  "/news/press-releases": {
    title: "Press Releases & Official Statements | CSN Nepal",
    description:
      "Official CSN Nepal statements on completed and ongoing programs, including relief, child-friendly spaces and community celebrations with local partners.",
  },
  "/news/fact-sheets": {
    title: "Fact Sheets & Child Policies | CSN Nepal",
    description:
      "Download the State of Children report, CSN's Child Protection Policy and Nepal's National Child Policy 2069, alongside related programme resources.",
  },
  "/news/announcements": {
    title: "Announcements & Vacancies | CSN Nepal",
    description:
      "Job vacancies, quotation calls and official notices from Co-operation Society Nepal — see current openings, deadlines and announcements here.",
  },
  "/vacancies": {
    title: "Vacancies — Current Job Openings | CSN Nepal",
    description:
      "Jobs at CSN Nepal for the Bhotekoshi Flood Response in Nuwakot and Rasuwa: Psychosocial Counsellor / MHPSS Supervisor and Barefoot Counsellor. Apply by email.",
  },
  "/stories": {
    title: "Success Stories From the Field | CSN Nepal",
    description:
      "Tuition classes in Sarlahi, study support in Nuwakot and rebuilt water schemes — read field stories about outcomes for children and communities.",
  },
  "/resources/publications": {
    title: "Publications & Reports | CSN Nepal",
    description:
      "Download CSN Nepal's program reports, including the CILRP/UNDP final report from 2018, plus related research and project documentation for partners.",
  },
  "/resources/policies": {
    title: "Acts, Policies & Safeguarding | CSN Nepal",
    description:
      "Find CSN Nepal's statute, child protection policy, GESI strategy, HR, finance, code of conduct and anti-corruption policies for staff and partners.",
  },
  "/resources/links": {
    title: "Important Links — UNICEF, UNDP & More | CSN Nepal",
    description:
      "Key resources from UNICEF, Save the Children, UNDP Nepal, NGO Federation and street-children networks for development practitioners and partners.",
  },
  "/donate": {
    title: "Donate — Keep a Child in School | CSN Nepal",
    description:
      "See CSN Nepal's donor charter, bank details and audited accounts; contributions support child education and community programs with accountability.",
  },
  "/sponsor": {
    title: "Sponsor a Child's Education | CSN Nepal",
    description:
      "Sponsor fees, uniforms, books and family livelihood support for a vulnerable child in Nuwakot through CSN Nepal; contact the team to learn how.",
  },
  "/gallery": {
    title: "Photo Gallery — Flood Response 2026 | CSN Nepal",
    description:
      "Field photos: Bhotekoshi flood assessment, volunteer orientation, CARITAS relief distribution, shelters and child-friendly spaces by CSN Nepal.",
  },
  "/contact": {
    title: "Contact Us — Bidur, Kathmandu & Field Offices | CSN Nepal",
    description:
      "Contact CSN Nepal's head office in Bidur, contact office in Kathmandu or field offices in Dupcheshwor and Kakani for phone, email, support and partnerships.",
  },
};

export function metaFor(path: string, override?: Meta): Metadata {
  const m = override ?? META[path] ?? META["/"];
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const image = m.image ?? OG_IMAGE;
  const imageAlt = m.imageAlt ?? SITE_NAME;
  const openGraphImage = {
    url: image,
    alt: imageAlt,
    ...(!m.image ? { width: 1200, height: 630 } : {}),
  };
  return {
    title: { absolute: m.title },
    description: m.description,
    alternates: { canonical: url },
    openGraph: {
      title: m.title,
      description: m.description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [openGraphImage],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: [image],
    },
  };
}

export const ALL_PATHS = Object.keys(META);

/** Longest of the candidate titles that still fits in ~60 characters. */
export function fitTitle(...candidates: string[]) {
  return candidates.find((t) => t.length <= 60) ?? candidates[candidates.length - 1];
}

/** Trim a description to search-snippet length at a word boundary. */
export function clampDescription(text: string, max = 160) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:—-]\s*$/, "") + "…";
}

/** "Oct 2, 2026" → "2026-10-02" without timezone drift. */
export function isoDate(display: string) {
  const d = new Date(display);
  if (Number.isNaN(d.getTime())) return undefined;
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
