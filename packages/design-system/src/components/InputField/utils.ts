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
  showMeta: boolean;
  helperText: ReactNode;
  error: ReactNode;
  counter: ReactNode;
  inputId: string;
};

export const resolveInputFieldMeta = ({
  showMeta,
  helperText,
  error,
  counter,
  inputId,
}: ResolveInputFieldMetaOptions) => {
  const hasCounter = hasRenderableNode(counter);
  const helperId = showMeta && hasRenderableNode(helperText) ? `${inputId}-helper` : undefined;
  const errorId = showMeta && hasRenderableNode(error) ? `${inputId}-error` : undefined;
  const counterId = showMeta && hasCounter ? `${inputId}-counter` : undefined;
  const describedBy = [helperId, errorId, counterId].filter(Boolean).join(" ") || undefined;

  return {
    hasCounter,
    helperId,
    errorId,
    counterId,
    describedBy,
  };
};

export const resolveInputPlaceholder = (
  floatingLabel: boolean,
  placeholder: string | undefined,
): string | undefined => (floatingLabel ? placeholder ?? " " : placeholder);
