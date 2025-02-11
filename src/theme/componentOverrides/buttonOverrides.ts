import { Components } from '@mui/material';

declare module '@mui/material/Button' {
  interface ButtonPropsSizeOverrides {
    extraLarge: true;
    noBorderRadius: true;
    borderDashed: true;
  }
}

const buttonOverrides = (): Pick<Components, 'MuiButton'> => ({
  MuiButton: {
    defaultProps: {},

    styleOverrides: {
      root: {
        textTransform: 'none',
        fontWeight: 500,
        borderRadius: '12px',
        boxShadow: 'none',

        '&.MuiButton-sizeExtraLarge': {
          fontSize: '20px',
          lineHeight: '24px',
          padding: '16px 24px',
        },

        '&.MuiButton-noBorderRadius': {
          borderRadius: 'none',
        },

        '&.MuiButton-borderDashed': {
          border: 'dashed 1px',
        },
      },

      sizeLarge: {
        fontSize: '16px',
        lineHeight: '20px',
        padding: '12px 16px',
      },

      sizeMedium: {
        fontSize: '14px',
        lineHeight: '18px',
        padding: '10px 16px',
      },

      sizeSmall: {
        fontSize: '12px',
        lineHeight: '16px',
        padding: '6px 12px',
      },
    },
  },
});

export default buttonOverrides;
