import type { RangeKey } from '@/shared/types/api';
import type { AnalyticsSeries } from '@/features/dashboard/types';
import { dashboardApiClient } from '@/features/dashboard/api/dashboard-client';
import { ANALYTICS_CLIENT_CACHE_TTL_MS } from '@/features/dashboard/constants';

type QueryOptions = {
  range: RangeKey;
  signal: AbortSignal;
};

type AnalyticsCacheEntry = {
  value: AnalyticsSeries;
  expiresAt: number;
};

const analyticsCache = new Map<RangeKey, AnalyticsCacheEntry>();

export const fetchAnalyticsDataByRange = async ({
  range,
  signal,
}: QueryOptions): Promise<AnalyticsSeries> => {
  const cached = analyticsCache.get(range);
  if (cached && cached.expiresAt > Date.now()) {
    const { value } = cached;
    return value;
  }

  const value = await dashboardApiClient.getAnalytics(range, { signal });

  analyticsCache.set(range, {
    value,
    expiresAt: Date.now() + ANALYTICS_CLIENT_CACHE_TTL_MS,
  });

  return value;
};
