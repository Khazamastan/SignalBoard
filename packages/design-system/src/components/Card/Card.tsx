import * as React from "react";
import { classNames } from "../../utils/classNames";

export type CardProps = React.HTMLAttributes<HTMLElement> & {
  as?: React.ElementType;
  tone?: "default" | "muted" | "inverse";
};

export function Card({
  as = "section",
  className,
  tone = "default",
  ...props
}: CardProps) {
  const Component = as as React.ElementType;

  return (
    <Component
      className={classNames("ds-card", `ds-card--${tone}`, className)}
      {...props}
    />
  );
}
