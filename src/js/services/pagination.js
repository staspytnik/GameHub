// Pagination state helper.
// Full pagination/infinite scroll behavior is implemented in a later task.

/**
 * Create a simple pagination state object.
 * @param {number} [pageSize=20]
 */
export function createPaginationState(pageSize = 20) {
  return {
    page: 1,
    pageSize,
    total: 0,
  };
}

export function getVisiblePages(
  current,
  totalPages,
  siblingCount = 1,
  step = 15
) {
  if (totalPages <= 0) return [];
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set([1]);

  if (current <= 3) {
    pages.add(2);
    pages.add(3);
  }

  for (
    let page = current - siblingCount;
    page <= current + siblingCount;
    page += 1
  ) {
    if (page >= 1 && page <= totalPages) pages.add(page);
  }

  let nextJump = Math.ceil(current / step) * step;
  if (nextJump === current) nextJump += step;
  if (nextJump < totalPages) pages.add(nextJump);

  const sorted = [...pages]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);
  const items = [];

  sorted.forEach((page, index) => {
    if (index > 0 && page - sorted[index - 1] > 1) {
      items.push("...");
    }
    items.push(page);
  });

  return items;
}
