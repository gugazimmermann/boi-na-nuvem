import type { TablePaginationProps } from './types';
import { styles } from './constants';
import { Icons } from './icons';

export function TablePagination({ pagination }: TablePaginationProps) {
  const { currentPage, totalPages, itemsPerPage, totalItems, onPageChange } = pagination;

  const effectiveItemsPerPage = itemsPerPage ?? 10;
  const effectiveTotalItems = totalItems ?? totalPages * effectiveItemsPerPage;

  const startItem = (currentPage - 1) * effectiveItemsPerPage + 1;
  const endItem = Math.min(startItem + effectiveItemsPerPage - 1, effectiveTotalItems);

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.paginationInfo}>
        <span className={styles.paginationInfoHighlight}>
          Página {currentPage} de {totalPages}
        </span>
      </div>

      <div className={styles.paginationButtons}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className={`${styles.paginationButton} ${styles.paginationButtonDisabled}`}
        >
          {Icons.chevronLeft}
          <span>anterior</span>
        </button>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={`${styles.paginationButton} ${styles.paginationButtonDisabled}`}
        >
          <span>próximo</span>
          {Icons.chevronRight}
        </button>
      </div>
    </div>
  );
}
