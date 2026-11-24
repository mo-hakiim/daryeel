import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";

import { en, type Dictionary } from "./en";
import { so } from "./so";

export type Lang = "en" | "so";
export const LANG_COOKIE = "dw_lang";
export const dictionaries: Record<Lang, Dictionary> = { en, so };

export function isLang(value: unknown): value is Lang {
  return value === "en" || value === "so";
}

/** Reads the saved language on the server (cookie header) and in the browser (document.cookie). */
export const readSavedLang = createIsomorphicFn()
  .server((): Lang => {
    const v = getCookie(LANG_COOKIE);
    return isLang(v) ? v : "en";
  })
  .client((): Lang => {
    const match = document.cookie.match(new RegExp(`(?:^|; )${LANG_COOKIE}=([^;]+)`));
    const v = match?.[1];
    return isLang(v) ? v : "en";
  });

/** Replaces {key} placeholders in a dictionary string. */
export function fill(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? `{${k}}`));
}

type Ctx = { lang: Lang; t: Dictionary; setLang: (l: Lang) => void };
const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ initialLang, children }: { initialLang: Lang; children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    document.cookie = `${LANG_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => ({ lang, t: dictionaries[lang], setLang }), [lang, setLang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used inside LanguageProvider");
  return ctx;
}

/** Picks the right language from an { en, so } pair. */
export type Localized = { en: string; so: string };
export function useLocalized() {
  const { lang } = useI18n();
  return useCallback((l: Localized) => l[lang], [lang]);
}
