import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { ArrowRight, CalendarCheck, Leaf as LeafIcon, MapPin, Sparkles } from "lucide-react";

import ashwagandha from "@/assets/hero/ashwagandha-cutout.webp";
import c4 from "@/assets/hero/c4-original-cutout.webp";
import collagen from "@/assets/hero/collagen-cutout.webp";
import iso from "@/assets/hero/iso100-dunkin-cutout.webp";
import magnesium from "@/assets/hero/magnesium-glycinate-cutout.webp";
import saliida from "@/assets/hero/saliida-mucjisada-cutout.webp";
import { Button } from "@/components/ui/button";
import { Leaf } from "@/components/site/Leaf";
import { useI18n } from "@/i18n";

const ease = [0.2, 0.8, 0.2, 1] as const;

export function Hero() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const stageY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    px.set(e.clientX / window.innerWidth - 0.5);
    py.set(e.clientY / window.innerHeight - 0.5);
  };

  return (
    <section ref={ref} onPointerMove={onMove} className="relative overflow-hidden bg-hero pt-28 sm:pt-32 lg:min-h-[100svh]">
      <div className="blob -left-32 top-20 h-96 w-96 bg-lime/25" />
      <div className="blob right-0 top-1/3 h-[28rem] w-[28rem] bg-primary/15 [animation-delay:-6s]" />
      <Leaf className="absolute left-[46%] top-24 hidden h-40 w-24 -rotate-12 text-primary/15 lg:block" />

      <div className="container-page relative grid items-center gap-10 pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pb-24">
        {/* Copy */}
        <div className="relative z-10 max-w-2xl">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9, ease }} className="eyebrow mb-6">
            <Sparkles className="size-3.5" />
            {t.hero.eyebrow}
          </motion.p>
          <h1 className="text-balance text-[2.9rem] font-medium leading-[0.98] sm:text-7xl xl:text-[5.4rem]">
            <motion.span initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1, ease }} className="block">
              {t.hero.titleA}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.12, ease }}
              className="relative inline-block italic text-primary"
            >
              {t.hero.titleB}
              <svg viewBox="0 0 300 20" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-3 w-full text-lime" aria-hidden="true">
                <motion.path
                  d="M2 14 C 80 2, 200 2, 298 12"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 1.6, ease }}
                />
              </svg>
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3, ease }}
            className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
          >
            {t.hero.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.45, ease }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Button asChild size="lg" variant="forest">
              <Link to="/products">
                {t.common.exploreProducts}
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="lime">
              <Link to="/consultation">
                <CalendarCheck />
                {t.common.bookConsultation}
              </Link>
            </Button>
          </motion.div>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.7 }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-foreground/75"
          >
            <li className="flex items-center gap-2">
              <LeafIcon className="size-4 text-primary" /> {t.hero.badgeFounded}
            </li>
            <li className="flex items-center gap-2">
              <CalendarCheck className="size-4 text-primary" /> {t.hero.badgeAccess}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" /> {t.hero.badgeLocation}
            </li>
          </motion.ul>
        </div>

        {/* 3D product stage */}
        <motion.div style={{ y: stageY }} className="relative mx-auto aspect-square w-full max-w-[34rem] perspective">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease }}
            className="absolute inset-[6%] rounded-full bg-forest-gradient shadow-lift"
          >
            <div className="leaf-pattern absolute inset-0 rounded-full opacity-60" />
            <div className="absolute inset-[9%] rounded-full border border-forest-foreground/10" />
            <div className="absolute inset-[22%] rounded-full border border-dashed border-lime/25" />
          </motion.div>
          <div className="blob left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 bg-lime/40" />

          <FloatImg src={collagen} mv={[sx, sy]} depth={35} className="left-[0%] top-[24%] w-[27%]" rot={-9} delay={1.1} dur="animate-float-slow" />
          <FloatImg src={c4} mv={[sx, sy]} depth={30} className="right-[-2%] top-[20%] w-[30%]" rot={8} delay={1.2} dur="animate-float-slow" />
          <FloatImg src={ashwagandha} mv={[sx, sy]} depth={60} className="left-[31%] top-[5%] z-10 w-[37%]" rot={-2} delay={1.0} />
          <FloatImg src={magnesium} mv={[sx, sy]} depth={50} className="bottom-[4%] left-[6%] z-20 w-[25%]" rot={6} delay={1.3} />
          <FloatImg src={iso} mv={[sx, sy]} depth={45} className="bottom-[1%] right-[3%] z-20 w-[30%]" rot={-6} delay={1.4} dur="animate-float-slow" />
          {/* Saliida Mucjisada — best seller, front and centre */}
          <FloatImg src={saliida} mv={[sx, sy]} depth={70} className="bottom-[1%] left-[40%] z-30 w-[20%]" rot={-3} delay={1.5} />

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.8, ease }}
            className="glass absolute -left-4 top-[2%] z-30 hidden max-w-[14rem] rounded-2xl p-3.5 shadow-lift sm:block"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lime text-lime-foreground">
                <LeafIcon className="size-4" />
              </span>
              <div>
                <p className="text-xs font-bold leading-tight text-foreground">{t.hero.floatCard}</p>
                <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground">{t.hero.floatCardSub}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Category marquee */}
      <div className="relative border-y border-primary/10 bg-card/50 py-4 backdrop-blur-sm">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {[...t.marquee, ...t.marquee, ...t.marquee, ...t.marquee].map((m, i) => (
            <span key={i} className="flex items-center gap-10 font-display text-lg italic text-foreground/60">
              {m}
              <LeafIcon className="size-4 text-lime" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function FloatImg({
  src,
  mv,
  depth,
  className,
  rot,
  delay,
  dur = "animate-float",
}: {
  src: string;
  mv: [MotionValue<number>, MotionValue<number>];
  depth: number;
  className: string;
  rot: number;
  delay: number;
  dur?: string;
}) {
  const x = useTransform(mv[0], (v) => v * depth);
  const y = useTransform(mv[1], (v) => v * depth);
  return (
    <motion.div
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay, ease }}
      className={`absolute ${className}`}
    >
      <img
        src={src}
        decoding="async"
        alt=""
        aria-hidden="true"
        className={`drop-product w-full ${dur}`}
        style={{ ["--r" as string]: `${rot}deg`, animationDelay: `${-delay * 2}s` }}
        draggable={false}
      />
    </motion.div>
  );
}
