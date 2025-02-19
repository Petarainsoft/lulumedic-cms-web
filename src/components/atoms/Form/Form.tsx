import { Any, OrPromise } from 'constants/types';
import { createContext, useContext } from 'react';
import { useForm, UseFormProps, UseFormReturn } from 'react-hook-form';

type FormState = {
  methods: UseFormReturn;
  formDisabled?: boolean;
};

const FormContext = createContext<FormState>({ methods: {} } as FormState);
export const useFormContext = () => useContext(FormContext);

type FormProps = {
  children: React.ReactNode;
  defaultValues?: UseFormProps['defaultValues'];
  onSubmit: (values: Any, event?: React.BaseSyntheticEvent) => OrPromise<{ data: Any } | { error: Any } | void>;
};

const Form = ({ defaultValues, onSubmit, children, ...props }: FormProps) => {
  const methods = useForm({ defaultValues });

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
