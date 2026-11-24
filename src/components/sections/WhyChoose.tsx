import { BadgeCheck, FlaskConical, HeartHandshake, MapPinned } from "lucide-react";

import consultation from "@/assets/scenes/consultation.webp";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useI18n } from "@/i18n";

const ICONS = [FlaskConical, BadgeCheck, HeartHandshake, MapPinned];

export function WhyChoose() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading align="left" eyebrow={t.why.eyebrow} title={t.why.title} />
          <div className="mt-12 space-y-3">
            {t.why.items.map((item, i) => {
              const Icon = ICONS[i]!;
              return (
                <Reveal key={item.title} delay={i * 0.08}>
                  <div className="group flex gap-5 rounded-3xl p-4 transition-colors duration-300 hover:bg-sage sm:p-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-forest text-lime transition-transform duration-500 group-hover:scale-110">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-sans text-lg font-bold">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
        <Reveal className="relative">
          <div className="absolute -inset-4 rotate-3 rounded-[2.75rem] bg-brand-gradient opacity-25 blur-sm" />
          <img
            src={consultation}
            alt={t.consultation.imageAlt}
            loading="lazy"
            className="relative aspect-[4/4.2] w-full rounded-[2.5rem] object-cover shadow-lift"
          />
          <div className="glass absolute -bottom-6 left-6 right-6 rounded-3xl p-5 shadow-lift sm:left-auto sm:w-72">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{t.consultation.eyebrow}</p>
            <p className="mt-1 font-display text-xl leading-snug">{t.hero.floatCard}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
