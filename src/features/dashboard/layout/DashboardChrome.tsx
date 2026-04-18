'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useI18n } from '@/shared/i18n';

import styles from './DashboardShell.module.css';
import { ChromeHeader } from './ChromeHeader';
import { ChromeSidebar } from './ChromeSidebar';
import { navItems } from './navigation-items';

type DashboardChromeProps = {
  children: React.ReactNode;
};

export function DashboardChrome({ children }: DashboardChromeProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useI18n();
  const [isCollapsed, setCollapsed] = useState(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    navItems.forEach((item) => {
      if (item.href !== pathname) {
        router.prefetch(item.href);
      }
    });
  }, [pathname, router]);

  return (
    <div className={styles.shell}>
      <ChromeHeader onOpenMobileSidebar={() => setMobileSidebarOpen(true)} />

      <div className={styles.body}>
        {isMobileSidebarOpen ? (
          <button
            type="button"
            className={styles.backdrop}
            onClick={() => setMobileSidebarOpen(false)}
            aria-label={t('layout.closeNavigationMenu')}
          />
        ) : null}

        <ChromeSidebar
          pathname={pathname}
          isCollapsed={isCollapsed}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onToggleCollapsed={() => setCollapsed((current) => !current)}
          onCloseMobileSidebar={() => setMobileSidebarOpen(false)}
        />

        <main id="main-content" className={styles.main} tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}
