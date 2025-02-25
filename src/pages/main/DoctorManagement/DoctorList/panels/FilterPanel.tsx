import Grid from '@mui/material/Grid2';
import Typography from 'components/atoms/Typography';
// import Select from 'components/atoms/Select';
import TextField from 'components/atoms/Input';
import Button from '@mui/material/Button';
import MultipleSelect from 'components/atoms/Select/MultipleSelect';
import { useOutletContext } from 'react-router-dom';
import Department from 'models/appointment/Department';
import { Any, ObjMap } from 'constants/types';
import { useMemo, useState } from 'react';
import Chip from '@mui/material/Chip';
import { SearchFilter } from 'services/DoctorService';

type Props = {
  onFilterChange: (filter: SearchFilter) => void;
};

const FilterPanel = ({ onFilterChange }: Props) => {
  const { departments, departmentsMap } = useOutletContext<{
    departments: Department[];
    departmentsMap: ObjMap<Department>;
  }>();
  const departmentOptions = departments.map(item => ({
    label: item.name,
    value: item.id,
  }));

  const [searchState, setSearchState] = useState<SearchFilter>({});

  const onSearch = () => {
    onFilterChange(searchState);
  };

  const handleChangeFilter = (fieldName: keyof SearchFilter, value: Any) => {
    setSearchState({ ...searchState, [fieldName]: value });
  };

  const onReset = () => {
    setSearchState({});
  };

  const departmentsSelected = useMemo(() => {
    if (searchState.departmentId) {
      const temp = searchState.departmentId
        .map(id => departmentsMap[id])
        .sort((a, b) => a!.name!.localeCompare(b!.name!, 'ko'));

      return temp;
    }

    return [];
  }, [searchState.departmentId]);

  return (
    <Grid container alignItems="center" rowGap={3} borderTop={1} borderBottom={1} py={2} borderColor="divider">
      {/* Department */}
      <Grid size={2}>
        <Typography variant="bodyMedium">진료과</Typography>
      </Grid>

      <Grid size={10} display="flex" columnGap={3} alignItems="center">
        <MultipleSelect
          sx={{ width: 180 }}
          placeholder="진료과 선택"
          options={departmentOptions}
          value={searchState.departmentId || []}
          onChange={val => {
            handleChangeFilter('departmentId', val);
          }}
        />

        <Grid display="flex" columnGap={1} rowGap={1} flexWrap="wrap">
          {departmentsSelected.length
            ? departmentsSelected.map(item => (
                <Chip
                  key={item!.id}
                  label={item!.name || ''}
                  color="primary"
                  onDelete={() => {
                    const clone = [...(searchState?.departmentId || [])];
                    const index = clone.indexOf(item!.id);
                    clone.splice(index, 1);
                    handleChangeFilter('departmentId', clone);
                  }}
                />
              ))
            : null}
        </Grid>
      </Grid>

      <Grid size={2}>
        <Typography variant="bodyMedium">의사 검색</Typography>
      </Grid>

      <Grid size={7}>
        <TextField
          sx={{ width: '30%' }}
          placeholder="의사명을 검색해 주세요"
          value={searchState.name || ''}
          onChange={value => handleChangeFilter('name', value)}
        />
      </Grid>

      <Grid size={3} display="flex" columnGap={1} justifyContent="end">
        <Button variant="outlined" onClick={onReset} className="MuiButton-noBorderRadius">
          검색 초기화
        </Button>
        <Button variant="contained" onClick={onSearch} className="MuiButton-noBorderRadius">
          검색
        </Button>
      </Grid>
    </Grid>
  );
};

export default FilterPanel;
