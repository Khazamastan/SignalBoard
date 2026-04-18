import type React from 'react';

import {
  StatsAnalyticsSectionFallback,
  UsersTableSectionFallback,
} from '@/features/dashboard/components/DashboardStreamingFallbacks';
import { StatsAnalyticsSection } from '@/features/dashboard/components/StatsAnalyticsSection';
import { UsersTableSection } from '@/features/dashboard/components/UsersTableSection';

export type DashboardRouteSearchParams = Record<string, string | string[] | undefined>;

type DashboardFeatureContext = {
  searchParams: DashboardRouteSearchParams;
};

type DashboardFeatureDefinition = {
  id: string;
  fallback: React.ReactNode;
  render: (context: DashboardFeatureContext) => React.ReactNode;
  resolveSuspenseKey?: (context: DashboardFeatureContext) => string;
};

const serializeSearchParams = (searchParams: DashboardRouteSearchParams): string => {
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

  return resolved.toString();
};

export const dashboardFeatureRegistry: DashboardFeatureDefinition[] = [
  {
    id: 'stats-analytics',
    fallback: <StatsAnalyticsSectionFallback />,
    render: () => <StatsAnalyticsSection />,
  },
  {
    id: 'users-table',
    fallback: <UsersTableSectionFallback />,
    resolveSuspenseKey: ({ searchParams }) => serializeSearchParams(searchParams),
    render: ({ searchParams }) => <UsersTableSection searchParams={searchParams} />,
  },
];
