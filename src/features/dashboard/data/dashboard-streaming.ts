import { cache } from 'react';

import type { RangeKey } from '@/shared/types/api';
import type { UsersQuery } from '@/features/dashboard/types';
import { DEFAULT_ANALYTICS_RANGE } from '@/features/dashboard/constants';
import {
  parseUsersSearchParams,
  toUrlSearchParams,
  type RouteSearchParams,
} from '@/features/dashboard/api/query-parsers';

import { dashboardService } from './dashboard-service';

const getStatsResponseCached = cache(async () => dashboardService.getStatsResponse());

const getAnalyticsResponseCached = cache(
  async (range: RangeKey) => dashboardService.getAnalyticsResponse(range),
);

const getUsersPageResponseCached = cache(async (query: UsersQuery) =>
  dashboardService.getUsersPageResponse(query),
);

export const preloadStatsAnalyticsSection = () => {
  void getStatsResponseCached();
  void getAnalyticsResponseCached(DEFAULT_ANALYTICS_RANGE);
};

export const preloadUsersTableSection = (searchParams: RouteSearchParams) => {
  const query = parseUsersSearchParams(toUrlSearchParams(searchParams));
  void getUsersPageResponseCached(query);
};

export const readStatsResponse = () => getStatsResponseCached();

export const readAnalyticsResponse = (range: RangeKey) => getAnalyticsResponseCached(range);

export const readUsersPageResponse = (
  query: UsersQuery,
) => getUsersPageResponseCached(query);
