import * as React from "react";
import { classNames } from "../../utils/classNames";
import styles from "./Badge.module.css";

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "neutral" | "success" | "warning" | "error" | "info";
};

const TONE_CLASS: Record<NonNullable<BadgeProps["tone"]>, string> = {
  neutral: styles.toneNeutral,
  success: styles.toneSuccess,
  warning: styles.toneWarning,
  error: styles.toneError,
  info: styles.toneInfo,
};

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={classNames(styles.badge, TONE_CLASS[tone], className)}
      {...props}
    />
  );
}
