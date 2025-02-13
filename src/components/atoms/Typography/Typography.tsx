import MuiTypography, { TypographyProps as MuiTypographyProps } from '@mui/material/Typography';

export enum SizeType {
  Large = 'large',
  XLarge = 'xLarge',
  Medium = 'medium',
  Small = 'small',
}
export type TypographyProps = MuiTypographyProps & {
  size?: SizeType;
};

const Typography = ({ children, ...restProps }: TypographyProps) => {
  return <MuiTypography {...restProps}>{children}</MuiTypography>;
};

export default Typography;
