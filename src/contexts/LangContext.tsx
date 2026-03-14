import React, { createContext, useContext, useState, type ReactNode } from "react";

type Lang = "pl" | "en";

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (pl: string, en: string) => string;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("pl");
  const t = (pl: string, en: string) => (lang === "pl" ? pl : en);
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
};
