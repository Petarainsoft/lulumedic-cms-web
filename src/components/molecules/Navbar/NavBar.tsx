// import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Select from 'components/atoms/Select';
import Stack from '@mui/material/Stack';
import { Image } from 'components/atoms/Image';

import icon from 'assets/logo_2.svg';

const options = [
  {
    label: 'Option 1',
    value: 'option1',
  },
  {
    label: 'Option 2',
    value: 'option2',
  },
];

const Navbar = () => {
  return (
    <Stack columnGap={2} direction="row" alignItems="center">
      <Image src={icon} width={120} height={40} />

      <Stack flex="1" direction="row" columnGap={1}>
        <Select options={options} placeholder="예약내역" disabled />
        <Select options={options} placeholder="병원관리" disabled />
      </Stack>

      <Stack textAlign="right">
        <Button variant="contained" className="MuiButton-noBorderRadius">
          로그아웃
        </Button>
      </Stack>
    </Stack>
  );
};

export default Navbar;
