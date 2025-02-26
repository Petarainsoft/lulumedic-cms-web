import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { dayjs, Dayjs } from 'utils/dateTime';
// COMPONENTS
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from 'components/atoms/Typography';
import WeeklyTime from './components/WeeklyTime';
import { ScheduleData } from './MonthlyCalendar';

// HOOKS
import useCalendar from './hooks/useCalendar';
import { useScheduleCalendarContext } from 'pages/main/DoctorManagement/doctorDetail/contexts/ScheduleCalendarContext';

const today = dayjs();

const WeekDayList = ({ weekdays, daysInWeekDay }: { weekdays: string[]; daysInWeekDay: Dayjs[] }) => {
  const dayInWeekDayMap = (daysInWeekDay || []).reduce(
    (acc, date) => {
      const dayName = date.format('ddd');
      acc[dayName] = date;

      return acc;
    },
    {} as Record<string, Dayjs>
  );

  return (
    <Stack direction="row" justifyContent="space-evenly" ml={3}>
      {weekdays.map((item, index) => (
        <>
          <Stack
            key={index}
            // align="center"
            flex="1"
            py={1}
            borderRight={1}
            borderColor="divider"
            bgcolor={'background.default'}

            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            rowGap={1}
          >
            <Typography color={item == '일' ? 'error' : ''} fontWeight="bold">{item}</Typography>
            <Typography
              color={item == '일' ? 'error' : ''}
              sx={{
                borderRadius: '100%',
                width: 35,
                py: 0.5,
                px: 1,
                textAlign: 'center',
                bgcolor: today.isSame(dayInWeekDayMap[item], 'date') ? '#12BD7E' : '',
                color: today.isSame(dayInWeekDayMap[item], 'date') ? 'white' : '',
              }}
            >
              {dayInWeekDayMap[item]?.format('D')}
            </Typography>
          </Stack>
        </>
      ))}
    </Stack>
  );
};

type Props = {
  currentDate: Dayjs;
  startOfWeek?: string;
  scheduleMapByDate?: Record<string, ScheduleData[]>;
};

const WeeklyCalendar = ({ currentDate, scheduleMapByDate }: Props) => {
  const [searchParams] = useSearchParams();
  const { setWeeklyRange } = useScheduleCalendarContext();
  const week = searchParams.get('week');
  const { weekdays, daysMapToWeeks } = useCalendar(currentDate);

  useEffect(() => {
    if (week) {
      setWeeklyRange({
        startTime: daysMapToWeeks[+week - 1][0],
        endTime: daysMapToWeeks[+week - 1][daysMapToWeeks[+week - 1].length - 1],
      });
    }
  }, [week, daysMapToWeeks]);

  return (
    <Grid container height="100%">
      <Grid size="grow" display="flex" flexDirection="column" height="100%">
        {week && <WeekDayList weekdays={weekdays} daysInWeekDay={daysMapToWeeks[+week - 1]} />}

        <Grid className="WeeklyTimeWrap" display="flex" flexDirection="column" overflow="auto">
          {week && <WeeklyTime scheduleMapByDate={scheduleMapByDate} daysInWeekDay={daysMapToWeeks[+week - 1]} />}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WeeklyCalendar;
