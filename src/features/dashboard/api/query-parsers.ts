import type { RangeKey } from '@/shared/types/api';
import type { UsersQuery } from '@/features/dashboard/types';
import {
  DASHBOARD_RANGE_OPTIONS,
  DEFAULT_ANALYTICS_RANGE,
  DEFAULT_USER_SORT_FIELD,
  DEFAULT_USER_SORT_ORDER,
  USERS_PAGE_LIMIT,
} from '@/features/dashboard/constants';
import {
  parseUsersLimitParam,
  parseUsersPageParam,
  resolveUserSortState,
} from '@/features/dashboard/utils/users-query';

const DEFAULT_USERS_QUERY: UsersQuery = {
  page: 1,
  limit: USERS_PAGE_LIMIT,
  sort: DEFAULT_USER_SORT_FIELD,
  order: DEFAULT_USER_SORT_ORDER,
  search: '',
};

const VALID_RANGES: RangeKey[] = DASHBOARD_RANGE_OPTIONS;

export const parseUsersSearchParams = (searchParams: URLSearchParams): UsersQuery => {
  const page = parseUsersPageParam(searchParams.get('page'), DEFAULT_USERS_QUERY.page);
  const limit = parseUsersLimitParam(searchParams.get('limit'), DEFAULT_USERS_QUERY.limit);
  const sortState = resolveUserSortState(searchParams.get('sort'), searchParams.get('order'));

  return {
    page,
    limit,
    sort: sortState.sort,
    order: sortState.order,
    search: (searchParams.get('search') ?? '').trim(),
  };
};

export const parseRangeKey = (value: string | null): RangeKey => {
  if (!value) {
    return DEFAULT_ANALYTICS_RANGE;
  }

  return VALID_RANGES.includes(value as RangeKey) ? (value as RangeKey) : DEFAULT_ANALYTICS_RANGE;
};
