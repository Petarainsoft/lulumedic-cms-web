import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from 'components/atoms/Typography';
import { Dayjs } from 'utils/dateTime';

const MINUTE_IN_DAY = 60;

type Props = {
  currentDate?: Dayjs;
  daysInWeekDay?: Dayjs[];
};

const timeLineOfDays = Array.from({ length: 24 }, (_, i) => i);
const WeeklyTime = ({ daysInWeekDay }: Props) => {
  return (
    <Stack className="WeeklyTime">
      {timeLineOfDays.map((item, index) => (
        <Stack
          flexDirection="row"
          alignItems="center"
          key={index}
          className="TimeBox"
          height={MINUTE_IN_DAY}
          borderBottom={1}
          borderColor="divider"
        >
          {/* <Typography
            // width={150}
            color="textDisabled"
            //   align="center"
            // py={2}
            // borderRight={1}
            // borderBottom={1}
            borderColor="divider"
            variant="bodySmall"
            // bgcolor={'background.default'}
          >
            {item}시
          </Typography> */}
          {/* <Stack flex="1">
            <Divider orientation="horizontal" sx={{ width: 1 }} />
          </Stack> */}

          {/* Box */}
          {/* <Stack direction="row" width="100%"> */}
          {(daysInWeekDay || [])?.map(item => (
            <Stack borderRight={1} borderColor="divider" height="100%" width="100%"></Stack>
          ))}
          {/* </Stack> */}
        </Stack>
      ))}
    </Stack>
  );
};

export default WeeklyTime;
