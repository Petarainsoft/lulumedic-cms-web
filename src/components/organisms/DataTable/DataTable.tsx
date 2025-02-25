import styled from '@emotion/styled';
import { Dayjs } from 'dayjs';

// COMPONENTS
import {
  DataGrid,
  DataGridProps,
  GridActionsCellItemProps,
  GridActionsColDef,
  GridColDef,
  GridRowParams,
} from '@mui/x-data-grid';
import Pagination from './slots/Pagination';
import { GridBaseColDef } from '@mui/x-data-grid/internals';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Stack from '@mui/material/Stack';
import { TimePickerProps } from '@mui/x-date-pickers';
import TableToolbar, { TableToolbarProps } from './slots/TableToolbar';

const PAGE_SIZE_OPTIONS = [30, 60, 90];
export const autosizeOptions = {
  includeHeaders: true,
  includeOutliers: true,
};

export type TableGridActionsCellItem = Pick<GridActionsCellItemProps, 'label' | 'icon' | 'onClick' | 'key' | 'sx'> & {
  type: 'edit' | 'delete' | 'add' | 'add-above' | 'add-below';
};

export type TableColDef = Omit<GridBaseColDef, 'type'> &
  GridColDef & {
    hidden?: boolean;
    actions?: GridActionsColDef['type'];
    height?: number;
    noPadding?: boolean;
    formatToTime?: boolean;
    timeSettings?: TimePickerProps<Dayjs>;
    isSum?: boolean;
    getActions?: (params: GridRowParams) => TableGridActionsCellItem[];
  };

export type DataTableProps = Pick<
  DataGridProps,
  | 'className'
  | 'columns'
  | 'rows'
  | 'getRowId'
  | 'pagination'
  | 'isCellEditable'
  | 'experimentalFeatures'
  | 'columnGroupingModel'
  | 'getCellClassName'
  | 'getRowClassName'
  | 'loading'
  | 'onPaginationModelChange'
  | 'paginationMode'
  | 'rowCount'
  | 'paginationModel'
  | 'sx'
  | 'disableRowSelectionOnClick'
  | 'hideFooter'
  | 'hideFooterPagination'
  | 'processRowUpdate'
  | 'onRowModesModelChange'
  | 'onRowEditStart'
  | 'onRowEditStop'
  | 'autoPageSize'
  | 'editMode'
  | 'slots'
  | 'slotProps'
  | 'pageSizeOptions'
  | 'apiRef'
  | 'rowSelectionModel'
  | 'checkboxSelection'
  | 'rowModesModel'
  | 'onRowSelectionModelChange'
  | 'onRowClick'
  | 'onColumnWidthChange'
  | 'autosizeOptions'
  | 'onColumnResize'
> & {
  density?: DataGridProps['density'];
  autoHeight?: DataGridProps['autoHeight'];
  disablePagination?: boolean;
  defaultPageSize?: 30 | 60 | 90;
  showToolbar?: boolean;
  //   noRowsLabel?: NoRowsOverlayProps['label'];
  //   headerTitle?: ToolbarProps['headerTitle'];
  minHeight?: number;
  autoRowHeight?: boolean;
  totalRecord?: number;
  sortFields?: TableToolbarProps['sortFields'];
  //   color?: TableColor; // default: "default"
};

const DataTable = ({
  defaultPageSize = 30,
  minHeight = 300,
  slots,
  slotProps,
  hideFooterPagination,
  totalRecord = 0,
  sortFields,
  ...rest
}: DataTableProps) => {
  return (
    <Stack height="100%" width="100%" direction="column" className="DataTable-Wrapper" overflow="auto">
      <DataGrid
        initialState={{
          pagination: { paginationModel: { pageSize: hideFooterPagination ? -1 : defaultPageSize, page: 0 } },
        }}
        pageSizeOptions={PAGE_SIZE_OPTIONS}
        hideFooterPagination={hideFooterPagination}
        sx={{ minHeight, borderRadius: '8px 8px 0 0' }}
        slots={{
          toolbar: () => (
            <TableToolbar rowsPerPageOptions={PAGE_SIZE_OPTIONS} totalRecord={totalRecord} sortFields={sortFields} />
          ),
          pagination: Pagination,
          moreActionsIcon: MoreHorizIcon,
          noRowsOverlay: () => (
            <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              No data available
            </div>
          ),
          ...slots,
        }}
        slotProps={{
          noRowsOverlay: {
            // label: 'No Data',
          },
          ...slotProps,
        }}
        {...rest}
      />
    </Stack>
  );
};

const DataTableStyled = styled(DataTable)`
  .MuiDataGrid-columnHeaders {
    border-radius: 8px 8px 0 0;
  }
  .MuiDataGrid-columnHeader {
    // border-right: solid 1px;
    // border-right: solid 1px ${p => p.theme.palette?.background?.outlineVariant};
  }
  .MuiDataGrid-cell {
    // padding-left: 20px;
    // padding-right: 20px;
    // border-right: solid 1px ${p => p.theme.palette?.background?.outlineVariant};
  }

  // .MuiDataGrid-row {
  //   border-bottom: solid 1px ${p => p.theme.palette?.background?.outlineVariant};
  //   &:hover {
  //     // background-color: #fff2f2;
  //   }
  // }
`;

export default DataTableStyled;
