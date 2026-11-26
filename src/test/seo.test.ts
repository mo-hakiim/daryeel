/* eslint-disable @typescript-eslint/no-explicit-any -- structured data is checked as plain JSON */
import { describe, expect, it } from "vitest";

import { bundledCatalog } from "@/data/store";
import { en } from "@/i18n/en";
import { so } from "@/i18n/so";
import {
  absoluteUrl,
  businessJsonLd,
  categoryMeta,
  pageHead,
  productJsonLd,
  productMeta,
} from "@/lib/seo";

const city = { en: /Hargeisa/, so: /Hargeysa/ };

describe("page titles and descriptions", () => {
  it("every static page has a unique title naming Daryeel Wellness and the city, in both languages", () => {
    for (const [lang, dict] of [
      ["en", en],
      ["so", so],
    ] as const) {
      const pages = ["home", "products", "about", "services", "consultation", "contact"] as const;
      const titles = pages.map((k) => dict.seo[k].title);
      expect(new Set(titles).size).toBe(pages.length);
      for (const k of pages) {
        expect(dict.seo[k].title).toMatch(/Daryeel Wellness/);
        expect(`${dict.seo[k].title} ${dict.seo[k].description}`).toMatch(city[lang]);
        expect(dict.seo[k].description.length).toBeLessThanOrEqual(160);
      }
    }
  });

  it("every product and category gets its own title with the brand name and city", () => {
    for (const [lang, dict] of [
      ["en", en],
      ["so", so],
    ] as const) {
      const titles = bundledCatalog.products.map((p) => productMeta(p, dict.seo, lang).title);
      expect(new Set(titles).size).toBe(titles.length);
      for (const t of titles) {
        expect(t).toMatch(/Daryeel Wellness/);
        expect(t).toMatch(city[lang]);
      }
      for (const c of bundledCatalog.categories) {
        const m = categoryMeta(c, dict.seo, lang);
        expect(m.title).toMatch(city[lang]);
        expect(m.description).toMatch(/Daryeel Wellness/);
      }
    }
  });
});

describe("canonical URLs and preview tags", () => {
  it("uses https://daryeelwellness.fit with trailing slashes for pages", () => {
    expect(absoluteUrl("/")).toBe("https://daryeelwellness.fit/");
    expect(absoluteUrl("/about")).toBe("https://daryeelwellness.fit/about/");
    expect(absoluteUrl("/product/zinc-50")).toBe("https://daryeelwellness.fit/product/zinc-50/");
    expect(absoluteUrl("og-image.jpg")).toBe("https://daryeelwellness.fit/og-image.jpg");
  });

  it("adds the canonical link and the 1200×630 preview image", () => {
    const head = pageHead(en.seo.about, "/about");
    expect(head.links).toEqual([{ rel: "canonical", href: "https://daryeelwellness.fit/about/" }]);
    const props = Object.fromEntries(
      head.meta.filter((m) => "property" in m).map((m) => [m.property, m.content]),
    );
    expect(props["og:image"]).toBe("https://daryeelwellness.fit/og-image.jpg");
    expect(props["og:image:width"]).toBe("1200");
    expect(props["og:url"]).toBe("https://daryeelwellness.fit/about/");
  });
});

describe("structured data", () => {
  it("describes the business in Hargeisa with the WhatsApp number", () => {
    const b = businessJsonLd() as Record<string, any>;
    expect(b.name).toBe("Daryeel Wellness");
    expect(b.telephone).toBe("+252638000227");
    expect(b.address.addressLocality).toBe("Hargeisa");
    expect(b.address.addressCountry).toBe("SO");
  });

  it("describes each product, adding an offer only when a price is set", () => {
    const p = bundledCatalog.products.find((x) => x.slug === "zinc-50")!;
    const ld = productJsonLd(p, "Dietary Supplements") as Record<string, any>;
    expect(ld["@type"]).toBe("Product");
    expect(ld.url).toBe("https://daryeelwellness.fit/product/zinc-50/");
    expect(ld.offers).toBeUndefined();
    const priced = productJsonLd({ ...p, price: 12.5, inStock: false }) as Record<string, any>;
    expect(priced.offers).toMatchObject({
      price: "12.50",
      priceCurrency: "USD",
      availability: "https://schema.org/OutOfStock",
    });
  });
});

describe("descriptions keep the shop name and city", () => {
  it("never cuts off the 'Daryeel Wellness, Hargeisa' ending", () => {
    for (const [lang, dict] of [
      ["en", en],
      ["so", so],
    ] as const) {
      for (const p of bundledCatalog.products) {
        const d = productMeta(p, dict.seo, lang).description;
        expect(d.length).toBeLessThanOrEqual(160);
        expect(d).toMatch(
          lang === "en" ? /Daryeel Wellness, Hargeisa\.$/ : /Daryeel Wellness, Hargeysa\.$/,
        );
      }
    }
  });
});
