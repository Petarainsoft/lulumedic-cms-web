import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import Grid from '@mui/material/Grid2';
import Typography from 'components/atoms/Typography';
import MultipleSelect from 'components/atoms/Select/MultipleSelect';
import CheckboxGroup from 'components/atoms/Checkbox/CheckboxGroup';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Select from 'components/atoms/Select';
import TextField from 'components/atoms/Input';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

import {
  ReservationStatusLabel,
  MedicalStatus,
  reservationPeriodOptions,
  reservationKeywordTypeOptions,
  STATUS_TYPE,
} from 'core/enum';

import { Any, ObjMap } from 'constants/types';

// MODELS
import Department from 'models/appointment/Department';
import { SearchFilter } from 'services/ReservationService';

const reservationStatus = Object.keys(ReservationStatusLabel)
  .map(key => ({
    label: ReservationStatusLabel[key as keyof typeof ReservationStatusLabel],
    value: key,
  }))
  .filter(item => item.value !== 'All' && item.value !== STATUS_TYPE.COMPLETED);

const medicalStatusOptions = Object.keys(MedicalStatus)
  .map(key => ({
    label: MedicalStatus[key as keyof typeof MedicalStatus],
    value: key,
  }))
  .filter(item => item.value !== 'All' && item.value !== 'Waiting');

type Props = {
  onFilterChange: (filter: SearchFilter) => void;
};
const Filter = ({ onFilterChange }: Props) => {
  const [searchState, setSearchState] = useState<SearchFilter>({});

  const { departments, departmentsMap } = useOutletContext<{
    departments: Department[];
    departmentsMap: ObjMap<Department>;
  }>();
  const departmentOptions = departments.map(item => ({
    label: item.name,
    value: item.id,
  }));
  const handleChangeFilter = (fieldName: keyof SearchFilter, value: Any) => {
    setSearchState({ ...searchState, [fieldName]: value });
  };

  const onSearch = () => {
    onFilterChange(searchState);
  };

  const onReset = () => {
    setSearchState({});
  };
  return (
    <Grid
      container
      alignItems="center"
      rowGap={2}
      columnSpacing={1}
      borderTop={1}
      borderBottom={1}
      borderColor="divider"
      py={4}
    >
      <Grid size={1.5}>
        <Typography color="textDisabled">예약상태</Typography>
      </Grid>
      <Grid size={10}>
        <CheckboxGroup
          values={searchState?.status}
          options={reservationStatus}
          onChange={val => handleChangeFilter('status', val)}
        />
      </Grid>

      {/* Medical */}
      <Grid size={1.5}>
        <Typography color="textDisabled">진료상태</Typography>
      </Grid>
      <Grid size={10}>
        <CheckboxGroup
          values={searchState?.medicalStatus}
          options={medicalStatusOptions}
          onChange={val => handleChangeFilter('medicalStatus', val)}
        />
      </Grid>

      {/* Department */}
      <Grid size={1.5}>
        <Typography color="textDisabled">진료과</Typography>
      </Grid>
      <Grid size={10} display="flex" columnGap={3} alignItems="center">
        <MultipleSelect
          sx={{ width: 180 }}
          placeholder="진료과 선택"
          options={departmentOptions}
          value={searchState.department}
          onChange={val => {
            handleChangeFilter('department', val);
          }}
        />

        <Grid display="flex" columnGap={1} rowGap={1} flexWrap="wrap">
          {(searchState.department || []).map(item => (
            <Chip
              key={item}
              label={departmentsMap[item]?.name || ''}
              color="primary"
              onDelete={() => {
                const clone = [...(searchState.department || [])];
                const index = clone.indexOf(item);
                clone.splice(index, 1);
                handleChangeFilter('department', clone);
              }}
            />
          ))}
        </Grid>
      </Grid>

      {/* Period */}
      <Grid size={1.5}>
        <Typography color="textDisabled">기간</Typography>
      </Grid>
      <Grid size={2}>
        <Select
          sx={{ width: 180 }}
          fullWidth
          value={searchState?.period || reservationPeriodOptions[1].value}
          placeholder="접수일자"
          options={reservationPeriodOptions}
          onChange={val => handleChangeFilter('period', val)}
        />
      </Grid>

      {/* DATE */}
      <Grid size="auto">
        <Typography color="textDisabled">시작일</Typography>
      </Grid>
      <Grid size={2}>
        <DatePicker format="YYYY-MM-DD" />
      </Grid>
      <Grid size="auto">
        <Typography color="textDisabled">종료일</Typography>
      </Grid>
      <Grid size={{ xs: 4, sm: 5 }}>
        <DatePicker format="YYYY-MM-DD" />
      </Grid>

      {/* Search keyword */}
      <Grid size={1.5}>
        <Typography color="textDisabled">검색 키워드</Typography>
      </Grid>
      <Grid size="auto">
        <Select
          sx={{ width: 180 }}
          value={searchState?.keywordType || reservationKeywordTypeOptions[0].value}
          placeholder="검색 키워드"
          options={reservationKeywordTypeOptions}
          onChange={val => handleChangeFilter('keywordType', val)}
        />
      </Grid>
      <Grid size={{ xs: 5, md: 6 }}>
        <TextField
          fullWidth
          placeholder="키워드를 입력해 주세요"
          value={searchState?.keyword || ''}
          onChange={val => handleChangeFilter('keyword', val)}
        />
      </Grid>
      <Grid size="grow" display="flex" justifyContent="end" px={1} columnGap={1}>
        <Button variant="outlined" onClick={onReset}>
          검색 초기화
        </Button>
        <Button variant="contained" onClick={onSearch}>
          검색
        </Button>
      </Grid>
    </Grid>
  );
};

export default Filter;
