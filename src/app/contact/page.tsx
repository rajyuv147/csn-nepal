import type { Metadata } from "next";
import { metaFor } from "@/lib/seo";
import { PageHero, DonateBand } from "@/components/site";
import { Card, Badge, Button, Input, Textarea, Label } from "@/components/ui";
import { CONTACT } from "@/lib/data";
import {
  MapPin,
  Phone,
  EnvelopeSimple,
  Package,
} from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = metaFor("/contact");

export default function Page() {
  return (
    <>
      <PageHero
        kicker="Get in Touch"
        title="Contact Us"
        intro="Questions, partnerships or support — fill out the form & we'll do our best to help."
      />
      <section className="max-w-6xl mx-auto px-4 py-14 space-y-10">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6">
            <MapPin size={28} weight="duotone" className="text-[#01723b]" />
            <h3 className="font-bold mt-3">Head Office</h3>
            <p className="text-sm text-[#043d24]/70 mt-1">Bidur-4, Battar, Nuwakot, Nepal</p>
          </Card>
          <Card className="p-6">
            <MapPin size={28} weight="duotone" className="text-[#01723b]" />
            <h3 className="font-bold mt-3">Contact Office</h3>
            <p className="text-sm text-[#043d24]/70 mt-1">
              Budhanilkantha-6, Kathmandu — 01-4371433
            </p>
          </Card>
          <Card className="p-6">
            <Phone size={28} weight="duotone" className="text-[#01723b]" />
            <h3 className="font-bold mt-3">Phones</h3>
            <ul className="text-sm text-[#043d24]/70 mt-1 space-y-1">
              {CONTACT.phones.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </Card>
          <Card className="p-6">
            <EnvelopeSimple size={28} weight="duotone" className="text-[#01723b]" />
            <h3 className="font-bold mt-3">Email &amp; PO Box</h3>
            <ul className="text-sm text-[#043d24]/70 mt-1 space-y-1">
              {CONTACT.email.map((e) => (
                <li key={e} className="break-all">{e}</li>
              ))}
              <li className="flex items-center gap-1.5">
                <Package size={15} /> {CONTACT.poBox}
              </li>
            </ul>
          </Card>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Card className="p-6 border-l-8 border-l-[#f6b231]">
            <MapPin size={26} weight="duotone" className="text-[#01723b]" />
            <h3 className="font-bold mt-3">Field Office — Dupcheshwor</h3>
            <p className="text-sm text-[#043d24]/70 mt-1">
              Dupcheshwor RM-6, Samundratar — 9851201624 / 9840095160
            </p>
          </Card>
          <Card className="p-6 border-l-8 border-l-[#f6b231]">
            <MapPin size={26} weight="duotone" className="text-[#01723b]" />
            <h3 className="font-bold mt-3">Field Office — Kakani</h3>
            <p className="text-sm text-[#043d24]/70 mt-1">
              Kakani RM-4, Ranipauwa — 9849900528
            </p>
          </Card>
        </div>

        <Card className="p-6 bg-[#e7f3ec]/60">
          <p className="text-[15px] text-[#043d24]/80 leading-relaxed">
            <span className="font-bold">Working districts: </span>
            {CONTACT.workingDistricts}
          </p>
          <p className="text-[15px] text-[#043d24]/80 leading-relaxed mt-2">
            <span className="font-bold">Principal person (Executive Director): </span>
            {CONTACT.principal}
          </p>
        </Card>

        <div className="grid gap-5 lg:grid-cols-2">
          <Card className="p-8">
            <Badge>Send a query</Badge>
            <h2 className="font-display text-2xl font-semibold mt-3">We reply quickly</h2>
            <form
              action="mailto:csnnepal@gmail.com"
              method="post"
              encType="text/plain"
              className="grid gap-4 mt-6"
            >
              <div>
                <Label htmlFor="c-name">Name</Label>
                <Input id="c-name" name="name" placeholder="Your name" required />
              </div>
              <div>
                <Label htmlFor="c-email">Email</Label>
                <Input id="c-email" name="email" type="email" placeholder="you@example.com" required />
              </div>
              <div>
                <Label htmlFor="c-msg">Message</Label>
                <Textarea id="c-msg" name="message" placeholder="How can we help?" />
              </div>
              <div>
                <Button type="submit">Send message</Button>
              </div>
            </form>
          </Card>
          <div className="rounded-3xl border border-[#01723b]/10 bg-[#032e1a] text-white grid place-items-center min-h-80 p-10 text-center relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#f6b231]/20 blur-3xl" />
            <div className="relative">
              <span className="mx-auto grid place-items-center w-14 h-14 rounded-2xl bg-white/10">
                <MapPin size={30} weight="duotone" className="text-[#f6b231]" />
              </span>
              <p className="text-sm font-bold tracking-wide text-[#f6b231] mt-4">LOCATION MAP</p>
              <h3 className="font-display text-2xl font-semibold mt-1">Bidur, Nuwakot, Nepal</h3>
              <p className="text-white/60 text-sm mt-2 max-w-sm">
                Head office at Bidur-4, Battar — with a contact office at Budhanilkantha-6,
                Kathmandu (01-4371433). Interactive map coming soon.
              </p>
            </div>
          </div>
        </div>
      </section>
      <DonateBand />
    </>
  );
}
