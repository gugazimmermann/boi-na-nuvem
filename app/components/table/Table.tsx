import type { TableProps } from './types';
import { styles } from './constants';
import { Icons } from './icons';
import { TableHeader } from './TableHeader';
import { TableFilters } from './TableFilters';
import { TableBody } from './TableBody';
import { TablePagination } from './TablePagination';

export function Table({ config, className = '' }: TableProps) {
  return (
    <section className={`${styles.container} ${className}`}>
      <TableHeader config={config} />

      <TableFilters filters={config.filters} search={config.search} />

      <div className={styles.tableWrapper}>
        <div className={styles.tableContainer}>
          <div className={styles.tableInner}>
            <div className={styles.tableBorder}>
              <table className={styles.table}>
                <thead className={styles.thead}>
                  <tr>
                    {config.columns.map((column) => (
                      <th
                        key={column.key}
                        scope="col"
                        className={`${styles.columnHeader} ${column.className || ''}`}
                      >
                        {column.sortable ? (
                          <button className={styles.columnHeaderSortable} onClick={column.onSort}>
                            <span>{column.label}</span>
                            {Icons.sort}
                          </button>
                        ) : (
                          <span>{column.label}</span>
                        )}
                      </th>
                    ))}
                    {config.rowActions && (
                      <th scope="col" className="relative py-2 px-3">
                        <span className={styles.srOnly}>Ações</span>
                      </th>
                    )}
                  </tr>
                </thead>
                <TableBody
                  columns={config.columns}
                  data={config.data}
                  rowActions={config.rowActions}
                  rowClassName={config.rowClassName}
                />
              </table>
            </div>
          </div>
        </div>
      </div>

      {config.pagination && <TablePagination pagination={config.pagination} />}
    </section>
  );
}
