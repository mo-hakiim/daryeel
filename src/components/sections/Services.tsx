import { Link, linkOptions } from "@tanstack/react-router";
import { ArrowUpRight, Dumbbell, Leaf, Pill, Sparkle, Stethoscope, Truck } from "lucide-react";

import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

const ICONS = [Stethoscope, Leaf, Dumbbell, Pill, Sparkle, Truck];
// Where each service card leads.
const LINKS = [
  linkOptions({ to: "/consultation" }),
  linkOptions({ to: "/products/$category", params: { category: "herbal" }, search: {} }),
  linkOptions({ to: "/products/$category", params: { category: "sports" }, search: {} }),
  linkOptions({ to: "/products", search: {} }),
  linkOptions({ to: "/products/$category", params: { category: "vitamins" }, search: {} }),
  linkOptions({ to: "/contact" }),
];

export function Services() {
  const { t } = useI18n();
  return (
    <section className="relative bg-sage py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading eyebrow={t.services.eyebrow} title={t.services.title} subtitle={t.services.subtitle} />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((s, i) => {
            const Icon = ICONS[i]!;
            const link = LINKS[i]!;
            const featured = i === 0;
            return (
              <Reveal key={s.title} delay={(i % 3) * 0.08}>
                <Link
                  {...link}
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-[2rem] p-8 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift",
                    featured ? "bg-forest-gradient text-forest-foreground" : "border bg-card",
                  )}
                >
                  {featured && <div className="leaf-pattern absolute inset-0 opacity-50" />}
                  <div className="relative flex items-start justify-between">
                    <span
                      className={cn(
                        "flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110",
                        featured ? "bg-lime text-lime-foreground" : "bg-secondary text-primary",
                      )}
                    >
                      <Icon className="size-6" />
                    </span>
                    <ArrowUpRight
                      className={cn(
                        "size-5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                        featured ? "text-lime" : "text-muted-foreground group-hover:text-primary",
                      )}
                    />
                  </div>
                  <h3 className="relative mt-10 text-2xl font-medium">{s.title}</h3>
                  <p className={cn("relative mt-3 text-sm leading-relaxed", featured ? "text-forest-muted" : "text-muted-foreground")}>{s.text}</p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
