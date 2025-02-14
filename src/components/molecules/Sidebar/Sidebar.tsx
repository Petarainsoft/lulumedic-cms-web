import styled from '@emotion/styled';

import Grid, { Grid2Props } from '@mui/material/Grid2';

type Props = Grid2Props;
const Sidebar = ({ className }: Props) => {
  return (
    <Grid p={2} height="100%" size="auto" className={className}>
      Sidebar
    </Grid>
  );
};

const SidebarStyled = styled(Sidebar)`
  background-color: #12bd7e;
  color: #ffffff;
`;

export default SidebarStyled;
