import { PaletteOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeBackground {
    inverse: string;
    surface: string;
    outline: string;
    outlineVariant: string;
  }
}

// https://mui.com/material-ui/customization/default-theme/
const appPaletteLight: PaletteOptions = {
  mode: 'light',

  primary: {
    main: '#F0921C',
    light: '#FFB95E',
    dark: '#855300',
    contrastText: '#fff',
  },
  secondary: {
    main: '#797776',
    // light: '#797776',
    dark: '#8E7251',
    contrastText: '#fff',
  },
  error: {
    main: '#FF515B',
    light: '#FFDCDB',
    dark: '#660014',
    contrastText: '#fff',
  },
  warning: {
    main: '#FFB82F',
    light: '#FFDEA8',
    dark: '#422C00',
    contrastText: '#fff',
  },
  info: {
    main: '#62BDFF',
    light: '#CCE6FF',
    dark: '#003350',
    contrastText: '#fff',
  },
  success: {
    main: '#27BA8E',
    light: '#A6F2D1',
    dark: '#003828',
    contrastText: '#fff',
  },

  divider: '#E5E2E1',

  text: {
    primary: '#000000',
    secondary: '#313030',
    disabled: '#797776',
  },

  background: {
    default: '#F0F0F0', // background
    paper: '#FFFFFF', // Surface
    outlineVariant: '#E5E2E1',
    inverse: '#FFFFFF',
    surface: '#FFFFFF',
    outline: '#F0921C',
  },

  action: {
    active: '#000',
  },
};

export const createPaletteOptions = (themeName: 'light' | 'dark') =>
  themeName == 'light'
    ? appPaletteLight
    : ({
        mode: 'dark',
      } as PaletteOptions);
