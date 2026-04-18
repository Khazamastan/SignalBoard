import * as React from "react";
import { classNames } from "../../utils/classNames";

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "neutral" | "success" | "warning" | "error" | "info";
};

export function Badge({
  className,
  tone = "neutral",
  ...props
}: BadgeProps) {
  return (
    <span
      className={classNames("ds-badge", `ds-badge--${tone}`, className)}
      {...props}
    />
  );
}
