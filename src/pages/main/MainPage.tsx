import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Grid from '@mui/material/Grid2';
import Sidebar from 'components/molecules/Sidebar/Sidebar';
import PageHeader from 'components/molecules/PageHeader/PageHeader';
import MainLayout from 'components/templates/MainLayout';
import Navbar from 'components/molecules/Navbar/NavBar';
import AppBreadcrumbs from 'components/molecules/AppBreadcrumbs/AppBreadcrumbs';

const temp = Array.from({ length: 100 }, (_, i) => i);

const MainPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('doctors');
  }, []);

  return (
    <Grid height="100vh" container>
      <Grid size={2}>
        <Sidebar />
      </Grid>

      <Grid size="grow" height="100%">
        <MainLayout rowGap={2} navBar={<PageHeader />}>
          <Navbar />
          <AppBreadcrumbs />
          {/* <Grid flex={1} overflow="auto">
            {temp.map(item => (
              <div>{item}</div>
            ))}
          </Grid> */}

          <Outlet />
        </MainLayout>
      </Grid>
    </Grid>
  );
};

export default MainPage;
