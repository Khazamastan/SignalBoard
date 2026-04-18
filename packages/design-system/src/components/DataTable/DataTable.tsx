import * as React from "react";
import { classNames } from "../../utils/classNames";

export type DataTableProps = React.TableHTMLAttributes<HTMLTableElement> & {
  sticky?: boolean;
};

export function DataTable({
  className,
  sticky = true,
  ...props
}: DataTableProps) {
  return (
    <div className="ds-tableWrap">
      <table
        className={classNames(
          "ds-table",
          sticky && "ds-table--sticky",
          className,
        )}
        {...props}
      />
    </div>
  );
}
