import { FieldProps } from "formik";

export type TFormFieldProps = Omit<FieldProps, 'field' | 'form' | 'meta'>;