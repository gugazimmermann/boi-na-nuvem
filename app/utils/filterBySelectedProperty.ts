export function filterBySelectedProperty<T>(
  items: T[] | null | undefined,
  selectedPropertyId: string | null,
  isAllSelected: boolean,
  getItemPropertyId: (item: T) => string | null | undefined,
): T[] {
  if (!items) return [];
  if (!selectedPropertyId || isAllSelected) return items;
  return items.filter((item) => getItemPropertyId(item) === selectedPropertyId);
}
