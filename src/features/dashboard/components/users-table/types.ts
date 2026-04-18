import type { ApiMeta, SortOrder } from '@/shared/types/api';
import type { UserRow, UserSortField } from '@/features/dashboard/types';

export type UsersTableQueryState = {
  page: number;
  limit: number;
  sort: UserSortField;
  order: SortOrder;
  search: string;
};

export type UsersTableData = {
  rows: UserRow[];
  meta: ApiMeta;
};

export type UsersTableInitialData = UsersTableData & {
  query: UsersTableQueryState;
};

export type UsersTableProps = {
  initialData?: UsersTableInitialData;
};
