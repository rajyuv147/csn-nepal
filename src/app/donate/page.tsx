import type { Metadata } from "next";
import { metaFor } from "@/lib/seo";
import { FaqSection } from "@/components/faq";
import { PageHero, DonateBand } from "@/components/site";
import { Card, Badge, Button, Input, Label } from "@/components/ui";
import { CONTACT, FINANCE_SYSTEM } from "@/lib/data";
import { Heart, ShieldCheck, Bank } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = metaFor("/donate");

const FAQS = [
  {
    question: "How can I donate to CSN Nepal?",
    answer:
      "Fill in the donation form on this page, or transfer directly to CSN's official accounts: Prime Bank Ltd., Balaju Branch (A/C 00701000000089200110) or Himalayan Bank Ltd., Battar (NPR 026-05185800012). Email csnnepal@gmail.com after your transfer so CSN can issue a receipt.",
  },
  {
    question: "Can I donate to CSN Nepal from outside Nepal?",
    answer:
      "Yes. International donors can send a bank transfer to Prime Bank Ltd., Balaju Branch, account 00701000000089200110, SWIFT code PCBLNPKA. Email csnnepal@gmail.com after the transfer so CSN can confirm receipt.",
  },
  {
    question: "Is CSN Nepal a registered non-profit?",
    answer:
      `Yes. Co-operation Society Nepal is registered with the District Administration Office, Nuwakot (Regd. No. 401/81), affiliated with the Social Welfare Council (No. 37085) and holds ${CONTACT.pan}.`,
  },
  {
    question: "How does CSN make sure donations are used properly?",
    answer:
      "Gifts are applied to their intended purposes. Accounts are operated by joint signatures, every transaction is approved by an authorised person, each project has separate records, and income and expenditure are audited every year by an independent authorised auditor approved by the AGM.",
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        kicker="Support • Donate"
        title="Donate"
        intro="Your gift keeps a child in school, a family together — and a community standing back up."
      />
      <section className="max-w-5xl mx-auto px-4 py-14 space-y-10">
        <Card className="p-8">
          <div className="flex items-center gap-3">
            <ShieldCheck size={32} weight="duotone" className="text-[#01723b]" />
            <h2 className="font-display text-2xl font-semibold">Our donor charter pledge</h2>
          </div>
          <p className="mt-4 text-[#043d24]/70 leading-relaxed">
            We treat every donor with respect, honesty and openness. Gifts are applied to their
            intended purposes, and we remain accountable and transparent — publishing social
            audits, reviews and reports on how funds are used.
          </p>
          <ul className="mt-4 space-y-2 text-[15px] text-[#043d24]/70 list-disc pl-6">
            <li>Respect, honesty and openness in every donor relationship.</li>
            <li>Gifts applied to their intended purposes.</li>
            <li>Accountable and transparent use of funds.</li>
          </ul>

        </Card>

        <Card className="p-8">
          <div className="flex items-center gap-3">
            <Heart size={30} weight="fill" className="text-[#b97d00]" />
            <h2 className="font-display text-2xl font-semibold">Make a donation</h2>
          </div>
          <p className="text-sm text-[#043d24]/60 mt-1">
            Facing difficulties with this form? Email csnnepal@gmail.com and we will help you
            complete your donation.
          </p>
          <form action="mailto:csnnepal@gmail.com" method="post" encType="text/plain" className="grid gap-4 mt-6 md:grid-cols-2">
            <div>
              <Label htmlFor="d-name">Name</Label>
              <Input id="d-name" name="name" placeholder="Full name" required />
            </div>
            <div>
              <Label htmlFor="d-email">Email</Label>
              <Input id="d-email" name="email" type="email" placeholder="you@example.com" required />
            </div>
            <div>
              <Label htmlFor="d-phone">Contact Number</Label>
              <Input id="d-phone" name="phone" placeholder="+977-…" />
            </div>
            <div>
              <Label htmlFor="d-amount">Amount</Label>
              <Input id="d-amount" name="amount" placeholder="e.g. NPR 5,000" required />
            </div>
            <div>
              <Label htmlFor="d-addr1">Address 1</Label>
              <Input id="d-addr1" name="address1" placeholder="Street / ward" />
            </div>
            <div>
              <Label htmlFor="d-addr2">Address 2</Label>
              <Input id="d-addr2" name="address2" placeholder="City / district" />
            </div>
            <div className="md:col-span-2">
              <Button type="submit">
                <Heart size={16} weight="fill" /> Donate now
              </Button>
            </div>
          </form>
        </Card>

        <Card className="p-8">
          <div className="flex items-center gap-3">
            <Bank size={30} weight="duotone" className="text-[#01723b]" />
            <h2 className="font-display text-2xl font-semibold">Bank details</h2>
          </div>
          <p className="mt-4 text-[#043d24]/70 leading-relaxed">
            Prefer a direct transfer? You can donate to our official accounts below. Please
            email csnnepal@gmail.com after your transfer so we can issue a receipt.
          </p>
          <ul className="mt-4 space-y-3 text-[15px] text-[#043d24]/80">
            <li className="rounded-2xl border border-[#01723b]/10 bg-[#e7f3ec]/60 p-4">
              <span className="font-bold">Prime Bank Ltd., Balaju Branch</span>
              <br />
              A/C 00701000000089200110 (Swift: PCBLNPKA)
            </li>
            <li className="rounded-2xl border border-[#01723b]/10 bg-[#e7f3ec]/60 p-4">
              <span className="font-bold">Himalayan Bank Ltd., Battar</span>
              <br />
              NPR 026-05185800012
            </li>
            <li className="rounded-2xl border border-[#01723b]/10 p-4">
              <span className="font-bold">Project accounts: </span>
              SBI Bank, Garima Bikash Bank (UNDP/CILRP, CSN/SCAI) and Sanima Bank
              (CSN/APCF) — separate accounts per project.
            </li>
          </ul>
          <p className="mt-3 text-xs text-[#043d24]/60">{CONTACT.bank}</p>
        </Card>

        <Card className="p-8 border-l-8 border-l-[#f6b231]">
          <div className="flex items-center gap-3">
            <ShieldCheck size={30} weight="duotone" className="text-[#01723b]" />
            <h2 className="font-display text-2xl font-semibold">Financial accountability</h2>
          </div>
          <ul className="mt-4 space-y-2 text-[15px] text-[#043d24]/70 list-disc pl-6">
            {FINANCE_SYSTEM.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>

        <Card className="p-8 bg-[#e7f3ec]/60">
          <Badge>Where does your donation go?</Badge>
          <h2 className="font-display text-2xl font-semibold mt-3">
            Straight to children and communities
          </h2>
          <p className="mt-2 text-[#043d24]/70 leading-relaxed">
            School fees and scholarships, uniforms and learning materials, health camps,
            child-protection case support, cash-for-work and community infrastructure — every
            rupee is tracked through public social audits.
          </p>
        </Card>
      </section>
      <FaqSection faqs={FAQS} />
      <DonateBand />
    </>
  );
}
