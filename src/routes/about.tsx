import { createFileRoute } from "@tanstack/react-router";

import { AboutIntro, CoreValues, VisionMission } from "@/components/sections/About";
import { Updates } from "@/components/sections/Updates";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { PageHeader } from "@/components/site/PageHeader";
import { useI18n } from "@/i18n";
import { pageHead, usePageMeta } from "@/lib/seo";
import { en } from "@/i18n/en";

export const Route = createFileRoute("/about")({
  head: () => pageHead(en.seo.about, "/about"),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useI18n();
  usePageMeta(t.seo.about);
  return (
    <>
      <PageHeader eyebrow={t.about.eyebrow} title={t.about.title} subtitle={t.about.p1} />
      <AboutIntro />
      <VisionMission />
      <CoreValues />
      <WhyChoose />
      <Updates />
    </>
  );
}
