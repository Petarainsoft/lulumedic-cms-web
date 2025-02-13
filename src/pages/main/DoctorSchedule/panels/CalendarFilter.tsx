import { dayjs } from 'utils/dateTime';
import styled from '@emotion/styled';

import Grid, { Grid2Props } from '@mui/material/Grid2';
import { DateCalendar } from 'components/atoms/DatePicker';
import Typography from 'components/atoms/Typography';
import Popover from 'components/atoms/Popover';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// HOOKS

// ICONS
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import useValuesQuery from 'hooks/useValuesQuery';

type Props = Grid2Props;

const CalenDarFilter = ({ className }: Props) => {
  const [filterParams, setFilterParams] = useValuesQuery<{ date: string }>(['date'], {
    date: dayjs().format('YYYY-MM'),
  });

  const onChangeCalendar = (action: 'prev' | 'next') => {
    const currentDate = dayjs(filterParams.date, 'YYYY-MM');

    if (action == 'next') {
      setFilterParams('date', currentDate.add(1, 'month').format('YYYY-MM'));
    } else {
      setFilterParams('date', currentDate.subtract(1, 'month').format('YYYY-MM'));
    }
  };

  return (
    <Grid container alignItems="center" className={className}>
      <Grid size={1}>
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
      </Grid>

      <Grid size={1}>
        <IconButton onClick={() => onChangeCalendar('prev')}>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton onClick={() => onChangeCalendar('next')}>
          <ChevronRightIcon />
        </IconButton>
      </Grid>

      <Grid size="grow" display="flex" justifyContent="center">
        <Stack
          bgcolor="background.default"
          direction="row"
          justifyContent="space-evenly"
          borderRadius={8}
          px={0.8}
          py={0.5}
          columnGap={1}
        >
          <Typography variant="bodyMedium" className="CalendarTab CalendarActive">
            Monthly
          </Typography>
          <Typography variant="bodyMedium" className="CalendarTab">
            Weekly
          </Typography>
        </Stack>
      </Grid>

      <Grid size="auto">
        <Button variant="contained" className="MuiButton-noBorderRadius">
          스케줄 작성
        </Button>
      </Grid>
    </Grid>
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
