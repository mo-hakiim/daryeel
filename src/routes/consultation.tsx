import { createFileRoute } from "@tanstack/react-router";

import { ConsultationSection } from "@/components/sections/Consultation";
import { Faq } from "@/components/sections/Faq";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { PageHeader } from "@/components/site/PageHeader";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/consultation")({
  head: () => ({
    meta: [
      { title: "Book a Consultation — Daryeel Wellness" },
      {
        name: "description",
        content:
          "Request a one-on-one natural wellness consultation, online or in person in Hargeisa, in English or Somali.",
      },
      { property: "og:title", content: "Book a Natural Wellness Consultation — Daryeel Wellness" },
      { property: "og:description", content: "Your journey to better wellness starts here. Online or in-person sessions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConsultationPage,
});

function ConsultationPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHeader eyebrow={t.consultation.eyebrow} title={t.consultation.title} subtitle={t.consultation.subtitle} />
      <ConsultationSection showHeading={false} />
      <WhyChoose />
      <Faq />
    </>
  );
}
