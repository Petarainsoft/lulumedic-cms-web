import { ReactNode } from 'react';

import Grid, { Grid2Props } from '@mui/material/Grid2';

import Container from '@mui/material/Container';

import Paper from '@mui/material/Paper';

type Props = Pick<Grid2Props, 'children'> & {
  navBar: ReactNode;
};

const MainLayout = ({ navBar, children }: Props) => {
  return (
    <Container component={Grid} display="flex" flexDirection="column" rowGap={2} py={3} height="100%">
      {navBar}
      <Paper component={Grid} p={2} display="flex" flexDirection="column" rowGap={2} height="100%">
        {children}
      </Paper>
    </Container>
  );
};

export default MainLayout;
