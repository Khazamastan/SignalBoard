export const parseNumberOrFallback = (value: string | null, fallback: number): number => {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const parsePositiveNumberOrFallback = (value: string | null, fallback: number): number => {
  const parsed = parseNumberOrFallback(value, fallback);
  return parsed > 0 ? parsed : fallback;
};
