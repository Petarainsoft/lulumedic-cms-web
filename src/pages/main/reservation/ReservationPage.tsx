import Grid from '@mui/material/Grid2';
import Filter from './panels/Filter';
import ReservationList from './panels/ReservationList';

const ReservationPage = () => {
  return (
    <Grid container height="100%" overflow="auto">
      <Grid size={12}>
        <Filter />
      </Grid>

      <Grid size={12}>
        <ReservationList />
      </Grid>
    </Grid>
  );
};

export { ReservationPage as Component };
