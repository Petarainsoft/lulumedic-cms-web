import Typography from 'components/atoms/Typography';
import RegisterPanel from './panels/RegisterFormPanel';
import Stack from '@mui/material/Stack';

const DoctorRegisterPage = () => {
  return (
    <Stack rowGap={5} height="100%" overflow="auto">
      <Typography variant="titleLarge" fontWeight="bold">
        의사정보
      </Typography>
      <RegisterPanel />
    </Stack>
  );
};

export { DoctorRegisterPage as Component };
