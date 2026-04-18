import { dashboardService } from '@/features/dashboard/data/dashboard-service';
import { DEFAULT_ANALYTICS_RANGE } from '@/features/dashboard/constants';

import { StatsAnalyticsClient } from './StatsAnalyticsClient';

export async function StatsAnalyticsSection() {
  const [stats, analytics] = await Promise.all([
    dashboardService.getStatsResponse(),
    dashboardService.getAnalyticsResponse(DEFAULT_ANALYTICS_RANGE),
  ]);

  return <StatsAnalyticsClient initialStats={stats.data} initialAnalytics={analytics.data} />;
}
