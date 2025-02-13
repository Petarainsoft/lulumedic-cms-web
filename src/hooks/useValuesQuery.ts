import { Any } from 'constants/types';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type ChangeValue<Values extends Record<string, Any>> = <Key extends keyof Values>(key: Key, value: Values[Key]) => void;

const useValuesQuery = <Values extends Record<string, Any>>(
  fields: (keyof Values)[],
  defaultValues?: Values,
  valuesOptions?: Partial<
    Record<
      keyof Values,
      {
        parser?: (value: Any) => Any;
        formatter?: (value: Any) => string | number;
      }
    >
  >
): [Values, ChangeValue<Values>] => {
  const [currentQueryParameters, setSearchParams] = useSearchParams();

  const [values, setValues] = useState<Values>(() => {
    const params = new URLSearchParams(currentQueryParameters);
    const vals: Values = {} as Values;

    for (const field of fields) {
      const value = params.get(field as Any) || defaultValues?.[field];

      if (value) {
        vals[field] = valuesOptions?.[field]?.parser ? valuesOptions[field].parser(value) : value;
      }
    }
    return vals;
  });

  const changeValue = <Key extends keyof Values>(key: Key, value: Values[Key]) => {
    const newQueryParameters: URLSearchParams = new URLSearchParams(values);

    newQueryParameters.set(key as string, value);

    setSearchParams(newQueryParameters);

    setValues(prevState => ({
      ...prevState,
      [key]: valuesOptions?.[key]?.parser ? valuesOptions[key].parser(value) : value,
    }));
  };

  return [values, changeValue];
};

export default useValuesQuery;
