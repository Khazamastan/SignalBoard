import type { ApiMeta, ApiResponse } from '@/shared/types/api';

export const createApiResponse = <T,>(
  data: T,
  options?: {
    meta?: ApiMeta;
    error?: string;
  },
): ApiResponse<T> => {
  const { meta, error } = options ?? {};

  return {
    data,
    ...(meta ? { meta } : {}),
    ...(error ? { error } : {}),
  };
};

export const parseApiResponse = async <T,>(
  response: Response,
  fallbackErrorMessage: string,
): Promise<ApiResponse<T>> => {
  let payload: ApiResponse<T> | null = null;

  try {
    payload = (await response.json()) as ApiResponse<T>;
  } catch {
    payload = null;
  }

  const resolvedError = payload?.error || fallbackErrorMessage;

  if (!response.ok) {
    throw new Error(resolvedError);
  }

  if (!payload || typeof payload !== 'object' || !('data' in payload)) {
    throw new Error(resolvedError);
  }

  return payload;
};

export const readApiResponseData = async <T,>(
  response: Response,
  fallbackErrorMessage: string,
): Promise<T> => {
  const { data, error } = await parseApiResponse<T>(response, fallbackErrorMessage);

  if (error) {
    throw new Error(error);
  }

  return data;
};
