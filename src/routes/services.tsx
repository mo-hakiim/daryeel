import { createFileRoute } from "@tanstack/react-router";

import { ConsultationSection } from "@/components/sections/Consultation";
import { Faq } from "@/components/sections/Faq";
import { Services } from "@/components/sections/Services";
import { PageHeader } from "@/components/site/PageHeader";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Services — Daryeel Wellness" },
      {
        name: "description",
        content:
          "Natural wellness consultations, herbal products, sports nutrition, dietary supplements, vitamins & minerals, with online ordering and local delivery.",
      },
      { property: "og:title", content: "Our Services — Daryeel Wellness" },
      { property: "og:description", content: "Holistic health solutions for everyday vitality, performance and long-term well-being." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHeader eyebrow={t.services.eyebrow} title={t.services.title} subtitle={t.services.subtitle} />
      <Services />
      <ConsultationSection />
      <Faq />
    </>
  );
}
