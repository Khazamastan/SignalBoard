import { NextResponse } from 'next/server';

import { randomDelay, shouldBypassDelay } from '@/features/dashboard/api/http-effects';
import {
  API_SUCCESS_CACHE_CONTROL,
  API_ERROR_CACHE_CONTROL_NO_STORE,
  API_ERROR_STATUS_CODE,
} from '@/features/dashboard/constants';
import { dashboardService } from '@/features/dashboard/data/dashboard-service';
import { t } from '@/shared/i18n';
import type { StatCardData } from '@/features/dashboard/types';
import { createApiResponse } from '@/shared/utils/api-response';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  if (!shouldBypassDelay(request)) {
    await randomDelay();
  }

  try {
    const data = await dashboardService.getStatsResponse();

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': API_SUCCESS_CACHE_CONTROL,
      },
    });
  } catch {
    return NextResponse.json(
      createApiResponse<StatCardData[]>([], {
        error: t('api.error.dashboardData'),
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
