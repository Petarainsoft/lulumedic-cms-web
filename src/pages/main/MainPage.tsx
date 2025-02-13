import { Outlet } from 'react-router-dom';

import Grid from '@mui/material/Grid2';
import Sidebar from 'components/molecules/Sidebar/Sidebar';
import PageHeader from 'components/molecules/PageHeader/PageHeader';
import MainLayout from 'components/templates/MainLayout';
import Navbar from 'components/molecules/Navbar/NavBar';
import AppBreadcrumbs from 'components/molecules/AppBreadcrumbs/AppBreadcrumbs';

const MainPage = () => {
  return (
    <Grid height="100vh" container columnSpacing={3}>
      <Grid size={2}>
        <Sidebar />
      </Grid>

      <Grid size={10}>
        <MainLayout navBar={<PageHeader />}>
          <Navbar />
          <AppBreadcrumbs />
          <Grid flex="1">
            <Outlet />
          </Grid>
        </MainLayout>
      </Grid>
    </Grid>
  );
};

export default MainPage;
