"use client";

import * as React from "react";
import { classNames } from "../../utils/classNames";
import styles from "./InputField.module.css";

export type InputFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "prefix"
> & {
  label?: string;
  error?: React.ReactNode;
  helperText?: React.ReactNode;
  counter?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  hideMeta?: boolean;
  floatingLabel?: boolean;
};

function normalizeIdSeed(label?: string): string {
  if (!label) {
    return "input-field";
  }

  const normalized = label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || "input-field";
}

export function InputField({
  id,
  className,
  label,
  error,
  helperText,
  counter,
  prefix,
  suffix,
  hideMeta = false,
  floatingLabel = false,
  value,
  defaultValue,
  disabled,
  readOnly,
  onChange,
  onFocus,
  onBlur,
  ...props
}: InputFieldProps) {
  const reactId = React.useId().replace(/:/g, "");
  const generatedId = `${normalizeIdSeed(label)}-${reactId}`;
  const inputId = id ?? generatedId;

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState<string>(() => {
    if (defaultValue === undefined || defaultValue === null) {
      return "";
    }
    return String(defaultValue);
  });
  const [isFocused, setIsFocused] = React.useState(false);

  const currentValue = isControlled
    ? value === undefined || value === null
      ? ""
      : String(value)
    : internalValue;
  const hasValue = currentValue.length > 0;
  const valueProps = isControlled ? { value } : { defaultValue };

  const showMeta = !hideMeta;
  const hasCounter = counter !== undefined && counter !== null && counter !== false;
  const helperId = showMeta && helperText ? `${inputId}-helper` : undefined;
  const errorId = showMeta && error ? `${inputId}-error` : undefined;
  const counterId = showMeta && hasCounter ? `${inputId}-counter` : undefined;
  const describedBy = [helperId, errorId, counterId].filter(Boolean).join(" ") || undefined;

  return (
    <div
      className={classNames(
        styles.field,
        floatingLabel && styles.floating,
        (isFocused || hasValue) && styles.floatActive,
        disabled && styles.disabled,
        readOnly && styles.readOnly,
        !!error && styles.hasError,
        className,
      )}
    >
      {label && !floatingLabel ? (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      ) : null}

      <div className={styles.control}>
        {prefix ? (
          <span className={classNames(styles.affix, styles.affixPrefix)}>
            {prefix}
          </span>
        ) : null}

        <div className={styles.inputWrap}>
          {label && floatingLabel ? (
            <label htmlFor={inputId} className={styles.floatingLabel}>
              {label}
            </label>
          ) : null}

          <input
            id={inputId}
            disabled={disabled}
            readOnly={readOnly}
            aria-invalid={!!error || undefined}
            aria-describedby={describedBy}
            className={classNames(
              styles.input,
              floatingLabel && styles.inputFloating,
            )}
            onChange={(event) => {
              if (!isControlled) {
                setInternalValue(event.target.value);
              }
              onChange?.(event);
            }}
            onFocus={(event) => {
              setIsFocused(true);
              onFocus?.(event);
            }}
            onBlur={(event) => {
              setIsFocused(false);
              onBlur?.(event);
            }}
            {...props}
            {...valueProps}
          />
        </div>

        {suffix ? (
          <span className={classNames(styles.affix, styles.affixSuffix)}>
            {suffix}
          </span>
        ) : null}
      </div>

      {showMeta && (helperText || error || hasCounter) ? (
        <div className={styles.meta}>
          <div className={styles.metaStart}>
            {error ? (
              <p id={errorId} className={styles.error}>
                {error}
              </p>
            ) : helperText ? (
              <p id={helperId} className={styles.helperText}>
                {helperText}
              </p>
            ) : null}
          </div>
          {hasCounter ? (
            <p id={counterId} className={styles.counter}>
              {counter}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
