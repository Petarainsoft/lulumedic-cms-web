import { useMemo } from 'react';

import { dayjs, Dayjs } from 'utils/dateTime';

import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from 'components/atoms/Typography';

// HOOKS
import useCalendar from './hooks/useCalendar';

export type ScheduleData = {
  startTime: string;
  endTime: string;
  description?: string;
};
const today = dayjs();

const WorkingList = ({ data }: { data?: ScheduleData[] }) => {
  const dataToShow = (data || []).slice(0, 4); // only show item
  console.log({ dataToShow, data });
  const count = (data?.length || 0) - dataToShow.length;

  return (
    <>
      {dataToShow?.map(item => (
        <Stack direction="row" columnGap={1} px={1}>
          <Typography color="textDisabled" key={item.startTime} variant="bodySmall" align="left">
            {item.startTime} ~ {item.endTime}
          </Typography>
          <Typography variant="bodySmall">{item.description}</Typography>
        </Stack>
      ))}

      {count && (
        <Typography textAlign="right" variant="bodySmall" color="primary" sx={{ cursor: 'pointer' }}>
          +{count} 더보기
        </Typography>
      )}
    </>
  );
};

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

const DaysInMonth = ({
  days,
  currentDate,
  workingData,
}: {
  days: Dayjs[];
  currentDate: Dayjs;
  workingData?: Record<string, ScheduleData[]>;
}) => {
  console.log({ days });
  return (
    <Stack justifyContent="space-evenly" flexDirection="row" height={150}>
      {(days || []).map((day, index) => (
        <Stack
          width="100%"
          sx={{
            opacity: day.isSame(currentDate, 'month') ? 1 : 0.5,
          }}
        >
          <Typography
            key={index}
            align="left"
            flex="1"
            p={1}
            borderRight={1}
            borderBottom={1}
            borderColor="divider"
            color={day.format('ddd') == 'Sun' ? 'error' : ''}
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              variant="bodyMedium"
              fontWeight="bold"
              p={0.5}
              borderRadius="100%"
              textAlign="center"
              sx={{
                bgcolor: today.isSame(day, 'date') ? '#12BD7E' : '',
                color: today.isSame(day, 'date') ? 'white' : '',
                width: 30,
              }}
            >
              {day.format('D')}
            </Typography>
            {workingData?.[day.format('YYYY-MM-DD')] && <WorkingList data={workingData?.[day.format('YYYY-MM-DD')]} />}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

type Props = {
  currentDate: Dayjs;
  startOfWeek?: string;
  scheduleMapByDate?: Record<string, ScheduleData[]>;
};
const MonthlyCalendar = ({ currentDate, scheduleMapByDate }: Props) => {
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
    <Grid height="100%">
      <WeekDayList weekdays={weekdays} />

      <Grid overflow="auto">
        {(daysMapFiltered || []).map(days => (
          <DaysInMonth days={days} currentDate={currentDate} workingData={scheduleMapByDate} />
        ))}
      </Grid>
    </Grid>
  );
};

export default MonthlyCalendar;
