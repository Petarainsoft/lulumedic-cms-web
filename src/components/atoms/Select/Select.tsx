import MuiSelect, { SelectProps as MuiSelectProps, SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import Typography from '../Typography';

// CONSTANTS
import { SelectOption } from 'constants/elements';
import { ID } from 'constants/types';
import FormControl from '@mui/material/FormControl';

export type SelectProps = Omit<MuiSelectProps, 'onChange' | 'helperText'> & {
  options?: SelectOption[];
  noOutLine?: boolean;
  placeholder?: string;
  helperText?: string;
  onChange?: (value: ID) => void;
};

const Select = ({ options, placeholder, defaultValue, helperText, fullWidth, onChange, ...rest }: SelectProps) => {
  const optionMapByValue = options?.reduce(
    (acc, option) => {
      acc[option.value] = option;
      return acc;
    },
    {} as Record<string, SelectOption>
  );

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    if (onChange) {
      onChange(event.target.value as ID);
    }
  };

  return (
    <FormControl fullWidth={fullWidth}>
      <MuiSelect
        onChange={handleChange}
        displayEmpty
        renderValue={value => {
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
      {helperText && (
        <Typography variant="bodySmall" color="error" py={0.5}>
          {helperText}
        </Typography>
      )}
    </FormControl>
  );
};

export default Select;
