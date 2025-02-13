import { useState, MouseEvent, ReactNode, useEffect, forwardRef, useImperativeHandle } from 'react';

import MuiPopover, { PopoverProps } from '@mui/material/Popover';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

type Props = Pick<PopoverProps, 'children' | 'transformOrigin' | 'anchorOrigin'> & {
  rootElement: ReactNode;
  onOpen?: (open?: boolean) => void;
};

const Popover = forwardRef(
  (
    {
      rootElement,
      onOpen,
      children,
      transformOrigin = { vertical: 'top', horizontal: 'center' },
      anchorOrigin = { vertical: 'top', horizontal: 'left' },

      ...rest
    }: Props,
    ref
  ) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    useEffect(() => {
      if (anchorEl && onOpen) {
        onOpen(Boolean(anchorEl));
      }
    }, [anchorEl, onOpen]);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    useImperativeHandle(ref, () => ({
      close: handleClose,
    }));

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
      <div>
        <Box variant="text" color="text.primary" aria-describedby={id} component={Button} onClick={handleClick}>
          {rootElement}
        </Box>
        <MuiPopover
          id={id}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          transformOrigin={transformOrigin}
          anchorOrigin={anchorOrigin}
          {...rest}
        >
          {children}
        </MuiPopover>
      </div>
    );
  }
);

export default Popover;
