import { PageHero, DonateBand } from "@/components/site";
import { Card, Badge, Button, Input, Label } from "@/components/ui";
import { GraduationCap, CheckCircle } from "@phosphor-icons/react/dist/ssr";

const COVERS = [
  "School fees and admission costs",
  "Uniforms, shoes and school bags",
  "Books, copies and learning materials",
  "Regular family follow-up and counselling",
];

export default function Page() {
  return (
    <>
      <PageHero
        kicker="Support • Sponsor a Child"
        title="Sponsor"
        intro="Many rural Nuwakot children walk up to two hours each way to school. Your sponsorship keeps them in class."
      />
      <section className="max-w-5xl mx-auto px-4 py-14 space-y-10">
        <Card className="p-8">
          <div className="flex items-center gap-3">
            <GraduationCap size={32} weight="duotone" className="text-[#01723b]" />
            <h2 className="font-display text-2xl font-semibold">Sponsorship form</h2>
          </div>
          <p className="text-sm text-[#043d24]/60 mt-1">
            Prefer email? Write to csnnepal@gmail.com and we will match you with a child.
          </p>
          <form action="mailto:csnnepal@gmail.com" method="post" encType="text/plain" className="grid gap-4 mt-6 md:grid-cols-2">
            <div>
              <Label htmlFor="s-name">Name</Label>
              <Input id="s-name" name="name" placeholder="Full name" required />
            </div>
            <div>
              <Label htmlFor="s-email">Email</Label>
              <Input id="s-email" name="email" type="email" placeholder="you@example.com" required />
            </div>
            <div>
              <Label htmlFor="s-phone">Contact Number</Label>
              <Input id="s-phone" name="phone" placeholder="+977-…" />
            </div>
            <div>
              <Label htmlFor="s-addr">Address</Label>
              <Input id="s-addr" name="address" placeholder="City / country" />
            </div>
            <div>
              <Label htmlFor="s-amount">Contribution Amount</Label>
              <Input id="s-amount" name="amount" placeholder="e.g. NPR 25,000 / year" required />
            </div>
            <div>
              <Label htmlFor="s-duration">Sponsorship Duration</Label>
              <Input id="s-duration" name="duration" placeholder="e.g. 1 year, until grade 10…" />
            </div>
            <div className="md:col-span-2">
              <Button type="submit">Become a sponsor</Button>
            </div>
          </form>
        </Card>

        <Card className="p-8 bg-[#e7f3ec]/60">
          <Badge>What sponsorship covers</Badge>
          <div className="grid gap-3 mt-4 sm:grid-cols-2">
            {COVERS.map((c) => (
              <p key={c} className="flex items-start gap-2 text-[15px] text-[#043d24]/75">
                <CheckCircle size={20} weight="duotone" className="text-[#157a48] shrink-0 mt-0.5" />
                {c}
              </p>
            ))}
          </div>
        </Card>
      </section>
      <DonateBand />
    </>
  );
}
