import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useI18n } from "@/i18n";

export function Faq() {
  const { t } = useI18n();
  return (
    <section className="py-24 sm:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading align="left" eyebrow={t.faq.eyebrow} title={t.faq.title} />
        <Reveal>
          <Accordion type="single" collapsible className="space-y-3">
            {t.faq.items.map((f, i) => (
              <AccordionItem key={i} value={`q${i}`} className="rounded-3xl border bg-card px-6 shadow-soft data-[state=open]:bg-sage">
                <AccordionTrigger className="py-5 text-left font-display text-lg font-normal hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
