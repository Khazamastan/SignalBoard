import { NextResponse } from 'next/server';

import { randomDelay, shouldBypassDelay } from '@/features/dashboard/api/http-effects';
import { API_CACHE_MAX_AGE_SECONDS } from '@/features/dashboard/constants';
import { parseUsersSearchParams } from '@/features/dashboard/api/query-parsers';
import { dashboardService } from '@/features/dashboard/data/dashboard-service';

export async function GET(request: import('next/server').NextRequest) {
  const query = parseUsersSearchParams(request.nextUrl.searchParams);

  if (!shouldBypassDelay(request)) {
    await randomDelay();
  }

  const result = await dashboardService.getUsersPageResponse(query);

  return NextResponse.json(result, {
    headers: {
      'Cache-Control': `public, max-age=${Math.max(10, Math.floor(API_CACHE_MAX_AGE_SECONDS / 2))}, stale-while-revalidate=60`,
    },
  });
}
