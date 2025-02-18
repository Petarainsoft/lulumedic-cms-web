import Stack from '@mui/material/Stack';
import FilterPanel from './panels/FilterPanel';
import DoctorListPanel from './panels/DoctorListPanel';

const DoctorListPage = () => {
  return (
    <Stack direction="column" rowGap={3} overflow="auto" height="100%">
      <FilterPanel />
      <DoctorListPanel />
    </Stack>
  );
};

export { DoctorListPage as Component };
