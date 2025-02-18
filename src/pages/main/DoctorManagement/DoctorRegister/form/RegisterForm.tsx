import Grid from '@mui/material/Grid2';
import Typography from 'components/atoms/Typography';
import TextField, { TextFieldProps } from 'components/atoms/Input';
import Select, { SelectProps } from 'components/atoms/Select';
import RadioGroup, { RadioGroupProps } from 'components/atoms/Radio/RadioGroup';

// ENUMS
import {
  reservationPossibleOptions,
  cancelPossibleOptions,
  exposureOptions,
  reservationConfirmOptions,
} from 'core/enum';
import { Button } from '@mui/material';
import { Any } from 'constants/types';
import { useNavigate } from 'react-router-dom';
import { MAIN_PATH } from 'routes';

const minuteOptions = [
  {
    label: '5 분',
    value: '5 분',
  },
  {
    label: '10 분',
    value: '10 분',
  },
];

const peopleNumber = Array.from({ length: 99 }, (_, i) => ({
  label: `${i + 1} 명`,
  value: `${i + 1} 명`,
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
        <TextField fullWidth {...rest} />
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
        <Select defaultValue={defaultValue} options={options} fullWidth {...rest} />
      </Grid>
    </Grid>
  );
};

const RadioGroupBox = ({ options, label }: RadioGroupProps & { label: string }) => {
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
        <RadioGroup options={options} />
      </Grid>
    </Grid>
  );
};

type Props = {
  doctorDetail?: Any;
};
const RegisterForm = ({ doctorDetail }: Props) => {
  const navigate = useNavigate();

  console.log({ doctorDetail });

  return (
    <Grid container height="100%" overflow="auto">
      <Grid size={12} container alignItems="center" px={2} rowGap={2} overflow="auto">
        {/* Department */}
        <SelectGroup label="진료과" placeholder="진료과를 선택해 주세요" />
        {/* employeeId */}
        <InputGroup defaultValue={doctorDetail?.employeeNumber} label="사번" placeholder="사번을 입력해 주세요" />
        {/* Name */}
        <InputGroup defaultValue={doctorDetail?.name} label="의사명" placeholder="의사명 입력해 주세요" />
        {/* Contact */}
        <InputGroup defaultValue={doctorDetail?.contact} label="연락처" placeholder="연락처를 입력해 주세요" />
        {/* Position */}
        <InputGroup defaultValue={doctorDetail?.position} label="포지션" placeholder="포지션을 입력해 주세요" />
        {/* Expertise */}
        <InputGroup
          defaultValue={doctorDetail?.medicalCondition}
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
          columnGap={1}
        >
          <Select options={minuteOptions} sx={{ width: 80 }} placeholder="분" />
          <Select options={peopleNumber} sx={{ width: 110 }} placeholder="인원 선택" />
        </Grid>

        <SelectGroup
          label="진료 예약 설정"
          options={reservationPossibleOptions}
          placeholder="진료예약 기준일 선택해 주세요"
        />
        <SelectGroup label="진료 예약 취소" options={cancelPossibleOptions} placeholder="취소 기준일 선택해 주세요" />

        <RadioGroupBox
          label="예약확정"
          value={doctorDetail?.autoConfirmReservation}
          options={reservationConfirmOptions}
        />
        <RadioGroupBox label="노출여부" options={exposureOptions} />
      </Grid>
      <Grid size={12} display="flex" justifyContent="center" columnGap={2} mt={6}>
        <Button variant="outlined" sx={{ width: 150 }} onClick={() => navigate(`/${MAIN_PATH.DOCTOR_MANAGEMENT}`)}>
          취소
        </Button>
        <Button variant="contained" sx={{ width: 150 }}>
          저장
        </Button>
      </Grid>
    </Grid>
  );
};

export default RegisterForm;
