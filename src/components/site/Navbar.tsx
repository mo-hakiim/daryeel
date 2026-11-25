import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";
import { whatsappLink } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { NAV_LINKS } from "./nav-links";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function Navbar() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        {t.nav.skip}
      </a>
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className={cn(
          "mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 rounded-full px-4 transition-all duration-500 sm:px-6",
          open ? "glass-strong shadow-soft" : scrolled ? "glass shadow-soft" : "bg-transparent",
        )}
        aria-label="Main"
      >
        <Link to="/" className="shrink-0" aria-label="Daryeel Wellness — home">
          <Logo className="h-9 sm:h-10" />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="group relative rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary data-[status=active]:text-primary"
              >
                {({ isActive }) => (
                  <>
                    {t.nav[l.key]}
                    <span
                      className={cn(
                        "absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left rounded-full bg-lime transition-transform duration-300",
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </>
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <Button asChild variant="whatsapp" size="sm" className="hidden md:inline-flex">
            <a href={whatsappLink(t.whatsapp.general)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-4" />
              {t.nav.whatsapp}
            </a>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-secondary lg:hidden"
          >
            <span className="relative block h-3.5 w-5">
              <span className={cn("absolute left-0 top-0 h-0.5 w-5 rounded bg-foreground transition-all duration-300", open && "top-1.5 rotate-45")} />
              <span className={cn("absolute left-0 top-1.5 h-0.5 w-5 rounded bg-foreground transition-all duration-300", open && "opacity-0")} />
              <span className={cn("absolute left-0 top-3 h-0.5 w-5 rounded bg-foreground transition-all duration-300", open && "top-1.5 -rotate-45")} />
            </span>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="glass-strong mx-auto mt-2 max-w-7xl overflow-hidden rounded-3xl p-3 shadow-lift lg:hidden"
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i + 0.05 }}
                >
                  <Link
                    to={l.to}
                    activeOptions={{ exact: l.to === "/" }}
                    className="flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-xl text-foreground transition-colors hover:bg-secondary data-[status=active]:bg-secondary data-[status=active]:text-primary"
                  >
                    {t.nav[l.key]}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-3 flex items-center justify-between gap-3 border-t px-2 pt-4">
              <LanguageSwitcher />
              <Button asChild variant="whatsapp">
                <a href={whatsappLink(t.whatsapp.general)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-4" />
                  {t.nav.whatsapp}
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
