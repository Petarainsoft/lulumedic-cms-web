import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { SelectOption } from 'constants/elements';

const CheckboxChildren = ({
  options,
  checkedList,
  handleChange,
}: {
  options: SelectOption[];
  checkedList: boolean[];
  handleChange: (index: number, value: boolean) => void;
}) => {
  return (
    <>
      {options.map((item, index) => (
        <FormControlLabel
          key={index}
          control={<Checkbox checked={checkedList[index]} onChange={e => handleChange(index, e.target.checked)} />}
          label={item.label}
        />
      ))}
    </>
  );
};

type Props = {
  options: SelectOption[];
  values?: SelectOption['value'][];
  onChange?: (value: SelectOption['value'][]) => void;
};
const CheckboxGroup = ({ options, values, onChange }: Props) => {
  const [checked, setChecked] = useState<boolean[]>(() => options.map(() => false));

  useEffect(() => {
    if (!values) {
      setChecked(checked.map(() => false));
    }
  }, [values]);

  const handleChange = (index: number, value: boolean) => {
    const values = checked.map((item, i) => (i === index ? value : item));
    setChecked(values);
    handleOptionsChanged(values);
  };

  const handleCheckAll = (value: boolean) => {
    const values = checked.map(() => value);

    setChecked(values);
    handleOptionsChanged(values.map(() => value));
  };

  const handleOptionsChanged = (data: SelectOption['value'][]) => {
    if (onChange) {
      const values = data.reduce(
        (result, current, index) => {
          if (current) {
            result.push(options[index].value);
          }

          return result;
        },
        [] as SelectOption['value'][]
      );

      onChange(values);
    }
  };

  //   useEffect(() => {
  //     handleOptionsChanged();
  //   }, [checked]);

  return (
    <Box>
      <FormControlLabel
        control={<Checkbox checked={checked.every(item => item)} onChange={e => handleCheckAll(e.target.checked)} />}
        label="전체"
      />
      <CheckboxChildren options={options} handleChange={handleChange} checkedList={checked} />
    </Box>
  );
};

export default CheckboxGroup;
