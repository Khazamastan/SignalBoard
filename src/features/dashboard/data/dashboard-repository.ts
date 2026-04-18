import type { RangeKey, ApiMeta } from '@/shared/types/api';
import type {
  AnalyticsSeries,
  StatCardData,
  UserRow,
  UserSortField,
  UsersQuery,
} from '@/features/dashboard/types';
import {
  ANALYTICS_POINTS_BY_RANGE,
  MOCK_REFERENCE_DATE,
  MOCK_USERS_TOTAL,
} from '@/features/dashboard/constants';

export type UsersPageData = {
  data: UserRow[];
  meta: ApiMeta;
};

export interface DashboardRepository {
  getStats: () => Promise<StatCardData[]>;
  getAnalytics: (range: RangeKey) => Promise<AnalyticsSeries>;
  getUsersPage: (query: UsersQuery) => Promise<UsersPageData>;
}

const firstNames = [
  'Aarav',
  'Sophia',
  'Liam',
  'Olivia',
  'Ethan',
  'Emma',
  'Noah',
  'Ava',
  'Mason',
  'Mia',
  'Lucas',
  'Isabella',
  'Elijah',
  'Amelia',
  'James',
  'Charlotte',
];

const lastNames = [
  'Sharma',
  'Brown',
  'Wilson',
  'Thomas',
  'Lee',
  'Walker',
  'King',
  'Harris',
  'Young',
  'Scott',
  'Turner',
  'Parker',
  'Evans',
  'Collins',
  'Morgan',
  'Reed',
];

const roles = ['Admin', 'Manager', 'Analyst', 'Support'] as const;
const statuses = ['Active', 'Inactive', 'Pending'] as const;
const countries = [
  'United States',
  'India',
  'Canada',
  'Germany',
  'Japan',
  'United Kingdom',
  'Australia',
  'Singapore',
];

const formatDateFromReference = (referenceDate: string, dayOffset: number): string => {
  const date = new Date(`${referenceDate}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() - dayOffset);
  return date.toISOString().slice(0, 10);
};

const createUsers = (): UserRow[] => {
  return Array.from({ length: MOCK_USERS_TOTAL }, (_, index) => {
    const firstName = firstNames[index % firstNames.length];
    const lastName = lastNames[Math.floor(index / firstNames.length) % lastNames.length];
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${index + 1}@example.com`;

    return {
      id: index + 1,
      name,
      email,
      role: roles[index % roles.length],
      status: statuses[index % statuses.length],
      country: countries[index % countries.length],
      lastActive: formatDateFromReference(MOCK_REFERENCE_DATE, index % 22),
      spend: 450 + (index % 9) * 137 + index * 17,
    };
  });
};

const createAnalyticsSeries = (range: RangeKey): AnalyticsSeries => {
  const points = Array.from({ length: ANALYTICS_POINTS_BY_RANGE[range] }, (_, index) => {
    const variance = (index % 3) * 120;
    return {
      label: `${index + 1}`,
      value: 1200 + index * 90 + variance,
    };
  });

  return { range, points };
};

const statsData: StatCardData[] = [
  {
    id: 'total-users',
    metric: 'Total Users',
    value: '48,392',
    trend: { direction: 'up', percentage: 12.4 },
    icon: 'users',
  },
  {
    id: 'monthly-revenue',
    metric: 'Monthly Revenue',
    value: '$1.24M',
    trend: { direction: 'up', percentage: 8.1 },
    icon: 'revenue',
  },
  {
    id: 'avg-sessions',
    metric: 'Avg. Sessions',
    value: '6.8',
    trend: { direction: 'down', percentage: 1.7 },
    icon: 'sessions',
  },
  {
    id: 'conversion-rate',
    metric: 'Conversion Rate',
    value: '4.92%',
    trend: { direction: 'up', percentage: 3.6 },
    icon: 'conversion',
  },
];

const analyticsDataByRange: Record<RangeKey, AnalyticsSeries> = {
  '7d': createAnalyticsSeries('7d'),
  '30d': createAnalyticsSeries('30d'),
  '90d': createAnalyticsSeries('90d'),
};

const usersData = createUsers();
const usersSearchIndexById = new Map<number, string>(
  usersData.map((user) => [
    user.id,
    `${user.name} ${user.email} ${user.role} ${user.country}`.toLowerCase(),
  ]),
);
const sortedUsersCache = new Map<`${UserSortField}|asc` | `${UserSortField}|desc`, UserRow[]>();

const comparePrimitive = <T extends string | number>(
  a: T,
  b: T,
  order: 'asc' | 'desc',
): number => {
  if (a === b) {
    return 0;
  }

  const result = a > b ? 1 : -1;
  return order === 'asc' ? result : -result;
};

const sortUsers = (
  users: UserRow[],
  sortField: UserSortField,
  order: 'asc' | 'desc',
): UserRow[] => {
  return [...users].sort((a, b) => {
    if (sortField === 'spend') {
      return comparePrimitive(a.spend, b.spend, order);
    }

    if (sortField === 'lastActive') {
      return comparePrimitive(
        new Date(a.lastActive).getTime(),
        new Date(b.lastActive).getTime(),
        order,
      );
    }

    return comparePrimitive(a[sortField], b[sortField], order);
  });
};

const toSortCacheKey = (
  sortField: UserSortField,
  order: 'asc' | 'desc',
): `${UserSortField}|asc` | `${UserSortField}|desc` => {
  return `${sortField}|${order}`;
};

const getSortedUsers = (
  sortField: UserSortField,
  order: 'asc' | 'desc',
): UserRow[] => {
  const cacheKey = toSortCacheKey(sortField, order);
  const cached = sortedUsersCache.get(cacheKey);

  if (cached) {
    return cached;
  }

  const sortedUsers = sortUsers(usersData, sortField, order);
  sortedUsersCache.set(cacheKey, sortedUsers);
  return sortedUsers;
};

const queryUsers = (query: UsersQuery): UsersPageData => {
  const normalizedSearch = query.search.trim().toLowerCase();
  const sorted = getSortedUsers(query.sort, query.order);
  const filtered = normalizedSearch
    ? sorted.filter((user) => {
        return usersSearchIndexById.get(user.id)?.includes(normalizedSearch);
      })
    : sorted;
  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / query.limit));
  const safePage = Math.min(Math.max(query.page, 1), totalPages);
  const start = (safePage - 1) * query.limit;
  const data = filtered.slice(start, start + query.limit);

  return {
    data,
    meta: {
      page: safePage,
      totalPages,
      totalItems,
    },
  };
};

const inMemoryDashboardRepository: DashboardRepository = {
  async getStats() {
    return statsData;
  },
  async getAnalytics(range) {
    return analyticsDataByRange[range];
  },
  async getUsersPage(query) {
    const payload = queryUsers(query);

    return {
      data: payload.data,
      meta: payload.meta ?? {
        page: query.page,
        totalPages: 1,
        totalItems: payload.data.length,
      },
    };
  },
};

export const dashboardRepository: DashboardRepository = inMemoryDashboardRepository;
