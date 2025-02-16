import Grid from '@mui/material/Grid2';
import Typography from 'components/atoms/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import {
  ReservationStatus,
  MedicalStatus,
  reservationPeriodOptions,
  reservationKeywordTypeOptions,
  ReservationPeriod,
  ReservationKeywordType,
} from 'core/enum';
import Select from 'components/atoms/Select';
import TextField from 'components/atoms/Input';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import useValuesRef from 'hooks/useValuesRef';
import { Any } from 'constants/types';

const reservationStatus = Object.keys(ReservationStatus).map(key => ({
  label: ReservationStatus[key as keyof typeof ReservationStatus],
  value: key,
}));

const medicalStatusOptions = Object.keys(MedicalStatus).map(key => ({
  label: MedicalStatus[key as keyof typeof MedicalStatus],
  value: key,
}));

type SearchFilter = {
  status?: ReservationStatus[];
  medicalStatus?: MedicalStatus[];
  department?: string;
  period?: ReservationPeriod;
  startDate?: string;
  endDate?: string;
  keywordType?: ReservationKeywordType;
  keyword?: string;
};
const Filter = () => {
  const [searchRefs, setSearchRefs] = useValuesRef<SearchFilter>({});

  const handleChangeFilter = (fieldName: keyof SearchFilter, value: Any) => {
    if (fieldName == 'status') {
      // TODO
      const clone = [...((searchRefs.current.status as Any) || [])];
      clone.push(value);
      setSearchRefs('status', clone as Any);
    }

    if (fieldName == 'medicalStatus') {
    }
  };

  const handleCheckbox = (
    fieldName: keyof SearchFilter,
    checked: boolean,
    value: ReservationStatus | MedicalStatus
  ) => {
    if (fieldName == 'status') {
      // TODO

      if (checked) {
        const clone = [...((searchRefs.current.status as Any) || [])];
        clone.push(value);
        setSearchRefs('status', clone as Any);
      } else {
        const clone = [...((searchRefs.current.status as Any) || [])];
        clone.splice(clone.indexOf(value), 1);
        setSearchRefs('status', clone as Any);
      }
    }

    if (fieldName == 'medicalStatus') {
      if (checked) {
        const clone = [...((searchRefs.current.status as Any) || [])];
        clone.push(value);
        setSearchRefs('medicalStatus', clone as Any);
      } else {
        const clone = [...((searchRefs.current.status as Any) || [])];
        clone.splice(clone.indexOf(value), 1);
        setSearchRefs('medicalStatus', clone as Any);
      }
    }
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
        <FormGroup sx={{ flexDirection: 'row' }}>
          {reservationStatus.map(item => (
            <FormControlLabel
              control={
                <Checkbox
                  onChange={e => {
                    handleCheckbox('status', e.target.checked, item.value as ReservationStatus);
                    console.log(searchRefs.current);
                  }}
                />
              }
              label={item.label}
            />
          ))}
        </FormGroup>
      </Grid>

      {/* Medical */}
      <Grid size={1.5}>
        <Typography color="textDisabled">진료상태</Typography>
      </Grid>
      <Grid size={10}>
        <FormGroup sx={{ flexDirection: 'row' }}>
          {medicalStatusOptions.map(item => (
            <FormControlLabel control={<Checkbox />} label={item.label} />
          ))}
        </FormGroup>
      </Grid>

      {/* Department */}
      <Grid size={1.5}>
        <Typography color="textDisabled">진료상태</Typography>
      </Grid>
      <Grid size={10}>
        <Select sx={{ width: 180 }} placeholder="진료과 선택" />
      </Grid>

      {/* Period */}
      <Grid size={1.5}>
        <Typography color="textDisabled">기간</Typography>
      </Grid>
      <Grid size={2}>
        <Select
          sx={{ width: 180 }}
          fullWidth
          defaultValue={reservationPeriodOptions[1].value}
          placeholder="접수일자"
          options={reservationPeriodOptions}
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
      <Grid size={4}>
        <DatePicker format="YYYY-MM-DD" />
      </Grid>

      {/* Search keyword */}
      <Grid size={1.5}>
        <Typography color="textDisabled">검색 키워드</Typography>
      </Grid>
      <Grid size="auto">
        <Select
          sx={{ width: 180 }}
          defaultValue={reservationKeywordTypeOptions[0].value}
          placeholder="검색 키워드"
          options={reservationKeywordTypeOptions}
        />
      </Grid>
      <Grid size={6}>
        <TextField fullWidth placeholder="키워드를 입력해 주세요" />
      </Grid>
      <Grid size="grow" display="flex" justifyContent="end" px={1} columnGap={1}>
        <Button variant="outlined">검색 초기화</Button>
        <Button variant="contained">검색</Button>
      </Grid>
    </Grid>
  );
};

export default Filter;
