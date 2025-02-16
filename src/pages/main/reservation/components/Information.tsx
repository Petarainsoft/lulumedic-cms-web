import Grid, { Grid2Props } from '@mui/material/Grid2';
import Select, { SelectProps } from 'components/atoms/Select';
import Typography from 'components/atoms/Typography';
import { Value } from 'constants/types';

export const InfoLabel = ({
  label,
  value,
  type = 'text',
  options,
  onChange,
}: {
  label: string;
  value?: Value;
  type?: 'select' | 'text';
} & SelectProps) => {
  return (
    <>
      <Grid size={3}>
        <Typography color="textDisabled" variant="bodyMedium">
          {label}
        </Typography>
      </Grid>
      <Grid size={3}>
        {type === 'text' ? (
          <Typography variant="bodyMedium">{value}</Typography>
        ) : (
          <Select placeholder="1" defaultValue={value} options={options} onChange={onChange} fullWidth />
        )}
      </Grid>
    </>
  );
};

type Props = Grid2Props & {
  title: string;
  data?: { label: string; value: string }[];
};
const Information = ({ title, children }: Props) => {
  return (
    <Grid size={12} container className="Information" rowGap={4} columnSpacing={4}>
      <Grid size={12}>
        <Typography variant="titleLarge" fontWeight="bold">
          {title}
        </Typography>
      </Grid>
      <Grid size={12} container rowGap={4} alignItems="center">
        {children}
      </Grid>
    </Grid>
  );
};

export default Information;
