import type { ComponentType } from 'react';
import type { TranslationKey } from '@/shared/i18n';

import {
  ChartBarIcon,
  FlaskIcon,
  FolderChartIcon,
  SettingsIcon,
  type IconProps,
} from '@design-system';

export type ChromeNavItem = {
  href: string;
  labelKey: TranslationKey;
  Icon: ComponentType<IconProps>;
};

export const navItems: ChromeNavItem[] = [
  { href: '/', labelKey: 'layout.nav.analytics', Icon: ChartBarIcon },
  { href: '/challenges', labelKey: 'layout.nav.challenges', Icon: FlaskIcon },
  { href: '/reports', labelKey: 'layout.nav.reports', Icon: FolderChartIcon },
  { href: '/settings', labelKey: 'layout.nav.settings', Icon: SettingsIcon },
];
