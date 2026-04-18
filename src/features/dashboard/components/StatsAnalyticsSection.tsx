import { DEFAULT_ANALYTICS_RANGE } from '@/features/dashboard/constants';
import {
  readAnalyticsResponse,
  readStatsResponse,
} from '@/features/dashboard/data/dashboard-streaming';
import { t } from '@/shared/i18n';

import { StatsGrid } from './StatsGrid';
import { StatsAnalyticsClient } from './StatsAnalyticsClient';
import styles from './StatsAnalyticsSection.module.css';

export async function StatsAnalyticsSection() {
  const [stats, analytics] = await Promise.all([
    readStatsResponse(),
    readAnalyticsResponse(DEFAULT_ANALYTICS_RANGE),
  ]);
  const { data: statsData } = stats;
  const { data: analyticsData } = analytics;

  return (
    <section className={styles.section} aria-label={t('dashboard.stats.sectionAria')}>
      <StatsGrid stats={statsData} />
      <StatsAnalyticsClient initialAnalytics={analyticsData} />
    </section>
  );
}
