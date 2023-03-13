import moment from 'moment';
import { Product } from '../../swagger/autogen';
import { TDataGridCol } from '../ui-kit/DataGrid/types';

import * as Yup from 'yup';
import { ManageProductFormItemName } from './types';
import styled from 'styled-components';
import { getImageUrl } from '../../common/helpers';

const FORM_SCHEMA = Yup.object().shape({
  [ManageProductFormItemName.Price]: Yup.number().required('Поле обязательно'),
  // [ManageProductFormItemName.Number]: Yup.number()
  //   .min(1, 'Количество меньше 1')
  //   .required('Поле обязательно'),
  [ManageProductFormItemName.Code]: Yup.number().required('Поле обязательно'),
  [ManageProductFormItemName.NumberInPack]: Yup.number()
    .min(1, 'Количество в упаковке меньше 1')
    .required('Поле обязательно'),
  [ManageProductFormItemName.Sizes]: Yup.string().required('Поле обязательно'),
  [ManageProductFormItemName.Image]: Yup.string().required('Поле обязательно'),
  [ManageProductFormItemName.Category]:
    Yup.string().required('Поле обязательно'),
});

const COLUMNS: TDataGridCol<Product>[] = [
  {
    field: 'id',
    title: 'ID',
  },
  {
    field: 'image',
    title: 'Изображение',
    render: (item) => (
      <ProductImage
        style={{ backgroundImage: `url(${getImageUrl(item.image)})` }}
      ></ProductImage>
    ),
  },
  {
    field: 'price',
    title: 'Цена',
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
  // {
  //   field: 'number',
  //   title: 'Количество',
  // },
  {
    field: 'code',
    title: 'Артикул',
  },
  {
    field: 'numberInPack',
    title: 'Количество в упаковке',
  },
  {
    field: 'sizes',
    title: 'Размеры',
  },
  {
    field: 'category',
    title: 'Категория',
    render: (item) => {
      let title = {} as { [key: string]: string };
      let lang = 'ru';

      try {
        title = JSON.parse(item.category.title);

        if (Object.keys(title).length && !title.ru) {
          lang = Object.keys(title)[0];
        }
      } catch (error) {
        console.log(error);
      }

      return <div>{title[lang]}</div>;
    },
  },
];

const ProductImage = styled.div`
  width: 110px;
  height: 120px;
  background-size: cover;
  background-position: center;
`;

export { COLUMNS, FORM_SCHEMA };
