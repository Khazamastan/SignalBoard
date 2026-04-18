import { NextResponse } from 'next/server';

import { randomDelay, shouldBypassDelay } from '@/features/dashboard/api/http-effects';
import {
  API_CACHE_MAX_AGE_SECONDS,
  API_CACHE_STALE_WHILE_REVALIDATE_SECONDS,
} from '@/features/dashboard/constants';
import { dashboardService } from '@/features/dashboard/data/dashboard-service';

export async function GET(request: Request) {
  if (!shouldBypassDelay(request)) {
    await randomDelay();
  }

  const statsData = await dashboardService.getStatsResponse();

  return NextResponse.json(statsData, {
    headers: {
      'Cache-Control': `public, max-age=${API_CACHE_MAX_AGE_SECONDS}, stale-while-revalidate=${API_CACHE_STALE_WHILE_REVALIDATE_SECONDS}`,
    },
  });
}
