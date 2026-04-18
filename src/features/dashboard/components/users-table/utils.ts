import { parseUsersPageParam, resolveUserSortState } from '@/features/dashboard/utils/users-query';

import type { UsersTableQueryState } from './types';

type QueryPatch = Record<string, string | null>;
type QueryParamsReader = Pick<URLSearchParams, 'get'>;
type QueryParamsWritable = QueryParamsReader & {
  toString(): string;
};

export const resolveUsersTableQueryState = (
  searchParams: QueryParamsReader,
): UsersTableQueryState => {
  const page = parseUsersPageParam(searchParams.get('page'), 1);
  const search = searchParams.get('search') ?? '';
  const sortState = resolveUserSortState(searchParams.get('sort'), searchParams.get('order'));

  return {
    page,
    sort: sortState.sort,
    order: sortState.order,
    search,
  };
};

export const toUsersTableQueryKey = (query: UsersTableQueryState): string => {
  return `${query.page}|${query.sort}|${query.order}|${query.search}`;
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
