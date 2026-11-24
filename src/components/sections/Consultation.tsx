import { CheckCircle2 } from "lucide-react";

import consultation from "@/assets/scenes/consultation.webp";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useI18n } from "@/i18n";

export function ConsultationSection({ showHeading = true }: { showHeading?: boolean }) {
  const { t } = useI18n();
  const c = t.consultation;
  return (
    <section id="book" className="relative overflow-hidden bg-forest-gradient py-24 sm:py-32">
      <div className="leaf-pattern absolute inset-0 opacity-40" />
      <div className="blob -left-24 top-20 h-96 w-96 bg-lime/15" />
      <div className="container-page relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="text-forest-foreground">
          {showHeading && <SectionHeading tone="dark" align="left" eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />}
          <Reveal delay={0.1} className="mt-8 space-y-3">
            {c.perks.map((p) => (
              <p key={p} className="flex items-center gap-3 text-forest-foreground/90">
                <CheckCircle2 className="size-5 text-lime" /> {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.2} className="mt-10 hidden overflow-hidden rounded-[2rem] lg:block">
            <img src={consultation} alt={c.imageAlt} loading="lazy" className="aspect-[16/11] w-full object-cover" />
          </Reveal>
        </div>
        <Reveal delay={0.1} className="rounded-[2rem] bg-card p-6 text-card-foreground shadow-lift sm:p-10">
          <h3 className="mb-6 text-2xl font-medium">{c.formTitle}</h3>
          <ConsultationForm />
        </Reveal>
      </div>
    </section>
  );
}
