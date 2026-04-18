const INTEGER_PATTERN = /^-?\d+$/;

export const parseNumberOrFallback = (value: string | null, fallback: number): number => {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const parseIntegerOrFallback = (value: string | null, fallback: number): number => {
  if (!value) {
    return fallback;
  }

  const normalizedValue = value.trim();

  if (!INTEGER_PATTERN.test(normalizedValue)) {
    return fallback;
  }

  const parsed = Number(normalizedValue);
  return Number.isInteger(parsed) ? parsed : fallback;
};

export const parsePositiveNumberOrFallback = (value: string | null, fallback: number): number => {
  const parsed = parseNumberOrFallback(value, fallback);
  return parsed > 0 ? parsed : fallback;
};

export const parsePositiveIntegerOrFallback = (value: string | null, fallback: number): number => {
  const parsed = parseIntegerOrFallback(value, fallback);
  return parsed > 0 ? parsed : fallback;
};
