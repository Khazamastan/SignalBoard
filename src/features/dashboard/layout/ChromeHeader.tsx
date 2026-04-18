import Link from 'next/link';
import { Button, ChartBarIcon, InputField, MenuIcon, SearchIcon, ThemeToggle } from '@design-system';
import type { Translate } from '@/shared/i18n';

import styles from './ChromeHeader.module.css';
import { UserMenuDropdown } from './UserMenuDropdown';

type ChromeHeaderProps = {
  t: Translate;
  onOpenMobileSidebar: () => void;
};

export function ChromeHeader({ t, onOpenMobileSidebar }: ChromeHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.hamburger}>
          <Button
            variant="ghost"
            size="small"
            onClick={onOpenMobileSidebar}
            aria-label={t('layout.openNavigationMenu')}
          >
            <MenuIcon size={18} />
          </Button>
        </div>

        <Link href="/" className={styles.logoLink} aria-label={t('layout.goToHome')}>
          <span className={styles.logo} aria-hidden>
            <ChartBarIcon size={18} />
          </span>
        </Link>

        <div className={styles.brandText}>
          <span className={styles.appName}>{t('layout.appName')}</span>
          <span className={styles.breadcrumb}>{t('layout.breadcrumb')}</span>
        </div>
      </div>

      <div className={styles.searchSlot}>
        <InputField
          placeholder={t('layout.searchDashboard')}
          aria-label={t('layout.searchDashboard')}
          floatingLabel={false}
          prefix={<SearchIcon size={24} />}
          hideMeta
        />
      </div>

      <div className={styles.rightActions}>
        <ThemeToggle label={t('theme.label')} ariaLabel={t('theme.toggle')} />
        <UserMenuDropdown t={t} />
      </div>
    </header>
  );
}
