"use client";

import * as React from "react";
import { ArrowDownIcon, ArrowUpIcon, SortIcon } from "../../icons";
import { classNames } from "../../utils/classNames";
import styles from "./DataTable.module.css";

export type DataTableSortDirection = "asc" | "desc";

export type DataTableSortState<TSortKey extends string = string> = {
  key: TSortKey;
  direction: DataTableSortDirection;
} | null;

type DataTableColumnBase<TRow extends Record<string, unknown>> = {
  id: string;
  header: React.ReactNode;
  accessor?: keyof TRow;
  cell?: (row: TRow, rowIndex: number) => React.ReactNode;
  width?: string;
  align?: "left" | "center" | "right";
  headerClassName?: string;
  cellClassName?: string;
};

export type SortableDataTableColumn<
  TRow extends Record<string, unknown>,
  TSortKey extends string,
> = DataTableColumnBase<TRow> & {
  sortable: true;
  sortKey: TSortKey;
};

export type NonSortableDataTableColumn<TRow extends Record<string, unknown>> =
  DataTableColumnBase<TRow> & {
    sortable?: false;
    sortKey?: never;
  };

export type DataTableColumn<
  TRow extends Record<string, unknown>,
  TSortKey extends string = string,
> =
  | SortableDataTableColumn<TRow, TSortKey>
  | NonSortableDataTableColumn<TRow>;

type DataTableSharedProps = {
  stickyHeader?: boolean;
  stickyFirstColumn?: boolean;
  title?: React.ReactNode;
  actions?: React.ReactNode;
  maxBodyHeight?: number | string;
  containerClassName?: string;
  emptyMessage?: React.ReactNode;
  errorMessage?: React.ReactNode;
  virtualization?: {
    enabled?: boolean;
    threshold?: number;
    rowHeight?: number;
    overscan?: number;
  };
};

export type DataTableGenericProps<
  TRow extends Record<string, unknown>,
  TSortKey extends string = string,
> = DataTableSharedProps & {
  columns: Array<DataTableColumn<TRow, TSortKey>>;
  rows: TRow[];
  getRowId?: (row: TRow, rowIndex: number) => React.Key;
  sort?: DataTableSortState<TSortKey>;
  onSortChange?: (next: DataTableSortState<TSortKey>) => void;
  loading?: boolean;
  skeletonRowCount?: number;
  className?: string;
  rowClassName?: (row: TRow, rowIndex: number) => string | undefined;
  caption?: React.ReactNode;
  children?: never;
};

export type DataTableLegacyProps = DataTableSharedProps &
  Omit<React.TableHTMLAttributes<HTMLTableElement>, "title"> & {
    sticky?: boolean;
    className?: string;
    columns?: never;
    rows?: never;
    loading?: never;
    skeletonRowCount?: never;
    sort?: never;
    onSortChange?: never;
    rowClassName?: never;
    caption?: React.ReactNode;
  };

export type DataTableProps<
  TRow extends Record<string, unknown> = Record<string, unknown>,
  TSortKey extends string = string,
> = DataTableGenericProps<TRow, TSortKey> | DataTableLegacyProps;

function isGenericProps<
  TRow extends Record<string, unknown>,
  TSortKey extends string,
>(
  props: DataTableProps<TRow, TSortKey>,
): props is DataTableGenericProps<TRow, TSortKey> {
  return "columns" in props && "rows" in props;
}

function toCssSize(value: number | string | undefined): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  return typeof value === "number" ? `${value}px` : value;
}

function getAlignClass(align: "left" | "center" | "right" | undefined): string {
  if (align === "center") {
    return styles.alignCenter;
  }

  if (align === "right") {
    return styles.alignRight;
  }

  return styles.alignLeft;
}

function renderSortIcon(direction: DataTableSortDirection | undefined) {
  if (direction === "asc") {
    return <ArrowUpIcon size={16} />;
  }

  if (direction === "desc") {
    return <ArrowDownIcon size={16} />;
  }

  return <SortIcon size={16} />;
}

function nextSortState<TSortKey extends string>(
  current: DataTableSortState<TSortKey>,
  key: TSortKey,
): DataTableSortState<TSortKey> {
  if (!current || current.key !== key) {
    return { key, direction: "asc" };
  }

  if (current.direction === "asc") {
    return { key, direction: "desc" };
  }

  return null;
}

function resolveCellValue<TRow extends Record<string, unknown>>(
  column: DataTableColumn<TRow, string>,
  row: TRow,
  rowIndex: number,
): React.ReactNode {
  if (column.cell) {
    return column.cell(row, rowIndex);
  }

  if (column.accessor !== undefined) {
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
  }

  return null;
}

function DataTableLegacy(props: DataTableLegacyProps) {
  const {
    className,
    sticky = true,
    stickyHeader,
    stickyFirstColumn = false,
    title,
    actions,
    maxBodyHeight,
    containerClassName,
    caption,
    ...tableProps
  } = props;

  const hasTopRow = title !== undefined || actions !== undefined;

  return (
    <section className={classNames(styles.root, containerClassName)}>
      {hasTopRow ? (
        <header className={styles.topRow}>
          <div className={styles.title}>{title}</div>
          <div className={styles.actions}>{actions}</div>
        </header>
      ) : null}

      <div
        className={styles.viewport}
        style={
          maxBodyHeight !== undefined
            ? {
                maxHeight: toCssSize(maxBodyHeight),
                minHeight: toCssSize(maxBodyHeight),
              }
            : undefined
        }
      >
        <table
          className={classNames(
            styles.table,
            (stickyHeader ?? sticky) && styles.stickyHeader,
            stickyFirstColumn && styles.stickyFirstColumn,
            className,
          )}
          {...tableProps}
        >
          {caption ? <caption className={styles.caption}>{caption}</caption> : null}
          {tableProps.children}
        </table>
      </div>
    </section>
  );
}

function DataTableGenericImpl<
  TRow extends Record<string, unknown>,
  TSortKey extends string = string,
>(props: DataTableGenericProps<TRow, TSortKey>) {

  const {
    columns,
    rows,
    getRowId,
    sort = null,
    onSortChange,
    loading = false,
    skeletonRowCount = 6,
    stickyHeader = true,
    stickyFirstColumn = false,
    title,
    actions,
    maxBodyHeight,
    emptyMessage = "No data available.",
    errorMessage,
    className,
    containerClassName,
    rowClassName,
    caption,
    virtualization,
  } = props;

  const hasTopRow = title !== undefined || actions !== undefined;
  const hasRows = rows.length > 0;
  const hasErrorMessage =
    errorMessage !== undefined &&
    errorMessage !== null &&
    errorMessage !== false;
  const showSkeletonRows = loading && !hasRows;
  const showLoadingCells = loading && hasRows;
  const showError = !loading && !hasRows && hasErrorMessage;
  const showEmpty = !loading && !hasRows && !hasErrorMessage;
  const viewportRef = React.useRef<HTMLDivElement | null>(null);
  const [virtualScrollTop, setVirtualScrollTop] = React.useState(0);
  const [virtualViewportHeight, setVirtualViewportHeight] = React.useState(0);

  const virtualEnabled = virtualization?.enabled ?? true;
  const virtualThreshold = Math.max(1, virtualization?.threshold ?? 200);
  const virtualRowHeight = Math.max(1, virtualization?.rowHeight ?? 52);
  const virtualOverscan = Math.max(1, virtualization?.overscan ?? 6);
  const shouldVirtualizeRows = virtualEnabled && hasRows && rows.length >= virtualThreshold;

  React.useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport || !shouldVirtualizeRows) {
      setVirtualScrollTop(0);
      setVirtualViewportHeight(0);
      return;
    }

    let animationFrame = 0;

    const syncViewport = () => {
      const nextScrollTop = viewport.scrollTop;
      const nextViewportHeight = viewport.clientHeight;

      setVirtualScrollTop((current) =>
        current === nextScrollTop ? current : nextScrollTop,
      );
      setVirtualViewportHeight((current) =>
        current === nextViewportHeight ? current : nextViewportHeight,
      );
    };

    const onScroll = () => {
      if (animationFrame !== 0) {
        return;
      }

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        syncViewport();
      });
    };

    syncViewport();
    viewport.addEventListener("scroll", onScroll, { passive: true });

    let resizeObserver: ResizeObserver | null = null;
    const onWindowResize = () => {
      syncViewport();
    };

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        syncViewport();
      });
      resizeObserver.observe(viewport);
    } else {
      window.addEventListener("resize", onWindowResize);
    }

    return () => {
      viewport.removeEventListener("scroll", onScroll);

      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
      }

      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener("resize", onWindowResize);
      }
    };
  }, [shouldVirtualizeRows]);

  const rowWindow = React.useMemo(() => {
    if (!shouldVirtualizeRows) {
      return {
        startIndex: 0,
        endIndex: rows.length,
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
      rows.length,
      startIndex + estimatedVisibleCount + virtualOverscan * 2,
    );
    const topSpacerHeight = startIndex * virtualRowHeight;
    const bottomSpacerHeight = Math.max(
      0,
      (rows.length - endIndex) * virtualRowHeight,
    );

    return {
      startIndex,
      endIndex,
      topSpacerHeight,
      bottomSpacerHeight,
    };
  }, [
    rows.length,
    shouldVirtualizeRows,
    virtualOverscan,
    virtualRowHeight,
    virtualScrollTop,
    virtualViewportHeight,
  ]);

  const visibleRows = React.useMemo(() => {
    if (!shouldVirtualizeRows) {
      return rows;
    }

    return rows.slice(rowWindow.startIndex, rowWindow.endIndex);
  }, [rows, shouldVirtualizeRows, rowWindow.endIndex, rowWindow.startIndex]);

  const resolveRowId =
    getRowId ??
    ((_: TRow, rowIndex: number) => {
      return rowIndex;
    });

  return (
    <section className={classNames(styles.root, containerClassName)}>
      {hasTopRow ? (
        <header className={styles.topRow}>
          <div className={styles.title}>{title}</div>
          <div className={styles.actions}>{actions}</div>
        </header>
      ) : null}

      <div
        ref={viewportRef}
        className={styles.viewport}
        style={
          maxBodyHeight !== undefined
            ? {
                maxHeight: toCssSize(maxBodyHeight),
                minHeight: toCssSize(maxBodyHeight),
              }
            : undefined
        }
      >
        <table
          className={classNames(
            styles.table,
            stickyHeader && styles.stickyHeader,
            stickyFirstColumn && styles.stickyFirstColumn,
            className,
          )}
        >
          {caption ? <caption className={styles.caption}>{caption}</caption> : null}

          <thead>
            <tr>
              {columns.map((column, columnIndex) => {
                const isSortable = column.sortable === true;
                const isSorted =
                  isSortable && sort !== null && sort.key === column.sortKey;
                const sortDirection = isSorted ? sort.direction : undefined;
                const ariaSort =
                  isSortable && isSorted
                    ? sortDirection === "asc"
                      ? "ascending"
                      : "descending"
                    : isSortable
                      ? "none"
                      : undefined;

                return (
                  <th
                    key={column.id}
                    scope="col"
                    aria-sort={ariaSort}
                    className={classNames(
                      styles.headCell,
                      getAlignClass(column.align),
                      stickyFirstColumn && columnIndex === 0 && styles.firstSticky,
                      column.headerClassName,
                    )}
                    style={column.width ? { width: column.width } : undefined}
                  >
                    {isSortable ? (
                      <button
                        type="button"
                        className={styles.sortButton}
                        onClick={() =>
                          onSortChange?.(
                            nextSortState(
                              sort,
                              column.sortKey as TSortKey,
                            ),
                          )
                        }
                      >
                        <span className={styles.headLabel}>{column.header}</span>
                        <span className={styles.sortIcon} aria-hidden="true">
                          {renderSortIcon(sortDirection)}
                        </span>
                      </button>
                    ) : (
                      <span className={styles.headLabel}>{column.header}</span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {shouldVirtualizeRows && rowWindow.topSpacerHeight > 0 ? (
              <tr className={styles.virtualSpacerRow} aria-hidden>
                <td className={styles.virtualSpacerCell} colSpan={columns.length}>
                  <div
                    className={styles.virtualSpacerInner}
                    style={{ height: `${rowWindow.topSpacerHeight}px` }}
                  />
                </td>
              </tr>
            ) : null}

            {showSkeletonRows
              ? Array.from({ length: skeletonRowCount }).map((_, rowIndex) => (
                  <tr
                    key={`skeleton-${rowIndex}`}
                    className={classNames(
                      styles.row,
                      styles.rowBase,
                      styles.rowStatic,
                      styles.rowSkeleton,
                    )}
                  >
                    {columns.map((column, columnIndex) => (
                      <td
                        key={`${column.id}-${rowIndex}`}
                        className={classNames(
                          styles.cell,
                          getAlignClass(column.align),
                          stickyFirstColumn &&
                            columnIndex === 0 &&
                            styles.firstSticky,
                        )}
                      >
                        <span className={styles.skeleton} aria-hidden />
                      </td>
                    ))}
                  </tr>
                ))
              : null}

            {showError ? (
              <tr
                className={classNames(
                  styles.row,
                  styles.rowBase,
                  styles.rowStatic,
                  styles.stateRow,
                )}
              >
                <td className={styles.errorMessage} colSpan={columns.length}>
                  <div className={styles.stateText}>{errorMessage}</div>
                </td>
              </tr>
            ) : null}

            {showEmpty ? (
              <tr
                className={classNames(
                  styles.row,
                  styles.rowBase,
                  styles.rowStatic,
                  styles.stateRow,
                )}
              >
                <td className={styles.emptyMessage} colSpan={columns.length}>
                  <div className={styles.stateText}>{emptyMessage}</div>
                </td>
              </tr>
            ) : null}

            {hasRows
              ? visibleRows.map((row, rowIndex) => {
                  const resolvedRowIndex = shouldVirtualizeRows
                    ? rowWindow.startIndex + rowIndex
                    : rowIndex;
                  const rowKey = resolveRowId(row, resolvedRowIndex);

                  return (
                    <tr
                      key={rowKey}
                      style={
                        shouldVirtualizeRows
                          ? { height: `${virtualRowHeight}px` }
                          : undefined
                      }
                      className={classNames(
                        styles.row,
                        styles.rowBase,
                        resolvedRowIndex % 2 === 0 && styles.rowAlt,
                        styles.rowInteractive,
                        rowClassName?.(row, resolvedRowIndex),
                      )}
                    >
                      {columns.map((column, columnIndex) => (
                        <td
                          key={`${column.id}-${String(rowKey)}`}
                          className={classNames(
                            styles.cell,
                            getAlignClass(column.align),
                            stickyFirstColumn &&
                              columnIndex === 0 &&
                              styles.firstSticky,
                            showLoadingCells && styles.loadingDataCell,
                            column.cellClassName,
                          )}
                          style={column.width ? { width: column.width } : undefined}
                        >
                          <span className={styles.cellContent}>
                            {resolveCellValue(
                              column as DataTableColumn<TRow, string>,
                              row,
                              resolvedRowIndex,
                            )}
                          </span>
                        </td>
                      ))}
                    </tr>
                  );
                })
              : null}

            {shouldVirtualizeRows && rowWindow.bottomSpacerHeight > 0 ? (
              <tr className={styles.virtualSpacerRow} aria-hidden>
                <td className={styles.virtualSpacerCell} colSpan={columns.length}>
                  <div
                    className={styles.virtualSpacerInner}
                    style={{ height: `${rowWindow.bottomSpacerHeight}px` }}
                  />
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function DataTable<
  TRow extends Record<string, unknown>,
  TSortKey extends string = string,
>(props: DataTableProps<TRow, TSortKey>) {
  if (!isGenericProps(props)) {
    return <DataTableLegacy {...props} />;
  }

  return <DataTableGenericImpl {...props} />;
}
