import memoize from "memoize-one";

export const generateItems = (numItems) =>
  Array(numItems)
    .fill(true)
    .map((_) => ({
      isActive: false,
    }));

export const createItemData = memoize((items, toggleItemActive) => ({
  items,
  toggleItemActive,
}));
