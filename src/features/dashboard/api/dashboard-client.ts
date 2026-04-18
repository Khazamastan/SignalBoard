import type { ApiMeta, ApiResponse, RangeKey } from '@/shared/types/api';
import { parseApiResponse } from '@/shared/utils/api-response';
import { USERS_PAGE_LIMIT } from '@/features/dashboard/constants';
import type { AnalyticsSeries, StatCardData, UserRow, UsersQuery } from '@/features/dashboard/types';

type RequestOptions = {
  signal: AbortSignal;
};

type UsersPagePayload = {
  rows: UserRow[];
  meta: ApiMeta;
};

const DEFAULT_USERS_ERROR_MESSAGE = 'Unable to fetch users.';
const DEFAULT_STATS_ERROR_MESSAGE = 'Unable to load dashboard data.';
const DEFAULT_ANALYTICS_ERROR_MESSAGE = 'Unable to load dashboard data.';

const readApiData = async <T,>(
  response: Response,
  fallbackErrorMessage: string,
): Promise<ApiResponse<T>> => {
  const payload = await parseApiResponse<T>(response, fallbackErrorMessage);

  if (payload.error) {
    throw new Error(payload.error);
  }

  return payload;
};

const resolveUsersMeta = (meta: ApiMeta | undefined, rows: UserRow[], query: UsersQuery): ApiMeta => {
  if (meta) {
    return meta;
  }

  return {
    page: query.page,
    totalPages: Math.max(1, Math.ceil(rows.length / Math.max(1, query.limit || USERS_PAGE_LIMIT))),
    totalItems: rows.length,
  };
};

export const dashboardApiClient = {
  async getStats(options: RequestOptions): Promise<StatCardData[]> {
    const response = await fetch('/api/stats', { signal: options.signal });
    const payload = await readApiData<StatCardData[]>(response, DEFAULT_STATS_ERROR_MESSAGE);
    return payload.data;
  },

  async getAnalytics(range: RangeKey, options: RequestOptions): Promise<AnalyticsSeries> {
    const response = await fetch(`/api/analytics?range=${range}`, { signal: options.signal });
    const payload = await readApiData<AnalyticsSeries>(response, DEFAULT_ANALYTICS_ERROR_MESSAGE);
    return payload.data;
  },

  async getUsersPage(query: UsersQuery, options: RequestOptions): Promise<UsersPagePayload> {
    const params = new URLSearchParams({
      page: String(query.page),
      limit: String(query.limit),
      sort: query.sort,
      order: query.order,
      search: query.search,
    });

    const response = await fetch(`/api/users?${params.toString()}`, {
      signal: options.signal,
    });

    const payload = await readApiData<UserRow[]>(response, DEFAULT_USERS_ERROR_MESSAGE);

    return {
      rows: payload.data,
      meta: resolveUsersMeta(payload.meta, payload.data, query),
    };
  },
};
