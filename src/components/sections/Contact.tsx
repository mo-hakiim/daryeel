import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";

import { ContactForm } from "@/components/forms/ContactForm";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { useI18n } from "@/i18n";
import { CONTACT, telHref, whatsappLink } from "@/lib/contact";

export function ContactSection({ showHeading = true }: { showHeading?: boolean }) {
  const { t } = useI18n();
  const c = t.contact;
  return (
    <section className="py-24 sm:py-32">
      <div className="container-page">
        {showHeading && <SectionHeading eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />}
        <div className={`grid gap-6 lg:grid-cols-[1.1fr_0.9fr] ${showHeading ? "mt-14" : ""}`}>
          <div className="grid gap-4 sm:grid-cols-2">
            <ContactCard
              highlight
              icon={<WhatsAppIcon className="size-6" />}
              label={c.whatsappLabel}
              delay={0}
            >
              <a href={whatsappLink(t.whatsapp.general)} target="_blank" rel="noopener noreferrer" className="font-display text-2xl hover:text-lime">
                {CONTACT.whatsappDisplay}
              </a>
              <span className="mt-1 block text-sm text-forest-muted">{t.common.whatsappUs} →</span>
            </ContactCard>
            <ContactCard icon={<Phone className="size-6" />} label={c.phoneLabel} delay={0.06}>
              {CONTACT.phones.map((p) => (
                <a key={p} href={telHref(p)} className="block font-display text-2xl hover:text-primary">
                  {p}
                </a>
              ))}
            </ContactCard>
            <ContactCard icon={<Mail className="size-6" />} label={c.emailLabel} delay={0.12} wide>
              <a href={`mailto:${CONTACT.email}`} className="block break-words font-display text-xl hover:text-primary sm:text-2xl">
                {CONTACT.email}
              </a>
            </ContactCard>
            <ContactCard icon={<MapPin className="size-6" />} label={c.locationLabel} delay={0.18}>
              <p className="font-display text-2xl">{c.location}</p>
            </ContactCard>
            <ContactCard icon={<Clock className="size-6" />} label={c.availabilityLabel} delay={0.24}>
              <p className="text-lg font-semibold">{c.availability}</p>
            </ContactCard>
          </div>
          <Reveal delay={0.1} className="rounded-[2rem] border bg-card p-6 shadow-soft sm:p-10">
            <h3 className="mb-6 text-2xl font-medium">{c.formTitle}</h3>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon,
  label,
  children,
  highlight,
  wide,
  delay,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
  highlight?: boolean;
  wide?: boolean;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className={wide ? "sm:col-span-2" : undefined}>
      <div
        className={`group h-full rounded-[2rem] p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift ${
          highlight ? "bg-forest-gradient text-forest-foreground" : "border bg-card"
        }`}
      >
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110 ${
            highlight ? "bg-whatsapp text-whatsapp-foreground" : "bg-secondary text-primary"
          }`}
        >
          {icon}
        </span>
        <p className={`mt-6 text-xs font-bold uppercase tracking-[0.16em] ${highlight ? "text-lime" : "text-muted-foreground"}`}>{label}</p>
        <div className="mt-2">{children}</div>
      </div>
    </Reveal>
  );
}
