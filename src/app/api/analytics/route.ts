import { NextResponse } from 'next/server';

import { randomDelay, shouldBypassDelay } from '@/features/dashboard/api/http-effects';
import { parseRangeKey } from '@/features/dashboard/api/query-parsers';
import {
  API_CACHE_CONTROL_NO_STORE,
  API_ERROR_CACHE_CONTROL_NO_STORE,
  API_ERROR_STATUS_CODE,
  DASHBOARD_API_QUERY_PARAMS,
} from '@/features/dashboard/constants';
import { dashboardService } from '@/features/dashboard/data/dashboard-service';
import { t } from '@/shared/i18n';
import type { AnalyticsSeries } from '@/features/dashboard/types';
import { createApiResponse } from '@/shared/utils/api-response';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const range = parseRangeKey(url.searchParams.get(DASHBOARD_API_QUERY_PARAMS.range));

  if (!shouldBypassDelay(request)) {
    await randomDelay();
  }

  try {
    const analyticsData = await dashboardService.getAnalyticsResponse(range);

    return NextResponse.json(analyticsData, {
      headers: {
        'Cache-Control': API_CACHE_CONTROL_NO_STORE,
      },
    });
  } catch {
    return NextResponse.json(
      createApiResponse<AnalyticsSeries>(
        {
          range,
          points: [],
        },
        {
          error: t('api.error.dashboardData'),
        },
      ),
      {
        status: API_ERROR_STATUS_CODE,
        headers: {
          'Cache-Control': API_ERROR_CACHE_CONTROL_NO_STORE,
        },
      },
    );
  }
}
