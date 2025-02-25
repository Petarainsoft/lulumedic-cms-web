import Stack from '@mui/material/Stack';
import {
  // gridFilteredTopLevelRowCountSelector,
  gridPageSizeSelector,
  // gridPaginationModelSelector,
  GridSortItem,
  useGridApiContext,
  // useGridRootProps,
  useGridSelector,
} from '@mui/x-data-grid';
import Select from 'components/atoms/Select';
import Typography from 'components/atoms/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { SelectOption } from 'constants/elements';
import { ID } from 'constants/types';

// const getPageCount = (rowCount: number, pageSize: number): number => {
//   if (pageSize > 0 && rowCount > 0) {
//     return Math.ceil(rowCount / pageSize);
//   }

//   return 0;
// };

export type SortField = Pick<SelectOption, 'label'> & GridSortItem;

export type TableToolbarProps = {
  totalRecord: number;
  rowsPerPageOptions?: number[];
  sortFields?: SortField[];
};

const TableToolbar = ({ totalRecord, rowsPerPageOptions = [30, 60, 90], sortFields }: TableToolbarProps) => {
  const apiRef = useGridApiContext();
  // const paginationModel = useGridSelector(apiRef, gridPaginationModelSelector);
  // const rootProps = useGridRootProps();

  // error on v6 @mui/x-data-grid
  // https://github.com/mui/mui-x/issues/8450
  // const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  // TODO
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);
  // const visibleTopLevelRowCount = useGridSelector(apiRef, gridFilteredTopLevelRowCountSelector);
  // const pageCount = getPageCount(rootProps.rowCount ?? visibleTopLevelRowCount, pageSize);
  // const rowCount = rootProps.rowCount ?? visibleTopLevelRowCount;

  const sortFieldOptions = (sortFields || [])?.map(item => ({
    label: item.label,
    value: item.field,
  }));

  const sortFieldMap = (sortFields || []).reduce(
    (result, current) => {
      result[current.field] = current;

      return result;
    },
    {} as Record<GridSortItem['field'], GridSortItem>
  );

  const onSort = (value: ID) => {
    const item = sortFieldMap[value];

    apiRef.current.setSortModel([
      {
        field: item.field,
        sort: item.sort,
      },
    ]);
  };

  return (
    <Stack alignItems="center" direction="row" my={1} columnGap={1}>
      <Typography flex="1" color="primary" variant="titleLarge" fontWeight="bold">
        리스트 {totalRecord}
      </Typography>

      {sortFieldOptions.length ? (
        <Select
          options={sortFieldOptions}
          sx={{ boxShadow: 'none', width: 120 }}
          defaultValue={sortFieldOptions[0]?.value}
          onChange={onSort}
        />
      ) : null}

      <Select
        value={pageSize}
        onChange={value => apiRef.current.setPageSize(+value)}
        options={rowsPerPageOptions.map(num => ({ label: num.toString(), value: num }))}
        name="rowsPage"
        IconComponent={params => <KeyboardArrowDownIcon {...params} fontSize="small" color="secondary" />}
        sx={{ boxShadow: 'none', width: 80 }}
      />
    </Stack>
  );
};

export default TableToolbar;
