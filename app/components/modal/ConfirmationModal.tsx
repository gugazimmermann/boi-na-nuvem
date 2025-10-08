import type { ConfirmationModalProps } from './types';
import { Modal, ModalHeader, ModalBody, ModalFooter } from './Modal';
import { Button } from '../button';
import { WarningIcon, ErrorIcon, SuccessIcon, InfoIcon, DeleteIcon } from './icons';
import { styles } from './constants';

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'default',
  loading = false,
  config = {},
  'data-testid': testId,
}: ConfirmationModalProps) {
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirm();
  };

  const getIcon = () => {
    const iconClass = `${styles.iconColor[variant]} w-6 h-6`;

    switch (variant) {
      case 'warning':
        return <WarningIcon className={iconClass} />;
      case 'error':
        return <ErrorIcon className={iconClass} />;
      case 'success':
        return <SuccessIcon className={iconClass} />;
      case 'info':
        return <InfoIcon className={iconClass} />;
      default:
        return <DeleteIcon className={iconClass} />;
    }
  };

  const getConfirmButtonVariant = () => {
    switch (variant) {
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      case 'success':
        return 'success';
      case 'info':
        return 'info';
      default:
        return 'error';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      config={{
        size: 'sm',
        closeOnOverlayClick: !loading,
        closeOnEscape: !loading,
        showCloseButton: !loading,
        ...config,
      }}
      data-testid={testId}
    >
      <ModalHeader
        title={title}
        onClose={loading ? undefined : onClose}
        showCloseButton={!loading}
      />

      <ModalBody>
        <div className={styles.text.center}>
          <div className={`${styles.icon.base} ${styles.icon[variant]} mb-4`}>{getIcon()}</div>

          <p className={styles.text.message}>{message}</p>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button
          config={{
            variant: 'outline',
            size: 'md',
            disabled: loading,
          }}
          onClick={handleCancel}
          data-testid={`${testId}-cancel`}
        >
          {cancelText}
        </Button>

        <Button
          config={{
            variant: getConfirmButtonVariant(),
            size: 'md',
            loading: loading,
            disabled: loading,
          }}
          onClick={handleConfirm}
          data-testid={`${testId}-confirm`}
        >
          {confirmText}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
