import TextField, { TextFieldProps } from './TextField';
import FieldController from '../Form/FieldController';

type Props = TextFieldProps;
const InputForm = ({ name, ...rest }: Props) => {
  return (
    <FieldController name={name}>
      {p => {
        return <TextField {...p} {...rest} />;
      }}
    </FieldController>
  );
};

export default InputForm;
