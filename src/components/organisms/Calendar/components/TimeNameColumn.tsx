import Stack from '@mui/material/Stack';
import Typography from 'components/atoms/Typography';

const timeLineOfDays = Array.from({ length: 24 }, (_, i) => i);

// type Props = {};
const TimeNameColumn = () => {
  return (
    <Stack>
      {timeLineOfDays.map(item => (
        <Typography
          height={60}
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
        </Typography>
      ))}
    </Stack>
  );
};

export default TimeNameColumn;
