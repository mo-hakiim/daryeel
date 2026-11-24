import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

import { productImage } from "@/data/images";
import { categoryCover, useCatalog } from "@/data/store";
import { fill, useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

export function CategoryCards() {
  const { t, lang } = useI18n();
  const { categories, products, productsIn } = useCatalog();
  return (
    <div className={cn("grid gap-5 sm:grid-cols-2", categories.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-4")}>
      {categories.map((cat, i) => {
        const c = cat.slug;
        const count = productsIn(c).length;
        return (
          <motion.div
            key={c}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <Link
              to="/products/$category"
              params={{ category: c }}
              search={{}}
              className="group relative flex h-full min-h-[24rem] flex-col overflow-hidden rounded-[2rem] border bg-card-gradient p-6 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
            >
              <div className="blob -right-10 -top-10 h-40 w-40 bg-lime/30 transition-transform duration-700 group-hover:scale-150" />
              <span className="relative text-xs font-bold uppercase tracking-[0.16em] text-primary">
                {fill(t.common.productsCount, { n: count })}
              </span>
              <h3 className="relative mt-2 font-display text-2xl leading-tight">{cat.name[lang]}</h3>
              <p className="relative mt-1 text-sm text-muted-foreground">{cat.tagline[lang]}</p>
              <div className="relative mt-auto flex items-end justify-between pt-4">
                <img
                  src={productImage(categoryCover(cat, products))}
                  alt=""
                  loading="lazy"
                  className="-mb-4 -ml-2 h-48 w-48 object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:rotate-[-3deg] group-hover:scale-105"
                />
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest text-forest-foreground transition-all duration-300 group-hover:bg-lime group-hover:text-lime-foreground">
                  <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
