import * as React from "react";
import { classNames } from "../../utils/classNames";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
  size?: "sm" | "md";
};

export function Button({
  className,
  variant = "ghost",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={classNames(
        "ds-button",
        `ds-button--${variant}`,
        `ds-button--${size}`,
        className,
      )}
      {...props}
    />
  );
}
