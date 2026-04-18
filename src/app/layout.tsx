import type { Metadata } from 'next';
import { Manrope, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { cookies } from 'next/headers';

import { DEFAULT_THEME, THEME_COOKIE_NAME, parseTheme } from '@design-system';
import { APP_METADATA } from '@/app/constants';
import { DASHBOARD_LAYOUT_IDS } from '@/features/dashboard/layout/constants';
import { DashboardChrome } from '@/features/dashboard/layout';
import { createTranslator, DEFAULT_LOCALE, MESSAGES_BY_LOCALE } from '@/shared/i18n';
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

const shouldIndexDeployment =
  process.env.VERCEL_ENV !== 'preview' && process.env.VERCEL_ENV !== 'development';

export const metadata: Metadata = {
  title: APP_METADATA.title,
  description: APP_METADATA.description,
  robots: {
    index: shouldIndexDeployment,
    follow: shouldIndexDeployment,
    googleBot: {
      index: shouldIndexDeployment,
      follow: shouldIndexDeployment,
      noimageindex: !shouldIndexDeployment,
    },
  },
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
  const translate = createTranslator(messages);

  return (
    <html
      lang={locale}
      className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
      data-theme={themePreference}
      suppressHydrationWarning
    >
      <body>
        <a href={`#${DASHBOARD_LAYOUT_IDS.mainContent}`} className="skip-link">
          {translate('a11y.skipToMainContent')}
        </a>
        <DashboardChrome messages={messages}>{children}</DashboardChrome>
      </body>
    </html>
  );
}
