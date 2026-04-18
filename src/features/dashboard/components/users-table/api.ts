import { USERS_CLIENT_CACHE_TTL_MS, USERS_PAGE_LIMIT } from '@/features/dashboard/constants';
import { dashboardApiClient } from '@/features/dashboard/api/dashboard-client';

import type { UsersTableData, UsersTableQueryState } from './types';

type QueryOptions = {
  query: UsersTableQueryState;
  signal: AbortSignal;
};

type UsersCacheEntry = {
  value: UsersTableData;
  expiresAt: number;
};

const usersTableCache = new Map<string, UsersCacheEntry>();

const toUsersTableCacheKey = (query: UsersTableQueryState): string => {
  return `${query.page}|${query.sort}|${query.order}|${query.search}`;
};

export const fetchUsersTableData = async ({ query, signal }: QueryOptions): Promise<UsersTableData> => {
  const cacheKey = toUsersTableCacheKey(query);
  const cached = usersTableCache.get(cacheKey);

  if (cached && cached.expiresAt > Date.now()) {
    return cached.value;
  }

  const result = await dashboardApiClient.getUsersPage(
    {
      page: query.page,
      limit: USERS_PAGE_LIMIT,
      sort: query.sort,
      order: query.order,
      search: query.search,
    },
    { signal },
  );

  const response = {
    rows: result.rows,
    meta: result.meta,
  };

  usersTableCache.set(cacheKey, {
    value: response,
    expiresAt: Date.now() + USERS_CLIENT_CACHE_TTL_MS,
  });

  return response;
};
