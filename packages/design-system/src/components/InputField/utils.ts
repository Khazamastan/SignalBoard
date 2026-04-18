import type { ReactNode } from "react";

const hasRenderableNode = (value: ReactNode): boolean =>
  value !== undefined && value !== null && value !== false;

export const normalizeIdSeed = (label?: string): string => {
  if (!label) {
    return "input-field";
  }

  const normalized = label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || "input-field";
};

export const resolveInputId = (
  id: string | undefined,
  label: string | undefined,
  reactId: string,
): string => id ?? `${normalizeIdSeed(label)}-${reactId}`;

type ResolveInputFieldMetaOptions = {
  helperText: ReactNode;
  error: ReactNode;
  counter: ReactNode;
  inputId: string;
};

export const resolveInputFieldMeta = ({
  helperText,
  error,
  counter,
  inputId,
}: ResolveInputFieldMetaOptions) => {
  const hasCounter = hasRenderableNode(counter);
  const helperId = hasRenderableNode(helperText) ? `${inputId}-helper` : undefined;
  const errorId = hasRenderableNode(error) ? `${inputId}-error` : undefined;
  const counterId = hasCounter ? `${inputId}-counter` : undefined;
  const describedBy = [helperId, errorId, counterId].filter(Boolean).join(" ") || undefined;

  return {
    hasCounter,
    helperId,
    errorId,
    counterId,
    describedBy,
  };
};
