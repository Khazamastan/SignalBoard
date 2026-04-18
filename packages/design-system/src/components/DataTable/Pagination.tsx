import { Button } from "../Button/Button";
import { classNames } from "../../utils/classNames";
import styles from "./Pagination.module.css";

const resolveVisiblePageMarkers = (
  currentPage: number,
  totalPages: number,
): number[] => {
  const pages = new Set<number>([1, totalPages, currentPage]);

  for (let page = currentPage - 1; page <= currentPage + 1; page += 1) {
    if (page >= 1 && page <= totalPages) {
      pages.add(page);
    }
  }

  return [...pages].sort((first, second) => first - second);
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  ariaLabel?: string;
  pageLabel?: string;
  ofLabel?: string;
  itemsLabel?: string;
  itemsPerPageLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
  goToPageLabelPrefix?: string;
  pageSizeSelectorAriaLabel?: string;
  isLoading?: boolean;
  onChangePage: (page: number) => void;
  onChangePageSize?: (pageSize: number) => void;
};

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  pageSizeOptions,
  ariaLabel = "Pagination",
  pageLabel = "Page",
  ofLabel = "of",
  itemsLabel = "items",
  itemsPerPageLabel = "Items per page",
  previousLabel = "Previous",
  nextLabel = "Next",
  goToPageLabelPrefix = "Go to page",
  pageSizeSelectorAriaLabel = "Select items per page",
  isLoading = false,
  onChangePage,
  onChangePageSize,
}: PaginationProps) {
  const safeTotalPages = Math.max(1, totalPages);
  const safeCurrentPage = Math.min(Math.max(1, currentPage), safeTotalPages);
  const normalizedPageSizeOptions = Array.from(
    new Set(
      [
        ...(pageSizeOptions?.filter((option) => Number.isFinite(option) && option > 0) ?? []),
        ...(typeof pageSize === "number" && pageSize > 0 ? [pageSize] : []),
      ].sort((first, second) => first - second),
    ),
  );
  const hasPageSizeControl =
    typeof pageSize === "number" &&
    normalizedPageSizeOptions.length > 0 &&
    typeof onChangePageSize === "function";
  const visiblePageMarkers = resolveVisiblePageMarkers(
    safeCurrentPage,
    safeTotalPages,
  );

  return (
    <nav className={styles.container} aria-label={ariaLabel}>
      <span className={styles.pageInfo} aria-live="polite">
        {pageLabel} {safeCurrentPage} {ofLabel} {safeTotalPages}
        {typeof totalItems === "number" ? ` · ${totalItems} ${itemsLabel}` : ""}
      </span>

      <div className={styles.controls}>
        {hasPageSizeControl ? (
          <label className={styles.pageSizeControl}>
            <span className={styles.pageSizeLabel}>{itemsPerPageLabel}</span>
            <select
              className={styles.pageSizeSelect}
              value={String(pageSize)}
              aria-label={pageSizeSelectorAriaLabel}
              disabled={isLoading}
              onChange={(event) => {
                const nextPageSize = Number.parseInt(event.target.value, 10);

                if (Number.isNaN(nextPageSize)) {
                  return;
                }

                onChangePageSize(nextPageSize);
              }}
            >
              {normalizedPageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        <Button
          variant="secondary"
          size="small"
          onClick={() => onChangePage(Math.max(1, safeCurrentPage - 1))}
          disabled={safeCurrentPage <= 1 || isLoading}
        >
          {previousLabel}
        </Button>

        {visiblePageMarkers.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            className={classNames(
              styles.pageMarker,
              pageNumber === safeCurrentPage && styles.activeMarker,
            )}
            onClick={() => onChangePage(pageNumber)}
            disabled={pageNumber === safeCurrentPage || isLoading}
            aria-current={pageNumber === safeCurrentPage ? "page" : undefined}
            aria-label={`${goToPageLabelPrefix} ${pageNumber}`}
          >
            {pageNumber}
          </button>
        ))}

        <Button
          variant="secondary"
          size="small"
          onClick={() => onChangePage(Math.min(safeTotalPages, safeCurrentPage + 1))}
          disabled={safeCurrentPage >= safeTotalPages || isLoading}
        >
          {nextLabel}
        </Button>
      </div>
    </nav>
  );
}
