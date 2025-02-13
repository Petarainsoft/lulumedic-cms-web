import Grid from '@mui/material/Grid2';
import Typography from 'components/atoms/Typography';
import Select from 'components/atoms/Select';
import TextField from 'components/atoms/Input';
import Button from '@mui/material/Button';

const FilterPanel = () => {
  return (
    <Grid container alignItems="center" rowGap={5} borderTop={1} borderBottom={1} py={2} borderColor="divider">
      <Grid size={2}>
        <Typography variant="bodyMedium">진료과</Typography>
      </Grid>

      <Grid size={10}>
        <Select placeholder="진료과 선택" />
      </Grid>

      <Grid size={2}>
        <Typography variant="bodyMedium">Keyword</Typography>
      </Grid>

      <Grid size={8}>
        <TextField sx={{ width: '30%' }} />
      </Grid>

      <Grid size={2} display="flex" columnGap={1} justifyContent="end">
        <Button variant="outlined" className="MuiButton-noBorderRadius">
          Reset search
        </Button>
        <Button variant="contained" className="MuiButton-noBorderRadius">
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default FilterPanel;
