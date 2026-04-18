import { parseUsersSearchParams } from '@/features/dashboard/api/query-parsers';
import {
  USERS_PAGE_LIMIT,
  USERS_PAGINATION_FALLBACK_TOTAL_PAGES,
} from '@/features/dashboard/constants';
import { dashboardService } from '@/features/dashboard/data/dashboard-service';

import { UsersTable } from './UsersTable';

type RouteSearchParams = Record<string, string | string[] | undefined>;

type UsersTableSectionProps = {
  searchParams: RouteSearchParams;
};

const toUrlSearchParams = (searchParams: RouteSearchParams): URLSearchParams => {
  const resolved = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (typeof value === 'string') {
      resolved.set(key, value);
      return;
    }

    if (Array.isArray(value) && value[0]) {
      resolved.set(key, value[0]);
    }
  });

  return resolved;
};

export async function UsersTableSection({ searchParams }: UsersTableSectionProps) {
  const usersQuery = parseUsersSearchParams(toUrlSearchParams(searchParams));
  const initialUsers = await dashboardService.getUsersPageResponse({
    ...usersQuery,
    limit: USERS_PAGE_LIMIT,
  });

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
