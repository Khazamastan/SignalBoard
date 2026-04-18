import { useCallback } from 'react';
import type { StatCardData } from '@/features/dashboard/types';
import { useAsyncQuery } from '@/shared/hooks/useAsyncQuery';

import { fetchStatsData } from './api';

type UseStatsCardsQueryOptions = {
  initialStats: StatCardData[];
};

const STATS_QUERY_KEY = 'stats|dashboard';

export const useStatsCardsQuery = ({ initialStats }: UseStatsCardsQueryOptions) => {
  const queryFn = useCallback(
    ({ signal }: { signal: AbortSignal }) => fetchStatsData({ signal }),
    [],
  );

  return useAsyncQuery<StatCardData[]>({
    queryKey: STATS_QUERY_KEY,
    queryFn,
    initialData: initialStats,
  });
};
