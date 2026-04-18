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
    const response = await fetch(DASHBOARD_API_ROUTES.stats, {
      cache: 'no-store',
      signal: options.signal,
    });
    const payload = await readApiData<StatCardData[]>(
      response,
      t('api.error.dashboardData'),
    );
    return payload.data;
  },

  async getAnalytics(range: RangeKey, options: RequestOptions): Promise<AnalyticsSeries> {
    const response = await fetch(
      `${DASHBOARD_API_ROUTES.analytics}?${DASHBOARD_API_QUERY_PARAMS.range}=${encodeURIComponent(range)}`,
      {
      cache: 'no-store',
      signal: options.signal,
      },
    );
    const payload = await readApiData<AnalyticsSeries>(
      response,
      t('api.error.dashboardData'),
    );
    return payload.data;
  },

  async getUsersPage(query: UsersQuery, options: RequestOptions): Promise<UsersPagePayload> {
    const params = new URLSearchParams({
      [USERS_QUERY_PARAMS.page]: String(query.page),
      [USERS_QUERY_PARAMS.limit]: String(query.limit),
      [USERS_QUERY_PARAMS.sort]: query.sort,
      [USERS_QUERY_PARAMS.order]: query.order,
      [USERS_QUERY_PARAMS.search]: query.search,
    });

    const response = await fetch(`${DASHBOARD_API_ROUTES.users}?${params.toString()}`, {
      cache: 'no-store',
      signal: options.signal,
    });

    const payload = await readApiData<UserRow[]>(response, t('api.error.users'));

    return {
      rows: payload.data,
      meta: resolveUsersMeta(payload.meta, payload.data, query),
    };
  },
};
