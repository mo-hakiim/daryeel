import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CategoryCards } from "@/components/products/CategoryCards";
import { Disclaimer } from "@/components/products/Disclaimer";
import { FeaturedCarousel } from "@/components/products/FeaturedCarousel";
import { AboutIntro, VisionMission } from "@/components/sections/About";
import { ConsultationSection } from "@/components/sections/Consultation";
import { ContactSection } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Updates } from "@/components/sections/Updates";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Daryeel Wellness — Your Wellness, Our Priority" },
      {
        name: "description",
        content:
          "Natural wellness solutions, premium supplements, sports nutrition and personalised health consultations in Hargeisa, Somaliland. Order on WhatsApp.",
      },
      { property: "og:title", content: "Daryeel Wellness — Your Wellness, Our Priority" },
      {
        property: "og:description",
        content: "Herbal products, dietary supplements, vitamins, sports nutrition and natural wellness consultations — online and in Hargeisa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useI18n();
  return (
    <>
      <Hero />
      <AboutIntro withLink />
      <VisionMission />
      <Services />

      <section className="py-24 sm:py-32">
        <div className="container-page">
          <SectionHeading eyebrow={t.catalog.eyebrow} title={t.catalog.title} subtitle={t.catalog.subtitle} />
          <div className="mt-14">
            <CategoryCards />
          </div>
        </div>
      </section>

      <section className="bg-sage py-24 sm:py-28">
        <div className="container-page">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading align="left" eyebrow={t.catalog.featuredEyebrow} title={t.catalog.featuredTitle} />
            <Button asChild variant="outline">
              <Link to="/products" search={{}}>
                {t.common.allProducts}
                <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="mt-10">
            <FeaturedCarousel />
          </div>
          <Disclaimer className="mt-10" />
        </div>
      </section>

      <WhyChoose />
      <ConsultationSection />
      <Faq />
      <ContactSection />
      <Updates />
    </>
  );
}
