import { useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";

import type { SubcategoryId } from "@/data/catalog";
import { searchProducts, subcategoriesOf, useCatalog } from "@/data/store";
import { fill, useI18n } from "@/i18n";
import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";

export type BrowserState = { category?: string | undefined; sub?: SubcategoryId | undefined; q?: string | undefined };

/** Search + category/subcategory filters + animated product grid. */
export function ProductBrowser({
  state,
  onChange,
  lockCategory = false,
}: {
  state: BrowserState;
  onChange: (next: BrowserState) => void;
  lockCategory?: boolean;
}) {
  const { t, lang } = useI18n();
  const { products, categories, pending } = useCatalog();
  const { category, sub, q = "" } = state;

  const filtered = useMemo(() => {
    let list = products;
    if (category) list = list.filter((p) => p.category === category);
    if (category && sub) list = list.filter((p) => p.subcategory === sub);
    return searchProducts(list, q);
  }, [products, category, sub, q]);

  const subs = subcategoriesOf(category);
  const countLabel = fill(filtered.length === 1 ? t.common.productCount : t.common.productsCount, { n: filtered.length });
  const hasFilters = Boolean(q || sub || (!lockCategory && category));

  return (
    <div>
      <div className="glass sticky top-24 z-30 -mx-2 mb-8 flex flex-col gap-3 rounded-3xl p-3 shadow-soft sm:mx-0 md:flex-row md:items-center">
        <label className="relative flex-1">
          <span className="sr-only">{t.catalog.searchLabel}</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={q}
            onChange={(e) => onChange({ ...state, q: e.target.value || undefined })}
            placeholder={t.catalog.searchPlaceholder}
            className="h-12 w-full rounded-full border border-input bg-card pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
          />
        </label>

        {!lockCategory && (
          <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-0.5 [scrollbar-width:none]" role="group" aria-label={t.catalog.filterCategory}>
            <FilterChip active={!category} onClick={() => onChange({ q: state.q })}>
              {t.catalog.all}
            </FilterChip>
            {categories.map(({ slug: c, name }) => (
              <FilterChip key={c} active={category === c} onClick={() => onChange({ q: state.q, category: c })}>
                {name[lang]}
              </FilterChip>
            ))}
          </div>
        )}
      </div>

      {subs.length > 0 && (
        <div className="mb-8 flex flex-wrap items-center gap-2" role="group" aria-label={t.catalog.filterSubcategory}>
          <span className="mr-1 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{t.catalog.filterSubcategory}</span>
          <FilterChip tone="soft" active={!sub} onClick={() => onChange({ ...state, sub: undefined })}>
            {t.catalog.all}
          </FilterChip>
          {subs.map((s) => (
            <FilterChip key={s} tone="soft" active={sub === s} onClick={() => onChange({ ...state, sub: s })}>
              {t.subcategories[s]}
            </FilterChip>
          ))}
        </div>
      )}

      <div className="mb-5 flex items-center justify-between text-sm text-muted-foreground">
        <p aria-live="polite">{countLabel}</p>
        {hasFilters && (
          <button
            type="button"
            onClick={() => onChange(lockCategory ? { category } : {})}
            className="inline-flex cursor-pointer items-center gap-1 font-semibold text-primary hover:underline"
          >
            <X className="size-3.5" />
            {t.catalog.clear}
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-3xl border border-dashed p-12 text-center text-muted-foreground">
          {pending ? t.common.loadingProducts : t.catalog.noResults}
        </p>
      ) : (
        <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <ProductCard product={p} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
  tone = "solid",
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  tone?: "solid" | "soft";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "h-10 shrink-0 cursor-pointer whitespace-nowrap rounded-full px-4 text-sm font-semibold transition-all duration-300",
        active
          ? tone === "solid"
            ? "bg-forest text-forest-foreground shadow-soft"
            : "bg-primary text-primary-foreground"
          : "bg-card text-foreground/75 hover:bg-secondary hover:text-foreground",
        tone === "soft" && !active && "border",
      )}
    >
      {children}
    </button>
  );
}
