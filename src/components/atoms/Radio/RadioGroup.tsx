import MuiRadioGroup, { RadioGroupProps as MuiRadioGroupProps } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Radio from './Radio';

import { Value } from 'constants/types';

// import FormLabel from '@mui/material/FormLabel';

export type RadioGroupProps = MuiRadioGroupProps & {
  options?: { label: string; value: Value }[];
};
const RadioGroup = ({ options, value }: RadioGroupProps) => {
  console.log({ value });
  return (
    <FormControl>
      {/* <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel> */}
      <MuiRadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
        {(options || []).map(item => (
          <FormControlLabel value={item.value} control={<Radio checked={item.value === value} />} label={item.label} />
        ))}
      </MuiRadioGroup>
    </FormControl>
  );
};

export default RadioGroup;
