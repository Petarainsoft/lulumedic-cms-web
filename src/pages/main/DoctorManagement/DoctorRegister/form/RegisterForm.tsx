import { useNavigate, useOutletContext } from 'react-router-dom';
import { MAIN_PATH } from 'routes';

import Grid from '@mui/material/Grid2';
import Typography from 'components/atoms/Typography';
import { TextFieldProps } from 'components/atoms/Input';
import { SelectForm, SelectProps } from 'components/atoms/Select';
import RadioGroup, { RadioGroupProps } from 'components/atoms/Radio/RadioGroup';
import { InputForm } from 'components/atoms/Input';
import { useFormContext } from 'components/atoms/Form/Form';
import Button from '@mui/material/Button';

// ENUMS
import {
  reservationPossibleOptions,
  cancelPossibleOptions,
  exposureOptions,
  reservationConfirmOptions,
  Exposure,
  ReservationConfirm,
} from 'core/enum';

import { SelectOption } from 'constants/elements';
import { DoctorDto } from 'models/accounts/Doctor';

const minuteOptions = [
  {
    label: '5 분',
    value: 5,
  },
  {
    label: '10 분',
    value: 10,
  },
];

const peopleNumber = Array.from({ length: 99 }, (_, i) => ({
  label: `${i + 1} 명`,
  value: `${i + 1}`,
}));

const InputGroup = ({ label, ...rest }: TextFieldProps & { label: string }) => {
  return (
    <Grid size={12} container>
      <Grid size={3}>
        <Typography color="textDisabled">{label}</Typography>
      </Grid>
      <Grid
        size={{
          sm: 8,
          md: 4,
        }}
      >
        <InputForm fullWidth {...rest} />
      </Grid>
    </Grid>
  );
};

const SelectGroup = ({ label, defaultValue, options, ...rest }: SelectProps & { label: string }) => {
  return (
    <Grid size={12} container>
      <Grid size={3}>
        <Typography color="textDisabled">{label}</Typography>
      </Grid>
      <Grid
        size={{
          sm: 8,
          md: 4,
        }}
      >
        <SelectForm defaultValue={defaultValue} options={options} fullWidth {...rest} />
      </Grid>
    </Grid>
  );
};

const RadioGroupBox = ({ options, label, ...rest }: RadioGroupProps & { label: string }) => {
  return (
    <Grid size={12} container>
      <Grid size={3}>
        <Typography color="textDisabled">{label}</Typography>
      </Grid>

      <Grid
        size={{
          sm: 8,
          md: 4,
        }}
      >
        <RadioGroup options={options} {...rest} />
      </Grid>
    </Grid>
  );
};

type Props = {
  doctorDetail?: DoctorDto;
};
const RegisterForm = ({ doctorDetail }: Props) => {
  const navigate = useNavigate();
  const {
    methods: {
      setValue,
      formState: { errors },
    },
  } = useFormContext();

  const { departmentOptions } = useOutletContext<{
    departmentOptions: SelectOption[];
  }>();

  const getErrorMessage = (name: string) => {
    return (errors[name]?.message as string) || '';
  };

  return (
    <Grid container height="100%" overflow="auto">
      <Grid size={12} container alignItems="center" px={2} rowGap={2} overflow="auto">
        {/* Department */}
        <SelectGroup
          label="진료과"
          name="departmentId"
          placeholder="진료과를 선택해 주세요"
          // defaultValue={doctorDetail?.departmentId}
          options={departmentOptions}
          error={!!getErrorMessage('departmentId')}
          helperText={getErrorMessage('departmentId')}
        />
        {/* employeeId */}
        {/* <InputForm name="degree" placeholder="사번을 입력해 주세요" /> */}
        <InputGroup
          name="degree"
          helperText={getErrorMessage('degree')}
          error={!!getErrorMessage('degree')}
          label="사번"
          placeholder="사번을 입력해 주세요"
        />
        {/* Name */}
        <InputGroup
          name="name"
          helperText={getErrorMessage('name')}
          error={!!getErrorMessage('name')}
          label="의사명"
          placeholder="의사명 입력해 주세요"
        />
        {/* Contact */}
        <InputGroup
          name="phone"
          error={!!getErrorMessage('phone')}
          helperText={getErrorMessage('phone')}
          label="연락처"
          placeholder="연락처를 입력해 주세요"
        />
        {/* Position */}
        <InputGroup
          name="position"
          error={!!getErrorMessage('position')}
          helperText={getErrorMessage('position')}
          label="포지션"
          placeholder="포지션을 입력해 주세요"
        />
        {/* Expertise */}
        <InputGroup
          name="specialty"
          error={!!getErrorMessage('specialty')}
          label="전문분야"
          placeholder="전문분야를 입력해 주세요"
        />
        {/* 진료기준 */}
        <Grid size={3}>
          <Typography color="textDisabled">진료기준</Typography>
        </Grid>
        <Grid
          size={{
            sm: 8,
            md: 4,
          }}
          display="flex"
          container
        >
          <Grid size={12} columnGap={1} display="flex">
            <SelectForm
              options={minuteOptions}
              fullWidth={false}
              sx={{ width: 80 }}
              name="treatmentCriteriaTimes"
              // defaultValue={doctorDetail?.treatmentCriteriaTimes}
              placeholder="분"
              error={!!getErrorMessage('treatmentCriteriaTimes')}
            />
            <SelectForm
              options={peopleNumber}
              sx={{ width: 110 }}
              fullWidth={false}
              name="treatmentCriteriaNumberOfPeople"
              // defaultValue={doctorDetail?.treatmentCriteriaNumberOfPeople}
              placeholder="인원 선택"
              error={!!getErrorMessage('treatmentCriteriaNumberOfPeople')}
            />
          </Grid>
          <Grid size={12}>
            <Typography color="error" variant="bodySmall">
              {getErrorMessage('treatmentCriteriaTimes') || getErrorMessage('treatmentCriteriaNumberOfPeople')}
            </Typography>
          </Grid>
        </Grid>

        <SelectGroup
          label="진료 예약 설정"
          options={reservationPossibleOptions}
          name="reservationAvailableDates"
          // defaultValue={doctorDetail?.reservationAvailableDates}
          placeholder="진료예약 기준일 선택해 주세요"
          error={!!getErrorMessage('reservationAvailableDates')}
          helperText={getErrorMessage('reservationAvailableDates')}
        />
        <SelectGroup
          label="진료 예약 취소"
          name="cancellationAvailableDates"
          // defaultValue={doctorDetail?.cancellationAvailableDates}
          options={cancelPossibleOptions}
          placeholder="취소 기준일 선택해 주세요"
          error={!!getErrorMessage('cancellationAvailableDates')}
          helperText={getErrorMessage('cancellationAvailableDates')}
        />

        <RadioGroupBox
          label="예약확정"
          defaultValue={doctorDetail?.autoConfirmReservation ? ReservationConfirm.Auto : ReservationConfirm.Manual}
          options={reservationConfirmOptions}
          onChange={value => {
            setValue('autoConfirmReservation', value);
          }}
        />
        <RadioGroupBox
          label="노출여부"
          options={exposureOptions}
          defaultValue={doctorDetail?.exposure ? Exposure.Exposure : Exposure.NotExposure}
          onChange={value => {
            setValue('exposure', value);
          }}
        />
      </Grid>
      <Grid size={12} display="flex" justifyContent="center" columnGap={2} mt={6}>
        <Button variant="outlined" sx={{ width: 150 }} onClick={() => navigate(`/${MAIN_PATH.DOCTOR_MANAGEMENT}`)}>
          취소
        </Button>
        <Button variant="contained" sx={{ width: 150 }} type="submit">
          저장
        </Button>
      </Grid>
    </Grid>
  );
};

export default RegisterForm;
