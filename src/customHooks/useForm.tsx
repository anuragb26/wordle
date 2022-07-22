import { useState, SyntheticEvent } from "react";

type useFormReturnType<FormPayload> = [
  values: FormPayload,
  onChange: (event: SyntheticEvent) => void,
  onSubmit: (event: SyntheticEvent) => void
];

const useForm = <FormPayload extends { [key: string]: object }>(
  initialValues: FormPayload,
  formSubmitApi: () => void
): useFormReturnType<FormPayload> => {
  const [values, setValues] = useState<FormPayload>(initialValues);
  const onChange = (event: SyntheticEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    setValues({
      ...values,
      [name]: { ...values[name], value },
    });
  };
  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    formSubmitApi();
  };
  return [values, onChange, onSubmit];
};

export default useForm;
