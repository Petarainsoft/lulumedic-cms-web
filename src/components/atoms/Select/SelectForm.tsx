import { FieldController } from '../Form';
import Select, { SelectProps } from './Select';

type Props = SelectProps;

const SelectForm = ({ name, ...rest }: Props) => {
  return (
    <FieldController name={name}>
      {p => {
        return <Select {...p} {...rest} />;
      }}
    </FieldController>
  );
};

export default SelectForm;
