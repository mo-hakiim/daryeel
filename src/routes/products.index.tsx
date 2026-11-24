import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { CategoryCards } from "@/components/products/CategoryCards";
import { Disclaimer } from "@/components/products/Disclaimer";
import { ProductBrowser, type BrowserState } from "@/components/products/ProductBrowser";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionHeading } from "@/components/site/SectionHeading";
import { isSubcategoryId, type SubcategoryId } from "@/data/catalog";
import { useI18n } from "@/i18n";

type Search = { category?: string; sub?: SubcategoryId; q?: string };

export const Route = createFileRoute("/products/")({
  validateSearch: (s: Record<string, unknown>): Search => {
    const out: Search = {};
    if (typeof s["category"] === "string" && /^[a-z0-9-]{1,60}$/.test(s["category"])) out.category = s["category"];
    if (typeof s["sub"] === "string" && isSubcategoryId(s["sub"])) out.sub = s["sub"];
    if (typeof s["q"] === "string" && s["q"]) out.q = s["q"].slice(0, 80);
    return out;
  },
  head: () => ({
    meta: [
      { title: "Products — Herbal, Minerals, Sports Nutrition & Vitamins | Daryeel Wellness" },
      {
        name: "description",
        content:
          "Browse Daryeel Wellness products: herbal products, natural ingredients, herbal oils, minerals, sports nutrition and vitamins. Order via WhatsApp.",
      },
      { property: "og:title", content: "Products — Daryeel Wellness" },
      { property: "og:description", content: "Four organised categories of genuine wellness products. Order via WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { t } = useI18n();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/products/" });
  const onChange = (next: BrowserState) => {
    const s: Search = {};
    if (next.category) s["category"] = next.category;
    if (next.category && next.sub) s["sub"] = next.sub;
    if (next.q) s["q"] = next.q;
    navigate({ search: s, replace: true, resetScroll: false });
  };

  return (
    <>
      <PageHeader eyebrow={t.catalog.eyebrow} title={t.catalog.title} subtitle={t.catalog.subtitle} />
      <section className="pb-8 pt-16">
        <div className="container-page">
          <CategoryCards />
        </div>
      </section>
      <section className="py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading align="left" title={t.catalog.catalogTitle} className="mb-10" />
          <ProductBrowser state={search} onChange={onChange} />
          <Disclaimer className="mt-14" />
        </div>
      </section>
    </>
  );
}
