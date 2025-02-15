import Grid from '@mui/material/Grid2';
import Typography from 'components/atoms/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { ReservationStatus, MedicalStatus, reservationPeriodOptions, reservationKeywordTypeOptions } from 'core/enum';
import Select from 'components/atoms/Select';
import TextField from 'components/atoms/Input';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers';

const reservationStatus = Object.keys(ReservationStatus).map(key => ({
  label: ReservationStatus[key as keyof typeof ReservationStatus],
  value: key,
}));

const medicalStatus = Object.keys(MedicalStatus).map(key => ({
  label: MedicalStatus[key as keyof typeof MedicalStatus],
  value: key,
}));

const Filter = () => {
  console.log({ reservationPeriodOptions });

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
            <FormControlLabel control={<Checkbox />} label={item.label} />
          ))}
        </FormGroup>
      </Grid>

      {/* Medical */}
      <Grid size={1.5}>
        <Typography color="textDisabled">진료상태</Typography>
      </Grid>
      <Grid size={10}>
        <FormGroup sx={{ flexDirection: 'row' }}>
          {medicalStatus.map(item => (
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
      <Grid size={0.5}>
        <Typography color="textDisabled">시작일</Typography>
      </Grid>
      <Grid size={1.5}>
        <DatePicker />
      </Grid>
      <Grid size={0.5}>
        <Typography color="textDisabled">종료일</Typography>
      </Grid>
      <Grid size={5}>
        <DatePicker />
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
      <Grid size={5}>
        <TextField fullWidth />
      </Grid>
      <Grid size="grow" display="flex" justifyContent="end" columnGap={1}>
        <Button variant="outlined">Reset</Button>
        <Button variant="contained">Search</Button>
      </Grid>
    </Grid>
  );
};

export default Filter;
