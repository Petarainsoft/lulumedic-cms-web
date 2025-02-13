import { dayjs } from 'utils/dateTime';
import { useSearchParams } from 'react-router-dom';

import MonthlyCalendar from 'components/organisms/Calendar/MonthlyCalendar';
import WeeklyCalendar from 'components/organisms/Calendar/WeeklyCalendar';

import Grid from '@mui/material/Grid2';
import CalenDarFilter from './CalendarFilter';

const ScheduleCalendar = () => {
  const [params] = useSearchParams();

  const view = params.get('view');

  return (
    <Grid container rowGap={2}>
      <Grid size={12}>
        <CalenDarFilter />
      </Grid>

      <Grid size={12}>
        {view == 'weekly' ? (
          <WeeklyCalendar currentDate={dayjs(params.get('date') || undefined)} />
        ) : (
          <MonthlyCalendar currentDate={dayjs(params.get('date') || undefined)} />
        )}
      </Grid>
    </Grid>
  );
};

export default ScheduleCalendar;
