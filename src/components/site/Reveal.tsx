import { motion, type HTMLMotionProps } from "motion/react";

/** Fades and slides content up as it scrolls into view. */
export function Reveal({
  delay = 0,
  y = 28,
  children,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
