import React from 'react';
import type { AlertProps } from './types';
import { styles } from './constants';
import { getAlertIcon } from './icons';

export function Alert({ config, className = '' }: AlertProps) {
  const { type, title, message, dismissible, onDismiss } = config;
  const typeStyles = styles[type];
  const icon = getAlertIcon(type);

  return (
    <div className={`${styles.container} ${className}`} role="alert" aria-live="polite">
      <div className={`${styles.iconContainer} ${typeStyles.iconContainer}`}>
        {React.cloneElement(icon, {
          'aria-hidden': 'true',
          role: 'img',
        })}
      </div>

      <div className={styles.content}>
        <div className={styles.contentContainer}>
          <span className={`${styles.title} ${typeStyles.title}`}>{title}</span>
          <p className={styles.message}>{message}</p>
        </div>
      </div>

      {dismissible && onDismiss && (
        <button onClick={onDismiss} className={styles.dismissButton} aria-label="Dismiss alert">
          <svg
            className={styles.dismissIcon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
