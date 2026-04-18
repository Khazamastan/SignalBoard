import Link from 'next/link';
import { Button, ChartBarIcon, InputField, MenuIcon, SearchIcon, ThemeToggle } from '@design-system';
import type { Translate } from '@/shared/i18n';

import styles from './ChromeHeader.module.css';
import { DASHBOARD_LAYOUT_ICON_SIZES, DASHBOARD_LAYOUT_IDS, DASHBOARD_LAYOUT_MOBILE_CLOSE_LABEL } from './constants';
import { UserMenuDropdown } from './UserMenuDropdown';

type ChromeHeaderProps = {
  t: Translate;
  isMobileSidebarOpen: boolean;
  onToggleMobileSidebar: () => void;
};

export function ChromeHeader({
  t,
  isMobileSidebarOpen,
  onToggleMobileSidebar,
}: ChromeHeaderProps) {
  const mobileMenuAriaLabel = isMobileSidebarOpen
    ? t('layout.closeNavigationMenu')
    : t('layout.openNavigationMenu');

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.hamburger}>
          <Button
            variant="ghost"
            size="small"
            onClick={onToggleMobileSidebar}
            aria-label={mobileMenuAriaLabel}
            aria-expanded={isMobileSidebarOpen}
            aria-controls={DASHBOARD_LAYOUT_IDS.primaryNavigation}
          >
            {isMobileSidebarOpen ? (
              <span className={styles.mobileMenuText}>{DASHBOARD_LAYOUT_MOBILE_CLOSE_LABEL}</span>
            ) : (
              <MenuIcon size={DASHBOARD_LAYOUT_ICON_SIZES.header} />
            )}
          </Button>
        </div>

        <Link href="/" className={styles.logoLink} aria-label={t('layout.goToHome')}>
          <span className={styles.logo} aria-hidden>
            <ChartBarIcon size={DASHBOARD_LAYOUT_ICON_SIZES.header} />
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
          prefix={<SearchIcon size={DASHBOARD_LAYOUT_ICON_SIZES.search} />}
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
