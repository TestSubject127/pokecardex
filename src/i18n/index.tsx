"use client";

import { useEffect } from 'react';
import { LanguageProvider, useLanguage, Language } from './LanguageContext';

// Language switcher component
export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return (
    <div className="language-switcher">
      <button
        className={`language-button ${language === 'de' ? 'active' : ''}`}
        onClick={() => handleLanguageChange('de')}
        aria-label="Deutsch"
        title="Deutsch"
      >
        DE
      </button>
      <button
        className={`language-button ${language === 'en' ? 'active' : ''}`}
        onClick={() => handleLanguageChange('en')}
        aria-label="English"
        title="English"
      >
        EN
      </button>
    </div>
  );
}

// HTML lang attribute updater
export function HtmlLangUpdater() {
  const { language } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return null;
}

export { LanguageProvider, useLanguage };
export type { Language };
