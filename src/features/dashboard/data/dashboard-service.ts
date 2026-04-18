import type { ApiResponse, RangeKey } from '@/shared/types/api';
import { createApiResponse } from '@/shared/utils/api-response';
import type { AnalyticsSeries, StatCardData, UserRow, UsersQuery } from '@/features/dashboard/types';

import { dashboardRepository } from './dashboard-repository';

type UsersPageResponse = ApiResponse<UserRow[]>;

export const dashboardService = {
  async getStatsResponse(): Promise<ApiResponse<StatCardData[]>> {
    const stats = await dashboardRepository.getStats();
    return createApiResponse(stats);
  },

  async getAnalyticsResponse(range: RangeKey): Promise<ApiResponse<AnalyticsSeries>> {
    const analytics = await dashboardRepository.getAnalytics(range);
    return createApiResponse(analytics);
  },

  async getUsersPageResponse(query: UsersQuery): Promise<UsersPageResponse> {
    const usersPage = await dashboardRepository.getUsersPage(query);
    const meta = usersPage.meta ?? {
      page: query.page,
      totalPages: 1,
      totalItems: usersPage.data.length,
    };

    return createApiResponse(usersPage.data, {
      meta,
    });
  },
};
