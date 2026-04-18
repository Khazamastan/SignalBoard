import { Suspense } from 'react';

import {
  StatsAnalyticsSectionFallback,
  UsersTableSectionFallback,
} from '@/features/dashboard/components/DashboardStreamingFallbacks';
import { StatsAnalyticsSection } from '@/features/dashboard/components/StatsAnalyticsSection';
import { UsersTableSection } from '@/features/dashboard/components/UsersTableSection';

import styles from './page.module.css';

type RouteSearchParams = Record<string, string | string[] | undefined>;

type DashboardPageProps = {
  searchParams?:
    | Promise<RouteSearchParams>
    | RouteSearchParams;
};

const toSearchKey = (searchParams: RouteSearchParams): string => {
  const serialized = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (typeof value === 'string') {
      serialized.set(key, value);
    } else if (Array.isArray(value) && value[0]) {
      serialized.set(key, value[0]);
    }
  });

  return serialized.toString();
};

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams ?? {});
  const usersSearchKey = toSearchKey(resolvedSearchParams);

  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.title}>Analytics Dashboard</h1>
        <p className={styles.subtitle}>
          A token-driven design system with server-first rendering, URL-synced table interactions,
          and container-aware components.
        </p>
      </section>

      <Suspense fallback={<StatsAnalyticsSectionFallback />}>
        <StatsAnalyticsSection />
      </Suspense>

      <Suspense key={usersSearchKey} fallback={<UsersTableSectionFallback />}>
        <UsersTableSection searchParams={resolvedSearchParams} />
      </Suspense>
    </>
  );
}
