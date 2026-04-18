import * as React from "react";
import { classNames } from "../../utils/classNames";
import styles from "./Card.module.css";

type CardTone = "default" | "muted" | "inverse";

export type CardProps = Omit<React.HTMLAttributes<HTMLElement>, "children"> & {
  as?: React.ElementType;
  variant?: "default" | "elevated";
  hoverable?: boolean;
  stretch?: boolean;
  header?: React.ReactNode;
  children?: React.ReactNode;
  tone?: CardTone;
};

const VARIANT_CLASS: Record<NonNullable<CardProps["variant"]>, string> = {
  default: styles.variantDefault,
  elevated: styles.variantElevated,
};

const TONE_CLASS: Record<CardTone, string | undefined> = {
  default: undefined,
  muted: styles.toneMuted,
  inverse: styles.toneInverse,
};

export function Card({
  as = "section",
  className,
  variant = "default",
  hoverable = false,
  stretch = false,
  header,
  children,
  tone = "default",
  ...props
}: CardProps) {
  const Component = as as React.ElementType;

  const hasHeader = header !== undefined && header !== null;
  const hasBody = children !== undefined && children !== null;

  return (
    <Component
      className={classNames(
        styles.card,
        VARIANT_CLASS[variant],
        TONE_CLASS[tone],
        hoverable && styles.hoverable,
        stretch && styles.stretch,
        className,
      )}
      {...props}
    >
      {hasHeader ? <div className={styles.header}>{header}</div> : null}

      {hasBody ? <div className={styles.body}>{children}</div> : null}
    </Component>
  );
}
