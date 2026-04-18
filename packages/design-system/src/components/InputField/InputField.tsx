import * as React from "react";
import { classNames } from "../../utils/classNames";

export type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement>;

export function InputField({ className, ...props }: InputFieldProps) {
  return <input className={classNames("ds-input", className)} {...props} />;
}
