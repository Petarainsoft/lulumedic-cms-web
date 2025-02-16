import { JSX } from 'react';
import Avatar from '@mui/material/Avatar';
import Button, { ButtonProps } from '@mui/material/Button';
import MuiDialog, { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';

export type DialogProps = MuiDialogProps & {
  icon?: JSX.Element;
  color?: 'primary' | 'secondary' | 'warning' | 'info' | 'success' | 'error';
  fullHeight?: boolean;
  title?: string;
  buttons?: (ButtonProps & { label: string })[];
  cancelText?: string;
  onClose: () => void;
  className?: string;
};

const Dialog = ({
  color = 'primary',
  icon,
  title,
  buttons,
  onClose,
  children,
  cancelText = '취소',
  className,
  ...rest
}: DialogProps) => {
  return (
    <MuiDialog {...rest} className={className}>
      {icon && (
        <Avatar className="dialog-icon" sx={{ color: `${color}.main` }}>
          {icon}
        </Avatar>
      )}
      {title && <DialogTitle className="dialog-title">{title}</DialogTitle>}
      <DialogContent className="dialog-content">{children}</DialogContent>
      <DialogActions>
        <Button sx={{ px: 5, fontWeight: 600, width: 118 }} variant="outlined" onClick={onClose}>
          {cancelText}
        </Button>
        {buttons?.map(({ label, endIcon, ...buttonRest }) => (
          <Button
            key={label}
            sx={{ px: 2, fontWeight: 600, width: 118 }}
            variant="contained"
            color={color}
            endIcon={endIcon}
            {...buttonRest}
          >
            {label}
          </Button>
        ))}
      </DialogActions>
    </MuiDialog>
  );
};

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    // min-width: 340px;
    display: flex;
    align-items: center;
    padding: 32px 24px;
    border-radius: 16px;
  }

  .dialog-icon {
    background-color: #f8f8f8;
    width: 48px;
    height: 48px;
    margin: 0 auto;
  }
  .dialog-title {
    font-weight: 600;
    padding: 32px 24px;
  }
  .dialog-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export default StyledDialog;
