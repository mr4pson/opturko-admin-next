import { Form as FormikForm, Formik } from 'formik';
import { memo, MutableRefObject } from 'react';
import * as Yup from 'yup';
import { UnknownObject } from '../../../common/types';

type Props = {
  innerRef?: MutableRefObject<any>;
  formSchema?: Yup.ObjectSchema<any>;
  initialValues: UnknownObject;
  children: JSX.Element;
  onSubmit: (values: any, formikProps: any) => void;
};
const Form: React.FC<Props> = ({
  innerRef,
  formSchema,
  initialValues,
  children,
  onSubmit,
}) => {
  return (
    <Formik
      innerRef={innerRef}
      validationSchema={formSchema}
      initialValues={initialValues}
      onSubmit={(a, b) => {
        onSubmit(a, b);
      }}
    >
      {({ handleSubmit }) => (
        <FormikForm
          onSubmit={async (e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {children}
        </FormikForm>
      )}
    </Formik>
  );
};

export default memo(Form);
