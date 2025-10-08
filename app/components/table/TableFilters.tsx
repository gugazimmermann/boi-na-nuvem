import type { TableFiltersProps } from './types';
import { styles } from './constants';
import { Icons } from './icons';

export function TableFilters({ filters, search }: TableFiltersProps) {
  if (!filters && !search) return null;

  return (
    <div className={styles.filtersContainer}>
      {filters && (
        <div className={styles.filtersGroup}>
          {filters.map((filter, index) => (
            <button
              key={index}
              onClick={filter.onClick}
              className={`${styles.filterButton} ${
                filter.active ? styles.filterButtonActive : styles.filterButtonInactive
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      )}

      {search && (
        <div className={styles.searchContainer}>
          <span className="absolute">{Icons.search}</span>
          <input
            type="text"
            placeholder={search.placeholder}
            value={search.value}
            onChange={(e) => search.onChange(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      )}
    </div>
  );
}
