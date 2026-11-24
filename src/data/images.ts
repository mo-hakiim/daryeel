import { storageUrl, supabaseEnabled } from "@/lib/supabase";

// Maps product image keys (file names without extension) to their bundled URLs.
const modules = import.meta.glob<string>("../assets/products/*.webp", {
  eager: true,
  import: "default",
});

export const productImages: Record<string, string> = Object.fromEntries(
  Object.entries(modules).map(([path, url]) => {
    const key = path.split("/").pop()!.replace(".webp", "");
    return [key, url];
  }),
);

/**
 * Resolves a product image reference to a URL. A reference is one of:
 *   - a bundled key ("ashwagandha") or bucket path of a bundled photo ("ashwagandha.webp"):
 *     served from the site itself, so it works even when Supabase is down;
 *   - any other bucket path ("products/abc.webp"): served from Supabase Storage;
 *   - a full http(s) URL: used as-is.
 */
export function productImage(ref: string): string {
  if (!ref) return "";
  if (/^https?:\/\//.test(ref)) return ref;
  const key = ref.replace(/\.webp$/, "");
  if (productImages[key]) return productImages[key];
  return supabaseEnabled ? storageUrl(ref) : "";
}
