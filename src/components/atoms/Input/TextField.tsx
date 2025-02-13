import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';

export type TextFieldProps = Omit<MuiTextFieldProps, 'onChange'> & {
  onChange?: (value: string) => void;
  fullHeight?: boolean;
};

const TextField = ({ onChange, fullHeight, sx, ...props }: TextFieldProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return <MuiTextField sx={{ ...sx, height: fullHeight ? '100%' : 'auto' }} onChange={handleChange} {...props} />;
};

export default TextField;
