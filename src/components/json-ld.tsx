import { SITE_URL, SITE_NAME } from "@/lib/seo";

const ngoSchema = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "@id": `${SITE_URL}/#organisation`,
  name: SITE_NAME,
  alternateName: ["CSN Nepal", "सहकार्य समाज नेपाल"],
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/og-image.png`,
  description:
    "Non-governmental, non-profit social development organisation (est. 2013, Nuwakot) working in child protection, education, health, livelihood, disaster response and community empowerment.",
  foundingDate: "2013",
  nonprofitStatus: "NonprofitType",
  email: "info@csnnepal.org.np",
  telephone: "+977-010561001",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bidur-4, Battar",
    addressLocality: "Nuwakot",
    postalCode: "9632",
    addressCountry: "NP",
  },
  areaServed: ["Nuwakot", "Rasuwa", "Dhading", "Kathmandu"],
  knowsAbout: [
    "Child protection",
    "Education",
    "Public health",
    "Livelihood",
    "Disaster risk reduction",
    "Water sanitation and hygiene",
  ],
  sameAs: [
    "https://www.facebook.com/CSN-479905355534275/",
    "https://twitter.com/CSNNepal",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { "@id": `${SITE_URL}/#organisation` },
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
