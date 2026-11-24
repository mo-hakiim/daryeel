import type { ReactNode } from "react";
import { motion } from "motion/react";

import { Leaf } from "./Leaf";

/** Hero band at the top of inner pages. */
export function PageHeader({ eyebrow, title, subtitle, children }: { eyebrow: string; title: ReactNode; subtitle?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-hero pb-16 pt-36 sm:pb-20 sm:pt-44">
      <div className="blob -right-24 top-10 h-72 w-72 bg-lime/30" />
      <div className="blob -left-20 bottom-0 h-64 w-64 bg-primary/15" />
      <Leaf className="absolute -right-6 top-24 hidden h-64 w-40 rotate-12 text-primary/15 md:block" />
      <div className="container-page relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-3xl"
        >
          <p className="eyebrow mb-4">
            <span className="h-px w-8 bg-primary" />
            {eyebrow}
          </p>
          <h1 className="text-balance text-4xl font-medium leading-[1.03] sm:text-6xl">{title}</h1>
          {subtitle && <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">{subtitle}</p>}
          {children}
        </motion.div>
      </div>
    </section>
  );
}
