import { createFileRoute } from "@tanstack/react-router";

import { ConsultationSection } from "@/components/sections/Consultation";
import { Faq } from "@/components/sections/Faq";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { PageHeader } from "@/components/site/PageHeader";
import { useI18n } from "@/i18n";
import { pageHead, usePageMeta } from "@/lib/seo";
import { en } from "@/i18n/en";

export const Route = createFileRoute("/consultation")({
  head: () => pageHead(en.seo.consultation, "/consultation"),
  component: ConsultationPage,
});

function ConsultationPage() {
  const { t } = useI18n();
  usePageMeta(t.seo.consultation);
  return (
    <>
      <PageHeader
        eyebrow={t.consultation.eyebrow}
        title={t.consultation.title}
        subtitle={t.consultation.subtitle}
      />
      <ConsultationSection showHeading={false} />
      <WhyChoose />
      <Faq />
    </>
  );
}
