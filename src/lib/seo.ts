// Search engine and link-preview tags: titles, descriptions, canonical URLs, Open Graph
// (WhatsApp / Facebook previews) and schema.org structured data.
import { useEffect } from "react";

import { productImage } from "@/data/images";
import type { CatalogCategory, CatalogProduct } from "@/data/store";
import { en } from "@/i18n/en";
import { fill } from "@/i18n";
import { CONTACT } from "@/lib/contact";

export const SITE_NAME = "Daryeel Wellness";
export const SITE_URL = "https://daryeelwellness.fit";
/** Default link-preview image (1200×630) in public/. */
export const OG_IMAGE = "og-image.jpg";

type Meta = { title: string; description: string };
type JsonLd = Record<string, unknown>;

/** Absolute URL on the live domain. Page paths get a trailing slash (GitHub Pages serves /about/). */
export function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  const clean = `/${path.replace(/^\/+/, "")}`;
  const isFile = /\.[a-z0-9]+$/i.test(clean);
  return SITE_URL + (isFile || clean.endsWith("/") ? clean : `${clean}/`);
}

const clip = (s: string, n = 160) => {
  const t = s.replace(/\s+/g, " ").trim();
  return t.length <= n ? t : `${t.slice(0, n - 1).replace(/\s+\S*$/, "")}…`;
};

/**
 * Static head for a prerendered page (English — what search engines and link previews
 * read). `path` is the page address, e.g. "/about".
 */
export function pageHead(
  meta: Meta,
  path: string,
  opts: { image?: string; type?: "website" | "product"; jsonLd?: JsonLd[]; noindex?: boolean } = {},
) {
  const url = absoluteUrl(path);
  const image = absoluteUrl(opts.image || OG_IMAGE);
  const description = clip(meta.description);
  return {
    meta: [
      { title: meta.title },
      { name: "description", content: description },
      { property: "og:title", content: meta.title },
      { property: "og:description", content: description },
      { property: "og:type", content: opts.type ?? "website" },
      { property: "og:url", content: url },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "so_SO" },
      { property: "og:image", content: image },
      ...(opts.image
        ? []
        : [
            { property: "og:image:width", content: "1200" },
            { property: "og:image:height", content: "630" },
          ]),
      { property: "og:image:alt", content: meta.title },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: meta.title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
      ...(opts.noindex ? [{ name: "robots", content: "noindex" }] : []),
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: (opts.jsonLd ?? []).map((data) => ({
      type: "application/ld+json",
      children: JSON.stringify(data),
    })),
  };
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

/**
 * Keeps the browser tab title and description in the visitor's language (and up to
 * date for products loaded after the page). Pass null while there is nothing to show.
 */
export function usePageMeta(meta: Meta | null) {
  const title = meta?.title;
  const description = meta?.description;
  useEffect(() => {
    if (!title || description === undefined) return;
    document.title = title;
    const desc = clip(description);
    setMeta("name", "description", desc);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", desc);
  }, [title, description]);
}

/* ---------------- Page metadata built from catalogue data ---------------- */

type Lang = "en" | "so";
type SeoDict = typeof en.seo;

/** Product name for titles, with the brand in front when the name doesn't already include it. */
export function productTitleName(
  p: Pick<CatalogProduct, "name" | "nameSo" | "brand">,
  lang: Lang = "en",
) {
  const name = lang === "so" && p.nameSo ? p.nameSo : p.name;
  return p.brand && !name.toLowerCase().includes(p.brand.toLowerCase())
    ? `${p.brand} ${name}`
    : name;
}

/** Fills a "{description} …" template, shortening the description so the ending (shop name and city) always fits. */
function withSuffix(template: string, description: string) {
  const room = 158 - template.replace("{description}", "").length;
  return fill(template, { description: clip(description, room) });
}

export function productMeta(p: CatalogProduct, seo: SeoDict, lang: Lang = "en"): Meta {
  return {
    title: fill(seo.product.title, { name: productTitleName(p, lang) }),
    description: withSuffix(seo.product.description, p.description[lang]),
  };
}

export function categoryMeta(c: CatalogCategory, seo: SeoDict, lang: Lang = "en"): Meta {
  return {
    title: fill(seo.category.title, { name: c.name[lang] }),
    description: withSuffix(seo.category.description, c.description[lang] || c.tagline[lang]),
  };
}

/* ---------------- Structured data (schema.org) ---------------- */

/** The business: shown on the home and contact pages. */
export function businessJsonLd(): JsonLd {
  const phone = `+${CONTACT.whatsappNumber}`;
  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: absoluteUrl("apple-touch-icon.png"),
    image: absoluteUrl(OG_IMAGE),
    description: en.seo.home.description,
    telephone: phone,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hargeisa",
      addressRegion: "Maroodi Jeex",
      addressCountry: "SO",
    },
    areaServed: { "@type": "City", name: "Hargeisa" },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: phone,
        url: `https://wa.me/${CONTACT.whatsappNumber}`,
        availableLanguage: ["Somali", "English"],
      },
      ...CONTACT.phones.map((p) => ({
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: `+252${p.replace(/^0/, "")}`,
        availableLanguage: ["Somali", "English"],
      })),
    ],
  };
}

export function productJsonLd(p: CatalogProduct, categoryName?: string): JsonLd {
  const url = absoluteUrl(`/product/${p.slug}`);
  const images = p.images.map((ref) => absoluteUrl(productImage(ref))).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: productTitleName(p),
    description: p.description.en,
    url,
    sku: p.slug,
    ...(images.length ? { image: images } : {}),
    ...(p.brand ? { brand: { "@type": "Brand", name: p.brand } } : {}),
    ...(categoryName ? { category: categoryName } : {}),
    // Google only accepts an Offer with a price, so it is added once a price is set in the dashboard.
    ...(p.price != null
      ? {
          offers: {
            "@type": "Offer",
            url,
            price: p.price.toFixed(2),
            priceCurrency: "USD",
            availability: `https://schema.org/${p.inStock === false ? "OutOfStock" : "InStock"}`,
            seller: { "@id": `${SITE_URL}/#business` },
          },
        }
      : {}),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}
