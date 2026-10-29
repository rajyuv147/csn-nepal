import { FaqJsonLd } from "@/components/json-ld";
import { Card } from "@/components/ui";

export type Faq = { question: string; answer: string };

/** Visible Q&A list plus matching FAQPage structured data — answer text must match what is shown. */
export function FaqSection({
  faqs,
  title = "Frequently asked questions",
  className = "max-w-5xl mx-auto px-4 pb-14",
}: {
  faqs: Faq[];
  title?: string;
  className?: string;
}) {
  return (
    <section className={className} aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="font-display text-2xl md:text-3xl font-semibold">
        {title}
      </h2>
      <FaqJsonLd faqs={faqs} />
      <div className="mt-6 space-y-4">
        {faqs.map((f) => (
          <Card key={f.question} className="p-6">
            <h3 className="font-display font-semibold text-lg">{f.question}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-[#043d24]/75">{f.answer}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
