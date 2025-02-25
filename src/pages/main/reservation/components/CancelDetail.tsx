import { ReasonType, reasonTypeLabels } from 'core/enum';
import Grid from '@mui/material/Grid2';

import Typography from 'components/atoms/Typography';
type Props = {
  cancelType?: ReasonType;
  reasonInput?: string;
};

const CancelDetail = ({ cancelType, reasonInput }: Props) => {
  return (
    <>
      <Grid size={3}>
        <Typography color="textDisabled" variant="bodyMedium">
          취소사유
        </Typography>
      </Grid>
      <Grid size={3}>
        {cancelType ? (
          <Typography>
            {reasonTypeLabels[cancelType]}
            {reasonInput && <Typography variant="bodyMedium">: {reasonInput}</Typography>}
          </Typography>
        ) : (
          '-'
        )}
      </Grid>
    </>
  );
};

export default CancelDetail;
