import { dayjs, Dayjs } from 'utils/dateTime';

// COMPONENTS
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from 'components/atoms/Typography';
import WeeklyTime from './components/WeeklyTime';

// HOOKS
import useCalendar from './hooks/useCalendar';
import TimeNameColumn from './components/TimeNameColumn';

const today = dayjs();

const WeekDayList = ({ weekdays, daysInWeekDay }: { weekdays: string[]; daysInWeekDay: Dayjs[] }) => {
  const dayInWeekDayMap = daysInWeekDay.reduce(
    (acc, date) => {
      const dayName = date.format('ddd');
      acc[dayName] = date;

      return acc;
    },
    {} as Record<string, Dayjs>
  );

  return (
    <Stack direction="row" justifyContent="space-evenly">
      {weekdays.map((item, index) => (
        <>
          <Typography
            key={index}
            align="center"
            flex="1"
            py={1}
            borderRight={1}
            borderColor="divider"
            bgcolor={'background.default'}
            color={item == 'Sun' ? 'error' : ''}
            display="flex"
            justifyContent="center"
            flexDirection="column"
            rowGap={1}
          >
            <Typography>{item}</Typography>
            <Typography
              sx={{
                bgcolor: today.isSame(dayInWeekDayMap[item]) ? '#12BD7E' : '',
              }}
            >
              {dayInWeekDayMap[item].format('D')}
            </Typography>
          </Typography>
        </>
      ))}
    </Stack>
  );
};

type Props = {
  currentDate: Dayjs;
  startOfWeek?: string;
};
const WeeklyCalendar = ({ currentDate }: Props) => {
  const { weekdays, daysMapToWeeks } = useCalendar(currentDate);

  console.log({ daysMapToWeeks });

  return (
    <Grid container>
      <Grid size="auto" mt={7.7} borderRight={1} borderColor="divider">
        <TimeNameColumn />
      </Grid>
      <Grid size="grow">
        <WeekDayList weekdays={weekdays} daysInWeekDay={daysMapToWeeks[0]} />
        <WeeklyTime daysInWeekDay={daysMapToWeeks[0]} />
      </Grid>
    </Grid>
  );
};

export default WeeklyCalendar;
