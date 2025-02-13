// COMPONENTS
import TextField, { TextFieldProps } from './TextField';
// import NumberField, { NumberFieldProps } from './NumberField';

export type InputProps = TextFieldProps;

const InputFactory = ({ type, ...restProps }: InputProps) => {
  // if (type === 'number') {
  //   return <NumberField {...restProps} />;
  // }

  return <TextField type={type} {...restProps} />;
};

export default InputFactory;
