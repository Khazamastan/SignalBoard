'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { DataTable, InputField, Pagination, SearchIcon } from '@design-system';
import type { DataTableSortOrder } from '@design-system';
import type { SortOrder } from '@/shared/types/api';
import type { UserSortField } from '@/features/dashboard/types';
import {
  USERS_SEARCH_DEBOUNCE_MS,
  USERS_TABLE_SKELETON_ROW_COUNT_MIN,
} from '@/features/dashboard/constants';

import { usersTableColumns } from './users-table/columns';
import {
  USERS_TABLE_ARIA_LABEL,
  USERS_TABLE_EMPTY_MESSAGE,
  USERS_TABLE_SEARCH_LABEL,
  USERS_TABLE_TITLE,
  USERS_TABLE_VIRTUALIZATION,
} from './users-table/constants';
import type { UsersTableProps } from './users-table/types';
import { useUsersTableQuery } from './users-table/useUsersTableQuery';
import { applySearchParamsPatch, resolveUsersTableQueryState } from './users-table/utils';

type QueryPatch = Record<string, string | null>;
type UsersDataTableSortState = {
  key: UserSortField;
  direction: DataTableSortOrder;
} | null;

export function UsersTable({ initialData }: UsersTableProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const searchDebounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [queryState, setQueryState] = useState(initialData?.query ?? resolveUsersTableQueryState(searchParams));
  const [searchInputValue, setSearchInputValue] = useState(queryState.search);

  const { data, isLoading, error } = useUsersTableQuery({
    query: queryState,
    initialData,
  });

  const rows = data?.rows ?? [];
  const meta = data?.meta ?? {
      page: queryState.page,
      totalItems: rows.length,
      totalPages: 1,
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
      setQueryState(nextQueryState);
      setSearchInputValue(nextQueryState.search);
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
          search: normalizedSearch ? normalizedSearch : null,
          page: '1',
        });
      }, USERS_SEARCH_DEBOUNCE_MS);
    },
    [updateParams],
  );

  const onSort = useCallback(
    (column: UserSortField) => {
      const nextOrder: SortOrder =
        queryState.sort === column && queryState.order === 'asc'
          ? 'desc'
          : 'asc';

      updateParams({
        sort: column,
        order: nextOrder,
        page: '1',
      });
    },
    [queryState.order, queryState.sort, updateParams],
  );

  const onSortChange = useCallback(
    (nextSort: UsersDataTableSortState) => {
      const resolvedSort: { key: UserSortField; direction: SortOrder } =
        nextSort ?? {
          key: queryState.sort,
          direction: 'asc',
        };

      onSort(resolvedSort.key);
    },
    [onSort, queryState.sort],
  );

  const loadingSkeletonRowCount = Math.max(rows.length || 0, USERS_TABLE_SKELETON_ROW_COUNT_MIN);

  useEffect(() => {
    const handlePopState = () => {
      const nextQueryState = resolveUsersTableQueryState(new URLSearchParams(window.location.search));
      setQueryState(nextQueryState);
      setSearchInputValue(nextQueryState.search);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      if (searchDebounceTimeoutRef.current) {
        clearTimeout(searchDebounceTimeoutRef.current);
      }

      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <>
      <DataTable
        rows={rows}
        columns={usersTableColumns}
        getRowId={(row) => row.id}
        title={USERS_TABLE_TITLE}
        actions={
          <InputField
            placeholder={USERS_TABLE_SEARCH_LABEL}
            aria-label={USERS_TABLE_SEARCH_LABEL}
            floatingLabel={false}
            value={searchInputValue}
            onChange={(event) => {
              const nextValue = event.target.value;
              setSearchInputValue(nextValue);
              queueSearchUpdate(nextValue);
            }}
            hideMeta
            prefix={<SearchIcon size={24} />}
          />
        }
        errorMessage={error ?? undefined}
        caption={USERS_TABLE_ARIA_LABEL}
        loading={isLoading}
        skeletonRowCount={loadingSkeletonRowCount}
        sort={{ key: queryState.sort, direction: queryState.order }}
        onSortChange={onSortChange}
        emptyMessage={USERS_TABLE_EMPTY_MESSAGE}
        maxBodyHeight="34rem"
        stickyFirstColumn
        virtualization={USERS_TABLE_VIRTUALIZATION}
      />

      <Pagination
        currentPage={queryState.page}
        totalPages={meta.totalPages}
        totalItems={meta.totalItems}
        isLoading={isLoading}
        onChangePage={(page) => updateParams({ page: String(page) })}
      />
    </>
  );
}
