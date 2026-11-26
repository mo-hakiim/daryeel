// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { existsSync, readFileSync } from "node:fs";

import { defineConfig } from "@lovable.dev/vite-tanstack-config";

import { CATEGORY_IDS } from "./src/data/catalog";
import { products } from "./src/data/products";

// One setting controls where the site lives: BASE_PATH (default "/").
//   BASE_PATH=/daryeel/  -> https://mo-hakiim.github.io/daryeel/
//   BASE_PATH=/          -> a custom domain at the root
// Vite uses it as `base`; the router and favicon read it back via import.meta.env.BASE_URL.
const trimmedBase = (process.env.BASE_PATH ?? "/").replace(/^\/+|\/+$/g, "");
const base = trimmedBase ? `/${trimmedBase}/` : "/";

// Every page is prerendered to static HTML. Category and product pages come from the
// live catalogue snapshot (scripts/prepare-build.mjs) when there is one, otherwise from
// the bundled catalogue — so products added in the dashboard get their own page.
type SnapshotRow = { id: string; slug: string; category_id?: string };
const snapshotPath = new URL("./src/data/catalog-snapshot.json", import.meta.url);
const snapshot: { categories: SnapshotRow[]; products: SnapshotRow[] } | null = existsSync(snapshotPath)
  ? JSON.parse(readFileSync(snapshotPath, "utf8"))
  : null;
const liveCategoryIds = new Set(snapshot?.categories.map((c) => c.id));
const categorySlugs = snapshot ? snapshot.categories.map((c) => c.slug) : [...CATEGORY_IDS];
const productSlugs = snapshot
  ? snapshot.products.filter((p) => liveCategoryIds.has(p.category_id!)).map((p) => p.slug)
  : products.map((p) => p.slug);

const pages = [
  "/",
  "/about",
  "/services",
  "/consultation",
  "/contact",
  "/products",
  ...categorySlugs.map((slug) => `/products/${slug}`),
  ...productSlugs.map((slug) => `/product/${slug}`),
  // Admin dashboard (not linked from the site; noindex). Rendered as an empty shell,
  // the sign-in check runs in the browser.
  "/admin",
  "/admin/login",
  "/admin/product",
  "/admin/categories",
  "/admin/reset-password",
].map((path) => ({ path }));

export default defineConfig({
  vite: { base },
  tanstackStart: {
    pages,
    prerender: { enabled: true, autoStaticPathsDiscovery: false },
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
  },
});
