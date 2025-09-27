// pagination
const siblingCount = 2;

export const createPaginationRange = (page: number, totalPages: number) => {
  const range = [];

  const DOTS = "...";
  const totalPageNumbersToShow = siblingCount * 2 + 5;

  if (totalPages <= totalPageNumbersToShow) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(page - siblingCount, 2);
  const rightSiblingIndex = Math.min(page + siblingCount, totalPages - 1);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

  range.push(1);

  if (shouldShowLeftDots) {
    range.push(DOTS);
  }

  for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
    range.push(i);
  }

  if (shouldShowRightDots) {
    range.push(DOTS);
  }

  range.push(totalPages);
  return range;
};
