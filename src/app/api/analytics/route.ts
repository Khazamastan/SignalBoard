import { NextResponse } from 'next/server';

import { randomDelay, shouldBypassDelay } from '@/features/dashboard/api/http-effects';
import {
  API_CACHE_MAX_AGE_SECONDS,
  API_CACHE_STALE_WHILE_REVALIDATE_SECONDS,
} from '@/features/dashboard/constants';
import { parseRangeKey } from '@/features/dashboard/api/query-parsers';
import { dashboardService } from '@/features/dashboard/data/dashboard-service';
import type { AnalyticsSeries } from '@/features/dashboard/types';
import { createApiResponse } from '@/shared/utils/api-response';

const ANALYTICS_FALLBACK_ERROR_MESSAGE = 'Unable to load dashboard data.';

export async function GET(request: Request) {
  const cacheControlValue = `public, max-age=${API_CACHE_MAX_AGE_SECONDS}, stale-while-revalidate=${API_CACHE_STALE_WHILE_REVALIDATE_SECONDS}`;
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
          'Cache-Control': cacheControlValue,
        },
      },
    );
  }
}
