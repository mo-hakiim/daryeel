import { createFileRoute } from "@tanstack/react-router";

import { AboutIntro, CoreValues, VisionMission } from "@/components/sections/About";
import { Updates } from "@/components/sections/Updates";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { PageHeader } from "@/components/site/PageHeader";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Daryeel Wellness" },
      {
        name: "description",
        content:
          "Founded in June 2024, Daryeel Wellness offers natural health, wellness and consultation services online and in Hargeisa. Our vision, mission and values.",
      },
      { property: "og:title", content: "About Daryeel Wellness" },
      { property: "og:description", content: "Our story, vision, mission and core values — natural health built on science and trust." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useI18n();
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
