import logoColor from "@/assets/brand/daryeel-logo-color.png";
import logoLight from "@/assets/brand/daryeel-logo-light.png";
import { cn } from "@/lib/utils";

/** Official Daryeel Wellness logo. "color" for light backgrounds, "light" for green/dark backgrounds. */
export function Logo({ variant = "color", className }: { variant?: "color" | "light"; className?: string }) {
  const src = variant === "light" ? logoLight : logoColor;
  return (
    <img
      src={src}
      alt="Daryeel Wellness"
      width={803}
      height={237}
      className={cn("h-9 w-auto select-none", className)}
      draggable={false}
    />
  );
}
