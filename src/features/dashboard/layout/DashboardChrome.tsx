'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createTranslator, type MessageCatalog } from '@/shared/i18n';

import styles from './DashboardShell.module.css';
import { ChromeHeader } from './ChromeHeader';
import { ChromeSidebar } from './ChromeSidebar';
import { navItems } from './navigation-items';

type DashboardChromeProps = {
  messages: MessageCatalog;
  children: React.ReactNode;
};

export function DashboardChrome({ messages, children }: DashboardChromeProps) {
  const pathname = usePathname();
  const router = useRouter();
  const t = useMemo(() => createTranslator(messages), [messages]);
  const [isCollapsed, setCollapsed] = useState(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const prefetchedRoutesRef = useRef(new Set<string>());

  useEffect(() => {
    navItems.forEach((item) => {
      if (
        item.href !== pathname &&
        !prefetchedRoutesRef.current.has(item.href)
      ) {
        router.prefetch(item.href);
        prefetchedRoutesRef.current.add(item.href);
      }
    });
  }, [pathname, router]);

  return (
    <div className={styles.shell}>
      <ChromeHeader t={t} onOpenMobileSidebar={() => setMobileSidebarOpen(true)} />

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

        <main id="main-content" className={styles.main} tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}
