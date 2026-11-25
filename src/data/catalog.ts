// Product categories and subcategories. Names/taglines live in the i18n dictionaries.
export const CATEGORY_IDS = ["herbal", "supplements", "sports", "vitamins"] as const;
export type CategoryId = (typeof CATEGORY_IDS)[number];

export const SUBCATEGORY_IDS = ["general", "ingredients", "oils", "nutrition", "accessories"] as const;
export type SubcategoryId = (typeof SUBCATEGORY_IDS)[number];

/** Subcategories that exist inside each category. */
export const CATEGORY_SUBCATEGORIES: Record<CategoryId, readonly SubcategoryId[]> = {
  herbal: ["general", "ingredients", "oils"],
  supplements: [],
  sports: ["nutrition", "accessories"],
  vitamins: [],
};

/** Product image key shown on each category card. */
export const CATEGORY_COVER: Record<CategoryId, string> = {
  herbal: "saliida-mucjisada",
  supplements: "ashwagandha",
  sports: "c4-original",
  vitamins: "c1000",
};

export function isCategoryId(v: string): v is CategoryId {
  return (CATEGORY_IDS as readonly string[]).includes(v);
}
export function isSubcategoryId(v: string): v is SubcategoryId {
  return (SUBCATEGORY_IDS as readonly string[]).includes(v);
}
