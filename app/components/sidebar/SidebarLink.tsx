import { Link } from 'react-router';
import type { SidebarLinkProps } from './types';
import { styles } from './constants';

export function SidebarLink({ item, isActive, onClick }: SidebarLinkProps) {
  const handleClick = () => {
    onClick(item.id);
  };

  return (
    <Link
      to={item.href}
      onClick={handleClick}
      className={`${styles.sidebarLink} ${isActive ? styles.sidebarLinkActive : ''}`}
    >
      {item.icon}
      <span className={styles.label}>{item.label}</span>
    </Link>
  );
}
