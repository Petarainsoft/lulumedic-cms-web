// COMPONENTS
import AppPagination from 'components/molecules/Pagination';

import {
  gridPaginationModelSelector,
  useGridApiContext,
  useGridSelector,
  gridPageSizeSelector,
  gridFilteredTopLevelRowCountSelector,
  useGridRootProps,
} from '@mui/x-data-grid';

const getPageCount = (rowCount: number, pageSize: number): number => {
  if (pageSize > 0 && rowCount > 0) {
    return Math.ceil(rowCount / pageSize);
  }

  return 0;
};

const Pagination = () => {
  const apiRef = useGridApiContext();
  const paginationModel = useGridSelector(apiRef, gridPaginationModelSelector);
  const rootProps = useGridRootProps();

  // error on v6 @mui/x-data-grid
  // https://github.com/mui/mui-x/issues/8450
  // const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  // TODO
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);
  const visibleTopLevelRowCount = useGridSelector(apiRef, gridFilteredTopLevelRowCountSelector);
  const pageCount = getPageCount(rootProps.rowCount ?? visibleTopLevelRowCount, pageSize);
  const rowCount = rootProps.rowCount ?? visibleTopLevelRowCount;

  return (
    <AppPagination
      pageCount={pageCount}
      page={paginationModel.page + 1}
      pageSize={paginationModel.pageSize}
      onPageChange={value => apiRef.current.setPage(value - 1)}
      onPageSizeChange={value => apiRef.current.setPageSize(value)}
      total={rowCount}
    />
  );
};

export default Pagination;
