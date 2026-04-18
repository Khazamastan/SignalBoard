'use client';

import { createContext, useContext, useMemo } from 'react';

import type { Locale, MessageCatalog, TranslationKey } from './messages';

type I18nContextValue = {
  locale: Locale;
  t: (key: TranslationKey, fallback?: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

type I18nProviderProps = {
  locale: Locale;
  messages: MessageCatalog;
  children: React.ReactNode;
};

export function I18nProvider({ locale, messages, children }: I18nProviderProps) {
  const contextValue = useMemo<I18nContextValue>(() => {
    return {
      locale,
      t: (key, fallback) => messages[key] ?? fallback ?? key,
    };
  }, [locale, messages]);

  return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>;
}

export const useI18n = (): I18nContextValue => {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useI18n must be used inside I18nProvider');
  }

  return context;
};
