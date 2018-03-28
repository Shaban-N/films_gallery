export const filmsComparator = sortingOrder => (a, b) => {
  const multiplier = sortingOrder === 'asc' ? 1 : -1;
  if (a.title > b.title) {
    return multiplier
  }
  else if (a.title < b.title) {
    return -multiplier
  }
  return 0
};