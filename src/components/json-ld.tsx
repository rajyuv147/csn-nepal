import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { CONTACT, INTERVENTION_AREAS, NETWORKS } from "@/lib/data";

const ORG_ID = `${SITE_URL}/#organisation`;

const ngoSchema = {
  "@type": "NGO",
  "@id": ORG_ID,
  name: SITE_NAME,
  legalName: "Co-operation Society Nepal",
  alternateName: ["CSN Nepal", "CSN", "Cooperation Society Nepal", "सहकार्य समाज नेपाल", "Sahakarya Samaj Nepal"],
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    "@id": `${SITE_URL}/#logo`,
    url: `${SITE_URL}/logo.png`,
    caption: SITE_NAME,
  },
  image: { "@id": `${SITE_URL}/#logo` },
  description:
    "Non-governmental, non-profit, non-political and non-religious social development organisation established in 2013 in Nuwakot, Nepal, working in child protection, education, health, livelihood, disaster response and community empowerment.",
  slogan: "Change is possible — let's start from today",
  ethicsPolicy: `${SITE_URL}/resources/policies`,
  foundingDate: "2013",
  foundingLocation: { "@type": "Place", name: "Nuwakot, Nepal" },
  taxID: CONTACT.pan.replace(/^PAN:\s*/, ""),
  identifier: [
    { "@type": "PropertyValue", propertyID: "District Administration Office Nuwakot registration", value: "401/81" },
    { "@type": "PropertyValue", propertyID: "Social Welfare Council affiliation", value: "37085" },
    { "@type": "PropertyValue", propertyID: "PAN", value: CONTACT.pan.replace(/^PAN:\s*/, "") },
  ],
  email: CONTACT.email[0],
  telephone: CONTACT.phones[1],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "general inquiries",
      email: CONTACT.email[0],
      telephone: CONTACT.phones[1],
      availableLanguage: ["English", "Nepali"],
      areaServed: "NP",
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bidur-4, Battar",
    addressLocality: "Bidur",
    addressRegion: "Nuwakot District, Bagmati Province",
    postOfficeBoxNumber: "9632",
    addressCountry: "NP",
  },
  location: [
    {
      "@type": "Place",
      name: "CSN Head Office",
      address: { "@type": "PostalAddress", streetAddress: "Bidur-4, Battar", addressLocality: "Bidur", addressRegion: "Nuwakot", addressCountry: "NP" },
      hasMap: CONTACT.headOfficeMap,
    },
    {
      "@type": "Place",
      name: "CSN Contact Office",
      address: { "@type": "PostalAddress", streetAddress: "Budhanilkantha-6", addressLocality: "Kathmandu", addressCountry: "NP" },
      telephone: "+977-014371433",
    },
  ],
  hasMap: CONTACT.headOfficeMap,
  areaServed: ["Nuwakot", "Rasuwa", "Dhading", "Kathmandu", "Tanahun", "Syangja", "Makawanpur"].map((d) => ({
    "@type": "AdministrativeArea",
    name: `${d} District, Nepal`,
  })),
  knowsAbout: [...INTERVENTION_AREAS, "Flood response", "Child-friendly spaces", "Sustainable tourism"],
  memberOf: NETWORKS.map((n) => ({
    "@type": "Organization",
    name: n.name,
    ...(n.web ? { url: n.web } : {}),
  })),
  sameAs: [
    "https://www.facebook.com/www.csnnepal.org.np/",
    "https://x.com/CSNNepal",
  ],
};

const websiteSchema = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  alternateName: "CSN Nepal",
  description: "Official website of Co-operation Society Nepal (CSN), a non-profit based in Nuwakot, Nepal.",
  publisher: { "@id": ORG_ID },
  inLanguage: "en",
};

export function OrganisationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [ngoSchema, websiteSchema] }),
      }}
    />
  );
}

export function FaqJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }),
      }}
    />
  );
}
