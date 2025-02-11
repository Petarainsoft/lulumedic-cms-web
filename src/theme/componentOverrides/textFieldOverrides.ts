import { Components } from '@mui/material';

declare module '@mui/material/InputBase' {
  interface InputBasePropsSizeOverrides {
    large: true;
  }
}

const textFieldOverrides = (): Pick<Components, 'MuiInputBase'> => ({
  MuiInputBase: {
    defaultProps: {},

    styleOverrides: {
      root: {
        '&.MuiInputBase-root': {
          fontWeight: 400,
          // MEDIUM
          fontSize: '14px',
          lineHeight: '20px',
          backgroundColor: '#f8f8f8',
        },

        '&.MuiOutlinedInput-root': {
          '&:hover': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#F0921C',
            },
          },
          '&.Mui-focused': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#F0921C',
              borderWidth: 1,
            },
          },
        },

        '&.MuiInputBase-noBorder': {
          borderRadius: '0px',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
          },

          '&:hover': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent',
            },
          },
        },

        '&.MuiInputBase-transparent': {
          backgroundColor: 'transparent',
        },
      },
      input: {
        '&.MuiInputBase-input': {
          padding: '12px 16px',
        },

        '&.MuiInputBase-inputSizeLarge': {
          fontSize: '16px',
          lineHeight: '24px',
        },

        '&.MuiInputBase-inputSizeSmall': {
          fontSize: '12px',
          lineHeight: '16px',
        },
      },
    },
  },
});

export default textFieldOverrides;
