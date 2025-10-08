export type TabVariant = 'default' | 'pills' | 'underline';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
}

export interface TabConfig {
  items: TabItem[];
  activeTab?: string;
  variant?: TabVariant;
  onTabChange?: (tabId: string) => void;
  className?: string;
}

export interface TabProps {
  config: TabConfig;
  className?: string;
}

export interface TabItemProps {
  item: TabItem;
  isActive: boolean;
  variant: TabVariant;
  onClick: () => void;
  className?: string;
}

export interface TabContentProps {
  children: React.ReactNode;
  className?: string;
}

export interface TabIconProps {
  icon: React.ReactNode;
  className?: string;
}
