import { Suspense } from 'react';

import {
  dashboardFeatureRegistry,
  type DashboardRouteSearchParams,
} from '@/features/dashboard/feature-registry';
import { t } from '@/shared/i18n';

import styles from './page.module.css';

type DashboardPageProps = {
  searchParams?:
    | Promise<DashboardRouteSearchParams>
    | DashboardRouteSearchParams;
};

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams ?? {});

  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.title}>{t('dashboard.title')}</h1>
        <p className={styles.subtitle}>{t('dashboard.subtitle')}</p>
      </section>

      {dashboardFeatureRegistry.map((feature) => {
        const suspenseKey = feature.resolveSuspenseKey?.({
          searchParams: resolvedSearchParams,
        });
        const key = suspenseKey ? `${feature.id}:${suspenseKey}` : feature.id;

        return (
          <Suspense key={key} fallback={feature.fallback}>
            {feature.render({ searchParams: resolvedSearchParams })}
          </Suspense>
        );
      })}
    </>
  );
}
