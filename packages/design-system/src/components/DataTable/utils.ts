import * as React from "react";

type DataTableSortDirection = "asc" | "desc";
type DataTableSortState<TSortKey extends string = string> = {
  key: TSortKey;
  direction: DataTableSortDirection;
} | null;

type DataTableCellColumn<TRow extends Record<string, unknown>> = {
  accessor?: keyof TRow;
  cell?: (row: TRow, rowIndex: number) => React.ReactNode;
};

type ResolveVirtualRowWindowOptions = {
  shouldVirtualizeRows: boolean;
  rowCount: number;
  virtualViewportHeight: number;
  virtualRowHeight: number;
  virtualScrollTop: number;
  virtualOverscan: number;
};

export type VirtualRowWindow = {
  startIndex: number;
  endIndex: number;
  topSpacerHeight: number;
  bottomSpacerHeight: number;
};

export const toCssSize = (value: number | string | undefined): string | undefined => {
  if (value === undefined) {
    return undefined;
  }

  return typeof value === "number" ? `${value}px` : value;
};

export const nextSortState = <TSortKey extends string>(
  current: DataTableSortState<TSortKey>,
  key: TSortKey,
): DataTableSortState<TSortKey> => {
  if (!current || current.key !== key) {
    return { key, direction: "asc" };
  }

  return current.direction === "asc" ? { key, direction: "desc" } : null;
};

export const resolveCellValue = <TRow extends Record<string, unknown>>(
  column: DataTableCellColumn<TRow>,
  row: TRow,
  rowIndex: number,
): React.ReactNode => {
  if (column.cell) {
    return column.cell(row, rowIndex);
  }

  if (column.accessor === undefined) {
    return null;
  }

  const value = row[column.accessor];

  if (
    value === null ||
    value === undefined ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    React.isValidElement(value)
  ) {
    return value as React.ReactNode;
  }

  return String(value);
};

export const resolveDefaultRowId = <TRow extends Record<string, unknown>>(
  row: TRow,
  rowIndex: number,
): React.Key => {
  const candidateId = row.id;

  if (typeof candidateId === "string" || typeof candidateId === "number") {
    return candidateId;
  }

  return rowIndex;
};

export const resolveVirtualRowWindow = ({
  shouldVirtualizeRows,
  rowCount,
  virtualViewportHeight,
  virtualRowHeight,
  virtualScrollTop,
  virtualOverscan,
}: ResolveVirtualRowWindowOptions): VirtualRowWindow => {
  if (!shouldVirtualizeRows) {
    return {
      startIndex: 0,
      endIndex: rowCount,
      topSpacerHeight: 0,
      bottomSpacerHeight: 0,
    };
  }

  const safeViewportHeight =
    virtualViewportHeight > 0 ? virtualViewportHeight : virtualRowHeight * 10;
  const estimatedVisibleCount = Math.max(
    1,
    Math.ceil(safeViewportHeight / virtualRowHeight),
  );
  const startIndex = Math.max(
    0,
    Math.floor(virtualScrollTop / virtualRowHeight) - virtualOverscan,
  );
  const endIndex = Math.min(
    rowCount,
    startIndex + estimatedVisibleCount + virtualOverscan * 2,
  );
  const topSpacerHeight = startIndex * virtualRowHeight;
  const bottomSpacerHeight = Math.max(
    0,
    (rowCount - endIndex) * virtualRowHeight,
  );

  return {
    startIndex,
    endIndex,
    topSpacerHeight,
    bottomSpacerHeight,
  };
};
