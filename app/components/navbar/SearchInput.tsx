import type { SearchInputProps } from './types';
import { styles } from './constants';
import { Icons } from './icons';

export const SearchInput = ({ className = 'w-64' }: SearchInputProps) => (
  <div className="relative">
    <span className="absolute inset-y-0 left-0 flex items-center pl-3">{Icons.search}</span>
    <input
      type="text"
      className={`${className} ${styles.searchInput}`}
      placeholder="Pesquisar"
      aria-label="Pesquisar"
    />
  </div>
);
