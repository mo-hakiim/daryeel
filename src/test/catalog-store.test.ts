import { describe, expect, it } from "vitest";

import { productImage, productImages } from "@/data/images";
import { products } from "@/data/products";
import {
  bundledCategories,
  rowToCategory,
  rowToProduct,
  type CategoryRow,
  type ProductRow,
} from "@/data/store";
import { en } from "@/i18n/en";
import { so } from "@/i18n/so";

// Mirrors scripts/generate-seed.mjs: a product written to the database and read back
// must look exactly like the bundled one, so moving to Supabase changes no text.
function seedRow(p: (typeof products)[number], i: number): ProductRow {
  return {
    id: `id-${i}`,
    slug: p.slug,
    name: p.name,
    name_so: p.nameSo ?? null,
    brand: p.brand ?? null,
    aliases: p.aliases ?? [],
    category_id: p.category,
    subcategory: p.subcategory ?? null,
    facts: p.facts ?? null,
    description: p.description.en,
    description_so: p.description.so,
    benefits: p.benefits,
    supplied_benefits: p.suppliedBenefits ?? null,
    caution: p.caution ?? null,
    image_labels: p.imageLabels ?? null,
    price: null,
    images: p.images.map((k) => `${k}.webp`),
    in_stock: true,
    is_featured: Boolean(p.featured),
    sort_order: i,
    created_at: "",
    updated_at: "",
  };
}

describe("Supabase catalogue mapping", () => {
  it("round-trips every bundled product without changing its text", () => {
    products.forEach((p, i) => {
      const back = rowToProduct(seedRow(p, i), p.category);
      expect(back.name).toBe(p.name);
      expect(back.nameSo).toBe(p.nameSo);
      expect(back.description).toEqual(p.description);
      expect(back.benefits).toEqual(p.benefits);
      expect(back.suppliedBenefits).toEqual(p.suppliedBenefits);
      expect(back.caution).toEqual(p.caution);
      expect(back.facts).toBe(p.facts);
      expect(back.category).toBe(p.category);
      expect(back.subcategory).toBe(p.subcategory);
      expect(back.price).toBeNull();
      expect(back.images.map(productImage)).toEqual(p.images.map((k) => productImages[k]));
    });
  });

  it("maps categories with both languages", () => {
    const row: CategoryRow = {
      id: "1",
      slug: "herbal",
      name: en.categories.herbal.name,
      name_so: so.categories.herbal.name,
      tagline: en.categories.herbal.tagline,
      tagline_so: so.categories.herbal.tagline,
      description: en.categories.herbal.description,
      description_so: so.categories.herbal.description,
      cover_image: "ashwagandha.webp",
      sort_order: 0,
    };
    const c = rowToCategory(row);
    expect(c.name).toEqual(bundledCategories[0]!.name);
    expect(c.description).toEqual(bundledCategories[0]!.description);
  });

  it("falls back to English when a Somali field is empty", () => {
    const row = { ...seedRow(products[0]!, 0), description_so: "", name_so: null };
    expect(rowToProduct(row, "herbal").description.so).toBe(products[0]!.description.en);
  });
});

describe("productImage", () => {
  it("serves bundled photos locally, by key or bucket path", () => {
    expect(productImage("ashwagandha")).toBe(productImages["ashwagandha"]);
    expect(productImage("ashwagandha.webp")).toBe(productImages["ashwagandha"]);
  });
  it("passes full URLs through", () => {
    expect(productImage("https://example.com/a.webp")).toBe("https://example.com/a.webp");
  });
});
