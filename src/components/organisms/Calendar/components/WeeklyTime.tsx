// import Divider from '@mui/material/Divider';
import Stack, { StackProps } from '@mui/material/Stack';
// import Typography from 'components/atoms/Typography';
import { Dayjs, dayjs } from 'utils/dateTime';
import { ScheduleData } from '../MonthlyCalendar';
import { Typography } from '@mui/material';

const WorkingTime = ({ data }: { data: ScheduleData[] }) => {
  // const timeDiff = endTime.diff(startTime, 'minute');

  const getTimeDiff = (startTime: Dayjs, endTime: Dayjs) => {
    return endTime.diff(startTime, 'minute');
  };

  const getTopPosition = (startTime: Dayjs) => {
    const calendarStart = dayjs(startTime).set('hour', 0).set('minute', 0);
    console.log(666, calendarStart.format('YYYY-MM-DD HH:mm'), calendarStart.diff(startTime, 'minute'));
    return Math.abs(calendarStart.diff(startTime, 'minute'));
  };

  return (
    <Stack flexDirection="row" position="relative">
      {(data || []).map((item, index) => (
        <Stack
          key={index}
          width="100%"
          height={getTimeDiff(item.startTime, item.endTime)}
          bgcolor="red"
          color="white"
          borderRadius={2}
          position="absolute"
          top={getTopPosition(item.startTime)}
        >
          <Typography variant="bodySmall">
            {item.description}
            {item.startTime.format('HH:mm')} ~ {item.endTime.format('HH:mm')}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

const MINUTE_IN_DAY = 60;

// type Props = {
//   currentDate?: Dayjs;
//   daysInWeekDay?: Dayjs[];
// };

const timeLineOfDays = Array.from({ length: 24 }, (_, i) => i);

type Props = {
  // weekdays: string[];
  daysInWeekDay: Dayjs[];
  scheduleMapByDate?: Record<string, ScheduleData[]>;
} & StackProps;
const WeeklyTime = ({ daysInWeekDay, scheduleMapByDate }: Props) => {
  console.log({ daysInWeekDay, scheduleMapByDate });
  return (
    <Stack className="WeeklyTime">
      {timeLineOfDays.map((_, index) => (
        <Stack
          flexDirection="row"
          alignItems="center"
          key={index}
          className="TimeBox"
          height={MINUTE_IN_DAY}
          borderBottom={1}
          borderRight={1}
          borderColor="divider"
        >
          {daysInWeekDay.map((item, index) => (
            <Stack width="100%" height={MINUTE_IN_DAY} key={index} borderRight={1} borderColor="divider">
              {/* {item} */}
              {/* <TimeBox /> */}
              <WorkingTime data={scheduleMapByDate?.[item.format('YYYY-MM-DD')] || []} />
            </Stack>
          ))}
        </Stack>
      ))}
    </Stack>
  );
};

export default WeeklyTime;
