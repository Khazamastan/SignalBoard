import { useCallback } from 'react';
import type { RangeKey } from '@/shared/types/api';
import type { AnalyticsSeries } from '@/features/dashboard/types';
import { useAsyncQuery } from '@/shared/hooks/useAsyncQuery';

import { fetchAnalyticsDataByRange } from './api';

type UseStatsAnalyticsQueryOptions = {
  range: RangeKey;
  initialAnalytics: AnalyticsSeries;
};

const toQueryKey = (range: RangeKey): string => {
  return `analytics|${range}`;
};

export const useStatsAnalyticsQuery = ({ range, initialAnalytics }: UseStatsAnalyticsQueryOptions) => {
  const queryFn = useCallback(
    ({ signal }: { signal: AbortSignal }) => fetchAnalyticsDataByRange({ range, signal }),
    [range],
  );

  return useAsyncQuery<AnalyticsSeries>({
    queryKey: toQueryKey(range),
    queryFn,
    initialData: initialAnalytics,
    skipInitialRequest: initialAnalytics.range === range,
  });
};
