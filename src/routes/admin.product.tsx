import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  GripVertical,
  ImagePlus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { useAdminAuth } from "@/admin/auth";
import { useAdminData } from "@/admin/data";
import {
  ConfirmDelete,
  Field,
  Panel,
  Spinner,
  errorMessage,
  inputClass,
  prepareImage,
  slugify,
  textareaClass,
} from "@/admin/ui";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { SUBCATEGORY_IDS, type SubcategoryId } from "@/data/catalog";
import { productImage } from "@/data/images";
import { useCatalog, type ProductRow } from "@/data/store";
import { en } from "@/i18n/en";
import type { Localized } from "@/i18n";
import { insert, remove, update, uploadImage } from "@/lib/supabase";
import { cn } from "@/lib/utils";

type Search = { id?: string };

export const Route = createFileRoute("/admin/product")({
  validateSearch: (s: Record<string, unknown>): Search =>
    typeof s["id"] === "string" && s["id"] ? { id: s["id"] } : {},
  component: AdminProductPage,
});

type Img = { path: string; label?: Localized | undefined };

type Form = {
  name: string;
  name_so: string;
  slug: string;
  brand: string;
  aliases: string;
  category_id: string;
  subcategory: "" | SubcategoryId;
  facts: string;
  description: string;
  description_so: string;
  benefitsPending: boolean;
  benefits: Localized[];
  caution: Localized;
  price: string;
  images: Img[];
  in_stock: boolean;
  is_featured: boolean;
};

const emptyBenefits = (): Localized[] => [0, 1, 2].map(() => ({ en: "", so: "" }));

function toForm(p: ProductRow | undefined, defaultCategory: string): Form {
  const benefits = p?.benefits?.length ? [...p.benefits] : emptyBenefits();
  while (benefits.length < 3) benefits.push({ en: "", so: "" });
  return {
    name: p?.name ?? "",
    name_so: p?.name_so ?? "",
    slug: p?.slug ?? "",
    brand: p?.brand ?? "",
    aliases: (p?.aliases ?? []).join(", "),
    category_id: p?.category_id ?? defaultCategory,
    subcategory: (p?.subcategory as SubcategoryId | null) ?? "",
    facts: p?.facts ?? "",
    description: p?.description ?? "",
    description_so: p?.description_so ?? "",
    benefitsPending: p ? !p.benefits?.length : false,
    benefits,
    caution: p?.caution ?? { en: "", so: "" },
    price: p?.price != null ? String(p.price) : "",
    images: (p?.images ?? []).map((path, i) => ({ path, label: p?.image_labels?.[i] })),
    in_stock: p?.in_stock ?? true,
    is_featured: p?.is_featured ?? false,
  };
}

function AdminProductPage() {
  const { id } = Route.useSearch();
  const data = useAdminData();
  const product = id ? data.products.find((p) => p.id === id) : undefined;

  if (data.loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner className="size-8" />
      </div>
    );
  }
  if (data.error)
    return (
      <p className="rounded-2xl bg-destructive/10 p-4 text-sm text-destructive">{data.error}</p>
    );
  if (id && !product) {
    return (
      <div className="text-center">
        <p className="text-muted-foreground">This product no longer exists.</p>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/admin">Back to products</Link>
        </Button>
      </div>
    );
  }
  return <ProductForm key={id ?? "new"} product={product} data={data} />;
}

function ProductForm({
  product,
  data,
}: {
  product: ProductRow | undefined;
  data: ReturnType<typeof useAdminData>;
}) {
  const { token } = useAdminAuth();
  const { reload: reloadSite } = useCatalog();
  const navigate = useNavigate();
  const [form, setForm] = useState<Form>(() => toForm(product, data.categories[0]?.id ?? ""));
  const [slugTouched, setSlugTouched] = useState(Boolean(product));
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(0);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const set = <K extends keyof Form>(key: K, value: Form[K]) =>
    setForm((f) => ({ ...f, [key]: value }));
  const category = data.categories.find((c) => c.id === form.category_id);
  const hasSubcategories = category?.slug === "herbal";

  useEffect(() => {
    if (!slugTouched) setForm((f) => ({ ...f, slug: slugify(f.name) }));
  }, [form.name, slugTouched]);

  /* ---------- Images ---------- */
  const upload = async (files: FileList | null) => {
    if (!files?.length) return;
    const list = Array.from(files).filter((f) => f.type.startsWith("image/"));
    setUploading((n) => n + list.length);
    try {
      const auth = await token();
      for (const file of list) {
        try {
          const blob = await prepareImage(file);
          const ext =
            blob.type === "image/webp"
              ? "webp"
              : (file.name.split(".").pop() || "jpg").toLowerCase();
          const base = slugify(form.slug || form.name) || "product";
          const path = `products/${base}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}.${ext}`;
          await uploadImage(path, blob, auth);
          setForm((f) => ({ ...f, images: [...f.images, { path }] }));
        } catch (e) {
          toast.error(`${file.name}: ${errorMessage(e)}`);
        } finally {
          setUploading((n) => n - 1);
        }
      }
    } catch (e) {
      setUploading(0);
      toast.error(errorMessage(e));
    }
    if (fileInput.current) fileInput.current.value = "";
  };

  const move = (from: number, to: number) => {
    if (to < 0 || to >= form.images.length || from === to) return;
    setForm((f) => {
      const images = [...f.images];
      const [item] = images.splice(from, 1);
      images.splice(to, 0, item!);
      return { ...f, images };
    });
  };

  /* ---------- Save / delete ---------- */
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const slug = slugify(form.slug);
    if (!form.name.trim()) return toast.error("Please enter a product name.");
    if (!slug) return toast.error("Please enter a URL name (slug).");
    if (!form.category_id) return toast.error("Please choose a category.");
    const price = form.price.trim() === "" ? null : Number(form.price);
    if (price !== null && (!Number.isFinite(price) || price < 0))
      return toast.error("Price must be a positive number, or empty.");
    const benefits = form.benefitsPending
      ? null
      : form.benefits
          .filter((b) => b.en.trim())
          .map((b) => ({ en: b.en.trim(), so: b.so.trim() || b.en.trim() }));
    if (benefits && benefits.length === 0)
      return toast.error('Add at least one benefit, or tick "Benefits being verified".');

    const row: Record<string, unknown> = {
      name: form.name.trim(),
      name_so: form.name_so.trim() || null,
      slug,
      brand: form.brand.trim() || null,
      aliases: form.aliases
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      category_id: form.category_id,
      subcategory: hasSubcategories && form.subcategory ? form.subcategory : null,
      facts: form.facts.trim() || null,
      description: form.description.trim(),
      description_so: form.description_so.trim(),
      benefits,
      caution: form.caution.en.trim()
        ? { en: form.caution.en.trim(), so: form.caution.so.trim() || form.caution.en.trim() }
        : null,
      price,
      images: form.images.map((i) => i.path),
      image_labels: form.images.some((i) => i.label)
        ? form.images.map((i) => i.label ?? { en: "", so: "" })
        : null,
      in_stock: form.in_stock,
      is_featured: form.is_featured,
    };

    setBusy(true);
    try {
      const auth = await token();
      if (product) {
        await update<ProductRow>("products", product.id, row, auth);
        toast.success("Saved");
      } else {
        row["sort_order"] = Math.max(0, ...data.products.map((p) => p.sort_order)) + 1;
        const created = await insert<ProductRow>("products", row, auth);
        toast.success("Product added");
        void navigate({ to: "/admin/product", search: { id: created.id }, replace: true });
      }
      await data.reload();
      reloadSite();
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const del = async () => {
    if (!product) return;
    try {
      await remove("products", product.id, await token());
      toast.success(`Deleted ${product.name}`);
      reloadSite();
      void navigate({ to: "/admin" });
    } catch (e) {
      toast.error(errorMessage(e));
    }
  };

  const siteUrl = useMemo(() => `${import.meta.env.BASE_URL}product/${form.slug}`, [form.slug]);

  return (
    <form onSubmit={submit} className="space-y-5 pb-24">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link
            to="/admin"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="size-4" /> Products
          </Link>
          <h1 className="mt-1 text-3xl font-medium">{product ? "Edit product" : "Add product"}</h1>
        </div>
        {product && (
          <a
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-primary hover:underline"
          >
            View on site ↗
          </a>
        )}
      </div>

      <Panel title="Photos">
        <p className="mb-3 text-sm text-muted-foreground">
          The first photo is the main one. Drag photos (or use the arrows) to change the order.
        </p>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {form.images.map((img, i) => (
            <li
              key={img.path}
              draggable
              onDragStart={() => setDragIndex(i)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (dragIndex !== null) move(dragIndex, i);
                setDragIndex(null);
              }}
              onDragEnd={() => setDragIndex(null)}
              className={cn(
                "group relative aspect-square cursor-grab overflow-hidden rounded-2xl border-2 bg-card-gradient active:cursor-grabbing",
                i === 0 ? "border-primary" : "border-transparent",
                dragIndex === i && "opacity-40",
              )}
            >
              <img
                src={productImage(img.path)}
                alt=""
                className="h-full w-full object-contain p-2"
                draggable={false}
              />
              {i === 0 && (
                <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase text-primary-foreground">
                  Main
                </span>
              )}
              <GripVertical className="absolute right-2 top-2 hidden size-4 text-muted-foreground sm:block" />
              <div className="absolute inset-x-2 bottom-2 flex justify-between gap-1">
                <IconBtn label="Move left" onClick={() => move(i, i - 1)} disabled={i === 0}>
                  <ChevronLeft />
                </IconBtn>
                <IconBtn
                  label="Remove photo"
                  onClick={() =>
                    set(
                      "images",
                      form.images.filter((_, j) => j !== i),
                    )
                  }
                  danger
                >
                  <X />
                </IconBtn>
                <IconBtn
                  label="Move right"
                  onClick={() => move(i, i + 1)}
                  disabled={i === form.images.length - 1}
                >
                  <ChevronRight />
                </IconBtn>
              </div>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              disabled={uploading > 0}
              className="flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed text-sm font-semibold text-muted-foreground transition hover:border-primary hover:text-primary"
            >
              {uploading > 0 ? <Spinner /> : <ImagePlus className="size-6" />}
              {uploading > 0 ? `Uploading ${uploading}…` : "Add photos"}
            </button>
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => void upload(e.target.files)}
            />
          </li>
        </ul>
      </Panel>

      <Panel title="Basics">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name (English / brand name) *">
            <input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className={inputClass}
              required
            />
          </Field>
          <Field label="Name in Somali" hint="Only if it differs from the English name.">
            <input
              value={form.name_so}
              onChange={(e) => set("name_so", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Category *">
            <select
              value={form.category_id}
              onChange={(e) => set("category_id", e.target.value)}
              className={inputClass}
              required
            >
              {data.categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>
          {hasSubcategories ? (
            <Field label="Subcategory">
              <select
                value={form.subcategory}
                onChange={(e) => set("subcategory", e.target.value as Form["subcategory"])}
                className={inputClass}
              >
                <option value="">—</option>
                {SUBCATEGORY_IDS.map((s) => (
                  <option key={s} value={s}>
                    {en.subcategories[s]}
                  </option>
                ))}
              </select>
            </Field>
          ) : (
            <div className="hidden sm:block" />
          )}
          <Field label="Price (USD)" hint="Leave empty to hide the price on the site.">
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
              className={inputClass}
              placeholder="e.g. 25.00"
            />
          </Field>
          <Field label="Brand">
            <input
              value={form.brand}
              onChange={(e) => set("brand", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field
            label="Pack facts"
            hint='As on the label, e.g. "500 mg · 100 capsules".'
            className="sm:col-span-2"
          >
            <input
              value={form.facts}
              onChange={(e) => set("facts", e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:gap-8">
          <Toggle label="In stock" checked={form.in_stock} onChange={(v) => set("in_stock", v)} />
          <Toggle
            label="Featured on home page"
            checked={form.is_featured}
            onChange={(v) => set("is_featured", v)}
          />
        </div>
      </Panel>

      <Panel title="Description">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="English">
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className={textareaClass}
              rows={5}
            />
          </Field>
          <Field label="Somali">
            <textarea
              value={form.description_so}
              onChange={(e) => set("description_so", e.target.value)}
              className={textareaClass}
              rows={5}
            />
          </Field>
        </div>
      </Panel>

      <Panel title="Key benefits">
        <Toggle
          label="Benefits being verified (show a note instead of benefits)"
          checked={form.benefitsPending}
          onChange={(v) => set("benefitsPending", v)}
        />
        {!form.benefitsPending && (
          <div className="mt-4 space-y-4">
            <p className="text-xs text-muted-foreground">
              Use responsible wording — no “cures / treats / prevents disease” claims.
            </p>
            {form.benefits.map((b, i) => (
              <div key={i} className="grid gap-2 rounded-2xl bg-secondary/50 p-3 sm:grid-cols-2">
                <input
                  value={b.en}
                  onChange={(e) =>
                    set(
                      "benefits",
                      form.benefits.map((x, j) => (j === i ? { ...x, en: e.target.value } : x)),
                    )
                  }
                  placeholder={`Benefit ${i + 1} — English`}
                  className={inputClass}
                />
                <input
                  value={b.so}
                  onChange={(e) =>
                    set(
                      "benefits",
                      form.benefits.map((x, j) => (j === i ? { ...x, so: e.target.value } : x)),
                    )
                  }
                  placeholder={`Benefit ${i + 1} — Somali`}
                  className={inputClass}
                />
              </div>
            ))}
          </div>
        )}
      </Panel>

      <Panel title="More">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Caution — English" hint="Optional warning, e.g. contains caffeine.">
            <textarea
              value={form.caution.en}
              onChange={(e) => set("caution", { ...form.caution, en: e.target.value })}
              className={textareaClass}
              rows={2}
            />
          </Field>
          <Field label="Caution — Somali">
            <textarea
              value={form.caution.so}
              onChange={(e) => set("caution", { ...form.caution, so: e.target.value })}
              className={textareaClass}
              rows={2}
            />
          </Field>
          <Field label="Extra search words" hint="Comma separated: other spellings, local names.">
            <input
              value={form.aliases}
              onChange={(e) => set("aliases", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="URL name (slug) *" hint={<>Page address: …/product/{form.slug || "…"}</>}>
            <input
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true);
                set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"));
              }}
              onBlur={() => set("slug", slugify(form.slug))}
              className={inputClass}
              required
            />
          </Field>
        </div>
      </Panel>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-2 px-4 py-3">
          {product && (
            <ConfirmDelete
              title={`Delete ${product.name}?`}
              description="The product is removed from the website. This cannot be undone. (Its photos stay in storage.)"
              onConfirm={() => void del()}
            >
              <Button
                type="button"
                variant="ghost"
                className="text-destructive hover:bg-destructive/10"
              >
                <Trash2 /> <span className="hidden sm:inline">Delete</span>
              </Button>
            </ConfirmDelete>
          )}
          <Button asChild type="button" variant="outline" className="ml-auto">
            <Link to="/admin">Cancel</Link>
          </Button>
          <Button type="submit" variant="forest" disabled={busy || uploading > 0}>
            {busy ? (
              <Spinner className="border-forest-foreground/30 border-t-forest-foreground" />
            ) : (
              <Save />
            )}
            {product ? "Save changes" : "Add product"}
          </Button>
        </div>
      </div>
    </form>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold">
      <Switch checked={checked} onCheckedChange={onChange} />
      {label}
    </label>
  );
}

function IconBtn({
  label,
  onClick,
  disabled,
  danger,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex size-8 items-center justify-center rounded-full bg-card/95 shadow-soft transition disabled:opacity-30 [&_svg]:size-4",
        danger
          ? "text-destructive hover:bg-destructive hover:text-destructive-foreground"
          : "hover:bg-primary hover:text-primary-foreground",
      )}
    >
      {children}
    </button>
  );
}
