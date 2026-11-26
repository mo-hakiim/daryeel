import { createFileRoute } from "@tanstack/react-router";

import { ContactSection } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { PageHeader } from "@/components/site/PageHeader";
import { useI18n } from "@/i18n";
import { businessJsonLd, pageHead, usePageMeta } from "@/lib/seo";
import { en } from "@/i18n/en";

export const Route = createFileRoute("/contact")({
  head: () => pageHead(en.seo.contact, "/contact", { jsonLd: [businessJsonLd()] }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useI18n();
  usePageMeta(t.seo.contact);
  return (
    <>
      <PageHeader
        eyebrow={t.contact.eyebrow}
        title={t.contact.title}
        subtitle={t.contact.subtitle}
      />
      <ContactSection showHeading={false} />
      <Faq />
    </>
  );
}
