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
