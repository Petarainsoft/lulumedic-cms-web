import { Any } from 'constants/types';
import { ReactElement } from 'react';
import { Controller, ControllerRenderProps } from 'react-hook-form';
import { useFormContext } from './Form';

type Props = {
  name?: string;
  children: (childProps: ControllerRenderProps & { defaultValue?: Any }) => ReactElement;
};
const FieldController = ({ children, name }: Props) => {
  const {
    methods: { control },
  } = useFormContext();

  return (
    name && (
      <Controller
        control={control}
        name={name!}
        render={({ field, formState: { defaultValues } }) => {
          return children({
            ...field,
            value: field.value || '',
            defaultValue: defaultValues?.[name!] || '',
            onChange: field.onChange,
          });
        }}
      />
    )
  );
};

export default FieldController;
