"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
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
          <div className={styles.logoMark}>
            <ChartBarIcon size={18} />
          </div>

          <div className={styles.brandText}>
            <p className={styles.brandTitle}>SignalBoard</p>
            <p className={styles.brandSub}>Dashboard &#8250; Analytics</p>
          </div>
        </div>

        <div className={styles.searchArea}>
          <InputField
            className={styles.search}
            hideMeta
            placeholder="Search dashboard"
            prefix={<SearchIcon size={20} />}
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
            <h2 className={styles.navTitle}>Navigation</h2>
            <div className={styles.collapse}>
              <ChevronLeftIcon size={16} />
            </div>
          </div>

          <nav className={styles.navList} aria-label="Primary">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={classNames(
                    styles.navItem,
                    matchesPath(pathname, item.href) && styles.navItemActive,
                  )}
                >
                  <Icon className={styles.navIcon} size={16} />
                  <span className={styles.navLabel}>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
