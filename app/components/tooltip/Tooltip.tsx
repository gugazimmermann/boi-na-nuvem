import { useState, useRef, useEffect } from 'react';
import type { TooltipProps, TooltipContentProps, TooltipArrowProps } from './types';
import { styles } from './constants';

function TooltipArrow({ position, variant, className = '' }: TooltipArrowProps) {
  const variantStyles = styles.variants[variant];
  const arrowClasses = `${styles.arrow} ${styles.arrowPositions[position]} ${variantStyles.arrow} ${className}`;

  return <div className={arrowClasses} />;
}

function TooltipContent({
  content,
  position,
  variant,
  showArrow,
  maxWidth,
  className = '',
}: TooltipContentProps) {
  const variantStyles = styles.variants[variant];
  const positionStyles = styles.positions[position];
  const contentClasses = `${styles.content} ${positionStyles} ${variantStyles.content} ${className}`;

  const contentStyle = maxWidth ? { maxWidth } : {};

  return (
    <div className={contentClasses} style={contentStyle} role="tooltip">
      <span className={styles.text}>{content}</span>
      {showArrow && <TooltipArrow position={position} variant={variant} />}
    </div>
  );
}

export function Tooltip({ children, config, className = '' }: TooltipProps) {
  const {
    content,
    position = 'top',
    variant = 'default',
    trigger = 'hover',
    delay = 0,
    disabled = false,
    maxWidth,
    showArrow = true,
  } = config;

  const [isVisible, setIsVisible] = useState(false);
  const [showTimeout, setShowTimeout] = useState<NodeJS.Timeout | null>(null);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    if (disabled) return;

    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }

    if (delay > 0) {
      const timeout = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      setShowTimeout(timeout);
    } else {
      setIsVisible(true);
    }
  };

  const hideTooltip = () => {
    if (showTimeout) {
      clearTimeout(showTimeout);
      setShowTimeout(null);
    }

    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 100);
    setHideTimeout(timeout);
  };

  const handleClick = () => {
    if (trigger === 'click') {
      if (isVisible) {
        hideTooltip();
      } else {
        showTooltip();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isVisible) {
      hideTooltip();
    }
  };

  useEffect(() => {
    return () => {
      if (showTimeout) clearTimeout(showTimeout);
      if (hideTimeout) clearTimeout(hideTimeout);
    };
  }, [showTimeout, hideTimeout]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        trigger === 'click' &&
        isVisible &&
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        hideTooltip();
      }
    };

    if (isVisible && trigger === 'click') {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isVisible, trigger]);

  const containerClasses = `${styles.container} ${className}`;
  const visibilityClasses = isVisible ? styles.contentVisible : styles.contentHidden;

  return (
    <div ref={tooltipRef} className={containerClasses} onKeyDown={handleKeyDown}>
      <div
        onMouseEnter={trigger === 'hover' ? showTooltip : undefined}
        onMouseLeave={trigger === 'hover' ? hideTooltip : undefined}
        onFocus={trigger === 'focus' ? showTooltip : undefined}
        onBlur={trigger === 'focus' ? hideTooltip : undefined}
        onClick={handleClick}
        className={disabled ? styles.disabled : styles.interactive}
      >
        {children}
      </div>

      <TooltipContent
        content={content}
        position={position}
        variant={variant}
        showArrow={showArrow}
        maxWidth={maxWidth}
        className={visibilityClasses}
      />
    </div>
  );
}
