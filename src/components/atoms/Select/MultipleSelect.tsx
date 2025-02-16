import MuiSelect, { SelectProps as MuiSelectProps, SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// CONSTANTS
import { SelectOption } from 'constants/elements';
import { ID } from 'constants/types';
import { useEffect, useMemo, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

export type SelectProps = Omit<MuiSelectProps, 'onChange' | 'value'> & {
  options?: SelectOption[];
  noOutLine?: boolean;
  placeholder?: string;
  value?: ID[];
  onChange?: (value: ID[]) => void;
};

const MultipleSelect = ({ options, placeholder, sx, value, onChange }: SelectProps) => {
  const [values, setValues] = useState<SelectOption['value'][]>(value || []);

  const optionMapByValue = options?.reduce(
    (acc, option) => {
      acc[option.value] = option;
      return acc;
    },
    {} as Record<string, SelectOption>
  );

  const handleChange = (event: SelectChangeEvent<typeof values>) => {
    const value = event.target.value;
    setValues(typeof value === 'string' ? value.split(',') : value);

    if (onChange) {
      onChange(event.target.value as ID[]);
    }
  };

  const labels = useMemo(() => {
    return values.map(value => optionMapByValue?.[value as keyof typeof optionMapByValue]?.label).join(',');
  }, [values]);

  useEffect(() => {
    setValues(value || []);
  }, [value]);

  return (
    <MuiSelect
      labelId="demo-multiple-checkbox-label"
      id="demo-multiple-checkbox"
      multiple
      displayEmpty
      value={values}
      onChange={handleChange}
      input={<OutlinedInput />}
      renderValue={() => {
        if (labels.length === 0) {
          return <em>{placeholder}</em>;
        }
        return labels;
      }}
      sx={sx}
    >
      <MenuItem disabled value="">
        <em>{placeholder}</em>
      </MenuItem>
      {(options || []).map(name => (
        <MenuItem key={name.value} value={name.value} sx={{ height: 35 }}>
          <ListItemText primary={name.label} />
          <Checkbox checked={values.includes(name.value)} />
        </MenuItem>
      ))}
    </MuiSelect>
  );
};

export default MultipleSelect;
