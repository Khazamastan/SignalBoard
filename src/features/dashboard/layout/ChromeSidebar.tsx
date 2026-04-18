import Link from 'next/link';

import { Button, ChevronLeftIcon, ChevronRightIcon } from '@design-system';
import { classNames } from '@/shared/utils/class-names';
import { useI18n } from '@/shared/i18n';

import styles from './ChromeSidebar.module.css';
import { navItems } from './navigation-items';

type ChromeSidebarProps = {
  pathname: string;
  isCollapsed: boolean;
  isMobileSidebarOpen: boolean;
  onToggleCollapsed: () => void;
  onCloseMobileSidebar: () => void;
};

export function ChromeSidebar({
  pathname,
  isCollapsed,
  isMobileSidebarOpen,
  onToggleCollapsed,
  onCloseMobileSidebar,
}: ChromeSidebarProps) {
  const { t } = useI18n();

  return (
    <aside
      className={classNames(
        styles.sidebar,
        isCollapsed && styles.collapsed,
        isMobileSidebarOpen && styles.mobileOpen,
      )}
      aria-label={t('layout.primaryNavigation')}
    >
      <div className={styles.sidebarTop}>
        <span className={classNames(styles.sidebarLabel, isCollapsed && styles.navLabelHidden)}>
          {t('layout.navigation')}
        </span>

        <Button
          variant="ghost"
          size="small"
          onClick={onToggleCollapsed}
          aria-label={isCollapsed ? t('layout.expandSidebar') : t('layout.collapseSidebar')}
        >
          {isCollapsed ? <ChevronRightIcon size={18} /> : <ChevronLeftIcon size={18} />}
        </Button>
      </div>

      <nav aria-label={t('layout.primaryNavigation')}>
        <ul className={styles.navList}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const itemLabel = t(item.labelKey, item.label);

            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={classNames(styles.navLink, isActive && styles.active)}
                  onClick={onCloseMobileSidebar}
                  aria-label={itemLabel}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className={styles.navIcon} aria-hidden>
                    <item.Icon size={18} />
                  </span>
                  <span className={isCollapsed ? styles.navLabelHidden : ''}>{itemLabel}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
