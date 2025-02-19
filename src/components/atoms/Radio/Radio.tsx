import MuiRadio, { RadioProps as MuiRadioProps } from '@mui/material/Radio';
import { Value } from 'constants/types';

type RadioProps = Omit<MuiRadioProps, 'onChange'> & {
  onChange?: (value: Value) => void;
};

const Radio = ({ onChange, ...rest }: RadioProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value as Value);
    }
  };

  return <MuiRadio onChange={handleChange} {...rest} />;
};

export default Radio;
