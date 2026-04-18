import type { RangeKey, SortOrder } from '@/shared/types/api';

export type TrendDirection = 'up' | 'down';

export type StatIcon = 'users' | 'revenue' | 'sessions' | 'conversion';

export type StatCardData = {
  id: string;
  metric: string;
  value: string;
  trend: {
    direction: TrendDirection;
    percentage: number;
  };
  icon: StatIcon;
};

export type AnalyticsPoint = {
  label: string;
  value: number;
};

export type AnalyticsSeries = {
  range: RangeKey;
  points: AnalyticsPoint[];
};

export type UserStatus = 'Active' | 'Inactive' | 'Pending';
export type UserRole = 'Admin' | 'Manager' | 'Analyst' | 'Support';

export type UserRow = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  country: string;
  lastActive: string;
  spend: number;
};

export type UserSortField =
  | 'name'
  | 'email'
  | 'role'
  | 'status'
  | 'country'
  | 'lastActive'
  | 'spend';

export type UsersQuery = {
  page: number;
  limit: number;
  sort: UserSortField;
  order: SortOrder;
  search: string;
};
