'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { DataTable, InputField } from '@design-system';
import { t } from '@/shared/i18n';
import {
  USERS_PAGE_LIMIT,
  USERS_PAGINATION_FALLBACK_TOTAL_PAGES,
  USERS_QUERY_PARAMS,
  USERS_RESET_PAGE_PARAM_VALUE,
  USERS_SEARCH_DEBOUNCE_MS,
} from '@/features/dashboard/constants';

import { createUsersTableColumns } from './users-table/columns';
import type { UsersTableProps, UsersTableQueryState } from './users-table/types';
import { useUsersTableQuery } from './users-table/useUsersTableQuery';
import {
  applySearchParamsPatch,
  resolveUsersTableQueryState,
  toUsersTableQueryKey,
} from './users-table/utils';

type QueryPatch = Record<string, string | null>;
type UsersDataTableSortState = {
  key: UsersTableQueryState['sort'];
  direction: UsersTableQueryState['order'];
} | null;

const USERS_TABLE_COLUMNS = createUsersTableColumns(t);
const {
  page: pageParam,
  limit: limitParam,
  sort: sortParam,
  order: orderParam,
  search: searchParam,
} = USERS_QUERY_PARAMS;

export function UsersTable({ initialData }: UsersTableProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const searchDebounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [queryState, setQueryState] = useState(
    () => initialData?.query ?? resolveUsersTableQueryState(searchParams),
  );
  const [searchInputValue, setSearchInputValue] = useState(
    () => (initialData?.query ?? resolveUsersTableQueryState(searchParams)).search,
  );

  const { data, isLoading, error } = useUsersTableQuery({
    query: queryState,
    initialData,
  });
  const { page, limit, sort, order } = queryState;
  const { rows = [], meta } = data ?? {};
  const {
    totalItems = rows.length,
    totalPages = USERS_PAGINATION_FALLBACK_TOTAL_PAGES,
  } = meta ?? {};

  const syncQueryState = useCallback((nextQueryState: UsersTableQueryState) => {
    const nextQueryKey = toUsersTableQueryKey(nextQueryState);
    setQueryState((current) =>
      toUsersTableQueryKey(current) === nextQueryKey ? current : nextQueryState,
    );
  }, []);

  const updateParams = useCallback(
    (patch: QueryPatch) => {
      if (typeof window === 'undefined') {
        return;
      }

      const params = applySearchParamsPatch(new URLSearchParams(window.location.search), patch);
      const queryString = params.toString();
      const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;
      const nextQueryState = resolveUsersTableQueryState(params);

      window.history.replaceState(window.history.state, '', nextUrl);
      syncQueryState(nextQueryState);
    },
    [pathname, syncQueryState],
  );

  const queueSearchUpdate = useCallback(
    (value: string) => {
      if (searchDebounceTimeoutRef.current) {
        clearTimeout(searchDebounceTimeoutRef.current);
      }

      searchDebounceTimeoutRef.current = setTimeout(() => {
        const normalizedSearch = value.trim();

        updateParams({
          [searchParam]: normalizedSearch || null,
          [pageParam]: USERS_RESET_PAGE_PARAM_VALUE,
        });
      }, USERS_SEARCH_DEBOUNCE_MS);
    },
    [updateParams],
  );

  const onSortChange = useCallback(
    (nextSort: UsersDataTableSortState) => {
      const patch = nextSort
        ? {
            [sortParam]: nextSort.key,
            [orderParam]: nextSort.direction,
            [pageParam]: USERS_RESET_PAGE_PARAM_VALUE,
          }
        : {
            [sortParam]: null,
            [orderParam]: null,
            [pageParam]: USERS_RESET_PAGE_PARAM_VALUE,
          };
      updateParams(patch);
    },
    [updateParams],
  );

  useEffect(() => {
    const onPopState = () => {
      const nextQueryState = resolveUsersTableQueryState(new URLSearchParams(window.location.search));
      syncQueryState(nextQueryState);
      setSearchInputValue(nextQueryState.search);
    };

    window.addEventListener('popstate', onPopState);

    return () => {
      if (searchDebounceTimeoutRef.current) {
        clearTimeout(searchDebounceTimeoutRef.current);
      }

      window.removeEventListener('popstate', onPopState);
    };
  }, [syncQueryState]);

  return (
    <DataTable
      rows={rows}
      columns={USERS_TABLE_COLUMNS}
      title={t('table.users.title')}
      actions={
        <InputField
          value={searchInputValue}
          onChange={({ target: { value } }) => {
            setSearchInputValue(value);
            queueSearchUpdate(value);
          }}
        />
      }
      errorMessage={error}
      loading={isLoading}
      sort={{ key: sort, direction: order }}
      onSortChange={onSortChange}
      pagination={{
        currentPage: page,
        totalPages,
        totalItems,
        pageSize: limit,
        onChangePage: (nextPage) =>
          updateParams({
            [pageParam]: String(nextPage),
          }),
        onChangePageSize: (nextLimit) =>
          updateParams({
            [limitParam]: nextLimit === USERS_PAGE_LIMIT ? null : String(nextLimit),
            [pageParam]: USERS_RESET_PAGE_PARAM_VALUE,
          }),
      }}
    />
  );
}
