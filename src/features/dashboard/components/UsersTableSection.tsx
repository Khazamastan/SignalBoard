import {
  parseUsersSearchParams,
  toUrlSearchParams,
  type RouteSearchParams,
} from '@/features/dashboard/api/query-parsers';
import {
  USERS_PAGE_LIMIT,
  USERS_PAGINATION_FALLBACK_TOTAL_PAGES,
} from '@/features/dashboard/constants';
import { readUsersPageResponse } from '@/features/dashboard/data/dashboard-streaming';

import { UsersTable } from './UsersTable';

type UsersTableSectionProps = {
  searchParams: RouteSearchParams;
};

export async function UsersTableSection({ searchParams }: UsersTableSectionProps) {
  const usersQuery = parseUsersSearchParams(toUrlSearchParams(searchParams));
  const initialUsers = await readUsersPageResponse(
    usersQuery.page,
    USERS_PAGE_LIMIT,
    usersQuery.sort,
    usersQuery.order,
    usersQuery.search,
  );

  const initialUsersMeta = initialUsers.meta ?? {
    page: usersQuery.page,
    totalPages: USERS_PAGINATION_FALLBACK_TOTAL_PAGES,
    totalItems: initialUsers.data.length,
  };

  return (
    <UsersTable
      initialData={{
        rows: initialUsers.data,
        meta: initialUsersMeta,
        query: {
          page: usersQuery.page,
          sort: usersQuery.sort,
          order: usersQuery.order,
          search: usersQuery.search,
        },
      }}
    />
  );
}
