import moment from 'moment';
import { Category } from '../../swagger/autogen';
import { TDataGridCol } from '../ui-kit/DataGrid/types';

import * as Yup from 'yup';
import { ManageLanguageFormItemName } from './types';

const FORM_SCHEMA = Yup.object().shape({
  [ManageLanguageFormItemName.Title]: Yup.string().required('Поле обязательно'),
  [ManageLanguageFormItemName.Code]: Yup.string().required('Поле обязательно'),
});

const COLUMNS: TDataGridCol<Category>[] = [
  {
    field: 'id',
    title: 'ID',
  },
  {
    field: 'title',
    title: 'Название',
  },
  {
    field: 'code',
    title: 'Код локализации',
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
];

export { COLUMNS, FORM_SCHEMA };
