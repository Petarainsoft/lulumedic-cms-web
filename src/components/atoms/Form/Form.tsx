import { Any, OrPromise } from 'constants/types';
import { createContext, useContext } from 'react';
import { useForm, UseFormProps, UseFormReturn } from 'react-hook-form';
import { ObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type FormState = {
  methods: UseFormReturn;
  formDisabled?: boolean;
};

const FormContext = createContext<FormState>({ methods: {} } as FormState);
export const useFormContext = () => useContext(FormContext);

type FormProps = {
  children: React.ReactNode;
  schema?: ObjectSchema<Any>;
  defaultValues?: UseFormProps['defaultValues'];
  onSubmit: (values: Any, event?: React.BaseSyntheticEvent) => OrPromise<{ data: Any } | { error: Any } | void>;
};

const Form = ({ defaultValues, onSubmit, schema, children, ...props }: FormProps) => {
  const methods = useForm({ defaultValues, resolver: schema ? yupResolver(schema) : undefined });

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} {...props}>
      <FormContext.Provider
        value={{
          methods,
        }}
      >
        {children}
      </FormContext.Provider>
    </form>
  );
};

export default Form;
