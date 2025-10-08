export interface NavigationItem {
  to: string;
  label: string;
}

export interface NavLinkProps {
  to: string;
  label: string;
}

export interface SearchInputProps {
  className?: string;
}

export interface NavbarProps {
  onToggleSidebar?: () => void;
}
