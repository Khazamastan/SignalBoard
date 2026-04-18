import type { SortOrder } from '@/shared/types/api';
import type { UserSortField } from '@/features/dashboard/types';
import {
  DEFAULT_USER_SORT_FIELD,
  DEFAULT_USER_SORT_ORDER,
  SORT_ORDER_OPTIONS,
  USER_SORT_FIELDS,
  USERS_PAGE_LIMIT,
  USERS_PAGE_LIMIT_MAX,
  USERS_PAGE_LIMIT_MIN,
} from '@/features/dashboard/constants';
import {
  parseIntegerOrFallback,
  parsePositiveIntegerOrFallback,
} from '@/shared/utils/number';

const fallbackSortState = {
  sort: DEFAULT_USER_SORT_FIELD,
  order: DEFAULT_USER_SORT_ORDER,
} as const;

const isUserSortField = (value: string): value is UserSortField => {
  return USER_SORT_FIELDS.includes(value as UserSortField);
};

const isSortOrder = (value: string): value is SortOrder => {
  return SORT_ORDER_OPTIONS.includes(value as SortOrder);
};

export const resolveUserSortState = (
  sortKey: string | null,
  orderKey: string | null,
): { sort: UserSortField; order: SortOrder } => {
  if (!sortKey || !isUserSortField(sortKey)) {
    return fallbackSortState;
  }

  return {
    sort: sortKey,
    order: orderKey && isSortOrder(orderKey) ? orderKey : DEFAULT_USER_SORT_ORDER,
  };
};

export const parseUsersPageParam = (value: string | null, fallback = 1): number => {
  return parsePositiveIntegerOrFallback(value, fallback);
};

export const parseUsersLimitParam = (
  value: string | null,
  fallback = USERS_PAGE_LIMIT,
): number => {
  return Math.min(
    USERS_PAGE_LIMIT_MAX,
    Math.max(USERS_PAGE_LIMIT_MIN, parseIntegerOrFallback(value, fallback)),
  );
};
