import type { Metadata } from "next";

export const SITE_URL = "https://csnnepal.org.np";
export const SITE_NAME = "Co-operation Society Nepal (CSN)";
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

type Meta = { title: string; description: string };

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
      "Meet CSN Nepal's 7-member executive board, executive director and founder board — qualifications, experience and democratic governance.",
  },
  "/about/advisory-board": {
    title: "Advisory Board | CSN Nepal",
    description:
      "Scientists, professors and child-rights activists advising Co-operation Society Nepal's direction and programs.",
  },
  "/about/structure": {
    title: "Organisational Structure | CSN Nepal",
    description:
      "How CSN Nepal is organised — General Assembly, executive board, program team, field staff and community structures.",
  },
  "/about/staff": {
    title: "Staff Members | CSN Nepal",
    description:
      "Program coordinators, finance officers, engineers, social mobilizers and field officers delivering CSN Nepal's work in Nuwakot.",
  },
  "/about/volunteers": {
    title: "Volunteer With Us | CSN Nepal",
    description:
      "Volunteer with CSN Nepal in teaching, health camps and disaster response. See roles and how to sign up today.",
  },
  "/about/partners": {
    title: "Our Partners | CSN Nepal",
    description:
      "UNDP, UNICEF, CARITAS, APC France, SCAI Australia and municipalities partnering with CSN Nepal for community development.",
  },
  "/about/networks": {
    title: "Our Networks | CSN Nepal",
    description:
      "CSN Nepal's civil-society networks — NGO Federation, CONSORTIUM Nepal, Consortium for Street Children, DiMaNN and more.",
  },
  "/programs": {
    title: "Areas of Work — 9 Intervention Sectors | CSN Nepal",
    description:
      "Child protection, education, WASH, health, livelihood, disaster response, human rights and inclusive governance — CSN Nepal's areas of work.",
  },
  "/programs/projects": {
    title: "Projects — Flood Response, Tourism & More | CSN Nepal",
    description:
      "Bhotekoshi Flood Response, sustainable tourism trails, coffee livelihoods, scholarships and CILRP — all CSN Nepal projects 2013–2026.",
  },
  "/programs/campaigns": {
    title: "Movements & Campaigns | CSN Nepal",
    description:
      "Midas e-CLASS digital classrooms, child-club capacity building and the People's Caravan for reconstruction — CSN Nepal campaigns.",
  },
  "/programs/events": {
    title: "Events — Trainings & Community Milestones | CSN Nepal",
    description:
      "Rupantaran trainings, TV handovers, child-club meetings and CONSORTIUM presentations — events from CSN Nepal's field diary.",
  },
  "/programs/activities": {
    title: "Activities Across Nuwakot | CSN Nepal",
    description:
      "Child networks, scholarships, CILRP livelihoods and parent trainings — a running record of CSN Nepal's community activities.",
  },
  "/news": {
    title: "CSN in Action — News & Updates | CSN Nepal",
    description:
      "Cash-for-work COVID response, child networks, e-learning and trainings — the latest news from CSN Nepal's field work.",
  },
  "/news/clippings": {
    title: "News Clippings & Press Coverage | CSN Nepal",
    description:
      "Social audits, CILRP reviews, teacher grants and relief distributions — CSN Nepal in local and national media.",
  },
  "/news/press-releases": {
    title: "Press Releases | CSN Nepal",
    description:
      "Official CSN Nepal statements on completed and ongoing programs — relief, child-friendly spaces and community celebrations.",
  },
  "/news/fact-sheets": {
    title: "Fact Sheets & Child Policies | CSN Nepal",
    description:
      "Download the State of Children report, CSN's Child Protection Policy and Nepal's National Child Policy 2069.",
  },
  "/news/announcements": {
    title: "Announcements & Vacancies | CSN Nepal",
    description:
      "Job vacancies, quotation calls and official notices from Co-operation Society Nepal — check current openings.",
  },
  "/stories": {
    title: "Success Stories From the Field | CSN Nepal",
    description:
      "Tuition classes in Sarlahi, study support in Nuwakot and rebuilt water schemes — real outcomes of CSN Nepal's work.",
  },
  "/resources/publications": {
    title: "Publications & Reports | CSN Nepal",
    description:
      "Download CSN Nepal's program reports including the CILRP/UNDP final report 2018 and project documentation.",
  },
  "/resources/policies": {
    title: "Acts, Policies & Safeguarding | CSN Nepal",
    description:
      "CSN Nepal's statute, child protection policy, GESI strategy, HR, finance, code of conduct and anti-corruption policies.",
  },
  "/resources/links": {
    title: "Important Links — UNICEF, UNDP & More | CSN Nepal",
    description:
      "Key development links: UNICEF, Save the Children, UNDP Nepal, NGO Federation and street-children consortium resources.",
  },
  "/donate": {
    title: "Donate — Keep a Child in School | CSN Nepal",
    description:
      "Donate to CSN Nepal: transparent donor charter, audited accounts and bank details. Your gift keeps a child in school.",
  },
  "/sponsor": {
    title: "Sponsor a Child's Education | CSN Nepal",
    description:
      "Sponsor fees, uniforms and family livelihood support for a vulnerable child in Nuwakot through CSN Nepal today.",
  },
  "/gallery": {
    title: "Photo Gallery — Flood Response 2026 | CSN Nepal",
    description:
      "38 field photos: Bhotekoshi flood assessment, volunteer orientation, relief, shelters and child-friendly spaces by CSN Nepal.",
  },
  "/contact": {
    title: "Contact Us — Bidur, Kathmandu & Field Offices | CSN",
    description:
      "Reach CSN Nepal: head office Bidur-4 Battar, contact office Kathmandu, field offices in Dupcheshwor and Kakani — phone, email, form.",
  },
};

export function metaFor(path: string): Metadata {
  const m = META[path] ?? META["/"];
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: url },
    openGraph: {
      title: m.title,
      description: m.description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: [OG_IMAGE],
    },
  };
}

export const ALL_PATHS = Object.keys(META);
