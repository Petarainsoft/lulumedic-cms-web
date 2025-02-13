import { useLocation } from 'react-router-dom';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';

import { MAIN_PATH } from 'routes';
import { Typography } from '@mui/material';

const breadcrumbs = [
  {
    path: MAIN_PATH.MAIN,
    label: '병원관리',
  },
  {
    path: MAIN_PATH.DOCTOR_MANAGEMENT,
    label: '의사 리스트',
  },
  {
    path: MAIN_PATH.DOCTOR_CREATE,
    label: '의사 등록',
  },
];

const AppBreadcrumbs = () => {
  const location = useLocation();

  console.log({ location });

  return (
    <MuiBreadcrumbs aria-label="breadcrumb">
      {breadcrumbs.map(
        (item, index) =>
          location.pathname.includes(item.path) && (
            <Link to={item.path}>
              <Typography variant="bodyMedium" color={breadcrumbs.length - 1 === index ? '' : 'text.disabled'}>
                {item.label}
              </Typography>
            </Link>
          )
      )}
    </MuiBreadcrumbs>
  );
};

export default AppBreadcrumbs;
