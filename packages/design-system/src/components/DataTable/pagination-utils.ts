export const resolveVisiblePageMarkers = (
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

export const normalizePageSizeOptions = (
  pageSizeOptions: readonly number[] | undefined,
  pageSize: number | undefined,
): number[] => {
  const options = [...(pageSizeOptions ?? [])];

  if (typeof pageSize === "number" && pageSize > 0) {
    options.push(pageSize);
  }

  return [...new Set(options.filter((option) => Number.isFinite(option) && option > 0))].sort(
    (first, second) => first - second,
  );
};
