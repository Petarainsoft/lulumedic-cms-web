import { useMemo } from 'react';

import { Dayjs } from 'utils/dateTime';

import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from 'components/atoms/Typography';

// HOOKS
import useCalendar from './hooks/useCalendar';

const WeekDayList = ({ weekdays }: { weekdays: string[] }) => {
  return (
    <Stack direction="row" justifyContent="space-evenly">
      {weekdays.map((item, index) => (
        <Typography
          key={index}
          align="center"
          flex="1"
          py={2}
          borderRight={1}
          borderColor="divider"
          bgcolor={'background.default'}
          color={item == 'Sun' ? 'error' : ''}
        >
          {item}
        </Typography>
      ))}
    </Stack>
  );
};

const DaysInMonth = ({ days, currentDate }: { days: Dayjs[]; currentDate: Dayjs }) => {
  return (
    <Stack justifyContent="space-evenly" flexDirection="row" height={100}>
      {(days || []).map((day, index) => (
        <Stack
          width="100%"
          sx={{
            opacity: day.isSame(currentDate, 'month') ? 1 : 0.5,
          }}
        >
          <Typography
            key={index}
            variant="bodyMedium"
            align="left"
            flex="1"
            p={2}
            borderRight={1}
            borderBottom={1}
            borderColor="divider"
            color={day.format('ddd') == 'Sun' ? 'error' : ''}
          >
            {day.format('D')}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

type Props = {
  currentDate: Dayjs;
  startOfWeek?: string;
};
const MonthlyCalendar = ({ currentDate }: Props) => {
  console.log({ currentDate });
  const month = currentDate.month();
  const year = currentDate.year();

  const { weekdays, daysMapToWeeks } = useCalendar(currentDate);

  const daysMapFiltered = useMemo(() => {
    return daysMapToWeeks.filter(days => {
      return days.some(day => day.month() == month && day.year() == year);
    });
  }, [month]);

  console.log({ daysMapFiltered, daysMapToWeeks, month });

  return (
    <Grid>
      <WeekDayList weekdays={weekdays} />

      {(daysMapFiltered || []).map(days => (
        <DaysInMonth days={days} currentDate={currentDate} />
      ))}
    </Grid>
  );
};

export default MonthlyCalendar;
