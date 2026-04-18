'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { DataTable, InputField, SearchIcon } from '@design-system';
import { t } from '@/shared/i18n';
import {
  USERS_PAGE_LIMIT,
  USERS_PAGE_SIZE_OPTIONS,
  USERS_PAGINATION_FALLBACK_TOTAL_PAGES,
  USERS_QUERY_PARAMS,
  USERS_RESET_PAGE_PARAM_VALUE,
  USERS_SEARCH_DEBOUNCE_MS,
} from '@/features/dashboard/constants';

import { createUsersTableColumns } from './users-table/columns';
import {
  USERS_TABLE_MAX_BODY_HEIGHT,
  USERS_TABLE_SEARCH_ICON_SIZE,
} from './users-table/constants';
import type { UsersTableProps, UsersTableQueryState } from './users-table/types';
import { useUsersTableQuery } from './users-table/useUsersTableQuery';
import { applySearchParamsPatch, resolveUsersTableQueryState } from './users-table/utils';

type QueryPatch = Record<string, string | null>;
type UsersDataTableSortState = {
  key: UsersTableQueryState['sort'];
  direction: UsersTableQueryState['order'];
} | null;

const USERS_TABLE_COLUMNS = createUsersTableColumns(t);
const USERS_TABLE_PAGE_SIZE_OPTIONS = [...USERS_PAGE_SIZE_OPTIONS];
const USERS_TABLE_QUERY_KEYS = ['page', 'limit', 'sort', 'order', 'search'] as const;
const {
  page: pageParam,
  limit: limitParam,
  sort: sortParam,
  order: orderParam,
  search: searchParam,
} = USERS_QUERY_PARAMS;

const isSameQueryState = (
  first: UsersTableQueryState,
  second: UsersTableQueryState,
): boolean => {
  return USERS_TABLE_QUERY_KEYS.every((key) => first[key] === second[key]);
};

export function UsersTable({ initialData }: UsersTableProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const searchDebounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resolveInitialQueryState = useCallback(
    () => initialData?.query ?? resolveUsersTableQueryState(searchParams),
    [initialData?.query, searchParams],
  );
  const [queryState, setQueryState] = useState(resolveInitialQueryState);
  const [searchInputValue, setSearchInputValue] = useState(() => resolveInitialQueryState().search);

  const { data, isLoading, error } = useUsersTableQuery({
    query: queryState,
    initialData,
  });
  const { page, limit, sort, order } = queryState;
  const rows = data?.rows ?? [];
  const { totalItems, totalPages } = data?.meta ?? {
    totalItems: rows.length,
    totalPages: USERS_PAGINATION_FALLBACK_TOTAL_PAGES,
  };

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
      setQueryState((current) =>
        isSameQueryState(current, nextQueryState) ? current : nextQueryState,
      );
    },
    [pathname],
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
      if (!nextSort) {
        updateParams({
          [sortParam]: null,
          [orderParam]: null,
          [pageParam]: USERS_RESET_PAGE_PARAM_VALUE,
        });
        return;
      }
      const { key, direction } = nextSort;

      updateParams({
        [sortParam]: key,
        [orderParam]: direction,
        [pageParam]: USERS_RESET_PAGE_PARAM_VALUE,
      });
    },
    [updateParams],
  );

  useEffect(() => {
    const onPopState = () => {
      const nextQueryState = resolveUsersTableQueryState(new URLSearchParams(window.location.search));
      setQueryState((current) =>
        isSameQueryState(current, nextQueryState) ? current : nextQueryState,
      );
      setSearchInputValue(nextQueryState.search);
    };

    window.addEventListener('popstate', onPopState);

    return () => {
      if (searchDebounceTimeoutRef.current) {
        clearTimeout(searchDebounceTimeoutRef.current);
      }

      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  return (
    <DataTable
      rows={rows}
      columns={USERS_TABLE_COLUMNS}
      title={t('table.users.title')}
      actions={
        <InputField
          placeholder={t('table.users.searchLabel')}
          aria-label={t('table.users.searchLabel')}
          value={searchInputValue}
          onChange={({ target: { value } }) => {
            setSearchInputValue(value);
            queueSearchUpdate(value);
          }}
          prefix={<SearchIcon size={USERS_TABLE_SEARCH_ICON_SIZE} />}
        />
      }
      errorMessage={error ?? undefined}
      loading={isLoading}
      sort={{ key: sort, direction: order }}
      onSortChange={onSortChange}
      maxBodyHeight={USERS_TABLE_MAX_BODY_HEIGHT}
      pagination={{
        currentPage: page,
        totalPages,
        totalItems,
        pageSize: limit,
        pageSizeOptions: USERS_TABLE_PAGE_SIZE_OPTIONS,
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
