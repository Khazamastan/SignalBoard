import { dashboardService } from '@/features/dashboard/data/dashboard-service';
import { DEFAULT_ANALYTICS_RANGE } from '@/features/dashboard/constants';
import { t } from '@/shared/i18n';

import { StatsGrid } from './StatsGrid';
import { StatsAnalyticsClient } from './StatsAnalyticsClient';
import styles from './StatsAnalyticsSection.module.css';

export async function StatsAnalyticsSection() {
  const [stats, analytics] = await Promise.all([
    dashboardService.getStatsResponse(),
    dashboardService.getAnalyticsResponse(DEFAULT_ANALYTICS_RANGE),
  ]);

  return (
    <section className={styles.section} aria-label={t('dashboard.stats.sectionAria')}>
      <StatsGrid stats={stats.data} />
      <StatsAnalyticsClient initialAnalytics={analytics.data} />
    </section>
  );
}
