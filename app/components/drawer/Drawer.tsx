import { useEffect, useRef, useState } from 'react';
import type { DrawerProps, DrawerHeaderProps, DrawerBodyProps, DrawerFooterProps } from './types';
import { styles } from './constants';
import { CloseIcon } from './icons';

export function DrawerHeader({
  title,
  subtitle,
  onClose,
  showCloseButton = true,
  className = '',
}: DrawerHeaderProps) {
  return (
    <div className={`${styles.header.base} ${className}`}>
      <div className="flex-1">
        <h3 className={styles.header.title}>{title}</h3>
        {subtitle && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>}
      </div>
      {showCloseButton && onClose && (
        <button
          type="button"
          className={styles.header.closeButton}
          onClick={onClose}
          aria-label="Fechar drawer"
        >
          <CloseIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

export function DrawerBody({ children, className = '' }: DrawerBodyProps) {
  return <div className={`${styles.body.base} ${className}`}>{children}</div>;
}

export function DrawerFooter({ children, className = '' }: DrawerFooterProps) {
  return (
    <div className={`${styles.footer.base} ${className}`}>
      <div className={styles.footer.actions}>{children}</div>
    </div>
  );
}

export function Drawer({
  isOpen,
  onClose,
  config = {},
  children,
  'data-testid': testId,
}: DrawerProps) {
  const {
    position = 'right',
    size = 'md',
    closable = true,
    closeOnOverlayClick = true,
    closeOnEscape = true,
    showCloseButton = true,
    className = '',
  } = config;

  const drawerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsAnimating(true);

      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const drawer = drawerRef.current;
    if (!drawer) return;

    const focusableElements = drawer.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    firstElement?.focus();

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isVisible) return null;

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  const containerClasses = styles.container.base;

  const getTransformClass = () => {
    if (!isAnimating) {
      return styles.panel.visible;
    } else {
      switch (position) {
        case 'left':
          return '-translate-x-full';
        case 'right':
          return 'translate-x-full';
        case 'top':
          return '-translate-y-full';
        case 'bottom':
          return 'translate-y-full';
        default:
          return 'translate-x-full';
      }
    }
  };

  const panelClasses = `${styles.panel.base} ${styles.panel[position]} ${styles.panel[size]} ${getTransformClass()} ${className}`;
  const overlayClasses = `${styles.overlay.base} ${isAnimating ? styles.overlay.animating : styles.overlay.visible}`;

  return (
    <div className={styles.base} data-testid={testId} role="dialog" aria-modal="true">
      <div className={overlayClasses} aria-hidden="true" />

      <div className={containerClasses} onClick={handleOverlayClick}>
        <div ref={drawerRef} className={panelClasses} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>
  );
}
