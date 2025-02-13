import styled from '@emotion/styled';

import Box, { BoxProps } from '@mui/material/Box';
import Image, { ImageProps } from './Image';
import { useEffect, useRef } from 'react';

type ImageWrapperProps = BoxProps &
  ImageProps & {
    zoomPercent: number;
    setZoomPercent: (zoomPercent: number) => void;
    setScale: (scale: boolean) => void;
  };

const PERCENT_DEFAULT = 100;

// TODO
const ZoomImageContainer = ({ className, src, setZoomPercent, setScale }: ImageWrapperProps) => {
  const mouseRef = useRef(99999);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener('keydown', e => {
      switch (e.key) {
        case 'Enter':
          // console.log('Enter');
          break;
        case 'ArrowUp':
          // close
          // console.log('ArrowUp');
          break;
        case 'ArrowDown':
          // close
          // console.log('ArrowDown');
          break;
        case '5':
          setZoomPercent(PERCENT_DEFAULT);
          break;
        case ' ':
          setScale(false);
          break;
      }
    });

    return () => {
      window.removeEventListener('keydown', () => {});
      setZoomPercent(PERCENT_DEFAULT);
    };
  }, [setScale, setZoomPercent]);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // console.log(e);
    if (e.button == 0) {
      mouseRef.current = e.button;
      // console.log('LEFT CLICK');
    }
  };

  const onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    // console.log(e);
    if (e.button == mouseRef.current) {
      // console.log('UP');

      mouseRef.current = 9999;
    }
  };

  // tslint:disable-next-line
  // const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  //   // console.log(e);
  //   if (mouseRef.current == 0) {
  //     if (imageRef.current) {
  //       // const temp = [imageRef.current][0];
  //       // const clientX = e.clientX;
  //       // const clientY = e.clientY;
  //       // console.log(e);
  //       // console.log('MOVE', e.offsetX, e.offsetY);
  //       // console.log(newX, newY, temp.style);
  //       // temp.style.left = clientX + 'px';
  //       // temp.style.top = clientY + 'px';
  //     }
  //   }
  // };

  return (
    <Box
      height="100%"
      // maxWidth="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      position="relative"
      // border={4}
      className={className}
    >
      {/* OVERLAY */}
      <Box
        ref={imageRef}
        zIndex={1}
        // sx={{ backgroundColor: 'yellow' }}
        position="absolute"
        onMouseUp={onMouseUp}
        // onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
      >
        <Box className="Overlay" width="100%" height={'100%'} position="absolute" zIndex={2}></Box>

        <Image src={src} height={256} />
      </Box>
    </Box>
  );
};

const ZoomImageContainerStyled = styled(ZoomImageContainer)`
  zoom: ${props => props.zoomPercent}%;

  .Overlay {
    zoom: ${props => props.zoomPercent}%;
  }
`;

export default ZoomImageContainerStyled;
