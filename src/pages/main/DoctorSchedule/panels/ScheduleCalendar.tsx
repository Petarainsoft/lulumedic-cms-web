import { dayjs } from 'utils/dateTime';
import { useSearchParams } from 'react-router-dom';

import MonthlyCalendar from 'components/organisms/Calendar/MonthlyCalendar';
import Grid from '@mui/material/Grid2';
import CalenDarFilter from './CalendarFilter';

const ScheduleCalendar = () => {
  const [params] = useSearchParams();

  return (
    <Grid container rowGap={2}>
      <Grid size={12}>
        <CalenDarFilter />
      </Grid>

      <Grid size={12}>
        <MonthlyCalendar currentDate={dayjs(params.get('date') || undefined)} />
      </Grid>
    </Grid>
  );
};

export default ScheduleCalendar;
