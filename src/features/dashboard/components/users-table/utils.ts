import {
  parseUsersLimitParam,
  parseUsersPageParam,
  resolveUserSortState,
} from '@/features/dashboard/utils/users-query';
import {
  USERS_DEFAULT_PAGE,
  USERS_DEFAULT_SEARCH_QUERY,
  USERS_PAGE_LIMIT,
  USERS_QUERY_PARAMS,
} from '@/features/dashboard/constants';

import type { UsersTableQueryState } from './types';
import { USERS_TABLE_QUERY_KEY_SEPARATOR } from './constants';

type QueryPatch = Record<string, string | null>;
type QueryParamsReader = Pick<URLSearchParams, 'get'>;
type QueryParamsWritable = QueryParamsReader & {
  toString(): string;
};
const {
  page: pageParam,
  limit: limitParam,
  sort: sortParam,
  order: orderParam,
  search: searchParam,
} = USERS_QUERY_PARAMS;

export const resolveUsersTableQueryState = (
  searchParams: QueryParamsReader,
): UsersTableQueryState => {
  const page = parseUsersPageParam(searchParams.get(pageParam), USERS_DEFAULT_PAGE);
  const limit = parseUsersLimitParam(searchParams.get(limitParam), USERS_PAGE_LIMIT);
  const search = searchParams.get(searchParam) ?? USERS_DEFAULT_SEARCH_QUERY;
  const sortState = resolveUserSortState(
    searchParams.get(sortParam),
    searchParams.get(orderParam),
  );

  return {
    page,
    limit,
    search,
    ...sortState,
  };
};

export const toUsersTableQueryKey = (query: UsersTableQueryState): string => {
  const { page, limit, sort, order, search } = query;

  return [
    page,
    limit,
    sort,
    order,
    search,
  ].join(USERS_TABLE_QUERY_KEY_SEPARATOR);
};

export const applySearchParamsPatch = (
  searchParams: QueryParamsWritable,
  patch: QueryPatch,
): URLSearchParams => {
  const params = new URLSearchParams(searchParams.toString());

  Object.entries(patch).forEach(([key, value]) => {
    if (!value) {
      params.delete(key);
      return;
    }

    params.set(key, value);
  });

  return params;
};
