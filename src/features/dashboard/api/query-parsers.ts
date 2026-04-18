import type { RangeKey } from '@/shared/types/api';
import type { UsersQuery } from '@/features/dashboard/types';
import {
  DASHBOARD_RANGE_OPTIONS,
  DEFAULT_ANALYTICS_RANGE,
  DEFAULT_USER_SORT_FIELD,
  DEFAULT_USER_SORT_ORDER,
  USERS_DEFAULT_PAGE,
  USERS_DEFAULT_SEARCH_QUERY,
  USERS_PAGE_LIMIT,
  USERS_QUERY_PARAMS,
} from '@/features/dashboard/constants';
import {
  parseUsersLimitParam,
  parseUsersPageParam,
  resolveUserSortState,
} from '@/features/dashboard/utils/users-query';

const DEFAULT_USERS_QUERY: UsersQuery = {
  page: USERS_DEFAULT_PAGE,
  limit: USERS_PAGE_LIMIT,
  sort: DEFAULT_USER_SORT_FIELD,
  order: DEFAULT_USER_SORT_ORDER,
  search: USERS_DEFAULT_SEARCH_QUERY,
};

const VALID_RANGES: RangeKey[] = DASHBOARD_RANGE_OPTIONS;

export type RouteSearchParams = Record<string, string | string[] | undefined>;

export const toUrlSearchParams = (searchParams: RouteSearchParams): URLSearchParams => {
  const resolved = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (typeof value === 'string') {
      resolved.set(key, value);
      return;
    }

    if (Array.isArray(value) && value[0]) {
      resolved.set(key, value[0]);
    }
  });

  return resolved;
};

export const parseUsersSearchParams = (searchParams: URLSearchParams): UsersQuery => {
  const page = parseUsersPageParam(searchParams.get(USERS_QUERY_PARAMS.page), DEFAULT_USERS_QUERY.page);
  const limit = parseUsersLimitParam(searchParams.get(USERS_QUERY_PARAMS.limit), DEFAULT_USERS_QUERY.limit);
  const sortState = resolveUserSortState(
    searchParams.get(USERS_QUERY_PARAMS.sort),
    searchParams.get(USERS_QUERY_PARAMS.order),
  );

  return {
    page,
    limit,
    sort: sortState.sort,
    order: sortState.order,
    search: (searchParams.get(USERS_QUERY_PARAMS.search) ?? USERS_DEFAULT_SEARCH_QUERY).trim(),
  };
};

export const parseRangeKey = (value: string | null): RangeKey => {
  if (!value) {
    return DEFAULT_ANALYTICS_RANGE;
  }

  return VALID_RANGES.includes(value as RangeKey) ? (value as RangeKey) : DEFAULT_ANALYTICS_RANGE;
};
