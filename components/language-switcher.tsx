"use client";

import { useEffect, useState } from "react";
import { htmlLanguage, isLanguage, languageOptions, messages, type Language } from "@/lib/i18n";

const STORAGE_KEY = "dawnnav-language";


export function useLanguagePreference() {
  const [language, setLanguageState] = useState<Language>("zh");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const next = isLanguage(stored) ? stored : "zh";
    setLanguageState(next);
    document.documentElement.lang = htmlLanguage(next);
  }, []);

  const setLanguage = (next: Language) => {
    setLanguageState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = htmlLanguage(next);
  };

  return { language, setLanguage, message: messages[language] };
}

export function LanguageSwitcher({ language, onChange, compact = false }: { language: Language; onChange: (language: Language) => void; compact?: boolean }) {
  return (
    <label className={`language-select ${compact ? "compact" : ""}`}>
      <span className="sr-only">{messages[language].language}</span>
      <select value={language} onChange={(event) => onChange(event.target.value as Language)} aria-label={messages[language].language}>
        {languageOptions.map((option) => <option key={option.code} value={option.code}>{compact ? option.code.toUpperCase() : option.label}</option>)}
      </select>
    </label>
  );
}
