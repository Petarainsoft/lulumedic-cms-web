import { useNavigate, useLocation } from 'react-router-dom';

import Button from '@mui/material/Button';
import Select from 'components/atoms/Select';
import Stack from '@mui/material/Stack';
import { Image } from 'components/atoms/Image';
import mainRoutes, { MAIN_PATH } from 'routes/mainRoutes';

import icon from 'assets/logo_2.svg';
import { useEffect, useMemo, useState } from 'react';
import { ID } from 'constants/types';

// const options = [
//   {
//     label: 'Option 1',
//     value: 'option1',
//   },
//   {
//     label: 'Option 2',
//     value: 'option2',
//   },
// ];

const mainPaths = mainRoutes.map(item => ({
  label: item.handle?.title,
  value: item.path,
}));

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [parentRouter, setParentRouter] = useState<MAIN_PATH>();
  const [childrenRouter, setChildrenRouter] = useState<MAIN_PATH>();

  useEffect(() => {
    if (location.pathname.includes(MAIN_PATH.RESERVATIONS)) {
      setParentRouter(MAIN_PATH.RESERVATIONS);
    }

    if (location.pathname.includes(MAIN_PATH.DOCTOR_MANAGEMENT)) {
      setParentRouter(MAIN_PATH.DOCTOR_MANAGEMENT);
    }
  }, [location.pathname]);

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  const childrenPaths = useMemo(() => {
    return mainRoutes.reduce(
      (result, currentRoute) => {
        if (currentRoute.path == parentRouter) {
          const childrenItem = (currentRoute.children || []).find(i => i.index);

          if (childrenItem) {
            setChildrenRouter(childrenItem.handle?.value as MAIN_PATH);

            result.push({
              label: childrenItem.handle?.title || '',
              value: childrenItem.handle?.value || '',
            });
          }
        }

        return result;
      },
      [] as { label: string; value: string }[]
    );
  }, [parentRouter]);

  const onSelectPageChange = (value: ID) => {
    // setParentRouter(value as MAIN_PATH);
    navigate(value as string);
  };

  const onChildrenChange = (value: ID) => {
    navigate(value as string);

    // setChildrenRouter(value as MAIN_PATH);
  };

  return (
    <Stack columnGap={2} direction="row" alignItems="center">
      <Stack onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
        <Image src={icon} width={120} height={40} />
      </Stack>

      <Stack flex="1" direction="row" columnGap={1}>
        <Select defaultValue={parentRouter} options={mainPaths} onChange={onSelectPageChange} />
        {childrenPaths.length ? (
          <Select options={childrenPaths} value={childrenRouter} onChange={onChildrenChange} />
        ) : null}
      </Stack>

      <Stack textAlign="right">
        <Button variant="contained" className="MuiButton-noBorderRadius" onClick={logout}>
          로그아웃
        </Button>
      </Stack>
    </Stack>
  );
};

export default Navbar;
