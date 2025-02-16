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

const Select = ({ options, placeholder, defaultValue, onChange, ...rest }: SelectProps) => {
  const optionMapByValue = options?.reduce(
    (acc, option) => {
      acc[option.value] = option;
      return acc;
    },
    {} as Record<string, SelectOption>
  );

  console.log({ optionMapByValue }, rest.value);

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    if (onChange) {
      onChange(event.target.value as ID);
    }
  };

  return (
    <MuiSelect
      onChange={handleChange}
      displayEmpty
      renderValue={value => {
        console.log(333, value);
        if (value || defaultValue) {
          const option = optionMapByValue?.[(value || defaultValue) as keyof typeof optionMapByValue];
          return option?.label;
        }

        return placeholder;
      }}
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
