import type { TableBodyProps } from './types';
import { styles } from './constants';

export function TableBody<T>({ columns, data, rowActions, rowClassName }: TableBodyProps<T>) {
  return (
    <tbody className={styles.tbody}>
      {data.map((item, index) => (
        <tr key={index} className={rowClassName ? rowClassName(item) : undefined}>
          {columns.map((column) => (
            <td key={column.key} className={styles.cell}>
              {column.render
                ? column.render(item[column.key as keyof T], item)
                : String(item[column.key as keyof T] as unknown)}
            </td>
          ))}
          {rowActions && <td className={styles.cell}>{rowActions(item)}</td>}
        </tr>
      ))}
    </tbody>
  );
}
