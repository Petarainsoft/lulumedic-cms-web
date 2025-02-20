import { useEffect, useState, useTransition } from 'react';

import Stack from '@mui/material/Stack';
import FilterPanel from './panels/FilterPanel';
import DoctorListPanel from './panels/DoctorListPanel';
import { fetchDoctors, SearchFilter } from 'services/DoctorService';
import Doctor from 'models/accounts/Doctor';

const DoctorListPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useTransition();
  useEffect(() => {
    (async () => {
      await onSearch();
    })();
  }, []);

  const onSearch = async (payload?: SearchFilter) => {
    setLoading(async () => {
      const rs = await fetchDoctors(payload);

      if (rs) {
        setDoctors(rs);
      }
    });
  };

  return (
    <Stack direction="column" rowGap={3} overflow="auto" height="100%">
      <FilterPanel onFilterChange={onSearch} />
      <DoctorListPanel doctorList={doctors} loading={loading} />
    </Stack>
  );
};

export { DoctorListPage as Component };
