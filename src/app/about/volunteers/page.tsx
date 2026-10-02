import { PageHero, DonateBand } from "@/components/site";
import { Card, Badge, Button, Input, Textarea, Label } from "@/components/ui";
import {
  HandsClapping,
  BookOpen,
  FirstAid,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import { metaFor } from "@/lib/seo";

export const metadata: Metadata = metaFor("/about/volunteers");

const ROLES = [
  {
    icon: BookOpen,
    title: "Teaching & Learning Support",
    body: "Support tuition classes, Midas e-CLASS digital learning, school libraries and exam preparation in rural Nuwakot schools.",
  },
  {
    icon: FirstAid,
    title: "Health Camp Volunteer",
    body: "Help organise health check-ups, sanitation drives and awareness camps for vulnerable children, women and youth.",
  },
  {
    icon: ShieldCheck,
    title: "Disaster Risk Reduction",
    body: "Join preparedness training, community planning, relief distribution and recovery support during emergencies.",
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        kicker="About • Get Involved"
        title="Volunteers"
        intro="Our archive lists a full volunteers roster — and our doors are always open to new helping hands."
      />
      <section className="max-w-5xl mx-auto px-4 py-14 space-y-10">
        <Card className="p-8 flex flex-col md:flex-row items-start gap-5">
          <span className="grid place-items-center w-14 h-14 rounded-2xl bg-[#e7f3ec] text-[#01723b] shrink-0">
            <HandsClapping size={30} weight="duotone" />
          </span>
          <div>
            <Badge>Volunteer invitation</Badge>
            <h2 className="font-display text-2xl font-semibold mt-3">
              Come, volunteer with CSN
            </h2>
            <p className="mt-2 text-[#043d24]/70 leading-relaxed">
              Whether you can teach, organise a health camp, translate, photograph events or help
              during disasters — there is a place for you. Students, professionals and retirees
              from Nepal and abroad are all welcome.
            </p>
          </div>
        </Card>

        <div className="grid gap-5 md:grid-cols-3">
          {ROLES.map((r) => (
            <Card key={r.title} className="p-7">
              <r.icon size={34} weight="duotone" className="text-[#b97d00]" />
              <h3 className="font-bold text-lg mt-4">{r.title}</h3>
              <p className="text-sm text-[#043d24]/70 mt-2 leading-relaxed">{r.body}</p>
            </Card>
          ))}
        </div>

        <Card className="p-8">
          <h2 className="font-display text-2xl font-semibold">Volunteer sign-up</h2>
          <p className="text-sm text-[#043d24]/60 mt-1">
            Fill this in and send it to us — having difficulties? Email csnnepal@gmail.com and
            we will get back to you.
          </p>
          <form
            action="mailto:csnnepal@gmail.com"
            method="post"
            encType="text/plain"
            className="grid gap-4 mt-6 md:grid-cols-2"
          >
            <div>
              <Label htmlFor="v-name">Full name</Label>
              <Input id="v-name" name="name" placeholder="Your name" required />
            </div>
            <div>
              <Label htmlFor="v-email">Email</Label>
              <Input id="v-email" name="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="v-interest">Area of interest</Label>
              <Input
                id="v-interest"
                name="interest"
                placeholder="e.g. Teaching, health camp, DRR, photography…"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="v-msg">Message</Label>
              <Textarea id="v-msg" name="message" placeholder="Tell us a little about yourself…" />
            </div>
            <div className="md:col-span-2">
              <Button type="submit">Send application</Button>
            </div>
          </form>
        </Card>
      </section>
      <DonateBand />
    </>
  );
}
