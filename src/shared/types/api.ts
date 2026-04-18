export type ApiMeta = {
  page: number;
  totalPages: number;
  totalItems: number;
};

export type ApiResponse<T> = {
  data: T;
  meta?: ApiMeta;
  error?: string;
};

export type SortOrder = 'asc' | 'desc';

export type RangeKey = '7d' | '30d' | '90d';
