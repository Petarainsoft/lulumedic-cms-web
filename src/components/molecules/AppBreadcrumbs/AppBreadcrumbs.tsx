import { useMatches, useLocation } from 'react-router-dom';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
// import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';

import { RouterHandle } from 'routes';
import Typography from '@mui/material/Typography';
import { useMemo, useContext, createContext, useState, PropsWithChildren } from 'react';

const BreadcrumbsContext = createContext<{ subBreadcrumbs?: string; setSubBreadcrumbs: (data: string) => void }>({
  subBreadcrumbs: '',
  setSubBreadcrumbs: () => {},
});

const AppBreadcrumbs = () => {
  const matches = useMatches();
  const location = useLocation();
  const { subBreadcrumbs } = useBreadcrumbsContext();

  const breadcrumbs = useMemo(() => {
    const lastedMatch = matches[matches.length - 1];
    const handleData = lastedMatch.handle as RouterHandle;
    const data = handleData?.crumbs || [];

    return data;
  }, [location.pathname, subBreadcrumbs]);

  return (
    <Stack direction="row" columnGap={1} alignItems="center">
      <MuiBreadcrumbs aria-label="breadcrumb">
        {breadcrumbs.map((item, index) => (
          <Typography variant="bodyMedium" color={breadcrumbs.length - 1 === index ? '' : 'text.disabled'}>
            {item}
          </Typography>
        ))}
      </MuiBreadcrumbs>
      <Typography variant="bodyMedium">{subBreadcrumbs}</Typography>
    </Stack>
  );
};

export const BreadcrumbProvider = ({ children }: PropsWithChildren) => {
  const [subBreadcrumbs, setSubBreadcrumbs] = useState('');
  const values = useMemo(
    () => ({
      subBreadcrumbs,
      setSubBreadcrumbs: (val: string) => setSubBreadcrumbs(val),
    }),
    [subBreadcrumbs]
  );

  return <BreadcrumbsContext.Provider value={values}>{children}</BreadcrumbsContext.Provider>;
};

export const useBreadcrumbsContext = () => useContext(BreadcrumbsContext);

export default AppBreadcrumbs;
