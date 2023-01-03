import { LoginFormItemName } from './types';
import * as Yup from 'yup';

const FORM_SCHEMA = Yup.object().shape({
  [LoginFormItemName.Login]: Yup.string().required('Поле обязательно'),
  [LoginFormItemName.Password]: Yup.string().required('Поле обязательно'),
});

export { FORM_SCHEMA };
