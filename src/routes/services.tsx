import { createFileRoute } from "@tanstack/react-router";

import { ConsultationSection } from "@/components/sections/Consultation";
import { Faq } from "@/components/sections/Faq";
import { Services } from "@/components/sections/Services";
import { PageHeader } from "@/components/site/PageHeader";
import { useI18n } from "@/i18n";
import { pageHead, usePageMeta } from "@/lib/seo";
import { en } from "@/i18n/en";

export const Route = createFileRoute("/services")({
  head: () => pageHead(en.seo.services, "/services"),
  component: ServicesPage,
});

function ServicesPage() {
  const { t } = useI18n();
  usePageMeta(t.seo.services);
  return (
    <>
      <PageHeader
        eyebrow={t.services.eyebrow}
        title={t.services.title}
        subtitle={t.services.subtitle}
      />
      <Services />
      <ConsultationSection />
      <Faq />
    </>
  );
}
