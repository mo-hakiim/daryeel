import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCatalog } from "@/data/store";
import { useI18n } from "@/i18n";
import { CONTACT, telHref, whatsappLink } from "@/lib/contact";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Leaf } from "./Leaf";
import { Logo } from "./Logo";
import { NAV_LINKS } from "./nav-links";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function Footer() {
  const { t, lang } = useI18n();
  const { categories } = useCatalog();
  return (
    <footer className="relative overflow-hidden bg-forest-gradient text-forest-foreground">
      <div className="leaf-pattern absolute inset-0 opacity-40" />
      <Leaf className="absolute -left-10 bottom-10 h-80 w-52 -rotate-12 text-lime/10" />
      <div className="container-page relative">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-forest-foreground/10 py-12 md:flex-row md:items-center">
          <p className="max-w-xl font-display text-2xl leading-snug sm:text-3xl">{t.footer.chatCta}</p>
          <Button asChild variant="lime" size="lg">
            <a href={whatsappLink(t.whatsapp.general)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-5" />
              {t.common.whatsappUs}
            </a>
          </Button>
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="light" className="h-10" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-forest-muted">{t.footer.description}</p>
            <LanguageSwitcher tone="dark" className="mt-6" />
          </div>

          <nav className="lg:col-span-2" aria-label={t.footer.quickLinks}>
            <h3 className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.16em] text-lime">{t.footer.quickLinks}</h3>
            <ul className="space-y-2.5 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-forest-muted transition-colors hover:text-lime">
                    {t.nav[l.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-2" aria-label={t.footer.categories}>
            <h3 className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.16em] text-lime">{t.footer.categories}</h3>
            <ul className="space-y-2.5 text-sm">
              {categories.map(({ slug: c, name }) => (
                <li key={c}>
                  <Link
                    to="/products/$category"
                    params={{ category: c }}
                    search={{}}
                    className="text-forest-muted transition-colors hover:text-lime"
                  >
                    {name[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sm:col-span-2 lg:col-span-4">
            <h3 className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.16em] text-lime">{t.footer.contact}</h3>
            <ul className="space-y-3 text-sm text-forest-muted">
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-lime">
                  <WhatsAppIcon className="size-4 shrink-0 text-lime" />
                  {t.contact.whatsappLabel}: {CONTACT.whatsappDisplay}
                </a>
              </li>
              {CONTACT.phones.map((p) => (
                <li key={p}>
                  <a href={telHref(p)} className="flex items-center gap-3 hover:text-lime">
                    <Phone className="size-4 shrink-0 text-lime" />
                    {p}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 break-all hover:text-lime">
                  <Mail className="size-4 shrink-0 text-lime" />
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="size-4 shrink-0 text-lime" />
                {t.contact.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-forest-foreground/10 py-6 text-xs text-forest-muted">
          <p>{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
