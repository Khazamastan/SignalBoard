import enMessages from './locales/en.json';
import esMessages from './locales/es.json';

export type Locale = 'en' | 'es';

export const DEFAULT_LOCALE: Locale = 'en';

type BaseMessages = typeof enMessages;

type DotPath<T> = {
  [K in keyof T & string]: T[K] extends string
    ? K
    : T[K] extends Record<string, unknown>
      ? `${K}.${DotPath<T[K]>}`
      : never;
}[keyof T & string];

export type TranslationKey = DotPath<BaseMessages>;
export type MessageCatalog = BaseMessages;

type InterpolationValue = string | number;
type InterpolationValues = Record<string, InterpolationValue>;

export type Translate = (
  key: TranslationKey,
  fallback?: string,
  values?: InterpolationValues,
) => string;

const EN_MESSAGES: MessageCatalog = enMessages;
const ES_MESSAGES: MessageCatalog = esMessages;

const collectLeafPaths = (
  source: Record<string, unknown>,
  prefix = '',
): string[] => {
  const paths: string[] = [];

  Object.entries(source).forEach(([segment, value]) => {
    const path = prefix ? `${prefix}.${segment}` : segment;

    if (typeof value === 'string') {
      paths.push(path);
      return;
    }

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      paths.push(...collectLeafPaths(value as Record<string, unknown>, path));
    }
  });

  return paths;
};

const readMessageByPath = (
  source: MessageCatalog,
  path: TranslationKey,
): string | undefined => {
  const segments = path.split('.');
  let cursor: unknown = source;

  for (const segment of segments) {
    if (!cursor || typeof cursor !== 'object' || !(segment in cursor)) {
      return undefined;
    }

    cursor = (cursor as Record<string, unknown>)[segment];
  }

  return typeof cursor === 'string' ? cursor : undefined;
};

const formatMessage = (
  template: string,
  values?: InterpolationValues,
): string => {
  if (!values) {
    return template;
  }

  return template.replace(/\{\{([a-zA-Z0-9_]+)\}\}/g, (_, token: string) => {
    const value = values[token];
    return value === undefined ? '' : String(value);
  });
};

const validateCatalogShape = (
  locale: Locale,
  catalog: MessageCatalog,
): void => {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  const basePaths = new Set(collectLeafPaths(EN_MESSAGES as Record<string, unknown>));
  const localePaths = new Set(collectLeafPaths(catalog as Record<string, unknown>));
  const missingPaths = [...basePaths].filter((path) => !localePaths.has(path));
  const extraPaths = [...localePaths].filter((path) => !basePaths.has(path));

  if (missingPaths.length === 0 && extraPaths.length === 0) {
    return;
  }

  console.warn(
    `[i18n] Locale "${locale}" is out of sync. Missing: ${missingPaths.join(', ') || 'none'}. Extra: ${extraPaths.join(', ') || 'none'}.`,
  );
};

validateCatalogShape('es', ES_MESSAGES);

export const MESSAGES_BY_LOCALE = {
  en: EN_MESSAGES,
  es: ES_MESSAGES,
} satisfies Record<Locale, MessageCatalog>;

export const TRANSLATION_KEYS = Object.freeze(
  collectLeafPaths(EN_MESSAGES as Record<string, unknown>) as TranslationKey[],
);

export const resolveLocale = (
  locale: string | null | undefined,
): Locale => {
  if (locale === 'es') {
    return 'es';
  }

  return DEFAULT_LOCALE;
};

export const getMessagesForLocale = (
  locale: Locale = DEFAULT_LOCALE,
): MessageCatalog => {
  return MESSAGES_BY_LOCALE[locale];
};

export const createTranslator = (
  messages: MessageCatalog,
): Translate => {
  return (key, fallback, values) => {
    const template = readMessageByPath(messages, key) ?? fallback ?? key;
    return formatMessage(template, values);
  };
};

export const getTranslator = (
  locale: Locale = DEFAULT_LOCALE,
): Translate => {
  return createTranslator(getMessagesForLocale(locale));
};

export const t: Translate = getTranslator();
