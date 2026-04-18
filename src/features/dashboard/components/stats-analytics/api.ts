import type { RangeKey } from '@/shared/types/api';
import type { AnalyticsSeries, StatCardData } from '@/features/dashboard/types';
import { dashboardApiClient } from '@/features/dashboard/api/dashboard-client';
import {
  ANALYTICS_CLIENT_CACHE_TTL_MS,
  STATS_CLIENT_CACHE_TTL_MS,
} from '@/features/dashboard/constants';

type QueryOptions = {
  range: RangeKey;
  signal: AbortSignal;
};

type AnalyticsCacheEntry = {
  value: AnalyticsSeries;
  expiresAt: number;
};

type StatsCacheEntry = {
  value: StatCardData[];
  expiresAt: number;
};

const analyticsCache = new Map<RangeKey, AnalyticsCacheEntry>();
const statsCache = new Map<string, StatsCacheEntry>();

export const fetchAnalyticsDataByRange = async ({
  range,
  signal,
}: QueryOptions): Promise<AnalyticsSeries> => {
  const cached = analyticsCache.get(range);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.value;
  }

  const response = await dashboardApiClient.getAnalytics(range, { signal });

  analyticsCache.set(range, {
    value: response,
    expiresAt: Date.now() + ANALYTICS_CLIENT_CACHE_TTL_MS,
  });

  return response;
};

export const fetchStatsData = async ({
  signal,
}: {
  signal: AbortSignal;
}): Promise<StatCardData[]> => {
  const cacheKey = 'stats';
  const cached = statsCache.get(cacheKey);

  if (cached && cached.expiresAt > Date.now()) {
    return cached.value;
  }

  const response = await dashboardApiClient.getStats({ signal });

  statsCache.set(cacheKey, {
    value: response,
    expiresAt: Date.now() + STATS_CLIENT_CACHE_TTL_MS,
  });

  return response;
};
