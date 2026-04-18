import { NextResponse } from 'next/server';

import { randomDelay, shouldBypassDelay } from '@/features/dashboard/api/http-effects';
import { dashboardService } from '@/features/dashboard/data/dashboard-service';
import type { StatCardData } from '@/features/dashboard/types';
import { createApiResponse } from '@/shared/utils/api-response';

const STATS_FALLBACK_ERROR_MESSAGE = 'Unable to load dashboard data.';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const cacheControlValue = 'private, no-store, max-age=0';
  const errorCacheControlValue = 'no-store, max-age=0';

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
          'Cache-Control': errorCacheControlValue,
        },
      },
    );
  }
}
