import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { CONTACT } from "@/lib/data";

const ngoSchema = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "@id": `${SITE_URL}/#organisation`,
  name: SITE_NAME,
  alternateName: ["CSN Nepal", "सहकार्य समाज नेपाल"],
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo.png`,
  },
  image: `${SITE_URL}/og-image.png`,
  description:
    "Non-governmental, non-profit social development organisation (est. 2013, Nuwakot) working in child protection, education, health, livelihood, disaster response and community empowerment.",
  foundingDate: "2013",
  email: CONTACT.email[0],
  telephone: CONTACT.phones[0],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "general inquiries",
    email: CONTACT.email[0],
    telephone: CONTACT.phones[0],
    availableLanguage: ["English", "Nepali"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bidur-4, Battar",
    addressLocality: "Bidur",
    addressRegion: "Nuwakot District",
    addressCountry: "NP",
  },
  hasMap: CONTACT.headOfficeMap,
  areaServed: [
    "Nuwakot District, Nepal",
    "Rasuwa District, Nepal",
    "Dhading District, Nepal",
    "Kathmandu, Nepal",
    "Tanahun District, Nepal",
    "Syangja District, Nepal",
    "Makawanpur District, Nepal",
  ],
  knowsAbout: [
    "Child protection",
    "Education",
    "Public health",
    "Livelihood",
    "Disaster risk reduction",
    "Water sanitation and hygiene",
  ],
  sameAs: [
    "https://www.facebook.com/www.csnnepal.org.np/",
    "https://x.com/CSNNepal",
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
