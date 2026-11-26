// The live product catalogue.
//
// Every page starts with the bundled catalogue (src/data/products.ts), which is what
// the prerendered HTML contains. In the browser it then loads categories and products
// from Supabase (anon key, read-only) and switches to them. If Supabase is not
// configured, unreachable, or empty, the bundled catalogue simply stays — the site
// never breaks.
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  CATEGORY_COVER,
  CATEGORY_IDS,
  CATEGORY_SUBCATEGORIES,
  isSubcategoryId,
  type SubcategoryId,
} from "@/data/catalog";
import { products as bundledProducts } from "@/data/products";
import { en } from "@/i18n/en";
import { so } from "@/i18n/so";
import type { Lang, Localized } from "@/i18n";
import { select, supabaseEnabled } from "@/lib/supabase";

export type CatalogProduct = {
  id?: string;
  slug: string;
  name: string;
  nameSo?: string | undefined;
  brand?: string | undefined;
  aliases?: string[] | undefined;
  category: string;
  subcategory?: SubcategoryId | undefined;
  images: string[];
  imageLabels?: Localized[] | undefined;
  facts?: string | undefined;
  description: Localized;
  benefits: Localized[] | null;
  suppliedBenefits?: Localized[] | undefined;
  caution?: Localized | undefined;
  featured?: boolean | undefined;
  /** null/undefined = no price shown. */
  price?: number | null | undefined;
  /** undefined = in stock (bundled data has no stock info). */
  inStock?: boolean | undefined;
};

export type CatalogCategory = {
  id: string;
  slug: string;
  name: Localized;
  tagline: Localized;
  description: Localized;
  cover?: string | undefined;
  sortOrder: number;
};

/** Database row shapes (see supabase/schema.sql). */
export type CategoryRow = {
  id: string;
  slug: string;
  name: string;
  name_so: string | null;
  tagline: string | null;
  tagline_so: string | null;
  description: string | null;
  description_so: string | null;
  cover_image: string | null;
  sort_order: number;
};

export type ProductRow = {
  id: string;
  slug: string;
  name: string;
  name_so: string | null;
  brand: string | null;
  aliases: string[] | null;
  category_id: string;
  subcategory: string | null;
  facts: string | null;
  description: string;
  description_so: string;
  benefits: Localized[] | null;
  supplied_benefits: Localized[] | null;
  caution: Localized | null;
  image_labels: Localized[] | null;
  price: number | string | null;
  images: string[] | null;
  in_stock: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type CatalogStatus = "bundled" | "loading" | "live" | "fallback";

const loc = (en: string | null | undefined, so: string | null | undefined): Localized => ({
  en: en ?? "",
  so: so || en || "",
});

export function rowToCategory(r: CategoryRow): CatalogCategory {
  return {
    id: r.id,
    slug: r.slug,
    name: loc(r.name, r.name_so),
    tagline: loc(r.tagline, r.tagline_so),
    description: loc(r.description, r.description_so),
    cover: r.cover_image ?? undefined,
    sortOrder: r.sort_order,
  };
}

export function rowToProduct(r: ProductRow, categorySlug: string): CatalogProduct {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    nameSo: r.name_so ?? undefined,
    brand: r.brand ?? undefined,
    aliases: r.aliases ?? undefined,
    category: categorySlug,
    subcategory: r.subcategory && isSubcategoryId(r.subcategory) ? r.subcategory : undefined,
    images: r.images ?? [],
    imageLabels: r.image_labels ?? undefined,
    facts: r.facts ?? undefined,
    description: loc(r.description, r.description_so),
    benefits: r.benefits && r.benefits.length ? r.benefits : null,
    suppliedBenefits: r.supplied_benefits ?? undefined,
    caution: r.caution ?? undefined,
    featured: r.is_featured,
    price: r.price === null || r.price === "" ? null : Number(r.price),
    inStock: r.in_stock,
  };
}

export const bundledCategories: CatalogCategory[] = CATEGORY_IDS.map((slug, i) => ({
  id: slug,
  slug,
  name: { en: en.categories[slug].name, so: so.categories[slug].name },
  tagline: { en: en.categories[slug].tagline, so: so.categories[slug].tagline },
  description: { en: en.categories[slug].description, so: so.categories[slug].description },
  cover: CATEGORY_COVER[slug],
  sortOrder: i,
}));

export const bundledCatalog = {
  products: bundledProducts as CatalogProduct[],
  categories: bundledCategories,
};

export function catalogFromRows(catRows: CategoryRow[], productRows: ProductRow[]) {
  const slugById = new Map(catRows.map((c) => [c.id, c.slug]));
  return {
    categories: catRows.map(rowToCategory),
    products: productRows
      .filter((p) => slugById.has(p.category_id))
      .map((p) => rowToProduct(p, slugById.get(p.category_id)!)),
  };
}

/** Loads the live catalogue. Throws when Supabase is unreachable or returns nothing usable. */
export async function fetchLiveCatalog() {
  const [catRows, productRows] = await Promise.all([
    select<CategoryRow>("categories", "select=*&order=sort_order.asc,name.asc"),
    select<ProductRow>("products", "select=*&order=sort_order.asc,created_at.asc"),
  ]);
  if (!catRows.length || !productRows.length) throw new Error("Supabase catalogue is empty");
  return catalogFromRows(catRows, productRows);
}

/**
 * The catalogue the site is built with: the Supabase snapshot taken by
 * scripts/prepare-build.mjs when one exists, otherwise the bundled catalogue.
 * Prerendered pages, product structured data and the browser's first render use it.
 */
type Snapshot = { categories: CategoryRow[]; products: ProductRow[] };
const snapshotFile = Object.values(
  import.meta.glob<Snapshot>("./catalog-snapshot.json", { eager: true, import: "default" }),
)[0];
export const initialCatalog =
  snapshotFile?.categories?.length && snapshotFile.products?.length
    ? catalogFromRows(snapshotFile.categories, snapshotFile.products)
    : bundledCatalog;

/** Lookups on the build-time catalogue, for page heads (titles, structured data). */
export const findProduct = (slug: string) => initialCatalog.products.find((p) => p.slug === slug);
export const findCategory = (slug: string) => initialCatalog.categories.find((c) => c.slug === slug);

type CatalogValue = {
  products: CatalogProduct[];
  categories: CatalogCategory[];
  status: CatalogStatus;
  /** True until the live catalogue has loaded or failed (always false without Supabase). */
  pending: boolean;
  reload: () => void;
};

const CatalogContext = createContext<CatalogValue | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState(initialCatalog);
  const [status, setStatus] = useState<CatalogStatus>(supabaseEnabled ? "loading" : "bundled");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!supabaseEnabled) return;
    let alive = true;
    fetchLiveCatalog()
      .then((live) => {
        if (!alive) return;
        setData(live);
        setStatus("live");
      })
      .catch((e) => {
        if (!alive) return;
        console.warn("[catalog] Using bundled products:", e instanceof Error ? e.message : e);
        setStatus((s) => (s === "live" ? s : "fallback"));
      });
    return () => {
      alive = false;
    };
  }, [tick]);

  const reload = useCallback(() => setTick((n) => n + 1), []);
  const value = useMemo(
    () => ({ ...data, status, pending: status === "loading", reload }),
    [data, status, reload],
  );
  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  const value = ctx ?? {
    ...initialCatalog,
    status: "bundled" as const,
    pending: false,
    reload: () => {},
  };
  const { products, categories } = value;
  return {
    ...value,
    getProduct: (slug: string) => products.find((p) => p.slug === slug),
    getCategory: (slug: string) => categories.find((c) => c.slug === slug),
    productsIn: (category: string, subcategory?: SubcategoryId) =>
      products.filter(
        (p) => p.category === category && (!subcategory || p.subcategory === subcategory),
      ),
  };
}

/* ---------------- Helpers ---------------- */

export function subcategoriesOf(category: string | undefined): readonly SubcategoryId[] {
  if (!category) return [];
  return (CATEGORY_SUBCATEGORIES as Record<string, readonly SubcategoryId[]>)[category] ?? [];
}

/** Image shown for a category: its cover, else the first product photo in it. */
export function categoryCover(category: CatalogCategory, products: CatalogProduct[]) {
  return category.cover || products.find((p) => p.category === category.slug)?.images[0] || "";
}

export function searchProducts(list: CatalogProduct[], query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list.filter((p) =>
    [p.name, p.nameSo, p.brand, ...(p.aliases ?? [])]
      .filter(Boolean)
      .some((s) => s!.toLowerCase().includes(q)),
  );
}

export function displayName(p: Pick<CatalogProduct, "name" | "nameSo">, lang: Lang) {
  return lang === "so" && p.nameSo ? p.nameSo : p.name;
}

export function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}
