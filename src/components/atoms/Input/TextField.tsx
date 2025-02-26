import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Typography from '../Typography';
export type TextFieldProps = Omit<MuiTextFieldProps, 'onChange' | 'helperText'> & {
  onChange?: (value: string) => void;
  fullHeight?: boolean;
  helperText?: string;
};

const TextField = ({ onChange, fullHeight, sx, helperText, ...props }: TextFieldProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <FormControl fullWidth>
      <MuiTextField sx={{ ...sx, height: fullHeight ? '100%' : 'auto' }} onChange={handleChange} {...props} />
      {helperText && (
        <Typography variant="bodySmall" color="error" py={0.5}>
          {helperText}
        </Typography>
      )}
    </FormControl>
  );
};

export default TextField;
