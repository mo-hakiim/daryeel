import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, Check, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { productImage } from "@/data/images";
import { displayName, formatPrice, useCatalog, type CatalogProduct } from "@/data/store";
import { cn } from "@/lib/utils";
import { fill, useI18n } from "@/i18n";
import { whatsappLink } from "@/lib/contact";

export function orderMessage(template: string, productName: string) {
  return fill(template, { product: productName });
}

export function ProductCard({ product }: { product: CatalogProduct }) {
  const { t, lang } = useI18n();
  const { getCategory } = useCatalog();
  const soldOut = product.inStock === false;
  const name = displayName(product, lang);
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const categoryLabel = product.subcategory ? t.subcategories[product.subcategory] : (getCategory(product.category)?.name[lang] ?? "");

  return (
    <div className="perspective h-full">
      <motion.article
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="@container group flex h-full flex-col overflow-hidden rounded-3xl border bg-card shadow-soft transition-shadow duration-500 hover:shadow-lift"
      >
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          className="relative block aspect-square overflow-hidden bg-card-gradient"
          aria-label={`${t.common.viewDetails}: ${name}`}
        >
          <img
            src={productImage(product.images[0] ?? "")}
            alt={name}
            loading="lazy"
            decoding="async"
            width={900}
            height={900}
            className={cn(
              "h-full w-full object-contain p-5 mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-[1.07]",
              soldOut && "opacity-60 grayscale-[40%]",
            )}
          />
          {soldOut && (
            <span className="absolute bottom-3 left-3 rounded-full bg-foreground/85 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-background">
              {t.common.outOfStock}
            </span>
          )}
          <span className="glass absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
            {categoryLabel}
          </span>
          <span className="absolute right-3 top-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-forest text-forest-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="size-4" />
          </span>
        </Link>

        <div className="flex flex-1 flex-col p-5">
          {(product.brand || product.facts) && (
            <p className="mb-1.5 line-clamp-1 text-xs font-medium text-muted-foreground">
              {[product.brand, product.facts].filter(Boolean).join(" · ")}
            </p>
          )}
          <h3 className="font-display text-xl leading-tight text-foreground">
            <Link to="/product/$slug" params={{ slug: product.slug }} className="hover:text-primary">
              {name}
            </Link>
          </h3>
          {product.price != null && <p className="mt-1 text-lg font-bold text-primary">{formatPrice(product.price)}</p>}
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{product.description[lang]}</p>

          <div className="mt-4 flex-1">
            {product.benefits ? (
              <>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                  {product.subcategory === "accessories" ? t.common.keyFeatures : t.common.keyBenefits}
                </p>
                <ul className="space-y-1.5">
                  {product.benefits.map((b) => (
                    <li key={b.en} className="flex gap-2 text-[13px] leading-snug text-foreground/85">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-primary" strokeWidth={3} />
                      <span className="line-clamp-2">{b[lang]}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : product.suppliedBenefits ? (
              <>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">{t.common.keyBenefits}</p>
                {product.suppliedBenefits.map((b) => (
                  <p key={b.en} className="flex gap-2 text-[13px] leading-snug text-foreground/85">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-primary" strokeWidth={3} />
                    <span>{b[lang]}</span>
                  </p>
                ))}
              </>
            ) : (
              <p className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground">
                <Clock className="size-3.5" />
                {t.common.pendingBenefits}
              </p>
            )}
          </div>

          <div className="mt-5 grid grid-cols-1 gap-2 @[24rem]:grid-cols-2">
            <Button asChild variant="outline" size="sm" className="h-10">
              <Link to="/product/$slug" params={{ slug: product.slug }}>
                {t.common.viewDetails}
              </Link>
            </Button>
            <Button asChild variant="whatsapp" size="sm" className="h-10 px-3">
              <a
                href={whatsappLink(orderMessage(t.whatsapp.product, name))}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t.common.orderWhatsApp}: ${name}`}
              >
                <WhatsAppIcon className="size-4" />
                <span className="truncate">{t.common.orderWhatsApp}</span>
              </a>
            </Button>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
