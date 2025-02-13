import Stack from '@mui/material/Stack';
import Typography from 'components/atoms/Typography';

type Props = {};

const timeLineOfDays = Array.from({ length: 24 }, (_, i) => i);
const WeeklyTime = () => {
  return (
    <Stack>
      {timeLineOfDays.map((item, index) => (
        <Typography
          key={index}
          //   align="center"
          flex="1"
          py={2}
          borderRight={1}
          borderBottom={1}
          borderColor="divider"
          bgcolor={'background.default'}
          color={item == 0 ? 'error' : ''}
        >
          {item}시
        </Typography>
      ))}
    </Stack>
  );
};

export default WeeklyTime;
