import { NextResponse } from 'next/server';

import { randomDelay, shouldBypassDelay } from '@/features/dashboard/api/http-effects';
import { parseUsersSearchParams } from '@/features/dashboard/api/query-parsers';
import {
  API_SUCCESS_CACHE_CONTROL,
  API_ERROR_CACHE_CONTROL_NO_STORE,
  API_ERROR_STATUS_CODE,
  USERS_PAGINATION_FALLBACK_TOTAL_ITEMS,
  USERS_PAGINATION_FALLBACK_TOTAL_PAGES,
} from '@/features/dashboard/constants';
import { dashboardService } from '@/features/dashboard/data/dashboard-service';
import { t } from '@/shared/i18n';
import type { UserRow } from '@/features/dashboard/types';
import { createApiResponse } from '@/shared/utils/api-response';

export const dynamic = 'force-dynamic';

export async function GET(request: import('next/server').NextRequest) {
  const query = parseUsersSearchParams(request.nextUrl.searchParams);
  const { page } = query;

  if (!shouldBypassDelay(request)) {
    await randomDelay();
  }

  try {
    const result = await dashboardService.getUsersPageResponse(query);

    return NextResponse.json(result, {
      headers: {
        'Cache-Control': API_SUCCESS_CACHE_CONTROL,
      },
    });
  } catch {
    return NextResponse.json(
      createApiResponse<UserRow[]>(
        [],
        {
          meta: {
            page,
            totalPages: USERS_PAGINATION_FALLBACK_TOTAL_PAGES,
            totalItems: USERS_PAGINATION_FALLBACK_TOTAL_ITEMS,
          },
          error: t('api.error.users'),
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
