import { NextResponse } from 'next/server';

import { randomDelay, shouldBypassDelay } from '@/features/dashboard/api/http-effects';
import { parseRangeKey } from '@/features/dashboard/api/query-parsers';
import { dashboardService } from '@/features/dashboard/data/dashboard-service';
import type { AnalyticsSeries } from '@/features/dashboard/types';
import { createApiResponse } from '@/shared/utils/api-response';

const ANALYTICS_FALLBACK_ERROR_MESSAGE = 'Unable to load dashboard data.';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const cacheControlValue = 'private, no-store, max-age=0';
  const errorCacheControlValue = 'no-store, max-age=0';
  const url = new URL(request.url);
  const range = parseRangeKey(url.searchParams.get('range'));

  if (!shouldBypassDelay(request)) {
    await randomDelay();
  }

  try {
    const analyticsData = await dashboardService.getAnalyticsResponse(range);

    return NextResponse.json(analyticsData, {
      headers: {
        'Cache-Control': cacheControlValue,
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
          error: ANALYTICS_FALLBACK_ERROR_MESSAGE,
        },
      ),
      {
        status: 500,
        headers: {
          'Cache-Control': errorCacheControlValue,
        },
      },
    );
  }
}
