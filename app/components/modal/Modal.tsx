import { useEffect, useRef } from 'react';
import type { ModalProps, ModalHeaderProps, ModalBodyProps, ModalFooterProps } from './types';
import { styles } from './constants';
import { CloseIcon } from './icons';

export function ModalHeader({
  title,
  onClose,
  showCloseButton = true,
  className = '',
}: ModalHeaderProps) {
  return (
    <div className={`${styles.header.base} ${className}`}>
      <h3 className={styles.header.title}>{title}</h3>
      {showCloseButton && onClose && (
        <button
          type="button"
          className={styles.header.closeButton}
          onClick={onClose}
          aria-label="Fechar modal"
        >
          <CloseIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

export function ModalBody({ children, className = '' }: ModalBodyProps) {
  return <div className={`${styles.body.base} ${className}`}>{children}</div>;
}

export function ModalFooter({ children, className = '' }: ModalFooterProps) {
  return (
    <div className={`${styles.footer.base} ${className}`}>
      <div className={styles.footer.actions}>{children}</div>
    </div>
  );
}

export function Modal({
  isOpen,
  onClose,
  config = {},
  children,
  'data-testid': testId,
}: ModalProps) {
  const {
    size = 'md',
    closable = true,
    closeOnOverlayClick = true,
    closeOnEscape = true,
    showCloseButton = true,
    className = '',
  } = config;

  const modalRef = useRef<HTMLDivElement>(null);

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

    const modal = modalRef.current;
    if (!modal) return;

    const focusableElements = modal.querySelectorAll(
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

  if (!isOpen) return null;

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  const containerClasses = styles.container.base;
  const panelClasses = `${styles.panel.base} ${styles.panel[size]} ${styles.panel.visible} ${className}`;
  const overlayClasses = `${styles.overlay.base} ${styles.overlay.visible}`;

  return (
    <div className={styles.base} data-testid={testId} role="dialog" aria-modal="true">
      <div className={overlayClasses} onClick={handleOverlayClick} aria-hidden="true" />

      <div className={containerClasses}>
        <div ref={modalRef} className={panelClasses}>
          {children}
        </div>
      </div>
    </div>
  );
}
