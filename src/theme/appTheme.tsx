import { createTheme } from '@mui/material';
import type {} from '@mui/x-data-grid/themeAugmentation';

import typography from './overrides/typography';

import { createGlobalStyles } from './styles';
import buttonOverrides from './componentOverrides/buttonOverrides';
import typographyOverrides from './componentOverrides/typographyOverrides';
import textFieldOverrides from './componentOverrides/textFieldOverrides';
import selectOverrides from './componentOverrides/selectOverrides';
import tableOverrides from './componentOverrides/tableOverrides';

import { createPaletteOptions } from './createPalette';
import { ThemeOptions } from '@mui/material/styles';
import { breakpoints } from './themeOptions/themeBreakpoints';

interface TableOptions {
  title?: string;
  header: string;
  headerRow?: string;
  highlight?: string;
  titleContrastText?: string;
  row?: string;
  evenRow?: string;
  border?: string;
  headerRowHeight?: number;
  rowHeight?: number;
  denseHeaderRowHeight?: number;
  denseRowHeight?: number;
}

declare module '@mui/material/styles' {
  interface ThemeOptions {
    table: TableOptions;
  }
}

// DECLARE TYPE for @emotion/react
declare module '@emotion/react' {
  interface Theme extends ThemeOptions {}
}

const appTheme = createTheme({
  palette: createPaletteOptions('light'),

  table: {
    title: '#40536B',
    titleContrastText: '#fbfbfb',
    header: 'rgba(130, 85, 19, 0.08)',
    headerRow: '#ecf2f9',
    highlight: '#f8edda',
    row: '#fff',
    evenRow: '#f5f7f9',
    headerRowHeight: 60,
    border: '1px solid #d1d1d1',
    rowHeight: 56,
    denseHeaderRowHeight: 38,
    denseRowHeight: 30,
  },

  typography: typography,
  breakpoints: breakpoints,

  // https://mui.com/material-ui/customization/theme-components/
  components: {
    MuiCssBaseline: {
      styleOverrides: createGlobalStyles(),
    },

    ...buttonOverrides(),
    ...typographyOverrides(),
    ...textFieldOverrides(),
    ...selectOverrides(),
    ...tableOverrides(),
    // Name of the component
    MuiButtonBase: {
      defaultProps: {},
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'md',
      },
    },
  },

  mixins: {
    MuiDataGrid: {
      // Pinned columns sections
      pinnedBackground: '#340606',
      // Headers, and top & bottom fixed rows
      containerBackground: '#f5f2ec',
    },
  },
});

export default appTheme;
