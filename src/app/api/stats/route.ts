import { NextResponse } from 'next/server';

import { randomDelay, shouldBypassDelay } from '@/features/dashboard/api/http-effects';
import {
  API_CACHE_CONTROL_NO_STORE,
  API_ERROR_CACHE_CONTROL_NO_STORE,
  API_ERROR_STATUS_CODE,
  DASHBOARD_API_ERROR_MESSAGES,
} from '@/features/dashboard/constants';
import { dashboardService } from '@/features/dashboard/data/dashboard-service';
import type { StatCardData } from '@/features/dashboard/types';
import { createApiResponse } from '@/shared/utils/api-response';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  if (!shouldBypassDelay(request)) {
    await randomDelay();
  }

  try {
    const statsData = await dashboardService.getStatsResponse();

    return NextResponse.json(statsData, {
      headers: {
        'Cache-Control': API_CACHE_CONTROL_NO_STORE,
      },
    });
  } catch {
    return NextResponse.json(
      createApiResponse<StatCardData[]>([], {
        error: DASHBOARD_API_ERROR_MESSAGES.dashboardData,
      }),
      {
        status: API_ERROR_STATUS_CODE,
        headers: {
          'Cache-Control': API_ERROR_CACHE_CONTROL_NO_STORE,
        },
      },
    );
  }
}
