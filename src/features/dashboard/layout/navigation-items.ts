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
  label: string;
  labelKey: TranslationKey;
  Icon: ComponentType<IconProps>;
};

export const navItems: ChromeNavItem[] = [
  { href: '/', label: 'Analytics', labelKey: 'layout.nav.analytics', Icon: ChartBarIcon },
  { href: '/challenges', label: 'Challenges', labelKey: 'layout.nav.challenges', Icon: FlaskIcon },
  { href: '/reports', label: 'Reports', labelKey: 'layout.nav.reports', Icon: FolderChartIcon },
  { href: '/settings', label: 'Settings', labelKey: 'layout.nav.settings', Icon: SettingsIcon },
];
