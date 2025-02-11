import { Components } from '@mui/material';

const selectOverrides = (): Pick<Components, 'MuiSelect'> => ({
  MuiSelect: {
    defaultProps: {
      disableUnderline: true,
    },

    styleOverrides: {
      root: {},
    },
  },
});

export default selectOverrides;
