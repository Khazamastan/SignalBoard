"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Button,
  ChartBarIcon,
  ChevronLeftIcon,
  FlaskIcon,
  FolderChartIcon,
  InputField,
  SearchIcon,
  SettingsIcon,
  ThemeToggle,
} from "@design-system";
import { classNames } from "@/shared/utils/class-names";
import styles from "./AppShell.module.css";

type AppShellProps = {
  children: React.ReactNode;
};

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Analytics", icon: ChartBarIcon },
  { href: "/challenges", label: "Challenges", icon: FlaskIcon },
  { href: "/reports", label: "Reports", icon: FolderChartIcon },
  { href: "/settings", label: "Settings", icon: SettingsIcon },
];

function matchesPath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  return (
    <div className={styles.app}>
      <header className={styles.topbar}>
        <div className={styles.brandArea}>
          <Link href="/" className={styles.logoLink} aria-label="Go to home">
            <span className={styles.logoMark} aria-hidden>
              <ChartBarIcon size={18} />
            </span>
          </Link>

          <div className={styles.brandText}>
            <span className={styles.brandTitle}>SignalBoard</span>
            <span className={styles.brandSub}>Dashboard &#8250; Analytics</span>
          </div>
        </div>

        <div className={styles.searchArea}>
          <InputField
            className={styles.search}
            hideMeta
            placeholder="Search dashboard"
            prefix={<SearchIcon size={24} />}
            floatingLabel={false}
            aria-label="Search dashboard"
          />
        </div>

        <div className={styles.rightTools}>
          <ThemeToggle label="Theme" />
          <div className={styles.avatar}>KB</div>
        </div>
      </header>

      <div className={styles.body}>
        <aside className={styles.sidebar}>
          <div className={styles.navHeader}>
            <span className={styles.navTitle}>Navigation</span>
            <Button
              variant="ghost"
              size="small"
              aria-label="Collapse sidebar"
            >
              <ChevronLeftIcon size={18} />
            </Button>
          </div>

          <nav aria-label="Primary">
            <ul className={styles.navList}>
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={classNames(
                        styles.navItem,
                        matchesPath(pathname, item.href) && styles.navItemActive,
                      )}
                      aria-current={
                        matchesPath(pathname, item.href) ? "page" : undefined
                      }
                    >
                      <span className={styles.navIcon} aria-hidden>
                        <Icon size={18} />
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
