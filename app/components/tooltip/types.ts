import React from 'react';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
export type TooltipVariant =
  | 'default'
  | 'dark'
  | 'light'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';
export type TooltipTrigger = 'hover' | 'click' | 'focus' | 'manual';

export interface TooltipConfig {
  content: string | React.ReactNode;
  position?: TooltipPosition;
  variant?: TooltipVariant;
  trigger?: TooltipTrigger;
  delay?: number;
  disabled?: boolean;
  className?: string;
  maxWidth?: string;
  showArrow?: boolean;
}

export interface TooltipProps {
  children: React.ReactNode;
  config: TooltipConfig;
  className?: string;
}

export interface TooltipContentProps {
  content: string | React.ReactNode;
  position: TooltipPosition;
  variant: TooltipVariant;
  showArrow: boolean;
  maxWidth?: string;
  className?: string;
}

export interface TooltipTriggerProps {
  children: React.ReactNode;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  onFocus: () => void;
  onBlur: () => void;
  className?: string;
}

export interface TooltipArrowProps {
  position: TooltipPosition;
  variant: TooltipVariant;
  className?: string;
}

export interface TooltipIconProps {
  icon: React.ReactNode;
  className?: string;
}
