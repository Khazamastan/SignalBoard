import { NextResponse } from 'next/server';

import { randomDelay, shouldBypassDelay } from '@/features/dashboard/api/http-effects';
import {
  API_CACHE_MAX_AGE_SECONDS,
  API_CACHE_STALE_WHILE_REVALIDATE_SECONDS,
} from '@/features/dashboard/constants';
import { dashboardService } from '@/features/dashboard/data/dashboard-service';
import type { StatCardData } from '@/features/dashboard/types';
import { createApiResponse } from '@/shared/utils/api-response';

const STATS_FALLBACK_ERROR_MESSAGE = 'Unable to load dashboard data.';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const cacheControlValue = `public, max-age=${API_CACHE_MAX_AGE_SECONDS}, stale-while-revalidate=${API_CACHE_STALE_WHILE_REVALIDATE_SECONDS}`;

  if (!shouldBypassDelay(request)) {
    await randomDelay();
  }

  try {
    const statsData = await dashboardService.getStatsResponse();

    return NextResponse.json(statsData, {
      headers: {
        'Cache-Control': cacheControlValue,
      },
    });
  } catch {
    return NextResponse.json(
      createApiResponse<StatCardData[]>([], {
        error: STATS_FALLBACK_ERROR_MESSAGE,
      }),
      {
        status: 500,
        headers: {
          'Cache-Control': cacheControlValue,
        },
      },
    );
  }
}
