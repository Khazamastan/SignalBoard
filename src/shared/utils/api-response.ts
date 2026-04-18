import type { ApiMeta, ApiResponse } from '@/shared/types/api';

export const createApiResponse = <T,>(
  data: T,
  options?: {
    meta?: ApiMeta;
    error?: string;
  },
): ApiResponse<T> => {
  return {
    data,
    ...(options?.meta ? { meta: options.meta } : {}),
    ...(options?.error ? { error: options.error } : {}),
  };
};

export const parseApiResponse = async <T,>(
  response: Response,
  fallbackErrorMessage: string,
): Promise<ApiResponse<T>> => {
  if (!response.ok) {
    throw new Error(fallbackErrorMessage);
  }

  return (await response.json()) as ApiResponse<T>;
};

export const readApiResponseData = async <T,>(
  response: Response,
  fallbackErrorMessage: string,
): Promise<T> => {
  const payload = await parseApiResponse<T>(response, fallbackErrorMessage);

  if (payload.error) {
    throw new Error(payload.error);
  }

  return payload.data;
};
