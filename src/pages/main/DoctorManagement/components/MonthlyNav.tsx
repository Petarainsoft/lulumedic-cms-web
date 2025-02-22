import { dayjs } from 'utils/dateTime';
import { useSearchParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
// import Popover from 'components/atoms/Popover';
// import { DateCalendar } from 'components/atoms/DatePicker';
import Typography from 'components/atoms/Typography';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { formatYearMonth } from 'utils/dateTime/formatDate';

type Props = {
  // date: string;
  onChangeMonth: (action: 'prev' | 'next') => void;
  onToday: () => void;
};

const MonthlyNav = ({ onChangeMonth, onToday }: Props) => {
  const [searchParams] = useSearchParams();

  return (
    <>
      {/* <Stack>
        <Popover
          rootElement={
            <Typography variant="titleLarge" fontWeight="bold">
              {dayjs(searchParams.get('date')).format('YYYY MMMM')}
            </Typography>
          }
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
            value={dayjs(searchParams.get('date'))}
            onChange={date => setFilterParams('date', date.format('YYYY-MM'))}
          />
        </Popover>
      </Stack> */}
      <Typography variant="titleLarge" fontWeight="bold">
        {formatYearMonth(searchParams.get('date'))}
      </Typography>
      <Stack direction="row">
        <IconButton onClick={() => onChangeMonth('prev')}>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton onClick={() => onChangeMonth('next')}>
          <ChevronRightIcon />
        </IconButton>

        <Tooltip title={dayjs().format('MMMM D dddd')} placement="bottom">
          <Button variant="outlined" onClick={onToday}>
            오늘
          </Button>
        </Tooltip>

        <Typography></Typography>
      </Stack>
    </>
  );
};

export default MonthlyNav;
