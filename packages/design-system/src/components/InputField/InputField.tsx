import * as React from "react";
import { SearchIcon } from "../../icons";
import { classNames } from "../../utils/classNames";
import { resolveInputFieldMeta, resolveInputId } from "./utils";
import styles from "./InputField.module.css";

const INPUT_FIELD_DEFAULT_SEARCH_PLACEHOLDER = "Search dashboard";
const INPUT_FIELD_DEFAULT_SEARCH_ICON_SIZE = 24;

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
};

export function InputField({
  id,
  className,
  label,
  error,
  helperText,
  counter,
  prefix,
  suffix,
  "aria-label": ariaLabel,
  disabled,
  readOnly,
  placeholder,
  ...props
}: InputFieldProps) {
  const reactId = React.useId().replace(/:/g, "");
  const inputId = resolveInputId(id, label, reactId);

  const { hasCounter, helperId, errorId, counterId, describedBy } =
    resolveInputFieldMeta({
      helperText,
      error,
      counter,
      inputId,
    });
  const resolvedPrefix =
    prefix ?? <SearchIcon size={INPUT_FIELD_DEFAULT_SEARCH_ICON_SIZE} />;
  const resolvedAriaLabel = ariaLabel ?? label ?? INPUT_FIELD_DEFAULT_SEARCH_PLACEHOLDER;
  const resolvedPlaceholder = placeholder ?? INPUT_FIELD_DEFAULT_SEARCH_PLACEHOLDER;

  return (
    <div
      className={classNames(
        styles.field,
        disabled && styles.disabled,
        readOnly && styles.readOnly,
        !!error && styles.hasError,
        className,
      )}
    >
      {label ? (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      ) : null}

      <div className={styles.control}>
        {resolvedPrefix ? (
          <span className={classNames(styles.affix, styles.affixPrefix)}>
            {resolvedPrefix}
          </span>
        ) : null}

        <div className={styles.inputWrap}>
          <input
            id={inputId}
            disabled={disabled}
            readOnly={readOnly}
            placeholder={resolvedPlaceholder}
            aria-label={resolvedAriaLabel}
            aria-invalid={!!error || undefined}
            aria-describedby={describedBy}
            className={styles.input}
            {...props}
          />
        </div>

        {suffix ? (
          <span className={classNames(styles.affix, styles.affixSuffix)}>
            {suffix}
          </span>
        ) : null}
      </div>

      {helperText || error || hasCounter ? (
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
