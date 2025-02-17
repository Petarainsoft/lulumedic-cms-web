import Grid from '@mui/material/Grid2';
import Typography from 'components/atoms/Typography';
import Select from 'components/atoms/Select';
import TextField from 'components/atoms/Input';
import Button from '@mui/material/Button';
import MultipleSelect from 'components/atoms/Select/MultipleSelect';
import { useOutletContext } from 'react-router-dom';
import Department from 'models/appointment/Department';
import { ID, ObjMap } from 'constants/types';
import { useState } from 'react';
import Chip from '@mui/material/Chip';

const FilterPanel = () => {
  const { departments, departmentsMap } = useOutletContext<{
    departments: Department[];
    departmentsMap: ObjMap<Department>;
  }>();
  const departmentOptions = departments.map(item => ({
    label: item.name,
    value: item.id,
  }));

  const [departmentsSelected, setDepartmentsSelected] = useState<ID[]>([]);

  return (
    <Grid container alignItems="center" rowGap={5} borderTop={1} borderBottom={1} py={2} borderColor="divider">
      {/* Department */}
      <Grid size={2}>
        <Typography variant="bodyMedium">진료과</Typography>
      </Grid>

      <Grid size={10} display="flex" columnGap={3} alignItems="center">
        <MultipleSelect
          sx={{ width: 180 }}
          placeholder="진료과 선택"
          options={departmentOptions}
          value={departmentsSelected}
          onChange={val => {
            setDepartmentsSelected(val);
          }}
        />

        <Grid display="flex" columnGap={1} rowGap={1} flexWrap="wrap">
          {(departmentsSelected || []).map(item => (
            <Chip
              key={item}
              label={departmentsMap[item]?.name || ''}
              color="primary"
              onDelete={() => {
                const clone = [...(departmentsSelected || [])];
                const index = clone.indexOf(item);
                clone.splice(index, 1);
                setDepartmentsSelected(clone);
              }}
            />
          ))}
        </Grid>
      </Grid>

      <Grid size={2}>
        <Typography variant="bodyMedium">의사 검색</Typography>
      </Grid>

      <Grid size={7}>
        <TextField sx={{ width: '30%' }} placeholder="의사명을 검색해 주세요" />
      </Grid>

      <Grid size={3} display="flex" columnGap={1} justifyContent="end">
        <Button variant="outlined" className="MuiButton-noBorderRadius">
          검색 초기화
        </Button>
        <Button variant="contained" className="MuiButton-noBorderRadius">
          검색
        </Button>
      </Grid>
    </Grid>
  );
};

export default FilterPanel;
