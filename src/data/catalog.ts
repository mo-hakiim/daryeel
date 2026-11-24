// Product categories and subcategories. Names/taglines live in the i18n dictionaries.
export const CATEGORY_IDS = ["herbal", "minerals", "sports", "vitamins"] as const;
export type CategoryId = (typeof CATEGORY_IDS)[number];

export const SUBCATEGORY_IDS = ["general", "ingredients", "oils"] as const;
export type SubcategoryId = (typeof SUBCATEGORY_IDS)[number];

/** Subcategories that exist inside each category (only Herbal Products has them). */
export const CATEGORY_SUBCATEGORIES: Record<CategoryId, readonly SubcategoryId[]> = {
  herbal: SUBCATEGORY_IDS,
  minerals: [],
  sports: [],
  vitamins: [],
};

/** Product image key shown on each category card. */
export const CATEGORY_COVER: Record<CategoryId, string> = {
  herbal: "ashwagandha",
  minerals: "ultra-omega-3",
  sports: "c4-original",
  vitamins: "c1000",
};

export function isCategoryId(v: string): v is CategoryId {
  return (CATEGORY_IDS as readonly string[]).includes(v);
}
export function isSubcategoryId(v: string): v is SubcategoryId {
  return (SUBCATEGORY_IDS as readonly string[]).includes(v);
}
