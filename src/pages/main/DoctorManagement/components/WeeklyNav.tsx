import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { dayjs } from 'utils/dateTime';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useScheduleCalendarContext } from '../doctorDetail/contexts/ScheduleCalendarContext';
// import dayjs from 'dayjs';
import Typography from 'components/atoms/Typography';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { formatYearMonth } from 'utils/dateTime/formatDate';

type Props = {
  onChangeWeek: (action: 'prev' | 'next') => void;
  onToWeek: () => void;
};
const WeeklyNav = ({ onChangeWeek, onToWeek }: Props) => {
  const { weeklyRange } = useScheduleCalendarContext();

  const renderTime = () => {
    const check = weeklyRange?.startTime?.isSame(weeklyRange?.endTime, 'month');
    if (check) {
      return formatYearMonth(weeklyRange?.endTime?.toString());
    }

    return `${formatYearMonth(weeklyRange?.startTime?.toString())} - ${formatYearMonth(weeklyRange?.endTime?.toString())}`;
  };

  return (
    <>
      <Typography ml={3} variant="titleLarge" fontWeight="bold">
        {/* <Popover
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
        </Popover> */}
        {renderTime()}
      </Typography>
      <Stack direction="row">
        <IconButton onClick={() => onChangeWeek('prev')}>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton onClick={() => onChangeWeek('next')}>
          <ChevronRightIcon />
        </IconButton>

        <Tooltip title={dayjs().format('MMMM D dddd')} placement="bottom">
          <Button variant="outlined" onClick={onToWeek}>
            오늘
          </Button>
        </Tooltip>
      </Stack>
    </>
  );
};

export default WeeklyNav;
