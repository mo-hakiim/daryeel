import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp } from "lucide-react";

import { useI18n } from "@/i18n";
import { whatsappLink } from "@/lib/contact";
import { WhatsAppIcon } from "./WhatsAppIcon";

/** Fixed WhatsApp button (always visible) and back-to-top button (after scrolling). */
export function Floaters() {
  const { t } = useI18n();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label={t.common.backToTop}
            className="glass flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-foreground shadow-soft transition-transform hover:-translate-y-0.5"
          >
            <ArrowUp className="size-5" />
          </motion.button>
        )}
      </AnimatePresence>
      <a
        href={whatsappLink(t.whatsapp.general)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.whatsapp.floating}
        className="group relative flex items-center"
      >
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-forest px-4 py-2 text-sm font-semibold text-forest-foreground opacity-0 shadow-lift transition-all duration-300 group-hover:opacity-100 sm:block">
          {t.whatsapp.floating}
        </span>
        <span className="absolute inset-0 animate-ping rounded-full bg-whatsapp/40 [animation-duration:2.4s]" />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lift transition-transform duration-300 group-hover:scale-105 sm:h-16 sm:w-16">
          <WhatsAppIcon className="size-7 sm:size-8" />
        </span>
      </a>
    </div>
  );
}
