import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Select from 'components/atoms/Select';

// ICONS
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export type PaginationProps = {
  className?: string;
  page: number;
  pageCount?: number;
  total?: number;
  pageSize: number;
  rowsPerPageOptions?: number[];
  onPageChange: (newPage: number) => void;
  onPageSizeChange?: (newPageSize: number) => void;
};

const AppPagination = ({
  className,
  page = 1,
  pageCount,
  total = 0,
  pageSize,
  rowsPerPageOptions = [5, 10, 20],
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  return (
    <Grid
      className={className}
      container
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      columnSpacing={10}
      mt={2}
    >
      <Grid size="auto" sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="labelLarge" color="text.secondary">
          Page Size
        </Typography>

        <Select
          value={pageSize}
          onChange={value => onPageSizeChange?.(value as number)}
          options={rowsPerPageOptions.map(num => ({ label: num.toString(), value: num }))}
          name="rowsPage"
          IconComponent={params => <KeyboardArrowDownIcon {...params} fontSize="small" color="secondary" />}
          sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 }, width: 80 }}
        />
      </Grid>

      <Grid size="auto">
        <Pagination
          count={pageCount}
          color="primary"
          page={page}
          shape="rounded"
          onChange={(e, newPage) => onPageChange(newPage)}
        />
      </Grid>

      <Grid size="auto" sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="labelLarge" color="text.secondary">
          Total {total}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default AppPagination;
