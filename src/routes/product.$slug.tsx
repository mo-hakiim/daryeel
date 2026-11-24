import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, CalendarCheck, Check, ChevronRight, Clock, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Disclaimer } from "@/components/products/Disclaimer";
import { ProductCard } from "@/components/products/ProductCard";
import { CatalogLoading, NotFound } from "@/components/site/NotFound";
import { Reveal } from "@/components/site/Reveal";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { productImage } from "@/data/images";
import { getProduct } from "@/data/products";
import { displayName, formatPrice, useCatalog, type CatalogProduct } from "@/data/store";
import { en } from "@/i18n/en";
import { fill, useI18n } from "@/i18n";
import { whatsappLink } from "@/lib/contact";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$slug")({
  // Products added in the dashboard are not in the bundled data, so an unknown slug is
  // resolved in the page once the live catalogue has loaded.
  loader: ({ params }) => ({ slug: params.slug }),
  head: ({ loaderData }) => {
    const p = loaderData ? getProduct(loaderData.slug) : undefined;
    if (!p) {
      return { meta: [{ title: "Product unavailable — Daryeel Wellness" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${p.name}${p.brand ? ` by ${p.brand}` : ""} — Daryeel Wellness`;
    return {
      meta: [
        { title },
        { name: "description", content: p.description.en },
        { property: "og:title", content: title },
        { property: "og:description", content: `${p.description.en} ${en.categories[p.category].name}. Order via WhatsApp.` },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useLoaderData();
  const { getProduct: findProduct, pending } = useCatalog();
  const product = findProduct(slug);
  if (!product) return pending ? <CatalogLoading /> : <NotFound />;
  return <ProductDetails key={product.slug} product={product} />;
}

function ProductDetails({ product }: { product: CatalogProduct }) {
  const { t, lang } = useI18n();
  const { products, getCategory } = useCatalog();
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const name = displayName(product, lang);
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);
  const categoryName = getCategory(product.category)?.name[lang] ?? "";
  const activeKey = product.images[active] ?? product.images[0] ?? "";
  const soldOut = product.inStock === false;

  useEffect(() => {
    document.title = `${product.name}${product.brand ? ` by ${product.brand}` : ""} — Daryeel Wellness`;
  }, [product.name, product.brand]);

  return (
    <>
      <section className="relative overflow-hidden bg-hero pb-20 pt-28 sm:pt-36">
        <div className="blob -right-20 top-20 h-96 w-96 bg-lime/25" />
        <div className="container-page relative">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            <Link to="/products" search={{}} className="hover:text-primary">
              {t.nav.products}
            </Link>
            <ChevronRight className="size-3.5" />
            <Link to="/products/$category" params={{ category: product.category }} search={{}} className="hover:text-primary">
              {categoryName}
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="text-foreground">{name}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Gallery */}
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                className="relative aspect-square cursor-zoom-in overflow-hidden rounded-[2.5rem] border bg-card shadow-lift"
                onPointerMove={(e) => {
                  if (e.pointerType !== "mouse") return;
                  const r = e.currentTarget.getBoundingClientRect();
                  setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
                }}
                onPointerLeave={() => setZoom(null)}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeKey}
                    src={productImage(activeKey)}
                    alt={product.imageLabels?.[active]?.[lang] ?? name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full w-full object-contain p-8 transition-transform duration-200 ease-out"
                    style={
                      zoom
                        ? { transform: "scale(1.8)", transformOrigin: `${zoom.x}% ${zoom.y}%` }
                        : { transform: "scale(1)" }
                    }
                  />
                </AnimatePresence>
              </motion.div>
              {product.images.length > 1 && (
                <div className="mt-4 flex gap-3" role="group" aria-label={t.common.images}>
                  {product.images.map((img, i) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-pressed={i === active}
                      aria-label={product.imageLabels?.[i]?.[lang] ?? `${name} ${i + 1}`}
                      className={cn(
                        "h-20 w-20 cursor-pointer overflow-hidden rounded-2xl border-2 bg-card p-1.5 transition-all",
                        i === active ? "border-primary shadow-soft" : "border-transparent opacity-70 hover:opacity-100",
                      )}
                    >
                      <img src={productImage(img)} alt="" className="h-full w-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
              {product.imageLabels?.[active] && (
                <p className="mt-3 text-sm text-muted-foreground">{product.imageLabels[active]![lang]}</p>
              )}
            </div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                {product.subcategory ? t.subcategories[product.subcategory] : categoryName}
              </span>
              <h1 className="mt-4 text-balance text-4xl font-medium leading-[1.05] sm:text-5xl">{name}</h1>
              {product.brand && (
                <p className="mt-3 text-sm text-muted-foreground">
                  {t.common.brand}: <span className="font-semibold text-foreground">{product.brand}</span>
                </p>
              )}
              {product.facts && <p className="mt-1 text-sm text-muted-foreground">{product.facts}</p>}
              {(product.price != null || soldOut) && (
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  {product.price != null && <p className="text-3xl font-bold text-primary">{formatPrice(product.price)}</p>}
                  {soldOut && (
                    <span className="rounded-full bg-foreground/85 px-3 py-1 text-xs font-bold uppercase tracking-wider text-background">
                      {t.common.outOfStock}
                    </span>
                  )}
                </div>
              )}

              <h2 className="mt-8 font-sans text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">{t.common.productDetails}</h2>
              <p className="mt-2 text-lg leading-relaxed text-foreground/85">{product.description[lang]}</p>

              <div className="mt-8 rounded-3xl border bg-card p-6 shadow-soft">
                {product.benefits ? (
                  <>
                    <h2 className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-primary">{t.common.keyBenefits}</h2>
                    <ul className="mt-4 space-y-3">
                      {product.benefits.map((b) => (
                        <li key={b.en} className="flex gap-3">
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime text-lime-foreground">
                            <Check className="size-3.5" strokeWidth={3} />
                          </span>
                          <span className="leading-relaxed">{b[lang]}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : product.suppliedBenefits ? (
                  <>
                    <h2 className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-primary">{t.common.suppliedBenefits}</h2>
                    <ul className="mt-4 space-y-3">
                      {product.suppliedBenefits.map((b) => (
                        <li key={b.en} className="flex gap-3">
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime text-lime-foreground">
                            <Check className="size-3.5" strokeWidth={3} />
                          </span>
                          <span className="leading-relaxed">{b[lang]}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm text-muted-foreground">{t.common.suppliedNote}</p>
                  </>
                ) : (
                  <div className="flex gap-3">
                    <Clock className="mt-0.5 size-5 shrink-0 text-primary" />
                    <div>
                      <h2 className="font-sans text-sm font-bold">{t.common.pendingBenefits}</h2>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.common.pendingNote}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-5 flex gap-3 rounded-3xl bg-sage p-5">
                <Info className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <h2 className="font-sans text-sm font-bold">{t.common.directions}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.common.directionsText}</p>
                </div>
              </div>

              {product.caution && (
                <div className="mt-3 flex gap-3 rounded-3xl border border-destructive/20 bg-destructive/5 p-5">
                  <AlertTriangle className="mt-0.5 size-5 shrink-0 text-destructive" />
                  <div>
                    <h2 className="font-sans text-sm font-bold">{t.common.caution}</h2>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{product.caution[lang]}</p>
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" variant="whatsapp">
                  <a href={whatsappLink(fill(t.whatsapp.product, { product: name }))} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon className="size-5" />
                    {t.common.orderWhatsApp}
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/consultation">
                    <CalendarCheck />
                    {t.common.askConsultant}
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-page">
          <Disclaimer />
          {related.length > 0 && (
            <>
              <Reveal>
                <h2 className="mb-8 mt-16 text-3xl font-medium sm:text-4xl">{t.common.related}</h2>
              </Reveal>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
