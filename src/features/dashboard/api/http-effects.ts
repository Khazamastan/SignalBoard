import type { NextRequest } from 'next/server';
import { API_DELAY_MAX_MS, API_DELAY_MIN_MS } from '@/features/dashboard/constants';

const isDevelopment = process.env.NODE_ENV === 'development';

export const randomDelay = async (minimum = API_DELAY_MIN_MS, maximum = API_DELAY_MAX_MS): Promise<void> => {
  const duration =
    Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

  await new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export const shouldBypassDelay = (request: Request | NextRequest): boolean => {
  if (!isDevelopment) {
    return true;
  }

  return request.headers.get('x-internal-no-delay') === '1';
};
