import { useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { dayjs } from 'utils/dateTime';

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
  reservationPeriodOptions,
  reservationKeywordTypeOptions,
  ReservationPeriod,
  ReservationKeywordType,
  TreatmentStatusLabel,
} from 'core/enum';

import { Any, ObjMap } from 'constants/types';

// MODELS
import Department from 'models/appointment/Department';
import { SearchFilter } from 'services/ReservationService';

const defaultEndDate = dayjs();
const defaultStartDate = defaultEndDate.subtract(2, 'month');

const filterDefault = {
  period: ReservationPeriod.ReceptionDate,
  keywordType: ReservationKeywordType.Name,

  startDate: defaultStartDate.format('YYYY-MM-DD'),
  endDate: defaultEndDate.format('YYYY-MM-DD'),
};

const reservationStatus = Object.keys(ReservationStatusLabel).map(key => ({
  label: ReservationStatusLabel[key as keyof typeof ReservationStatusLabel],
  value: key,
}));
// .filter(item => item.value !== 'All');

const medicalStatusOptions = Object.keys(TreatmentStatusLabel).map(key => ({
  label: TreatmentStatusLabel[key as keyof typeof TreatmentStatusLabel],
  value: key,
}));

type Props = {
  onFilterChange: (filter: SearchFilter) => void;
};
const Filter = ({ onFilterChange }: Props) => {
  const [searchState, setSearchState] = useState<SearchFilter>(filterDefault);

  const { departments, departmentsMap } = useOutletContext<{
    departments: Department[];
    departmentsMap: ObjMap<Department>;
  }>();
  const departmentOptions = departments.map(item => ({
    label: item.name,
    value: item.id,
  }));

  const handleChangeFilter = (fieldName: keyof SearchFilter, value: Any) => {
    if (fieldName === 'startDate') {
      if (dayjs(value).isAfter(searchState.endDate)) {
        searchState.startDate = searchState.endDate;
        searchState.endDate = value;

        setSearchState({ ...searchState });
      }
    } else if (fieldName === 'endDate') {
      if (dayjs(value).isBefore(searchState.startDate)) {
        searchState.endDate = searchState.startDate;
        searchState.startDate = value;

        setSearchState({ ...searchState });
      }
    } else {
      setSearchState({ ...searchState, [fieldName]: value });
    }
  };

  const onSearch = () => {
    onFilterChange(searchState);
  };

  const onReset = () => {
    setSearchState(filterDefault);
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
    <Grid
      container
      alignItems="center"
      rowGap={2}
      columnGap={1}
      borderTop={1}
      borderBottom={1}
      borderColor="divider"
      py={2}
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
          values={searchState?.treatmentStatus}
          options={medicalStatusOptions}
          onChange={val => handleChangeFilter('treatmentStatus', val)}
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
          value={searchState.departmentId}
          onChange={val => {
            handleChangeFilter('departmentId', val);
          }}
        />

        <Grid display="flex" columnGap={1} rowGap={1} flexWrap="wrap">
          {departmentsSelected.length
            ? departmentsSelected.map(item => (
                <Chip
                  key={item?.id}
                  label={item?.name || ''}
                  color="primary"
                  onDelete={() => {
                    const clone = [...(searchState.departmentId || [])];
                    const index = clone.indexOf(item!.id);
                    clone.splice(index, 1);
                    handleChangeFilter('departmentId', clone);
                  }}
                />
              ))
            : null}
        </Grid>
      </Grid>

      <Grid size={12} container columnGap={1} alignItems="center">
        {/* Period */}
        <Grid size={1.5}>
          <Typography color="textDisabled">기간</Typography>
        </Grid>
        <Grid size="auto">
          <Select
            sx={{ width: 180 }}
            fullWidth
            value={searchState?.period}
            placeholder="접수일자"
            options={reservationPeriodOptions}
            onChange={val => handleChangeFilter('period', val)}
          />
        </Grid>
        {/* DATE */}

        <Grid size="auto">
          <Typography color="textDisabled">시작일</Typography>
        </Grid>
        <Grid size={1.5}>
          <DatePicker
            value={dayjs(searchState?.startDate)}
            format="YYYY-MM-DD"
            onChange={val => handleChangeFilter('startDate', val?.format('YYYY-MM-DD'))}
          />
        </Grid>
        <Grid size="auto">
          <Typography color="textDisabled">종료일</Typography>
        </Grid>
        <Grid size={1.5}>
          <DatePicker
            value={dayjs(searchState?.endDate)}
            format="YYYY-MM-DD"
            onChange={val => handleChangeFilter('endDate', val?.format('YYYY-MM-DD'))}
          />
        </Grid>
      </Grid>

      {/* Search keyword */}
      <Grid size={12} container columnGap={1} alignItems="center">
        <Grid size={1.5}>
          <Typography color="textDisabled">검색 키워드</Typography>
        </Grid>
        <Grid size="auto">
          <Select
            sx={{ width: 180 }}
            value={searchState?.keywordType}
            placeholder="검색 키워드"
            options={reservationKeywordTypeOptions}
            onChange={val => handleChangeFilter('keywordType', val)}
          />
        </Grid>
        <Grid size={4}>
          <TextField
            fullWidth
            placeholder="키워드를 입력해 주세요"
            value={searchState?.keyword || ''}
            onChange={val => handleChangeFilter('keyword', val)}
          />
        </Grid>

        <Grid size="grow" display="flex" justifyContent="end" px={1} columnGap={1}>
          <Button variant="outlined" className="MuiButton-noBorderRadius" onClick={onReset}>
            검색 초기화
          </Button>
          <Button variant="contained" className="MuiButton-noBorderRadius" onClick={onSearch}>
            검색
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Filter;
