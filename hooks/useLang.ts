"use client";
import { createContext, useContext, useState, useCallback } from "react";

type Lang = "kr" | "jp";

interface LangContextValue {
  lang: Lang;
  toggle: () => void;
  t: (kr: string, jp: string) => string;
}

const LangContext = createContext<LangContextValue>({
  lang: "kr",
  toggle: () => {},
  t: (kr) => kr,
});

export function useLang() {
  return useContext(LangContext);
}

export { LangContext };
export type { Lang };

export function useLangState(): LangContextValue {
  const [lang, setLang] = useState<Lang>("kr");
  const toggle = useCallback(() => setLang((l) => (l === "kr" ? "jp" : "kr")), []);
  const t = useCallback((kr: string, jp: string) => (lang === "kr" ? kr : jp), [lang]);
  return { lang, toggle, t };
}
