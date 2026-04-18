import { Button } from "../Button/Button";
import { classNames } from "../../utils/classNames";
import {
  normalizePageSizeOptions,
  resolveVisiblePageMarkers,
} from "./pagination-utils";
import styles from "./Pagination.module.css";

const DEFAULT_PAGINATION_PAGE_SIZE_OPTIONS = [4, 8, 12, 16, 20, 50, 100] as const;

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  pageSize?: number;
  pageSizeOptions?: readonly number[];
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
  pageSizeOptions = DEFAULT_PAGINATION_PAGE_SIZE_OPTIONS,
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
  const normalizedPageSizeOptions = normalizePageSizeOptions(pageSizeOptions, pageSize);
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

        <div className={styles.navigationViewport}>
          <div className={styles.navigationTrack}>
            <div className={styles.navigationControls}>
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
          </div>
        </div>
      </div>
    </nav>
  );
}
