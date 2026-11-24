import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "light",
  className,
  as: As = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("eyebrow mb-4", tone === "dark" && "text-lime", align === "center" && "justify-center")}>
          <span className={cn("h-px w-8", tone === "dark" ? "bg-lime" : "bg-primary")} />
          {eyebrow}
        </p>
      )}
      <As
        className={cn(
          "text-balance text-4xl font-medium leading-[1.05] sm:text-5xl",
          tone === "dark" ? "text-forest-foreground" : "text-foreground",
        )}
      >
        {title}
      </As>
      {subtitle && (
        <p
          className={cn(
            "mt-5 text-pretty text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-forest-muted" : "text-muted-foreground",
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
