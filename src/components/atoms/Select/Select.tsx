import MuiSelect, { SelectProps as MuiSelectProps, SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import Typography from '../Typography';

// CONSTANTS
import { SelectOption } from 'constants/elements';
import { ID } from 'constants/types';

export type SelectProps = Omit<MuiSelectProps, 'onChange'> & {
  options?: SelectOption[];
  noOutLine?: boolean;
  placeholder?: string;
  onChange?: (value: ID) => void;
};

const Select = ({ options, placeholder, onChange, ...rest }: SelectProps) => {
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    if (onChange) {
      onChange(event.target.value as ID);
    }
  };

  return (
    <MuiSelect
      onChange={handleChange}
      displayEmpty
      renderValue={value => (value != null ? <>{value}</> : placeholder)}
      {...rest}
    >
      {(options || []).map(option => (
        <MenuItem key={option.value} value={option.value} sx={{ cursor: 'pointer' }}>
          <Typography variant="bodyMedium">{option.label}</Typography>
        </MenuItem>
      ))}
    </MuiSelect>
  );
};

export default Select;
