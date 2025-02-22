import { Components } from '@mui/material';

const tableOverrides = (): Pick<Components, 'MuiTableHead' | 'MuiTableCell' | 'MuiDataGrid'> => ({
  MuiDataGrid: {
    styleOverrides: {
      root: {
        '.MuiDataGrid-withBorderColor ': {
          borderColor: '#E5E2E1',
        },
        '.MuiDataGrid-columnHeader': {
          borderRight: '1px solid #E5E2E1',
          borderBottom: '1px solid #E5E2E1',
          // backgroundColor: '#f5f2ec',

          '.MuiDataGrid-columnHeaderTitleContainer': {
            borderBottomWidth: 0,
          },
        },

        '.MuiDataGrid-cell': {
          borderBottom: '1px solid #E5E2E1',
          '&.no-padding': {
            padding: 0,
          },
        },
      },
    },
  },

  MuiTableHead: {
    defaultProps: {},

    styleOverrides: {
      root: {
        '&.MuiTableHead-root': {
          // backgroundColor: '#f5f2ec',
        },
      },
    },
  },

  MuiTableCell: {
    defaultProps: {},

    styleOverrides: {
      root: {
        '&.MuiTableCell-root': {
          borderRight: '1px solid #E5E2E1',
          textAlign: 'center',
        },

        '&.MuiTableCell-root-head': {
          // backgroundColor: '#f5f2ec',
        },

        '&.MuiTableCell-root-noPadding': {
          padding: 0,
        },
      },
    },
  },
});

export default tableOverrides;
