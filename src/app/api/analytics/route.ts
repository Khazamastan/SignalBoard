import { NextResponse } from 'next/server';

import { randomDelay, shouldBypassDelay } from '@/features/dashboard/api/http-effects';
import {
  API_CACHE_MAX_AGE_SECONDS,
  API_CACHE_STALE_WHILE_REVALIDATE_SECONDS,
} from '@/features/dashboard/constants';
import { parseRangeKey } from '@/features/dashboard/api/query-parsers';
import { dashboardService } from '@/features/dashboard/data/dashboard-service';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const range = parseRangeKey(url.searchParams.get('range'));

  if (!shouldBypassDelay(request)) {
    await randomDelay();
  }

  const analyticsData = await dashboardService.getAnalyticsResponse(range);

  return NextResponse.json(analyticsData, {
    headers: {
      'Cache-Control': `public, max-age=${API_CACHE_MAX_AGE_SECONDS}, stale-while-revalidate=${API_CACHE_STALE_WHILE_REVALIDATE_SECONDS}`,
    },
  });
}
