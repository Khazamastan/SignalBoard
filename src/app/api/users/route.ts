import { NextResponse } from 'next/server';

import { randomDelay, shouldBypassDelay } from '@/features/dashboard/api/http-effects';
import { parseUsersSearchParams } from '@/features/dashboard/api/query-parsers';
import { dashboardService } from '@/features/dashboard/data/dashboard-service';
import type { UserRow } from '@/features/dashboard/types';
import { createApiResponse } from '@/shared/utils/api-response';

const USERS_FALLBACK_ERROR_MESSAGE = 'Unable to fetch users.';
export const dynamic = 'force-dynamic';

export async function GET(request: import('next/server').NextRequest) {
  const cacheControlValue = 'private, no-store, max-age=0';
  const errorCacheControlValue = 'no-store, max-age=0';
  const query = parseUsersSearchParams(request.nextUrl.searchParams);

  if (!shouldBypassDelay(request)) {
    await randomDelay();
  }

  try {
    const result = await dashboardService.getUsersPageResponse(query);

    return NextResponse.json(result, {
      headers: {
        'Cache-Control': cacheControlValue,
      },
    });
  } catch {
    return NextResponse.json(
      createApiResponse<UserRow[]>(
        [],
        {
          meta: {
            page: query.page,
            totalPages: 1,
            totalItems: 0,
          },
          error: USERS_FALLBACK_ERROR_MESSAGE,
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
