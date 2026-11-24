import { ShieldCheck } from "lucide-react";

import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

export function Disclaimer({ className }: { className?: string }) {
  const { t } = useI18n();
  return (
    <aside className={cn("flex gap-4 rounded-3xl border bg-sage p-5 sm:p-6", className)} aria-label={t.disclaimer.title}>
      <ShieldCheck className="mt-0.5 size-6 shrink-0 text-primary" />
      <div>
        <p className="text-sm font-bold text-foreground">{t.disclaimer.title}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.disclaimer.text}</p>
      </div>
    </aside>
  );
}
