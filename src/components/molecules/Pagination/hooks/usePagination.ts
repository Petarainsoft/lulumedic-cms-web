import { GridPaginationModel } from '@mui/x-data-grid';
import { useState } from 'react';
import { Pagination } from 'services/base/BaseApi';

type TPagination = GridPaginationModel & {
  count?: number;
};

const usePagination = () => {
  const [paginationModel, setPaginationModel] = useState<TPagination>({
    page: 0,
    pageSize: 30,
    count: 0,
  });

  const setPagination = (value: TPagination) => {
    setPaginationModel(value);
  };

  const onPaginationChangePage = (value: Pagination) => {
    setPaginationModel(prev => ({
      ...prev,
      ...value,
    }));
  };

  return {
    paginationModel,
    setPagination,
    onPaginationChangePage,
  };
};

export default usePagination;
