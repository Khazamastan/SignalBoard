import type { Metadata } from 'next';
import { Manrope, Space_Grotesk, JetBrains_Mono } from 'next/font/google';

import { ThemeProvider } from '@design-system';
import { DashboardChrome } from '@/features/dashboard/layout';
import { DEFAULT_LOCALE, I18nProvider, MESSAGES_BY_LOCALE } from '@/shared/i18n';
import './globals.css';

const themeInitializationScript = `
(() => {
  try {
    const storageKey = 'dashboard-theme';
    const storedTheme = window.localStorage.getItem(storageKey);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const resolvedTheme =
      storedTheme === 'light' || storedTheme === 'dark'
        ? storedTheme
        : (systemPrefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', resolvedTheme);
  } catch {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`;

const headingFont = Space_Grotesk({
  variable: '--font-heading',
  subsets: ['latin'],
  display: 'swap',
});

const bodyFont = Manrope({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
});

const monoFont = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SignalBoard Analytics Dashboard',
  description: 'Design-system driven analytics dashboard assignment',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = DEFAULT_LOCALE;
  const messages = MESSAGES_BY_LOCALE[locale];

  return (
    <html
      lang={locale}
      className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
      data-theme="light"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: themeInitializationScript,
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          {messages['a11y.skipToMainContent']}
        </a>
        <I18nProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <DashboardChrome>{children}</DashboardChrome>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
