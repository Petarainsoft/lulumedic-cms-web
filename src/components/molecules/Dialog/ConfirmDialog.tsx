// COMPONENTS
import { ReactNode, JSX } from 'react';
import Typography from '../../atoms/Typography';
import Dialog, { DialogProps } from './Dialog';

export type ConfirmDialogProps = Omit<DialogProps, 'fullWidth' | 'buttons'> & {
  icon?: JSX.Element;
  cancelText?: string;
  color?: 'primary' | 'secondary' | 'warning' | 'info' | 'success' | 'error';
  confirmText?: string;
  confirmLoading?: boolean;
  onConfirm: () => void;
  message?: ReactNode;
  mainMessage?: string;
  confirmMessage?: string;
  styledText?: string;
  title?: string;
};

const ConfirmDialog = ({
  open,
  icon,
  styledText = '',
  confirmText = '삭제',
  color = 'error',
  mainMessage,
  confirmMessage = '',
  onConfirm,
  onClose,
  ...restProps
}: ConfirmDialogProps) => {
  return (
    <Dialog
      color={color}
      icon={icon}
      open={open}
      fullWidth
      buttons={[
        {
          label: confirmText,
          onClick: async () => {
            if (onConfirm) {
              await onConfirm();
            }
            if (onClose) onClose();
          },
        },
      ]}
      onClose={onClose}
      {...restProps}
    >
      <Typography variant="body2" color="textPrimary" textAlign="center">
        <Typography variant="bodyMedium" sx={{ color: 'red', fontWeight: 600 }}>
          {styledText}
        </Typography>
        {` ${mainMessage}`}
      </Typography>
      {confirmMessage && (
        <Typography variant="body2" color="textPrimary" textAlign="center">
          {confirmMessage}
        </Typography>
      )}
    </Dialog>
  );
};

export default ConfirmDialog;
