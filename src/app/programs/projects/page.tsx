import type { Metadata } from "next";
import { metaFor } from "@/lib/seo";
import { PageHero, SectionHeading, DonateBand } from "@/components/site";
import { Card, Badge } from "@/components/ui";
import { PROJECTS } from "@/lib/data";
import { CalendarBlank, Tag } from "@phosphor-icons/react/dist/ssr";

const current = PROJECTS.slice(0, 12);
const earlier = PROJECTS.slice(12);

function ProjectCard({ p }: { p: (typeof PROJECTS)[number] }) {
  return (
    <Card key={p.title} className="p-6 md:p-7">
      <div className="flex flex-wrap gap-2">
        <Badge>
          <CalendarBlank size={14} /> {p.date}
        </Badge>
        <Badge>
          <Tag size={14} /> {p.tag}
        </Badge>
      </div>
      <h3 className="font-display font-semibold text-xl mt-3 leading-snug">{p.title}</h3>
      <p className="mt-2 text-[#043d24]/70 leading-relaxed">{p.excerpt}</p>
    </Card>
  );
}

export const metadata: Metadata = metaFor("/programs/projects");

export default function Page() {
  return (
    <>
      <PageHero
        kicker="Programs • Projects"
        title="Projects"
        intro="From emergency relief after the 2015 earthquake to e-learning and livelihood recovery — every project keeps children safe, in school and with their families."
      />
      <section className="max-w-5xl mx-auto px-4 py-14">
        <SectionHeading
          eyebrow="Portfolio"
          title="All projects"
          body="Sixteen projects across education, child protection, livelihood, tourism and emergency response — newest first."
        />
        <h2 className="font-display font-semibold text-2xl mt-10 text-[#032e1a]">
          Current &amp; recent programs (profile, 2013–2026)
        </h2>
        <div className="grid gap-5 mt-5">
          {current.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
        </div>
        <h2 className="font-display font-semibold text-2xl mt-12 text-[#032e1a]">
          Earlier work (website archive)
        </h2>
        <div className="grid gap-5 mt-5">
          {earlier.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
        </div>
      </section>
      <DonateBand />
    </>
  );
}
