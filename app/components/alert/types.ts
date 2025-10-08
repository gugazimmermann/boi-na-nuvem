export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface AlertConfig {
  type: AlertType;
  title: string;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export interface AlertProps {
  config: AlertConfig;
  className?: string;
}

export interface AlertIconProps {
  type: AlertType;
  className?: string;
}

export interface AlertContentProps {
  title: string;
  message: string;
  className?: string;
}

export interface AlertDismissProps {
  onDismiss: () => void;
  className?: string;
}
