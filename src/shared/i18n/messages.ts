export const EN_MESSAGES = {
  'a11y.skipToMainContent': 'Skip to main content',
  'layout.appName': 'SignalBoard',
  'layout.breadcrumb': 'Dashboard > Analytics',
  'layout.searchDashboard': 'Search dashboard',
  'layout.openNavigationMenu': 'Open navigation menu',
  'layout.closeNavigationMenu': 'Close navigation menu',
  'layout.goToHome': 'Go to analytics dashboard',
  'layout.navigation': 'Navigation',
  'layout.primaryNavigation': 'Primary navigation',
  'layout.expandSidebar': 'Expand sidebar',
  'layout.collapseSidebar': 'Collapse sidebar',
  'layout.userMenu': 'User menu',
  'layout.userSettings': 'Settings',
  'layout.userLogout': 'Logout',
  'layout.nav.analytics': 'Analytics',
  'layout.nav.challenges': 'Challenges',
  'layout.nav.reports': 'Reports',
  'layout.nav.settings': 'Settings',
  'theme.toggle': 'Toggle theme',
  'theme.label': 'Theme',
} as const;

export type TranslationKey = keyof typeof EN_MESSAGES;
export type MessageCatalog = Record<TranslationKey, string>;
export type Translate = (key: TranslationKey, fallback?: string) => string;

const ES_MESSAGES: MessageCatalog = {
  'a11y.skipToMainContent': 'Saltar al contenido principal',
  'layout.appName': 'SignalBoard',
  'layout.breadcrumb': 'Panel > Analítica',
  'layout.searchDashboard': 'Buscar en el panel',
  'layout.openNavigationMenu': 'Abrir menú de navegación',
  'layout.closeNavigationMenu': 'Cerrar menú de navegación',
  'layout.goToHome': 'Ir al panel de analítica',
  'layout.navigation': 'Navegación',
  'layout.primaryNavigation': 'Navegación principal',
  'layout.expandSidebar': 'Expandir barra lateral',
  'layout.collapseSidebar': 'Contraer barra lateral',
  'layout.userMenu': 'Menú de usuario',
  'layout.userSettings': 'Configuración',
  'layout.userLogout': 'Cerrar sesión',
  'layout.nav.analytics': 'Analítica',
  'layout.nav.challenges': 'Retos',
  'layout.nav.reports': 'Reportes',
  'layout.nav.settings': 'Configuración',
  'theme.toggle': 'Cambiar tema',
  'theme.label': 'Tema',
};

export type Locale = 'en' | 'es';

export const DEFAULT_LOCALE: Locale = 'en';

export const MESSAGES_BY_LOCALE: Record<Locale, MessageCatalog> = {
  en: EN_MESSAGES,
  es: ES_MESSAGES,
};

export const createTranslator = (messages: MessageCatalog): Translate => {
  return (key, fallback) => messages[key] ?? fallback ?? key;
};
