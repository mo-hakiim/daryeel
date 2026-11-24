import { readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { CATEGORY_IDS } from "@/data/catalog";
import { productImages } from "@/data/images";
import { getProduct, products, productsIn } from "@/data/products";
import { en } from "@/i18n/en";
import { fill } from "@/i18n";
import { so } from "@/i18n/so";
import { CONTACT, telHref, whatsappLink } from "@/lib/contact";
import { buildConsultationMessage } from "@/lib/messages";

function keyPaths(o: unknown, prefix = ""): string[] {
  if (Array.isArray(o)) return [`${prefix}[${o.length}]`, ...o.flatMap((v, i) => keyPaths(v, `${prefix}[${i}]`))];
  if (o && typeof o === "object") return Object.entries(o).flatMap(([k, v]) => keyPaths(v, prefix ? `${prefix}.${k}` : k));
  return [prefix];
}

describe("official contact details", () => {
  it("WhatsApp links open a chat with +25263800227", () => {
    expect(whatsappLink()).toBe("https://wa.me/25263800227");
  });
  it("phone numbers and email match the company profile", () => {
    expect(CONTACT.phones).toEqual(["0634029802", "0637999938"]);
    expect(CONTACT.email).toBe("daryeelhargeisa07@gmail.com");
    expect(telHref("0634029802")).toBe("tel:+252634029802");
  });
});

describe("WhatsApp product ordering", () => {
  it("pre-fills the order message with the product name", () => {
    const url = whatsappLink(fill(en.whatsapp.product, { product: "Zinc 50 mg" }));
    const text = new URL(url).searchParams.get("text");
    expect(text).toBe("Hello Daryeel Wellness, I am interested in ordering Zinc 50 mg. Please provide more information.");
  });
  it("consultation requests include every submitted detail", () => {
    const msg = buildConsultationMessage(en, {
      fullName: "Amina Ali",
      phone: "0634000000",
      language: "so",
      type: "inPerson",
      date: "2030-01-15",
      subject: "Better sleep",
    });
    for (const part of ["Amina Ali", "0634000000", "Somali", "In-Person", "2030-01-15", "Better sleep"]) {
      expect(msg).toContain(part);
    }
  });
});

describe("product catalogue", () => {
  it("has the four main categories, each with products", () => {
    expect(CATEGORY_IDS).toEqual(["herbal", "minerals", "sports", "vitamins"]);
    expect(productsIn("herbal")).toHaveLength(19);
    expect(productsIn("minerals")).toHaveLength(7);
    expect(productsIn("sports")).toHaveLength(12);
    expect(productsIn("vitamins")).toHaveLength(9);
  });

  it("herbal products are split into general, natural ingredients and herbal oils", () => {
    expect(productsIn("herbal", "general")).toHaveLength(7);
    expect(productsIn("herbal", "ingredients")).toHaveLength(6);
    expect(productsIn("herbal", "oils")).toHaveLength(6);
  });

  it("every supplied product photo is used, and every product image exists", () => {
    const dir = path.resolve(__dirname, "../assets/products");
    const files = readdirSync(dir).map((f) => f.replace(".webp", ""));
    const used = products.flatMap((p) => p.images);
    expect(new Set(used)).toEqual(new Set(files));
    for (const key of used) expect(productImages[key]).toBeTruthy();
  });

  it("each product has exactly three benefits, or none while unverified", () => {
    for (const p of products) {
      if (p.benefits) expect(p.benefits, p.slug).toHaveLength(3);
    }
  });

  it("unverified products show no invented benefits", () => {
    for (const slug of ["fertil-rx", "ova-rx", "herbal-seeds", "feg-hair-spray", "saliida-mucjisada"]) {
      expect(getProduct(slug)?.benefits, slug).toBeNull();
    }
  });

  it("Saliida Mucjisada shows only the benefits supplied in its file name", () => {
    const p = getProduct("saliida-mucjisada");
    expect(p?.suppliedBenefits).toHaveLength(1);
    expect(p?.suppliedBenefits?.[0]?.en).toBe(
      "Treats back pain, bone pain, headaches, fainting, and nerve issues — and the Holy Quran.",
    );
  });

  it("written benefits make no cure, treat or prevent claims", () => {
    const banned = /\b(cure|cures|treat|treats|prevent|prevents)\b/i;
    for (const p of products) {
      for (const b of p.benefits ?? []) expect(b.en, p.slug).not.toMatch(banned);
    }
  });

  it("Lean Mass Gainer is one product with all three photos", () => {
    expect(getProduct("lean-mass-gainer")?.images).toHaveLength(3);
  });
});

describe("translations", () => {
  it("Somali covers every English text", () => {
    expect(keyPaths(so)).toEqual(keyPaths(en));
  });
  it("every product has Somali description and benefits", () => {
    for (const p of products) {
      expect(p.description.so.length, p.slug).toBeGreaterThan(0);
      for (const b of p.benefits ?? []) expect(b.so.length, p.slug).toBeGreaterThan(0);
    }
  });
});
