'use client';

import { useEffect, useRef, useState } from 'react';
import { t } from '@/shared/i18n';

type QueryContext = {
  signal: AbortSignal;
};

type UseAsyncQueryOptions<TData> = {
  queryKey: string;
  queryFn: (context: QueryContext) => Promise<TData>;
  initialData?: TData;
  skipInitialRequest?: boolean;
  preserveDataOnError?: boolean;
};

type UseAsyncQueryResult<TData> = {
  data: TData | undefined;
  isLoading: boolean;
  error: string | null;
};

type QueryError = {
  queryKey: string;
  message: string;
};

const UNKNOWN_QUERY_ERROR_MESSAGE = t('app.error.unknown');

const resolveErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    const { message } = error;
    return message;
  }

  return UNKNOWN_QUERY_ERROR_MESSAGE;
};

export function useAsyncQuery<TData>({
  queryKey,
  queryFn,
  initialData,
  skipInitialRequest = false,
  preserveDataOnError = true,
}: UseAsyncQueryOptions<TData>): UseAsyncQueryResult<TData> {
  const [data, setData] = useState<TData | undefined>(initialData);
  const [resolvedQueryKey, setResolvedQueryKey] = useState<string | null>(
    skipInitialRequest ? queryKey : null,
  );
  const [errorState, setErrorState] = useState<QueryError | null>(null);

  const shouldSkipInitialRef = useRef(skipInitialRequest);

  useEffect(() => {
    if (shouldSkipInitialRef.current) {
      shouldSkipInitialRef.current = false;
      return;
    }

    const abortController = new AbortController();

    queryFn({ signal: abortController.signal })
      .then((nextData) => {
        if (abortController.signal.aborted) {
          return;
        }

        setData(nextData);
        setResolvedQueryKey(queryKey);
        setErrorState(null);
      })
      .catch((queryError) => {
        if (abortController.signal.aborted) {
          return;
        }

        if (!preserveDataOnError) {
          setData(undefined);
        }

        setResolvedQueryKey(queryKey);
        setErrorState({
          queryKey,
          message: resolveErrorMessage(queryError),
        });
      });

    return () => {
      abortController.abort();
    };
  }, [preserveDataOnError, queryFn, queryKey]);

  const isLoading = resolvedQueryKey !== queryKey;
  const { queryKey: errorQueryKey, message: errorMessage } = errorState ?? {};
  const error = errorQueryKey === queryKey ? errorMessage ?? null : null;

  return {
    data,
    isLoading,
    error,
  };
}
