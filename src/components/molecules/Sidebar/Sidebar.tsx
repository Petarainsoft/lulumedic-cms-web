import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import Grid, { Grid2Props } from '@mui/material/Grid2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { MAIN_PATH } from 'routes';

import BookOnlineIcon from '@mui/icons-material/BookOnline';
// import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

type Props = Grid2Props;

const sidebars = [
  {
    label: 'Reservations',
    path: MAIN_PATH.RESERVATIONS,
    icon: BookOnlineIcon,
    disabled: false,
  },
  // {
  //   label: 'Doctors',
  //   path: MAIN_PATH.DOCTOR_MANAGEMENT,
  //   icon: LocalHospitalIcon,
  //   disabled: true,

  // },
];

const Sidebar = ({ className }: Props) => {
  return (
    <Grid p={2} height="100%" size="auto" className={className}>
      <List>
        {sidebars.map(item => (
          <ListItem key={item.label} sx={{ display: 'flex', columnGap: 1 }}>
            {item.icon && <item.icon />}
            <Link to={item.path}>{item.label}</Link>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

const SidebarStyled = styled(Sidebar)`
  background-color: #12bd7e;
  color: #ffffff;
`;

export default SidebarStyled;
