import MuiRadioGroup, { RadioGroupProps as MuiRadioGroupProps } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Radio from './Radio';

import { Value } from 'constants/types';

// import FormLabel from '@mui/material/FormLabel';

export type RadioGroupProps = Omit<MuiRadioGroupProps, 'onChange'> & {
  options?: { label: string; value: Value }[];
  onChange?: (value: Value) => void;
};
const RadioGroup = ({ options, onChange, ...rest }: RadioGroupProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value as Value);
    }
  };

  return (
    <FormControl>
      <MuiRadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handleChange}
        {...rest}
      >
        {(options || []).map((item, index) => (
          <FormControlLabel key={index} value={item.value} control={<Radio />} label={item.label} />
        ))}
      </MuiRadioGroup>
    </FormControl>
  );
};

export default RadioGroup;
