import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import { Disclaimer } from "@/components/products/Disclaimer";
import { ProductBrowser, type BrowserState } from "@/components/products/ProductBrowser";
import { Leaf } from "@/components/site/Leaf";
import { CatalogLoading, NotFound } from "@/components/site/NotFound";
import { isSubcategoryId, type SubcategoryId } from "@/data/catalog";
import { productImage } from "@/data/images";
import { categoryCover, findCategory, useCatalog } from "@/data/store";
import { en } from "@/i18n/en";
import { fill, useI18n } from "@/i18n";
import { breadcrumbJsonLd, categoryMeta, pageHead, usePageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";

type Search = { sub?: SubcategoryId; q?: string };

export const Route = createFileRoute("/products/$category")({
  validateSearch: (s: Record<string, unknown>): Search => {
    const out: Search = {};
    if (typeof s["sub"] === "string" && isSubcategoryId(s["sub"])) out.sub = s["sub"];
    if (typeof s["q"] === "string" && s["q"]) out.q = s["q"].slice(0, 80);
    return out;
  },
  // Categories added in the dashboard are resolved in the page once the live catalogue loads.
  loader: ({ params }) => ({ category: params["category"] }),
  head: ({ loaderData }) => {
    const c = loaderData ? findCategory(loaderData.category) : undefined;
    if (!c)
      return {
        meta: [{ title: "Daryeel Wellness – Hargeisa" }, { name: "robots", content: "noindex" }],
      };
    return pageHead(categoryMeta(c, en.seo), `/products/${c.slug}`, {
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Products", path: "/products" },
          { name: c.name.en, path: `/products/${c.slug}` },
        ]),
      ],
    });
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const { getCategory, pending } = useCatalog();
  if (!getCategory(category)) return pending ? <CatalogLoading /> : <NotFound />;
  return <CategoryView category={category} />;
}

function CategoryView({ category }: { category: string }) {
  const { t, lang } = useI18n();
  const { categories, products, getCategory, productsIn } = useCatalog();
  const cat = getCategory(category)!;
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/products/$category" });
  const info = { name: cat.name[lang], description: cat.description[lang] };
  usePageMeta(categoryMeta(cat, t.seo, lang));
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
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex items-center gap-1.5 text-sm text-forest-muted"
            >
              <Link to="/products" search={{}} className="hover:text-lime">
                {t.nav.products}
              </Link>
              <ChevronRight className="size-3.5" />
              <span className="text-forest-foreground">{info.name}</span>
            </nav>
            <p className="eyebrow mb-4 text-lime">{fill(t.common.productsCount, { n: count })}</p>
            <h1 className="text-balance text-5xl font-medium leading-[1.02] sm:text-6xl">
              {info.name}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-forest-muted">
              {info.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {categories.map(({ slug: c, name }) => (
                <Link
                  key={c}
                  to="/products/$category"
                  params={{ category: c }}
                  search={{}}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    c === category
                      ? "bg-lime text-lime-foreground"
                      : "glass-dark text-forest-foreground hover:bg-forest-foreground/15",
                  )}
                >
                  {name[lang]}
                </Link>
              ))}
            </div>
          </div>
          <div className="relative mx-auto hidden aspect-square w-full max-w-sm md:block">
            <div className="absolute inset-6 rounded-full bg-card/95 shadow-lift" />
            <img
              key={category}
              src={productImage(categoryCover(cat, products))}
              width={900}
              height={900}
              decoding="async"
              alt=""
              className="relative h-full w-full animate-float-slow object-contain p-12 mix-blend-multiply"
            />
          </div>
        </div>
      </section>
      <section className="py-14 sm:py-20">
        <div className="container-page">
          <ProductBrowser
            key={category}
            state={{ category, sub: search.sub, q: search.q }}
            onChange={onChange}
            lockCategory
          />
          <Disclaimer className="mt-14" />
        </div>
      </section>
    </>
  );
}
