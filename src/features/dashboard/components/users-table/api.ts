import {
  USERS_CLIENT_CACHE_TTL_MS,
  USERS_TABLE_CACHE_MAX_ENTRIES,
} from '@/features/dashboard/constants';
import { dashboardApiClient } from '@/features/dashboard/api/dashboard-client';

import type { UsersTableData, UsersTableQueryState } from './types';
import { toUsersTableQueryKey } from './utils';

type QueryOptions = {
  query: UsersTableQueryState;
  signal: AbortSignal;
};

type UsersCacheEntry = {
  value: UsersTableData;
  expiresAt: number;
};

const usersTableCache = new Map<string, UsersCacheEntry>();

const pruneUsersTableCache = (now: number): void => {
  usersTableCache.forEach((entry, key) => {
    if (entry.expiresAt <= now) {
      usersTableCache.delete(key);
    }
  });

  while (usersTableCache.size > USERS_TABLE_CACHE_MAX_ENTRIES) {
    const oldestKey = usersTableCache.keys().next().value;
    if (oldestKey === undefined) {
      break;
    }
    usersTableCache.delete(oldestKey);
  }
};

export const fetchUsersTableData = async ({ query, signal }: QueryOptions): Promise<UsersTableData> => {
  const { page, limit, sort, order, search } = query;
  const now = Date.now();
  pruneUsersTableCache(now);

  const cacheKey = toUsersTableQueryKey(query);
  const cached = usersTableCache.get(cacheKey);

  if (cached && cached.expiresAt > now) {
    return cached.value;
  }

  const result = await dashboardApiClient.getUsersPage(
    {
      page,
      limit,
      sort,
      order,
      search,
    },
    { signal },
  );

  const response = {
    rows: result.rows,
    meta: result.meta,
  };

  usersTableCache.set(cacheKey, {
    value: response,
    expiresAt: now + USERS_CLIENT_CACHE_TTL_MS,
  });

  return response;
};
