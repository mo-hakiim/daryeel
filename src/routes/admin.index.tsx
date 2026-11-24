import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ImageOff, Pencil, Plus, Search, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { useAdminAuth } from "@/admin/auth";
import { useAdminData } from "@/admin/data";
import { ConfirmDelete, Spinner, errorMessage, inputClass } from "@/admin/ui";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { productImage } from "@/data/images";
import { formatPrice, useCatalog, type ProductRow } from "@/data/store";
import { remove, update } from "@/lib/supabase";

export const Route = createFileRoute("/admin/")({
  component: AdminProducts,
});

function AdminProducts() {
  const { token } = useAdminAuth();
  const { reload: reloadSite } = useCatalog();
  const { categories, products, setProducts, loading, error, reload } = useAdminData();
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");

  const catName = useMemo(() => new Map(categories.map((c) => [c.id, c.name])), [categories]);
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return products.filter(
      (p) =>
        (!category || p.category_id === category) &&
        (!needle ||
          [p.name, p.name_so, p.brand, p.slug, ...(p.aliases ?? [])].some((s) =>
            s?.toLowerCase().includes(needle),
          )),
    );
  }, [products, q, category]);

  const patchLocal = (id: string, patch: Partial<ProductRow>) =>
    setProducts((list) => list.map((p) => (p.id === id ? { ...p, ...patch } : p)));

  const toggleStock = async (p: ProductRow, inStock: boolean) => {
    patchLocal(p.id, { in_stock: inStock });
    try {
      await update("products", p.id, { in_stock: inStock }, await token());
      toast.success(`${p.name}: ${inStock ? "in stock" : "out of stock"}`);
      reloadSite();
    } catch (e) {
      patchLocal(p.id, { in_stock: !inStock });
      toast.error(errorMessage(e));
    }
  };

  const del = async (p: ProductRow) => {
    try {
      await remove("products", p.id, await token());
      setProducts((list) => list.filter((x) => x.id !== p.id));
      toast.success(`Deleted ${p.name}`);
      reloadSite();
    } catch (e) {
      toast.error(errorMessage(e));
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-medium sm:text-4xl">Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {loading ? "Loading…" : `${filtered.length} of ${products.length} products`}
          </p>
        </div>
        <Button asChild variant="forest">
          <Link to="/admin/product" search={{}}>
            <Plus /> Add product
          </Link>
        </Button>
      </div>

      <div className="mb-5 flex flex-col gap-2 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Search products</span>
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, brand…"
            className={`${inputClass} pl-10`}
          />
        </label>
        <label className="sm:w-56">
          <span className="sr-only">Filter by category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputClass}
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error && (
        <div className="mb-5 rounded-2xl bg-destructive/10 p-4 text-sm text-destructive">
          {error}{" "}
          <button type="button" className="font-semibold underline" onClick={() => void reload()}>
            Try again
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <Spinner className="size-8" />
        </div>
      ) : filtered.length === 0 ? (
        <p className="rounded-3xl border border-dashed bg-card/60 p-12 text-center text-muted-foreground">
          No products found.
        </p>
      ) : (
        <ul className="divide-y overflow-hidden rounded-3xl border bg-card shadow-soft">
          {filtered.map((p) => {
            const img = p.images?.[0];
            return (
              <li key={p.id} className="flex items-center gap-3 p-3 sm:gap-4 sm:p-4">
                <Link
                  to="/admin/product"
                  search={{ id: p.id }}
                  className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-card-gradient sm:size-16"
                >
                  {img ? (
                    <img
                      src={productImage(img)}
                      alt=""
                      className="h-full w-full object-contain p-1"
                      loading="lazy"
                    />
                  ) : (
                    <ImageOff className="size-5 text-muted-foreground" />
                  )}
                </Link>
                <div className="min-w-0 flex-1">
                  <Link
                    to="/admin/product"
                    search={{ id: p.id }}
                    className="line-clamp-1 font-semibold hover:text-primary"
                  >
                    {p.is_featured && (
                      <Star
                        className="mr-1 inline size-3.5 fill-lime text-lime-foreground"
                        aria-label="Featured"
                      />
                    )}
                    {p.name}
                  </Link>
                  <p className="line-clamp-1 text-xs text-muted-foreground">
                    {[
                      catName.get(p.category_id),
                      p.brand,
                      p.price != null ? formatPrice(Number(p.price)) : "No price",
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
                <label className="flex shrink-0 flex-col items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:flex-row sm:gap-2 sm:text-xs sm:normal-case sm:tracking-normal">
                  <Switch
                    checked={p.in_stock}
                    onCheckedChange={(v) => void toggleStock(p, v)}
                    aria-label={`${p.name} in stock`}
                  />
                  <span className="w-14 text-center sm:text-left">
                    {p.in_stock ? "In stock" : "Sold out"}
                  </span>
                </label>
                <div className="flex shrink-0 gap-1">
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="size-9"
                    aria-label={`Edit ${p.name}`}
                  >
                    <Link to="/admin/product" search={{ id: p.id }}>
                      <Pencil />
                    </Link>
                  </Button>
                  <ConfirmDelete
                    title={`Delete ${p.name}?`}
                    description="The product is removed from the website. This cannot be undone. (Its photos stay in storage.)"
                    onConfirm={() => void del(p)}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hidden size-9 text-destructive hover:bg-destructive/10 sm:inline-flex"
                      aria-label={`Delete ${p.name}`}
                    >
                      <Trash2 />
                    </Button>
                  </ConfirmDelete>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
