// import Divider from '@mui/material/Divider';
import Stack, { StackProps } from '@mui/material/Stack';
// import Typography from 'components/atoms/Typography';
import { Dayjs } from 'utils/dateTime';
import { ScheduleData } from '../MonthlyCalendar';
import { Typography } from '@mui/material';
import TimeNameColumn from './TimeNameColumn';
import { WORKING_TYPE_COLOR, WorkingTypeLabels } from 'core/enum';
import Tooltip from '@mui/material/Tooltip';

const TimeContent = ({ label, startTime, endTime }: { label: string, startTime: string, endTime: string, count?: number }) => {
  return (
    <>
      <Typography variant="bodySmall">
        {label}
      </Typography>
      <Typography variant="bodySmall"
        textOverflow="ellipsis"
        overflow="hidden"
      // whiteSpace="nowrap"
      // width={count && count > 1 ? `calc(100% / ${count / 2})` : '100%'}
      >
        {startTime} ~ {endTime}
      </Typography>
    </>
  )
}

const WorkingTime = ({ data, hour }: { data: ScheduleData[]; hour?: number }) => {

  const getTimeDiff = (startTime: Dayjs, endTime: Dayjs) => {
    return endTime.diff(startTime, 'minute');
  };

  return (
    <Stack flexDirection="row" height="100%" width="100%" zIndex="9999" columnGap={.2} className="TimeBox">
      {(data || []).map((item, index) => (
        <>
          {item.startTime.hour() == hour && (
            <Tooltip title={
              getTimeDiff(item.startTime, item.endTime) <= 45 && <Stack flexDirection="column">
                <TimeContent
                  label={WorkingTypeLabels[item.description as keyof typeof WorkingTypeLabels]}
                  startTime={item.startTime.format('HH:mm')}
                  endTime={item.endTime.format('HH:mm')}
                />
              </Stack>
            }>
              <Stack
                key={index}
                width="100%"
                height={getTimeDiff(item.startTime, item.endTime)}
                bgcolor={WORKING_TYPE_COLOR[item.description as keyof typeof WORKING_TYPE_COLOR]}
                color="white"
                borderRadius={2}
                p={1}
              >
                {
                  getTimeDiff(item.startTime, item.endTime) > 45 && <TimeContent
                    count={data.length}
                    label={WorkingTypeLabels[item.description as keyof typeof WorkingTypeLabels]}
                    startTime={item.startTime.format('HH:mm')}
                    endTime={item.endTime.format('HH:mm')}
                  />
                }

              </Stack>
            </Tooltip>
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
              <Stack width="100%" height={MINUTE_IN_DAY} key={index} borderRight={1} borderColor="divider"
              >
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
