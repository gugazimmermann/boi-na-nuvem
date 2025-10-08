export interface SidebarItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export interface SidebarLinkProps {
  item: SidebarItem;
  isActive: boolean;
  onClick: (itemId: string) => void;
}

export interface SidebarProps {
  className?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}
