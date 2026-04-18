import type { RangeKey, SortOrder } from '@/shared/types/api';
import type { UserSortField } from '@/features/dashboard/types';

export const USERS_PAGE_LIMIT = 8;
export const USERS_TABLE_SKELETON_ROW_COUNT_MIN = 12;
export const USERS_PAGE_LIMIT_MIN = 4;
export const USERS_PAGE_LIMIT_MAX = 20;
export const USERS_SEARCH_DEBOUNCE_MS = 500;
export const USERS_DEFAULT_PAGE = 1;
export const USERS_DEFAULT_SEARCH_QUERY = '';
export const USERS_RESET_PAGE_PARAM_VALUE = '1';
export const USERS_PAGINATION_FALLBACK_TOTAL_PAGES = 1;
export const USERS_PAGINATION_FALLBACK_TOTAL_ITEMS = 0;
export const USERS_TABLE_CACHE_MAX_ENTRIES = 120;

export const USERS_QUERY_PARAMS = {
  page: 'page',
  limit: 'limit',
  sort: 'sort',
  order: 'order',
  search: 'search',
} as const;

export const DEFAULT_USER_SORT_FIELD: UserSortField = 'name';
export const DEFAULT_USER_SORT_ORDER: SortOrder = 'asc';
export const USER_SORT_FIELDS: UserSortField[] = [
  'name',
  'email',
  'role',
  'status',
  'country',
  'lastActive',
  'spend',
];
export const SORT_ORDER_OPTIONS: SortOrder[] = ['asc', 'desc'];

export const DEFAULT_ANALYTICS_RANGE: RangeKey = '30d';
export const DASHBOARD_RANGE_OPTIONS: RangeKey[] = ['7d', '30d', '90d'];

export const ANALYTICS_POINTS_BY_RANGE: Record<RangeKey, number> = {
  '7d': 7,
  '30d': 10,
  '90d': 12,
};

export const API_DELAY_MIN_MS = 200;
export const API_DELAY_MAX_MS = 800;
export const API_DELAY_BYPASS_HEADER = 'x-internal-no-delay';
export const API_DELAY_BYPASS_ENABLED_VALUE = '1';
export const API_CACHE_MAX_AGE_SECONDS = 60;
export const API_CACHE_STALE_WHILE_REVALIDATE_SECONDS = 300;
export const API_CACHE_CONTROL_NO_STORE = 'private, no-store, max-age=0';
export const API_ERROR_CACHE_CONTROL_NO_STORE = 'no-store, max-age=0';
export const API_ERROR_STATUS_CODE = 500;

export const DASHBOARD_API_ROUTES = {
  stats: '/api/stats',
  analytics: '/api/analytics',
  users: '/api/users',
} as const;
export const DASHBOARD_API_QUERY_PARAMS = {
  range: 'range',
} as const;

export const ANALYTICS_CLIENT_CACHE_TTL_MS = 60000;
export const USERS_CLIENT_CACHE_TTL_MS = 30000;

export const MOCK_USERS_TOTAL = 64;
export const MOCK_REFERENCE_DATE = '2026-01-31';

export const ANALYTICS_CHART_SKELETON_BAR_HEIGHTS = [44, 62, 52, 68, 60, 74, 58, 82, 66, 76, 63, 72];
