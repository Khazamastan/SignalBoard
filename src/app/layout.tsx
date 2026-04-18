import type { Metadata } from 'next';
import { Manrope, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { cookies } from 'next/headers';

import { DEFAULT_THEME, THEME_COOKIE_NAME, parseTheme } from '@design-system';
import { DashboardChrome } from '@/features/dashboard/layout';
import { DEFAULT_LOCALE, MESSAGES_BY_LOCALE } from '@/shared/i18n';
import './globals.css';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const themePreference = parseTheme(cookieStore.get(THEME_COOKIE_NAME)?.value) ?? DEFAULT_THEME;
  const locale = DEFAULT_LOCALE;
  const messages = MESSAGES_BY_LOCALE[locale];

  return (
    <html
      lang={locale}
      className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
      data-theme={themePreference}
      suppressHydrationWarning
    >
      <body>
        <a href="#main-content" className="skip-link">
          {messages['a11y.skipToMainContent']}
        </a>
        <DashboardChrome messages={messages}>{children}</DashboardChrome>
      </body>
    </html>
  );
}
