import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Select from 'components/atoms/Select';
import { Image } from 'components/atoms/Image';

import icon from 'assets/lulu-icon.png';

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
    <Grid container alignItems="center">
      <Grid size={1}>
        <Image src={icon} width={80} height={20} />
      </Grid>
      <Grid size="grow" display="flex" columnGap={1}>
        <Select options={options} placeholder="예약내역" />
        <Select options={options} placeholder="병원관리" />
      </Grid>

      <Grid size={1} textAlign="right">
        <Button variant="contained" className="MuiButton-noBorderRadius">
          로그아웃
        </Button>
      </Grid>
    </Grid>
  );
};

export default Navbar;
