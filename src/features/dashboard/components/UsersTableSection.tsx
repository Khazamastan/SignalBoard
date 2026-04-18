import {
  parseUsersSearchParams,
  toUrlSearchParams,
  type RouteSearchParams,
} from '@/features/dashboard/api/query-parsers';
import { USERS_PAGINATION_FALLBACK_TOTAL_PAGES } from '@/features/dashboard/constants';
import { readUsersPageResponse } from '@/features/dashboard/data/dashboard-streaming';

import { UsersTable } from './UsersTable';

type UsersTableSectionProps = {
  searchParams: RouteSearchParams;
};

export async function UsersTableSection({ searchParams }: UsersTableSectionProps) {
  const query = parseUsersSearchParams(toUrlSearchParams(searchParams));
  const initialUsers = await readUsersPageResponse(query);
  const { data, meta } = initialUsers;

  const initialUsersMeta = meta ?? {
    page: query.page,
    totalPages: USERS_PAGINATION_FALLBACK_TOTAL_PAGES,
    totalItems: data.length,
  };

  return (
    <UsersTable
      initialData={{
        rows: data,
        meta: initialUsersMeta,
        query,
      }}
    />
  );
}
