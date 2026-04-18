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
  isLoading?: boolean;
  onChangePage: (page: number) => void;
};

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  isLoading = false,
  onChangePage,
}: PaginationProps) {
  const safeTotalPages = Math.max(1, totalPages);
  const safeCurrentPage = Math.min(Math.max(1, currentPage), safeTotalPages);
  const visiblePageMarkers = resolveVisiblePageMarkers(
    safeCurrentPage,
    safeTotalPages,
  );

  return (
    <nav className={styles.container} aria-label="Pagination">
      <span className={styles.pageInfo} aria-live="polite">
        Page {safeCurrentPage} of {safeTotalPages}
        {typeof totalItems === "number" ? ` · ${totalItems} items` : ""}
      </span>

      <div className={styles.controls}>
        <Button
          variant="secondary"
          size="small"
          onClick={() => onChangePage(Math.max(1, safeCurrentPage - 1))}
          disabled={safeCurrentPage <= 1 || isLoading}
        >
          Previous
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
            aria-label={`Go to page ${pageNumber}`}
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
          Next
        </Button>
      </div>
    </nav>
  );
}
