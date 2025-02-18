// import Divider from '@mui/material/Divider';
import Stack, { StackProps } from '@mui/material/Stack';
// import Typography from 'components/atoms/Typography';
import { Dayjs } from 'utils/dateTime';
import { ScheduleData } from '../MonthlyCalendar';
import { Typography } from '@mui/material';
import TimeNameColumn from './TimeNameColumn';
import { WORKING_TYPE_COLOR, WorkingTypeLabels } from 'core/enum';

const WorkingTime = ({ data, hour }: { data: ScheduleData[]; hour?: number }) => {
  const getTimeDiff = (startTime: Dayjs, endTime: Dayjs) => {
    return endTime.diff(startTime, 'minute');
  };

  return (
    <Stack flexDirection="row" position="relative">
      {(data || []).map((item, index) => (
        <>
          {item.startTime.hour() == hour && (
            <Stack
              key={index}
              width="100%"
              height={getTimeDiff(item.startTime, item.endTime)}
              bgcolor={WORKING_TYPE_COLOR[item.description as keyof typeof WORKING_TYPE_COLOR]}
              color="white"
              borderRadius={2}
              p={1}
            >
              <Typography variant="bodySmall">
                {WorkingTypeLabels[item.description as keyof typeof WorkingTypeLabels]}
              </Typography>
              <Typography variant="bodySmall">
                {item.startTime.format('HH:mm')} ~ {item.endTime.format('HH:mm')}
              </Typography>
            </Stack>
          )}
        </>
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
  return (
    <Stack className="WeeklyTime" direction="row">
      <Stack borderRight={1} borderColor="divider">
        {/* <Stack height={62} /> */}
        <TimeNameColumn />
      </Stack>
      <Stack flex="1">
        {timeLineOfDays.map((hour, index) => (
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
            {(daysInWeekDay || []).map((item, index) => (
              <Stack width="100%" height={MINUTE_IN_DAY} key={index} borderRight={1} borderColor="divider">
                <WorkingTime data={scheduleMapByDate?.[item.format('YYYY-MM-DD')] || []} hour={hour} />
              </Stack>
            ))}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default WeeklyTime;
