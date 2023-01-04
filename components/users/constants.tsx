import moment from 'moment';
import { Product } from '../../swagger/autogen';
import { TDataGridCol } from '../ui-kit/DataGrid/types';

import * as Yup from 'yup';
import { ManageUserFormItemName } from './types';

const FORM_SCHEMA = Yup.object().shape({
  [ManageUserFormItemName.Email]: Yup.string().required('Поле обязательно'),
  [ManageUserFormItemName.Password]: Yup.string().required('Поле обязательно'),
});

const COLUMNS: TDataGridCol<Product>[] = [
  {
    field: 'id',
    title: 'ID',
  },
  {
    field: 'createdAt',
    title: 'Дата создания',
    render: (item) => (
      <div>{moment(item.createdAt).format('DD.MM.YYYY hh:mm:ss')}</div>
    ),
  },
  {
    field: 'updatedAt',
    title: 'Дата обновления',
    render: (item) => (
      <div>{moment(item.updatedAt).format('DD.MM.YYYY hh:mm:ss')}</div>
    ),
  },
  {
    field: 'login',
    title: 'Email',
  },
  {
    field: 'passwordHash',
    title: 'Пароль',
    render: (item) => <div>$Encrypted$</div>,
  },
];

export { COLUMNS, FORM_SCHEMA };
