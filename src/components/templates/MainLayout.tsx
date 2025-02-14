import { ReactNode } from 'react';

import Grid, { Grid2Props } from '@mui/material/Grid2';

import Container from '@mui/material/Container';

import Paper from '@mui/material/Paper';

type Props = Pick<Grid2Props, 'children' | 'size' | 'flex' | 'rowGap'> & {
  navBar: ReactNode;
};

const MainLayout = ({ navBar, children, ...rest }: Props) => {
  return (
    <Container component={Grid} display="flex" flexDirection="column" py={2} {...rest}>
      {navBar}
      <Paper component={Grid} p={2} flex="1" display="flex" flexDirection="column" rowGap={2}>
        {children}
      </Paper>
    </Container>
  );
};

export default MainLayout;
