import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import Grid, { Grid2Props } from '@mui/material/Grid2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LogoutIcon from '@mui/icons-material/Logout';
import { MAIN_PATH } from 'routes';

import BookOnlineIcon from '@mui/icons-material/BookOnline';
import Typography from 'components/atoms/Typography';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

type Props = Grid2Props;

const sidebars = [
  {
    label: '예약 리스트',
    path: MAIN_PATH.RESERVATIONS,
    icon: BookOnlineIcon,
    disabled: false,
  },
  {
    label: '의사 관리',
    path: MAIN_PATH.DOCTOR_MANAGEMENT,
    icon: LocalHospitalIcon,
    disabled: true,
  },
];

const Sidebar = ({ className }: Props) => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();

    navigate('/');
  };

  return (
    <Grid p={2} height="100%" size="auto" className={className} display="flex" flexDirection="column">
      <List sx={{ display: 'flex', flexDirection: 'column', rowGap: 2, flex: 1 }}>
        {sidebars.map(item => (
          <ListItem key={item.label} sx={{ display: 'flex', columnGap: 1 }}>
            {item.icon && <item.icon />}
            <Link to={item.path}>{item.label}</Link>
          </ListItem>
        ))}
      </List>

      <Grid display="flex" columnGap={1} width="100%" sx={{ cursor: 'pointer' }} onClick={logout}>
        <LogoutIcon />
        <Typography>로그아웃</Typography>
      </Grid>
    </Grid>
  );
};

const SidebarStyled = styled(Sidebar)`
  background-color: #12bd7e;
  color: #ffffff;
`;

export default SidebarStyled;
