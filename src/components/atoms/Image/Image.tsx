import MuiImage from 'mui-image';
// import noImage from 'assets/images/no-image.png';

import Stack from '@mui/material/Stack';

export type ImageProps = {
  width?: number;
  height?: number;
  src?: string;
};

const Image = ({ src, ...rest }: ImageProps) => {
  return src ? (
    <MuiImage src={src!} {...rest} duration={500} />
  ) : (
    <Stack
      sx={{ backgroundColor: 'background.default' }}
      width="100%"
      height="100%"
      borderRadius={2}
      justifyContent="center"
      alignItems="center"
    >
      {/* <MuiImage src={noImage} width={37} height={37} /> */}
    </Stack>
  );
};

export default Image;
