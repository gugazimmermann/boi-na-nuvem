import { Link } from 'react-router';
import type { NavLinkProps } from './types';
import { styles } from './constants';

export const NavLink = ({ to, label }: NavLinkProps) => (
  <Link to={to} className={styles.navLink}>
    {label}
  </Link>
);
