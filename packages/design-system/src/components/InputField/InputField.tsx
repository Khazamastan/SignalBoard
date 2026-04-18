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
  disabled,
  readOnly,
  placeholder,
  ...props
}: InputFieldProps) {
  const reactId = React.useId().replace(/:/g, "");
  const generatedId = `${normalizeIdSeed(label)}-${reactId}`;
  const inputId = id ?? generatedId;

  const showMeta = !hideMeta;
  const hasCounter = counter !== undefined && counter !== null && counter !== false;
  const helperId = showMeta && helperText ? `${inputId}-helper` : undefined;
  const errorId = showMeta && error ? `${inputId}-error` : undefined;
  const counterId = showMeta && hasCounter ? `${inputId}-counter` : undefined;
  const describedBy = [helperId, errorId, counterId].filter(Boolean).join(" ") || undefined;
  const resolvedPlaceholder = floatingLabel ? placeholder ?? " " : placeholder;

  return (
    <div
      className={classNames(
        styles.field,
        floatingLabel && styles.floating,
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
          <input
            id={inputId}
            disabled={disabled}
            readOnly={readOnly}
            placeholder={resolvedPlaceholder}
            aria-invalid={!!error || undefined}
            aria-describedby={describedBy}
            className={styles.input}
            {...props}
          />

          {label && floatingLabel ? (
            <label htmlFor={inputId} className={styles.floatingLabel}>
              {label}
            </label>
          ) : null}
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
