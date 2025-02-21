import { useEffect } from 'react';

import { dayjs } from 'utils/dateTime';
import styled from '@emotion/styled';
import Typography from 'components/atoms/Typography';
import Button from '@mui/material/Button';
import Stack, { StackProps } from '@mui/material/Stack';
import MonthlyNav from '../../components/MonthlyNav';
import WeeklyNav from '../../components/WeeklyNav';

// HOOKS
import useValuesQuery from 'hooks/useValuesQuery';

// ICONS

type CalendarView = 'monthly' | 'weekly';

type Props = StackProps;

const today = dayjs();
const startWeekNumber = today.week();

const CalenDarFilter = ({ className }: Props) => {
  const [filterParams, setFilterParams] = useValuesQuery<{ date: string; view: CalendarView; week: number }>(
    ['date', 'view', 'week'],
    {
      date: dayjs().format('YYYY-MM'),
      view: 'monthly',
      week: startWeekNumber,
    }
  );

  const onChangeCalendar = (action: 'prev' | 'next') => {
    const currentDate = dayjs(filterParams.date, 'YYYY-MM');

    if (action == 'next') {
      setFilterParams('date', currentDate.add(1, 'month').format('YYYY-MM'));
    } else {
      setFilterParams('date', currentDate.subtract(1, 'month').format('YYYY-MM'));
    }
  };

  const onChangeWeekly = (action: 'prev' | 'next') => {
    if (action == 'next') {
      setFilterParams('week', (+filterParams.week || 0) + 1);
    } else {
      setFilterParams('week', (+filterParams.week || 0) - 1);
    }
  };

  useEffect(() => {
    setFilterParams('date', dayjs().format('YYYY-MM'));
    setFilterParams('view', 'monthly');
  }, []);

  const onChangeCalendarView = (view: CalendarView) => {
    setFilterParams('view', view);
  };

  const onToday = () => {
    setFilterParams('date', dayjs().format('YYYY-MM'));
  };

  const onToWeek = () => {
    setFilterParams('week', startWeekNumber);
  };

  return (
    <Stack alignItems="center" className={className} direction="row">
      {filterParams.view == 'monthly' ? (
        <MonthlyNav onToday={onToday} onChangeMonth={onChangeCalendar} />
      ) : (
        <WeeklyNav onToWeek={onToWeek} onChangeWeek={onChangeWeekly} />
      )}

      {/* <Stack>
        <Popover
          rootElement={<Typography>{filterParams.date}</Typography>}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <DateCalendar
            disabled
            views={['year', 'month']}
            value={dayjs(filterParams.date)}
            onChange={date => setFilterParams('date', date.format('YYYY-MM'))}
          />
        </Popover>
      </Stack>

      <Stack direction="row">
        <IconButton onClick={() => onChangeCalendar('prev')}>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton onClick={() => onChangeCalendar('next')}>
          <ChevronRightIcon />
        </IconButton>
      </Stack> */}

      <Stack flex="1" display="flex" justifyContent="center" alignItems="center">
        <Stack
          bgcolor="background.default"
          width={100}
          direction="row"
          justifyContent="center"
          borderRadius={8}
          px={0.8}
          py={0.5}
          columnGap={1}
        >
          <Typography
            variant="bodyMedium"
            width={40}
            textAlign="center"
            className={`CalendarTab ${filterParams.view == 'monthly' ? 'CalendarActive' : ''}`}
            onClick={() => onChangeCalendarView('monthly')}
          >
            월간
          </Typography>
          <Typography
            variant="bodyMedium"
            width={40}
            textAlign="center"
            className={`CalendarTab ${filterParams.view == 'weekly' ? 'CalendarActive' : ''}`}
            onClick={() => onChangeCalendarView('weekly')}
          >
            주간
          </Typography>
        </Stack>
      </Stack>

      <Stack>
        <Button variant="contained" className="MuiButton-noBorderRadius">
          스케줄 작성
        </Button>
      </Stack>
    </Stack>
  );
};

const CalendarStyled = styled(CalenDarFilter)`
  .CalendarTab {
    padding: 4px;
    border-radius: 20px;
    cursor: pointer;
    font-weight: 600;

    &.CalendarActive {
      background-color: #ffffff;
      color: #12bd7e;
    }
  }
`;

export default CalendarStyled;
