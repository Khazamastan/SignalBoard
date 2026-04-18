import * as React from "react";
import { classNames } from "../../utils/classNames";
import styles from "./Button.module.css";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
};

export function Button({
  className,
  variant = "primary",
  size = "medium",
  loading = false,
  leadingIcon,
  trailingIcon,
  children,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={classNames(
        styles.button,
        styles[variant],
        styles[size],
        loading && styles.loading,
        className,
      )}
      {...props}
    >
      {loading ? (
        <>
          <span className={styles.spinner} aria-hidden="true" />
          <span className={styles.srOnly}>{children}</span>
        </>
      ) : (
        <>
          {leadingIcon ? (
            <span className={styles.icon} aria-hidden="true">
              {leadingIcon}
            </span>
          ) : null}
          <span className={styles.label}>{children}</span>
          {trailingIcon ? (
            <span className={styles.icon} aria-hidden="true">
              {trailingIcon}
            </span>
          ) : null}
        </>
      )}
    </button>
  );
}
