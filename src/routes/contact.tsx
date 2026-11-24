import { createFileRoute } from "@tanstack/react-router";

import { ContactSection } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { PageHeader } from "@/components/site/PageHeader";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Daryeel Wellness" },
      {
        name: "description",
        content:
          "Contact Daryeel Wellness in Hargeisa, Somaliland: WhatsApp +25263800227, phone 0634029802 / 0637999938, email daryeelhargeisa07@gmail.com.",
      },
      { property: "og:title", content: "Contact Daryeel Wellness" },
      { property: "og:description", content: "WhatsApp, phone, email and location — online and in-person consultations and orders." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHeader eyebrow={t.contact.eyebrow} title={t.contact.title} subtitle={t.contact.subtitle} />
      <ContactSection showHeading={false} />
      <Faq />
    </>
  );
}
