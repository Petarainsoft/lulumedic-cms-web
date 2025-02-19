import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
const PageSkeleton = () => {
  return (
    <Stack height="100%" rowGap={3}>
      <Skeleton variant="rounded" width="100%" height="100%" />
      <Skeleton variant="rounded" width="100%" height="100%" />
    </Stack>
  );
};

export default PageSkeleton;
