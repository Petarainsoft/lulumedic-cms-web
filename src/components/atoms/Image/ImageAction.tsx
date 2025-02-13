import { forwardRef, useImperativeHandle, useState } from 'react';

import { StackProps } from '@mui/material/Stack';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Image, { ImageProps } from './Image';
import ZoomImageContainer from './ZoomImageContainer';
import Typography from 'components/atoms/Typography';

// ICONS
import CloseIcon from '@mui/icons-material/Close';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';

type Props = StackProps & ImageProps;

const PERCENT_DEFAULT = 100;

export type ImageActionRef = {
  setScale: (scale: boolean) => void;
};

const ImageAction = forwardRef<ImageActionRef, Props>((props, ref) => {
  const { className, src, ...rest } = props;
  const [scale, setScale] = useState(false);
  const [zoomPercent, setZoomPercent] = useState(PERCENT_DEFAULT);

  useImperativeHandle(ref, () => ({
    setScale,
  }));

  const onWheel = (e: React.WheelEvent) => {
    if (e.deltaY < 0) {
      setZoomPercent(zoomPercent + 10);
    } else if (e.deltaY > 0) {
      if (zoomPercent > PERCENT_DEFAULT) {
        setZoomPercent(zoomPercent - 10);
      }
    }
  };

  return (
    <Grid height="100%" className={className}>
      <Grid
        size={12}
        height="100%"
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          if (src) {
            setScale(!scale);
          }
        }}
      >
        <Image src={src} {...rest} />
      </Grid>

      {scale && (
        <>
          <Grid size={12} display="flex" justifyContent="flex-end" position="fixed" top={20} right={0} zIndex={99999}>
            <Grid width="100%" textAlign="center">
              <Button
                color="secondary"
                startIcon={<CenterFocusStrongIcon sx={{ color: 'primary.contrastText' }} fontSize="small" />}
                sx={{
                  backgroundColor: '#2B313329',
                }}
              >
                <Typography variant="bodyMedium" color="primary.contrastText">
                  {zoomPercent}%
                </Typography>
              </Button>
            </Grid>
            <Grid mr={10}>
              <IconButton
                sx={{ backgroundColor: '#2B313329' }}
                onClick={() => {
                  setScale(!scale);
                }}
              >
                <CloseIcon sx={{ color: 'primary.contrastText' }} fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>
          <Grid
            px={5}
            container
            height="100%"
            direction="column"
            position="fixed"
            flexWrap="nowrap"
            justifyContent="center"
            top="0"
            left="0"
            width="100%"
            zIndex={9999}
            sx={{ cursor: 'pointer', backgroundColor: '#000000b3' }}
            onWheel={onWheel}
          >
            <ZoomImageContainer
              zoomPercent={zoomPercent}
              src={src}
              setZoomPercent={setZoomPercent}
              setScale={setScale}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
});

export default ImageAction;
