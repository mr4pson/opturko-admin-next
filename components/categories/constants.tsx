import moment from 'moment';
import { Category } from '../../swagger/autogen';
import { TDataGridCol } from '../ui-kit/DataGrid/types';

import * as Yup from 'yup';
import { ManageCategoryFormItemName } from './types';
import { Section } from '../../common/enums';
import { formatSectionName } from './helpers';

const FORM_SCHEMA = Yup.object().shape({
  [ManageCategoryFormItemName.Title]: Yup.string().required('Поле обязательно'),
  [ManageCategoryFormItemName.Section]:
    Yup.string().required('Поле обязательно'),
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
    field: 'section',
    title: 'Раздел',
    render: (item) => <div>{formatSectionName(item.section as Section)}</div>,
  },
];

const SECTIONS = [
  {
    label: 'Женщинам',
    value: Section.Women,
  },
  {
    label: 'Мужчинам',
    value: Section.Men,
  },
  {
    label: 'Детям',
    value: Section.Children,
  },
];

export { COLUMNS, FORM_SCHEMA, SECTIONS };
