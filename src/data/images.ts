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

export function productImage(key: string): string {
  return productImages[key] ?? "";
}
