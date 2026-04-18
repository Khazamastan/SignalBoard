import { ChevronRightIcon, ExternalLinkIcon } from '@design-system';
import type { Translate } from '@/shared/i18n';

import styles from './UserMenuDropdown.module.css';
import { DASHBOARD_LAYOUT_COPY } from './constants';

type UserMenuDropdownProps = {
  t: Translate;
};

export function UserMenuDropdown({ t }: UserMenuDropdownProps) {
  const userInitials = DASHBOARD_LAYOUT_COPY.userName
    .split(' ')
    .map((segment) => segment[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <details className={styles.avatarMenu}>
      <summary className={styles.avatarSummary} aria-label={t('layout.userMenu')}>
        <span className={styles.avatarInitials} aria-hidden>
          {userInitials}
        </span>
      </summary>

      <div className={styles.dropdown}>
        <span className={styles.userName}>{DASHBOARD_LAYOUT_COPY.userName}</span>
        <span className={styles.userEmail}>{DASHBOARD_LAYOUT_COPY.userEmail}</span>

        <button type="button" className={styles.dropdownLink}>
          <span className={styles.dropdownLabel}>{t('layout.userSettings')}</span>
          <ChevronRightIcon size={14} />
        </button>
        <button type="button" className={styles.dropdownLink}>
          <span className={styles.dropdownLabel}>{t('layout.userLogout')}</span>
          <ExternalLinkIcon size={14} />
        </button>
      </div>
    </details>
  );
}
