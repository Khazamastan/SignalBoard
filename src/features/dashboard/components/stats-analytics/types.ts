import type { AnalyticsSeries, StatCardData } from '@/features/dashboard/types';

export type StatsAnalyticsClientProps = {
  initialStats: StatCardData[];
  initialAnalytics: AnalyticsSeries;
};
