import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../redux/hooks';
import { fetchCategoriesBySection } from '../../redux/slicers/categorySlicer';
import { Category } from '../../swagger/autogen';
import { SECTIONS } from '../categories/constants';
import { PageTitle } from '../common';
import BreadCrumbs from '../ui-kit/Breadcrumbs';
import Button from '../ui-kit/Button';
import FileUpload from '../ui-kit/FileUpload';
import Form from '../ui-kit/Form';
import FormItem from '../ui-kit/FormItem';
import Input from '../ui-kit/Input';
import Loading from '../ui-kit/Loading';
import Select from '../ui-kit/Select';
import { FORM_SCHEMA } from './constants';
import { onSubmit } from './helpers';
import { ManageProductFormItemName } from './types';

type Props = {
  product: any;
  categories: Category[];
  title: string;
  isLoading: boolean;
  isSaveLoading: boolean;
  editMode: boolean;
};

const ManageProductForm = ({
  title,
  product,
  categories,
  isLoading,
  isSaveLoading,
  editMode,
}: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initialValues = {
    price: product?.price,
    // number: product?.number,
    code: product?.code,
    brand: product?.brand,
    numberInPack: product?.numberInPack,
    sizes: product?.sizes,
    image: product?.image,
    category: product?.category.id,
  };
  const [curSection, setCurSection] = useState<string>(
    product?.category.section,
  );

  const categoryItems = categories.map((category) => {
    let title = {} as { [key: string]: string };
    let lang = 'ru';

    try {
      title = JSON.parse(category.title);

      if (Object.keys(title).length && !title.ru) {
        lang = Object.keys(title)[0];
      }
    } catch (error) {
      console.log(error);
    }
    return {
      label: `${title[lang]}`,
      value: category.id,
    };
  });

  const handleSectionChange = () => (section: string) => {
    setCurSection(section);
  };

  useEffect(() => {
    if (curSection) {
      dispatch(fetchCategoriesBySection(curSection));
    }
  }, [curSection]);

  useEffect(() => {
    setCurSection(product?.category.section);
  }, [product]);

  return (
    <>
      <PageTitle>{title}</PageTitle>
      <BreadCrumbs />
      {(!isLoading && categoryItems.length && editMode) ||
      (!isLoading && !editMode) ? (
        <Form
          initialValues={initialValues}
          formSchema={FORM_SCHEMA}
          onSubmit={onSubmit(product?.id, editMode, router, dispatch)}
        >
          <FormContent>
            <FormItem
              title="Цена"
              name={ManageProductFormItemName.Price}
              component={Input}
              type={'number'}
              fullSize={true}
            />
            {/* <FormItem
              title="Количество"
              name={ManageProductFormItemName.Number}
              component={Input}
              type={'number'}
              fullSize={true}
            /> */}
            <FormItem
              title="Артикул"
              name={ManageProductFormItemName.Code}
              component={Input}
              type={'number'}
              fullSize={true}
            />
            <FormItem
              title="Бренд"
              name={ManageProductFormItemName.Brand}
              component={Input}
              fullSize={true}
            />
            <FormItem
              title="Количество в упаковке"
              name={ManageProductFormItemName.NumberInPack}
              component={Input}
              type={'number'}
              fullSize={true}
            />
            <FormItem
              title="Размеры"
              name={ManageProductFormItemName.Sizes}
              component={Input}
              fullSize={true}
            />
            <FormItem
              label="Изображение"
              name={ManageProductFormItemName.Image}
              description="Перетащите или выберите файл для загрузки"
              marginTop={0}
              component={FileUpload}
              fullSize={true}
            />
            <FormItem
              title="Секция"
              name={ManageProductFormItemName.Section}
              component={Select}
              value={curSection}
              items={SECTIONS}
              onChange={handleSectionChange()}
              fullSize={true}
            />
            {curSection && (
              <FormItem
                title="Раздел"
                name={ManageProductFormItemName.Category}
                component={Select}
                items={categoryItems}
                fullSize={true}
              />
            )}
            <Button htmlType={'submit'} loading={isSaveLoading}>
              {editMode ? 'Сохранить' : 'Создать'}
            </Button>
          </FormContent>
        </Form>
      ) : (
        <Loading />
      )}
    </>
  );
};

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default memo(ManageProductForm);
