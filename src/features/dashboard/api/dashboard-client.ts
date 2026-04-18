import type { ApiMeta, ApiResponse, RangeKey } from '@/shared/types/api';
import { parseApiResponse } from '@/shared/utils/api-response';
import {
  DASHBOARD_API_QUERY_PARAMS,
  DASHBOARD_API_ROUTES,
  USERS_PAGE_LIMIT,
  USERS_QUERY_PARAMS,
} from '@/features/dashboard/constants';
import type { AnalyticsSeries, StatCardData, UserRow, UsersQuery } from '@/features/dashboard/types';
import { t } from '@/shared/i18n';

type RequestOptions = {
  signal: AbortSignal;
};

type UsersPagePayload = {
  rows: UserRow[];
  meta: ApiMeta;
};

const readApiData = async <T,>(
  response: Response,
  fallbackErrorMessage: string,
): Promise<ApiResponse<T>> => {
  const payload = await parseApiResponse<T>(response, fallbackErrorMessage);
  const { error } = payload;

  if (error) {
    throw new Error(error);
  }

  return payload;
};

const resolveUsersMeta = (
  meta: ApiMeta | undefined,
  rows: UserRow[],
  { page, limit }: UsersQuery,
): ApiMeta => {
  if (meta) {
    return meta;
  }
  const safeLimit = Math.max(1, limit || USERS_PAGE_LIMIT);

  return {
    page,
    totalPages: Math.max(1, Math.ceil(rows.length / safeLimit)),
    totalItems: rows.length,
  };
};

export const dashboardApiClient = {
  async getStats(options: RequestOptions): Promise<StatCardData[]> {
    const { signal } = options;
    const response = await fetch(DASHBOARD_API_ROUTES.stats, {
      signal,
    });
    const { data } = await readApiData<StatCardData[]>(
      response,
      t('api.error.dashboardData'),
    );
    return data;
  },

  async getAnalytics(range: RangeKey, options: RequestOptions): Promise<AnalyticsSeries> {
    const { signal } = options;
    const response = await fetch(
      `${DASHBOARD_API_ROUTES.analytics}?${DASHBOARD_API_QUERY_PARAMS.range}=${encodeURIComponent(range)}`,
      {
        signal,
      },
    );
    const { data } = await readApiData<AnalyticsSeries>(
      response,
      t('api.error.dashboardData'),
    );
    return data;
  },

  async getUsersPage(query: UsersQuery, options: RequestOptions): Promise<UsersPagePayload> {
    const { page, limit, sort, order, search } = query;
    const { signal } = options;
    const params = new URLSearchParams({
      [USERS_QUERY_PARAMS.page]: String(page),
      [USERS_QUERY_PARAMS.limit]: String(limit),
      [USERS_QUERY_PARAMS.sort]: sort,
      [USERS_QUERY_PARAMS.order]: order,
      [USERS_QUERY_PARAMS.search]: search,
    });

    const response = await fetch(`${DASHBOARD_API_ROUTES.users}?${params.toString()}`, {
      signal,
    });

    const { data, meta } = await readApiData<UserRow[]>(response, t('api.error.users'));

    return {
      rows: data,
      meta: resolveUsersMeta(meta, data, query),
    };
  },
};
