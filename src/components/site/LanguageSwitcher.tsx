import { motion } from "motion/react";

import { useI18n, type Lang } from "@/i18n";
import { cn } from "@/lib/utils";

const LANGS: Lang[] = ["en", "so"];

export function LanguageSwitcher({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const { lang, setLang, t } = useI18n();
  return (
    <div
      role="group"
      aria-label={t.common.language}
      className={cn(
        "relative inline-flex items-center rounded-full p-1 text-xs font-bold tracking-wider",
        tone === "light" ? "bg-secondary text-secondary-foreground" : "glass-dark text-forest-foreground",
        className,
      )}
    >
      {LANGS.map((l) => {
        const active = l === lang;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={active}
            lang={l}
            className={cn(
              "relative z-10 h-8 min-w-10 cursor-pointer rounded-full px-3 transition-colors",
              active ? (tone === "light" ? "text-primary-foreground" : "text-lime-foreground") : "opacity-70 hover:opacity-100",
            )}
          >
            {active && (
              <motion.span
                layoutId={`lang-pill-${tone}`}
                className={cn("absolute inset-0 -z-10 rounded-full", tone === "light" ? "bg-primary" : "bg-lime")}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
