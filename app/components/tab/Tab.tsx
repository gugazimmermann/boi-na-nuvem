import type { TabProps, TabItemProps } from './types';
import { styles } from './constants';

function TabItem({ item, isActive, variant, onClick, className = '' }: TabItemProps) {
  const variantStyles = styles[variant];
  const baseClasses = `${styles.tabItem} ${variantStyles.tabItem}`;
  const stateClasses = isActive ? variantStyles.tabItemActive : variantStyles.tabItemInactive;
  const disabledClasses = item.disabled ? styles.tabItemDisabled : '';
  const focusClasses = styles.focusRing;
  const combinedClasses = `${baseClasses} ${stateClasses} ${disabledClasses} ${focusClasses} ${className}`;

  const handleClick = () => {
    if (!item.disabled) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${item.id}`}
      id={`tab-${item.id}`}
      disabled={item.disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={combinedClasses}
    >
      {item.icon && (
        <div className={styles.iconContainer}>
          <span
            aria-hidden="true"
            className={`${styles.icon} ${isActive ? styles.iconActive : styles.iconInactive} ${!isActive ? styles.iconRotate : ''}`}
          >
            {item.icon}
          </span>
        </div>
      )}

      <span className={`${styles.label} ${isActive ? styles.labelActive : styles.labelInactive}`}>
        {item.label}
      </span>

      {item.badge && (
        <span
          className={`${styles.badge} ${styles.badgeDefault} ${isActive ? styles.badgeActive : styles.badgeInactive}`}
        >
          {item.badge}
        </span>
      )}
    </button>
  );
}

export function Tab({ config, className = '' }: TabProps) {
  const { items, activeTab, variant = 'default', onTabChange } = config;
  const variantStyles = styles[variant];
  const containerClasses = `${styles.container} ${variantStyles.container} ${className}`;

  const handleTabChange = (tabId: string) => {
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <div className={containerClasses} role="tablist">
      {items.map((item) => (
        <TabItem
          key={item.id}
          item={item}
          isActive={activeTab === item.id}
          variant={variant}
          onClick={() => handleTabChange(item.id)}
        />
      ))}
    </div>
  );
}
