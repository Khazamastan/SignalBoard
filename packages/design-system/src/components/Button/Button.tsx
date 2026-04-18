import * as React from "react";
import { classNames } from "../../utils/classNames";
import styles from "./Button.module.css";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "small" | "medium" | "large";
};

export function Button({
  className,
  variant = "primary",
  size = "medium",
  children,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  const isDisabled = disabled;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={classNames(
        styles.button,
        styles[variant],
        styles[size],
        className,
      )}
      {...props}
    >
      <span className={styles.label}>{children}</span>
    </button>
  );
}
