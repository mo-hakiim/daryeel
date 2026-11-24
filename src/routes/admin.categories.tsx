import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Plus, Save, Trash2, X } from "lucide-react";
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
  slugify,
  textareaClass,
} from "@/admin/ui";
import { Button } from "@/components/ui/button";
import { productImage } from "@/data/images";
import { useCatalog, type CategoryRow } from "@/data/store";
import { insert, remove, update } from "@/lib/supabase";

export const Route = createFileRoute("/admin/categories")({
  component: AdminCategories,
});

type Form = Omit<CategoryRow, "id" | "sort_order"> & { sort_order: string };

const toForm = (c?: CategoryRow): Form => ({
  slug: c?.slug ?? "",
  name: c?.name ?? "",
  name_so: c?.name_so ?? "",
  tagline: c?.tagline ?? "",
  tagline_so: c?.tagline_so ?? "",
  description: c?.description ?? "",
  description_so: c?.description_so ?? "",
  cover_image: c?.cover_image ?? "",
  sort_order: String(c?.sort_order ?? 0),
});

function AdminCategories() {
  const { token } = useAdminAuth();
  const { reload: reloadSite } = useCatalog();
  const { categories, products, loading, error, reload } = useAdminData();
  const [editing, setEditing] = useState<string | "new" | null>(null);

  const count = (id: string) => products.filter((p) => p.category_id === id).length;

  const del = async (c: CategoryRow) => {
    try {
      await remove("categories", c.id, await token());
      toast.success(`Deleted ${c.name}`);
      await reload();
      reloadSite();
    } catch (e) {
      toast.error(errorMessage(e));
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-medium sm:text-4xl">Categories</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Shown on the site in the order below (lowest number first).
          </p>
        </div>
        {editing !== "new" && (
          <Button variant="forest" onClick={() => setEditing("new")}>
            <Plus /> Add category
          </Button>
        )}
      </div>

      {error && (
        <p className="mb-5 rounded-2xl bg-destructive/10 p-4 text-sm text-destructive">{error}</p>
      )}

      {editing === "new" && (
        <CategoryForm
          nextOrder={Math.max(0, ...categories.map((c) => c.sort_order)) + 1}
          onDone={async (saved) => {
            setEditing(null);
            if (saved) {
              await reload();
              reloadSite();
            }
          }}
        />
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <Spinner className="size-8" />
        </div>
      ) : (
        <ul className="space-y-3">
          {categories.map((c) =>
            editing === c.id ? (
              <li key={c.id}>
                <CategoryForm
                  category={c}
                  nextOrder={c.sort_order}
                  onDone={async (saved) => {
                    setEditing(null);
                    if (saved) {
                      await reload();
                      reloadSite();
                    }
                  }}
                />
              </li>
            ) : (
              <li
                key={c.id}
                className="flex items-center gap-3 rounded-3xl border bg-card p-3 shadow-soft sm:p-4"
              >
                <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-card-gradient">
                  {c.cover_image && (
                    <img
                      src={productImage(c.cover_image)}
                      alt=""
                      className="h-full w-full object-contain p-1"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{c.name}</p>
                  <p className="line-clamp-1 text-xs text-muted-foreground">
                    {[c.name_so, `${count(c.id)} products`, `order ${c.sort_order}`]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-9"
                  aria-label={`Edit ${c.name}`}
                  onClick={() => setEditing(c.id)}
                >
                  <Pencil />
                </Button>
                <ConfirmDelete
                  title={`Delete ${c.name}?`}
                  description={
                    count(c.id) > 0
                      ? `This category still has ${count(c.id)} products. Move or delete them first — the delete will be refused.`
                      : "The category is removed from the website. This cannot be undone."
                  }
                  onConfirm={() => void del(c)}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-9 text-destructive hover:bg-destructive/10"
                    aria-label={`Delete ${c.name}`}
                  >
                    <Trash2 />
                  </Button>
                </ConfirmDelete>
              </li>
            ),
          )}
        </ul>
      )}
    </div>
  );
}

function CategoryForm({
  category,
  nextOrder,
  onDone,
}: {
  category?: CategoryRow;
  nextOrder: number;
  onDone: (saved: boolean) => void;
}) {
  const { token } = useAdminAuth();
  const [form, setForm] = useState<Form>(() => ({
    ...toForm(category),
    sort_order: String(nextOrder),
  }));
  const [busy, setBusy] = useState(false);
  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const slug = slugify(form.slug || form.name);
    if (!form.name.trim() || !slug) return toast.error("Please enter a name.");
    const row = {
      slug,
      name: form.name.trim(),
      name_so: form.name_so?.trim() || null,
      tagline: form.tagline?.trim() || null,
      tagline_so: form.tagline_so?.trim() || null,
      description: form.description?.trim() || null,
      description_so: form.description_so?.trim() || null,
      cover_image: form.cover_image?.trim() || null,
      sort_order: Number.parseInt(form.sort_order, 10) || 0,
    };
    setBusy(true);
    try {
      const auth = await token();
      if (category) await update("categories", category.id, row, auth);
      else await insert("categories", row, auth);
      toast.success(category ? "Saved" : "Category added");
      onDone(true);
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Panel title={category ? `Edit ${category.name}` : "New category"} className="mb-4">
      <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
        <Field label="Name (English) *">
          <input
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className={inputClass}
            required
          />
        </Field>
        <Field label="Name (Somali)">
          <input
            value={form.name_so ?? ""}
            onChange={(e) => set("name_so", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Tagline (English)">
          <input
            value={form.tagline ?? ""}
            onChange={(e) => set("tagline", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Tagline (Somali)">
          <input
            value={form.tagline_so ?? ""}
            onChange={(e) => set("tagline_so", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Description (English)">
          <textarea
            value={form.description ?? ""}
            onChange={(e) => set("description", e.target.value)}
            className={textareaClass}
            rows={3}
          />
        </Field>
        <Field label="Description (Somali)">
          <textarea
            value={form.description_so ?? ""}
            onChange={(e) => set("description_so", e.target.value)}
            className={textareaClass}
            rows={3}
          />
        </Field>
        <Field
          label="URL name (slug)"
          hint={
            category
              ? "Changing it changes the category's web address."
              : "Filled in from the name if left empty."
          }
        >
          <input
            value={form.slug}
            onChange={(e) => set("slug", e.target.value.toLowerCase())}
            className={inputClass}
          />
        </Field>
        <Field label="Order" hint="Lower numbers are shown first.">
          <input
            type="number"
            value={form.sort_order}
            onChange={(e) => set("sort_order", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field
          label="Card photo"
          hint="Leave empty to use the first product's photo."
          className="sm:col-span-2"
        >
          <input
            value={form.cover_image ?? ""}
            onChange={(e) => set("cover_image", e.target.value)}
            className={inputClass}
            placeholder="e.g. ashwagandha.webp"
          />
        </Field>
        <div className="flex justify-end gap-2 sm:col-span-2">
          <Button type="button" variant="outline" onClick={() => onDone(false)}>
            <X /> Cancel
          </Button>
          <Button type="submit" variant="forest" disabled={busy}>
            {busy ? (
              <Spinner className="border-forest-foreground/30 border-t-forest-foreground" />
            ) : (
              <Save />
            )}
            Save
          </Button>
        </div>
      </form>
    </Panel>
  );
}
