import { cache } from 'react';

import type { RangeKey, SortOrder } from '@/shared/types/api';
import type { UserSortField } from '@/features/dashboard/types';
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

const getUsersPageResponseCached = cache(
  async (
    page: number,
    limit: number,
    sort: UserSortField,
    order: SortOrder,
    search: string,
  ) => {
    return dashboardService.getUsersPageResponse({
      page,
      limit,
      sort,
      order,
      search,
    });
  },
);

export const preloadStatsAnalyticsSection = () => {
  void getStatsResponseCached();
  void getAnalyticsResponseCached(DEFAULT_ANALYTICS_RANGE);
};

export const preloadUsersTableSection = (searchParams: RouteSearchParams) => {
  const { page, limit, sort, order, search } = parseUsersSearchParams(
    toUrlSearchParams(searchParams),
  );
  void getUsersPageResponseCached(
    page,
    limit,
    sort,
    order,
    search,
  );
};

export const readStatsResponse = () => getStatsResponseCached();

export const readAnalyticsResponse = (range: RangeKey) => getAnalyticsResponseCached(range);

export const readUsersPageResponse = (
  page: number,
  limit: number,
  sort: UserSortField,
  order: SortOrder,
  search: string,
) => {
  return getUsersPageResponseCached(page, limit, sort, order, search);
};
