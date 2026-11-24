import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import { Disclaimer } from "@/components/products/Disclaimer";
import { ProductBrowser, type BrowserState } from "@/components/products/ProductBrowser";
import { Leaf } from "@/components/site/Leaf";
import { CATEGORY_COVER, CATEGORY_IDS, isCategoryId, isSubcategoryId, type CategoryId, type SubcategoryId } from "@/data/catalog";
import { productImage } from "@/data/images";
import { productsIn } from "@/data/products";
import { en } from "@/i18n/en";
import { fill, useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

type Search = { sub?: SubcategoryId; q?: string };

export const Route = createFileRoute("/products/$category")({
  validateSearch: (s: Record<string, unknown>): Search => {
    const out: Search = {};
    if (typeof s["sub"] === "string" && isSubcategoryId(s["sub"])) out.sub = s["sub"];
    if (typeof s["q"] === "string" && s["q"]) out.q = s["q"].slice(0, 80);
    return out;
  },
  loader: ({ params }) => {
    if (!isCategoryId(params["category"])) throw notFound();
    return { category: params["category"] as CategoryId };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.category;
    const name = c ? en.categories[c].name : "Products";
    const desc = c ? en.categories[c].description : "Daryeel Wellness products.";
    return {
      meta: [
        { title: `${name} — Daryeel Wellness` },
        { name: "description", content: desc },
        { property: "og:title", content: `${name} — Daryeel Wellness` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(c ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { t } = useI18n();
  const { category } = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/products/$category" });
  const info = t.categories[category];
  const count = productsIn(category).length;

  const onChange = (next: BrowserState) => {
    const s: Search = {};
    if (next.sub) s["sub"] = next.sub;
    if (next.q) s["q"] = next.q;
    navigate({ search: s, replace: true, resetScroll: false });
  };

  return (
    <>
      <section className="relative overflow-hidden bg-forest-gradient pb-16 pt-32 text-forest-foreground sm:pt-40">
        <div className="leaf-pattern absolute inset-0 opacity-40" />
        <div className="blob -right-16 top-10 h-96 w-96 bg-lime/20" />
        <Leaf className="absolute bottom-0 left-[40%] h-56 w-36 rotate-12 text-lime/10" />
        <div className="container-page relative grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
          <div>
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-forest-muted">
              <Link to="/products" search={{}} className="hover:text-lime">
                {t.nav.products}
              </Link>
              <ChevronRight className="size-3.5" />
              <span className="text-forest-foreground">{info.name}</span>
            </nav>
            <p className="eyebrow mb-4 text-lime">{fill(t.common.productsCount, { n: count })}</p>
            <h1 className="text-balance text-5xl font-medium leading-[1.02] sm:text-6xl">{info.name}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-forest-muted">{info.description}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {CATEGORY_IDS.map((c) => (
                <Link
                  key={c}
                  to="/products/$category"
                  params={{ category: c }}
                  search={{}}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    c === category ? "bg-lime text-lime-foreground" : "glass-dark text-forest-foreground hover:bg-forest-foreground/15",
                  )}
                >
                  {t.categories[c].name}
                </Link>
              ))}
            </div>
          </div>
          <div className="relative mx-auto hidden aspect-square w-full max-w-sm md:block">
            <div className="absolute inset-6 rounded-full bg-card/95 shadow-lift" />
            <img
              key={category}
              src={productImage(CATEGORY_COVER[category])}
              alt=""
              className="relative h-full w-full animate-float-slow object-contain p-12 mix-blend-multiply"
            />
          </div>
        </div>
      </section>
      <section className="py-14 sm:py-20">
        <div className="container-page">
          <ProductBrowser key={category} state={{ category, sub: search.sub, q: search.q }} onChange={onChange} lockCategory />
          <Disclaimer className="mt-14" />
        </div>
      </section>
    </>
  );
}
