import { dayjs } from 'utils/dateTime';
import styled from '@emotion/styled';

import { DateCalendar } from 'components/atoms/DatePicker';
import Typography from 'components/atoms/Typography';
import Popover from 'components/atoms/Popover';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Stack, { StackProps } from '@mui/material/Stack';

// HOOKS

// ICONS
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import useValuesQuery from 'hooks/useValuesQuery';

type CalendarView = 'monthly' | 'weekly';

type Props = StackProps;

const CalenDarFilter = ({ className }: Props) => {
  const [filterParams, setFilterParams] = useValuesQuery<{ date: string; view: CalendarView }>(['date', 'view'], {
    date: dayjs().format('YYYY-MM'),
    view: 'monthly',
  });

  const onChangeCalendar = (action: 'prev' | 'next') => {
    const currentDate = dayjs(filterParams.date, 'YYYY-MM');

    if (action == 'next') {
      setFilterParams('date', currentDate.add(1, 'month').format('YYYY-MM'));
    } else {
      setFilterParams('date', currentDate.subtract(1, 'month').format('YYYY-MM'));
    }
  };

  const onChangeCalendarView = (view: CalendarView) => {
    if (view == 'monthly') {
      setFilterParams('view', 'monthly');
    } else {
      setFilterParams('view', 'weekly');
    }
  };

  return (
    <Stack alignItems="center" className={className} direction="row">
      <Stack>
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
      </Stack>

      <Stack flex="1" display="flex" justifyContent="center" alignItems="center">
        <Stack
          bgcolor="background.default"
          width={140}
          direction="row"
          justifyContent="center"
          borderRadius={8}
          px={0.8}
          py={0.5}
          columnGap={1}
        >
          <Typography
            variant="bodyMedium"
            className={`CalendarTab ${filterParams.view == 'monthly' ? 'CalendarActive' : ''}`}
            onClick={() => onChangeCalendarView('monthly')}
          >
            Monthly
          </Typography>
          <Typography
            variant="bodyMedium"
            className={`CalendarTab ${filterParams.view == 'weekly' ? 'CalendarActive' : ''}`}
            onClick={() => onChangeCalendarView('weekly')}
          >
            Weekly
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
