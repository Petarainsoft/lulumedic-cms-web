import styled from '@emotion/styled';

import Grid, { Grid2Props } from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

type Props = Pick<Grid2Props, 'className'>;

const PageHeader = ({ className }: Props) => {
  return (
    <Grid className={className}>
      {/* <Grid size={12} className="Title" p={1} width="100%" position="relative" mr={4}></Grid> */}
      <Typography width="100%" className="Title" p={1} position="relative">
        Title
      </Typography>
      <Grid className="triangle" />
    </Grid>
  );
};

const PageHeaderStyled = styled(PageHeader)`
  position: relative;

  .Title {
    background-color: #273149;
    color: #90b9f9;
  }

  .triangle {
    position: absolute;
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 20px 0 20px 20px;
    border-color: transparent transparent transparent #273149;
    transform: rotate(0deg);
    top: 0;
    right: -19px;
  }
`;

export default PageHeaderStyled;
