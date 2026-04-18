'use client';

import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import { createTranslator, type MessageCatalog } from '@/shared/i18n';

import styles from './DashboardShell.module.css';
import { ChromeHeader } from './ChromeHeader';
import { ChromeSidebar } from './ChromeSidebar';
import { DASHBOARD_LAYOUT_IDS } from './constants';

type DashboardChromeProps = {
  messages: MessageCatalog;
  children: React.ReactNode;
};

export function DashboardChrome({ messages, children }: DashboardChromeProps) {
  const pathname = usePathname();
  const t = useMemo(() => createTranslator(messages), [messages]);
  const [isCollapsed, setCollapsed] = useState(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className={styles.shell}>
      <ChromeHeader
        t={t}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onToggleMobileSidebar={() => {
          setMobileSidebarOpen((current) => !current);
        }}
      />

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
          t={t}
          pathname={pathname}
          isCollapsed={isCollapsed}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onToggleCollapsed={() => setCollapsed((current) => !current)}
          onCloseMobileSidebar={() => setMobileSidebarOpen(false)}
        />

        <main id={DASHBOARD_LAYOUT_IDS.mainContent} className={styles.main} tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}
