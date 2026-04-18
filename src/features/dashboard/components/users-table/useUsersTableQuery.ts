import { useCallback } from 'react';
import { useAsyncQuery } from '@/shared/hooks/useAsyncQuery';

import { fetchUsersTableData } from './api';
import type { UsersTableData, UsersTableInitialData, UsersTableQueryState } from './types';
import { toUsersTableQueryKey } from './utils';

type UseUsersTableQueryOptions = {
  query: UsersTableQueryState;
  initialData?: UsersTableInitialData;
};

const toInitialTableData = (initialData: UsersTableInitialData | undefined): UsersTableData | undefined => {
  if (!initialData) {
    return undefined;
  }
  const { rows, meta } = initialData;

  return {
    rows,
    meta,
  };
};

export const useUsersTableQuery = ({ query, initialData }: UseUsersTableQueryOptions) => {
  const queryKey = toUsersTableQueryKey(query);
  const initialQueryKey = initialData ? toUsersTableQueryKey(initialData.query) : null;
  const skipInitialRequest = Boolean(initialData) && initialQueryKey === queryKey;

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
    initialData: toInitialTableData(initialData),
    skipInitialRequest,
    preserveDataOnError: false,
  });
};
