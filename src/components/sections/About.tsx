import { Link } from "@tanstack/react-router";
import { ArrowRight, Eye, HandHeart, Leaf as LeafIcon, ShieldCheck, Sparkles, Target, Users } from "lucide-react";

import botanicals from "@/assets/scenes/about-botanicals.webp";
import { Button } from "@/components/ui/button";
import { Leaf } from "@/components/site/Leaf";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useCatalog } from "@/data/store";
import { useI18n } from "@/i18n";

export function AboutIntro({ withLink = false }: { withLink?: boolean }) {
  const { t } = useI18n();
  const { categories, products } = useCatalog();
  const stats = [
    { value: t.about.foundedValue, label: t.about.founded },
    { value: String(categories.length), label: t.about.categoriesStat },
    { value: `${products.length}+`, label: t.about.productsStat },
  ];
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-lift">
            <img src={botanicals} alt={t.about.imageAlt} loading="lazy" decoding="async" width={1200} height={1096} className="aspect-[4/5] w-full object-cover sm:aspect-[5/5]" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/40 via-transparent to-transparent" />
          </div>
          <div className="glass absolute -bottom-6 right-4 rounded-3xl p-5 shadow-lift sm:-right-6">
            <p className="font-display text-4xl text-primary">{t.about.accessStat}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t.hero.badgeLocation}</p>
          </div>
          <Leaf className="absolute -left-8 -top-10 h-40 w-24 -rotate-[20deg] text-lime" />
        </Reveal>

        <div>
          <SectionHeading align="left" eyebrow={t.about.eyebrow} title={t.about.title} />
          <Reveal delay={0.1} className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p className="font-display text-2xl leading-snug text-foreground">{t.about.p1}</p>
            <p>{t.about.p2}</p>
          </Reveal>
          <Reveal delay={0.2} className="mt-10 grid grid-cols-3 gap-4 border-t pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl text-foreground sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-xs leading-snug text-muted-foreground sm:text-sm">{s.label}</p>
              </div>
            ))}
          </Reveal>
          {withLink && (
            <Reveal delay={0.3} className="mt-10">
              <Button asChild variant="outline" size="lg">
                <Link to="/about">
                  {t.common.learnMore}
                  <ArrowRight />
                </Link>
              </Button>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

export function VisionMission() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden bg-forest-gradient py-24 text-forest-foreground sm:py-32">
      <div className="leaf-pattern absolute inset-0 opacity-50" />
      <div className="blob -right-20 top-0 h-96 w-96 bg-lime/15" />
      <div className="container-page relative grid gap-6 lg:grid-cols-2">
        <Reveal className="glass-dark rounded-[2rem] p-8 sm:p-12">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lime text-lime-foreground">
            <Eye className="size-6" />
          </span>
          <h2 className="mt-8 text-3xl font-medium sm:text-4xl">{t.about.visionTitle}</h2>
          <p className="mt-5 font-display text-2xl leading-snug text-forest-foreground/90 sm:text-[1.7rem]">{t.about.vision}</p>
        </Reveal>
        <Reveal delay={0.12} className="glass-dark rounded-[2rem] p-8 sm:p-12">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lime text-lime-foreground">
            <Target className="size-6" />
          </span>
          <h2 className="mt-8 text-3xl font-medium sm:text-4xl">{t.about.missionTitle}</h2>
          <p className="mt-5 text-lg leading-relaxed text-forest-foreground/90">{t.about.mission1}</p>
          <p className="mt-4 text-lg leading-relaxed text-forest-muted">{t.about.mission2}</p>
        </Reveal>
      </div>
    </section>
  );
}

const VALUE_ICONS = [ShieldCheck, LeafIcon, Users, Sparkles];

export function CoreValues() {
  const { t } = useI18n();
  return (
    <section className="py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading eyebrow={t.about.valuesEyebrow} title={t.about.valuesTitle} />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.about.values.map((v, i) => {
            const Icon = VALUE_ICONS[i] ?? HandHeart;
            return (
              <Reveal key={v.title} delay={i * 0.08}>
                <article className="group relative h-full overflow-hidden rounded-[2rem] border bg-card p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
                  <span className="absolute right-6 top-6 font-display text-5xl text-secondary transition-colors duration-500 group-hover:text-accent">
                    0{i + 1}
                  </span>
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="relative mt-8 text-2xl font-medium">{v.title}</h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
