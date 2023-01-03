import { FieldInputProps, FormikProps } from 'formik';
import { useEffect } from 'react';

const useConnectForm = (
  formItemValue: any,
  form?: FormikProps<{ [key: string]: any }>,
  field?: FieldInputProps<any>,
  hasSchema?: boolean,
  onChange?: (value: any, form: FormikProps<{ [key: string]: any }>) => void,
) => {
  useEffect(() => {
    const fieldName = field?.name ?? '';

    form?.setFieldTouched(fieldName, true);
    form?.setFieldValue(fieldName, formItemValue);

    if (hasSchema) {
      form?.validateField(fieldName);
    }

    if (onChange) {
      onChange(formItemValue, form!);
    }
  }, [formItemValue]);
};

export default useConnectForm;
