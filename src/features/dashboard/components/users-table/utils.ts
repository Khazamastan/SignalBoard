import { parseUsersPageParam, resolveUserSortState } from '@/features/dashboard/utils/users-query';
import {
  USERS_DEFAULT_PAGE,
  USERS_DEFAULT_SEARCH_QUERY,
  USERS_QUERY_PARAMS,
} from '@/features/dashboard/constants';

import type { UsersTableQueryState } from './types';
import { USERS_TABLE_QUERY_KEY_SEPARATOR } from './constants';

type QueryPatch = Record<string, string | null>;
type QueryParamsReader = Pick<URLSearchParams, 'get'>;
type QueryParamsWritable = QueryParamsReader & {
  toString(): string;
};

export const resolveUsersTableQueryState = (
  searchParams: QueryParamsReader,
): UsersTableQueryState => {
  const page = parseUsersPageParam(searchParams.get(USERS_QUERY_PARAMS.page), USERS_DEFAULT_PAGE);
  const search = searchParams.get(USERS_QUERY_PARAMS.search) ?? USERS_DEFAULT_SEARCH_QUERY;
  const sortState = resolveUserSortState(
    searchParams.get(USERS_QUERY_PARAMS.sort),
    searchParams.get(USERS_QUERY_PARAMS.order),
  );

  return {
    page,
    sort: sortState.sort,
    order: sortState.order,
    search,
  };
};

export const toUsersTableQueryKey = (query: UsersTableQueryState): string => {
  return [
    query.page,
    query.sort,
    query.order,
    query.search,
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
