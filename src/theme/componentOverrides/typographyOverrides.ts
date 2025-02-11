import { Components } from '@mui/material';

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    headLarge: true;
    headMedium: true;
    headSmall: true;

    titleLarge: true;
    titleMedium: true;
    titleSmall: true;

    bodyLarge: true;
    bodyMedium: true;
    bodySmall: true;

    labelXLarge: true;
    labelLarge: true;
    labelMedium: true;
    labelSmall: true;
  }
}

// FONT SIZE: 32px, 28px, 24px 20px, 16px, 14px, 12px
// LINE HEIGHT: 40px, 36px, 32px, 24px, 20px, 18px, 14px
const typographyOverrides = (): Pick<Components, 'MuiTypography'> => ({
  MuiTypography: {
    defaultProps: {
      variant: 'bodyMedium',
    },

    styleOverrides: {
      root: {
        textTransform: 'none',
        fontWeight: 500,

        '&.MuiTypography-headLarge': {
          fontSize: '32px',
          lineHeight: '40px',
        },

        '&.MuiTypography-headMedium': {
          fontSize: '28px',
          lineHeight: '36px',
        },

        '&.MuiTypography-headSmall': {
          fontSize: '24px',
          lineHeight: '32px',
        },

        '&.MuiTypography-titleLarge': {
          fontSize: '20px',
          lineHeight: '24px',
        },
        '&.MuiTypography-titleMedium': {
          fontSize: '16px',
          lineHeight: '20px',
        },
        '&.MuiTypography-titleSmall': {
          fontSize: '14px',
          lineHeight: '18px',
        },

        '&.MuiTypography-bodyLarge': {
          fontSize: '16px',
          lineHeight: '24px',
        },
        '&.MuiTypography-bodyMedium': {
          fontSize: '14px',
          lineHeight: '20px',
        },
        '&.MuiTypography-bodySmall': {
          fontSize: '12px',
          lineHeight: '18px',
        },

        '&.MuiTypography-labelXLarge': {
          fontSize: '18px',
          lineHeight: '22px',
        },
        '&.MuiTypography-labelLarge': {
          fontSize: '16px',
          lineHeight: '20px',
        },
        '&.MuiTypography-labelMedium': {
          fontSize: '14px',
          lineHeight: '18px',
        },
        '&.MuiTypography-labelSmall': {
          fontSize: '12px',
          lineHeight: '14px',
        },
      },
    },
  },
});

export default typographyOverrides;
