import { useCallback } from 'react';
import { useAsyncQuery } from '@/shared/hooks/useAsyncQuery';

import { fetchUsersTableData } from './api';
import type { UsersTableData, UsersTableInitialData, UsersTableQueryState } from './types';
import { toUsersTableQueryKey } from './utils';

type UseUsersTableQueryOptions = {
  query: UsersTableQueryState;
  initialData?: UsersTableInitialData;
};

export const useUsersTableQuery = ({ query, initialData }: UseUsersTableQueryOptions) => {
  const queryKey = toUsersTableQueryKey(query);
  const initialQueryKey = initialData && toUsersTableQueryKey(initialData.query);
  const skipInitialRequest = initialQueryKey === queryKey;
  const initialTableData: UsersTableData | undefined =
    initialData && {
      rows: initialData.rows,
      meta: initialData.meta,
    };

  const queryFn = useCallback(
    ({ signal }: { signal: AbortSignal }) =>
      fetchUsersTableData({
        query,
        signal,
      }),
    [query],
  );

  return useAsyncQuery<UsersTableData>({
    queryKey,
    queryFn,
    initialData: initialTableData,
    skipInitialRequest,
    preserveDataOnError: false,
  });
};
