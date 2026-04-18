import { dashboardService } from '@/features/dashboard/data/dashboard-service';
import { DEFAULT_ANALYTICS_RANGE } from '@/features/dashboard/constants';

import { StatsGrid } from './StatsGrid';
import { StatsAnalyticsClient } from './StatsAnalyticsClient';
import { STATS_ANALYTICS_SECTION_ARIA_LABEL } from './stats-analytics/constants';
import styles from './StatsAnalyticsSection.module.css';

export async function StatsAnalyticsSection() {
  const [stats, analytics] = await Promise.all([
    dashboardService.getStatsResponse(),
    dashboardService.getAnalyticsResponse(DEFAULT_ANALYTICS_RANGE),
  ]);

  return (
    <section className={styles.section} aria-label={STATS_ANALYTICS_SECTION_ARIA_LABEL}>
      <StatsGrid stats={stats.data} />
      <StatsAnalyticsClient initialAnalytics={analytics.data} />
    </section>
  );
}
